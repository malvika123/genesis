// Genesis — do later generations differ, and why? For every hominin (or person) ever born in one world: its inborn
// traits, by generation (evolution would shift these); and for those alive at the end, how well they do on the
// world's standard tests of what they have learned (culture would raise these without any change in genes).
// Usage (from the genesis folder): node tools/analysis/generations.js SEED DAYS [more experiment switches, e.g. --africa-animals]
// Copyright (c) 2026 Malvika Sen. MIT License.
const path = require('path'),
  root = process.cwd();
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const [seed, days] = [Number(process.argv[2]), Number(process.argv[3])];
const flags = {};
for (const a of process.argv.slice(4)) if (a.startsWith('--')) flags[a.slice(2)] = true;
const S = X.fromArgs(flags);
const E = createEngine({ brain: S.brain });
E.setSeed(seed);
E.reset(S.cfg);
// inborn traits (the genes, g): brain size it can grow, learning rate, curiosity, learning from others, voice control,
// urge to point, joy in shared attention, care for others' young
const TRAITS = { bs: 'brain size', lr: 'learning rate', c: 'curiosity', im: 'learns from others', vl: 'voice control', pg: 'urge to point', sh: 'shared attention', al: 'care for others’ young' };
const seen = new Set(),
  byGen = {};
const note = (a) => {
  if (seen.has(a)) return;
  seen.add(a);
  const g = a.gen || 0,
    G = (byGen[g] = byGen[g] || { n: 0, sum: {} });
  G.n++;
  for (const k in TRAITS) G.sum[k] = (G.sum[k] || 0) + (a.g[k] ?? 0);
};
for (let t = 0; t < days * E.DAY; t++) {
  E.sim();
  for (const a of E.state().ag) if (a.sp === 0) note(a);
  if (E.state().over) break;
}
const out = { seed, days, flags, generations: {}, livingTestScoreByGeneration: {} };
for (const g of Object.keys(byGen).sort((x, y) => x - y)) {
  const G = byGen[g],
    r = { born: G.n };
  for (const k in TRAITS) r[TRAITS[k]] = +(G.sum[k] / G.n).toFixed(3);
  out.generations[g] = r;
}
const live = {};
for (const a of E.state().ag)
  if (a.sp === 0 && a.age >= a.S.mat) {
    const g = a.gen || 0;
    (live[g] = live[g] || []).push(E.testScore(a));
  }
for (const g in live) out.livingTestScoreByGeneration[g] = { adults: live[g].length, meanScore: +(live[g].reduce((s, v) => s + v, 0) / live[g].length).toFixed(3) };
console.log(JSON.stringify(out, null, 1));
