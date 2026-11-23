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
  if (SOC.valley) return valleyTrees(patch);
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
  if (SOC.youngLeaves || SOC.termites) updateDiet();
  // slow change: every few steps, each forest moves toward what the climate and the soil allow
  if (tick % 8 === 0)
    for (let i = 0; i < n; i++) {
      if (!tcap[i]) continue;
      const target = tcap[i] * clamp(0.3 + MOIST[i] * 2.2, 0, 1);
      tree[i] += (target - tree[i]) * (target > tree[i] ? 0.003 : 0.006);
      if (tree[i] < 0.02) tree[i] = 0;
    }
  // fruit ripens on trees in the warm, growing part of the year, and slowly rots away.
  // The fruit calendar (entry 89; --fruit-follows-warmth: the old rule): in savanna woodland, fruit is most plentiful when the rains
  // stop and scarcest late in the rains (Issa: Piel et al. 2017). Ripening follows the dryness of each month of a real station's year
  // (Uvinza, FRUITCAL), mirrored by hemisphere, on the life clock; ripe fruit hangs about SOC.fruitHang of a year; ripening is scaled
  // so that, uneaten, the year's mean standing fruit is as before (only its timing changes).
  const cal = SOC.fruitCal,
    keep = cal ? Math.exp(-1 / (SOC.fruitHang * TY)) : 0.9995,
    rip = cal ? (1 - keep) / (1 - 0.9995) : 1,
    mS = cal ? fruitMonth(false) : 0,
    mN = cal ? fruitMonth(true) : 0;
  for (let i = 0; i < n; i++) {
    if (tree[i] < 0.25 || water[i]) {
      fruit[i] = 0;
      continue;
    }
    const g = growthAt(i),
      c = cal ? rip * FRUITCAL[latOfRow((i / W) | 0) >= 0 ? mN : mS] : 1;
    fruit[i] = Math.min(tree[i] * 0.7, fruit[i] * keep + 0.0012 * c * tree[i] * Math.max(0, g - 0.3));
  }
}

// Uvinza's year (data/reference/uvinza-rain.csv, 1973-1989; checked against the file by tests/seasons.test.js): each month's share
// of the year's rain, January first. Its dryness (1 - share / the wettest month's share), averaged to 1 over the year, sets how fast
// fruit ripens that month: a real station's year as a labelled stand-in for the hominins' home (the owner, 16 Nov 2026; entry 88).
const UVINZA = [0.1350, 0.1111, 0.1541, 0.1437, 0.0371, 0.0013, 0.0013, 0.0042, 0.0128, 0.0671, 0.1619, 0.1705],
  FRUITCAL = (() => {
    const mx = Math.max(...UVINZA),
      d = UVINZA.map((s) => 1 - s / mx),
      m = d.reduce((u, v) => u + v, 0) / 12;
    return d.map((v) => v / m);
  })();
// which month of Uvinza's (southern) year it is: the world's southern midsummer (season() lowest, three quarters through the year)
// is about 21 December; the north is six months apart
function fruitMonth(north) {
  const p = (tick % TY) / TY,
    m = (((11.67 + (p - 0.75) * 12) % 12) + 12 + (north ? 6 : 0)) % 12;
  return Math.floor(m);
}
// how thick the trees are where a creature stands (0 if it is in the water)
// trees give cover; a cave gives more
// Branches piled high in one place keep off wind and rain and hide whoever is inside, as a brush shelter
// or windbreak does; a few lying about do nothing. (Only the possibility is given: nothing tells anyone to
// build one. More branches than ever fall naturally in one place — four — have to be carried there.)
const brush = (i) => (typeof stick === 'undefined' || !stick || !SOC.shelter ? 0 : Math.max(0, Math.min(0.8, (stick[i] - 4) / 8)));
const cover = (i) => (water[i] ? 0 : Math.max(cave[i] ? Math.max(tree[i], 0.9) : tree[i], brush(i)));

// The realistic diet (23 Nov 2026; docs/design/realistic-diet.md, docs/design/colour-eye-and-curiosity.md): young leaves and termites as real, patchy, seasonal foods that can be eaten down.
// YL: young leaves per square (0..1), a flush that follows the rains (target = tree cover x (0.15 + 0.85 x soil moisture): an assumption: young leaves come with new growth after rain) and
// grows back toward it (SOC.ylRate a step: an assumption), eaten down by feeding. TERM: termites a hand can reach per square (0..1): mounds stay for years, the supply is used up by eating and comes back within hours
// (SOC.termRate); the cap scales with the mound density over the square's area (SOC.moundDens per km2, an assumption: none sourced; a globe square is 9 km2, a valley square 0.0625 km2).
let YL = null,
  TERM = null,
  TERMCAP = null;
