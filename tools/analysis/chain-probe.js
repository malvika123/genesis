// The chain-learning probe and the delayed-response probe (F3 and L0; master plan step 0.3). A bare test, outside the world:
// can today's hominin brain learn a chain of N acts rewarded only at the end, and how many steps can it hold a cue?
// It uses the brain exactly as the world does (src/brain.js: forward, trace, learnStep, the one-try boost, backward replay);
// only the surroundings are bare. Nothing in the world changes.
//
//   node tools/analysis/chain-probe.js [--brains 10] [--steps 175000] [--seed 1]
//
// The chain: N states, each shown on its own input (the hand senses: holding nothing, a stone, ...). In state k one act (a
// different one for each k, none of them walking) moves it to state k+1; any other act leaves it where it is. Finishing gives
// a reward of 1 (about a good meal) and starts again; an attempt not finished in 3N steps ends with nothing (the chance passed).
// "Learned" = in 2,000 steps running it finishes at least half as often as a perfect player (one every N steps).
// The delay: two blank steps, then one of two cues for one step; D steps later (0: at once) the act that matches the cue is rewarded (1), the other
// not. "Held" = right in at least 75% of the last 500 trials (chance 50%).
// Budget: a real-length childhood, 10 years of waking steps (12 h a day × 4 steps an hour × 365 = 17,520 a year).
// Copyright (c) 2026 Malvika Sen. MIT License.
const { engineSource } = require('../engine');
const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > 0 ? +process.argv[i + 1] : d;
};
const BRAINS = arg('brains', 10),
  STEPS = arg('steps', 175200),
  SEED = arg('seed', 1),
  ONLY = (process.argv[process.argv.indexOf('--only') + 1] || '').split(',').filter(Boolean), // e.g. --only chain2,delay1
  BS = process.argv.includes('--bs') ? arg('bs', 0) : null; // brain size, the share of the 64-unit ceiling the brain has grown to (entry 107: the chain probe by size); default: as before

function engine() {
  return new Function(
    engineSource() +
      '\nreturn { setSeed, reset, ag: () => ag, child, mk, forward, trace, fadeTraces, learnStep, notePath, backReplay, sample, grownUnits, rnd, GAM, IB, NA, NM, NI, TY, A_TAKE, A_STRIKE, A_EAT, A_GIVE, A_DROP, A_CLIMB, A_STAY, A_SLEEP };'
  )();
}

// a fresh child's brain, born of two founders of a real world, grown to the age of weaning's end (it learns as a youngster does)
function newLearner(E, s) {
  E.setSeed(SEED * 1000 + s);
  E.reset({});
  const f = E.ag().filter((a) => a.sp === 0 && a.age >= a.S.mat);
  const p = f.find((a) => a.sex === 0) || f[0],
    q = f.find((a) => a.sex === 1) || f[1];
  const a = E.mk(0, p.x, p.y, 0, E.child(p, q), 1, 0);
  a.age = Math.round(a.S.mat * 0.4); // a youngster: weaned, still plastic
  a.nh = E.grownUnits(a);
  if (BS !== null) {
    // the brain by size (entry 107): the same child, with the inherited size trait set and its units grown to that size (a grown brain of that size, still plastic as a youngster)
    a.g.bs = BS;
    a.nh = Math.max(a.S.nh, Math.round(a.h.length * BS));
  }
  return a;
}

// one step of the brain, as in src/sim.js (no inborn pulls, no fear, no stress: a calm youngster)
function step(E, a, x, r) {
  for (let j = 0; j < E.NM; j++) x[E.IB + 27 + j] = a.hm[j];
  x.forEach((v, i) => (a.xi[i] = v));
  const V = E.forward(a.lw, a.xi, a.h, a.z, a.nh, null, a.zv, null);
  for (let j = 0; j < E.NM; j++) a.hm[j] = a.h[j];
  const pl = a.S.plast * (a.g.lr ?? 1);
  if (a.has) {
    E.notePath(a, a.xl, a.act, r);
    if (r > 0.3) E.backReplay(a, V, pl * 0.5);
    const d = Math.max(-2, Math.min(2, r + E.GAM * V - a.Vp));
    let mod = 1;
    if (d > 0.5) mod *= 1 + 3 * Math.min(1, (d - 0.5) / 1.5);
    E.learnStep(a, d, pl * mod, pl);
  }
  const act = E.sample(a.z);
  E.trace(a, act, null);
  a.Vp = V;
  a.has = true;
  a.act = act;
  a.xl = Float32Array.from(a.xi);
  return act;
}

