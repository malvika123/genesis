// node fair.js  — the fair community-size test: same worlds, more founders. Paired by seed.
const fs = require('fs');
const D = process.argv[2] || 'data/findings/36-community-size/';
const rd = (f) => { const L = fs.readFileSync(D + f, 'utf8').split('\n').filter((l) => l && l[0] !== '#'); const h = L[0].split(','); return L.slice(1).map((l) => { const v = l.split(','); const o = {}; h.forEach((k, i) => (o[k] = v[i] === '' ? null : Number(v[i]))); return o; }); };
const T = { 3: 4.3, 4: 3.18, 5: 2.78, 6: 2.57, 7: 2.45, 8: 2.36, 9: 2.31, 10: 2.26, 11: 2.23, 12: 2.2, 13: 2.18, 14: 2.16, 15: 2.14, 16: 2.13, 17: 2.12, 18: 2.11, 19: 2.1, 20: 2.09, 21: 2.09, 22: 2.08, 23: 2.07, 24: 2.07 };
const m = (x) => x.reduce((s, v) => s + v, 0) / x.length, sd = (x) => { const u = m(x); return Math.sqrt(x.reduce((s, v) => s + (v - u) ** 2, 0) / (x.length - 1)); };
const ci = (d) => (T[d.length] || 2) * sd(d) / Math.sqrt(d.length);
const deaths = (r) => Object.keys(r).filter((k) => k.startsWith('died_')).reduce((s, k) => s + r[k], 0);
const HARD = ['butcher', 'hunt', 'meat', 'cooked', 'brand', 'setfire', 'fed', 'kept', 'madefire', 'rubfire', 'shelter'];
const has = (r, k) => r['day_' + k] !== null && r['day_' + k] !== undefined;
function compare(baseFile, moreFile, n0, n1, seeds) {
  const B = rd(baseFile).filter((r) => seeds.includes(r.seed)), M = rd(moreFile).filter((r) => seeds.includes(r.seed));
  const pair = B.map((b) => [b, M.find((r) => r.seed === b.seed)]).filter((p) => p[1]);
  const out = [];
  const row = (label, f, fmt = (x) => x.toFixed(2)) => { const a = pair.map((p) => f(p[0])), b = pair.map((p) => f(p[1])), d = b.map((v, i) => v - a[i]); out.push(`${label.padEnd(44)} ${String(fmt(m(a))).padEnd(8)} ${String(fmt(m(b))).padEnd(8)} diff ${m(d) >= 0 ? '+' : ''}${fmt(m(d))} [${fmt(m(d) - ci(d))}, ${fmt(m(d) + ci(d))}]  more in ${d.filter((v) => v > 0).length}, fewer in ${d.filter((v) => v < 0).length}`); };
  out.push(`== ${n0} founders vs ${n1}: ${pair.length} identical worlds (seeds ${pair.map((p) => p[0].seed).join(',')})`);
  out.push(''.padEnd(44) + String(n0 + ' fnd').padEnd(9) + String(n1 + ' fnd').padEnd(9));
  row('alive at the end', (r) => r.people_alive, (x) => x.toFixed(1));
  row('alive per founder (survival)', (r, i) => r.people_alive / (r === pair[0]?.[0] ? n0 : r.people_alive > 0 || true ? (pair.some((p) => p[0] === r) ? n0 : n1) : n1), (x) => x.toFixed(2));
  row('births', (r) => r.people_alive + deaths(r) - (pair.some((p) => p[0] === r) ? n0 : n1), (x) => x.toFixed(1));
  row('deaths from hunger', (r) => r.died_hunger, (x) => x.toFixed(1));
  row('deaths killed by predators', (r) => r.died_killed_by_a_predator, (x) => x.toFixed(1));
  row('deaths from fire', (r) => r.died_burned, (x) => x.toFixed(1));
  row('deaths by drowning', (r) => r.died_drowned, (x) => x.toFixed(1));
  row('different hard discoveries per world (of 11)', (r) => HARD.filter((k) => has(r, k)).length, (x) => x.toFixed(2));
  for (const k of ['setfire', 'meat', 'hunt', 'butcher', 'cooked', 'brand', 'madefire', 'rubfire', 'kept', 'shelter']) {
    const a = pair.filter((p) => has(p[0], k)).length, b = pair.filter((p) => has(p[1], k)).length, onlyMore = pair.filter((p) => !has(p[0], k) && has(p[1], k)).length, onlyBase = pair.filter((p) => has(p[0], k) && !has(p[1], k)).length;
    out.push(`  ${k.padEnd(10)} worlds with it: ${a}/${pair.length} -> ${b}/${pair.length}   (only with more founders ${onlyMore}, only with fewer ${onlyBase})`);
  }
  out.push(`  died out: ${pair.filter((p) => !p[0].people_alive).length} -> ${pair.filter((p) => !p[1].people_alive).length}`);
  return out.join('\n');
}
const a = [...Array(24)].map((_, i) => i + 1), b = [...Array(12)].map((_, i) => i + 1);
console.log(compare('base25.csv', 'plus15.csv', 25, 40, a));
if (fs.existsSync(D + 'plus55.csv')) { console.log('\n' + compare('base25.csv', 'plus55.csv', 25, 80, b)); console.log('\n' + compare('plus15.csv', 'plus55.csv', 40, 80, b)); }
