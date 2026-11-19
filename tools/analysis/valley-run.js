// Genesis — population in the valley (entry 119; docs/design/valley-spec.md V3): one band, by world: people at the end, births, deaths by cause, the population each year, whether the band ended.
// Usage: node tools/analysis/valley-run.js globe|valley SEEDS DAYS OUT_DIR [switches]    (the same tool for the globe: the comparison runs through one code path)
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'), path = require('path'), { createEngine } = require('../engine'), X = require('../experiment-core');
const [mode, seedArg, daysArg, out, ...rest] = process.argv.slice(2), flags = {};
for (let i = 0; i < rest.length; i++) { if (!rest[i].startsWith('--')) continue; const k = rest[i].slice(2); flags[k] = i + 1 < rest.length && !rest[i + 1].startsWith('--') ? (isNaN(+rest[i + 1]) ? rest[++i] : +rest[++i]) : true; }
const valley = mode === 'valley', S = X.fromArgs(flags), seeds = X.seedList(seedArg), days = +daysArg;
fs.mkdirSync(out, { recursive: true });
for (const seed of seeds) {
  const E = createEngine(valley ? { valley: { W: 200, H: 240, lat: -0.122 } } : {});
  E.setSeed(seed); E.reset({ ...S.cfg, ...(valley ? { valley: true } : {}) });
  const TY = E.TY, obj = new Map(), alive = new Set(), byCause = {}, series = [];
  let births = 0, hy = 0, t = 0;
  const seenBorn = new Set();
  const people = () => E.state().ag.filter((a) => a.sp === 0);
  for (const a of people()) { obj.set(a.id, a); alive.add(a.id); seenBorn.add(a.id); }
  for (t = 1; t <= days * E.DAY; t++) {
    E.sim();
    const now = new Set();
    for (const a of people()) { now.add(a.id); obj.set(a.id, a); if (!seenBorn.has(a.id)) (seenBorn.add(a.id), births++); }
    for (const id of alive) if (!now.has(id)) { const a0 = obj.get(id); let c = a0 ? (a0.dead ? a0.cause : a0.hp <= 0 ? (a0.wasW ? 'drowned' : 'its wounds') : a0.w <= 0 ? 'thirst' : a0.e <= 0 ? 'hunger' : a0.age > a0.lf ? 'old age' : 'unknown') : 'unknown'; c = c || 'unknown'; if (/killed by a predator/.test(c)) c = 'killed by a predator'; byCause[c] = (byCause[c] || 0) + 1; }
    alive.clear(); for (const id of now) alive.add(id);
    hy += now.size / TY;
    if (t % TY === 0) series.push(now.size);
    if (!now.size) break;
  }
  const end = Math.min(t, days * E.DAY);
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify({ seed, mode, days, flags, end, years: end / TY, alive: alive.size, births, homininYears: hy, byCause, series }));
  console.log('world', seed, 'done: alive', alive.size, 'births', births, 'years', (end / TY).toFixed(1));
}
