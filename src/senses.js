// Genesis — What each creature perceives: eight directions of sight, its own body, and its memories of water and food.
// Copyright (c) 2026 Malvika Sen. MIT License.

// ---------- senses ----------
const kinYoung = (a, o) =>
  o !== a &&
  !o.dead &&
  o.sp === a.sp &&
  o.age < o.S.mat &&
  (o.mom === a || a.kid === o || (o.mom && o.mom.mate === a) || (o.mom && o.mom.mom === a)); // a grandmother too
// How far a's care reaches a young one o (cooperative breeding: among foragers many hands feed a child,
// family most — Hrdy 2009, Kramer 2010, Hawkes et al. 1998): its own young and grandchildren fully, its
// younger brothers and sisters and its nephews and nieces less, and any other child of the band only as far
// as its inherited care for others' young (g.al) carries it.
const careFor = (a, o) => {
  if (o === a || o.dead || o.gone || o.sp !== a.sp || o.age >= o.S.mat) return 0;
  if (kinYoung(a, o)) return 1;
  if (!SOC.care) return 0; // switched off for experiments: only its own young and grandchildren, as before
  if (a.mom && o.mom === a.mom) return 0.6; // brother or sister
  if (a.mom && o.mom && o.mom.mom === a.mom) return 0.5; // nephew or niece
  return 0.35 * (a.g.al ?? 0.5);
};
const edible = (a, o) =>
  o !== a &&
  !o.dead &&
  !(SOC.shield && o.found && o.age < o.S.mat) && // (an old rule, off unless switched on for comparison: founders' young could not be taken)
  (a.sp === 2
    ? o.sp !== 2 || (o.k === a.k && a.e < 15 && o !== a.mom && o !== a.kid && o.mom !== a)
    : a.sp === 0 && (o.sp === 3 || o.sp === 1));
