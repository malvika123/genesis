// Tests for the round world: wrapping east–west, climate by latitude, seasons, ice and cold.
// Copyright (c) 2026 Malvika Sen. MIT License.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

test('the world wraps east–west but not north–south', () => {
  const E = createEngine();
  E.setSeed(1);
  E.reset({ people: 2, herbivores: 0, predators: 0, fish: 0 });
  const { idx, inb, dxw, W, H } = E;
  assert.equal(idx(-1, 5), idx(W - 1, 5), 'one step west of the west edge should be the east edge');
  assert.equal(idx(W, 5), idx(0, 5));
  assert.equal(inb(-1, 5), true);
  assert.equal(inb(5, -1), false, 'the north edge is a real edge');
  assert.equal(inb(5, H), false, 'the south edge is a real edge');
  assert.equal(dxw(W - 2), -2, 'shortest distance goes around the back of the world');
});

test('a creature can walk off one side and come back on the other', () => {
  const E = createEngine();
  E.setSeed(2);
  E.reset({ people: 2, herbivores: 0, predators: 0, fish: 0 });
  const s = E.state();
  let crossed = false;
  const last = new Map(s.ag.map((a) => [a, a.x]));
  for (let t = 0; t < 60 * E.DAY && !crossed; t++) {
    E.sim();
    for (const a of E.state().ag) {
      const p = last.get(a);
      if (p !== undefined && Math.abs(a.x - p) > E.W / 2) crossed = true;
      last.set(a, a.x);
      assert.ok(a.x >= 0 && a.x < E.W, 'a creature left the map');
    }
  }
  assert.ok(crossed, 'nobody ever crossed the east–west seam in 60 days');
});

test('the equator is warm, the poles are cold, and the hemispheres have opposite seasons', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ people: 2 });
  const { tempAt, H, TY } = E;
  E.setTick(TY / 4); // northern midsummer
  assert.ok(tempAt(H / 2, false) > 22, 'the equator should be warm');
  assert.ok(tempAt(0, false) > tempAt(H - 1, false) + 15, 'in northern summer the north should be much warmer than the south');
  E.setTick((3 * TY) / 4); // northern midwinter
  assert.ok(tempAt(0, false) < -10, 'the north pole should freeze in its winter');
  assert.ok(tempAt(H - 1, false) > tempAt(0, false) + 15, 'and the south should then be in summer');
  assert.ok(tempAt(H / 2, true) < tempAt(H / 2, false), 'nights are colder than days');
});

test('frozen water can be walked on but not drunk from; grass stops growing in deep cold', () => {
  const E = createEngine();
  E.setSeed(4);
  E.reset({ people: 2 });
  const { H, W, TY } = E;
  E.setTick((3 * TY) / 4);
  E.updateClimate();
  const s = E.state();
  let ice = -1;
  for (let i = 0; i < W * 4 && ice < 0; i++) if (s.water[i]) ice = i;
  if (ice >= 0) {
    assert.equal(E.iced(ice), true, 'water near the north pole should freeze in winter');
    assert.equal(E.liquid(ice), false);
  }
  assert.equal(E.growth(0), 0, 'nothing grows at the north pole in winter');
  assert.ok(E.growth(H / 2) >= 1, 'the tropics keep growing');
});

test('people feel cold where herbivores and predators do not, and huddling helps', () => {
  const E = createEngine();
  E.setSeed(5);
  E.reset({ people: 2, herbivores: 1, predators: 1, fish: 0 });
  const { H, TY } = E;
  E.setTick(TY / 4);
  const ag = E.state().ag;
  const [p, q] = ag.filter((a) => a.sp === 0);
  const h = ag.find((a) => a.sp === 1);
  const row = Math.round(H * 0.1); // far north in summer: about 11 °C
  p.y = h.y = row;
  assert.ok(E.coldOf(p, false) > 0, 'a person should feel the cool');
  assert.equal(E.coldOf(h, false), 0, 'a herbivore with its coat should not');
  // put the two people far apart, measure cold after a step, then side by side
  p.y = q.y = 2;
  p.x = 3;
  q.x = 30;
  E.setTick((3 * TY) / 4);
  E.sim();
  const alone = p.cold;
  q.x = p.x + 1;
  q.y = p.y;
  E.sim();
  assert.ok(alone > 0, 'a person near the pole in winter should be cold');
  assert.ok(p.cold < alone, 'huddling with another person should make it less cold');
});
