// Genesis — Things lying on the ground that hands can use: stones, sticks, sharp-edged flakes, and hard-shelled nuts.
// Copyright (c) 2026 Malvika Sen. MIT License.
//
// Nothing here tells a creature what to do. The world only has things in it, and things behave the way
// they do on Earth: a nut will not open in bare hands, but a stone hit hard against it breaks the shell
// (chimpanzees, capuchin monkeys and crows crack nuts with stones); two stones struck together can chip
// off a sharp edge (the oldest stone tools, about 3 million years old, were made this way); and a long
// stick reaches further than an arm. A creature has to stumble on each of these by itself.
//
// Simplifications, said honestly: a cell holds a count of stones, not individual stones; a hand holds one
// thing at a time; the nut meat is eaten the moment the shell is broken.

// Bodies of the dead. A body does not vanish: it lies where it fell, then wastes to bare bones over a
// couple of weeks (simplified: no scavengers or insects here yet), and the bones lie for a long time.
let BODIES = [];
let stone, // loose stones on the ground, a few in each cell
  stick, // fallen branches
  flake, // stones with a sharp edge
  nut, // nuts under the trees: energy-rich, but locked in a hard shell
  pyrite; // shiny, brassy stones (fool's gold) found in rocky hills: struck with a stone, they throw hot sparks
const HAND = ['nothing', 'a stone', 'a stick', 'a sharp stone', 'a burning stick', 'a shiny yellow stone'];

function initItems() {
  BODIES = [];
  const n = W * H;
  stone = new Uint8Array(n);
  stick = new Uint8Array(n);
  flake = new Uint8Array(n);
  nut = new Float32Array(n);
  pyrite = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    if (water[i] || rock[i] || pit[i]) continue;
    const x = i % W,
      y = (i / W) | 0;
    // stones lie everywhere, more on the mountains and along the water (gravel and shingle)
    let near = 0;
    for (let k = 0; k < 8 && !near; k++) {
      const X = x + MV[k][0],
        Y = y + MV[k][1];
      if (inb(X, Y) && water[idx(X, Y)]) near = 1;
    }
    const p = 0.1 + 0.25 * clamp(alt[i] / 1.5, 0, 1) + 0.25 * near;
    if (rnd() < p) stone[i] = 1 + (rnd() < 0.3) + (rnd() < 0.1);
    // fallen branches under the trees
    if (tree[i] > 0.2 && rnd() < tree[i] * 0.5) stick[i] = 1 + (rnd() < 0.4);
    nut[i] = nutCap(i) * rnd();
    // pyrite is rare, and found in rocky, hilly ground
    if (alt[i] > 0.6 && ter[i] === 2 && rnd() < 0.05) pyrite[i] = 1;
  }
}

// how many nuts the trees of a cell can carry: broadleaf woods most (oak, hazel, walnut), pine seeds
// in the cold, and some in the rainforest
function nutCap(i) {
  const k = fkind[i];
  return tree[i] < 0.25 || water[i] ? 0 : tree[i] * (k === 2 ? 0.7 : k === 1 ? 0.35 : k === 3 ? 0.4 : 0);
}

function updateItems() {
  const n = W * H;
  for (let i = 0; i < n; i++) {
    const c = nutCap(i);
    if (!c) {
      nut[i] = 0;
      continue;
    }
    // nuts ripen in the growing season and slowly rot or are carried off
    nut[i] = Math.min(c, nut[i] * 0.9998 + 0.0008 * tree[i] * Math.max(0, growthAt(i) - 0.3));
    // branches fall in the forest and slowly rot
    if (tree[i] > 0.3 && stick[i] < 4 && rnd() < 0.0002 * tree[i]) stick[i]++;
    else if (stick[i] && rnd() < 0.00003) stick[i]--;
  }
}

function leaveBody(a, cause) {
  if (a.sp === 3) return; // fish: not drawn lying about (they sink)
  BODIES.push({ x: a.x, y: a.y, sp: a.sp, name: a.name || a.S.n, t: tick, cause, size: a.S.size || 1, w: !!water[idx(a.x, a.y)] });
  if (BODIES.length > 400) BODIES.shift();
}
// 0 = fresh body … 1 = bare bones; gone after bones have lain a long time
const BODY_BONES = 14 * 96,
  BODY_GONE = 120 * 96;
function updateBodies() {
  if (tick % 96 === 0) BODIES = BODIES.filter((b) => tick - b.t < BODY_GONE);
}
// the ground at a cell, as the hands meet it
const lying = (i) => stone[i] + stick[i] + flake[i] + pyrite[i];
function pickUp(a) {
  const i = idx(a.x, a.y);
  if (a.hand) return 0;
  // a shiny stone catches the eye first
  if (pyrite[i]) (pyrite[i]--, (a.hand = 5));
  else if (stone[i]) (stone[i]--, (a.hand = 1));
  else if (stick[i]) (stick[i]--, (a.hand = 2));
  else if (flake[i]) (flake[i]--, (a.hand = 3));
  return a.hand;
}
function putDown(a) {
  const i = idx(a.x, a.y),
    L = a.hand === 1 ? stone : a.hand === 2 || a.hand === 4 ? stick : a.hand === 5 ? pyrite : flake;
  if (a.hand && !water[i]) L[i] = Math.min(6, L[i] + 1);
  a.hand = 0;
}
