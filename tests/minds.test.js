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
