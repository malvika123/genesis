// Genesis — does watching a skill pass it on? (entry 101; Fable's review of honest watching). Measuring only: reads what the world records (per hominin:
// when it first did each skill, a.fdone; when it first watched each skill being done, a.ws; its mother; the world's count of copy events, WATCHN).
// Reports per skill: (1) the transmission rate ratio — first-time doing per 1,000 hominin-days after having watched it, against before or never having
//     watched it (the hazard ratio of network-based diffusion, entry 55's design); (2) mother–offspring match — of young whose mother did the skill before
//     them, the share who did it, against young whose mother never did; and the number of copy events (the dose).
// Usage: node tools/analysis/watch-trace.js SEEDS DAYS OUT_DIR [switches]   then   node tools/analysis/watch-trace.js --compare DIR1 DIR2 [DIR3 …]
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'),
  path = require('path'),
  root = process.cwd();
const SKILLS = ['nut', 'dig', 'butcher', 'marrow', 'flake'];
if (process.argv[2] === '--compare') {
  const dirs = process.argv.slice(3);
  const load = (d) => fs.readdirSync(d).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')));
  for (const d of dirs) {
    const W = load(d),
      P = W.flatMap((w) => w.people.map((p) => ({ ...p, end: w.end, mom: p.mom === null ? null : w.people.find((q) => q.id === p.mom) || null })));
    console.log(`\n== ${d}: ${W.length} worlds, ${P.length} hominins, copy events ${W.reduce((t, w) => t + w.watchN, 0)} (per 1,000 hominin-days ${((1000 * W.reduce((t, w) => t + w.watchN, 0)) / Math.max(1, P.reduce((t, p) => t + (Math.min(p.death ?? p.end, p.end) - p.enter) / 96, 0))).toFixed(1)})`);
    const HD = W.reduce((t, w) => t + w.hdays, 0),
      rep = (k) => ((1000 * W.reduce((t, w) => t + ((w.done[k] || {}).n || 0), 0)) / HD).toFixed(1),
      dd = {};
    for (const w of W) for (const [k, v] of Object.entries(w.deaths)) dd[k] = (dd[k] || 0) + v;
    const BT = W.reduce((t, w) => t + (w.bouts || 0), 0), TG = W.reduce((t, w) => t + (w.together || 0), 0);
    if (TG) console.log(`watching bouts ${BT} in ${(TG / 4).toFixed(0)} hours together: ${(BT / (TG / 4)).toFixed(2)} an hour (registered band 0.3-1.5)`);
    console.log(`hominin-days ${HD.toFixed(0)}, alive at the end ${W.reduce((t, w) => t + w.alive, 0)}, worlds emptied ${W.filter((w) => !w.alive).length}; repeats per 1,000 hominin-days: ` + ['take', 'nut', 'flake', 'dig', 'butcher', 'marrow', 'root', 'meat', 'share', 'speak'].map((k) => k + ' ' + rep(k)).join(', '));
    console.log('deaths: ' + Object.entries(dd).map(([k, v]) => k + ' ' + v).join(', '));
    console.log('skill | watched by | did | first-time rate per 1,000 days: after watching / before or never (ratio) | young who did it: mother did first / mother never');
    for (const k of SKILLS) {
      let tA = 0, eA = 0, tB = 0, eB = 0, nW = 0, nD = 0, mY = 0, mYd = 0, mN = 0, mNd = 0;
      for (const p of P) {
        const stop = p.death ?? p.end,
          did = p.fdone[k],
          w = p.ws[k];
        if (w !== undefined) nW++;
        if (did !== undefined) nD++;
        const endRisk = did !== undefined ? did : stop;
        if (w !== undefined && w < endRisk) {
          tB += (w - p.enter) / 96;
          tA += (endRisk - w) / 96;
          if (did !== undefined) eA++;
        } else {
          tB += (endRisk - p.enter) / 96;
          if (did !== undefined) eB++;
        }
        if (p.born && p.mom) {
          const md = p.mom.fdone[k];
          if (md !== undefined && md < (did ?? stop)) (mY++, did !== undefined && mYd++);
          else if (md === undefined) (mN++, did !== undefined && mNd++);
        }
      }
      const rA = tA ? (1000 * eA) / tA : NaN,
        rB = tB ? (1000 * eB) / tB : NaN;
      console.log(`${k} | ${nW} | ${nD} | ${rA.toFixed(2)} (${eA} in ${tA.toFixed(0)} d) / ${rB.toFixed(2)} (${eB} in ${tB.toFixed(0)} d) = ${(rA / rB).toFixed(2)} | ${mY ? Math.round((100 * mYd) / mY) + '% of ' + mY : '-'} / ${mN ? Math.round((100 * mNd) / mN) + '% of ' + mN : '-'}`);
    }
  }
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
  const rec = new Map();
  const see = (a, t) => {
    if (!rec.has(a.id)) rec.set(a.id, { a, enter: t, born: t > 0, mom: a.mom ? a.mom.id : null, death: null });
  };
  for (const a of E.state().ag) if (a.sp === 0) see(a, 0);
  let alive = new Set(rec.keys());
  const steps = days * E.DAY;
  let t = 0;
  for (t = 1; t <= steps; t++) {
    E.sim();
    const now = new Set();
    for (const a of E.state().ag) if (a.sp === 0) (see(a, t), now.add(a.id));
    for (const id of alive) if (!now.has(id) && rec.get(id).death === null) rec.get(id).death = t;
    alive = now;
    if (!alive.size) break;
  }
  const end = Math.min(t, steps);
  const people = [...rec.entries()].map(([id, r]) => ({ id, enter: r.enter, born: r.born, mom: r.mom, death: r.death, fdone: r.a.fdone || {}, ws: r.a.ws || {} }));
  // ticks in fd/ws are the world's tick; the world starts at tick 0 with the first step, so step t is tick t-1: convert to steps
  const t0 = 1;
  for (const p of people) {
    for (const k in p.fd) p.fdone[k] = p.fdone[k] + t0;
    for (const k in p.ws) p.ws[k] = p.ws[k] + t0;
  }
  const st = E.state(),
    done = Object.fromEntries(Object.entries(st.DONE || {}).map(([k, v]) => [k, { n: v.n, who: v.who.size }])),
    deaths = Object.fromEntries(Object.entries(st.deaths).filter(([k]) => k.startsWith('Person: ')).map(([k, v]) => [k.slice(8), v])),
    hdays = people.reduce((tt, p) => tt + (Math.min(p.death ?? end, end) - p.enter) / 96, 0);
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify({ seed, days, flags, end, watchN: st.WATCHN, bouts: st.WATCHB || 0, together: st.TOGETHER || 0, hdays, done, deaths, alive: alive.size, people }));
  console.log('world', seed, 'done: hominins', people.length, 'copy events', E.state().WATCHN);
}
