// Measuring only (entry 94): why do hunters kill more hominins with the satiety brake (entry 93)? For adult hunters: how much of the
// time they spend very hungry (energy bins), and, for attacks on hominins, how hungry and how full the hunter was before the attack,
// and the hominin's age and sleep; attacks on their own kind (only when starving, energy under 15: src/senses.js edible).
// Usage: node tools/analysis/hominin-attacks.js [--seeds 1-24] [--days 20] [experiment switches...]
// Copyright (c) 2026 Malvika Sen. MIT License.
const { engineSource } = require('../engine');
const X = require('../experiment-core');
const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const k = process.argv[i].replace(/^--/, ''), v = process.argv[i + 1];
  if (v !== undefined && !v.startsWith('--')) (args[k] = v), i++;
  else args[k] = true;
}
const S = X.fromArgs(args), seeds = X.seedList(String(args.seeds || '1-3')), days = +(args.days || 20);
const BINS = [15, 40, 80, 101], K = {};
const row = (n) => (K[n] = K[n] || { near: 0, nearOwn: 0, steps: [0, 0, 0, 0], att: 0, hom: { att: 0, hit: 0, e: 0, gut: 0, low: 0, child: 0, asleep: 0 }, own: 0 });
for (const seed of seeds) {
  const E = new Function(engineSource() + '\nreturn { setSeed, reset, sim, DAY, ag: () => ag, startLog: () => { HUNTLOG = []; }, log: () => HUNTLOG };')();
  E.setSeed(seed);
  E.reset(S.cfg);
  E.startLog();
  for (let t = 0; t < days * E.DAY; t++) {
    E.sim();
    const ag = E.ag(), hom = new Set(), hunt = new Map();
    for (const o of ag)
      if (!o.dead) {
        if (o.sp === 0) hom.add(o.x + ',' + o.y);
        if (o.sp === 2) hunt.set(o.x + ',' + o.y + ',' + o.k, (hunt.get(o.x + ',' + o.y + ',' + o.k) || 0) + 1);
      }
    const near = (a, test) => { for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (test(a.x + dx, a.y + dy, dx, dy)) return true; return false; };
    for (const a of ag)
      if (a.sp === 2 && !a.dead && a.age >= a.S.mat) {
        const r = row(a.S.n);
        r.steps[BINS.findIndex((b) => a.e < b)]++;
        if (near(a, (x, y) => hom.has(x + ',' + y))) r.near++;
        if (near(a, (x, y, dx, dy) => (hunt.get(x + ',' + y + ',' + a.k) || 0) > (dx === 0 && dy === 0 ? 1 : 0))) r.nearOwn++;
      }
  }
  for (const h of E.log()) {
    if (!h.adult) continue;
    const r = row(h.k);
    r.att++;
    if (h.prey === h.k) r.own++;
    if (h.prey === 'Hominin') {
      const m = r.hom;
      m.att++;
      if (h.hit) m.hit++;
      m.e += h.hungry;
      m.gut += h.gut;
      if (h.hungry < 40) m.low++;
      if (h.young) m.child++;
      if (h.asleep) m.asleep++;
    }
  }
}
const pct = (a, b) => (b ? ((100 * a) / b).toFixed(1) + '%' : '-');
console.log(`# ${seeds.length} worlds x ${days} days; adult hunters`);
console.log('kind | time within a square of a hominin | time within a square of its own kind | time at energy <15 / 15-40 / 40-80 / 80+ | attacks | on own kind | on hominins | kills of hominins | hunter energy at hominin attacks (mean) | of those, energy <40 | stomach fill (mean) | hominin young | hominin asleep');
for (const [n, r] of Object.entries(K)) {
  const tot = r.steps.reduce((u, v) => u + v, 0), m = r.hom;
  console.log([n, pct(r.near, tot), pct(r.nearOwn, tot), r.steps.map((v) => pct(v, tot)).join(' / '), r.att, r.own, m.att, m.hit, m.att ? (m.e / m.att).toFixed(0) : '-', pct(m.low, m.att), m.att ? (m.gut / m.att).toFixed(2) : '-', pct(m.child, m.att), pct(m.asleep, m.att)].join(' | '));
}
