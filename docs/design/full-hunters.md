# Design: why full hunters keep hunting (before detectable hunts, F1) — for review before building

Status: **draft for independent review**, 17 Nov 2026. Nothing below is built.

## What was measured (entries 90–91; `tools/analysis/hunt-measure.js`, 3 worlds × 20 days, adult hunters)

| | Hyena | Leopard | Sabre-tooth |
|---|---|---|---|
| Attacks when well fed (energy 80+) | 62% | 33% | 80% |
| … with the fixed inborn pull off (`--hunt-pull-fixed 0`) | 30% | 25% | 61% |
| Kills per adult per real day (field) | 0.35 (not found) | 0.44 (0.14–0.18) | 0.91 (stand-ins 0.12–0.23) |
| Meat eaten per hunter per day (need) | 3.7 (3.9) | 2.6 (4.2) | 13.7 (8.4) |

Reward is the fall of a drive; a full hunter's hunger drive is near 0, so eating barely rewards it, yet "prey beside me → attack",
learned while hungry, carries over when full; a failed attack costs little (no chase energy is charged — to check in the code), so
nothing unlearns it. The fixed inborn pull (`SOC.atkFixed`) is the smaller part.

## Evidence (depth marked)

- Hunger potentiates preying; it does not create it: cats left food to kill a rat (Adamec 1976, *Behav Biol* 18:263; abstract).
- A chase costs little; search and travel cost most; cheetahs caught prey on 52% of days (Scantlebury et al. 2014, *Science*;
  summaries; open PDF at the University of Pretoria repository, not read).
- Bigger carnivores kill less often because they eat more at once and rest longer after (a review of kill frequencies, VIN; summary).
- Gorged lions rest for days and ignore prey (field accounts, not a study); full lions rest up to 20–21 h a day (Schaller 1972, via
  San Diego Zoo; registered). Leopards feed on one kill over days and leave it to patrol (secondary).
- Leopard one kill every 5.6 days, 4.0 kg a day (Odden & Wegge 2009; registered); jaguar 4.3 days between kills (Cavalcanti & Gese 2010).

## Options (for the reviewer and the owner)

1. **Satiety lasts as long as the meal does.** Today a full stomach empties in 24 hours (`SOC.digestH`, an assumption tested 12–48)
   and the energy store caps at 100, so a big meal is lost and hunger returns the next day. A real cat lives on one kill for days.
   Make the store or the stomach hold days of need for big cats (sourced from meal size and days between kills), so felt hunger stays low.
2. **Satiety damps the whole urge to attack, not only the inborn pull** — as hunger "potentiates" preying (Adamec): an inborn brake
   on attacking that grows with fullness, like the hominins' "hunger first". Risk: it is a rule on the brain's choice.
3. **A rush costs energy** (sourced from chase energetics) so that attacking when full is a loss the brain can learn. Evidence says
   the cost is small, so alone it may change little.

Prediction to write before any run: per kind, attacks when well fed fall, kills per adult per day move toward the field, meat a day
stays near need; hyenas checked separately.

## Questions for the reviewer

1. Which option(s) are faithful, and in what order (one change at a time)?
2. The numbers: how many days of need a big cat's meal and body store really hold; whether `digestH` 24 h is faithful.
3. What could make kills fall for the wrong reason (hunters starving, prey numbers, the newcomer rule)?
