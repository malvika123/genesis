// Genesis — The neural network: brain regions, a brain that grows and prunes, inborn instincts,
// choosing an action, and learning (actor-critic with eligibility traces, a dopamine-like signal,
// mood chemicals that change how fast it learns, and replay in sleep).
// Copyright (c) 2026 Malvika Sen. MIT License.

// ---------- how a brain is laid out ----------
// One array of connection strengths per brain:
//   [ direct: senses → choices (NA × NI) ][ senses → thinking units (H × NI) ]
//   [ thinking units → choices (NA × H) ][ thinking units → its forecast of how things will go (H) ]
//   [ senses → voice (NV × NI) ][ thinking units → voice (NV × H) ]
// The voice is its own output, as speech is in a real brain, so a creature can walk (or run) and call
// out at the same time. The first two parts sit at the same place in every brain; the rest depend on
// how many thinking units (H) the kind can grow. H is worked out from the array's length.
const hOf = (w) => (w.length - OI - NV * NI) / (NI + NA + 1 + NV),
  O2of = (H) => OI + H * NI,
  OVof = (H) => OI + H * NI + NA * H,
  OVDof = (H) => OVof(H) + H,
  OVHof = (H) => OVof(H) + H + NV * NI;

// Brain regions. Real brains are not one uniform network: a fear centre (the amygdala) watches for
// danger and pain, a memory centre (the hippocampus) holds where things were and what just happened,
// areas for sound and words listen to voices, and the rest is general. A region's units are wired only
// to the senses that region deals with.
// The layout is inherited (g.lay): which region each thinking unit belongs to, and what each region
// listens to. Children get a mix of their parents' layouts, with mutations: a unit can move to another
// region (regions grow or shrink), a region can start or stop listening to a sense, and — rarely — a
// region is copied, and the copy is then free to drift and specialise, the way real brains gained new
// parts. So over many generations, evolution can reshape the brain, and even add parts nobody designed.
const REGION = ['general', 'fear', 'memory', 'sound and words'],
  FEAR_IN = new Uint8Array(NI),
  MEM_IN = new Uint8Array(NI),
  WORD_IN = new Uint8Array(NI),
  ALL_IN = new Uint8Array(NI).fill(1);
for (let s = 0; s < 8; s++) for (const c of [2, 3, 4, 5]) FEAR_IN[s * NCH + c] = 1; // danger and other creatures
for (const k of [3, 4, 5, 11, 26]) FEAR_IN[IB + k] = 1; // pain, injury, darkness, (always on), anger
for (const k of [9, 11, 12, 13, 14, 15]) MEM_IN[IB + k] = 1; // loneliness, memories of water and food
for (let j = 0; j < NM; j++) MEM_IN[IB + 27 + j] = 1; // what it was just thinking
for (let i = HEAR; i < FIREIN; i++) WORD_IN[i] = 1; // voices, and what words sound like
for (let i = ACALL; i < NI; i++) WORD_IN[i] = 1; // animals' calls, others pointing and looking
WORD_IN[IB + 11] = 1;
// the layout our ape-like ancestors start with: 1 unit in 8 fear, 1 in 8 memory, 1 in 16 sound and
// words, the rest general
function firstLayout(H) {
  const reg = new Uint8Array(H);
  for (let j = 0; j < H; j++) reg[j] = j % 8 === 0 ? 1 : j % 8 === 1 ? 2 : j % 16 === 2 ? 3 : 0;
  return { reg, kind: [0, 1, 2, 3], masks: [ALL_IN, FEAR_IN, MEM_IN, WORD_IN].map((m) => Uint8Array.from(m)) };
}
const DEFLAY = new Map();
const layOf = (g, H) => g.lay || DEFLAY.get(H) || (DEFLAY.set(H, firstLayout(H)), DEFLAY.get(H));
const wiredL = (lay, j, i) => lay.masks[lay.reg[j]][i] === 1;
// which region a unit is in, by kind (0 general, 1 fear, 2 memory, 3 sound and words)
const regionOf = (j, lay) => (lay ? lay.kind[lay.reg[j]] : j % 8 === 0 ? 1 : j % 8 === 1 ? 2 : j % 16 === 2 ? 3 : 0);
const wired = (j, i, lay) => (lay ? wiredL(lay, j, i) : wiredL(firstLayout(Math.max(64, j + 1)), j, i));
// a child's layout from its parents', with mutations
function childLayout(p, q, H) {
  const A = layOf(p, H),
    Bq = layOf(q, H),
    n = Math.max(A.masks.length, Bq.masks.length),
    masks = [],
    kind = [];
  for (let r = 0; r < n; r++) {
    const from = r < A.masks.length && (r >= Bq.masks.length || rnd() < 0.5) ? A : Bq;
    const m = Uint8Array.from(from.masks[r]);
    // a region (not the general one) may start or stop listening to a sense
    if (r > 0) for (let i = 0; i < NI; i++) if (rnd() < 0.0015) m[i] ^= 1;
    masks.push(m);
    kind.push(from.kind[r]);
  }
  const reg = new Uint8Array(H);
  for (let j = 0; j < H; j++) {
    reg[j] = rnd() < 0.5 ? A.reg[j] : Bq.reg[j];
    if (reg[j] >= n) reg[j] = 0;
    if (rnd() < 0.01) reg[j] = (rnd() * n) | 0; // a unit moves to another region
  }
  // rarely, a region is copied: half its units go to the copy, which can then drift on its own
  if (n < 8 && rnd() < 0.02) {
    const r = 1 + ((rnd() * (n - 1)) | 0);
    masks.push(Uint8Array.from(masks[r]));
    kind.push(kind[r]);
    let flip = false;
    for (let j = 0; j < H; j++) if (reg[j] === r && (flip = !flip)) reg[j] = n;
  }
  return { reg, kind, masks };
}

