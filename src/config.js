// Genesis — World size, time scale, the brain's layout (senses in, actions out) and each species' biology.
// Copyright (c) 2026 Malvika Sen. MIT License.

const W = 128,
  H = 80,
  C = 11,
  DAY = 96,
  TY = 288,
  TF = [1, 0, 0.15],
  HCAP = 1.6,
  HG = 5;
const MV = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ],
  CP = ['east', 'south-east', 'south', 'south-west', 'west', 'north-west', 'north', 'north-east'];
const NCH = 16, // per direction: water, food, danger, herbivore, person, predator, mate, family, fish, red berries, the sea, a steep climb, trees, loose stones or sticks, nuts, fire
  NS = 8 * NCH,
  HB = NS,
  IB = NS + 4,
  NM = 8, // short-term memory: this many of the brain's own units are fed back in at the next step
  HEAR = IB + 27 + NM, // hearing: the cry, the scream and speech, how loud and from which way (3 inputs each)
  NSAY = 3,
  SPEECH = HEAR + 3 * NSAY, // and what the loudest word heard sounded like (12 acoustic cues; see voice.js)
  FIREIN = SPEECH + 12, // the warmth of a fire close by
  RET = FIREIN + 1, // raw vision (the experiment): for each of NRAY rays, red, green, blue and nearness
  NRAY = 12,
  FOODIN = RET + 4 * NRAY, // underfoot, people: the leaves of root plants; meat on a body
  NAC = 3, // animals' inborn calls: a wolf's howl, a big cat's roar, a plant-eater's alarm snort
  ACALL = FOODIN + 2, // hearing them: for each, how loud and from which way (3 inputs each)
  SEEPT = ACALL + 3 * NAC, // seeing others: someone close pointing (how clearly, which way), and where they are looking
  NI = SEEPT + 5, // IB + 18 cold; IB + 19 … 24 its hands and feet; IB + 25 heat; IB + 26 anger; memory; hearing
  NH = 64, // the most thinking units any brain can grow (see each kind's hmax)
  NA = 19, // what the body does
  NV = 43, // (34 for the voice, then 9 for pointing: not at all, or one of the eight ways)
  // and, at the same time, what the voice does: silent, cry, scream or speak, and how the mouth moves (voice.js)
  O3 = 0, // where the direct senses → choices connections start in a brain's array
  OI = NA * NI; // where the senses → thinking units connections start
const A_STAY = 8,
  A_EAT = 9,
  A_DRINK = 10,
  A_SLEEP = 11,
  A_MATE = 12,
  A_ATK = 13,
  A_GIVE = 14,
  A_TAKE = 15, // pick up a stone or stick from the ground
  A_DROP = 16, // put what is in the hand down
  A_STRIKE = 17, // hit something with what is in the hand
  A_CLIMB = 18, // climb a tree (or, up one, climb down): early hominins only
  GAM = 0.97,
  LAM = 0.8,
  AP = 0.01,
  AV = 0.03;
