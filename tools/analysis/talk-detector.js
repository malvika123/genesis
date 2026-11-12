// Genesis — did they start to exchange words and understand each other? A detector that watches one world and reports,
// in plain words and never more than the data support, whether sounds have come to carry meaning, whether hearers act
// on them, and whether calls and answers pass back and forth. It only reads the world: it changes nothing in it.
//
// Usage (from the genesis folder):
//   node tools/analysis/talk-detector.js SEED DAYS [--plant] [--null-only] [experiment switches, e.g. --africa-animals]
//
// What it does, following how animal-communication researchers test meaning (Macedonia & Evans 1993: a call must be
// specific to a situation — production specificity — and hearers must respond to it without the situation —
// perception specificity) and the point of Lowe et al. 2019 (a signal that carries information is not the same as a
// listener that uses it):
//  1. Speaker side. For each sound said at least 25 times, an exact binomial test of each situation (predator near,
//     food near, family near, alone, hungry, hurt) against how often hominins are in it at any moment, with a
//     Benjamini–Hochberg correction for every sound and situation tried. (The page's translator, src/talk.js
//     meaning(), uses a fixed threshold with no test: how many sounds it would label that this test does not is printed.)
//  2. Hearer side — a playback experiment, read-only: at the end of the run each living hominin's own brain is asked what
//     it would do if the sound came from the east, and from the west, against silence, on copies of its inputs; the
//     same is done with 200 sets of random other utterances as controls. A sound is "responded to" only if it moves
//     choices more than the controls do and in a consistent way across hearers.
//  3. Exchange. A call by one hominin followed within 3 steps by a call from another within earshot, against the same
//     calls with their times shifted at random (which keeps how often each hominin calls, and breaks who answers whom).
//  4. Controls. The speaker-side test is run on simulated worlds in which sounds mean nothing (false-alarm rate);
//     --plant gives one sound a known effect in a throwaway copy of the brains, to show the playback can find one.
//
// Copyright (c) 2026 Malvika Sen. MIT License.
const path = require('path'),
  root = process.cwd();
const { createEngine } = require(path.join(root, 'tools/engine'));
const X = require(path.join(root, 'tools/experiment-core'));

const seed = Number(process.argv[2]),
  days = Number(process.argv[3]);
const flags = {};
for (const a of process.argv.slice(4)) if (a.startsWith('--')) flags[a.slice(2)] = true;
const PLANT = !!flags.plant,
  NULLONLY = !!flags['null-only'];
delete flags.plant;
delete flags['null-only'];
const S = X.fromArgs(Object.assign({ 'naive-founders': true }, flags));
const E = createEngine({ brain: S.brain });
E.setSeed(seed);
E.reset(S.cfg);

// ---- run the world, noting every word said ----
const events = [];
const steps = days * E.DAY;
for (let t = 0; t < steps; t++) {
  E.sim();
  for (const c of E.talk().CALLS) if (c.k === 2 && c.a && c.a.sp === 0) events.push({ t, id: c.a.id, gen: c.a.gen || 0, word: c.word, x: c.x, y: c.y, w: c.w, p: c.p });
  if (E.state().over) break;
}
const T = E.talk();
const CTX = ['pred', 'food', 'kin', 'alone', 'hungry', 'hurt'],
  CTXN = { pred: 'a predator is near', food: 'food is near', kin: 'family is near', alone: 'the caller is alone', hungry: 'the caller is hungry', hurt: 'the caller is hurt' };
const rows = [...T.WSTAT.entries()].map(([word, s]) => ({ word, s }));
const out = { seed, days, flags: Object.keys(flags), utterances: events.length, distinctSounds: rows.length };

