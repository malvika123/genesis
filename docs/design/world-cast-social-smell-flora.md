# The world's cast, social life, smell and taste, plants: design note (Opus review, 24 Nov 2026; not built)

**In plain words.** Keep the four kinds of creature (people, plant-eaters, hunters, fish). Add new animals as new *kinds* inside them, each behind a switch and appended at the end of the list, so nothing old moves. Crocodiles and hippos become a danger in the water, not creatures with brains. Theropithecus joins as a grass-eating plant-eater; Papio waits (not in the checked Afar list). Grooming and play can be built now. Making up and comforting cannot: **nobody in the band can quarrel today**. Taste memory works on the globe; smell needs the valley's small squares, and the valley is not on this branch.

## 1. Architecture
**Keep:** the roles (`sp`), `KDEF = [0,1,4,7]` (`src/config.js:338`), the 16 channels per direction (`config.js:23`). A hominin sees any plant-eater on channel 3 and any hunter on channel 5 (`src/senses.js:313`). Honest: meaning is learned from pain, as with buffalo (`sim.js:1558`).
**Must change:**
- **Append, never insert.** Inserting shifts Fish (7), `KDEF` and `PREYK=[1,3]` (`preymap.js:20`). New slots need an ice-age placeholder with `off:1`, or `world.js:57` reads `ICE_KINDS[k]` as undefined.
- **Spawn:** `creatures.js:200-203` shares the role total by `share` and forces at least 2 of every kind once `n >= 2*kinds.length`. New kinds would steal hyena and leopard numbers and change the random draws. Filter `!KINDS[i].off`; new kinds get their own count on top.
- **Rescue** (`creatures.js:340-370`) already covers every hunter kind; it must skip `off` kinds.
- **Prey map:** two classes are hard-wired (`preymap.js:33-34`, `:39` buffShare, `c < 2` at `:130` and `:160`, `tools/analysis/ledger.js:53`). Make it `PREYK.length` classes with one share each. **Cost:** every watched square shows one herd brain *per class* (`:158-178`): 8 classes is about 4 times today's. Measure ms per step first.
- **Danger:** keep the general rules (`preyMax`, `sim.js:1478`; big prey fights back, `:1546`, `:1558`). No unprovoked elephant, rhino or buffalo attacks (no rate found).
- **Drawing:** `app.js:2104-2106` falls back to `LOOK[a.S.look]`, and `globe3d.js:783-860` reuses `drawCreature` (its key includes `a.k`), so `look` plus a colour covers both views. Add `LOOKRGB` (`senses.js:127`); fix `plural()` (`world.js:5`); own shapes later in `AFRICAN` (`app.js:1883`). Page counts come from `kindCounts` (`app.js:2745`) and need nothing.
**Water danger:** a fixed hazard on freshwater squares (crocodile; hippo on river squares), checked on drinking (`sim.js:1135`), wading or swimming there. Harm goes through `hp` and `ouch` (causes "crocodile" or "hippo"). Nothing is added to sight: the band learns from pain and from watching others hurt.
**Baboons:** a plant-eater class on the prey map (grass; prey of cats). A role of their own would need a new channel and brain: defer it.

## 2. First additions (O = page opened; S = snippet; A = ASSUMPTION, test 0.5× and 2× or across the range)
| Kind (role) | Present? | Mass | Life history | Number |
|---|---|---|---|---|
| Dinofelis (hunter) | Hadar; Maka'amitalu 2.35 Ma (O) | 149 kg, one study (O) | A: leopard field data (O) | A; leopard 5.4-5.7 per 100 km² (O) as anchor |
| Homotherium (hunter) | Denen Dora 3.2 Ma (O): from the start, not "later" | up to 200-250 kg (O) | A: a living big cat | A |
| Chasmaporthetes (hunter) | Hadar (O) | A (N. American 99 kg, O) | A: spotted hyena (O: 110 d, 1-3 young) | A |
| Pachycrocuta (hunter) | **not found at the Awash** | 100-110, up to 150 kg (O) | A: spotted hyena | A |
| Wildebeest (map) | Mille-Logya (O) | 140-290 kg (O) | 8.5 months; first calf at about 2 (O) | share A |
| Hipparion (map) | Mille-Logya (O); Equus only from 2.27 Ma | A: zebra 175-322 kg | A: zebra | share A |
| Pig (map) | Notochoerus, Kolpochoerus (O) | A: warthog 45-150 kg | A: warthog (5-6 months, 2-4 young) | share A |
| Giraffe (map) | Giraffa (O) | 828-1,192 kg (O) | 400-460 d; first calf at 4 (O) | share A |
| Theropithecus (map) | T. o. oswaldi from 2.50 Ma (O) | about 72 kg (one source) | A (not found) | share A |
| Crocodile (water) | Crocodylus, Euthecodon (O) | 40-750 kg (O) | n/a | 1.4-3.1 per km (S) → A; attack rate A (Pooley 2019: no reliable data) |
| Hippo (water) | common at Hadar (O) | 1.37-1.48 t (O) | n/a | bull holds 50-100 m of river (O); density and attack rate A |

Elephant, rhino, Deinotherium second (elephant mass not in the notes). Prey total stays `preyLevel` 5,000 kg/km² (A, `world.js:198`). `preyMax` and climbing for extinct cats: A.

