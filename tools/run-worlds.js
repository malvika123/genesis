#!/usr/bin/env node
// Run many Genesis worlds without a screen and summarise what happened.
//
//   node tools/run-worlds.js --worlds 5 --days 60 --people 6 --seed 1
//   node tools/run-worlds.js --json > results.json
//
// Worlds are seeded, so the same command always gives the same result.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

const { createEngine } = require('./engine');

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith('--'))
      acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]);
    return acc;
  }, [])
);
const num = (k, d) => (args[k] === undefined ? d : Number(args[k]));
const opts = {
  worlds: num('worlds', 5),
  days: num('days', 60),
  seed: num('seed', 1),
  cfg: {
    people: num('people', 6),
    herbivores: num('herbivores', 14),
    predators: num('predators', 3),
    fish: num('fish', 24),
  },
};

const E = createEngine();
const results = [];
for (let w = 0; w < opts.worlds; w++) {
  E.setSeed(opts.seed + w);
  E.reset(opts.cfg);
  const deaths = {};
  let firstBaby = null;
  for (let t = 0; t < opts.days * E.DAY; t++) {
    E.sim();
    const s = E.state();
    if (firstBaby === null && s.maxGen > 0) firstBaby = Math.floor(t / E.DAY) + 1;
    if (s.over) break;
  }
  const s = E.state();
  for (const l of s.logs) {
    const m = l.match(/died \(([^)]+)\)/);
    if (m) deaths[m[1]] = (deaths[m[1]] || 0) + 1;
  }
  const count = (sp) => s.ag.filter((a) => a.sp === sp).length;
  results.push({
    seed: opts.seed + w,
    day: Math.floor(s.tick / E.DAY) + 1,
    people: count(0),
    herbivores: count(1),
    predators: count(2),
    fish: count(3),
    humanGenerations: s.maxGen,
    firstBabyDay: firstBaby,
    fishCaught: s.fished,
    lessons: s.nLessons,
  });
}

if (args.json) {
  console.log(JSON.stringify({ options: opts, results }, null, 2));
} else {
  console.table(results);
  const avg = (k) => (results.reduce((t, r) => t + (r[k] || 0), 0) / results.length).toFixed(1);
  console.log(
    `People survived in ${results.filter((r) => r.people > 0).length}/${results.length} worlds, ` +
      `a baby was born in ${results.filter((r) => r.firstBabyDay).length}/${results.length}. ` +
      `Average fish caught ${avg('fishCaught')}, lessons ${avg('lessons')}.`
  );
}
