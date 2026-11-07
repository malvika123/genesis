// Genesis — The neural network: inborn instincts, choosing an action, and actor-critic learning with eligibility traces.
// Copyright (c) 2026 Malvika Sen. MIT License.

// ---------- brain ----------
function newW(sp, inst) {
  const w = new Float32Array(NW);
  for (let i = 0; i < O2; i++) w[i] = gauss() * 0.35;
  for (let i = O2; i < O3; i++) w[i] = gauss() * 0.3;
  for (let i = O3; i < OV; i++) w[i] = gauss() * 0.05;
  if (inst) {
    const D = (k, i, v) => (w[O3 + k * NI + i] += v),
      B = IB + 11;
    D(A_EAT, HB, 4);
    D(A_EAT, IB, 3);
    D(A_EAT, B, -2.5);
    D(A_DRINK, HB + 1, 3);
    D(A_DRINK, IB + 1, 4);
    D(A_DRINK, B, -3.5);
    D(A_SLEEP, IB + 2, 4);
    D(A_SLEEP, IB + 5, 0.5);
    D(A_SLEEP, B, -2.5);
    D(A_MATE, HB + 3, 4);
    D(A_MATE, B, -1.5);
    if (sp === 2 || sp === 3) D(A_ATK, HB + 2, sp === 2 ? 7 : 0);
    // rage is inborn in mammals: an angry animal is ready to strike
    if (sp === 0 || sp === 2) D(A_ATK, IB + 26, 2.5);
    if (sp === 0) {
      D(A_ATK, HB + 2, 2);
      D(A_ATK, IB, 1);
    }
    D(A_ATK, IB, 1.5);
    D(A_ATK, B, -1.5);
    D(A_STAY, B, -0.5);
    if (sp === 0) {
      // Hands. Human babies are born grasping whatever touches the palm, small children are drawn to
      // objects and bang whatever they hold, and everyone likes nuts. That is all that is inborn: what a
      // stone is good for has to be found out.
      D(A_TAKE, IB + 22, 1.6);
      D(A_TAKE, IB + 23, 1.6);
      for (let h = 19; h <= 21; h++) {
        D(A_TAKE, IB + h, -4);
        D(A_STRIKE, IB + h, 0.9);
      }
      for (let s = 0; s < 8; s++) {
        D(s, s * NCH + 13, 0.8);
        D(s, s * NCH + 14, 1);
      }
    }
    const f = SP[sp].fl;
    for (let s = 0; s < 8; s++) {
      if (f) {
        D((s + 4) % 8, s * NCH + 5, 3 * f);
        D(s, s * NCH + 5, -3 * f);
      }
      {
        const L = Math.hypot(MV[s][0], MV[s][1]);
        D(s, IB + 14, (2 * MV[s][0]) / L);
        D(s, IB + 15, (2 * MV[s][1]) / L);
      }
      D(s, s * NCH, sp === 3 ? 0 : 4);
      {
        const L = Math.hypot(MV[s][0], MV[s][1]);
        D(s, IB + 12, (2.5 * MV[s][0]) / L);
        D(s, IB + 13, (2.5 * MV[s][1]) / L);
      }
      D(s, s * NCH + 1, sp < 2 || sp === 3 ? 3.5 : 0);
      if (sp === 3) D(s, s * NCH + 8, 0.8);
      D(s, s * NCH + 2, -2);
      if (sp === 2) {
        D(s, s * NCH + 3, 6);
        D(s, s * NCH + 4, 4);
      }
      D(s, s * NCH + 6, 5);
      D(s, s * NCH + 7, 1.5);
    }
  }
  return w;
}
function forward(w, x, h, z, nh = NH, rf = null) {
  for (let j = 0; j < NH; j++) {
    if (j >= nh) {
      h[j] = 0;
      continue;
    }
    let s = 0;
    const o = j * NI;
    for (let i = 0; i < NI; i++) s += w[o + i] * x[i];
    h[j] = Math.tanh(s);
  }
  let mx = -1e9;
  for (let k = 0; k < NA; k++) {
    let s = 0,
      o = O2 + k * NH;
    for (let j = 0; j < NH; j++) s += w[o + j] * h[j];
    o = O3 + k * NI;
    for (let i = 0; i < NI; i++) s += w[o + i] * x[i];
    if (rf) s += rf[k];
    z[k] = s;
    if (s > mx) mx = s;
  }
  let sm = 0;
  for (let k = 0; k < NA; k++) {
    z[k] = Math.exp(z[k] - mx);
    sm += z[k];
  }
  for (let k = 0; k < NA; k++) z[k] /= sm;
  let V = 0;
  for (let j = 0; j < NH; j++) V += w[OV + j] * h[j];
  return V;
}
const RF = new Float32Array(NA),
  tg = new Float32Array(NA),
  tdp = new Float32Array(NH),
  tdv = new Float32Array(NH);
