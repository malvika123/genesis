// Genesis — the reality checks: does a world's life history match real apes and foragers? Follows every hominin from birth
// (or from the start, for founders) to death, on the LIFE clock (a year = TY steps), and reports per world the numbers
// below. Run it on several seeds, then summarise with --summary. It only reads the world: it changes nothing in it.
//
// Usage (from the genesis folder):
//   node tools/analysis/reality-check.js SEEDS DAYS OUT_DIR [experiment switches]   (e.g. 1,5,9 100 out/)
//   node tools/analysis/reality-check.js --summary OUT_DIR                          (pools all worlds and prints the table)
//
// The real numbers and their sources are in REAL below and in docs/FINDINGS.md (research log entry 42).
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'),
  path = require('path'),
  root = process.cwd();

// Real yardsticks: wild chimpanzees (the proxy for hominins 2.5 million years ago) and foragers. A Genesis number passes when
// it falls inside the band; the band spans chimpanzees to foragers where both are known.
const REAL = {
  infantDeath: { label: 'Babies dying in their first year', lo: 0.1, hi: 0.25, unit: '%', src: 'wild chimpanzees 21% (four sites), Kanyawara 11% (Hill et al. 2001)' },
  survive15: { label: 'Born who reach age 15', lo: 0.3, hi: 0.6, unit: '%', src: 'chimpanzees about 35%, foragers about 60%, Hadza 55% (Kaplan et al. 2000)' },
  e0: { label: 'Life expectancy at birth (years)', lo: 13, hi: 33, unit: 'y', src: 'chimpanzees about 13 (four sites, Hill et al. 2001) to 32.8 (Ngogo, Wood et al. 2017)' },
  ibi: { label: 'Years between births, earlier baby alive', lo: 5.0, hi: 6.5, unit: 'y', src: 'Gombe 5.2 (Deschner & Boesch 2007), Mahale 5.6–6.0, composite 5.7 (Emery Thompson et al. 2007)' },
  afb: { label: 'Age at first birth (years)', lo: 12.5, hi: 15.5, unit: 'y', src: 'Gombe 13.3, Taï 13.7, Mahale 14.6, Gombe with dispersers 14.9' },
  growth: { label: 'Population change a year', lo: -0.01, hi: 0.015, unit: '%', src: 'roughly stable: Gombe shrank over 50 years, Kanyawara grew modestly over 25 (band an assumption)' },
  // widened on 12 Nov 2026 (entry 46): many modern ape epidemics were human viruses, so Gombe's 58% overstates illness 2.5 million years ago
  illness: { label: 'Deaths from illness (share of known causes)', lo: 0.15, hi: 0.6, unit: '%', src: 'Gombe 58%, partly human viruses (Williams et al. 2008); Kanyawara respiratory 27%; band for 2.5 Ma an assumption' },
};

