// Genesis — V2-0: the band measured in metres, on the globe and in the valley (entry 118; docs/design/valley-spec.md). Measuring only; changes nothing.
// Usage: node tools/analysis/valley-measure.js globe|valley SEEDS DAYS [switches]     (SEEDS like 1-4)
// Per world, every step for movement and hourly (every 4 steps) for positions: nearest-neighbour distance between people; party sizes (people linked when within 1 square); mother-juvenile distance (children under 5 years, to their mother);
// distance moved per person per day; the band's extent (standard deviation of positions, at the end of every day); the share of person-steps with nobody within 4 squares; lightning strikes per km2 per year; fires lit.
// Metres per square: globe 3000, valley 250 (the sim's own conventions).
// Copyright (c) 2026 Malvika Sen. MIT License.
const { createEngine } = require('../engine'), X = require('../experiment-core');
const [mode, seedArg, daysArg, ...rest] = process.argv.slice(2), flags = {};
for (let i = 0; i < rest.length; i++) { if (!rest[i].startsWith('--')) continue; const k = rest[i].slice(2); flags[k] = i + 1 < rest.length && !rest[i + 1].startsWith('--') ? (isNaN(+rest[i + 1]) ? rest[++i] : +rest[++i]) : true; }
const valley = mode === 'valley', S = X.fromArgs(flags), seeds = X.seedList(seedArg), days = +daysArg, SQM = valley ? 250 : 3000;
const pool = { nn: [], party: [], mj: [], path: [], ext: [], aloneSteps: 0, personSteps: 0, strikes: 0, fires: 0, years: 0, km2: 0, worlds: 0, extEnd: [] };
for (const seed of seeds) {
  const E = createEngine(valley ? { valley: { W: 200, H: 240, lat: -0.122 } } : {});
  E.setSeed(seed); E.reset({ ...S.cfg, ...(valley ? { valley: true } : {}) });
  const TY = E.TY, W = E.W, dxw = E.dxw, km2 = (E.W * E.H * SQM * SQM) / 1e6, seen = new Set(), last = new Map(), pathBy = new Map(), alive = new Set();
  pool.km2 += km2; pool.years += (days * E.DAY) / TY; pool.worlds++;
  for (let t = 1; t <= days * E.DAY; t++) {
    E.sim();
    const ag = E.state().ag, ppl = ag.filter((a) => a.sp === 0);
    for (const a of ppl) { const l = last.get(a.id); if (l) pathBy.set(a.id, (pathBy.get(a.id) || 0) + Math.hypot(dxw(a.x - l[0]), a.y - l[1])); last.set(a.id, [a.x, a.y]); }
    for (const b of E.wx().STRIKES) { const key = b.t + ':' + b.x + ':' + b.y; if (!seen.has(key)) (seen.add(key), pool.strikes++); }
    if (t % 4 === 0 && ppl.length > 1) {
      // hourly: nearest neighbour, alone, parties, mother-juvenile
      for (const a of ppl) {
        let m = 1e9, near4 = false;
        for (const o of ppl) { if (o === a) continue; const d = Math.hypot(dxw(a.x - o.x), a.y - o.y), c = Math.max(Math.abs(dxw(a.x - o.x)), Math.abs(a.y - o.y)); if (d < m) m = d; if (c <= 4) near4 = true; }
        pool.nn.push(m * SQM); pool.personSteps++; if (!near4) pool.aloneSteps++;
        if (a.age < 5 * TY && a.mom && !a.mom.dead && ppl.includes(a.mom)) pool.mj.push(Math.hypot(dxw(a.x - a.mom.x), a.y - a.mom.y) * SQM);
      }
      const par = ppl.map((_, i) => i), find = (i) => (par[i] === i ? i : (par[i] = find(par[i])));
      for (let i = 0; i < ppl.length; i++) for (let j = i + 1; j < ppl.length; j++) if (Math.max(Math.abs(dxw(ppl[i].x - ppl[j].x)), Math.abs(ppl[i].y - ppl[j].y)) <= 1) par[find(i)] = find(j);
      const cnt = new Map(); for (let i = 0; i < ppl.length; i++) cnt.set(find(i), (cnt.get(find(i)) || 0) + 1);
      for (const [, c] of cnt) pool.party.push(c);
    }
    if (t % E.DAY === 0 && ppl.length > 1) {
      const r0 = ppl[0], xs = ppl.map((a) => dxw(a.x - r0.x)), ys = ppl.map((a) => a.y), mx = xs.reduce((s, v) => s + v, 0) / xs.length, my = ys.reduce((s, v) => s + v, 0) / ys.length;
      pool.ext.push(Math.sqrt(xs.reduce((s, v, i) => s + (v - mx) ** 2 + (ys[i] - my) ** 2, 0) / xs.length) * SQM);
    }
    if (!ppl.length) break;
  }
  pool.fires += E.fire().fireStats.lit;
  const dpp = [...pathBy.values()].reduce((s, v) => s + v, 0) / Math.max(1, pathBy.size);
  pool.path.push((dpp * SQM) / 1000 / Math.max(1, days)); // km per person per day
  const ppl = E.state().ag.filter((a) => a.sp === 0); if (ppl.length) { const r0 = ppl[0], xs = ppl.map((a) => dxw(a.x - r0.x)), ys = ppl.map((a) => a.y), mx = xs.reduce((s, v) => s + v, 0) / xs.length, my = ys.reduce((s, v) => s + v, 0) / ys.length; pool.extEnd.push(Math.sqrt(xs.reduce((s, v, i) => s + (v - mx) ** 2 + (ys[i] - my) ** 2, 0) / xs.length) * SQM); }
  console.log('world', seed, 'done');
}
const q = (a, p) => { if (!a.length) return NaN; const s = a.slice().sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * p))]; }, f = (x, n = 0) => (isNaN(x) ? '-' : x.toFixed(n));
console.log(`${mode}: ${pool.worlds} worlds x ${days} days (${f(pool.years / pool.worlds, 1)} years each); ${SQM} m a square`);
console.log(`nearest neighbour (m): median ${f(q(pool.nn, 0.5))}, 10th ${f(q(pool.nn, 0.1))}, 90th ${f(q(pool.nn, 0.9))}; in squares: median ${f(q(pool.nn, 0.5) / SQM, 1)}`);
console.log(`share of person-hours with nobody within 4 squares (${4 * SQM} m): ${f((100 * pool.aloneSteps) / Math.max(1, pool.personSteps), 1)}%`);
console.log(`party sizes (linked within 1 square = ${SQM} m): median ${f(q(pool.party, 0.5))}, mean ${f(pool.party.reduce((s, v) => s + v, 0) / Math.max(1, pool.party.length), 1)}, 90th ${f(q(pool.party, 0.9))}`);
console.log(`mother-juvenile distance, children under 5 years (m): median ${f(q(pool.mj, 0.5))}, 90th ${f(q(pool.mj, 0.9))}, 99th ${f(q(pool.mj, 0.99))}; in squares: median ${f(q(pool.mj, 0.5) / SQM, 1)}, 90th ${f(q(pool.mj, 0.9) / SQM, 1)}; n ${pool.mj.length}`);
console.log(`distance moved (km per person per day): median over worlds ${f(q(pool.path, 0.5), 2)}`);
console.log(`band extent, standard deviation of positions: daily median ${f(q(pool.ext, 0.5))} m (${f(q(pool.ext, 0.5) / SQM, 1)} squares); at the end of the run ${pool.extEnd.map((v) => f(v / 1000, 1) + ' km').join(', ')}`);
console.log(`lightning strikes per km2 per year: ${f(pool.strikes / pool.km2 / (pool.years / pool.worlds), 5)} (${pool.strikes} strikes); fires lit ${pool.fires}`);
