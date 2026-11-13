# Does a bigger band discover more? Tests in an evidence-based simulation of early hominins with learning minds

**Malvika Sen** · draft, revised 13 November 2026 after an independent review (`docs/reviews/2026-11-13-fable-review-2.md`) · Genesis (open source, MIT licence): https://github.com/malvika123/genesis · live:
https://malvika123.github.io/genesis/

*Built and analysed with AI assistance (Claude). Every number below comes from the research log (`docs/FINDINGS.md`, entries
36, 42–54) and the raw data under `data/findings/`; every claim about the real world is sourced there. Comments welcome.*

> **Revised after an independent review (13 November 2026).** (1) Fire-making skill *does* spread by watching in Genesis, through a
> built-in rule outside the brains (`watchFire`, `src/sim.js`): anyone within about 6 km of someone practising or making fire gains fire
> skill. It was not measured, and the firsts that came sooner in bigger bands were all fire events. (2) The spreading measure (4.3)
> was never validated on a case where spreading is known to happen. (3) The copying rule passes on what surprised the elder, so a
> skilled elder teaches almost nothing. (4) "5 of 7 checks" uses bands wider than their sources; against the sourced ranges, 2 of 7 (and 2 more pass bands that are assumptions).
> **Update:** the spreading measure was then checked on a skill whose spread is known, a bug limiting it to the founders was fixed,
> and with everyone born in the run, the means at hand counted and copying switched on and off, no learning by watching was found
> for nut cracking or stick digging: they are so easy that nearly every youngster finds them alone (entries 56–58).
> **Safe claim: in these tests a bigger band did not make more kinds of first discovery within 20 simulated years, within about one
> kind. Why, and whether skills spread, is not yet shown.**

## Summary

Larger populations are thought to keep and build up more culture, because more people make more discoveries and fewer are lost
(Henrich 2004; Kline & Boyd 2010, Oceania). We asked whether this happens in **Genesis**, a simulation of early hominins in East
Africa about 2.5 million years ago in which every individual has its own small neural network, learns only from what its body
feels and what it sees others do, and is told nothing. The world is built from published evidence (wild-chimpanzee life history as
the proxy for hominins, predators, disease), and it passes 5 of 7 checks against real demography.

We gave the same seeded worlds 25, 40 or 80 founders. **A bigger band did not discover more kinds of things** (25 vs 40 founders:
5.5 vs 5.8 kinds of hard discovery per world, difference within noise; 80: 5.9). **Some first discoveries came about two weeks
sooner with 80 founders** — what more individuals trying things would produce by numbers alone. **Bigger bands went hungrier**,
and survived worse per founder (0.82 vs 1.15 at 80 vs 25). The reason, measured directly: **skills did not spread.** Easy skills
such as cracking nuts with a stone were reinvented alone by most hominins, and having watched someone do it made no consistent
difference, with either of two copying rules. In a world where skills do not spread, size gives a band nothing to multiply.

This does not test the hypothesis for real hominins; it shows which condition it needs, and that learning by watching single
actions does not supply it.

## 1. The question

The idea that population size limits culture is old and debated. In models, a larger population keeps more of what is learned
because there are more learners to copy, and loses less by chance (Henrich 2004). Across ten Oceanic societies, larger
populations had more complex fishing tools (Kline & Boyd 2010). Simulations with simple rules have explored it; we wanted to ask
it of individuals that learn as animals do, in a world as close to the real one as the evidence allows.

The question, as the owner of the project put it: *is a bigger band the key?*

## 2. The world (what Genesis contains, and what it leaves out)

**Built from evidence** (each number and source in `docs/ASSUMPTIONS.md`): hominin bodies about three-quarters of a forager's size
with a brain about a third of ours; wild-chimpanzee life history — first birth about 14, fertile to about 50, about 5 years between
births, conception in about one cycle in five; mothers who keep their nursing young close and feed only their own; leopard-,
wolf- and bear-like hunters living where their prey lives; outbreaks of a contagious illness, deadliest for infants, the old and
the starving; fruit, roots, leaves, nuts, meat, wildfire and cooked food.

