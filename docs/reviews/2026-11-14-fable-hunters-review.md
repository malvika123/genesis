# Review of the prey map, the hunter's stomach and the hunting pull (Fable, 14 Nov 2026)

Verdict: **the "hunters kill 4–10 times their need" result is mostly a measuring error. Do not build A34 yet.**

Read-only. I ran one diagnostic (worlds 1–4, 30 days, `--prey-map`, today's defaults; it only reads the world and reproduces
entry 68's death tallies exactly). For each new antelope or buffalo carcass marked "killed by a predator" it asked who stood
within 2 squares just before: a hunter, or only hominins. It also added up what went into hunters' stomachs. This is a
proximity proxy, not the world's own record, so step 0 below must confirm it.

| World (map on, 30 days) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Ledger (entry 68), kg "killed by hunters" per hunter-day | 45 | 44 | 15 | 28 |
| Of that weight, killed with **only hominins** near | 70% | 55% | 13% | 31% |
| Buffalo killed with only hominins near (of all buffalo) | 27 of 33 | 12 of 17 | 1 of 3 | 4 of 9 |
| Kills with a hunter near, kg per hunter-day | 13 | 20 | 13 | 19 |
| **Eaten** by hunters, kg per hunter-day (need 3.9–8.4 by kind) | 6.5 | 5.6 | 5.9 | 5.2 |
| Days per kill, per hunter (real leopard: 5.6, Odden & Wegge 2009) | 6.7 | 4.3 | 4.9 | 4.4 |
| Hunter samples on a square that can carry no prey | 82% | 68% | 75% | 97% |
| Hunter samples beside a herd | 6% | 9% | 9% | 9% |

## Findings

1. **HIGH — hominins kill adult buffalo and antelope with bare hands, and the ledger counts them as hunter kills.** A hominin
   cannot bring down prey over 15 kg (`src/sim.js:1288`, chance 0), but each failed try still takes 12 health from the prey with
   no scaling by weight (`sim.js:1364`: the weight rule applies only to hunters), and at 0 health the animal dies as "killed by a
   predator" (`sim.js:1370–1373`). This is entry 64's lesson again ("failure also does harm"), fixed for hunters in entry 65 but
   not for hominins. With the map on, every hominin in prey country always has a herd beside it, and "prey beside me"
   (`src/senses.js:386`) is on for prey of any size. `tools/analysis/ledger.js:57–60` counts every such death at 50 or 600 kg.
   The 8 hominins dead of "wounds" in world 1 are the buffalo fighting back. *Recommendation:* fix the measuring first (step 0),
   then make a hominin's failed strike follow the same weight physics as a hunter's (step 1). Entries 66–68 need a correction
   note: their map-on kill numbers and the "carcasses in reach" result are not about hunters.

2. **HIGH — the ledger compares weight killed with weight needed; they are different things.** Hunters eat 5.2–6.5 kg a day,
   close to need, and kill about once in 4–7 days, close to a real leopard. The weight looks large because every herd animal is a
   full adult (50 or 600 kg; herds have no young), a hunter eats one stomach (11–28 kg) and the rest is mostly lost (finding 3),
   and a sabre-tooth's buffalo counts 600 kg. Real leopards kill more weight than they eat, too. *Recommendation:* the ledger
   should report, per hunter kind: kills by killer (the world already sets `killedBy`, but `herdLoss` clears it,
   `src/preymap.js:160`), kg eaten against need, kg killed, and the share of each carcass eaten and by whom.

3. **HIGH — a hunter cannot keep its kill.** By day, on open ground, birds take about 70% of an unguarded carcass per day of daylight (`items.js:189`), and "guarded" needs someone
   **awake** (`src/items.js:155`). The stomach makes a fed hunter sleepy (`sim.js:219`), so it sleeps and the birds strip the kill;
   next day it must kill again. Real leopards feed on a kill for days and hoist about half of them (51% of 2,032 kills; at least 21%
   lost, mainly to hyenas: [Balme et al. 2017](https://datadryad.org/dataset/doi:10.5061/dryad.gb794)); in Nepal all edible meat
   was eaten at most kills ([Odden & Wegge 2009](https://agris.fao.org/search/en/records/65e013564c5aef494fe804db)). This is the
   missing real thing behind "killed 2–4 times what is eaten". *Recommendation:* step 3.

4. **MEDIUM — hominins eat meat in "units", hunters in kg.** A bare-handed bite is 0.12 unit (`sim.js:930`): about 31 kg of
   buffalo, 7 kg of antelope or a third of a hare in 15 minutes, all giving the same energy. So a buffalo carcass feeds hominins
   no longer than an antelope does. This distorts every scavenging result. *Recommendation:* put hominin eating on kg through
   `kgU`, with a sourced stomach (backlog item).

5. **MEDIUM — hunters stand where the map holds no prey 68–97% of the time (A31), and herds appear only 1 square away
   (`SOC.preyZone` 1).** The herds review asked for "sight + 1". A hunter two squares from prey sees nothing and has nothing to
   walk towards. Dense forest and dry edges holding zero prey is also not true: duikers, bushbuck, bushpig and forest buffalo
   live there, at lower biomass (numbers to find; I could not check any). *Recommendation:* step 4.

6. **MEDIUM — the prey map regrows on the life clock, hunters eat on the day clock.** 0.3 a life-year is about 10% a simulated
   day (`preymap.js:94`). Prey regrows about 120 times faster than hunters can eat it, so no amount of hunting can ever thin it.
   That follows from the two-clocks decision, but it is not written down for the map. *Recommendation:* register it; never read
   "prey holds up" as a result.

7. **MEDIUM — meat is lost at a full store.** Digested energy is cut off at 100 (`sim.js:116`): 340–640 kg a world vanished.
   Half of all kills are made by hunters above 80–90% of a full store. With a 25-day store, a hunter 4 days short feels only 0.15 hunger; in real
   animals an empty stomach and days since the last meal drive hunting. A33 (store size) matters, but after steps 0–3.

8. **LOW — smaller points.** (a) A herd is healed to full health after each kill and shares one body's health across animals
   (`preymap.js:161`). (b) A herd whose shown animal dies of age or wounds is rebuilt with a new brain, so what it learned is
   lost (`preymap.js:154`). (c) A kill fills the stomach in one step. (d) Weight balance and `kgU` for herd carcasses are right;
   I found no kg error there.

## Realism of the numbers (weakest first)

- **Buffalo's share 0.5** — no source. At 2.5 Ma much of the biomass was elephants, hippos, giant pigs and *Pelorovis*, which the
  map lacks. Check whether Fritz & Duncan's 5,200 kg/km² includes megaherbivores; if it does, 5,000 for antelope and buffalo
  alone is too high. Look in Owen-Smith 1988 (*Megaherbivores*), Bobe & Behrensmeyer 2004.
- **One herd per square, no young** — every kill is an adult, so leopards (preferred 10–40 kg) always pay the big-prey price.
  Real herds hold calves and lambs for part of the year. Option for the owner below.
- **Fixed quarter of the pull (0.25)** — direction sourced (Adamec 1976, a cat study), the share not; run 0.1 and 0.5 as planned.
- **Digestion 24 h, sleepiness ×2** — assumptions; the lion "20 hours" is rest in general, not after-meal sleep. Check Schaller 1972.
- **Stomach 0.25** — fine for hyena (Kruuk's 14.5 kg, still cited second-hand); lions are quoted near a quarter too; no leopard
  figure found. Check Bailey 1993.
- **Hunt success** — Bailey's Kruger 16% and Stander's Namibia 38% both confirmed second-hand
  ([leopard fact sheet](https://ielc.libguides.com/sdzg/factsheets/leopard/behavior)); Bailey also gives about 50 kills a year.

## Is A34 the right next step?

No, not yet. Once hominin kills are taken out, hunters kill about as often as real leopards and eat about their need. Lowering
success now would be tuning toward a number that was measured wrongly. A34 stays on the backlog as a question of **time** (a
stalk takes hours; a square is 3 km) and should be judged after steps 0–4.

## Proposed order (each one change, one switch, prediction first)

0. **Measuring only.** Ledger: kills by killer kind (hominins included), kg eaten against need, share of each carcass eaten.
   Prediction: confirms the table above within a few percent.
1. **A hominin's failed strike harms prey by weight**, as a hunter's does. Prediction: buffalo killed by hominins falls to
   about 0; hominin deaths by "wounds" fall, not to 0. Evidence: chimpanzees take prey under about 13 kg (Bugir et al. 2021).
2. **Re-run entries 66–68 on the new ledger** — the true baseline. No change to the world.
3. **A hunter keeps its kill**: a hunter asleep at its carcass still holds the birds off; then, separately, leopards hoist.
   Prediction: weight killed over weight eaten falls from 2–4 to under 2; carcasses in hominins' sight fall. Sources to find:
   days at a kill and share eaten (Bailey 1993; Balme 2017 full text); vultures at guarded kills (Kruuk 1967; Houston 1974).
4. **A31 and the herd zone**: prey in forest at a sourced lower level; herds shown out to sight. Prediction: hunters on empty
   squares fall below 30%.
5. **Hominin meat in kg** (finding 4), then **A33** (store), then **A34** if a gap is still there.
6. **Carcass contests observed, no rule** (hyenas taking leopard kills: at least 21% in Balme 2017), then hunters at measured
   densities.

## For the hominins

What they experience is now mostly wrong in one way: herds they can wound to death, and meat priced in units. After that, the
things that matter most for a faithful 2.5 Ma hominin are: (a) **what is left on a carcass and where** — Blumenschine's Serengeti
work (1986 *J Hum Evol* 15:639; 1987 *Curr Anthropol*; 1989 landscape model) and Domínguez-Rodrigo 2001 (*J Hum Evol* 40:77:
riparian woodland has the least carnivore competition) say scavenging was mainly marrow and scraps from cat kills near wooded
water; I could not reach the persistence numbers; (b) **risk from hunters** — leopard tooth marks on the SK 54 skull (Brain);
attacks on primates are rarely seen (Isbell et al. 2018), so deaths by hunters stay an output; (c) **contests at carcasses**.
Steps 1, 3 and 5 change the hominins' world most.

## Choices that belong to the owner

- **Herds without young.** Option: a registered share of each herd's kills are young (smaller weight), from a sourced calving
  figure. Cost of leaving out: leopards look worse at hunting than they were. *I recommend adding it, after step 3.*
- **Megaherbivores absent from the map.** Cost: no elephant or hippo carcasses, which may have mattered to early hominins.
  *Recommend: defer, but register, and source the buffalo share now.*
- **Regrowth on the life clock** (finding 6). *Recommend: keep, register the cost.*
- **Whether hominins should feel "prey beside me" for prey far too big.** It is an inborn pull, so it is yours to set.
  *Recommend: leave it and let pain teach (step 1 first).*
- **Correction notes on entries 66–68.** *Recommend: yes, the same day, as entry 63 did.*
