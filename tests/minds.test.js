// Tests for the mind: short-term memory and learning again in sleep.
// Copyright (c) 2026 Malvika Sen. MIT License.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

test('the world begins with a band of grown people', () => {
  const E = createEngine();
  E.setSeed(2);
  E.reset({});
  const ppl = E.state().ag.filter((a) => a.sp === 0);
  assert.equal(ppl.length, 8);
  for (const a of ppl) assert.ok(a.age >= a.S.smat, 'every founder is grown');
});

test('what its brain was just doing is fed back in as short-term memory', () => {
  const E = createEngine();
  E.setSeed(2);
  E.reset({});
  const a = E.state().ag.find((o) => o.sp === 0);
  E.sim();
  const before = Array.from(a.h.slice(0, E.NM));
  E.sim();
  const mem = Array.from(a.xi.slice(E.IB + 27, E.IB + 27 + E.NM));
  assert.deepEqual(
    mem.map((v) => +v.toFixed(5)),
    before.map((v) => +v.toFixed(5))
  );
});

test('replaying a rewarding moment in sleep makes that choice more likely in that situation', () => {
  const E = createEngine();
  E.setSeed(2);
  E.reset({});
  const a = E.state().ag.find((o) => o.sp === 0);
  E.sim();
  const x = Float32Array.from(a.xi),
    h = new Float32Array(E.NH),
    z = new Float32Array(E.NA),
    act = 3;
  E.forward(a.lw, x, h, z, a.S.nh);
  const p0 = z[act];
  a.xl.set(x);
  a.rk.fill(0);
  a.rk[2] = 1; // the relief of eating
  a.mem.length = 0;
  E.remember(a, act, 1.5, 0);
  for (let k = 0; k < 20; k++) E.replay(a, 1);
  E.forward(a.lw, x, h, z, a.S.nh);
  assert.ok(
    z[act] > p0,
    `the remembered choice became more likely (${p0.toFixed(3)} → ${z[act].toFixed(3)})`
  );
  assert.ok(a.dream, 'it was dreaming of that moment');
});

test('a baby is born with a small brain that grows until adulthood', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({});
  const p = E.state().ag.find((o) => o.sp === 0);
  const baby = E.mk(0, p.x, p.y, 1, E.child(p, p), 1, 0, p.k);
  assert.equal(E.grownUnits(baby), baby.S.nh, 'a newborn has only its birth units working');
  baby.age = baby.S.mat;
  assert.ok(E.grownUnits(baby) > baby.S.nh * 2, 'grown, it has far more');
  assert.ok(E.grownUnits(baby) <= baby.h.length);
});

test('fear and memory units are wired only to their own senses', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({});
  const a = E.state().ag.find((o) => o.sp === 0);
  const fearUnit = 0,
    foodEast = 0 * E.NCH + 1,
    predatorEast = 0 * E.NCH + 5;
  assert.equal(E.regionOf(fearUnit, a.g.lay), 1, 'unit 0 is in the fear centre');
  assert.equal(a.cm[fearUnit * E.NI + foodEast], 0, 'the fear centre does not see food');
  assert.equal(a.cm[fearUnit * E.NI + predatorEast], 1, 'it does see predators');
  assert.equal(a.g.w[E.OI + fearUnit * E.NI + foodEast], 0);
});

test('pruning removes weak connections that learning never used, and keeps used ones', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({});
  const a = E.state().ag.find((o) => o.sp === 0);
  a.nh = 20;
  const before = E.connections(a);
  // one weak connection that learning strengthened must survive
  const j = 3, // a general unit
    i = 5,
    q = E.OI + j * E.NI + i;
  a.g.w[q] = 0.01;
  a.lw[q] = 0.09;
  const n = E.prune(a);
  assert.ok(n > 0, 'some unused connections were pruned');
  assert.equal(E.connections(a), before - n);
  assert.equal(a.cm[j * E.NI + i], 1, 'the used one is kept');
});

test('the brain layout is inherited and can evolve: units move, regions can be copied', () => {
  const E = createEngine();
  E.setSeed(8);
  E.reset({});
  const [p, q] = E.state().ag.filter((o) => o.sp === 0);
  let moved = 0,
    copied = 0;
  for (let k = 0; k < 300; k++) {
    const g = E.child(p, q),
      L = g.lay;
    assert.ok(L && L.reg.length > 0 && L.masks.length >= 4);
    if (L.masks.length > 4) copied++;
    for (let j = 0; j < L.reg.length; j++) if (L.reg[j] !== (j % 8 === 0 ? 1 : j % 8 === 1 ? 2 : j % 16 === 2 ? 3 : 0)) moved++;
    // units only keep connections their region allows
    for (let j = 0; j < L.reg.length; j++)
      for (let i = 0; i < E.NI; i++) if (!L.masks[L.reg[j]][i]) assert.strictEqual(g.w[E.OI + j * E.NI + i], 0);
  }
  assert.ok(moved > 0, 'some units changed region');
  assert.ok(copied > 0 && copied < 30, 'a region was occasionally copied: ' + copied);
});
