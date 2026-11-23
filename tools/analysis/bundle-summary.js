// Genesis — read the output directories of tools/analysis/bundle-run.js (entry 126): survival, diet and body, side by side.
// Usage: node tools/analysis/bundle-summary.js DIR [DIR...]
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'), path = require('path');
const q = (a, p) => { if (!a.length) return NaN; const s = a.slice().sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * p))]; }, f = (x, n = 1) => (x === undefined || isNaN(x) ? '-' : x.toFixed(n));
for (const d of process.argv.slice(2)) {
  const W = fs.readdirSync(d).filter((x) => x.endsWith('.json')).map((x) => JSON.parse(fs.readFileSync(path.join(d, x), 'utf8')));
  let hy = 0, b = 0, dd = 0, em = 0; const bc = {}, fd = {}, pr = {}; let ft = 0, pt = 0; const ap = [], cp = [], B = [];
  for (const w of W) {
    hy += w.homininYears; b += w.births; if (!w.alive) em++;
    for (const c in w.byCause) { bc[c] = (bc[c] || 0) + w.byCause[c]; dd += w.byCause[c]; }
    if (w.feed) { for (const k in w.feed.f) { fd[k] = (fd[k] || 0) + w.feed.f[k]; ft += w.feed.f[k]; } for (const k in w.feed.p) { pr[k] = (pr[k] || 0) + w.feed.p[k]; pt += w.feed.p[k]; } ap.push(...w.feed.adultProt); cp.push(...w.feed.childProt); }
    if (w.body) B.push(...w.body);
  }
  const mean = (y) => W.reduce((t, w) => t + (w.series.length > y ? w.series[y] : 0), 0) / W.length;
  console.log(`\n== ${d}: ${W.length} worlds | emptied ${em} | births ${f(1000 * b / hy)} deaths ${f(1000 * dd / hy)} per 1,000 hominin-years | net ${f(100 * (b - dd) / hy, 2)}% a year | mean people at year 0/10/20/32: ${[0, 10, 20, 32].map((y) => f(mean(y), 0)).join('/')}`);
  console.log(' deaths: ' + Object.entries(bc).sort((x, y) => y[1] - x[1]).map(([c, k]) => c + ' ' + f(1000 * k / hy)).join(' | '));
  if (ft) console.log(' feeding steps: ' + Object.entries(fd).sort((x, y) => y[1] - x[1]).map(([k, v]) => k + ' ' + f(100 * v / ft, 0) + '%').join(' | ') + `\n protein by food: ` + Object.entries(pr).sort((x, y) => y[1] - x[1]).map(([k, v]) => k + ' ' + f(100 * v / pt, 0) + '%').join(' | ') + ` | protein g/kg/day: adults ${f(q(ap, 0.5), 2)}, weaned children ${f(q(cp, 0.5), 2)}`);
  if (B.length) for (const [name, fn] of [['adult women', (p) => p.age >= 14 && p.sex === 1], ['adult men', (p) => p.age >= 15 && p.sex === 0], ['juveniles 5-10', (p) => p.age >= 5 && p.age < 10], ['children 1-5', (p) => p.age >= 1 && p.age < 5]]) {
    const L = B.filter(fn); if (!L.length) continue;
    const gr = L.map((p) => Math.min(p.gp, 16) / Math.max(0.01, Math.min(p.age, 16)));
    console.log(` ${name} (${L.length}): kg ${f(q(L.map((p) => p.kg), 0.5))} (10th ${f(q(L.map((p) => p.kg), 0.1))}) | growth delivered median ${f(100 * q(gr, 0.5), 0)}%, 10th ${f(100 * q(gr, 0.1), 0)}% | muscle ${f(q(L.map((p) => p.msc), 0.5), 2)} | strength ${f(q(L.map((p) => p.str), 0.5), 2)}`);
  }
}
