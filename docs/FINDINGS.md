# What keeps a Genesis world alive — a research log

Every time a piece of the real world is added to Genesis, we test whether populations survive better or
worse, and write it down here: what was added, why (the real-world evidence), how it was tested, what
happened, and how much to trust it. Over time this becomes an answer to a real question:

> **Which features of the real world are must-haves for a population of learning creatures to last?**

Entries are kept even when the result was "no effect" or "it made things worse" — those are findings too.

## How the tests are run

- Each test runs many **seeded worlds** with `tools/experiment.js`; a seed fixes everything, so the same
  command on the same commit gives the same result.
- The fairest comparison is **the same seeds, the same code, one feature switched on or off**
  (`--no-vicar`, `--no-picky`, `--old-sound`, `--no-calls`, `--modern-voice`, `--brain N`). Where the
  change itself alters how worlds are generated (for example, adding brain inputs reshuffles the random
  numbers), worlds with the same seed are no longer the same world, and only averages over many worlds
  can be compared — such entries are marked **confounded**.
- "People alive" is the mean number of people alive at the end. With 12 worlds the world-to-world spread is
  large (roughly ±1.5–2 people on the mean), so small differences mean nothing.
- **Evidence strength:** *strong* (large effect, many worlds), *moderate* (clear effect, ~12 worlds),
  *weak* (few worlds or confounded), *none* (no measurable effect).

## Summary: must-haves so far

| Real-world feature | Effect on survival | Strength |
|---|---|---|
| A band of families of all ages (≈25 people, children with mothers, grandmothers) instead of 8 young adults, with parents feeding hungry young and inborn approach/avoid drives | From 3 of 4 worlds dying out (and 1 person left in the 4th) to 3 of 6 worlds thriving after 150 days with 3 generations; child survival to 12 from ~17% to ~56% (foragers ≈50%) | moderate |
| Big carrion birds behaving as real ones do (they wait while predators feed; vultures only in warm lands) | Unrealistic vultures cut survival from 9.2 to 5.8 people; realistic ones restored it (8.8) | moderate |
| Pack breeding limited to one female (reproductive suppression, as in wolves) once mothers paid the real cost of young | Without it predators boomed (17.4 vs 13.2) and people fell (7.2); with it back to 8.7 | moderate |
| Learning from what happens to others (feeling a share of their pain; choosy copying) | 11.1 vs 9.3 alive; predator deaths 33 → 16 | moderate |
| Starting where our species lived (warm tropical land with fresh water, open and wooded ground; no predators at the camp) | 23.1 vs 15.3 alive, better in 10 of 12 worlds; 0 vs 1 die-outs. Range of the difference still includes zero | weak–moderate |
| The real Earth 70,000 years ago instead of a made-up planet | Worlds survive about as well (20.3 alive, none died out) | weak (different worlds) |
| **Not** measurable: hungry people eating the food in reach (fixing a real flaw) | Hunger deaths 170 → 167; survival 23.1 → 24.4 (within noise) | none |
| Many hands feeding a child (family most), and children staying close to carers | Hunger deaths 13.9 → 11.5 per world, predator deaths 5.3 → 8.3; survival unchanged; ranges include zero | weak |
| (Analysis) Predator risk under cooperative care, per person-day at risk | Exposure unchanged; individual risk not clearly changed; encounters +50% but less often fatal; 86–94% of victims had no grown person in reach | moderate (isolation) / weak (risk) |
| **Not** measurable: early hominins sleeping in trees (they did, most nights) | 16.2 vs 14.5 alive; predator deaths 75 vs 69 | moderate (no effect) |
| **Not** measurable: early hominins living on leaves when fruit is short | 14.6 vs 14.8 alive, hunger deaths 168 vs 204 (24 worlds, within noise) | none |
| (Scenario) Early hominin bodies and lives instead of modern ones | 14.5 vs 25.5 alive, no die-outs; old age a main cause of death (shorter, chimpanzee-like life) | weak–moderate (confounded) |
| **Not** a must-have: bigger brains on their own | 64 units: 8.2 alive, 256: 6.1, 1,024: 2.2 | strong |
| **Not** measurable: sound by real physics, animal calls | 7.7 / 6.7 / 7.1 alive (within noise) | none |

What still kills whole bands (open): hunger above all, then predators and wildfire (people only react to heat
beside them).

---

## Log

### 1. Learning from others: vicarious pain and choosy copying — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `2260ea9`.

