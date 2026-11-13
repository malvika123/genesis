// Genesis — the ledger (scale step, step 0; Fable's review 14 Nov 2026): what a world offers its hominins and hunters, per day.
// It only reads the world. Per world: prey, hunters and carcasses within sight of each hominin (per hominin-day); prey killed by
// hunters (kg) per hunter per day; how far each hunter is from the nearest prey.
// Usage: node tools/analysis/ledger.js SEEDS DAYS OUT_DIR [experiment switches]
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
const SIGHT = 3; // squares (about 9 km) counted as "in sight" for the ledger (a reporting choice, not a world number)
fs.mkdirSync(out, { recursive: true });
for (const seed of seeds) {
  const S = X.fromArgs(flags);
  const E = createEngine({ brain: S.brain });
  E.setSeed(seed);
  E.reset(S.cfg);
  const W = E.W,
    D = E.DAY;
  const near = (a, o) => Math.abs(E.dxw(o.x - a.x)) <= SIGHT && Math.abs(o.y - a.y) <= SIGHT;
  let homSamples = 0,
    preyIn = 0,
    huntIn = 0,
    carcIn = 0,
    zeroCarc = 0,
    huntSamples = 0,
    farFromPrey = 0,
    distSum = 0,
    killedKg = 0,
    huntDays = 0;
  // the world removes the dead at the end of each step, so prey are followed from one step to the next: one that is gone (or
  // dead) with the cause 'killed by a predator' was killed by a hunter (the first version missed them all: entry 63, corrected)
  let prevPrey = [];
  for (let t = 0; t < days * D; t++) {
    E.sim();
    const st = E.state(),
      bodies = E.items().bodies;
    for (const o of prevPrey)
      if (o.dead && o.cause === 'killed by a predator') killedKg += (o.S.mass || 0) * (o.age < o.S.mat ? Math.min(1, 0.1 + (0.9 * o.age) / o.S.mat) : 1);
    prevPrey = st.ag.filter((o) => o.sp === 1 && !o.dead);
    if (t % 12) continue; // sample every 3 hours
    const live = st.ag.filter((o) => !o.dead),
      prey = live.filter((o) => o.sp === 1),
      hunters = live.filter((o) => o.sp === 2);
    huntDays += hunters.length / 8; // 8 samples a day
    for (const a of live) {
      if (a.sp === 0) {
        homSamples++;
        preyIn += prey.filter((o) => near(a, o)).length;
        huntIn += hunters.filter((o) => near(a, o)).length;
        const c = bodies.filter((b) => b.meat > 0.05 && b.sp !== 0 && near(a, b)).length;
        carcIn += c;
        if (!c) zeroCarc++;
      } else if (a.sp === 2) {
        huntSamples++;
        let d = Infinity;
        for (const p of prey) d = Math.min(d, Math.max(Math.abs(E.dxw(p.x - a.x)), Math.abs(p.y - a.y)));
        if (d > 5) farFromPrey++;
        if (isFinite(d)) distSum += d;
      }
    }
  }
  const res = {
    seed,
    days,
    flags,
    preyInSightPerHominin: preyIn / homSamples,
    huntersInSightPerHominin: huntIn / homSamples,
    carcassesInSightPerHominin: carcIn / homSamples,
    shareOfSamplesWithNoCarcass: zeroCarc / homSamples,
    preyKgKilledPerHunterDay: huntDays ? killedKg / huntDays : null,
    shareHunterSamplesFarFromPrey: huntSamples ? farFromPrey / huntSamples : null,
    meanHunterDistanceToPrey: huntSamples ? distSum / huntSamples : null,
    peopleAliveEnd: E.state().ag.filter((o) => o.sp === 0 && !o.dead).length,
  };
  fs.writeFileSync(path.join(out, 'world-' + seed + '.json'), JSON.stringify(res));
  console.log(JSON.stringify(res));
}
