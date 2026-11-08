const { test } = require('node:test');
const assert = require('node:assert');
const { createEngine } = require('../tools/engine');

test('a mouth makes words, and a clear ear hears the word that was said', () => {
  const E = createEngine();
  E.setSeed(2);
  E.reset({});
  const T = E.talk();
  const w = [
    [1, 1, 2, 1, 0],
    [2, 0, 0, 0, 0],
  ]; // "ba" + "ti"
  assert.strictEqual(T.spell(w), 'bati');
  const back = T.heardAs(T.acoustics(w, 0.5));
  assert.deepStrictEqual(back, w, 'heard clearly, it is heard as said');
  // "i" and "u" sound very different; "i" and "e" are closer
  const a = (h, b, r) => T.acoustics([[0, 1, h, b, r]], 0.5),
    dist = (p, q) => Math.hypot(...p.map((v, i) => v - q[i]));
  assert.ok(dist(a(0, 0, 0), a(0, 2, 1)) > dist(a(0, 0, 0), a(1, 0, 0)));
});

test('hearing a word draws a child\'s own mouth toward saying it (vocal imitation)', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({});
  for (let i = 0; i < 3; i++) E.sim();
  const T = E.talk(),
    a = E.state().ag.find((o) => o.sp === 0);
  const w = [[3, 0, 2, 2, 1]], // "kɒ"
    c = T.choicesFor(w),
    VG = E.VG;
  const p = () => {
    E.forward(a.lw, a.xi, a.h, a.z, a.nh, null, a.zv, null);
    let s = 0;
    for (let g = 1; g < 6; g++) s += Math.log(a.zv[VG[g][0] + c[g]]);
    return s;
  };
  const before = p();
  for (let i = 0; i < 30; i++) E.social().imitateVoice(a, c, 0.05);
  assert.ok(p() > before + 0.5, 'more likely to say it now');
});
