// Measuring only (F1, detectable hunts; master plan 0.5): for each hunter kind, attacks, kills, success per attack, kills per hunter
// per real day, and meat eaten per hunter per real day beside its need (leopard 3.5-4.9 kg, hyena 3.8-4.0 kg a real day: ASSUMPTIONS).
// An attack = a hunter whose attack wait (kcd) was just set (it found prey in reach and tried); a kill = prey that died with it as
// the killer this step, counted by the world's kill counter and shared among the kinds that attacked that step. The default world, as tools/experiment.js runs it.
// Usage: node tools/analysis/hunt-measure.js [--seeds 1-3] [--days 20] [experiment switches...]
// Copyright (c) 2026 Malvika Sen. MIT License.
const path = require('path');
const { createEngine } = require('../engine');
const X = require('../experiment-core');
const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const k = process.argv[i].replace(/^--/, ''), v = process.argv[i + 1];
  if (v !== undefined && !v.startsWith('--')) (args[k] = v), i++;
  else args[k] = true;
}
const S = X.fromArgs(args), seeds = X.seedList(String(args.seeds || '1-3')), days = +(args.days || 20);
const T = {};
const row = (n) => (T[n] = T[n] || { steps: 0, attacks: 0, kills: 0, kg: 0 });
for (const seed of seeds) {
  const E = createEngine({ brain: S.brain });
  E.setSeed(seed);
  E.reset(S.cfg);
  const kg0 = { ...E.state().eatKg };
  const last = new Map();
  let kPrev = E.state().kills.reduce((u, v) => u + v, 0);
  for (let t = 0; t < days * E.DAY; t++) {
    E.sim();
    const ag = E.state().ag;
    const att = [];
    for (const a of ag) {
      if (a.sp !== 2) continue;
      const r = row(a.S.n);
      if (!a.dead) r.steps++;
      if (a.kcd === 4 && last.get(a) !== 4) (r.attacks++, att.push(a.S.n));
      last.set(a, a.kcd);
    }
    // kills by hunters this step (the world's own counter), shared among the kinds that attacked this step
    const kn = E.state().kills.reduce((u, v) => u + v, 0), k = kn - kPrev;
    kPrev = kn;
    if (k > 0 && att.length) for (const n of att) row(n).kills += k / att.length;
  }
  const kg1 = E.state().eatKg;
  for (const n of Object.keys(T)) T[n].kg += (kg1[n] || 0) - (kg0[n] || 0);
  for (const n of Object.keys(kg0)) delete kg0[n];
}
console.log(`# ${seeds.length} worlds x ${days} days; per hunter per real day (${'96'} steps)`);
console.log('kind | hunter-days | attacks | kills | success per attack | kills per hunter-day | meat eaten kg per hunter-day');
for (const [n, r] of Object.entries(T)) {
  const hd = r.steps / 96;
  console.log([n, hd.toFixed(0), r.attacks, r.kills.toFixed(0), r.attacks ? ((100 * r.kills) / r.attacks).toFixed(0) + '%' : '-', (r.kills / hd).toFixed(2), (r.kg / hd).toFixed(2)].join(' | '));
}
