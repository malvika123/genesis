// The open valley's land is a function of position (plan item 36, step 1): the same absolute square is the same land in a window placed anywhere.
// Copyright (c) 2026 Malvika Sen. MIT License.
const test = require('node:test');
const assert = require('node:assert');
const { createEngine } = require('../tools/engine');
const W = 200, H = 240;
const build = (OX, OY, seed = 5) => {
  const E = createEngine({ valley: { W, H, lat: -0.122 } });
  E.setSeed(seed);
  E.reset({ valley: true, openValley: true, openValleySeed: 123456, openValleyOX: OX, openValleyOY: OY, people: 5 });
  const st = E.state(), f = E.forest();
  return { alt: E.alt(), water: st.water, river: st.river, rock: st.rock, poison: st.poison, tcap: f.tcap };
};
test('the same absolute squares are the same land in a window shifted along and across the valley', () => {
  const A = build(0, 0), B = build(40, 30);
  let n = 0, bad = {};
  for (let y = 30; y < H; y++)
    for (let x = 40; x < W; x++) {
      const ia = y * W + x, ib = (y - 30) * W + (x - 40); // A's square (x,y) is B's square (x-40, y-30)
      n++;
      for (const k of ['alt', 'water', 'river', 'rock', 'poison']) if (A[k][ia] !== B[k][ib]) bad[k] = (bad[k] || 0) + 1;
    }
  assert.ok(n > 20000);
  assert.deepEqual(bad, {}, 'land differs in the overlap: ' + JSON.stringify(bad));
});
test('with the open valley off the walled valley is unchanged by the new code (same land for the same seed twice)', () => {
  const mk = () => { const E = createEngine({ valley: { W, H, lat: -0.122 } }); E.setSeed(3); E.reset({ valley: true, people: 5 }); return Array.from(E.alt().slice(0, 4000)); };
  assert.deepEqual(mk(), mk());
});