**Minds.** Each hominin has its own small network (about 20 working units, room for 64) that chooses among 19 actions and learns
from a "better or worse than expected" signal, as dopamine learning does. Only inborn pulls real primates have are built in
(hunger, thirst, fear of hunters, a baby's cry, a mother's pull to her young, sleepiness toward trees). Young hominins learn by
watching an elder close by: they copy what the elder did in proportion to how it turned out for the elder.

**How realistic is the whole?** Over 24 worlds × 33 years (research log entry 52):

| Check | Genesis | Real (wild chimpanzees to foragers) |
|---|---|---|
| Born who reach age 15 | 62% | 35–60% (just above) |
| Life expectancy at birth | 21.7 years | 13–33 |
| Years between births, earlier baby alive | 5.2 | 5.2–6.0 |
| Age at first birth | 15.3 | 13.3–14.9 (band to 15.5) |
| Population change a year | −0.1% | about stable |
| Deaths from illness (share) | 16% | 15–60% (band an assumption: modern outbreaks were partly human viruses) |
| Babies dying in their first year | 5% | 11–21% (fails) |

Against these bands 5 of 7 pass; two bands are wider than their sources (age at first birth: sources 13.3–14.9; years between births: 5.2–6.0) and two are assumptions (population change; illness, widened after the first disease results), so **against the sourced ranges alone 2 of 7 pass** (life expectancy, years between births), and 2 more pass bands that are assumptions. The table also guided the changes it now scores.

**What it leaves out, or simplifies** (stated so the results can be judged): a world of 128 × 80 squares of about 3 km; a year
squeezed into 3 days (some processes run on a day clock, others on a year clock); one band of a few dozen rather than many groups
that meet; brains of a few dozen units, not billions of neurons; hunters kept from dying out by occasional newcomers (a stand-in for
a wider population); fire deaths too common (19%) and infant deaths too rare. Founders start knowing nothing; real hominins 2.5
million years ago already made stone tools.

## 3. Method

- **Identical worlds.** Each world is fixed by a seed. Extra founders join from a separate stream of random numbers, so the land,
  the animals and the first 25 founders are exactly the same with 25, 40 or 80 founders (checked).
- **One change at a time**, each with a switch back to the old rule; switching back reproduces earlier worlds to the last digit.
- **Predictions written before each run** and kept with the data; the main outcome named in advance.
- **Measures.** "Hard discoveries": 11 kinds (eating meat from a body; bringing down an animal; cutting meat with a sharp stone;
  eating fire-cooked food; picking up a burning stick; starting a fire with it; feeding a fire; keeping a fire; making fire with
  sparks; making fire by rubbing; sleeping in a heap of branches) — counted as kinds per world, and the day each first happened.
  Spreading: for behaviours seen in one hominin, the rate of doing it for the first time among those who had watched it in their
  square against those who never had (the logic of network-based diffusion analysis, Franz & Nunn 2009, in a simple form),
  compared between two copying rules.

## 4. Results

### 4.1 Before the young could learn what worked by watching (entry 36)

Same design; the young copied whatever an elder did, however it turned out. 24 identical worlds × 60 days:

| | 25 founders | 40 founders | Difference (95% range) |
|---|---|---|---|
| Alive per founder | 1.14 | 1.17 | +0.03 (−0.19, +0.25) |
| Kinds of hard discovery per world | 4.13 | 4.58 | +0.46 (−0.41, +1.33) |

80 founders (12 worlds): 4.58 kinds against 4.42 with 25. **No effect of size.**

### 4.2 With learning by watching what worked (entry 53)

Since 4.1, two changes to how the hominins learn (entries 50, 52): their expectations were made to match what they actually get (they
had expected about ten times more, which taught them that eating did not pay), and the young copy an elder close by by how its
choice turned out. Hunger fell from 39% to 17% of deaths, and **bands of every size discovered more**: with 25 founders, 4.13 → 5.46
kinds per world; a fire started with a burning stick in 11 → 22 of 24 worlds.

| 24 identical worlds × 60 days | 25 founders | 40 founders | Difference (95% range) |
|---|---|---|---|
| **Kinds of hard discovery per world** | 5.46 | 5.79 | +0.33 (−0.55, +1.22) |
| Alive per founder | 0.97 | 0.84 | −0.13 (−0.32, +0.05) |
| Hunger deaths per world | 4.1 | 10.2 | +6.1 (+4.3, +7.9) |