// ---------- a new brain (the inborn part, from the genes) ----------
function newW(sp, inst, H = SP[sp].hmax) {
  const w = new Float32Array(OI + H * NI + NA * H + H + NV * NI + NV * H),
    O2 = O2of(H),
    OV = OVof(H),
    OVD = OVDof(H),
    OVH = OVHof(H);
  for (let i = 0; i < OI; i++) w[i] = gauss() * 0.05;
  for (let j = 0; j < H; j++)
    for (let i = 0; i < NI; i++) w[OI + j * NI + i] = wiredL(layOf({}, H), j, i) ? gauss() * 0.35 : 0;
  for (let i = O2; i < OV; i++) w[i] = gauss() * 0.3;
  for (let i = OVD; i < OVH; i++) w[i] = gauss() * 0.05;
  for (let i = OVH; i < w.length; i++) w[i] = gauss() * 0.2;
  // most of the time, anyone is quiet
  w[OVD + IB + 11] += 4;
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
      if (sp === 1 || sp === 2) {
        D((s + 4) % 8, s * NCH + 15, 4);
        D(s, s * NCH + 15, -4);
      } else if (sp === 0) D(s, s * NCH + 15, -0.6);
    }
  }
  return w;
}

// ---------- thinking: from senses to a choice ----------
// nh: how many thinking units are grown and working (the rest are silent)
function forward(w, x, h, z, nh, rf = null, zv = null, rfv = null) {
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
  // the voice, chosen alongside what the body does
  if (zv) {
    const OVD = OVDof(H),
      OVH = OVHof(H);
    for (let v = 0; v < NV; v++) {
      let s = rfv ? rfv[v] : 0,
        o = OVD + v * NI;
      for (let i = 0; i < NI; i++) s += w[o + i] * x[i];
      o = OVH + v * H;
      for (let j = 0; j < nh; j++) s += w[o + j] * h[j];
      zv[v] = s;
    }
    // each group of the voice's choices (speak or not; each part of the mouth) is its own choice
    for (const [o, n] of VG) {
      let gm = -1e9,
        gt = 0;
      for (let v = o; v < o + n; v++) if (zv[v] > gm) gm = zv[v];
      for (let v = o; v < o + n; v++) gt += zv[v] = Math.exp(zv[v] - gm);
      for (let v = o; v < o + n; v++) zv[v] /= gt;
    }
  }
  return V;
}
const RFV = new Float32Array(NV), // inborn pushes on the voice: a baby's cry, a scream of pain
  tgv = new Float32Array(NV),
  RF = new Float32Array(NA),
  tg = new Float32Array(NA),
  tdp = new Float32Array(NH),
  tdv = new Float32Array(NH);

