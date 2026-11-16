// Measuring only: how rain, soil moisture and the hominins' foods change through the year around the band's home (master plan 0.4,
// the hungry season). Prints one row per twelfth of a year: rain, soil moisture, grass, fruit, roots, nuts (means within R squares).
// Usage: node tools/analysis/seasons-at-home.js [--seed 1] [--years 2] [--r 4] [--settle 0] [--shape]
// --settle N: run N years first, unmeasured (start-up drift). --shape: print only the rain's year as shares, averaged over the measured
// years, beside Uvinza's (data/reference/uvinza-rain.csv): months with under 2% of the year's rain, and the share of the wettest six
// running months. Shapes only (the world's rain has no real unit; hemispheres differ, so no calendar months are compared).
// Caution (Fable, 16 Nov): a squeezed month is 6 hours, always the same hours, so month is mixed with time of day.
// Copyright (c) 2026 Malvika Sen. MIT License.
const { engineSource } = require('../engine');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? +process.argv[i + 1] : d; };
const SEED = arg('seed', 1), YEARS = arg('years', 2), R = arg('r', 4), SETTLE = arg('settle', 0), SHAPE = process.argv.includes('--shape');
const E = new Function(engineSource() + '\nreturn { setSeed, reset, sim, TY, W, H, idx, home: () => BANDAT, wx: () => ({ RAIN, MOIST }), food: () => food, fruit: () => fruit, items: () => ({ ROOT, nut }), tick: () => tick, latOfRow };')();
E.setSeed(SEED);
E.reset({});
const [hx, hy] = E.home();
if (!SHAPE) console.log(`# seed ${SEED}, home square ${hx},${hy} (latitude ${E.latOfRow(hy).toFixed(1)}), means within ${R} squares`);
if (!SHAPE) console.log('year.month | rain | soil moisture | grass | fruit | roots | nuts');
const cells = [];
for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) if (hy + dy >= 0 && hy + dy < E.H) cells.push(E.idx(hx + dx, hy + dy));
const M = E.TY / 12;
let acc = null, n = 0;
const RM = new Array(12).fill(0);
for (let t = 0; t < SETTLE * E.TY; t++) E.sim();
for (let t = 0; t < YEARS * E.TY; t++) {
  E.sim();
  const { RAIN, MOIST } = E.wx(), F = E.food(), FR = E.fruit(), { ROOT, nut } = E.items();
  const v = [RAIN, MOIST, F, FR, ROOT, nut].map((A) => cells.reduce((s, i) => s + A[i], 0) / cells.length);
  acc = acc ? acc.map((s, k) => s + v[k]) : v; n++;
  RM[Math.floor((t % E.TY) / M)] += v[0];
  if ((t + 1) % M === 0) {
    if (!SHAPE) console.log(`${Math.floor(t / E.TY) + 1}.${String(Math.floor((t % E.TY) / M) + 1).padStart(2, '0')} | ` + acc.map((s, k) => (s / n).toFixed(k === 0 ? 5 : 3)).join(' | '));
    acc = null; n = 0;
  }
}
const shape = (m) => {
  const tot = m.reduce((a, b) => a + b, 0), sh = m.map((v) => v / tot);
  let best = 0;
  for (let k = 0; k < 12; k++) best = Math.max(best, [0, 1, 2, 3, 4, 5].reduce((u, j) => u + sh[(k + j) % 12], 0));
  return { sh, dry: sh.filter((v) => v < 0.02).length, wet6: best };
};
if (SHAPE) {
  const ref = require('fs').readFileSync(require('path').join(__dirname, '../../data/reference/uvinza-rain.csv'), 'utf8').split('\n').filter((l) => l && !l.startsWith('#')).slice(1).map((l) => l.split(',').slice(1).map(Number));
  const U = shape(new Array(12).fill(0).map((_, k) => ref.reduce((u, r) => u + r[k], 0))), S = shape(RM);
  console.log(`seed ${SEED} (lat ${E.latOfRow(hy).toFixed(0)}) | world: ${S.sh.map((v) => (100 * v).toFixed(1)).join(' ')} | months <2%: ${S.dry} | wettest 6 months: ${(100 * S.wet6).toFixed(0)}%`);
  console.log(`Uvinza           | ${U.sh.map((v) => (100 * v).toFixed(1)).join(' ')} | months <2%: ${U.dry} | wettest 6 months: ${(100 * U.wet6).toFixed(0)}%`);
}
