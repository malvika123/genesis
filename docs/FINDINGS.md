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
| Hominins fertile until about 50, as wild chimpanzees (they had kept people's rule, which ended it at about 26) | Births per world 12.2 → 25.7; 22.9 vs 14.1 alive, better in 10 of 12 worlds | strong |
| An inborn pull toward a ready partner | Births 25.7 → 28.0 at the strongest; survival within noise | weak |
| Quicker conception after losing a nursing baby; smaller bodies needing less food | Small rises in births; hunger −21% (body size); survival within noise | weak |
| **Not** what keeps hominins hungry: grass looking like food (a leftover, fixed) | Hunger deaths unchanged | none |
| Bands now last: 6 of 8 worlds alive after 67 years, the best at 112 over 5 generations; 622 births for 573 deaths; learning from others bred out across generations (also with practised founders) | Long runs; the other inborn traits do not move in 4–5 generations | moderate |
| Hunger and thirst come first | Hunger deaths 109 → 69 (−37%); births 27 → 30; but drownings doubled, 11 of 12 drowned were children | weak–moderate |
| Moving as one choice, not eight (walking 70–80% → 25%) | Predator deaths 60 → 3; drownings 39 → 18; but hunger deaths 80 → 115 | moderate |
| A mother keeps her nursing child near | 31 alive vs 25, better in 9 of 12; drownings and fire deaths about halved | weak–moderate |
| **Learning by watching not detected** for easy skills, once being near the means is counted (copying on vs off, born in the run, 12 worlds, a checked tool): nut cracking is found alone; a tradition needs a hard skill | 12 worlds per arm | moderate |
| **Discoveries do not spread by watching** (yet): nut cracking and stick digging are reinvented alone by most hominins; watching makes no consistent difference under old or new copying — so a bigger band has no mechanism to help | 8 worlds, two rules | moderate |
| **Not** supported again: a bigger band (40, 80) makes no more kinds of discovery even with learning by watching; firsts come ~2 weeks sooner at 80 (numbers alone); survival per founder lower (more hunger). Every band discovers more than before the brains work (25 founders: 4.1 → 5.5 kinds; fire by burning stick 11 → 22 of 24 worlds) | 24 + 12 identical worlds | moderate |
| **Learning by watching what worked, up close** (copy an elder's choice by how it turned out for it, only in the same square): hunger 30% → 17% of deaths; illness 16% (passes); children reaching 15 now just above the band (62%) | 24 worlds | moderate |
| **Brains' expectations fixed** (good surprises no longer count four times as much in the value estimate): starving hominins on fruit eat 83% (was 1–5%); populations hold steady (−3.1% → −0.3% a year), die-outs 5 → 2, children reaching 15 45% → 59%, life expectancy 15 → 21; **5 of 7 reality checks pass** | 24 worlds | moderate–strong |
| Disease (outbreaks spread by closeness, deadliest for the young, old and starving): illness 5% of deaths, infant deaths 3.8 → 5.3% — real but small beside hunger (37%); bands shrink more | 24 worlds, two rates | moderate |
| Not every cycle conceives (1 in 5, as at Gombe and Kanyawara): births 5.3 years apart (real 5.2–6.0), 4 of 7 checks pass — but bands shrink 2.2% a year and 6 of 24 die out: deaths are too many (hunger 41%, fire 11%) | 24 worlds | moderate |
| (Engine) 1.7 times faster with identical worlds: learning loops written out, display words made once, unused brain parts not faded | 4 worlds, identical | strong |
| Reality checks (24 worlds): 3 of 7 pass — survival to 15, life expectancy, age at first birth realistic; babies hardly ever die (1% vs 11–21%), births too close (4.7 vs 5.2–6.0 years), no illness | 24 worlds × 100 days | moderate |
| **Not** building: the first "shelters" were chance — heaps under trees that already gave more cover, from branches dropped by many hominins over months | 3 worlds traced | strong |
| Hunters placed where their prey lives (not anywhere that suits their climate): plant-eaters −22%, hominins killed by predators about 4× (38 → 149) — the world is no longer too safe | 12 paired worlds × 100 days | weak–moderate |
| Newcomers from the wider population when a hunter kind is rare: hunter kinds alive at 100 days 20 of 36 → 36 of 36 (all 12 worlds keep all three); hominin danger unchanged | 12 paired worlds × 100 days | moderate |
| Mating fixed (she waits only if she conceived; he can mate again within hours): the female cycle now costs 17% of births, not 71% — all three written predictions held | 12 paired worlds | moderate |
| **Failure:** the female cycle, added alone | Births 31 → 9 per world: it exposed a hidden bug (4-year lockout after any mating) | strong |
| **Not** measurable: climbing as a choice; temperament and parental care; mood; the refeeding signal (24 worlds: survival and hunger unchanged, fire deaths up at the edge of noise); ape-like care (hunger −24%, within noise) | Within noise | none–weak |
| **Not** helpful: founders who practise first (drownings doubled); **not** supported yet: a bigger founding band discovering more (survival per hominin the same at 25, 40 and 80) | Same worlds, 24 and 12 | none / moderate |
| Bands boom over 100 years: 5 of 8 last, the largest 25 → 606, births 2× deaths — **faster than any real chimpanzee community**, with no disease and predators gone in 4 worlds; first "shelters" (3 of 8 worlds — chance, entry 41) | 8 worlds × 300 days | moderate (boom) / weak (shelters) |
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

### 19. Fertility: hominins had kept modern people's menopause — Nov 2026

**Version.** Unreleased (after 0.7.0) · the fix: commits `8dc28f1` and `8398793` (`--human-fertility` restores the old rule, `--fert-max` sets the limit); the test ran on `8398793` (its table header says `8dc28f1`: the run started seconds before the commit, with the same code). The trace: `tools/analysis/life-trace.js`, run on the old rule (`24a1040`). Run by Claude.

**Data.** Raw tables: [old rule](../data/findings/19-fertility/old-rule.csv) (entry 18's leaves run) · [fertile until about 50](../data/findings/19-fertility/fertile-to-50.csv) · [the comparison](../data/findings/19-fertility/comparison.txt) · trace: [seed 1](../data/findings/19-fertility/trace/births-seed-1.json), [seed 2](../data/findings/19-fertility/trace/births-seed-2.json). Re-run: `node tools/experiment.js --seeds 1-12 --days 60 --workers 4 --out fertile.csv` (and `--human-fertility`).

**Question.** Over 20 years a band of 25 had about 12 babies and 23 deaths (entries 16–18). Too many deaths,
or too few births?

**The trace** (seeds 1 and 2, old rule): women who had babies had them 4.6–6.5 years apart, as wild
chimpanzees do; but 11 of 24 adult women had **none**, so births per woman came to about one every 10.5 years.
Looking for why found the cause: a woman could conceive only until 60% of her own lifespan — right for modern
people (about 50) but carried over unchanged when hominins were given chimpanzee-like lives, which ended their
fertility at 16–36 years (mean 26), for some before a first birth was possible. Men had the same limit.

**Real-world basis.** Wild chimpanzees have no menopause (Emery Thompson et al. 2007; six populations, 534
births): fertility falls from 25–35 and approaches zero at about 50, mostly through failing health — healthy
females lose about 20% after 35; 47% of 34 mothers living past 40 gave birth again; the oldest wild mother was
about 55. **The fix:** fertile until the end of one's own life, but not past 50 (range 45–55).

**Test.** 12 worlds × 60 days, seeds 1–12, made-up planet, the same starting worlds under the old rule and the fix. The old rule on the new code reproduced entry 18's run row for row ([seeds 1–2](../data/findings/19-fertility/old-rule-check-seeds-1-2.csv)).

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators |
|---|---|---|---|---|---|---|
| Old rule (fertile to about 26) | 14.1 ± 9.8 | 0 | 12.2 | 23.1 | 73 | 61 |
| Fertile until about 50 | **22.9 ± 13.4** | 0 | **25.7** | 27.8 | 94 | 74 |

**Result.** **Births more than doubled**, and survival rose by 8.8 (range +2.0 to +15.6; better in 10 of 12
worlds, worse in 1). Births now nearly keep up with deaths over 20 years (25.7 against 27.8). With more people,
more died of each cause.

**Also from the trace.** Hungry hominins were rewarded for finding new places 3–7 times *less* often than fed ones
(they were not wandering for its own sake), but even starving ones ate in only 6–8% of their time, walking about
75%: they search and do not find. Frightened ones explored as much as calm ones, unlike real animals. A ready woman
had a ready man beside her only about 16% of her ready time.

**Interpretation.** The largest single reason the band shrank was not a missing piece of nature but a modern-human
number that should have changed with the hominins' life history. Nothing was tuned: the fix follows the evidence.

**The limit's range** (`--fert-max`, the same 12 worlds): 45 gave 24.0 alive and 26.4 births a world, 55 gave 23.1
and 25.6, against 22.9 and 25.7 at 50 — within noise either way ([45](../data/findings/19-fertility/fert-max-45.csv),
[55](../data/findings/19-fertility/fert-max-55.csv), [comparison](../data/findings/19-fertility/fert-max-range.txt)).
The result does not depend on where in the evidence's range the limit is set.

**Strength.** Strong for the effect (paired worlds, large, range clear of zero), robust across the limit's range. **Lesson:** when one scenario's numbers are scaled, check every rule that depends on them; and measure
births as well as deaths.

### 20. An inborn pull toward a ready partner — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `8dc28f1` (`--lust N`); the test ran on `8398793` with entry 19's fix. Run by Claude.

**Data.** Raw tables: [none](../data/findings/20-mating-pull/none.csv) · [pull 1](../data/findings/20-mating-pull/pull-1.csv) · [pull 3](../data/findings/20-mating-pull/pull-3.csv) · [the comparison](../data/findings/20-mating-pull/comparison.txt). Re-run: `node tools/experiment.js --seeds 1-12 --days 60 --lust 1 --workers 4 --out pull1.csv` (and `--lust 3`, `--lust 0`).

**Added.** A ready adult is drawn toward a ready partner it senses, and to mate when one is beside it. Before, readiness
could be sensed but nothing pulled toward it: mating had to be found by chance and learned. (The owner's idea, after
the trace in entry 19 found a ready woman had a ready man beside her only about 16% of her ready time.)

**Real-world basis.** In primates hormones govern the wish to mate more than the ability (Wallen 2001); chimpanzee
males seek out females in full swelling, and most mating happens then (Deschner et al. 2004). The strength has no
research number: tested at both ends of a plausible range, 1 and 3; the default is the middle, 2.

**Test.** 12 worlds × 60 days, seeds 1–12, the same starting worlds with no pull, 1 and 3.

| | People alive | Worlds died out | Born per world | Hunger | Predators |
|---|---|---|---|---|---|
| No pull | 22.9 ± 13.4 | 0 | 25.7 | 94 | 74 |
| Pull 1 | 24.7 ± 15.9 | 1 | 26.8 | 81 | 74 |
| Pull 3 | 25.5 ± 18.8 | 0 | 28.0 | 109 | 62 |

**Result.** Births rose a little with the pull's strength (25.7 → 26.8 → 28.0 a world); survival changed within
noise at both ends (+1.8 and +2.6; ranges from −8 to +12). The result does not flip across the range.

**Interpretation.** Once fertility was fixed (entry 19), finding a partner was not a large limit; the pull is kept
because the evidence supports it, not for its effect.

**Strength.** Weak (a small rise in births; survival within noise). **Lesson:** a good idea about one bottleneck
(meeting partners) can matter less once a bigger one (fertility ending at 26) is gone.

### 21. A mother who loses a nursing baby can conceive again soon — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `5faec78` (`--no-loss-resume`, `--resume-days`); the test ran on `c9ebda9` (later changes switched off). Run by Claude.

**Data.** [Before](../data/findings/21-baby-loss/before.csv) · [after](../data/findings/21-baby-loss/after.csv) · [the comparison](../data/findings/21-baby-loss/comparison.txt). Re-run: `node tools/experiment.js --seeds 1-12 --days 60 --grass-looks-like-food --no-body-scaling --ice-animals --old-flight --workers 4` against the same with `--no-loss-resume`.

**Added.** When a nursing baby dies, the mother can conceive again after 74 days instead of waiting out the four years of nursing.

**Real-world basis.** Suckling holds back ovulation; women who do not nurse ovulate again 45–94 days after a birth (Jackson & Glasier
2011). Wild chimpanzees: 26.6 months from birth to birth after a lost baby against 68.9 after a surviving one (Emery Thompson et
al. 2007, six populations).

**Test.** 12 worlds × 60 days, the same starting worlds with and without.

| | People alive | Born per world | Hunger | Predators |
|---|---|---|---|---|
| Before | 22.5 ± 12.7 | 27.3 | 109 | 83 |
| After | 24.0 ± 11.9 | 28.8 | 99 | 87 |

**Result.** Births rose a little (27.3 → 28.8 a world); survival within noise (+1.5, range −3.3 to +6.3). Most babies who die are
already 1.5–3.5 years old (entry 19's trace), so most of the wait has passed anyway.

**Strength.** Weak. Kept because the evidence supports it.

### 22. Hungry hominins no longer see grass as food — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `3a653bc` (`--grass-looks-like-food` restores the old rule); the test ran on `c9ebda9`. Run by Claude.

**Data.** [Before](../data/findings/22-grass-sight/before.csv) · [after](../data/findings/22-grass-sight/after.csv) · [the comparison](../data/findings/22-grass-sight/comparison.txt).

**Added.** Hominins' eyes counted grass as half as good as fruit — a leftover from before they stopped eating grass (8 Nov) — so
hungry ones were drawn to meadows where there is nothing for them. Now grass is not seen as food.

**Real-world basis.** They cannot digest grass leaves; early hominins ate fruit, leaves, underground storage organs and some meat.

**Question.** Entry 19's trace found starving hominins walking about 75% of their time and eating in only 6–8%. Was grass-sight why?

| | People alive | Worlds died out | Born per world | Hunger |
|---|---|---|---|---|
| Before | 24.0 ± 11.9 | 0 | 28.8 | 99 |
| After | 20.4 ± 14.6 | 1 | 23.9 | 118 |

**Result.** **No** — hunger deaths did not fall (99 → 118, within noise); survival within noise (−3.6, range −10.9 to +3.8). The
guess was wrong; why starving hominins do not find food is still open.

**Strength.** None. The fix stays because it is right, not because it helped. **Lesson:** a plausible cause found in the code is
still a guess until a test says so.

### 23. Smaller bodies need less food — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `5126b94` (`--no-body-scaling`); the test ran on `c9ebda9`. Run by Claude.

**Data.** [Before](../data/findings/23-body-size/before.csv) · [after](../data/findings/23-body-size/after.csv) · [the comparison](../data/findings/23-body-size/comparison.txt).

**Added.** Kleiber's law for hominins, as plant-eaters here already had: at three-quarters of a forager's mass, a hominin gets a
larger share of its store from the same food (1/0.75) and burns it a little faster (0.75^−0.25) — about 0.81 of the food in all.
Found by the audit of older numbers: hominins had been eating and burning energy as full-sized foragers.

**Real-world basis.** Energy use grows with mass^0.75 (Kleiber's law). Not included: apes' lower metabolic rate than people's at
the same size (Pontzer et al. 2016).

| | People alive | Born per world | Hunger | Predators |
|---|---|---|---|---|
| Before | 20.4 ± 14.6 | 23.9 | 118 | 85 |
| After | 23.6 ± 13.1 | 27.4 | 93 | 84 |

**Result.** Hunger deaths fell by about a fifth (118 → 93) and survival rose by 3.2, both within noise (range −7.8 to +14.2).

**Strength.** Weak. Kept because the law is well established.

### 24. The animals of East Africa 2.5 million years ago — and too many hunters for the prey — Nov 2026

**Version.** Unreleased (after 0.7.0) · the change: commit `8125bdc` (now `--africa-animals`, off by default); the test ran on `c9ebda9` (then on by default; `--ice-animals` was the old world). The trace: `tools/analysis/hunters-trace.js`. Run by Claude.

**Data.** [Ice-age animals](../data/findings/24-africa-animals/ice-age-animals.csv) · [East African animals](../data/findings/24-africa-animals/africa-animals.csv) · [the comparison](../data/findings/24-africa-animals/comparison.txt) · hunter traces: [seed 2](../data/findings/24-africa-animals/hunters-trace-seed-2.txt), [seed 6](../data/findings/24-africa-animals/hunters-trace-seed-6.txt), [seed 1, 30 days](../data/findings/24-africa-animals/hunters-trace-seed-1-30d.txt), [same, ice-age](../data/findings/24-africa-animals/hunters-trace-seed-1-30d-ice.txt).

**Added.** Patch 6, first part: in the hominin world, antelopes, hares, buffalo, spotted hyenas, leopards and sabre-toothed cats
(*Megantereon*) in place of deer, rabbits, bison, wolves, big cats and bears, with living relatives' life histories
(`docs/ASSUMPTIONS.md`). Leopards and sabre-tooths climb, hyenas do not; every hyena female breeds.

**Test.** 12 worlds × 60 days, the same starting worlds with the ice-age and the East African animals.

| | People alive | Plant-eaters | Hunters | Hominins killed by hunters | Hunger |
|---|---|---|---|---|---|
| Ice-age animals | 23.6 ± 13.1 | 71.3 | **11.3** | 84 | 93 |
| East African animals | 19.0 ± 11.5 | 55.4 | **3.2** | 113 | 103 |

**Result.** The hunters **nearly died out**: 3.2 a world at day 60 against 11.3, fewer in all 12 worlds (range −11.0 to −5.3);
none left in two. Hominins fared somewhat worse (−4.6, within noise).

**Tracing it** (seeds 2 and 6, 60 days): the hunters **starved** — in seed 2 they killed only 2 plant-eaters in 60 days; 16 died
of hunger; starving ones ate their own kind (an old rule). The ice-age hunters had survived on two things the African ones lack:
the bear ate plants, and wolves have 3–6 pups from age 2 against the hyena's 1–3 from about 3.5 — both true to life.

**Interpretation.** The new animals exposed an older error: Genesis has far too many hunters for its prey. Across 25 carnivore
species about 10,000 kg of prey supports about 90 kg of each (Carbone & Gittleman 2002); Genesis starts with about 8 kg of hunter
per 100 kg of prey — about nine times too many — and its world (about 90,000 km²) holds a few dozen plant-eaters where the
Serengeti alone holds over a million. **Decision:** the East African animals stay in the code but off by default (`--africa-animals`)
until abundance follows the evidence; this is not tuning toward an outcome but a known deviation to fix first.

**Strength.** Strong for the collapse (all 12 worlds); the cause traced in 3 worlds. **Lesson:** replacing one unrealistic piece can
reveal another that the old pieces were hiding.

### 25. How long bands last, and what changes across generations — Nov 2026

**Version.** Unreleased (after 0.7.0) · code `e18a90e` (hominin world with the fertility fix, the mating pull, climbing as a choice; before "hunger first"); the tool: `tools/analysis/generations.js` (commit `c650bd7`). Run by Claude.

**Data.** [8 worlds × 200 days](../data/findings/25-long-runs/long-200d.csv) · inborn traits and test scores by generation: [seed 2](../data/findings/25-long-runs/generations-seed-2.json), [seed 5](../data/findings/25-long-runs/generations-seed-5.json) · the same with practised founders (entry 27): [seed 2](../data/findings/25-long-runs/generations-practised-seed-2.json), [seed 5](../data/findings/25-long-runs/generations-practised-seed-5.json). Re-run: `node tools/experiment.js --seeds 1-8 --days 200 --workers 4 --out long.csv`; `node tools/analysis/generations.js 5 200`.

**Question.** The longest earlier run was 67 years. Do bands keep going? And is anything changing from one generation to the next, in what hominins are born with (evolution) or in what the living know (culture)?

**Test.** 8 worlds × 200 days (about 67 simulated years), seeds 1–8, made-up planet.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| 8 worlds × 200 days | 31.1 ± 39.7 | 2 | 77.8 | 71.6 | 253 | 83 | 48 | 12 |

**Result.** Six of the eight worlds were still alive at the end: the best grew from 25 to **112** hominins over five generations (seeds 5, 2 and 6 reached 112, 52 and 56); two shrank to 12 and 16; one was down to a single hominin; two **died out** (after about 31 and 60 years, mostly killed by predators: 23 of 55 and 24 of 40 deaths). Over all worlds there were **622 births against 573 deaths** (1.09). Deaths: hunger 253 (44%), old age 130 (23%), predators 83 (14%), drowning 48 (8%), wounds 32 (6%), fire 12, childbirth 12, thirst 3. Hunters died out in 2 of 8 worlds.

*Across generations* (seeds 2 and 5, which had enough hominins): the inborn tendency to **learn from others** fell steadily in both worlds, from 0.76 to 0.47 (seed 2, generations 0–4) and from 0.90 to 0.31 (seed 5, 48 born in the last generation) — the same direction in two separate worlds, so probably selection, not chance: hominins who copied less left more surviving children. The inborn brain-size trait hardly moved (0.313 → 0.331 and 0.315 → 0.311); curiosity, learning speed, voice control and pointing moved only by chance. **Learned skill did not rise:** the living adults' test scores were flat across generations (0.39–0.42).

*With practised founders* (entry 27, who arrive knowing their diet) the decline of copying **persisted**: 0.90 → 0.39 in seed 5 (29–54 born per generation); in seed 2 the band shrank to a handful, so its numbers say little. So the guess that copying is bred out because the founders have nothing worth copying is **wrong**.

**Interpretation.** Bands now last, as long as the world is not one of the unlucky ones; reproduction roughly keeps up with deaths. Selection works (a trait changed in the same way twice), but in the direction opposite to human evolution, and the other traits need far more than 4–5 generations (reality took about 125,000). Why copying is selected against is open: what a youngster copies is an elder's *movement*, not what happened to the elder (backlog A4); copying may also draw it after elders into danger.

**Strength.** Moderate for survival (8 worlds, descriptive); moderate for "copying declines" (two worlds in the same direction, with and without practice); none yet for the other traits. **Lesson:** a hypothesis that fits (nothing to copy) can be tested cheaply and found wrong — the data were already on disk.

### 26. Climbing as a choice, not automatic — Nov 2026

**Version.** Unreleased · the change: commit `8b66acd`; the test: `b558c5a` (automatic climbing) against `e18a90e` (a choice). Run by Claude.

**Data.** [Automatic](../data/findings/26-climbing-choice/automatic.csv) · [a choice](../data/findings/26-climbing-choice/choice.csv) · [the comparison](../data/findings/26-climbing-choice/comparison.txt). Re-run: `node tools/analysis/compare-runs.js automatic.csv choice.csv`.

**Added.** The owner's rule: only true reflexes (blinking, a startle, an infant's grip) are automatic; running, climbing and hiding are choices with inborn pulls. Climbing a tree to sleep, and to escape a hunter in sight, had been done by the body automatically. It became a new action, *climb a tree* (or *climb down*), that each brain chooses and learns, with two inborn pulls: sleepiness under a big tree, and fear with a hunter in sight. Only a baby's clinging to its mother stays automatic.

**Real-world basis.** The infant grasp reflex is a spinal reflex; chimpanzee nest building is largely learned (young ones practise by day; captive-reared ones never build full nests: Videan 2006; Ngogo, *Am. J. Primatol.* 2025); fight, flight or freeze differ consistently between individuals (marmosets: Kemp & Kaplan 2011; macaques). Monkeys and apes flee up trees (vervets: Seyfarth et al. 1980; baboons from lions).

**Test.** 12 worlds × 60 days. **Confounded:** an extra action changes every brain, so the same seed is not the same world.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Climbing automatic | 23.7 ± 13.8 | 1 | 27.5 | 28.8 | 111 | 81 | 33 | 36 |
| Climbing a choice | 24.3 ± 11.6 | 0 | 27.3 | 27.9 | 109 | 69 | 23 | 21 |

**Result.** No measurable difference (+0.7 alive, range −12.3 to +13.6). With the pull, a brand-new brain beside a hyena chose to climb 3–6% of the time per step against about 2% without it: a nudge, not a command.

**Strength.** None. Kept because it follows the owner's rule and the evidence, and does no harm. **Lesson:** making a behaviour a choice costs nothing in survival, and lets individuals differ, as real apes do.

### 27. Founders who practise before the world begins — Nov 2026

**Version.** Unreleased · the change: commit `9b51a9e` (`--practice-days`; off by default since `58039e4`); the test on `9b51a9e`. Run by Claude.

**Data.** [Blank-minded founders](../data/findings/27-founders-practice/blank-minded.csv) · [practised](../data/findings/27-founders-practice/practised.csv) · [check: blank-minded founders reproduce the earlier worlds exactly](../data/findings/27-founders-practice/blank-minded-check-seeds-1-2.csv) · [the comparison](../data/findings/27-founders-practice/comparison.txt); generations with practised founders: entry 25.

**Question (the owner's idea).** No real population ever started without knowing its diet: young chimpanzees learn much of theirs by watching their mothers (366 peering events in 1,000 hours at Budongo, about 60% about food: Schuppli et al., Max Planck 2026). Founders who know nothing are like orphans, and the deaths that causes tell us nothing about our ancestors. So: do founders who know what their kind has always known survive better?

**Added.** Before the world begins, the founders live their kind's ordinary life for about 3 years, learning only from what their bodies feel, with nobody able to die (as a child is kept alive by its mother); then the world is built again from the same seed, identical, and each founder keeps its trained brain. Learned weights are never inherited, so children are still born knowing nothing. Tools, fire and words are still to be discovered. (The caveat: hominins of 2.5 million years ago already made stone tools — Lomekwi 3.3 Ma, Oldowan 2.6–2.9 Ma — so "tools must be discovered" is an experiment, not history.)

**Test.** 12 worlds × 60 days, the same seeds with blank-minded and practised founders.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Blank-minded founders | 24.3 ± 11.6 | 0 | 27.3 | 27.9 | 109 | 69 | 23 | 21 |
| Practised founders | 21.0 ± 15.5 | 1 | 23.3 | 27.3 | 117 | 60 | 45 | 25 |

**Result.** **No help.** Hunger deaths did not fall (109 → 117); survival −3.3 (range −16.0 to +9.4); births fell (27.3 → 23.3); **drownings doubled** (23 → 45, more in 8 of 12 worlds). Copying was still selected against (entry 25).

**Interpretation.** Learning alone by trial and error for three years does not teach hominins to eat what is in front of them; real young apes learn their diet by **watching their mothers**, and Genesis has no way yet to learn "that food was good" from seeing someone eat it (backlog A4). So the experiment shows that the *mechanism* is missing, not that the idea is wrong. Switched off by default everywhere (the owner, 12 Nov).

**Strength.** Weak (ranges include zero except the drowning rise). **Lesson:** giving the founders knowledge by a route real animals do not use does not stand in for the route they do use.

### 28. Hunger and thirst come first — Nov 2026

**Version.** Unreleased · the change and the test: commit `18b5a45` (`--old-hunger` restores the old rule; `--hunger-pull` sets the strength, 6, an assumption). Run by Claude.

**Data.** [Before](../data/findings/28-hunger-first/before.csv) · [after](../data/findings/28-hunger-first/after.csv) · [the old rule reproduced exactly](../data/findings/28-hunger-first/old-rule-check-seeds-1-2.csv) · [the comparison](../data/findings/28-hunger-first/comparison.txt) · traces: [hunger, seed 1](../data/findings/28-hunger-first/trace-hunger-seed-1.json), [seed 3](../data/findings/28-hunger-first/trace-hunger-seed-3.json), [drownings, seed 3](../data/findings/28-hunger-first/trace-drownings-seed-3.json) (`tools/analysis/hunger-trace.js`, `drowning-trace.js`).

**Question.** Hunger was the largest killer in every run. Tracing starving hominins (seeds 1 and 3, 60 days) found food within one or two squares in about 92% and 90% of their starving moments (a third of the time under their feet), yet they **chose to walk** 68% and 74% of the time and to eat only 12% and 6%; of 23 hunger deaths, 18 happened with food within two squares. Hunger added a pull to eat but nothing took over, as in real animals.

**Added.** The owner's principle (CLAUDE.md): a starving or parched body thinks of little else. With something it can eat or drink right where it stands, the urge to eat or drink grows steeply with need and outweighs the rest; hunger and thirst quieten exploring and copying; a hunter close beside it still comes first.

**Real-world basis.** In mice hunger overrides thirst, anxiety, fear of predators and the wish for company, most of all when food is in reach (Burnett et al. 2016); hunger shuts down play (Siviy & Panksepp); hungry rats still eat little of a novel food in a strange place at first, and danger signals can stop even a starving rat eating (Greiner & Petrovich 2020). The strength 6 has no research number: an **assumption**.

**Test.** 12 worlds × 60 days, blank-minded founders.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Before | 24.3 ± 11.6 | 0 | 27.3 | 27.9 | 109 | 69 | 23 | 21 |
| Hunger and thirst first | 27.3 ± 14.0 | 0 | 30.0 | 27.8 | 69 | 78 | 45 | 47 |

**Result.** A starving hominin standing on roots chose to eat **77%** of the time, up from 15% (one world, 20 days). Hunger deaths fell **37%** (109 → 69; range −7.8 to +1.1; lower in 8 of 12 worlds), births rose (27.3 → 30.0), survival +2.9 (range −6.6 to +12.5). But **drownings doubled** (23 → 45, beyond noise: +1.8, range +0.04 to +3.6) and fire deaths too (21 → 47).

**Tracing the drownings** (seed 3, 12 drowned): **11 of the 12 were children** aged 1–9, and none was thirsty (thirst 0–0.24): they were not going for water. The likely cause: more children survived, and young children wander into deep water — realistic in kind (drowning is a leading cause of death of young children), but real young apes are carried and kept near the mother, and avoid deep water (backlog A8; not yet researched).

**Strength.** Weak–moderate for hunger and births (ranges include zero); beyond noise for the drowning rise. **Lesson:** a result that looks like a side effect can be a clue: the extra drownings were children, which pointed at keeping children near their mothers (entry 31).

### 29. Temperament and parental care that differ and are inherited — Nov 2026

**Version.** Unreleased · the change and the test: commit `1e82b31` (`--no-temperament`, `--no-parental-care`). Run by Claude.

**Data.** [Before](../data/findings/29-temperament-care/before.csv) · [temperament](../data/findings/29-temperament-care/temperament.csv) · [temperament and care](../data/findings/29-temperament-care/temperament-and-care.csv) · [both off reproduces the earlier worlds exactly](../data/findings/29-temperament-care/both-off-check-seeds-1-2.csv) · [the comparisons](../data/findings/29-temperament-care/comparison.txt).

**Added (the owner's points: pain and courage must vary; not every mother has the same urge).** Each hominin inherits two traits, 0.4–1.6 around 1, drawn from a separate random stream so that adding them changes nothing else in a world: **timidity** (how strongly fear rises after a bad surprise and how strongly it pulls away from a hunter) and **parental care** (how strongly its own young's hunger moves it to share food). A child takes after a parent, with small changes. Pain sensitivity already varied (0.6–1.4).

**Real-world basis.** Freezing under threat in young rhesus monkeys is stable and about 30–40% heritable (Kalin lab); behavioural inhibition in children 20–40%; pain sensitivity 26–60% heritable in twins (Nielsen et al. 2008); monkey mothers have consistent individual styles across infants (Fairbanks 1996). The spread 0.4–1.6 is an **assumption**.

**Test.** 12 worlds × 60 days, the same seeds, adding one trait at a time.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Neither | 27.3 ± 14.0 | 0 | 30.0 | 27.8 | 69 | 78 | 45 | 47 |
| Temperament | 27.1 ± 14.7 | 0 | 29.8 | 27.8 | 76 | 81 | 32 | 31 |
| Temperament and care | 28.8 ± 13.0 | 0 | 31.4 | 27.6 | 80 | 60 | 39 | 43 |

**Result.** No measurable effect (−0.2 and then +1.8 alive; ranges about ±9). Drownings and fire deaths fell with temperament (45 → 32, 47 → 31), predator deaths with care (81 → 60), all within noise.

**Interpretation.** Over 20 years, with few generations, such differences cannot show their worth: that would come from bolder or more caring families leaving more surviving children, over many generations.

**Strength.** None. Kept because real primates differ in exactly these ways. **Lesson:** a trait added by its own random stream leaves the rest of the world untouched, so each can be tested alone.

### 30. Moving is one choice, not eight — Nov 2026

**Version.** Unreleased · the change and the test: commit `4f73d22` (`--eight-walks` restores the old rule). Run by Claude.

**Data.** [Before](../data/findings/30-moving-one-choice/before.csv) · [after](../data/findings/30-moving-one-choice/after.csv) · [the old rule reproduced exactly](../data/findings/30-moving-one-choice/eight-walks-check-seeds-1-2.csv) · [the comparison](../data/findings/30-moving-one-choice/comparison.txt).

**Question.** Hominins spent 70–80% of their waking time walking; wild chimpanzees spend about 15–40% travelling, 40–50% feeding and 15–30% resting (Wrangham 1992; Mahale). Why?

**Found.** A design flaw, not biology: of the brain's 19 choices, **8 were "walk" (one per direction) and 1 was "stay"**, so a brain with no preference walked 8 times as often as it sat. A brand-new brain chose to walk 80% of the time before learning anything.

**Added.** The eight directions now share the weight of one choice (each loses ln 8): moving competes fairly with staying, eating, resting and the rest, and a direction is picked afterwards. How much they then walk is a result to check, not a target.

**Test.** 12 worlds × 60 days. A fresh brain: walk 80% → 51%, stay 1.3% → 3.0%; hominins' first five days: walking 68% → 25%.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Eight walk choices | 28.8 ± 13.0 | 0 | 31.4 | 27.6 | 80 | 60 | 39 | 43 |
| Moving one choice | 25.3 ± 13.8 | 0 | 27.3 | 26.9 | 115 | 3 | 18 | 72 |

**Result.** **Predator deaths fell from 60 to 3** (range −9.6 to +0.1; lower in 7 of 8 worlds that changed), **drownings halved** (39 → 18, beyond noise, lower in all 10 that changed), old-age deaths fell (86 → 62). But **hunger rose** (80 → 115, +2.9, range +0.06 to +5.8) and so did fire deaths (43 → 72); survival −3.5 (range −12.0 to +5.0).

**Interpretation.** Wandering less means meeting fewer hunters and less deep water. But a hominin that stays where it is no longer leaves when the food around it runs out, and nothing yet tells it to move on or to go to known food (backlog A2); fire deaths rose too (backlog A3: no moving away from a wildfire).

**Strength.** Moderate for predators and drownings (beyond noise or at its edge); weak for survival. **Lesson:** removing an artificial bias makes the problems it was hiding visible.

### 31. A mother keeps her nursing child near — Nov 2026

**Version.** Unreleased · the change and the test: commit `f7b7ee6` (`--no-mother-pull`; the cycle and mood in that commit were off in this test). Run by Claude.

**Data.** [Before](../data/findings/31-mother-pull/before.csv) · [after](../data/findings/31-mother-pull/after.csv) · [everything off reproduces the earlier worlds exactly](../data/findings/31-mother-pull/all-off-check-seeds-1-2.csv) · [the comparison](../data/findings/31-mother-pull/comparison.txt); the measurement: `tools/analysis/children-near-mothers.js`.

**Question (the owner).** Children are pulled to stay near their carers; what about the mother's pull to keep her children safe? Entry 28 had found that most drowned hominins were children out of reach of their mothers.

**Measured first** (one world, 10 years, before the pull): children within sight of their mother 100% of the time under 1 year (the mother closing the gap 9 times, the child 2), 83% at 1–4 years (the child doing most of the closing), 81% at 4–7 and 42% at 7–10. Real infants at 1–4 are carried or almost never out of sight, and the work of staying close shifts from mother to infant only as the infant grows (monkeys: Hinde & Atkinson 1970; reviews).

**Added.** A pull toward her own nursing child when it is more than a square away: 3 × (1 − its age ÷ weaning age) × her **inherited** parental care (entry 29), so it fades as the child is weaned and differs from mother to mother — a pull, never a command.

**Test.** 12 worlds × 60 days.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Before | 25.3 ± 13.8 | 0 | 27.3 | 26.9 | 115 | 3 | 18 | 72 |
| Mother's pull | 31.3 ± 17.1 | 1 | 30.9 | 24.6 | 100 | 32 | 9 | 39 |

**Result.** Survival **+6.0** (25.3 → 31.3; range −1.5 to +13.5; better in 9 of 12 worlds), births up (27.3 → 30.9), deaths down (26.9 → 24.6); **drownings halved** (18 → 9) and **fire deaths nearly halved** (72 → 39, beyond noise: −2.75, range −5.3 to −0.2). One world died out (4 alive before, 0 after); predator deaths rose from 3 to 32, within noise.

**Strength.** Weak–moderate. The best single change since the fertility fix (entry 19), and it follows the owner's reasoning. **Lesson:** the fix for a side effect (children drowning) came from asking what real mothers do.

### 32. The female cycle — and the hidden lockout it exposed — Nov 2026

**Version.** Unreleased · the change and the test: commit `f7b7ee6` (`--cycle`; off by default from `34ee397`). Run by Claude.

**Data.** [Without the cycle](../data/findings/32-female-cycle/before.csv) · [with it](../data/findings/32-female-cycle/with-cycle.csv) · [the comparison](../data/findings/32-female-cycle/comparison.txt).

**Added.** Chimpanzee-like cycles: about 36 days, receptive (swollen) about 13 of them, able to conceive only near ovulation (Deschner et al. 2003, 2004; Emery Thompson 2005); each female with her own phase.

**Test.** 12 worlds × 60 days, the cycle on against off.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| No cycle | 31.3 ± 17.1 | 1 | 30.9 | 24.6 | 100 | 32 | 9 | 39 |
| Cycle | 13.7 ± 8.6 | 0 | 8.9 | 20.3 | 78 | 22 | 7 | 34 |

**Result.** A **failure**: births fell to **a third** (30.9 → 8.9), survival fell by 17.7 (range −25.5 to −9.8; lower in 11 of 12 worlds) — far below real chimpanzees, who bear a baby about every 5.7 years.

**Cause (read in the code, not yet re-tested).** After **any** mating the female enters the four-year nursing wait, even if she did not conceive. Before the cycle every mating led to pregnancy, so this never showed; with a cycle most matings miss the fertile days and lock the female out for four years with no baby. A second unsourced number: a male cannot mate again for about 36 days (real males mate several times a day). Both are on the backlog (B1, B2). Real nature has the cycle and frequent mating as a pair; adding one alone broke reproduction.

**Interpretation.** Not "females then had no cycles" (all apes, monkeys and people do) but "a real feature added alone exposes a missing piece". The cycle is off by default until B1 and B2 are fixed and re-tested.

**Strength.** Strong for the failure (beyond noise, 11 of 12 worlds); the cause is a reading of the code. **Lesson:** a failure that points at a hidden bug is worth as much as a success.

### 33. A lasting mood — Nov 2026

**Version.** Unreleased · the change: commit `f7b7ee6` (`--no-mood`); the second test on `34ee397`. Run by Claude.

**Data.** [With the cycle: no mood](../data/findings/33-mood/with-cycle-no-mood.csv), [mood](../data/findings/33-mood/with-cycle-and-mood.csv) · [without the cycle: no mood](../data/findings/33-mood/no-cycle-no-mood.csv), [mood](../data/findings/33-mood/no-cycle-with-mood.csv) · [the comparisons](../data/findings/33-mood/comparison.txt).

**Added.** A running average of how recent things went against expectation (about a day), added to how each new outcome feels: good mood makes things feel better, bad worse. Basis: mood tracks the momentum of recent reward prediction errors and biases how outcomes are perceived (Eldar, Rutledge, Dolan & Niv 2016, in people). Its speed and strength are **assumptions**.

**Test.** 12 worlds × 60 days. First on top of the (faulty) cycle of entry 32, then without the cycle.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Cycle, no mood | 13.7 ± 8.6 | 0 | 8.9 | 20.3 | 78 | 22 | 7 | 34 |
| Cycle and mood | 15.9 ± 8.1 | 0 | 10.1 | 19.2 | 75 | 5 | 6 | 35 |
| No cycle, no mood | 31.3 ± 17.1 | 1 | 30.9 | 24.6 | 100 | 32 | 9 | 39 |
| No cycle, mood | 28.8 ± 16.7 | 1 | 27.4 | 23.7 | 115 | 9 | 12 | 54 |

**Result.** No clear effect either way: +2.3 alive with the cycle (range −2.3 to +6.8), −2.6 without it (range −9.8 to +4.6).

**Strength.** None. Kept because the evidence on mood is good; it is not a survival lever by itself. **Lesson:** run the test again once the faulty piece under it is out (here the cycle), rather than trust the first answer.

### 34. Starving: smooth hunger and the refeeding signal — Nov 2026

**Version.** Unreleased · the change: commit `5414b71`, the level set to 20% at `c17fe0e` (`--old-starving` restores the old rule; `--refeed-at` sets the level); the test on `34ee397` (a working branch, merged with the rest before going live). Run by Claude.

**Data.** [Old rule, 24 worlds](../data/findings/34-starving/old-rule-24-worlds.csv) · [refeeding at 20%](../data/findings/34-starving/refeed-20-24-worlds.csv) · [at 25%](../data/findings/34-starving/refeed-25-24-worlds.csv) · [the comparisons, including the first 12 worlds](../data/findings/34-starving/comparison.txt).

**Found and added.** The owner asked whether hunger is felt smoothly. It is — except for a sudden jolt of discomfort added below 15% energy, with **no source**. That was removed. But there *is* a real sudden change in starvation, in behaviour: late in a fast, below a critical reserve, animals turn sharply to finding food — fasting rats about 10 times more active (Koubi et al. 1991), emperor penguins leaving their eggs to feed before reserves are lethal (Robin et al. 1998). So below a critical reserve the urge to search for food doubles (the doubling is an **assumption**). The level: rats and birds switch once about 80% of their fat is gone, so **20%** (evidence 20–25), not picked for its effect — which is why both ends were tested.

**Test.** 24 worlds × 60 days (seeds 1–24), the same worlds with the old rule, 20% and 25%.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Old rule | 26.9 ± 15.1 | 1 | 26.9 | 25.0 | 241 | 46 | 25 | 77 |
| Refeeding at 20% | 24.0 ± 16.9 | 1 | 26.4 | 27.4 | 277 | 36 | 20 | 117 |
| Refeeding at 25% | 27.5 ± 14.5 | 1 | 28.7 | 26.3 | 230 | 22 | 22 | 116 |

**Result.** **No measurable effect** on survival or hunger at either end: 20% vs old −2.9 alive (range −8.5 to +2.8), 25% vs old +0.6 (−3.9 to +5.0), 25% vs 20% +3.5 (−1.0 to +7.9). In the **first 12 worlds** the two ends had pointed in opposite directions (hunger deaths 115 → 152 at 20%, 115 → 99 at 25%); over 24 worlds the difference was chance.

The one consistent change: **fire deaths rose at both levels** (77 → 117 and 77 → 116; +1.7 a world, ranges −0.7 to +4.0 and −0.1 to +3.3; higher in 14 and 13 of 24 worlds, lower in 5 and 3) — at the edge of noise, in the same direction at both ends. Likely cause (a guess, not tested): desperate searching takes starving hominins onto burning ground, and they do not yet move away from a wildfire (backlog A3).

**Strength.** None. The fix stays because it is more correct, at the level the evidence gives. **Lesson:** do not pick the end of a range that looks better in 12 worlds; test more worlds.

### 35. Care for children as apes give it — Nov 2026

**Version.** Unreleased · the change: commit `260459c` (`--human-care` restores the forager pattern); the test on `d81d0e2` (a working branch, merged with the rest before going live). Run by Claude.

**Data.** [Forager-style care](../data/findings/35-ape-care/before.csv) · [ape-like care](../data/findings/35-ape-care/after.csv) · [the old rule reproduced exactly](../data/findings/35-ape-care/human-care-check-seeds-1-2.csv) · [the comparison](../data/findings/35-ape-care/comparison.txt).

**Found.** Hominins fed any hungry child of the band (own young fully, siblings 0.6, nephews and nieces 0.5, others 0.35 × an inherited trait) — the cooperative-breeding pattern of **modern foragers** (Hrdy 2009; Kramer 2010; Hawkes et al. 1998), another modern-human leftover.

**Real-world basis.** Care and feeding of infants by others is estimated to occur in about 20% of primate species, especially marmosets and humans, and in **no other ape** (reviews citing Hrdy 2009); gorilla mothers rarely let others even hold their infants; at Ngogo others hold chimpanzee infants (linked to faster weaning) but do not feed them (Bădescu et al. 2016); no ape evidence of grandmothers or fathers provisioning.

**Added.** In the hominin world only a mother feeds her own young (strength from her inherited care); modern people keep the forager pattern.

**Test.** 12 worlds × 60 days.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Foragers' care | 26.8 ± 18.0 | 0 | 29.2 | 27.4 | 152 | 15 | 14 | 53 |
| Ape-like care | 27.3 ± 13.9 | 0 | 28.5 | 26.2 | 116 | 10 | 24 | 60 |

**Result.** Survival about the same (+0.6, range −9.2 to +10.4); hunger deaths fell (152 → 116, −3.0, range −6.5 to +0.5; lower in 9 of 12 worlds): adults no longer spend energy on other people's children; births unchanged; drownings rose (14 → 24), within noise.

**Strength.** Weak. Kept: closer to apes, and not worse. **Lesson:** a lovely behaviour can be a modern one: check who really does it.

### 36. Does a bigger founding band make more discoveries? — Nov 2026

**Version.** Unreleased · up to 200 founders and no fixed cap on people (`ef5c244`); extra founders joining the same world from a separate random stream (`b0bf369`, `--extra-people`); the analysis tools `tools/analysis/community-compare.js`, `first-times.js`. Run by Claude.

**Data.** Fair test: [25 founders](../data/findings/36-community-size/base25.csv) · [40](../data/findings/36-community-size/plus15.csv) · [80](../data/findings/36-community-size/plus55.csv) · [the comparison](../data/findings/36-community-size/fair-comparison.txt) · [first times](../data/findings/36-community-size/first-times.txt) · [the prediction, written before](../data/findings/36-community-size/prediction-written-before.txt). The first test, on *different* worlds: [25](../data/findings/36-community-size/first-test-band25.csv), [40](../data/findings/36-community-size/first-test-band40.csv), [80](../data/findings/36-community-size/first-test-band80.csv).

**Question (the owner's hypothesis: "a bigger band is the key").** Real chimpanzee communities are about 30–80 (Ngogo near 200); human forager bands 20–40; across ten Oceanic societies larger populations had more complex tools (Kline & Boyd 2010), a result debated. Do bigger bands survive better or discover more?

**First test (12 worlds each, 25, 40 and 80 founders).** Different founder numbers reshuffle the whole world, so the worlds were not the same. Alive at the end 27.3, 41.8, 77.5 (109%, 104%, 97% of the start); a fire started with a burning stick in 5, 9 and 8 of 12 worlds; meat eaten 7, 10, 9; cutting meat with a stone 2, 2, 4. I told the owner it "looked right so far". **That was mostly chance: different worlds.**

**Fair test.** The extra founders join exactly the same world (animals, land and the first 25 founders identical; checked). A prediction was written before the runs: (1) discoveries in more worlds with more founders; (2) survival per hominin the same; (3) discoveries per hominin the same. 24 worlds for 25 vs 40, 12 for 25 vs 80.

| 25 vs 40 founders, 24 identical worlds | 25 | 40 | Difference (95% range) |
|---|---|---|---|
| Alive per founder | 1.14 | 1.17 | +0.03 (−0.19, +0.25) |
| Born per world | 28.7 | 47.3 | +18.5 (+13.5, +23.6) |
| Hunger deaths per world | 9.4 | 16.7 | +7.3 (+4.9, +9.6) |
| Predator deaths per world | 1.3 | 1.0 | −0.3 (−2.1, +1.5) |
| Different hard discoveries per world (of 11) | 4.13 | 4.58 | +0.46 (−0.41, +1.33) |

Worlds where it happened, 25 → 40 founders: fire by dropping a burning stick 11 → 16 of 24; eating meat from a body 14 → 13; bringing down an animal 13 → 10; cutting meat with a stone 3 → 2; eating wildfire-cooked food 18 → 21; picking up a burning stick 20 → 22; fire made with sparks 1 → 3 and by rubbing wood 8 → 10. **Nobody kept a fire going or built a shelter in any of the 36 worlds.** At 80 founders (12 worlds): alive per founder 1.10 (against 1.09 at 25), discoveries 4.58 (against 4.42).

*First times* (worlds where both had it): at 40 founders a fire by dropping a burning stick came earlier in 6 of 8 worlds (later in 1, same day in 1; about 10 days sooner), eating meat earlier in 8 of 13 (later in 3), hunting earlier in 6 of 10 — but picking up burning sticks and eating wildfire-cooked food showed no pattern (they depend on wildfires, which the band does not cause). No sign test is significant.

**Against the prediction.** (2) **Confirmed**: survival per hominin is the same at every size. (1) **Not supported**: only the fire-by-dropping count rose, others were flat or fell. (3) Cannot be judged: the measure counts kinds of discovery, which saturate. A bigger band is more of everything — births 29, 47, 89 per world; hunger deaths 9, 17, 37 (more mouths) — and 80 founders for 12 worlds ran in 21–34 minutes, so a laptop is enough.

**Interpretation.** Size alone does not make Genesis hominins discover more. That fits the evidence behind the hypothesis, where size helps when knowledge can be passed on; in Genesis a discovery dies with whoever made it. The hypothesis is **untested, not refuted**: build learning by watching what worked (backlog A4), then repeat this exact comparison with a new written prediction.

**Strength.** Moderate for "survival per founder does not change with size" (24 worlds, range about ±0.2); none for discoveries (ranges include zero). **Lesson:** a hunch confirmed on different worlds is not confirmed: compare the same worlds, and write the prediction down first.

### 37. A hundred years: bands boom, and the first shelters — Nov 2026

**Version.** Unreleased · every change up to entry 36 (`58039e4`; the four re-run worlds on `26a92dd`, which differs only by the crash fix, a log-message table, so the worlds are the same). Run by Claude.

**Data.** [All 8 worlds](../data/findings/37-hundred-years/all-8-worlds.csv) · [first run, seeds 2, 3, 6, 7](../data/findings/37-hundred-years/first-run-seeds-2-3-6-7.csv) · [re-run, seeds 1, 4, 5, 8](../data/findings/37-hundred-years/rerun-seeds-1-4-5-8.csv) · logs: [first run, with the crash](../data/findings/37-hundred-years/first-run-log-with-crash.txt), [re-run](../data/findings/37-hundred-years/rerun-log.txt). Re-run: `node tools/experiment.js --seeds 1-8 --days 300 --naive-founders --workers 4 --out long.csv`.

**Question.** With everything from this round in (hunger first, moving as one choice, the mother's pull, ape-like care, no cap on people), do bands last 100 years (300 days)? And does the inborn tendency to learn from others still fall (entry 25)?

**A crash first.** Four of the eight worlds crashed: a fish learning one of the lessons wrote to a table that had room for three kinds of animal, not four (an old bug, rare enough to show only in long runs), and the runner reported the four survivors as if nothing had happened. Both were fixed (backlog B11) and the four worlds run again on identical code.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| 8 worlds × 300 days | 170.4 ± 216.8 | 3 | 293.1 | 147.8 | 413 | 116 | 22 | 76 |

| World | Alive at 100 years | Born | Died | Generations | Hunters left | Learns from others (founders about 0.9) |
|---|---|---|---|---|---|---|
| 1 | 236 | 451 | 240 | 7 | 10 | 0.40 |
| 2 | 0 | 29 | 54 | 2 | 0 | — |
| 3 | 0 | 53 | 78 | 3 | 9 | — |
| 4 | 348 | 472 | 149 | 6 | 0 | 0.86 |
| 5 | 121 | 258 | 162 | 7 | 0 | 0.36 |
| 6 | 52 | 199 | 172 | 7 | 0 | 1.12 |
| 7 | 0 | 7 | 32 | 1 | 10 | — |
| 8 | **606** | 876 | 295 | 7 | 2 | 0.59 |

**Result.** Five of eight bands lasted 100 years and grew, four of them far beyond their 25 founders (the largest to **606**); three died out (two early, one by predators). Over all worlds **2,345 births against 1,182 deaths** (2.0, against 1.09 in entry 25). Deaths: hunger 413 (35%), old age 397 (34%), wounds 133 (11%), predators 116 (10%), fire 76 (6%).

**The first shelters.** For the first time in any Genesis run, a hominin slept on a heap of seven or more branches — more than ever fall in one place by nature, so hominins had carried them there — in **3 of 8 worlds** (days 170, 195 and 254 in worlds 8, 4 and 1 — about 57–85 years in; corrected 12 Nov from "170–233"). Whether anyone heaped them *on purpose* is not known: a heap can also grow from branches dropped again and again in one favourite place. A trace of who carried the branches, and whether the heap was kept up, is needed before calling it building.

Other firsts: making fire by rubbing wood in 7 of 8 worlds, by sparks in 3; cutting meat with a stone in 1; nobody kept a fire going.

**Learning from others** ended lower than the founders' mean (about 0.9) in 3 of the 5 surviving worlds (0.40, 0.36, 0.59), about the same in one (0.86) and higher in one (1.12). Mixed: the "bred out" of entry 25 (two worlds, 67 years) is **not** confirmed here.

**Interpretation — and why the boom is not good news.** Real chimpanzee communities change slowly: Gombe fell from about 120–150 in the 1960s to about 100 by 2013; Kanyawara grew modestly over 25 years; Ngogo grew steadily over two decades. Growth from 25 to 606 in 100 years (about 3% a year) is far faster than any of them. Two real causes of death are missing or weak: **disease** — the leading cause of chimpanzee deaths at Gombe (58% of those with a known cause; Williams et al. 2008), absent in Genesis — and **predators**, which died out entirely in 4 of the 8 worlds (hunters left: 0), so those bands lived with no predator at all. Neither is a reason to tune anything; both say what to add next: disease (backlog R9) and a hunter population that cannot vanish from a whole region (backlog A1). Births are fine; the world is too safe — the owner's warning (Genesis must not be a safe world) borne out by data.

**Strength.** Moderate for "bands now last and grow" (5 of 8 over 100 years); weak for the shelters (3 worlds, purpose unknown); weak for the gene (mixed). **Lesson:** success that is faster than reality is a finding about what is missing.

### 38. Mating fixed: the female cycle now works — Nov 2026

**Version.** Unreleased · the change and the test: commit `0834e46` (`--old-mating` restores the old rule — checked: identical worlds; `--male-wait` sets the hours). Run by Claude.

**Data.** [Old rule](../data/findings/38-mating-fix/A-old.csv) · [new rule](../data/findings/38-mating-fix/B-new.csv) · [new rule and the cycle](../data/findings/38-mating-fix/C-cycle.csv) · [the cycle with a 4-hour wait](../data/findings/38-mating-fix/D-cycle-4h.csv) · [the comparisons](../data/findings/38-mating-fix/comparison.txt) · [the prediction, written before](../data/findings/38-mating-fix/prediction-written-before.txt).

**Question.** The female cycle crashed births to a third (entry 32). Two causes were found in the code: after **any** mating the female waited the whole nursing time, even if she had not conceived (B1); and a male could mate again only after a tenth of a year — 28.8 steps, as long as a whole female cycle (B7; found by the review). Fixed for hominins, does the cycle work?

**Added.** She enters the nursing wait only if she conceived. He can mate again after 1 hour (on the day clock); a mating costs him 0.5 energy, not 10. Wild chimpanzee females in full swelling mate from under one to about five times an hour (*Wild Chimpanzees*, Cambridge); the males who mate most show no higher energy costs (urinary C-peptide; Harvard dissertation). No study gives a male's own rest between matings: the 1 hour and the 0.5 are **assumptions**; the wait was tested at 1 and 4 hours.

**Test.** 12 worlds × 60 days, the same seeds. **Primary outcome named before: births per world.** Prediction written before the runs: (1) the new rule alone changes births little (with no cycle every mating already conceived); (2) with the cycle, births fall somewhat but stay at 70% or more of the no-cycle births; (3) a 4-hour wait gives about the same as 1 hour.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| A: old rule | 33.3 ± 19.0 | 0 | 33.4 | 25.1 | 95 | 20 | 18 | 56 |
| B: new rule | 31.4 ± 13.6 | 0 | 33.8 | 27.3 | 103 | 17 | 20 | 68 |
| C: new rule + cycle | 26.7 ± 14.7 | 0 | 28.1 | 26.4 | 93 | 33 | 19 | 72 |
| D: + cycle, 4-hour wait | 27.3 ± 19.1 | 0 | 26.7 | 24.4 | 95 | 7 | 22 | 70 |

**Result.** **All three predictions held.** (1) B against A: births +0.3 a world (range −6.6 to +7.3). (2) C against B: births **83%** (−5.7 a world, range −10.8 to −0.6; lower in 8 of 12 worlds) — against 29% with the old rule (entry 32). (3) D against C: −1.4 (range −4.9 to +2.0). Survival with the cycle 26.7 against 31.4, within noise.

**Interpretation.** The cycle's collapse was the two bugs, not the cycle. With them fixed, a real feature of ape reproduction costs a little in births, as waiting for fertile days should. One simplification remains: conception within the fertile days is certain, where real females often need several cycles (an assumption already registered).

**Strength.** Moderate (12 paired worlds; the primary outcome and its prediction named first). **Lesson:** a failure traced to its causes and fixed, then predicted and confirmed, is worth more than a success that was never in doubt.

### 39. Hunters kept from dying out: newcomers from the wider population — Nov 2026

**Version.** Unreleased · the change and the test: commit `2dd4269` (`--no-rescue` restores the closed world — checked: identical worlds; `--rescue-rate` sets the rate). Run by Claude.

**Data.** [Closed world](../data/findings/39-newcomers/A-closed.csv) · [newcomers about once a year](../data/findings/39-newcomers/B-rescue-1.csv) · [a quarter as often](../data/findings/39-newcomers/C-rescue-025.csv) · [the comparisons](../data/findings/39-newcomers/comparison.txt) · [the prediction, written before](../data/findings/39-newcomers/prediction-written-before.txt) · hunter traces before the change: [seed 2](../data/findings/39-newcomers/hunters-trace-seed-2-before.txt), [4](../data/findings/39-newcomers/hunters-trace-seed-4-before.txt), [5](../data/findings/39-newcomers/hunters-trace-seed-5-before.txt), [6](../data/findings/39-newcomers/hunters-trace-seed-6-before.txt) (`tools/analysis/hunters-trace.js`).

**Question (the owner).** On the live site every hunter in the owner's world died; in entry 37 hunters died out of 4 of 8 worlds. Why, and what real thing is missing?

**The trace** (4 of entry 37's worlds, 100 days): every hunter kind starts as 2 animals. Wolves were gone in **all 4** worlds by day 40–60, big cats in 3 of 4, bears in 1. They died of hunger and old age, and big cats were often "killed by a predator" — by their own starving kind (hunters attack their own kind only when starving). Big cats spent 1,300–3,700 steps a world near starvation. Two causes: **tiny numbers** (a kind of 2–10 animals for the whole world dies out by chance) and **starving** (the review: about 3–10 times too many hunters for the prey).

**Real-world basis.** Real predators are far more numerous: Serengeti leopards about 5.5 per 100 km² (Allen et al. 2020), hyenas 80–200. Small isolated carnivore populations do die out — an isolated puma population of a few dozen has a 16–21% chance in 50 years (Benson et al. 2019) — and are kept going by animals arriving from outside: the rescue effect (Brown & Kodric-Brown 1977); one immigrant a year cut a reintroduced marten population's 100-year extinction risk below 1% (J. Wildl. Manage. 2019).

**Added (fix 1 of 2, the owner's choice).** While a hunter kind has fewer than 4 animals, a young adult of that kind arrives about once a life-year, somewhere that suits it, away from the band, with a blank mind; drawn from the separate random stream. The rate and the threshold are **assumptions**; the rate was tested at 1 and 0.25. A stand-in for the wider population until the scale is decided.

**Test.** 12 worlds × 100 days, the same seeds. **Primary outcome named before: hunter kinds still alive at day 100 (of 36).** Prediction written first: (1) closed: kinds lost in most worlds; (2) newcomers once a year: at least 30 of 36, but hunters stay few and starve; (3) a quarter as often: in between; (4) hominin predator deaths rise.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Closed world | 28.0 ± 20.5 | 1 | 46.6 | 43.6 | 206 | 46 | 26 | 88 |
| Newcomers once a year | 31.2 ± 22.3 | 0 | 49.9 | 43.8 | 219 | 38 | 27 | 83 |
| Newcomers 0.25 a year | 29.8 ± 21.6 | 0 | 51.7 | 46.8 | 234 | 39 | 39 | 75 |

| Hunters at day 100 | Kinds alive (of 36) | Worlds with all 3 | Hunters per world |
|---|---|---|---|
| Closed world | 20 | 1 of 12 | 10.0 |
| Newcomers once a year | **36** | **12 of 12** | 17.8 (+7.8, range +3.8 to +11.9) |
| Newcomers 0.25 a year | 34 | 10 of 12 | 12.7 |

**Result.** (1), (2) and (3) **held**: from 20 of 36 kinds alive to all 36, at both rates nearly all. (2)'s second half was **wrong**: hunters did not stay few (17.8 a world). (4) was **wrong**: hominin predator deaths did not rise (46 → 38; −0.7 a world, range −7.2 to +5.9: no change). Hominin survival unchanged (31.2 against 28.0, within noise).

**Interpretation.** A closed world of a few animals per kind loses its hunters by chance; a trickle of newcomers, as real landscapes have, keeps all three kinds. It does not touch the second cause — starving — which fix 2 (more prey per hunter) addresses. Hunters being present did not make the world more dangerous for hominins within 100 days, probably because predators kill the isolated (entry 14) and hominins now stay together (entries 30–31).

**Strength.** Strong for "kinds no longer die out" (36 of 36 against 20, all 12 worlds; a near-certain result) — on the log's scale moderate (12 worlds). **Lesson:** a world too small to hold real populations needs the wider population represented somehow; the real fix is the scale (priority 4).

### 40. Hunters live where their prey lives — and the world becomes dangerous — Nov 2026

**Version.** Unreleased · the change and the test: commit `d6180d2` (`--hunters-anywhere` restores the old rule — checked: identical worlds; `--prey-radius` sets the distance); traces: `tools/analysis/prey-trace.js`, `hunting-trace.js`. Run by Claude.

**Data.** [Hunters anywhere (entry 39's run, identical to the old rule)](../data/findings/40-hunters-near-prey/hunters-anywhere-baseline.csv) · [near prey, 8 squares](../data/findings/40-hunters-near-prey/B-near-8.csv) · [4 squares](../data/findings/40-hunters-near-prey/C-near-4.csv) · [the comparisons](../data/findings/40-hunters-near-prey/comparison.txt) · [the prediction, written before](../data/findings/40-hunters-near-prey/prediction-written-before.txt) · traces before: prey [seed 1](../data/findings/40-hunters-near-prey/prey-trace-seed-1-before.txt), [seed 3](../data/findings/40-hunters-near-prey/prey-trace-seed-3-before.txt); hunting [seed 1](../data/findings/40-hunters-near-prey/hunting-trace-seed-1-before.txt), [seed 3](../data/findings/40-hunters-near-prey/hunting-trace-seed-3-before.txt); after, 10 days: [seed 1](../data/findings/40-hunters-near-prey/hunting-trace-seed-1-after-10-days.txt).

**Question.** Fix 2 of the hunter release was meant to be "more prey per hunter" (the review: 3–10 times too many hunters for the prey). Before building it, the traces were checked.

**What the traces found — the planned fix was wrong.** Deer and rabbits were already at their caps (about 57 of 60 and 44 of 45) and died mostly of hunger and old age, hardly ever of predators (1 deer killed by a predator in 60 days in one world, none in the other). Once beside prey, a hunter's attack succeeds often (60% on an adult deer). But **big cats were never within 5 squares of any plant-eater in 30 days**, in either world; in one world neither were the wolves. Each kind had been placed anywhere on the planet that suited its climate, regardless of where the herds were — so hunters starved far from prey, not for want of prey. The owner chose to replace "more prey" with placing hunters near prey.

**Real-world basis.** Carnivores live where their prey is: their numbers follow prey biomass (Carbone & Gittleman 2002).

**Added.** A hunter starts, and a newcomer (entry 39) arrives, only with plant-eaters within 8 squares, inside its own habitat. The 8 squares is an **assumption**, tested at 8 and 4. A 10-day trace afterwards: big cats within 5 squares of prey 369 times (none before), 11 plant-eaters killed.

**Test.** 12 worlds × 100 days, the same seeds; newcomers on throughout. Prediction written first: (1) hunter kinds stay near 36 of 36; (2) plant-eaters fall at least 10% (primary); (3) hominin predator deaths rise somewhat; (4) 4 squares about the same as 8.

| | People alive | Worlds died out | Born per world | Died per world | Hunger | Predators | Drowned | Burned |
|---|---|---|---|---|---|---|---|---|
| Hunters anywhere | 31.2 ± 22.3 | 0 | 49.9 | 43.8 | 219 | 38 | 27 | 83 |
| Near prey, 8 squares | 22.5 ± 20.3 | 0 | 45.9 | 48.4 | 186 | **149** | 29 | 55 |
| Near prey, 4 squares | 25.3 ± 25.7 | 1 | 39.1 | 38.8 | 158 | 92 | 15 | 68 |

| At day 100 | Hunter kinds alive | Hunters per world | Plant-eaters per world |
|---|---|---|---|
| Hunters anywhere | 36 of 36 | 17.8 | 59.7 |
| Near prey, 8 squares | 36 of 36 | 19.3 | 46.3 (−13.4, range −32.9 to +6.1; lower in 8 of 12) |
| Near prey, 4 squares | 36 of 36 | 19.6 | 36.7 |

**Result.** (1) **held**. (2) **held on average** (−22%), though the range just includes zero. (3) was an **understatement**: hominins killed by predators rose about fourfold, 38 → 149 (+9.3 a world, range −2.1 to +20.6; higher in 6 worlds, lower in 3). Hominin survival fell, within noise (31.2 → 22.5, range −26.9 to +9.6). (4) within noise (4 squares: 92 predator deaths, plant-eaters 36.7).

**Interpretation.** With hunters where the herds are, predators finally act as predators: they eat plant-eaters, and they meet hominins, who forage in the same places. Entry 37's world was too safe (no disease, predators gone); now one of those two missing pressures is back. Whether a fourfold rise is realistic is for the reality checks (causes of death against wild chimpanzees and foragers) — not a reason to tune.

**Strength.** Moderate for "hunters now reach their prey" (traces; plant-eaters down in 8 of 12 worlds); weak–moderate for the rise in hominin deaths (large, but the range touches zero). **Lesson:** a diagnosis made on paper (too little prey) failed the first look at the data (prey in the wrong place). Trace before building.

### 41. The first shelters were chance, not building — Nov 2026

**Version.** The worlds of entry 37 (commit `26a92dd`), traced read-only with `tools/analysis/shelter-trace.js`. Run by Claude.

**Data.** Traces: [world 8](../data/findings/41-shelters-were-chance/shelter-trace-world-8.txt), [world 4](../data/findings/41-shelters-were-chance/shelter-trace-world-4.txt), [world 1](../data/findings/41-shelters-were-chance/shelter-trace-world-1.txt).

**Question.** In entry 37 a hominin slept on a heap of seven or more branches in 3 of 8 worlds — the first "shelters" in Genesis. Built on purpose, or chance? The cheap check first (suggested by Fable): what was the heap worth? A heap of 7 gives cover 0.375 (`src/forest.js`), below the 0.4 needed to keep dry or feel safe; and cover is the larger of the tree and the heap, so a heap under trees adds nothing.

**Test.** Each world re-run on its own code to 10 days after the first heap sleep, recording every branch dropped (where, by whom, when), and at the first sleep: the branches, the tree cover, rain and temperature.

| | World 8 | World 4 | World 1 |
|---|---|---|---|
| Day of the first heap sleep | 169 | 194 | 253 |
| Branches | 7 | 7 | 7 |
| Cover from the heap | 0.375 | 0.375 | 0.375 |
| **Cover from the tree above** | **0.80** | **0.86** | **0.40** |
| What the heap added | nothing | nothing | nothing |
| Branches dropped there before | 5, by 5 hominins (one each), days 34–149 | 24, by 10, days 58–194 (at most 7 by one) | 36, by 15+, days 32–253 (at most 4 by one) |
| The 10 days after | 7 → 8 branches | fell to 4 | fell to 3 |

Busier spots elsewhere had 50–115 branches dropped on them (by 12–28 hominins) and held 0–2: branches rot.

**Result.** **Chance, not building.** In every world the heap lay under trees that already gave as much cover or more, so the heap gave nothing; the hominin slept there because of the tree (the inborn pull toward cover, entry 13). The branches came from many hominins each dropping one or a few over months in a much-used place — no one carried them there repeatedly — and two of the three heaps shrank right after. The planned frozen-brain test is not needed.

**Also found.** The "first shelter" milestone (`day_shelter`: asleep on 7+ branches) counts heaps that do nothing. It should count a heap only where it adds cover beyond what is already there (backlog B16).

**Strength.** Strong for "chance" (all three worlds, the cover arithmetic exact). **Lesson:** a striking first ("they built shelters!") must be traced before it is told; the cheapest check — what it was worth — settled it in an hour.

### 42. Reality checks: how close is Genesis to real apes? — Nov 2026

**Version.** Unreleased · the live settings of 12 Nov (commit `dcd60b2`: mating fixed, the cycle on, newcomers, hunters near prey); the tool `tools/analysis/reality-check.js`. Run by Claude.

**Data.** [The table](../data/findings/42-reality-checks/table.txt) · [each world](../data/findings/42-reality-checks/worlds/). Re-run: `node tools/analysis/reality-check.js 1,2,3 100 out/` then `--summary out/`.

**Question.** Each change has been tested against the one before it. Is the whole world realistic? Priority 2 of the plan: one table of pass/fail checks against real numbers, each on the life clock (a year = 3 days), on 24 worlds.

**Test.** 24 worlds × 100 days (about 33 life-years); every hominin followed from birth (or, for founders, from the start) to death: 1,042 births. Life expectancy from a life table (deaths per person-year at each age). A check passes when Genesis falls inside a band from wild chimpanzees (the proxy for hominins 2.5 million years ago) to foragers.

| Check | Genesis | Real band | Pass? | Real numbers |
|---|---|---|---|---|
| Babies dying in their first year | 1.0% | 10–25% | **fail (far too low)** | chimpanzees 21% (four sites), Kanyawara 11% (Hill et al. 2001) |
| Born who reach age 15 | 53.9% | 30–60% | pass | chimpanzees about 35%, foragers about 60%, Hadza 55% (Kaplan et al. 2000) |
| Life expectancy at birth | 20.6 years | 13–33 | pass | chimpanzees about 13 (four sites) to 32.8 (Ngogo, Wood et al. 2017) |
| Years between births, earlier baby alive | 4.7 | 5.0–6.5 | **fail (too short)** | Gombe 5.2, Mahale 5.6–6.0, composite 5.7 |
| Age at first birth | 14.8 years | 12.5–15.5 | pass | Gombe 13.3, Taï 13.7, Mahale 14.6, with dispersers 14.9 |
| Population change a year | −1.2% (median of 23; 1 world died out) | −1% to +1.5% (band an assumption) | **fail, just** | roughly stable: Gombe shrank, Kanyawara grew modestly |
| Deaths from illness | 0% | 40–70% | **fail** | Gombe 58% of known causes (Williams et al. 2008) |

Samples: 1,029 babies followed through their first year, 631 to age 15, 601 birth intervals, 155 first births. Causes of death (all ages): hunger 35%, old age 21%, predators 17%, fire 12%, wounds 8%, drowning 4%, childbirth 1%, thirst 1%.

**Result. 3 of 7 checks pass:** survival to 15, life expectancy and age at first birth are inside the real range. Four fail:
- **Babies almost never die in their first year** (1% against 11–21%). Real infant deaths come largely from illness, infanticide and the mother's death; Genesis has no disease and no infanticide, and nursing babies are carried and fed.
- **Births come too close together** (4.7 years against 5.2–6.0). This confirms the review's finding 3, which the check on it (review section 8) had called "weaker than stated": the measured median is below the real range. Real females usually need several cycles to conceive; here conception within the fertile days is certain (an assumption).
- **Populations shrink slightly** (median −1.2% a year; worlds range from −9.7% to +3.0%) — just outside a band that is itself an assumption. Entry 37's boom of about +3% a year is gone with predators back.
- **No illness at all**, where it is the leading cause of death in wild chimpanzees.

**Interpretation.** The life-history numbers (who reaches adulthood, how long they live, when they first give birth) are realistic. What is unrealistic is *why* hominins die: hunger and fire too much, illness never, babies hardly ever. Fire deaths at 12% look far too high for apes (no wild chimpanzee study among those read reports fire as a cause); a check to add when its real number is found. Disease is the missing piece that would bring both infant deaths and the causes into line — it is on the backlog (R9), outside the five priorities under the freeze.

**Strength.** Moderate (24 worlds, 1,042 births; the bands are from sources except population change). **Lesson:** a world can get the totals right for the wrong reasons; the causes of death show it.

### 43. Speed: 1.7 times faster, identical worlds — Nov 2026

**Version.** Unreleased · the change: three rewrites in `src/brain.js` and `src/mind.js`; tools `tools/analysis/profile-run.js`, `profile-top.js`. Run by Claude.

**Data.** [Profile before](../data/findings/43-speed/profile-before.txt) · same worlds before and after: [seeds 1–2, 20 days, before](../data/findings/43-speed/before-seeds-1-2-20-days.csv), [after](../data/findings/43-speed/after-seeds-1-2-20-days.csv); [seeds 3–4, 40 days, before](../data/findings/43-speed/before-seeds-3-4-40-days.csv), [after](../data/findings/43-speed/after-seeds-3-4-40-days.csv).

**Question.** Priority 3 of the plan: realistic scale is impossible at today's speed. Where does the time go, and can it be cut without changing a single result?

**Measured.** A profile of one world over 20 days: about two thirds of all computing went to the brains learning — a small helper that moves each connection (about 29%), thinking (12%), the learning step (10%), fading the record of recently used connections (7%) — and a fifth to the world step itself, most of it the learning code folded into it.

**Changed (the same arithmetic, the same order):** (1) the helper that moved each connection is written out loop by loop; (2) the words for each action ("eat", "go east"…), which were built afresh for every creature on every step only to be shown on the page, are made once; (3) the fading of recent-use records touches only the connections in use — a brain has room for 64 thinking units but a hominin grows about 17–23, and the rest of its record is always exactly zero.

**Test.** The same worlds before and after, compared row for row: seeds 1–2 × 20 days and seeds 3–4 × 40 days. All 81 tests pass.

**Result. Did it make a difference? Yes: 119 → 71 seconds for the same two worlds × 20 days (1.7 times faster), and every world identical to the last digit.**

**Strength.** Strong (exact identity; timing measured alone on the same laptop). **Lesson:** the slow part was not the hard part — two of the three savings came from work the world never needed (display words, multiplying zeros).

### 44. Not every cycle conceives: births spaced as in real apes — and bands shrink — Nov 2026

**Version.** Unreleased · the change: commit `8f6cb14` (`--certain-conception` restores the old rule — checked: identical worlds; `--conceive` sets the chance). Run by Claude.

**Data.** Tables: [1 cycle in 5](../data/findings/44-conception/table-0.2.txt), [1 in 10](../data/findings/44-conception/table-0.1.txt) · each world: [0.2](../data/findings/44-conception/worlds-0.2/), [0.1](../data/findings/44-conception/worlds-0.1/) · [the prediction, written before](../data/findings/44-conception/prediction-written-before.txt) · before: entry 42.

**Question.** Entry 42 found births 4.7 years apart against a real 5.2–6.0: conception within the fertile days was certain. Real females need several cycles.

**Real-world basis.** Cycles to conception in wild chimpanzees: Gombe 4.7, Kanyawara 5, Mahale 8.9, Taï 11.7–19.4 (Deschner & Boesch 2007); cycles with higher ovarian hormones are likelier to conceive (Emery Thompson).

**Added.** Each cycle of each female can lead to conception with a chance of 0.2 (about 1 in 5, the East African sites), decided per female and cycle; tested at 0.2 and 0.1.

**Test.** The reality checks (entry 42's tool), 24 worlds × 100 days, the same seeds. **Primary outcome: years between births with the earlier baby alive.** Prediction written first: (1) at 0.2 it rises into the real band, to about 5.1–5.3; (2) at 0.1 about 5.5–6.0; (3) births fall, so populations shrink further; (4) the other checks stay in band.

| | Before (entry 42) | 1 cycle in 5 | 1 in 10 |
|---|---|---|---|
| Years between births (real 5.2–6.0) | 4.7 ✗ | **5.3 ✓** | 5.7 ✓ |
| Age at first birth (real 13.3–14.9) | 14.8 ✓ | 15.4 ✓ | 16.3 ✗ |
| Born who reach 15 | 53.9% ✓ | 52.7% ✓ | 47.9% ✓ |
| Life expectancy at birth | 20.6 ✓ | 16.2 ✓ | 16.3 ✓ |
| Babies dying in their first year (real 11–21%) | 1.0% ✗ | 3.8% ✗ | 2.3% ✗ |
| Population change a year | −1.2% ✗ | −2.2% ✗ | −4.8% ✗ |
| Worlds that died out (of 24) | 1 | **6** | 4 |
| Checks passing (of 7) | 3 | **4** | 3 |

Causes of death at 0.2: hunger 41%, old age 20%, predators 14%, fire 11%, drowning 9%, wounds 4%.

**Result.** (1) **held exactly** (5.3); (2) held (5.7); (3) held, more than expected: populations shrink 2.2% a year, and 6 of 24 bands died out within 33 years, against 1; (4) held at 0.2, not at 0.1 (first births too late). The 0.2 stays: it is the East African number.

**Interpretation.** With births now as rare as in real apes, Genesis bands shrink. Real chimpanzee communities with this birth spacing and a life expectancy of 13–33 years hold roughly steady (Gombe declined slowly). So deaths in Genesis are too many, or at the wrong ages: hunger causes 41% of deaths and fire 11% — neither is a leading cause of death in wild apes — while illness causes none. **This matters for the next step:** disease added on top of these deaths would make bands shrink faster. The excess hunger and fire deaths are most likely behaviour the brains have not learned (not moving on when food runs out, backlog A2; not moving away from a wildfire, A3). Small closed bands also die out by chance where real communities exchange females (R14).

**Strength.** Moderate (24 worlds; the primary outcome and prediction named first). **Lesson:** fixing one number to reality can expose another that was hiding behind it — here, too many deaths, hidden by too many births.

### 45. Why so many die of hunger: food is near, and they do not take it — Nov 2026

**Version.** Unreleased · the live settings after entry 44; tools `tools/analysis/hunger-trace.js`, `fire-trace.js`, `hunger-pull.js`. Run by Claude.

**Data.** [Hunger trace, seed 1](../data/findings/45-why-hunger/hunger-trace-seed-1.txt), [seed 3](../data/findings/45-why-hunger/hunger-trace-seed-3.txt) · [hunger pull, seed 1](../data/findings/45-why-hunger/hunger-pull-seed-1.txt), [seed 3](../data/findings/45-why-hunger/hunger-pull-seed-3.txt) · [fire trace, seed 1](../data/findings/45-why-hunger/fire-trace-seed-1.txt), [seed 3](../data/findings/45-why-hunger/fire-trace-seed-3.txt).

**Question.** Entry 44: hunger causes 41% of deaths and fire 11%, against illness 0% — so disease added now would stack on deaths that are already too many. The owner chose to trace hunger and fire first.

**Fire.** No hominin died by fire in either world in 60 days: fire deaths come in rare mass events (one wildfire catching a band; entry 18).

**Hunger** (two worlds, 60 days; 29 hunger deaths, about 8,000 starving moments):
- Most who starve are **adults** (69–88% of starving moments; 23 of 29 deaths).
- Food is **close**: within 2 squares in 86–88% of starving moments, under their feet in 18–22%.
- Even so, starving hominins chose to eat only **5–9%** of the time; they walked (24–49%) or did other things.
- Standing on fruit or roots, with no hunter close (the hunger pull fully on), they ate **10.6% and 25%** of the time. A hunter close enough to switch the pull off was never the case (0 moments).
- In about 75–95% of starving moments they were **not** standing on food but one or two squares from it. **Correction (13 Nov):** a square is about 3 km (README), so one or two squares is 3–6 km — a walk of 2–3 hours at about 1.8 km/h, within a real chimpanzee's day range (2–5 km), not "a step".

**Interpretation.** Hunger deaths are not food shortage and not the hunter rule: starving hominins rarely go to food a few kilometres away, and often do not eat when they stand on it (the second was the larger fault: entries 48–50). The inborn pulls (toward visible food; to eat when starving) exist but lose to what the brains have learned. This is the brains priority (learning what is food and moving to it: backlog A2, A4) — not a rule to strengthen until it wins, which would be tuning. Disease, added now, will stack on these excess deaths until the brains step removes them.

**Strength.** Moderate (two worlds; consistent with entries 10 and 28). **Lesson:** the same symptom (hunger with food in reach) keeps returning after each fix of a rule; its cause is learning, not the rules.

### 46. Disease: outbreaks spread by closeness — real, but small beside hunger — Nov 2026

**Version.** Unreleased · the change: commit `18ec0a9` (`--no-disease` restores none — checked: identical worlds; `--disease-rate` sets how often); tools `tools/analysis/outbreaks.js`, `reality-check.js`. Run by Claude.

**Data.** Tables: [once in 7 years](../data/findings/46-disease/table-1in7.txt), [once in 20](../data/findings/46-disease/table-1in20.txt), [entry 44 without disease, same bands](../data/findings/46-disease/table-no-disease-entry44-new-band.txt) · worlds: [1 in 7](../data/findings/46-disease/worlds-1in7/), [1 in 20](../data/findings/46-disease/worlds-1in20/) · [the prediction, written before](../data/findings/46-disease/prediction-written-before.txt).

**Question.** Entry 42: no hominin ever died of illness, and babies almost never died, where illness is the leading cause of death in wild chimpanzees. The owner chose to add disease after tracing hunger (entry 45).

**Real-world basis.** Illness: 58% of known-cause deaths at Gombe, mostly in epidemics, mostly respiratory (Williams et al. 2008); Kanyawara respiratory illness about 27% over 30 years. In an outbreak 87–100% of a community fall sick and about 2–18% of it dies; some outbreaks kill only the young (Taï 2004: 8 deaths, all infants and juveniles), others adults (review, Primates 2020; Kanyawara 2013). Outbreaks about once in 5–8 years at Gombe and Kanyawara — but many were human viruses brought by researchers and tourists, so outbreaks 2.5 million years ago were probably rarer and milder. Illness spreads by sharing space (2021).

**Added.** An outbreak starts in one hominin about once in 7 life-years (tested at 1/7 and 1/20); it passes to anyone within 2 squares of a sick hominin; the illness lasts a day; at its end the hominin dies with a chance by age (infants 0.3, juveniles 0.1, adults 0.02, from 35 years 0.1), doubled when starving; survivors cannot catch it again. Every number an **assumption** within the evidence. A first check (two worlds, five outbreaks): 40–87% fell sick (low against the real 87–100%), 0–10% died (real 2–18%); the three who died in one outbreak were toddlers, as at Taï.

**Test.** The reality checks, 24 worlds × 100 days, the same seeds as entries 42 and 44. Primary outcome named before: babies dying in their first year. **The illness band was widened** from 40–70% (Gombe) to 15–60%, stated as an assumption: the old band came from modern epidemics, many of them human viruses. **Correction (13 Nov): it was widened after the first disease results (4.9%) had been seen**, not before; the reason is the evidence, but the timing is stated so that readers can judge it. Disease fails even the widened band.

| | No disease (entry 44) | Once in 7 years | Once in 20 years | Real |
|---|---|---|---|---|
| Babies dying in their first year | 3.8% | 5.3% | 3.3% | 11–21% ✗ |
| Deaths from illness | 0% | **4.9%** | 2.8% | 15–60% ✗ |
| Years between births | 5.3 | 5.2 | 5.2 | 5.2–6.0 ✓ |
| Born who reach 15 | 52.7% | 49.2% | 52.0% | 35–60% ✓ |
| Life expectancy at birth | 16.2 | 15.9 | 17.0 | 13–33 ✓ |
| Age at first birth | 15.4 | 15.7 ✗ | 15.5 ✗ (at the edge) | 13.3–14.9 |
| Population change a year | −2.2% | −3.1% | −2.0% | about stable ✗ |
| Worlds that died out (of 24) | 6 | 6 | 4 | |

Causes of death at 1 in 7: hunger 37%, old age 20%, fire 14%, predators 10%, drowning 10%, illness 5%.

**Result.** All four predictions held: infant deaths rose only a little (3.8 → 5.3%), still far below the real range; illness became a cause of death (5%), below even the widened band; populations shrank further (−3.1% a year); 1 in 20 fell in between. **Checks passing: 3 of 7** (age at first birth slipped just over its band).

**Interpretation.** Disease now exists and behaves within the range of real outbreaks, but it is small beside hunger (37–39%), which the brains cause (entry 45). Until the brains step removes the excess hunger deaths, illness cannot take its real share, and adding it makes bands shrink. The 1/7 rate stays the default (the observed rate, tested at both ends with similar results). Babies still die far too rarely: other real causes — infanticide, a mother's death, falls — remain missing or rare (backlog R10).

**Strength.** Moderate (24 worlds; predictions and the band change written first). **Lesson:** a real cause of death cannot take its real share while an unreal one takes too much.

### 47. Speed, a second short pass: what is left is real work — Nov 2026

**Version.** Unreleased · two small rewrites (`src/creatures.js`: the disease check does nothing between days when no one is sick; `src/brain.js`: a plain loop for the voice's learning traces). Run by Claude.

**Test.** The same worlds before and after (seeds 3–4 × 40 days): **identical**. All quick tests pass.

**Result. Did it make a difference? A little.** The whole speed work of 12 Nov stands at about 1.7 times faster (seeds 1–2 × 20 days: 119 s with the code before entry 43, 69 s now, disease off for a fair comparison). A new profile: what remains is the brains' own work — moving connections as they learn (23%) and thinking (19%) — which can only shrink by changing how they learn (the brains step) or by moving it to a faster engine (the rebuild decision at the scale step).

**Strength.** Strong (identical worlds). **Lesson:** stop optimising when what is left is the work itself.

### 48. What the brain believes: eating does not pay — so even on fruit it will not eat — Nov 2026

> **Correction (13 Nov, entry 57):** the tool used here read a list of creatures saved at the start of the run; Genesis makes a new list as creatures are born and die, so **only the founders were measured**, never hominins born later. The eat-outcomes table (test 2) describes founders' meals only; the brain probe (test 1) used the current list and is unaffected.

**Version.** Unreleased · the live settings after entry 47; tools `tools/analysis/brain-diag.js`, `eat-outcomes.js`. Run by Claude. Step 1 of the brains priority.

**Data.** [The brain alone, seed 1](../data/findings/48-what-the-brain-believes/brain-alone-seed-1.txt), [seed 3](../data/findings/48-what-the-brain-believes/brain-alone-seed-3.txt) · [every eat choice and what happened, seed 1](../data/findings/48-what-the-brain-believes/eat-outcomes-seed-1.txt).

**Question.** Entry 45: starving hominins stand on food and do not eat. Before changing anything: what does the brain itself expect from eating? Two possibilities need different fixes — it has not learned yet, or it has learned that eating does not pay.

**Test 1 — ask the brain.** For starving hominins standing on fruit or roots, each one's own network was run on what it sensed, *without* the inborn pulls, to read its learned chance of choosing "eat" among the 19 choices.

| Starving, standing on | Brain alone: chance of "eat" | Rank of "eat" (0 = first) | Did eating work? |
|---|---|---|---|
| Fruit (seed 1) | 0.3% (a fresh brain: about 5.3%) | 9.6 of 18 | always (+13 energy) |
| Fruit (seed 3) | 0.1% | 16.8 of 18 | always (+12) |
| Roots (seeds 1, 3) | 1.5%, 0.0% | 8.6, 9.6 | 19–38% (bare-handed digging) |

**The brains have learned that eating is bad** — below what an untrained brain would choose — even on fruit, where eating always works.

**Test 2 — every time a hominin chose to eat, and what happened** (seed 1, 15 days, all hominins, hungry or not): on fruit 44% of eat choices (energy rose only 23% of the time — mostly because the eater was already full); on cells with grass but no fruit or roots 32% (energy rose 41% of the time — likely leaves where trees stand — and fell 39%; hominins cannot digest grass); on roots 13% (energy fell 76% of the time: failed digging costs energy); on bare ground 11% (nothing, energy fell). So most of the times a brain chooses "eat", nothing good follows.

**Interpretation — three causes found, each a fault of the world's rules, not of evolution:**
1. **An inborn pull fires on grass.** Besides the sweet taste of fruit, "hunger alone makes any primate try putting plants in its mouth" (`src/sim.js`) fires on `food > 0.1` — grass, which hominins cannot digest (entry 22 took grass out of their sight but not out of this pull). Hungry hominins keep trying grass and get nothing.
2. **Digging is hidden inside "eat".** Roots must be dug up (bare hands succeed 15% of the time) but digging is part of the "eat" action and costs energy when it fails; to the brain, "eat" on roots mostly loses energy, and roots and fruit underfoot share one sense.
3. **Eating when full counts too.** Fruit eaten by a full hominin gives nothing, and those choices are many.

The brain's learning is doing what it should with this experience: "eat" mostly yields nothing, so it stops eating. Inborn pulls raise "eat" while learning pushes it back down. Real primates sample new plants when hungry and learn which ones pay; they do not keep chewing grass, and digging is its own behaviour.

**Next (step 2, to research first).** Correct the rules, not the brain: the "try plants" pull only on plants a hominin can get something from; digging as its own action; then measure again whether brains learn that eating fruit pays. Then the memory for cause and effect, as planned.

**Strength.** Moderate (two worlds; the brain probe is exact). **Lesson:** ask the brain what it believes before changing how it learns — here it learned the truth of a world whose rules were wrong.

### 49. The brains expect ten times too much — so everything disappoints them — Nov 2026

**Version.** Unreleased · the grass fix: commit `83b3e09` (`--old-plant-pull` restores it — checked: identical worlds); tools `tools/analysis/brain-diag.js`, `learning-signal.js`. Run by Claude. Step 2 of the brains priority.

**Data.** [Reality checks with the grass fix](../data/findings/49-inflated-expectations/table-grass-fix.txt) · brain probes [before](../data/findings/49-inflated-expectations/brain-before-grass-fix-seed-1.txt) and [after](../data/findings/49-inflated-expectations/brain-after-grass-fix-seed-1.txt) the grass fix (seed 1; seed 3 alongside) · [with no poisonous berries](../data/findings/49-inflated-expectations/brain-no-poison-probe-seed-1.txt) · learning signal: [seed 1](../data/findings/49-inflated-expectations/learning-signal-seed-1.txt), [seed 3](../data/findings/49-inflated-expectations/learning-signal-seed-3.txt) · [the prediction, written before](../data/findings/49-inflated-expectations/prediction-written-before.txt).

**Question.** Entry 48: brains rate "eat" below a fresh brain's chance, even on fruit that always feeds them. Which fault teaches them that?

**Guess 1 — the grass pull (tested, wrong).** The hungry pull to try plants no longer fires on grass (realistic: hominins cannot digest grass; kept). Prediction written first: the brain's chance of "eat" on fruit rises toward 5%; hunger's share of deaths falls to about 30%. **Result: no change.** Brain alone on fruit 0.0–0.3% before and after; hunger 37% → 39% of deaths; population change −3.1% a year both; worlds died out 6 → 5. Prediction wrong.

**Guess 2 — poisonous berries (probe, wrong).** The same two worlds with every poisonous berry removed after they were built (a probe, not a change): brains still rate "eat" on fruit at 0.0–0.4%.

**Measuring instead of guessing — the learning signal.** The signal a brain learns from (d: how much better or worse things went than it expected), in two worlds over 40 days:

| | World 1 | World 3 |
|---|---|---|
| The brain's own estimate of how good its situation is (V, average) | **2.34** | **3.14** |
| What its rewards are actually worth (average reward ÷ (1 − 0.97)) | about 0.32 | about 0.24 |
| Learning signal, average over all hominins and steps | −0.08 | −0.12 |
| Signal right after a starving hominin on fruit ate | −0.99 (2 cases) | **+0.18** (10 cases) |
| Signal right after it did anything else there | −0.43 | **−0.96** |

**Result.** The brains' expectations are about **ten times too high**, so on average things go worse than expected (the signal is negative about half the time and on average). Eating fruit when starving does feel better than the alternatives (+0.18 against −0.96), but it is chosen so rarely that little is learned from it, while the steady disappointment pushes down whatever is done often — and the inborn pulls make "eat" one of those, often where there is nothing to eat.

**A likely cause, in the code (to be tested).** "A big, unexpected success sticks after one try": when the signal is above 0.5, learning is up to four times stronger (`src/sim.js`), and the brain's estimate of value learns from that same boosted signal, while bad surprises get at most 1.5 times (fear). So good surprises count up to four times as much as bad ones, and expectations creep up.

**Interpretation.** This is a fault in the learning machinery, not in the world: one-try learning of a striking event is real (dopamine bursts), but it should not inflate the brain's general expectation of how good things are. Next: let the one-try boost act on what the brain does, not on its estimate of value; check that expectations then match rewards; then measure eating and hunger again.

**Strength.** Moderate (two worlds; the measurements are exact; the cause is a reading of the code, not yet tested). **Lesson:** after two wrong guesses, measure the signal the brain learns from.

### 50. Fixing the brains' expectations: hominins eat, live longer, and bands hold steady — Nov 2026

**Version.** Unreleased · the change and the test: commit `4ae1ab4` (`--boosted-value` restores the old rule — checked: identical worlds). Run by Claude. Step 2 of the brains priority.

**Data.** [Reality checks after](../data/findings/50-calm-value/table.txt) · [before (entry 49)](../data/findings/50-calm-value/table-before.txt) · [each world](../data/findings/50-calm-value/worlds/) · brain probes after: [learning signal, seed 1](../data/findings/50-calm-value/learning-signal-after-seed-1.txt), [seed 3](../data/findings/50-calm-value/learning-signal-after-seed-3.txt); [what the brain picks, seed 1](../data/findings/50-calm-value/brain-after-seed-1.txt), [seed 3](../data/findings/50-calm-value/brain-after-seed-3.txt) · [the prediction, written before](../data/findings/50-calm-value/prediction-written-before.txt).

**Question.** Entry 49: brains expected about ten times more than they got, likely because the one-try boost (a big good surprise learned up to four times as strongly) also trained the brain's estimate of value, while bad surprises got at most 1.5 times. Fix that, and do hominins eat — and live?

**Changed.** The one-try boost and fear still shape what a hominin *does* after a striking moment; the brain's estimate of *how good things are* now learns from good and bad surprises alike (only novelty and stress, which do not depend on whether the surprise was good or bad, still change how fast it learns). One-try learning of striking events is real (dopamine bursts); inflating the general expectation of life was not.

**First check (two worlds, 40 days).**

| | Before | After |
|---|---|---|
| Brain's value estimate against what rewards are worth | 2.34 vs 0.32; 3.14 vs 0.24 | **0.38 vs 0.39; 0.31 vs 0.30** |
| Learning signal, average | −0.08; −0.12 | **0.00; +0.01** |
| Starving on fruit: the brain alone picks "eat" | 0.0–0.3% | **10.5%** (a fresh brain about 5.3%) |
| Starving on fruit: actually ate | 1–5% | **83%** |
| Starving moments spent standing on fruit (seed 1) | 141–213 | **12** |

**Test.** The reality checks, 24 worlds × 100 days, the same seeds. Prediction written first: (1) hunger's share of deaths below 25% (primary); (2) populations shrink less, fewer worlds die out; (3) illness, old age and predators take larger shares; (4) at least 4 of 7 checks pass.

| | Before (entry 49) | After | Real |
|---|---|---|---|
| **Population change a year** | −3.1% ✗ | **−0.3% ✓** | about stable |
| Worlds that died out (of 24) | 5 | **2** | |
| Deaths from hunger | 39% | **30%** | |
| Deaths from illness | 5.8% ✗ | **14.2%** ✗ (just short) | 15–60% |
| Born who reach 15 | 44.5% ✓ | **58.5%** ✓ | 35–60% |
| Life expectancy at birth | 15.3 ✓ | **21.3** ✓ | 13–33 |
| Years between births | 5.3 ✓ | 5.2 ✓ | 5.2–6.0 |
| Age at first birth | 15.5 ✓ | 15.5 ✓ | 13.3–14.9 (band to 15.5) |
| Babies dying in their first year | 6.8% ✗ | 4.9% ✗ | 11–21% |
| **Checks passing (of 7)** | 4 | **5** | |

Causes of death after: hunger 30%, old age 23%, predators 15%, illness 14%, fire 9%, wounds 6%, drowning 3%.

**Result.** (1) **Partly**: hunger fell from 39% to 30%, not below 25%. (2) **Held**: populations now hold steady (−0.3% a year, inside the real band) and 2 worlds died out instead of 5. (3) **Held**: illness 6% → 14%, old age 19% → 23%, predators 11% → 15%. (4) **Held**: 5 of 7 checks pass — the best yet.

**Interpretation.** A single fault in how the brains learned — good surprises counting up to four times as much as bad ones — had made every hominin chronically disappointed, and taught them that eating does not pay. With it fixed, their expectations match their lives, they eat what is under their feet, more children reach adulthood, and bands hold steady as real chimpanzee communities do. With fewer hominins starving, illness now takes nearly its real share — the effect entry 46 predicted would appear once hunger was fixed. Still failing: babies die too rarely (5% against 11–21%) and illness is just below its band.

**Strength.** Moderate–strong (24 worlds; a large, consistent change; predictions and primary outcome written first; the mechanism measured directly). **Lesson:** when every fix of the world leaves the same symptom, look at how the creatures learn — here, two wrong guesses about the world, then one measurement of the brain, found it.

### 51. Replaying the path to a reward backwards: no measurable effect — Nov 2026

**Version.** Unreleased · the change: commit `23d54e1` (`--no-back-replay` restores none — checked: identical worlds, including the reorganised sleep replay); tools `tools/analysis/going-to-food.js`, `starving-doing.js`. Run by Claude. Step 3 of the brains priority (memory for cause and effect).

**Data.** [Reality checks with backward replay](../data/findings/51-backward-replay/table.txt) · going to food, seed 1: [old value learning](../data/findings/51-backward-replay/going-to-food-old-value-seed-1.txt), [without](../data/findings/51-backward-replay/going-to-food-without-seed-1.txt) and [with backward replay](../data/findings/51-backward-replay/going-to-food-with-seed-1.txt) (seed 3 alongside) · [the prediction, written before](../data/findings/51-backward-replay/prediction-written-before.txt).

**Question.** After entry 50, do starving hominins go to food a square or two away, and if not, is the brain's short memory for cause and effect the reason? A hominin walks about 0.15 squares a step, so crossing one square (about 3 km) takes about 7 steps, while its record of what it just did halves in about 3.

**Measured first.** Starving hominins with food 1–2 squares (3–6 km) away: three hours later, 5–8% were closer and 91–95% at the same distance, with the old or the new value learning. In one world over 40 days they spent 34% of those moments walking, 28% asleep (31% very sleepy).

**Real-world basis.** After a reward, rats replay the path that led there backwards, and that replay goes with learning which actions were worth it (rodent studies, e.g. PMC7610948); hippocampal replay depends on dopamine (eLife 2024).

**Added.** Each hominin keeps the last 16 steps (about 4 hours: what it sensed, what it did, what followed); at a good surprise (reward above 0.3, the threshold already used for striking memories) that path is replayed backwards, each step credited with how good the next one looked. 16 steps and the threshold are **assumptions**.

**Test.** The reality checks, 24 worlds × 100 days; baseline entry 50. Prediction written first: hunger's share falls a little (to 25–29%), or no measurable change.

| | Entry 50 | With backward replay |
|---|---|---|
| Deaths from hunger | 30% | 30% |
| Population change a year | −0.3% ✓ | +0.1% ✓ |
| Worlds that died out | 2 | 2 |
| Born who reach 15 / life expectancy | 58.5% / 21.3 | 58.6% / 21.5 |
| Deaths from illness | 14.2% | 11.6% |
| Checks passing | 5 of 7 | 5 of 7 |

**Result. No measurable effect** (the prediction's "no change" end). Two-world probe: 8% closer after three hours with and without.

**Interpretation.** Memory for cause and effect is not what keeps starving hominins from food a few kilometres away. Food 3–6 km off is a 2–3 hour walk — an ordinary foraging distance for an ape — and what a hominin can see or remember of food that far away is the more likely limit (not yet measured). Kept: the mechanism is real, it does no harm, and it has a switch.

**Strength.** Moderate for "no effect" (24 worlds). **Lesson:** a measured problem (slow to reach food) can still have a different cause than the one that seemed obvious.

### 52. Learning by watching what worked, up close: hunger falls from 30% to 17% of deaths — Nov 2026

> **Corrected by entry 60:** paired on the same worlds, the later learning changes together cut hunger by about 7 points, not 13; they concern everyday choices, not skills spreading.

> **Correction (13 Nov, entry 57):** the tool used here read a list of creatures saved at the start of the run; Genesis makes a new list as creatures are born and die, so **only the founders were measured**, never hominins born later. The probe of young hominins' eating (first table) covered only children among the founders; the 24-world reality checks are unaffected.

**Version.** Unreleased · the change: commit `d569f83` (`--copy-moves`: the old copying; `--copy-far`: copy what worked from anyone in sight — both checked: identical worlds); tool `tools/analysis/young-eat.js`. Run by Claude. Step 4 of the brains priority.

**Data.** [Reality checks after](../data/findings/52-copy-what-worked/table.txt) · young hominins' eating, seed 1: [old copying](../data/findings/52-copy-what-worked/young-eat-old-copying-seed-1.txt), [copy what worked from afar](../data/findings/52-copy-what-worked/young-eat-worked-far-seed-1.txt), [and only up close](../data/findings/52-copy-what-worked/young-eat-worked-close-seed-1.txt) (seed 3 alongside) · [the prediction, written before](../data/findings/52-copy-what-worked/prediction-written-before.txt).

**Question.** Young hominins copied whatever an elder was doing, however it turned out, in their own place (backlog A4). Real young apes learn their diet by watching: at Budongo young chimpanzees peered closely at experienced group members, mostly their mothers, and about 60% of the peering was about food (Schuppli et al., Max Planck 2026; the study could not show directly that peering caused learning).

**Changed, in two steps.** (1) **Copy what worked:** a youngster copies the elder's last choice in proportion to how it turned out for the elder — better than it expected: copy it; worse: learn to avoid it; as expected: learn little. How others use their voice is copied as before. (2) **Only up close:** a choice is copied only from an elder in the same square (the closest Genesis has; peering is within reach).

**Probe (two worlds, 40 days, weaned young):**

| | Old copying | Copy what worked, from afar | …only up close |
|---|---|---|---|
| Chose "eat" (seed 1 / 3) | 5.3% / 2.3% | 17.8% / 6.9% | 6.0% / 2.1% |
| …with food there | 48% / 80% | 13% / 46% | 28% / 84% |
| …and it paid | 65% / 81% | 35% / 64% | 54% / 87% |
| Hunger deaths, all ages | 3 / 4 | 1 / 1 | 0 / 0 |

Step 1 alone made youngsters eat where there was nothing (copying "eat" from elders kilometres away); step 2 repaired most of it.

**Test.** The reality checks, 24 worlds × 100 days; baseline entry 51. Primary outcome: born who reach 15. Prediction written first: (1) survival to 15 rises a little, to 59–63%; (2) hunger's share falls a little, to 26–29%; (3) population stays in band, checks at least 5 of 7.

| | Entry 51 | Learning by watching | Real |
|---|---|---|---|
| **Deaths from hunger** | 30% | **17%** | |
| Born who reach 15 | 58.6% ✓ | 61.8% ✗ (just above) | 35–60% |
| Deaths from illness | 11.6% ✗ | **16.3% ✓** | 15–60% |
| Life expectancy at birth | 21.5 ✓ | 21.7 ✓ | 13–33 |
| Population change a year | +0.1% ✓ | −0.1% ✓ | about stable |
| Worlds that died out | 2 | 1 | |
| Babies dying in their first year | 4.4% ✗ | 5.3% ✗ | 11–21% |
| Checks passing | 5 of 7 | 5 of 7 | |

Causes of death after: old age 24%, fire 19%, hunger 17%, illness 16%, predators 15%, wounds 6%.

**Result.** (1) **Held**: 61.8% — but that is now just above the band (foragers about 60%, chimpanzees about 35%). (2) **Held, and more**: hunger fell from 30% to 17% of deaths, no longer the leading cause. (3) **Held**. Illness now passes its band; survival to 15 fails it from above.

**Interpretation.** Learning by watching what worked, up close, does what it does in real apes: the young learn from their mothers what is worth eating. Too many children now reach 15 because babies and toddlers still die too rarely (infanticide and other real causes missing; backlog R10). **Fire deaths at 19% are too high** for apes and need tracing (wildfires catching whole bands; no moving away from fire, backlog A3).

**Strength.** Moderate (24 worlds; prediction written first; the probe shows the mechanism). **Lesson:** "copy what worked" needs "where it worked": without the second, the first taught the wrong lesson.

### 53. A bigger band, again — now with learning by watching: firsts come sooner, but not more kinds, and more go hungry — Nov 2026

**Version.** Unreleased · commit `f4df84f` (everything through entry 52); tools `tools/analysis/community-compare.js`, `first-times.js`. Run by Claude.

**Data.** [25 founders](../data/findings/53-band-size-again/base25.csv) · [40](../data/findings/53-band-size-again/plus15.csv) · [80](../data/findings/53-band-size-again/plus55.csv) · [the comparison](../data/findings/53-band-size-again/fair-comparison.txt) · [first times](../data/findings/53-band-size-again/first-times.txt) · [the prediction, written before](../data/findings/53-band-size-again/prediction-written-before.txt).

**Question (the owner's hypothesis: a bigger band is the key).** Entry 36 found that, while knowledge could not pass by watching, a bigger founding band did not discover more. Now the young learn by watching what worked (entry 52) and brains' expectations are fixed (entry 50). Repeat the identical design: the same 24 worlds × 60 days with 25 founders and with 15 extra founders joining (40); 12 worlds with 55 extra (80).

**Prediction, written first.** (1) More different hard discoveries per world with 40 founders than 25 (primary), the range clear of zero; (2) firsts sooner with more founders in most worlds; (3) survival per founder about the same.

| 25 vs 40 founders, 24 identical worlds | 25 | 40 | Difference (95% range) |
|---|---|---|---|
| **Different hard discoveries per world (of 11)** | 5.46 | 5.79 | +0.33 (−0.55, +1.22) |
| Alive per founder | 0.97 | 0.84 | −0.13 (−0.32, +0.05) |
| Hunger deaths per world | 4.1 | 10.2 | +6.1 (+4.3, +7.9) |
| Fire deaths per world | 5.7 | 8.7 | +3.0 (+0.3, +5.7) |

At 80 founders (12 worlds, against 25): discoveries 5.92 against 6.08; alive per founder 0.82 against 1.15 (−0.33, range −0.64 to −0.02); hunger deaths 24.5 against 3.0 per world. **First times**, 25 against 80: a fire started with a burning stick earlier in 8 of 11 worlds, picking up a burning stick in 10 of 12, eating wildfire-cooked food in 9 of 12, making fire by rubbing in 9 of 12 — about two weeks sooner on average; 25 against 40: weaker (bringing down an animal earlier in 7 of 8, others about even).

**Result.** (1) **Failed again**: no more kinds of discovery with a bigger band. (2) **Held at 80 founders**: firsts come about two weeks sooner in most worlds. (3) **Failed**: survival per founder is *lower* in bigger bands (beyond noise at 80) — more mouths, many more hunger and fire deaths.

**Interpretation.** Firsts coming sooner with more hominins is what sheer numbers do — more individuals trying things — not evidence that knowledge spreads. Bigger bands go hungrier, as larger primate groups face more feeding competition. **In Genesis the hypothesis is still not supported.** But the test is not yet complete: theories of cultural accumulation (e.g. Henrich; Kline & Boyd) say size helps only when discoveries spread and are kept, and that has not been measured (backlog: measure whether discoveries are repeated and spread). **What did change since entry 36:** bands of every size discover more — with 25 founders, 4.13 → 5.46 kinds per world, and a fire started with a burning stick in 11 → 22 of 24 worlds — from the brains work of entries 50–52, not from size.

**Strength.** Moderate (24 + 12 identical worlds; prediction written first). **Lesson:** "sooner" and "more" are different claims; a bigger band gets the first sooner by numbers alone.

### 54. Do discoveries spread by watching? Not measurably — they are reinvented alone — Nov 2026

> **Correction (13 Nov, entry 57):** the tool used here read a list of creatures saved at the start of the run; Genesis makes a new list as creatures are born and die, so **only the founders were measured**, never hominins born later. Every number here is about founders only — who had no one to learn from. Re-measured with everyone in entry 57.

> **Revised 13 Nov after the second independent review** (`docs/reviews/2026-11-13-fable-review-2.md`): this measure was never validated on a case where spreading is known to happen, and has confounds (opportunity, survivorship, founders, pooled rates); and fire-making skill *does* spread by a built-in rule that it did not measure (`watchFire`, backlog B20). Read the result as "no spreading detected for nut cracking and stick digging with an unvalidated measure", not as "skills do not spread". The band-size conclusion drawn here is withdrawn pending the tests in backlog B20–B22.

**Version.** Unreleased · commit `f3e547c`; tool `tools/analysis/spread.js`. Run by Claude.

**Data.** New copying: [worlds 1–4](../data/findings/54-do-discoveries-spread/new-a.json), [5–8](../data/findings/54-do-discoveries-spread/new-b.json) · old copying (`--copy-moves`): [1–4](../data/findings/54-do-discoveries-spread/old-a.json), [5–8](../data/findings/54-do-discoveries-spread/old-b.json) · [the prediction, written before](../data/findings/54-do-discoveries-spread/prediction-written-before.txt).

**Question.** Entry 53: a bigger band does not make more kinds of discovery. Theories of cultural accumulation (Henrich; Kline & Boyd) say size helps only when discoveries spread and are kept. Do they spread in Genesis?

**Test.** 8 worlds × 60 days, with the new copying (entry 52) and the old. For each behaviour seen in one hominin — cracking nuts with a stone, digging roots with a stick, eating fire-cooked food, picking up a burning stick, eating meat, cutting meat with a sharp stone — who did it first and when, and who was awake in the same square when someone did it. Then the rate of doing it for the first time among those who had watched it, against those who never had (a simple form of the logic of network-based diffusion analysis, Franz & Nunn 2009). Sharing a place raises it under either copying rule; a larger effect with the new copying would show that watching passes the behaviour on. Prediction written first: (1) watching raises first-time rates for nuts and stick digging; (2) more so with the new copying.

| | New copying | Old copying |
|---|---|---|
| Cracking nuts: hominins who did it | 165 | 175 |
| …first time after watching / never having watched | 70 / 87 | 87 / 80 |
| …rate ratio, watched ÷ not (worlds 1–4 / 5–8) | 0.74 / 1.50 | 0.75 / 1.46 |
| Digging with a stick: hominins who did it | 169 | 165 |
| …first time after watching / never | 48 / 113 | 47 / 110 |
| …rate ratio (1–4 / 5–8) | 0.83 / 1.74 | 0.99 / 1.74 |
| Cooked food, burning stick, meat, cutting meat | 0–5 first times after watching each: too few to tell | |

**Result. Both predictions failed.** Nut cracking and stick digging are done by most hominins, about half of them without ever having watched anyone do it; watching makes no consistent difference (the ratio falls either side of 1 between halves of the worlds), and it is the same with the old and the new copying. The rare behaviours are too rare to judge.

**Interpretation.** In Genesis, easy skills are reinvented by nearly everyone on their own, and nothing is passed on by watching in a measurable way. Copying one action ("strike", "eat") does not teach a sequence ("pick up a stone, then strike the nut"); real young chimpanzees take years to learn nut cracking by watching. **This completes the band-size question (entries 36, 53, 54): in Genesis a bigger band is not the key** — it gets some firsts sooner by numbers alone, discovers no more kinds of things, goes hungrier, and lacks the mechanism the hypothesis needs (skills spreading and being kept). The hypothesis is not refuted for real hominins; it is unsupported in a world where skills do not spread.

**Strength.** Moderate (8 worlds, two copying rules; hundreds of first times for the common skills). **Lesson:** to test whether size helps culture, first check that there is culture to help.

### 55. Watching a whole sequence: a hint that skills pass on — with an unvalidated measure — Nov 2026

> **Correction (13 Nov, entry 57):** the tool used here read a list of creatures saved at the start of the run; Genesis makes a new list as creatures are born and die, so **only the founders were measured**, never hominins born later. Founders only; re-measured in entry 57.

**Version.** Unreleased · the change: commit `c0254bc` (`--no-copy-sequence` restores none — checked: identical worlds); tool `tools/analysis/spread.js`. Run by Claude. First step of "making skills spread" (the owner moved it ahead of the scale step).

**Data.** With sequence copying: [worlds 1–4](../data/findings/55-copying-sequences/seq-a.json), [5–8](../data/findings/55-copying-sequences/seq-b.json) · without: [1–4](../data/findings/55-copying-sequences/off-a.json), [5–8](../data/findings/55-copying-sequences/off-b.json) · [the prediction, written before](../data/findings/55-copying-sequences/prediction-written-before.txt).

**Question.** Entry 54 found no sign that nut cracking or stick digging pass on by watching. Copying single actions cannot pass on a sequence (pick up a stone, go to the nuts, strike). Real young chimpanzees learn nut cracking at about 3–5 years by long, repeated watching of skilled adults, with almost no teaching (Bossou, 16-year record; Matsuzawa's master–apprenticeship; Taï mothers leave nuts and stones and share nuts).

**Added.** When an elder's recent path (the last 16 steps, kept for backward replay, entry 51) ends in a good surprise, a weaned youngster watching in the same square learns from the whole path, each earlier step a little less (×0.85 a step), scaled by how good the result was.

**Test.** 8 worlds × 60 days, with and without, entry 54's tool. Prediction written first: (1) the rate ratio (first time after watching ÷ never watched) clearly above 1 for nuts and stick digging in both halves of the worlds; (2) higher than without, in both halves; (3) more first times after watching.

| | Without | With sequence copying |
|---|---|---|
| Nut cracking: ratio (worlds 1–4 / 5–8) | 0.74 / 1.50 | **0.96 / 1.77** |
| Stick digging: ratio | 0.83 / 1.74 | **1.33 / 2.62** |
| First times right after watching (nuts / digging) | 70 / 48 | **86 / 58** |

**Result.** (2) and (3) **held**: higher for both skills in both halves, and more first times after watching. (1) **almost**: nuts in worlds 1–4 is 0.96.

**Caution.** The measure has not been validated (second review, finding 2; backlog B21): no positive or negative control, and several confounds. Because both versions ran on identical worlds with the same tool, its biases apply to both, so the consistent *difference* is more trustworthy than either number — **a hint that watching whole sequences passes skills on, not proof.** Next: validate the tool (a planted behaviour learnable only by watching; a no-copying switch).

**Strength.** Weak–moderate (8 worlds, paired; consistent direction; unvalidated instrument). **Lesson:** a difference between two arms measured the same way can be read before the instrument is trusted for absolute claims — but only as a hint.

### 56. Checking the spreading tool on a skill whose spread is known: unbiased, but noisy — Nov 2026

> **Correction (13 Nov, entry 57):** the tool used here read a list of creatures saved at the start of the run; Genesis makes a new list as creatures are born and die, so **only the founders were measured**, never hominins born later. The controls ran on founders only; repeated with everyone in entry 57.

**Version.** Unreleased · `tools/analysis/spread.js` with a planted behaviour (`--plant=S:B`). Run by Claude. Second review, finding 2.

**Data.** First run (a bug in the control: starting holders counted as new learners): [runs56](../data/findings/56-checking-the-spreading-tool/runs56/) · after the fix, too few cases in the negative control: [runs56b](../data/findings/56-checking-the-spreading-tool/runs56b/) · final: [runs56c](../data/findings/56-checking-the-spreading-tool/runs56c/) · [the prediction, written before](../data/findings/56-checking-the-spreading-tool/prediction-written-before.txt).

**Question.** Entries 54–55 read "spreading" from a measure never tested on a case where the answer is known (second review, finding 2). Is it sound?

**Test.** A pretend behaviour moves with the real hominins in 8 worlds × 60 days (its own random numbers; the world is untouched). Each hominin without it picks it up alone with chance 0.0003 a step; in the **positive control** an extra 0.002 a step once it has watched a holder do it (so watching raises the chance about 7.7 times); in the **negative control** watching does nothing. About 15% start with it. Prediction written first: positive clearly above 1 in most worlds; negative about 1, above 1 in about half the worlds.

| | True answer | Ratio (worlds 1–4 / 5–8) | Above 1, per world |
|---|---|---|---|
| Positive control | about 7.7 | **10.1 / 5.2** | 5 of 5 worlds with a ratio |
| Negative control | 1 | **1.9 / 0.9** | 3 of 6 |

**Result.** Both held. Two earlier attempts failed for reasons in the control itself, logged: starting holders were counted as new learners (both ratios pulled down), then the chance of picking it up alone was too small to give enough cases.

**Interpretation.** The tool is **not biased**: it finds spreading when there is spreading and does not invent it when there is none. But it is **noisy**: with no spreading at all a single half of the worlds can read anywhere from about 0.4 to 2 per world, because most hominins watch someone early and few "never watched" cases remain. So the nut and stick-digging ratios of entries 54–55 (0.7–2.6) lie mostly inside that noise: entry 54's "no spreading" and entry 55's "hint of spreading" are both too weak to stand alone. Clear answers need many more worlds, or only hominins born in the run (`--born-only`), as the review suggested.

**Strength.** Moderate (8 worlds per control; the known answers recovered). **Lesson:** test the instrument before reading the measurement — and log the failed attempts at testing it too.

### 57. Youngsters born in the run: those who watched start cracking nuts more often — but being near nuts may explain it — Nov 2026

> **Corrected by entry 60:** copying by result against by surprise made no difference to hunger on the same worlds; the 17% → 23% here was run-to-run difference.

**Version.** Unreleased · commit `88e282f`: copying by what visibly came of the elder's choice (`--copy-by-surprise`: the old rule; checked: identical worlds); three tools fixed (below). Run by Claude. Second review, findings 2–3.

**Data.** Tool check with everyone: [positive](../data/findings/57-youngsters-watching/pos-a.json), [negative](../data/findings/57-youngsters-watching/neg-a.json) (`-b` files alongside) · comparison: [new copying, worlds 1–6](../data/findings/57-youngsters-watching/new-a.json), [7–12](../data/findings/57-youngsters-watching/new-b.json); [old copying](../data/findings/57-youngsters-watching/old-a.json) · [reality checks with copying by visible result](../data/findings/57-youngsters-watching/reality-checks-copy-by-result.txt) · predictions: [spreading](../data/findings/57-youngsters-watching/prediction-written-before.txt), [copying](../data/findings/57-youngsters-watching/prediction-copy-by-result-written-before.txt).

**A bug found first.** Three analysis tools (`spread.js`, `young-eat.js`, `eat-outcomes.js`) read a list of creatures saved at the start of a run; Genesis makes a new list as creatures are born and die, so **only the founders were ever measured**. Entries 48, 52 and 54–56 are marked. Fixed: the tools read the current list each step. The other tools, and every reality check and band-size comparison, read it correctly.

**Changed.** The young copy an elder's choice by what visibly came of it (a reward of about 0.3, a good meal, counts fully; the 0.3 is an assumption), not by the elder's hidden surprise — a skilled elder is rarely surprised (second review, finding 3).

**Test 1 — the tool, with everyone born in the run** (8 worlds × 100 days, `--born-only`, planted behaviour). Positive control (spreads only by watching, true ratio about 8): **11.3 and 13.4**. Negative control (watching does nothing, true ratio 1): **0.85 and 0.75**, above 1 in 2 of 8 worlds. The tool finds real spreading clearly and reads a little low (about 0.8) when there is none.

**Test 2 — do the young who watched start sooner?** 12 worlds × 100 days, only hominins born in the run at risk; new against old copying. Prediction written first: (1) ratio above 1 in most worlds for nuts and stick digging with the new copying; (2) more so than with the old.

| Born in the run | Nuts: ratio (worlds 1–6 / 7–12) | above 1 | Stick digging: ratio | above 1 |
|---|---|---|---|---|
| New copying (by visible result) | **1.34 / 1.56** | **9 of 12** | 1.16 / 0.69 | 6 of 11 |
| Old copying (by surprise) | 1.50 / 1.07 | 8 of 12 | 1.34 / 1.03 | 9 of 12 |
| No spreading (tool check) | 0.85 / 0.75 | 2 of 8 | | |

Rarer behaviours (picking up a burning stick, eating meat) gave large ratios (2.4–17) under both rules, from few first times.

**Result.** (1) **Held for nuts** (9 of 12 worlds; ratios 1.3–1.6 against about 0.8 with no spreading); **not for stick digging**. (2) **Not supported**: the old copying gives about the same.

**The catch (second review, finding 2.4).** Watching someone crack nuts means being in a square with nuts and stones — the means. The planted control needed no place, so it cannot separate *watching* from *being near nuts*; the same holds for burning sticks (near fires) and meat (near carcasses). Next: count risk time only when a youngster has the means at hand (standing on nuts with a stone), and see whether watching still matters.

**Reality checks with copying by visible result** (24 worlds; tool unaffected by the bug): born who reach 15 back inside the band (58.7%); against the sourced ranges 3 of 7 pass; but hunger 17% → 23% of deaths and 3 worlds died out (1 before). That run also added sequence copying (entry 55) against entry 52's baseline: **unpaired** — which change did what is not yet known (backlog B23).

**Strength.** Weak–moderate: the first sign that young hominins who watched start a skill more often, in most of 12 worlds, with a checked tool — but not yet separated from where they were. **Lesson:** a tool can be valid and still answer a different question than the one asked.

### 58. Watching, or being near nuts? With the means counted, watching does not help — easy skills are found alone — Nov 2026

**Version.** Unreleased · commit `35878ea`: a no-copying test switch (`--no-copying`) and `spread.js --means` (count a hominin at risk only when it has the means at hand: nuts and a stone, roots and a stick). Run by Claude. Second review, finding 2.4.

**Data.** [Copying on, worlds 1–6](../data/findings/58-watching-or-being-near/on-a.json), [7–12](../data/findings/58-watching-or-being-near/on-b.json) · [copying off, 1–6](../data/findings/58-watching-or-being-near/off-a.json), [7–12](../data/findings/58-watching-or-being-near/off-b.json) · [the prediction, written before](../data/findings/58-watching-or-being-near/prediction-written-before.txt).

**Question.** Entry 57: young hominins who had watched someone crack nuts started more often. But watching means being where nuts and stones are. Does watching itself matter?

**Test.** 12 worlds × 100 days, only hominins born in the run, at risk only when they have the means at hand; nobody copying anyone (`--no-copying`, where watching cannot teach) against copying as usual. Prediction written first: (1) with copying on, the watched/never ratio for nuts is higher than with copying off, in most worlds; (2) with copying off, about 0.8–1.

| Born in the run, means at hand | Nuts: ratio (1–6 / 7–12) | above 1 | Stick digging: ratio | above 1 |
|---|---|---|---|---|
| Copying on | 0.76 / 0.30 | 6 of 11 | 0.89 / 0.75 | 6 of 11 |
| Copying off | 0.68 / 1.05 | 6 of 12 | 1.45 / 1.15 | 7 of 11 |

**Result. (1) failed**: with the means counted, watchers do not start nut cracking or stick digging more often when copying is on than when nobody copies. (2) about held. The same worlds with copying on gave a nut ratio of 1.34 in entry 57 and 0.76 here: only the counting changed. **Entry 57's sign came from being near nuts, not from watching.**

**Interpretation.** Nut cracking and stick digging are so easy in Genesis — one strike with a stone on a nut always cracks it — that nearly every youngster with the means finds them alone; watching adds nothing. That is what the second review predicted (easy skills need no culture). The way to a tradition is to make a skill realistically hard (backlog A26: young chimpanzees need 3–7 years; practice improves the hands), then test again the same way.

**Strength.** Moderate (12 worlds per arm; a checked tool; a true negative control; prediction written first). **Lesson:** a measured effect can vanish when the obvious alternative is counted; count it before believing the effect.

### 59. The built-in fire rule, switched off: bigger bands lose their head start — but still make fire in more worlds — Nov 2026

**Version.** Unreleased · commit `9224774`: `--no-fire-watching` turns off the rule that raises every nearby hominin's fire skill when someone works at fire (second review, finding 1); every fire-skill number registered in `docs/ASSUMPTIONS.md`. Run by Claude.

**Data.** Fire watching on: [25 founders](../data/findings/59-fire-watching-rule/on/base25.csv), [80](../data/findings/59-fire-watching-rule/on/plus55.csv) · off: [25](../data/findings/59-fire-watching-rule/off/base25.csv), [80](../data/findings/59-fire-watching-rule/off/plus55.csv) · [the prediction, written before](../data/findings/59-fire-watching-rule/prediction-written-before.txt).

**Question.** Entry 53: fire-related firsts came about two weeks sooner with 80 founders than with 25, read as "numbers alone". The second review found a built-in rule outside the brains that spreads fire skill to everyone within about 6 km of someone working at fire. Is the rule the reason?

**Test.** 12 identical worlds × 60 days, 25 and 80 founders, the rule on and off. Prediction written first: (1) with it on, firsts sooner with 80 in most worlds; (2) with it off, still sooner, but less so for making fire by rubbing; picking up a burning stick and eating cooked food about as before; (3) fewer worlds make fire by rubbing with it off.

| 25 vs 80 founders | Fire watching on | Fire watching off |
|---|---|---|
| Picking up a burning stick: sooner with 80 | 8 of 11 worlds, about 11 days | 5 of 9, about 4 days |
| Eating cooked food | 5 of 9, about 7 days | 2 of 7; **later** on average (+4 days) |
| Making fire by rubbing | 6 of 9, about 9 days | 2 of 4, about 7 days |
| Starting a fire with a burning stick | 7 of 11, about 5 days | 3 of 7; **later** on average (+11 days) |
| Worlds that made fire by rubbing (25 / 80 founders) | 10 / 11 | **5 / 10** |

(Counts of worlds where only one size had the first are left out; "of n" counts worlds where both had it and the day differed.)

**Result.** (1) **Held.** (2) **Partly wrong**: with the rule off the head start vanished for all four, not only for fire by rubbing — made fires supply burning sticks and cooked food too. (3) **Held at 25 founders** (10 → 5 worlds), barely at 80 (11 → 10).

**Interpretation.** The "sooner with a bigger band" of entry 53 came mostly from the built-in fire rule, not from numbers alone; the second review was right, and the write-up is corrected. One effect of size survives without the rule: **bigger bands make fire by rubbing in more worlds** (10 against 5 of 12), because more hominins practise and one of them succeeds — about *whether*, not *when*. The rule also makes fire-making far easier than the real record suggests (no accepted fire-making for over two million years after 2.5 million years ago). Whether to keep it on by default is the owner's decision.

**Strength.** Weak–moderate (12 worlds per arm; counts of days are noisy). **Lesson:** look for the rule before crediting the crowd.

---

### 60. Which learning change cut hunger? The same 24 worlds, four ways — Nov 2026

**Version.** Unreleased · commit `a7c48ea` (no code change; switches only). Run by Claude.

**Data.** [The 96 worlds, the prediction written before, the paired results and the script](../data/findings/60-paired-attribution/).

**Question.** Entries 50, 52 and 57 credited hunger's fall (39% → 30% → 17% → 23% of deaths) to single changes, but each
number came from different runs, not paired (second review, finding 5). On the same worlds, how much does each part carry?

**Test.** 24 identical worlds × 100 days (reality-check tool), four arms on one commit: **A** every learning change of entries 50–57
off; **B** only the expectations fix (entry 50); **C** everything (the default: plus backward replay, copying what worked up close by
its visible result, copying sequences); **D** everything, but copying by surprise. Main outcome, named first: hunger's share of
deaths. Prediction: A → B a large fall; B → C a further fall; C ≈ D.

| Hunger's share of deaths (pooled) | A all off | B expectations fix | C everything | D copy by surprise |
|---|---|---|---|---|
| Share | 38.8% | 29.8% | 22.9% | 20.9% |
| Alive at the end (mean of 25 founders) | 7.7 | 23.5 | 24.4 | 25.9 |
| Born per world | 18.8 | 40.1 | 35.5 | 39.0 |

| Paired, per world | Hunger's share | 95% range | Worlds down / up |
|---|---|---|---|
| A → B | −8.8 points | −16.5, −1.2 | 16 / 8 |
| B → C | −7.2 points | −13.9, 0.0 | 19 / 5 |
| A → C | −16.0 points | −22.6, −8.7 | 19 / 5 |
| C → D | −1.3 points | −6.8, +3.6 | 12 / 11 |

**Result.** All three predictions **held**. The expectations fix alone carries about half the fall in hunger and nearly all of the
gain in band size (alive at the end 7.7 → 23.5; births 19 → 40 per world, up in 22 of 24). The rest together carries the other half
(hunger deaths per world −4.1, 95% range −7.2 to −1.0), with no clear change in band size. Copying by visible result against by
surprise makes no difference to hunger.

**Interpretation.** Entry 52's "hunger 30% → 17% from learning by watching what worked" was too big and too specific: paired, the
later changes cut hunger by about 7 points, and they are a bundle (backward replay, copying moves, copying sequences) not split
further here. Entry 58 found no skill spreading by watching, so this cut is about everyday choices (where to go, when to eat), not
skills passing on. Entry 57's "hunger 17% → 23%" was not this change (C → D: no difference); it was run-to-run difference. The
write-up's "39% to 17%" is replaced by the paired figures.

**Strength.** Moderate (24 paired worlds; the B → C range touches zero for the share but not for the count). **Lesson:** a chain of
unpaired before-and-afters adds up to a story; one paired run of all the arms tells which link holds.

---

### 61. The built-in fire rule goes off by default — Nov 2026

**Version.** Released · this commit. Run by Claude.

**Change.** The owner's decision after entry 59: the rule that raised the fire skill of everyone near someone working at fire is
**off by default**. Fire skill now grows only from each hominin's own practice ("nothing scripted": social learning must come
through the brains). `--fire-watching` restores the rule; `--no-fire-watching` is still accepted.

**Check.** Two worlds × 20 days: the new code with `--fire-watching` reproduces the old default worlds exactly, and the new default
reproduces the old `--no-fire-watching` worlds exactly (data rows identical). All 81 tests pass.

**What it changes.** From entry 59, with the rule off: fewer worlds make fire by rubbing at 25 founders (about 5 of 12 instead of 10),
and bigger bands lose their head start on fire firsts. Results before this entry were made with the rule on; entries that mention fire
should be read with that in mind.

**Lesson.** A rule that helps the outcome is easy to keep; the test is whether it is in the evidence or in the brains.

---

### 62. Hard nut cracking: watching made no difference — stopped early, superseded by the realism audit — Nov 2026

**Version.** Unreleased · commit `1d41850` (hard nut cracking, backlog A26). Run by Claude.

**Data.** [24 worlds with copying on, 12 with nothing copied from nut strikes, the prediction written before](../data/findings/62-hard-nuts-stopped/).

**Question.** With nut cracking made realistically hard (a beginner opens a nut with 2% of strikes, rising with its own strikes
toward 83%; none before 3.5 years), does watching skilled elders make youngsters practise more?

**Test.** Planned: 24 worlds × 150 days, seven arms (prediction written first). **Stopped** after the first arm and half the second,
when the owner set a new aim (faithful hominins first) and the realism audit found that nut cracking has no direct evidence at
2.5 Ma (earliest nuts with pitted stones about 780,000 years ago) and the worlds use ice-age animals by default.

**Result (partial).** Nut cracking was now hard: of 858 youngsters born in the run who lived to 10, **41 (5%)** were skilled by then;
someone became skilled in 21 of 24 worlds (first skilled hominin after 10–145 days). Main outcome, in the 10 worlds with data in both
arms: copying on higher in **5**, lower in **5**, median ratio **1.03**. As predicted (prediction 1: no effect), but on too few worlds
to be firm. The ends of the ranges were not run.

**Interpretation.** No sign that watching makes youngsters practise a hard skill. But the skill, the age limit (a hard-coded outcome)
and the animals are not faithful to 2.5 Ma hominins, so this is a test of a chimpanzee-borrowed skill in an ice-age world, and it is
not carried further. Physics, growing bodies and Oldowan toolmaking come first (`docs/HOMININ-PLAN.md`, "THE AIM").

**Strength.** Weak (partial, 10 paired worlds). **Lesson:** check that the skill and the world are real for the period before testing
whether the skill spreads.

---

### 63. The ledger: hunters are fed — mostly by buffalo — but far from prey, and carcasses rarely reach the hominins — Nov 2026

**Version.** Unreleased · commit after `8ba094c` (no change to the world; the tool `tools/analysis/ledger.js`). Run by Claude.

**Data.** [4 worlds, the world's own death tally, and the prediction written before](../data/findings/63-ledger/).

**Question.** Step 0 of the scale step (Fable's review of `docs/design/scale-step.md`): before building anything, what does today's
default world offer its hunters and hominins?

**Test.** 4 worlds × 30 days, today's defaults (African animals, hunters placed near prey, newcomers on), sampled every 3 hours. The
tool changes nothing: people alive at the end were identical with and without it (29, 13, 38, 14).

> **Corrected the same day.** The first version reported that hunters killed **no prey at all**. That was a bug in the tool: the world
> removes the dead at the end of each step, so the tool never saw a killed animal. The world's own tally showed 34 and 29 plant-eaters
> killed by hunters in worlds 1 and 2. The tool now follows each animal from one step to the next; the numbers below are corrected.

| Per world | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Prey killed by hunters, kg per hunter per day (need: leopard 3.5–4.9, hyena 3.8–4.0) | 7.2 | 7.3 | 5.5 | 0.65 |
| Hunter samples more than 5 squares (15 km) from any prey | 70% | 63% | 76% | 65% |
| Mean distance from a hunter to the nearest prey, squares | 11.8 | 9.1 | 8.7 | 9.0 |
| Hominin samples with no carcass within 3 squares | 90% | 94% | 100% | 92% |

**Result.** Prediction 1 (hunters kill far below need) **failed**: in 3 of 4 worlds they kill more than a real leopard or hyena needs,
counting a simulated day as a real day. Much of that weight is **buffalo** — 7 and 8 adult buffalo (about 600 kg each) killed by
leopards, hyenas or sabre-tooths in 30 days in worlds 1 and 2, which a leopard would not do. Predictions 2 and 3 **held**: hunters are
mostly far from prey, and hominins rarely have a carcass in reach.

**Interpretation.** Hunters are not starving by weight, but they kill animals too big for them, and the kills happen away from the
hominins, so scavenging hardly exists for them. Two numbers matter next: which prey each hunter can take (by size, as for hominins),
and the clock — a year is 3 simulated days, so whether a hunter's need is per simulated day or per real day changes everything
(Fable's finding 3). These are the measured starting point, reported, never targets.

**Strength.** Moderate (4 worlds); the buffalo kills from the world's own tally (2 worlds). **Lesson:** check a new tool against the
world's own counts before believing it.
---

### 64. Hunters take only prey their size: no more adult buffalo — and now they are underfed — Nov 2026

**Version.** Unreleased · this commit: each African hunter kind brings down plant-eaters only up to the top of its preferred prey size
(leopard 40 kg, spotted hyena 182 kg, sabre-tooth 350 kg), and cannot wound prey too big for it; `--hunters-any-prey` restores the old
rule (checked: identical worlds); `--prey-max-x` tests the limits at double. Run by Claude.

**Data.** [The ledger on 4 worlds, the world's death tally, the prediction written before](../data/findings/64-hunter-prey-size/).

**Evidence.** Leopards prefer prey of 10–40 kg (Hayward et al. 2006); spotted hyenas 56–182 kg and avoid buffalo, giraffe and zebra
(Hayward 2006); *Megantereon* about 100–120 kg, an ambush hunter of larger hoofed animals (350 kg an assumption). Entry 63 found
hunters killing 7–8 adult buffalo (about 600 kg) a world in 30 days. A first try stopped kills of big prey but not the wounds of failed
attacks, which still wore adult buffalo down (6 of 8 buffalo killed were adults); bites on prey too big now do nothing.

| Per world (30 days) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Prey killed, kg per hunter per day (before → after; need 3.5–4.9) | 7.2 → 1.5 | 7.3 → 1.2 | 5.5 → 0.3 | 0.65 → 2.5 |
| Hunter samples more than 15 km from prey | 70% → 31% | 63% → 24% | 76% → 67% | 65% → 38% |
| Hominin samples with no carcass within 3 squares | 90% → 80% | 94% → 99% | 100% → 100% | 92% → 90% |
| Hominins killed by hunters (world's tally) | 2 → 0 | 13 → 17 | | |

**Result.** (1) No adult buffalo killed — **held** (only calves of 61 and 114 kg). (2) Hunters below their need in most worlds —
**held**, in all four. (3) More hungry hunters and more hominins killed — **not held**: hunter hunger deaths about the same, hominin
deaths by hunters down in one world and up in the other. Not predicted: hunters are much less often far from prey.

**Interpretation.** Hunters now take what real hunters of their size take, and are underfed — as the scale step expected: their real
prey base (thousands of animals of their size) is not in the world yet. That, and carcasses, are the next steps; their needs are a
reported number, not a target.

**Strength.** Weak–moderate (4 worlds, 30 days). **Lesson:** a limit on success is not enough when failure also does harm.

---

### 65. Hunters may try prey too big for them — and big prey fights back — Nov 2026

**Version.** Unreleased · this commit. The owner (14 Nov): hunters, like hominins, may try bigger prey "because of courage or foolery",
and natural selection should decide. The hard limit of entry 64 became a price: above its preferred size a hunter's success falls
steeply (× (preferred ÷ prey)², a pack widening what it can take), prey heavier than the hunter fights back (0.3 chance of harm, 10 ×
the weight ratio, up to 3; it can kill), and — added after the first run — a failed bite harms big prey only by the hunter's weight
against the prey's. Its brain learns from the pain; boldness is left to selection. Switches: `--hard-prey-limit` (entry 64, checked:
identical worlds), `--hunters-any-prey` (the old rule, checked: identical worlds), `--big-prey-falloff` (2; test 1 and 3).

**Data.** [The ledger on 4 worlds, the world's tallies, the buffalo killed and by whom, the prediction](../data/findings/65-big-prey-at-a-price/).

| Per world (30 days) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Prey killed, kg per hunter per day (hard limit → may try; need 3.5–4.9) | 1.5 → 8.9 | 1.2 → 3.0 | 0.3 → 3.1 | 2.5 → 4.0 |
| Buffalo killed (world's tally, first run) | 2 → 7 | 1 → 2 | | |

**Result.** (1) A few big kills, far fewer than before entry 64 — **not held**: world 1 had 7 buffalo killed, 5 of them adults. The
cause was found: every failed bite took 25 health whether the prey was a hare or a 600 kg buffalo, so failed attacks wore buffalo
down. With bite harm scaled by weight, world 1 still lost 3 adult buffalo — to **hyena packs (2) and sabre-tooths (3 kills in all,
1 of them an adult)**; leopards none. (2) Hunters hurt or killed by their prey — **not seen** as deaths in worlds 1–2 (injuries were
not counted). (3) Intake a little above the hard limit — **held in direction, larger than expected** (3.0–8.9 kg a day).

**Interpretation.** Leopards now leave buffalo alone, as real leopards do. Hyena packs take one occasionally — spotted hyena clans do,
rarely (Hayward 2006: buffalo avoided) — but how often depends on the pack rule (each helper adds 0.6 of the hunter's strength, an older
assumption). The sabre-tooth's kills rest on its assumed preferred size (350 kg, unsourced), the number to test at both ends rather
than lower by hand. Hunters are now near or above their needs in 3 of 4 worlds, before the prey map.

**Strength.** Weak (4 worlds, 30 days; buffalo by killer in one world). **Lesson:** where failure also does harm, the harm must
follow the same physics as success.

### 66. The prey map: real numbers of antelope and buffalo, shown as one herd per square — Nov 2026

**Version.** Unreleased · this commit. Scale step 1 (`docs/design/scale-step.md`), off by default (`--prey-map`; checked: with it off,
worlds identical to the released ones). The land carries its antelope and buffalo as kg per square, in proportion to how well the
square's plants grow, where each class can live; the mean is 5,000 kg/km² (an assumption, 1,000–10,000 across African parks; Fritz &
Duncan 1994 give about 5,200 at 600 mm on rich soil), half of it buffalo (no source found). Around each hominin and hunter, a square's
animals of one class are shown as **one herd** — the owner's choice (14 Nov) over real-sized herds of which only an invented share
would be shown: at real density a 3 km square holds about 16 impala herds, too many to give each a brain. Herds are therefore bigger
than real ones (about 450 antelope or 37 buffalo at the mean; real impala groups average 28–58, Mramba 2022; buffalo about 350,
Sinclair 1977). A herd behaves as one animal; a death takes one animal and leaves one carcass; herds no one is near are set aside,
brain and all; the map regrows on the life clock (0.3 a life-year, an assumption). Weight balance checked to 0.0000% over 10 days; a
step is no slower.

**Data.** [The ledger on 4 worlds, the prediction (written after one 10-day smoke run, so the intake prediction is not blind), the
deaths with the map on and off in worlds 1 and 3](../data/findings/66-prey-map/). `node tools/analysis/ledger.js 1,2,3,4 30 OUT --prey-map`.

| Per world (30 days; entry 65 → prey map) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Prey killed, kg per hunter per day (need 3.5–4.9) | 8.9 → 60 | 3.0 → 92 | 3.1 → 38 | 4.0 → 95 |
| Hominin samples with no carcass in sight | 93% → 19% | 92% → 23% | 100% → 80% | 97% → 39% |
| Hunter samples more than 5 squares from prey | 64% → 86% | 82% → 77% | 67% → 68% | 66% → 85% |
| Animals in sight of a hominin (mean) | — → 395 | — → 197 | — → 80 | — → 609 |
| Hominins alive at day 30 | 35 → 23 | 10 → 26 | 39 → 20 | 30 → 21 |

Deaths, map off → on: world 1 hominins by wounds 0 → 6, by hunters 2 → 0, by hunger 4 → 3; world 3 hominins by hunters 0 → 11.
Antelope killed by hunters 7 → 185 (world 1) and 3 → 158 (world 3); hunters killed by their prey 0 → 7 and 3 → 8.

**Result.** (1) Intake far above need — **held**: 38–95 kg a day against a real leopard's about 4 (Odden & Wegge 2009: one kill every
5.6 days, 10.6 for hoofed prey). (2) Hunters near prey by construction — **not held**: most hunter samples were still more than 5
squares from a live herd. A likely cause, not yet checked: hunters kill out the squares around them and the map regrows slowly, so a
square falls below one animal and shows no herd; or hunters walk where the class cannot live. (3) Carcasses in reach — **held** in
3 of 4 worlds. Fewer hominins alive in 3 of 4 worlds, by different causes (wounds in world 1, hunters in world 3).

**Interpretation.** With real prey numbers, a gap the scarce world hid shows at once: **a fed hunter in Genesis hunts again at once**.
Real carnivores eat a kill over hours to days (a spotted hyena eats at most about 14.5 kg at one meal) and do not kill again until
hungry; in Genesis a kill gives energy instantly, capped at a full store, and nothing stops the next attack. That is the next thing to
add (backlog A30), before any result of the prey map is read as being about hominins. The fall in hominins alive is not interpreted
yet: it comes with hunters killing ten to twenty times too much, and with hominins beside herds big enough to fight back.

**Correction (14 Nov 2026, Fable's review; see entry 69).** The kills with the prey map on were mismeasured. Hominins' failed bare-handed
strikes wore down adult buffalo and antelope, which then died as "killed by a predator", and the ledger counted them as hunters' kills;
it also compared weight killed with weight needed, not weight eaten. The "prey killed per hunter per day" figures with the map on, and
"carcasses in reach", are therefore not about hunters. Entry 69 re-measures them.

**Strength.** Weak (4 worlds, 30 days; deaths in two worlds). **Lesson:** making one part real can expose a missing part elsewhere;
the prey map stays off until hunters' meals are real.

### 67. A hunter's stomach: a kill is eaten over time, and a full stomach is felt — Nov 2026

**Version.** Unreleased · this commit. Backlog A30, the first of two steps the owner chose (14 Nov: "gut and rest, then pull"). Before
it, a diagnostic with the prey map on found **81% of kills made by hunters already 95–100% full**: the inborn pull to attack prey
beside it (weight 7) does not depend on hunger, and a kill gave 70% of the store at once. Now (on by default; `--instant-meals`
restores the old rule, checked: identical worlds) a kill fills the stomach with as much as fits (a quarter of body weight: a spotted
hyena eats about 14.5 kg of its 60), the rest stays on the carcass; the energy comes in as it is digested over a day, a kg worth a
day's energy divided by the kind's daily need (leopard 4.2 kg, hyena 3.9 kg; sourced); a full stomach is felt as not hungry and
makes the hunter sleepy (full lions rest up to 20–21 hours a day). The inborn attack pull is unchanged (next step).

**Data.** [The ledger, map off and on, with deaths; the prediction](../data/findings/67-hunters-stomach/).
`node tools/analysis/ledger.js 1,2,3,4 30 OUT [--prey-map]`.

| Per world (30 days) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Map off — prey killed, kg per hunter per day (entry 65 → stomach) | 8.9 → 7.3 | 3.0 → 7.3 | 3.1 → 2.4 | 4.0 → 1.3 |
| Map off — hunters dead of hunger | 10 | 7 | 8 | 8 |
| Map off — hominins alive at day 30 | 35 → 22 | 10 → 7 | 39 → 37 | 30 → 12 |
| Map off — hominins killed by hunters | 8 | 25 | 0 | 15 |
| Map on — prey killed, kg per hunter per day (entry 66 → stomach) | 60 → 46 | 92 → 103 | 38 → 18 | 95 → 81 |
| Map on — hominins alive at day 30 | 23 → 28 | 26 → 25 | 20 → 16 | 21 → 24 |

**Result.** (1) With the map on, kills fall to under half in 3 of 4 worlds — **not held**: only world 3 halved; world 2 rose. Still
far above need in all 4 (18–103 kg a day against about 4) — held. (2) With prey scarce (map off), hunters go hungrier — **held**: a kill
now feeds a leopard about 11 kg, two to three days' need, where it used to fill 70% of its store; 7–10 hunters a world died of hunger.
(3) More meat left on carcasses within hominins' sight — **not held** (no clear change). (4) Hominins alive (no direction predicted):
with the map off, fewer in all 4 worlds, mostly killed by hunters (0–25 a world).

**Interpretation.** The stomach makes a kill feed a hunter for days, not weeks — so in the scarce world (map off) hunters are hungry,
and hungry hunters take hominins, as real ones would where antelope are few. That is the old world's scarcity of prey showing again,
not a reason to undo the stomach (the prey map is the fix for scarcity). With the map on, full hunters still kill far too much: the
fixed part of the attack pull (weight 7, unrelated to hunger) is untouched — the next step. How long a hunter can go without food is
not sourced (Genesis: about 25 days from full; lions perhaps one to two weeks, weak sources).

**Correction (14 Nov 2026, Fable's review; see entry 69).** The kills with the prey map on were mismeasured. Hominins' failed bare-handed
strikes wore down adult buffalo and antelope, which then died as "killed by a predator", and the ledger counted them as hunters' kills;
it also compared weight killed with weight needed, not weight eaten. The "prey killed per hunter per day" figures with the map on, and
"carcasses in reach", are therefore not about hunters. Entry 69 re-measures them.

**Strength.** Weak (4 worlds × 2 arms, 30 days; deaths by world tally). **Lesson:** the measured cause (full hunters attack) and the
planned fix (a stomach) were not the same thing; diagnose before building.

### 68. A hunter's pull to attack grows with hunger — Nov 2026

**Version.** Unreleased · this commit. Backlog A32, the second step the owner chose. A quarter of a hunter's inborn pull to attack prey
beside it is always there (fed cats still leave their food to kill a rat: Adamec 1976); the other three quarters are an inborn pull
that grows with felt hunger (a full stomach counts as fed, entry 67). The brain can still learn either way. The share (0.25) is an
assumption, to test at 0.1 and 0.5. `--fixed-hunt-pull` restores the old rule (checked: identical worlds). A 5-day diagnostic (world 1,
map on) before the runs: kills by hunters at 95–100% energy fell from 60 of 74 (before the stomach) to 2 of 40.

**Data.** [The ledger, map off and on, with deaths; the prediction](../data/findings/68-hunting-pull/).

| Per world (30 days; entry 67 → this) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Map on — prey killed, kg per hunter per day | 46 → 45 | 103 → 44 | 18 → 15 | 81 → 28 |
| Map off — prey killed, kg per hunter per day | 7.3 → 7.3 | 7.3 → 5.6 | 2.4 → 0.9 | 1.3 → 1.1 |
| Map off — hunters dead of hunger | 10 → 8 | 7 → 3 | 8 → 5 | 8 → 8 |
| Map off — hominins killed by hunters | 8 → 0 | 25 → 21 | 0 → 0 | 15 → 7 |
| Map off — hominins alive at day 30 | 22 → 33 | 7 → 7 | 37 → 36 | 12 → 15 |
| Map on — hominins alive at day 30 | 28 → 24 | 25 → 24 | 16 → 12 | 24 → 2 (11 burned in a wildfire) |

**Result.** (1) Map on: kills fall by less than half in at least 3 of 4 worlds — **not held**: by less than half in 2 (worlds 1, 3),
by more in 2 (worlds 2, 4); still far above need in all 4 (15–45 kg a day against about 4) — held. (2) Map off: little change in
hunters' hunger deaths — **partly**: fewer in 3 of 4 worlds (fed hunters waste less effort?), the same in one. (3) Hominins killed by
hunters, map off (no direction predicted): fewer in 3 of 4 worlds, none more.

**Interpretation.** Full hunters no longer kill, as the evidence says; half-fed ones still do, and with the map on a hunter still kills
four to ten times its need — what is left is not hunger but the ease of a kill: an attack beside a herd succeeds 37–49% of the time,
every hour, where real leopards succeed in 14–38% of hunts that each take far longer (a stalk). That is the next part to check
(backlog A34), with the prey map still off by default. World 4's collapse with the map on was a wildfire.

**Correction (14 Nov 2026, Fable's review; see entry 69).** The kills with the prey map on were mismeasured. Hominins' failed bare-handed
strikes wore down adult buffalo and antelope, which then died as "killed by a predator", and the ledger counted them as hunters' kills;
it also compared weight killed with weight needed, not weight eaten. The "prey killed per hunter per day" figures with the map on, and
"carcasses in reach", are therefore not about hunters. Entry 69 re-measures them.

**Strength.** Weak (4 worlds × 2 arms, 30 days). **Lesson:** each mechanism removed one cause of the excess, and showed the next.

### 69. Hunters re-measured, and hominins can no longer wear a buffalo down — Nov 2026

**Version.** Unreleased · this commit. Fable's review of entries 66–68 (`docs/reviews/2026-11-14-fable-hunters-review.md`) found two
errors: hominins' failed bare-handed strikes took 12 health from any prey, so with the prey map on they wore adult buffalo and antelope
down to death, recorded as "killed by a predator"; and the ledger counted those as hunters' kills and compared weight killed with
weight needed. Step 0: the world now records who killed what (kg) and what hunters ate (kg); worlds unchanged. Part A: entries 66–68
re-measured with each entry's rules restored by switches (entry 68's tallies reproduced exactly). Part B: a hominin's failed strike
harms prey by its weight against the prey's, as hunters' bites do (`--old-hominin-strikes` restores; checked: identical worlds).

**Data.** [All arms, worlds 1–4, 30 days, with the prediction](../data/findings/69-hunters-remeasured/).

| Map on, per world | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Share of killed weight worn down by hominins (as entry 66 / 67 / 68) | 45 / 66 / 68% | 32 / 46 / 54% | 2 / 2 / 13% | 20 / 31 / 30% |
| Hunters' own kills, kg per hunter-day (old ledger → new), as entry 68 | 45 → 14 | 44 → 21 | 15 → 14 | 28 → 20 |
| Eaten, kg per hunter-day, as entry 68: leopard (need 4.2) / hyena (3.9) / sabre-tooth (8.4) | 2.7 / 3.4 / 11.2 | 1.7 / 2.6 / 8.8 | 6.4 / 2.2 / 7.5 | 0.7 / 3.6 / 12.2 |
| With the strike fix: share by hominins | 2% | 1% | 1% | 1% |
| With the strike fix: hunters' own kills, kg per hunter-day | 34 | 23 | 13 | 43 |
| With the strike fix: hominins dead of wounds (entry 68 → fix) | 8 → 7 | 4 → 4 | 2 → 0 | 2 → 6 |
| With the strike fix: hominins alive at day 30 (entry 68 → fix) | 24 → 26 | 24 → 16 | 12 → 12 | 2 → 9 |

With the map off, nothing changed much: hominins wore down almost nothing (0–2%), and the strike fix left worlds 3–4 identical.

**Result.** Part A: hominins' share over 25% in at least 3 of 4 worlds — **held** under entries 67 and 68, not under 66 (2 of 4); hunters'
own kills under half the old figure in 3 of 4 — **not held** (2 of 4). **Hunters eat less than their need**, not more: leopards
0.7–6.4 kg a day (need 4.2), hyenas 2.2–3.6 (3.9); only sabre-tooths eat about their need. Part B: (1) prey killed by hominins falls to
about 0 — **held** (1–2%). (2) Deaths by wounds fall — **not held** (big herds still fight back when struck). (3) Little change with
the map off — **held**.

**Interpretation.** Entry 66–68's "hunters kill 4–10 times their need" was mostly hominins' doing and the wrong measure. The true
picture: hunters kill 13–43 kg a day each but eat a stomach at a time and lose the rest (a fed hunter sleeps and birds strip its kill),
so leopards and hyenas go short. Leopards also pay the big-prey price on every kill, because every herd animal is an adult 50 kg
antelope above their preferred 40 kg (herds have no young yet). Next, per Fable: a hunter keeps its kill (step 3).

**Strength.** Moderate for the measuring correction (exact reproduction, 4 worlds × 3 entries); weak for the rest (4 worlds, 30 days).
**Lesson:** check what a measure counts before reading it — the label "killed by a predator" covered two killers.

### 70. A hunter resting at its kill keeps the birds off — no difference — Nov 2026

**Version.** Unreleased · this commit. Backlog A35 (Fable's step 3). Birds do not feed on a carcass while the hunter that made it, or
has eaten from it, rests in the same square, awake or asleep (a resting hunter deterring birds is an assumption; big cats do not let
vultures feed while they feed: Attwell 1963; leopards feed on a kill for days: Balme et al. 2017). `--unguarded-sleep` restores the old
rule (checked: identical worlds).

**Data.** [The ledger, map on and off, worlds 1–4, 30 days; the prediction](../data/findings/70-hunter-keeps-kill/), against entry 69's
strike-fix arms.

| Map on, per world (entry 69 → this) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Eaten, kg per hunter-day: leopard / hyena / sabre-tooth | 3.4/4.2/14.4 → 2.6/2.3/12.8 | 0.5/1.0/13.2 → 0.3/4.1/15.8 | 4.3/2.6/4.8 → 3.0/3.6/8.9 | 1.2/8.3/16.2 → 0.2/2.1/13.4 |
| Hunters' killed weight ÷ eaten weight | 5.1 → 6.2 | 5.0 → 5.2 | 3.3 → 3.8 | 4.6 → 3.7 |
| Hominins alive at day 30 | 26 → 27 | 16 → 14 | 12 → 8 | 9 → 4 |

With the map off, worlds 1, 3 and 4 hardly changed.

**Result.** (1) Leopards and hyenas closer to need — **not held**. (2) Killed ÷ eaten under 2 in at least 2 worlds — **not held** (3.7–6.2).
(3) Fewer own kills — **not held** (mixed). (4) Fewer carcasses in sight — **not held** (the share with none fell in 2 worlds).

**Where a kill's meat goes** (a measuring-only trace, world 1, map on, 10 days): 79 carcasses, about 8,870 kg. Hunters ate about
1,390 kg (about 900 at the kill, about 490 later — half of that by other hunters), hominins 180, **rot and insects about 2,860 (32%)**,
**birds about 2,240 (25%)**, and the rest was still lying there. So birds still took a quarter: the hunter walks away from its kill,
and the rule only protects a kill its hunter is resting on.

**Interpretation.** The rule is not wrong but does nothing, because Genesis hunters do not stay with a kill: nothing in their bodies or
brains makes them, and they have not learned it. Real leopards stay with or return to a kill for days and hoist it. Rot also takes a
third within days (the insect rate, entry about carcasses: 0.12 a day at 20 °C, doubling every 10 °C). Kill weight here is the whole
body, not the edible part. Which of these is the missing real thing is the next question, put to the owner.

**Strength.** Weak (4 worlds × 2 arms, one trace). **Lesson:** a protection that depends on a behaviour does nothing until the
behaviour exists.

### 71. Hunters remember where they ate — they eat more of their kills — Nov 2026

**Version.** 0.7.0+ · commit `734ec41` (released). After entry 70 found that hunters walk away from their kills, the cause was found
in the code: every creature remembers where it last found food and has an inborn pull back to it when hungry, but the memory was only
written when eating plants — hunters never remembered their own kill. Now eating meat writes it too, forgotten when the meat is gone.
No new number. `--hunters-forget-kills` restores the old rule (checked: identical worlds — after the check caught two lines of mine
that had changed the old rule too). Before it, the rot rate was checked: over 90% of a carcass gone in about 20 days in summer
(forensic studies) — Genesis matches; that big carcasses rot more slowly is missing (backlog A39).

**Data.** [The ledger, map on and off, worlds 1–4, 30 days; the prediction](../data/findings/71-hunters-remember-kills/), against entry 70.

| Map on, per world (entry 70 → this) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Eaten, kg per hunter-day: leopard (need 4.2) | 2.6 → 3.4 | 0.3 → 1.6 | 3.0 → 4.3 | 0.2 → 1.2 |
| hyena (need 3.9) | 2.3 → 5.1 | 4.1 → 6.0 | 3.6 → 3.2 | 2.1 → 3.5 |
| Hunters' killed weight ÷ eaten weight | 6.2 → 4.6 | 5.2 → 3.8 | 3.8 → 2.6 | 3.7 → 4.7 |
| Hominins alive at day 30 | 27 → 28 | 14 → 5 (15 burned) | 8 → 3 | 4 → 2 |

Map off: hunters' hunger deaths 6 → 5, 5 → 7, 5 → 7, 8 → 4; world 1 lost 15 hominins to hunters (0 before; 30 → 13 alive).

**Result.** (1) Leopards and hyenas closer to need — **held**: leopards ate more in all 4 worlds, hyenas in 3. (2) Killed ÷ eaten
falls — **held** in 3 of 4. (3) Map off: fewer hunters starve — **held** only in 2 of 4. (4) Fewer carcasses in hominins' sight —
**not held** (1 of 4).

**Interpretation.** A missing memory, not a missing instinct, kept hunters from their kills; with it they come back and eat more, as
real leopards return to a kill over several nights. Leopards are still under need (1.2–4.3 kg a day): every herd animal is an adult
above their preferred size (backlog A36, herds with young). A hunter that has eaten a hominin now also remembers that place — often
where the band is; in world 1 (map off) that came with 15 hominins killed. One world; to watch, not to read into yet.

**Strength.** Weak (4 worlds × 2 arms, 30 days). **Lesson:** look for an omission in what already exists before adding a new mechanism.

### 72. Forest antelope on the prey map — Nov 2026

**Version.** 0.7.0+ · this commit. Backlog A31 (Fable's step 4, first half). Squares warm enough for antelope but too thickly wooded
for open-country herds used to hold no prey at all; in world 3 nearly every hominin and hunter stood in such forest, so herds vanished
(entry 67). They now carry duiker- and bushbuck-like antelope at 1,000 kg/km² (an assumption: rain forests rarely carry over 3,000
kg/km² of all mammals together, against 15,000–20,000 in grasslands, a review of 36 studies; tested 300 and 3,000 still to run).
`--forest-prey 0` restores the old map (checked: identical worlds). The prey map stays off by default. The other half of the step,
herds shown out to sight, is left: at real sight it would mean about a thousand herds with brains.

**Data.** [The ledger, map on, worlds 1–4, 30 days; the prediction](../data/findings/72-forest-prey/), against entry 71.

| Map on, per world (entry 71 → this) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Plant-eaters in a hominin's sight (mean) | 1.7 → 9.7 | 2.8 → 17.6 | 0.0 → 7.5 | 1.3 → 9.0 |
| Hunter samples more than 5 squares from a herd | 78 → 71% | 61 → 68% | 82 → 59% | 50 → 54% |
| Eaten, kg per hunter-day: leopard / hyena | 3.4/5.1 → 2.4/3.3 | 1.6/6.0 → 5.1/6.3 | 4.3/3.2 → 4.5/4.8 | 1.2/3.5 → 1.5/5.6 |
| Hominins killed by hunters | 0 → 0 | 3 → 0 | 23 → 7 | 14 → 9 |
| Hominins alive at day 30 | 28 → 20 | 5 → 28 | 3 → 18 | 2 → 8 |

**Result.** (1) Hunters far from prey fall in 3 of 4 worlds — **not held** (2 of 4; still 54–71%). (2) World 3 shows herds again and its
hunters eat more — **held** (none in sight before, 7.5 now). (3) Hominins killed by hunters (no direction predicted): fewer in 3 of 4
worlds; more hominins alive in 3 of 4.

**Interpretation.** Hominins now live among prey even where they choose wooded country, as early hominins did in woodland mosaics; and
with prey nearby, hunters take fewer hominins. Hunters are still often far from a shown herd, which the herd zone (one square around
each hominin or hunter) and the arid edges with no prey may explain; not yet traced.

**Strength.** Weak (4 worlds, 30 days; the level not yet tested at both ends).

### 73. Herds with young — no clear difference in 4 worlds — Nov 2026

**Version.** 0.7.0+ · this commit. Backlog A36 (the owner's choice, on Fable's recommendation). With the prey map on, a hunter
attacking an antelope herd meets one animal drawn from the herd's mix: yearlings 25% at 19 kg, adult females 38 kg and males 49 kg,
half each (impala population studies; the half-and-half split an assumption). Before, every animal was a 50 kg adult. Buffalo herds
stay all adults (no source found). `--adult-herds` restores the old rule (checked: identical worlds).

**Data.** [The ledger, map on, worlds 1–4, 30 days; the prediction](../data/findings/73-herds-with-young/), against entry 72.

| Map on, per world (entry 72 → this) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Eaten, kg per hunter-day: leopard (need 4.2) | 2.4 → 3.6 | 5.1 → 2.0 | 4.5 → 3.3 | 1.5 → 1.2 |
| hyena (need 3.9) | 3.3 → 3.5 | 6.3 → 4.0 | 4.8 → 3.2 | 5.6 → 3.0 |
| Weight killed by leopards, kg | 820 → 1,559 | 2,907 → 1,045 | 1,850 → 1,710 | 362 → 458 |
| Hominins alive at day 30 | 20 → 25 | 28 → 35 | 18 → 25 | 8 → 5 |

**Result.** (1) Leopards nearer need in at least 3 of 4 — **not held** (1 of 4). (2) More killed by leopards — **not held** (2 of 4).
(3) Little change for hyenas — **not held**: they ate less in 3 of 4.

**Interpretation.** No clear effect: the differences go both ways and are as large as the differences between worlds. Four worlds of
30 days cannot show a change this small; the change stays in (it is what real herds are), and its effect is a question for the big run
with many more worlds. **Lesson:** small realism changes need more worlds than a 4-world check; the 4-world runs are only for spotting
large effects and errors.

**Strength.** None (no detectable effect).

### 74. Hominins eat meat in kg — their meat now matches chimpanzees' — Nov 2026

**Version.** 0.7.0+ · this commit. Backlog A37 (Fable's review, finding 4). Hominins ate meat as shares of a body, the same energy
whatever the animal: a bare-handed bite was about 31 kg of buffalo or 7 kg of antelope. Now a bite (15 minutes) takes 0.25 kg
bare-handed or 0.75 kg with a flake (assumptions: no measured rate found; the flake keeps its old threefold advantage), and a kg gives
the share of the day's energy that 1,140 kcal is of the day's need (raw game meat 102–127 kcal per 100 g, USDA; need 86 × weight^0.792
kcal a day, Leonard & Robertson 1997). `--meat-units` restores the old rule (checked: identical worlds). Marrow is still in the old
units (to do); a hominin stomach is a separate step.

**Data.** [Four arms, worlds 1–4, 30 days: map off and on, each with and without the change; the prediction](../data/findings/74-meat-in-kg/).

| Map on, per world (old units → kg) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Meat eaten, kg per hominin-day | 1.14 → 0.20 | 0.31 → 0.21 | 0.61 → 0.31 | 0.89 → 0.13 |
| Hominins dead of hunger | 3 → 6 | 0 → 3 | 0 → 0 | 1 → 1 |
| Hominins alive at day 30 | 25 → 18 | 35 → 16 | 25 → 10 | 5 → 10 |

With the map off, hominins ate almost no meat either way (0–0.07 kg a day: few carcasses near them); alive 13 → 22, 3 → 3, 38 → 38,
12 → 19 — differences that come from worlds drifting apart, not from meat.

**Result.** (1) Meat eaten falls with the map on — **held**, in all 4 worlds. (2) More hunger deaths with the map on — **held** (2 of 4).
(3) Hominins alive (no direction predicted): fewer in 3 of 4 with the map on; the causes differ between worlds (hunger, wounds, fire,
hunters).

**Interpretation.** Meat is now worth what it is. With the prey map on, hominins eat 0.13–0.31 kg of meat a day — in the range of wild
chimpanzees (Taï males about 0.19 kg, Gombe about 0.02 kg on average), where before they ate 0.3–1.1 kg, more than any ape. Meat was
over-rewarding them; without it some go hungry. That is the real economics of meat for a 30–42 kg hominin without a cutting habit.

**Strength.** Moderate for the meat intake (4 of 4 worlds, a large change); weak for survival (4 worlds, mixed causes).

### 75. The checkpoint run: hominins collapse in most worlds, mostly to hunters — Nov 2026

**Version.** 0.7.0+ · commit `faa300a` era (after Fable's list: entries 66–74, A33 checked). The owner asked for a checkpoint big run
before the remaining gaps. 24 worlds (seeds 1–24) × 100 days (about 33 life-years), every setting at its default, with the prey map
on and, for comparison, off (the live default).

**Data.** [Both tables and the prediction](../data/findings/75-checkpoint-run/). `node tools/experiment.js --seeds 1-24 --days 100
--workers 4 [--prey-map]`.

| 24 worlds × 100 days | Map off (default) | Map on |
|---|---|---|
| Worlds with hominins alive at day 100 | 17 | 16 |
| Hominins alive: middle world / all worlds | 2 / 208 | 2 / 107 |
| Worlds with a second generation | 13 | 17 |
| Deaths: killed by hunters | 39% | 31% |
| wounds | 11% | 24% |
| hunger | 11% | 15% |
| old age | 15% | 14% |
| burned | 14% | 8% |
| Worlds where someone made fire by rubbing wood | 9 | 20 |
| … cut meat with a stone / brought down an animal | 2 / 11 | 12 / 7 |

**Result (map on, against the prediction).** (1) Hominins alive in at least 16 of 24 — **held, only just** (16). (2) Hunters the largest
cause in at least 8 worlds, hunger under a third — **held** (11 worlds; 15%). (3) Births in at least 18 worlds — **not held** (17);
a second generation in at least 12 — held (17). (4) Nut cracking and digging found alone in most worlds — **held** (all 24); making fire
rare — **not held** (20 of 24 with the map on). (5) Hunters survive in every world — held.

**What killed hominins by wounds** (a measuring-only trace, 2 worlds × 40 days, map on): sickness from eating rotting meat 9, hurt by a
buffalo or antelope they attacked 7. The rot sickness is partly an artefact of entry 74: its chance (0.35) is rolled at every 15-minute
bite, and a bite is now a quarter kilo, so a carcass takes many more bites than before and the same meat gives many more chances to fall
sick. The risk should follow the amount eaten (next step).

**Interpretation.** In both worlds most bands shrink to a handful in 33 life-years; real chimpanzee communities do not usually die out
that fast. Hunters are the main killer either way. The prey map does not cause the collapse (it happens with the map off too), but with
it, more hominins die of wounds — from rotten meat counted per bite, and from attacking herds that fight back (the inborn pull to attack
prey beside them, which the owner chose to leave to pain). Fire-making by rubbing wood is common — an experiment against the record
(no fire-making before about 400,000 years ago), on by default; whether it stays on is the owner's call.

**Strength.** Moderate (24 worlds; one seed set). **Next:** rot sickness by amount eaten; then look at why hunters kill so many
hominins (real primates lose a few percent a year to predators).

### 76. Sickness from rotting meat follows the amount eaten (bug B27) — Nov 2026

**Version.** 0.7.0+ · this commit. Entry 75's trace found rotting meat the largest cause of hominin deaths by wounds with the prey map on.
The cause was a bug from entry 74: the 0.35 chance of falling sick was rolled at every 15-minute bite, and since meat is eaten in kg a
bite is a quarter kilo, so the same meat gave many more chances to fall sick. Now the chance follows the kg eaten: 1 − 0.65^(kg ÷ 7),
0.35 for every 7 kg — the old bare-handed bite of an antelope, so the risk per kg is what it was. `--rot-per-bite` restores the bug
(checked: identical worlds).

**Data.** [Map on, worlds 1–4, 30 days, with and without; the prediction](../data/findings/76-rot-by-kg/).

| Map on, per world (per bite → by kg) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Hominins dead of wounds | 9 → 5 | 4 → 3 | 8 → 4 | 7 → 5 |
| Hominins alive at day 30 | 18 → 19 | 16 → 29 | 10 → 16 | 10 → 1 |

**Result.** (1) Deaths by wounds fall in at least 3 of 4 — **held** (4 of 4). (2) More alive in at least 2 of 4 — **held** (3 of 4).

**Strength.** Weak for survival (4 worlds); moderate for wounds (4 of 4). **Lesson:** when a unit changes (entry 74), every rule that
counted the old unit must change with it.

### 77. The checkpoint again, fire-making off: predation is at the real primate rate — Nov 2026

**Version.** 0.7.0+ · commit `c26935d`. Entry 75 again, with fire-making off by default (the owner, after Fable's review) and the rot
fix (entry 76); the runner now records hominin-days, so discoveries and deaths can be given as rates (the owner's choice). 24 worlds ×
100 days (about 33 life-years), map off and on.

**Data.** [Both tables, the prediction](../data/findings/77-fire-making-off/); rates with `node tools/analysis/rates.js TABLE`.

| 24 worlds × 100 days (entry 75 → 77) | Map off | Map on |
|---|---|---|
| Worlds with hominins alive | 17 → 17 | 16 → 17 |
| Hominins alive: middle world / all worlds | 2 → 6 / 208 → 256 | 2 → 9 / 107 → 254 |
| Worlds with a second generation | 13 → 16 | 17 → 16 |
| Deaths: killed by hunters / wounds / hunger / burned | 39→48 / 11→9 / 11→10 / 14→9% | 31→34 / 24→15 / 15→18 / 8→8% |
| **Hominins killed by hunters, per hominin-year** | **3.6%** | **2.6%** |

**Predation against the record.** Real primates lose a median of about 3% of a population a year to predators (24 populations,
range 0–15%: Cheney & Wrangham 1987, reviewed by Isbell 1994, *Evol Anthropol*); great apes are among the lowest. Genesis hominins
lose 2.6–3.6% a year — at the real rate. Hunters are the largest cause of death because the other causes are few in 33 life-years
and the bands are small, not because hunters kill too many. The question raised in entry 75 is answered without a change.

**Discoveries as rates** (firsts per 1,000 hominin-life-years, map off / on): nut cracking 126 / 99; digging 141 / 186; stone flakes
21 / 44; cutting meat with a stone 0.5 / 3.1; bringing down an animal 1.7 / 0.9; taking a burning stick 2.1 / 1.5; eating
wildfire-cooked food 3.8 / 1.8; dropping a burning stick that lights 0.7 / 0.6; keeping a fire 0 (< 0.26) both; making fire 0 (< 0.26)
both; a shelter of carried branches 0.09 / 0 (< 0.26).

**Result.** (1) Nobody makes fire; wildfire still found and used in most worlds — **held** (0; burning sticks taken in 12–14 worlds).
(2) Fewer deaths by fire — held with the map off (14 → 9%), not with it on (8 → 8%). (3) Wounds below 20% with the map on — **held**
(15%). (4) Hominins alive (no direction predicted): the middle world rose from 2 to 6–9, totals from 107–208 to about 255.

**Interpretation.** With made fire gone and rotten meat fixed, more hominins live, and the deaths that remain are mostly hunters at a
real primate rate, hunger, and old age. Bands still shrink in a third of worlds; with predation at the real rate, the next questions
are births and the squeezed year (the owner's backlog A40).

**Strength.** Moderate (24 worlds × 2 arms). **Lesson:** a cause's share of deaths says little; its rate per individual-year can be
compared with the real record.

### 78. Fire as nature allows — Nov 2026

**Version.** 0.7.0+ · this commit. The owner rejected a blanket "fire-making off" as unnatural ("imagine yesterday I was not able to
make a bubble out of a setup and today I am, when everything is the same ... make it natural"). Fable reviewed a design
(`docs/design/fire-making-natural.md`; `docs/reviews/2026-11-14-fable-natural-fire.md`): friction fire cannot be modelled faithfully
at a 15-minute step (an ember needs minutes of unbroken drilling), so the false links were cut instead (the owner's choices A1, B1):
a stick blow is no longer "rubbing"; pyrite sparks find no tinder that holds them (none exists in this world yet); no hidden fire
practice or built-in reward from striking (`--old-fire-links`); dead sticks dry and wet with the air's humidity (`--fixed-stick-
dryness`); a dropped burning stick lights the ground with a chance equal to its dryness (Ellis 2015: moisture dominates;
`--brand-always-lights`). Each switch restores identical worlds. Making fire is now not modelled — said in the About tab — and
backlog A41 (the full natural chain) is marked by the owner as a broken behaviour to fix later.

**Data.** [Both tables and the prediction](../data/findings/78-fire-as-nature-allows/).

| 24 worlds × 100 days (entry 77 → 78) | Map off | Map on |
|---|---|---|
| Worlds with hominins alive | 17 → 15 | 17 → 19 |
| Hominins alive: middle world / all | 6 → 6 / 256 → 224 | 9 → 8 / 254 → 237 |
| Deaths by fire | 9 → 7% | 8 → 5% |
| Predation per hominin-year | 3.6 → 3.8% | 2.6 → 2.7% |
| Worlds where a burning stick was taken / dropped and lit / cooked food eaten | 14/6/18 → 13/6/19 | 12/6/13 → 12/3/12 |

**Result.** (1) Nobody makes fire; dropped brands light less often in at least one arm — **held** (map on, 6 → 3 worlds). (2) Fewer
deaths by fire — **held** in both arms. (3) Not measured. (4) Predation near 2–4% a year — **held**.

**Interpretation.** Small changes, as expected: the false links mattered little once fire-making was off. Wildfire is still found,
carried and eaten from in about half the worlds or more, which fits apes that use burned landscapes (Fongoli chimpanzees). Survival
differences are within world-to-world noise.

**Strength.** Moderate (24 worlds × 2 arms) for "little change".

### 79. Marrow in kg — a small food, as it really is — Nov 2026

**Version.** 0.7.0+ · commit `cf17465`. Marrow was 0.15 of a carcass's meat, eaten at the value of meat. Now it is about 0.25% of body
weight (impala 154 g of 55 kg, wildebeest 365 g of 165 kg: Blumenschine & Madrigal 1993, tabulated by Kuipers et al. 2010), each strike
with a stone cracks one of eight long bones, and a kg gives 7,860 kcal (USDA, raw caribou marrow) against the day's need.
`--marrow-units` restores the old rule (checked: identical worlds).

**Data.** [Map on, worlds 1–4, 30 days, both arms; the prediction](../data/findings/79-marrow-in-kg/).

| Map on (units → kg) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Hominins dead of hunger | 0 → 2 | 2 → 1 | 1 → 1 | 8 → 6 |
| Hominins alive at day 30 | 23 → 20 | 24 → 22 | 17 → 23 | 15 → 18 |
| Marrow eaten, g per hominin-day | 0.8 | 0.5 | 0.2 | 2.0 |

**Result.** (1) Hunger changes within noise — **held**. (2) Under 30 g a day — **held** (0.2–2 g).

**Interpretation.** Marrow is a small, rich food that hominins rarely reach here (only with a stone, at a carcass). Found on the way:
only 44–58% of an animal's weight is edible flesh (same table), but Genesis counts the whole body as meat (backlog A42).

### 80. Bigger carcasses rot more slowly — Nov 2026

**Version.** 0.7.0+ · this commit. Backlog A39. The insect-and-microbe rot rate (over 90% of a carcass in about 20 days in summer,
roughly doubling every 10 °C) was the same for a hare and a buffalo. Now it is × (weight ÷ 20 kg)^−0.78, from small pigs (under 35 kg)
decomposing 2.82 times faster than large ones (60–90 kg) (Sutherland et al. 2013, *Forensic Sci Int*), applied only inside the studied
20–90 kg (no stretching a pig study to a buffalo). `--one-rot-rate` restores the old rule (checked: identical worlds).

**Data.** [Map on, worlds 1–4, 30 days, both arms; the prediction](../data/findings/80-rot-by-size/).

| Map on (one rate → by size) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Hominin samples with no carcass in sight | 43 → 25% | 39 → 21% | 37 → 30% | 52 → 61% |
| Meat eaten, kg per hominin-day | 0.26 → 0.46 | 0.20 → 0.26 | 0.31 → 0.25 | 0.07 → 0.09 |
| Hominins alive at day 30 | 20 → 23 | 22 → 19 | 23 → 16 | 18 → 11 |

**Result.** (1) More carcasses in sight — **held** (3 of 4). (2) More meat eaten — **held** (3 of 4; still 0.09–0.46 kg a day). Deaths
from wounds did not rise (9 → 3, 2 → 2, 1 → 1, 4 → 4).

**Interpretation.** Antelope-sized carcasses last longer, so scavenging opportunities rise, as Blumenschine's Serengeti work found
for larger carcasses. Survival moved both ways (noise).

### 81. Only the edible flesh is meat — Nov 2026

**Version.** 0.7.0+ · this commit. Backlog A42. Hunters' stomachs and hominins' bites counted a carcass's whole weight as meat; only
about half of it is edible flesh (Thomson's gazelle 48%, impala 54%, hartebeest 58%, wildebeest 44%: Blumenschine & Madrigal 1993, via
Kuipers et al. 2010). Now 0.5 (tested 0.44 and 0.58 still to run). `--whole-body-meat` restores (checked: identical worlds).

**Data.** [Four arms, worlds 1–4, 30 days; the prediction](../data/findings/81-edible-flesh/).

| Map on (whole body → flesh) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Hominins' meat, kg per hominin-day | 0.46 → 0.24 | 0.26 → 0.08 | 0.25 → 0.19 | 0.09 → 0.02 |
| Leopards' food, kg per day (need 4.2) | 3.6 → 2.4 | 5.9 → 3.7 | 5.0 → 4.6 | 1.9 → 1.1 |
| Hunters dead of hunger | 3 → 4 | 1 → 3 | 0 → 4 | 4 → 4 |
| Hominins alive at day 30 | 23 → 20 | 19 → 26 | 16 → 16 | 11 → 17 |

Map off: hominins ate almost no meat either way; hunters' hunger deaths 5 → 6, 7 → 7, 7 → 8, 9 → 9.

**Result.** (1) Less meat for hominins (map on) — **held** (4 of 4). (2) Leopards eat less — **held** (4 of 4). (3) More hunters starve
with the map off — **held** (2 of 4).

**Interpretation.** Each carcass now feeds half as much, as it really does. Hominins still eat meat in the chimpanzee range (Taï males
about 0.19 kg a day). Leopards fall further below their need (1.1–4.6 kg against 4.2): with every animal they meet an adult or a
yearling of the herd's mix and kills often lost while they sleep, they are the hunters most worth looking at next.

### 82–83. Cutting is an act; the prey map on by default — bands far healthier — Nov 2026

**Version.** 0.7.0+ · commit `4cba3e6`. Entry 82 (the owner's choice after Fable's Oldowan review): holding a flake no longer cuts
meat by itself; a strike with a flake on a carcass cuts meat off the bone, eaten fast by whoever eats there (`--flake-in-hand-cuts`
restores). Entry 83 (the owner, 14 Nov: without it plant-eaters died out in 12 of 24 worlds): the prey map on by default
(`--no-prey-map` restores); every hunter of a pair or pack starts away from the camp, not only the group's centre (bug B28;
`--old-hunter-placement`). A first run of this entry had the map off by mistake (the runner passes `preyMap:false` unless told, which
the first version treated as off; fixed, the runs kept and labelled in `map-off-by-mistake/`: without the map plant-eaters died out
in 17 of 24 worlds).

**Data.** [24 worlds × 100 days, the new default and the old flake rule; the prediction](../data/findings/83-prey-map-default/).

| 24 worlds × 100 days | Entry 78 (map on) | New default (82+83) | New default, flake in hand cuts |
|---|---|---|---|
| Worlds with hominins alive | 19 | 21 | 21 |
| Hominins alive: middle world / all | 8 / 237 | 14 / 404 | 17 / 421 |
| Worlds where plant-eaters died out | 0 | 1 | 1 |
| Hominins killed by hunters, per hominin-year | 2.7% | 1.3% | 1.3% |
| Share of deaths by hunger | 17% | 22% | 22% |
| Worlds where someone cut meat with a stone (rate per 1,000 hominin-life-years) | 17 (3.7) | 15 (1.8) | 13 (1.4) |

**Result.** (1) Plant-eaters survive in all 24 worlds — **nearly** (23). (2) Cutting with a stone rarer as an act — **not held** (15
worlds against 13; within noise). (3) Survival and predation as entry 78 — **not held**: far better. Many changes lie between entry
78 and this run (marrow, carcass rot and edible flesh, cutting, the camp fix, the map's default); the camp fix is the likely main
cause of the fall in predation (a hunter could start two squares from the band), not yet separated.

**Interpretation.** With real numbers of prey and no hunter placed beside the band, bands hold far better: the middle world keeps 14
hominins after 33 life-years, against 8. Predation (1.3% a year) is inside the real primate range (0–15%, median 3%). Hunger is now the
larger share of deaths.

**Strength.** Moderate (24 worlds × 2 arms); the cause of the improvement not yet separated.

### 84. Prey choose to flee — but a 3 km square hides the escape — Nov 2026

**Version.** 0.8.0 · commit `d01fb21` (released in 0.8.0; at first not released: held for Fable's review of the staying-alive design,
`docs/design/staying-alive.md`; Fable's weekly limit was reached on 15 Nov). The owner (14 Nov): "in the real world everyone hides and
runs; life is very important." A measuring-only trace found herds stayed in their square 95–97% of the time with a hunter in it or next
to it, and hunters' attacks succeeded 47% of the time (field: lions about 15% alone and 30% in groups, Serengeti; leopards 14–38%).
Only hominins had an inborn pull to flee; plant-eaters now have the same one (away from a hunter seen in a direction; with an awake
hunter in the same square, a pull to bolt), the hominins' strength, no new number. `--no-prey-flight` restores (identical worlds).

**Data.** [The traces and the prediction](../data/findings/84-prey-flee/) (worlds 1–3 × 10 days; then 1–2 × 10 days for the choices).

| Herd, nearest hunter (without → with the pull) | Chose to move | Left its square | Ate |
|---|---|---|---|
| Same square | 37 → 56% | 3 → 4% | 8 → 7% |
| 1 square | 54 → 57% | 3 → 3% | 10 → 10% |
| 2 squares | 62 → 66% | 0 → 0% | 9 → 4% |
| Hunters' attack success | 49 → 50% | | |

**Result.** (1) Herds move away far more (over 30%, was 3–4%) — **not held** as measured by leaving the square; they **choose** to flee
more (37 → 56% with a hunter in their square) but a square is 3 km and an animal running covers a third to a half of one in 15 minutes, so
it rarely leaves in one step. (2) Attack success falls but stays above 15% — **not held**: unchanged (49 → 50%).

**Interpretation.** Prey already tried to run when a hunter was next to them; what is missing is the escape itself. A real escape covers
a few hundred metres, inside one square, so the map cannot show it; whether an attack succeeds must then depend on whether the prey
saw it coming and ran — the design's step 2 (hunts that can be detected), to be reviewed before it is built.

**Strength.** Weak (2–3 worlds, 10 days; a trace). **Lesson:** a measure tied to the map's grid can hide what the creatures do; measure
the choice as well as the outcome.

---

### 85. Digging with a tool is an act — a stick finds roots sooner, nobody goes hungrier — Nov 2026

**Version.** 0.8.0 · commit `15307c1` (the rule), `88dddcf` (the prediction). The same false link as the flake's (entry 82): holding a
stick, flake or stone made digging for roots easier by itself. Now digging with a tool is a strike into the ground where roots are; it
loosens them with the tool's old chance (A44: stick 0.55, flake 0.4, stone 0.3), leaving them dug up and lying for anyone to eat. Eating
without a strike digs bare-handed. `--tool-in-hand-digs` restores (identical worlds).

**Data.** [Both arms and the prediction](../data/findings/85-digging-is-an-act/) (worlds 1–24 × 100 days, the default world).

| Measure (old rule → digging is an act) | Old | Act | Difference (95% range) |
|---|---|---|---|
| First dig with a stick, per 1,000 hominin-life-years | 162 | 400 | worlds 24 of 24 in both |
| Hunger deaths (sum, 24 worlds) | 217 | 186 | −1.3 a world [−4.0, 1.4] |
| People alive at day 100 (mean) | 12.5 | 10.5 | −1.9 [−7.0, 3.2] |
| Worlds where the band died out | 2 | 6 | |
| First nut cracked, per 1,000 hominin-life-years | 97 | 69 | |
| Drowned (sum) | 2 | 7 | 0.2 [0.04, 0.38] |

"First dig" is comparable in both arms: the first time a stick gets roots out (old: eating roots with a stick in hand; act: a strike with
a stick that loosens them).

**Result.** (1) Digging with a stick becomes rarer — **not held**: the first stick-dig came about 2.5 times *sooner*. (2) Hunger deaths
rise a little — **not held**: no difference (slightly fewer, within noise).

**Interpretation.** Under the old rule a stick helped only when a hominin happened to be holding one *and* chose to eat at a root
patch. Now any strike with a stick on root ground digs — and striking is an act hominins already try often (with flakes on carcasses,
stones on nuts). So the first dig comes sooner; it is chance striking, not a learned skill, and the first-time measure cannot tell the
two apart (it says when, not how often or whether it was repeated: F5, count repeats). Food from roots did not change enough to show
in hunger. The fewer nuts cracked and more bands dying out (6 vs 2 of 24) and drownings (2 vs 7, small numbers, one of many
comparisons) are noted, not explained; the band size range includes no change.

**Strength.** Moderate (24 worlds × 100 days, both arms). The rule is kept: it removes a false link (holding is not using), not tuned
toward an outcome. **Lesson:** a first-time count measures chance as much as skill; the next step is counting repeats (F5).

---

### 86. The mutation rule registered, a gene that does nothing — and copying falls beside it — Nov 2026

**Version.** 0.9.0 · commit `817fad4`. Master plan step 0.2. The mutation rule (each trait: a 1-in-5 chance at a
birth of a step within ±15%; each inborn wire: 3%) was in the code from the start but unregistered and unsourced; it is now `SOC.mutP`,
`mutStep`, `wireMutP`, `wireMutSd` in `docs/ASSUMPTIONS.md`, marked **knowingly fast** (roughly 10–40 × real mutational variance, Houle
et al. 1996). A **neutral marker gene** (`neutral_marker`, 0–1) is inherited and mutates by the same rule but is read by nothing, on its
own random stream: the yardstick for chance (master plan, test E1). The lost identical-worlds script is rebuilt as
`tools/identical-worlds.sh` (it also reports DIFFERENT when a switch changes the world, checked); `tools/analysis/neutral-compare.js`
compares each trait's change with the marker's.

**Data.** [Day 1 and day 100 tables, the comparison and the prediction](../data/findings/86-mutation-registered-neutral-marker/)
(worlds 1–24, the default world; 18 bands alive at day 100, about 2 generations).

| Trait (inherited) | Worlds up | Worlds down | Mean change | Spread across worlds |
|---|---|---|---|---|
| **The neutral marker** (does nothing; 0–1) | 9 | 8 | −0.01 | 0.14 |
| **Learns from others** (copying, `im`; founders 0.1–1.7) | **1** | **17** | **−0.14** | 0.15 |
| Copies those doing well (0–1) | 11 | 6 | +0.03 | 0.09 |
| Follows the crowd (0–1) | 9 | 9 | +0.03 | 0.17 |
| Cares for others' young (0–1) | 9 | 7 | +0.01 | 0.09 |
| Vocal control, urge to point, joy of sharing (0–1) | 11 / 8 / 8 | 5 / 8 / 8 | about 0 | 0.04–0.05 |

**Result.** (1) Worlds identical to the commit before (seeds 1–2 × 20 days, 82 columns) — **held**. (2) No trait moves further than
the marker in 2 generations — **not held for one trait**: the marker drifted up as often as down (9 / 8), and so did every other
trait, but **learning from others fell in 17 of 18 worlds** (by chance alone about 1 in 7,000). Its size is about what chance gives
on its wider scale (the marker's typical move, scaled to the copying gene's range, is about 0.16; copying moved 0.16) — what is not
chance is the **direction**.

**Interpretation.** The first trait in Genesis to move in one direction beside a neutral yardstick. Not yet known *how*: whether
heavy copiers die more (they copy what others do, including dangerous things), have fewer surviving young, or both, and whether it is
founders dying or children inherited. It agrees with entry 25 ("bred out", two worlds) and not with the 8-world 300-day run (mixed),
which had no yardstick. Real-world note, not a target: people differ in how much they use social information, about a fifth almost
never (Molleman et al. 2014). Next: split the change into deaths and births, and by age; test whether it holds with the mutation
rule 10 × slower.

**Strength.** Moderate for the direction (18 worlds, a sign test), weak for any cause (unmeasured), 100 days only. The registration
changes nothing in the world.

---

### 87. Can the brain learn a chain? Two steps yes, three for half, four no — and memory is not the limit — Nov 2026

> **Correction (18 Nov 2026, after Opus's review `docs/reviews/2026-11-18-opus-learner.md`):** the chain probe puts the chain's states on the hand-sense inputs (`IB+19…23`), which carry the hominin's **inborn hand reflexes** (for example TAKE −4 while holding, +1.6 on the stone/stick inputs), so the "chains of 2 learned, 3 by half, 4–5 none" and the cue-holding figures are mixed up with those reflexes and are **not** a clean measure of the learner. Read them as a trace, not a ceiling; the probe is being fixed (entry 108).

**Version.** 0.9.0 · commit `663b98b` (a measuring tool; the world unchanged). Master plan step 0.3 (F3 and L0, Fable's "measure
before building craft"). `tools/analysis/chain-probe.js` takes children of real founders and runs their brains exactly as the world
does (forward, traces, learning, the one-try boost, backward replay) in a bare task: no hunger, no fear, no others to copy.
**Chain:** N acts in order (take, strike, eat, give, climb), each state shown on the hand senses; reward 1 only at the end; an attempt
ends after 3N steps. Learned = finishing at least half as often as a perfect player over 2,000 steps. **Delay:** one of two cues for
one step, then after D steps the matching act is rewarded; held = 75% right over 500 trials (chance 50%). Budget: a real-length
childhood, 10 years of waking steps (175,200). One change to the test before the full run, after a one-brain trial: two blank steps
between delay trials (without them a reward every step smeared the credit and even "no delay" failed).

**Data.** [Results, each brain's value, and the prediction](../data/findings/87-chain-probe/) (10 brains).

| Task | Learned | Median time (real-length years of waking) | Within the world's squeezed childhood (2,880 steps) |
|---|---|---|---|
| Chain of 2 | 10 / 10 | 0.8 | 0 / 10 |
| Chain of 3 | **5 / 10** | 7.3 | 0 / 10 |
| Chain of 4 | 0 / 10 | — | 0 / 10 |
| Chain of 5 | 0 / 10 | — | 0 / 10 |
| Hold a cue 0 / 1 / 2 steps | 10 / 10 each | 0.7 / 0.4 / 1.3 | |
| Hold a cue 4 steps | 5 / 10 | 4.0 | |
| Hold a cue 8 steps | 1 / 10 | 7.6 | |

**Result.** (1) Chains of 2 learned by all — **held**; most within a squeezed childhood — **not held** (none; about 5 × too slow).
(2) Chains of 3 by most within a real-length childhood — **not held, borderline** (half, late); 4–5 by few or none — **held** (none).
(3) A cue held at 0–1 steps, rarely 2, never 4–8 — **not held: memory is better than expected** (2 steps all, 4 steps half, 8 one).

**Interpretation.** The brain can hold a cue for a few steps (an hour of the world's time) but cannot credit a reward back along a
chain of more than about three acts: the limit for craft is **credit along a chain, not memory**. Two consequences. On the world's
squeezed clock (a childhood of 2,880 steps) not even a two-step chain is learned alone in a childhood, so learning questions need the
real-length clock (F4). And milestone 2 ("a 3-step chain within one real-length childhood") is at the edge: half the brains. Knapping
and carrying stone to a carcass are longer chains than this brain learns alone; in the world, copying the whole path of a skilled elder
(entry 55) and the one-try boost may help, untested here. For comparison, not a target: young chimpanzees take about 3–5 years of
watching to crack nuts (Bossou: Matsuzawa; Inoue-Nakamura & Matsuzawa 1997), a chain of about three acts.

**Strength.** Moderate (10 brains, one bare task, one reward size). Not tested: copying a mother's path, longer budgets, rewards along
the way. **Next:** the master plan's stop rule says milestone 2 decides whether the brain must change; repeat this probe with copying
from a skilled elder before deciding.

---

### 88. The world's rain has a real dry season only at some homes (measuring only) — Nov 2026

**Version.** 0.9.0 · commit `ba315d5` (a measuring tool; the world unchanged). The hungry-season design (master plan 0.4) was reviewed by Fable
(`docs/reviews/2026-11-16-fable-hungry-season.md`): do not build as drafted; first check the rain's own year. Measured with
`tools/analysis/seasons-at-home.js --settle 8 --years 10 --shape` (8 years unmeasured, then 10 years by twelfths of a year, within 4
squares of home), against Uvinza beside Ugalla and Issa, 1973–1989 (Directorate of Meteorology, Tanzania, via J. Moore; saved as
`data/reference/uvinza-rain.csv`: 1,026 mm a year, 88% in November–April, 4 months under 2%). Shapes only: the world's rain has no
real unit, and a squeezed month is 6 hours, always the same hours, so month is mixed with time of day (Fable).

**Data.** [The shapes](../data/findings/88-rain-year/).

| Home (latitude) | Months with under 2% of the year's rain | Share in the wettest six months |
|---|---|---|
| Uvinza, real (5° S) | 4 | 88% |
| World 1 (3°) | 1 | 64% |
| World 2 (5°) | 0 | 56% |
| World 3 (9°) | 1 | 74% |
| World 4 (11°) | 6 | 95% |

**Result.** No prediction (measuring only). Near the equator the rain belt never leaves (`lift` swings only ±8° with the sun), so it
rains all year; at 11° the dry season is too long and too sharp. Only by chance of where the band starts is the year near Uvinza's.

**Interpretation.** A fruit calendar driven by "the square's own rain" (Fable's recommendation) would inherit a wrong year at most
homes. In the real East Africa the rains are shaped by mountains and a low-level jet in the Turkana Channel more than by a simple moving
belt (Nicholson 2018, *BAMS* 99:337; abstract), so there is no single sourced number for the belt's swing on a coarse globe. Choices
(the owner's): give the plants at home a real station's year (Uvinza's shares, a labelled stand-in) now and leave the globe's weather
alone; or fix the globe's rain belt first (a change everywhere, no clean source); or wait for the valley (stage 2), whose rain would come
from a real station. **Strength.** Moderate (4 worlds × 10 years), shapes only.

---

### 89. The fruit calendar: fruit now has a year — lowest late in the rains, highest in the dry months — Nov 2026

**Version.** 0.9.0 · commit after `ba315d5`. Master plan 0.4, the hungry season's first step, as Fable's review advised (one change,
fruit only) with the owner's choice (a real station's year, entry 88). Fruit ripens faster in the dry months of Uvinza's real year
(each month's dryness, averaged to 1 over the year, mirrored by hemisphere, on the life clock), because at Issa "fruit availability
showed a significant inverse relationship to rainfall… peaking in the early dry season", lowest in the late wet season (Piel et al.
2017, *J Hum Evol* 112:57, read in full). Ripe fruit hangs about a month of the year (`SOC.fruitHang`, an assumption; a 3–5 week
ripening phase in one African fruit tree); ripening is scaled so the uneaten year's mean is unchanged. `--fruit-follows-warmth`
restores (identical worlds, checked). Nuts and roots unchanged (no source yet; roots are the year-round fallback). A correction on
the way: the paper Fable cited for "a late-dry-season peak at Issa" (doi 10.1007/s10764-015-9856-y) is about Guinea-Bissau
(Carvalho, Vicente & Marques 2015); the Issa direction comes from Piel 2017 instead.

**Data.** [Fruit by twelfth of a year (4 worlds, both rules), 24 worlds × 100 days (both arms), the prediction](../data/findings/89-fruit-calendar/).
The old-rule arm is entry 86's run (same code; the switch gives identical worlds).

| World | Fruit, highest ÷ lowest twelfth (old → calendar) | Lowest twelfth | Highest | Year's mean fruit (old → calendar) |
|---|---|---|---|---|
| 1 | 1.0 → 1.5 | 3 (rains) | 5 | 0.072 → 0.110 |
| 2 | 1.0 → 1.5 | 4 (rains) | 11 (dry) | 0.125 → 0.116 |
| 3 | 1.0 → 2.5 | 4 (rains) | 10 (dry) | 0.210 → 0.214 |
| 4 | 1.0 → 2.7 | 3 (rains) | 12 (dry) | 0.085 → 0.036 |

| 24 worlds × 100 days (old → calendar) | Old | Calendar | Difference (95% range) |
|---|---|---|---|
| Hunger deaths (sum) | 186 | 172 | −0.6 a world [−2.4, 1.2] |
| People alive at day 100 (mean) | 10.5 | 15.5 | +5.0 [−0.6, 10.6] |
| Bands died out | 6 | 3 | |
| Killed by predators (sum) | 278 | 220 | −2.4 [−4.9, 0.0] |
| Died of thirst (sum) | 1 | 6 | +0.2 [0.0, 0.4] |

**Result.** (1) Identical worlds with the switch — **held**. (2) Fruit highest in the dry months, lowest late in the rains, at least
3 × — **partly held**: lowest in the rains in 4 of 4 worlds, highest in dry months in 3 of 4, but only 1.5–2.7 ×. (3) The year's
mean within 20% — **held in 2 of 4 worlds** (all four together: 0.123 → 0.119). (4) Hunger deaths no clear change — **held**.

**Interpretation.** The world has a fruit year for the first time, in the direction the Issa record shows. The swing is gentler than
expected: eating and the cap on how much fruit a tree holds flatten the dry-season peak, and a twelfth of the squeezed year is 6 hours,
always the same hours, so the fruit measure also carries day and night (Fable). The worlds' means differ because the bands differ, not
only the rule. As predicted, bodies do not feel a season 18 hours long: the body-side test (hunger, fallback eating, weight) waits for
the real-length year (F4/A40). Fewer predator deaths and more surviving bands are within chance here; the thirst deaths (1 → 6) are
small numbers, noted. **Next for the hungry season:** nuts by season (a source first), roots regrowing by season (unsourced), and the
high-to-low ratio from Piel's Figure 3 (to read).

**Strength.** Moderate for the fruit's year (4 worlds × 10 years, both rules); weak for any effect on the hominins (100 days, 3-day year).

---

### 90. Hunts measured before building detectable hunts: success too high, leopards eat too little, sabre-tooths too much (measuring only) — Nov 2026

**Version.** 0.10.0 (a measuring tool; the world unchanged). Master plan 0.5 (F1), Fable's rule: judge hunters by kills per hunter per
day against need, and source detection and success separately. `tools/analysis/hunt-measure.js` (default world, 3 worlds × 20 days):
an attack is a hunter that tried (its attack wait just set); kills are the world's own counter, shared among the kinds that attacked
in that step.

**Data.** [The table](../data/findings/90-hunts-measured/).

| Hunter | Success per attack (15 min) | Kills per hunter per real day | Meat eaten per hunter per real day | Field / registered |
|---|---|---|---|---|
| Spotted hyena | 36% | 0.29 | 3.7 kg | need 3.8–4.0 kg |
| Leopard | 46% | 0.39 | 2.6 kg | need 3.5–4.9 kg; one kill every 5.6 days (0.18 a day; Odden & Wegge 2009); success 14–38% |
| Sabre-tooth | 53% | 0.86 | 13.7 kg | need 8.4 kg (an assumption, by Kleiber's law) |

**Result.** No prediction (measuring only). Success per attack is above the field ranges for all three (lions 15–30%, Schaller 1972;
leopards 14–38%). Leopards kill twice as often as in the field but eat about 60% of their need (small prey, eaten by others, or stolen:
not traced); sabre-tooths eat 1.6 × their registered need. Hyenas eat about their need.

**Interpretation.** Detectable hunts (prey that sees an attack coming makes it fail) should lower success per attack; whether hunters
then eat their need depends on how often they try and what they catch. These are the numbers the change must be judged by, per kind,
not success alone. **Strength.** Weak (3 worlds × 20 days); a 24-world run before the change is the baseline.

---

### 91. Tracing the hunters before F1: few attacks on sleepers, and sabre-tooths attack when full (measuring only) — Nov 2026

**Version.** 0.10.0 (measuring only; the world unchanged — identical worlds checked). Fable reviewed detectable hunts
(`docs/reviews/2026-11-16-fable-detectable-hunts.md`): do not build yet; faithful for stalking cats, not for hyenas (they run prey down);
trace the leopard's low meat and the sabre-tooth's many kills first. The world now keeps a record of each hunter's attack when a tool
asks for it (`HUNTLOG`; changes nothing); `tools/analysis/hunt-measure.js` counts adult hunters only. The hunters' base success
(0.6, 0.9 on sleepers and young) was unregistered: now `SOC.atkP`, `SOC.atkEasy`, same numbers, registered as an assumption.

**Data.** [The table](../data/findings/91-hunt-trace/) (3 worlds × 20 days; attacks by adult hunters).

| | Hyena | Leopard | Sabre-tooth |
|---|---|---|---|
| Success per attack | 35% | 45% | 52% |
| Kills per adult hunter per real day (field) | 0.35 (not found) | 0.44 (0.14–0.18) | 0.91 (stand-ins: jaguar 0.23, puma 0.12–0.18) |
| Attacks on sleepers / young / eating prey | 8% / 0% / 6% | 7% / 4% / 8% | 11% / 0% / 15% |
| Kills by wounds | 0 | 1 | 0 |
| Whole animal per clean kill (field) | 83 kg | 23 kg (about 22) | 61 kg |
| Prey of clean kills | antelope 68, buffalo 6 | antelope 48, hare 27, leopard 2 | antelope 185, buffalo 8, hare 3 |
| Energy at attack (mean); attacks when well fed (80+) | 82; 62% | 70; 33% | 89; **80%** |

**Result.** No prediction (measuring only). Most attacks are on awake prey, so detection (F1) matters; sleepers are not the fault.
Kills by wounds are negligible. Leopards take prey of the field's size; their low meat a day (entry 90) is not the prey mix — left to
trace: what happens to the rest of a carcass, and cubs counted in the meat ledger. **Sabre-tooths attack when full** (80% of attacks
at energy 80 or more), so they kill 4–7 × the stand-ins' rate; real cats seldom kill when full (surplus killing rare: Kruuk 1972).
Two leopards were killed by leopards (noted).

**Trace (same worlds, `--hunt-pull-fixed 0`, measuring only).** With the fixed part of the inborn pull removed, sabre-tooths still
attack when full in 61% of attacks (was 80%) and kill 0.61 a day (was 0.91); leopards 25% (was 33%), hyenas 30% (was 62%). So the
fixed pull is a small part; **most is learned**: reward is the fall of a drive, and a full hunter's hunger drive is near 0 (3 × 0.11²),
so eating barely rewards it — but "prey beside me → attack", learned while hungry, carries over when full, and a failed attack costs
little, so nothing unlearns it.

**Interpretation.** Before detection is built, what makes a real cat stop hunting when full must be found and sourced: how strongly
satiety damps the urge (Adamec 1976 shows fed cats still attack, but less), and what a rush costs (energy, injury risk). A design
question for review. Detection would lower kills for the wrong reason if
this stays. **Strength.** Weak (3 worlds × 20 days).

---

### 92. A satiety brake: full hunters stop attacking — but more hominins are killed (built, not released) — Nov 2026

**Version.** 0.10.0 · commit `f02924e`. Fable reviewed "why full hunters keep hunting" (`docs/reviews/2026-11-17-fable-full-hunters.md`):
a rush costs nothing, a full hunter's hunger hardly falls (hunger is scaled to the 25-day store, not the meal), and "energy 80+" is not
"full". Built: an inborn pull against attacking that grows with stomach fill, 12 × fill (the hungry pull's size, borrowed; tested 6 and
24), `--no-full-brake` restores (identical worlds). Measured with `tools/analysis/hunt-measure.js`, 24 worlds × 20 days, adult hunters;
the stomach and hours since swallowing are read **before** each attack (a first version read them after a kill had been swallowed and
was discarded; a first baseline was spoiled because the tool re-reads the code for each world while the code was being changed —
rerun cleanly; neither reached this log).

**Data.** [All four arms and the prediction](../data/findings/92-full-hunters/).

| | Before (brake off) | Brake 6 | Brake 12 | Brake 24 |
|---|---|---|---|---|
| Attacks on a stomach over ⅔ full: hyena / leopard / sabre-tooth | 23% / 20% / 22% | 1% / 0% / 1% | 0% / 0% / 0% | 0% / 0% / 0% |
| Chance of attacking with prey beside, stomach ⅓–⅔ full (sabre-tooth) | 24% | 4% | 1% | 0% |
| Kills per adult per day: hyena / leopard / sabre-tooth | 0.40 / 0.49 / 0.64 | 0.38 / 0.38 / 0.43 | 0.29 / 0.36 / 0.42 | 0.30 / 0.36 / 0.48 |
| Meat per adult per day: hyena / leopard / sabre-tooth (need 3.9 / 4.2 / 8.4) | 5.9 / 4.3 / 14.0 | 6.3 / 4.2 / 13.2 | 5.7 / 4.2 / 12.7 | 6.2 / 4.4 / 12.8 |
| **Hominins killed by hunters** (all kinds) | **29** | **64** | **43** | **41** |
| Hunters killed by their own kind | 46 | 55 | 66 | 51 |

**Result.** (1) Identical worlds with the switch — **held**. (2) Attacks on a stomach over ⅔ full under 10% — **held** (0–1%).
(3) Sabre-tooth kills to about 0.4–0.6, not the field's 0.12–0.23 — **held** (0.42–0.48). (4) Sabre-tooth meat toward need from above,
leopard meat not falling — **held** (14.0 → 12.7–13.2; leopard 4.2–4.4). (5) No sign of hunters starving — kills and meat hold for
leopards and hyenas; starvation deaths not measured by this tool. **Not predicted: hominins killed by hunters rose from 29 to 41–64.**

**Interpretation.** The brake does what a full stomach does in a real cat: a full hunter lets prey pass. Sabre-tooths still kill 2–3 ×
their stand-ins and eat 1.5 × their need (the remaining steps Fable listed: digestion by size, the energy cap that throws meat away).
The rise in hominins killed is a warning, not yet explained: perhaps hunters that skip prey while full are hungrier later and attack
whatever is beside them, or the 20-day worlds differ by chance (hominin deaths are few). **Do not release** until a 24-world × 100-day
run with predator deaths of hominins by age shows whether it is real. Hunters killing their own kind (46 before) was already there.

**Strength.** Moderate for the brake's effect on hunters (24 worlds, three strengths, same direction); weak for the hominin rise.

---

### 93. The satiety brake over 100 days: hominins killed by hunters rise by half — not released — Nov 2026

**Version.** 0.10.0 · commit `f02924e` (the brake). The release condition set in entry 92 and the handover: run 24 worlds
× 100 days with and without the brake, and release only if the rise in hominins killed by hunters is not real or is explained. No
numeric prediction was written for this check (the condition above was the test). The brake-off arm reproduces entry 89's calendar run
to the digit (people alive 15.5 ± 15.8, 172 hunger deaths, 220 predator deaths): worlds are repeatable.

**Data.** [Both arms and the comparison](../data/findings/92-full-hunters/) (`long-off.csv`, `long-on.csv`, `long-compare.txt`).

| 24 worlds × 100 days (brake off → on) | Off | On | Difference (95% range) |
|---|---|---|---|
| **Hominins killed by a predator (sum)** | **220** | **324** | **+4.3 a world [+1.1, +7.6]; higher in 17, lower in 6** |
| Died of their wounds (sum) | 138 | 168 | +1.3 [−0.2, +2.7] |
| Burned (sum) | 90 | 36 | −2.3 [−4.0, −0.5]; lower in 10, higher in 2 |
| Hunger / thirst (sum) | 172 / 6 | 180 / 14 | +0.3 [−1.6, +2.3] / +0.3 [−0.1, +0.7] |
| People alive at day 100 (mean) | 15.5 | 13.1 | −2.4 [−7.7, +2.8] |
| Plant-eaters at day 100 (mean) | 65.5 | 55.8 | −9.7 [−16.7, −2.6]; lower in 17 |
| Hunters at day 100 (mean) | 15.0 | 14.5 | −0.5 [−2.1, +1.1] |
| Bands died out | 3 | 4 | |

**Result.** The rise seen in entry 92 (29 → 41–64 over 20 days) is **real**: hominins killed by hunters go up by about half over 100
days, in most worlds. It is not yet explained. Release condition: **not met** on its own terms (entry 94 measures it against the real predation rate and releases it).

**What is not known (listed, not guessed).** Why. Candidates, each to be tested: (a) hunters that skip prey while full are hungrier
later and attack whatever is beside them, hominins included (in entry 92's prey lists, clean kills of hominins rose for hyenas, 11 →
15–37, and leopards, 7 → 11–19, and stayed about the same for sabre-tooths, 11 → 9–14); (b) with fewer plant-eaters killed (down 10 of 66), hunters turn to the
next prey; (c) hunters stand near the band more. Side effects with no explanation yet: burned deaths fall by 60% (90 → 36), plant-eaters
fall by 15%, thirst deaths rise (6 → 14, small numbers). **Strength.** Moderate (24 worlds × 100 days, paired, same seeds).

**Next.** Trace who the hunters attack (age, asleep, near the band) with and without the brake (`HUNTLOG` already records prey,
asleep, young); then decide: keep the brake with a fix, drop it, or make it part of a larger change with detection (F1). One change at a
time; do not adjust the brake's strength toward fewer hominin deaths.

---

### 94. Why more hominins die with the satiety brake — and the rate is still the real one (measuring only) — Nov 2026

**Version.** 0.10.0 · commit `60321b2` (the brake) + a measuring tool. Entry 93 found hominins killed by hunters rise from 220 to 324
over 24 worlds × 100 days with the brake. Traced with `tools/analysis/hominin-attacks.js` (24 worlds × 20 days, both arms, adult hunters;
the attack record `HUNTLOG`), then measured against the real predation rate.

**Data.** [Both traces](../data/findings/94-why-more-hominins/); the 100-day arms are entry 93's.

| 24 worlds × 20 days (brake off → on) | Hyena | Leopard | Sabre-tooth |
|---|---|---|---|
| Time very hungry (energy under 15) | 5% → 4% | 4% → 5% | 2% → 3% |
| Time within a square of a hominin | 0.3% → **1.1%** | 0.5% → 0.6% | 0.3% → 0.1% |
| Time within a square of its own kind | 46% → 47% | 30% → **40%** | 48% → 53% |
| Attacks on hominins (kills) | 16 (11) → 20 (15) | **9 (7) → 23 (19)** | 22 (11) → 11 (9) |
| Hunter's energy at attacks on hominins | 68 → 65 | 92 → 67 | 41 → 80 |
| Attacks on its own kind (only when starving) | 35 → 44 | 14 → 53 | 10 → 16 |

| 24 worlds × 100 days | Predator deaths per hominin-year | Median world | Range |
|---|---|---|---|
| Brake off | 1.53% | 1.02% | 0–11.0% |
| Brake on | 2.14% | 1.96% | 0–9.1% |
| **Real primates** (24 populations: Cheney & Wrangham 1987, reviewed by Isbell 1994, *Evol Anthropol*; entry 76) | | **median about 3%** | **0–15%** |

**Result.** No prediction (a trace). "Hunters starve later and attack anything" is **not supported**: time spent very hungry is the
same. The rise has no single cause: **hyenas spend almost 4 × more time beside the band**; **leopards are not nearer but attack hominins
more when they are**, hungrier at that moment (energy 67 against 92); sabre-tooths attack hominins less. Full hunters no longer kill and
move on: they linger near the herds, near each other (leopards 30% → 40% of the time beside another leopard, and more fights among
them) and, for hyenas, near the band. The counts are small (tens of attacks), so this is a lead, not proof. The fall in plant-eaters in
entry 93 is **not** fewer animals: on the prey map herds are shown only where someone is (`src/preymap.js`), so it means hunters are
spread over fewer places. Burned deaths (90 → 36) remain **unexplained**.

**Interpretation.** Measured against the real record, the brake moves hominin predation **toward** the real median (1.5% → 2.1% a year,
the primate median about 3%), inside the real range in both arms. By the realism rules a faithful mechanism is not rejected because
more creatures die; it is judged against the field. The brake is kept and released (0.10.0). Hunters lingering beside the band is
itself worth checking against the field later (do real hyenas rest near primate groups?), with detection (F1) and the hominins' own
alertness. **Strength.** Moderate for the rate (24 × 100 days, paired); weak for the causes (20 days, tens of attacks).

### 95. Every discovery counted each time, and split by sex (measuring only) — Nov 2026

**Version.** 0.10.0 + commit `210474c` (the counter; measuring only). Master plan step 0.6 (F5, G13).

**Data.** [The table and the prediction](../data/findings/95-repeats/) (`repeats.csv`, `repeats-table.txt`). Command:
`nice -n 19 node tools/experiment.js --seeds 1-24 --days 100 --workers 4 --out data/findings/95-repeats/repeats.csv`, then
`node tools/analysis/repeats.js data/findings/95-repeats/repeats.csv`.

**Added.** Until now the world recorded only the *first* time anything happened. Now, at every place a first is recorded, the world
also counts every time a hominin does it, how many different hominins did it, and how many of those were female (`rep_X`, `who_X`,
`whoF_X`). Nothing about any creature changes and no random number is drawn: the identical-worlds check (seeds 1–2 × 20 days against
the commit before) gave **IDENTICAL**. How some acts are counted: *shared* is credited to the hominin whose saying made the word shared;
*kept* counts every feed while keeping a fire going; *shelter* counts every hour asleep in one; *speak* every call with the word voice.
Other kinds reaching the same code (plant-eaters poisoned by berries, animals in pits) are kept apart, not counted.

**Test.** 24 worlds × 100 days, default settings, 15,161 hominin-life-years (a year is 3 days). A hominin is born female with chance ½,
and the everyday acts done by nearly everyone (fruit 49%, take 50%, speak 49% female) show that the living are about half female.

| Discovery | Worlds | Times | Per 1,000 hominin-life-years | Hominins per world, median (range) | Hominins | Female % (95%) |
|---|---|---|---|---|---|---|
| take (picks something up) | 24/24 | 67,784 | 4,471 | 50 (31–77) | 1,234 | 50 (47–52) |
| fruit | 24/24 | 105,878 | 6,983 | 49.5 (25–80) | 1,239 | 49 (46–52) |
| root | 24/24 | 7,964 | 525 | 39 (19–62) | 956 | 49 (46–52) |
| dig (with a stick) | 24/24 | 7,293 | 481 | 34.5 (18–64) | 867 | 49 (46–52) |
| nut | 24/24 | 6,638 | 438 | 24 (12–38) | 576 | 48 (44–53) |
| meat | 24/24 | 12,400 | 818 | 26 (13–38) | 612 | 48 (44–52) |
| flake | 24/24 | 657 | 43 | 13 (5–25) | 311 | 51 (45–56) |
| marrow | 24/24 | 1,656 | 109 | 8 (3–17) | 211 | **41 (35–48)** |
| leaves | 24/24 | 26,398 | 1,741 | 15.5 (5–38) | 426 | 55 (51–60) |
| butcher (cuts meat with a flake) | 15/24 | 418 | 28 | 1.5 (0–6) | 47 | **32 (20–46)** |
| hunt (brings down a land animal) | 6/24 | 69 | 4.6 | 0 (0–11) | 37 | **70 (54–83)** |
| cooked (eats wildfire-cooked food) | 15/24 | 65 | 4.3 | 1 (0–11) | 53 | 36 (24–49) |
| brand (takes up a burning stick) | 12/24 | 57 | 3.8 | 0.5 (0–8) | 37 | **30 (17–46)** |
| setfire | 5/24 | 17 | 1.1 | 0 (0–2) | 7 | 14 (3–51) |
| fed (a fire) | 6/24 | 6 | 0.4 | 0 (0–1) | 6 | 50 (19–81) |
| kept, madefire, rubfire, shelter | 0/24 | 0 | 0 | 0 | 0 | — |
| share (feeds a hungry child) | 24/24 | 9,770 | 644 | 13 (7–23) | 302 | **100 (99–100)** |
| vicar (fear from seeing another hurt) | 24/24 | 35,859 | 2,365 | 38.5 (25–69) | 928 | 51 (48–54) |
| swim | 22/24 | 105 | 6.9 | 3 (0–18) | 105 | 52 (43–62) |
| point | 24/24 | 620 | 41 | 15 (7–29) | 390 | 48 (44–53) |
| joint (goes where another pointed) | 23/24 | 88 | 5.8 | 3 (0–7) | 79 | 44 (34–55) |
| speak | 24/24 | 467,940 | 30,864 | 54.5 (36–81) | 1,301 | 49 (46–51) |
| shared (a word becomes shared) | 24/24 | 2,791 | 184 | 26 (1–65) | 635 | 51 (47–54) |
| tree / treeflee / pit / rotten / berries | | | | | | 48–52 |

The pooled interval treats hominins as independent, but they cluster by world. Counted world by world (worlds where the act was done by
more females than males, against more males): **butcher 2 against 12**, **brand 0 against 9**, marrow 6 against 18, setfire 0 against 4;
**hunt 4 against 1** (37 hunters in 6 worlds; seed 6 alone gives 11). Butcher, brand and marrow lean male in most worlds; the hunting
lean toward females rests on five worlds and is not yet more than a hint.

**Result.** Against the prediction written before the run:
1. Everyday acts by nearly everyone, thousands of times — **held** (take, fruit, root, nut, meat).
2. Tool and fire acts rare and by 1–3 — **mixed.** Held for butcher, setfire, fed, kept and the fire-making acts (none, as expected).
   **Not held for flake and dig:** flakes were struck in all 24 worlds by a median of 13 hominins, and roots dug with a stick by 34.5 a
   world, 7,293 times. Since entry 85 these are acts (a strike), and they became habits of many, not one-offs.
3. Sharing by mothers only — **held** (302 of 302 sharers female), as the hominin-era care rule (`apeCare`) says. This also checks the counter.
4. Hunting more often by males — **not held**: 70% of the hunters were female, in 4 of the 5 worlds with a clear lean. The reason given
   was wrong: a hominin's chance in an attack does not depend on its body size in the model (`src/sim.js`, the `pc` for `a.sp === 0`).
   The cause is not measured.
5. No sex difference in take, nut, root, meat, flake, swim, point or speak (all within 35–65%) — **held** (48–52%).
6. Shared words a few times a world at most — **not held**: on average 116 words became shared per world (2,791 in all), by a median of
   26 hominins a world.
   **Caveat added 17 Nov (Opus's review, `docs/reviews/2026-11-17-opus-human-style-words.md`; an estimate, not a run):** this count is probably chance collisions in a
   144-form sound space counted over the whole world, not convergence: speech is replaced by random mouth choices 70–100% of the time at founder vocal control 0–0.3, and `shared`
   needs only three speakers and ten uses anywhere in the world. Read "not held" as "the test cannot tell chance from convergence". The sex split for `speak` stands.

Not in the prediction: cutting meat with a flake (32% female), taking up burning sticks (30%) and cracking bones for marrow (41%) lean
male across worlds; eating leaves leans a little female (55%).

**Interpretation.** Counting only firsts hid that flaking and stick-digging are now habits across the band, while butchery and fire
stay rare. The sex differences arise without any rule that treats the sexes differently in these acts; the one obvious candidate is the
mother's pull toward her young child (`SOC.momPull`), which keeps mothers near the infant and may keep them away from carcasses and
fires — **not tested**. Against the real record: among Gombe chimpanzees adult and adolescent males made 89% of red colobus kills in
1982–1991 (Stanford et al. 1994, *Am J Phys Anthropol* 94:213), but at Fongoli, Senegal, tool-assisted hunting of bushbabies is done
mostly by females and immatures (Pruetz & Bertolani 2007, *Curr Biol* 17:412; Pruetz et al. 2015, *R Soc Open Sci*). The model's
hominin "hunt" is grabbing small prey, closer to Fongoli's hunting than to Gombe's monkey chases — so a female lean is not against
the record, but it is not explained either. The "split every learning measure by sex" half of step 0.6 is done for discoveries; the
other learning measures (chain probe, copying) are still to split.

**Strength.** Moderate for the counts and the everyday acts (24 × 100 days, hundreds of individuals); weak for the rare acts and
the hunting lean (tens of individuals, clustered in a few worlds). **Lesson.** Measure repeats and who, not only firsts: a "first"
can be a one-off or the start of a habit, and the two look the same in a first-day table.

### 96. Without the mother's pull, the male lean in butchery and fire acts mostly goes — and the band is smaller (measuring) — Nov 2026

**Version.** 0.10.0 + code of commit `210474c` (unchanged `src/` since); the arm is the existing switch `--no-mother-pull`.

**Data.** [Prediction, table and run](../data/findings/96-mother-pull-repeats/); baseline is entry 95's table. Command:
`nice -n 19 node tools/experiment.js --seeds 1-24 --days 100 --workers 4 --no-mother-pull --out data/findings/96-mother-pull-repeats/repeats.csv`.

**Test.** Entry 95 found that cutting meat with a flake (32% female), taking up burning sticks (30%) and cracking bones for marrow (41%)
lean male, with no rule treating the sexes differently except the mother's pull toward her nursing child (`SOC.momPull`). Same 24 worlds ×
100 days, pull on (entry 95) against off (a mother goes to her child only when it cries). The worlds differ from the first mother's first step,
so the comparison is of means, not of the same events.

| 24 worlds × 100 days, pull on → off | Repeats per 1,000 hominin-life-years | Hominins who did it | Female % | Worlds |
|---|---|---|---|---|
| butcher (cuts meat with a flake) | 28 → 45 | 47 → 35 | **32 → 43** | 15 → 12 |
| brand (takes up a burning stick) | 4 → 5 | 37 → 45 | **30 → 44** | 12 → 12 |
| cooked (eats wildfire-cooked food) | 4 → 5 | 53 → 59 | **36 → 54** | 15 → 18 |
| marrow | 109 → 143 | 211 → 205 | 41 → 45 | 24 → 23 |
| hunt | 5 → 5 | 37 → 38 | 70 → 58 | 6 → 8 |
| take, fruit, root, nut, flake, point, speak | within about 10% | | 48–52 → 49–52 | 24 → 24 |
| meat | 818 → 992 | 612 → 580 | 48 → 47 | 24 → 24 |
| leaves | 1,741 → 1,131 | 426 → 380 | 55 → 54 | 24 → 24 |
| share (feeds a hungry child) | 644 → 669 | 302 → 252 | **100 → 100** | 24 → 24 |

Butchery, burning sticks and cooked food together: **33% female (45 of 137 hominins) → 48% (67 of 139)**, z = 2.6 (pooled, treating hominins as
independent; they cluster by world, so this is an upper bound on the strength). World by world the three acts do not agree: butchery repeats rose
in 7 worlds and fell in 12, burning sticks 8 up and 6 down, cooked 7 and 6.

**Result.** Against the prediction written before the run:
1. Female share of butcher, brand and marrow rises toward 50% — **held in direction** (butcher 32 → 43, brand 30 → 44), marrow 41 → 45 just short of the 46 I wrote.
2. Hunting (70% female) not moving by more than chance — **inconclusive**: 70 → 58 on 37 and 38 hunters in 6 and 8 worlds cannot be told from chance.
3. Everyday acts stay near 50% — **held** (47–55% in all).
4. Repeats of butchery, burning sticks and marrow rise by under 30% — **not held** for butchery (+60%) and marrow (+31%), burning sticks +25%.
5. Sharing stays 100% mothers — **held**; the number of feeds per life-year did not fall (644 → 669).
The "not held" criterion (all three shares within 5 points) was not met: butchery moved 11 points and burning sticks 14.

**Not in the prediction.** Without the pull the band is smaller: hominin-days lived fell from 1,895 to 1,621 a world (paired difference −274, standard
error 151; lower in 15 of 24 worlds) and worlds where people died out rose from 4 to 5; deaths in all fell (1,013 → 942, hunger 180 → 161, thirst 14 → 5).
The band is smaller although fewer hominins die, so the cause is not deaths; fewer births is the obvious candidate but **was not measured**. The paired difference is about 1.8 standard errors: a hint, not a finding.

**Interpretation.** The mother's pull is a plausible cause of part of the male lean: where mothers of young children are kept near them, they are less
often among those who cut meat or take up burning sticks. The effect is moderate in size and weak in evidence (35–59 hominins an act, worlds that do
not agree). The pull is not shown to be the *only* cause: the acts still lean slightly male (butchery 43%, marrow 45%) and the hunting lean (70% female
on 37 hunters) is not explained by it. **Strength.** Weak to moderate: one pooled contrast of 137 against 139 hominins, clustered by world, a single run
of 24 worlds. **Lesson.** A sex difference that arises without any rule about sex can still be traced to a rule that bears on one sex only (here, who
has a young child): switch it off and count again, before reading anything into the lean.

### 97. The eye reports what a thing looks like, not how much the body needs it — the world gets smaller, and behaviour changes a lot — Nov 2026

**Version.** 0.11.0 · commit of the switch `96d4fac`, default flipped after this entry. Fable's labelled-senses review (`docs/reviews/2026-11-17-fable-labelled-senses.md`) found
that the food and water channels the brain is handed were multiplied by hunger and thirst (`0.15 + hunger`, `0.15 + thirst`, `src/senses.js` `sense()`): the eye reported how
much the body needed a thing, not what it looked like. Hunger already reaches the brain by its own inputs (`x[IB]`, `x[IB+1]`). This applies to every kind (hominins, plant-eaters,
hunters, fish).

**Data.** [Prediction, both tables, the comparison](../data/findings/97-eye-reports-looks/) (`honest-eye.csv`, `comparison.txt`; the old-rule table is entry 95's `repeats.csv`: same
code at its default, checked IDENTICAL by `tools/identical-worlds.sh` on seeds 1–2 × 20 days). Command: `nice -n 19 node tools/experiment.js --seeds 1-24 --days 100 --workers 4
--no-need-weighted-eye`, then `node tools/analysis/compare-arms.js data/findings/95-repeats/repeats.csv data/findings/97-eye-reports-looks/honest-eye.csv`.

| 24 worlds × 100 days, old eye → honest eye | | |
|---|---|---|
| Hominin-days lived, mean a world | 1,895 → **1,461** | paired by seed −434 ± 159 (lower in 17 of 24 worlds) |
| People alive at day 100, mean | 13.1 → **9.3** | worlds where everyone died 4 → 6 |
| Hunger deaths per 1,000 hominin-life-years | 11.9 → **15.7** (+32%) | 180 → 184 deaths |
| Thirst deaths | 14 → **0** | |
| Killed by a predator, per 1,000 | 21.4 → **33.0** (+54%) | 324 → 386 |
| Deaths from wounds, per 1,000 | 11.1 → **3.9** (−65%) | 168 → 46 |
| Burned, drowned | 36 → 16, 3 → 6 | |
| Repeats per 1,000 hominin-life-years: take | 4,471 → **2,457** | |
| nut / flake / butcher / marrow | 438 → 169, 43 → 22, 28 → 5, 109 → 45 | |
| leaves / fruit / share / speak | 1,741 → **165**, 6,983 → 4,767, 644 → 432, 30,864 → 16,522 | |
| swim / joint (goes where another pointed) | 7 → **20**, 6 → 15 | |
| dig / meat / point | 481 → 541, 818 → 876, 41 → 46 | roughly unchanged |

**Result.** Against the prediction written before the run:
1. Hunger deaths up by 10–60% a life-year — **held** (+32%).
2. Hunters attack more while full — **not measured** by this table (needs `hunt-measure.js`); the rise in predator deaths of hominins (+54% a life-year) fits it but is not proof.
3. Thirst deaths up — **not held**: 14 → 0. The water channel is now always at full strength where there is water, so everyone finds it.
4. Discoveries, births and sex shares within seed noise — **not held**: repeats a life-year fell by 45% (take), 61% (nut), 91% (leaves), 82% (butcher), 46% (speak).
5. The stop rule (everyone dead in more than 12 of 24 worlds) — **not met**: 6 of 24.
**Not predicted:** deaths from wounds fell by about two thirds (cause unexplained), swimming nearly tripled, the female share of marrow and leaves moved (41 → 51%, 55 → 63%; small counts).

**Decision (the rule written before the run).** The honest eye is the realism rule and the world did not collapse, so it becomes the default (`needWeightedEye` is off; the old eye
is `--need-weighted-eye`). **Every earlier table (entries 1–96) was made with the old eye; compare new runs with old ones only with `--need-weighted-eye`.**

**Interpretation.** The old multiplier did much of the work of directing hungry creatures to food and water; without it, hominins live smaller lives (23% fewer hominin-days, 6 worlds
emptied) and do fewer of the everyday acts a life-year. That means the old results on survival and discovery partly rested on a cue no real eye gives: not a reason to keep it, but a
reason to read earlier numbers as "with a kind eye". The large drop in leaf eating and picking things up is **unexplained** (a smaller or hungrier band? less pull to food when full?)
and is the first thing to trace; the wounds, predator-death and thirst changes are too. Nothing was tuned.
**Strength.** Moderate for the population and the cause-of-death shifts (24 worlds, paired, 2.7 standard errors for hominin-days); weak for the causes (none traced).
**Lesson.** A cue the world gives for free can carry behaviour that looks like learning; removing it and re-measuring is how to find out how much.

### 98. The reality checks with the honest eye: the same three of seven pass, but the band is smaller and babies die less — Nov 2026

**Version.** 0.11.0 (honest eye the default) against the old eye (`--need-weighted-eye`). Every earlier table used the old eye (entry 97), so the baselines for the faithful-day table (master plan 0.8)
had to be made again.

**Data.** [Prediction, both tables, both runs](../data/findings/98-baselines-honest-eye/) (`table-honest.txt`, `table-old.txt`, one file per world). Command: `node tools/analysis/reality-check.js SEEDS 100 OUT [--need-weighted-eye]`
for seeds 1–24 in four processes, then `--summary OUT`. 24 worlds × 100 days (about 33 life-years) per arm.

| Check (real band) | Old eye | Honest eye (default) |
|---|---|---|
| Babies dying in their first year (10–25%) | 9.6% (69 of 718): fails, just under | **4.2%** (21 of 495): fails, far under |
| Born who reach age 15 (30–60%) | 40.5% pass | 41.3% pass |
| Life expectancy at birth (13–33 y) | 15.9 pass | 14.7 pass |
| Years between births (5.0–6.5) | 5.3 pass | 5.3 pass |
| Age at first birth (12.5–15.5 y) | 15.8 fails (high) | 16.1 fails (high) |
| Population change a year (−1 to +1.5%, an assumed band) | −2.0% fails | **−3.1%** fails |
| Deaths from illness (15–60%, an assumed band) | 8.8% fails | 8.3% fails |
| Rows passing (of the 5 with sourced bands) | 3 of 7 (3 of 5) | 3 of 7 (3 of 5) |
| Births followed / worlds that died out | 727 / 4 of 24 | **498 / 6 of 24** |
| Causes of death | predator 32%, old age 19%, hunger 18%, **wounds 17%**, illness 9%, burned 4%, thirst 1%, birth 1% | **predator 44%**, hunger 21%, old age 18%, illness 8%, **wounds 5%**, burned 2%, drowned 1% |

**Result.** Against the prediction written before the run:
1. Life expectancy and survival to 15 lower or equal — **held**: life expectancy 15.9 → 14.7 years (no interval computed), survival to 15 40.5% → 41.3% (a difference of 0.8 points, z = 0.2: noise).
2. Babies dying in their first year equal or higher — **not held, the opposite**: 9.6% → 4.2% (z = 3.5, pooling babies from worlds as independent, so the strength is overstated). The cause is not traced; deaths from wounds fell from 17% to 5% of all deaths, and
   the old arm's babies may have been dying of wounds.
3. Population change more negative — **held**: −2.0% → −3.1% a year.
4. Share of deaths from illness lower — **held, but only just** (8.8% → 8.3%): not a difference.
5. Birth spacing and age at first birth within 10% — **held** (5.3 and 5.3; 15.8 and 16.1).
6. Rows that passed with the old eye: **none changed**; the same three pass and the same four fail. No band was moved.
Not held: only item 2. The stop conditions (survival or life expectancy rising by more than noise; spacing or first birth moving by more than 10%) were not met.

**Interpretation.** The honest eye leaves the life-history numbers of those who live almost as they were (survival, life expectancy, spacing, first birth) and changes **how many live**: 31% fewer births followed, six worlds emptied
instead of four, and predators the leading killer (44% of deaths against 32%). It does not mend the rows that failed before. **Both arms fail the population row** (a shrinking band, −2.0% and −3.1% a year, against a real stable
band), the babies row (too few infant deaths) and the age at first birth (too high); the illness band is an assumption. Those are the first fails of the faithful-day table whichever eye it uses. This table is the baseline for step 0.8:
**the default (honest eye) numbers are the ones to carry.** Not explained: why infant deaths halve (the guess is fewer wound deaths among babies; not measured), and why wound deaths fall by two thirds (entry 97).
**Strength.** Moderate for the cause-of-death shifts and the births followed (24 worlds, 498–727 births); weak for the infant-death cause (not traced); the row-by-row pass/fail status is unchanged. **Lesson.** A change that moves the
population by a quarter can leave every life-history average where it was: check numbers of creatures as well as averages of them.

### 99. Why the honest eye changed so much: with the old eye hominins stood still striking — and carried babies attacked buffalo (a bug) — Nov 2026

**Version.** 0.11.0, measuring only: `tools/analysis/trace-eye.js` (follows every hominin every step; changes nothing) and `tools/analysis/baby-deaths.js`. The question: entry 97 found picking things up −45%,
nut-cracking −61%, leaf eating −91%, wound deaths −65%, predator deaths +54% with the honest eye, all unexplained.

**Data.** [The trace, both arms, the comparison and the baby check](../data/findings/99-why-the-honest-eye-changed-so-much/). `node tools/analysis/trace-eye.js SEEDS 100 OUT [--need-weighted-eye]` for seeds 1–24 in four
processes, then `--compare OLD NEW`; `node tools/analysis/baby-deaths.js SEED` for seeds 1–3.

| 24 worlds × 100 days, old eye → honest eye | Babies (carried, under 2) | Children | Adults |
|---|---|---|---|
| Share of awake steps **striking** | **30.9% → 8.8%** | **52.4% → 9.8%** | **36.3% → 7.1%** |
| Squares moved per 100 awake steps | 0.9 → 4.6 | 0.7 → 5.1 | 1.7 → 6.6 |
| Taking something up / attacking | 8.2% → 4.7% / **6.7% → 3.7%** | 4.8% → 3.2% / 0.6% → 0.7% | 4.9% → 2.8% / 0.6% → 0.6% |
| Steps in a lake or the sea | 1.2% → 3.1% | 0.8% → 3.5% | 1.4% → 4.0% |
| Thirsty steps / hungry steps | 0 → 0 / 0.2% → 0.5% | 0.4% → 0 / 1.4% → 1.7% | 1.0% → 0 / 2.5% → 3.1% |

| Hunter in the same or a neighbouring square, per 1,000 hominin-steps | Old eye | Honest eye | Share of those when the hunter was hungry |
|---|---|---|---|
| Sabre-tooth | 1.7 | **8.4** | 12% → 1% |
| Leopard | 3.0 | **11.4** | 13% → 1% |
| Hyena | 5.8 | 7.1 | 21% → 4% |

Babies' "wound" deaths: **74 → 5**. The sim calls any death where health runs out on land "its wounds" (`src/sim.js` ~1557), which lumps injuries with cold, heat, falls and pits; so the old arm's baby wound deaths
were traced (8 worlds, 26 cases): none cold, hot, in a pit, hungry or thirsty; well fed (energy 70–100), mother alive. Their last events (seeds 1–3, 13 cases): **"it was hurt by an antelope it attacked"** or
"…a buffalo it attacked", health falling about 8 points a blow. **A carried infant could choose to attack a large animal** in reach and be hurt by it (`src/sim.js` attack code: no check of age or of being carried).

**Result.** Against the prediction written before the run: (1) hunters near hominins rise by at least 25%, and fewer of them hungry — **held**, far more than predicted (sabre-tooth ×5, leopard ×4, hyena +22%; hungry share
12–21% → 1–4%); (2) time in water up by at least 30%, thirsty steps down — **held** (about ×3; thirsty 1% → 0); (3) moving up by at least 10% — **held** (×4–7); (4) taking and striking down by about a third — **held in
direction, much larger for striking** (−80%); (5) hungry steps equal or up — **held** (2.5% → 3.1% adults); (6) baby wound deaths much rarer — **held** (74 → 5), and the reason was not one I had thought of.

**Interpretation.** With the old eye, food and water looked faint to a fed creature, so the strongest call in a fed brain was to stay and strike whatever it held: a third to half of every waking day spent hitting
things, in one place. That inflated the repeats of nut-cracking, flaking and digging (entries 95–96) and kept hominins away from water and from hunters. With the honest eye they travel, find water, and walk into
full hunters that now notice them. **The infant deaths of the old eye were mostly a bug** (carried babies attacking big prey), so entry 98's 9.6% for the old eye is not a real infant mortality; the honest eye's 4.2%
still contains a few. Both arms fail the infant row as too low even so. **Strength.** Strong for the activity shifts (millions of hominin-steps); moderate for hunter proximity (counts per 1,000 steps); the bug is shown by
event records in 13 cases and the code. **Lesson.** Count what creatures *do* with their time before reading their discoveries; a third of the day spent striking is a symptom, not a culture. **Next:** fix the bug (a carried
infant cannot attack; `--babies-attack` restores the old rule) and re-run the reality checks.

### 100. A carried infant cannot attack: the bug fixed; the reality checks barely move — Nov 2026

**Version.** 0.11.0 + commit `3ac78f7` (`--babies-attack` restores the old rule; checked: identical worlds, seeds 1–2 × 20 days, 176 columns). Entry 99 found carried babies attacking antelopes and buffalo and dying of it.

**Data.** [Prediction, table, runs](../data/findings/100-babies-cannot-attack/). `node tools/analysis/reality-check.js SEEDS 100 OUT` for seeds 1–24 in four processes; compared with entry 98's honest-eye table (the same code but for the fix).

| Check (real band) | Entry 98, honest eye | With the fix |
|---|---|---|
| Babies dying in their first year (10–25%) | 4.2% (21 of 495) | 4.7% (23 of 489) — fails, too low |
| Born who reach age 15 (30–60%) | 41.3% | 38.6% — passes |
| Life expectancy (13–33 y) | 14.7 | 14.2 — passes |
| Years between births (5.0–6.5) | 5.3 | 5.3 — passes |
| Age at first birth (12.5–15.5) | 16.1 | 15.9 — fails, high |
| Population change a year (assumed band) | −3.1% | −4.8% — fails |
| Illness share (assumed band) | 8.3% | 6.6% — fails |
| Worlds that died out | 6 of 24 | 8 of 24 |
| Causes of death | predator 44%, hunger 21%, old age 18%, illness 8%, wounds 5% | predator 48%, hunger 17%, old age 17%, wounds 9%, illness 7% |

**Result.** Against the prediction written before the run: (1) infant deaths 4.2% → about 3–4% — **not held**: 4.7% (two more deaths in 489, z about 0.4: noise; but my own rule said "not held if infant deaths rise", and it is
reported so); (2) every other row within noise and the same rows pass — **held** for pass and fail (no row changed status); the population row moved from −3.1% to −4.8% a year and worlds emptied from 6 to 8, with no interval
computed, so I cannot call it noise or a shift; (3) baby wound deaths near zero — not measured in this table (the trace of entry 99 had 5 in the honest arm).

**Interpretation.** With the honest eye few carried babies chose to attack, so blocking it changes little; the fix is kept because no real infant does it, not for its numbers. The worlds diverge by chance from the first blocked
attack, so a 24-world table moves by a few points on its own. **Intervals added afterwards** (`reality-check.js --summary` now resamples worlds 1,000 times): population change −3.1% (95%: −7.6 to −1.3) in entry 98 and −4.8% (−7.6 to −1.3) here — **the same range: the difference is noise**. The intervals also show two passes are borderline: life expectancy 11.1–17.3 years and survival to 15 26.9–48.9% both reach outside their real bands. **Strength.** Weak: one run each.

### 101. Honest watching, first test: copying of any kind barely changes skills; honest watching is rare because elders are rarely seen foraging — Nov 2026

**Version.** 0.11.0 + honest watching behind six switches, all off by default (`--honest-watching` turns all on; design `docs/design/honest-watching.md`, Fable's review, sources in `docs/reviews/2026-11-17-*`; numbers registered as
hypotheses in `docs/ASSUMPTIONS.md`). Identical worlds with the switches off (seeds 1–2 × 20 days and seed 1 × 100 days). The owner chose: no copying of heard words, no whole-path copying, same-square watching now, and late or absent skills
accepted as an honest answer (never raise the copying rate to rescue them); adults may watch any adult (a weak hypothesis, added at the owner's question).

**Data.** [All arms, both planets, the comparisons](../data/findings/101-honest-watching/) (`comparison-made-up-planet.txt`, `comparison-real-earth.txt`). `node tools/analysis/watch-trace.js SEEDS 100 OUT [switches]`, 24 worlds an arm, then `--compare`.
Two corrections were made **before** the arms they apply to, each written into the prediction file first: the watching chance had counted the foraging restriction twice (arm B0, kept as a too-low end; corrected 0.2 → 0.5 and
0.075 → 0.19 per foraging step, from the wild chimpanzee feeding share of 36–37%); and adults may now watch younger adults.

| Real Earth, 24 worlds × 100 days | A old copying | B1 honest watching | C no copying | D old copying, thinned to B1's dose |
|---|---|---|---|---|
| Copy events per 1,000 hominin-days | 81,929 | 27.8 | 0 | 28.5 |
| Watching bouts an hour together | — | **0.20** (registered 0.3–1.5) | — | — |
| Nut-cracking / stick-digging per 1,000 hominin-days | 38.5 / 132 | 58.0 / 177 | 57.4 / 167 | 29.0 / 125 |
| Flaking / marrow | 6.0 / 11.4 | 5.5 / 14.2 | 5.4 / 13.1 | 3.7 / 8.0 |
| Hominins who ever cracked a nut / dug with a stick | 17 / 52 | 22 / 73 | 17 / 75 | 12 / 47 |
| Speech per 1,000 hominin-days | 11,843 | **1,429** | 8,309 | 7,173 |
| Deaths from wounds / predators / hunger | 88 / 424 / 143 | **148** / 381 / 92 | 109 / 408 / 102 | 70 / 489 / 116 |

The made-up planet (A, B0, B1, C) gives the same picture (`comparison-made-up-planet.txt`): old copying with 3.2 million copy events leaves nut-cracking and digging as common as no copying at all.

**Result.** Against the prediction written before the run: (1) copy events far fewer in B than A — **held** (by about 3,000 times, far more than "a fifth": watching is rare); (2) B's transmission ratio above 1 for at least one skill and
at least D's — **not testable**: B had 5 first-time digs after watching (ratio 1.47) and none for other skills; D had almost no watched skills; under 10 events in every case (the prediction's own rule: traces); (3) skills lower in B
than A, closer to C — **not held**: B and C are alike and A is *lower* than both on the real Earth; (4) mother–offspring match — **not testable** (counts under 30); (5) deaths and the population within noise — **mostly held**,
but wound deaths rise with honest watching (88 → 148), likely the honest seeing of hurts (only in the same square now); (6–7) single switches and the ends of the hypotheses — **not run** (the time budget below comes first);
(8) mother as target — not measured. And: **watching bouts at 0.20 an hour together fall below the registered 0.3–1.5: the hypothesis as built is refuted by its own test.** The cause was found with the new bout counter:
adults eat or strike in only 5–6% of their waking steps, where wild chimpanzees feed about 37% of the day — elders are rarely seen foraging, so there is little to watch.

**Interpretation.** The robust finding is the oldest one in the table: **copying, even mind-reading copying three million times over, does not make skills more common here**; hominins learn nut-cracking and digging on their own, as the
zone-of-latent-solutions view of chimpanzees says (Tennie et al. 2009). Honest watching could not yet be tested as a channel for traditions, because the world's feeding time is about seven times too short. Turning off the copying of
heard words cut speech by about 85%: most "speech" was copying, not use. **Next:** the feeding time budget (faithful-day row one), then honest watching again. **Strength.** Strong for "copying does not change skill frequency" (two planets,
four arms, 24 worlds each); weak for everything about honest watching itself.

### 102. The real Earth keeps the band alive; the made-up planet does not — and every experiment so far used the made-up planet — Nov 2026

**Version.** 0.11.0 + the baby fix (`3ac78f7`). The owner, watching the page, saw 25 → 43 hominins by year 19 and 82 by year 88, while most test worlds shrank. The page's Land menu defaults to "Earth, 70,000 years ago";
`tools/experiment-core.js` defaults to a made-up planet (`earth: false`). **Every experiment table so far was a made-up planet.**

**Data.** [Prediction, table, runs](../data/findings/102-real-earth/). `node tools/analysis/reality-check.js SEEDS 100 OUT --earth`, seeds 1–24, four processes; summary with 95% intervals (worlds resampled).

| Check (real band) | Made-up planet (entry 100) | Real Earth |
|---|---|---|
| Population change a year (−1 to +1.5%, assumed band) | −4.8% (95% −7.6 to −1.3): fails | **−1.0% (−3.1 to +0.1): passes, at the edge** |
| Life expectancy (13–33 y) | 14.2 (11.1–17.3) | **17.8 (14.8–20.5)** |
| Born who reach 15 (30–60%) | 38.6% (26.9–48.9) | **48.3% (39.2–56.3)** |
| Years between births (5.0–6.5) | 5.3 | 5.3 |
| Age at first birth (12.5–15.5) | 15.9: fails | 15.5 (15.1–16.0): fails, just over |
| Babies dying in their first year (10–25%) | 4.7%: fails | 4.0% (2.4–5.6): fails, too low |
| Illness share (assumed band) | 6.6%: fails | 7.7%: fails |
| Worlds that grew / shrank / died out | 2 / 14 / 8 | **6 / 12 / 5** (best 25 → 51) |
| Births followed | 489 | 696 |

**Result.** The prediction held: population change on the real Earth (−1.0%) lies outside the made-up planet's interval, so the planet matters for this row; fewer worlds emptied (5 against 8). Four of seven rows pass (3 of the 5
with sourced bands). The owner's world (82 at year 88, about +1.35% a year) is among the growing ones, not an oddity.

**Interpretation.** The East African start of the real Earth — real rivers, lakes and land — sustains a band near the real, roughly stable range, where a random made-up planet starves or exposes it. So the experiments have been measuring a
world the owner never sees, and a harsher one. **Decision for the owner:** whether experiments default to the real Earth (recommended: the aim is East Africa 2.5 Ma, and the page already shows it); if so, the baselines are made
again on it. Two rows fail on both planets and are real gaps: babies die far too rarely, and first births come a little late. **Strength.** Moderate (24 worlds, intervals; one run). **Lesson.** Check that what is measured is what is shown.

### 103. The long run: on seeds 1–8 every band ended within 22–85 years, by predators; hunters filled their caps within 10 years — Nov 2026

> **Correction (18 Nov 2026, entry 110 and Opus):** the statement that hunters "filled their caps" is overstated: 11–23 hunters were seen against caps adding to 24, and the measured mean alive is 4.4–5.7 per kind (caps 10, 8, 6); rescue newcomers (32%) set the floor.

**Version.** 0.11.0 + the baby fix; real Earth (the default since entry 102). The owner's page world grew to 82 by year 88, then 18 hunters killed every hominin by year 157.

**Data.** [Prediction, runs, summary](../data/findings/103-long-run/). `node tools/analysis/long-run.js SEEDS 480 OUT` (160 years), seeds 1–8, then `--summary`.

| Seed | Band peak (year) → end | Hunters at years 10 / 40 / 80 | Hunters born / arrived as newcomers | Hominins killed by |
|---|---|---|---|---|
| 1 | 27 (1) → 0 at year 34 | 18 / 17 / 17 | 62 / 16 | hyena 23 |
| 2 | 27 (1) → 0 at 22 | 12 / 18 / 18 | 23 / 20 | hyena 26, sabre-tooth 9 |
| 3 | 26 (2) → 0 at 45 | 20 / 23 / 16 | 73 / 29 | sabre-tooth 24 |
| 4 | 28 (1) → 0 at 23 | 11 / 12 / 12 | 34 / 13 | leopard 35, sabre-tooth 2 |
| 5 | 29 (1) → 0 at 82 | 16 / 12 / 12 | 76 / 76 | sabre-tooth 21, hyena 8, leopard 7 |
| 6 | 28 (8) → 0 at 31 | 23 / 16 / 16 | 58 / 18 | sabre-tooth 17, leopard 3 |
| 7 | 30 (2) → 0 at 85 | 11 / 11 / 14 | 79 / 87 | leopard 33, hyena 11 |
| 8 | 28 (1) → 0 at 39 | 16 / 13 / 13 | 60 / 25 | hyena 19, leopard 2 |

**Result.** Against the prediction written before the run: (1) hunter numbers rise in worlds where the band grows — **not held as written**: no band grew, yet hunters rose from 6 to 11–23 within 10 years anyway, filling their fixed caps
by births *and* newcomers (newcomers as many as births in seeds 5 and 7: the `rescue` rule adds a young adult about once a life-year while a kind has fewer than 4); (2) bands end by predators — **held**, in all 8; (3) at least 2 of 8 grow
and are later wiped out — **not held**: none grew. Seeds 1–8 are the worse part of entry 102's 24 (there, worlds 9–24 held the growers), so this is not the owner's case of a band that grew; but it shows how a band ends here: hunters at their
caps within a decade, and the band whittled down by one kind or another until none is left.

**Interpretation.** Hunter numbers are set by fixed caps and a newcomer rule, not by prey; they fill quickly whatever the band does. With one band and no rescue from neighbours, every downturn is final. This supports Fable's order
(design `docs/design/defence.md`): measure, then several bands, then hunter caps from field density. **Strength.** Moderate: 8 worlds, the poorer seeds; one run.

### 104. Slow eating and the berry dose: feeding time is honest, poison deaths fixed; meat is too fast (registered test failed) — Nov 2026

**Version.** 0.11.0, branch `slow-eating` (not yet merged): `--slow-eating` (fruit 12.2, leaf 7.8, root 8.8, nut 12.2 kcal/min; meat at most 0.25 of a day a step) and `--berry-dose` (poison harm scaled by the amount eaten). Reviews: `docs/reviews/2026-11-18-feeding-rates-sources.md`; Opus on the result 18 Nov.

**Data.** `data/findings/104-slow-eating/` (worktree `~/genesis-wt/slow-eating`): predictions written before (`prediction-written-before.txt`, `prediction-berry-dose.txt`), `comparison.txt` (default → slow eating), `comparison-berry.txt` (slow eating → + berry dose), `table.txt`, `table-berry.txt`, `identical-berry.txt`. 24 real-Earth worlds × 100 days, same seeds.

| | default | slow eating | + berry dose |
|---|---|---|---|
| adults' eating share of awake steps | 4.5% | 30.4% | 32.0% |
| deaths "its wounds" per 1,000 hominin-years | 5.6 | 11.8 | **4.1** |
| worlds emptied (of 24) | — | 3 | 5 |
| population change a year | — | −2.7% | −2.7% |
| adult hunger deaths | 111 | 116 | 126 |
| meat eaten per person-day | not recorded | not recorded | **~156 g** (median adult-day 177 g; 3 of 24 worlds under 50 g) |

**Result against the predictions.** Held: eating share about 30% (chimpanzees about 37%); wound deaths back below the default (the poison bug fixed: child wound deaths 43 → 13); no collapse (5 of 24 emptied, stop rule more than 12). **Not held:** population change did not improve by about a point (the 95% range −6.4% to −0.1% across 19 worlds cannot detect a one-point change: below the test's power, not unexplained). **Registered test failed: meat.** About 156 g per person-day against under about 50 g per adult-day (chimpanzee year-round averages: Gombe 22 g, Ngogo males 41–55 g; Taï males 186 g, second-hand); 3–5 times over. Hyenas near hominins 8.2 → 11.7 and leopards 11.1 → 8.0 → 20.5: noisy, dominated by a few worlds.
**Interpretation (Opus, checked).** The 50 g test was set correctly; the meat cap is not the main cause (bare-handed bites are limited to 0.25 kg a step, below it). Slow eating capped plant foods but left meat fast: bare-handed about 1 kg of raw meat an hour, about 19 kcal a minute, against fruit 12.2 and a raw-meat chewing rate of about 6–7 kcal a minute (Wrangham & Conklin-Brittain 2003, second-hand, not verified). The default's meat was never recorded, so the excess may predate slow eating. Leopard kills of adults rising 132 → 150 is the same people dying another way (saved from the poison, returned to the leopards).
**Decision (the rule written before the run).** Slow eating + berry dose become the default together (no collapse, wounds no longer elevated), with the meat test stated as **failed** here. Next, as its own entry: re-run the default trace with the meat record already in the code (is the excess old?), then a raw-meat chewing rate as a registered hypothesis (verify first), meat logged by age, sex and source. **Owner's call before that runs:** keep the meat band at the chimpanzee year-round average (under about 50 g a day) or widen it to the Taï range (up to about 190 g for males); cut-marked bones at about 2.5 Ma support some extra meat but not how much. **Strength.** Moderate: 24 worlds each; wounds and eating share clear; population and meat uncertain. **Lesson.** A fix that makes one food honest can leave a faster food relatively more attractive: check every food's rate together.

### 105. Do the sim hominins show the traits that made humans human? No push on brain size; nothing to see in so few generations — Nov 2026

**Version.** 0.11.0, measuring only: `tools/analysis/gene-trace.js` (inherited traits, within-world selection slopes adjusted for adult years, change against each trait's own mutation spread). Reviews: `docs/reviews/2026-11-18-opus-brain-question.md`.

**Data.** `data/findings/105-brain-traits/` (worktree `~/genesis-wt/slow-eating`): `prediction-written-before.txt` (with the addendum written before any run), `default-100.txt` (default, 24 worlds × 100 days), `slow-berry-100.txt` (slow eating + berry dose, 24 × 100 days), `slow-berry-long.txt` (the same, 8 worlds × 480 days), `NOTE-slow-arms-were-the-default.txt` (the first slow arms ran the default by mistake: unknown flags are ignored; discarded). Same seeds; 4 workers.

| Slope of children borne on the trait (per spread; 95% ±) | default, 100 days | slow + berry, 100 days | slow + berry, long |
|---|---|---|---|
| brain size `bs` | −0.065 ± 0.122 | −0.008 ± 0.126 | +0.080 ± 0.160 |
| neutral marker `nm` | — | −0.009 ± 0.121 | −0.061 ± 0.155 |
| adults / generations reached (median, max) | 890 / 1, 3 | 874 / 1, 3 | 591 / 4, 9 |

**Result against the prediction.** Held: (1) brain size is not favoured: all three slopes are zero within their intervals (power: a null is expected, the intervals are about ±0.12–0.16); (2) no trait's change exceeds about 3 × its own per-birth mutation spread (largest 0.8 in the long arm: drift only); copying `im` not favoured (−0.009). **Not held:** (3) timidity `tm` was predicted to be favoured where predators kill 45% of hominins: slope −0.023 ± 0.123 (zero). One trait's slope sits just outside its interval in one arm: care for others `al` +0.140 ± 0.122 (slow + berry, 100 days; one of 11 traits × 3 arms, so by chance alone expected). No trait trends in the long arm. Bands end early (median 4 generations, last third only 131 births), so nothing could be read about change over time.
**Interpretation.** In a few generations there is no push toward a bigger brain, as predicted (nothing in the world rewards a unit count, and entry 107 and Opus's review show today's learner could not use extra units anyway). This says nothing about the long run: real expansion took about 100,000 generations and needs the relay (stage 6), and bands that last. **Strength.** Weak for selection (intervals about ±0.15; a null means little); clear that bands are too short. **Lesson.** Check that a flag exists before queueing arms (unknown flags are silently ignored): fix in the backlog.

### 108. The chain probe without the confound: every size learns chains of 5 — because the task is a lookup table — Nov 2026

**Version.** 0.11.0, measuring only: `tools/analysis/chain-probe.js --neutral` (inborn weights zeroed on the chain's input states; a random assignment of acts to steps per brain; starting probability reported). Opus: `docs/reviews/2026-11-18-opus-learner.md` and its read of this result.

**Data.** `data/findings/108-chain-probe-neutral/` (prediction written before; `bs-0.3.txt` … `bs-1.0.txt`): sizes 0.3, 0.5, 0.7, 1.0 (19, 32, 45, 64 units), 20 brains each, paired seeds, 10 real years of waking allowed.

| Brains out of 20 that | 19 units | 32 | 45 | 64 |
|---|---|---|---|---|
| learn chains of 2, 3, 4 and 5 acts | 20 each | 20 each | 20 each | 20 each |
| median years to learn chain 5 | 2.26 | 2.56 | 2.57 | 2.48 |
| hold a cue 2 steps | 19 | 20 | 16 | 12 |
| hold a cue 4 steps | 6 | 1 | 0 | 0 |
| hold a cue 8 steps | 0 | 0 | 0 | 0 |

**Result against the prediction.** Held: chains of 3 (at least 14 of 20) and 4 (at least 5 of 20) are easy at 19 units, so entry 107's 2–3 act ceiling was the probe fighting the inborn hand reflexes; no gain from size at any chain length; cue holding no better with size (it is worse). **Not held: chain 5 was learned by all 20, and the gate written before the run fired** (more than 10 of 20 at 19 units = too easy to compare with chimpanzees).
**Interpretation (Opus).** The gate fired because the probe was the wrong comparison, not because the learner is too good: each step's state is shown on its own input, a wrong act costs only time, and the direct sense-to-choice path can solve it with no thinking units (a lookup table of 5 labelled states). It says nothing about chimpanzee serial order (Kawai & Matsuzawa's numerals are visible together, with distractors), so **the chimpanzee gate is retired for this probe** and chain times cannot be compared with tool-use learning. Fair: "with labelled states the learner links at least 5 acts, and size neither helps nor hurts". Not fair: "the learner is not the limit for chains". Cue holding is the one place size shows (the echo loop needs thinking units), slightly worse with size, consistent with the scaling rule `k = S.nh/nh` (0.84 at 19 units, 0.25 at 64; inferred from the code, no ablation yet). Correction: there are 19 acts, so chance is 0.053 (the 0.08 start is a little above it).
**What follows.** This pair of tasks cannot show a benefit of size however memory is built. Next: a **conjunctive probe** (entry 112; the right act depends on a combination of two inputs, so thinking units are required; 2, 4, 8, 16 combinations; a single-input control), run at both ends of `k` (`--size-learning`, built, off by default), and the chain and cue pair rerun at both ends. The owner's two decisions are in build (`--size-learning`, `--memory-from-layout`: at most 8 memory slots, so cue length cannot grow past today's until a sourced decision lifts the cap; changing NM changes every world). **Strength.** Strong for "the probe is a lookup table"; weak for any claim about brains. **Lesson.** Write the gate for what the task needs, not for a number from a different task.

### 109. How fast hominins learn to swim: ten times slower leaves 6% of adults swimming, and drownings rise 3.5 times — Nov 2026

**Version.** Branch `swim` (not merged: frozen with the rest while the population is stabilised): `--swim-rate X` multiplies the practice rates (`SOC.swimDeep` 0.02 and `SOC.swimShallow` 0.004 a step; children twice as fast); the log line now reads "learned to swim by practice". Evidence: `docs/reviews/2026-11-18-swimming-sources.md` (swimming is learned, not innate, in apes and humans; wild apes wade and almost never swim; the one trained ape took weeks with a safety net; no published learning rates).

**Data.** `data/findings/109-swim-rate/` (worktree `~/genesis-wt/swim`; prediction written before): 24 real-Earth worlds × 100 days at rate 1 (today's) and rate 0.1, same seeds. Identical-worlds check passed (default unchanged).

| | rate 1 (today) | rate 0.1 |
|---|---|---|
| adults who can swim at the end of the run (skill 0.5 or more) | 170 of 244 (70%) | 15 of 239 (6%) |
| drowned (count; per 1,000 hominin-years) | 12; 0.8 | 44; 2.8 |
| killed by a predator, per 1,000 hominin-years | 27.1 | 26.7 |
| hunger / wounds / illness, per 1,000 hominin-years | 9.1 / 5.6 / 4.6 | 7.0 / 6.4 / 5.5 |
| worlds emptied | 5 | 5 |

**Result against the prediction.** Held: (1) at today's rate most adults swim by the end (70%); at one tenth almost none do (6%, under the predicted 10%); (2) population and other deaths unchanged within noise (5 of 24 worlds emptied in both; predators 27.1 and 26.7); drowning rose only because hominins still enter deep water unskilled, as predicted.
**Interpretation.** The practice rate controls how many hominins can swim, but not the hominins' own judgement: at one tenth they still go into deep water in numbers that drown 44 of them in 24 worlds (0.28% of hominin-years a year, small against about 6% total mortality). Real apes avoid deep water and wade; the sim's hominins do not avoid it enough: the avoidance of deep water is the missing piece, not the rate. The rate stays an assumption (no published rates; both ends reported); the default stays 1 until the owner chooses; swimming is still an authored number, not a learned stroke (backlog: body layer). **Strength.** Moderate: 24 worlds each, clear on skill and drowning, nothing on survival. **Lesson.** A skill rule and the judgement to use it are separate things; slowing the rule exposed the missing judgement.

### 114. Several bands, no dispersal: four separate bands halve the decline and lose far fewer worlds — but the cause is not yet shown — Nov 2026

**Version.** Branch `bands` (not merged): `--bands N` (N bands of 25 at separate camps, hunters and newcomers kept away from every camp, birth-band tags for measuring only) and `--band-dist` (least camp gap in squares; the usable homeland allowed only about 7–8: bands overlap in range like neighbouring chimpanzee communities); `tools/analysis/bands-measure.js`, `tools/analysis/band-range.js` (a hominin stays within about 5.6 squares of its band's centre in a year, the 90th percentile within 10; a band's centre moves about 1 square a year). Design: `docs/design/bands.md` (Opus 19 Nov). Identical-worlds check passed with one band.

**Data.** `data/findings/114-bands/` (worktree `~/genesis-wt/bands`; prediction written before): 24 real-Earth worlds × 100 days (33 years), default eating, same seeds; arms 1 × 25, 4 × 25 (`--bands 4`), 1 × 100 (`--extra-people 75`).

| | 1 × 25 | 4 × 25 | 1 × 100 |
|---|---|---|---|
| worlds emptied (of 24) | 5 | 1 | 1 |
| bands emptied | 5 of 24 (21%) | 8 of 96 (8%) | 1 of 24 (4%) |
| births per 1,000 hominin-years | 44.5 | 45.5 | 46.3 |
| deaths per 1,000 hominin-years | 60.0 | **52.7** | 61.2 |
| net change a year | −1.55% | −0.72% | −1.49% |
| mean population at the end (of 25, 100, 100 at the start) | 14.9 | 78.3 | 60.0 |

**Result against the prediction.** Held: at most 1 of 24 worlds emptied in the four-band arm; births equal across arms; the single band of 100 lost no more than the 25 and the world mostly lasted. **Not held:** most bands still lost (predicted over 40%: 8%); a net decline of −1% to −2% (−0.72%); per-person rates "like one band" (deaths 52.7 against 60.0). The one band of 100 does **not** lower deaths (61.2): so the gain in four bands is not simply more people to share the same few hunters.
**Interpretation (open).** Separate bands lower deaths by about 12% and nearly halve the decline, but the cause is not shown: deaths were not split by cause in these arms. The likely suspect named by Opus is an artefact: hunters (6 per world, fixed caps, home ranges) cannot reach every camp, so some bands live where hunters seldom come; real predators are everywhere, so this would not be a real benefit. Not a cure: the world still declines (−0.72% a year); bands help it last, as predicted, not grow. **Next:** deaths by cause in each arm; an arm with hunters scaled with the bands (`--hunters-per-band`; prediction first); then dispersal of young females. **Strength.** Moderate for the pooled rates (about 50,000 hominin-years in the four-band arm); the cause is unknown. **Lesson.** A benefit that appears with separation but not with numbers points at geography, not at group size: check where the hunters are before believing it.

### 113. Births and deaths diagnosed: births are at the real pace; deaths are a little above births; nothing single is wrong — Nov 2026

**Version.** 0.11.0, measuring only: `tools/analysis/life-trace.js SEED DAYS` (run length now an argument) and `tools/analysis/births-summary.js` (new). Step 1 of the population plan (`docs/BACKLOG.md`, FOCUS).

**Data.** `data/findings/113-births/` (prediction written before; `lt-1.json` … `lt-24.json`): 24 real-Earth worlds × 100 days, default eating, same seeds as entry 104's default trace (15,645 hominin-years, 938 deaths).

| | measured | real (sourced) |
|---|---|---|
| adult females / adult-female years / births | 370 / 3,734 / 696 | — |
| births per adult female per year | 0.186 (one every 5.4 years) | gaps 5.0–6.5 years (Gombe 5.2, Mahale 5.6–6.0): inside |
| birth gaps (years): median, 10th–90th | 5.2, 4.6–7.0 | inside |
| crude birth rate (births per hominin-year) | 4.4% | chimpanzees about 4% or more (not re-verified) |
| crude death rate (entry 104's default trace) | 6.0% | life expectancy 17.8 years, inside 13–33 |
| net change implied | about −1.6% a year | reality-check band −1.0% to +1.5% (an assumption) |
| adult females with 5 or more adult years and no birth | 13 of 241 (5%) | — |
| infants lost before weaning | 144 of 696 births (21%) | — |
| share of adult-female time "ready" / of that with a ready male within one square | 6.8% / 25.5% | — |

**Result against the prediction.** Held: (1) births per adult female per year are at the real pace (0.186, inside the predicted 0.17–0.19; gaps median 5.2). **Not held:** (2) ready females have a ready male near only 25.5% of the time, not above 70%. (3) (few females reproduce; the first-mating age) was not measured here (the tool does not report age at first birth): left open. **Correction:** my earlier inference in the backlog (births only about 3.3% a year, so the decline is a births shortfall) was wrong: births are 4.4% a year; deaths 6.0%.
**Interpretation.** Births and deaths are both inside the real ranges, and the net is a small decline of about 1.6% a year: a small closed band under chance then ends in decades (entries 103 and 110); no single number is clearly wrong. Two registered numbers stay open for later: a mother's nursing period (`cd` 2.25 years is a forager value; wild chimpanzees nurse about 4–5 years) means the sim fills the rest of the gap with waiting for a ready male (the ready window is only 6.8% of adult time, and only a quarter of it with a ready male near), and age at first birth (15.5 against 13–14.6, entry 104). **Strength.** Good for the pooled rates (696 births, 24 worlds). **Lesson.** Check an inference before building on it: births were fine and the suspect was the wrong one.
**Next (plan step 3):** several bands with dispersal and merging; step 2 (a fix for a missing or wrong number) has nothing clear to fix yet.

### 112. The conjunctive probe: the combination task needs thinking units and size does not help; with the size rule removed nothing learns at all (not understood) — Nov 2026

**Version.** Branch `learner` (not merged: frozen): `tools/analysis/chain-probe.js --conj` (new) with `--size-learning` (the scaling `k = S.nh/nh` removed) and `--memory-from-layout` (built, not used here). Design: Opus 18 Nov (`docs/reviews/2026-11-18-opus-learner.md` and its read of entry 108). Identical-worlds check passed with the switches off.

**Data.** `data/findings/112-conjunctive-probe/` (prediction written before): the right act (TAKE or STRIKE) depends on a cue and a context shown on neutral inputs, `T_cue XOR context`; P = 2, 4, 8, 12 combinations; "learned" = at least 75% right over 2,000 steps; a control with one input per combination (a lookup). Sizes 0.3, 0.5, 0.7, 1.0 (19, 32, 45, 64 units), 20 brains each, 10 years of waking allowed.

| Brains out of 20 that learn | 19 units | 32 | 45 | 64 |
|---|---|---|---|---|
| today's rule, combination P = 2 / 4 / 8 / 12 | 18 / 15 / 16 / 16 | 20 / 18 / 16 / 16 | 20 / 18 / 17 / 18 | 20 / 16 / 18 / 18 |
| today's rule, control P = 2 / 4 / 8 / 12 | 20 / 19 / 20 / 20 | 20 each | 20 each | 20 each |
| size rule removed (`--size-learning`), combination, all P | 0, 1, 0, 1 | 0 | 0 | 0 |
| size rule removed, control, all P | 0, 2, 1, 2 | 0, 2, 0, 0 | 0, 1, 0, 0 | 0 |

Median time (today's rule): the control 0.1–0.35 years of waking; the combination 0.3 years at P = 2, and about 0.8–1.9 years at P = 4–12 (4–8 times longer).

**Result against the prediction.** Held in part: (a) today's rule, size makes no real difference to the combination (15–18, 16–18, 16–18 of 20 with no consistent trend; P = 12: 16, 16, 18, 18) and the control is flat (20 of 20): the combination, which no direct weights can solve for P ≥ 4, is learned by 75–90% of brains at **every** size including 19 units, 4–8 times slower than the lookup. **Not held:** (b) with the size rule removed capacity did not pay: **nothing learned, not even the control** (0–2 of 20 at every size), and the gate failed: **19 units learned P = 2 in 18 of 20, not 20 of 20** (two brains did not).
**Interpretation.** Not understood, so not read as "capacity does not pay". Removing the scaling from 0.84 to 1 at 19 units cannot plausibly stop all learning by itself: it looks like an **instability** (the scaling may be what keeps each connection from overwriting the rest, as its comment says) or a fault in the switch; the identical-worlds check only shows that the switch changes nothing when off. Under today's rule the learner already handles the conjunction at 19 units, so the 19-unit brain is not the limit and size does not help: consistent with entries 107 and 108. **Not read, not acted on** (frozen with the other work; the Opus review of this result and a check of the instability are in the backlog). **Strength.** Strong for "today's rule: no size effect, the combination is learned"; none for the removed rule. **Lesson.** A switch that breaks the learner outright tests the break, not the idea.

### 110. Defence, measured first: per-person predation is already about real; the band is small and closed; attacks are few and nearly all fatal — Nov 2026

**Version.** 0.11.0, measuring only: `tools/analysis/defence-measure.js`. Opus's read: 18 Nov (`docs/design/defence.md`, entries 102 and 103).

**Data.** `data/findings/110-defence-measure/` (prediction written before; `dm-1-12.txt`, `dm-13-24.txt`): 24 real-Earth worlds × 100 days (33 years), about 15,650 hominin-years, today's default eating.

| | result |
|---|---|
| hominin sleeping steps up a tree | 4.4% (25,590 of 541,307 and 32,477 of 783,870: 4.7% and 4.1%) |
| attacks on hominins (all three kinds) | 609: 26% on sleepers, 74% on awake hominins; children 71 |
| attacks that ended in death (the tool's "hurt or killed" counts only `hit` or `wound` that died) | 424 of 609 (70%) |
| attacks per 1,000 hominin-years / deaths by predators | 39 / 27 (= 2.7% a year, as entry 102; real primate median about 3%) |
| hominins' share of each kind's attacks | leopard 4.0–4.6%, hyena 1.7–3.2%, sabre-tooth 2.2–2.6% |
| hunters seen: born (incl. founders) / newcomers by rescue | 1,219 / 580 (32% newcomers) |
| mean hunters alive per kind (caps 10, 8, 6) | 4.4–5.7 |
| mean hominins alive (of 25); worlds ended before 33 years | 17.1 and 23.4; 5 of 24 |

**Result against the prediction.** Held: sleeping up a tree is rare (under 15%). **Not held (three; Opus asked):** (1) attacks mostly on awake hominins (74%), not sleepers: they simply follow time spent (29% of steps asleep), so sleeping is neither riskier nor safer; (2) newcomers 32%, not under 20% (below my 40% stop line); (3) hunters well below their caps and hominins only 2–5% of attacks (predicted 10–30% for leopards; real about 10% of leopard diet is primates, Isbell 1994: sourced, not re-checked): hunters are not fixated on hominins.
**Interpretation (Opus).** Per-person predation is about real; the collapse is mostly a small closed band (25, no dispersal or merging) under chance, runs of kills by one hunter kind, and a slow decline of about 1% a year (entry 102): other drains matter as much (births too few or other deaths too many: first-year deaths 4% against the real 10–25% means the decline would worsen if fixed). Not a bug: caps barely matter, because rescue sets the floor (hunters sit just above the rescue line of 4); entry 103's "hunters filled their caps" is overstated (11–23 hunters against caps adding to 24) and is corrected there. The mechanism nobody has examined: **attacks are rare (0.039 per hominin a year, against Boesch's 0.30 at Taï) and 70% are fatal (against about 44% at Taï, 4 of 9, a count not verified)**: escape, alarm calls or a rally would act there; sleep-high could prevent only a small slice (a tree stops only hyenas) and stays last. Lions, *Homotherium*, *Dinofelis*, *Chasmaporthetes* and crocodiles are still left out, so hunter pressure is lower than real. **Next build:** `--bands N` (dispersal of young females, merging of small bands); arms 24 worlds × 100 days: 1 band of 25, 4 bands of 25, 1 band of 100 (separates more people from more bands); prediction first; plus a deaths-by-cause table and a `--no-rescue` arm; split deaths asleep against awake and adult against child before sizing any rally. **Strength.** Good for the counts; the lethality split is not yet measured. **Lesson.** A collapse can come from a small closed population even when each person's risk is realistic.

### 107. Does a bigger brain learn more? No — chains and memory are the same at every size, and memory is a little worse at 64 units — Nov 2026

**Version.** 0.11.0, measuring only: `tools/analysis/chain-probe.js --bs X` (new; the default is unchanged). The brain question's go/no-go (`docs/MASTER-PLAN.md` step 0.11; Opus's review `docs/reviews/2026-11-18-opus-brain-question.md`; the owner's rule: no brain is gifted — this is a probe outside the world, a labelled exception).

**Data.** [Prediction and the four tables](../data/findings/107-chain-by-brain-size/). The same young hominin brain (a child of two founders of a real world), its size trait set and its units grown to that size: 0.3 (19 units, the early hominin), 0.5 (32), 0.7 (45), 1.0 (64, the modern ceiling); 10 brains per size on the same seeds; the tasks and the 10-real-year budget of entry 87.

| Brains out of 10 that | 19 units | 32 | 45 | 64 |
|---|---|---|---|---|
| learn a chain of 2 acts | 10 | 10 | 10 | 10 |
| learn a chain of 3 acts | 6 | 4 | 5 | 4 |
| learn a chain of 4 or 5 acts | 0 | 0 | 0 | 0 |
| hold a cue 0 / 1 steps | 10 / 10 | 10 / 10 | 10 / 10 | 9 / 10 |
| hold a cue 2 steps | **9** | 9 | 6 | **5** |
| hold a cue 4 steps | **4** | 1 | 2 | **1** |
| hold a cue 8 steps | 0 | 0 | 0 | 0 |

**Result.** Against the prediction written before the run — **held**: (1) chains at 0.7 and 1.0 are the same as at 0.3 (2 for all, 3 for about half, none for 4–5); (2) the longest cue held is the same (2–4 steps); (3) no consistent trend in time to learn chain 2.
The "not held" conditions (chain 3 by 7 or more of 10 at 0.7 or 1.0, any brain learning chain 4, a cue held two steps longer) did **not** occur. **Not predicted:** holding a cue gets slightly **worse** with more units (2 steps: 9, 9, 6, 5 of 10; 4 steps: 4, 1, 2, 1), consistently across sizes; with 10 brains each a difference of 2 is noise, but a monotonic fall is probably real — a larger random network starts further from useful and learns more slowly.

**Interpretation (corrected 18 Nov after Opus's review: the original, struck through here, blamed the credit rule and was too strong).** ~~In this sim brain size is not what limits learning; the learner's rule for passing credit back along a chain is (entry 87).~~ **Corrected:** three causes in the code (`docs/reviews/2026-11-18-opus-learner.md`): (a) the probe's chain states sit on inputs with inborn hand reflexes — the biggest cause, an artefact; (b) a scaling rule of ours (`k = S.nh/nh`) cancels the gain from size by construction; (c) short-term memory is a fixed 8 units whatever the brain's size or inherited memory region. So "size cannot pay" is true for the code as written, by construction, not as a discovery; no credit defect was found. Do not read this as the brain question's answer. However the world rewards size, nothing could pay for a bigger brain until that changes. This closes the first test of the brain question with a clear "no" for the current learner,
and puts the decision on the learner (backlog; Opus consulted). Two checks against the evidence (`docs/reviews/2026-11-18-brain-size-and-learning-sources.md`): chimpanzees, with brains about the size of early hominins', learn 4–5 ordered items in lab tasks and multi-step tool use over years, so the sim's 2–3 is **at or below chimpanzee level** (the learner may be weaker than a chimpanzee, not too small);
and the comparative data link brain size to cognition across species only loosely and say nothing about chain length. A **time-scale mismatch** also stands: one sim step is 15 minutes, so "a cue held 2–4 steps" is 30–60 minutes, while real primates hold a cue for seconds to minutes: the figures are not yet comparable with ape data. **Strength.** Moderate: 10 brains per size, four sizes, paired seeds, a consistent pattern; the memory fall is a trace. **Lesson.** Test whether the thing you plan to select for can do anything before building a world to reward it.

---

## Open questions (next tests)

- Ablate the bundle in entry 7: which of band size, parental feeding, instincts, one-shot memory and
  swimming carry the effect?
- Hunger: does the fall in hunger deaths with cooperative care (entry 11) hold with 24+ worlds?
- Fire: how do real apes respond to a
  wildfire (Pruetz & LaDuke 2010), and does the model lack it? Why were six victims in seed 9 striking as they died?
- Abundance: hunters to prey should be about 90 kg per 10,000 kg (Carbone & Gittleman 2002); Genesis is about nine times off.
  What should one animal stand for (one animal or a herd), and how large should the world be? Then switch on the East African
  animals (entry 24).
- Why do starving hominins walk but not find food (entry 22: not grass)?
- Why is learning from others bred out across generations, with and without practised founders (entry 25)? Copying a
  movement rather than what worked (backlog A4)? Then repeat the community-size comparison (entry 36).
- Female cycle: fix the nursing lockout after any mating and the male's 36-day wait, then test again (entry 32).
- Hunger rose when hominins stopped wandering (entry 30): they do not move on when food runs out (backlog A2).
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
