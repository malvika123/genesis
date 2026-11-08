#!/usr/bin/env node
// Run one Genesis experiment: many seeded worlds with the same settings, one table of results.
//
//   node tools/experiment.js --seeds 1-50 --days 60 --out fire.csv
//   node tools/experiment.js --seeds 1-200 --days 90 --workers 4 --people 8 --predators 2 --out run.csv
//   node tools/experiment.js --seeds 7 --days 30           (one world, table printed to the screen)
//
// Settings (each world is built from these, and from its seed, and from nothing else):
//   --days N         days to run each world (a day is 96 steps of 15 minutes)      [60]
//   --seeds A-B|A,B  which seeds to run                                              [1-10]
//   --people N --herbivores N --predators N --fish N    starting numbers             [8 20 6 24]
//   --brain N        the most thinking units a person's brain can grow (64 normally)
//   --retina         the raw-vision experiment (no labelled senses)
//   --no-vicar       people don't learn from seeing others hurt
//   --old-sound      sound heard within 2.2 squares, fading evenly (no physics)
//   --no-calls       animals make no calls
//   --no-picky       people copy the nearest elder blindly (no success bias, crowd-following or uncertainty)
//   --workers N      run seeds in parallel in N processes                            [1]
//   --out FILE       write the CSV there (otherwise it is printed)
//
// The CSV has one row per world: how many people were alive at the end, how many generations there
// were, why people died, and the DAY each milestone first happened (empty = it never did).
// Lines starting with # at the top record exactly what was run, so the file can be cited and the run
// repeated: the same command on the same version of Genesis gives the same file.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');
const { createEngine } = require('./engine');

// the things that can happen once, in a world, and that an experiment will want to date
const MILESTONES = [
  'take', // first picks something up
  'nut', // cracks a nut with a stone
  'flake', // knocks a sharp flake off a stone
  'root', // digs up a root
  'dig', // digs with a stick
  'meat', // eats meat from a body
  'butcher', // cuts meat with a sharp stone
  'hunt', // brings down a land animal
  'cooked', // eats food cooked by a wildfire
  'brand', // takes up a burning stick
  'setfire', // drops a burning stick, and fire takes hold
  'fed', // feeds a fire
  'kept', // keeps a fire going for hours
  'madefire', // makes fire with sparks
  'rubfire', // makes fire with wood
  'share', // gives food to another
  'vicar', // someone is afraid after seeing another person hurt
  'say2',
  'say3',
  'say4',
  'say5', // the four learned sounds first used
];
const CAUSES = [
  'hunger',
  'thirst',
  'killed by a predator',
  'drowned',
  'burned',
  'its wounds',
  'old age',
  'struck by lightning',
  'giving birth',
];

function parse(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++)
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2);
      a[k] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    }
  return a;
}
function seedList(s) {
  const out = [];
  for (const part of String(s).split(',')) {
    const m = part.match(/^(\d+)-(\d+)$/);
    if (m) for (let x = +m[1]; x <= +m[2]; x++) out.push(x);
    else if (/^\d+$/.test(part)) out.push(+part);
    else throw new Error('Cannot read the seeds: ' + s);
  }
  return out;
}

function settings(a) {
  const n = (k, d) => (a[k] === undefined ? d : Number(a[k]));
  return {
    days: n('days', 60),
    brain: n('brain', 64), // the most thinking units a person's brain grows (64 normally)
    cfg: {
      people: n('people', 8),
      herbivores: n('herbivores', 20),
      predators: n('predators', 6),
      fish: n('fish', 24),
      retina: !!a.retina,
      vicar: !a['no-vicar'],
      pickyCopy: !a['no-picky'],
      soundPhysics: !a['old-sound'],
      animalCalls: !a['no-calls'],
    },
  };
}

function runWorld(E, seed, S) {
  E.setSeed(seed);
  E.reset(S.cfg);
  const day = {};
  for (let t = 0; t < S.days * E.DAY; t++) {
    E.sim();
    const st = E.state();
    for (const k of MILESTONES) if (st.firsts[k] && day[k] === undefined) day[k] = Math.floor(t / E.DAY) + 1;
    if (st.over) break;
  }
  const st = E.state(),
    ppl = st.ag.filter((a) => a.sp === 0);
  const died = {};
  for (const [k, v] of Object.entries(st.deaths)) if (k.startsWith('Person: ')) died[k.slice(8)] = v;
  const count = (sp) => st.ag.filter((a) => a.sp === sp).length;
  return {
    seed,
    days_run: Math.floor(st.tick / E.DAY),
    people_alive: ppl.length,
    generations: st.maxGen,
    plant_eaters: count(1),
    hunters: count(2),
    fish: count(3),
    best_fire_skill: +Math.max(0, ...ppl.map((p) => p.fsk || 0)).toFixed(2),
    // what kind of learners the living people are (inherited)
    learns_from_others: ppl.length ? +(ppl.reduce((t, p) => t + (p.g.im ?? 1), 0) / ppl.length).toFixed(2) : '',
    copies_successful: ppl.length ? +(ppl.reduce((t, p) => t + (p.g.pb ?? 0.5), 0) / ppl.length).toFixed(2) : '',
    follows_crowd: ppl.length ? +(ppl.reduce((t, p) => t + (p.g.cf ?? 0.3), 0) / ppl.length).toFixed(2) : '',
    full_sibling_pct: st.SIBS[0] && st.SIBS[0].pairs ? Math.round((100 * st.SIBS[0].full) / st.SIBS[0].pairs) : '',
    loners_pct: ppl.length ? Math.round((100 * ppl.filter((p) => (p.g.im ?? 1) < 0.35).length) / ppl.length) : '',
    died,
    day,
  };
}