if (process.argv[2] === '--summary') {
  const dir = process.argv[3];
  const W = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
  // pool person-years and events across worlds
  const PY = new Array(80).fill(0),
    DE = new Array(80).fill(0);
  let born = 0, died1 = 0, at1 = 0, at15 = 0, reach15 = 0;
  const ibi = [], afb = [], growth = [], cause = {};
  for (const w of W) {
    w.py.forEach((v, i) => (PY[i] += v));
    w.de.forEach((v, i) => (DE[i] += v));
    born += w.born;
    at1 += w.followed1;
    died1 += w.diedBefore1;
    at15 += w.followed15;
    reach15 += w.reached15;
    ibi.push(...w.ibi);
    afb.push(...w.afb);
    if (w.nEnd > 0) growth.push(w.growth); // worlds that died out are counted separately, not as a rate
    for (const [k, v] of Object.entries(w.causes)) cause[k] = (cause[k] || 0) + v;
  }
  // life table: survivorship from yearly death rates (deaths / person-years at each age), ages 0–60
  let l = 1, e0 = 0;
  for (let x = 0; x < 60; x++) {
    const m = PY[x] > 0 ? DE[x] / PY[x] : 0,
      q = 1 - Math.exp(-m);
    e0 += l * (1 - q / 2);
    l *= 1 - q;
  }
  const med = (a) => (a.length ? a.slice().sort((p, q) => p - q)[Math.floor(a.length / 2)] : NaN);
  const known = Object.entries(cause).filter(([k]) => k !== 'old age').reduce((s, [, v]) => s + v, 0) + (cause['old age'] || 0);
  const got = {
    infantDeath: at1 ? died1 / at1 : NaN,
    survive15: at15 ? reach15 / at15 : NaN,
    e0,
    ibi: med(ibi),
    afb: med(afb),
    growth: med(growth),
    illness: known ? (cause.illness || 0) / known : 0,
  };
  const fmt = (k, v) => (isNaN(v) ? '—' : REAL[k].unit === '%' ? (100 * v).toFixed(1) + '%' : v.toFixed(1));
  console.log('Reality checks: ' + W.length + ' worlds, ' + born + ' births followed (life clock: a year = 3 days)\n');
  console.log('| Check | Genesis | Real band | Pass? | Real numbers |\n|---|---|---|---|---|');
  for (const k in REAL) {
    const v = got[k],
      ok = !isNaN(v) && v >= REAL[k].lo && v <= REAL[k].hi;
    console.log('| ' + REAL[k].label + ' | ' + fmt(k, v) + ' | ' + fmt(k, REAL[k].lo) + ' to ' + fmt(k, REAL[k].hi) + ' | ' + (isNaN(v) ? 'no data' : ok ? 'pass' : v < REAL[k].lo ? 'FAIL (too low)' : 'FAIL (too high)') + ' | ' + REAL[k].src + ' |');
  }
  // second score (second review, finding 6): against the sourced ranges only; bands that are assumptions are not counted as passes
  const SRC = { infantDeath: [0.11, 0.21], survive15: [0.35, 0.6], e0: [13, 33], ibi: [5.2, 6.0], afb: [13.3, 14.9] };
  let srcPass = 0;
  for (const k in SRC) if (!isNaN(got[k]) && got[k] >= SRC[k][0] && got[k] <= SRC[k][1]) srcPass++;
  console.log('\nAgainst the sourced ranges only (population change and illness bands are assumptions, not counted): ' + srcPass + ' of 7 pass.');
  console.log('\nWorlds that died out: ' + W.filter((w) => !w.nEnd).length + ' of ' + W.length + ' (population change is the median of the others).');
  console.log('\nSample sizes: followed to 1 year ' + at1 + ', to 15 years ' + at15 + ', birth intervals ' + ibi.length + ', first births ' + afb.length + ', worlds ' + growth.length);
  const tot = Object.values(cause).reduce((s, v) => s + v, 0);
  console.log('Causes of death (all ages): ' + Object.entries(cause).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' ' + ((100 * v) / tot).toFixed(0) + '%').join(', '));
  process.exit(0);
}

const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const seeds = process.argv[2].split(',').map(Number),
  days = Number(process.argv[3]),
  out = process.argv[4];
