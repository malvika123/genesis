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

test('nobody is told of a death: a partner far away feels nothing at once, one who finds the body is distressed', () => {
  const E = createEngine();
  E.setSeed(6);
  E.reset({ people: 2, predators: 0 });
  const s = E.state(),
    [p, q] = s.ag.filter((o) => o.sp === 0);
  p.mate = q;
  q.mate = p;
  p.y = (q.y + 30) % E.H; // far away
  q.dead = true;
  q.cause = 'test';
  E.sim();
  assert.ok(p.grief < 0.1, 'no news travels by magic');
  // it comes to where the body lies
  p.x = q.x;
  p.y = q.y;
  E.sim();
  assert.ok(p.grief > 0.9, 'finding the body is distressing');
  assert.equal(p.lost, q);
});

test('a partner long unseen is missed, more after days, then less as time passes', () => {
  const E = createEngine();
  E.setSeed(6);
  E.reset({ people: 2, predators: 0 });
  const s = E.state(),
    [p, q] = s.ag.filter((o) => o.sp === 0);
  p.mate = q;
  q.mate = p;
  E.sim();
  q.dead = true;
  q.cause = 'test';
  p.y = (q.y + 30) % E.H;
  for (let i = 0; i < 3 * E.DAY; i++) {
    p.e = p.w = 90;
    p.hp = 100;
    E.sim();
  }
  const m3 = p.miss;
  assert.ok(m3 > 0.2, 'missed after three days: ' + m3);
  for (let i = 0; i < 15 * E.DAY && !p.gone; i++) {
    p.e = p.w = 90;
    p.hp = 100;
    E.sim();
  }
  assert.ok(p.miss < m3, 'and it fades: ' + p.miss);
});
