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
// A new world. Founders arrive knowing what their kind has always known — what to eat, what hurts, where danger is —
// but with no memory of where they came from (tools, fire and words are still to be discovered). They learn it the
// ordinary way, from what their bodies feel, in a practice before the world begins: the world is built from its seed
// and runs for a few years in which nobody can die (as children are kept alive by their mothers), then it is built
// again from the same seed, identical, and each founder keeps the brain it trained. Learned knowledge is never
// inherited, so every child is still born knowing nothing. cfg.practiceDays sets how long; it is 0 (off) by default
// everywhere — in a test it did not reduce hunger and drowning doubled (the owner, 12 Nov 2026); cfg.naive skips it.
function reset(cfg = {}) {
  const days = cfg.naive ? 0 : cfg.practiceDays ?? 0,
    seed = SEED;
  if (days > 0) {
    buildWorld(cfg);
    const founders = ag.slice();
    SOC.practice = true;
    for (let t = 0; t < days * DAY; t++) sim();
    SOC.practice = false;
    const learned = founders.map((a) => a.lw);
    SEED = seed;
    buildWorld(cfg);
    ag.forEach((a, i) => {
      if (learned[i] && learned[i].length === a.lw.length) a.lw = learned[i];
    });
    return;
  }
  buildWorld(cfg);
}
function buildWorld(cfg) {
  SEED2 = (SEED ^ 0x9e3779b9) | 0; // the separate stream for later traits (state.js)
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
  // cfg.africaAnimals is on — the default since the realism audit (gap 1, 14 Nov 2026), now that newcomers keep the hunters
  // from dying out (entry 39); --ice-animals restores the old animals. The balance of hunters to prey (about 90 kg of
  // each carnivore to 10,000 kg of prey: Carbone & Gittleman 2002); research log entry 24.
  for (let k = 1; k < KINDS.length; k++) {
    const K = ERA === 'hominin' && cfg.africaAnimals !== false && !cfg.iceAnimals && HKINDS[k] ? HKINDS[k] : ICE_KINDS[k];
    for (const key of Object.keys(KINDS[k])) delete KINDS[k][key];
    Object.assign(KINDS[k], JSON.parse(JSON.stringify(K)));
    const b = bioOf(KINDS[k]);
    for (const key of Object.keys(KBIO[k])) delete KBIO[k][key];
    Object.assign(KBIO[k], b);
  }
  if (ERA === 'hominin' && cfg.humanFertility) KBIO[0].fert = PERSON_BIO.fert; // the old rule, for comparison: fertility ends at 60% of life, as in people
  if (ERA === 'hominin' && cfg.fertMax !== undefined) KBIO[0].fertMax = Number(cfg.fertMax) * TY; // test the ends of its range (years)
  // Pair bonds (realism audit, gap 3): contested for 2.5 Ma hominins — body-size dimorphism read as human-like and pair-bonded
  // (Reno et al. 2003; Reno & Lovejoy 2015) or as ape-like (Gordon et al. 2008; Plavcan); females, not males, left their birth
  // group (Copeland et al. 2011), as in chimpanzees. Default: the chimpanzee stand-in, no pair bonds and no founding couples;
  // --hominin-pair-bonds restores lasting bonds, couples and helping fathers (the old rule). Modern people keep them.
  SOC.homPair = cfg.homininPairBonds === true;
  KBIO[0].pair = ERA === 'hominin' && !SOC.homPair ? 0 : 1;
  // How long infants nurse (realism audit, gap 9): early Homo about 3-4 years (Tacail et al. 2019); A. africanus mostly milk
  // for about a year, then on and off with the seasons (Joannes-Boyau et al. 2019); chimpanzees about 4. Default 4 years;
  // --nursing-years tests the shorter australopith end (nursing, the mother's pause in cycling, and being a "baby" scale together)
  if (ERA === 'hominin' && cfg.nursingYears !== undefined) {
    KBIO[0].cd = Number(cfg.nursingYears) * TY;
    KBIO[0].wn = Number(cfg.nursingYears) / (KBIO[0].mat / TY);
  }
  if (ERA === 'hominin' && cfg.leafValue !== undefined) KBIO[0].leaf = Number(cfg.leafValue); // test the ends of its range
  SOC.hungerFirst = cfg.oldHunger !== true; // off: hunger and thirst only add a pull, as other urges do (the old rule)
  SOC.hungerK = cfg.hungerPull === undefined ? 6 : Number(cfg.hungerPull); // how strongly need wins (an assumption; test the ends)
  SOC.peopleCap = !!cfg.peopleCap; // on: the old fixed cap on people stops mating (not biology: food, disease and fertility limit them)
  SOC.apeCare = cfg.humanCare !== true; // on: early hominins share care for children as human foragers do (the old rule)
  SOC.refeed = cfg.oldStarving !== true; // on: the old rule (a sudden jolt of discomfort below 15% energy, no refeeding signal)
  SOC.refeedAt = cfg.refeedAt === undefined ? 20 : Number(cfg.refeedAt); // the critical reserve, %: about 20 (80% of fat gone; evidence 20–25)
  SOC.momPull = cfg.motherPull !== false; // off: a mother goes to her child only when it cries (the old rule)
  SOC.cycle = cfg.cycle !== false; // on by default since 12 Nov 2026: with mating fixed it costs about 17% of births, as waiting for fertile days should (research log entry 38); --no-cycle turns it off
  SOC.mood = cfg.mood !== false; // off: no lasting mood (the old rule)
  SOC.oneMove = cfg.eightWalks !== true; // on: the eight directions count as eight separate choices (the old rule)
  SOC.fireWatch = cfg.fireWatching === true && cfg.noFireWatching !== true; // off by default (the owner, after entry 59): fire skill only from one's own practice; --fire-watching restores the built-in rule that watching fire work raises it
  SOC.brainCost = cfg.cheapBrain !== true; // the brain costs its real share of energy (off: the old, nearly free brain)
  SOC.brainF = cfg.brainShare ?? 0.1; // share of energy for a typical hominin brain (primates 0.08-0.10, people 0.20-0.25)
  SOC.carry = cfg.noCarrying !== true; // infants cling to and travel with their mother, and nurse in her square (off: the old rule)
  SOC.carryAge = cfg.carryAge ?? 2; // years carried (an assumption: constant contact to about 7 months; tested 0.6-4)
  SOC.walkE = cfg.freeWalking !== true; // walking costs energy by body weight (off: free on the flat, the old rule)
  SOC.walkJ = cfg.walkCost ?? 4; // net J per kg per m (people about 2, chimpanzees about 8: Sockol et al. 2007)
  SOC.hunterPreyMax = cfg.huntersAnyPrey !== true; // each hunter kind brings down plant-eaters only up to its prey size (off: any, the old rule)
  SOC.preyMaxX = cfg.preyMaxX ?? 1; // a multiple of the preferred upper bound (tested at 1 and 2: preferences are not hard limits)
  SOC.smallPrey = cfg.anyPrey !== true; // hominins bring down only small prey (off: any size, the old rule)
  SOC.maxPreyKg = cfg.maxPreyKg ?? 15; // the largest prey, kg (chimpanzees prefer 7.6 kg or less; young antelopes)
  SOC.marrow = cfg.noMarrow !== true; // bones hold marrow that a stone can crack open (off: none, the old rule)
  SOC.sedges = cfg.noSedges !== true; // sedge tubers at the edges of fresh water (off: none, the old rule)
  SOC.sedgeCap = cfg.sedgeCap ?? 0.5; // how much underground food a wet edge carries (an assumption: tested 0.25-0.8)
  SOC.africanNuts = cfg.oldNuts !== true; // nuts of warm open woodland among early hominins (off: oak, hazel, walnut rules)
  SOC.rootVal = cfg.rootValue ?? 80; // food from a bite of roots (fruit 70; an assumption: raw tubers are poor, sedge corms rich)
  SOC.voiceGenes = cfg.noVoiceGenes !== true; // vocal learning, pointing, shared-attention joy can evolve from ape-low (off: fixed at 0)
  SOC.fireMaking = cfg.noFireMaking !== true; // making fire is possible (an experiment against the record; off: only wildfire)
  SOC.founderElders = cfg.founderElders ?? 0.12; // share of founders who are elders (foragers about 0.12; fewer in early hominins, no number)
  SOC.growBodies = cfg.fixedBodies !== true; // hominin bodies grow with age and differ by sex (off: one body for all, the old rule)
  SOC.massF = cfg.femaleMass ?? 30; // adult female weight, kg (McHenry 1992: 29-30; tested at the ends)
  SOC.massM = cfg.maleMass ?? 42; // adult male weight, kg (McHenry 1992: 41-45; dimorphism 1.2-1.55 tested)
  SOC.swimLearn = cfg.noHomininSwimming !== true; // swimming can be learned by wading and deep water (off: never)
  SOC.swimWatch = cfg.swimWatching === true; // built-in rule: those near a swimmer pick swimming up (off by default since the realism audit)
  SOC.homFish = cfg.homininFishing === true; // hominins catch fish (off by default: no fish in hominin diets before about 1.95 Ma)
  SOC.hairy = cfg.furlessHominins !== true; // hominins of 2.5 Ma were still hairy: rain and heat as for furred animals (off: as for people, the old rule)
  SOC.hardNuts = cfg.easyNuts !== true; // a strike on a nut succeeds with a chance grown by own practice (off: every strike works, the old rule)
  SOC.nutP0 = cfg.nutBeginner ?? 0.02; // a beginner's chance a strike opens a nut (an assumption: tested at 0.005 and 0.10)
  SOC.nutCeil = 0.83; // an expert's chance (sourced per nut, applied per strike: Berdugo et al. 2024)
  SOC.nutG = 1 - Math.pow(0.2, 1 / (cfg.nutSessions ?? 500)); // strikes on nuts to reach 80% of the way to expert (an assumption: 150-1500)
  SOC.copyNuts = cfg.noNutCopying !== true; // a test switch: copying on, but nothing copied from a strike on a nut
  SOC.copying = cfg.noCopying !== true; // a test switch: with it, nobody copies anyone (no learning by watching at all)
  SOC.copyByResult = cfg.copyBySurprise !== true; // copy by what visibly came of the elder's choice (off: by its hidden surprise)
  SOC.copySeq = cfg.copySequence !== false; // youngsters watching learn from an elder's whole path to a good result (off: none)
  SOC.copyClose = cfg.copyFar !== true; // copy a choice only from an elder in the same square (off: from anyone in sight)
  SOC.copyWorked = cfg.copyMoves !== true; // copy what worked for the elder (off: copy whatever it is doing, the old rule)
  SOC.backReplay = cfg.backReplay !== false; // the path to a good surprise replayed backwards (off: none, the old rule)
  SOC.calmValue = cfg.boostedValue !== true; // the value estimate learns from good and bad surprises alike (off: the old rule)
  SOC.grassPull = cfg.oldPlantPull === true; // the hungry pull to try plants fires on grass too (the old rule)
  SOC.disease = cfg.disease !== false; // outbreaks of illness (off: no disease, the old rule)
  SOC.diseaseRate = cfg.diseaseRate ?? 1 / 7; // outbreaks a life-year (an assumption: tested at 1/7 and 1/20)
  OUTBREAK = 0;
  OUTBREAKS = 0;
  SOC.cycleChance = cfg.certainConception !== true; // not every cycle can conceive (off: conception certain in the fertile days, the old rule)
  SOC.conceive = cfg.conceive ?? 0.2; // chance a cycle is conceptive (an assumption from cycles-to-conception; tested at 0.2 and 0.1)
  SOC.nearPrey = cfg.huntersAnywhere !== true; // hunters start and arrive where their prey lives (off: anywhere that suits them, the old rule)
  SOC.preyRadius = cfg.preyRadius ?? 8; // squares within which a hunter's prey must live where it starts (an assumption)
  SOC.rescue = cfg.rescue !== false; // newcomers from the wider population when a hunter kind is rare (off: the old closed world)
  SOC.rescueRate = cfg.rescueRate ?? 1; // newcomers a life-year while rare (an assumption)
  SOC.newMating = cfg.oldMating !== true; // off: the old mating rule (B1, B7)
  SOC.maleWaitH = cfg.maleWait ?? 1; // hours before a male hominin can mate again (an assumption)
  SOC.vicarGene = cfg.oneSocialGene !== true; // off: one gene for copying and for feeling others' pain and fear (the old rule)
  SOC.temper = cfg.temperament !== false; // off: everyone equally fearful (the old rule)
  SOC.pcare = cfg.parentalCare !== false; // off: every parent equally moved by its own young's hunger (the old rule)
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
  LOGW.length = 0;
  LOGWHO = null;
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
  const n = clamp(cfg.people ?? 25, 2, 200), // a band or community: foragers' bands 20–40; chimpanzee communities about 30–80, Ngogo near 200
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
  // Extra founders for a fair comparison of community sizes (cfg.extraPeople): the world is built exactly as it would be
  // with the base band, then the extra founders join it from the separate random stream (state.js), beside the others.
  const extra = clamp(cfg.extraPeople ?? 0, 0, 175);
  if (extra > 0) {
    USE2 = true;
    const before = ag.length;
    spawn(0, extra, inst);
    const added = ag.slice(before).filter((a) => a.sp === 0),
      base = ag.slice(0, before).filter((a) => a.sp === 0),
      c = base[0] || added[0];
    for (const a of added) {
      for (let k = 0; k < 30; k++) {
        const x = (c.x + Math.round((rnd() - 0.5) * 8) + W) % W,
          y = clamp(c.y + Math.round((rnd() - 0.5) * 8), 0, H - 1);
        if (!water[idx(x, y)]) {
          a.x = x;
          a.y = y;
          break;
        }
      }
    }
    if (cfg.band !== false) makeBand(added);
    USE2 = false;
  }
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
function makeBand(ppl = ag.filter((a) => a.sp === 0)) {
  const n = ppl.length,
    S = ppl[0].S,
    // ages are set for modern foragers and scaled to the kind's own life history (early hominins grow up
    // and age faster), and nobody starts older than its own lifespan
    yr = TY * (S.mat / (12 * TY)),
    nE = Math.round(SOC.founderElders * n), // elders' share (foragers; old adults were rarer among early hominins: realism audit, gap 15)
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
  // couples (only for kinds that form pair bonds)
  for (let k = 0; k < (S.pair ? Math.min(women.length, men.length) : 0); k++) {
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
  for (const w of women)
    if (grans.length && rnd() < 0.5) {
      // the age groups overlap by a year, so the pick could be the woman herself or barely older (bug B26: about 5% of worlds
      // had a woman who was her own mother); a mother must be at least 15 years older
      const g = grans[(rnd() * grans.length) | 0];
      if (g !== w && g.age - w.age >= 15 * yr) w.mom = g;
    }
}
// modern people's biology as written in config.js, kept to restore it when a world of Homo sapiens is chosen
const PERSON_BIO = Object.assign({}, KBIO[0]);
// the ice-age animals as written in config.js, kept to restore them when a world without hominins is chosen
const ICE_KINDS = KINDS.map((k) => JSON.parse(JSON.stringify(k)));
