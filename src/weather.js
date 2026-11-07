// Genesis — Weather: the water cycle.
// Copyright (c) 2026 Malvika Sen. MIT License.
//
//   evaporation → the wind carries the moisture → it cools and condenses into clouds → rain or snow
//   → wet soil and puddles → grass grows (or doesn't, in a drought) → water evaporates again.
//
// Everything lives on the same grid as the land. Units are loose but the shape follows the real
// thing: warm air holds far more water than cold air (roughly Clausius–Clapeyron), and the
// prevailing winds change with latitude like Earth's trade winds, westerlies and polar easterlies,
// so the tropics end up rainy and the belts around 30° drier.

let HUM, // water vapour in the air
  CLD, // cloud water
  RAIN, // what fell on each cell this step (rain, or snow where it is freezing)
  MOIST, // soil moisture on land, 0 (parched) … 1 (soaked)
  PUD, // a puddle after heavy rain: drinkable, shallow, dries up again
  PW; // how much water is standing in that puddle
let TMP1 = null,
  TMP2 = null;

// how much water the air can hold at a temperature (°C)
const capacity = (T) => 0.25 * Math.exp(0.065 * T);

// prevailing wind at a row, in cells per step: [east–west, north–south] (positive = east, south)
function windAt(y) {
  const deg = latOfRow(y),
    a = Math.abs(deg),
    towardEquator = deg > 0 ? 1 : -1; // north half: equator is south (+y)
  if (a < 30) return [-0.22, 0.06 * towardEquator]; // trade winds: blow west, converge at the equator
  if (a < 60) return [0.25, -0.04 * towardEquator]; // westerlies: blow east, drift poleward
  return [-0.15, 0.04 * towardEquator]; // polar easterlies
}
// latitude in degrees for a row: +80 at the top, −80 at the bottom (matches the globe)
const latOfRow = (y) => 80 * (1 - (2 * (y + 0.5)) / H);
// Rising air cools, and that is what really makes rain. Where the trade winds meet at the equator,
// and where cold polar air meets the westerlies around 60°, air is pushed up and its water condenses.
// Around 30° the air sinks and warms, so those belts are dry: the world's great deserts.
// The tropical rain belt follows the sun: a little north in northern summer, south in southern summer.
function lift(y) {
  const d = latOfRow(y),
    a = Math.abs(d),
    bump = (x, c, w) => Math.exp(-(((x - c) / w) ** 2));
  return 16 * bump(d, 8 * season(), 8) + 4 * bump(a, 60, 9) - 6 * bump(a, 28, 8);
}
const LIFT = new Float32Array(H);

function initWeather() {
  const n = W * H;
  STORMS = [];
  SLIFT.fill(0);
  HUM = new Float32Array(n);
  CLD = new Float32Array(n);
  RAIN = new Float32Array(n);
  MOIST = new Float32Array(n);
  PUD = new Uint8Array(n);
  PW = new Float32Array(n);
  TMP1 = new Float32Array(n);
  TMP2 = new Float32Array(n);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      HUM[i] = capacity(RT[y]) * 0.6;
      MOIST[i] = water[i] ? 1 : 0.45 + 0.1 * rnd();
    }
}

// move a field with the wind (simple upwind scheme; wraps east–west, closed at the poles)
function advect(F, out) {
  for (let y = 0; y < H; y++) {
    const [u, v] = windAt(y);
    for (let x = 0; x < W; x++) {
      const i = y * W + x,
        xu = u > 0 ? (x - 1 + W) % W : (x + 1) % W,
        yu = v > 0 ? y - 1 : y + 1,
        fu = F[y * W + xu],
        fv = yu >= 0 && yu < H ? F[yu * W + x] : F[i];
      out[i] = F[i] - Math.abs(u) * (F[i] - fu) - Math.abs(v) * (F[i] - fv);
    }
  }
  F.set(out);
}
// a little mixing with neighbours, so weather spreads instead of staying in stripes
function diffuse(F, out, k) {
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x,
        n = y > 0 ? F[i - W] : F[i],
        s = y < H - 1 ? F[i + W] : F[i],
        e = F[y * W + ((x + 1) % W)],
        w = F[y * W + ((x - 1 + W) % W)];
      out[i] = F[i] + k * ((n + s + e + w) / 4 - F[i]);
    }
  F.set(out);
}