function initDiet() {
  const n = W * H;
  YL = new Float32Array(n);
  TERM = new Float32Array(n);
  TERMCAP = new Float32Array(n);
  const km2 = SOC.valley ? 0.0625 : 9;
  for (let i = 0; i < n; i++) {
    if (water[i] || rock[i]) continue;
    if (SOC.youngLeaves) YL[i] = tree[i] * 0.5;
    if (SOC.termites && ter[i] !== 1) {
      TERMCAP[i] = Math.min(1, SOC.moundDens * km2 * 0.1) * (tree[i] < 0.7 ? 1 : 0.5) * (0.5 + 0.5 * rnd());
      TERM[i] = TERMCAP[i];
    }
  }
}
function updateDiet() {
  const n = W * H;
  for (let i = 0; i < n; i++) {
    if (YL && SOC.youngLeaves && tree[i] > 0.05) {
      const target = tree[i] * (0.15 + 0.85 * clamp(MOIST[i], 0, 1));
      YL[i] += (target - YL[i]) * (target > YL[i] ? SOC.ylRate : 0.05);
    }
    if (TERM && SOC.termites && TERMCAP[i] > 0 && TERM[i] < TERMCAP[i]) TERM[i] = Math.min(TERMCAP[i], TERM[i] + SOC.termRate * TERMCAP[i]);
  }
}
// The valley's woody cover (entry 117, docs/design/valley-spec.md; V1c): from the statistics of the Gona record, not from the globe's latitude guess. Woody cover on the floodplain is registered as a range
// (SOC.valleyWoody, default 0.35: Cerling et al. 2011 found most eastern African hominin sites under 40%; Gona's floodplain about 50% grass: Quade et al. 2004; tested at 0.30 and 0.50);
// a gallery woodland strip (Ficus, Tamarix) along the river (Hadar pollen: secondary), dense (about 0.85) within 0.5 km of it; open acacia/Commiphora steppe on the terraces and valley sides at 0.6 of the
// floodplain's cover (an assumption). Patchiness from the same noise as the globe's glades. The scale is set so that the mean woody cover of the floodplain's non-gallery land equals the registered value.
function valleyTrees(patch) {
  const n = W * H,
    SQ = 0.25;
  let nearRiver = new Float32Array(n).fill(1e9);
  const q = [];
  for (let i = 0; i < n; i++) if (river[i]) (nearRiver[i] = 0), q.push(i);
  for (let qi = 0; qi < q.length; qi++) {
    const i = q[qi], x = i % W, y = (i / W) | 0;
    for (const [dx, dy] of NB8.slice(0, 4)) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue;
      const j = ny * W + nx;
      if (nearRiver[j] > nearRiver[i] + 1) (nearRiver[j] = nearRiver[i] + 1), q.push(j);
    }
  }
  const zone = (i) => (nearRiver[i] * SQ <= 0.5 ? 2 : nearRiver[i] * SQ <= 3 ? 1 : 0), // 2 gallery strip, 1 floodplain, 0 terraces and sides
    base = new Float32Array(n);
  let sum = 0, cnt = 0;
  for (let i = 0; i < n; i++) {
    if (water[i] || rock[i] || pit[i]) continue;
    const y = (i / W) | 0, z = zone(i), ground = ter[i] === 2 ? 0.45 : 1;
    base[i] = ground * (0.45 + 0.75 * patch(i % W, y));
    if (z === 1) (sum += base[i]), cnt++;
  }
  const s = cnt ? SOC.valleyWoody / (sum / cnt) : 1;
  for (let i = 0; i < n; i++) {
    if (water[i] || rock[i] || pit[i]) continue;
    const z = zone(i), y = (i / W) | 0;
    tcap[i] = Math.min(1, z === 2 ? 0.85 * (0.8 + 0.2 * base[i]) : z === 1 ? s * base[i] : 0.6 * s * base[i]);
    fkind[i] = tcap[i] < 0.08 ? 0 : 3; // warm savanna woodland: the same fruit kind as the globe's at Gona
    tree[i] = tcap[i] * (0.75 + 0.25 * rnd());
    if (tree[i] < 0.05) tree[i] = 0;
  }
}