// ---- statistics ----
let N = 5000;
for (const r of rows) N = Math.max(N, r.s.n + 5);
const logF = [0];
for (let i = 1; i <= N; i++) logF[i] = logF[i - 1] + Math.log(i);
const lbin = (n, k, p) => logF[n] - logF[k] - logF[n - k] + k * Math.log(p) + (n - k) * Math.log(1 - p);
const tail = (n, k, p) => {
  if (k <= 0) return 1;
  let s = 0;
  for (let j = k; j <= n; j++) s += Math.exp(lbin(n, j, p));
  return Math.min(1, s);
};
function bh(ps) {
  const m = ps.length,
    order = ps.map((_, i) => i).sort((a, b) => ps[a] - ps[b]),
    q = new Array(m);
  let prev = 1;
  for (let r = m; r >= 1; r--) {
    const i = order[r - 1];
    prev = Math.min(prev, (ps[i] * m) / r);
    q[i] = prev;
  }
  return q;
}
const base = (c) => (T.BASE[c] + 1) / (T.BASE.n + 2);

// 1. speaker side
const MIN = 25;
const tested = [];
for (const { word, s } of rows) {
  if (s.n < MIN) continue;
  for (const c of CTX) tested.push({ word, c, n: s.n, k: s[c], q: base(c), lift: s[c] / s.n / base(c), p: tail(s.n, s[c], base(c)) });
}
const qv = bh(tested.map((t) => t.p));
tested.forEach((t, i) => (t.fdr = qv[i]));
const hits = tested.filter((t) => t.fdr < 0.05 && t.lift > 1.5);
const hitWords = [...new Set(hits.map((h) => h.word))];
const pageLabelled = rows.filter(({ word }) => {
  const m = T.meaning(word);
  return m && m.best;
});
out.speaker = {
  soundsSaidAtLeast25Times: rows.filter((r) => r.s.n >= MIN).length,
  testsRun: tested.length,
  significantSounds: hitWords.length,
  hits: hits.map((h) => ({ sound: h.word, situation: CTXN[h.c], said: h.n, inThatSituation: h.k, timesMoreOftenThanChance: +h.lift.toFixed(2), fdr: +h.fdr.toExponential(1) })),
  soundsTheTranslatorWouldLabel: pageLabelled.length,
  ofThoseSurvivingTheTest: pageLabelled.filter((r) => hitWords.includes(r.word)).length,
};
// the speaker-side test on worlds in which sounds mean nothing: how often does it cry wolf?
{
  let any = 0;
  const K = 200;
  for (let rep = 0; rep < K; rep++) {
    const ps = [];
    for (const { s } of rows) {
      if (s.n < MIN) continue;
      for (const c of CTX) {
        let k = 0;
        const q = base(c);
        for (let i = 0; i < s.n; i++) if (Math.random() < q) k++;
        ps.push(tail(s.n, k, q));
      }
    }
    if (ps.length && Math.min(...bh(ps)) < 0.05) any++;
  }
  out.speaker.falseAlarmRateWhenSoundsMeanNothing = +(any / K).toFixed(3);
}

