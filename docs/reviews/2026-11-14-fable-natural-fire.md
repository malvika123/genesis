# Review: making fire as nature allows it (design A41) — Fable, 14 Nov 2026

Read-only: no source code changed. Reviewed `docs/design/fire-making-natural.md` and the code on branch `percept`. Web sources were
checked today and are linked. "Not found" means I searched and found nothing peer-reviewed; "memory" means unchecked.

**In one line.** The direction is right (no counter, no reward, the world decides), but the core of step 2, heat kept across
15-minute steps, is not real, and friction ignition cannot be simulated faithfully at this time step. What can be built honestly now
is the world side: banging lights nothing, wood and grass moisture follow the air, an ember lights tinder only when it is very dry.
The technique side has no honest number yet.

## Findings

**1. HIGH — Heat does not carry from one step to the next.**
A skilled maker gets an ember in about 1 to 4+ minutes of unbroken drilling, and often fails
([Storm, 74-species trial](https://www.primitiveways.com/hand_drill.html), practitioner). A gram of hot dust cools in seconds
when the drilling stops (my physics reasoning, not a measured figure). So a 15-minute step is already many complete attempts, and
nothing hot is left for the next step. "Heat a step, loss a step, threshold" (design step 2) would be an invented mechanism: it would
make rubbing for 2 hours work where rubbing for 15 minutes fails, which is not true of wood. Only material states really carry over:
how dry the wood is, a worn charred socket, a cut notch. **Recommendation:** drop the heat variable; treat one step as one bout.

**2. HIGH — Option (a) is not faithful: untrained rubbing is not "a plausible attempt".**
Friction fire needs speed and pressure together in one spot (about 2–3.5 kg down-force), a suitable wood pair (easiest spindles
average density 0.42 against 0.53 for all), and a notch: without a notch even the expert succeeded only 28% of the time (Storm,
same page). Of 93 recent forager groups, 5 did not know how to make fire at all, though they were modern humans living with fire
daily ([McCauley, Collard & Sandgathe 2020](https://hraf.yale.edu/ehc/documents/1417)). Naive wild chimpanzees given nuts and
stones did not even crack nuts (Koops et al. 2022, cited in the nut review). I found **no** study of novice or untaught friction-fire
success. So the chance per bout for an untrained body cannot be sourced; all evidence says it is too small to see in any run.

**3. HIGH — Option (b) alone is the hidden counter again; the nut precedent does not cover it.**
The nut skill has a sourced ceiling (83%), a sourced learning time in living apes, and an action apes really do. Fire has none of
the three. What is hard in fire-making is mostly not the hand but the arrangement: which wood, a notch, tinder ready, a dry day.
That is knowledge, and in Genesis knowledge belongs in the network. A counter that turns blind rubbing into fire says "rubbing
anyhow grows into drilling", which nobody has shown. A body skill is defensible only for the motor rest (speed with pressure) after
the arrangement exists as real things in the world.

**4. MEDIUM — Option (c) is the only faithful route, and it is not cheap.**
The arrangement must be made of world states the hominin produces by ordinary acts: a notch cut with a flake, dry tinder carried to
the spot, a sustained-rub act that is not the strike. Each is a real body movement with a real result. Giving a ready "drill" or
"blow" button would hand over the invention.

**5. HIGH — Banging is not rubbing, and this is the honest answer to the owner's "bubble".**
`src/sim.js:1203–1211` treats a strike with a stick over a stick as rubbing. A blow is not sustained friction and lights nothing,
yesterday or today. Removing that link is physics, not a switch. With it removed, the strike pull (`src/brain.js:128–135`, 0.9)
can no longer fill the friction path. It still drives the pyrite path (`sim.js:1193`), where banging really does throw sparks.

**6. MEDIUM — The strike pull is thinly sourced.** The comment cites babies and small children; the weight applies to every age
and every held thing, at one size. Infant object-banging is documented (Kahrs, Jung & Lockman 2013; memory, unchecked); adult
rates are not sourced. Register 0.9 as an assumption and report strikes per 1,000 steps by age.

**7. MEDIUM — Wood dryness is a constant.** `src/fire.js:54`: sticks are 0.85 dry the step after rain stops, whatever the air.
Real wood moves toward a moisture set by humidity (about 11% at 60% humidity, 18% at 84%, 25% at 97%:
[FPL-based table](https://stoves.bioenergylists.org/emccalc), secondary; check against FPL-RN-0268) over hours to days. Also
`sim.js:1183` counts a dry stick as tinder; a stick is not tinder.

**8. MEDIUM — Sparks: less is sourced than the design says.** Sorensen, Claud & Soressi 2018 report sessions of 1–30 minutes and
"showers of sparks", with tinder fungus plus manganese dioxide; **no** strike counts or catch rates
([paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC6053370)). "1 to 10 sparks" is a news quote. Sorensen 2024 shows treated tinder
catches better ([Lucky strike](https://scholarlypublications.universiteitleiden.nl/handle/1887/4172312)). I found no experiment
in which pyrite sparks lit plain dry grass. A catch chance on grass is an assumption whose honest range includes zero. Pyrite
placement (`src/items.js:78`, 5% of high rocky squares) is unsourced too.

**9. LOW — Two more built-in rewards.** `sim.js:1197` (sparks) and `1210` (smoke) pay the creature along the path. Design step 6
names only smoke; remove both.

## Numbers

| Number | Value | Status |
|---|---|---|
| Wood starts to glow | about 250 °C at the lowest heat flow; flaming 300–365 °C ([Babrauskas 2002](https://zendy.io/title/10.1002/fam.929)) | sourced; the design's 430 °C is a practitioner figure. Not needed if heat is not modelled |
| Manganese dioxide lowers it by about 100 °C | [Heyes et al. 2016](https://universiteitleiden.nl/en/news/2016/02/neanderthals-collected-manganese-dioxide-to-make-fire) | sourced; Neanderthal-age, not for 2.5 Ma |
| Glowing ember lights dry litter | 50% only at about 4% fuel moisture with 2 m/s wind; depends on moisture and wind ([Ellis 2015](https://publish.csiro.au/wf/WF14048)); none in still air in a related test | sourced (eucalypt litter as proxy) |
| Smouldering stops | cellulose will not start above about 30% moisture ([model study](https://arxiv.org/abs/2206.03836)) | sourced (model) |
| Expert ember without a notch | 28% (Storm) | practitioner |
| Untrained ember chance per bout; spark catch on grass; bouts to motor skill; mapping `dryness` 0–1 to % moisture | — | **assumptions**, none sourceable today |

## Recommended design (each its own switch; prediction written first)

1. **Cut the false links** (`--old-fire-making` restores them). A strike with a stick is a blow: no rubbing, no `fsk`, no
   `firePractice`, no spark or smoke reward. Prediction: 0 made fires in 24 worlds × 100 days; with the old flag, identical to today
   to the last digit.
2. **Wood moisture follows the air** (`--dry-sticks` restores the constant). Sticks move toward the humidity-set moisture with a
   lag of hours (assumption: 10 hours, range 1–100; memory of the fuel "timelag" classes, to check). This changes wildfire too, so it
   needs its own balance run. Prediction: fewer stick fires on damp ground; wildfire area changes by under 20%.
3. **One ember rule for the world.** Anything glowing (a spark that caught, a future ember) lights fine fuel with Ellis's chance
   from fuel moisture and wind, within the same step, or dies. Prediction: no change in runs yet; checked by a unit test.
4. **Sparks.** Pyrite struck with stone throws sparks every bout, seen but not rewarded. Whether one catches is choice B.
   Prediction (B1 or B3): 0 spark fires in 24 × 100.
5. **Friction** only if the owner chooses A3.

Report every result as a rate with its upper bound; a zero in N hominin-years means "below about 3/N".

## What would look right for the wrong reason (question 4)

- *Never, because the network cannot hold it:* a four-part chain with no reward on the way may be beyond this network and a
  120-day life whatever hominins could do. "Never" then measures the network.
- *Never, because of the squeezed year:* a dry season lasts about a day, so very dry hours are scarce per life.
- *Never, because of placement:* pyrite, flakes and dry grass rarely share a square for reasons of map numbers.
- *Fire, because of one unsourced chance:* any made fire in under about 100,000 hominin-years comes from an assumption, not from
  the world. Treat it as a warning, as in entry 75.
- *Fire counted wrongly:* brands taken from wildfire logged as made fire. Keep them apart.

## Choices for the owner

**A. Friction fire.**
1. *Steps 1–3 only; no sustained-rub act yet.* Cost: a real movement is left out, so friction fire is absent by omission; say so
   in the About tab. About 1 day.
2. *Add a rub act with a fixed small chance, no skill.* Cost: one unsourceable number decides everything. Not recommended.
3. *The full chain:* rub act with no inborn pull, a notch cut with a flake, tinder brought to the spot, and a motor skill grown only
   by own rubbing on a notched dry pair (ceiling from expert data, floor and pace as assumptions at both ends). Cost: four
   mechanisms, about 3–4 days, and the expected result is still "never" (see question 4, first point).
   **Recommend 1 now, 3 on the backlog** behind finer actions and the clock test.

**B. Can a pyrite spark catch?**
1. *Never on plain grass* (no tinder that holds a spark exists in this world). Cost: sparks are a dead end until a real tinder exists.
2. *Charred wood on burnt ground as tinder* (`BURNT`). Natural, but I have not verified it; needs a source first.
3. *A small chance on very dry grass,* tested from zero up. Cost: an unsourced number again.
   **Recommend 1, and research 2.**

**C. The strike pull.** Leave as is, or make it fade with age once sourced. **Recommend:** measure and source first.
