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
  // switches for experiments: learning from others' pain, and choosy copying (both on normally)
  SOC.vic = cfg.vicar !== false;
  SOC.pick = cfg.pickyCopy !== false;
  SOC.sound = cfg.soundPhysics !== false; // off: the old rule (heard within 2.2 squares, fading evenly)
  SOC.calls = cfg.animalCalls !== false;
  SOC.modern = !!cfg.modernVoice; // the experiment: give everyone a modern human voice from the start
  SOC.earth = !!cfg.earth; // the real Earth's land and sea, 70,000 years ago (see earth.js), or a made-up planet
  ERA = cfg.sapiens || cfg.scenario === 'sapiens' ? 'sapiens' : 'hominin'; // which world (state.js)
  // their bodies and lives: modern people's, or early hominins' (config.js)
  Object.assign(KBIO[0], PERSON_BIO, ERA === 'hominin' ? HOMININ : {});
  // the animals: the ice-age ones by default; those of East Africa 2.5 million years ago among hominins when
  // cfg.africaAnimals is on. Off by default until the balance of hunters to prey follows the evidence (about 90 kg of
  // each carnivore to 10,000 kg of prey: Carbone & Gittleman 2002); research log entry 24.
  for (let k = 1; k < KINDS.length; k++) {
    const K = ERA === 'hominin' && cfg.africaAnimals && HKINDS[k] ? HKINDS[k] : ICE_KINDS[k];
    for (const key of Object.keys(KINDS[k])) delete KINDS[k][key];
    Object.assign(KINDS[k], JSON.parse(JSON.stringify(K)));
    const b = bioOf(KINDS[k]);
    for (const key of Object.keys(KBIO[k])) delete KBIO[k][key];
    Object.assign(KBIO[k], b);
  }
  if (ERA === 'hominin' && cfg.humanFertility) KBIO[0].fert = PERSON_BIO.fert; // the old rule, for comparison: fertility ends at 60% of life, as in people
  if (ERA === 'hominin' && cfg.fertMax !== undefined) KBIO[0].fertMax = Number(cfg.fertMax) * TY; // test the ends of its range (years)
  if (ERA === 'hominin' && cfg.leafValue !== undefined) KBIO[0].leaf = Number(cfg.leafValue); // test the ends of its range
  SOC.flight = cfg.oldFlight !== true; // off: hominins only walk away from a hunter they see (the old rule)
  SOC.kleiber = cfg.bodyScaling !== false; // off: hominins need as much food as a full-sized forager (the old rule)
  SOC.grassEye = !!cfg.grassEye; // on: people and hominins see grass as food (the old rule, for comparison)
  SOC.loss = cfg.lossResume !== false; // off: a mother who loses her baby waits the full nursing time anyway (the old rule)
  SOC.resume = (cfg.resumeDays === undefined ? 74 : Number(cfg.resumeDays)) / 365; // days until she can conceive again (45–94)
  SOC.lust = cfg.lust === undefined ? 2 : Number(cfg.lust); // inborn pull toward a ready partner (research log entry 20: tested at 1 and 3)
  SOC.leaves = cfg.leaves !== false; // off: early hominins get nothing from leaves, as modern people (for comparison)
  SOC.trees = cfg.trees !== false; // off: early hominins sleep on the ground (for comparison)
  SOC.shield = !!cfg.shield; // on: the old rule that predators cannot take the founding generation's young
  SOC.shelter = cfg.shelter !== false; // off: branches cannot be heaped up into a shelter (the old world)
  SOC.care = cfg.care !== false; // off: only parents and grandmothers feed a child, and children are not drawn to stay close
  SOC.home = cfg.homeland !== false; // off: the band starts anywhere warm enough near fresh water (the old rule)
  food = new Float32Array(W * H);
  ag = [];
  tick = 0;
  updateClimate();
  hist = [];
  logs = [];
  events = [];
  SIBS = [];
  kills = [0, 0, 0, 0];
  fished = 0;
  deaths = {};
  firsts = {};
  maxGen = 0;
  nLessons = 0;
  over = false;
  sel = null;
  RETINA = !!cfg.retina;
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
  // On the real Earth the rains, not a rule of thumb by latitude, decide where forests and deserts are:
  // let the weather run for a year first (the Sahara dries, the Congo stays wet), and grow the land
  // from what that year was like.
  MOISTY = null;
  if (SOC.earth) {
    tree = null;
    const m = new Float32Array(W * H);
    for (let k = 0; k < 3 * TY; k++) {
      tick++;
      updateClimate();
      updateWeather();
      if (k >= 2 * TY) for (let i = 0; i < W * H; i++) m[i] += MOIST[i] / TY;
    }
    tick = 0;
    updateClimate();
    MOISTY = m;
    for (let i = 0; i < W * H; i++)
      if (!water[i] && ter[i] === 0 && m[i] < DRYLAND && alt[i] < 1.2 && meanTemp(i) > 8) {
        ter[i] = 1; // desert: sand and bare ground
        food[i] *= 0.3;
      }
  }
  initForest();
  initItems();
  initTalk();
  initFire();
  for (let i = 0; i < W * H; i++) food[i] *= 1 - 0.35 * tree[i]; // little grass grows in the shade of trees
  const n = clamp(cfg.people ?? 25, 2, 40), // a band: foragers lived in groups of about 20–40
    nh = clamp(cfg.herbivores ?? 20, 0, 40),
    np = clamp(cfg.predators ?? 6, 0, 12),
    nf = clamp(cfg.fish ?? 24, 0, 60),
    inst = true;
  NID = 0;
  spawn(0, n, inst);
  if (cfg.band !== false) makeBand();
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
      (cfg.band !== false ? ' people, a band of families of all ages; ' : ' adults (a small band); ') +
      (tally(1) || 'no plant-eaters') +
      '; ' +
      (tally(2) || 'no hunters') +
      '; and ' +
      nf +
      ' fish in the seas, lakes and rivers. There are mountains, forests, pits and bushes of red berries, some of them poisonous to eat. Every creature starts with a blank mind and only what its kind is born with.'
  );
}