// 2. hearer side — playback on copies of each brain's inputs
const MV = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]; // config.js
const MIRROR = [4, 3, 2, 1, 0, 7, 6, 5]; // east and west swapped, for the walking choices (the order of MV)
const living = E.state().ag.filter((a) => a.sp === 0 && !a.dead && a.xi && a.h && a.lw && a.age > 0).slice(0, 40);
const byWord = new Map();
for (const e of events) (byWord.get(e.word) || byWord.set(e.word, []).get(e.word)).push(e);
function respond(a, u, dirx, diry, lw) {
  const x0 = Float32Array.from(a.xi);
  for (let i = E.HEAR; i < E.HEAR + 9; i++) x0[i] = 0;
  for (let i = E.SPEECH; i < E.SPEECH + 12; i++) x0[i] = 0;
  const x1 = Float32Array.from(x0),
    o = E.HEAR + 6,
    f = T.hearWord(u.w, u.p, 0.7);
  x1[o] = 0.7;
  x1[o + 1] = dirx;
  x1[o + 2] = diry;
  for (let i = 0; i < f.length; i++) x1[E.SPEECH + i] = f[i];
  const z0 = new Float32Array(E.NA),
    z1 = new Float32Array(E.NA);
  E.forward(lw || a.lw, x0, Float32Array.from(a.h), z0, a.nh, null);
  E.forward(lw || a.lw, x1, Float32Array.from(a.h), z1, a.nh, null);
  const d = new Float32Array(E.NA);
  let tv = 0,
    tow = 0;
  for (let k = 0; k < E.NA; k++) {
    d[k] = z1[k] - z0[k];
    tv += 0.5 * Math.abs(d[k]);
  }
  for (let s = 0; s < 8; s++) tow += d[s] * ((MV[s][0] * dirx + MV[s][1] * diry) / Math.hypot(MV[s][0], MV[s][1]));
  return { d, tv, tow };
}
// effect of a set of utterances over all hearers: size, consistency across hearers, and toward (+) or away (-)
function effect(us, lwOf) {
  if (!living.length || !us.length) return null;
  const sum = new Float32Array(E.NA);
  let tv = 0,
    nrm = 0,
    tow = 0,
    n = 0;
  for (const a of living)
    for (const u of us)
      for (const [dx, dy] of [[1, 0], [-1, 0]]) {
        const r = respond(a, u, dx, dy, lwOf ? lwOf(a) : null);
        // seen from the sound's side, "toward it" must line up whichever way it came: mirror the walking choices for the west
        for (let k = 0; k < E.NA; k++) sum[k] += k < 8 && dx < 0 ? r.d[MIRROR[k]] : r.d[k];
        tv += r.tv;
        tow += r.tow;
        let l = 0;
        for (let k = 0; k < E.NA; k++) l += r.d[k] * r.d[k];
        nrm += Math.sqrt(l);
        n++;
      }
  let ms = 0;
  for (let k = 0; k < E.NA; k++) ms += (sum[k] / n) ** 2;
  return { size: tv / n, consistency: nrm ? Math.sqrt(ms) / (nrm / n) : 0, toward: tow / n };
}
function pick(arr, k) {
  const a = arr.slice(),
    r = [];
  while (a.length && r.length < k) r.push(a.splice(Math.floor(Math.random() * a.length), 1)[0]);
  return r;
}
out.hearer = { hearersTested: living.length };
const candidates = [...new Set([...hitWords, ...rows.filter((r) => r.s.n >= 10).sort((a, b) => b.s.n - a.s.n).slice(0, 8).map((r) => r.word)])].slice(0, 10);
let lwOf = null,
  planted = null;
if (PLANT && candidates.length) {
  // a throwaway copy of the brains in which the most-used sound raises "stay put" and lowers "eat": a known effect
  planted = candidates[0];
  const u = byWord.get(planted)[0],
    f = T.hearWord(u.w, u.p, 0.7),
    mean = new Float32Array(12);
  const all = events.slice(0, 400);
  for (const e of all) {
    const g = T.hearWord(e.w, e.p, 0.7);
    for (let i = 0; i < 12; i++) mean[i] += g[i] / all.length;
  }
  const cache = new Map();
  lwOf = (a) => {
    if (!cache.has(a)) {
      const w = Float32Array.from(a.lw);
      for (let i = 0; i < 12; i++) {
        w[E.A_STAY * E.NI + E.SPEECH + i] += 4 * (f[i] - mean[i]);
        w[E.A_EAT * E.NI + E.SPEECH + i] -= 4 * (f[i] - mean[i]);
      }
      cache.set(a, w);
    }
    return cache.get(a);
  };
  out.hearer.plantedSound = planted;
}
if (living.length >= 5 && candidates.length && !NULLONLY) {
  const allEv = events.slice();
  const results = [];
  for (const w of candidates) {
    const mine = byWord.get(w) || [];
    if (mine.length < 3) continue;
    const others = allEv.filter((e) => e.word !== w);
    if (others.length < 50) continue;
    const eff = effect(pick(mine, 5), lwOf);
    const ctl = [];
    for (let i = 0; i < 200; i++) ctl.push(effect(pick(others, 5), lwOf));
    const rank = (key, f) => (ctl.filter((c) => f(c[key]) >= f(eff[key])).length + 1) / (ctl.length + 1);
    results.push({
      sound: w,
      said: mine.length,
      size: +eff.size.toFixed(4),
      sizeVsControls: +rank('size', (v) => v).toFixed(4),
      consistency: +eff.consistency.toFixed(3),
      consistencyVsControls: +rank('consistency', (v) => v).toFixed(4),
      toward: +eff.toward.toFixed(4),
      towardVsControls: +rank('toward', Math.abs).toFixed(4),
    });
  }
  const bonf = 0.05 / Math.max(1, results.length);
  for (const r of results) r.respondedTo = r.sizeVsControls <= bonf && r.consistencyVsControls <= bonf;
  out.hearer.sounds = results;
  out.hearer.respondedTo = results.filter((r) => r.respondedTo).map((r) => r.sound);
} else out.hearer.note = NULLONLY ? 'skipped (--null-only)' : 'too few living hominins or sounds to test';

