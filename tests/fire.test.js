// Tests for fire: what it needs to catch, how it spreads and goes out, and fire in people's hands.
// Copyright (c) 2026 Malvika Sen. MIT License.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

// a world, and a patch of open grassland in it that we can make dry or wet
function grassland(seed = 4) {
  const E = createEngine();
  E.setSeed(seed);
  E.reset({ people: 2, herbivores: 0, predators: 0, fish: 0 });
  E.sim();
  const s = E.state(),
    F = E.fire(),
    w = E.wx(),
    f = E.forest();
  let c = -1;
  for (let y = 25; y < E.H - 25 && c < 0; y++)
    for (let x = 0; x < E.W; x++) {
      let ok = true;
      for (let dy = -3; dy <= 3 && ok; dy++)
        for (let dx = -3; dx <= 3; dx++) {
          const i = E.idx(x + dx, y + dy);
          if (s.water[i] || s.rock[i]) ok = false;
        }
      if (ok) {
        c = y * E.W + x;
        break;
      }
    }
  const set = (moist) => {
    for (let dy = -3; dy <= 3; dy++)
      for (let dx = -3; dx <= 3; dx++) {
        const i = E.idx((c % E.W) + dx, ((c / E.W) | 0) + dy);
        s.food[i] = 0.8;
        f.tree[i] = 0;
        w.MOIST[i] = moist;
        w.RAIN[i] = 0;
        w.HUM[i] = 0;
      }
  };
  return { E, s, F, w, f, c, set };
}

test('fire needs fuel that is dry: dry grass catches, wet grass and water do not', () => {
  const { F, c, set, s } = grassland();
  set(0.6);
  assert.equal(F.dryness(c), 0, 'grass on soaked ground is too wet to burn');
  assert.equal(F.ignite(c) && F.FIRE[c] > 0 && F.fuelOf(c) > 0, true, 'a flame can be put to it…');
  set(0.15);
  assert.ok(F.dryness(c) > 0.8, 'grass in a drought is tinder-dry');
  let sea = -1;
  for (let i = 0; i < s.water.length && sea < 0; i++) if (s.water[i]) sea = i;
  assert.equal(F.ignite(sea), false, 'water does not burn');
});

test('a fire in dry grass spreads; in wet grass it dies; rain puts it out', () => {
  let r = grassland();
  r.set(0.15);
  r.F.ignite(r.c, 0.3);
  // a drought: the patch stays dry while it burns
  for (let k = 0; k < 20; k++) {
    for (let dy = -3; dy <= 3; dy++)
      for (let dx = -3; dx <= 3; dx++) {
        const i = r.E.idx((r.c % r.E.W) + dx, ((r.c / r.E.W) | 0) + dy);
        r.w.MOIST[i] = 0.15;
        r.w.HUM[i] = 0;
      }
    r.E.sim();
  }
  const dry = [...r.F.BURNT].filter((v) => v > 0.05).length;
  assert.ok(dry >= 3, `in dry grass the fire spread (${dry} squares burnt)`);
  r = grassland();
  r.set(0.6);
  r.F.ignite(r.c, 0.3);
  for (let k = 0; k < 12; k++) r.E.sim();
  assert.equal(r.F.FIRE[r.c], 0, 'in wet grass it went out');
  r = grassland();
  r.set(0.15);
  r.w.RAIN[r.c] = 0.01;
  assert.equal(r.F.dryness(r.c), 0, 'in the rain nothing is dry enough to burn');
});

test('a person can pick up a burning stick, carry it, and start a fire by putting it down', () => {
  const { E, s, F, c, set } = grassland();
  set(0.15);
  const it = E.items(),
    p = s.ag.find((a) => a.sp === 0);
  p.x = c % E.W;
  p.y = (c / E.W) | 0;
  p.asleep = false;
  p.sl = 0;
  p.hand = 0;
  p.hp = 100;
  it.stick[c] = 2;
  F.ignite(c, 0.3);
  const will = (act) => {
    p.lw.fill(0, 0, E.NA * E.NI);
    p.lw[act * E.NI + E.IB + 11] = 60;
  };
  will(E.A_TAKE);
  E.sim();
  assert.equal(p.hand, 4, 'it holds a burning stick');
  // carry it two squares away, to dry grass that is not burning, and put it down there
  const d = E.idx(p.x + 2, p.y);
  F.FIRE[d] = 0;
  p.x = d % E.W;
  will(E.A_DROP);
  E.sim();
  assert.ok(F.FIRE[d] > 0, 'fire took hold where it was put down');
});

test('struck against a stone, pyrite throws sparks that can light dry tinder; plain stones cannot', () => {
  const { E, s, F, c, set } = grassland();
  set(0.15);
  const it = E.items(),
    p = s.ag.find((a) => a.sp === 0);
  const try_ = (hand) => {
    for (let k = 0; k < 7 * 7; k++) F.FIRE.fill(0);
    p.x = c % E.W;
    p.y = (c / E.W) | 0;
    p.asleep = false;
    p.sl = 0;
    p.hp = 100;
    p.e = 80;
    it.stone[c] = 2;
    it.pyrite[c] = 0;
    p.lw.fill(0, 0, E.NA * E.NI);
    p.lw[E.A_STRIKE * E.NI + E.IB + 11] = 60;
    let lit = false;
    for (let k = 0; k < 60 && !lit; k++) {
      p.hand = hand;
      E.sim();
      lit = F.FIRE[c] > 0;
    }
    return lit;
  };
  assert.equal(try_(1), false, 'stone on stone: no fire');
  assert.equal(try_(5), true, 'pyrite on stone, into dry grass: fire');
});
