// Genesis — the body model across worlds (entry 125). Measuring only.
// Usage: node tools/analysis/body-measure.js SEEDS DAYS OUT_DIR [switches]     then     node tools/analysis/body-measure.js --summary OUT_DIR
// At the end of each world, for every living hominin: age, sex, weight, how far along its growth curve it is (progress against age), supply factor, muscle share of reference, muscle kg, strength, inherited size and muscle potential.
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'), path = require('path');
if (process.argv[2] === '--summary') {
  const d = process.argv[3], W = fs.readdirSync(d).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')));
  const P = W.flatMap((w) => w.people), q = (a, p) => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.min(s.length - 1, Math.floor(s.length * p))] : NaN; }, f = (x, n = 1) => (isNaN(x) ? '-' : x.toFixed(n));
  console.log(`${W.length} worlds, ${P.length} living hominins at the end`);
  for (const [name, fn] of [['adult women', (p) => p.age >= 14 && p.sex === 1], ['adult men', (p) => p.age >= 15 && p.sex === 0], ['juveniles 5-10 y', (p) => p.age >= 5 && p.age < 10], ['children under 5', (p) => p.age < 5 && p.age >= 1]]) {
    const L = P.filter(fn); if (!L.length) { console.log(name + ': none'); continue; }
    console.log(`${name} (${L.length}): weight kg median ${f(q(L.map((p) => p.kg), 0.5))} (10th ${f(q(L.map((p) => p.kg), 0.1))}, 90th ${f(q(L.map((p) => p.kg), 0.9))}) | growth delivered (progress/age) median ${f(100 * q(L.map((p) => Math.min(p.gp, 16) / Math.max(0.01, Math.min(p.age, 16))), 0.5), 0)}%, 10th ${f(100 * q(L.map((p) => Math.min(p.gp, 16) / Math.max(0.01, Math.min(p.age, 16))), 0.1), 0)}% | supply median ${f(q(L.map((p) => p.supply), 0.5), 2)} | muscle share of reference ${f(q(L.map((p) => p.mf), 0.5), 2)} | strength median ${f(q(L.map((p) => p.str), 0.5), 2)}`);
  }
  const A = P.filter((p) => p.age >= 14); const sm = A.filter((p) => p.sex === 0).map((p) => p.str), sf = A.filter((p) => p.sex === 1).map((p) => p.str);
  console.log(`adult strength: men median ${f(q(sm, 0.5), 2)}, women ${f(q(sf, 0.5), 2)}; men over women ${f(q(sm, 0.5) / q(sf, 0.5), 2)}`);
  process.exit(0);
}
const { createEngine } = require('../engine'), X = require('../experiment-core');
const [seedArg, daysArg, out, ...rest] = process.argv.slice(2), flags = { 'body-model': true };
for (let i = 0; i < rest.length; i++) { if (!rest[i].startsWith('--')) continue; const k = rest[i].slice(2); flags[k] = i + 1 < rest.length && !rest[i + 1].startsWith('--') ? (isNaN(+rest[i + 1]) ? rest[++i] : +rest[++i]) : true; }
const S = X.fromArgs(flags), seeds = X.seedList(seedArg), days = +daysArg;
fs.mkdirSync(out, { recursive: true });
for (const seed of seeds) {
  const E = createEngine({}); E.setSeed(seed); E.reset(S.cfg);
  for (let t = 1; t <= days * E.DAY; t++) E.sim();
  const TY = E.TY, people = E.state().ag.filter((a) => a.sp === 0).map((a) => ({ age: a.age / TY, sex: a.sex ? 1 : 0, kg: E.body(a).kg, gp: (a.gp ?? a.age) / TY, supply: a.supply ?? 1, mf: a.msc ?? 1, str: E.muscle(a).strength, sz: a.g.sz ?? 1, st: a.g.st ?? 1 }));
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify({ seed, days, people }));
  console.log('world', seed, 'done: hominins', people.length);
}
