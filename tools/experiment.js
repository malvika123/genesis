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
//   --people N --herbivores N --predators N --fish N    starting numbers             [25 20 6 24]
//   --brain N        the most thinking units a person's brain can grow (64 normally)
//   --retina         the raw-vision experiment (no labelled senses)
//   --no-vicar       people don't learn from seeing others hurt
//   --old-sound      sound heard within 2.2 squares, fading evenly (no physics)
//   --modern-voice   everyone starts with a modern human voice, pointing and shared attention
//   --no-calls       animals make no calls
//   --sapiens        Homo sapiens 70,000 years ago without culture (otherwise early hominins, ~2.5 million years ago)
//   --earth          the real Earth's continents as they were 70,000 years ago (not a made-up planet)
//   --no-trees       early hominins sleep on the ground, not up in trees
//   --shield-founders  the old rule: predators cannot take the founding generation's young
//   --no-shelter     branches cannot be heaped up into a shelter
//   --no-care        only parents and grandmothers feed a child; children are not drawn to stay close
//   --any-start      the band starts anywhere within 36° of the equator near fresh water (the old rule)
//   --no-picky       people copy the nearest elder blindly (no success bias, crowd-following or uncertainty)
//   --workers N      run seeds in parallel in N processes                            [1]
//   --out FILE       write the CSV there (otherwise it is printed)
//
// The CSV has one row per world: how many people were alive at the end, how many generations there
// were, why people died, and the DAY each milestone first happened (empty = it never did).
// Lines starting with # at the top record exactly what was run, so the file can be cited and the run
// repeated: the same command on the same version of Genesis gives the same file.
//
// The same experiments can be run in a browser on the Lab page (lab.html); both use tools/experiment-core.js.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

const path = require('path');
const fs = require('fs');
const { spawn, execSync } = require('child_process');
const { createEngine } = require('./engine');
const X = require('./experiment-core');

function parse(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++)
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2);
      a[k] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    }
  return a;
}

function main() {
  const a = parse(process.argv.slice(2)),
    S = X.fromArgs(a),
    seeds = X.seedList(a.seeds ?? '1-10');
  if (a.worker) {
    // a helper process: run its share of the seeds and print one JSON line per world
    const E = createEngine({ brain: S.brain });
    for (const sd of seeds) console.log(JSON.stringify(X.runWorld(E, sd, S)));
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
    runtime: 'node ' + process.version,
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
        const text = X.csv(rows, S, meta);
        if (typeof a.out === 'string') fs.writeFileSync(a.out, text);
        else process.stdout.write(text);
        console.error('\n' + X.summary(rows, S) + (typeof a.out === 'string' ? '\nWrote ' + a.out : ''));
      });
  }
}
main();
