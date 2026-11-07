// Genesis — The neural network: brain regions, a brain that grows and prunes, inborn instincts,
// choosing an action, and learning (actor-critic with eligibility traces, a dopamine-like signal,
// mood chemicals that change how fast it learns, and replay in sleep).
// Copyright (c) 2026 Malvika Sen. MIT License.

// ---------- how a brain is laid out ----------
// One array of connection strengths per brain:
//   [ direct: senses → choices (NA × NI) ][ senses → thinking units (H × NI) ]
//   [ thinking units → choices (NA × H) ][ thinking units → its forecast of how things will go (H) ]
// The first two parts sit at the same place in every brain, so only the last two depend on how many
// thinking units (H) the kind can grow. H is worked out from the array's length.
const hOf = (w) => (w.length - OI) / (NI + NA + 1),
  O2of = (H) => OI + H * NI,
  OVof = (H) => OI + H * NI + NA * H;

// Brain regions. Real brains are not one uniform network: a fear centre (the amygdala) watches for
// danger and pain, a memory centre (the hippocampus) holds where things were and what just happened,
// and the rest is general. Every eighth thinking unit is a fear unit, the next a memory unit, and the
// rest are general. A region unit is only wired to the senses that region deals with.
const REGION = ['fear', 'memory'];
const regionOf = (j) => (j % 8 === 0 ? 0 : j % 8 === 1 ? 1 : 2);
const FEAR_IN = new Uint8Array(NI),
  MEM_IN = new Uint8Array(NI);
for (let s = 0; s < 8; s++) for (const c of [2, 3, 4, 5]) FEAR_IN[s * NCH + c] = 1; // danger and other creatures
for (const k of [3, 4, 5, 11, 26]) FEAR_IN[IB + k] = 1; // pain, injury, darkness, (always on), anger
for (const k of [9, 11, 12, 13, 14, 15]) MEM_IN[IB + k] = 1; // loneliness, memories of water and food
for (let j = 0; j < NM; j++) MEM_IN[IB + 27 + j] = 1; // what it was just thinking
const wired = (j, i) => {
  const r = regionOf(j);
  return r === 2 || (r === 0 ? FEAR_IN[i] : MEM_IN[i]) === 1;
};

