const { test } = require('node:test');
const assert = require('node:assert');
const { createEngine } = require('../tools/engine');

test('sound fades by the physics of air: shouts carry about a couple of km, howls and roars far further', () => {
  const E = createEngine();
  E.setSeed(5);
  E.reset({ people: 0, herbivores: 0, predators: 0, fish: 0 });
  const T = E.talk(),
    st = E.state();
  // a quiet, open, dry-land spot
  let i0 = -1;
  for (let i = 0; i < E.W * E.H && i0 < 0; i++) {
    const x = i % E.W,
      y = (i / E.W) | 0;
    if (y > 10 && y < E.H - 10 && !st.water[i] && E.forest().cover(i) < 0.1) i0 = i;
  }
  const x = i0 % E.W,
    y = (i0 / E.W) | 0,
    floor = T.ambient(i0);
  const at = (s, dx) => T.received({ x, y, ...s }, x + dx, y);
  const shout = T.SND.voice[2],
    howl = T.SND.animal[0],
    roar = T.SND.animal[1];
  assert.ok(at(shout, 0) > floor, 'a shout is heard by someone in the same square');
  assert.ok(at(shout, 2) < floor, 'but not 6 km away');
  assert.ok(at(howl, 2) > at(shout, 2) + 15, 'a howl carries much further than a shout');
  assert.ok(at(roar, 5) < floor, 'nothing is heard 15 km off');
  // low pitches lose far less to the air than high ones
  assert.ok(T.absorb(125, 0.5) < 1 && T.absorb(1000, 0.5) > 4);
});
