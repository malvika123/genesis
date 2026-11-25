# The standard valley setup for survival experiments (26 Nov 2026)

What entries 141-149 settled on, as flags (every one is off by default, so old worlds stay identical; the page does not use them yet):

`--valley --open-valley --more-hunters --giant-hyena --african-megantereon --more-herds --real-densities --dens-zone 18 --dens-tau 1 --body-model --young-leaves --termites --hom-avoid --no-big-attacks --valley-prey-scale --people 60`

- `--dens-tau 1`: hunters hold the real density from the first day (entry 140: the old 5 was a unit slip between the day and the 3-day year).
- `--hom-avoid`: hunters pass up primates as their real kinds do (leopard 0.55, hyena 0.03; entry 142).
- `--no-big-attacks`: hominins do not attack prey they cannot bring down (entry 144).
- `--valley-prey-scale`: the prey map over a 250 m square, not a 3 km one (entry 148; a correction).
- `--people 60`: a community inside the real chimpanzee range (30-80; foragers' bands 20-40; Ngogo near 200). Entry 149's claim that it halves each person's risk was withdrawn (entry 150): the busy-day risk is the same at 25, 60 and 100. The Pliocene band size is not known: an assumption with the range 30-80.
- `--hom-try 0.01 --pass-cd 96` (entries 151-153): the working calibration of the hunters' stalking to the real attack rate on chimpanzees (about 0.3 a person-year, Boesch 1991): 1 in 100 tries at a hominin goes ahead, and a hunter that passes one by leaves it alone for a day. Two fitted unknowns against one measurement: assumptions, not mechanisms; not yet in the standard until the 400-day test (entry 154).
- Not in the bundle: `--kid-pull` (no clear effect, entry 146), `--year-days`/`yearDays` (a build option for the real clock, entry 147: at real clocks the risk is still about 40 times the real rate, so a band dies before a first birth).

Open: the clock (BACKLOG B6; the owner chose "slow life down", 25 Nov), how hunters find and approach people, and the page does not pass these switches (a page view is still to be built).
