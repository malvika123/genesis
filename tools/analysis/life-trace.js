// Genesis — trace one world: births per adult female, spacing, babies lost and the next conception; what hungry and afraid hominins do (research log entry 19).
// Usage (from the genesis folder): node tools/analysis/life-trace.js SEED
// Copyright (c) 2026 Malvika Sen. MIT License.
const path = require('path'), root = process.cwd();
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const seed = Number(process.argv[2]);
const S = X.fromArgs({});
const E = createEngine({ brain: S.brain });
E.setSeed(seed); E.reset(S.cfg);
const TY = E.TY, A_EAT = E.A_EAT, A_SLEEP = E.A_SLEEP;
const fem = new Map(); // mother -> record
const rec = (a) => fem.get(a) || (fem.set(a, { births: [], conc: [], infantDeaths: [], adultSteps: 0, readySteps: 0, readyMaleNear: 0, found: !!a.found, ageStart: a.age / TY }), fem.get(a));
const seenKid = new Set(), kidMom = new Map();
const beh = { fed: {}, hungry: {}, starving: {}, afraid: {} }, nov = { fed: [0, 0], hungry: [0, 0], starving: [0, 0], afraid: [0, 0] };
const actName = (x) => (x === A_EAT ? 'eat' : x === A_SLEEP ? 'sleep' : x < 8 ? 'walk' : x === 8 ? 'stay' : x === 10 ? 'drink' : 'other');
const wasPreg = new Map();
for (let t = 0; t < S.days * E.DAY; t++) {
  E.sim();
  const st = E.state(), ppl = st.ag.filter((a) => a.sp === 0);
  for (const a of ppl) {
    if (!seenKid.has(a)) { seenKid.add(a); if (a.mom && !a.found && t > 0) { const r = rec(a.mom); r.births.push(t / TY); kidMom.set(a, { mom: a.mom, born: t }); } }
    if (a.sex && a.age >= a.S.smat) {
      const r = rec(a);
      r.adultSteps++;
      if (a.rd) { r.readySteps++; if (ppl.some((b) => !b.sex && b.rd && Math.abs(b.x - a.x) <= 1 && Math.abs(b.y - a.y) <= 1)) r.readyMaleNear++; }
      if (a.preg && !wasPreg.get(a)) r.conc.push(t / TY);
      wasPreg.set(a, !!a.preg);
    }
    if (!a.asleep && a.age > a.S.mat * 0.5) {
      const hu = 1 - a.e / 100, k = a.fear > 0.3 ? 'afraid' : hu > 0.7 ? 'starving' : hu > 0.5 ? 'hungry' : hu < 0.3 ? 'fed' : null;
      if (k) { beh[k][actName(a.act)] = (beh[k][actName(a.act)] || 0) + 1; nov[k][1]++; if (a.novel === st.tick) nov[k][0]++; }
    }
  }
  for (const [kid, info] of kidMom) if (kid.gone && !info.done) { info.done = 1; const ageY = (t - info.born) / TY; if (ageY < 4) rec(info.mom).infantDeaths.push({ at: t / TY, ageY: +ageY.toFixed(1), cause: kid.cause || (kid.e <= 0 ? 'hunger' : '?') }); }
  if (st.over) break;
}
const out = { seed, women: [] };
for (const [a, r] of fem) {
  if (!r.adultSteps) continue;
  const gaps = r.births.slice(1).map((b, i) => +(b - r.births[i]).toFixed(1));
  const afterDeath = r.infantDeaths.map((d) => { const next = r.conc.find((c) => c > d.at); return next === undefined ? null : +(next - d.at).toFixed(1); });
  out.women.push({ yearsAdult: +(r.adultSteps / TY).toFixed(1), births: r.births.length, gapsY: gaps, infantDeaths: r.infantDeaths, yearsToNextConceptionAfterInfantDeath: afterDeath, pctAdultTimeReady: +(100 * r.readySteps / r.adultSteps).toFixed(1), pctReadyWithReadyMaleNear: r.readySteps ? +(100 * r.readyMaleNear / r.readySteps).toFixed(1) : null });
}
const pct = (o) => { const n = Object.values(o).reduce((s, v) => s + v, 0); return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, +(100 * v / n).toFixed(1)])); };
out.behaviour = Object.fromEntries(Object.keys(beh).map((k) => [k, { pct: pct(beh[k]), novelPlacePer1000Steps: +(1000 * nov[k][0] / Math.max(1, nov[k][1])).toFixed(1), steps: nov[k][1] }]));
console.log(JSON.stringify(out));
