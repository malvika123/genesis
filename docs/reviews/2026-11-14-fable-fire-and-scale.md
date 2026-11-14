# Review: fire-making, and scale against time (Fable, 14 Nov 2026)

Read-only: no source code changed. Code read on branch `percept`; data from entry 75. Web sources checked today are linked;
anything marked "memory" was not checked and must be before building.

**In one line.** Fire-making as built is not faithful and should not be on by default. Claude's view on scale is right in its main
point (never make discoveries easier), but it misses that the squeezed year already distorts learning, and that no laptop run can
close the gap to the real record: only rates can be compared.

## Part 1. Fire

**1. HIGH — Fire-making is a counter outside the brain, and it fills up by itself.**
`src/sim.js:1201–1210`: any strike while holding a stick over a stick on the ground is "rubbing". Each such step adds to a hidden
skill (`firePractice`, `sim.js:1494–1498`), the skill never fades, and the chance of fire is 0.6 × skill² a step. The strikes come
for free from the inborn pull to strike with whatever is in the hand (`src/brain.js:128–135`, weight 0.9). My arithmetic from these
numbers: for a hominin that has never handled fire, about 150 such steps in a lifetime (about 38 hours, not in one sitting) make
fire nearly certain. No creature has to learn anything in its network; the world does the learning for it. This is the same kind
of rule as the fire-watching rule the owner switched off in entry 61, and it conflicts with "nothing scripted" and "do not invent
mechanisms of our own".

