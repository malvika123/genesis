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

---

## Open questions (next tests)

- Ablate the bundle in entry 7: which of band size, parental feeding, instincts, one-shot memory and
  swimming carry the effect?
- Hunger: does the fall in hunger deaths with cooperative care (entry 11) hold with 24+ worlds, and why
  did predator deaths rise? What protected forager children from predators — camps, adults close, fire?
- Where the band starts: does the +8 people hold with 24+ worlds, and is it the water, the food or the
  temperature that carries it? Does fleeing wildfire realistically stop the fire deaths?
- On the real Earth: what do ice sheets, the colder climate and monsoons change?
- Do animal calls reduce predator deaths with 24+ worlds?
- Over 300+ days and many generations, do voice control, pointing and the brain's word area evolve?

## Adding an entry

Copy this outline: **Version** (release, and the commit of the change) · **Data** (raw tables in
`data/findings/`, a Lab link, the command) · **Added** (what, in a sentence or two) · **Real-world basis** (with sources) ·
**Test** (worlds × days, seeds, what was compared, commit) · **Result** (numbers) · **Interpretation** ·
**Strength** · **Lesson**. Keep results that disappoint.
