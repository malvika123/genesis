// Genesis — how often each discovery is repeated, by how many, and how many of them female (entry 95; master plan step 0.6, F5).
// Reads an experiment table with the rep_X, who_X and whoF_X columns (made from 17 Nov 2026 on) and prints, per discovery:
// the worlds where it happened, the repeats per 1,000 hominin-life-years (a year is 3 simulated days, as in rates.js), the
// individuals per world (median and range), and the share of those individuals who were female, with a 95% Wilson interval
// (a hominin is born female with chance 1/2, so about 50% is what no difference looks like). The female share pools the
// individuals of every world; a hominin who did it in two worlds is two individuals, as worlds share no one.
// Usage: node tools/analysis/repeats.js TABLE.csv
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs');
const lines = fs.readFileSync(process.argv[2], 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));
const head = lines[0].split(','),
  rows = lines.slice(1).map((l) => Object.fromEntries(l.split(',').map((v, i) => [head[i], v])));
const keys = head.filter((h) => h.startsWith('rep_')).map((h) => h.slice(4));
if (!keys.length) {
  console.error('This table has no rep_ columns (made before 17 Nov 2026): run it again.');
  process.exit(1);
}
const DAYS_PER_YEAR = 3;
const lifeYears = rows.reduce((t, r) => t + (+r.hominin_days || 0), 0) / DAYS_PER_YEAR;
const median = (v) => {
  const s = [...v].sort((a, b) => a - b),
    m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
// Wilson score interval for a proportion k/n
const wilson = (k, n) => {
  if (!n) return ['', ''];
  const z = 1.96,
    p = k / n,
    d = 1 + (z * z) / n,
    c = (p + (z * z) / (2 * n)) / d,
    h = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / d;
  return [Math.round(100 * (c - h)), Math.round(100 * (c + h))];
};
console.log(`${rows.length} worlds, ${Math.round(lifeYears)} hominin-life-years`);
console.log('discovery | worlds | repeats | per 1,000 hominin-life-years | individuals per world: median (range) | individuals | female % (95% interval)');
for (const k of keys) {
  const n = rows.map((r) => +r['rep_' + k] || 0),
    who = rows.map((r) => +r['who_' + k] || 0),
    f = rows.reduce((t, r) => t + (+r['whoF_' + k] || 0), 0),
    W = who.reduce((t, v) => t + v, 0),
    reps = n.reduce((t, v) => t + v, 0),
    [lo, hi] = wilson(f, W);
  console.log(
    [
      k,
      n.filter((v) => v > 0).length + '/' + rows.length,
      reps,
      lifeYears ? ((1000 * reps) / lifeYears).toFixed(1) : '',
      `${median(who)} (${Math.min(...who)}–${Math.max(...who)})`,
      W,
      W ? `${Math.round((100 * f) / W)} (${lo}–${hi})` : '',
    ].join(' | ')
  );
}
