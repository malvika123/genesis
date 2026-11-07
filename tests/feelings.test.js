// Tests for feelings: heat, and grief at a death.
// Copyright (c) 2026 Malvika Sen. MIT License.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

test('people overheat on dry, sunny ground by day; shade, water, night and damp ground cool them', () => {
  const E = createEngine();
  E.setSeed(4);
  E.reset({ people: 2 });
  E.sim();
  const s = E.state(),
    a = s.ag.find((o) => o.sp === 0),
    f = E.forest(),
    w = E.wx();
  // a low, open patch of land near the equator
  let i = -1;
  for (let y = (E.H / 2) | 0; y < E.H && i < 0; y++)
    for (let x = 0; x < E.W; x++) {
      const j = y * E.W + x;
      if (!s.water[j] && !s.rock[j] && E.alt()[j] < 0.2) {
        i = j;
        break;
      }
    }
  a.x = i % E.W;
  a.y = (i / E.W) | 0;
  f.tree[i] = 0;
  w.CLD[i] = 0;
  w.MOIST[i] = 0.2; // parched
  const dryDay = E.heatOf(a, false);
  assert.ok(dryDay > 0, 'parched open ground near the equator is too hot by day');
  assert.equal(E.heatOf(a, true), 0, 'the desert night is not too hot');
  f.tree[i] = 0.9;
  assert.ok(E.heatOf(a, false) < dryDay, 'shade is cooler');
  f.tree[i] = 0;
  w.MOIST[i] = 0.6;
  assert.ok(E.heatOf(a, false) < dryDay, 'damp ground heats less');
});

test('when a creature dies, its partner grieves', () => {
  const E = createEngine();
  E.setSeed(6);
  E.reset({ people: 2 });
  const s = E.state(),
    [p, q] = s.ag.filter((o) => o.sp === 0);
  p.mate = q;
  q.mate = p;
  q.dead = true;
  q.cause = 'test';
  E.sim();
  assert.ok(p.grief > 0.9, 'the partner is grieving');
  assert.equal(p.lost, q);
});
