#!/usr/bin/env node
// Who is killed by predators, and how often for the time they are at risk.
//
//   node tools/analysis/predators.js --seeds 1-24 --days 60 [--no-care] [other experiment switches] --out care.json
//
// For each seeded world it counts, by age group: person-days alive (the time at risk), predator deaths,
// and encounters (a big hunter within striking reach: 1.5 squares); and for each person killed: age, whether
// a grown person was within reach, how far from the band's centre, from the nearest grown family member,
// and from a fire, and whether it was asleep. It writes one JSON line per world, then a summary of rates
// per 1,000 person-days (mean ± standard error over worlds), so that more deaths can be told apart from
// more time at risk.
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
const GROUPS = ['0-2', '3-11', '12-17', '18+'];
const groupOf = (yrs) => (yrs < 3 ? 0 : yrs < 12 ? 1 : yrs < 18 ? 2 : 3);

const E = createEngine({ brain: S.brain });
const worlds = [];
for (const seed of seeds) {
  E.setSeed(seed);
  E.reset(S.cfg);
  const W = { seed, steps: [0, 0, 0, 0], kills: [0, 0, 0, 0], enc: [0, 0, 0, 0], victims: [] };
  for (let t = 0; t < S.days * E.DAY; t++) {
    // before the step: where everyone is
    const st0 = E.state(),
      ppl = st0.ag.filter((o) => o.sp === 0 && !o.gone),
      preds = st0.ag.filter((o) => o.sp === 2 && !o.gone),
      fire = E.fire().FIRE;
    let cx = 0,
      cy = 0,
      sx = 0,
      sy = 0;
    // the band's centre (on a world that wraps east–west: average the direction round the planet)
    for (const p of ppl) {
      const th = (p.x / E.W) * 2 * Math.PI;
      sx += Math.cos(th);
      sy += Math.sin(th);
      cy += p.y;
    }
    cx = ppl.length ? ((((Math.atan2(sy, sx) / (2 * Math.PI)) * E.W) % E.W) + E.W) % E.W : 0;
    cy = ppl.length ? cy / ppl.length : 0;
    const before = new Map();
    for (const p of ppl) {
      const g = groupOf(p.age / E.TY);
      W.steps[g]++;
      let near = false;
      for (const q of preds) if (Math.hypot(E.dxw(q.x - p.x), q.y - p.y) <= 1.5) near = true;
      if (near) W.enc[g]++;
      before.set(p, { g, x: p.x, y: p.y, asleep: !!p.asleep });
    }
    E.sim();
    for (const [p, b] of before) {
      if (!p.gone || p.cause !== 'killed by a predator') continue;
      W.kills[b.g]++;
      let adult = Infinity,
        fam = Infinity,
        fd = Infinity;
      for (const o of ppl) {
        if (o === p || o.age < o.S.mat) continue;
        const d = Math.hypot(E.dxw(o.x - b.x), o.y - b.y);
        adult = Math.min(adult, d);
        if (o === p.mom || p.mom === o.mom || (p.mom && p.mom.mom === o) || o.kid === p || o === p.mate) fam = Math.min(fam, d);
      }
      for (let dy = -6; dy <= 6; dy++)
        for (let dx = -6; dx <= 6; dx++) {
          const y = b.y + dy;
          if (y < 0 || y >= E.H) continue;
          if (fire[y * E.W + ((((b.x + dx) % E.W) + E.W) % E.W)] > 0.03) fd = Math.min(fd, Math.hypot(dx, dy));
        }
      W.victims.push({
        day: Math.floor(t / E.DAY) + 1,
        age: +(p.age / E.TY).toFixed(1),
        group: GROUPS[b.g],
        adultWithin1_5: adult <= 1.5,
        nearestAdult: adult === Infinity ? null : +adult.toFixed(1),
        nearestFamilyAdult: fam === Infinity ? null : +fam.toFixed(1),
        fromBandCentre: +Math.hypot(E.dxw(b.x - cx), b.y - cy).toFixed(1),
        fireWithin6: fd !== Infinity,
        asleep: b.asleep,
      });
    }
    if (st0.over) break;
  }
  worlds.push(W);
  console.error(`seed ${seed}: person-days ${(W.steps.reduce((s, v) => s + v, 0) / E.DAY).toFixed(0)}, predator deaths ${W.kills.reduce((s, v) => s + v, 0)}`);
  if (typeof a.out === 'string') fs.appendFileSync(a.out + 'l', JSON.stringify(W) + '\n');
}

// ---- summary: rates per 1,000 person-days, by age group and overall ----
const per = (k, s) => (s ? (1000 * k) / (s / E.DAY) : null);
const sum = { settings: { days: S.days, ...S.cfg }, seeds: a.seeds ?? '1-12', groups: {}, victims: [] };
for (let g = -1; g < 4; g++) {
  const name = g < 0 ? 'all' : GROUPS[g],
    pick = (arr) => (g < 0 ? arr.reduce((s, v) => s + v, 0) : arr[g]);
  const rates = worlds.map((w) => per(pick(w.kills), pick(w.steps))).filter((r) => r !== null),
    encR = worlds.map((w) => per(pick(w.enc), pick(w.steps))).filter((r) => r !== null),
    kills = worlds.reduce((s, w) => s + pick(w.kills), 0),
    enc = worlds.reduce((s, w) => s + pick(w.enc), 0),
    days = worlds.reduce((s, w) => s + pick(w.steps), 0) / E.DAY;
  const r = X.meanSE(rates),
    e = X.meanSE(encR);
  sum.groups[name] = {
    personDays: Math.round(days),
    predatorDeaths: kills,
    deathsPer1000PersonDays: r.mean === null ? null : +r.mean.toFixed(2),
    se: r.se === null ? null : +r.se.toFixed(2),
    encounterStepsPer1000PersonDays: e.mean === null ? null : +e.mean.toFixed(0),
    killsPerEncounterStep: enc ? +(kills / enc).toFixed(4) : null,
  };
}
const V = worlds.flatMap((w) => w.victims);
sum.victimsTotal = V.length;
sum.victimsShare = {
  child_under_12: V.length ? +(V.filter((v) => v.age < 12).length / V.length).toFixed(2) : null,
  noAdultWithin1_5: V.length ? +(V.filter((v) => !v.adultWithin1_5).length / V.length).toFixed(2) : null,
  asleep: V.length ? +(V.filter((v) => v.asleep).length / V.length).toFixed(2) : null,
  fireWithin6: V.length ? +(V.filter((v) => v.fireWithin6).length / V.length).toFixed(2) : null,
};
sum.medianFromBandCentre = X.median(V.map((v) => v.fromBandCentre));
sum.medianNearestFamilyAdult = X.median(V.filter((v) => v.nearestFamilyAdult !== null).map((v) => v.nearestFamilyAdult));
sum.victims = V;
const text = JSON.stringify(sum, null, 1);
if (typeof a.out === 'string') fs.writeFileSync(a.out, text);
console.log(JSON.stringify({ ...sum, victims: undefined }, null, 1));
