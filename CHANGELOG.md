# Changelog

Genesis follows the version in `package.json`. Experiments should state the version or commit they used.

## Unreleased

- **A mother keeps her nursing child near** (a pull scaled by her inherited care), **females have a cycle** (receptive
  about 13 of 36 days, fertile near ovulation), and **a lasting mood** colours how things feel. `--no-mother-pull`,
  `--no-cycle`, `--no-mood` restore the old rules.
- **Moving is one choice, not eight.** Every creature's brain weighed each of eight directions as a separate choice, so an
  undecided one walked most of the time (hominins about 70–80% of their waking time; wild chimpanzees travel about
  15–40%). Now the eight directions share one choice's weight; in a first check hominins walked 25%. `--eight-walks`
  restores the old rule.
- **Hominins differ in temperament and in parental care**, both inherited: some are born bolder, some more timid (fear
  rises more or less after a bad surprise); some parents are moved more, some less, by their own young's hunger.
  `--no-temperament`, `--no-parental-care` make everyone the same.
- **Founders know what their kind has always known** (the owner's idea): before the world begins they practise their
  kind's ordinary life for about three years, learning only from what their bodies feel, with nobody able to die;
  then the world is built again, identical, and each founder keeps what it learned. Children are still born knowing
  nothing. Tools, fire and words are still to be discovered. `--naive-founders` restores blank minds; the bare engine
  (quick tests) builds blank-minded founders unless asked. Analysis tools: `hunger-trace.js`, `generations.js`.
- **Climbing is a choice, not automatic.** Early hominins have a new action, *climb a tree* (or, up one, *climb
  down*), which their brains choose and learn like eating; sleepiness under a big tree and fear of a hunter in sight
  pull toward it, so individuals differ, as real apes do. Only a baby clinging to its mother is automatic (the grasp
  reflex). (Adding an action changes every brain, so worlds before and after are not the same world.)
- **Afraid hominins climb away from hunters.** With a hunter in sight, a frightened hominin makes for trees or cover
  and climbs a big enough tree, staying up while the hunter is about, as monkeys and apes do; hyenas cannot follow,
  leopards and sabre-tooths rarely succeed. Not faster running: australopiths ran at a small fraction of a
  leopard's speed (Bates et al. 2024). `--old-flight` restores the old rule.
- **The animals of East Africa 2.5 million years ago** (patch 6): in the hominin world, antelopes, hares, buffalo,
  spotted hyenas, leopards and sabre-toothed cats (*Megantereon*) instead of deer, rabbits, bison, wolves, big cats
  and bears, each with the life history of its living relative. Leopards and sabre-tooths climb, hyenas do not; every
  hyena female breeds. Rules that went by an animal's name now go by what it can do. **Off by default** (`--africa-animals`):
  in tests the new hunters starved and nearly died out (entry 24), because Genesis has about nine times too many hunters
  for its prey (real ecosystems: about 90 kg of each carnivore per 10,000 kg of prey, Carbone & Gittleman 2002).
- **Smaller bodies need less food** (Kleiber's law, as plant-eaters here already did): hominins, three-quarters of
  a forager's mass, had been eating and burning energy as full-sized foragers. `--no-body-scaling` restores it.
- **Hungry hominins no longer see grass as food.** Their eyes counted a meadow as half as good as fruit, a leftover
  from before people stopped eating grass, which drew hungry ones onto grassland where there is nothing for them.
  `--grass-looks-like-food` restores it. (Eyesight tests now use fruit.)
- **A mother who loses a nursing baby can conceive again within months** (74 days; nursing stops, and with it the
  hold on ovulation: Jackson & Glasier 2011), instead of waiting the full four years. `--no-loss-resume` restores
  the old rule.

- *What's happening* has two tabs: **All**, and **Hominins** (People in the Homo sapiens world) — only the
  news about them: any entry that names one of them or speaks of them, the newest eight.

- On the globe the dead are real objects lying on the ground — the colour of their kind, fading to pale bone
  as they decay — so trees and hills hide them (they were painted on top of the picture and seemed to float
  on the treetops, with their ribs looking like fish).

- On the globe from a distance, fish are no longer drawn as markers over the land (they looked like fish in
  the air); fish live under water and show only close up, in the water.

- **Early hominins fertile for life, up to about 50**, as wild chimpanzees are (no menopause; fertility approaches
  zero at about 50: Emery Thompson et al. 2007; `--fert-max` sets the limit). They had
  kept modern people's rule — fertility ending at 60% of life — which, with their shorter lives, ended it at
  16–36 years (mean 26): a scaling error found while tracing why half the women never had a baby.
  `--human-fertility` restores the old rule for comparison. Research log entry 19: births per world 12.2 → 25.7, 22.9 alive
  against 14.1 (better in 10 of 12 worlds).
- **An inborn pull of a ready adult toward a ready partner** (`--lust N`, 2), from the evidence on primate sexual
  motivation (Wallen 2001). Research log entry 20: births rose a little (25.7 → 26.8 at 1, 28.0 at 3), survival within noise.
- Lightning is a flash of about a third of a second, and no longer hangs on the screen while the world is
  paused; hominins asleep up a tree are drawn in the crown of one of the trees, not in the air between them.

- **Hominin bodies and lives** (patch 3): about three-quarters of a person's size, still hairy (feel the cold
  later and the heat sooner), growth, weaning and births as in chimpanzees, a shorter life, and a brain
  about a third of a person's that is inherited and can evolve larger. The founding band's ages follow it.
- **Sleeping in trees** (patch 4): settling to sleep where a tree is big enough, a hominin climbs into it (a
  small child goes up with its mother); wolves cannot reach a sleeper there, big cats and bears find it much
  harder; now and then a sleeper falls. `--no-trees` turns it off.
- **Leaves as a fallback food** (patch 5, first part): like chimpanzees, early hominins can live on young
  leaves where the trees are thick enough when there is no fruit, roots or meat — less food a minute than
  ripe fruit (0.64 of it, from Kibale chimpanzees; the evidence allows 0.48–0.64). Modern people get nothing
  from them. `--no-leaves` turns it off, `--leaf-value` sets the share. Research log entry 18: no measurable effect
  on survival, hunger or fire in 24 worlds (a rise in fire deaths in the first 12 was chance; traced with
  `tools/analysis/fire-trace.js`).
- Research log entries 16 and 17: the hominin world still works (14.5 alive against 25.5 for modern humans,
  no die-outs; old age now a main cause of death); sleeping in trees made no measurable difference.

- **Early hominins.** The default world is now early hominins of about 2.5 million years ago (plan:
  `docs/HOMININ-PLAN.md`): called hominins and drawn as small, hairy, upright apes with long arms. So far
  only the name and look; bodies, climbing, diet, animals and the ancient world follow in patches. *New
  world* (and `--sapiens`) gives modern Homo sapiens of 70,000 years ago without culture instead.
- Predators can take the founding generation's young like any other (a leftover rule protected them;
  `--shield-founders` restores it for comparison).

