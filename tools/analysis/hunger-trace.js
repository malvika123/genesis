// Genesis — why do starving hominins not find food? For every starving hominin (energy below 30, awake) at every step,
// and for every death by hunger: its age class, the nearest real food (ripe fruit, roots it could dig, nuts, fresh meat)
// and how far, whether its eyes register any food, whether a grown hominin is close, what it chose to do.
// Usage (from the genesis folder): node tools/analysis/hunger-trace.js SEED DAYS [experiment switches]
// Copyright (c) 2026 Malvika Sen. MIT License.
const path = require('path'),
  root = process.cwd();
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const [seed, days] = [Number(process.argv[2]), Number(process.argv[3])];
const flags = {};
for (const a of process.argv.slice(4)) if (a.startsWith('--')) flags[a.slice(2)] = true;
const S = X.fromArgs(flags);
const E = createEngine({ brain: S.brain });
E.setSeed(seed);
E.reset(S.cfg);
const F = E.forest(),
  I = E.items(),
  st0 = E.state();
const R = 8; // look this far (cells, about 3 km each) for food
function nearestFood(a) {
  let best = null;
  for (let dy = -R; dy <= R; dy++)
    for (let dx = -R; dx <= R; dx++) {
      const y = a.y + dy;
      if (y < 0 || y >= E.H) continue;
      const x = (a.x + dx + E.W) % E.W,
        i = E.idx(x, y);
      if (st0.water[i]) continue;
      const m = I.meatAt(x, y, 0),
        kinds = [];
      if (F.fruit[i] > 0.05) kinds.push('fruit');
      if (I.ROOT[i] > 0.05) kinds.push('roots');
      if (I.nut[i] > 0.05) kinds.push('nuts');
      if (m && !I.rotten(m) && m.meat > 0.05) kinds.push('meat');
      if (F.tree[i] > 0.3 && a.S.leaf > 0) kinds.push('leaves');
      if (!kinds.length) continue;
      const d = Math.max(Math.abs(dx), Math.abs(dy));
      if (!best || d < best.d) best = { d, kinds };
    }
  return best;
}
const ageClass = (a) => (a.age < a.S.mat * a.S.wn ? 'nursing' : a.age < a.S.mat ? 'weaned child' : 'adult');
const grownNear = (a) => E.state().ag.some((o) => o !== a && o.sp === 0 && !o.dead && o.age >= o.S.mat && Math.abs(o.x - a.x) <= 2 && Math.abs(o.y - a.y) <= 2);
const tally = {},
  deaths = [];
const add = (k, v) => ((tally[k] = tally[k] || {}), (tally[k][v] = (tally[k][v] || 0) + 1));
const act = (k) => (k < 8 ? 'walk' : ['stay', 'eat', 'drink', 'sleep', 'mate', 'grab', 'give', 'take', 'drop', 'strike', 'climb'][k - 8] || 'other');
let steps = 0;
for (let t = 0; t < days * E.DAY; t++) {
  const before = new Map(E.state().ag.filter((a) => a.sp === 0).map((a) => [a, { food: nearestFood(a), cls: ageClass(a), near: grownNear(a) }]));
  E.sim();
  for (const [a, b] of before)
    if (a.gone && !a.cause && a.e <= 0) // a hunger death leaves its cause empty (sim.js works it out as it removes the body)
      deaths.push({ day: Math.floor(t / E.DAY) + 1, cls: b.cls, foodWithin: b.food ? b.food.d : null, kinds: b.food ? b.food.kinds : [], grownNear: b.near, momAlive: !!(a.mom && !a.mom.gone) });
  for (const a of E.state().ag) {
    if (a.sp !== 0 || a.asleep || a.e >= 30) continue;
    steps++;
    const f = nearestFood(a);
    let seen = 0;
    for (let s = 0; s < 8; s++) seen = Math.max(seen, a.xi[s * E.NCH + 1]);
    add('age class', ageClass(a));
    add('nearest food (cells)', !f ? 'none within 8' : f.d === 0 ? 'here' : f.d <= 2 ? '1-2' : f.d <= 5 ? '3-5' : '6-8');
    if (f) add('food kinds nearest', f.kinds.join('+'));
    add('eyes register food', seen > 0.05 ? 'yes' : 'no');
    add('grown hominin within 2 cells', grownNear(a) ? 'yes' : 'no');
    add('chose', act(a.act));
    add('in its hand', ['nothing', 'a stone', 'a stick', 'a sharp stone', 'a burning stick', 'pyrite'][a.hand || 0]);
    if (f && f.d === 0) add('chose, with food right here (' + f.kinds.join('+') + ')', act(a.act));
  }
  if (E.state().over) break;
}
const pct = (o) => {
  const n = Object.values(o).reduce((s, v) => s + v, 0);
  return Object.fromEntries(Object.entries(o).sort((x, y) => y[1] - x[1]).map(([k, v]) => [k, +((100 * v) / n).toFixed(1)]));
};
const out = { seed, days, starvingSteps: steps, percentOfStarvingSteps: {}, hungerDeaths: deaths.length, deaths };
for (const k in tally) out.percentOfStarvingSteps[k] = pct(tally[k]);
console.log(JSON.stringify(out, null, 1));
