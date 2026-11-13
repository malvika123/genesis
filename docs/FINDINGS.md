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
