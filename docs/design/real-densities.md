# Real densities near people (plan item 29) — design, 24 Nov 2026

**Problem (entry 129).** Hunter numbers are set by two rules I added, not by the land: `rescue()` (a kind below 4 gets one newcomer a year) and per-kind caps of 3-6. So 1, 2 or 4 starting hunters all end at the same number, and a real density cannot be tested.

**Idea (same as the prey map).** The land holds hunters as a number per square (density x 9 km2). Hunters are shown as real agents only in the square of a hominin and the 8 around it; a square nobody is near sets its hunters aside and brings them back later (as herds already do). No floor, no cap for hunters: the land sets the number.

**Densities (per 100 km2), live-checked, note `docs/reviews/2026-11-24-real-densities-live.md`.**
| Kind | Value used | Source / flag |
|---|---|---|
| Leopard-like (Panthera) | 6.8 | Ruaha, Acacia-Commiphora by a river (opened) |
| Spotted/giant hyena | 3.6-10.8 (try 7) | Ruaha; Ethiopian sanctuary 95 is a high end |
| Lion-like | 1.4 | Awash today (degraded park: low end) |
| Dinofelis, Homotherium, Pachycrocuta, others | **ASSUMPTION**: no measure exists; start from the living animal of the same size and diet | flagged; tested at x0.5 and x2 |
| Hippo / crocodile | 26.9 per km river / 1-5 per km river | opened (Mara; Zambezi) — water danger comes later |

**Expected size.** One square = 9 km2, so about 0.6 leopards and 0.6 hyenas per square. A hominin's 3x3 zone (81 km2) holds about 5-6 leopards. Cost is about the current 12 hunters per zone, but now moving with the band.

**What to tune afterwards (and only this).** How often a hunter that meets a hominin attacks, against the measured primate rate: median about 3% of the band a year, Tai 5.5% (Boesch 1991: attack risk 0.30, 4 of 22 encounters fatal). Written before the run. The "our timeline" match is held out until the end.

**Test plan (one combined run, 12 worlds per arm, predictions written first).**
- Arm A: current world. Arm B: real densities, extra hunters on. Arm C: B at x0.5, Arm D: B at x2.
- Read: predator deaths per 1,000 hominin-years, share by kind, hunters alive near bands per day, run time per step.
- Prediction: B gives predator deaths within 2x of the Tai range; C and D now differ clearly (the old test could not).

**Switch:** `--real-densities` (off = identical worlds; checked with tools/identical-worlds.sh). Registry rows for every number.
