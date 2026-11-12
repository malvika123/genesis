// node drowntrace.js SEED DAYS : for each hominin that drowns, its last 12 steps before death
const path = require('path'), root = process.cwd();
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const [seed, days] = [Number(process.argv[2]), Number(process.argv[3])];
const S = X.fromArgs({ 'naive-founders': true });
const E = createEngine({ brain: S.brain }); E.setSeed(seed); E.reset(S.cfg);
const st = E.state(), hist = new Map(), out = [];
const act = (k) => (k < 8 ? 'walk' : ['stay', 'eat', 'drink', 'sleep', 'mate', 'grab', 'give', 'take', 'drop', 'strike', 'climb'][k - 8]);
for (let t = 0; t < days * E.DAY; t++) {
  E.sim();
  for (const a of E.state().ag) if (a.sp === 0) {
    const i = E.idx(a.x, a.y);
    let drinkNear = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const y = a.y + dy; if (y < 0 || y >= E.H) continue; const j = E.idx((a.x + dx + E.W) % E.W, y); if (st.water[j] && !st.deep[j] && !st.salt[j]) drinkNear = 1; }
    const h = hist.get(a) || []; h.push({ act: act(a.act), deep: st.deep[i] === 1, water: st.water[i] === 1, salt: st.salt[i] === 1, thirst: +(1 - a.w / 100).toFixed(2), hunger: +(1 - a.e / 100).toFixed(2), fear: +a.fear.toFixed(2), age: +(a.age / E.TY).toFixed(1), shallowNear: drinkNear });
    if (h.length > 12) h.shift(); hist.set(a, h);
  }
  for (const [a, h] of hist) if (a.gone && !a.reported) { a.reported = 1; if (a.wasW && a.hp <= 0) out.push({ day: Math.floor(t / E.DAY) + 1, last: h }); hist.delete(a); }
  if (E.state().over) break;
}
console.log(JSON.stringify({ seed, drownings: out.length, cases: out }, null, 0));
