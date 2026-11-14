// Genesis — The prey map (scale step 1; docs/design/scale-step.md): the land's antelope and buffalo, counted in kg per
// square, with herds shown only where someone is. Off unless --prey-map.
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// Real savanna carries thousands of hoofed animals in a band's range (about 5,000 kg per km²), far more than can each
// have a brain. So the land holds them as a weight per square in two classes — antelope (KINDS[1]) and buffalo
// (KINDS[3]) — and around each hominin and each hunter (its own square and the eight next to it, SOC.preyZone) the
// animals of a square are shown as one herd of that class, a plant-eater agent with a head count (a.head) holding all
// the square's animals of its class (the owner, 14 Nov 2026: one herd per square, so no invented share of herds decides how
// often anyone meets prey; the cost is herds bigger than real ones — impala 28–58, buffalo about 350).
// A herd behaves as one animal (its brain, its body); a kill or any death takes one animal from it and leaves one carcass.
// A herd whose square no one is near any more is set aside, brain and all, and comes back when someone comes near.
// The map regrows towards what the square's plants can carry (logistic, on the life clock: it is a population process).
// Hares, hunters and fish are unchanged; the map does not graze the grass in this step (the owner's call).

let PREY = null, // [antelope kg, buffalo kg] per square, not shown as a herd
  PCAP = null, // what each square can carry, kg, per class
  PARK = null, // herds set aside, by square*2+class
  PREYSTAT = null; // the ledger: kg at the start, grown, died, so the weight can be checked (tests/preymap.test.js)
const PREYK = [1, 3], // the kinds that are herds: antelope (impala-like, 50 kg) and buffalo (600 kg)
  SQKM = 9; // a square is about 3 km across

