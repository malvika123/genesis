# Genesis — model description (ODD protocol)

This follows the ODD protocol (Overview, Design concepts, Details) for describing agent-based models
(Grimm et al. 2006, 2010, 2020), so that other researchers can read what Genesis does, judge it, and repeat
it. Where something is a simplification, it says so. Where something is **not checked against data**, it
says that too (see section 8).

Version described: see `package.json`. Every experiment file made by `tools/experiment.js` records the
version and commit it was made with.

## 1. Purpose and patterns

**Purpose.** To see what a population of learning creatures does in a world built to behave like early
Earth, when nothing about *what they should do* is scripted. The creatures start with a body, inborn
reflexes and drives, and a neural network that learns by reinforcement. Skills such as using tools,
keeping fire, digging for roots, hunting or giving food must arise, if they arise at all, from experience.
The model is not a prediction of any real place or people. It is a tool for asking: *under which
conditions does X appear, and in what order?*

**Patterns the model is meant to be judged against** (none is yet formally tested; see section 8):
- Populations of herbivores and predators that persist and fluctuate, rather than collapsing at once.
- Fire as an unavoidable part of the landscape long before anyone controls it, and control (keeping fire)
  appearing before making fire.
- Tool use (stones, sticks, sharp flakes) appearing late and rarely at first, then spreading by copying.
- Meat-eating and hunting arising from scavenging and not being given.

## 2. Entities, state variables and scales

**Space.** A grid of 128 × 80 cells on a sphere, wrapping east–west; one cell is about 3 km, so the world
spans roughly 384 × 240 km (a *region*, not the planet; see section 8). Each cell has height (−11 … +8.8 km
relative to sea level, with most land below 2 km), sea/lake/river flags, ground type, grass, trees and
fruit, nuts, roots, loose stones, sticks, pyrite, cave mouths, soil moisture, humidity, cloud, rain, fire,
burnt ground, cooked food, and bodies.

**Time.** One step is 15 minutes; 96 steps make a day; a "year" is 288 steps (3 days). Seasons follow the
year. All lifespans are given in these years, so a person who matures at 12 years has lived 36 days and
a generation takes about 48 days. *Consequence: runs shorter than about 100 days seldom show a second
generation.*

**Creatures.** People, deer, rabbits, bison (plant-eaters), wolves, big cats, bears (hunters; bears also
eat plants) and fish. Each has a body (energy, water, health, age, sex, genes for size, speed, vision,
learning rate, copying strength, brain size), a heading, a hand (people only), a voice (people only), and
a neural network. People also have a perception table for what they have learned to recognise, a
fire-handling count and a fire-making skill, memory for sleep replay, and a mother/mate/child record.

**Bodies of the dead** are entities too: place, time of death, meat remaining, how far rotting has gone
(warmth-driven). Decay by insects and microbes runs at 0.12/day of the remaining meat at 20 °C with Q10 = 2
(none below 0 °C); carrion birds (a process, not agents) remove 1.2/day by day on open ground above 8 °C.
A **soil** layer (1 = usual) gains 0.8 × the rotted meat (plus a little around it) and 1% of grass eaten
by grazers (dung); grass growth is multiplied by √soil; soil relaxes to 1 at 0.02%/step.

## 3. Process overview and scheduling

Each step, in this order: climate and weather (evaporation, wind, clouds, rain, storms, lightning) →
forests and fruit → items (nuts, sticks, roots) → bodies decay → calls travel → fire (ignition, spread,
burn-out) → every creature in turn (body upkeep, senses, choice, action, learning) → deaths → births.
Creatures are processed in a fixed order within a step, which is deterministic.

## 4. Design concepts

**Basic principles.** Energy and water balance with mass-based eating (Kleiber's law, metabolic need
∝ mass^0.75); reinforcement learning from bodily feelings; evolution by inherited genes with mutation;
physical rules for weather and fire.

**Emergence.** Everything a creature *does* beyond its reflexes: where it goes, what it eats, whether it
picks things up, strikes, gives, calls, hunts, keeps fire. Group effects: herds, packs, bands, shared
sounds, copying.

**Adaptation and objectives.** Each creature acts to raise its reward, the sum of changes in its drives:
pain, drowning pain, hunger, thirst, tiredness, loneliness, missing a bonded one long unseen, distress on finding a bonded one's body (deaths are known only through the senses), and cold or heat, plus small
bonuses for novelty, play, finding others after being alone, and so on. Nobody is told *which* behaviours
help.

