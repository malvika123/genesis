// Genesis — A human voice: a mouth that can make thousands of sounds, ears that hear the sound itself,
// and nothing that says what any of it means.
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// Every person has a simplified human vocal tract (after articulatory models of speech): for each
// syllable it chooses
//   · a closure to start with: none, the lips (b/p), the tongue tip (d/t) or the back of the tongue (g/k);
//   · voice on or off during that closure (b, d, g are voiced; p, t, k are not);
//   · how high the tongue is (high, mid or low: i/u … e/o … a) and how far forward (front, central, back);
//   · lips spread or rounded;
// and a word is one or two syllables. That is 144 syllables and over 20,000 two-syllable words, none of
// them with any meaning.
// The ear does not get a label. It gets what the sound is like (acoustic cues): whether there was a
// burst and how high it was (lips low, tongue-back middle, tongue-tip high), voicing, and the first two
// resonances of each vowel (F1 falls as the tongue rises; F2 rises as it moves forward, and rounded lips
// lower it), plus the speaker's pitch. Faint sounds are heard less clearly, so neighbouring vowels and
// consonants get confused, as they do for us.
// Inborn, as in every human baby: babbling (playing with the voice), and the drive to make one's own
// voice match what one hears (vocal imitation, which humans have and most primates lack). Everything
// else — which sounds a group settles on, what they come to mean — is theirs.

const ONS = 4, // none, lips, tip, back
  HT = 3, // high, mid, low
  BK = 3, // front, central, back
  NSYLL = 2, // syllables at most in a word
  // the voice's choices as groups, each picked from separately: [start, size]
  VMODE = 4, // silent, the cry, the scream, speaking
  VG = (() => {
    const g = [[0, VMODE]];
    let o = VMODE;
    for (let s = 0; s < NSYLL; s++) for (const n of [ONS, 2, HT, BK, 2]) g.push([o, n]), (o += n);
    g.push([o, NSYLL]); // how many syllables
    return g;
  })(),
  NVO = VG[VG.length - 1][0] + VG[VG.length - 1][1], // all the voice's outputs
  NACOU = 5 * NSYLL + 2; // what the ear gets from one word

// a word as its articulations: [[onset, voiced, height, back, round], …]
function wordOf(vc) {
  const w = [],
    n = vc[1 + 5 * NSYLL] + 1;
  for (let s = 0; s < n; s++) w.push(vc.slice(1 + 5 * s, 6 + 5 * s));
  return w;
}
const VOW = [
  ['i', 'ü', 'ɨ', 'ʉ', 'ɯ', 'u'],
  ['e', 'ö', 'ə', 'ɵ', 'ɤ', 'o'],
  ['æ', 'ɶ', 'a', 'ɐ', 'ɑ', 'ɒ'],
];
// how a word is written for us to read
function spell(w) {
  return w
    .map(([o, v, h, b, r]) => (o ? (v ? 'bdg' : 'ptk')[o - 1] : '') + VOW[h][b * 2 + r])
    .join('');
}
// the acoustic cues of a word, each 0 … 1
const F1 = [300, 500, 750],
  F2 = [2300, 1500, 900],
  BURST = [0, 0.2, 0.9, 0.55];
function acoustics(w, pitch) {
  const f = new Float32Array(NACOU);
  for (let s = 0; s < w.length; s++) {
    const [o, v, h, b, r] = w[s];
    f[s * 5] = o ? 1 : 0;
    f[s * 5 + 1] = BURST[o];
    f[s * 5 + 2] = v;
    f[s * 5 + 3] = (F1[h] - 250) / 550;
    f[s * 5 + 4] = (F2[b] - 250 * r - 650) / 1800;
  }
  f[5 * NSYLL] = w.length > 1 ? 1 : 0;
  f[5 * NSYLL + 1] = pitch;
  return f;
}
// hearing it: the cues, blurred more the fainter the sound
function hearWord(w, pitch, q) {
  const f = acoustics(w, pitch),
    s = 0.03 + 0.12 * (1 - q);
  for (let i = 0; i < f.length; i++) f[i] = clamp(f[i] + gauss() * s, 0, 1);
  return f;
}
// what a listener takes the word to be (the nearest sounds its own mouth can make) — for copying it
function heardAs(f) {
  const n = f[5 * NSYLL] > 0.5 ? 2 : 1,
    w = [];
  for (let s = 0; s < n; s++) {
    const p = f[s * 5] > 0.5,
      bf = f[s * 5 + 1];
    let o = 0;
    if (p) for (let k = 1; k < 4; k++) if (!o || Math.abs(BURST[k] - bf) < Math.abs(BURST[o] - bf)) o = k;
    const f1 = f[s * 5 + 3] * 550 + 250,
      f2 = f[s * 5 + 4] * 1800 + 650;
    let h = 0;
    for (let k = 1; k < HT; k++) if (Math.abs(F1[k] - f1) < Math.abs(F1[h] - f1)) h = k;
    let b = 0,
      r = 0,
      best = 1e9;
    for (let k = 0; k < BK; k++)
      for (let q = 0; q < 2; q++) {
        const e = Math.abs(F2[k] - 250 * q - f2);
        if (e < best) (best = e), (b = k), (r = q);
      }
    w.push([o, f[s * 5 + 2] > 0.5 ? 1 : 0, h, b, r]);
  }
  return w;
}
// the choices (per voice group) that would say a word: for copying a heard word
function choicesFor(w) {
  const c = new Array(VG.length).fill(-1);
  c[0] = 3;
  for (let s = 0; s < w.length; s++) for (let k = 0; k < 5; k++) c[1 + s * 5 + k] = w[s][k];
  c[1 + 5 * NSYLL] = w.length - 1;
  return c;
}
// a speaker's pitch, 0 … 1: children highest, then women, then men
const pitchOf = (a) => (a.age < a.S.mat ? 0.9 : a.sex ? 0.6 : 0.3);
