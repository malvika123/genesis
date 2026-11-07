// Genesis — Building a new world: terrain (see terrain.js), grass, weather, and the first creatures.
// Copyright (c) 2026 Malvika Sen. MIT License.

// cfg: {people, herbivores, predators, fish}
const plural = (n) =>
  n === 'Deer' || n === 'Bison' || n === 'Fish'
    ? n
    : n === 'Big cat'
      ? 'Big cats'
      : n === 'Wolf'
        ? 'Wolves'
        : n + 's';
function reset(cfg = {}) {
  food = new Float32Array(W * H);
  ag = [];
  tick = 0;
  updateClimate();
  hist = [];
  logs = [];
  kills = [0, 0, 0, 0];
  fished = 0;
  deaths = {};
  firsts = {};
  maxGen = 0;
  nLessons = 0;
  over = false;
  sel = null;
  for (const L of LG) for (const k in L) delete L[k];
  for (const k in DL) delete DL[k];
  makeTerrain();
  updateClimate(); // again, now that the land has heights
  for (let i = 0; i < W * H; i++)
    // the world starts as an established landscape, with grass already grown where it can grow
    food[i] =
      rock[i] || pit[i]
        ? 0
        : water[i]
          ? rnd() * 0.5
          : (0.35 + rnd() * 0.5) * TF[ter[i]] * Math.min(1, growthAt(i) + 0.2);
  initWeather();
  initForest();
  initItems();
  initTalk();
  for (let i = 0; i < W * H; i++) food[i] *= 1 - 0.35 * tree[i]; // little grass grows in the shade of trees
  const n = clamp(cfg.people ?? 8, 2, 40), // early humans lived in small bands
    nh = clamp(cfg.herbivores ?? 20, 0, 40),
    np = clamp(cfg.predators ?? 6, 0, 12),
    nf = clamp(cfg.fish ?? 24, 0, 60),
    inst = true;
  NID = 0;
  spawn(0, n, inst);
  spawn(1, nh, inst);
  spawn(2, np, inst);
  spawn(3, nf, inst);
  const tally = (sp) =>
    KINDS.map((K, k) => [K, ag.filter((a) => a.k === k).length])
      .filter(([K, c]) => K.sp === sp && c)
      .map(([K, c]) => c + ' ' + (c > 1 ? plural(K.n) : K.n).toLowerCase())
      .join(', ');
  log(
    'The world begins with ' +
      n +
      ' adults (a small band); ' +
      (tally(1) || 'no plant-eaters') +
      '; ' +
      (tally(2) || 'no hunters') +
      '; and ' +
      nf +
      ' fish in the seas, lakes and rivers. There are mountains, forests, pits and bushes of red berries, some of them poisonous to eat. Every creature starts grown, with a blank mind and only what its kind is born with.'
  );
}