const SP = [
  {
    n: 'Person',
    fov: 200, // field of view in degrees (about 120° of it seen with both eyes)
    col: 3, // kinds of colour cone: people tell red from green
    cold: 14, // no fur: people feel cold below about 14 °C
    hot: 33, // and overheat above about 33 °C, though sweating lets them bear heat better than most
    nh: 16, // thinking units working at birth
    hmax: 64, // and the most it can grow by adulthood
    plast: 1.2,
    adl: 1,
    cur: 1.6,
    imit: 0.01,
    mem: 60,
    walk: 0.15,
    run: 0.15,
    dE: 7,
    dW: 4,
    mat: 12 * TY,
    smat: 16 * TY,
    circ: 1,
    life: 120 * TY,
    cd: 2.25 * TY, // after a birth: nursing (with a pregnancy of 0.75 years, births come about three years apart, as among foragers)
    gest: 0.75 * TY, // nine months
    lit: [1, 1],
    wn: 0.25,
    cap: 120,
    fert: 0.6,
    sleepH: 8,
    nv: 0.4,
    social: 0.3,
    fl: 0.8,
    leaf: 0, // leaves give modern people almost nothing (early hominins: HOMININ.leaf)
  },
  {
    n: 'Herbivore',
    fov: 310, // eyes on the sides of the head see almost all the way round
    col: 2, // red and green look alike
    cold: -10, // thick winter coat
    hot: 30,
    nh: 10,
    hmax: 16,
    plast: 1.2,
    adl: 0.5,
    cur: 0.3,
    imit: 0.004,
    mem: 4,
    walk: 0.06,
    run: 0.35,
    dE: 4,
    dW: 3,
    mat: 1.5 * TY,
    smat: 1.5 * TY,
    circ: 0.4,
    life: 12 * TY,
    cd: 0.45 * TY,
    gest: 0.55 * TY,
    lit: [3, 6],
    wn: 0.33,
    cap: 160,
    fert: 0.8,
    sleepH: 4,
    nv: 0.8,
    social: 0.15,
    fl: 1.5,
  },
  {
    n: 'Predator',
    fov: 250,
    col: 2,
    cold: -12, // thick fur
    hot: 28,
    nh: 12,
    hmax: 20,
    plast: 1.2,
    adl: 0.5,
    cur: 0.5,
    imit: 0.006,
    mem: 8,
    walk: 0.12,
    run: 0.45,
    dE: 3,
    dW: 3,
    mat: 4 * TY,
    smat: 4 * TY,
    circ: -0.6,
    life: 18 * TY,
    cd: 1.3 * TY,
    gest: 0.17 * TY, // about two months
    lit: [1, 4],
    wn: 0.4,
    cap: 24,
    fert: 0.9,
    sleepH: 11,
    nv: 1.1,
    social: 0.05,
    fl: 0,
  },
  {
    n: 'Fish',
    fov: 360,
    col: 4,
    cold: 0, // fish don't feel cold here
    hot: 99,
    nh: 6,
    hmax: 8,
    plast: 1,
    adl: 0.5,
    cur: 0.2,
    imit: 0,
    mem: 2,
    walk: 0.3,
    run: 0.6,
    dE: 4,
    dW: 0,
    mat: 0.5 * TY,
    smat: 0.8 * TY,
    circ: 0,
    life: 4 * TY,
    cd: 0.6 * TY,
    gest: 0.01 * TY, // eggs hatch within days
    yc: 1, // what each young costs its mother: an egg is cheap
    lit: [4, 10],
    wn: 0.2,
    cap: 140,
    fert: 0.9,
    sleepH: 6,
    nv: 0.7,
    social: 0.05,
    fl: 2,
  },
];

// Kinds of animal, each based on a real species that lived alongside early humans. A kind belongs to a
// role above (0 person, 1 plant-eater, 2 hunter, 3 fish) and changes that role's biology where the real
// animal differs. size: how big compared with a deer or a wolf (bigger prey is harder to bring down and
// feeds more). cap: how many the world can carry of it. share: its part of the starting numbers for its role. hab: where it starts — the range of
// yearly mean temperature (°C) and of tree cover it prefers.
const KINDS = [
  // pair: forms lasting pair bonds (people, and wolves, whose breeding pair stays together for years).
  // Deer, rabbits, bison, big cats and bears don't: their males leave after mating and don't raise young.
  { sp: 0, n: 'Person', share: 1, size: 1, pair: 1 },
  {
    sp: 1,
    n: 'Deer',
    mass: 70,
    cap: 60,
    swim: 0.9,
    share: 0.4,
    size: 1,
    lit: [1, 3],
    mat: 1.5 * TY,
    smat: 1.5 * TY,
    life: 14 * TY,
    cold: -15,
    browse: 1,
    hab: { t: [-8, 26], tree: [0.05, 0.7] },
  },
  {
    sp: 1,
    n: 'Rabbit',
    mass: 2,
    fov: 350,
    cap: 45,
    swim: 0.5,
    share: 0.25,
    size: 0.35,
    lit: [2, 5],
    mat: 0.5 * TY,
    smat: 0.5 * TY,
    life: 6 * TY,
    cd: 0.5 * TY,
    gest: 0.08 * TY, // about a month
    cold: -18,
    hot: 28,
    walk: 0.08,
    run: 0.5,
    hab: { t: [-10, 30], tree: [0, 0.4] },
  },
  {
    sp: 1,
    n: 'Bison',
    mass: 600,
    fov: 330,
    cap: 15,
    swim: 0.9,
    share: 0.35,
    size: 2.3,
    lit: [1, 1],
    mat: 3 * TY,
    smat: 3 * TY,
    life: 20 * TY,
    cd: 0.72 * TY,
    gest: 0.78 * TY, // about nine and a half months
    dW: 4,
    cold: -30,
    walk: 0.05,
    run: 0.3,
    hab: { t: [-15, 22], tree: [0, 0.2] },
  },
  {
    sp: 2,
    n: 'Wolf',
    cap: 10,
    swim: 0.9,
    share: 0.5,
    size: 1,
    lit: [3, 6],
    mat: 2 * TY,
    smat: 2 * TY,
    life: 13 * TY,
    cold: -30,
    pack: 1,
    pair: 1,
    hab: { t: [-20, 18], tree: [0, 1] },
  },
  {
    sp: 2,
    n: 'Big cat',
    fov: 200,
    nv: 1.3, // sees in light about six times dimmer than people need
    cap: 8,
    swim: 0.75,
    share: 0.3,
    size: 1.3,
    lit: [2, 3],
    mat: 3 * TY,
    smat: 3 * TY,
    life: 15 * TY,
    gest: 0.3 * TY, // about 110 days
    cold: 2,
    hot: 38, // big cats of warm lands bear heat well
    climb: 1,
    roar: 1,
    walk: 0.1,
    run: 0.55,
    hab: { t: [12, 32], tree: [0, 1] },
  },
  {
    sp: 2,
    n: 'Bear',
    fov: 210,
    cap: 6,
    swim: 0.95,
    share: 0.2,
    size: 2,
    lit: [1, 2],
    mat: 4 * TY,
    smat: 5 * TY,
    life: 25 * TY,
    gest: 0.6 * TY, // about seven months, born in the winter den
    cold: -35,
    hot: 25,
    omni: 1,
    climb: 1,
    dE: 3.5,
    run: 0.35,
    hab: { t: [-15, 15], tree: [0.25, 1] },
  },
  { sp: 3, n: 'Fish', share: 1, size: 1 },
];
// The biology of one kind: its role's, with the kind's own differences on top. For plant-eaters, how
// much they eat and how fast they burn their reserves follow body mass (Kleiber's law): food needed
// grows with mass^0.75, so a 600 kg bison eats far more grass than a deer and a 2 kg rabbit very
// little — but the rabbit's small body burns through its reserves faster (mass^-0.25 of its store a day).
function bioOf(k) {
  const b = Object.assign({}, SP[k.sp], k),
    r = (k.mass || 70) / 70; // compared with a deer
  b.hcap = HCAP; // grass it can eat in a day
  b.hg = HG; // energy (% of its store) from one unit of grass
  b.bite = 0.3; // grass in one bite
  if (k.sp === 1) {
    b.dE = SP[1].dE * r ** -0.25;
    b.hcap = HCAP * r ** 0.75;
    b.hg = HG / r;
    b.bite = 0.3 * r ** 0.75;
  }
  return b;
}
const KBIO = KINDS.map(bioOf);
const KDEF = [0, 1, 4, 7]; // the first kind of each role