**Data.** Raw tables were not kept for this test. Re-run: [in the Lab](https://malvika123.github.io/genesis/lab.html?seeds=1-12&days=30&A.earth=0&B.earth=0&B.vicar=0&B.pickyCopy=0) or `node tools/experiment.js --seeds 1-12 --days 30 --no-vicar --no-picky` (on today's code; numbers will differ from the original, since the world has changed since).

**Added.** A person who sees someone nearby hurt, sick or killed feels a weaker share of the pain as its
own learning signal and fear (family and children most; attacks, fire, falls, drowning and bad food
most). Copying favours those doing well, is stronger when unsure, and can follow the majority; how much
each person learns from others is inherited.

**Real-world basis.** Observational fear learning engages the amygdala as direct experience does (Olsson &
Phelps 2007); empathy for pain depends on group membership (Hein et al. 2010); prepared fears (Cook &
Mineka 1990); social learning strategies (Kendal et al. 2018); consistent individual differences, ~20% of
people never use social information (Molleman et al. 2014).

**Test.** 12 worlds × 30 days, same code, three ways (all on; no vicarious pain; neither).

**Result.** First version: vicarious pain alone made no difference (6.9 vs 6.8 alive); choosy copying cut
survival (hunger 42 vs 32) because "copy when unsure" raised overall copying ~40% and the success bias
picked teachers too far away to watch. After recalibrating (typical unsureness → typical copying;
prefer the successful only among those close by): **11.1 alive with both on vs 9.3 with neither;
predator deaths 33 → 16.**

**Strength.** Moderate (12 worlds). **Lesson:** how much creatures copy matters as much as whom they copy.

### 2. Closing the food chain: decay, scavengers, soil — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `3383311`, `2ee8087`.

**Data.** Raw tables were not kept for this test. No switch turns this feature off, so it can only be re-run by comparing commits.

**Added.** Bodies are eaten by insects and microbes at a pace set by warmth (most of a carcass gone in about
three weeks of summer; none while frozen); carrion birds; soil enriched by rot and dung feeds the grass.

**Real-world basis.** Carcass decomposition and "cadaver decomposition islands" (Carter et al. 2007; >90%
mass loss in ~20 days for small carcasses in summer); vultures in the Serengeti eat much of the carrion
(Houston); at kills, large carnivores feed first and scavengers wait; vultures live in warm lands, ravens
and eagles scavenge in the north (Wilmers et al. 2003).

**Test.** 12 worlds × 40 days: before; with vultures that stripped any carcass within a day; with
realistic vultures.

| | People alive | Predator kills of people | Hunters at end |
|---|---|---|---|
| No food chain | 9.2 | 39 | 12.1 |
| Unrealistic vultures | 5.8 (1 world died out) | 45 | 14.5 |
| Realistic vultures | 8.8 (none died out) | 31 | 13.2 |

**Interpretation.** When vultures took predators' leftovers, predators hunted more — including people. When
vultures wait their turn, as on Earth, the effect disappears. **Strength:** moderate. **Lesson:**
competition between scavengers and predators is part of what keeps prey (people) safe.

### 3. Pregnancy, and what really limits wolves — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `b283830`, `d65cb23`.

**Data.** Raw tables were not kept for this test. No switch turns this feature off, so it can only be re-run by comparing commits.

**Added.** Gestation for each species' real length; part of the cost during pregnancy and most of it as
milk afterwards; loss when the mother starves; labour pain; ~1% maternal death per human birth.

**Finding along the way.** In the old code a mother paid her whole litter's cost in one instant at birth,
often more energy than she had, so many mother wolves **died right after giving birth**: an unrealistic
accident that was quietly keeping predators down. With realistic costs, predators boomed (17.4 hunters vs
13.2) and people suffered (7.2 alive, 2 worlds died out).

**Fix from the real world.** In a wolf pack only one female breeds; the others' breeding is suppressed
(reproductive suppression in wolves and wild dogs). With it: 8.7 people, 13.5 hunters, fish and
plant-eaters at normal numbers.

**Also learned.** Charging every young the same cost crashed fish (a clutch of eggs is cheap); costs now
scale with what young really cost.

**Strength.** Moderate (12 worlds per version; versions confounded by changes to random numbers).
**Lesson:** an unrealistic mechanism can hide another missing one — remove a hack and look for the real
regulator.

### 4. Sound by the physics of air, and animal calls — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `abba6ef`, `36fd2e8`.

**Data.** Raw tables were not kept for this test. Re-run: [in the Lab](https://malvika123.github.io/genesis/lab.html?seeds=1-12&days=40&A.earth=0&B.earth=0&B.soundPhysics=0&B.animalCalls=0) or `node tools/experiment.js --seeds 1-12 --days 40 --old-sound --no-calls` (on today's code; numbers will differ from the original, since the world has changed since).

**Added.** Spherical spreading, air absorption by pitch and humidity, foliage, wind and day/night
refraction, background noise; wolves howl, big cats roar, plant-eaters snort an alarm.

**Test.** The same 12 worlds × 40 days three ways: old hearing rule and silent animals; physics with silent
animals; physics with calls.

**Result.** 7.7 / 6.7 / 7.1 people alive — within noise. Predator kills of people were lower with animal
calls (35) than without (51), but hunger moved the other way. **Strength:** none for survival; the
predator-warning effect is a hypothesis worth testing with more worlds.

### 5. Bigger brains — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `861bec8`.

**Data.** Raw tables were not kept for this test. Re-run: [in the Lab](https://malvika123.github.io/genesis/lab.html?seeds=1-24&days=40&A.earth=0&B.earth=0&B.brain=256) or `node tools/experiment.js --seeds 1-24 --days 40 --brain 256` (on today's code; numbers will differ from the original, since the world has changed since).

**Test.** 24 worlds × 40 days at each of 64, 256 and 1,024 thinking units per person.

| Brain | People alive | Worlds died out | Hunger deaths |
|---|---|---|---|
| 64 | 8.2 ± 1.3 | 3 | 94 |
| 256 | 6.1 ± 1.1 | 3 | 134 |
| 1,024 | 2.2 ± 0.6 | 6 | 119 |

**Interpretation.** Not the brain's energy cost (it is capped the same at every size) but learning speed:
more connections to tune from the same few experiences in a short life. Matches the biology that big
brains pay only with a long, provisioned childhood. **Strength:** strong. **Lesson:** a bigger brain is
not a must-have; the conditions to learn with it are.

### 6. Pair bonds and fidelity — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `e7b30bb`, `80459a4`.

**Data.** Raw tables were not kept for this test. No switch turns this feature off, so it can only be re-run by comparing commits.

**Added.** Bonds that grow with time together and mating, partner preference; later, bonded partners feel
less pull toward others (oxytocin: Scheele et al. 2012).

**Result.** Share of siblings who share a father: ~30% → ~49% (humans ≈66%: Dyble 2026; chimpanzees 4%).
Letting males mate again soon after (as real males can) lowered it to ~19% in one run, and later runs
gave 40–54%. Survival unchanged within noise. **Strength:** weak–moderate. Not a survival must-have in
these runs.

### 7. Surviving as our ancestors did — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `420938b`, `5be5d25`.

**Data.** Raw tables were not kept for this test. No switch turns this feature off, so it can only be re-run by comparing commits.

**Problem.** 40-day checks looked fine, but long runs showed slow collapse: 4 worlds × 300 days with 8 young
founders — 3 died out (days 100, 173, 277), 1 person left in the 4th. A trace of two worlds: bands fell
from 8 to 2–4 within 30 days; 5 of 6 children died before 12 (~83%); skills found once (fishing) were
almost never repeated.

**Added.** A band of 25 of all ages (Kelly 2013: bands of 20–40); parents and grandmothers moved to feed
their own hungry young; inborn approach to visible food and fresh water when hungry or thirsty and
wariness of big hunters; a big unexpected success sticks after one try and striking memories are replayed
most in sleep; swimming (instinctive for animals, learned by people).

**Result.** Trace of the same two worlds × 120 days: world 101 kept 8 people alive at day 120 (vs 0),
**23 of 41 children reached 12 (~56%; foragers ≈50%)**, 7 people caught fish, one six times. World 103
still died out (predators 13, hunger 11; the band had started where days reached 42–44 °C). Long check, 6
worlds × 150 days: **3 worlds alive with 9, 34 and 10 people after 3 generations; 3 died out** (predators
22 and 15; one wildfire killed 19). Someone learned to swim in every world; fire was made once.

**Strength.** Moderate for the overall change (it bundles several features; their separate contributions
are not yet measured — an ablation is needed). **Lesson:** group size, family structure and provisioning
of children look like must-haves; so does keeping what one success taught.

### 8. Where the first band starts — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `6df8325`.

**Data.** Raw tables: [starts where our species lived](../data/findings/08-where-the-band-starts/starts-where-our-species-lived.csv) · [starts anywhere](../data/findings/08-where-the-band-starts/starts-anywhere.csv). Re-run: [in the Lab](https://malvika123.github.io/genesis/lab.html?seeds=1-12&days=60&A.earth=0&B.earth=0&B.homeland=0) or `node tools/experiment.js --seeds 1-12 --days 60 --any-start` (on today's code; numbers will differ from the original, since the world has changed since).

**Added.** The first band starts where our species really lived: within the tropics, in warm country
(average 18–27 °C, not desert-hot), with fresh water within a few squares, open grassland and woodland
both close by, and — on the real Earth — in Africa; no big hunter is placed near the camp at the start.
Before, the band started anywhere within 36° of the equator near water, and once (entry 7, world 103)
started where days reached 42–44 °C.

**Real-world basis.** Homo sapiens arose in Africa about 300,000 years ago (Jebel Irhoud: Hublin et al.
2017) and lived there, across many regions (Scerri et al. 2018), until groups spread out of Africa about
70,000–50,000 years ago. Early sites sit in mosaics of grassland and woodland near water (Potts 2013,
variability selection; Blome et al. 2012, African palaeoenvironments).

**Test.** 12 worlds × 60 days, seeds 1–12, made-up planet, the same code (commit 6df8325) with the new start
and with `--any-start`. The start changes where everyone is placed, so after the first steps the two worlds
of a seed diverge; the comparison is fair on average, not world for world.

| | People alive | Worlds died out | Hunger | Predators | Burned | Drowned |
|---|---|---|---|---|---|---|
| Starts anywhere (old) | 15.3 ± 2.7 | 1 | 196 | 78 | 43 | 46 |
| Starts where our species lived | 23.1 ± 4.2 | 0 | 170 | 85 | 37 | 62 |

**Result.** +7.8 people on average, and more people in 10 of the 12 seeds. But the worlds vary a lot (from 2
to 52 people with the new start), and the range the true difference probably lies in (± two standard
errors: −2 to +18) still includes zero. Deaths to predators did **not** fall, although keeping hunters
away from the camp was meant to protect the band; fewer died of hunger and fire.

**Strength.** Weak–moderate: a consistent direction, not yet a clear effect. Needs 24+ worlds.
**Lesson:** the place a population starts matters at least as much through food and water as through
danger; the expected mechanism (fewer predator deaths) was not what moved.

### 9. The real Earth, 70,000 years ago — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `6df8325`.

**Data.** Raw tables: [real Earth](../data/findings/09-real-earth/real-earth.csv) (its header names commit `27649dd`: the run used the working tree that was committed as `6df8325`). Re-run: [in the Lab](https://malvika123.github.io/genesis/lab.html?seeds=1-12&days=60&compare=0&A.earth=1) or `node tools/experiment.js --seeds 1-12 --days 60 --earth` (on today's code; numbers will differ from the original, since the world has changed since).

**Added.** A choice of land: the real Earth's continents, mountains and sea floors (NOAA ETOPO1: Amante &
Eakins 2009) with the sea about 80 m lower, as it stood about 70,000 years ago (Spratt & Lisiecki 2016;
Grant et al. 2014), so Beringia, Sundaland, Sahul and Doggerland are dry land; three years of weather run
first so the rains set the deserts and forests. Not yet: ice sheets, the colder climate, monsoons.

**Test.** 12 worlds × 60 days on the real Earth (`--earth`), seeds 1–12, with the new start (in Africa).

**Result.** 20.3 ± 3.3 people alive, none died out (made-up planet: 23.1). Fewer deaths to predators (50) and
fire (5) than on the made-up planet (85 and 37); hunger the same (197). The worlds differ completely, so
this says only that populations survive about as well on the real map, not why the causes shift.

**Strength.** Weak (different worlds). **Lesson:** the real geography is no harder to live on than the
invented one, so it can be the default without losing populations.

### 10. Eating the food in reach — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `f310b5b`, `78a1437`.

**Data.** Raw tables: [after the change](../data/findings/10-eating-food-in-reach/eating-fix.csv) · [before (the same as entry 8)](../data/findings/10-eating-food-in-reach/before.csv). No switch turns this change off.

**Problem.** Hunger kills more people than anything else, yet a trace of every hunger death (3 worlds × 40
days, 18 deaths) found food — fruit, nuts, roots — within reach in nearly every case: 10 of the 18 were
children (7 of them orphans), 12 were alone or nearly so, and some went 6–11 days without eating. Measured
moment by moment, a hungry person standing on fruit ate it only **7%** of the time (children 4%).

**Cause.** The inborn pull "when hungry, go toward food you can see" kept working when food was already
underfoot, and grass (which people see as food but cannot digest) is everywhere, so the eight "walk"
choices together outweighed "eat". Brains had also learned that eating rarely pays (chewing grass and
digging roots barehanded mostly fail), which drowned out the inborn taste for sweet fruit.

**Added.** Seeking food and eating it as two phases, as in every animal (appetitive and consummatory
behaviour): once liked food is in reach, the urge to go looking stops; and a stronger inborn pull to eat
sweet or fresh food when hungry. Eating on fruit rose from 7% to 23% of hungry moments; most of the rest
was exhausted people going off to find somewhere safe to sleep.

**Test.** 12 worlds × 60 days, seeds 1–12, made-up planet, the realistic start, before and after (worlds
diverge after the first steps, so only averages compare).

| | People alive | Worlds died out | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|
| Before | 23.1 ± 4.2 | 0 | 170 | 85 | 62 | 37 |
| After | 24.4 ± 4.4 | 0 | 167 | 63 | 54 | 34 |

**Result.** **No measurable effect on hunger deaths** (170 → 167); survival within noise. People now eat the
fruit they stand on, but that was not what was killing them.

**Strength.** None (for survival). **Lesson:** fixing a real flaw is not the same as fixing the cause. The
deaths point elsewhere: weaned children and orphans left to feed themselves, and people alone. Among real
foragers children are fed by many adults for years — they produce less than they eat until their teens
(Kaplan et al. 2000) — and bands stay and move together.

### 11. Many hands feed a child, and children stay close — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `e0e98d9`.

**Data.** Raw tables: [with the change](../data/findings/11-feeding-children/with-cooperative-care.csv) · [before (the same as entry 10)](../data/findings/11-feeding-children/before.csv). No switch turns this change off.

**Added.** (1) A grown person with food in its belly is moved to feed a hungry child close by: its own child
or grandchild most, its younger brothers, sisters, nephews and nieces less, and any other child of the band
only as far as a new inherited trait, care for others' young, reaches (it varies, is passed on, and is
recorded as `cares_for_others`). (2) Children stay close to those who care for them: a small child to its
mother, or if she is gone or out of sight to the nearest grown person of the band; an older child within
reach of the band; the pull grows with distance and fear.

**Real-world basis.** Among living foragers many hands feed a child — mothers, grandmothers, fathers,
siblings, others — with family helping most (cooperative breeding: Hrdy 2009; Kramer 2010); Hadza
grandmothers' foraging improves grandchildren's growth (Hawkes et al. 1998); children produce less than they
eat until their late teens (Kaplan et al. 2000); orphans still die more often (Hill & Hurtado 1996, Ache);
young children's attachment to caregivers is inborn (Bowlby 1969), and older forager children forage near
camp in groups rather than alone.

**Test.** 12 worlds × 60 days, seeds 1–12, made-up planet, the realistic start, before and after (worlds
diverge after the first steps, so only averages compare).

| | People alive | Worlds died out | Hunger (per world) | Predators (per world) | Drowned | Burned | Generations |
|---|---|---|---|---|---|---|---|
| Before | 24.4 ± 4.4 | 0 | 167 (13.9) | 63 (5.3) | 54 | 34 | 1.75 |
| After | 24.7 ± 3.0 | 0 | 138 (11.5) | 100 (8.3) | 50 | 38 | 1.83 |

**Result.** Hunger deaths fell by about a sixth (−2.4 per world, likely between −6.3 and +1.5) and predator
deaths rose (+3.1 per world, likely between −3.2 and +9.4); both ranges include zero. Survival unchanged.
Worlds varied less (± 3.0 instead of ± 4.4).

**Interpretation.** In the expected direction for hunger, but not yet clear with 12 worlds. One plausible
reading is that children now survive hunger long enough to meet other dangers, or that the band clusters
and draws predators; neither is tested.

**Strength.** Weak. Needs 24+ worlds, and a trace of who now dies of hunger and to predators.
**Lesson:** feeding children may move deaths from hunger to predators rather than prevent them; what
protected forager children from predators (camps, adults close by, fire) matters too.

### 12. Did caring for children put them in more danger from predators? — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `e0e98d9`; the test: commit `c9a03ab` (the
`--no-care` switch and `tools/analysis/predators.js`).

**Data.** Raw tables: [with care](../data/findings/12-predator-risk/with-care.jsonl) · [without care](../data/findings/12-predator-risk/without-care.jsonl) · [the comparison](../data/findings/12-predator-risk/comparison.txt). Re-run: `node tools/analysis/predators.js --seeds 1-24 --days 60 --out a.json` and the same with `--no-care`, then `node tools/analysis/compare-predators.js --a a.jsonl --b b.jsonl`.

**Question.** Entry 11 found more predator deaths (63 → 100) after many hands fed children. A reviewer
(ChatGPT, consulted by the owner) pointed out that a total is not a risk: if fewer people starve, more are
alive to be caught. So: deaths per person-day at risk, by age; encounters as well as kills; and who the
victims were.

**Test.** 24 worlds × 60 days, seeds 1–24, made-up planet, the realistic start. With an on/off switch each
seed starts from the identical world with and without care, so differences are taken seed by seed. An
encounter is a big hunter within 1.5 squares of a person in a 15-minute step.

| | Person-days | Predator deaths | Per 1,000 person-days (pooled) | Mean of world rates | Encounters per 1,000 person-days | Kills per encounter |
|---|---|---|---|---|---|---|
| Without care | 41,799 | 111 | 2.66 | 4.76 | 37 | 0.072 |
| With care | 41,232 | 139 | 3.37 | 3.84 | 55 | 0.062 |

By age (with care / without): children 3–11, encounters 122 / 80 per 1,000 person-days, kills per encounter
0.020 / 0.024; babies 0–2, encounters 16 / 6.

**Result.** (1) **Exposure did not change**: the same person-days either way, so more deaths are not
explained by more people alive. (2) **Individual risk is not clearly higher**: the pooled rate rose (2.66 →
3.37) but the average of each world's rate fell (4.76 → 3.84; paired difference −0.92 per 1,000 person-days,
likely between −5.0 and +3.1) — the two measures disagree in direction, a few large worlds carry the
pooled figure, and neither is beyond noise. (3) **Encounters rose by half, but each was less often fatal** —
the signature of children staying close to the group: more people near any predator that comes, each
safer (safety in numbers; Beauchamp et al. 2021). (4) **Victims were almost always alone**: 94% (with care)
and 86% (without) had no grown person within reach; they died a median 14 and 9 squares from the band's
centre; only 19% and 30% were asleep; a third were children in both.

**Strength.** Moderate for "exposure did not change" and "victims are isolated"; weak for any change in
individual risk. **Lesson:** what kills is being alone, not being asleep; the protection real foragers had
from predators lay in staying with others. The next test should be about isolation (alarm calls that
bring others close, groups that deter a predator), not about sleeping sites.

### 13. Shelters as a possibility — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `47a6ebe`, `9662925` (the `--no-shelter` switch).

**Data.** Raw tables: [shelters possible](../data/findings/13-shelters/shelters-possible.csv) · [no shelters](../data/findings/13-shelters/no-shelters.csv). Re-run: [in the Lab](https://malvika123.github.io/genesis/lab.html?seeds=1-12&days=60&A.earth=0&B.earth=0&B.shelter=0) or `node tools/experiment.js --seeds 1-12 --days 60 --no-shelter`.

**Added.** Only the possibility, never the knowledge: branches can now be heaped in one place (up to 16, where
no more than 4 ever fall naturally), and a heap of more than four is cover — against wind and rain, and from
being seen — growing to as much as a cave's at twelve or more. A heap settles and rots faster than branches
lying about, so a shelter needs keeping up. Nothing tells anyone to carry branches or to build; the existing
inborn pull of a tired person toward cover would draw people to a shelter someone made, as it draws them
to a cave. The first time anyone sleeps in a heap is recorded as a discovery (`day_shelter`), like fire.

**Real-world basis.** Building a shelter is learned, not inborn: even chimpanzees, who build a nest every
night, learn to build well over years by practice and watching (captive chimpanzees raised without others
build poorly); human shelters — windbreaks, brush and grass huts — are culture. Choosing a sheltered
place to sleep is closer to instinct (Anderson 1998).

**Test.** 12 worlds × 60 days, seeds 1–12, made-up planet, with and without the possibility (the same
starting world each seed).

**Result.** **Nobody built a shelter in any world**, and the worlds were identical with and without the
possibility, to the last death (24.7 people alive; hunger 138, predators 100). So it changes nothing until
someone discovers it, and its cost to anyone who never does is nil.

**Strength.** None (no effect, as expected in 60 days). **Lesson:** a possibility that pays off only later
— carry now, sleep warm days afterwards — is hard for a young learning brain to find; whether anyone ever
does over many generations is a question for long runs.

### 14. Whom do predators take? — Nov 2026

**Version.** Unreleased (after 0.7.0) · the test: commit `eaa479e` (`tools/analysis/prey-selection.js`).

**Data.** Raw tables: [seeds 1–6](../data/findings/14-prey-selection/seeds-1-6.json) · [seeds 7–12](../data/findings/14-prey-selection/seeds-7-12.json). Re-run: `node tools/analysis/prey-selection.js --seeds 1-12 --days 30 --out sel.json`.

**Question.** Real predators take the young, the weak and the isolated far more often than chance, and big
cats and wolves hunt mostly at dusk and night (wolves: Mech & Peterson 2003; cheetahs: FitzGibbon 1990;
raptors: Genovart et al. 2010). Predators in Genesis learn with their own brains; do they hunt like this?

**Test.** 12 worlds × 30 days, seeds 1–12, made-up planet. For every kill, the victim's class (young; weak:
hurt or starving; alone: no other of its kind within 2 squares; night) against the share of time at risk
everyone spent in that class. Selectivity = share of kills ÷ share of time; 1 is chance.

| Selectivity (share of kills / share of time) | People (66 killed) | Plant-eaters (167 killed) |
|---|---|---|
| Alone | **2.45** (65% / 27%) | **2.39** (35% / 15%) |
| Weak | 1.09 (6% / 6%) | **1.76** (20% / 11%) |
| At night | 1.18 (59% / 50%) | 1.16 (58% / 50%) |
| Young | **0.57** (26% / 45%) | 0.95 (18% / 19%) |

**Result.** As on Earth, predators take the **isolated** (about 2.4 times chance, beyond noise) and
weak plant-eaters (1.8 times); they kill somewhat more at night (1.2 times; real big cats more so). But
they take **the young less than chance** — the opposite of real predators. Looking for why found a rule
from an early version: **the founding generation's young of every kind cannot be taken by predators at
all** (`edible` in `src/senses.js`). Nearly half of people's time at risk in the first weeks is spent as
children, many of them founders, so the rule hides how dangerous predators really were for children.

**Strength.** Moderate (isolation, weak plant-eaters); weak (night); the youth result is distorted by the
rule. **Lesson:** measuring what a model does against what the real world does finds hidden protections;
this one should go, with its own test.

### 15. Removing the hidden protection of founders' children — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `44334ec` (the old rule kept as `--shield-founders`).
Run on the modern-human world, before the early-hominin patches.

**Data.** Raw tables: [without the protection](../data/findings/15-founder-protection/without-protection.jsonl) · [with the old protection](../data/findings/15-founder-protection/with-old-protection.jsonl) · [the comparison](../data/findings/15-founder-protection/comparison.txt).

**Question.** Entry 14 found a leftover rule: predators could not take the founding generation's young.
What changes without it, and does it explain why predators took children less often than chance?

**Test.** 11 worlds × 60 days (seeds 1–11; seed 12 was cut off by a time limit), the same starting world
each seed with and without the rule.

| | People alive | Worlds died out | Hunger | Predator deaths | Children 3–11 killed by predators |
|---|---|---|---|---|---|
| With the old protection | 25.1 ± 3.3 | 0 | 123 | 91 | 21 |
| Without it | 25.9 ± 3.7 | 1 | 119 | 86 | 22 |

**Result.** **Almost no difference**: nine of the eleven worlds ended exactly the same either way — within
60 days the rule rarely came into play — and survival, hunger and predator deaths, children's included,
were unchanged within noise. One world (seed 4) died out without the protection; one did better.

**Interpretation.** The rule was unrealistic and is gone, but it was **not** what made predators take
children less often than chance in entry 14 — that guess was wrong. Children are probably taken less
because they now stay close to grown people (entries 11–12), and predators take the isolated.

**Strength.** Moderate for "little effect over 60 days" (paired worlds). **Lesson:** check a plausible
explanation before believing it — even one you found yourself.

### 16. Early hominin bodies and lives, against modern humans — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commits `4497669` (patch 3) and `4b1ef6d` (verified numbers); the test: commit `0aa8364`. Run by Claude.

**Data.** Raw tables: [hominins, sleeping on the ground](../data/findings/16-hominin-bodies/hominins-ground.csv) · [modern humans](../data/findings/16-hominin-bodies/sapiens.csv) · [the comparison](../data/findings/16-hominin-bodies/comparison.txt). Re-run: `node tools/experiment.js --seeds 1-12 --days 60 --no-trees --workers 8 --out hnotrees.csv` and the same with `--sapiens`.

**Added.** Early hominins of about 2.5 million years ago in place of modern bodies (patch 3 of `docs/HOMININ-PLAN.md`):
three-quarters of a forager's size, still hairy, chimpanzee-like growth, pregnancy, weaning and births, a
shorter life, and a brain about a third of ours (smaller at birth) that is inherited and can evolve.

**Real-world basis.** Each number and its source is in `docs/ASSUMPTIONS.md` (australopith body and brain
sizes; wild chimpanzee life history as a proxy: Emery Thompson et al. 2007, Wood et al. 2017, Kelley &
Schwartz 2012).

**Test.** 12 worlds × 60 days, seeds 1–12, made-up planet; hominins with tree-sleeping off (to isolate the
bodies) against Homo sapiens without culture. **Confounded:** the two scenarios have different bodies and
founders' ages, so a seed does not give exactly the same world; compare averages, not seeds.

| | People alive | Worlds died out | Hunger | Predators | Drowned | Burned | Old age |
|---|---|---|---|---|---|---|---|
| Modern humans | 25.5 ± 11.9 | 1 | 136 | 88 | 51 | 32 | 3 |
| Early hominins (no trees) | 14.5 ± 9.5 | 0 | 92 | 69 | 21 | 22 | 65 |

**Result.** The hominin world **still works**: no world died out (one modern-human world did), and
generations were about the same (1.6 against 1.8). Hominins ended with about **11 fewer alive** (range of
the difference −22 to −0.1, lower in 8 of 12 worlds). Fewer died of hunger, predators, drowning and fire —
but there were fewer of them to die — while **old age** became a main cause of death: about 5 a world in
60 days (20 simulated years), against almost none.

**Interpretation.** Most of the gap is the shorter, chimpanzee-like life: founders' ages follow that life
history (adults 15–33, elders 37–50) and each body's lifespan averages about 43 years (27–60), so many
founders reach the end of theirs within the 20 years of the run, while births come about 4.6 years apart
instead of about 3. That matches what the evidence says these lives were like; it is not tuned. Whether
the smaller brain also cost survival cannot be separated here.

**Strength.** Weak–moderate (confounded worlds; the difference is large but its range nearly touches zero).
**Lesson:** a realistic ape-like life history alone lowers numbers sharply over 20 years; long runs must
show whether births keep up with deaths.

### 17. Sleeping in trees — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `3ead00b` (patch 4; `--no-trees` turns it off); the test: commit `0aa8364`. Run by Claude.

**Data.** Raw tables: [on the ground](../data/findings/17-sleeping-in-trees/ground.csv) · [in trees](../data/findings/17-sleeping-in-trees/trees.csv) · [the comparison](../data/findings/17-sleeping-in-trees/comparison.txt). Re-run: `node tools/experiment.js --seeds 1-12 --days 60 --workers 8 --out htrees.csv` against entry 16's `hnotrees.csv`.

**Added.** Early hominins settling to sleep where tree cover is at least 0.4 climb into the tree (a small
child goes up with its mother); wolves cannot reach them there, big cats and bears catch them at about a
third of the usual rate; now and then a sleeper falls.

**Real-world basis.** All great apes sleep in trees or other safe places (Anderson 1998); australopith arms
and fingers suggest part-time climbing (debated); leopards do take primates from sleeping trees (Busse
1980); falls injure and kill apes (Kappelman et al. 2016). The 0.4, × 0.35 and fall rate are assumptions
(`docs/ASSUMPTIONS.md`).

**Test.** 12 worlds × 60 days, seeds 1–12, made-up planet, the same starting world each seed with and
without tree-sleeping. A check on seeds 1 and 5 over 10 days: 63% and 51% of hominins' sleep was spent up
a tree (71% and 61% of it was where a tree was big enough).

| | People alive | Worlds died out | Hunger | Predator deaths | Plant-eaters | Hunters |
|---|---|---|---|---|---|---|
| On the ground | 14.5 ± 9.5 | 0 | 92 | 69 | 61.8 | 10.1 |
| In trees | 16.2 ± 10.6 | 1 | 97 | 75 | 66.9 | 14.8 |

**Result.** **No measurable difference.** Survival +1.7 (range −5.6 to +8.9; better in 6 worlds, worse in
5); predator deaths 69 against 75 — not fewer. One world (seed 3) died out with tree-sleeping (2 left
without it). Hunters ended somewhat more numerous (range −0.7 to +10.2).

**Interpretation.** Hominins did sleep in trees most nights, yet predator deaths did not fall: as entries 12
and 14 found, predators take the isolated and awake, rarely sleepers, so a safe bed does not touch what
kills them. Tree-sleeping stays because the evidence supports it, not because it helps here.

**Strength.** Moderate for "no effect over 60 days" (paired worlds; the range is wide).
**Lesson:** a realistic behaviour can be right without mattering in the model; what kills here is
straying alone by day.

### 18. Leaves as a fallback food — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change and the test: commit `70199ff` (`--no-leaves`, `--leaf-value`). Run by Claude.

**Data.** Raw tables: [no leaves](../data/findings/18-leaves/no-leaves.csv) · [leaves 0.64](../data/findings/18-leaves/leaves-0.64.csv) · [leaves 0.48](../data/findings/18-leaves/leaves-0.48.csv) · [the comparison](../data/findings/18-leaves/comparison.txt) · [fire-death trace](../data/findings/18-leaves/fire-trace.jsonl) · seeds 13–24: [no leaves](../data/findings/18-leaves/no-leaves-seeds-13-24.csv), [leaves 0.64](../data/findings/18-leaves/leaves-0.64-seeds-13-24.csv). Re-run: `node tools/experiment.js --seeds 1-12 --days 60 --workers 4 --out leaves.csv` (with `--no-leaves`, `--leaf-value 0.48`); trace: `node tools/analysis/fire-trace.js 11 leaves`.

**Added.** Early hominins can eat young leaves where tree cover is above 0.3, when there is no fruit, roots or
meat to eat; leaves give 0.64 of ripe fruit's food a minute. Modern people get nothing from them.

**Real-world basis.** Chimpanzees spend about a fifth of their feeding time on leaves and lean on them when
fruit is scarce (Budongo 19.7%; Ngogo: Watts et al. 2012); at Kibale young leaves gave 7.8 kcal a minute against
12.2 for ripe fruit (4.7 against 9.7 if fibre is not fermented: Uwimbabazi et al. 2016), hence 0.48–0.64.

**Test.** 12 worlds × 60 days, seeds 1–12, made-up planet, the same starting worlds without leaves and at both
ends of the range. The run without leaves reproduced entry 17's tree-sleeping run exactly, row for row.

| | People alive | Worlds died out | Hunger | Predators | Burned | Drowned |
|---|---|---|---|---|---|---|
| No leaves | 16.2 ± 10.6 | 1 | 97 | 75 | 17 | 24 |
| Leaves 0.48 | 12.2 ± 8.6 | 2 | 88 | 52 | 44 | 47 |
| Leaves 0.64 | 14.1 ± 9.8 | 0 | 73 | 61 | 50 | 20 |

**Twelve more worlds** (seeds 13–24, to test whether the rise in fire deaths was real; 4 workers):

| 24 worlds | People alive | Worlds died out | Hunger | Predators | Burned | Drowned |
|---|---|---|---|---|---|---|
| No leaves | 14.8 ± 9.0 | 1 | 204 | 107 | 53 | 53 |
| Leaves 0.64 | 14.6 ± 8.1 | 0 | 168 | 97 | 71 | 50 |

**Result.** **No clear effect.** Hunger deaths fell somewhat at 0.64 (lower in 8 of 12 worlds) and predator
deaths at both values, but every difference's range includes zero; survival did not rise (at 0.48 it was lower
in 8 of 12 worlds, range −8.3 to +0.3). Deaths by fire rose at both values, from 17 to 44–50.

