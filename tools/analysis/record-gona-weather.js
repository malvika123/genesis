// Genesis — record the globe's weather at Gona (about 11 N, 40.5 E) as the forcing of the valley (entry 117, docs/design/valley-spec.md: "weather from the globe").
// For each of the seeds: a real-Earth world, one year of spin-up, then YEARS years of humidity (HUM), cloud (CLD) and rain (RAIN) at the globe square that holds Gona, every step.
// Writes src/valleyforce.js (arrays HUM and CLD, rounded; the valley engine replays them at its upwind edge) and prints the rain statistics at Gona for comparison with the valley.
// Usage: node tools/analysis/record-gona-weather.js [SEEDS=1,2,3,4] [YEARS=3]
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'), path = require('path'), { createEngine } = require('../engine'), X = require('../experiment-core');
const seeds = (process.argv[2] || '1,2,3,4').split(',').map(Number), YEARS = +(process.argv[3] || 3);
const S = X.fromArgs({});
const rec = [], stats = [];
for (const seed of seeds) {
  const E = createEngine({});
  E.setSeed(seed); E.reset(S.cfg);
  const TY = E.TY, W = E.W, H = E.H;
  // the globe square of Gona: latitude 11 N, longitude 40.5 E (the engine's lonOf is not exported: search the row for the longitude by its own formula)
  const y = Math.round(H / 2 * (1 - 11 / 80) - 0.5);
  const wx = E.wx(); // { MOISTY, HUM, CLD, RAIN, ... } as getters of the live arrays
  let best = -1, bd = 1e9;
  for (let x = 0; x < W; x++) { const lon = -160 + ((x + 0.5) * 360) / W; /* EARTH_LON0 = -160 (src/earth.js) */ const d = Math.abs(lon - 40.5); if (d < bd) (bd = d), (best = x); }
  for (let t = 0; t < TY; t++) E.sim(); // a year of spin-up
  const hum = [], cld = [], rain = [];
  for (let t = 0; t < YEARS * TY; t++) {
    E.sim();
    const w = E.wx(), i = y * W + best;
    hum.push(+w.HUM[i].toFixed(4)); cld.push(+w.CLD[i].toFixed(4)); rain.push(w.RAIN[i]);
  }
  const land = E.alt()[y * W + best];
  const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  stats.push({ seed, square: [best, y], altKm: +land.toFixed(3), meanHum: +mean(hum).toFixed(3), meanCld: +mean(cld).toFixed(3), meanRain: +(mean(rain) * 1000).toFixed(3), rainySteps: +(100 * rain.filter((r) => r > 0.002).length / rain.length).toFixed(1) });
  rec.push({ seed, hum, cld, rain: rain.map((r) => +r.toFixed(5)) });
  console.log('seed', seed, JSON.stringify(stats[stats.length - 1]));
}
const out = `// Genesis — the valley's weather forcing: the globe's humidity, cloud and rain at the square that holds Gona, recorded by tools/analysis/record-gona-weather.js (seeds ${seeds.join(',')}, ${YEARS} years each after a year of spin-up; ${YEARS * 288} steps a record). Generated: do not edit.\n// Copyright (c) 2026 Malvika Sen. MIT License.\nconst VALLEY_FORCE = ${JSON.stringify(rec.map((r) => ({ seed: r.seed, hum: r.hum, cld: r.cld, rain: r.rain })))};\n`;
fs.writeFileSync(path.join(__dirname, '../../src/valleyforce.js'), out);
console.log('written src/valleyforce.js', Math.round(out.length / 1024), 'KB');
