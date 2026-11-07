// Genesis — What each creature perceives: eight directions of sight, its own body, and its memories of water and food.
// Copyright (c) 2026 Malvika Sen. MIT License.

// ---------- senses ----------
const kinYoung = (a, o) =>
  o !== a &&
  !o.dead &&
  o.sp === a.sp &&
  o.age < o.S.mat &&
  (o.mom === a || a.kid === o || (o.mom && o.mom.mate === a));
const edible = (a, o) =>
  o !== a &&
  !o.dead &&
  !(o.found && o.age < o.S.mat) &&
  (a.sp === 2
    ? o.sp !== 2 || (o.k === a.k && a.e < 15 && o !== a.mom && o !== a.kid && o.mom !== a)
    : a.sp === 0 && o.sp === 3);
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
// something important teaches recognition fast: what bit you, what made you sick, what burned you
function learnSight(a, c, amount = 0.1) {
  if (a.per) a.per[c] = Math.min(1, a.per[c] + amount * (1 - a.per[c]));
}
function sense(a, x, night) {
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
        (a.sp === 0 || a.S.omni
          ? Math.max(food[i], fruit[i] * 1.4, COOK[i] * 1.6)
          : a.sp === 1
            ? Math.max(food[i], tree[i] * 0.3)
            : food[i]) *
        cl *
        (0.15 + te);
      if (f > x[b + 1]) x[b + 1] = f;
      if (tree[i] > 0.1 && x[b + 12] < cl * tree[i]) x[b + 12] = cl * tree[i];
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
  if (a.sp === 0 && a.per) perceive(a, x);
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
      ? a.sp === 0 || a.S.omni
        ? Math.max(food[here], fruit[here], COOK[here])
        : a.sp === 1
          ? Math.max(food[here], tree[here] > 0.3 ? 0.2 : 0)
          : food[here]
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
  x[IB + 9] = Math.max(a.lo, a.grief);
  x[IB + 10] = deep[here];
  x[IB + 11] = 1;
  x[IB + 18] = a.cold;
  x[IB + 25] = a.heat;
  x[IB + 26] = a.rage;
  x[FIREIN] = Math.min(1, fireNear(a.x, a.y) * 2 + (a.hand === 4 ? 0.3 : 0));
  // short-term memory: what its brain was doing a moment ago
  for (let j = 0; j < NM; j++) x[IB + 27 + j] = a.hm[j];
  if (a.sp !== 3) hear(a, x);
  if (a.sp === 0) {
    x[IB + 19] = a.hand === 1 || a.hand === 5 ? 1 : 0; // a stone (or a shiny one)
    x[IB + 20] = a.hand === 2 || a.hand === 4 ? 1 : 0; // a stick (perhaps burning)
    x[IB + 21] = a.hand === 3 ? 1 : 0;
    x[IB + 22] = stone[here] + flake[here] + pyrite[here] > 0 ? 1 : 0;
    x[IB + 23] = stick[here] > 0 ? 1 : 0;
    x[IB + 24] = nut[here] > 0.05 ? 1 : 0;
  }
}
