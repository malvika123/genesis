// Genesis — trace one experiment world: where early hominins spend their time, how often they eat leaves,
// and, for every death by fire, when and where it happened and what the victim was doing (research log entry 18).
// Usage (from the genesis folder): node tools/analysis/fire-trace.js SEED [leaves|noleaves]
// Copyright (c) 2026 Malvika Sen. MIT License.
const path = require('path'), root = process.cwd();
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const [seed, mode] = [Number(process.argv[2]), process.argv[3]];
const S = X.fromArgs(mode === 'noleaves' ? { 'no-leaves': true } : {});
const E = createEngine({ brain: S.brain });
E.setSeed(seed); E.reset(S.cfg);
const F = E.forest(), I = E.items(), R = E.fire(), st0 = E.state();
let steps = 0, under = 0, eatLeaf = 0, eatAny = 0, inFire = 0;
const victims = [], prevBurn = new Map();
for (let t = 0; t < S.days * E.DAY; t++) {
  const before = new Map(E.state().ag.filter((a) => a.sp === 0).map((a) => [a, { x: a.x, y: a.y }]));
  E.sim();
  const st = E.state();
  for (const a of st.ag) if (a.sp === 0) {
    const i = E.idx(a.x, a.y), tr = F.tree[i];
    steps++; if (tr > 0.3) under++;
    if (a.act === E.A_EAT) { eatAny++; if (tr > 0.3 && F.fruit[i] <= 0.05 && I.ROOT[i] <= 0.05) eatLeaf++; }
    if (R.FIRE[i] > 0.03) inFire++;
  }
  for (const [a] of before) if (a.gone && a.cause === 'burned') {
    const i = E.idx(a.x, a.y);
    victims.push({ day: Math.floor(t / E.DAY) + 1, age: +(a.age / E.TY).toFixed(1), tree: +F.tree[i].toFixed(2), asleep: a.asleep, up: !!a.up, lastAct: a.act, eatingLeaves: a.act === E.A_EAT && F.tree[i] > 0.3 && F.fruit[i] <= 0.05, e: Math.round(a.e) });
  }
  if (st.over) break;
}
const ppl = E.state().ag.filter((a) => a.sp === 0).length;
console.log(JSON.stringify({ seed, mode, alive: ppl, burned: E.state().deaths['Person: burned'] || 0, pctStepsUnderTrees: +(100 * under / steps).toFixed(1), pctStepsEatingLeaves: +(100 * eatLeaf / steps).toFixed(1), pctStepsEating: +(100 * eatAny / steps).toFixed(1), stepsInFire: inFire, victims }));
