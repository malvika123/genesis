#!/usr/bin/env node
// Compare two runs of tools/analysis/predators.js (for example with and without --no-care), world by world.
//
//   node tools/analysis/compare-predators.js --a care-1.jsonl,care-2.jsonl --b nocare-1.jsonl,nocare-2.jsonl
//
// Both runs use the same seeds, and with an on/off switch each seed starts from the identical world, so the
// difference is taken seed by seed (paired). For each age group: person-days at risk, predator deaths per
// 1,000 person-days, encounters (a big hunter within 1.5 squares) per 1,000 person-days, and kills per
// encounter; then who the victims were. The pooled rate (all deaths over all person-days) is the standard
// measure; the mean of each world's rate weighs small worlds as much as big ones, so both are shown.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

const fs = require('fs');
const X = require('../experiment-core');
const DAY = 96;
const GROUPS = ['0-2', '3-11', '12-17', '18+'];

const argv = process.argv.slice(2),
  a = {};
for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) a[argv[i].slice(2)] = argv[i + 1];
const load = (list) =>
  list
    .split(',')
    .flatMap((f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)))
    .sort((x, y) => x.seed - y.seed);
const A = load(a.a),
  B = load(a.b);
const seeds = A.map((w) => w.seed).filter((s) => B.some((w) => w.seed === s));
const by = (R, s) => R.find((w) => w.seed === s);
const pick = (arr, g) => (g < 0 ? arr.reduce((s, v) => s + v, 0) : arr[g]);
const rate = (k, steps) => (steps ? (1000 * k) / (steps / DAY) : 0);
const f = (v, d = 2) => (v === null || v === undefined || Number.isNaN(v) ? '–' : v.toFixed(d));

const out = [];
out.push(`${seeds.length} worlds in both runs (seeds ${seeds[0]}–${seeds[seeds.length - 1]}). A = ${a.a}; B = ${a.b}.`);
out.push('');
out.push('Age      | person-days A / B | predator deaths A / B | pooled deaths per 1,000 person-days A / B | mean of world rates A / B | A − B (paired, ± 2 SE) | encounters per 1,000 p-d A / B | kills per encounter A / B');
for (let g = -1; g < 4; g++) {
  const name = g < 0 ? 'all' : GROUPS[g];
  const pdA = seeds.reduce((s, sd) => s + pick(by(A, sd).steps, g), 0) / DAY,
    pdB = seeds.reduce((s, sd) => s + pick(by(B, sd).steps, g), 0) / DAY,
    kA = seeds.reduce((s, sd) => s + pick(by(A, sd).kills, g), 0),
    kB = seeds.reduce((s, sd) => s + pick(by(B, sd).kills, g), 0),
    eA = seeds.reduce((s, sd) => s + pick(by(A, sd).enc, g), 0),
    eB = seeds.reduce((s, sd) => s + pick(by(B, sd).enc, g), 0);
  const rA = seeds.map((sd) => rate(pick(by(A, sd).kills, g), pick(by(A, sd).steps, g))),
    rB = seeds.map((sd) => rate(pick(by(B, sd).kills, g), pick(by(B, sd).steps, g))),
    d = X.meanSE(rA.map((v, i) => v - rB[i])),
    mA = X.meanSE(rA),
    mB = X.meanSE(rB);
  out.push(
    `${name.padEnd(8)} | ${Math.round(pdA)} / ${Math.round(pdB)} | ${kA} / ${kB} | ${f((1000 * kA) / pdA)} / ${f((1000 * kB) / pdB)} | ${f(mA.mean)} / ${f(mB.mean)} | ${d.mean >= 0 ? '+' : ''}${f(d.mean)} (${f(d.mean - 2 * d.se)} to ${f(d.mean + 2 * d.se)}) | ${f((1000 * eA) / pdA, 0)} / ${f((1000 * eB) / pdB, 0)} | ${f(eA ? kA / eA : null, 4)} / ${f(eB ? kB / eB : null, 4)}`
  );
}
const vict = (R) => R.filter((w) => seeds.includes(w.seed)).flatMap((w) => w.victims);
for (const [lab, R] of [
  ['A', A],
  ['B', B],
]) {
  const V = vict(R),
    sh = (fn) => (V.length ? Math.round((100 * V.filter(fn).length) / V.length) + '%' : '–');
  out.push('');
  out.push(
    `Victims ${lab} (${V.length}): under 12 ${sh((v) => v.age < 12)}, asleep ${sh((v) => v.asleep)}, no grown person within 1.5 squares ${sh((v) => !v.adultWithin1_5)}, a fire within 6 squares ${sh((v) => v.fireWithin6)}; median distance from the band's centre ${f(X.median(V.map((v) => v.fromBandCentre)), 1)} squares, from the nearest grown family member ${f(X.median(V.filter((v) => v.nearestFamilyAdult !== null).map((v) => v.nearestFamilyAdult)), 1)}.`
  );
}
console.log(out.join('\n'));
