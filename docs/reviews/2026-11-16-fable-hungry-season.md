# Fable reviews the hungry-season design (16 Nov 2026)

Review of `docs/design/hungry-season.md`. Read-only; Fable had web search (each source marked with how deeply it was checked).
Kept in full below as Fable's summary to the owner; the decision on each point is the owner's.

**Verdict.** Do not build as drafted. The diagnosis is half right, a third cause is missing, and the best evidence found says the
proposal would put the fruit low in the wrong part of the year.

**The code.** Causes 1 (the soil cannot dry in a 72-step dry season) and 2 (fruit, nuts, roots read warmth only) confirmed. **Cause 3,
missing: the stocks remember for years** — fruit loses 0.05% a step (half-life about 1,390 steps: 14 real days but 4.8 squeezed years),
nuts 0.02%; even seasonal ripening cannot make the standing crop fall in a 72-step season. The world-2 dip is not yearly (year 2 only;
cause untraced: eating, or trees thinning below the 0.25 cover line where fruit is set to zero). `wetness` is 1 at all three homes.
Rain has no real unit: score its shape only. **A squeezed month is 6 hours and always the same hours**: any "by month" count mixes
season with day and night. World 1's home (soil 0.88–0.94) is wet forest, not savanna.

**Evidence.** Uvinza (beside Ugalla/Issa), monthly 1973–1997 (J. Moore's Ugalla rainfall page; checked, full table): 750–1,280 mm a
year; Nov–Apr 100–250 mm a month; June–August 0 mm in most years: one wet season, 5–6 dry months. Issa 930–1,540 mm, dry May–Oct
(summaries). Fongoli 945 mm in about four wet months (Wessling et al. 2018, *Front Ecol Evol* 6:60; half read). 2.5 Ma: no rainfall
figure; Blumenthal et al. 2017 (*PNAS* 114:7331) no long aridity trend in Omo-Turkana, seasonality instead (summary). Soil: no sound
number (Räsänen et al. 2020, *Ecohydrology* 13:e2213, abstract). **Fruit timing: at Issa ripe fruit peaks in the late dry season**
(*Int J Primatol*, doi 10.1007/s10764-015-9856-y, summary); at Nguye (Ugalla) the non-fruiting season is the early rains (*Primates*
2022, doi 10.1007/s10329-022-01018-9, summary): for woodland fruit the low comes when the soil is wettest; ripe fruit trails the rains
by about half a year; no lag in months found. Hadza differ (berries in the wet season). Tubers: "the most continuously available but
least preferred" food (Marlowe & Berbesque 2009, *Am J Phys Anthropol* 140:751, abstract); regrowth only in the rains unsourced.
Hunger: Fongoli chimpanzees avoid stressful negative energy balance; their dry-season stress is heat and water (Wessling et al. 2018);
Hadza show no significant seasonal change in mean BMI or fat (Sherry & Marlowe 2007, abstract).

**The four questions.** (1) Seasons are on the life clock (`season()` already runs on `TY`); one storm's effects stay on the day clock.
Reject rescaling soil moisture (it would dry soil in 18 hours and switch on fire dryness, ground heat, tree dieback and grass loss at
once) and reject waiting for F4 alone (fruit ignores water). Recommend: a yearly plant calendar on the life clock, driven by the
square's own rain over past months counted in shares of a year (not the rain belt's position); leave soil moisture alone.
(2) Fruit first and alone — not "soil moisture with a short lag" (wrong season). One fruit kind: make it woodland tree fruit and
register it (Hadza wet-season berries left out: the owner's call). Nuts: old rule until sourced. Roots: all year (sourced).
(3) Issa/Ugalla with the Uvinza table as the stage 0 yardstick, a labelled stand-in; score shape only; do not pick the basin now.
(4) See below.

**Missing.** Cause 3 and a clock for every plant rate; registry rows for the lag, the hang time, the rain window; the prediction's
direction and timing; the stand-ins' real dry-season costs are water and heat (stage 2); a body cannot feel an 18-hour season, so the
body-side test belongs with F4/A40. For the owner's list (left out, not dropped): honey and termites by season, young leaves in the
early rains, riverine against woodland fruit, more carcasses in the dry season, drought years, birth seasons.

**Wrong reasons.** A changed yearly mean instead of timing (hold it equal); month mixed with hour; start-up drift (drop 8–10 years);
storms and drifting rain patches (average 10+ years and several worlds); trees thinning below 0.25; side effects if soil moisture is
touched; a fruit peak placed in the rains; bunched hunger deaths (the stand-ins shift diet without starving: a warning, not a pass).

**Smallest first step.** Measuring only: 10+ settled years, by month across years and worlds, as shares of the year; score home rain
against Uvinza's shares. Read in full first: Piel 2017's phenology, the Issa 2015 and Nguye 2022 papers, Marlowe & Berbesque 2009,
Räsänen 2020. Then one change: the fruit calendar on the life clock (ripening × the square's rain over a past window, with the sourced
lag; hang time sourced; yearly mean unchanged); `--fruit-follows-warmth` restores; match the month of peak and low relative to the
rains; prediction: ripe fruit lowest in the early rains, highest in the late dry season; roots and leaves eaten more in the low months;
on the 3-day year hunger deaths do not bunch. **Size: 3–4 days**, not 1–2.