- **Shelters as a possibility.** Branches can be heaped in one place, and a heap is cover against wind and
  rain (and from being seen), drawn on the globe as a brush shelter; it rots unless kept up. Nothing tells
  anyone to build; the first shelter slept in is a tracked discovery. `--no-shelter` turns it off.
  (Research log entry 13: nobody built one in 12 worlds × 60 days; no side effects.)
- **Analysis tools:** `tools/analysis/predators.js` and `compare-predators.js` (predator deaths per 1,000
  person-days by age, encounters, who the victims were; research log entry 12). `--no-care` switch.

- On the globe, people and animals in water are in it, not standing on it: thigh-deep in the shallows,
  only the head out when swimming in deep water.

- On the globe, stones, flakes, pyrite, fallen branches and nuts are real objects lying on the ground, so
  trees and hills hide them (they were painted on top of the picture and showed on the treetops); people
  and animals are solid again (a mistake made when fish were redrawn left them partly see-through).

- **Many hands feed a child.** A grown person with food is moved to feed a hungry child nearby: their own
  most, their family's next, any child of the band only as far as a new inherited trait (care for others'
  young, recorded in experiments as `cares_for_others`) carries them. **Children stay close** to their
  mother, or the nearest grown person of the band if she is gone; older children stay within reach of the
  band. (Research log entry 11: hunger deaths fell by about a sixth, predator deaths rose; both within
  noise.)

