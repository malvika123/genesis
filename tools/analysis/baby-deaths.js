// Genesis — what killed babies (under 2 years) whose health ran out on land ("its wounds"): their last bad events and health. Old eye. Entry 99.
// Usage: node tools/analysis/baby-deaths.js SEED   (changes nothing in the world)
const X = require(process.cwd() + '/tools/experiment-core.js');
const { createEngine } = require(process.cwd() + '/tools/engine.js');
const seed = +process.argv[2];
const S = X.fromArgs({ 'need-weighted-eye': true }); const E = createEngine({ brain: S.brain });
E.setSeed(seed); E.reset(S.cfg);
const TY = E.TY || 288, hist = new Map(), out = [];
for (let t = 0; t < 100 * E.DAY; t++) {
  E.sim();
  const ag = E.state().ag, now = new Set();
  for (const a of ag) {
    if (a.sp !== 0 || a.age >= 2 * TY) continue;
    now.add(a);
    const h = hist.get(a) || []; h.push([t, +a.hp.toFixed(1), a.act, a.hand || 0, a.stk && a.stkT === E.state().tick ? a.stk : '']); if (h.length > 12) h.shift(); hist.set(a, h);
  }
  for (const [a, h] of hist) if (!now.has(a)) {
    if (a.hp <= 0 && !a.dead && !a.wasW) out.push({ age: +(a.age / TY).toFixed(2), ev: a.ev.filter(Boolean).slice(0, 9), hp: h.slice(-6) });
    hist.delete(a);
  }
}
console.log(JSON.stringify({ seed, babyWoundDeaths: out.length, cases: out.slice(0, 4) }));
