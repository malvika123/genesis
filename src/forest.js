// Genesis — Forests: where trees grow, how they spread and die back, and the fruit they bear.
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// Trees need warmth and water over the long run. So forests grow thickest in the warm, rainy tropics
// (rainforest), as broadleaf woods in the mild middle latitudes, and as pine forest where it is cold —
// up to a treeline on the mountains, beyond which it is too cold for any tree. Deserts, beaches and
// bare rock stay open. Over years a forest thickens when the soil is moist and thins in a drought.
//
// For the creatures, trees give fruit (food for people), shelter from rain and wind, places to hide,
// and they shade out the grass below and slow you down.

let tree, // how thick the forest is in each cell, 0 … 1
  fruit, // ripe fruit on those trees
  tcap, // the most forest the climate there can carry
  fkind; // 0 none, 1 pine, 2 broadleaf, 3 rainforest
const FOREST = ['', 'pine forest', 'woods', 'rainforest'];

// average temperature over the year at a cell (no season, no night), °C
function meanTemp(i) {
  const L = lat((i / W) | 0),
    a = Math.abs(L);
  return 28 - 40 * a ** 1.6 - LAPSE * Math.max(0, alt[i]);
}

function initForest() {
  const n = W * H;
  tree = new Float32Array(n);
  fruit = new Float32Array(n);
  tcap = new Float32Array(n);
  fkind = new Uint8Array(n);
  const patch = fractal(10, 2, 0.5); // natural clearings and glades
  for (let i = 0; i < n; i++) {
    if (water[i] || rock[i] || pit[i]) continue;
    const y = (i / W) | 0,
      T = meanTemp(i),
      warm = clamp((T + 3) / 12, 0, 1), // the treeline: no trees where the year averages below about −3 °C
      wet = clamp((rainGuess(y) + 0.35 * Math.max(0, alt[i]) - 0.25) / 0.55, 0, 1),
      ground = ter[i] === 1 ? 0.12 : ter[i] === 2 ? 0.45 : 1;
    tcap[i] = warm * wet * ground * (0.45 + 0.75 * patch(i % W, y));
    tcap[i] = Math.min(1, tcap[i]);
    fkind[i] = tcap[i] < 0.08 ? 0 : T < 6 ? 1 : T > 20 && wet > 0.6 ? 3 : 2;
    tree[i] = tcap[i] * (0.75 + 0.25 * rnd()) * (MOISTY ? clamp(0.3 + MOISTY[i] * 2.2, 0, 1) : 1);
    if (tree[i] < 0.05) tree[i] = 0;
  }
}

function updateForest() {
  const n = W * H;
  // slow change: every few steps, each forest moves toward what the climate and the soil allow
  if (tick % 8 === 0)
    for (let i = 0; i < n; i++) {
      if (!tcap[i]) continue;
      const target = tcap[i] * clamp(0.3 + MOIST[i] * 2.2, 0, 1);
      tree[i] += (target - tree[i]) * (target > tree[i] ? 0.003 : 0.006);
      if (tree[i] < 0.02) tree[i] = 0;
    }
  // fruit ripens on trees in the warm, growing part of the year, and slowly rots away
  for (let i = 0; i < n; i++) {
    if (tree[i] < 0.25 || water[i]) {
      fruit[i] = 0;
      continue;
    }
    const g = growthAt(i);
    fruit[i] = Math.min(tree[i] * 0.7, fruit[i] * 0.9995 + 0.0012 * tree[i] * Math.max(0, g - 0.3));
  }
}

// how thick the trees are where a creature stands (0 if it is in the water)
// trees give cover; a cave gives more
// Branches piled high in one place keep off wind and rain and hide whoever is inside, as a brush shelter
// or windbreak does; a few lying about do nothing. (Only the possibility is given: nothing tells anyone to
// build one. More branches than ever fall naturally in one place — four — have to be carried there.)
const brush = (i) => (typeof stick === 'undefined' || !stick ? 0 : Math.max(0, Math.min(0.8, (stick[i] - 4) / 8)));
const cover = (i) => (water[i] ? 0 : Math.max(cave[i] ? Math.max(tree[i], 0.9) : tree[i], brush(i)));
