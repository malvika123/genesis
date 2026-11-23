// Genesis — one band: population AND diet (entry 124; the realistic diet): per world births, deaths by cause, the population each year, and what the hominins ate (feeding steps and protein by food class, from the body ledger).
// (Copied from tools/analysis/valley-run.js and extended.) Original header: population in the valley (entry 119; docs/design/valley-spec.md V3): one band, by world: people at the end, births, deaths by cause, the population each year, whether the band ended.
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
  const hunt = { days: 0, byKind: {}, herds: 0, near8: 0, nHunters: 0, dist: [], energy: [] }, wounds = {}, femaleSteps = { n: 0 }, firstBirth = [], birthsBy = new Map(), moms = new Set();
  const seenBorn = new Set();
  const people = () => E.state().ag.filter((a) => a.sp === 0), snap = new Map();
  for (const a of people()) { obj.set(a.id, a); alive.add(a.id); seenBorn.add(a.id); }
  for (t = 1; t <= days * E.DAY; t++) {
    E.sim();
    const now = new Set();
    for (const a of people()) { now.add(a.id); obj.set(a.id, a); if (!seenBorn.has(a.id)) { seenBorn.add(a.id); births++; if (a.mom) { birthsBy.set(a.mom.id, (birthsBy.get(a.mom.id) || 0) + 1); if (!moms.has(a.mom.id)) (moms.add(a.mom.id), firstBirth.push(a.mom.age / TY)); } } if (a.sex === 1 && a.age >= a.S.smat) femaleSteps.n++; }
    for (const id of alive) if (!now.has(id)) { const a0 = obj.get(id); let c = a0 ? (a0.dead ? a0.cause : a0.hp <= 0 ? (a0.wasW ? 'drowned' : 'its wounds') : a0.w <= 0 ? 'thirst' : a0.e <= 0 ? 'hunger' : a0.age > a0.lf ? 'old age' : 'unknown') : 'unknown'; c = c || 'unknown'; if (/killed by a predator/.test(c)) c = 'killed by a predator'; byCause[c] = (byCause[c] || 0) + 1; if (c === 'its wounds') { const k = (a0 && a0.hurtK) || 'none'; wounds[k] = (wounds[k] || 0) + 1; } }
    alive.clear(); for (const id of now) alive.add(id);
    hy += now.size / TY;
    if (t % E.DAY === 0) {
      // daily: hunters by kind, herds, each hunter's distance to the nearest person, hunters' energy
      const ag = E.state().ag, ppl = people(); hunt.days++;
      for (const a of ag) {
        if (a.sp === 1) hunt.herds++;
        if (a.sp !== 2) continue;
        hunt.byKind[a.S.n] = (hunt.byKind[a.S.n] || 0) + 1; hunt.nHunters++; hunt.energy.push(a.e);
        let m = 1e9; for (const p of ppl) { const d = Math.hypot(E.dxw(a.x - p.x), a.y - p.y); if (d < m) m = d; }
        if (ppl.length) (hunt.dist.push(m), m <= 8 && hunt.near8++);
      }
    }
    if (t % TY === 0) series.push(now.size);
    if (!now.size) break;
  }
  const end = Math.min(t, days * E.DAY);
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify({ feed: (() => { const f = {}, p = {}; let pa = [], pc = []; for (const v of snap.values()) { for (const k in v.f) f[k] = (f[k] || 0) + v.f[k]; for (const k in v.p) p[k] = (p[k] || 0) + v.p[k]; (v.adult ? pa : pc).push(v.prot); } return { f, p, adultProt: pa, childProt: pc }; })(), hunt: { days: hunt.days, byKind: hunt.byKind, herds: hunt.herds, nHunters: hunt.nHunters, near8: hunt.near8, distMedian: hunt.dist.slice().sort((a, b) => a - b)[hunt.dist.length >> 1], energyMean: hunt.energy.reduce((t, v) => t + v, 0) / Math.max(1, hunt.energy.length) }, wounds, femaleYears: femaleSteps.n / TY, firstBirthAge: firstBirth, births2: births, seed, mode, days, flags, end, years: end / TY, alive: alive.size, births, homininYears: hy, byCause, series }));
  console.log('world', seed, 'done: alive', alive.size, 'births', births, 'years', (end / TY).toFixed(1));
}
