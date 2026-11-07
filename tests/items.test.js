// Tests for hands: loose things on the ground, and what a blow with a stone does to them.
// Copyright (c) 2026 Malvika Sen. MIT License.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

// a world with one person standing on a chosen cell, whose brain is set to always do one thing
function setup(find) {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ people: 2 });
  const s = E.state(),
    it = E.items();
  let cell = -1;
  for (let i = 0; i < E.W * E.H && cell < 0; i++) if (!s.water[i] && !s.rock[i] && !s.pit[i] && find(i, it)) cell = i;
  assert.ok(cell >= 0, 'the world should have such a cell');
  const p = s.ag.find((a) => a.sp === 0);
  p.x = cell % E.W;
  p.y = (cell / E.W) | 0;
  p.e = 40;
  p.sl = 0;
  p.asleep = false;
  const will = (act) => (p.lw[E.O3 + act * E.NI + E.IB + 11] = 60); // the bias input is always on
  return { E, s, it, p, cell, will };
}

test('the world has stones, fallen branches and nuts lying about', () => {
  const { E, it } = setup((i, it) => it.stone[i] > 0);
  let sticks = 0,
    nuts = 0;
  for (let i = 0; i < E.W * E.H; i++) {
    if (it.stick[i]) sticks++;
    if (it.nut[i] > 0.05) nuts++;
  }
  assert.ok(sticks > 50, 'fallen branches under the trees');
  assert.ok(nuts > 50, 'nuts under the woods');
});

test('a person can pick up a stone from the ground', () => {
  const { E, it, p, cell, will } = setup((i, it) => it.stone[i] > 0 && !it.nut[i]);
  const before = it.stone[cell];
  will(E.A_TAKE);
  E.sim();
  assert.equal(p.hand, 1, 'it should now hold a stone');
  assert.equal(it.stone[cell], before - 1);
});

test('a stone hit against a nut breaks the shell and feeds the person; bare hands do not', () => {
  const { E, it, p, cell, will } = setup((i, it) => it.nut[i] > 0.3);
  will(E.A_STRIKE);
  p.hand = 0;
  const bare = it.nut[cell];
  E.sim();
  assert.ok(it.nut[cell] > bare - 1e-3, 'empty hands cannot open a nut');
  p.hand = 1;
  p.e = 40;
  const e0 = p.e;
  E.sim();
  assert.ok(it.nut[cell] < bare, 'the nut is used up');
  assert.ok(p.e > e0 + 10, 'the nut meat gives energy');
  assert.equal(p.nuts, 1);
});

test('animals have no hands', () => {
  const { E, s, will, it, cell } = setup((i, it) => it.stone[i] > 0);
  const d = s.ag.find((a) => a.sp === 1);
  d.x = cell % E.W;
  d.y = (cell / E.W) | 0;
  d.lw[E.O3 + E.A_TAKE * E.NI + E.IB + 11] = 60;
  E.sim();
  assert.equal(d.hand, 0);
});
