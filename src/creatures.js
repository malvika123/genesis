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
  bs: sp === 0 && ERA === 'hominin' ? 0.27 + rnd() * 0.09 : 0.75 + rnd() * 0.25, // how big a brain it can grow (inherited; early hominins about a third of a person's)
  lr: 0.8 + rnd() * 0.4, // how quickly it learns (inherited)
  im: 0.1 + rnd() * 1.6, // how much it learns from others: copying them (inherited); feeling their pain and fear is vf (below) unless --one-social-gene
  vl: rnd() * 0.3, // vocal control and learning: low, as in our ape-like ancestors (voice.js)
  pg: rnd() * 0.3, // the urge to point
  sh: rnd() * 0.3, // the pleasure of sharing attention
  al: 0.2 + rnd() * 0.6, // how much it cares for others' young (inherited; family is cared for regardless)
  pb: rnd(), // whom it copies: 0 anyone, 1 strongly prefers those doing well (inherited)
  cf: rnd(), // how much it goes with what most others are doing (inherited)
  w: newW(sp, inst),
  ...laterTraits(),
});
// Traits added later, drawn from their own random stream (state.js: rnd2) so worlds stay the same without them.
// tm: timidity — how strongly fear rises and pulls away from danger; inborn temperament differs and is partly inherited
// (rhesus monkeys: freezing under threat about 30–40% heritable, Kalin lab). pc: parental care — how strongly its own
// young's hunger moves it to share food; mothers differ in consistent styles (rhesus: Fairbanks). Both 0.4–1.6 around 1:
// the spread is an assumption.
// vf: how strongly it feels others' pain and fear (vicarious fear and pain), split from im (copying) on 12 Nov 2026:
// observational fear learning uses its own brain systems (Olsson & Phelps 2007), and attention to threat and to others
// are separate, weakly heritable traits in rhesus monkeys (8–14% and 10%); no study shows they are inherited apart, so the
// split is a way to measure which one selection acts on (`--one-social-gene`: one gene for both, the old rule).
const laterTraits = () => ({ tm: 0.4 + rnd2() * 1.2, pc: 0.4 + rnd2() * 1.2, ...(SOC.vicarGene ? { vf: 0.1 + rnd2() * 1.6 } : {}) });
const mut2 = (v, lo, hi) => clamp(rnd2() < 0.2 ? v + (rnd2() - 0.5) * 0.3 * v : v, lo, hi);
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
    voice: 0, // 0 silent, 1 crying, 2 screaming, 3 speaking (the word itself is in .word)
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
  const lay = layOf(g, units);
  for (let j = 0; j < units; j++) for (let i = 0; i < NI; i++) a.cm[j * NI + i] = wiredL(lay, j, i) ? 1 : 0;
  a.nh = grownUnits(a);
  if (sp === 0) genRecord(a);
  a.per = sp === 0 ? newPerception(a) : null;
  a.p0 = PR.map((_, k) => probe(a.lw, k));
  return a;
}
// for traits that run from 0 to 1, a mutation is a small step either way (a share of 0 can still change)
function mutA(v, lo, hi) {
  return clamp(rnd() < 0.2 ? v + (rnd() - 0.5) * 0.3 : v, lo, hi);
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
  const units = hOf(w),
    lay = childLayout(p.g, q.g, units);
  for (let j = 0; j < units; j++) for (let i = 0; i < NI; i++) if (!wiredL(lay, j, i)) w[OI + j * NI + i] = 0;
  const pk = (k) => (rnd() < 0.5 ? p.g[k] : q.g[k]);
  return {
    s: mut(pk('s'), 0.4, 2),
    v: mut(pk('v'), 2, 10),
    m: mut(pk('m'), 0.4, 2),
    c: mut(pk('c'), 0.05, 1),
    b: mut(pk('b'), 0.3, 1.8),
    so: mut(pk('so'), 0.2, 2),
    bs: mut(pk('bs') ?? 0.9, ERA === 'hominin' ? 0.2 : 0.5, 1), // can evolve larger, up to a modern brain
    lr: mut(pk('lr') ?? 1, 0.4, 2),
    lay,
    im: mut(pk('im') ?? 1, 0.05, 3),
    vl: mutA(pk('vl') ?? 1, 0, 1),
    pg: mutA(pk('pg') ?? 1, 0, 1),
    sh: mutA(pk('sh') ?? 1, 0, 1),
    al: mutA(pk('al') ?? 0.5, 0, 1),
    pb: mutA(pk('pb') ?? 0.5, 0, 1),
    cf: mutA(pk('cf') ?? 0.3, 0, 1),
    tm: mut2((rnd2() < 0.5 ? p.g.tm : q.g.tm) ?? 1, 0.3, 1.8),
    pc: mut2((rnd2() < 0.5 ? p.g.pc : q.g.pc) ?? 1, 0.3, 1.8),
    ...(SOC.vicarGene ? { vf: mut2((rnd2() < 0.5 ? p.g.vf : q.g.vf) ?? 1, 0.05, 3) } : {}),
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
    // a hunting group starts at least a home range away from the band's camp (lion and wolf territories
    // span roughly 20–1,000 km²): they meet the band later, by roaming, not by being placed beside it
    if (sp === 2 && SOC.home && BANDAT && t < 4000 && wrapDist(x, y, BANDAT[0], BANDAT[1]) < 10) return false;
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
  // Where our own species lived for most of its first 250,000 years: tropical Africa's mosaic of
  // grassland and open woodland, close to lakes, rivers and springs — warm, but not desert (fossil and
  // archaeological sites from Jebel Irhoud to Omo, Olorgesailie and the Kalahari margins; foragers camp
  // within a few kilometres of fresh water). Every cell of the world is checked, and the band starts at
  // one of those that fit, picked at random.
  const near = (x, y, r, f) => {
    for (let dy = -r; dy <= r; dy++)
      for (let dx = -r; dx <= r; dx++) if (inb(x, y + dy) && f(idx(x + dx, y + dy))) return true;
    return false;
  };
  const homeland = (i, x, y, strict) =>
    land(i) &&
    Math.abs(lat(y)) * 80 <= 25 &&
    (!SOC.earth || (lonOf(x) > -18 && lonOf(x) < 52)) && // on the real Earth: in Africa
    ter[i] !== 1 &&
    meanTemp(i) >= 18 &&
    meanTemp(i) <= 27 &&
    (typeof MOIST === 'undefined' || !MOIST || MOIST[i] >= 0.35) &&
    near(x, y, 3, (j) => water[j] && !salt[j]) &&
    // grassland and woodland side by side
    (!strict || (near(x, y, 2, (j) => !water[j] && tree[j] < 0.2) && near(x, y, 2, (j) => tree[j] > 0.35)));
  const homeSite = () => {
    for (const strict of [true, false]) {
      const c = [];
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (homeland(idx(x, y), x, y, strict)) c.push([x, y]);
      if (c.length) return c[(rnd() * c.length) | 0];
    }
    return null;
  };
  let cx = -1,
    cy = -1;
  const centre = () => {
    cx = cy = -1;
    if (sp === 0 && SOC.home) {
      const h = homeSite();
      if (h) {
        [cx, cy] = h;
        return;
      }
    }
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
  if (sp === 0) BANDAT = cx >= 0 ? [cx, cy] : null;
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
    if (c.per) c.per = newPerception(c); // founders see like grown-ups
    ag.push(c);
  }
}

// Newcomers from the wider population (the rescue effect: Brown & Kodric-Brown 1977). One simulated world holds only a few
// hunters of each kind, where the real landscape held thousands (Serengeti leopards about 5.5 per 100 km²: Allen et al. 2020),
// so a kind dies out by chance; real local carnivore populations persist because animals keep arriving from outside (one
// marten a year cut a population's 100-year extinction risk below 1%: Wisconsin study, J. Wildl. Manage. 2019). So while a
// hunter kind is rare (fewer than SOC.rescueBelow), a young adult of that kind arrives now and then — SOC.rescueRate a
// year (an assumption, tested at 1 and 0.25) — somewhere that suits it, away from the band, with a blank mind like the
// founders. Drawn from the separate random stream, so with `--no-rescue` worlds are exactly as before. Checked once a day.
function rescue() {
  const n = [];
  for (const a of ag) if (a.sp === 2) n[a.k] = (n[a.k] || 0) + 1;
  USE2 = true;
  try {
    for (let k = 0; k < KINDS.length; k++) {
      if (KINDS[k].sp !== 2 || (n[k] || 0) >= SOC.rescueBelow) continue;
      if (rnd() >= (SOC.rescueRate * DAY) / TY) continue;
      const before = ag.length;
      spawnKind(2, k, 1, true);
      if (ag.length > before) {
        const c = ag[ag.length - 1];
        c.sex = rnd() < 0.5 ? 1 : 0;
        c.newcomer = true;
        log('A ' + KINDS[k].n.toLowerCase() + ' came into the land from elsewhere (its kind had become rare here).');
      }
    }
  } finally {
    USE2 = false;
  }
}
