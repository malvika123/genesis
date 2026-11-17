// Genesis — two experiment tables side by side (entry 97): people, deaths by cause per 1,000 hominin-life-years, and the repeats of each
// discovery per 1,000 hominin-life-years with the female share of those who did it. The tables should be the same seeds and days.
// Usage: node tools/analysis/compare-arms.js OLD.csv NEW.csv
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs');
const load = (f) => {
  const L = fs.readFileSync(f, 'utf8').split('\n').filter((l) => l && !l.startsWith('#')),
    h = L[0].split(',');
  return L.slice(1).map((l) => Object.fromEntries(l.split(',').map((v, i) => [h[i], v])));
};
const A = load(process.argv[2]),
  B = load(process.argv[3]);
const S = (R, c) => R.reduce((t, r) => t + (+r[c] || 0), 0),
  mean = (R, c) => S(R, c) / R.length,
  ly = (R) => S(R, 'hominin_days') / 3; // a year is 3 simulated days
console.log('worlds', A.length, B.length);
console.log('hominin-days a world', mean(A, 'hominin_days').toFixed(0), '→', mean(B, 'hominin_days').toFixed(0), '; people alive at the end', mean(A, 'people_alive').toFixed(1), '→', mean(B, 'people_alive').toFixed(1));
if (A.length === B.length) {
  const d = A.map((r, i) => +B[i].hominin_days - +r.hominin_days),
    m = d.reduce((a, b) => a + b, 0) / d.length,
    sd = Math.sqrt(d.reduce((t, x) => t + (x - m) ** 2, 0) / (d.length - 1));
  console.log('hominin-days, paired by seed: difference', m.toFixed(0), 'standard error', (sd / Math.sqrt(d.length)).toFixed(0), '; lower in', d.filter((x) => x < 0).length, 'of', d.length, 'worlds');
}
console.log('worlds where everyone died', A.filter((r) => +r.people_alive === 0).length, '→', B.filter((r) => +r.people_alive === 0).length);
console.log('cause | deaths | per 1,000 hominin-life-years');
for (const c of Object.keys(A[0]).filter((c) => c.startsWith('died_'))) {
  const a = S(A, c),
    b = S(B, c);
  if (a || b) console.log(c.slice(5), a, '→', b, '|', ((1000 * a) / ly(A)).toFixed(1), '→', ((1000 * b) / ly(B)).toFixed(1));
}
console.log('plant-eaters', mean(A, 'plant_eaters').toFixed(0), '→', mean(B, 'plant_eaters').toFixed(0), '; hunters', mean(A, 'hunters').toFixed(1), '→', mean(B, 'hunters').toFixed(1), '; fish', mean(A, 'fish').toFixed(1), '→', mean(B, 'fish').toFixed(1));
console.log('discovery | repeats per 1,000 hominin-life-years | female % of those who did it');
for (const k of Object.keys(A[0]).filter((c) => c.startsWith('rep_')).map((c) => c.slice(4))) {
  const f = (R) => [((1000 * S(R, 'rep_' + k)) / ly(R)).toFixed(0), S(R, 'who_' + k) ? Math.round((100 * S(R, 'whoF_' + k)) / S(R, 'who_' + k)) : '-'];
  const a = f(A),
    b = f(B);
  if (a[0] !== '0' || b[0] !== '0') console.log(k, '|', a[0], '→', b[0], '|', a[1], '→', b[1]);
}
