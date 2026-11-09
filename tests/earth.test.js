// Tests for the real Earth (70,000 years ago) and where the first band starts.
// Copyright (c) 2026 Malvika Sen. MIT License.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../tools/engine');

// the square at a latitude (°N) and longitude (°E) on the Earth map
const at = (E, la, lo) => Math.floor((80 - la) / 2) * E.W + Math.floor(((((lo + 160) % 360) + 360) % 360) / 2.8125);

test('the real Earth: its continents, oceans and the ice-age land bridges', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ earth: true });
  const s = E.state(),
    land = (la, lo) => !s.salt[at(E, la, lo)];
  assert.ok(land(8, 20) && land(-25, 25) && land(50, 90) && land(40, -100) && land(-10, -55) && land(-25, 133), 'Africa, Asia, the Americas and Australia are land');
  assert.ok(!land(0, -30) && !land(-30, 80) && !land(10, -140) && !land(35, 18), 'the Atlantic, Indian and Pacific oceans and the Mediterranean are sea');
  // the sea stood about 80 m lower
  assert.ok(land(65, -169), 'Beringia joins Asia to America');
  assert.ok(land(0, 108), 'Sundaland joins Borneo to Asia');
  assert.ok(land(-10, 142), 'Sahul joins New Guinea to Australia');
  assert.ok(land(54, 3), 'Britain is joined to Europe');
  let n = 0;
  for (let i = 0; i < E.W * E.H; i++) if (!s.salt[i]) n++;
  const share = n / (E.W * E.H);
  assert.ok(share > 0.3 && share < 0.4, 'about a third of the world is land: ' + share);
  // Tibet is the highest plateau
  assert.ok(E.alt()[at(E, 33, 88)] > 3.5, 'Tibet stands high');
});

test('on the real Earth the rains make the Sahara a desert and keep central Africa green', () => {
  const E = createEngine();
  E.setSeed(3);
  E.reset({ earth: true });
  const w = E.wx(),
    f = E.forest();
  assert.ok(w.MOISTY[at(E, 22, 10)] < 0.12, 'the Sahara is dry');
  assert.ok(w.MOISTY[at(E, -2, 36)] > 0.5, 'East Africa is not');
  assert.ok(f.tree[at(E, 22, 10)] < 0.1, 'and has no forest');
});

test('the first band starts where our species lived: warm (not desert-hot) land in the tropics, near fresh water, with no hunters at the camp', () => {
  for (const earth of [false, true])
    for (const seed of [1, 2, 3, 4, 5]) {
      const E = createEngine();
      E.setSeed(seed);
      E.reset({ earth });
      const s = E.state(),
        f = E.forest(),
        ppl = s.ag.filter((a) => a.sp === 0),
        cx = ppl.reduce((t, a) => t + a.x, 0) / ppl.length,
        cy = ppl.reduce((t, a) => t + a.y, 0) / ppl.length,
        la = (((cy + 0.5) / E.H) * 2 - 1) * 80;
      assert.ok(Math.abs(la) <= 29, 'within the tropics: ' + la);
      const T = f.meanTemp(ppl[0].y * E.W + ppl[0].x);
      assert.ok(T > 14 && T < 30, 'warm, not desert-hot: ' + T);
      let fresh = false;
      for (let dy = -6; dy <= 6; dy++)
        for (let dx = -6; dx <= 6; dx++) {
          const y = Math.round(cy) + dy;
          if (y < 0 || y >= E.H) continue;
          const j = y * E.W + ((((Math.round(cx) + dx) % E.W) + E.W) % E.W);
          if (s.water[j] && !s.salt[j]) fresh = true;
        }
      assert.ok(fresh, 'fresh water close by');
      if (earth) {
        const lo = -160 + (cx + 0.5) * 2.8125;
        assert.ok(lo > -20 && lo < 55, 'in Africa: ' + lo);
      }
      for (const p of s.ag.filter((a) => a.sp === 2)) {
        const d = Math.hypot(E.dxw(p.x - cx), p.y - cy);
        assert.ok(d > 2, 'no hunters at the camp');
      }
    }
});
