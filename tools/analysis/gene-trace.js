// Genesis — are the sim hominins showing the traits that made humans human? (entry 105; the owner, 18 Nov 2026: trace whether a bigger, better brain pays and spreads.)
// Follows every hominin from birth (or from the start, for founders): its inherited traits (brain size bs, learning rate lr, copying im, vocal control vl, pointing pg, shared attention sh,
// care for others al, timidity tm, parental care pc, feeling others' hurt vf, and the neutral marker nm, which nothing reads: the yardstick for drift by chance), its mother, when it was born
// and died, and how many children it bore. It only reads the world: it changes nothing in it.
// Per trait it reports (pooled over worlds): the mean among founders, among births in the first and last third of the run (the change, against the neutral marker's change), and the SELECTION
// differential within a generation — mean among adults who bore a child minus mean among all who reached adulthood — and the slope of children borne on the trait, in units of the trait's spread.
// Usage: node tools/analysis/gene-trace.js SEEDS DAYS OUT_DIR [switches]      then      node tools/analysis/gene-trace.js --summary OUT_DIR
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'),
  path = require('path'),
  root = process.cwd();
const TRAITS = ['bs', 'lr', 'im', 'vl', 'pg', 'sh', 'al', 'tm', 'pc', 'vf', 'nm'];
if (process.argv[2] === '--summary') {
  const d = process.argv[3],
    W = fs.readdirSync(d).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')));
  const P = W.flatMap((w) => w.people.map((p) => ({ ...p, end: w.end })));
  const mean = (a) => (a.length ? a.reduce((t, x) => t + x, 0) / a.length : NaN),
    sd = (a) => {
      const m = mean(a);
      return Math.sqrt(mean(a.map((x) => (x - m) ** 2)));
    },
    f = (x, n = 3) => (isNaN(x) ? '—' : x.toFixed(n));
  const gens = P.filter((p) => p.born).map((p) => p.gen);
  console.log(`${W.length} worlds, ${P.length} hominins (${P.filter((p) => !p.born).length} founders), generations reached: median ${gens.sort((a, b) => a - b)[gens.length >> 1] ?? '—'}, max ${Math.max(...gens, 0)}`);
  const ends = W.map((w) => w.end);
  const cut1 = (t) => t / 3; // thirds of each world's own run
  const inThird = (p, k) => p.born && p.t0 >= (k * p.end) / 3 && p.t0 < ((k + 1) * p.end) / 3;
  const adults = P.filter((p) => p.adult),
    parents = adults.filter((p) => p.kids > 0);
  console.log(`adults (reached maturity) ${adults.length}; of them parents ${parents.length}; births in the first / last third ${P.filter((p) => inThird(p, 0)).length} / ${P.filter((p) => inThird(p, 2)).length}`);
  console.log('trait | founders | births first third → last third (change; in the trait\'s spread) | selection differential: parents − all adults (in spread) | slope of children borne per spread (95% ±)');
  const nmChange = mean(P.filter((p) => inThird(p, 2)).map((p) => p.g.nm)) - mean(P.filter((p) => inThird(p, 0)).map((p) => p.g.nm));
  // The mutation rule is absolute (±mutStep/2 of the trait's own scale) for the 0–1 traits (vl, pg, sh, al, nm) and relative (±15% of the value) for bs, lr, im, tm, pc, vf (src/creatures.js, entry 86), so a
  // trait drifts by chance in proportion to its own mutation step, not the marker's: each change is also shown in units of its per-birth mutation spread (±0.15 absolute, or ±15% of its mean: sd = step / √12).
  const REL = new Set(['bs', 'lr', 'im', 'tm', 'pc', 'vf']),
    MUTSD = (k, m) => ((REL.has(k) ? 0.3 * m : 0.3) / Math.sqrt(12));
  // slopes are within worlds (each trait and the children borne centred on its world's adults) and adjusted for years lived as an adult (age and exposure)
  const byWorld = new Map();
  for (const p of adults) (byWorld.get(p.world) || byWorld.set(p.world, []).get(p.world)).push(p);
  for (const k of TRAITS) {
    const has = (p) => p.g[k] !== undefined,
      all = P.filter(has).map((p) => p.g[k]),
      S = sd(all) || 1,
      fo = P.filter((p) => !p.born && has(p)).map((p) => p.g[k]),
      a = P.filter((p) => inThird(p, 0) && has(p)).map((p) => p.g[k]),
      b = P.filter((p) => inThird(p, 2) && has(p)).map((p) => p.g[k]),
      ad = adults.filter(has),
      pa = parents.filter(has),
      sdiff = mean(pa.map((p) => p.g[k])) - mean(ad.map((p) => p.g[k]));
    const X = [], Y = [], Z = [];
    for (const [, L] of byWorld) {
      const l = L.filter(has);
      if (l.length < 3) continue;
      const mx = mean(l.map((p) => p.g[k])), my = mean(l.map((p) => p.kids)), mz = mean(l.map((p) => p.adultYears));
      for (const p of l) (X.push((p.g[k] - mx) / S), Y.push(p.kids - my), Z.push(p.adultYears - mz));
    }
    // partial slope of children borne on the trait with adult years as a covariate (OLS, two regressors, no intercept: all centred)
    const sxx = X.reduce((t, v) => t + v * v, 0), szz = Z.reduce((t, v) => t + v * v, 0), sxz = X.reduce((t, v, i) => t + v * Z[i], 0),
      sxy = X.reduce((t, v, i) => t + v * Y[i], 0), szy = Z.reduce((t, v, i) => t + v * Y[i], 0),
      det = sxx * szz - sxz * sxz,
      beta = det ? (sxy * szz - szy * sxz) / det : NaN,
      gamma = det ? (szy * sxx - sxy * sxz) / det : NaN,
      res = X.map((v, i) => Y[i] - beta * v - gamma * Z[i]),
      se = det ? Math.sqrt(res.reduce((t, r) => t + r * r, 0) / Math.max(1, X.length - 3) * (szz / det)) : NaN,
      chg = mean(b) - mean(a),
      ms = MUTSD(k, mean(fo.length ? fo : all));
    console.log(`${k} | ${f(mean(fo))} | ${f(mean(a))} → ${f(mean(b))} (${f(chg)}; ${f(chg / S, 2)} sd; ${f(chg / ms, 1)} × its per-birth mutation spread) | ${f(sdiff, 4)} (${f(sdiff / S, 3)} sd) | ${f(beta, 3)} ± ${f(1.96 * se, 3)} (n ${X.length})`);
  }
  console.log(`(the neutral marker nm changed by ${f(nmChange)}; it mutates by an absolute step, so it is the chance yardstick only for the other 0–1 traits (vl pg sh al); for bs lr im tm pc vf compare the change with their own per-birth mutation spread, last column of the change. The slope is the partial slope within worlds, per standard deviation, adjusted for adult years; with a few hundred adults its 95% interval is about ±0.15 or wider: a null is expected and means little.)`);
  process.exit(0);
}
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));
const seeds = process.argv[2].split(',').map(Number),
  days = Number(process.argv[3]),
  out = process.argv[4];
