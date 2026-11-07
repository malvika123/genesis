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
    vis: new Uint8Array(160),
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
function spawn(sp, n, inst) {
  let px = -1,
    py = -1;
  for (let i = 0; i < n; i++) {
    let x,
      y,
      t = 0;
    do {
      x = (rnd() * W) | 0;
      y = (rnd() * H) | 0;
      if (sp === 2 && px >= 0 && t < 500) {
        x = wx(px + ((rnd() * 9) | 0) - 4);
        y = clamp(py + ((rnd() * 9) | 0) - 4, 0, H - 1);
      }
      t++;
    } while (
      sp === 3
        ? !water[idx(x, y)]
        : water[idx(x, y)] || rock[idx(x, y)] || (sp === 0 && t < 400 && Math.abs(lat(y)) > 0.5)
    );
    if (px < 0) {
      px = x;
      py = y;
    }
    const c = mk(sp, x, y, i % 2, gene(sp, inst), 0, (rnd() * SP[sp].mat * 0.1) | 0);
    c.found = true;
    ag.push(c);
  }
}