// What each square can carry: in proportion to how well its plants grow (warmth and ground; Coe, Cumming & Phillipson 1976
// and Fritz & Duncan 1994: hoofed-animal biomass rises with rainfall and plant production), only where the class can live
// (its habitat in KINDS), scaled so the mean over the squares where it lives is SOC.preyLevel × its share. The level
// (5,000 kg/km², tested 1,000 and 10,000) and the buffalo share of it (0.5, tested 0.25 and 0.75) are assumptions.
function initPreyMap() {
  PREY = null;
  PARK = null;
  PREYSTAT = null;
  if (!SOC.preyMap) return;
  const n = W * H;
  PREY = [new Float32Array(n), new Float32Array(n)];
  PCAP = [new Float32Array(n), new Float32Array(n)];
  PARK = new Map();
  let start = 0;
  PREYK.forEach((k, c) => {
    const h = KINDS[k].hab,
      share = c === 0 ? 1 - SOC.buffShare : SOC.buffShare;
    let sum = 0,
      m = 0;
    for (let i = 0; i < n; i++) {
      if (water[i] || rock[i] || pit[i]) continue;
      const T = meanTemp(i);
      if (h && (T < h.t[0] || T > h.t[1] || tree[i] < h.tree[0] || tree[i] > h.tree[1])) continue;
      const g = TF[ter[i]] * (1 - 0.35 * tree[i]) * clamp((T - 2) / 13, 0, 1.15);
      if (g <= 0) continue;
      PCAP[c][i] = g;
      sum += g;
      m++;
    }
    const scale = m ? (SOC.preyLevel * SQKM * share) / (sum / m) : 0;
    // Forest antelope (backlog A31, entry 72): squares warm enough for antelope but too thickly wooded for open-country herds
    // carry duiker- and bushbuck-like antelope at a much lower level, SOC.forestPrey kg/km² (an assumption: rain forests rarely
    // carry over 3,000 kg/km² of all mammals together, savanna up to 15,000–20,000; tested 300 and 3,000). Before, they carried none.
    const forest = new Float32Array(n);
    let fs = 0,
      fm = 0;
    if (c === 0 && h && SOC.forestPrey > 0)
      for (let i = 0; i < n; i++) {
        if (water[i] || rock[i] || pit[i] || PCAP[c][i] > 0) continue;
        const T = meanTemp(i);
        if (T < h.t[0] || T > h.t[1] || tree[i] <= h.tree[1]) continue;
        const g = TF[ter[i]] * (1 - 0.35 * tree[i]) * clamp((T - 2) / 13, 0, 1.15);
        if (g <= 0) continue;
        forest[i] = g;
        fs += g;
        fm++;
      }
    const fscale = fm ? (SOC.forestPrey * SQKM) / (fs / fm) : 0;
    for (let i = 0; i < n; i++) {
      PCAP[c][i] = PCAP[c][i] * scale + forest[i] * fscale;
      PREY[c][i] = PCAP[c][i];
      start += PREY[c][i];
    }
  });
  PREYSTAT = { start, grown: 0, died: 0, herds: 0, made: 0 };
}
// Is there prey that a hunter could live on within r squares? (where hunters start and newcomers arrive, with the map on)
function preyNear(x, y, r) {
  for (let dy = -r; dy <= r; dy++)
    for (let dx = -r; dx <= r; dx++) {
      if (!inb(x + dx, y + dy)) continue;
      const i = idx(x + dx, y + dy);
      if (PCAP[0][i] + PCAP[1][i] > 0) return true;
    }
  return false;
}
const herdKg = (a) => a.head * a.S.mass;
// All the weight of prey in the world, map and herds (for the ledger)
function preyTotal() {
  let t = 0;
  for (const P of PREY) for (let i = 0; i < P.length; i++) t += P[i];
  for (const a of ag) if (a.herd && !a.gone) t += herdKg(a);
  for (const a of PARK.values()) t += herdKg(a);
  return t;
}
// Each step, before anyone moves: regrowth (once a day), herds set aside where no one is near, herds shown where someone is.
function preyTick() {
  if (!SOC.preyMap) return;
  const r = SOC.preyZone,
    zone = new Set();
  for (const a of ag)
    if (!a.dead && (a.sp === 0 || (a.sp === 2 && !a.herd)))
      for (let dy = -r; dy <= r; dy++)
        for (let dx = -r; dx <= r; dx++) if (inb(a.x + dx, a.y + dy)) zone.add(idx(a.x + dx, a.y + dy));
  // regrowth towards what the square can carry, counting the herds standing on it; a life-year rate on the life clock
  if (tick % DAY === 0) {
    const on = [new Float32Array(W * H), new Float32Array(W * H)];
    for (const a of ag) if (a.herd && !a.gone) on[a.pc][idx(a.x, a.y)] += herdKg(a);
    for (const [key, a] of PARK) on[a.pc][key >> 1] += herdKg(a);
    const f = (SOC.preyRegrow * DAY) / TY;
    for (let c = 0; c < 2; c++) {
      const P = PREY[c],
        K = PCAP[c],
        O = on[c];
      for (let i = 0; i < P.length; i++) {
        if (K[i] <= 0) continue;
        const tot = P[i] + O[i],
          d = Math.max(-P[i], f * tot * (1 - tot / K[i]));
        P[i] += d;
        PREYSTAT.grown += d;
      }
    }
  }
  // herds no one is near any more are set aside (a second herd of the same class on that square joins the first)
  let left = false;
  for (const a of ag) {
    if (!a.herd || a.dead || zone.has(idx(a.x, a.y))) continue;
    const key = idx(a.x, a.y) * 2 + a.pc,
      p = PARK.get(key);
    if (p) p.head += a.head;
    else PARK.set(key, a);
    a.left = true;
    left = true;
  }
  if (left) ag = ag.filter((a) => !a.left || ((a.left = false), false));
  // a herd in each watched square that has none of its class: one set aside there comes back, or a new one forms; it
  // takes in all the square's animals of its class from the map
  const has = new Set();
  for (const a of ag) if (a.herd) has.add(idx(a.x, a.y) * 2 + a.pc);
  for (const i of zone)
    for (let c = 0; c < 2; c++) {
      const key = i * 2 + c;
      if (has.has(key)) continue;
      const mass = KBIO[PREYK[c]].mass,
        n = Math.floor(PREY[c][i] / mass);
      let a = PARK.get(key);
      if (!a && n < 1) continue;
      if (a) PARK.delete(key);
      else {
        const x = i % W,
          y = (i / W) | 0;
        a = mk(1, x, y, rnd() < 0.5 ? 1 : 0, gene(1, true), 0, (KBIO[PREYK[c]].smat * (1 + rnd() * 0.3)) | 0, PREYK[c]);
        a.herd = true;
        a.pc = c;
        a.head = 0;
        PREYSTAT.made++;
      }
      a.head += n;
      PREY[c][i] -= n * mass;
      ag.push(a);
    }
}
// One animal of a herd has died (cause c): it leaves its carcass where the herd is, and the herd goes on without it. If the
// one shown (whose body the herd is) died of anything but a hunter, the rest are no longer shown: they go back to the map.
function herdLoss(a, c) {
  leaveBody({ sp: a.sp, S: a.S, x: a.x, y: a.y, age: a.age, eaten: a.eaten || 0, name: '', killer: a.killer }, c);
  PREYSTAT.died += a.S.mass;
  a.head--;
  a.eaten = 0;
  if (c !== 'killed by a predator' || a.head < 1) {
    PREY[a.pc][idx(a.x, a.y)] += herdKg(a);
    return false;
  }
  a.dead = false;
  a.cause = '';
  a.killedBy = null;
  a.killer = null;
  a.hp = 100;
  return true;
}