**Tracing the fire deaths** (seeds 9 and 11, with and without leaves): the guess that eating leaves keeps
hominins in the woods, where wildfires burn, was **wrong** — with leaves they spent *less* time under trees
(57% against 63%; 37% against 43%), ate leaves in under 1% of their time, and none of the 32 victims was
eating leaves when it died. The deaths came in bursts: one wildfire catching a band (17 deaths on days 6–7 in
seed 11). In seed 9, six of the fifteen victims were striking with something in the hand as they died — not
yet understood.

**The extra worlds.** In seeds 13–24 fire deaths went the other way (36 without leaves, 21 with). Over all 24
worlds the difference is within noise (53 against 71; more deaths in 5 worlds, fewer in 9; range −1.3 to +2.8 a
world). Hunger deaths 204 against 168 (−18%; range includes zero); survival the same (14.8 against 14.6).

**Interpretation.** Hominins hardly use leaves when other food is about, so the change is small. The rise in
fire deaths in the first 12 worlds was **chance**: any change in behaviour makes a world play out differently,
and whole-band deaths in one wildfire are rare, large events. Leaves stay, because the evidence supports them.
The deeper issue is the one already known: hominins only react to fire beside them, while real savanna
chimpanzees watch a wildfire and move calmly ahead of it (Pruetz & LaDuke 2010, Fongoli).

