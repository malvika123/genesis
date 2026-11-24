// Genesis — the open valley's land as a function of position (plan item 36, docs/design/open-valley.md; step 1). Off unless --open-valley (with --valley).
// The walled valley (terrain.js makeValleyTerrain) draws its land from random numbers laid on the 200 x 240 grid, so a second pass gives different land. To give the hominins real
// room, the 250 m window must be able to move along the valley and have new land made ahead of it that joins the land behind. So here every square's height, river, stone,
// rock, berries and tree cover come from its ABSOLUTE position (the window's own square plus the window's offset OX, OY, in squares) and a fixed world number OVSEED: the same
// absolute square is the same land in any window. The formulas are those of makeValleyTerrain (the river's meander, the floodplain, the valley sides, the cobble beds), with
// hash-based value noise in place of the random grids. Copyright (c) 2026 Malvika Sen. MIT License.
let OX = 0, // the absolute position, in squares, of the window's top-left square
  OY = 0,
  OVSEED = 0; // the world number all of the open valley's noise comes from (drawn once per world)
const hash2 = (x, y, s) => {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(s | 0, 1013904223);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};
// smooth value noise on a lattice of sc squares
const vnoise = (x, y, sc, s) => {
  const gx = x / sc,
    gy = y / sc,
    x0 = Math.floor(gx),
    y0 = Math.floor(gy),
    fx = gx - x0,
    fy = gy - y0,
    sx = fx * fx * (3 - 2 * fx),
    sy = fy * fy * (3 - 2 * fy),
    a = hash2(x0, y0, s),
    b = hash2(x0 + 1, y0, s),
    c = hash2(x0, y0 + 1, s),
    d = hash2(x0 + 1, y0 + 1, s);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
};
// the same layers as terrain.js fractal(base, octaves, falloff): base cells across the 200-square width at the first layer, doubling each layer; here by absolute position
const ofractal = (base, octaves, falloff, s) => (X, Y) => {
  let t = 0,
    tot = 0;
  for (let o = 0; o < octaves; o++) {
    const a = falloff ** o;
    t += vnoise(X, Y, 200 / (base * 2 ** o), s + o * 101) * a;
    tot += a;
  }
  return t / tot;
};
const openRiverX = (Y) => 100 + VALLEY.meanderAmp * Math.sin((2 * Math.PI * Y) / VALLEY.meanderLen + hash2(1, 2, OVSEED) * 6.28) + 5 * Math.sin((2 * Math.PI * Y) / 37 + 2 * hash2(1, 2, OVSEED) * 6.28);
function makeOpenValleyTerrain(n) {
  const SQ = 0.25,
    noise = ofractal(6, 4, 0.5, OVSEED + 11),
    broad = ofractal(3, 3, 0.5, OVSEED + 23),
    dist = new Float32Array(n);
  for (let y = 0; y < H; y++) {
    const Y = y + OY,
      c = openRiverX(Y);
    for (let x = 0; x < W; x++) {
      const i = y * W + x,
        X = x + OX,
        dKm = Math.abs(X - c) * SQ;
      dist[i] = dKm;
      const flood = Math.min(1, dKm / VALLEY.floodKm),
        side = Math.max(0, (dKm - VALLEY.floodKm) / 20);
      alt[i] = 0.5 - VALLEY.slopeKmPerKm * Y * SQ + (flood * 0.012 + Math.min(1, side) * VALLEY.sideRiseKm) + 0.01 * (noise(X, Y) - 0.5) + 0.04 * (broad(X, Y) - 0.5) * Math.min(1, dKm / 6);
    }
  }
  // the river: one square wide along the centre line (two where it bends, so that it is continuous), wherever the window is
  for (let y = 0; y < H; y++) {
    const Y = y + OY,
      c = Math.round(openRiverX(Y)) - OX,
      c2 = Math.round(openRiverX(Y + 1)) - OX;
    for (let x = Math.max(0, Math.min(c, c2)); x <= Math.min(W - 1, Math.max(c, c2)); x++) {
      const i = y * W + x;
      water[i] = 1;
      river[i] = 1;
      alt[i] -= 0.006;
    }
  }
  // stony cobble beds close to the river; bare rock on 5% of the stony squares (by position, not by a random draw)
  for (let i = 0; i < n; i++) {
    if (water[i]) continue;
    const X = (i % W) + OX,
      Y = ((i / W) | 0) + OY;
    if (dist[i] < VALLEY.cobbleKm && noise(X * 2, Y * 2) > 0.45) {
      ter[i] = 2;
      if (hash2(X, Y, OVSEED + 7) < 0.05) rock[i] = 1;
    }
  }
  // poisonous berry patches: one a block of 16 x 16 squares (the walled valley: 10 per 2,560 squares), centred by position, a disc of 2 squares, half of it in berries
  for (let by = Math.floor(OY / 16) - 1; by <= Math.floor((OY + H) / 16) + 1; by++)
    for (let bx = Math.floor(OX / 16) - 1; bx <= Math.floor((OX + W) / 16) + 1; bx++) {
      const px = bx * 16 + hash2(bx, by, OVSEED + 31) * 16,
        py = by * 16 + hash2(bx, by, OVSEED + 37) * 16;
      for (let dy = -2; dy <= 2; dy++)
        for (let dx = -2; dx <= 2; dx++) {
          const X = Math.round(px) + dx,
            Y = Math.round(py) + dy,
            x = X - OX,
            y = Y - OY;
          if (dx * dx + dy * dy >= 4 || x < 0 || x >= W || y < 0 || y >= H) continue;
          const i = y * W + x;
          if (!water[i] && !rock[i] && ter[i] !== 1 && hash2(X, Y, OVSEED + 41) < 0.5) poison[i] = 1;
        }
    }
}