// For each place a creature might look at, the cells a line of sight passes through on the way.
const OFFL = OFF.map(([dx, dy, d]) => {
  const n = Math.ceil(d * 2),
    out = [],
    key = new Set();
  for (let j = 1; j < n; j++) {
    const t = j / n,
      px = Math.round(dx * t),
      py = Math.round(dy * t);
    if ((!px && !py) || (px === dx && py === dy) || key.has(px + ',' + py)) continue;
    key.add(px + ',' + py);
    out.push([px, py, t]);
  }
  return out;
});
const VIEW = new Uint8Array(8);
// Can it see that place? Not if a hill rises above the line from its eyes to it, or if enough thick
// forest stands in between.
function inSight(a, k, h0) {
  const P = OFFL[k],
    [dx, dy] = OFF[k];
  if (!P.length) return true;
  const ht = Math.max(0, alt[idx(a.x + dx, clamp(a.y + dy, 0, H - 1))]);
  let cov = 0;
  for (const [px, py, t] of P) {
    const Y = a.y + py;
    if (!inb(a.x + px, Y)) return false;
    const i = idx(a.x + px, Y);
    if (Math.max(0, alt[i]) > h0 + (ht - h0) * t + 0.08) return false;
    cov += cover(i);
    if (cov > 1.4) return false;
  }
  return true;
}
// ---------- learned perception (people) ----------
// Recognising what something is, is learned. The world works out what is truly in sight; a person's
// perception then gets it right only as well as it has learned to recognise that kind of thing. With
// little skill, faint and distant things are missed, distances are rough guesses, and look-alikes are
// mixed up at a distance — a deer for a wolf, a person for a hunter, the sea for a lake, red berries for
// good food. Skill grows with seeing things up close, and fastest when something important happens.
// Babies' vision is blurry for months; a few things get a head start, as studies of infants show:
// faces, and snake- and spider-like shapes (here, hunters).
const CONFUSE = { 3: 5, 5: 3, 4: 5, 0: 10, 10: 0, 1: 9, 9: 1 };
const LEARNED = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15]; // trees, slopes and rocks are easy to see
function newPerception(a) {
  const p = new Float32Array(NCH).fill(1);
  if (a.found) {
    // the first people start grown, with grown-up perception (a simplification: nobody is really
    // an adult who has never seen anything)
    for (const c of LEARNED) p[c] = 0.9;
  } else {
    for (const c of LEARNED) p[c] = 0.15;
    p[4] = 0.5; // faces
    p[7] = 0.35; // the mother, known early by sight, sound and smell
    p[5] = 0.35; // a prepared alertness to predators
  }
  return p;
}
function perceive(a, x) {
  const per = a.per,
    // infant eyes and visual brain mature over the first months
    cap = clamp(0.3 + (0.7 * a.age) / (0.5 * TY), 0, 1);
  for (let s = 0; s < 8; s++) {
    const b = s * NCH;
    for (const c of LEARNED) {
      let v = x[b + c];
      if (!v) continue;
      const k = Math.min(per[c], cap);
      // close and clear: a chance to learn what it looks like
      if (v > 0.5) per[c] += 0.003 * (1 - per[c]);
      if (k > 0.95) continue;
      // faint or far, and not well known: missed
      if (v < (1 - k) * 0.5 && rnd() < 1 - k) {
        x[b + c] = 0;
        continue;
      }
      // distance is a rough guess
      v = clamp(v * (1 + gauss() * 0.5 * (1 - k)), 0, 1);
      // mistaken for a look-alike
      const o = CONFUSE[c];
      if (o !== undefined && rnd() < (1 - k) * 0.35 * (1 - v)) {
        x[b + c] = 0;
        if (v > x[b + o]) x[b + o] = v;
      } else x[b + c] = v;
    }
  }
}
// ---------- raw vision (an experiment, chosen when making a new world) ----------
// No labels at all: the eyes report only light. Rays fan across the field of view; each reports the
// colour and nearness of the first thing it meets — another creature, fire, a tree, a hill, water —
// or the ground. A lake and the sea are the same blue; a wolf is a grey shape. Whatever is within
// touching distance is still felt, smelled and heard. Everything else, the brain must learn to see.
const LOOKRGB = {
  Person: [0.9, 0.72, 0.6],
  Deer: [0.63, 0.44, 0.25],
  Rabbit: [0.6, 0.54, 0.47],
  Bison: [0.29, 0.2, 0.13],
  Wolf: [0.53, 0.55, 0.57],
  'Big cat': [0.79, 0.59, 0.23],
  Bear: [0.36, 0.23, 0.15],
  Antelope: [0.7, 0.47, 0.25],
  Hare: [0.62, 0.55, 0.45],
  Buffalo: [0.18, 0.16, 0.15],
  Hyena: [0.62, 0.54, 0.38],
  Leopard: [0.83, 0.65, 0.29],
  'Sabre-tooth': [0.69, 0.54, 0.32],
};
function retina(a, x, r, night) {
  // no labelled view at all: only what is within reach (food underfoot, water to drink, someone
  // beside it) is still known, by touch, taste and smell
  x.fill(0, 0, NS);
  if (a.asleep) return;
  const look = a.act === A_STAY,
    span = ((look ? 360 : a.S.fov) * Math.PI) / 180,
    base = Math.atan2(MV[a.hd][1], MV[a.hd][0]),
    h0 = Math.max(0, alt[idx(a.x, a.y)]),
    dim = night ? 0.25 : 1;
  for (let k = 0; k < NRAY; k++) {
    const ang = base + (k / (NRAY - 1) - 0.5) * span * (look ? (NRAY - 1) / NRAY : 1),
      ux = Math.cos(ang),
      uy = Math.sin(ang);
    let rgb = null,
      near = 0;
    for (let t = 1; t <= r && !rgb; t += 0.7) {
      const X = Math.round(a.x + ux * t),
        Y = Math.round(a.y + uy * t);
      if (!inb(X, Y)) break;
      const i = idx(X, Y),
        cl = 1 - t / (r + 1),
        l = G[i];
      let o = null;
      if (l) for (const q of l) if (q !== a && !q.dead && q.sp !== 3) o = q;
      if (o) rgb = LOOKRGB[o.S.n] || LOOKRGB[o.S.look] || [0.5, 0.5, 0.5];
      else if (FIRE[i] > 0.03) rgb = [1, 0.55, 0.1];
      else if (tree[i] > 0.5) rgb = [0.2, 0.4, 0.2];
      else if (Math.max(0, alt[i]) > h0 + 0.3 * t) rgb = [0.5, 0.48, 0.45];
      else if (water[i] && !river[i]) rgb = iced(i) ? [0.85, 0.9, 0.95] : [0.25, 0.45, 0.75];
      else if (poison[i] && food[i] > 0.05 && a.S.col >= 3) rgb = [0.75, 0.15, 0.2];
      if (rgb) near = cl;
    }
    if (!rgb) {
      // nothing stands out: the ground, a little way off
      const i = idx(Math.round(a.x + ux * 2), clamp(Math.round(a.y + uy * 2), 0, H - 1));
      rgb = ter[i] === 1 ? [0.9, 0.85, 0.6] : food[i] > 0.2 ? [0.4, 0.6, 0.3] : [0.55, 0.5, 0.4];
    }
    const lit = rgb[0] === 1 && rgb[2] === 0.1 ? 1 : dim, // fire is bright even at night
      o = RET + 4 * k;
    x[o] = rgb[0] * lit;
    x[o + 1] = rgb[1] * lit;
    x[o + 2] = rgb[2] * lit;
    x[o + 3] = near;
  }
}
// something important teaches recognition fast: what bit you, what made you sick, what burned you
function learnSight(a, c, amount = 0.1) {
  if (a.per) a.per[c] = Math.min(1, a.per[c] + amount * (1 - a.per[c]));
}
// Grass is not food for people or hominins (their guts get almost nothing from it: sim.js), so they do not see a
// meadow as food. Until 11 Nov 2026 their eyes counted grass as half as good as fruit — a leftover from before they
// stopped eating it, which drew hungry ones out onto grassland; SOC.grassEye brings it back for comparison.
let GRASSEYE = 0;
function sense(a, x, night) {
  GRASSEYE = SOC.grassEye ? 0.5 : 0;
  x.fill(0);
  const tw = 1 - a.w / 100,
    te = 1 - a.e / 100;
  const S = a.S,
    here0 = idx(a.x, a.y),
    // in thick forest you can't see far, and at night only as far as the eyes allow
    lit = night && (a.hand === 4 || fireNear(a.x, a.y) > 0.05), // firelight lets it see at night
    r = Math.max(1.5, a.g.v * (night ? (lit ? Math.max(S.nv, 0.8) : S.nv) : 1) * (1 - 0.35 * cover(here0))),
    // Eyes see only in front, over each kind's real field of view: about 200° for people, most of
    // the way round for deer, bison and rabbits, whose eyes are on the sides of the head. Having just
    // stood still, a creature has looked all around. Asleep, its eyes are shut. Fish see all round.
    look = a.sp === 3 || a.act === A_STAY,
    eyes = !a.asleep,
    h0 = Math.max(0, alt[here0]);
  for (let s = 0; s < 8; s++) {
    const t = Math.abs(s - a.hd),
      diff = Math.min(t, 8 - t) * 45;
    VIEW[s] = look || diff <= S.fov / 2 + 22.5 ? 1 : 0;
  }
  if (a === sel) a.view = [];
  for (let k = 0; k < OFF.length; k++) {
    const [dx, dy, d, s] = OFF[k];
    if (d > r) break;
    const X = a.x + dx,
      Y = a.y + dy;
    if (!inb(X, Y)) continue;
    // seen: in the field of view, with nothing in the way (hills, thick trees). Near: close enough to
    // hear or smell, even behind it or in the dark.
    const seen = eyes && VIEW[s] && (a.sp === 3 || inSight(a, k, h0)),
      near = d <= 2;
    if (!seen && !near) continue;
    const i = idx(X, Y),
      cl = 1 - d / (r + 1),
      b = s * NCH;
    if (seen && a === sel) a.view.push(i);
    if (!seen) {
    } else if (a.sp === 3) {
      if (water[i]) {
        const f = food[i] * cl * (0.15 + te);
        if (f > x[b + 1]) x[b + 1] = f;
        if (x[b] < cl) x[b] = cl;
      } else if (x[b + 2] < cl) x[b + 2] = cl;
    } else if (water[i]) {
      // frozen water is just ground to walk on: no drinking, no drowning
      if (iced(i)) {
      } else if (salt[i]) {
        // the sea looks like water but isn't drinkable; far out it is deep
        if (x[b + 10] < cl) x[b + 10] = cl;
        if (deep[i] && x[b + 2] < cl) x[b + 2] = cl;
      } else if (deep[i]) {
        if (x[b + 2] < cl) x[b + 2] = cl;
      } else {
        const q = cl * (0.15 + tw);
        if (x[b] < q) x[b] = q;
      }
    } else {
      if (PUD[i] && a.sp !== 3) {
        const q = cl * (0.15 + tw);
        if (x[b] < q) x[b] = q;
      }
      if ((rock[i] || pit[i]) && x[b + 2] < cl) x[b + 2] = cl;
      // ground that rises steeply ahead is hard, tiring climbing
      const up = alt[i] - alt[idx(a.x, a.y)];
      if (up > 0.3) {
        const q = cl * Math.min(1, up / 1.5);
        if (x[b + 11] < q) x[b + 11] = q;
      }
      // people also see fruit on the trees as food
      // and herbivores can browse the trees
      const f =
        (a.sp === 0
          ? Math.max(GRASSEYE * food[i], fruit[i] * 1.4, COOK[i] * 1.6, 0.6 * ROOT[i])
          : a.S.omni
          ? Math.max(food[i], fruit[i] * 1.4, COOK[i] * 1.6)
          : a.sp === 1
            ? Math.max(food[i], tree[i] * 0.3)
            : food[i]) *
        cl *
        (0.15 + te);
      if (f > x[b + 1]) x[b + 1] = f;
      // trees, and the dark mouth of a cave, are cover: somewhere to get out of the rain and the wind
      const cv = cover(i);
      if (cv > 0.1 && x[b + 12] < cl * cv) x[b + 12] = cl * cv;
      // fire: flames and smoke are hard to miss
      if (FIRE[i] > 0.03 && x[b + 15] < cl) x[b + 15] = cl;
      if (a.sp === 0) {
        // people notice loose stones and sticks, and nuts under the trees
        if (lying(i) && x[b + 13] < cl) x[b + 13] = cl;
        const q = cl * Math.min(1, nut[i] * 3);
        if (nut[i] > 0.05 && x[b + 14] < q) x[b + 14] = q;
      }
      // only eyes with three kinds of colour cone (people) tell red berries from green leaves
      if (S.col >= 3 && poison[i] && food[i] > 0.05 && x[b + 9] < cl) x[b + 9] = cl;
    }
    const l = G[i];
    if (l)
      for (const o of l) {
        if (o === a || o.dead) continue;
        // anyone among thick trees is harder to spot
        const hid = 1 - 0.6 * cover(i),
          c = o.sp === 3 ? 8 : o.sp === 1 ? 3 : o.sp === 0 ? 4 : 5,
          q = ((a.sp === 2 && c !== 5) || (a.sp === 0 && c === 8) ? cl * (0.15 + te) : cl) * hid;
        if (x[b + c] < q) x[b + c] = q;
        if (o.k === a.k && o.sex !== a.sex && o.rd && a.rd && x[b + 6] < cl) x[b + 6] = cl;
        if ((o === a.kid || o === a.mom || o.mom === a) && x[b + 7] < cl) x[b + 7] = cl;
        if (o.hand === 4 && x[b + 15] < cl * 0.6) x[b + 15] = cl * 0.6; // someone carrying fire
      }
  }
  if (a.sp === 0 && RETINA) retina(a, x, r, night);
  else if (a.sp === 0 && a.per) perceive(a, x);
  if (a.rd) {
    const hr = r * 6;
    for (const o of ag) {
      if (o === a || o.dead || o.k !== a.k || o.sex === a.sex || !o.rd) continue;
      const dx = dxw(o.x - a.x),
        dy = o.y - a.y,
        d = Math.hypot(dx, dy);
      if (d > hr || d === 0) continue;
      const sct = (Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) + 8) % 8,
        cl = 1 - d / (hr + 1);
      if (x[sct * NCH + 6] < cl) x[sct * NCH + 6] = cl;
    }
  }
  let wm = a.sp === 3 ? null : null;
  for (let s = 0; s < 8 && a.sp !== 3; s++)
    if (x[s * NCH] > 0) {
      wm = 1;
      break;
    }
  if (wm) {
    a.mwT = tick;
    let bd = 1e9;
    for (const [dx, dy, d] of OFF) {
      if (d > r) break;
      const X = a.x + dx,
        Y = a.y + dy;
      if (inb(X, Y) && drinkable(idx(X, Y)) && !deep[idx(X, Y)] && d < bd) {
        bd = d;
        a.mw = { x: wx(X), y: Y };
      }
    }
  }
  const MEM = S.mem * DAY;
  if (a.mw && tick - a.mwT > MEM) a.mw = null;
  if (a.mf && tick - a.mfT > MEM) a.mf = null;
  if (a.mw) {
    const dx = dxw(a.mw.x - a.x),
      dy = a.mw.y - a.y,
      d = Math.hypot(dx, dy) || 1;
    x[IB + 12] = (dx / d) * tw;
    x[IB + 13] = (dy / d) * tw;
  }
  if (a.mf) {
    const dx = dxw(a.mf.x - a.x),
      dy = a.mf.y - a.y,
      d = Math.hypot(dx, dy) || 1;
    if (d < 1.5 && food[idx(a.mf.x, a.mf.y)] < 0.15) a.mf = null;
    else {
      x[IB + 14] = (dx / d) * te;
      x[IB + 15] = (dy / d) * te;
    }
  }
  const here = idx(a.x, a.y);
  x[HB] =
    ((a.sp < 2 || a.S.omni) && !water[here]) || (a.sp === 3 && water[here])
      ? a.sp === 0
        ? Math.max(GRASSEYE * food[here], fruit[here], COOK[here], 0.6 * ROOT[here], (meatAt(a.x, a.y, 0) || { meat: 0 }).meat)
        : a.S.omni
        ? Math.max(food[here], fruit[here], COOK[here], (meatAt(a.x, a.y) || { meat: 0 }).meat)
        : a.sp === 1
          ? Math.max(food[here], tree[here] > 0.3 ? 0.2 : 0)
          : food[here]
      : a.sp === 2
        ? Math.min(1, (meatAt(a.x, a.y, 2) || { meat: 0 }).meat)
        : 0;
  let wa = 0,
    pa = 0,
    ma = 0;
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      const X = a.x + dx,
        Y = a.y + dy;
      if (!inb(X, Y)) continue;
      const i = idx(X, Y);
      if (drinkable(i)) wa = 1;
      const l = G[i];
      if (l)
        for (const o of l) {
          if (edible(a, o)) pa = 1;
          if (o !== a && o.sp === a.sp && o.sex !== a.sex && o.rd && a.rd) ma = 1;
        }
    }
  x[HB + 1] = a.sp === 3 ? 0 : wa;
  x[HB + 2] = pa;
  x[HB + 3] = ma;
  // what a person finds underfoot, by sight and smell: the leaves of a plant with roots below, and a body
  x[FOODIN] = a.sp === 0 && !water[here] ? Math.min(1, ROOT[here] * 2) : 0;
  {
    const m = a.sp === 0 || a.sp === 2 ? meatAt(a.x, a.y, a.sp === 0 ? 0 : 2) : null;
    x[FOODIN + 1] = m ? Math.min(1, m.meat) * (rotten(m) ? 0.5 : 1) : 0;
  }
  x[IB + 16] = a.sp < 2 && poison[here] && food[here] > 0.05 ? 1 : 0;
  let hk = 0;
  if (a.sp === 0 && a.e > 40)
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const X = a.x + dx,
          Y = a.y + dy;
        if (!inb(X, Y)) continue;
        const l = G[idx(X, Y)];
        if (l) for (const o of l) if (kinYoung(a, o)) hk = Math.max(hk, 1 - o.e / 100);
      }
  x[IB + 17] = hk;
  x[IB] = 1 - a.e / 100;
  x[IB + 1] = 1 - a.w / 100;
  x[IB + 2] = a.sl;
  x[IB + 3] = Math.min(1, a.painA + a.painW);
  x[IB + 4] = 1 - a.hp / 100;
  x[IB + 5] = night ? 1 : 0;
  x[IB + 6] = a.age < S.mat ? 1 : 0;
  x[IB + 7] = a.rd ? 1 : 0;
  x[IB + 8] = Math.min(1, a.g.c * (1 + a.bored)); // boredom sharpens curiosity
  x[IB + 9] = Math.max(a.lo, a.grief, a.miss || 0);
  x[IB + 10] = deep[here];
  x[IB + 11] = 1;
  x[IB + 18] = a.cold;
  x[IB + 25] = a.heat;
  x[IB + 26] = a.rage;
  x[FIREIN] = Math.min(1, fireNear(a.x, a.y) * 2 + (a.hand === 4 ? 0.3 : 0));
  // short-term memory: what its brain was doing a moment ago
  for (let j = 0; j < NM; j++) x[IB + 27 + j] = a.hm[j];
  if (a.sp !== 3) hear(a, x);
  if (a.sp === 0) seeOthers(a, x);
  if (a.sp === 0) {
    x[IB + 19] = a.hand === 1 || a.hand === 5 ? 1 : 0; // a stone (or a shiny one)
    x[IB + 20] = a.hand === 2 || a.hand === 4 ? 1 : 0; // a stick (perhaps burning)
    x[IB + 21] = a.hand === 3 ? 1 : 0;
    x[IB + 22] = stone[here] + flake[here] + pyrite[here] > 0 ? 1 : 0;
    x[IB + 23] = stick[here] > 0 ? 1 : 0;
    x[IB + 24] = nut[here] > 0.05 ? 1 : 0;
  }
}