- Hungry people eat the food they are standing on: seeking food stops once liked food is in reach (as in
  every animal), and the inborn pull to eat sweet or fresh food when hungry is stronger. (Research log
  entry 10: it did not reduce hunger deaths; the cause lies elsewhere.)

- **The Research page** (`research.html`, linked from the top bar): every survival test from the research
  log, grouped by the version it was run on, with what was added in each version, the strength of the
  evidence (filterable), the raw data to download, a "Re-run in the Lab" button that sets the Lab up for
  that experiment, the commit, and how to cite. It reads `docs/FINDINGS.md` and `CHANGELOG.md` directly,
  so it stays up to date with them. Raw tables are now kept in `data/findings/`.

- A tidier top bar: Pause and the speed slider stay in view; the flat map, clouds, realistic view,
  turning with the sun and the timeline are in a **View** menu (the gear button).

- **Realistic view** (in the View menu; off by default and remembered on each device, since it
  is slower to draw): water that ripples, glints in the sun, mirrors the sky at a low angle and is clear in
  the shallows and dark where deep; rivers drawn clearly; and near the ground a sky coloured as sunlight
  scatters (blue overhead, pale at the horizon, red at sunrise and sunset, the sun's disc, stars at night),
  with haze in the distance and a warmer light from a low sun. Picture only: the world is unchanged.

- Fish no longer float in the air: on the globe a fish lies in the water, seen from above as a dark, slim
  shape turned the way it swims, its tail swaying; at a low angle the water's surface hides it, as real
  water does, so from the bank only nearby fish below you can be seen.

- **The Lab page** (`lab.html`, linked from the top of the main page): run many seeded worlds in the
  browser, one per core, and compare two setups on the same seeds — people alive with an uncertainty
  range, die-outs, causes of death, discoveries, each world — then download the results — one CSV per setup, A and B in one file, or a
  plain-text summary, at any time, even partway — or copy the matching command. The command-line runner and the Lab share `tools/experiment-core.js` and give the same rows.

- **The real Earth, 70,000 years ago.** New worlds on the page are Earth itself by default: continents,
  mountains and sea floors from NOAA's ETOPO1 relief, with the sea 80 m lower as in the ice age, so
  Beringia, Sundaland, Sahul and Doggerland are dry land. Three years of weather run first so the rains
  decide where deserts and forests are. *New world* can still choose a made-up planet
  (`tools/experiment.js --earth` for the real one in experiments).
- **The first band starts where our species lived:** warm (not desert-hot) tropical land with fresh water
  close by and both open and wooded ground near — in Africa on the real Earth — and no big hunters
  waiting at the camp. `--any-start` gives the old random start for comparison.

- People look like people: human proportions (a bigger head in children), shoulders and hips, arms and
  legs that bend at elbow and knee, hands, feet, a face, ears and short curled hair. Skin is dark, as it
  was for early humans in sunny lands, varying a little between founders; children take after both
  parents (drawn only; it changes nothing in the world).
- Fish look like fish: dark-backed and silver-bellied (countershaded), with a fin, an eye and a
  swaying tail; on the globe they swim at the water's surface (they were drawn on the sea floor, hidden)
  and are no longer seen standing up against the sky at the horizon.
- **Swimming.** Animals swim by instinct (each kind as well as the real one); people learn it by practice
  in the shallows and deep water and by watching others, children fastest but weakest. The panel shows
  how well someone swims; the log notes the first person to learn.
- **Surviving as our ancestors did.** Worlds start with a band of 25 people of all ages (children with
  their mothers, couples, grandmothers); people are born drawn to food and fresh water they can see when
  hungry or thirsty and shy of big hunters; parents (and grandmothers) are moved to feed their own hungry
  young; a big unexpected success sticks after one try, and the most striking memories are replayed most
  in sleep.
- The land blends smoothly from square to square (on the globe and the flat map) instead of meeting in
  hard squares; puddles are round; clouds on the flat map are soft. The world underneath is unchanged.
- Dead bodies can be seen from normal zoom on the globe, not only right up close.
- The "Turn with the sun" button shows when it is on ("Turning with the sun", highlighted).
- `npm run test:quick` runs the fast tests in about 20 seconds; `npm test` still runs everything.
- **The brain's layout evolves.** Which region each thinking unit is in (fear, memory, sound and words,
  general) and what each region listens to are now genes. Children mix their parents' layouts with
  mutations: units move between regions, regions gain or lose senses, and rarely a region is copied and
  the copy drifts on its own. Ancestors start ape-like (small sound-and-word areas). Experiment columns
  brain_general/fear/memory/words/regions; the generations table shows each generation's layout.
