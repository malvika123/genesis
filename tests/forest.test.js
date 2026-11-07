// Tests for forests: where they grow, and what they mean to the creatures.
// Copyright (c) 2026 Malvika Sen. MIT License.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

test('forests grow where it is warm and wet, not in the sea, on bare rock or above the treeline', () => {
  const E = createEngine();
  E.setSeed(1);
  E.reset({ people: 2 });
  const s = E.state(),
    { tree, meanTemp } = E.forest();
  let land = 0,
    wooded = 0;
  for (let i = 0; i < E.W * E.H; i++) {
    if (s.water[i] || s.rock[i]) {
      assert.equal(tree[i], 0, 'no trees in water or on bare rock');
      continue;
    }
    land++;
    if (tree[i] > 0.3) wooded++;
    if (meanTemp(i) < -3) assert.equal(tree[i], 0, 'no trees above the treeline');
  }
  const share = wooded / land;
  assert.ok(share > 0.1 && share < 0.5, `forest should cover a fair part of the land (got ${(100 * share).toFixed(0)}%)`);
});

test('trees shelter you from rain and wind', () => {
  const E = createEngine();
  E.setSeed(2);
  E.reset({ people: 2, herbivores: 0, predators: 0, fish: 0 });
  E.setTick((3 * E.TY) / 4);
  const s = E.state(),
    a = s.ag[0],
    { tree } = E.forest();
  // a cold, open spot, then the same spot thickly wooded
  let i = -1;
  for (let k = 0; k < E.W * E.H && i < 0; k++)
    if (!s.water[k] && !s.rock[k] && E.coldOf({ sp: 0, x: k % E.W, y: (k / E.W) | 0 }, false) > 0.3) i = k;
  a.x = i % E.W;
  a.y = (i / E.W) | 0;
  tree[i] = 0;
  const open = E.coldOf(a, false);
  tree[i] = 0.9;
  assert.ok(E.coldOf(a, false) < open, 'a person under trees should feel less cold');
});

test('people can eat fruit from the trees', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ people: 2, herbivores: 0, predators: 0, fish: 0 });
  E.sim();
  const s = E.state(),
    a = s.ag.find((x) => x.sp === 0),
    { tree, fruit } = E.forest(),
    i = a.y * E.W + a.x;
  tree[i] = 0.9;
  fruit[i] = 0.5;
  s.food[i] = 0;
  s.poison[i] = 0;
  a.e = 30;
  E.sense(a, a.xi, false);
  assert.ok(a.xi[E.HB] > 0.4, 'a person should sense the fruit as food right here');
});
