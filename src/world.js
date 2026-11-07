// Genesis — Building a new world: terrain (see terrain.js), grass, weather, and the first creatures.
// Copyright (c) 2026 Malvika Sen. MIT License.

// cfg: {people, herbivores, predators, fish}
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
  for (let i = 0; i < W * H; i++)
    food[i] = rock[i] || pit[i] ? 0 : water[i] ? rnd() * 0.5 : rnd() * 0.6 * TF[ter[i]];
  initWeather();
  const n = clamp(cfg.people ?? 2, 2, 40),
    nh = clamp(cfg.herbivores ?? 14, 0, 40),
    np = clamp(cfg.predators ?? 3, 0, 8),
    nf = clamp(cfg.fish ?? 24, 0, 60),
    inst = true;
  NID = 0;
  spawn(0, n, inst);
  spawn(1, nh, inst);
  spawn(2, np, inst);
  spawn(3, nf, inst);
  log(
    'The world begins with ' +
      n +
      ' young people, ' +
      nh +
      ' young herbivores and ' +
      np +
      ' young predators (a small pack), and ' +
      nf +
      ' fish in the seas, lakes and rivers. There are mountains, pits and bushes of red berries, some of them poisonous to eat. Until they grow up, the world keeps them from starving.'
  );
}