const ACTS = (E) => [E.A_TAKE, E.A_STRIKE, E.A_EAT, E.A_GIVE, E.A_CLIMB];
function chain(E, a, N) {
  const acts = ACTS(E).slice(0, N),
    x = new Float32Array(E.NI),
    win = [];
  let k = 0,
    t0 = 0,
    r = 0,
    done = 0;
  for (let t = 0; t < STEPS; t++) {
    x.fill(0);
    x[E.IB + 11] = 1; // always on
    x[E.IB + 19 + k] = 1; // what it holds / where it is in the chain
    const act = step(E, a, x, r);
    r = 0;
    if (act === acts[k]) k++;
    if (k === N) {
      r = 1;
      k = 0;
      t0 = t + 1;
      win.push(t);
    } else if (t + 1 - t0 >= 3 * N) {
      k = 0;
      t0 = t + 1;
    }
    while (win.length && win[0] <= t - 2000) win.shift();
    if (t >= 2000 && win.length >= (0.5 * 2000) / N) return t + 1;
  }
  return null;
}
function delay(E, a, D) {
  const x = new Float32Array(E.NI),
    acts = [E.A_TAKE, E.A_STRIKE],
    res = [];
  let r = 0,
    t = 0;
  while (t < STEPS) {
    const cue = E.rnd() < 0.5 ? 0 : 1;
    // two blank steps between trials (as in any delayed-response test), then the cue; D steps later, the moment to act
    for (let s = -2; s <= D && t < STEPS; s++, t++) {
      x.fill(0);
      x[E.IB + 11] = 1;
      if (s === 0) x[E.IB + 19 + cue] = 1; // the cue, once
      if (s === D) x[E.IB + 23] = 1; // "now": the moment to act
      const act = step(E, a, x, r);
      r = 0;
      if (s === D) {
        const ok = act === acts[cue] ? 1 : act === acts[1 - cue] ? 0 : null;
        if (ok !== null) {
          res.push(ok);
          r = ok;
        }
        if (res.length > 500) res.shift();
        if (res.length === 500 && res.reduce((u, v) => u + v, 0) >= 375) return t + 1;
      }
    }
  }
  return null;
}

const YR = 17520,
  E0 = engine();
const tmp = newLearner(E0, 0),
  squeezed = Math.round(tmp.S.mat); // a squeezed childhood in steps (the world's clock: TY steps a year)
const show = (v) => (v === null ? 'not learned' : (v / YR).toFixed(2) + ' real yr (' + v + ' steps)');
console.log(`# chain probe, ${BRAINS} brains${BS !== null ? ', brain size ' + BS + ' (' + Math.max(0, Math.round(64 * BS)) + ' units)' : ''}, budget ${STEPS} steps (${(STEPS / YR).toFixed(1)} real-length years of waking); the world's squeezed childhood = ${squeezed} steps`);
for (const N of [2, 3, 4, 5]) {
  if (ONLY.length && !ONLY.includes('chain' + N) && process.argv.includes('--only')) continue;
  const out = [];
  for (let b = 0; b < BRAINS; b++) {
    const E = engine();
    out.push(chain(E, newLearner(E, b + 1), N));
  }
  const ok = out.filter((v) => v !== null).sort((u, v) => u - v);
  console.log(`chain ${N}: learned by ${ok.length}/${BRAINS}; median ${ok.length ? show(ok[ok.length >> 1]) : '-'}; within a squeezed childhood ${out.filter((v) => v !== null && v <= squeezed).length}/${BRAINS}; each: ${out.map((v) => v ?? '-').join(' ')}`);
}
for (const D of [0, 1, 2, 4, 8]) {
  if (ONLY.length && !ONLY.includes('delay' + D) && process.argv.includes('--only')) continue;
  const out = [];
  for (let b = 0; b < BRAINS; b++) {
    const E = engine();
    out.push(delay(E, newLearner(E, b + 1), D));
  }
  const ok = out.filter((v) => v !== null).sort((u, v) => u - v);
  console.log(`delay ${D}: held by ${ok.length}/${BRAINS}; median ${ok.length ? show(ok[ok.length >> 1]) : '-'}; each: ${out.map((v) => v ?? '-').join(' ')}`);
}