**Strength.** None (24 worlds): no measurable effect on survival, hunger or fire. **Lesson:** a cause that
sounds right (leaves → woods → fire) has to be traced; a striking result in 12 worlds can vanish in the next
12, especially for rare mass deaths.

---

## Open questions (next tests)

- Ablate the bundle in entry 7: which of band size, parental feeding, instincts, one-shot memory and
  swimming carry the effect?
- Hunger: does the fall in hunger deaths with cooperative care (entry 11) hold with 24+ worlds?
- Fire: how do real apes respond to a
  wildfire (Pruetz & LaDuke 2010), and does the model lack it? Why were six victims in seed 9 striking as they died?
- Why do predators take children less often than chance (entry 14), if not because of the old protection
  (entry 15)? Is it children staying close to grown people?
- Predators kill the isolated (entries 12, 14): do alarm calls that draw others close, or groups that deter a
  predator, reduce deaths of people who stray?
- Where the band starts: does the +8 people hold with 24+ worlds, and is it the water, the food or the
  temperature that carries it? Does fleeing wildfire realistically stop the fire deaths?
- On the real Earth: what do ice sheets, the colder climate and monsoons change?
- Do animal calls reduce predator deaths with 24+ worlds?
- Over 300+ days and many generations, does anyone discover shelters or fire-making? Do voice control, pointing and the brain's word area evolve?

## Adding an entry

Copy this outline: **Version** (release, and the commit of the change) · **Data** (raw tables in
`data/findings/`, a Lab link, the command) · **Added** (what, in a sentence or two) · **Real-world basis** (with sources) ·
**Test** (worlds × days, seeds, what was compared, commit) · **Result** (numbers) · **Interpretation** ·
**Strength** · **Lesson**. Keep results that disappoint.
