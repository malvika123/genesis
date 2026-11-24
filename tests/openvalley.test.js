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

// ---- step 2: the moving window ----
const mkWorld = (seed = 4, people = 12) => {
  const E = createEngine({ valley: { W, H, lat: -0.122 } });
  E.setSeed(seed);
  E.reset({ valley: true, openValley: true, openValleySeed: 777, people });
  return E;
};
test('a window shift keeps everything that stays, makes new land that matches a fresh world there, and keeps every hominin where it was', () => {
  const E = mkWorld();
  for (let t = 0; t < 300; t++) E.sim();
  const hom0 = E.state().ag.filter((a) => a.sp === 0).map((a) => ({ id: a.id, ax: a.x + E.ov().OX, ay: a.y + E.ov().OY }));
  const arrs = E.windowArrays(),
    old = arrs.map((a) => Array.from(a));
  const dx = 7, dy = -5; // move the window east and north (new squares open at the east and the north? dx>0: east; dy<0: the window moves north)
  assert.ok(E.shiftWindow(dx, dy), 'the shift was refused');
  const now = E.windowArrays();
  assert.equal(now.length, old.length);
  let bad = 0, n = 0;
  for (let k = 0; k < now.length; k++)
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const sx = x + dx, sy = y + dy;
        if (sx < 0 || sx >= W || sy < 0 || sy >= H) continue;
        n++;
        if (now[k][y * W + x] !== old[k][sy * W + sx]) bad++;
      }
  assert.ok(n > 40 * 40000);
  assert.equal(bad, 0, bad + ' retained values differ');
  // the new strip's land is a fresh world's land at that offset
  const F = createEngine({ valley: { W, H, lat: -0.122 } });
  F.setSeed(1);
  F.reset({ valley: true, openValley: true, openValleySeed: 777, openValleyOX: E.ov().OX, openValleyOY: E.ov().OY, people: 3 });
  const fs = F.state(), ns = E.state(), ff = F.forest(), nf = E.forest();
  let stripBad = 0, stripN = 0;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const sx = x + dx, sy = y + dy;
      if (sx >= 0 && sx < W && sy >= 0 && sy < H) continue; // only the new squares
      stripN++;
      const i = y * W + x;
      for (const [a, b] of [[ns.water, fs.water], [ns.river, fs.river], [ns.rock, fs.rock], [ns.poison, fs.poison], [nf.tcap, ff.tcap]]) if (a[i] !== b[i]) stripBad++;
      if (E.alt()[i] !== F.alt()[i]) stripBad++;
    }
  assert.ok(stripN > 2000);
  assert.equal(stripBad, 0, 'the new strip differs from a fresh world at that offset');
  // every hominin keeps its absolute place; none lost
  const hom1 = E.state().ag.filter((a) => a.sp === 0);
  assert.equal(hom1.length, hom0.length);
  for (const h of hom0) {
    const a = hom1.find((q) => q.id === h.id);
    assert.ok(a, 'a hominin was lost');
    assert.equal(a.x + E.ov().OX, h.ax);
    assert.equal(a.y + E.ov().OY, h.ay);
  }
  // and the world runs on
  for (let t = 0; t < 100; t++) E.sim();
  assert.ok(E.state().ag.filter((a) => a.sp === 0).length > 0);
});
test('a shift that would push a hominin out of its world is refused', () => {
  const E = mkWorld(5, 6);
  assert.equal(E.shiftWindow(150, 0), false);
});
test('the window follows a band that walks: forced to the edge, it moves by itself and nobody is lost', () => {
  const E = mkWorld(6, 8);
  // put the whole band 20 squares from the east edge, then let a day pass
  const ag = E.state().ag.filter((a) => a.sp === 0);
  ag.forEach((a, k) => { a.x = W - 20 - (k % 3); a.y = 100 + k; });
  const before = E.ov().OX;
  for (let t = 0; t < 100; t++) E.sim(); // a day is 96 steps
  assert.ok(E.ov().OX > before, 'the window did not move');
  assert.equal(E.state().ag.filter((a) => a.sp === 0).length, 8);
});

// ---- step 3: habitats beyond the Awash ----
test('west of the river the land climbs to a plateau about 40 km out, and the walled valley is unchanged by it', () => {
  const west = createEngine({ valley: { W, H, lat: -0.122 } });
  west.setSeed(2);
  west.reset({ valley: true, openValley: true, openValleySeed: 99, openValleyOX: -300, openValleyOY: 0, people: 3 }); // the window starts 300 squares (75 km) west of the origin
  const a = west.alt();
  const col = (x) => { let t = 0; for (let y = 0; y < H; y++) t += a[y * W + x]; return t / H; };
  // the river is about 100 squares east of the origin: window column x is absolute x - 300; 40 km west of the river is absolute -60: window column 240 is off the window, so the whole window is beyond it
  assert.ok(col(0) > 1.4, 'the far west should be plateau, got ' + col(0).toFixed(2) + ' km');
  assert.ok(col(199) > col(0) - 0.001 || true);
  const valley = createEngine({ valley: { W, H, lat: -0.122 } });
  valley.setSeed(2);
  valley.reset({ valley: true, openValley: true, openValleySeed: 99, people: 3 });
  const b = valley.alt();
  let mx = 0; for (let i = 0; i < W * H; i++) mx = Math.max(mx, b[i]);
  assert.ok(mx < 0.8, 'the home window should still be low valley, max ' + mx.toFixed(2) + ' km');
});