// Seeing other people's hands and eyes: someone close (in the same square or the next) who is pointing
// — how clearly and which way — and which way the nearest person is looking. Following another's gaze
// is old (apes do it); what the pointing is about, nothing tells them.
function seeOthers(a, x) {
  a.seenPt = null;
  let best = null,
    gaze = null,
    bd = 9;
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      const l = G[idx(wx(a.x + dx), clamp(a.y + dy, 0, H - 1))];
      if (!l) continue;
      for (const o of l) {
        if (o === a || o.sp !== 0 || o.dead || o.asleep) continue;
        const d = dx * dx + dy * dy;
        if (o.ptT !== undefined && tick - o.ptT <= 1 && o.pt >= 0 && (!best || d < best.d)) best = { o, d };
        if (d < bd) (bd = d), (gaze = o);
      }
    }
  if (best) {
    const [mx, my] = MV[best.o.pt],
      L = Math.hypot(mx, my);
    x[SEEPT] = best.d ? 0.6 : 1;
    x[SEEPT + 1] = mx / L;
    x[SEEPT + 2] = my / L;
    a.seenPt = { who: best.o, dir: best.o.pt, t: tick };
  }
  if (gaze) {
    const [mx, my] = MV[gaze.hd || 0],
      L = Math.hypot(mx, my);
    x[SEEPT + 3] = mx / L;
    x[SEEPT + 4] = my / L;
  }
}