// The animals of East Africa about 2.5 million years ago (patch 6 of docs/HOMININ-PLAN.md), each in the slot of the
// ice-age kind it replaces in the early-hominin world (world.js swaps them in). Life histories from the living
// species, or for the extinct sabre-tooth from a living cat of its size; docs/ASSUMPTIONS.md gives each source and
// range. look: whose drawing it borrows. climb: can climb a tree after a sleeper. roar: has a big cat's far-carrying
// call. allBreed: in a group that hunts together, every female breeds (hyena clans), not one (wolf packs).
const HKINDS = {
  // impala-like antelope (Aepyceros; bovids dominate the fossil sites): about 50 kg, one calf a year after about
  // 196–204 days, breeding from about 1.5, living to about 15
  1: { sp: 1, n: 'Antelope', look: 'Deer', mass: 50, cap: 60, swim: 0.9, share: 0.4, size: 0.85, lit: [1, 1], mat: 1.5 * TY, smat: 1.5 * TY, life: 15 * TY, gest: 0.55 * TY, cd: 0.45 * TY, cold: 5, hot: 38, browse: 1, hab: { t: [16, 32], tree: [0.05, 0.6] } },
  // scrub hare (Lepus saxatilis): about 2 kg, 1–3 young after about 42 days, two to four litters a year
  2: { sp: 1, n: 'Hare', look: 'Rabbit', mass: 2, fov: 350, cap: 45, swim: 0.5, share: 0.25, size: 0.35, lit: [1, 3], mat: 0.5 * TY, smat: 0.5 * TY, life: 5 * TY, gest: 0.115 * TY, cd: 0.2 * TY, cold: 0, hot: 36, walk: 0.08, run: 0.5, hab: { t: [12, 32], tree: [0, 0.4] } },
  // a buffalo-like large bovid (the Pelorovis–Syncerus lineage): about 600 kg, one calf after about 340 days,
  // first calving at about 5, calves about 13–18 months apart, living to about 20
  3: { sp: 1, n: 'Buffalo', look: 'Bison', mass: 600, fov: 330, cap: 15, swim: 0.9, share: 0.35, size: 2.3, lit: [1, 1], mat: 4 * TY, smat: 4 * TY, life: 20 * TY, gest: 0.93 * TY, cd: 0.4 * TY, dW: 4, cold: 0, hot: 34, walk: 0.05, run: 0.3, hab: { t: [15, 32], tree: [0, 0.45] } },
  // spotted hyena (Crocuta): hunts in clans and scavenges, cannot climb; about 110 days' pregnancy, usually twins,
  // first births at about 3–5, a litter every 11–21 months, living to about 20; every female breeds
  4: { sp: 2, n: 'Hyena', look: 'Wolf', cap: 10, swim: 0.85, share: 0.5, size: 1.1, lit: [1, 3], mat: 2 * TY, smat: 3.5 * TY, life: 20 * TY, gest: 0.3 * TY, cd: 1 * TY, nv: 1.2, cold: 0, hot: 40, pack: 1, allBreed: 1, hab: { t: [12, 32], tree: [0, 0.6] } },
  // leopard: climbs, and takes primates (the Swartkrans skull SK 54); about 90–106 days' pregnancy, 1–3 cubs,
  // first births at about 3, 15–24 months apart, living to about 15 in the wild
  5: { sp: 2, n: 'Leopard', look: 'Big cat', fov: 200, nv: 1.3, cap: 8, swim: 0.75, share: 0.3, size: 1, lit: [1, 3], mat: 2 * TY, smat: 3 * TY, life: 15 * TY, gest: 0.27 * TY, cd: 1.3 * TY, cold: 2, hot: 38, walk: 0.1, run: 0.55, climb: 1, roar: 1, hab: { t: [10, 32], tree: [0, 1] } },
  // sabre-toothed cat (Megantereon, about 100 kg; in East Africa about 3.5–1.4 million years ago): extinct, so its
  // life history is a living cat's of its size (jaguar, lioness); probably a climber (an assumption)
  6: { sp: 2, n: 'Sabre-tooth', look: 'Big cat', fov: 200, nv: 1.3, cap: 6, swim: 0.75, share: 0.2, size: 1.8, lit: [1, 4], mat: 2.5 * TY, smat: 3.5 * TY, life: 15 * TY, gest: 0.3 * TY, cd: 1.7 * TY, cold: 2, hot: 38, walk: 0.1, run: 0.5, climb: 1, hab: { t: [12, 32], tree: [0.1, 1] } },
};

