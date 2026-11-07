// Genesis — Notices when a creature has really learned something, says what taught it, and names people.
// Copyright (c) 2026 Malvika Sen. MIT License.

// ---------- lessons ----------
const PR = [
  {
    sp: [0, 1],
    pos: 'avoid eating red berries',
    neg: 'eat red berries',
    set: (x) => {
      x[IB] = 0.6;
      x[HB] = 1;
      x[IB + 16] = 1;
    },
    act: [A_EAT],
    inv: true,
    why: [0],
  },
  {
    sp: [0, 1, 2],
    pos: 'keep clear of pits and deep water',
    neg: 'walk into danger',
    set: (x) => {
      x[2] = 0.8;
    },
    act: [7, 0, 1],
    inv: true,
    why: [0, 1],
  },
  {
    sp: [0],
    pos: 'share food with a hungry child',
    neg: 'keep food from children',
    set: (x) => {
      x[IB + 17] = 1;
      x[7] = 1;
    },
    act: [A_GIVE],
    why: [7],
  },
  {
    sp: [0, 1],
    pos: 'keep away from predators',
    neg: 'walk toward predators',
    set: (x) => {
      x[IB] = 0.3;
      x[IB + 1] = 0.3;
      x[5] = 0.8;
    },
    act: [3, 4, 5],
    why: [0],
  },
  {
    sp: [0, 1, 2],
    pos: 'head toward water when thirsty',
    neg: 'wander away from water when thirsty',
    set: (x) => {
      x[IB + 1] = 0.8;
      x[0] = 0.6;
    },
    act: [7, 0, 1],
    why: [3, 1],
  },
  {
    sp: [0, 1, 2],
    pos: 'drink at the water\u2019s edge',
    neg: 'skip drinking at the water',
    set: (x) => {
      x[IB + 1] = 0.8;
      x[HB + 1] = 1;
    },
    act: [A_DRINK],
    why: [3],
  },
  {
    sp: [0, 1, 3],
    pos: 'eat when hungry',
    neg: 'ignore food when hungry',
    set: (x) => {
      x[IB] = 0.7;
      x[HB] = 1;
    },
    act: [A_EAT],
    why: [2],
  },
  {
    th: 0.25,
    pos: 'sleep when tired',
    neg: 'fight off sleep',
    set: (x) => {
      x[IB + 2] = 0.9;
    },
    act: [A_SLEEP],
    why: [4],
  },
  {
    pos: 'approach a ready mate',
    neg: 'avoid mates',
    set: (x) => {
      x[IB + 7] = 1;
      x[6] = 0.7;
    },
    act: [7, 0, 1],
    why: [5, 7],
  },
  {
    sp: [0, 1, 2],
    pos: 'stay out of deep water',
    neg: 'wade into deep water',
    set: (x) => {
      x[0] = 0.9;
      x[IB + 1] = 0.1;
    },
    act: [7, 0, 1],
    inv: true,
    why: [1],
  },
  {
    sp: [0, 2],
    pos: 'go for prey when hungry',
    neg: 'hesitate to go for prey',
    set: (x) => {
      x[IB] = 0.7;
      x[HB + 2] = 1;
    },
    act: [A_ATK],
    why: [2],
  },
  {
    sp: [0],
    pos: 'crack nuts open with a stone',
    neg: 'give up on cracking nuts',
    set: (x) => {
      x[IB] = 0.6;
      x[IB + 19] = 1;
      x[IB + 24] = 1;
    },
    act: [A_STRIKE],
    why: [2],
  },
];
const WHY = [
  'pain',
  'nearly drowning',
  'the relief of eating',
  'the relief of drinking',
  'the relief of sleep',
  'the pleasure of mating',
  'the thrill of finding new places',
  'the comfort of company',
  'the relief of getting warm or cooling down',
];
const px = new Float32Array(NI),
  ph = new Float32Array(NH),
  pz = new Float32Array(NA);
function probe(w, k) {
  px.fill(0);
  px[IB + 11] = 1;
  PR[k].set(px);
  forward(w, px, ph, pz, hOf(w));
  let s = 0;
  for (const q of PR[k].act) s += pz[q];
  return s;
}
function lessons(a) {
  let done = false;
  PR.forEach((P, k) => {
    if (done || (P.sp && !P.sp.includes(a.sp))) return;
    const v = probe(a.lw, k) - a.p0[k],
      d = P.inv ? -v : v;
    if (d < (P.th || 0.08)) return;
    const key = k * 2 + (d > 0 ? 1 : 0);
    if (a.lg[key]) return;
    let m = P.why[0];
    for (const q of P.why) if (a.cz[q] > a.cz[m]) m = q;
    if (!a.ev[m] || a.cz[m] < 0.02) return;
    a.lg[key] = 1;
    done = true;
    const lab = d > 0 ? P.pos : P.neg;
    a.les.push(lab);
    nLessons++;
    const L = LG[a.sp];
    if (a.sp !== 0) {
      if (tick - (L[key] ?? -1e9) < DAY) return;
      L[key] = tick;
    }
    log(who(a) + ' learned to ' + lab + '. What taught it: ' + a.ev[m] + ', and ' + WHY[m] + '.');
  });
}
const SYL = [
  'a',
  'ka',
  'ma',
  'ri',
  'to',
  'na',
  'e',
  'lu',
  'so',
  'vi',
  'da',
  'mi',
  'o',
  'ra',
  'te',
  'ni',
  'sa',
  'ko',
];
function nameIt() {
  let n = '';
  const k = 2 + (rnd() < 0.4);
  for (let i = 0; i < k; i++) n += SYL[(rnd() * SYL.length) | 0];
  return n[0].toUpperCase() + n.slice(1);
}
function who(a) {
  return a.sp === 0 ? a.name : 'A ' + a.S.n.toLowerCase();
}
