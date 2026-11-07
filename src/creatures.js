// Genesis — Bodies and genes: creating creatures, personality, and how children inherit from their parents.
// Copyright (c) 2026 Malvika Sen. MIT License.

// ---------- creatures ----------
const gene = (sp, inst) => ({
  s: 0.8 + rnd() * 0.5,
  v: 4 + rnd() * 3,
  m: 0.8 + rnd() * 0.5,
  c: 0.2 + rnd() * 0.6,
  b: 0.6 + rnd() * 0.8,
  so: 0.5 + rnd(),
  bs: 0.75 + rnd() * 0.25, // how big a brain it can grow (inherited)
  lr: 0.8 + rnd() * 0.4, // how quickly it learns (inherited)
  im: 0.6 + rnd() * 0.8, // how strongly it copies others (inherited)
  w: newW(sp, inst),
});
function mk(sp, x, y, sex, g, gen, age, k = KDEF[sp]) {
  const a = {
    id: NID++,
    sp,
    k, // which kind of animal (see KINDS)
    S: KBIO[k], // its biology
    x,
    y,
    sex,
    age,
    g,
    gen,
    lw: Float32Array.from(g.w),
    eP: new Float32Array(g.w.length),
    eV: new Float32Array(g.w.length),
    xi: new Float32Array(NI),
    h: new Float32Array(hOf(g.w)),
    cm: null, // which senses → thinking-unit connections exist (regions, then pruning)
    nh: 0, // thinking units grown so far
    pruned: 0,
    stress: 0,
    da: 0, // the last dopamine-like signal: better (+) or worse (−) than expected
    mod: 1, // how strongly the mood chemicals are turning its learning up or down
    z: new Float32Array(NA),
    zv: new Float32Array(NV), // the voice's options this moment
    voice: 0, // 0 silent, 1 … 6 one of the six sounds
    e: 80,
    w: 85,
    hp: 100,
    painA: 0,
    painW: 0,
    sl: rnd() * 0.6,
    asleep: false,
    acc: 0,
    cd: 0,
    kcd: 0,
    fd: 0,
    rd: false,
    fear: 0,
    lo: 0,
    pr: 0,
    V: 0,
    Vp: 0,
    has: false,
    act: A_STAY,
    wasW: false,
    Dp: new Float32Array(9),
    bonus: new Float32Array(9),
    rk: new Float32Array(9),
    cz: new Float32Array(9),
    ev: new Array(9).fill(null),
    cold: 0,
    lg: {},
    les: [],
    mom: null,
    kid: null,
    dead: false,
    gone: false,
    found: false,
    learn: 0,
    lf: Math.max(KBIO[k].mat * 2, KBIO[k].life * clamp(0.72 + gauss() * 0.2, 0.45, 1)),
    vis: new Uint8Array((W >> 2) * (H >> 2)),
    mw: null,
    mf: null,
    mwT: 0,
    mfT: 0,
    vc: 0,
    th: 'Just born.',
    cause: '',
    name: sp === 0 ? nameIt() : '',
    bond: 0,
    metAny: false,
    cuX: 1,
    cuT: 0,
    mate: null,
    trap: 0,
    wh: null,
    hunch: null,
    whO: null,
    ts: [],
    lu: 0,
    shared: 0,
    hd: (rnd() * 8) | 0, // which way it faces (one of the eight directions)
    hm: new Float32Array(NM), // what it was just thinking: its brain's last state, fed back in
    xl: new Float32Array(NI), // what it sensed at its last choice
    mem: [], // striking moments, replayed in sleep
    dream: null,
    hand: 0,
    heat: 0,
    grief: 0, // after the death of its partner, child or mother
    rage: 0, // after being attacked
    bored: 0, // grows while nothing new happens
    play: 0, // what it is holding: 0 nothing, 1 stone, 2 stick, 3 sharp stone
    nuts: 0,
  };
  // its brain's wiring: region units only connect to their region's senses
  const units = a.h.length;
  a.cm = new Uint8Array(units * NI);
  for (let j = 0; j < units; j++) for (let i = 0; i < NI; i++) a.cm[j * NI + i] = wired(j, i) ? 1 : 0;
  a.nh = grownUnits(a);
  if (sp === 0) genRecord(a);
  a.p0 = PR.map((_, k) => probe(a.lw, k));
  return a;
}
function mut(v, lo, hi) {
  return clamp(rnd() < 0.2 ? v + (rnd() - 0.5) * 0.3 * v : v, lo, hi);
}
// A child gets a random mix of both parents' inborn wiring. Only habits a parent learned strongly (well-worn, repeated) can pass on, each with a 50% chance and only partly.
function child(p, q) {
  const w = new Float32Array(p.g.w.length);
  for (let i = 0; i < w.length; i++) {
    // only the inborn wiring is inherited — what a parent learned in its life is not (it can pass on
    // only by the child watching and copying)
    let v = rnd() < 0.5 ? p.g.w[i] : q.g.w[i];
    if (rnd() < 0.03) v += gauss() * 0.4;
    w[i] = clamp(v, -6, 6);
  }
  // region units stay wired only to their own senses
  const units = hOf(w);
  for (let j = 0; j < units; j++) for (let i = 0; i < NI; i++) if (!wired(j, i)) w[OI + j * NI + i] = 0;
  const pk = (k) => (rnd() < 0.5 ? p.g[k] : q.g[k]);
  return {
    s: mut(pk('s'), 0.4, 2),
    v: mut(pk('v'), 2, 10),
    m: mut(pk('m'), 0.4, 2),
    c: mut(pk('c'), 0.05, 1),
    b: mut(pk('b'), 0.3, 1.8),
    so: mut(pk('so'), 0.2, 2),
    bs: mut(pk('bs') ?? 0.9, 0.5, 1),
    lr: mut(pk('lr') ?? 1, 0.4, 2),
    im: mut(pk('im') ?? 1, 0.1, 3),
    w,
  };
}
// Where the first creatures are born. Fish anywhere in the water. People start together as a small
// band in one warm, low-lying region near fresh water, as early humans lived. Each kind of animal starts where it would live — bison on open grassland, deer at
// the woodland edge, big cats in warm lands, bears in cool forests — in herds, a pack, or pairs.
function spawn(sp, n, inst) {
  const kinds = KINDS.map((k, i) => i).filter((i) => KINDS[i].sp === sp);
  // share the starting number between the kinds, at least one pair of each when there are enough
  const counts = kinds.map((k) => Math.round(n * KINDS[k].share));
  if (n >= 2 * kinds.length) counts.forEach((c, j) => (counts[j] = Math.max(2, c)));
  // then trim from (or add to) the most numerous kind until the total is right
  let extra = counts.reduce((t, c) => t + c, 0) - n;
  while (extra > 0) {
    const j = counts.indexOf(Math.max(...counts));
    counts[j]--;
    extra--;
  }
  for (let j = 0; extra < 0; j = (j + 1) % counts.length) (counts[j]++, extra++);
  kinds.forEach((k, j) => spawnKind(sp, k, counts[j], inst));
}
function spawnKind(sp, k, n, inst) {
  const K = KINDS[k],
    land = (i) => !water[i] && !rock[i] && !pit[i] && alt[i] < 1.5;
  const freshNear = (x, y) => {
    for (let dy = -4; dy <= 4; dy++)
      for (let dx = -4; dx <= 4; dx++) {
        if (!inb(x, y + dy)) continue;
        const j = idx(x + dx, y + dy);
        if (water[j] && !salt[j]) return true;
      }
    return false;
  };
  const suits = (i, x, y, t) => {
    if (!land(i) || alt[i] > 0.8) return false;
    if (sp === 0) return Math.abs(lat(y)) <= 0.45 && (t > 3000 || freshNear(x, y));
    const h = K.hab;
    if (!h) return true;
    const T = meanTemp(i),
      loose = t > 2500 ? 6 : 0;
    return (
      T >= h.t[0] - loose &&
      T <= h.t[1] + loose &&
      tree[i] >= h.tree[0] - loose / 20 &&
      tree[i] <= h.tree[1] + loose / 20 &&
      (sp !== 1 || t > 3000 || freshNear(x, y))
    );
  };
  let cx = -1,
    cy = -1;
  const centre = () => {
    cx = cy = -1;
    for (let t = 0; t < 5000; t++) {
      const x = (rnd() * W) | 0,
        y = (rnd() * H) | 0;
      if (!suits(idx(x, y), x, y, t)) continue;
      cx = x;
      cy = y;
      break;
    }
  };
  // herds of about five, a single pack of wolves, pairs of solitary hunters, one group of people
  const group = sp === 1 ? 5 : sp === 2 ? (K.pack ? 99 : 2) : 99;
  if (sp !== 3) centre();
  for (let j = 0; j < n; j++) {
    if (sp !== 3 && j > 0 && j % group === 0) centre();
    let x,
      y,
      t = 0;
    do {
      x = (rnd() * W) | 0;
      y = (rnd() * H) | 0;
      if (cx >= 0 && t < 3000) {
        const r = sp === 0 ? 3 : sp === 1 ? 4 : K.pack ? 5 : 8; // people start together, as a band
        x = wx(cx + Math.round((rnd() * 2 - 1) * r));
        y = clamp(cy + Math.round((rnd() * 2 - 1) * r), 0, H - 1);
      }
      t++;
    } while (t < 6000 && (sp === 3 ? !water[idx(x, y)] : !land(idx(x, y))));
    // the first of every kind start as young adults: grown bodies, blank minds
    const c = mk(sp, x, y, j % 2, gene(sp, inst), 0, (KBIO[k].smat * (1 + rnd() * 0.3)) | 0, k);
    c.found = true;
    ag.push(c);
  }
}