// Early hominins of about 2.5 million years ago (late australopiths and the earliest Homo): where their
// bodies and lives differ from modern people's (the default world; world.js applies it). From the evidence
// where there is some (docs/ASSUMPTIONS.md lists each number, its source or that it is our assumption):
// - body about 30–50 kg and 1.2–1.5 m (australopiths), the earliest Homo no bigger (Grabowski et al. 2015):
//   about three-quarters of a forager's size, which also makes them weaker against a hunter;
// - teeth grew at least as fast as a chimpanzee's (Kelley & Schwartz 2012; Smith et al. 2015), so growth,
//   weaning and births follow wild chimpanzees: pregnancy about 225–230 days, first births at about 14,
//   births about 4.6 years apart (Mahale), weaned at about 4, a shorter life (life expectancy at birth
//   about 33 even in the best-off community, Ngogo: Wood et al. 2017);
// - still hairy (hair loss is dated to about 1.2 million years ago from skin-colour genes, likely with Homo
//   erectus), so they feel the cold later and the heat sooner than people — the thresholds are assumptions;
// - the brain about a third of ours (420–550 cm³ against about 1,350), and smaller at birth (about 40% of
//   adult in chimpanzees, under 30% in people): how big is inherited and can evolve (creatures.js).
const HOMININ = {
  size: 0.75,
  cold: 9,
  hot: 31,
  mat: 10 * TY,
  smat: 14 * TY,
  life: 60 * TY,
  gest: 0.62 * TY,
  cd: 4 * TY,
  wn: 0.4,
  nh: 8,
  // Leaves: like chimpanzees, they can live on young leaves when fruit is short — less food a minute than
  // ripe fruit (Kibale chimpanzees: 7.8 against 12.2 kcal a minute, Uwimbabazi et al. 2016; 4.7 against 9.7
  // if fibre is not fermented, so 0.48–0.64). Modern people's shorter colon gets little from leaves.
  leaf: 0.64,
  // Fertility: wild chimpanzees have no menopause — fertility fades with the body's ageing, about half of
  // the females who live past 40 give birth again, the oldest known wild mother was about 55 (Emery Thompson
  // et al. 2007, six populations, 534 births). Fertility does fall from 25–35 and approaches zero at about 50,
  // but mostly through failing health (healthy females: about 20% fewer births after 35). So a hominin can
  // have young until the end of its own life, but not past about 50 (range 45–55; people: until about 60% of
  // life, around 50). Ill health stopping conception is partly here (a starving body does not conceive); the
  // 20% fall after 35 is not modelled.
  fert: 1,
  fertMax: 50 * TY,
};
