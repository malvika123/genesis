// Genesis — Fire: what burns, when it can catch, what starts it, how it spreads, and how it goes out.
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// Fire needs three things — fuel, heat and oxygen (the fire triangle) — and in the open the air always
// supplies the oxygen. So here fire comes down to fuel, how dry that fuel is, and something hot enough
// to light it:
//
//   Fuel      grass (fine fuel, catches and burns fast), trees (burn slowly, for longer), fallen sticks.
//   Dryness   wet fuel will not catch. Dryness follows the soil moisture (drought), falls to nothing in
//             rain, and drops when the air is humid; frozen ground hardly burns.
//   Ignition  in nature mostly lightning — above all "dry lightning", from storms that bring little rain
//             over dry land. Only a small share of strikes light anything, and a strike can smoulder
//             for a day before it flares up. Very rarely, sparks from rocks falling on steep, dry slopes.
//             (This world has no volcanoes, so no volcanic fires.) Later, perhaps, people: sparks struck
//             from pyrite with a stone (the oldest evidence of fire-making, about 400,000 years old,
//             includes pyrite; flint struck on flint alone makes sparks too weak to light anything), or
//             long, patient rubbing of dry wood.
//   Spread    fastest with the wind and uphill, through dry, plentiful fuel; water and bare rock stop it;
//             rain puts it out.
//
// After a fire, the ground is burnt; grass grows back from its roots, trees take years. Nuts on the
// ground are roasted and an animal caught in the fire is cooked — food that early humans found
// after wildfires, long before they could make fire themselves.

let FIRE, // how fiercely each square is burning, 0 … 1
  SMOL, // steps a lightning strike will smoulder before it flares up or dies
  BURNT, // how freshly burnt the ground is, 1 … 0
  COOK, // food cooked by fire lying there: roasted nuts, a cooked carcass
  BURNING = []; // the squares on fire now
let fireStats = { lit: 0, burned: 0 };

function initFire() {
  const n = W * H;
  FIRE = new Float32Array(n);
  SMOL = new Uint16Array(n);
  BURNT = new Float32Array(n);
  COOK = new Float32Array(n);
  BURNING = [];
  fireStats = { lit: 0, burned: 0 };
}

// how much there is to burn in a square
const fuelOf = (i) => (water[i] || rock[i] ? 0 : 0.7 * food[i] + 1.2 * tree[i] + 0.08 * stick[i]);
// how dry its grass and wood are, 0 (soaked) … 1 (tinder-dry)
function dryness(i) {
  if (water[i] || RAIN[i] > 0.002) return 0;
  let d = clamp((0.42 - MOIST[i]) / 0.22, 0, 1);
  const rh = HUM[i] / capacity(cellT(i));
  d *= clamp((0.95 - rh) / 0.5, 0, 1);
  if (cellT(i) < 0) d *= 0.3;
  return d;
}
// fallen sticks dry out within hours unless it is raining: a fire of sticks can burn on damp ground
const stickDry = (i) => (RAIN[i] > 0.002 ? 0.1 : 0.85);

function ignite(i, f = 0.12) {
  if (water[i] || rock[i] || fuelOf(i) < 0.04) return false;
  if (!FIRE[i]) {
    BURNING.push(i);
    fireStats.lit++;
  }
  FIRE[i] = Math.max(FIRE[i], f);
  return true;
}

