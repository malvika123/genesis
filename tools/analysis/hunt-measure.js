// Measuring only (F1, detectable hunts; master plan 0.5; Fable's review of 16 Nov): for each hunter kind — adults only — attacks,
// kills, success per attack, kills and meat eaten per adult hunter per real day beside its need, and what was attacked: asleep, young,
// eating, hominins; kills by wounds (the hunter swallows nothing); the prey mix and kg per kill. Uses the world's attack record
// (HUNTLOG in src/state.js; changes nothing). The default world, as tools/experiment.js runs it.
// Usage: node tools/analysis/hunt-measure.js [--seeds 1-3] [--days 20] [experiment switches...]
// Copyright (c) 2026 Malvika Sen. MIT License.
const { engineSource } = require('../engine');
const X = require('../experiment-core');
const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const k = process.argv[i].replace(/^--/, ''),
    v = process.argv[i + 1];
  if (v !== undefined && !v.startsWith('--')) (args[k] = v), i++;
  else args[k] = true;
}
const S = X.fromArgs(args),
  seeds = X.seedList(String(args.seeds || '1-3')),
  days = +(args.days || 20);
const T = {},
  row = (n) => (T[n] = T[n] || { adultSteps: 0, allSteps: 0, att: 0, hit: 0, wound: 0, kg: 0, asleep: 0, young: 0, eating: 0, hom: 0, hitKg: 0, mix: {}, eatKg: 0, fed: 0, eSum: 0 });
for (const seed of seeds) {
  const E = new Function(engineSource() + '\nreturn { setSeed, reset, sim, DAY, ag: () => ag, eatKg: () => eatKg, startLog: () => { HUNTLOG = []; }, log: () => HUNTLOG };')();
  E.setSeed(seed);
  E.reset(S.cfg);
  E.startLog();
  const kg0 = { ...E.eatKg() };
  for (let t = 0; t < days * E.DAY; t++) {
    E.sim();
    for (const a of E.ag())
      if (a.sp === 2 && !a.dead) {
        const r = row(a.S.n);
        r.allSteps++;
        if (a.age >= a.S.mat) r.adultSteps++;
      }
  }
  for (const h of E.log()) {
    if (!h.adult) continue;
    const r = row(h.k);
    r.att++;
    if (h.asleep) r.asleep++;
    if (h.young) r.young++;
    if (h.eating) r.eating++;
    if (h.prey === 'Hominin') r.hom++;
    r.eSum += h.hungry;
    if (h.hungry >= 80) r.fed++;
    if (h.hit) (r.hit++, (r.hitKg += h.kg), (r.mix[h.prey] = (r.mix[h.prey] || 0) + 1));
    if (h.wound) r.wound++;
  }
  const kg1 = E.eatKg();
  for (const n of Object.keys(T)) T[n].eatKg += (kg1[n] || 0) - (kg0[n] || 0);
}
const pct = (a, b) => (b ? ((100 * a) / b).toFixed(0) + '%' : '-');
console.log(`# ${seeds.length} worlds x ${days} days; attacks by adult hunters; per adult hunter per real day (96 steps)`);
console.log('kind | adult hunter-days | attacks | success | kills by wounds | kills per adult-day | meat eaten per hunter-day (all ages) | on asleep | on young | on eating | on hominins | kg per clean kill (whole animal) | prey mix of clean kills | energy at attack (mean) | attacks when well fed (energy 80+) | hunter-days all ages | meat per adult-day if adults ate it all');
for (const [n, r] of Object.entries(T)) {
  const ad = r.adultSteps / 96,
    all = r.allSteps / 96;
  console.log(
    [n, ad.toFixed(0), r.att, pct(r.hit, r.att), r.wound, ((r.hit + r.wound) / ad).toFixed(2), (r.eatKg / all).toFixed(2), pct(r.asleep, r.att), pct(r.young, r.att), pct(r.eating, r.att), pct(r.hom, r.att), r.hit ? (r.hitKg / r.hit).toFixed(1) : '-', Object.entries(r.mix).sort((a, b) => b[1] - a[1]).map(([p, c]) => p + ' ' + c).join(', '), r.att ? (r.eSum / r.att).toFixed(0) : '-', pct(r.fed, r.att), all.toFixed(0), (r.eatKg / ad).toFixed(2)].join(' | ')
  );
}
console.log('(meat eaten is the world ledger by kind, all ages: it cannot be split by age)');
