// Genesis — discoveries as rates (Fable's review of fire and scale, 14 Nov 2026; the owner chose "report rates").
// A small band over a few decades can never reach the real record's exposure (tens of thousands of hominins over hundreds of
// thousands of years), so "did it happen" says little. This turns an experiment table into the rate of each first discovery per
// 1,000 hominin-days and per 1,000 hominin-life-years (a year is 3 simulated days), with a 95% upper bound when it never happened
// (3 ÷ exposure, the rule of three). Exposure for a world counts hominin-days up to the first time, or all of them if never.
// Usage: node tools/analysis/rates.js TABLE.csv
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs');
const lines = fs.readFileSync(process.argv[2], 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));
const head = lines[0].split(','),
  rows = lines.slice(1).map((l) => Object.fromEntries(l.split(',').map((v, i) => [head[i], v])));
if (!head.includes('hominin_days')) {
  console.error('This table has no hominin_days column (made before 14 Nov 2026): run it again.');
  process.exit(1);
}
const DAYS_PER_YEAR = 3;
const out = [];
for (const h of head.filter((h) => h.startsWith('day_'))) {
  const k = h.slice(4);
  let n = 0,
    exp = 0;
  for (const r of rows) {
    if (r['day_' + k] !== '') {
      n++;
      exp += +r['hd_' + k] || 0;
    } else exp += +r.hominin_days || 0;
  }
  const perDay = exp ? (1000 * n) / exp : NaN,
    up = exp ? (1000 * 3) / exp : NaN;
  out.push([k, n, rows.length, Math.round(exp), n ? perDay.toFixed(3) : '0 (< ' + up.toFixed(3) + ')', n ? (perDay * DAYS_PER_YEAR).toFixed(2) : '0 (< ' + (up * DAYS_PER_YEAR).toFixed(2) + ')']);
}
console.log('discovery | worlds | of | hominin-days at risk | firsts per 1,000 hominin-days | per 1,000 hominin-life-years');
for (const o of out) console.log(o.join(' | '));