function updateFire() {
  const n = W * H;
  // lightning: a strike on fuel may light it now if it is dry, or smoulder for a while
  for (const b of STRIKES) {
    if (b.t !== tick) continue;
    const i = b.y * W + b.x;
    if (fuelOf(i) < 0.06) continue;
    // each strike here stands for the many real flashes of a storm, so on dry fuel one often catches
    const d = dryness(i),
      p = 0.6 * d * (RAIN[i] > 0.008 ? 0.3 : 1);
    if (rnd() < p) {
      if (d > 0.4) ignite(i, 0.15);
      else SMOL[i] = DAY;
    }
  }
  // smouldering strikes flare up in dry, sunny weather, or die out in the rain
  if (tick % 4 === 0)
    for (let i = 0; i < n; i++) {
      if (!SMOL[i]) continue;
      SMOL[i] = Math.max(0, SMOL[i] - 4);
      if (RAIN[i] > 0.002) SMOL[i] = 0;
      else if (dryness(i) > 0.5 && rnd() < 0.06) {
        SMOL[i] = 0;
        ignite(i, 0.1);
      }
    }
  // very rarely, rocks tumbling down a steep, dry slope strike sparks into dry grass
  if (tick % 8 === 0)
    for (let k = 0; k < 4; k++) {
      const i = (rnd() * n) | 0,
        x = i % W,
        y = (i / W) | 0;
      let steep = 0;
      for (const [dx, dy] of MV)
        if (inb(x, y + dy)) steep = Math.max(steep, alt[idx(x + dx, y + dy)] - alt[i]);
      if (steep > 0.6 && dryness(i) > 0.7 && rnd() < 0.002) ignite(i, 0.1);
    }
  // burning: fire grows toward what its fuel and dryness allow, eats its fuel, and spreads
  const next = [],
    cur = BURNING;
  BURNING = []; // squares lit during this step gather here, and start burning next step
  for (const i of cur) {
    let f = FIRE[i];
    if (!f) continue;
    const fuel = fuelOf(i),
      grassWood = 0.7 * food[i] + 1.2 * tree[i],
      d = dryness(i),
      // the fire a square's fuel can carry: grass and trees by how dry they are, sticks almost always
      can = Math.min(1, grassWood * d + 0.08 * stick[i] * stickDry(i));
    f += 0.2 * (can - f);
    if (RAIN[i] > 0.004) f -= 0.4;
    else if (RAIN[i] > 0.002) f -= 0.15;
    // it burns what is there: grass fast, trees slowly, sticks one by one
    food[i] = Math.max(0, food[i] - 0.08 * f);
    tree[i] = Math.max(0, tree[i] - 0.02 * f);
    if (stick[i] && rnd() < 0.12 * f) stick[i]--;
    // fruit burns; nuts on the ground roast in it
    fruit[i] = 0;
    if (nut[i] > 0.02) {
      COOK[i] += nut[i] * 0.6;
      nut[i] = 0;
    }
    BURNT[i] = 1;
    if (f < 0.03 || fuel < 0.03) {
      FIRE[i] = 0;
      continue;
    }
    FIRE[i] = f;
    next.push(i);
    // spreading to the squares around: with the wind and uphill, into dry fuel
    const x = i % W,
      y = (i / W) | 0,
      [u, v] = windAt(y),
      ws = Math.hypot(u, v) || 1;
    for (const [dx, dy] of MV) {
      const Y = y + dy;
      if (Y < 0 || Y >= H) continue;
      const j = idx(x + dx, Y);
      if (FIRE[j] || water[j] || rock[j]) continue;
      const fj = Math.min(1, 0.7 * food[j] + 1.2 * tree[j]),
        L = Math.hypot(dx, dy),
        along = (u * dx + v * dy) / (ws * L), // +1 straight downwind
        windF = 1 + 2 * Math.max(-0.4, along) * Math.min(1, ws / 0.25),
        slopeF = 1 + clamp((alt[j] - alt[i]) * 3, -0.5, 1.5),
        p = 0.12 * f * fj * dryness(j) * windF * slopeF;
      if (rnd() < p) ignite(j, 0.1);
    }
  }
  // newly lit squares join the fire
  const lit = new Set(next);
  for (const i of BURNING) if (FIRE[i] && !lit.has(i)) next.push(i);
  BURNING = next;
  // burnt ground slowly greens again; cooked food rots or is carried off by scavengers
  if (tick % 4 === 0)
    for (let i = 0; i < n; i++) {
      if (BURNT[i]) BURNT[i] = BURNT[i] > 0.01 ? BURNT[i] * 0.99 : 0;
      if (COOK[i]) COOK[i] = COOK[i] > 0.01 ? COOK[i] * 0.98 : 0;
    }
  fireStats.burned += BURNING.length;
}

// the warmth (and light) of fire within reach of a square: its own fire, or one next to it
function fireNear(x, y) {
  let w = 0;
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      if (!inb(x, y + dy)) continue;
      const f = FIRE[idx(x + dx, y + dy)];
      if (f) w = Math.max(w, dx || dy ? f * 0.5 : f);
    }
  return w;
}
