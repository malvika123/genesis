// Genesis — does watching make youngsters practise cracking nuts? (backlog A26; docs/design/nut-cracking-hard.md; the
// checkpoint-1 review, docs/reviews/2026-11-13-fable-review-3-nut-design.md). It only reads the world: it changes nothing in it.
//
// For every hominin born in the run, between 3.5 and 10 years of age, it counts the steps with the means at hand (nuts on its
// square, and a stone in its hand or on the square) and its strikes on nuts in those steps. The main outcome, fixed before any
// run: strikes on nuts per 1,000 steps with the means at hand, among hominins born AFTER the first hominin in the world
// reached a skill of 0.5 (so that there was someone skilled to watch). Also: who reached a skill of 0.5 by age 10; whether
// skill outlived every founder.
//
// Usage (from the genesis folder):
//   node tools/analysis/nut-practice.js SEEDS DAYS OUT_DIR [experiment switches]     (one JSON per world)
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'),
  path = require('path'),
  root = process.cwd();
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
const SKILLED = 0.5;
fs.mkdirSync(out, { recursive: true });
for (const seed of seeds) {
  const S = X.fromArgs(flags);
  const E = createEngine({ brain: S.brain });
  E.setSeed(seed);
  E.reset(S.cfg);
  const TY = E.TY,
    W = E.W,
    it = E.items();
  const rec = new Map(); // id -> { born, founder, steps, tries, lastTry, skilledAge, diedAge }
  let firstSkilled = null,
    foundersGone = null;
  const total = days * E.DAY;
  for (let t = 0; t < total; t++) {
    E.sim();
    const st = E.state();
    let founderAlive = false;
    for (const a of st.ag) {
      if (a.sp !== 0) continue;
      let r = rec.get(a.id);
      if (!r) {
        r = { born: t === 0 ? null : t, founder: t === 0, steps: 0, tries: 0, lastTry: a.nutTry || 0, skilledAge: null, diedAge: null };
        rec.set(a.id, r);
      }
      if (a.dead) {
        if (r.diedAge === null) r.diedAge = a.age / TY;
        continue;
      }
      if (r.founder) founderAlive = true;
      const sk = a.nsk || 0;
      if (sk >= SKILLED) {
        if (firstSkilled === null) firstSkilled = t;
        if (r.skilledAge === null) r.skilledAge = a.age / TY;
      }
      const tries = a.nutTry || 0,
        y = a.age / TY;
      r.age = y;
      if (!r.founder && y >= 3.5 && y < 10) {
        const h = a.y * W + (((a.x % W) + W) % W);
        if (it.nut[h] > 0.05 && (a.hand === 1 || it.stone[h] > 0)) {
          r.steps++;
          r.tries += tries - r.lastTry;
        }
      }
      r.lastTry = tries;
    }
    if (!founderAlive && foundersGone === null) foundersGone = t;
  }
  const st = E.state();
  const alive = new Set(st.ag.filter((a) => a.sp === 0 && !a.dead).map((a) => a.id));
  const kids = [...rec.entries()].filter(([, r]) => !r.founder);
  const after = kids.filter(([, r]) => firstSkilled !== null && r.born > firstSkilled);
  const sum = (L, f) => L.reduce((s, [, r]) => s + f(r), 0);
  const rate = (L) => (sum(L, (r) => r.steps) ? (1000 * sum(L, (r) => r.tries)) / sum(L, (r) => r.steps) : null);
  // who could have reached age 10: lived to 10 (or is older than 10 now)
  const res = {
    seed,
    days,
    flags,
    firstSkilledDay: firstSkilled === null ? null : firstSkilled / E.DAY,
    foundersGoneDay: foundersGone === null ? null : foundersGone / E.DAY,
    born: kids.length,
    bornAfterSkilled: after.length,
    // the main outcome
    rateAfter: rate(after),
    stepsAfter: sum(after, (r) => r.steps),
    rateAll: rate(kids),
    stepsAll: sum(kids, (r) => r.steps),
    // secondary: among born-in-run hominins who lived to 10, how many were skilled by then
    reached10: kids.filter(([, r]) => (r.age || 0) >= 10).length,
    skilledBy10: kids.filter(([, r]) => (r.age || 0) >= 10 && r.skilledAge !== null && r.skilledAge < 10).length,
    skilledBornAliveEnd: kids.filter(([id, r]) => alive.has(id) && r.skilledAge !== null).length,
    skilledFoundersEver: [...rec.values()].filter((r) => r.founder && r.skilledAge !== null).length,
  };
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify(res));
  console.log('world ' + seed + ' done: born ' + res.born + ', first skilled day ' + res.firstSkilledDay + ', rate after ' + res.rateAfter);
}
