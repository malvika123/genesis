// Genesis — Climate: temperature by latitude, seasons, frozen water, and how cold feels.
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// The map is a band around a globe: the top row is near the north pole, the bottom row near the
// south pole, the middle is the equator. A year (TY steps) has one full cycle of seasons, and the two
// hemispheres have opposite seasons, like on Earth.

const RT = new Float32Array(H); // each row's daytime temperature this step (°C), filled by updateClimate()

const lat = (y) => ((y + 0.5) / H) * 2 - 1; // -1 north pole … 0 equator … +1 south pole
// +1 at northern midsummer, -1 at northern midwinter
const season = () => Math.sin((2 * Math.PI * (tick % TY)) / TY);
function tempAt(y, night) {
  const L = lat(y),
    a = Math.abs(L);
  return 28 - 40 * a ** 1.6 + 13 * a * season() * (L < 0 ? 1 : -1) - (night ? 4 : 0);
}
function updateClimate() {
  for (let y = 0; y < H; y++) RT[y] = tempAt(y, false);
  // each cell's daytime temperature, worked out once per step because it is used everywhere
  if (!CT || CT.length !== W * H) CT = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) CT[i] = RT[(i / W) | 0] - LAPSE * (alt ? Math.max(0, alt[i]) : 0);
}
// Air gets colder the higher you go: about 6.5 °C for every kilometre, as on Earth.
const LAPSE = 6.5;
const above = (i) => (alt ? Math.max(0, alt[i]) : 0);
// daytime temperature of one cell, including its height
let CT = null;
const cellT = (i) => CT[i];
// What a creature feels at one cell, by day or night. On top of the row's temperature, dry ground
// under a clear sky heats strongly in the sun and loses its heat fast at night — so deserts reach
// 40 °C and more by day and turn cold at night — while damp ground, cloud and water swing far less.
function cellTemp(i, night) {
  const base = tempAt((i / W) | 0, night) - LAPSE * above(i);
  if (water[i] || typeof MOIST === 'undefined' || !MOIST) return base;
  const dry = clamp((0.45 - MOIST[i]) / 0.2, 0, 1), // 1 in the driest land, 0 where the soil is moist
    clear = 1 - clamp(CLD[i] * 6, 0, 1);
  return night ? base - 8 * dry * clear : base + (3 + 14 * dry) * clear;
}
const FREEZE = -1;
// Water that is frozen over: you can walk on it, but not drink from it or drown in it.
const iced = (i) => water[i] === 1 && cellT(i) < FREEZE;
const liquid = (i) => water[i] === 1 && cellT(i) >= FREEZE;
// How well plants grow at this temperature: nothing below about 2 °C, normal growth at 15 °C,
// and lusher than that in the warm tropics.
const growth = (y) => clamp((RT[y] - 2) / 13, 0, 1.15);
const growthAt = (i) => clamp((cellT(i) - 2) / 13, 0, 1.15);
// How cold a creature feels (0 = comfortable, 1 = freezing for its kind). Fish don't feel it.
function coldOf(a, night) {
  if (a.sp === 3) return 0;
  // rain on your skin or fur makes it feel about 5 °C colder; under trees you stay drier and out of
  // the wind
  const i = idx(a.x, a.y),
    shelter = typeof tree !== 'undefined' && tree ? cover(i) : 0,
    wet = typeof RAIN !== 'undefined' && RAIN && RAIN[i] > 0.002 && shelter < 0.4 ? 5 : 0;
  const fire =
    typeof FIRE !== 'undefined' && FIRE ? Math.min(1, fireNear(a.x, a.y) * 3 + (a.hand === 4 ? 0.3 : 0)) : 0;
  // a cave stays near the year's mean temperature, day and night
  const k = typeof cave !== 'undefined' && cave && cave[i] ? 0.55 : 0.35;
  return clamp((a.S.cold - cellTemp(i, night) + wet) / 20, 0, 1) * (1 - k * shelter) * (1 - fire);
}
// how much too hot it feels, 0 … 1: shade under trees is several degrees cooler, and standing in
// water cools the body
function heatOf(a, night) {
  if (a.sp === 3) return 0;
  const i = idx(a.x, a.y),
    shade = typeof tree !== 'undefined' && tree ? cover(i) : 0;
  return clamp((cellTemp(i, night) - a.S.hot - 4 * shade - (water[i] ? 6 : 0)) / 12, 0, 1);
}
function seasonName(y) {
  const h = lat(y) < 0 ? 1 : -1,
    p = (2 * Math.PI * (tick % TY)) / TY,
    warmth = h * Math.sin(p),
    rising = h * Math.cos(p);
  return warmth > 0.5 ? 'summer' : warmth < -0.5 ? 'winter' : rising > 0 ? 'spring' : 'autumn';
}
