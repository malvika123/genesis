// The heart of a Genesis experiment, shared by the command-line runner (tools/experiment.js) and the
// Lab page in the browser (lab.html): what an experiment's settings are, how one seeded world is run and
// measured, and how the results are written. Both run exactly this code, so a table made in the browser
// and one made on the command line agree.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

(function (root, make) {
  if (typeof module === 'object' && module.exports) module.exports = make();
  else root.GenesisExperiment = make();
})(typeof self !== 'undefined' ? self : this, function () {
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
    'swim', // someone learns to swim
    'point', // someone points
    'joint', // someone goes the way another pointed (shared attention)
    'speak', // someone first says a word of its own making
    'shared', // three people say the same word: the first shared word
  ];
  // the same, in words, for the Lab page
  const MILESTONE_NAMES = {
    take: 'picks something up',
    nut: 'cracks a nut with a stone',
    flake: 'knocks a sharp flake off a stone',
    root: 'digs up a root',
    dig: 'digs with a stick',
    meat: 'eats meat from a body',
    butcher: 'cuts meat with a sharp stone',
    hunt: 'brings down a land animal',
    cooked: 'eats food cooked by a wildfire',
    brand: 'takes up a burning stick',
    setfire: 'starts a fire with a burning stick',
    fed: 'feeds a fire',
    kept: 'keeps a fire going for hours',
    madefire: 'makes fire with sparks',
    rubfire: 'makes fire with wood',
    share: 'gives food to another',
    vicar: 'learns fear from seeing another hurt',
    swim: 'learns to swim',
    point: 'points',
    joint: 'goes where another pointed',
    speak: 'says a word of their own',
    shared: 'three people share a word',
  };
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

  // Every setting an experiment can change, with its default, its command-line switch and its meaning.
  // kind: 'num' (a number), 'on' (a switch that turns something on), 'off' (a switch that turns
  // something normally on, off).
  const SETTINGS = [
    { key: 'days', kind: 'num', def: 60, flag: 'days', label: 'Days to run each world', min: 1, max: 2000 },
    { key: 'people', kind: 'num', def: 25, flag: 'people', label: 'People at the start', min: 0, max: 200, cfg: true },
    { key: 'herbivores', kind: 'num', def: 20, flag: 'herbivores', label: 'Plant-eaters', min: 0, max: 200, cfg: true },
    { key: 'predators', kind: 'num', def: 6, flag: 'predators', label: 'Predators', min: 0, max: 100, cfg: true },
    { key: 'fish', kind: 'num', def: 24, flag: 'fish', label: 'Fish', min: 0, max: 200, cfg: true },
    { key: 'brain', kind: 'num', def: 64, flag: 'brain', label: 'Most thinking units in a person’s brain', min: 16, max: 2048 },
    { key: 'earth', kind: 'on', def: false, flag: 'earth', label: 'The real Earth, 70,000 years ago (otherwise a made-up planet)', cfg: true },
    { key: 'homeland', kind: 'off', def: true, flag: 'any-start', label: 'The band starts where our species lived (off: anywhere warm near water, the old rule)', cfg: true },
    { key: 'vicar', kind: 'off', def: true, flag: 'no-vicar', label: 'People learn from seeing others hurt', cfg: true },
    { key: 'pickyCopy', kind: 'off', def: true, flag: 'no-picky', label: 'Choosy copying (off: copy the nearest elder blindly)', cfg: true },
    { key: 'soundPhysics', kind: 'off', def: true, flag: 'old-sound', label: 'Sound by the physics of air (off: heard within 2.2 squares)', cfg: true },
    { key: 'animalCalls', kind: 'off', def: true, flag: 'no-calls', label: 'Animals call (howls, roars, alarm snorts)', cfg: true },
    { key: 'modernVoice', kind: 'on', def: false, flag: 'modern-voice', label: 'Everyone starts with a modern voice, pointing and shared attention', cfg: true },
    { key: 'retina', kind: 'on', def: false, flag: 'retina', label: 'Raw vision (no labelled senses)', cfg: true },
  ];

  // command-line style arguments ({ days: '30', 'no-vicar': true, ... }) → settings
  function fromArgs(a) {
    const v = {};
    for (const s of SETTINGS) {
      if (s.kind === 'num') v[s.key] = a[s.flag] === undefined ? s.def : Number(a[s.flag]);
      else if (s.kind === 'on') v[s.key] = !!a[s.flag];
      else v[s.key] = !a[s.flag];
    }
    return build(v);
  }
  // a plain object of setting values (missing ones take their default) → settings
  function build(v) {
    const S = { days: 60, brain: 64, cfg: {} };
    for (const s of SETTINGS) {
      const x = v[s.key] === undefined ? s.def : s.kind === 'num' ? Number(v[s.key]) : !!v[s.key];
      if (s.cfg) S.cfg[s.key] = x;
      else S[s.key] = x;
    }
    return S;
  }
  // settings → the command that runs the same experiment without a browser
  function command(S, seeds, workers) {
    const parts = ['node tools/experiment.js', '--seeds ' + seeds];
    for (const s of SETTINGS) {
      const x = s.cfg ? S.cfg[s.key] : S[s.key];
      if (s.kind === 'num') {
        if (x !== s.def) parts.push('--' + s.flag + ' ' + x);
      } else if (s.kind === 'on') {
        if (x) parts.push('--' + s.flag);
      } else if (!x) parts.push('--' + s.flag);
    }
    if (workers > 1) parts.push('--workers ' + workers);
    return parts.join(' ');
  }

  function seedList(s) {
    const out = [];
    for (const raw of String(s).split(',')) {
      const part = raw.trim();
      if (!part) continue;
      const m = part.match(/^(\d+)\s*-\s*(\d+)$/);
      if (m) for (let x = +m[1]; x <= +m[2]; x++) out.push(x);
      else if (/^\d+$/.test(part)) out.push(+part);
      else throw new Error('Cannot read the seeds: ' + s);
    }
    return out;
  }

  // Run one seeded world and measure it. onDay(day) is called after each day, if given; return true
  // from it to stop early.
  function runWorld(E, seed, S, onDay) {
    E.setSeed(seed);
    E.reset(S.cfg);
    const day = {};
    for (let t = 0; t < S.days * E.DAY; t++) {
      E.sim();
      const st = E.state();
      for (const k of MILESTONES) if (st.firsts[k] && day[k] === undefined) day[k] = Math.floor(t / E.DAY) + 1;
      if (st.over) break;
      if (onDay && (t + 1) % E.DAY === 0 && onDay((t + 1) / E.DAY)) break;
    }
    const st = E.state(),
      ppl = st.ag.filter((a) => a.sp === 0);
    const died = {};
    for (const [k, v] of Object.entries(st.deaths)) if (k.startsWith('Person: ')) died[k.slice(8)] = v;
    const count = (sp) => st.ag.filter((a) => a.sp === sp).length;
    const mean = (f, d) => (ppl.length ? +(ppl.reduce((t, p) => t + (f(p) ?? d), 0) / ppl.length).toFixed(2) : '');
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
      learns_from_others: mean((p) => p.g.im, 1),
      copies_successful: mean((p) => p.g.pb, 0.5),
      follows_crowd: mean((p) => p.g.cf, 0.3),
      full_sibling_pct: st.SIBS[0] && st.SIBS[0].pairs ? Math.round((100 * st.SIBS[0].full) / st.SIBS[0].pairs) : '',
      vocal_control: mean((p) => p.g.vl, 1),
      point_urge: mean((p) => p.g.pg, 1),
      share_joy: mean((p) => p.g.sh, 1),
      ...(() => {
        // the brain layout of the living: share of units in each kind of region, and how many regions
        const sh = [0, 0, 0, 0];
        let nr = 0;
        for (const p of ppl) {
          const H = p.h.length,
            L = p.g.lay;
          nr += L ? L.masks.length : 4;
          for (let j = 0; j < H; j++) sh[L ? L.kind[L.reg[j]] : j % 8 === 0 ? 1 : j % 8 === 1 ? 2 : j % 16 === 2 ? 3 : 0] += 1 / H;
        }
        const m = (v) => (ppl.length ? +(v / ppl.length).toFixed(3) : '');
        return { brain_general: m(sh[0]), brain_fear: m(sh[1]), brain_memory: m(sh[2]), brain_words: m(sh[3]), brain_regions: m(nr) };
      })(),
      words_said: st.WSTAT ? st.WSTAT.size : '',
      words_shared: st.WSTAT ? [...st.WSTAT.values()].filter((s) => s.who && s.who.size >= 3).length : '',
      loners_pct: ppl.length ? Math.round((100 * ppl.filter((p) => (p.g.im ?? 1) < 0.35).length) / ppl.length) : '',
      died,
      day,
    };
  }

  const HEAD = ['seed', 'days_run', 'people_alive', 'generations', 'plant_eaters', 'hunters', 'fish', 'best_fire_skill', 'learns_from_others', 'copies_successful', 'follows_crowd', 'loners_pct', 'full_sibling_pct', 'vocal_control', 'point_urge', 'share_joy', 'words_said', 'words_shared', 'brain_general', 'brain_fear', 'brain_memory', 'brain_words', 'brain_regions'];

  // meta: { version, commit, runtime, seeds }
  function csv(rows, S, meta) {
    const cols = [...HEAD, ...CAUSES.map((c) => 'died_' + c.replace(/ /g, '_')), ...MILESTONES.map((m) => 'day_' + m)];
    const lines = [
      '# Genesis experiment',
      '# genesis ' + meta.version + ' commit ' + meta.commit + ', ' + meta.runtime,
      '# settings ' + JSON.stringify({ days: S.days, brain: S.brain, ...S.cfg }),
      '# seeds ' + meta.seeds,
      '# day_X = the day (1 = first) something first happened in that world; empty = never',
      cols.join(','),
    ];
    for (const r of rows)
      lines.push(
        [
          ...HEAD.map((h) => r[h]),
          ...CAUSES.map((c) => r.died[c] || 0),
          ...MILESTONES.map((m) => (r.day[m] === undefined ? '' : r.day[m])),
        ].join(',')
      );
    return lines.join('\n') + '\n';
  }

  const median = (v) => {
    const s = [...v].sort((x, y) => x - y);
    return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : null;
  };
  // mean and its standard error
  const meanSE = (v) => {
    const n = v.length;
    if (!n) return { mean: null, se: null, n };
    const m = v.reduce((a, b) => a + b, 0) / n;
    const sd = n > 1 ? Math.sqrt(v.reduce((a, b) => a + (b - m) * (b - m), 0) / (n - 1)) : 0;
    return { mean: m, se: n > 1 ? sd / Math.sqrt(n) : null, n };
  };

  // the numbers the summary is made of (the Lab page draws them; summary() writes them as text)
  function stats(rows) {
    const alive = rows.map((r) => r.people_alive);
    const dead = {};
    for (const c of CAUSES) dead[c] = 0;
    for (const r of rows) for (const [k, v] of Object.entries(r.died)) dead[k] = (dead[k] || 0) + v;
    const firsts = {};
    for (const m of MILESTONES) {
      const d = rows.filter((r) => r.day[m] !== undefined).map((r) => r.day[m]);
      firsts[m] = { worlds: d.length, median: median(d), earliest: d.length ? Math.min(...d) : null };
    }
    return {
      worlds: rows.length,
      alive: { ...meanSE(alive), median: median(alive) },
      diedOut: rows.filter((r) => r.people_alive === 0).length,
      hunters: meanSE(rows.map((r) => r.hunters)),
      plantEaters: meanSE(rows.map((r) => r.plant_eaters)),
      generations: meanSE(rows.map((r) => r.generations)),
      dead,
      firsts,
    };
  }

  function summary(rows, S) {
    const s = stats(rows),
      out = [];
    out.push(
      `${rows.length} worlds, ${S.days} days each. People alive at the end: mean ${s.alive.mean === null ? '-' : s.alive.mean.toFixed(1)}, median ${s.alive.median}; ` +
        `${s.diedOut} worlds ended with nobody left.`
    );
    out.push('Deaths: ' + Object.entries(s.dead).filter(([, v]) => v).map(([k, v]) => k + ' ' + v).join(', '));
    for (const m of MILESTONES) {
      const f = s.firsts[m];
      out.push(m.padEnd(9) + `${String(f.worlds).padStart(4)} / ${rows.length} worlds` + (f.worlds ? `, median day ${f.median}, earliest ${f.earliest}` : ''));
    }
    return out.join('\n');
  }

  return { MILESTONES, MILESTONE_NAMES, CAUSES, SETTINGS, fromArgs, build, command, seedList, runWorld, csv, stats, summary, median, meanSE };
});
