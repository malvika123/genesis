// Genesis — a long run, day by day (entry 103: do hunters multiply as the band grows, and end it?). Records each simulated day: hominins, plant-eaters, hunters by kind,
// and hominins killed by each hunter kind that day; and how each world ends. It only reads the world: it changes nothing in it.
// Usage: node tools/analysis/long-run.js SEEDS DAYS OUT_DIR [switches]      then      node tools/analysis/long-run.js --summary OUT_DIR
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'),
  path = require('path'),
  root = process.cwd();
if (process.argv[2] === '--summary') {
  const d = process.argv[3],
    W = fs.readdirSync(d).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')));
  for (const w of W.sort((a, b) => a.seed - b.seed)) {
    const R = w.days,
      at = (y) => R[Math.min(R.length - 1, Math.round(y * 3) - 1)] || R[R.length - 1],
      peak = R.reduce((m, r) => (r.h > m.h ? r : m), R[0]),
      hunt = (r) => Object.values(r.hk).reduce((a, b) => a + b, 0);
    const kills = {};
    for (const r of R) for (const [k, v] of Object.entries(r.kill)) kills[k] = (kills[k] || 0) + v;
    console.log(`seed ${w.seed}: ${R.length} days (${(R.length / 3).toFixed(0)} y); hominins start ${R[0].h}, peak ${peak.h} at year ${(peak.d / 3).toFixed(0)}, end ${R[R.length - 1].h}` +
      `; hunters at years 10/40/80/end: ${[10, 40, 80].map((y) => hunt(at(y))).join('/')}/${hunt(R[R.length - 1])} (${Object.entries(R[R.length - 1].hk).map(([k, v]) => k + ' ' + v).join(', ')})` +
      `; plant-eaters at the end ${R[R.length - 1].pe}; hominins killed by: ${Object.entries(kills).map(([k, v]) => k + ' ' + v).join(', ') || 'none'}`);
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
  const R = [];
  let kill = {},
    alive = new Map(E.state().ag.filter((a) => a.sp === 0).map((a) => [a.id, a]));
  for (let t = 1; t <= days * E.DAY; t++) {
    E.sim();
    const ag = E.state().ag,
      now = new Map();
    for (const a of ag) if (a.sp === 0) now.set(a.id, a);
    for (const [id, a] of alive)
      if (!now.has(id) && a.dead && /predator/.test(a.cause || '')) {
        const k = String(a.killedBy || 'unknown').replace(/ \(.*\)$/, '');
        kill[k] = (kill[k] || 0) + 1;
      }
    alive = now;
    if (t % E.DAY === 0) {
      const hk = {};
      for (const a of ag) if (a.sp === 2 && !a.dead) hk[a.S.n] = (hk[a.S.n] || 0) + 1;
      R.push({ d: t / E.DAY, h: now.size, pe: ag.filter((a) => a.sp === 1 && !a.dead).length, hk, kill });
      kill = {};
      if (!now.size && t / E.DAY > 3) break;
    }
  }
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify({ seed, flags, days: R }));
  console.log('world', seed, 'done:', R.length, 'days, hominins at the end', R[R.length - 1].h);
}
