// Genesis — Voices: the sounds people can make, hearing them, and working out what the sounds have
// come to mean.
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// Nothing here gives a sound a meaning. Two sounds are inborn in every human: a baby's cry and a scream
// of pain. Everything else people say is made with their own mouths (voice.js) and means nothing at
// first. If a meaning appears — say one word comes to be used when a predator is near, and those who
// hear it learn to run — it emerged from their own learning and copying. The statistics below only
// watch when each word is actually used and how hearers respond, so that the page can say honestly
// what (if anything) a word has come to mean: the translator.

const SAYN = ['waa', 'aah']; // the two inborn calls; words are spelled from how they were said
let CALLS = [], // the calls made this step: { x, y, k, a }
  HEARD = [], // the calls made last step, which are being heard now
  SNDSTAT = [], // for the cry and the scream: the situations they were used in, and how hearers responded
  WSTAT = new Map(), // the same for every word ever said, by its spelling
  BASE = null, // the same situations, sampled from people at any moment, to compare against
  GENSTAT = []; // per generation of people: inherited brain size, learning and copying, lessons learned
// ---------- sound, by the physics of air ----------
// Every call has a loudness where it is made (dB at 1 m) and a pitch. On its way it fades:
//   · spreading out in all directions: 6 dB weaker each time the distance doubles;
//   · absorbed by the air, far more for high pitches than low ones, and more in dry air (at 20 °C, a
//     low 125 Hz roar loses about 0.5–0.8 dB per km, a 1 kHz voice 5–14 dB per km);
//   · muffled by leaves where the path runs through forest (a few dB per 100 m, at most ~200 m of it);
//   · carried by the wind: farther downwind, much less upwind (refraction);
//   · carried farther on still nights, when cool air near the ground bends sound back down, and less
//     far across hot ground by day, when it bends up and away.
// It is heard if it is still louder than the background (quiet wild country ~25 dB; rain much louder),
// helped by the hearer's own ears. Sound travels at about 343 m/s (331 + 0.6 × °C), so even 10 km takes
// under half a minute — far less than one 15-minute step: it is heard in the same step.
// Simplified: a square is 3 km across, so two creatures in the same square are taken to be ~0.5 km
// apart; footsteps and rustling are far too quiet to cross that.
const SND = {
  // people: a baby's cry, a scream, and speech at a calling voice
  voice: [
    { L: 95, f: 500 },
    { L: 105, f: 1000 },
    { L: 100, f: 1000 },
  ],
  // animals: wolf howl (heard 6–10 km), lion's roar (up to ~8 km), deer's alarm snort (a few hundred m)
  animal: [
    { L: 112, f: 300, n: 'howl' },
    { L: 106, f: 125, n: 'roar' },
    { L: 85, f: 1500, n: 'alarm snort' },
  ],
};
// absorption in air, dB per km, by pitch, between dry (10%) and moist (50%) air at 20 °C
function absorb(f, rh) {
  const F = [62.5, 125, 250, 500, 1000, 2000, 4000],
    D = [0.37, 0.775, 1.58, 4.25, 14.1, 45.3, 109],
    M = [0.123, 0.445, 1.32, 2.73, 4.66, 9.86, 29.4];
  let k = 0;
  while (k < F.length - 2 && f > F[k + 1]) k++;
  const u = clamp(Math.log(f / F[k]) / Math.log(F[k + 1] / F[k]), 0, 1),
    dry = D[k] + (D[k + 1] - D[k]) * u,
    moist = M[k] + (M[k + 1] - M[k]) * u,
    w = clamp((rh - 0.1) / 0.4, 0, 1);
  return dry + (moist - dry) * w;
}
const HEARBETTER = [0, 4, 5, 0]; // how much fainter a sound each role's ears can pick out than people's
// how loud (dB) a call made at (x, y) is when it reaches a listener at (lx, ly)
function received(c, lx, ly) {
  const dx = dxw(lx - c.x) * 3,
    dy = (ly - c.y) * 3, // km
    d = Math.max(0.5, Math.hypot(dx, dy)),
    i = idx(c.x, c.y),
    j = idx(lx, ly),
    T = cellTemp(i, isNightAt(c.x)),
    rh = typeof HUM !== 'undefined' && HUM ? clamp(HUM[i] / capacity(cellT(i)), 0.05, 1) : 0.5;
  let L = c.L - 20 * Math.log10(d * 1000) - absorb(c.f, rh) * d;
  // leaves in the way
  const leaf = (cover(i) + cover(j)) / 2;
  L -= leaf * Math.min(200, d * 1000) * (c.f < 400 ? 0.03 : 0.05);
  // wind: along the wind it carries, against it it fades
  if (d > 1) {
    const [wu, wv] = windAt(c.y),
      ws = Math.hypot(wu, wv) || 1,
      along = (dx * wu + dy * wv) / (d * ws); // +1 downwind, -1 upwind
    L += along > 0 ? 4 * along : 10 * along;
    // still nights carry sound; hot days bend it up and away
    if (isNightAt(c.x)) L += 5;
    else if (T > 25) L -= 5;
  }
  return L;
}
// background noise where the listener is: quiet wild country, louder in rain
const ambient = (j) => 25 + (RAIN[j] > 0.002 ? 15 : 0);
const CTX = ['pred', 'food', 'kin', 'alone', 'hungry', 'hurt'];
function initTalk() {
  CALLS = [];
  HEARD = [];
  const blank = () => ({ n: 0, pred: 0, food: 0, kin: 0, alone: 0, hungry: 0, hurt: 0 });
  SNDSTAT = SAYN.map(() => Object.assign(blank(), { hear: 0, come: 0, flee: 0, answer: 0 }));
  WSTAT = new Map();
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
  a.heardW = null;
  let best = 0;
  const j = idx(a.x, a.y),
    floor = ambient(j) - (HEARBETTER[a.sp] || 0);
  for (const c of HEARD) {
    if (c.a === a) continue;
    if (Math.abs(dxw(c.x - a.x)) > 5 || Math.abs(c.y - a.y) > 5) continue; // nothing carries 15 km
    const dx = dxw(c.x - a.x),
      dy = c.y - a.y,
      d = Math.hypot(dx, dy),
      L = SOC.sound ? received(c, a.x, a.y) : 0;
    if (SOC.sound ? L <= floor : d > 2.2) continue;
    const q = SOC.sound ? clamp((L - floor) / 30, 0.05, 1) : 1 - d / 3.2,
      o = c.an !== undefined ? ACALL + c.an * 3 : HEAR + c.k * 3;
    if (q > x[o]) {
      x[o] = q;
      x[o + 1] = d ? dx / d : 0;
      x[o + 2] = d ? dy / d : 0;
      // a word: what it sounded like, as clearly as it could be heard
      if (c.k === 2 && a.sp === 0) {
        const f = hearWord(c.w, c.p, q);
        for (let i = 0; i < f.length; i++) x[SPEECH + i] = f[i];
        a.heardW = heardAs(f); // what the listener took it to be
        a.heardWord = c.word; // what was really said (for the statistics)
      }
    }
    if (c.an !== undefined) continue; // animals' calls: heard, but not counted as speech
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
  const G = GENSTAT[a.gen] || (GENSTAT[a.gen] = { n: 0, bs: 0, lr: 0, im: 0, pb: 0, cf: 0, lone: 0, vl: 0, pg: 0, sh: 0, reg: [0, 0, 0, 0], nreg: 0, c: 0, les: 0 });
  G.n++;
  G.bs += a.g.bs ?? 1;
  G.lr += a.g.lr ?? 1;
  G.im += a.g.im ?? 1;
  G.pb += a.g.pb ?? 0.5;
  G.cf += a.g.cf ?? 0.3;
  G.vl += a.g.vl ?? 1;
  // the brain's layout it was born with: the share of its thinking units in each kind of region
  const L = layOf(a.g, a.h.length),
    H = a.h.length;
  for (let j = 0; j < H; j++) G.reg[L.kind[L.reg[j]]] += 1 / H;
  G.nreg += L.masks.length;
  G.pg += a.g.pg ?? 1;
  G.sh += a.g.sh ?? 1;
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
  const S = typeof k === 'string' ? WSTAT.get(k) : SNDSTAT[k];
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
