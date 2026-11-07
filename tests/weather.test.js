// Tests for the water cycle: evaporation, condensation, rain, soil moisture and puddles.
// Copyright (c) 2026 Malvika Sen. MIT License.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

test('warm air holds much more water than cold air', () => {
  const E = createEngine();
  E.setSeed(1);
  E.reset({ people: 2 });
  const { capacity } = E.wx();
  assert.ok(capacity(30) > 4 * capacity(5), 'air at 30 °C should hold several times more than at 5 °C');
  assert.ok(capacity(-20) < capacity(0));
});

test('the water cycle gives wet belts and dry belts, like Earth', () => {
  const E = createEngine();
  E.setSeed(1);
  E.reset({ people: 2, herbivores: 0, predators: 0, fish: 0 });
  const { W, H, DAY } = E;
  const rows = (a, b) => [a, b];
  const band = { subtropics: [rows(10, 15), rows(25, 30)], wet: [rows(4, 10), rows(30, 36), rows(17, 23)] };
  const sum = { subtropics: 0, wet: 0 },
    cells = { subtropics: 0, wet: 0 };
  for (let t = 0; t < 8 * DAY; t++) {
    E.sim();
    if (t < 3 * DAY) continue;
    const { RAIN } = E.wx();
    for (const k of Object.keys(band))
      for (const [a, b] of band[k])
        for (let y = a; y < b; y++) for (let x = 0; x < W; x++) ((sum[k] += RAIN[y * W + x]), cells[k]++);
  }
  const sub = sum.subtropics / cells.subtropics,
    wet = sum.wet / cells.wet;
  assert.ok(wet > 0, 'it should rain somewhere');
  assert.ok(
    wet > 2 * sub,
    `the belts around 30° should be much drier (wet ${wet.toFixed(5)}, subtropics ${sub.toFixed(5)})`
  );
});

test('rain soaks the ground, and parched ground grows grass more slowly', () => {
  const E = createEngine();
  E.setSeed(2);
  E.reset({ people: 2 });
  const { MOIST, wetness } = E.wx();
  const s = E.state();
  const i = s.water.findIndex((w, k) => !w && !s.rock[k]);
  MOIST[i] = 0.02;
  const dry = wetness(i);
  MOIST[i] = 0.9;
  assert.ok(wetness(i) > 2 * dry, 'wet soil should grow plants much better than parched soil');
});

test('puddles can be drunk from and dry up again', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ people: 2 });
  const { MOIST, PUD, PW, drinkable } = E.wx();
  const s = E.state();
  // a cell in the dry belt around 30° north, where it rarely rains
  let i = -1;
  for (let k = 12 * E.W; k < 14 * E.W && i < 0; k++) if (!s.water[k] && !s.rock[k] && !s.pit[k]) i = k;
  PW[i] = 0.3;
  PUD[i] = 1;
  MOIST[i] = 1;
  assert.equal(drinkable(i), true, 'a puddle should be drinkable');
  for (let t = 0; t < 2 * E.DAY && PUD[i]; t++) E.sim();
  assert.equal(PUD[i], 0, 'the puddle should dry up within a couple of days without more rain');
});
