// Genesis — Terrain: a height map with oceans, continents, mountain ranges, lakes and rivers.
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// 1. Height comes from layered noise that wraps east–west (the world is round), with ridged noise
//    added on land for mountain ranges.
// 2. Everything below sea level is ocean: salty, shallow near the coast and deep further out.
// 3. Rain has to drain to the sea. Filling the land from the coast upward (a "priority flood")
//    finds basins that would trap water — those become lakes — and gives every cell a downhill path.
// 4. Following those paths and adding up the rain that falls upstream gives rivers: they start in
//    wet uplands and join into bigger rivers on their way to the sea.
// 5. Beaches, deserts, stony mountains, boulders, pits and berry bushes are placed from all that.

// noise on a lattice: fx cells around the world (wraps), fy cells top to bottom
function noiseLayer(fx, fy) {
  const g = new Float32Array(fx * (fy + 1));
  for (let k = 0; k < g.length; k++) g[k] = rnd();
  const s = (t) => t * t * (3 - 2 * t);
  return (x, y) => {
    const u = (x / W) * fx,
      v = (y / (H - 1)) * fy,
      x0 = Math.floor(u),
      y0 = Math.min(fy - 1, Math.floor(v)),
      tx = s(u - x0),
      ty = s(v - y0),
      a = g[y0 * fx + (x0 % fx)],
      b = g[y0 * fx + ((x0 + 1) % fx)],
      c = g[(y0 + 1) * fx + (x0 % fx)],
      d = g[(y0 + 1) * fx + ((x0 + 1) % fx)];
    return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
  };
}
function fractal(base, octaves, falloff) {
  const L = [];
  for (let o = 0; o < octaves; o++) {
    const fx = base * 2 ** o;
    L.push([noiseLayer(fx, Math.max(2, Math.round((fx * H) / W))), falloff ** o]);
  }
  const tot = L.reduce((t, l) => t + l[1], 0);
  return (x, y) => L.reduce((t, [f, a]) => t + f(x, y) * a, 0) / tot;
}

// a tiny binary min-heap for the priority flood
function heap() {
  const k = [],
    v = [];
  const up = (i) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (v[p] <= v[i]) break;
      [k[p], k[i]] = [k[i], k[p]];
      [v[p], v[i]] = [v[i], v[p]];
      i = p;
    }
  };
  const down = (i) => {
    for (;;) {
      const l = 2 * i + 1,
        r = l + 1;
      let m = i;
      if (l < v.length && v[l] < v[m]) m = l;
      if (r < v.length && v[r] < v[m]) m = r;
      if (m === i) break;
      [k[m], k[i]] = [k[i], k[m]];
      [v[m], v[i]] = [v[i], v[m]];
      i = m;
    }
  };
  return {
    size: () => v.length,
    push(key, val) {
      k.push(key);
      v.push(val);
      up(v.length - 1);
    },
    pop() {
      const key = k[0];
      const lk = k.pop(),
        lv = v.pop();
      if (v.length) {
        k[0] = lk;
        v[0] = lv;
        down(0);
      }
      return key;
    },
  };
}
const NB8 = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

// a rough guess of how wet each latitude is, used only to decide where rivers form
function rainGuess(y) {
  const d = 80 * (1 - (2 * (y + 0.5)) / H),
    a = Math.abs(d),
    bump = (x, c, w) => Math.exp(-(((x - c) / w) ** 2));
  return 0.35 + 0.9 * bump(a, 0, 12) + 0.6 * bump(a, 55, 14) - 0.3 * bump(a, 28, 8);
}

const SEA = 0.5; // share of the world covered by sea (Earth: about 0.7; less here so there is room to live)