const flags = {};
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
  const TY = E.TY || 288,
    rec = new Map();
  const see = (a, t) => {
    if (rec.has(a.id)) return;
    const g = {};
    for (const k of TRAITS) if (typeof a.g[k] === 'number') g[k] = +a.g[k].toFixed(4);
    rec.set(a.id, { a, born: t > 0, t0: t, mom: a.mom ? a.mom.id : null, g, gen: a.gen ?? null, adult: a.age >= a.S.mat, death: null, kids: 0, adultSteps: 0 });
  };
  for (const a of E.state().ag) if (a.sp === 0) see(a, 0);
  let alive = new Set(rec.keys());
  const steps = days * E.DAY;
  let t = 0;
  for (t = 1; t <= steps; t++) {
    E.sim();
    const now = new Set();
    for (const a of E.state().ag)
      if (a.sp === 0) {
        see(a, t);
        now.add(a.id);
        const r = rec.get(a.id);
        if (a.age >= a.S.mat) (r.adult = true), r.adultSteps++;
      }
    for (const id of alive) if (!now.has(id) && rec.get(id).death === null) rec.get(id).death = t;
    alive = now;
    if (!alive.size) break;
  }
  const end = Math.min(t, steps);
  for (const r of rec.values()) if (r.mom !== null && rec.has(r.mom)) rec.get(r.mom).kids++;
  const people = [...rec.values()].map((r) => ({ born: r.born, t0: r.t0, mom: r.mom, g: r.g, gen: r.gen ?? 0, adult: r.adult, death: r.death, kids: r.kids, adultYears: +(r.adultSteps / TY).toFixed(3) }));
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify({ seed, days, flags, end, people: people.map((p) => ({ ...p, world: seed })) }));
  console.log('world', seed, 'done: hominins', people.length, 'born', people.filter((p) => p.born).length, 'adults', people.filter((p) => p.adult).length);
}
