// Genesis — a trace of what hominins DO and what kills them, for comparing two settings (entry 99: why the honest eye changed so much, entry 97).
// Follows every hominin every step and records, by age class (baby: carried, under 2 years; child: under maturity; adult): the share of steps in each
// act, asleep, hungry (energy under 30) or thirsty (water under 30), steps spent in water, squares moved, and steps with a hunter in the same or a neighbouring
// square, by hunter kind (and whether that hunter was hungry: energy under 40). It also lists every death with age, class, cause (the same rule as
// reality-check.js), the killer's kind when a hunter, whether the mother was alive. It only reads the world: it changes nothing in it.
//
// Usage: node tools/analysis/trace-eye.js SEEDS DAYS OUT_DIR [experiment switches]        (e.g. 1,2,3 100 out/ --need-weighted-eye)
//        node tools/analysis/trace-eye.js --compare OLD_DIR NEW_DIR                       (pools worlds and prints the two side by side)
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'),
  path = require('path'),
  root = process.cwd();
const CLS = ['baby', 'child', 'adult'];
if (process.argv[2] === '--compare') {
  const load = (d) => fs.readdirSync(d).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'))),
    A = load(process.argv[3]),
    B = load(process.argv[4]);
  const sum = (W, f) => W.reduce((t, w) => t + f(w), 0);
  const ACT = ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE', 'stay', 'eat', 'drink', 'sleep', 'mate', 'attack', 'give', 'take', 'drop', 'strike', 'climb'];
  console.log('worlds', A.length, B.length, '; person-steps', sum(A, (w) => w.steps), '→', sum(B, (w) => w.steps));
  for (const c of CLS) {
    const nA = sum(A, (w) => w.n[c]),
      nB = sum(B, (w) => w.n[c]);
    console.log(`\n== ${c}: person-steps ${nA} → ${nB}`);
    const pc = (W, n, f) => ((100 * sum(W, f)) / Math.max(1, n)).toFixed(1);
    console.log('asleep %', pc(A, nA, (w) => w.asleep[c]), '→', pc(B, nB, (w) => w.asleep[c]), '| hungry %', pc(A, nA, (w) => w.hungry[c]), '→', pc(B, nB, (w) => w.hungry[c]), '| thirsty %', pc(A, nA, (w) => w.thirsty[c]), '→', pc(B, nB, (w) => w.thirsty[c]), '| in water %', pc(A, nA, (w) => w.water[c]), '→', pc(B, nB, (w) => w.water[c]));
    console.log('squares moved per 100 awake steps', ((100 * sum(A, (w) => w.moved[c])) / Math.max(1, nA - sum(A, (w) => w.asleep[c]))).toFixed(1), '→', ((100 * sum(B, (w) => w.moved[c])) / Math.max(1, nB - sum(B, (w) => w.asleep[c]))).toFixed(1));
    console.log('act % of steps awake: ' + ACT.map((nm, i) => nm + ' ' + pc(A, nA - sum(A, (w) => w.asleep[c]), (w) => w.acts[c][i]) + '→' + pc(B, nB - sum(B, (w) => w.asleep[c]), (w) => w.acts[c][i])).join(' | '));
  }
  console.log('\n== steps with a hunter in the same or a neighbouring square, per 1,000 person-steps (all ages); and with a hungry hunter (energy under 40)');
  for (const k of new Set([...A, ...B].flatMap((w) => Object.keys(w.near)))) {
    const f = (W, key) => ((1000 * sum(W, (w) => (w.near[k] ? w.near[k][key] : 0))) / sum(W, (w) => w.steps)).toFixed(1);
    console.log(k, f(A, 'all'), '→', f(B, 'all'), '| hungry hunter', f(A, 'hungry'), '→', f(B, 'hungry'));
  }
  console.log('\n== deaths by class and cause (count)');
  const tally = (W) => {
    const t = {};
    for (const w of W) for (const d of w.deaths) { const k = d.cls + ': ' + d.cause + (d.killer ? ' (' + d.killer + ')' : ''); t[k] = (t[k] || 0) + 1; }
    return t;
  };
  const tA = tally(A),
    tB = tally(B);
  for (const k of [...new Set([...Object.keys(tA), ...Object.keys(tB)])].sort()) console.log(k, tA[k] || 0, '→', tB[k] || 0);
  const mum = (W) => {
    const b = W.flatMap((w) => w.deaths).filter((d) => d.cls === 'baby');
    return b.length ? `${b.length} baby deaths, mother already dead in ${b.filter((d) => !d.momAlive).length}` : '0 baby deaths';
  };
  console.log('babies:', mum(A), '→', mum(B));
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
    zeros = () => ({ baby: 0, child: 0, adult: 0 });
  const R = { seed, days, flags, steps: 0, n: zeros(), asleep: zeros(), hungry: zeros(), thirsty: zeros(), water: zeros(), moved: zeros(), acts: { baby: new Array(19).fill(0), child: new Array(19).fill(0), adult: new Array(19).fill(0) }, near: {}, deaths: [], exposed: { baby: { cold: 0, heat: 0 }, child: { cold: 0, heat: 0 }, adult: { cold: 0, heat: 0 } } };
  const clsOf = (a) => (a.age < 2 * TY ? 'baby' : a.age < a.S.mat ? 'child' : 'adult');
  const causeOf = (a) => (a.dead ? a.cause : a.hp <= 0 ? (a.wasW ? 'drowned' : 'its wounds') : a.w <= 0 ? 'thirst' : a.e <= 0 ? 'hunger' : a.age > a.lf ? 'old age' : 'unknown');
  const last = new Map(); // id -> { a, x, y, cls }
  const steps = days * E.DAY;
  for (let t = 0; t < steps; t++) {
    E.sim();
    const st = E.state(),
      ag = st.ag,
      people = [],
      hunters = [],
      now = new Set();
    for (const a of ag) {
      if (a.sp === 0) people.push(a);
      else if (a.sp === 2) hunters.push(a);
    }
    for (const a of people) {
      now.add(a.id);
      const c = clsOf(a),
        i = E.idx(a.x, a.y),
        p = last.get(a.id);
      R.n[c]++;
      R.steps++;
      if (a.asleep) R.asleep[c]++;
      if (a.e < 30) R.hungry[c]++;
      if (a.w < 30) R.thirsty[c]++;
      if (st.water[i] && !st.river[i]) R.water[c]++;
      if (p && !a.asleep && (p.x !== a.x || p.y !== a.y)) R.moved[c]++;
      if (a.act >= 0 && a.act < 19) R.acts[c][a.act]++;
      const seen = new Set();
      for (const h of hunters) {
        if (Math.abs(E.dxw(h.x - a.x)) <= 1 && Math.abs(h.y - a.y) <= 1 && !seen.has(h.S.n)) {
          seen.add(h.S.n);
          const r = R.near[h.S.n] || (R.near[h.S.n] = { all: 0, hungry: 0 });
          r.all++;
          if (h.e < 40) r.hungry++;
        }
      }
      const q = last.get(a.id) || {};
      if ((a.cold || 0) > 0.7) R.exposed[c].cold++, (q.coldN = (q.coldN || 0) + 1);
      if ((a.heat || 0) > 0.7) R.exposed[c].heat++, (q.heatN = (q.heatN || 0) + 1);
      last.set(a.id, { x: a.x, y: a.y, cls: c, a, momAlive: a.mom ? !a.mom.dead && !a.mom.gone : false, coldN: q.coldN, heatN: q.heatN });
    }
    for (const [id, p] of last) {
      if (now.has(id)) continue;
      const a = p.a;
      R.deaths.push({ id, cls: p.cls, ageY: +(a.age / TY).toFixed(2), cause: causeOf(a) || 'unknown', killer: a.killedBy || null, momAlive: p.momAlive, tick: t, cold: +(a.cold || 0).toFixed(2), heat: +(a.heat || 0).toFixed(2), e: +a.e.toFixed(1), w: +a.w.toFixed(1), trap: a.trap || 0, coldSteps: p.coldN || 0, heatSteps: p.heatN || 0 });
      last.delete(id);
    }
    if (!people.length) break;
  }
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify(R));
  console.log('world', seed, 'done: person-steps', R.steps, 'deaths', R.deaths.length);
}