// ---------- learning ----------
// Eligibility traces: which connections were just used, so that what follows can be credited to them.
function trace(a, act, vc = null) {
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
  // the voice's own connections are credited for what it said
  const OVD = OVDof(H),
    OVH = OVHof(H),
    zv = a.zv;
  VG.forEach(([o0, n], gi) => {
    const c = vc ? vc[gi] : gi ? -1 : 0;
    for (let v = o0; v < o0 + n; v++) {
      const g = c < 0 ? 0 : (v - o0 === c ? 1 : 0) - zv[v];
      let o = OVD + v * NI;
      for (let i = 0; i < NI; i++) eP[o + i] = gl * eP[o + i] + g * x[i];
      o = OVH + v * H;
      for (let j = 0; j < nh; j++) eP[o + j] = gl * eP[o + j] + g * h[j];
    }
  });
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
  // A bigger brain changes more connections at once, so each one changes less: the brain as a whole
  // learns as steadily as a small one instead of overwriting what already works.
  const k = Math.min(1, a.S.nh / nh),
    up = (i, s = 1) => {
      const u = s * rate * (AP * d * eP[i] + AV * d * eV[i]);
      if (u) {
        w[i] = clamp(w[i] + u, -6, 6);
        ch += Math.abs(u);
      }
    };
  for (let i = 0; i < OI; i++) up(i);
  for (let j = 0; j < nh; j++) {
    const o = OI + j * NI;
    for (let i = 0; i < NI; i++) if (cm[j * NI + i]) up(o + i, k);
  }
  for (let q = 0; q < NA; q++) for (let j = 0; j < nh; j++) up(O2 + q * H + j, k);
  for (let j = 0; j < nh; j++) up(OV + j, k);
  const OVD = OVDof(H),
    OVH = OVHof(H);
  for (let i = OVD; i < OVH; i++) up(i);
  for (let v = 0; v < NV; v++) for (let j = 0; j < nh; j++) up(OVH + v * H + j, k);
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
// Sleep replays the day's striking moments, the most striking most often: the hippocampus replays
// rewarding experiences more than others (reward makes replay more likely: e.g. Ambrose et al. 2016),
// which is part of why one big success can be remembered after a single try.
function pickMemory(a) {
  let t = 0;
  for (const m of a.mem) t += 0.1 + Math.abs(m.r);
  let r = rnd() * t;
  for (const m of a.mem) if ((r -= 0.1 + Math.abs(m.r)) <= 0) return m;
  return a.mem[a.mem.length - 1];
}
function replay(a, rate) {
  const m = pickMemory(a),
    w = a.lw,
    x = m.x,
    H = a.h.length,
    O2 = O2of(H),
    OV = OVof(H),
    nh = a.nh,
    V = forward(w, x, RH, RZ, nh),
    d = clamp(m.r + GAM * m.vn - V, -2, 2),
    k = Math.min(1, a.S.nh / nh); // as in learnStep: a bigger brain changes each connection less
  for (let j = 0; j < nh; j++) {
    let s = 0;
    for (let k = 0; k < NA; k++) s += w[O2 + k * H + j] * ((k === m.act ? 1 : 0) - RZ[k]);
    const dd = 1 - RH[j] * RH[j],
      g = k * rate * d * (AP * s + AV * w[OV + j]) * dd,
      o = OI + j * NI;
    if (g)
      for (let i = 0; i < NI; i++) if (x[i] && a.cm[j * NI + i]) w[o + i] = clamp(w[o + i] + g * x[i], -6, 6);
    w[OV + j] = clamp(w[OV + j] + k * rate * AV * d * RH[j], -6, 6);
  }
  for (let q = 0; q < NA; q++) {
    const g = rate * AP * d * ((q === m.act ? 1 : 0) - RZ[q]);
    let o = O2 + q * H;
    for (let j = 0; j < nh; j++) w[o + j] = clamp(w[o + j] + k * g * RH[j], -6, 6);
    o = q * NI;
    for (let i = 0; i < NI; i++) if (x[i]) w[o + i] = clamp(w[o + i] + g * x[i], -6, 6);
  }
  a.learn += Math.abs(d) * rate;
  a.dream = m;
}
function imitate(a, act, rate, vc = null) {
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
  // copying how others use their voice: this is how a sound's use can pass from parent to child
  if (vc) imitateVoice(a, vc, rate);
  a.learn += rate;
}
// nudging the voice toward given choices (a heard word, or an elder's way of calling); act < 0: voice only
function imitateVoice(a, vc, rate) {
  const x = a.xi,
    h = a.h,
    w = a.lw,
    H = h.length;
  {
    const OVD = OVDof(H),
      OVH = OVHof(H);
    for (let v = 0; v < NV; v++) {
      let gi = 0;
      while (gi < VG.length - 1 && v >= VG[gi + 1][0]) gi++;
      const c = vc[gi];
      if (c < 0) continue;
      const g = rate * ((v - VG[gi][0] === c ? 1 : 0) - a.zv[v]);
      let o = OVD + v * NI;
      for (let i = 0; i < NI; i++) w[o + i] += g * x[i];
      o = OVH + v * H;
      for (let j = 0; j < a.nh; j++) w[o + j] += g * h[j];
    }
  }
  a.learn += rate;
}
// the voice's choices: whether to make a sound, and if it speaks, how the mouth moves for each part
function sampleV(zv) {
  const c = new Array(VG.length).fill(-1);
  VG.forEach(([o, n], gi) => {
    if (gi && gi !== GPT && c[0] !== 3) return; // the mouth only moves when speaking; the hand any time
    let r = rnd(),
      k = 0;
    for (; k < n - 1; k++) {
      r -= zv[o + k];
      if (r <= 0) break;
    }
    c[gi] = k;
  });
  return c;
}
function sample(z) {
  let r = rnd();
  for (let k = 0; k < NA; k++) {
    r -= z[k];
    if (r <= 0) return k;
  }
  return NA - 1;
}
