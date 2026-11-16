# Design: the hungry season (master plan step 0.4; R1, G1) — for review before building

Status: **draft for independent review**, 16 Nov 2026. Nothing below is built.

## What was measured (measuring only: `tools/analysis/seasons-at-home.js`, 3 worlds × 2 years, means within 4 squares of home)

| World (home latitude) | Rain, wettest → driest month | Soil moisture through the year | Fruit, roots, nuts through the year |
|---|---|---|---|
| 1 (3°) | 0.0064 → 0.0008 (dry months 8–10) | 0.88–0.94 | no yearly cycle (a slow drift from the start) |
| 2 (5°) | 0.0051 → 0.0021 | 0.57–0.63 | fruit and nuts dip in months 11–12 (warmth), roots flat |
| 3 (9°) | 0.0038 → 0.0003 | 0.62–0.71 | no yearly cycle |

**There is no hungry season.** Two causes, both in the code:
1. **The soil cannot dry in a squeezed dry season.** Rain soaks in and drains at 15-minute rates (`src/weather.js`: drainage 0.0006 a
   step, evaporation 0.004 × moisture × warmth × dryness). A squeezed year is 288 steps, so a three-month dry season is 72 steps — less
   than a real day of drying. The rain belt does move with the sun (`lift`, ±8°), so rain itself is seasonal; the soil is not.
2. **The hominins' foods ignore water.** Fruit (`src/forest.js`), nuts and roots (`src/items.js`) grow by warmth only (`growthAt`);
   only grass also follows soil moisture (`src/sim.js`, `wetness`). Near the equator warmth hardly changes, so neither does food.

## Evidence (to strengthen; web pages and abstracts only — the Issa paper's full text could not be read on this laptop)

- **Hadza** (savanna foragers, Tanzania): two seasons; berries, honey and most fruit in the wet season; meat and baobab more in the dry;
  tubers available the whole year and eaten as a fallback (Marlowe & Berbesque 2009, *Am J Phys Anthropol*, as summarised; Murray et
  al. 2001 lists foods by season and differs on baobab and tubers: to read).
- **Ugalla** (savanna chimpanzees, Tanzania): forest fruit lacking in the dry season; woodland fruit present all year but more in the
  rains; fibrous foods eaten in the non-fruiting early rainy season (summaries of Hernandez-Aguilar's work; to read).
- **Issa** (Piel et al. 2017, *J Hum Evol* 112:57): woodland species eaten more in the late dry season; consumption not related to
  fruit availability (abstract).
- **Soil water** falls gradually through the dry season in Kenyan rangeland (Kiboko; summary); TAMSAT soil-moisture records for East
  Africa from 1983 exist (Reading).
- **Fruit timing**: no source found yet that gives the lag between rain and ripe fruit in months; Taï peaks at the wet-to-dry
  transition; at Kibale sunlight predicts fruiting better than rain (Polansky & Boesch 2013 and others; to read).
- Hominin teeth record seasonal food stress (Joannes-Boyau et al. 2019, *Nature*; Sponheimer et al. 2006, *Science*: master plan,
  checked by search).

## Questions for the reviewer

1. **Which clock?** A season is a yearly thing (the life clock), but soil drying is physics (the day clock). Options:
   (a) run the soil's *seasonal* water balance on the life clock — drainage and evaporation scaled so a squeezed dry season dries the
   soil as a real one does (about 120 real days into 72 steps), daily weather unchanged; (b) wait for F4 (the real-length year) and
   build the season there only; (c) drive fruit by the *rain belt's position* (the season) with a sourced lag, leaving soil alone.
   Which is faithful, and which keeps the owner's two-clock rule?
2. **What should follow water?** Proposal: fruit and nut ripening follow soil moisture with a lag (to source); grass already does;
   roots and tubers stay year-round (the fallback, Hadza) but grow back only in the wet season.
3. **Which real place's year?** Rain at 2.5 Ma in the Turkana / Awash basins was seasonal and semi-arid; a modern analogue with monthly
   data (Turkana, Issa, Ugalla) to score against — which one?
4. What would make a hungry season come out right for the wrong reason?

## Proposal (after review; each with a switch and a prediction)

1. The soil's seasonal drying (`--soil-never-dries` restores), checked against a sourced dry-season soil-moisture fall.
2. Fruit and nuts follow soil moisture with a lag (`--fruit-follows-warmth` restores).
3. Prediction to write before the run: hunger deaths and eating of roots, leaves and meat bunch in one part of the year.
