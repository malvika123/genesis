#!/usr/bin/env node
// Whom do predators take? For every kill by a big hunter (of people and of plant-eaters), compare the
// victims with everyone who was there to be taken: young or grown, weak (hurt or starving) or healthy, alone
// (no other of its kind within 2 squares) or with others, by night or by day.
//
//   node tools/analysis/prey-selection.js --seeds 1-12 --days 30 [experiment switches] --out sel.json
//
// Selectivity = (share of kills in a class) / (share of time at risk spent in that class): 1 means predators
// take that class as often as chance would, above 1 more often. Real predators take the young, the weak and
// the isolated far more than chance (e.g. Mech & Peterson 2003 for wolves; FitzGibbon 1990 for cheetahs).
//
// Copyright (c) 2026 Malvika Sen. MIT License.

const fs = require('fs');
const { createEngine } = require('../engine');
const X = require('../experiment-core');

const argv = process.argv.slice(2),
  a = {};
for (let i = 0; i < argv.length; i++)
  if (argv[i].startsWith('--')) {
    const k = argv[i].slice(2);
    a[k] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  }
const S = X.fromArgs(a),
  seeds = X.seedList(a.seeds ?? '1-12');
const CLASSES = ['young', 'weak', 'alone', 'night'];
const blank = () => ({ steps: 0, kills: 0, ...Object.fromEntries(CLASSES.flatMap((c) => [[c + 'Steps', 0], [c + 'Kills', 0]])) });
const tot = { person: blank(), plantEater: blank() };

const E = createEngine({ brain: S.brain });
for (const seed of seeds) {
  E.setSeed(seed);
  E.reset(S.cfg);
  for (let t = 0; t < S.days * E.DAY; t++) {
    const st = E.state(),
      prey = st.ag.filter((o) => (o.sp === 0 || o.sp === 1) && !o.gone),
      cls = new Map();
    for (const p of prey) {
      let alone = true;
      for (const q of prey) if (q !== p && q.sp === p.sp && Math.hypot(E.dxw(q.x - p.x), q.y - p.y) <= 2) {
        alone = false;
        break;
      }
      const c = {
        young: p.age < p.S.mat,
        weak: p.hp < 50 || p.e < 25,
        alone,
        night: E.isNightAt(p.x),
      };
      cls.set(p, c);
      const T = tot[p.sp === 0 ? 'person' : 'plantEater'];
      T.steps++;
      for (const k of CLASSES) if (c[k]) T[k + 'Steps']++;
    }
    E.sim();
    for (const [p, c] of cls) {
      if (!p.gone || p.cause !== 'killed by a predator') continue;
      const T = tot[p.sp === 0 ? 'person' : 'plantEater'];
      T.kills++;
      for (const k of CLASSES) if (c[k]) T[k + 'Kills']++;
    }
    if (st.over) break;
  }
  console.error(`seed ${seed} done: people killed ${tot.person.kills}, plant-eaters killed ${tot.plantEater.kills} (running totals)`);
}
const out = { settings: { days: S.days, ...S.cfg }, seeds: a.seeds ?? '1-12', totals: tot, selectivity: {} };
for (const [who, T] of Object.entries(tot)) {
  out.selectivity[who] = {};
  for (const k of CLASSES) {
    const expo = T.steps ? T[k + 'Steps'] / T.steps : 0,
      kill = T.kills ? T[k + 'Kills'] / T.kills : 0;
    out.selectivity[who][k] = { shareOfTimeAtRisk: +expo.toFixed(3), shareOfKills: +kill.toFixed(3), selectivity: expo ? +(kill / expo).toFixed(2) : null };
  }
}
if (typeof a.out === 'string') fs.writeFileSync(a.out, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.selectivity, null, 1));
