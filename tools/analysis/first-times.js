// Genesis — when did each discovery first happen, with more founders than without, in the same worlds (research log entry 36).
// Usage: node tools/analysis/first-times.js [folder with base25.csv, plus15.csv, plus55.csv]
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs');
const D = process.argv[2] || 'data/findings/36-community-size/';
const rd = (f) => { const L = fs.readFileSync(D + f, 'utf8').split('\n').filter((l) => l && l[0] !== '#'); const h = L[0].split(','); return L.slice(1).map((l) => { const v = l.split(','); const o = {}; h.forEach((k, i) => (o[k] = v[i] === '' ? null : Number(v[i]))); return o; }); };
const B = rd('base25.csv'), P = rd('plus15.csv'), Q = rd('plus55.csv');
function first(base, more, label, seeds) {
  const out = [];
  for (const k of ['setfire', 'brand', 'cooked', 'meat', 'hunt', 'rubfire', 'butcher']) {
    let e = 0, l = 0, n = 0;
    const d = [];
    for (const s of seeds) {
      const a = base.find((r) => r.seed === s), b = more.find((r) => r.seed === s);
      const x = a['day_' + k], y = b['day_' + k];
      if (x !== null && y !== null) { n++; d.push(y - x); if (y < x) e++; else if (y > x) l++; }
    }
    const m = d.length ? d.reduce((s, v) => s + v, 0) / d.length : NaN;
    out.push(k.padEnd(8) + ' both have it in ' + String(n).padEnd(2) + ' worlds: earlier with more founders ' + e + ', later ' + l + ', same day ' + (n - e - l) + ', mean change ' + (isNaN(m) ? '-' : (m >= 0 ? '+' : '') + m.toFixed(1)) + ' days');
  }
  console.log('== first time it happened, ' + label + '\n' + out.join('\n'));
}
first(B, P, '25 vs 40 founders (24 worlds)', [...Array(24)].map((_, i) => i + 1));
first(B, Q, '25 vs 80 founders (12 worlds)', [...Array(12)].map((_, i) => i + 1));
