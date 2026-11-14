// Genesis — The world's shared state, seedable random numbers, small helpers and the event log.
// Copyright (c) 2026 Malvika Sen. MIT License.

let fished = 0,
  deaths = {}, // tally of deaths by species and cause, for experiments
  killKg = {}, // kg of animals killed, by 'killer > prey' (for the ledger; changes nothing)
  eatKg = {}, // kg of meat eaten into hunters' stomachs, by kind (for the ledger; changes nothing)
  pit,
  cave, // cave mouths in stony hill country: dry, out of the wind, cool in summer and mild in winter
  poison,
  firsts = {},
  water,
  salt, // sea water: you can swim in it but not drink it
  alt, // height of each cell in km (negative = depth of the sea)
  river,
  deep,
  rock,
  ter,
  food,
  ag,
  tick,
  hist,
  logs,
  G,
  kills,
  maxGen,
  nLessons,
  sel = null,
  RETINA = false, // the raw-vision experiment: people see only light and colour, no labels
  over = false,
  NID = 0;
const LG = [{}, {}, {}, {}], // one per kind: people, plant-eaters, hunters, fish (fish learn some lessons too)
  DL = {};
// Seedable random numbers, so any world can be replayed exactly (setSeed(n) before reset()).
let SEED = (Math.random() * 4294967296) >>> 0;
function setSeed(s) {
  SEED = s >>> 0;
}
let USE2 = false; // while true, every random number comes from the separate stream (world.js: extra founders)
function rnd() {
  if (USE2) return rnd2();
  SEED = (SEED + 0x6d2b79f5) | 0;
  let t = Math.imul(SEED ^ (SEED >>> 15), 1 | SEED);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
// A second, separate stream of random numbers for traits added later (temperament, parental care), seeded from the world's
// seed when a world is built: drawing them leaves every other random number — and so the world — exactly as it was.
let SEED2 = 1;
function rnd2() {
  SEED2 = (SEED2 + 0x6d2b79f5) | 0;
  let t = Math.imul(SEED2 ^ (SEED2 >>> 15), 1 | SEED2);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v)),
  gauss = () => rnd() + rnd() + rnd() - 1.5;
// The world wraps east–west like a globe: walking off one side brings you back on the other.
// North and south are real edges (the poles).
const wx = (x) => (x >= 0 && x < W ? x : ((x % W) + W) % W),
  dxw = (d) => (d > W / 2 ? d - W : d < -W / 2 ? d + W : d),
  idx = (x, y) => y * W + wx(x),
  inb = (x, y) => y >= 0 && y < H,
  wrapDist = (x, y, u, v) => Math.hypot(dxw(u - x), v - y),
  dayN = () => Math.floor(tick / DAY) + 1,
  // Day and night are local, like on a real planet: the sun sweeps around the world once a day,
  // so it is noon on one side while it is midnight on the other. Local time goes 0 → 1 over a day.
  localTime = (x) => ((tick % DAY) / DAY + wx(x) / W) % 1,
  isNightAt = (x) => {
    const p = localTime(x);
    return p < 0.25 || p >= 0.75;
  },
  isNight = () => isNightAt(0);
let MOISTY = null, // on the real Earth: each square's soil moisture averaged over the year before the world begins
  DRYLAND = 0.12; // below this the ground is desert
let BANDAT = null; // where the first band made camp: [x, y]
let events = []; // everything the log has ever said, with when: for the timeline
// Which world this is: early hominins about 2.5 million years ago (the default), or Homo sapiens 70,000
// years ago without culture ('sapiens'). In the hominin world the same creatures are called hominins, not
// people, wherever words are shown (their kind is still 'Person' inside the engine and in experiment data).
let ERA = 'hominin';
const word = (t) =>
  ERA !== 'hominin' || typeof t !== 'string'
    ? t
    : t
        .replace(/\bPeople\b/g, 'Hominins')
        .replace(/\bpeople\b/g, 'hominins')
        .replace(/\bPerson\b/g, 'Hominin')
        .replace(/\bperson\b/g, 'hominin')
        .replace(/\ba hominin\b/g, 'a hominin');
// whose turn it is while the world steps: each piece of news remembers the creature it came from, so the page can show it
let LOGWHO = null;
const LOGW = [];
function log(t) {
  t = word(t);
  events.push({ t: tick, s: t, who: LOGWHO });
  if (events.length > 600) events.shift();
  logs.unshift('Day ' + dayN() + ': ' + t);
  logs.length = Math.min(logs.length, 8);
  LOGW.unshift(LOGWHO);
  LOGW.length = logs.length;
  if (typeof onLog === 'function') onLog(logs);
}
const OFF = [];
for (let dy = -12; dy <= 12; dy++)
  for (let dx = -12; dx <= 12; dx++) {
    if (!dx && !dy) continue;
    const d = Math.hypot(dx, dy);
    if (d > 12) continue;
    OFF.push([dx, dy, d, (Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) + 8) % 8]);
  }
OFF.sort((p, q) => p[2] - q[2]);