- **Speech starts where our ancestors started.** Vocal control (and with it babbling and copying sounds),
  the urge to point, and the pleasure of shared attention are inherited and start low, as in our
  ape-like ancestors; evolution decides whether they grow. People can point, see others point and
  where they look, and enjoy it when someone goes where they pointed (as much as each was born to).
  The translator notes what a word is said while pointing at. --modern-voice gives a full human voice.
- **A human voice, and a translator.** The four fixed sounds are gone: each person has a simplified
  vocal tract (closure place, voicing, tongue height and backness, lip rounding; one or two syllables),
  so they can say over 20,000 words, none with any meaning. Listeners hear acoustic cues (burst, voicing,
  F1/F2, pitch), blurred when faint. Inborn: cry, scream, babbling, vocal imitation. The translator
  says what a word means from the speaker's brain and from how everyone uses it; the Stats tab lists
  the words. Listen plays words from the same mouth positions. Experiment milestones: speak, shared.
- **Sound by the physics of air, and animal calls.** Each call has a real loudness and pitch and fades
  with distance (6 dB per doubling), air absorption (by pitch and humidity), forest, wind, night and
  heat, and is heard only above the background (rain is loud). A shout now carries a couple of km (it
  used to reach 6–7 km); a howl 6–10 km; a roar up to ~8 km. Wolves howl when they've lost their pack
  and join each other's howls; big cats roar at night; deer and bison snort an alarm at a hunter.
  Animals hear fainter sounds than people. Calls show as rings spreading at the real speed of sound.
- Carrion birds no longer pop out of nowhere: they glide in from far off, spiral down, feed on the
  carcass (or wait nearby), and fly away the way they came when the meat is gone or night falls.
  Carcasses now show on the flat map too.
- **Pregnancy.** Mating no longer makes a baby on the spot. A mother carries her young for the real
  animal's gestation (people nine months, bison nine and a half, bears seven, deer about six and a half,
  big cats nearly four, wolves two, rabbits one; fish eggs hatch in days), paying part of its energy cost day
  by day (starving, she can lose it) and the larger part afterwards in milk while her young is small
  (eggs cost almost nothing). Birth hurts, and about one human birth in a hundred costs the mother's
  life. Nursing follows before she can conceive again; fathers can mate again soon. A pregnant woman's belly grows rounder as
  the birth nears; late in pregnancy she is a little slower to walk and much slower to run, so less able
  to escape. In a wolf pack only one female breeds:
  the others' breeding is held back while she is pregnant or nursing close by. The panel shows how far
  along a pregnancy is.
- **The food chain closes.** Bodies are eaten by insects and microbes at a pace set by warmth (most of a
  carcass gone in about three weeks of summer, nothing while frozen), and go bad on the same clock;
  carrion birds take what is left by day on open ground, waiting while a hunter or a person is at the
  carcass (vultures where it is warm; slower ravens and eagles in cold lands). Circling birds can be
  seen from far off (as people really found carcasses), waiting birds sit nearby, and richer soil shows
  as deeper green. What rots enriches the soil, and grass there
  grows lusher for months; grazers' dung enriches the ground too. Flies and circling vultures are
  drawn over carcasses up close.
