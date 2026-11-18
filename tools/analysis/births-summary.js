// Genesis — pool the per-woman records of tools/analysis/life-trace.js over worlds (entry 113): births per adult female per year, birth gaps, the share of adult-female time spent ready
// (not pregnant or nursing) and how often a ready female has a ready male near, infants lost and the wait for the next conception. Reads only.
// Usage: node tools/analysis/births-summary.js DIR   (DIR holds lt-SEED.json files)
// Copyright (c) 2026 Malvika Sen. MIT License.
const fs = require('fs'), path = require('path'), d = process.argv[2];
const W = fs.readdirSync(d).filter((f) => /^lt-\d+\.json$/.test(f)).map((f) => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')));
const women = W.flatMap((w) => w.women.map((x) => ({ ...x, seed: w.seed })));
const yrs = women.reduce((t, x) => t + x.yearsAdult, 0), births = women.reduce((t, x) => t + x.births, 0);
const gaps = women.flatMap((x) => x.gapsY).filter((v) => typeof v === 'number').sort((a, b) => a - b), med = (a) => (a.length ? a[a.length >> 1] : NaN);
const wmean = (k) => { const l = women.filter((x) => typeof x[k] === 'number'), y = l.reduce((t, x) => t + x.yearsAdult, 0); return l.reduce((t, x) => t + x[k] * x.yearsAdult, 0) / y; }; // women with no ready time have null in the second share: left out of it
const inf = women.reduce((t, x) => t + x.infantDeaths.length, 0), nextC = women.flatMap((x) => x.yearsToNextConceptionAfterInfantDeath).filter((v) => typeof v === 'number').sort((a, b) => a - b);
const f = (x, n = 2) => (isNaN(x) ? '-' : x.toFixed(n));
console.log(`${W.length} worlds, ${women.length} adult females, ${f(yrs, 0)} adult-female years, ${births} births`);
console.log(`births per adult female per year: ${f(births / yrs, 3)} (one birth every ${f(yrs / births, 1)} years)`);
console.log(`birth gaps (years): n ${gaps.length}, median ${f(med(gaps))}, mean ${f(gaps.reduce((t, x) => t + x, 0) / gaps.length)}, 10th ${f(gaps[Math.floor(gaps.length * 0.1)])}, 90th ${f(gaps[Math.floor(gaps.length * 0.9)])}`);
console.log(`share of adult-female time ready (not pregnant or nursing): ${f(wmean('pctAdultTimeReady'), 1)}%; of ready time with a ready male near: ${f(wmean('pctReadyWithReadyMaleNear'), 1)}%`);
console.log(`infants lost: ${inf}; years to the next conception after an infant death: n ${nextC.length}, median ${f(med(nextC))}`);
const zero = women.filter((x) => x.yearsAdult >= 5 && x.births === 0).length, long = women.filter((x) => x.yearsAdult >= 5).length;
console.log(`adult females with 5 or more adult years and no birth: ${zero} of ${long} (${f((100 * zero) / Math.max(1, long), 0)}%)`);
console.log('per world (adult-female years, births, per year): ' + W.map((w) => { const y = w.women.reduce((t, x) => t + x.yearsAdult, 0), b = w.women.reduce((t, x) => t + x.births, 0); return `${w.seed}: ${f(y, 0)}, ${b}, ${f(b / Math.max(0.1, y), 2)}`; }).join(' | '));
