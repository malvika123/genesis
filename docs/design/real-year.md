# Step 0.7: the real-length year (F4, A40) — a plan, not built (17 Nov 2026)

**The problem.** A year is squeezed into 3 simulated days (`TY` = 288 steps, `DAY` = 96), so a life has about 122 times less practice and watching than a real one (Fable's scale review).
Entries on learning (54–58, 62) carry a clock caveat. The master plan asks first for the cheapest test: **3 against 12 days a year** (A40), for skill learning.

**What changes if the year is 12 days (`TY` = 1,152).** Everything on the life clock gets 4 × more steps: growing up, nursing, pregnancy, lifespan (`config.js` has about 57 uses of `TY`, `sim.js` 12,
`world.js` 7, `climate.js` 3 for the season cycle, `creatures.js` 3, `forest.js` 2, `preymap.js` 1, `senses.js` 1). Everything on the day clock (eating, walking, a day's hunger) stays. A hominin lives 4 × more days
for the same life-years, so a world needs 4 × the days for the same number of life-years: 400 days for 33 life-years, about 4 × the compute per world. The cost: fewer worlds, so a small first test (12 seeds).

**How (the smallest honest build).** The engine is built from the source files as one text (`tools/engine.js`, `tools/engine-api.js`): add one setting, `yearDays` (default 3), that the builder
writes in front of `config.js` as `const YEAR_DAYS = …` so `TY = DAY * YEAR_DAYS` and nothing else changes. Default 3 must give **identical worlds** (the usual check). The 12-day arm is then
`--year-days 12`. Check what else assumes 3 days: the fruit calendar (`forest.js`, entries 88–89: a real station's months mapped to the year), the rain cycle, hunters' and prey's breeding clocks, and the
experiment tool's `hominin-days / 3` for life-years (`tools/analysis/*.js`).

**Prediction to write first** (both arms, same seeds, equal life-years, nothing tuned): (1) the age at which a hominin first cracks a nut, and the number of strikes to do it, change by 4 × in steps but
not in life-years, if learning is per-strike; if it is per-day, they change in life-years; say which I expect and why before the run. (2) Repeats of the learned acts per life-year rise with the long
year if practice, not years, is the limit. (3) Hunger deaths and birth spacing in life-years stay within seed noise (they are life-clock numbers). (4) The seasonal hunger of the fruit calendar spreads over 4 ×
more days: more time to starve in a lean season: hunger deaths per life-year may rise. Report all four, including the ones that do not hold.

**Sequence.** After entry 98 (baselines with the honest eye): build `yearDays`, identical-worlds check, prediction file, 12 seeds × 400 days per arm, write the entry. Then the real-length-clock
versions of the chain probe (milestone 2) and the hard skill (milestone 3).