// The first people are a band, as foragers lived: families of all ages — about a third children, a few
// teenagers, adults in couples, and a few elders — rather than a handful of young adults alone (Kelly
// 2013; bands of 20–40, rarely fewer than two or three families). Each child has its mother in the
// band. Their minds are as blank as everyone's; only their bodies' ages differ.
function makeBand() {
  const ppl = ag.filter((a) => a.sp === 0),
    n = ppl.length,
    S = ppl[0].S,
    // ages are set for modern foragers and scaled to the kind's own life history (early hominins grow up
    // and age faster), and nobody starts older than its own lifespan
    yr = TY * (S.mat / (12 * TY)),
    nE = Math.round(0.12 * n),
    nC = Math.round(0.32 * n),
    nT = Math.round(0.12 * n);
  ppl.forEach((a, j) => {
    a.age =
      j < nE
        ? Math.round((45 + rnd() * 15) * yr)
        : j < nE + nC
          ? Math.round((1 + rnd() * 10.5) * yr)
          : j < nE + nC + nT
            ? Math.round((12 + rnd() * 5) * yr)
            : Math.round((18 + rnd() * 22) * yr);
    a.age = Math.min(a.age, Math.round(a.lf - 2 * TY));
    a.nh = grownUnits(a);
    a.found = true;
  });
  const women = ppl.filter((a) => a.sex && a.age >= 18 * yr && a.age < 46 * yr),
    men = ppl.filter((a) => !a.sex && a.age >= 18 * yr && a.age < 60 * yr);
  // couples
  for (let k = 0; k < Math.min(women.length, men.length); k++) {
    const w = women[k],
      m = men[k];
    w.bonds = [{ o: m, s: 0.7 }];
    m.bonds = [{ o: w, s: 0.7 }];
    w.mate = m;
    m.mate = w;
  }
  // every child and teenager belongs to a mother old enough to be theirs
  for (const c of ppl.filter((a) => a.age < 18 * yr)) {
    const ok = women.filter((w) => w.age - c.age >= 15 * yr);
    const mo = ok.length ? ok[(rnd() * ok.length) | 0] : null;
    if (!mo) continue;
    c.mom = mo;
    if (!mo.kid || mo.kid.age > c.age) mo.kid = c;
    c.x = mo.x;
    c.y = mo.y;
    c.bond = 0.6;
    c.metAny = true; // it has known its mother all its life
  }
  // a few elders are mothers of the adults: grandmothers of the children
  const grans = ppl.filter((a) => a.sex && a.age >= 45 * yr);
  for (const w of women) if (grans.length && rnd() < 0.5) w.mom = grans[(rnd() * grans.length) | 0];
}
// modern people's biology as written in config.js, kept to restore it when a world of Homo sapiens is chosen
const PERSON_BIO = Object.assign({}, KBIO[0]);
// the ice-age animals as written in config.js, kept to restore them when a world without hominins is chosen
const ICE_KINDS = KINDS.map((k) => JSON.parse(JSON.stringify(k)));
