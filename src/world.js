// Genesis — Building a new world: rivers, lake, ponds, sand, stone, boulders, pits, red berries, grass, and the first creatures.
// Copyright (c) 2026 Malvika Sen. MIT License.

// cfg: {people, herbivores, predators, fish}
function reset(cfg = {}) {
  water = new Uint8Array(W * H);
  rock = new Uint8Array(W * H);
  ter = new Uint8Array(W * H);
  food = new Float32Array(W * H);
  ag = [];
  tick = 0;
  hist = [];
  logs = [];
  kills = [0, 0, 0, 0];
  fished = 0;
  firsts = {};
  maxGen = 0;
  nLessons = 0;
  over = false;
  sel = null;
  for (const L of LG) for (const k in L) delete L[k];
  for (const k in DL) delete DL[k];
  const blob = (qx, qy, r) => {
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) if ((x - qx) ** 2 + (y - qy) ** 2 < r * r) water[idx(x, y)] = 1;
  };
  {
    let y = 4 + rnd() * (H - 8),
      dy = 0;
    for (let x = 0; x < W; x++) {
      dy = clamp(dy + (rnd() - 0.5) * 0.6, -0.8, 0.8);
      y = clamp(y + dy, 2, H - 3);
      for (let k = -1; k <= 1; k++) water[idx(x, clamp(Math.round(y) + k, 0, H - 1))] = 1;
    }
  }
  if (rnd() < 0.6) {
    let x = 8 + rnd() * (W - 16),
      dx = 0;
    for (let y = 0; y < H; y++) {
      dx = clamp(dx + (rnd() - 0.5) * 0.6, -0.8, 0.8);
      x = clamp(x + dx, 2, W - 3);
      for (let k = 0; k <= 1; k++) water[idx(clamp(Math.round(x) + k, 0, W - 1), y)] = 1;
    }
  }
  blob(8 + rnd() * (W - 16), 6 + rnd() * (H - 12), 3.5 + rnd() * 1.5);
  for (let p = 0; p < 5; p++) blob(4 + rnd() * (W - 8), 4 + rnd() * (H - 8), 1.2 + rnd() * 1.6);
  for (let k = 0; k < 8; k++) {
    const tx = rnd() * W,
      ty = rnd() * H,
      tr = 4 + rnd() * 7,
      tt = k < 4 ? 1 : 2;
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) if ((x - tx) ** 2 + (y - ty) ** 2 < tr * tr) ter[idx(x, y)] = tt;
  }
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!water[idx(x, y)]) continue;
      for (let dy = -2; dy <= 2; dy++)
        for (let dx = -2; dx <= 2; dx++)
          if (inb(x + dx, y + dy) && !water[idx(x + dx, y + dy)]) ter[idx(x + dx, y + dy)] = 1;
    }
  for (let i = 0; i < W * H; i++) if (ter[i] === 2 && !water[i] && rnd() < 0.1) rock[i] = 1;
  for (let k = 0; k < 26; k++) {
    const rx = rnd() * W,
      ry = rnd() * H,
      rr = 0.8 + rnd() * 1.6;
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++)
        if ((x - rx) ** 2 + (y - ry) ** 2 < rr * rr && !water[idx(x, y)]) rock[idx(x, y)] = 1;
  }
  pit = new Uint8Array(W * H);
  poison = new Uint8Array(W * H);
  for (let k = 0; k < 14; k++) {
    let x,
      y,
      t = 0;
    do {
      x = (rnd() * W) | 0;
      y = (rnd() * H) | 0;
      t++;
    } while (t < 200 && (water[idx(x, y)] || rock[idx(x, y)]));
    pit[idx(x, y)] = 1;
  }
  for (let k = 0; k < 10; k++) {
    const bx = rnd() * W,
      by = rnd() * H;
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const i = idx(x, y);
        if (
          (x - bx) ** 2 + (y - by) ** 2 < 4 &&
          !water[i] &&
          !rock[i] &&
          !pit[i] &&
          ter[i] !== 1 &&
          rnd() < 0.5
        )
          poison[i] = 1;
      }
  }
  deep = new Uint8Array(W * H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!water[idx(x, y)]) continue;
      let d = 1;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) if (inb(x + dx, y + dy) && !water[idx(x + dx, y + dy)]) d = 0;
      deep[idx(x, y)] = d;
    }
  for (let i = 0; i < W * H; i++)
    food[i] = rock[i] || pit[i] ? 0 : water[i] ? rnd() * 0.5 : rnd() * 0.6 * TF[ter[i]];
  const n = clamp(cfg.people ?? 2, 2, 40),
    nh = clamp(cfg.herbivores ?? 14, 0, 40),
    np = clamp(cfg.predators ?? 3, 0, 8),
    nf = clamp(cfg.fish ?? 24, 0, 60),
    inst = true;
  NID = 0;
  spawn(0, n, inst);
  spawn(1, nh, inst);
  spawn(2, np, inst);
  spawn(3, nf, inst);
  log(
    'The world begins with ' +
      n +
      ' young people, ' +
      nh +
      ' young herbivores and ' +
      np +
      ' young predators (a small pack), and ' +
      nf +
      ' fish in the ponds. There are rivers, ponds, pits and bushes of red berries, some of them poisonous to eat. Until they grow up, the world keeps them from starving.'
  );
}
