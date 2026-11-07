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
  w: newW(sp, inst),
});
function mk(sp, x, y, sex, g, gen, age) {
  const a = {
    id: NID++,
    sp,
    x,
    y,
    sex,
    age,
    g,
    gen,
    lw: Float32Array.from(g.w),
    eP: new Float32Array(NW),
    eV: new Float32Array(NW),
    xi: new Float32Array(NI),
    h: new Float32Array(NH),
    z: new Float32Array(NA),
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
    lf: Math.max(SP[sp].mat * 2, SP[sp].life * clamp(0.72 + gauss() * 0.2, 0.45, 1)),
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
  };
  a.p0 = PR.map((_, k) => probe(a.lw, k));
  return a;
}
function mut(v, lo, hi) {
  return clamp(rnd() < 0.2 ? v + (rnd() - 0.5) * 0.3 * v : v, lo, hi);
}
// A child gets a random mix of both parents' inborn wiring. Only habits a parent learned strongly (well-worn, repeated) can pass on, each with a 50% chance and only partly.
function child(p, q) {
  const w = new Float32Array(NW);
  for (let i = 0; i < NW; i++) {
    let v = rnd() < 0.5 ? p.g.w[i] : q.g.w[i];
    const P = rnd() < 0.5 ? p : q,
      d = P.lw[i] - P.g.w[i];
    if (Math.abs(d) > 0.04 && rnd() < 0.5) v += d * (0.2 + 0.4 * rnd());
    if (rnd() < 0.03) v += gauss() * 0.4;
    w[i] = clamp(v, -6, 6);
  }
  const pk = (k) => (rnd() < 0.5 ? p.g[k] : q.g[k]);
  return {
    s: mut(pk('s'), 0.4, 2),
    v: mut(pk('v'), 2, 10),
    m: mut(pk('m'), 0.4, 2),
    c: mut(pk('c'), 0.05, 1),
    b: mut(pk('b'), 0.3, 1.8),
    so: mut(pk('so'), 0.2, 2),
    w,
  };
}
// Where the first creatures are born. Fish anywhere in the water. People start together in one warm,
// low-lying region near fresh water (as early humans did) but not side by side, so they still have to
// find each other. Predators start as a small pack. Herbivores start in a few herds on grassy land
// that isn't too cold, so they can find mates in a big world.
function spawn(sp, n, inst) {
  const land = (i) => !water[i] && !rock[i] && !pit[i] && alt[i] < 1.5;
  const freshNear = (x, y) => {
    for (let dy = -4; dy <= 4; dy++)
      for (let dx = -4; dx <= 4; dx++) {
        if (!inb(x, y + dy)) continue;
        const j = idx(x + dx, y + dy);
        if (water[j] && !salt[j]) return true;
      }
    return false;
  };
  let cx = -1,
    cy = -1;
  const centre = () => {
    cx = cy = -1;
    for (let t = 0; t < 4000; t++) {
      const x = (rnd() * W) | 0,
        y = (rnd() * H) | 0,
        i = idx(x, y);
      if (!land(i) || alt[i] > 0.8) continue;
      if (sp === 0 && (Math.abs(lat(y)) > 0.45 || (t < 3000 && !freshNear(x, y)))) continue;
      if (
        sp === 1 &&
        (Math.abs(lat(y)) > 0.6 || ter[i] !== 0 || tree[i] > 0.25 || (t < 3000 && !freshNear(x, y)))
      )
        continue;
      cx = x;
      cy = y;
      break;
    }
  };
  if (sp !== 3) centre();
  for (let k = 0; k < n; k++) {
    if (sp === 1 && k > 0 && k % 5 === 0) centre(); // a new herd every five
    let x,
      y,
      t = 0;
    do {
      x = (rnd() * W) | 0;
      y = (rnd() * H) | 0;
      if (cx >= 0 && t < 3000) {
        const r = sp === 0 ? 14 : sp === 1 ? 4 : 5;
        x = wx(cx + Math.round((rnd() * 2 - 1) * r));
        y = clamp(cy + Math.round((rnd() * 2 - 1) * r), 0, H - 1);
      }
      t++;
    } while (t < 6000 && (sp === 3 ? !water[idx(x, y)] : !land(idx(x, y))));
    const c = mk(sp, x, y, k % 2, gene(sp, inst), 0, (rnd() * SP[sp].mat * 0.1) | 0);
    c.found = true;
    ag.push(c);
  }
}