- **Pair bonds instead of "last one mated with".** People and wolves form bonds that grow with time
  spent together and with mating, and fade over weeks apart; the partner is the strongest bond. Bonded
  partners are preferred when mating and missed when apart; nothing forbids other partners. Deer,
  rabbits, bison, big cats and bears form no pairs, and their males no longer count as raising young.
  Each child's father is recorded so the share of full siblings can be compared with real people
  (Stats tab; experiment column full_sibling_pct).
- **No more scripted grief.** A death used to make its partner, mother and child grieve at once, wherever
  they were, as if told. Now nobody is told: the inborn bond makes a creature miss those it is bonded
  to when it has not seen them for days (rising over four days, fading over the next two weeks, the
  same whether they are alive or dead), and it is sharply distressed only when it comes across the
  body of one of them. The log says "found the body of …, and was distressed" instead of "is grieving".
- Events and lessons now float over the world in a see-through box at the top left ("What's
  happening"): new ones pop in and glow for a moment; it can be folded away, and then counts what you
  missed. It starts folded on phones. The Stats tab is now just "Stats".
- **Learning from others.** A person who sees someone nearby bitten, burned, fall, drown, get sick or
  die feels a weaker share of the pain as its own learning signal, and fear, and turns a little away
  from what it saw lead there. Stronger for family and for children; attacks, fire, falls, drowning
  and bad food teach most. Copying now favours those doing well (by an inherited bias), is stronger
  when the copier is unsure, and can lean toward what most others do (an inherited bias). How much
  each person learns from others at all is inherited and starts widely varied, so loners exist.
  The Stats tab's generation table shows these traits and the share of loners over generations.
- Trees on the globe stay where they grew: each square's trees are placed from that square's own
  numbers, so a forest growing or thinning in one place no longer makes trees everywhere jump. When
  the view follows a creature it follows its smooth walk, so the land no longer lurches a whole square
  past you (making everyone standing still seem to slide) each time it steps into the next square.
- Movement on screen now follows the body: a sleeper lies still on its spot instead of sliding; legs
  step with the ground actually covered, so feet don't skate; arms (striking, hands in the eye view)
  keep the same pace as the legs at every speed and stop when the world is paused; looking through a
  creature's eyes, the head turns smoothly (at most about 90° a second) toward the way the body is really travelling,
  instead of the view snapping 45° every time the brain flicks between choices.
- A **Time** button (off by default) shows the fourth dimension: fading trails of where creatures have
  been (the one you picked and its family, all people, or everyone; over 1, 5 or 30 days) and a strip
  of everything that has happened (births, deaths, fire, firsts) as dots along time. It is drawn by
  the page only and cannot change the world. Births are now written in the log.
- Caves are now real hollows in the 3D world: a rocky knoll with an arched mouth that you can see from
  outside; a creature standing in one is inside it, seeing dark stone walls and the bright arch of
  daylight. Creatures see caves as cover (somewhere to shelter) through the same senses as trees.
- The creature panel shows only what matters (what it is doing or thinking, how it feels, what it has
  learned); everything else is under a "More" button. Name, age and IQ no longer cram into one line.

## 0.7.0 — 2026-11-08

- Experiment runner `tools/experiment.js` (many seeded worlds, one CSV, repeatable byte for byte).
- Model description in ODD format: `docs/MODEL.md`.
- Citation file `CITATION.cff`.
- People eat as people do: no grass; inborn taste for sweet and savoury food; roots to dig, meat from
  bodies, hunting learned, rotting meat makes you sick.
- Fire as early humans had it: keeping fire comes first; making fire is a practised skill learned by
  doing and by watching.
- Bodies stay and become bones; caves in stony hills; heights to Everest's 8.8 km and sea floor to 11 km.
- Talking, learned seeing, IQ, and a raw-vision experiment.

## 0.6.0

- Minds (band, memory, sleep replay), growing brains, feelings, storms, hands and tools, real animal kinds.