## 3. Social behaviour
**Hooks:** the social drive `D[7] = social·so·lo + 0.8·grief + 0.5·miss` (`sim.js:282`); loneliness (`:255-263`); `a.bonds` (`:2101-2134`, today adult partners only, at most 4); grief (`:2066`); `a.stress` (`:562`); play (`:737-752`).
- **Grooming (`--grooming`):** a new action `A_GROOM` toward an adjacent awake member of the band. It raises `NA` (19): the new output must start at zero weight with no random draws, and the identical-worlds check must confirm it. Both lose loneliness and gain bond strength, which needs bonds beyond mates (`--friend-bonds`, the `addBond` rules). The inborn pull, fading with tiredness like `SOC.lust`, has an assumed strength (A). The calming effect has a direction only (giving grooming went with lower glucocorticoids; abstract): its size is A, or leave it out. **Do not impose** 5.7-11.7% (S) or the 20% ceiling (O): they are the yardstick. Above 20%, find the cause; never tune it down.
- **Play:** exists. Measure social and solitary play separately against Gombe (O): social 15.16% at age 2, solitary 21.78% at age 1, under 5% by 4.
- **Reconciliation and consolation: blocked.** `edible()` (`senses.js:28-34`) stops hominins from striking each other, and the code has no squabbles; the yardsticks (14-22% chimps, 30-40% baboons, consolation about 24%) are per conflict. See §7.
- **Bonds and infant survival:** not a rule. Measure the mother's bond strength against her infant's survival as an open question.
**Page:** grooming on the hominin panel (with whom, share of the day), a bond web in the band view, play on the measures tab.

## 4. Smell and taste
- **Taste (`--taste-memory`, globe):** three contact readings when eating (sweet, bitter, sour/rotten), each a noisy reading of the real food, plus an inherited bitter sensitivity. Inborn: liking sweet, disliking strong bitter and rot (supported). **One-trial illness:** at the sickness points (`sim.js:986-998`, `:1025-1035`) store {square, food class, strength}, allowing hours of delay. Read it back as one `FOODIN` input ("bad before, here or of this food"). How fast it fades is A (marmosets 4 weeks, S); test 0.5× and 2×. Rewards build over several trials through normal learning; `a.mem` (`brain.js:425`) already keeps salient experiences.
- **Smell (`--smell`, valley only):** as `smell-droppings.md`. At 250 m squares, fruit (lemurs 4-15 m, downwind: the only distance found) stays inside its square; a carcass (under 200 m, A) reaches the next square downwind at most. The globe keeps `d <= 2` (`senses.js:226`).

## 5. Plants and small animals (page, from engine data)
- **Trees by place** (`globe3d.js:299-330`, chosen by water nearness and cover): fig and Tamarix on wooded river squares; flat-topped Acacia (white flowers, coiled pods), Commiphora and Grewia on dry, lightly wooded ground; reeds and sedges at freshwater edges; Balanites. Unsourced colours: plain greens, said so.
- **Scenery** (labelled "not simulated"): ostrich on open ground; crowned crane, spur-winged goose and darter at water; terrapins. Beetles, bees, termites: neighbouring site, flagged. Frogs, butterflies: not found, not drawn.

## 6. Bundles (one combined test each; prediction first; 24 worlds, 4 workers, `nice`)
1. **Cast:** `--more-hunters`, `--pachycrocuta`, `--more-herds`, `--water-danger`. *Predict:* more hominin deaths from predators and water; step time ×2-4. *Measure:* deaths by cause and kind; predation per person-year against the primate median of about 3%; kills by hunter; newcomers per kind; herds and ms per step; identical worlds with everything off. *Risks:* the share trap in spawn; rescue keeping assumed-density kinds alive; the hazard rate deciding the result (report both ends).
2. **Social:** `--grooming`, `--friend-bonds`, play measures. *Predict:* grooming 0-20% of the waking day; less time feeding. *Measure:* grooming share by age and sex, bonds, stress, feeding time, births. *Risks:* identity broken by the new output; grooming crowding out food; a pull so strong it is hidden tuning.
3. **Taste memory:** `--taste-memory`. *Predict:* fewer repeat sicknesses. *Measure:* repeat poisonings, rot sickness, diet shares. *Risk:* aversion spreading to safe fruit.
4. **Look of the world:** page only; checked in Chrome.
5. **Smell:** after the valley is merged.

## 7. For the owner (recommendation)
1. Quarrels inside the band (needed before making up and comforting): research what chimpanzees fight over first.
2. Leopard: earliest record about 2 Ma (Wikipedia only), yet the world has leopards. Keep, register, add a `--no-leopard` arm.
3. Sabre-tooth mass: the code has 110 kg (`config.js:364`); the African Megantereon is 66.6 kg (O). Correct it behind a switch.
4. Pachycrocuta: on its own switch, labelled "not found at the Awash".
5. Papio and zebra stay out; Theropithecus and hipparion come in.
6. New hunters come on top of the old numbers: yes.
7. Scenery birds, labelled "not simulated": yes.
8. "Stabilise the population first" conflicts with "build it all": build it, and report survival honestly.
9. Bring the valley into world2 before smell: yes.
