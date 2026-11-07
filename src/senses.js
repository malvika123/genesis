// Genesis — What each creature perceives: eight directions of sight, its own body, and its memories of water and food.
// Copyright (c) 2026 Malvika Sen. MIT License.

// ---------- senses ----------
const kinYoung = (a, o) =>
  o !== a &&
  !o.dead &&
  o.sp === a.sp &&
  o.age < SP[o.sp].mat &&
  (o.mom === a || a.kid === o || (o.mom && o.mom.mate === a));
const edible = (a, o) =>
  o !== a &&
  !o.dead &&
  !(o.found && o.age < SP[o.sp].mat) &&
  (a.sp === 2
    ? o.sp !== 2 || (a.e < 15 && o !== a.mom && o !== a.kid && o.mom !== a)
    : a.sp === 0 && o.sp === 3);
function sense(a, x, night) {
  x.fill(0);
  const tw = 1 - a.w / 100,
    te = 1 - a.e / 100;
  const S = SP[a.sp],
    r = Math.max(1.5, a.g.v * (night ? S.nv : 1) * (a.asleep ? 0.3 : 1));
  for (const [dx, dy, d, s] of OFF) {
    if (d > r) break;
    const X = a.x + dx,
      Y = a.y + dy;
    if (!inb(X, Y)) continue;
    const i = idx(X, Y),
      cl = 1 - d / (r + 1),
      b = s * NCH;
    if (a.sp === 3) {
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
      const f = food[i] * cl * (0.15 + te);
      if (f > x[b + 1]) x[b + 1] = f;
      if (poison[i] && food[i] > 0.05 && x[b + 9] < cl) x[b + 9] = cl;
    }
    const l = G[i];
    if (l)
      for (const o of l) {
        if (o === a || o.dead) continue;
        const c = o.sp === 3 ? 8 : o.sp === 1 ? 3 : o.sp === 0 ? 4 : 5,
          q = (a.sp === 2 && c !== 5) || (a.sp === 0 && c === 8) ? cl * (0.15 + te) : cl;
        if (x[b + c] < q) x[b + c] = q;
        if (o.sp === a.sp && o.sex !== a.sex && o.rd && a.rd && x[b + 6] < cl) x[b + 6] = cl;
        if ((o === a.kid || o === a.mom || o.mom === a) && x[b + 7] < cl) x[b + 7] = cl;
      }
  }
  if (a.rd) {
    const hr = r * 6;
    for (const o of ag) {
      if (o === a || o.dead || o.sp !== a.sp || o.sex === a.sex || !o.rd) continue;
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
  x[HB] = (a.sp < 2 && !water[here]) || (a.sp === 3 && water[here]) ? food[here] : 0;
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
  x[IB + 8] = a.g.c;
  x[IB + 9] = a.lo;
  x[IB + 10] = deep[here];
  x[IB + 11] = 1;
  x[IB + 18] = a.cold;
}
