// Genesis — Reads a creature's mind straight from its neural network: options weighed, what pushed it, what held it back.
// Copyright (c) 2026 Malvika Sen. MIT License.

function pick(a, arr) {
  return arr[(a.id + ((tick / DAY) | 0)) % arr.length];
}
// ---------- mind readout ----------
// What you see when you click is read straight from the creature's neural network at this moment:
// the options its brain weighed (its own probabilities), which of its senses and feelings pushed it toward
// the choice it made and which held it back (each input's contribution to that choice, compared with the
// other options), and its own forecast of how things will go. Nothing here is a pre-written sentence.
const CHN = [
  'water',
  'food',
  'a rock, pit or deep water',
  'a herbivore',
  'a person',
  'a predator',
  'a possible mate',
  'family',
  'fish',
  'red berries',
  'the sea',
  'a steep climb',
  'trees',
  'a stone or stick on the ground',
  'nuts',
  'fire',
];
const BODY = { 0: 'food right here', 1: 'water within reach', 2: 'prey within reach', 3: 'a mate beside it' };
const INNER = {
  0: 'hunger',
  1: 'thirst',
  2: 'tiredness',
  3: 'pain',
  4: 'injury',
  5: 'darkness',
  6: 'being young',
  7: 'desire to mate',
  8: 'curiosity',
  9: 'loneliness or grief',
  10: 'being in deep water',
  12: 'memory of water',
  13: 'memory of water',
  14: 'memory of food',
  15: 'memory of food',
  16: 'red berries here',
  17: 'a hungry child nearby',
  18: 'cold',
  25: 'heat',
  26: 'anger',
  19: 'a stone in its hand',
  20: 'a stick in its hand',
  21: 'a sharp stone in its hand',
  22: 'a stone at its feet',
  23: 'a stick at its feet',
  24: 'a nut at its feet',
};
function actName(a, k) {
  if (k < 8) return 'go ' + CP[k];
  return [
    'stay put',
    'eat',
    'drink',
    'sleep',
    'mate',
    a.sp === 2 ? 'attack' : a.sp === 0 ? 'grab' : 'snap',
    'give food',
    'pick up',
    'put down',
    'strike',
    a.up ? 'climb down' : 'climb a tree',
  ][k - 8];
}
for (let j = 0; j < NM; j++) INNER[27 + j] = 'what it was just thinking';
INNER[FIREIN - IB] = 'the warmth of a fire';
for (let k = 0; k < 4 * NRAY; k++) INNER[RET - IB + k] = 'patches of light and colour';
INNER[FOODIN - IB] = 'the leaves of a root plant underfoot';
INNER[FOODIN + 1 - IB] = 'a dead body with meat on it';
for (let k = 0; k < NSAY; k++)
  for (let q = 0; q < 3; q++) INNER[HEAR - IB + 3 * k + q] = ['hearing a cry', 'hearing a scream', 'hearing someone speak'][k];
for (let k = 0; k < 12; k++) INNER[SPEECH - IB + k] = 'the sound of the word it heard';
for (let k = 0; k < 3; k++) INNER[SEEPT - IB + k] = 'someone close pointing';
for (let k = 3; k < 5; k++) INNER[SEEPT - IB + k] = 'where someone close is looking';
for (let k = 0; k < NAC; k++)
  for (let q = 0; q < 3; q++) INNER[ACALL - IB + 3 * k + q] = 'hearing a ' + ['howl', 'roar', 'snort of alarm'][k];
function featName(i) {
  if (i < NS) return CHN[i % NCH] + ' to the ' + CP[(i / NCH) | 0];
  if (i < IB) return BODY[i - HB];
  return INNER[i - IB] || null;
}
const CC = new Float32Array(NA * NI);
function mind(a, act, chosen, rf) {
  const H = a.h.length,
    O2 = O2of(H),
    w = a.lw,
    x = a.xi,
    h = a.h,
    z = a.z;
  for (let k = 0; k < NA; k++) {
    for (let i = 0; i < NI; i++) {
      if (!x[i]) {
        CC[k * NI + i] = 0;
        continue;
      }
      let g = w[k * NI + i];
      for (let j = 0; j < a.nh; j++) {
        const hj = h[j];
        if (!hj) continue;
        g += w[O2 + k * H + j] * (1 - hj * hj) * w[OI + j * NI + i];
      }
      CC[k * NI + i] = g * x[i];
    }
  }
  const contrib = {};
  for (let i = 0; i < NI; i++) {
    if (!x[i] || i === IB + 11) continue;
    let e = 0;
    for (let k = 0; k < NA; k++) e += z[k] * CC[k * NI + i];
    const c = CC[act * NI + i] - e,
      n = featName(i);
    if (!n) continue;
    contrib[n] = (contrib[n] || 0) + c;
  }
  let rfc = 0;
  if (rf) {
    let e = 0;
    for (let k = 0; k < NA; k++) e += z[k] * rf[k];
    rfc = rf[act] - e;
  }
  const L = Object.entries(contrib).sort((p, q) => q[1] - p[1]),
    pos = L.filter((q) => q[1] > 0.12).slice(0, 3),
    neg = L.filter((q) => q[1] < -0.25)
      .sort((p, q) => p[1] - q[1])
      .slice(0, 2);
  const opts = [...z]
    .map((p, k) => [k, p])
    .sort((p, q) => q[1] - p[1])
    .slice(0, 4);
  const lv = (v) => (v > 1.5 ? 'strongly' : v > 0.6 ? 'clearly' : 'a little');
  return {
    act,
    forced: act !== chosen,
    chosen,
    opts: opts.map(([k, p]) => [actName(a, k), p]),
    pos: pos.map(([n, v]) => [n, v, lv(v)]),
    neg: neg.map(([n, v]) => [n, -v, lv(-v)]),
    rfc,
    V: a.V,
    sure: z[chosen],
  };
}
function mindLine(a, m) {
  if (m.forced)
    return (
      actName(a, m.act) +
      (m.act === A_SLEEP ? ' (its body is keeping it asleep)' : ' (its body overrode its choice)')
    );
  const why = m.pos.map((q) => q[0]);
  if (m.rfc > 0.5)
    why.unshift(
      m.act === A_EAT ? 'the urge to eat' : m.act === A_DRINK ? 'the urge to drink' : 'the urge to strike'
    );
  return (
    actName(a, m.act) +
    ' ' +
    Math.round(m.sure * 100) +
    '%' +
    (why.length ? ' ← ' + why.slice(0, 2).join(', ') : '')
  );
}