**Learning.** An actor–critic network with eligibility traces (Sutton and Barto). Brains grow from a
starting number of thinking units to a maximum (people: 16 → 64) through childhood and are pruned. Moods
(fear, novelty, stress) modulate learning; sleeping replays remembered moments. Learned weights are **not**
inherited; only genes are. Knowledge passes between creatures only by watching and copying.

**Sensing.** Creatures sense, in each of eight directions, 16 channels (water, food, danger, other
species, people, mates, family, steepness, trees, items, fire…) within a field of view limited by
line-of-sight, hills and darkness. People's recognition is learned (`perceive`): faint, far or unfamiliar
things are missed or confused. An optional raw-vision mode gives only coloured rays and no labels.
The brain receives these numbers, not pictures.

**Interaction.** Predation (size ratio, pack help, prey fighting back), sharing food, mating, parental
care for the young, copying another's chosen action (biased toward the successful, the majority and moments of uncertainty, by inherited traits), feeling a share of another person's pain seen nearby (vicarious learning), an inherited brain layout (unit-to-region assignment and per-region input masks; mutations move units between regions at 1%/unit, flip region inputs at 0.15%/input, and copy a region at 2%/birth, up to 8 regions), speech: an articulatory voice (closure place, voicing, tongue height/backness, rounding; 1–2 syllables) heard as acoustic cues with distance-dependent noise; inherited vocal control, pointing urge and shared-attention pleasure starting ape-like; babbling, vocal imitation, seeing pointing and gaze; usage-based translation. Sound propagation (source level and pitch per call; spherical spreading, ISO-style air absorption by pitch and humidity, foliage loss, wind and day/night refraction, ambient noise incl. rain; hearing advantage by role), inborn animal calls (howl when separated from pack, chorus reply, nocturnal roar, alarm snort when a hunter is seen), pregnancy (conception, then birth after the species' real gestation, energy cost spread across it, loss if the mother starves, labour pain, 1% maternal death per human birth, nursing interval after birth), pair bonds that grow with time together and mating and fade apart (people and wolves only; partner = strongest bond; no rule of fidelity; the share of full siblings is recorded to compare with real populations), sound calls heard by others, grieving, and watching
another make fire.

**Stochasticity.** One seeded random-number generator drives all chance events. Same seed, same settings,
same code → the same world exactly (verified for the browser-free engine on one machine and Node
version).

**Observation.** `state()` exposes everything; `tools/experiment.js` records the day each milestone first
occurs and the causes of every death. A creature's "thoughts" shown in the interface are its real network
inputs and outputs translated to words, not invented text.

**Intervention (whispers).** The only outside influence. A typed idea is mapped to a small nudge in a
creature's weights during sleep or calm. It is never a command.

## 5. Initialization

Terrain is either the real Earth (ETOPO1 heights resampled to 128 × 80, sea level −80 m as about
70,000 years ago; the weather is run for three model years first and its last-year mean soil moisture
sets desert ground and forest cover) or a seeded made-up planet (fractal heights, sea share 0.5). Then
rivers by drainage, ground types, rocks, pits, caves, poison berries; grass and trees grow in, then creatures are placed as **grown adults** with
clean brains and inborn instincts (a simplification, since no real person starts as an adult), people
as a band of families of all ages. The band's camp is a random square that is within 25° of the
equator (on Earth, in Africa), 18–27 °C mean, not desert, with soil moisture ≥ 0.35, fresh water within 3
squares, and open and wooded ground within 2; hunting groups start ≥ 10 squares away. Defaults: 25
people, 20 plant-eaters, 6 hunters, 24 fish.

## 6. Input data

On the real Earth: NOAA ETOPO1 global relief (Amante & Eakins 2009, public domain), converted once from
its published colour-relief image with its own colour scale, calibrated against known plateau heights,
and stored in `src/earth.js`. Nothing is loaded at run time.

## 7. Submodels and their real-world basis

| Part | What the model does | Real-world basis | Simplification |
|---|---|---|---|
| Climate | Temperature by latitude, season, altitude (−6.5 °C/km) and day/night; stronger swings when dry and clear | Standard lapse rate and radiation balance | No ocean currents; coarse |
| Water cycle & storms | Evaporation, prevailing winds, uplift (mountains, convection), cloud, rain/snow, puddles, thunderstorms | Hadley-type belts, orographic rain | No pressure fields |
| Terrain | Real Earth (ETOPO1) with the sea 80 m lower as ~70,000 years ago, or made-up (sea 50%); rivers run downhill to the sea | ETOPO1; sea level curves (Spratt & Lisiecki 2016) | 2.8° × 2° squares; heights read back from a colour image (± a few hundred m); no ice-age ice sheets or cooler climate |
| Forests | Trees by warmth and wetness; fruit and nuts in the growing season | Biomes | No species |
| Fire | Fuel × dryness × ignition; lightning (esp. dry), rare rockfall sparks; spreads with wind and uphill; rain extinguishes; burnt ground, roasted nuts, cooked carcasses | The fire triangle; Pyne and others on wildfire | A square burns as a whole; a strike stands for many flashes |
| Fire and people | Withdrawal reflex from heat inborn; burns teach fear; picking up a burning stick, feeding a fire, are learnable | The nociceptive withdrawal reflex is spinal and present at birth | The first controlled use is far later in reality than in a 60-day run |
| Making fire | A skill: very rare when unpractised (sparks from pyrite on stone, or working dry wood); each try is practice; those used to fire learn faster; bystanders learn some by watching | Oldest evidence of fire-making ≈ 400,000 years ago, Barnham, England (reported Dec 2025); fire was kept from natural sources long before; friction fire is known only from recent peoples | Time is compressed ~5 orders of magnitude, so "late" in the model is weeks |
| Tools | Stones, sticks, flakes, pyrite and nuts lie in cells; a hand holds one; striking has physical results (nut cracks; flakes chip) | Oldest stone tools ≈ 3.3 Ma (Lomekwi); Oldowan ≈ 2.6 Ma; nut cracking in chimpanzees, capuchins | Counts per cell, not objects |
| Diet (people) | Cannot digest grass; inborn taste for sweet and savoury/fatty; hunger makes them try plants; roots must be dug (stick helps); meat from bodies (sharp stone helps); rotting meat sickens; conditioned avoidance by pain | Newborn taste preferences (Steiner); one-trial taste aversion (Garcia); tuber digging (e.g. Hadza); stone-flake butchery | Roots are not drawn; people do not eat people |
| Animals | Real sizes, lifespans, maturity, litter sizes, cold limits, habitats; mass-based eating; pack hunting; prey escape | Kleiber (1932) scaling and species data | Only eight kinds |
| Brain | See section 4 | Reinforcement learning; brain growth and pruning in childhood; sleep replay | 64 units; no cortical structure beyond coarse regions |
| Talking | Six sounds; a cry and a scream inborn; meanings arise from use; heard by nearby creatures | Infant cries; vocal learning | No grammar |
| IQ | Same everyday probes put to each brain, scored against others of the same age (mean 100, s.d. 15) | Standardised scoring | Not comparable to human IQ |
| Bodies | Remain where they fell; meat is eaten by hunters and people; fresh for ~2 days then rotting; bones for months | Taphonomy in outline | No insects, vultures or soil return |
| Caves | In stony hills; high cover value: shelter from rain, wind, cold, heat | Karst and sea caves; Palaeolithic cave use | No cave depth or hearth |

## 8. Known limits and validation status

- **Not validated against data.** No formal comparison with archaeological or ecological records has
  been done. Plausible behaviour has been checked by hand and by tests (`npm test`), which check rules
  (e.g. grass gives people almost no energy), not outcomes.
- **Region, not planet.** 384 × 240 km.
- **Small brains, short runs.** 64 thinking units; a 100-day run is under two generations, so cultural
  transmission is only just visible.
- **Time compression.** A year is 3 days, so every process that took millennia happens within days or
  weeks. Order of events may be informative; durations are not.
- **Start as adults**, with a band, not a population.
- **Survival varies a lot with the start position** (e.g. how close a predator begins). Compare many
  seeds, never one.
- **Consciousness.** The model has functional feelings (signals that change learning and choices). It
  makes no claim that anything is experienced.

## 9. Reproducing and citing

```
node tools/experiment.js --seeds 1-50 --days 90 --workers 4 --out run.csv
```

The CSV starts with the version, commit, Node version and settings. Re-running that command on that
commit gives the same file. Cite Genesis with `CITATION.cff` (GitHub shows a "Cite this repository"
button) and state the version or commit.

## References

Grimm V. et al. 2006, 2010, 2020. The ODD protocol for describing agent-based and other simulation
models. *Ecological Modelling* / *JASSS*.
Sutton R.S., Barto A.G. 2018. *Reinforcement Learning: An Introduction*.
Kleiber M. 1932. Body size and metabolism. *Hilgardia* 6.
Garcia J. et al. 1955. Conditioned aversion to saccharin resulting from exposure to gamma radiation.
*Science* 122.
Steiner J.E. 1977. Facial expressions of the neonate infant indicating the hedonics of food-related
chemical stimuli.
Harmand S. et al. 2015. 3.3-million-year-old stone tools from Lomekwi 3, West Turkana, Kenya. *Nature* 521.
Barnham (Suffolk, England) evidence of fire-making about 400,000 years ago, reported December 2025.
