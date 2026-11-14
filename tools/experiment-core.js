// The heart of a Genesis experiment, shared by the command-line runner (tools/experiment.js) and the
// Lab page in the browser (lab.html): what an experiment's settings are, how one seeded world is run and
// measured, and how the results are written. Both run exactly this code, so a table made in the browser
// and one made on the command line agree.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

(function (root, make) {
  if (typeof module === 'object' && module.exports) module.exports = make();
  else root.GenesisExperiment = make();
})(typeof self !== 'undefined' ? self : this, function () {
  // the things that can happen once, in a world, and that an experiment will want to date
  const MILESTONES = [
    'take', // first picks something up
    'nut', // cracks a nut with a stone
    'flake', // knocks a sharp flake off a stone
    'root', // digs up a root
    'dig', // digs with a stick
    'meat', // eats meat from a body
    'butcher', // cuts meat with a sharp stone
    'hunt', // brings down a land animal
    'cooked', // eats food cooked by a wildfire
    'brand', // takes up a burning stick
    'setfire', // drops a burning stick, and fire takes hold
    'fed', // feeds a fire
    'kept', // keeps a fire going for hours
    'madefire', // makes fire with sparks
    'rubfire', // makes fire with wood
    'share', // gives food to another
    'vicar', // someone is afraid after seeing another person hurt
    'swim', // someone learns to swim
    'point', // someone points
    'joint', // someone goes the way another pointed (shared attention)
    'speak', // someone first says a word of its own making
    'shared', // three people say the same word: the first shared word
    'shelter', // someone sleeps in a heap of branches carried together
  ];
  // the same, in words, for the Lab page
  const MILESTONE_NAMES = {
    take: 'picks something up',
    nut: 'cracks a nut with a stone',
    flake: 'knocks a sharp flake off a stone',
    root: 'digs up a root',
    dig: 'digs with a stick',
    meat: 'eats meat from a body',
    butcher: 'cuts meat with a sharp stone',
    hunt: 'brings down a land animal',
    cooked: 'eats food cooked by a wildfire',
    brand: 'takes up a burning stick',
    setfire: 'starts a fire with a burning stick',
    fed: 'feeds a fire',
    kept: 'keeps a fire going for hours',
    madefire: 'makes fire with sparks',
    rubfire: 'makes fire with wood',
    share: 'gives food to another',
    vicar: 'learns fear from seeing another hurt',
    swim: 'learns to swim',
    point: 'points',
    joint: 'goes where another pointed',
    speak: 'says a word of their own',
    shared: 'three people share a word',
    shelter: 'sleeps in a shelter of piled branches',
  };
  const CAUSES = [
    'hunger',
    'thirst',
    'killed by a predator',
    'drowned',
    'burned',
    'its wounds',
    'old age',
    'struck by lightning',
    'giving birth',
    'illness',
  ];

  // Every setting an experiment can change, with its default, its command-line switch and its meaning.
  // kind: 'num' (a number), 'on' (a switch that turns something on), 'off' (a switch that turns
  // something normally on, off).
  const SETTINGS = [
    { key: 'days', kind: 'num', def: 60, flag: 'days', label: 'Days to run each world', min: 1, max: 2000 },
    { key: 'people', kind: 'num', def: 25, flag: 'people', label: 'People at the start', min: 0, max: 200, cfg: true },
    { key: 'herbivores', kind: 'num', def: 20, flag: 'herbivores', label: 'Plant-eaters', min: 0, max: 200, cfg: true },
    { key: 'predators', kind: 'num', def: 6, flag: 'predators', label: 'Predators', min: 0, max: 100, cfg: true },
    { key: 'fish', kind: 'num', def: 24, flag: 'fish', label: 'Fish', min: 0, max: 200, cfg: true },
    { key: 'brain', kind: 'num', def: 64, flag: 'brain', label: 'Most thinking units in a person’s brain', min: 16, max: 2048 },
    { key: 'sapiens', kind: 'on', def: false, flag: 'sapiens', label: 'Homo sapiens 70,000 years ago, without culture (otherwise early hominins, 2.5 million years ago)', cfg: true },
    { key: 'earth', kind: 'on', def: false, flag: 'earth', label: 'The real Earth, 70,000 years ago (otherwise a made-up planet)', cfg: true },
    { key: 'homeland', kind: 'off', def: true, flag: 'any-start', label: 'The band starts where our species lived (off: anywhere warm near water, the old rule)', cfg: true },
    { key: 'trees', kind: 'off', def: true, flag: 'no-trees', label: 'Early hominins sleep up in trees (off: on the ground)', cfg: true },
    { key: 'humanFertility', kind: 'on', def: false, flag: 'human-fertility', label: 'Early hominins stop being fertile at 60% of their life, as people do (the old rule; otherwise fertile for life, as chimpanzees)', cfg: true },
    { key: 'fertMax', kind: 'num', def: 50, flag: 'fert-max', label: 'Early hominins: oldest age to conceive, in years (evidence: about 50; range 45–55)', min: 20, max: 80, cfg: true },
    { key: 'oldFlight', kind: 'on', def: false, flag: 'old-flight', label: 'Afraid hominins only walk away from a hunter they see (the old rule): no making for cover, no climbing away', cfg: true },
    { key: 'iceAnimals', kind: 'on', def: false, flag: 'ice-animals', label: 'Ice-age animals (deer, rabbits, bison, wolves, big cats, bears) instead of those of East Africa 2.5 million years ago (the old rule)', cfg: true },
    { key: 'bodyScaling', kind: 'off', def: true, flag: 'no-body-scaling', label: 'Smaller bodies need less food (Kleiber’s law; off: hominins eat as much as a full-sized forager)', cfg: true },
    { key: 'grassEye', kind: 'on', def: false, flag: 'grass-looks-like-food', label: 'People and hominins see grass as food, though they cannot digest it (the old rule)', cfg: true },
    { key: 'lossResume', kind: 'off', def: true, flag: 'no-loss-resume', label: 'A mother who loses a nursing baby can conceive again soon (off: she waits the full nursing time)', cfg: true },
    { key: 'resumeDays', kind: 'num', def: 74, flag: 'resume-days', label: 'Days after losing a nursing baby until a mother can conceive (evidence: 45–94)', min: 0, max: 2000, cfg: true },
    { key: 'extraPeople', kind: 'num', def: 0, flag: 'extra-people', label: 'Extra founders who join the same world (for a fair comparison of community sizes)', min: 0, max: 175, cfg: true },
    { key: 'peopleCap', kind: 'on', def: false, flag: 'people-cap', label: 'The old fixed cap on the number of people stops mating (not biology)', cfg: true },
    { key: 'humanCare', kind: 'on', def: false, flag: 'human-care', label: 'Early hominins feed others’ children as human foragers do (the old rule); otherwise as apes: only a mother feeds her own', cfg: true },
    { key: 'oldStarving', kind: 'on', def: false, flag: 'old-starving', label: 'Starving: a sudden jolt of discomfort below 15% energy (the old rule); otherwise hunger is felt smoothly and below a critical reserve the urge to search for food doubles (the refeeding signal)', cfg: true },
    { key: 'refeedAt', kind: 'num', def: 20, flag: 'refeed-at', label: 'Critical reserve for the refeeding signal, % of energy (evidence: about 20, range 20–25)', min: 0, max: 60, cfg: true },
    { key: 'motherPull', kind: 'off', def: true, flag: 'no-mother-pull', label: 'A mother is drawn to keep her nursing child near, as strongly as her inherited care (off: only to its cry)', cfg: true },
    { key: 'cycle', kind: 'off', def: true, flag: 'no-cycle', label: 'Females have a cycle: receptive about 13 of 36 days, fertile only near ovulation (on since entry 38; off: every mating can conceive)', cfg: true },
    { key: 'mood', kind: 'off', def: true, flag: 'no-mood', label: 'A lasting mood (the running average of recent surprises) colours how outcomes feel (off: none)', cfg: true },
    { key: 'eightWalks', kind: 'on', def: false, flag: 'eight-walks', label: 'The eight directions count as eight separate choices, so an undecided brain mostly walks (the old rule)', cfg: true },
    { key: 'fireWatching', kind: 'on', def: false, flag: 'fire-watching', label: 'The old built-in rule: watching someone work at fire raises the watcher\'s fire skill (off by default since entry 61)', cfg: true },
    { key: 'noFireWatching', kind: 'on', def: false, flag: 'no-fire-watching', label: 'No fire watching (now the default; kept so older commands still run)', cfg: true },
    { key: 'huntersAnyPrey', kind: 'on', def: false, flag: 'hunters-any-prey', label: 'Hunters can bring down plant-eaters of any size, even adult buffalo (the old rule)', cfg: true },
    { key: 'hardPreyLimit', kind: 'on', def: false, flag: 'hard-prey-limit', label: 'Hunters never bring down or wound prey above their preferred size (entry 64; otherwise they may try, rarely succeed, and big prey fights back)', cfg: true },
    { key: 'bigPreyFalloff', kind: 'num', def: 2, flag: 'big-prey-falloff', label: 'How steeply a hunter\'s success falls above its preferred prey size (an assumption: 1-3)', min: 0, max: 6, cfg: true },
    { key: 'preyMaxX', kind: 'num', def: 1, flag: 'prey-max-x', label: "Largest prey a hunter takes, as a multiple of the top of its preferred range (1-2)", min: 0.5, max: 4, cfg: true },
    { key: 'anyPrey', kind: 'on', def: false, flag: 'any-prey', label: 'Hominins can bring down prey of any size (the old rule; chimpanzees take prey of about 8 kg or less)', cfg: true },
    { key: 'maxPreyKg', kind: 'num', def: 15, flag: 'max-prey-kg', label: 'Largest prey a hominin can bring down, kg (an assumption from chimpanzees)', min: 1, max: 100, cfg: true },
    { key: 'noMarrow', kind: 'on', def: false, flag: 'no-marrow', label: 'No marrow in bones (the old rule)', cfg: true },
    { key: 'noSedges', kind: 'on', def: false, flag: 'no-sedges', label: 'No sedge tubers at the water\'s edge (the old rule)', cfg: true },
    { key: 'sedgeCap', kind: 'num', def: 0.5, flag: 'sedge-cap', label: 'Underground food at a wet edge (an assumption)', min: 0, max: 1, cfg: true },
    { key: 'oldNuts', kind: 'on', def: false, flag: 'old-nuts', label: 'Nuts grow by the old oak, hazel and walnut rules (otherwise in warm open woodland)', cfg: true },
    { key: 'rootValue', kind: 'num', def: 80, flag: 'root-value', label: 'Food from a bite of roots and tubers (fruit is 70; an assumption)', min: 10, max: 150, cfg: true },
    { key: 'noVoiceGenes', kind: 'on', def: false, flag: 'no-voice-genes', label: 'Vocal learning, pointing and the joy of shared attention fixed at zero (a test: otherwise they start ape-low and can evolve)', cfg: true },
    { key: 'flakeInHandCuts', kind: 'on', def: false, flag: 'flake-in-hand-cuts', label: 'Holding a flake while eating cuts meat by itself (the old rule); otherwise cutting is a strike with the flake on the carcass', cfg: true },
    { key: 'cutKg', kind: 'num', def: 0.75, flag: 'cut-kg', label: 'Meat a flake cuts off the bone in 15 minutes, kg (an assumption: 0.4-1.5)', min: 0.1, max: 4, cfg: true },
    { key: 'wholeBodyMeat', kind: 'on', def: false, flag: 'whole-body-meat', label: 'The whole body counts as meat (the old rule); otherwise only the edible flesh, about half', cfg: true },
    { key: 'fleshShare', kind: 'num', def: 0.5, flag: 'flesh-share', label: 'Edible flesh as a share of body weight (0.44-0.58)', min: 0.2, max: 1, cfg: true },
    { key: 'oneRotRate', kind: 'on', def: false, flag: 'one-rot-rate', label: 'Every carcass rots at the same rate whatever its size (the old rule); otherwise bigger ones more slowly (pig studies, 20-90 kg)', cfg: true },
    { key: 'marrowUnits', kind: 'on', def: false, flag: 'marrow-units', label: 'Marrow as 0.15 of the meat, at the value of meat (the old rule); otherwise in kg (0.25% of body weight) with its real energy', cfg: true },
    { key: 'marrowShareKg', kind: 'num', def: 0.0025, flag: 'marrow-share', label: 'Marrow as a share of body weight (0.0022-0.0037)', min: 0, max: 0.02, cfg: true },
    { key: 'fixedStickDryness', kind: 'on', def: false, flag: 'fixed-stick-dryness', label: 'Fallen sticks are always 85% dry unless it is raining (the old rule); otherwise they follow the humidity of the air', cfg: true },
    { key: 'brandAlwaysLights', kind: 'on', def: false, flag: 'brand-always-lights', label: 'A dropped burning stick always lights the ground (the old rule); otherwise as the fuel\'s dryness allows', cfg: true },
    { key: 'oldFireLinks', kind: 'on', def: false, flag: 'old-fire-links', label: 'The old false links: striking pyrite or banging sticks trains a hidden fire skill and is rewarded (entry 77; otherwise sparks fly and a blow is a blow)', cfg: true },
    { key: 'fireMaking', kind: 'on', def: false, flag: 'fire-making', label: 'Hominins can make fire by rubbing wood or striking pyrite (an experiment against the record; off by default since entry 77)', cfg: true },
    { key: 'noFireMaking', kind: 'on', def: false, flag: 'no-fire-making', label: 'Nobody can make fire, only use wildfire (the record: no fire-making until about 400,000 years ago)', cfg: true },
    { key: 'founderElders', kind: 'num', def: 0.12, flag: 'founder-elders', label: 'Share of the founding band who are elders (foragers about 0.12; old adults were rarer among early hominins)', min: 0, max: 0.3, cfg: true },
    { key: 'nursingYears', kind: 'num', def: 4, flag: 'nursing-years', label: 'Years an infant nurses (early Homo about 3-4; Australopithecus mostly milk for about one)', min: 0.5, max: 6, cfg: true },
    { key: 'cheapBrain', kind: 'on', def: false, flag: 'cheap-brain', label: 'The brain costs almost nothing (the old rule)', cfg: true },
    { key: 'brainShare', kind: 'num', def: 0.1, flag: 'brain-share', label: "Share of a hominin's energy its brain uses (other primates 0.08-0.10, people 0.20-0.25)", min: 0, max: 0.5, cfg: true },
    { key: 'noCarrying', kind: 'on', def: false, flag: 'no-carrying', label: 'Infants are not carried and nurse from up to 18 km away (the old rule)', cfg: true },
    { key: 'carryAge', kind: 'num', def: 2, flag: 'carry-age', label: 'Years an infant is carried by its mother (chimpanzees: constant contact to about 7 months, travel with her for years)', min: 0, max: 6, cfg: true },
    { key: 'freeWalking', kind: 'on', def: false, flag: 'free-walking', label: 'Walking on the flat costs no energy (the old rule)', cfg: true },
    { key: 'walkCost', kind: 'num', def: 4, flag: 'walk-cost', label: 'Energy to walk, J per kg per metre (people about 2, chimpanzees about 8)', min: 0, max: 12, cfg: true },
    { key: 'fixedBodies', kind: 'on', def: false, flag: 'fixed-bodies', label: 'One body for every hominin, whatever its age or sex (the old rule; otherwise bodies grow, and males are heavier)', cfg: true },
    { key: 'femaleMass', kind: 'num', def: 30, flag: 'female-mass', label: 'Adult female hominin weight, kg (fossils: about 29-30)', min: 15, max: 60, cfg: true },
    { key: 'maleMass', kind: 'num', def: 42, flag: 'male-mass', label: 'Adult male hominin weight, kg (fossils: about 41-45)', min: 15, max: 80, cfg: true },
    { key: 'homininPairBonds', kind: 'on', def: false, flag: 'hominin-pair-bonds', label: 'Early hominins form lasting pair bonds, start in couples, and fathers help (the old rule; contested for 2.5 million years ago)', cfg: true },
    { key: 'noHomininSwimming', kind: 'on', def: false, flag: 'no-hominin-swimming', label: 'Hominins can never learn to swim (apes generally cannot)', cfg: true },
    { key: 'swimWatching', kind: 'on', def: false, flag: 'swim-watching', label: 'The old built-in rule: being near a swimmer teaches swimming (off by default since the realism audit)', cfg: true },
    { key: 'homininFishing', kind: 'on', def: false, flag: 'hominin-fishing', label: 'Hominins catch fish (the old rule; the first evidence of fish in hominin diets is 1.95 million years ago)', cfg: true },
    { key: 'furlessHominins', kind: 'on', def: false, flag: 'furless-hominins', label: 'Hominins sweat and feel rain as furless people do (the old rule; otherwise still hairy, as at 2.5 million years ago)', cfg: true },
    { key: 'easyNuts', kind: 'on', def: false, flag: 'easy-nuts', label: 'Every strike with a stone on a nut opens it (the old rule; otherwise cracking nuts takes years of practice)', cfg: true },
    { key: 'nutBeginner', kind: 'num', def: 0.02, flag: 'nut-beginner', label: "A beginner's chance that a strike opens a nut", min: 0, max: 0.83, cfg: true },
    { key: 'nutSessions', kind: 'num', def: 500, flag: 'nut-sessions', label: 'Strikes on nuts to get 80% of the way to an expert', min: 10, max: 10000, cfg: true },
    { key: 'noNutCopying', kind: 'on', def: false, flag: 'no-nut-copying', label: 'Copying on, but nothing is copied from a strike on a nut (a test switch)', cfg: true },
    { key: 'noCopying', kind: 'on', def: false, flag: 'no-copying', label: 'Nobody copies anyone — no learning by watching at all (a test switch: the negative control for spreading)', cfg: true },
    { key: 'copyBySurprise', kind: 'on', def: false, flag: 'copy-by-surprise', label: 'Copy an elder by its hidden surprise (the old rule); otherwise by what visibly came of its choice, a meal or a hurt', cfg: true },
    { key: 'copySequence', kind: 'off', def: true, flag: 'no-copy-sequence', label: 'Youngsters watching an elder in the same square learn from its whole path to a good result, not only the last step (off: none)', cfg: true },
    { key: 'copyFar', kind: 'on', def: false, flag: 'copy-far', label: 'Copy what worked from any elder in sight (otherwise only from one in the same square, as peering is close)', cfg: true },
    { key: 'copyMoves', kind: 'on', def: false, flag: 'copy-moves', label: 'Copy whatever an elder is doing, however it turns out (the old rule); otherwise copy what worked for it and avoid what did not', cfg: true },
    { key: 'backReplay', kind: 'off', def: true, flag: 'no-back-replay', label: 'At a good surprise the path that led to it is replayed backwards, crediting the steps before the reward (off: none)', cfg: true },
    { key: 'boostedValue', kind: 'on', def: false, flag: 'boosted-value', label: 'The estimate of value shares the one-try boost and fear (the old rule): good surprises count up to four times as much', cfg: true },
    { key: 'oldPlantPull', kind: 'on', def: false, flag: 'old-plant-pull', label: 'The hungry pull to try plants fires on grass too, which hominins cannot digest (the old rule)', cfg: true },
    { key: 'disease', kind: 'off', def: true, flag: 'no-disease', label: 'Outbreaks of a contagious illness among hominins (off: no disease)', cfg: true },
    { key: 'diseaseRate', kind: 'num', def: 1 / 7, flag: 'disease-rate', label: 'Outbreaks a year (an assumption: tested at 1/7 and 1/20)', min: 0, max: 2, cfg: true },
    { key: 'certainConception', kind: 'on', def: false, flag: 'certain-conception', label: 'Every cycle can conceive (the old rule); otherwise about 1 cycle in 5, as wild chimpanzees need about 5', cfg: true },
    { key: 'conceive', kind: 'num', def: 0.2, flag: 'conceive', label: 'Chance a cycle can lead to conception (Gombe and Kanyawara about 0.2, Mahale about 0.11; tested at 0.2 and 0.1)', min: 0.01, max: 1, cfg: true },
    { key: 'huntersAnywhere', kind: 'on', def: false, flag: 'hunters-anywhere', label: 'Hunters start (and newcomers arrive) anywhere that suits them, even far from all prey (the old rule)', cfg: true },
    { key: 'huntersForgetKills', kind: 'on', def: false, flag: 'hunters-forget-kills', label: 'Hunters do not remember where they ate meat (the old rule: only eating plants is remembered); otherwise their kill is remembered like any food', cfg: true },
    { key: 'unguardedSleep', kind: 'on', def: false, flag: 'unguarded-sleep', label: 'Birds strip a kill while its hunter sleeps beside it (the old rule); otherwise a hunter resting at its own kill keeps them off', cfg: true },
    { key: 'oldHomininStrikes', kind: 'on', def: false, flag: 'old-hominin-strikes', label: "A hominin's failed strike harms any prey the same, even a buffalo (the old rule); otherwise by its weight against the prey's", cfg: true },
    { key: 'fixedHuntPull', kind: 'on', def: false, flag: 'fixed-hunt-pull', label: "A hunter's inborn pull to attack prey beside it is the same fed or hungry (the old rule); otherwise most of it grows with hunger", cfg: true },
    { key: 'huntPullFixed', kind: 'num', def: 0.25, flag: 'hunt-pull-fixed', label: 'Share of the hunting pull that is there even when fed (an assumption: 0.1-0.5)', min: 0, max: 1, cfg: true },
    { key: 'instantMeals', kind: 'on', def: false, flag: 'instant-meals', label: 'A kill gives a hunter 70% of its store at once (the old rule); otherwise it fills the stomach and is digested over a day, and a full stomach is felt and makes it sleepy', cfg: true },
    { key: 'gutShare', kind: 'num', def: 0.25, flag: 'gut-share', label: "Most a hunter eats at once, share of its weight (hyena about 0.24; 0.15-0.33)", min: 0.05, max: 0.5, cfg: true },
    { key: 'digestHours', kind: 'num', def: 24, flag: 'digest-hours', label: 'Hours for a hunter to digest a full stomach (an assumption: 12-48)', min: 2, max: 96, cfg: true },
    { key: 'mealSleep', kind: 'num', def: 2, flag: 'meal-sleep', label: 'How much faster tiredness builds with a full stomach (an assumption: 0-4)', min: 0, max: 10, cfg: true },
    { key: 'preyMap', kind: 'on', def: false, flag: 'prey-map', label: 'The land carries its antelope and buffalo as kg per square (about 5,000 kg per km²), shown as one herd per square around each hominin and hunter (scale step 1)', cfg: true },
    { key: 'preyLevel', kind: 'num', def: 5000, flag: 'prey-level', label: 'Prey map: mean kg of hoofed prey per km² (an assumption: 1,000-10,000)', min: 100, max: 30000, cfg: true },
    { key: 'buffaloShare', kind: 'num', def: 0.5, flag: 'buffalo-share', label: "Prey map: buffalo's share of the weight (an assumption: 0.25-0.75)", min: 0, max: 1, cfg: true },
    { key: 'preyRegrow', kind: 'num', def: 0.3, flag: 'prey-regrow', label: 'Prey map: regrowth per life-year at low numbers (an assumption: 0.1-0.6)', min: 0, max: 3, cfg: true },
    { key: 'rotPerBite', kind: 'on', def: false, flag: 'rot-per-bite', label: 'Rotting meat: a 0.35 chance of falling sick at every 15-minute bite, whatever its size (bug B27); otherwise by the kg eaten', cfg: true },
    { key: 'meatUnits', kind: 'on', def: false, flag: 'meat-units', label: 'Hominins eat meat as shares of a body, the same energy whatever the animal (the old rule); otherwise in kg with its real energy', cfg: true },
    { key: 'biteBareKg', kind: 'num', def: 0.25, flag: 'bite-bare-kg', label: 'Meat a hominin tears off bare-handed in 15 minutes, kg (an assumption: 0.12-0.5)', min: 0.02, max: 2, cfg: true },
    { key: 'biteFlakeKg', kind: 'num', def: 0.75, flag: 'bite-flake-kg', label: 'Meat a hominin cuts with a flake in 15 minutes, kg (an assumption)', min: 0.05, max: 4, cfg: true },
    { key: 'adultHerds', kind: 'on', def: false, flag: 'adult-herds', label: 'Prey map: every animal in a herd is an adult of the kind\'s weight (the old rule); otherwise antelope herds hold yearlings, females and males', cfg: true },
    { key: 'youngShare', kind: 'num', def: 0.25, flag: 'young-share', label: "Prey map: yearlings' share of an antelope herd (about 0.25; 0.1-0.4)", min: 0, max: 0.6, cfg: true },
    { key: 'forestPrey', kind: 'num', def: 1000, flag: 'forest-prey', label: 'Prey map: forest antelope where open-country herds cannot live, kg per km² (an assumption: 300-3,000; 0 = none, the old rule)', min: 0, max: 5000, cfg: true },
    { key: 'preyZone', kind: 'num', def: 1, flag: 'prey-zone', label: 'Prey map: herds shown within this many squares of a hominin or hunter', min: 0, max: 4, cfg: true },
    { key: 'preyRadius', kind: 'num', def: 8, flag: 'prey-radius', label: 'Squares within which plant-eaters must live where a hunter starts or arrives (an assumption; tested at 8 and 4)', min: 1, max: 40, cfg: true },
    { key: 'rescue', kind: 'off', def: true, flag: 'no-rescue', label: 'Newcomers from the wider population arrive when a hunter kind is rare (off: a closed world, where a kind can die out for good)', cfg: true },
    { key: 'rescueRate', kind: 'num', def: 1, flag: 'rescue-rate', label: 'Newcomers a year for a rare hunter kind (an assumption; tested at 1 and 0.25)', min: 0, max: 12, cfg: true },
    { key: 'oldMating', kind: 'on', def: false, flag: 'old-mating', label: 'The old mating rule: after any mating she waits the whole nursing time, he waits 36 days and pays 10 energy', cfg: true },
    { key: 'maleWait', kind: 'num', def: 1, flag: 'male-wait', label: 'Hours before a male hominin can mate again (an assumption; tested at 1 and 4)', min: 0.25, max: 48, cfg: true },
    { key: 'oneSocialGene', kind: 'on', def: false, flag: 'one-social-gene', label: 'One inherited gene for copying others and for feeling their pain and fear (the old rule); otherwise two separate genes', cfg: true },
    { key: 'temperament', kind: 'off', def: true, flag: 'no-temperament', label: 'Inborn temperament (bold or timid) differs between individuals and is inherited (off: everyone equally fearful)', cfg: true },
    { key: 'parentalCare', kind: 'off', def: true, flag: 'no-parental-care', label: 'How strongly parents share with their own hungry young differs and is inherited (off: every parent equally)', cfg: true },
    { key: 'oldHunger', kind: 'on', def: false, flag: 'old-hunger', label: 'Hunger and thirst only add a pull, as other urges do (the old rule); otherwise they come first, with food or water in reach, and quieten exploring and copying', cfg: true },
    { key: 'hungerPull', kind: 'num', def: 6, flag: 'hunger-pull', label: 'How strongly hunger and thirst win when food or water is in reach (an assumption)', min: 0, max: 20, cfg: true },
    { key: 'naive', kind: 'on', def: false, flag: 'naive-founders', label: 'Founders start with blank minds (the old rule); otherwise they practise their kind’s ordinary life for a few years before the world begins', cfg: true },
    { key: 'practiceDays', kind: 'num', def: 0, flag: 'practice-days', label: 'Days of founders’ practice before the world begins (off by default: it did not reduce hunger and drowning doubled; 10 is about 3 years)', min: 0, max: 100, cfg: true },
    { key: 'lust', kind: 'num', def: 2, flag: 'lust', label: 'Inborn pull of a ready adult toward a ready partner (0: none; an assumption, tested at 1 and 3)', min: 0, max: 10, cfg: true },
    { key: 'leaves', kind: 'off', def: true, flag: 'no-leaves', label: 'Early hominins can live on leaves when fruit is short (off: they get nothing from them)', cfg: true },
    { key: 'leafValue', kind: 'num', def: 0.64, flag: 'leaf-value', label: 'Food from leaves a minute, as a share of ripe fruit (evidence: 0.48–0.64)', min: 0, max: 1, cfg: true },
    { key: 'shield', kind: 'on', def: false, flag: 'shield-founders', label: "Predators cannot take the founding generation's young (the old rule)", cfg: true },
    { key: 'shelter', kind: 'off', def: true, flag: 'no-shelter', label: 'Branches can be heaped into a shelter (off: no more than a few to a place)', cfg: true },
    { key: 'care', kind: 'off', def: true, flag: 'no-care', label: 'Many hands feed a child; children stay close (off: only parents and grandmothers feed a child)', cfg: true },
    { key: 'vicar', kind: 'off', def: true, flag: 'no-vicar', label: 'People learn from seeing others hurt', cfg: true },
    { key: 'pickyCopy', kind: 'off', def: true, flag: 'no-picky', label: 'Choosy copying (off: copy the nearest elder blindly)', cfg: true },
    { key: 'soundPhysics', kind: 'off', def: true, flag: 'old-sound', label: 'Sound by the physics of air (off: heard within 2.2 squares)', cfg: true },
    { key: 'animalCalls', kind: 'off', def: true, flag: 'no-calls', label: 'Animals call (howls, roars, alarm snorts)', cfg: true },
    { key: 'modernVoice', kind: 'on', def: false, flag: 'modern-voice', label: 'Everyone starts with a modern voice, pointing and shared attention', cfg: true },
    { key: 'retina', kind: 'on', def: false, flag: 'retina', label: 'Raw vision (no labelled senses)', cfg: true },
  ];

  // command-line style arguments ({ days: '30', 'no-vicar': true, ... }) → settings
  function fromArgs(a) {
    const v = {};
    for (const s of SETTINGS) {
      if (s.kind === 'num') v[s.key] = a[s.flag] === undefined ? s.def : Number(a[s.flag]);
      else if (s.kind === 'on') v[s.key] = !!a[s.flag];
      else v[s.key] = !a[s.flag];
    }
    return build(v);
  }
  // a plain object of setting values (missing ones take their default) → settings
  function build(v) {
    const S = { days: 60, brain: 64, cfg: {} };
    for (const s of SETTINGS) {
      const x = v[s.key] === undefined ? s.def : s.kind === 'num' ? Number(v[s.key]) : !!v[s.key];
      if (s.cfg) S.cfg[s.key] = x;
      else S[s.key] = x;
    }
    return S;
  }
  // settings → the command that runs the same experiment without a browser
  function command(S, seeds, workers) {
    const parts = ['node tools/experiment.js', '--seeds ' + seeds];
    for (const s of SETTINGS) {
      const x = s.cfg ? S.cfg[s.key] : S[s.key];
      if (s.kind === 'num') {
        if (x !== s.def) parts.push('--' + s.flag + ' ' + x);
      } else if (s.kind === 'on') {
        if (x) parts.push('--' + s.flag);
      } else if (!x) parts.push('--' + s.flag);
    }
    if (workers > 1) parts.push('--workers ' + workers);
    return parts.join(' ');
  }

  function seedList(s) {
    const out = [];
    for (const raw of String(s).split(',')) {
      const part = raw.trim();
      if (!part) continue;
      const m = part.match(/^(\d+)\s*-\s*(\d+)$/);
      if (m) for (let x = +m[1]; x <= +m[2]; x++) out.push(x);
      else if (/^\d+$/.test(part)) out.push(+part);
      else throw new Error('Cannot read the seeds: ' + s);
    }
    return out;
  }

  // Run one seeded world and measure it. onDay(day) is called after each day, if given; return true
  // from it to stop early.
  function runWorld(E, seed, S, onDay) {
    E.setSeed(seed);
    E.reset(S.cfg);
    const day = {},
      hdAt = {}; // hominin-days lived before each first happened (exposure, for rates: Fable's review, 14 Nov 2026)
    let hd = 0;
    for (let t = 0; t < S.days * E.DAY; t++) {
      E.sim();
      const st = E.state();
      if (t % 12 === 0) hd += st.ag.reduce((n, a) => n + (a.sp === 0), 0) / 8; // sampled every 3 hours
      for (const k of MILESTONES)
        if (st.firsts[k] && day[k] === undefined) {
          day[k] = Math.floor(t / E.DAY) + 1;
          hdAt[k] = Math.round(hd);
        }
      if (st.over) break;
      if (onDay && (t + 1) % E.DAY === 0 && onDay((t + 1) / E.DAY)) break;
    }
    const st = E.state(),
      ppl = st.ag.filter((a) => a.sp === 0);
    const died = {};
    for (const [k, v] of Object.entries(st.deaths)) if (k.startsWith('Person: ')) died[k.slice(8)] = v;
    const count = (sp) => st.ag.filter((a) => a.sp === sp).length;
    const mean = (f, d) => (ppl.length ? +(ppl.reduce((t, p) => t + (f(p) ?? d), 0) / ppl.length).toFixed(2) : '');
    return {
      seed,
      hominin_days: Math.round(hd),
      hdAt,
      days_run: Math.floor(st.tick / E.DAY),
      people_alive: ppl.length,
      generations: st.maxGen,
      plant_eaters: count(1),
      hunters: count(2),
      hunter_kinds_alive: new Set(st.ag.filter((a) => a.sp === 2).map((a) => a.k)).size, // how many hunter kinds still live (of 3)
      fish: count(3),
      best_fire_skill: +Math.max(0, ...ppl.map((p) => p.fsk || 0)).toFixed(2),
      // what kind of learners the living people are (inherited)
      learns_from_others: mean((p) => p.g.im, 1),
      copies_successful: mean((p) => p.g.pb, 0.5),
      follows_crowd: mean((p) => p.g.cf, 0.3),
      full_sibling_pct: st.SIBS[0] && st.SIBS[0].pairs ? Math.round((100 * st.SIBS[0].full) / st.SIBS[0].pairs) : '',
      vocal_control: mean((p) => p.g.vl, 1),
      point_urge: mean((p) => p.g.pg, 1),
      share_joy: mean((p) => p.g.sh, 1),
      cares_for_others: mean((p) => p.g.al, 0.5),
      ...(() => {
        // the brain layout of the living: share of units in each kind of region, and how many regions
        const sh = [0, 0, 0, 0];
        let nr = 0;
        for (const p of ppl) {
          const H = p.h.length,
            L = p.g.lay;
          nr += L ? L.masks.length : 4;
          for (let j = 0; j < H; j++) sh[L ? L.kind[L.reg[j]] : j % 8 === 0 ? 1 : j % 8 === 1 ? 2 : j % 16 === 2 ? 3 : 0] += 1 / H;
        }
        const m = (v) => (ppl.length ? +(v / ppl.length).toFixed(3) : '');
        return { brain_general: m(sh[0]), brain_fear: m(sh[1]), brain_memory: m(sh[2]), brain_words: m(sh[3]), brain_regions: m(nr) };
      })(),
      words_said: st.WSTAT ? st.WSTAT.size : '',
      words_shared: st.WSTAT ? [...st.WSTAT.values()].filter((s) => s.who && s.who.size >= 3).length : '',
      loners_pct: ppl.length ? Math.round((100 * ppl.filter((p) => (p.g.im ?? 1) < 0.35).length) / ppl.length) : '',
      died,
      day,
    };
  }

  const HEAD = ['seed', 'days_run', 'people_alive', 'generations', 'plant_eaters', 'hunters', 'hunter_kinds_alive', 'fish', 'best_fire_skill', 'learns_from_others', 'copies_successful', 'follows_crowd', 'loners_pct', 'full_sibling_pct', 'vocal_control', 'point_urge', 'share_joy', 'cares_for_others', 'words_said', 'words_shared', 'brain_general', 'brain_fear', 'brain_memory', 'brain_words', 'brain_regions'];

  // meta: { version, commit, runtime, seeds }
  function csv(rows, S, meta) {
    const cols = [...HEAD, ...CAUSES.map((c) => 'died_' + c.replace(/ /g, '_')), ...MILESTONES.map((m) => 'day_' + m), 'hominin_days', ...MILESTONES.map((m) => 'hd_' + m)];
    const lines = [
      '# Genesis experiment',
      '# genesis ' + meta.version + ' commit ' + meta.commit + ', ' + meta.runtime,
      '# settings ' + JSON.stringify({ days: S.days, brain: S.brain, ...S.cfg }),
      '# seeds ' + meta.seeds,
      '# day_X = the day (1 = first) something first happened in that world; empty = never',
      '# hominin_days = hominin-days lived in the world; hd_X = hominin-days lived before X first happened (empty = never)',
      cols.join(','),
    ];
    for (const r of rows)
      lines.push(
        [
          ...HEAD.map((h) => r[h]),
          ...CAUSES.map((c) => r.died[c] || 0),
          ...MILESTONES.map((m) => (r.day[m] === undefined ? '' : r.day[m])),
          r.hominin_days ?? '',
          ...MILESTONES.map((m) => (r.hdAt && r.hdAt[m] !== undefined ? r.hdAt[m] : '')),
        ].join(',')
      );
    return lines.join('\n') + '\n';
  }

  const median = (v) => {
    const s = [...v].sort((x, y) => x - y);
    return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : null;
  };
  // mean and its standard error
  const meanSE = (v) => {
    const n = v.length;
    if (!n) return { mean: null, se: null, n };
    const m = v.reduce((a, b) => a + b, 0) / n;
    const sd = n > 1 ? Math.sqrt(v.reduce((a, b) => a + (b - m) * (b - m), 0) / (n - 1)) : 0;
    return { mean: m, se: n > 1 ? sd / Math.sqrt(n) : null, n };
  };

  // the numbers the summary is made of (the Lab page draws them; summary() writes them as text)
  function stats(rows) {
    const alive = rows.map((r) => r.people_alive);
    const dead = {};
    for (const c of CAUSES) dead[c] = 0;
    for (const r of rows) for (const [k, v] of Object.entries(r.died)) dead[k] = (dead[k] || 0) + v;
    const firsts = {};
    for (const m of MILESTONES) {
      const d = rows.filter((r) => r.day[m] !== undefined).map((r) => r.day[m]);
      firsts[m] = { worlds: d.length, median: median(d), earliest: d.length ? Math.min(...d) : null };
    }
    return {
      worlds: rows.length,
      alive: { ...meanSE(alive), median: median(alive) },
      diedOut: rows.filter((r) => r.people_alive === 0).length,
      hunters: meanSE(rows.map((r) => r.hunters)),
      plantEaters: meanSE(rows.map((r) => r.plant_eaters)),
      generations: meanSE(rows.map((r) => r.generations)),
      dead,
      firsts,
    };
  }

  function summary(rows, S) {
    const s = stats(rows),
      out = [];
    out.push(
      `${rows.length} worlds, ${S.days} days each. People alive at the end: mean ${s.alive.mean === null ? '-' : s.alive.mean.toFixed(1)}, median ${s.alive.median}; ` +
        `${s.diedOut} worlds ended with nobody left.`
    );
    out.push('Deaths: ' + (Object.entries(s.dead).filter(([, v]) => v).map(([k, v]) => k + ' ' + v).join(', ') || 'none'));
    for (const m of MILESTONES) {
      const f = s.firsts[m];
      out.push(m.padEnd(9) + `${String(f.worlds).padStart(4)} / ${rows.length} worlds` + (f.worlds ? `, median day ${f.median}, earliest ${f.earliest}` : ''));
    }
    return out.join('\n');
  }

  return { MILESTONES, MILESTONE_NAMES, CAUSES, SETTINGS, fromArgs, build, command, seedList, runWorld, csv, stats, summary, median, meanSE };
});
