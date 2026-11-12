// Genesis — paired comparison of two experiment CSVs (the same seeds, one change): means, the paired difference with its 95% range,
// and in how many worlds each was higher. Used for the research log entries 20 onward.
// Usage: node tools/analysis/compare-runs.js BEFORE.csv AFTER.csv [labelBefore labelAfter]
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs');
const read = (f) => { const L = fs.readFileSync(f, 'utf8').split('\n').filter((l) => l && l[0] !== '#'); const h = L[0].split(','); return L.slice(1).map((l) => { const v = l.split(','); const o = {}; h.forEach((k, i) => (o[k] = v[i] === '' ? null : Number(v[i]))); return o; }); };
const [fa, fb, la = 'A', lb = 'B'] = process.argv.slice(2);
const A = read(fa), B = read(fb);
const m = (x) => x.reduce((s, v) => s + v, 0) / x.length, sd = (x) => { const u = m(x); return Math.sqrt(x.reduce((s, v) => s + (v - u) ** 2, 0) / (x.length - 1)); };
const T = { 2: 12.71, 3: 4.30, 4: 3.18, 5: 2.78, 6: 2.57, 7: 2.45, 8: 2.36, 9: 2.31, 10: 2.26, 11: 2.23, 12: 2.20, 13: 2.18 };
const cols = ['people_alive', 'generations', 'plant_eaters', 'hunters', 'died_hunger', 'died_thirst', 'died_killed_by_a_predator', 'died_drowned', 'died_burned', 'died_its_wounds', 'died_old_age', 'died_giving_birth'];
const seeds = A.map((r) => r.seed).filter((s) => B.some((r) => r.seed === s));
console.log(`${seeds.length} paired worlds (seeds ${seeds.join(',')})`);
const pa = seeds.map((s) => A.find((r) => r.seed === s)), pb = seeds.map((s) => B.find((r) => r.seed === s));
console.log('per seed alive', la, pa.map((r) => r.people_alive).join(' '), '|', lb, pb.map((r) => r.people_alive).join(' '));
console.log(`died out: ${la} ${pa.filter((r) => !r.people_alive).length}, ${lb} ${pb.filter((r) => !r.people_alive).length}`);
for (const c of cols) {
  const a = pa.map((r) => r[c]), b = pb.map((r) => r[c]), d = b.map((v, i) => v - a[i]);
  const ci = (T[d.length] || 2) * sd(d) / Math.sqrt(d.length);
  const fmt = (x) => (c.startsWith('died') ? `sum ${x.reduce((s, v) => s + v, 0)}` : `${m(x).toFixed(1)} ± ${sd(x).toFixed(1)}`);
  console.log(`${c.padEnd(28)} ${la}: ${fmt(a).padEnd(14)} ${lb}: ${fmt(b).padEnd(14)} diff ${m(d).toFixed(2)} [${(m(d) - ci).toFixed(2)}, ${(m(d) + ci).toFixed(2)}]  ${lb} higher in ${d.filter((v) => v > 0).length}, lower in ${d.filter((v) => v < 0).length}`);
}
