// Genesis — the body ledger over many worlds (entry 123; docs/design/strength.md step a). Measuring only.
// Usage: node tools/analysis/ledger-measure.js SEEDS DAYS OUT_DIR [switches]      then      node tools/analysis/ledger-measure.js --summary OUT_DIR
// Per world, at the end: for every hominin that lived at least one day with the ledger on: its mean protein (g per kg of its weight per day), its mean effort (kcal a day), age class, sex, and the protein by food class.
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'), path = require('path');
if (process.argv[2] === '--summary') {
  const d = process.argv[3], W = fs.readdirSync(d).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')));
  const P = W.flatMap((w) => w.people), q = (a, p) => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.min(s.length - 1, Math.floor(s.length * p))] : NaN; }, f = (x, n = 2) => (isNaN(x) ? '-' : x.toFixed(n));
  console.log(`${W.length} worlds, ${P.length} hominins with at least one recorded day`);
  for (const [name, fn] of [['adult women', (p) => p.adult && p.sex === 1], ['adult men', (p) => p.adult && p.sex === 0], ['children (weaned, not adult)', (p) => !p.adult && !p.baby], ['babies (unweaned)', (p) => p.baby]]) {
    const L = P.filter(fn), pr = L.map((p) => p.prot), ef = L.map((p) => p.eff);
    console.log(`${name}: ${L.length} | protein g/kg/day: median ${f(q(pr, 0.5))}, 10th ${f(q(pr, 0.1))}, 90th ${f(q(pr, 0.9))}; share under 0.8: ${f((100 * pr.filter((x) => x < 0.8).length) / Math.max(1, pr.length), 0)}% | effort kcal/day: median ${f(q(ef, 0.5), 0)}`);
  }
  const by = {}; let tot = 0; for (const p of P) for (const k in p.by) { by[k] = (by[k] || 0) + p.by[k]; tot += p.by[k]; }
  console.log('share of all protein by food: ' + Object.entries(by).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' ' + f((100 * v) / tot, 0) + '%').join(' | '));
  process.exit(0);
}
const { createEngine } = require('../engine'), X = require('../experiment-core');
const [seedArg, daysArg, out, ...rest] = process.argv.slice(2), flags = { 'body-ledger': true };
for (let i = 0; i < rest.length; i++) { if (!rest[i].startsWith('--')) continue; const k = rest[i].slice(2); flags[k] = i + 1 < rest.length && !rest[i + 1].startsWith('--') ? (isNaN(+rest[i + 1]) ? rest[++i] : +rest[++i]) : true; }
const S = X.fromArgs(flags), seeds = X.seedList(seedArg), days = +daysArg;
fs.mkdirSync(out, { recursive: true });
for (const seed of seeds) {
  const E = createEngine({}); E.setSeed(seed); E.reset(S.cfg);
  const people = new Map();
  for (let t = 1; t <= days * E.DAY; t++) {
    E.sim();
    if (t % E.DAY === 0) for (const a of E.state().ag) if (a.sp === 0 && a.ledDays) people.set(a.id, { sex: a.sex ? 1 : 0, adult: a.age >= a.S.mat, baby: a.age < a.S.mat * a.S.wn, prot: a.ledProt / a.ledDays, eff: a.ledEff / a.ledDays, by: { ...(a.protBy || {}) }, days: a.ledDays });
  }
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify({ seed, days, people: [...people.values()] }));
  console.log('world', seed, 'done: hominins', people.size);
}