const flags = {};
// switches as in tools/experiment.js: --name (on), --name=value or --name value
{
  const av = process.argv.slice(5);
  for (let i = 0; i < av.length; i++) {
    if (!av[i].startsWith('--')) continue;
    const [k, v] = av[i].slice(2).split('=');
    if (v !== undefined) flags[k] = isNaN(+v) ? v : +v;
    else if (i + 1 < av.length && !av[i + 1].startsWith('--')) flags[k] = isNaN(+av[i + 1]) ? av[i + 1] : +av[++i];
    else flags[k] = true;
  }
}
fs.mkdirSync(out, { recursive: true });
for (const seed of seeds) {
  const S = X.fromArgs(flags);
  const E = createEngine({ brain: S.brain });
  E.setSeed(seed);
  E.reset(S.cfg);
  const TY = E.TY || 288;
  const rec = new Map(); // id -> { sex, bornTick (null for founders), enterAge (years), mom, deathTick, cause, kids: [tick] }
  const see = (a, t) => {
    if (rec.has(a.id)) return;
    const founder = t === 0;
    rec.set(a.id, { sex: a.sex, bornTick: founder ? null : t, enterAge: a.age / TY, enterTick: t, mom: a.mom ? a.mom.id : null, deathTick: null, cause: null });
    if (!founder && a.mom && rec.has(a.mom.id)) (rec.get(a.mom.id).kids = rec.get(a.mom.id).kids || []).push({ t, id: a.id });
  };
  for (const a of E.state().ag) if (a.sp === 0) see(a, 0);
  const n0 = E.state().ag.filter((a) => a.sp === 0).length;
  const steps = days * E.DAY;
  // the cause of a death is worked out when the body is removed (src/sim.js) and not stored: apply the same rule to its last state
  const causeOf = (a) => (a.dead ? a.cause : a.hp <= 0 ? (a.wasW ? 'drowned' : 'its wounds') : a.w <= 0 ? 'thirst' : a.e <= 0 ? 'hunger' : a.age > a.lf ? 'old age' : 'unknown');
  let alive = new Map(E.state().ag.filter((a) => a.sp === 0).map((a) => [a.id, a]));
  for (let t = 1; t <= steps; t++) {
    E.sim();
    const ag = E.state().ag,
      now = new Map();
    for (const a of ag) if (a.sp === 0) {
      see(a, t);
      now.set(a.id, a);
    }
    for (const [id, a] of alive) if (!now.has(id) && rec.get(id).deathTick === null) {
      rec.get(id).deathTick = t;
      rec.get(id).cause = causeOf(a) || 'unknown';
    }
    alive = now;
    if (!alive.size) break;
  }
  const end = E.state().tick;
  // person-years and deaths by age (life clock), founders counted from the age they entered
  const py = new Array(80).fill(0),
    de = new Array(80).fill(0),
    causes = {};
  let born = 0, followed1 = 0, diedBefore1 = 0, followed15 = 0, reached15 = 0;
  const ibi = [], afb = [];
  for (const [, r] of rec) {
    const startAge = r.bornTick === null ? r.enterAge : 0,
      t0 = r.bornTick === null ? r.enterTick : r.bornTick,
      stopTick = r.deathTick ?? end,
      endAge = startAge + (stopTick - t0) / TY;
    for (let x = Math.floor(startAge); x < Math.ceil(endAge) && x < 80; x++) py[x] += Math.max(0, Math.min(endAge, x + 1) - Math.max(startAge, x));
    if (r.deathTick !== null) {
      de[Math.min(79, Math.floor(endAge))]++;
      causes[r.cause] = (causes[r.cause] || 0) + 1;
    }
    if (r.bornTick !== null) {
      born++;
      // only those born early enough to be followed the whole way count (no right-censoring)
      if (end - r.bornTick >= TY) {
        followed1++;
        if (r.deathTick !== null && r.deathTick - r.bornTick < TY) diedBefore1++;
      }
      if (end - r.bornTick >= 15 * TY) {
        followed15++;
        if (r.deathTick === null || r.deathTick - r.bornTick >= 15 * TY) reached15++;
      }
    }
    // mothers: intervals between births when the earlier baby was still alive at the next birth
    const kids = (r.kids || []).slice().sort((p, q) => p.t - q.t);
    for (let i = 1; i < kids.length; i++) {
      const prev = rec.get(kids[i - 1].id);
      if (prev.deathTick === null || prev.deathTick > kids[i].t) ibi.push((kids[i].t - kids[i - 1].t) / TY);
    }
    if (r.sex && r.bornTick !== null && kids.length) afb.push((kids[0].t - r.bornTick) / TY);
  }
  const years = end / TY,
    nEnd = alive.size;
  const res = { seed, days, flags, n0, nEnd, years, growth: nEnd > 0 ? Math.log(nEnd / n0) / years : -1, born, followed1, diedBefore1, followed15, reached15, ibi, afb, py, de, causes };
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify(res));
  console.log('world', seed, 'done: start', n0, 'end', nEnd, 'born', born, 'birth intervals', ibi.length);
}