// 3. exchange: a word, then another hominin's word within 3 steps and 5 squares
function pairs(ev) {
  const sorted = ev.slice().sort((a, b) => a.t - b.t);
  let n = 0;
  for (let i = 0; i < sorted.length; i++)
    for (let j = i + 1; j < sorted.length && sorted[j].t - sorted[i].t <= 3; j++)
      if (sorted[j].t > sorted[i].t && sorted[j].id !== sorted[i].id && Math.abs(sorted[j].x - sorted[i].x) <= 5 && Math.abs(sorted[j].y - sorted[i].y) <= 5) n++;
  return n;
}
{
  const obs = pairs(events),
    ids = [...new Set(events.map((e) => e.id))],
    nul = [];
  for (let rep = 0; rep < 200; rep++) {
    const off = new Map(ids.map((id) => [id, Math.floor(Math.random() * steps)]));
    nul.push(pairs(events.map((e) => Object.assign({}, e, { t: (e.t + off.get(e.id)) % steps }))));
  }
  const mean = nul.reduce((s, v) => s + v, 0) / nul.length;
  out.exchange = { callAndAnswerPairs: obs, expectedByChance: +mean.toFixed(1), timesMoreThanChance: mean ? +(obs / mean).toFixed(2) : null, p: (nul.filter((v) => v >= obs).length + 1) / (nul.length + 1) };
}

// 4. shared code: who used each sound that passed both tests
out.shared = (out.hearer.respondedTo || []).filter((w) => hitWords.includes(w)).map((w) => ({ sound: w, speakers: new Set((byWord.get(w) || []).map((e) => e.id)).size, generations: [...new Set((byWord.get(w) || []).map((e) => e.gen))].sort() }));
const spreading = rows.filter((r) => r.s.who && r.s.who.size >= 3 && r.s.n >= 10).length;

// verdict, in plain words
let verdict;
if (events.length < 25) verdict = 'No words were said (fewer than 25 utterances).';
else if (!hitWords.length) verdict = spreading ? 'Sounds are spreading (' + spreading + ' said by three or more hominins) but none has come to mean anything: no sound is tied to a situation beyond chance.' : 'Sounds are said, but none is shared or tied to any situation.';
else if (!out.shared.length) verdict = hitWords.length + ' sound(s) are tied to a situation beyond chance on the speaker side, but hearers do not respond to them beyond random sounds.';
else verdict = out.shared.length + ' sound(s) are tied to a situation AND hearers act on them: the beginnings of shared meaning.';
if (out.exchange.p <= 0.01 && out.exchange.timesMoreThanChance >= 1.5) verdict += ' Calls and answers pass back and forth more than chance (' + out.exchange.timesMoreThanChance + '×).';
else verdict += ' No call-and-answer exchange beyond chance.';
out.verdict = verdict;
console.log(JSON.stringify(out, null, 1));
console.log('\nVERDICT: ' + verdict);