function csv(rows, S, meta) {
  const head = ['seed', 'days_run', 'people_alive', 'generations', 'plant_eaters', 'hunters', 'fish', 'best_fire_skill', 'learns_from_others', 'copies_successful', 'follows_crowd', 'loners_pct', 'full_sibling_pct'];
  const cols = [...head, ...CAUSES.map((c) => 'died_' + c.replace(/ /g, '_')), ...MILESTONES.map((m) => 'day_' + m)];
  const lines = [
    '# Genesis experiment',
    '# genesis ' + meta.version + ' commit ' + meta.commit + ', node ' + process.version,
    '# settings ' + JSON.stringify({ days: S.days, brain: S.brain, ...S.cfg }),
    '# seeds ' + meta.seeds,
    '# day_X = the day (1 = first) something first happened in that world; empty = never',
    cols.join(','),
  ];
  for (const r of rows)
    lines.push(
      [
        ...head.map((h) => r[h]),
        ...CAUSES.map((c) => r.died[c] || 0),
        ...MILESTONES.map((m) => (r.day[m] === undefined ? '' : r.day[m])),
      ].join(',')
    );
  return lines.join('\n') + '\n';
}

function summary(rows, S) {
  const med = (v) => {
    const s = [...v].sort((x, y) => x - y);
    return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : null;
  };
  const out = [];
  const alive = rows.map((r) => r.people_alive);
  out.push(
    `${rows.length} worlds, ${S.days} days each. People alive at the end: mean ${(alive.reduce((a, b) => a + b, 0) / rows.length).toFixed(1)}, median ${med(alive)}; ` +
      `${rows.filter((r) => r.people_alive === 0).length} worlds ended with nobody left.`
  );
  const dead = {};
  for (const r of rows) for (const [k, v] of Object.entries(r.died)) dead[k] = (dead[k] || 0) + v;
  out.push('Deaths: ' + Object.entries(dead).map(([k, v]) => k + ' ' + v).join(', '));
  for (const m of MILESTONES) {
    const d = rows.filter((r) => r.day[m] !== undefined).map((r) => r.day[m]);
    out.push(
      m.padEnd(9) + `${String(d.length).padStart(4)} / ${rows.length} worlds` + (d.length ? `, median day ${med(d)}, earliest ${Math.min(...d)}` : '')
    );
  }
  return out.join('\n');
}

function main() {
  const a = parse(process.argv.slice(2)),
    S = settings(a),
    seeds = seedList(a.seeds ?? '1-10');
  if (a.worker) {
    // a helper process: run its share of the seeds and print one JSON line per world
    const E = createEngine({ brain: S.brain });
    for (const sd of seeds) console.log(JSON.stringify(runWorld(E, sd, S)));
    return;
  }
  let commit = 'unknown';
  try {
    commit = execSync('git rev-parse --short HEAD', { cwd: path.join(__dirname, '..'), stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {}
  const meta = {
    version: require('../package.json').version,
    commit,
    seeds: a.seeds ?? '1-10',
  };
  const W = Math.max(1, Math.min(Number(a.workers || 1), seeds.length));
  const shares = Array.from({ length: W }, () => []);
  seeds.forEach((s, i) => shares[i % W].push(s));
  const rows = [];
  let live = W;
  const passArgs = process.argv.slice(2).filter((x, i, all) => x !== '--worker' && all[i - 1] !== '--seeds' && x !== '--seeds' && all[i - 1] !== '--out' && x !== '--out' && all[i - 1] !== '--workers' && x !== '--workers');
  for (const share of shares) {
    let buf = ''; // a line of output can arrive in two pieces
    spawn(process.execPath, [__filename, ...passArgs, '--worker', '--seeds', share.join(',')], { stdio: ['ignore', 'pipe', 'inherit'] }).stdout
      .on('data', (d) => {
        buf += d.toString();
        let k;
        while ((k = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, k);
          buf = buf.slice(k + 1);
          if (line.trim()) rows.push(JSON.parse(line));
        }
      })
      .on('end', () => {
        if (--live) return;
        rows.sort((x, y) => x.seed - y.seed);
        const text = csv(rows, S, meta);
        if (typeof a.out === 'string') fs.writeFileSync(a.out, text);
        else process.stdout.write(text);
        console.error('\n' + summary(rows, S) + (typeof a.out === 'string' ? '\nWrote ' + a.out : ''));
      });
  }
}
main();