// Storms: drifting areas of low pressure where air rises, so clouds and rain come in patches that
// travel with the wind, grow, and die out, instead of sitting in even stripes.
let STORMS = [];
const SLIFT = new Float32Array(W * H);
function moveStorms() {
  if (STORMS.length < 9 && rnd() < 0.02) {
    const band = rnd(),
      deg = band < 0.4 ? (rnd() - 0.5) * 30 : (rnd() < 0.5 ? 1 : -1) * (40 + rnd() * 25),
      y = clamp(Math.round(((80 - deg) / 160) * H - 0.5), 1, H - 2);
    STORMS.push({
      x: rnd() * W,
      y,
      r: 2.5 + rnd() * 3,
      age: 0,
      life: DAY * (0.6 + rnd() * 1.5),
      k: 6 + rnd() * 8,
    });
  }
  SLIFT.fill(0);
  for (const st of STORMS) {
    const [u, v] = windAt(Math.round(st.y));
    st.x = (st.x + u * 0.8 + W) % W;
    st.y = clamp(st.y + v * 0.5, 1, H - 2);
    st.age++;
    const grow = Math.sin((Math.PI * st.age) / st.life),
      R = Math.ceil(st.r * 2);
    for (let dy = -R; dy <= R; dy++)
      for (let dx = -R; dx <= R; dx++) {
        const y = Math.round(st.y) + dy;
        if (y < 0 || y >= H) continue;
        SLIFT[idx(Math.round(st.x) + dx, y)] += st.k * grow * Math.exp(-(dx * dx + dy * dy) / (st.r * st.r));
      }
  }
  STORMS = STORMS.filter((st) => st.age < st.life);
}

function updateWeather() {
  const n = W * H;
  for (let y = 0; y < H; y++) LIFT[y] = lift(y);
  for (let i = 0; i < n; i++) {
    const y = (i / W) | 0,
      night = isNightAt(i % W),
      T = RT[y] - (night ? 4 : 0),
      x = i % W,
      // rising air is patchy along each belt, and the patches drift over the days
      patch =
        0.5 +
        0.5 *
          Math.sin((6.283 * 3 * x) / W + tick / 70 + y * 0.4) *
          Math.sin((6.283 * 2 * x) / W - tick / 110),
      cap = capacity(T - LIFT[y] * (LIFT[y] > 0 ? 0.35 + 1.1 * patch : 1) - SLIFT[i]),
      warm = clamp(T / 30, 0, 1.2),
      dry = Math.max(0, 1 - HUM[i] / capacity(T));
    // evaporation: from open water, and from wet ground and plants
    if (liquid(i)) HUM[i] += 0.02 * warm * dry;
    else if (!water[i] && MOIST[i] > 0) {
      const e = Math.min(MOIST[i], 0.004 * MOIST[i] * warm * dry);
      HUM[i] += e;
      MOIST[i] -= e * 0.8;
    }
    // condensation: air holding more than it can makes cloud; clouds slowly vanish in dry air
    if (HUM[i] > cap) {
      const c = (HUM[i] - cap) * 0.3;
      HUM[i] -= c;
      CLD[i] += c;
    } else if (CLD[i] > 0) {
      const back = Math.min(CLD[i], (cap - HUM[i]) * 0.04);
      CLD[i] -= back;
      HUM[i] += back;
    }
    // rain (or snow) from heavy clouds
    let r = 0;
    if (CLD[i] > 0.12) {
      r = (CLD[i] - 0.12) * 0.12;
      CLD[i] -= r;
    }
    RAIN[i] = r;
    if (!water[i]) {
      // rain soaks in; water also slowly drains away deeper into the ground
      const m = MOIST[i] + r * 1.2 - 0.0006;
      MOIST[i] = clamp(m, 0, 1);
      // rain that the soaked ground can't take pools into a puddle, which seeps away and evaporates
      if (!rock[i] && !pit[i]) {
        PW[i] = Math.max(0, PW[i] + Math.max(0, m - 1) - 0.004 - 0.006 * warm);
        PUD[i] = PW[i] > 0.04 ? 1 : 0;
      }
    }
  }
  moveStorms();
  advect(HUM, TMP1);
  advect(CLD, TMP1);
  diffuse(HUM, TMP1, 0.08);
  diffuse(CLD, TMP2, 0.05);
}

// what the weather is doing at a cell, for people watching
const raining = (i) => RAIN[i] > 0.002;
const snowing = (i) => raining(i) && RT[(i / W) | 0] < 0;
// how well plants grow with this much water in the ground
const wetness = (i) => (water[i] ? 1 : clamp(0.35 + MOIST[i] * 1.5, 0, 1));
// drinkable water at a cell: open (unfrozen) water, or a puddle
const drinkable = (i) => liquid(i) || PUD[i] === 1;
