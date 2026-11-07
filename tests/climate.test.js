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

test('a creature can see across the east–west seam', () => {
  const E = createEngine();
  E.setSeed(2);
  E.reset({ people: 2, herbivores: 0, predators: 0, fish: 0 });
  E.sim(); // builds the map of who is where, which the senses use
  const s = E.state();
  const a = s.ag[0];
  a.asleep = false;
  // stand at the east edge and put fresh grass just across the seam, on the west edge
  a.x = E.W - 1;
  a.hd = 0; // facing east, toward the seam
  const j = a.y * E.W + 0;
  s.water[j] = 0;
  s.rock[j] = 0;
  s.pit[j] = 0;
  s.poison[j] = 0;
  s.food[j] = 1;
  a.e = 20;
  E.sense(a, a.xi, false);
  assert.ok(a.xi[0 * E.NCH + 1] > 0, 'food just across the seam should be seen to the east');
});

test('the equator is warm, the poles are cold, and the hemispheres have opposite seasons', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ people: 2 });
  const { tempAt, H, TY } = E;
  E.setTick(TY / 4); // northern midsummer
  assert.ok(tempAt(H / 2, false) > 22, 'the equator should be warm');
  assert.ok(
    tempAt(0, false) > tempAt(H - 1, false) + 15,
    'in northern summer the north should be much warmer than the south'
  );
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

test('day and night are local: it is night on one side of the planet and day on the other', () => {
  const E = createEngine();
  E.setSeed(6);
  E.reset({ people: 2 });
  const { W, DAY } = E;
  for (const t of [0, DAY / 8, DAY / 3, DAY / 2]) {
    E.setTick(t);
    assert.notEqual(
      E.isNightAt(0),
      E.isNightAt(W / 2),
      'opposite sides of the world should have opposite times of day'
    );
  }
  let nights = 0;
  for (let x = 0; x < W; x++) if (E.isNightAt(x)) nights++;
  assert.equal(nights, W / 2, 'half of the world should be in night at any moment');
});