With 80 founders (12 worlds, against 25): 5.92 against 6.08 kinds; alive per founder 0.82 against 1.15 (−0.33; −0.64, −0.02);
hunger deaths 24.5 against 3.0 per world. **First times** came sooner with 80 founders: picking up a burning stick earlier in 10 of 12
worlds, eating wildfire-cooked food in 9 of 12, making fire by rubbing in 9 of 12, starting a fire with a burning stick in 8 of 11 —
about two weeks sooner on average.

**No more kinds of discovery; some sooner; more hunger.**

### 4.3 Do discoveries spread? (entry 54)

8 worlds × 60 days, with the new copying and the old:

| | New copying | Old copying |
|---|---|---|
| Cracking nuts: hominins who did it | 165 | 175 |
| …first time after watching / never having watched | 70 / 87 | 87 / 80 |
| …rate ratio, watched ÷ not (worlds 1–4 / 5–8) | 0.74 / 1.50 | 0.75 / 1.46 |
| Digging with a stick: hominins who did it | 169 | 165 |
| …rate ratio (1–4 / 5–8) | 0.83 / 1.74 | 0.99 / 1.74 |

Easy skills were done by most hominins, about half of them without ever having watched anyone; watching made no consistent
difference, and the two copying rules gave the same picture. Rare behaviours (fire, meat, cutting) had too few first times to judge.

## 5. Interpretation

In Genesis a bigger band is not the key. More hominins produce some firsts sooner, as more individuals trying things would by
chance, but no more kinds of discovery, and they go hungrier, as larger primate groups face more competition for food. The
hypothesis's own mechanism — discoveries spreading from one learner to others and being kept — is absent: skills are reinvented
individually, and copying a single action ("strike", "eat") does not pass on a sequence ("pick up a stone, then strike the nut").
Real young chimpanzees take years of watching to learn nut cracking.

So the result is conditional: **without spreading, size does nothing for discovery; with it, the hypothesis remains untested
here.**

## 6. Limits

One band, not many groups; 60-day runs (20 simulated years); small brains; a coarse map and a squeezed year; founders who start
knowing nothing; 24 or 12 worlds per comparison (enough for effects of about the size we looked for, not for small ones); a simple
spreading measure rather than full network-based diffusion analysis; and two of seven realism checks failing. Every limit is listed
in the research log and the assumptions register.

## 7. What could change the answer

Copying sequences of actions rather than single ones; years of watching rather than moments; several groups that meet and exchange
members; longer runs over many generations. Each is a test that can be run in the same way: identical worlds, a switch, a prediction
written first.

## 8. Reproduce

Everything is in the repository. The three comparisons: `node tools/experiment.js --seeds 1-24 --days 60 --workers 4` and the same
with `--extra-people 15` (and `--seeds 1-12 --extra-people 55`), then `node tools/analysis/community-compare.js DIR/` and
`first-times.js DIR/`; spreading: `node tools/analysis/spread.js 1,2,3,4 60 out.json` (and `--copy-moves`); realism:
`node tools/analysis/reality-check.js SEEDS 100 DIR` then `--summary DIR`. Commits and data for each result are linked from its
research-log entry. Code versions: 4.1 commit `b0bf369` (entry 36); 4.2 `f4df84f` (entry 53); 4.3 `f3e547c` (entry 54); the reality checks `d569f83` (entry 52).

## References

- Franz M, Nunn CL (2009). Network-based diffusion analysis: a new method for detecting social learning. *Proc R Soc B*.
- Henrich J (2004). Demography and cultural evolution: the Tasmanian case. *American Antiquity* 69.
- Kline MA, Boyd R (2010). Population size predicts technological complexity in Oceania. *Proc R Soc B*.
- Slania et al. and Schuppli C et al. (2026). Peering in wild chimpanzees, Budongo (Max Planck Institute of Animal Behavior; cited from the institute's release, the papers themselves not checked).
- Life-history, predator, disease and diet sources: `docs/ASSUMPTIONS.md` and the research log.
