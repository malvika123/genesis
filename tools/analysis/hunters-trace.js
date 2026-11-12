// Genesis — trace the hunters of one world: numbers of each kind every 5 days, their deaths by cause, births, kills, starving (research log entry 24).
// Usage (from the genesis folder): node tools/analysis/hunters-trace.js SEED DAYS [ice] [old]  (without 'ice': the animals of East Africa)
// Copyright (c) 2026 Malvika Sen. MIT License.
const path = require('path'), root = process.cwd();
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const [seed, days, ice] = [Number(process.argv[2]), Number(process.argv[3]), process.argv[4] === 'ice'];
// today's defaults (the old flight rule was forced here for entry 24; pass 'old' as a fourth argument to get it back)
const old = process.argv[5] === 'old';
const S = X.fromArgs(Object.assign({ 'naive-founders': true }, ice ? {} : { 'africa-animals': true }, old ? { 'old-flight': true } : {}));
const E = createEngine({ brain: S.brain }); E.setSeed(seed); E.reset(S.cfg);
const seen = new Set(); const born = {};
const snap = () => { const c = {}; for (const a of E.state().ag) if (a.sp === 2) c[a.S.n] = (c[a.S.n] || 0) + 1; return JSON.stringify(c); };
const hunger = {}; let starveSteps = {};
console.log('day 0', snap());
for (let t = 0; t < days * E.DAY; t++) {
  E.sim();
  for (const a of E.state().ag) if (a.sp === 2) { if (!seen.has(a)) { if (t > 0) born[a.S.n] = (born[a.S.n] || 0) + 1; seen.add(a); } if (a.e < 20) starveSteps[a.S.n] = (starveSteps[a.S.n] || 0) + 1; }
  if ((t + 1) % (E.DAY * 5) === 0) console.log('day', (t + 1) / E.DAY, snap());
}
const d = E.state().deaths, out = {};
for (const k in d) if (/^(Hyena|Leopard|Sabre-tooth|Wolf|Big cat|Bear):/.test(k)) out[k] = d[k];
console.log('hunter deaths', JSON.stringify(out));
console.log('hunter births', JSON.stringify(born), 'kills by hunters', JSON.stringify(E.state().kills), 'hunter steps starving (e<20)', JSON.stringify(starveSteps));