**2. HIGH — The rate is wrong by many orders of magnitude.**
Entry 75: fire by rubbing in 20 of 24 worlds (map on), first on days 6–96 (`data/findings/75-checkpoint-run/map-on.csv`). The
whole run is at most 60,000 hominin-days (24 worlds × 100 days × 25, fewer in truth). The record: the earliest fire-making is
Barnham, about 400,000 years ago, with pyrite ([Davis et al. 2025, *Nature*, via UCL](https://discovery.ucl.ac.uk/id/eprint/10219125);
[summary](https://www.sci.news/archaeology/earliest-evidence-fire-making-14416.html)). Before that, some 2 million years of
hominins numbering in the tens of thousands (effective size about 18,500 before 1.2 Ma:
[Huff et al. 2010, *PNAS*](https://pmc.ncbi.nlm.nih.gov/articles/PMC2836654)) left no sign of it. That is on the order of 10¹⁰
hominin-years with no known invention, against about one invention per 1,000 hominin-life-years in Genesis. Caveat: friction fire
leaves little trace, so the true first date could be older; it cannot be older by seven orders of magnitude.

**3. MEDIUM — The physics is missing, and two details in the code are wrong even on their own terms.**
Real friction fire needs a chosen pair of dry woods of the right softness (best spindles about 0.42 density in a 74-species
trial), a notch where the hot dust gathers, speed together with steady downward pressure (measured at about 2–3.5 kg), then an
ember moved into a tinder bundle and blown into flame ([Storm, hand-drill inquiry](https://www.primitiveways.com/hand_drill.html);
practitioner source, not peer-reviewed; I found no peer-reviewed ignition figures). Genesis has none of these: any stick on any
stick, on any ground not in rain (`src/fire.js:55`), in 15-minute steps. Also: (a) the "4 steady steps" condition gates only the
0.0004 base chance, not the skill term (`sim.js:1209`), so a skilled hand lights fire on a single strike; (b) at skill above 0.15
the creature is paid a reward for "smoke" (`sim.js:1208`), a built-in push along the path to the outcome.

**4. MEDIUM — The pyrite path is no better.**
Same structure (`sim.js:1191–1200`: 0.0003 + 0.5 × skill², any dry grass as tinder). It is only rarer because pyrite is rare (2 of
24 worlds map on, 4 map off). Real spark fire needs pyrite, a hard striker, a prepared tinder that holds a spark (tinder fungus in
the experiments) and blowing ([Sorensen, Claud & Soressi 2018, *Sci Rep*](https://pmc.ncbi.nlm.nih.gov/articles/PMC6053370)).
It is the path the record shows first, 2.1 million years after Genesis' date, by a large-brained hominin.

**5. MEDIUM — Made fire leaks into every other result.**
In 15 of the 20 worlds the first burning stick is on the same day as the first rubbed fire: most fire handling in entry 75 starts
from made fire, not wildfire. Burned deaths (8–14% of all deaths), cooked food and "set fire" are therefore mixed results. Entry
75's deaths table cannot be read cleanly while fire-making is on (compare backlog B19).

**6. MEDIUM — Using wildfire: part faithful, part beyond what apes show.**
Faithful: finding food on burned ground. Fongoli chimpanzees stay calm near wildfire, predict its movement and forage more in
burns ([Pruetz & Herzog 2017, *Curr Anthropol*](https://www.journals.uchicago.edu/doi/10.1086/692112)); the "pyrophilic primate"
idea puts such use of burns at 2–3 Ma ([Parker et al. 2016](https://carta.anthropogeny.org/node/308268)). Not evidenced at 2.5 Ma:
carrying fire, feeding it, keeping it. The oldest claims are about 1.5 Ma (Koobi Fora FxJj20 AB,
[Hlubik et al. 2019](https://carta.anthropogeny.org/node/322728)) and 1.0 Ma (Wonderwerk,
[Berna et al. 2012, news](https://www.nature.com/articles/nature.2012.10372)), both debated
([Gowlett & Wrangham 2013](https://www.journals.uchicago.edu/doi/10.1086/692530)). I found no report of wild apes carrying fire.
In Genesis a burning stick is taken in most worlds within days, partly because the strike pull turns "stick in hand beside a fire"
into a brand automatically (`sim.js:1182–1190`). Good news: "kept a fire for hours" happened in 0 of 48 worlds, which matches the
record. The physics (a stick in a fire catches; a dropped brand lights dry fuel) is real and should stay.

## Part 2. Scale and time

**7. Claude's main point holds.** Making discoveries easier because the band is small would be tuning toward an outcome. Agreed,
fully.

**8. HIGH — But "enlarge the scale" cannot reach the record.**
The real exposure is about 10¹⁰ hominin-years or more. One entry-75 run (21 minutes on 4 workers, from the file times) is under
20,000 hominin-life-years. A month of nightly runs adds two or three zeros, not six. So a rare invention should not merely "not
happen in a small run": it can never be tested by whether it happens. The honest statement of a zero is an upper bound: nothing
in N hominin-years means the rate is below about 3/N (the "rule of three", memory). Genesis can only be compared with the record
on things frequent enough to see in thousands of hominin-years: what living apes do in every community (nut cracking, digging,
meat, accidental flakes) and life history. Anything rarer that appears in a small run is a warning sign, as fire was.

**9. HIGH — The squeezed year is itself a rate change, and it cuts against learning.**
A life-year holds 3 days of doing instead of 365: about 122 times less practice, fewer trials and fewer chances to watch others
per childhood. A youngster's learning window for nuts (3.5 to about 10 years) is about 20 simulated days. `nutSessions` = 500
strike-steps (`src/world.js:119`) is then 125 hours of cracking inside 20 days. The network itself gets a lifetime of about 120
days of experience. Two consequences. (a) Results about learning across a life are not clock-safe: "watching does not help" and
"skills are reinvented alone" (entries 54–58, 62) may partly reflect childhoods too short to watch and practise in; they should
carry that caveat until tested. (b) Chance-per-step events (flakes, fire) run on the day clock, so the right exposure for them
is hominin-days of activity, and for passing-on it is generations. The ratio between the two is 122 times off, and no single
setting fixes both.

**10. MEDIUM — Per-step numbers do not say what a step stands for.**
One strike action is 15 minutes. `nutP0`, `nutSessions`, `flakeP` 0.05 read like per-blow numbers but act per quarter-hour bout.
Each should be registered as "per 15-minute bout", with its source re-read on that basis.

**11. LOW — Seasons.** With a 3-day year a dry season lasts about a day. Whether wildfire, nut and fruit seasons give realistic
exposure per life-year was not checked here; it belongs on the backlog.

## Choices that belong to the owner

**A. Fire-making.**
1. *Off by default, `--fire-making` to keep it as an experiment.* Cost: a flipped default and a re-run of entry 75's table; the
   "made fire" story disappears from the live page. **My recommendation.** This does not leave out something real: at 2.5 Ma
   nobody made fire.
2. *Make it physically real:* wood kinds, a notch, heat that builds and is lost within a step, an ember state, tinder, a blowing
   action, and no skill counter (the network must learn the chain). Cost: five or more new mechanisms, each with assumptions, and
   a time step too coarse for the heat; the faithful result would be "never happens", the same as option 1. Backlog, low priority.
3. *Leave on.* Cost: every result on deaths, cooking and discovery stays mixed with something unreal.
   Whichever is chosen: fix the two code points in finding 3 if the experiment is kept.

**B. Wildfire use.** Keep the physics; report taking, dropping and feeding as rates per hominin-day beside the ape evidence (none
seen). Separately decide whether the strike pull should apply at a fire: leave it (cost: brands more often than apes show) or have
the inborn fear of fire outweigh it (cost: one more inborn rule, to be sourced first). **Recommend:** re-run with fire-making off
first, then decide from the clean numbers.

**C. The timeline.**
1. *Do not shrink or ease anything; change the reporting.* Every discovery as events per 1,000 hominin-days and per 1,000
   hominin-life-years, zeros as upper bounds, beside ape or record rates. Cost: a tool change, no run time. **Recommend, first.**
2. *Test the clock once at both ends:* the same seeds at 3 and 12 days a year, for nut skill and watching. Cost: `TY` becomes a
   setting; about 4 times the run time per life-year (about 85 minutes for an entry-75-sized run). **Recommend**, as the rules ask
   for uncertain numbers.
3. *More worlds for more exposure.* Cost is linear: 96 worlds × 100 days about 85 minutes at 4 workers. Bigger bands are cheaper
   per hominin (100 founders ran 2.5 times slower than 25 in my 8-day timing) but entry 53 found more hunger. Several bands with
   young adults moving between them is real and missing; it needs design. Backlog; the owner decides when.
4. *Speed up skill gain to match the life clock.* Not recommended: it mixes the clocks, and the network's learning cannot be
   scaled the same way.