// ---------- a new brain (the inborn part, from the genes) ----------
function newW(sp, inst, H = SP[sp].hmax) {
  const w = new Float32Array(OI + H * NI + NA * H + H),
    O2 = O2of(H),
    OV = OVof(H);
  for (let i = 0; i < OI; i++) w[i] = gauss() * 0.05;
  for (let j = 0; j < H; j++)
    for (let i = 0; i < NI; i++) w[OI + j * NI + i] = wired(j, i) ? gauss() * 0.35 : 0;
  for (let i = O2; i < OV; i++) w[i] = gauss() * 0.3;
  if (inst) {
    const D = (k, i, v) => (w[k * NI + i] += v),
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

// ---------- thinking: from senses to a choice ----------
// nh: how many thinking units are grown and working (the rest are silent)
function forward(w, x, h, z, nh, rf = null) {
  const H = hOf(w),
    O2 = O2of(H),
    OV = OVof(H);
  if (nh === undefined || nh > H) nh = H;
  for (let j = 0; j < H; j++) {
    if (j >= nh) {
      h[j] = 0;
      continue;
    }
    let s = 0;
    const o = OI + j * NI;
    for (let i = 0; i < NI; i++) s += w[o + i] * x[i];
    h[j] = Math.tanh(s);
  }
  let mx = -1e9;
  for (let k = 0; k < NA; k++) {
    let s = 0,
      o = O2 + k * H;
    for (let j = 0; j < nh; j++) s += w[o + j] * h[j];
    o = k * NI;
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
  for (let j = 0; j < nh; j++) V += w[OV + j] * h[j];
  return V;
}
const RF = new Float32Array(NA),
  tg = new Float32Array(NA),
  tdp = new Float32Array(NH),
  tdv = new Float32Array(NH);

// ---------- learning ----------
// Eligibility traces: which connections were just used, so that what follows can be credited to them.
function trace(a, act) {
  const gl = GAM * LAM,
    h = a.h,
    x = a.xi,
    z = a.z,
    w = a.lw,
    eP = a.eP,
    eV = a.eV,
    H = h.length,
    O2 = O2of(H),
    OV = OVof(H),
    nh = a.nh;
  for (let k = 0; k < NA; k++) tg[k] = (k === act ? 1 : 0) - z[k];
  for (let j = 0; j < nh; j++) {
    let s = 0;
    for (let k = 0; k < NA; k++) s += w[O2 + k * H + j] * tg[k];
    const dd = 1 - h[j] * h[j];
    tdp[j] = s * dd;
    tdv[j] = w[OV + j] * dd;
  }
  for (let j = 0; j < nh; j++) {
    const o = OI + j * NI,
      p = tdp[j],
      v = tdv[j];
    for (let i = 0; i < NI; i++) {
      eP[o + i] = gl * eP[o + i] + p * x[i];
      eV[o + i] = gl * eV[o + i] + v * x[i];
    }
  }
  for (let k = 0; k < NA; k++) {
    const g = tg[k];
    let o = O2 + k * H;
    for (let j = 0; j < nh; j++) eP[o + j] = gl * eP[o + j] + g * h[j];
    o = k * NI;
    for (let i = 0; i < NI; i++) eP[o + i] = gl * eP[o + i] + g * x[i];
  }
  for (let j = 0; j < nh; j++) eV[OV + j] = gl * eV[OV + j] + h[j];
}
// fade the traces without adding to them (when the body overrode its choice)
function fadeTraces(a) {
  const gl = GAM * LAM,
    n = a.eP.length;
  for (let i = 0; i < n; i++) {
    a.eP[i] *= gl;
    a.eV[i] *= gl;
  }
}
// The dopamine-like signal d ("better or worse than expected") strengthens or weakens the connections
// that were just used. rate already includes how plastic the brain is and the mood chemicals.
function learnStep(a, d, rate) {
  const w = a.lw,
    eP = a.eP,
    eV = a.eV,
    H = a.h.length,
    nh = a.nh,
    O2 = O2of(H),
    OV = OVof(H),
    cm = a.cm;
  let ch = 0;
  const up = (i) => {
    const u = rate * (AP * d * eP[i] + AV * d * eV[i]);
    if (u) {
      w[i] = clamp(w[i] + u, -6, 6);
      ch += Math.abs(u);
    }
  };
  for (let i = 0; i < OI; i++) up(i);
  for (let j = 0; j < nh; j++) {
    const o = OI + j * NI;
    for (let i = 0; i < NI; i++) if (cm[j * NI + i]) up(o + i);
  }
  for (let k = 0; k < NA; k++) for (let j = 0; j < nh; j++) up(O2 + k * H + j);
  for (let j = 0; j < nh; j++) up(OV + j);
  a.learn += ch;
}

// ---------- a brain that grows, and prunes ----------
// Like a child's brain, it starts with fewer working thinking units and grows more until it is grown
// (how many it can grow is inherited). From then until it is fully adult, connections that are weak
// and that learning never used are pruned away for good — use it or lose it.
function grownUnits(a) {
  const H = a.h.length,
    max = Math.max(a.S.nh, Math.round(H * (a.g.bs ?? 1)));
  return Math.round(a.S.nh + (max - a.S.nh) * clamp(a.age / a.S.mat, 0, 1));
}
function prune(a) {
  const w = a.lw,
    g = a.g.w,
    cm = a.cm;
  let n = 0;
  for (let j = 0; j < a.nh; j++)
    for (let i = 0; i < NI; i++) {
      const c = j * NI + i,
        q = OI + c;
      if (cm[c] && Math.abs(w[q]) < 0.1 && Math.abs(w[q] - g[q]) < 0.02) {
        cm[c] = 0;
        w[q] = 0;
        n++;
      }
    }
  return n;
}
// how many connections are working in its brain now
function connections(a) {
  let c = OI + NA * a.nh + a.nh;
  for (let j = 0; j < a.nh; j++) for (let i = 0; i < NI; i++) c += a.cm[j * NI + i];
  return c;
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
    H = a.h.length,
    O2 = O2of(H),
    OV = OVof(H),
    nh = a.nh,
    V = forward(w, x, RH, RZ, nh),
    d = clamp(m.r + GAM * m.vn - V, -2, 2);
  for (let j = 0; j < nh; j++) {
    let s = 0;
    for (let k = 0; k < NA; k++) s += w[O2 + k * H + j] * ((k === m.act ? 1 : 0) - RZ[k]);
    const dd = 1 - RH[j] * RH[j],
      g = rate * d * (AP * s + AV * w[OV + j]) * dd,
      o = OI + j * NI;
    if (g)
      for (let i = 0; i < NI; i++) if (x[i] && a.cm[j * NI + i]) w[o + i] = clamp(w[o + i] + g * x[i], -6, 6);
    w[OV + j] = clamp(w[OV + j] + rate * AV * d * RH[j], -6, 6);
  }
  for (let k = 0; k < NA; k++) {
    const g = rate * AP * d * ((k === m.act ? 1 : 0) - RZ[k]);
    let o = O2 + k * H;
    for (let j = 0; j < nh; j++) w[o + j] = clamp(w[o + j] + g * RH[j], -6, 6);
    o = k * NI;
    for (let i = 0; i < NI; i++) if (x[i]) w[o + i] = clamp(w[o + i] + g * x[i], -6, 6);
  }
  a.learn += Math.abs(d) * rate;
  a.dream = m;
}
function imitate(a, act, rate) {
  const x = a.xi,
    h = a.h,
    z = a.z,
    w = a.lw,
    H = h.length,
    O2 = O2of(H);
  for (let k = 0; k < NA; k++) {
    const g = rate * ((k === act ? 1 : 0) - z[k]);
    if (!g) continue;
    let o = O2 + k * H;
    for (let j = 0; j < a.nh; j++) w[o + j] += g * h[j];
    o = k * NI;
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
