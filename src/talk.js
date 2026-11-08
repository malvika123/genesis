// Genesis — Voices: the sounds people can make, hearing them, and working out what the sounds have
// come to mean.
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// Nothing here gives a sound a meaning. Two sounds are inborn in every human: a baby's cry and a scream
// of pain. The other four mean nothing at first. If a meaning appears — say one sound comes to be used
// when a predator is near, and those who hear it learn to run — it emerged from their own learning and
// copying. The statistics below only watch when each sound is actually used, so that the page can say
// honestly what (if anything) each sound has come to mean.

const SAYN = ['waa', 'aah', 'ka', 'mo', 'ti', 'su'];
let CALLS = [], // the calls made this step: { x, y, k, a }
  HEARD = [], // the calls made last step, which are being heard now
  SNDSTAT = [], // for each sound: the situations it was used in, and how hearers responded
  BASE = null, // the same situations, sampled from people at any moment, to compare against
  GENSTAT = []; // per generation of people: inherited brain size, learning and copying, lessons learned
const HEARR = 2.2; // how far a call carries, in squares
const CTX = ['pred', 'food', 'kin', 'alone', 'hungry', 'hurt'];
function initTalk() {
  CALLS = [];
  HEARD = [];
  const blank = () => ({ n: 0, pred: 0, food: 0, kin: 0, alone: 0, hungry: 0, hurt: 0 });
  SNDSTAT = SAYN.map(() => Object.assign(blank(), { hear: 0, come: 0, flee: 0, answer: 0 }));
  BASE = blank();
  GENSTAT = [];
}
// At the start of each step, last step's calls are the ones heard now.
function passCalls() {
  HEARD = CALLS;
  CALLS = [];
}
// Hearing: the loudest of each sound within earshot, and which way it came from. Remembers the
// loudest sound of all, to see how the hearer responds to it.
function hear(a, x) {
  a.heardK = -1;
  let best = 0;
  for (const c of HEARD) {
    if (c.a === a) continue;
    const dx = dxw(c.x - a.x),
      dy = c.y - a.y,
      d = Math.hypot(dx, dy);
    if (d > HEARR) continue;
    const q = 1 - d / (HEARR + 1),
      o = HEAR + c.k * 3;
    if (q > x[o]) {
      x[o] = q;
      x[o + 1] = d ? dx / d : 0;
      x[o + 2] = d ? dy / d : 0;
    }
    if (q > best) {
      best = q;
      a.heardK = c.k;
      a.heardFrom = c.a;
    }
  }
}
// the situation a person is in right now, as far as its senses tell
function context(a) {
  const x = a.xi;
  let pred = 0,
    food = x[HB],
    kin = 0,
    others = 0;
  for (let s = 0; s < 8; s++) {
    pred = Math.max(pred, x[s * NCH + 5]);
    food = Math.max(food, x[s * NCH + 1]);
    kin = Math.max(kin, x[s * NCH + 7]);
    others = Math.max(others, x[s * NCH + 4]);
  }
  return {
    pred: pred > 0.1,
    food: food > 0.15,
    kin: kin > 0.1,
    alone: others < 0.05 && kin < 0.05,
    hungry: a.e < 40,
    hurt: a.painA > 0.3,
  };
}
function tally(S, c) {
  S.n++;
  for (const k of CTX) if (c[k]) S[k]++;
}
// per generation of people: the inborn brain they got, and what they went on to learn
function genRecord(a) {
  const G = GENSTAT[a.gen] || (GENSTAT[a.gen] = { n: 0, bs: 0, lr: 0, im: 0, pb: 0, cf: 0, lone: 0, c: 0, les: 0 });
  G.n++;
  G.bs += a.g.bs ?? 1;
  G.lr += a.g.lr ?? 1;
  G.im += a.g.im ?? 1;
  G.pb += a.g.pb ?? 0.5;
  G.cf += a.g.cf ?? 0.3;
  if ((a.g.im ?? 1) < 0.35) G.lone++; // hardly learns from others at all
  G.c += a.g.c;
}
// What each sound seems to mean so far, in plain words, or null if it is too early to say. A sound
// "means" something when it is used far more often in one situation than people are usually in it.
const CTXN = {
  pred: 'a predator is near',
  food: 'food is near',
  kin: 'family is near',
  alone: 'the caller is alone',
  hungry: 'the caller is hungry',
  hurt: 'the caller is hurt',
};
function meaning(k) {
  const S = SNDSTAT[k];
  if (!S || S.n < 25 || !BASE || BASE.n < 100) return null;
  let best = null,
    lift = 1.6;
  for (const c of CTX) {
    const p = S[c] / S.n,
      q = (BASE[c] + 1) / (BASE.n + 2);
    if (p > 0.25 && p / q > lift) {
      lift = p / q;
      best = { c, p, q };
    }
  }
  const resp =
    S.hear >= 20
      ? S.come / S.hear > 0.35
        ? 'those who hear it tend to come closer'
        : S.flee / S.hear > 0.35
          ? 'those who hear it tend to move away'
          : S.answer / S.hear > 0.25
            ? 'those who hear it tend to answer'
            : ''
      : '';
  return { best, resp, n: S.n };
}