function makeTerrain() {
  const n = W * H;
  water = new Uint8Array(n);
  salt = new Uint8Array(n);
  rock = new Uint8Array(n);
  ter = new Uint8Array(n);
  alt = new Float32Array(n);
  deep = new Uint8Array(n);
  pit = new Uint8Array(n);
  poison = new Uint8Array(n);
  river = new Uint8Array(n);

  // 1. height
  const cont = fractal(3, 5, 0.5),
    ridgeN = fractal(5, 3, 0.5),
    h = new Float32Array(n);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x,
        r = 1 - Math.abs(2 * ridgeN(x, y) - 1);
      h[i] = cont(x, y) + 0.22 * r ** 3;
    }
  const sorted = Float32Array.from(h).sort(),
    sea = sorted[Math.floor(SEA * n)],
    top = sorted[n - 1];
  for (let i = 0; i < n; i++) {
    if (h[i] >= sea)
      alt[i] = 5 * ((h[i] - sea) / (top - sea)) ** 1.7; // km above sea level
    else alt[i] = -4.5 * ((sea - h[i]) / (sea - sorted[0])) ** 0.6; // km below
  }

  // 2. the sea; shallow near the coast, deep further out
  for (let i = 0; i < n; i++) if (alt[i] < 0) water[i] = salt[i] = 1;
  const coastDist = new Uint8Array(n).fill(255);
  {
    const q = [];
    for (let i = 0; i < n; i++)
      if (!salt[i]) {
        coastDist[i] = 0;
        q.push(i);
      }
    for (let qi = 0; qi < q.length; qi++) {
      const i = q[qi],
        x = i % W,
        y = (i / W) | 0;
      for (const [dx, dy] of NB8.slice(0, 4)) {
        if (!inb(x, y + dy)) continue;
        const j = idx(x + dx, y + dy);
        if (coastDist[j] > coastDist[i] + 1) {
          coastDist[j] = coastDist[i] + 1;
          q.push(j);
        }
      }
    }
  }
  for (let i = 0; i < n; i++) if (salt[i] && coastDist[i] > 2) deep[i] = 1;

  // 3. priority flood from the coast: fills basins (lakes) and finds each cell's way downhill
  const fill = new Float32Array(n),
    seen = new Uint8Array(n),
    down = new Int32Array(n).fill(-1),
    order = [],
    pq = heap();
  for (let i = 0; i < n; i++)
    if (salt[i]) {
      seen[i] = 1;
      fill[i] = alt[i];
      const x = i % W,
        y = (i / W) | 0;
      for (const [dx, dy] of NB8) {
        if (!inb(x, y + dy)) continue;
        const j = idx(x + dx, y + dy);
        if (!salt[j]) {
          pq.push(i, 0);
          break;
        }
      }
    }
  // a world with no sea at all still needs somewhere to drain: use the lowest cell
  if (!pq.size()) {
    let lo = 0;
    for (let i = 1; i < n; i++) if (alt[i] < alt[lo]) lo = i;
    seen[lo] = 1;
    fill[lo] = alt[lo];
    pq.push(lo, alt[lo]);
  }
  while (pq.size()) {
    const i = pq.pop(),
      x = i % W,
      y = (i / W) | 0;
    order.push(i);
    for (const [dx, dy] of NB8) {
      if (!inb(x, y + dy)) continue;
      const j = idx(x + dx, y + dy);
      if (seen[j]) continue;
      seen[j] = 1;
      fill[j] = Math.max(alt[j], fill[i] + 1e-4);
      down[j] = i;
      pq.push(j, fill[j]);
    }
  }
  // lakes: basins at least 60 m deep become fresh water
  for (let i = 0; i < n; i++) if (!salt[i] && fill[i] - alt[i] > 0.06) water[i] = 1;

  // 4. rivers: add up the rain draining through every cell
  const acc = new Float32Array(n);
  for (let k = order.length - 1; k >= 0; k--) {
    const i = order[k];
    if (salt[i]) continue;
    acc[i] += rainGuess((i / W) | 0) * (1 + 0.4 * Math.max(0, alt[i]));
    if (down[i] >= 0) acc[down[i]] += acc[i];
  }
  const landAcc = [];
  for (let i = 0; i < n; i++) if (!water[i]) landAcc.push(acc[i]);
  landAcc.sort((p, q) => p - q);
  const riverAt = landAcc[Math.floor(landAcc.length * 0.955)] || Infinity;
  for (let i = 0; i < n; i++)
    if (!water[i] && acc[i] >= riverAt) {
      water[i] = 1;
      river[i] = 1;
    }
  // deep middles of big lakes
  for (let i = 0; i < n; i++) {
    if (!water[i] || salt[i] || river[i]) continue;
    const x = i % W,
      y = (i / W) | 0;
    let d = fill[i] - alt[i] > 0.25 ? 1 : 0;
    for (const [dx, dy] of NB8) if (inb(x, y + dy) && !water[idx(x + dx, y + dy)]) d = 0;
    deep[i] = d;
  }

  // 5. ground: beaches, deserts, stony mountains
  for (let i = 0; i < n; i++) {
    if (water[i]) continue;
    const y = (i / W) | 0;
    if (alt[i] > 1.6) ter[i] = 2;
    else if (coastDist[i] <= 1 && alt[i] < 0.25) ter[i] = 1;
    else if (rainGuess(y) < 0.15 && alt[i] < 1.2) ter[i] = 1;
  }
  const patches = fractal(8, 2, 0.5);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (water[i]) continue;
      const p = patches(x, y);
      if (!ter[i] && p > 0.72) ter[i] = 2;
      if (!ter[i] && p < 0.12 && alt[i] < 0.8) ter[i] = 1;
    }
  for (let i = 0; i < n; i++) {
    if (water[i]) continue;
    if ((ter[i] === 2 && rnd() < 0.12) || (alt[i] > 3 && rnd() < 0.25)) rock[i] = 1;
  }
  const area = n / 2560;
  for (let k = 0; k < 14 * area; k++) {
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
  for (let k = 0; k < 10 * area; k++) {
    const bx = rnd() * W,
      by = rnd() * H;
    for (let dy = -2; dy <= 2; dy++)
      for (let dx = -2; dx <= 2; dx++) {
        const y = Math.round(by) + dy;
        if (!inb(0, y) || dx * dx + dy * dy >= 4) continue;
        const i = idx(Math.round(bx) + dx, y);
        if (!water[i] && !rock[i] && !pit[i] && ter[i] !== 1 && rnd() < 0.5) poison[i] = 1;
      }
  }
}
