// The prey map (scale step 1, `--prey-map`): the weight of prey is kept (nothing made or lost but by regrowth and deaths),
// herds are shown only near hominins and hunters, and the land carries prey inside the registered range.
// Copyright (c) 2026 Malvika Sen. MIT License.
const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

test('prey map: weight kept, herds near someone, level inside 1,000-10,000 kg per km²', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ preyMap: true });
  const P = E.prey();
  // the mean over squares where prey lives starts at the registered level
  let sum = 0,
    m = 0;
  for (let i = 0; i < P.PCAP[0].length; i++) {
    const k = P.PCAP[0][i] + P.PCAP[1][i];
    if (k > 0) (sum += k, m++);
  }
  const level = sum / m / 9;
  assert.ok(level >= 1000 && level <= 10000, 'mean carried, kg per km²: ' + level);
  assert.ok(!E.state().ag.some((a) => a.sp === 1 && (a.k === 1 || a.k === 3) && !a.herd), 'no single antelope or buffalo founders');
  for (let t = 0; t < 2 * E.DAY; t++) E.sim();
  const s = P.PREYSTAT,
    expect = s.start + s.grown - s.died,
    tot = P.preyTotal();
  assert.ok(Math.abs(tot - expect) / expect < 0.01, 'weight balance within 1%: ' + tot + ' vs ' + expect);
  const ag = E.state().ag,
    herds = ag.filter((a) => a.herd);
  assert.ok(herds.length > 0, 'herds are shown');
  for (const h of herds) {
    assert.ok(h.head >= 1, 'a herd has animals');
    const near = ag.some((o) => !o.dead && (o.sp === 0 || o.sp === 2) && Math.abs(E.dxw(o.x - h.x)) <= 1 && Math.abs(o.y - h.y) <= 1);
    // a herd may have walked a square away this step; it is set aside on the next
    assert.ok(near || ag.some((o) => !o.dead && (o.sp === 0 || o.sp === 2) && Math.abs(E.dxw(o.x - h.x)) <= 2 && Math.abs(o.y - h.y) <= 2), 'a herd is near a hominin or hunter');
  }
});
