// Did any inherited trait move further than chance? Compares each trait's change between two tables of the same worlds (e.g. day 1
// and day 100) with the change of the neutral marker gene, which does nothing (entry 86; master plan, test E1).
// Usage: node tools/analysis/neutral-compare.js START.csv END.csv
// For each trait: worlds compared, how many went up / down, the mean change and its spread across worlds. A trait is a candidate
// for selection only if it moves further than the marker AND the same way in clearly more worlds; with few generations, expect none.
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs');
const read = (f) => {
  const rows = fs.readFileSync(f, 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));
  const head = rows[0].split(',');
  const bySeed = {};
  for (const r of rows.slice(1)) {
    const c = r.split(',');
    bySeed[c[head.indexOf('seed')]] = Object.fromEntries(head.map((h, i) => [h, c[i]]));
  }
  return bySeed;
};
const [A, B] = [read(process.argv[2]), read(process.argv[3])];
const TRAITS = ['neutral_marker', 'learns_from_others', 'copies_successful', 'follows_crowd', 'cares_for_others', 'vocal_control', 'point_urge', 'share_joy'];
console.log('trait | worlds | up | down | mean change | sd across worlds | mean |change|');
for (const t of TRAITS) {
  const d = [];
  for (const s of Object.keys(A)) {
    const x = A[s][t], y = B[s] && B[s][t];
    if (x !== '' && x !== undefined && y !== '' && y !== undefined && +B[s].people_alive > 0) d.push(+y - +x);
  }
  if (!d.length) continue;
  const m = d.reduce((a, b) => a + b, 0) / d.length,
    sd = Math.sqrt(d.reduce((a, b) => a + (b - m) ** 2, 0) / Math.max(1, d.length - 1)),
    ab = d.reduce((a, b) => a + Math.abs(b), 0) / d.length;
  console.log([t, d.length, d.filter((v) => v > 0).length, d.filter((v) => v < 0).length, m.toFixed(3), sd.toFixed(3), ab.toFixed(3)].join(' | '));
}
console.log('(worlds where the band died out are left out; a trait is read only beside the marker)');
