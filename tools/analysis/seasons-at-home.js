// Measuring only: how rain, soil moisture and the hominins' foods change through the year around the band's home (master plan 0.4,
// the hungry season). Prints one row per twelfth of a year: rain, soil moisture, grass, fruit, roots, nuts (means within R squares).
// Usage: node tools/analysis/seasons-at-home.js [--seed 1] [--years 2] [--r 4]
// Copyright (c) 2026 Malvika Sen. MIT License.
const { engineSource } = require('../engine');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? +process.argv[i + 1] : d; };
const SEED = arg('seed', 1), YEARS = arg('years', 2), R = arg('r', 4);
const E = new Function(engineSource() + '\nreturn { setSeed, reset, sim, TY, W, H, idx, home: () => BANDAT, wx: () => ({ RAIN, MOIST }), food: () => food, fruit: () => fruit, items: () => ({ ROOT, nut }), tick: () => tick, latOfRow };')();
E.setSeed(SEED);
E.reset({});
const [hx, hy] = E.home();
console.log(`# seed ${SEED}, home square ${hx},${hy} (latitude ${E.latOfRow(hy).toFixed(1)}), means within ${R} squares`);
console.log('year.month | rain | soil moisture | grass | fruit | roots | nuts');
const cells = [];
for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) if (hy + dy >= 0 && hy + dy < E.H) cells.push(E.idx(hx + dx, hy + dy));
const M = E.TY / 12;
let acc = null, n = 0;
for (let t = 0; t < YEARS * E.TY; t++) {
  E.sim();
  const { RAIN, MOIST } = E.wx(), F = E.food(), FR = E.fruit(), { ROOT, nut } = E.items();
  const v = [RAIN, MOIST, F, FR, ROOT, nut].map((A) => cells.reduce((s, i) => s + A[i], 0) / cells.length);
  acc = acc ? acc.map((s, k) => s + v[k]) : v; n++;
  if ((t + 1) % M === 0) {
    console.log(`${Math.floor(t / E.TY) + 1}.${String(Math.floor((t % E.TY) / M) + 1).padStart(2, '0')} | ` + acc.map((s, k) => (s / n).toFixed(k === 0 ? 5 : 3)).join(' | '));
    acc = null; n = 0;
  }
}