function trace(a, act) {
  const gl = GAM * LAM,
    h = a.h,
    x = a.xi,
    z = a.z,
    w = a.lw,
    eP = a.eP,
    eV = a.eV;
  for (let k = 0; k < NA; k++) tg[k] = (k === act ? 1 : 0) - z[k];
  for (let j = 0; j < NH; j++) {
    let s = 0;
    for (let k = 0; k < NA; k++) s += w[O2 + k * NH + j] * tg[k];
    const dd = 1 - h[j] * h[j];
    tdp[j] = s * dd;
    tdv[j] = w[OV + j] * dd;
  }
  for (let j = 0; j < NH; j++) {
    const o = j * NI,
      p = tdp[j],
      v = tdv[j];
    for (let i = 0; i < NI; i++) {
      eP[o + i] = gl * eP[o + i] + p * x[i];
      eV[o + i] = gl * eV[o + i] + v * x[i];
    }
  }
  for (let k = 0; k < NA; k++) {
    const g = tg[k];
    let o = O2 + k * NH;
    for (let j = 0; j < NH; j++) eP[o + j] = gl * eP[o + j] + g * h[j];
    o = O3 + k * NI;
    for (let i = 0; i < NI; i++) eP[o + i] = gl * eP[o + i] + g * x[i];
  }
  for (let j = 0; j < NH; j++) eV[OV + j] = gl * eV[OV + j] + h[j];
}
// Sleep replay. Like the hippocampus replaying the day's experiences during sleep, a creature keeps
// its most striking recent moments — a big relief or a sharp hurt — and goes over them again while
// asleep, learning from each one a second time: the choice it made, what followed, and how that
// compared with what it expected.
const MEMN = 24;
function remember(a, act, r, vn) {
  let why = 0;
  for (let k = 1; k < 9; k++) if (Math.abs(a.rk[k]) > Math.abs(a.rk[why])) why = k;
  const m = { x: Float32Array.from(a.xl), act, r, vn, why };
  if (a.mem.length < MEMN) a.mem.push(m);
  else {
    // forget the least striking moment, if this one matters more
    let lo = 0;
    for (let k = 1; k < a.mem.length; k++) if (Math.abs(a.mem[k].r) < Math.abs(a.mem[lo].r)) lo = k;
    if (Math.abs(r) > Math.abs(a.mem[lo].r)) a.mem[lo] = m;
  }
}
const RH = new Float32Array(NH),
  RZ = new Float32Array(NA);
function replay(a, rate) {
  const m = a.mem[(rnd() * a.mem.length) | 0],
    w = a.lw,
    x = m.x,
    V = forward(w, x, RH, RZ, a.S.nh),
    d = clamp(m.r + GAM * m.vn - V, -2, 2);
  for (let j = 0; j < NH; j++) {
    let s = 0;
    for (let k = 0; k < NA; k++) s += w[O2 + k * NH + j] * ((k === m.act ? 1 : 0) - RZ[k]);
    const dd = 1 - RH[j] * RH[j],
      g = rate * d * (AP * s + AV * w[OV + j]) * dd,
      o = j * NI;
    if (g) for (let i = 0; i < NI; i++) if (x[i]) w[o + i] = clamp(w[o + i] + g * x[i], -6, 6);
    w[OV + j] = clamp(w[OV + j] + rate * AV * d * RH[j], -6, 6);
  }
  for (let k = 0; k < NA; k++) {
    const g = rate * AP * d * ((k === m.act ? 1 : 0) - RZ[k]);
    let o = O2 + k * NH;
    for (let j = 0; j < NH; j++) w[o + j] = clamp(w[o + j] + g * RH[j], -6, 6);
    o = O3 + k * NI;
    for (let i = 0; i < NI; i++) if (x[i]) w[o + i] = clamp(w[o + i] + g * x[i], -6, 6);
  }
  a.learn += Math.abs(d) * rate;
  a.dream = m;
}
function imitate(a, act, rate) {
  const x = a.xi,
    h = a.h,
    z = a.z,
    w = a.lw;
  for (let k = 0; k < NA; k++) {
    const g = rate * ((k === act ? 1 : 0) - z[k]);
    if (!g) continue;
    let o = O2 + k * NH;
    for (let j = 0; j < NH; j++) w[o + j] += g * h[j];
    o = O3 + k * NI;
    for (let i = 0; i < NI; i++) w[o + i] += g * x[i];
  }
  a.learn += rate;
}
function sample(z) {
  let r = rnd();
  for (let k = 0; k < NA; k++) {
    r -= z[k];
    if (r <= 0) return k;
  }
  return NA - 1;
}