// ---- the moving window (step 2; docs/design/open-valley.md) ----
// When a hominin comes within OVMARGIN squares of an edge, the 250 m window moves so the band is back in the middle. The new land is made by the same startup code as a new world, for
// the new offset (OX, OY), and what stays is copied back from the old layers; the creatures and everything that remembers a place move with the window.
const OVMARGIN = 30; // squares (7.5 km)
let OVSHIFTS = 0; // how many times the window has moved
// every layer that holds one number per square (found by running a valley world and testing each name), as the engine keeps them
const windowArrays = () =>
  [alt, BURNT, cave, CLD, CONV, COOK, CT, deep, DUG, FIRE, fkind, flake, food, fruit, HUM, MOIST, nut, OLIFT, pit, poison, PUD, PW, pyrite, RAIN, river, rock, ROOT, salt, SEDGE, SLIFT, SMOL, soil, stick, stone, tcap, ter, TERM, TERMCAP, THUNDER, tree, water, YL, ...(PREY || []), ...(PCAP || [])].filter(
    (a) => a && a.length === W * H
  );
function shiftWindow(dx, dy) {
  dx = Math.round(dx);
  dy = Math.round(dy);
  if (!dx && !dy) return false;
  const hom = ag.filter((a) => a.sp === 0 && !a.dead && !a.gone);
  for (const a of hom) {
    const x = a.x - dx,
      y = a.y - dy;
    if (x < 4 || x > W - 5 || y < 4 || y > H - 5) return false; // never shift a hominin out of its world
  }
  const before = windowArrays(),
    old = before.map((a) => a.slice()),
    bodies = BODIES,
    park = PARK,
    pstat = PREYSTAT;
  OX += dx;
  OY += dy;
  // the land and everything that grows on it, afresh, for the new offset (the same calls as a new world; not the weather, fire or talk, which carry state of their own)
  makeTerrain();
  updateClimate();
  for (let i = 0; i < W * H; i++)
    food[i] = rock[i] || pit[i] ? 0 : water[i] ? rnd() * 0.5 : (0.35 + rnd() * 0.5) * TF[ter[i]] * Math.min(1, growthAt(i) + 0.2);
  initForest();
  initDiet();
  if (typeof initPreyMap === 'function') initPreyMap();
  initItems();
  for (let i = 0; i < W * H; i++) food[i] *= 1 - 0.35 * tree[i];
  const after = windowArrays();
  // what stays: copy it back from the old layers. A layer the startup code did not make again (weather, fire) is the same object as before: there the new strip is filled from the nearest old square
  after.forEach((cur, k) => {
    const o = old[k],
      same = before[k] === cur;
    for (let y = 0; y < H; y++) {
      const sy = y + dy;
      for (let x = 0; x < W; x++) {
        const sx = x + dx,
          i = y * W + x;
        if (sx >= 0 && sx < W && sy >= 0 && sy < H) cur[i] = o[sy * W + sx];
        else if (same) cur[i] = o[Math.min(H - 1, Math.max(0, sy)) * W + Math.min(W - 1, Math.max(0, sx))];
      }
    }
  });
  // everything that remembers a place moves with the window; animals that fall outside it are dropped (they live where nobody is: herds and hunters come back near people by themselves)
  const inside = (o) => o.x >= 0 && o.x < W && o.y >= 0 && o.y < H;
  for (const a of ag) {
    a.x -= dx;
    a.y -= dy;
    if (a.rx !== undefined) {
      a.rx -= dx;
      a.ry -= dy;
    }
    for (const m of [a.mw, a.mf]) if (m) ((m.x -= dx), (m.y -= dy));
    if (!inside(a)) a.left = true;
  }
  ag = ag.filter((a) => !a.left || ((a.left = false), false));
  BODIES = bodies.filter((b) => ((b.x -= dx), (b.y -= dy), inside(b)));
  if (park && PARK && park !== PARK) {
    for (const [, a] of park) {
      a.x -= dx;
      a.y -= dy;
      if (inside(a)) PARK.set(idx(a.x, a.y) * 2 + a.pc, a);
    }
    PREYSTAT = pstat;
  }
  for (const s of STORMS) ((s.x -= dx), (s.y -= dy));
  if (BANDAT) BANDAT = [BANDAT[0] - dx, BANDAT[1] - dy];
  CALLS.length = 0;
  OUCH.length = 0;
  STRIKES.length = 0;
  OVSHIFTS++;
  return true;
}
// once a day: if any hominin is within OVMARGIN squares of an edge, move the window so that the band is in the middle (as far as keeps every hominin 4 squares inside)
function maybeShiftWindow() {
  const hom = ag.filter((a) => a.sp === 0 && !a.dead && !a.gone);
  if (!hom.length) return;
  let minX = 1e9,
    maxX = -1e9,
    minY = 1e9,
    maxY = -1e9,
    cx = 0,
    cy = 0;
  for (const a of hom) {
    minX = Math.min(minX, a.x);
    maxX = Math.max(maxX, a.x);
    minY = Math.min(minY, a.y);
    maxY = Math.max(maxY, a.y);
    cx += a.x;
    cy += a.y;
  }
  cx /= hom.length;
  cy /= hom.length;
  const nearX = minX < OVMARGIN || maxX > W - 1 - OVMARGIN,
    nearY = minY < OVMARGIN || maxY > H - 1 - OVMARGIN;
  if (!nearX && !nearY) return;
  const lim = (v, lo, hi) => (lo > hi ? 0 : Math.min(hi, Math.max(lo, v)));
  const dx = nearX ? lim(Math.round(cx - W / 2), maxX - (W - 5), minX - 4) : 0,
    dy = nearY ? lim(Math.round(cy - H / 2), maxY - (H - 5), minY - 4) : 0;
  shiftWindow(dx, dy);
}
