# Independent science review of Genesis — 12 November 2026

**Reviewer:** Claude (Fable 5.1), in the owner's Claude Code session. **Brief:** `docs/REVIEW-BRIEF.md`.

**A caveat on independence, stated first.** The brief was written for a reader who had not built this. I am not that reader: the
same session that wrote entries 16–36, most of the assumptions register and the backlog performed this review, with that
context in hand. I worked against this by re-searching every source I checked rather than trusting my earlier summaries, by
recomputing figures from the saved data, and by reading the code for the structural questions. The owner should still treat
every finding here as a claim to verify, and would do well to have a reader with no history in the project repeat sections A–C.

**What was checked.** Every row of `docs/ASSUMPTIONS.md` (section 2 below, with a verdict per row; about 30 sources re-searched
on the web this session); the research log entries 1–36 for whether conclusions follow from numbers (section 3; four entries
recomputed from their CSVs with `tools/analysis/compare-runs.js`: 19, 28, 30, 31 — all match); the engine for scripted
behaviour, unregistered numbers and modern-human leftovers (`src/sim.js`, `src/config.js`, `src/creatures.js`,
`src/items.js`, `src/talk.js`); the owner's rules against practice; the six reviewer questions. **Not checked:** the climate,
terrain, sound and vision code; the page (`ui/`); the three working branches' diffs line by line; any experiment was run
(none were, per the brief).

---

## 1. The ten findings that matter most, ranked

### 1. Genesis runs on two clocks, and the reality checks mix them (structural; high confidence)

**Where.** `src/config.js`: `DAY = 96` steps, `TY = 288` steps — a year is three days. Metabolism (`src/sim.js`: `S.dE / DAY`),
carcass decay (`src/items.js`: "about two days at 20 °C"), a burning brand (8 steps), mood (`1 − 1/DAY`) and the male's wait
after mating (`0.1 * TY`) run on one clock or the other without a stated rule; life history (pregnancy, nursing, maturity,
lifespan) runs on the year clock.

**What it means, in numbers** (computed from the code): a hominin starves from full in about 14 physical days = **4.8
life-years**; nursing (4 life-years) lasts **12 physical days**; pregnancy 1.9 physical days; meat goes bad in 2 physical days =
0.67 life-years; a female cycle (36 life-days) lasts **7.1 hours**; a male's wait after mating (0.1 life-year) is 7.2 hours.

**Why it matters.** Any check stated "per year" (deaths from hunger per life-year, births per woman-year, how long a carcass
feeds a band) compares quantities on different clocks. The README says the year is squeezed into three days; it does not say
which processes live on which clock or what that does to rates. It also caused finding 2.

**What to do.** Not a cheap fix and not necessarily a wrong design — but: (a) assign every duration in the code explicitly to
one clock and list them in `ASSUMPTIONS.md`; (b) state each reality check with its clock (survival-to-age and birth spacing on the
life clock; activity budgets on the day clock; hunger and decay with an explicit conversion); (c) say so on the Research page.

### 2. The female cycle's failure has a second, quantified cause (actionable; high confidence)

**Where.** `src/sim.js` mating: `mal.cd = Math.round(0.1 * TY)` (28.8 steps) and `fem.cd = S.cd` after *any* mating (backlog B1,
confirmed in the code).

**Finding.** A female cycle is 28.4 steps, her fertile window 3.9 steps. With a male able to mate at most once per 28.8 steps,
each male gets about one mating per cycle, which lands in the fertile window about **1 time in 7**. So fixing B1 alone will
not restore chimpanzee birth rates; B2 must be set on the *physical* clock (chimpanzee males mate several times a day:
hours, not a tenth of a year). Then retest. Entry 32's text names B2 as a possibility; this makes it near-certain.

### 3. Birth spacing is set at the generous end of the evidence (medium-high confidence)

**Where.** `HOMININ.cd = 4 * TY` plus `gest = 0.62 * TY` → births 4.62 life-years apart when a female conceives at her first
mating (she does: `cd` reaches 0 and the first mating conceives).

**Evidence.** Postpartum amenorrhoea with a surviving infant: 3.9 years at Gombe (Wallis 1997) and 4.6 at Mahale (Nishida et
al. 1990), both as reported by [Deschner & Boesch 2007](https://www.eva.mpg.de/documents/Springer/Deschner_Patterns_IntJPrim_2007_1554720.pdf);
birth-to-birth with a surviving infant 5.2 years at Gombe (same source), 5.6–6.0 at Mahale ([Sear et al. table](https://cdn.openbookpublishers.com/sear_0251_chapter19_table_4_61c9394d00.pdf)),
68.9 months composite (Emery Thompson et al. 2007, read in the paper). Real females cycle several times before conceiving after
amenorrhoea ends; Genesis females conceive at once.

**Why it matters.** Births are the survival lever the project found (entry 19). A birth interval of 4.6 against a real 5.2–6.0
makes Genesis births roughly 15–25% more frequent than wild chimpanzees. This was not chosen for survival, but it sits on the
side that helps it. The register's "sourced" row should say: PPA 3.9–4.6 (sourced), resulting interval 4.6 against real 5.2–6.0
(a deviation until conception takes several cycles). Test both ends (4.6 and ~5.5) and report; do not pick by survival.

### 4. With twelve outcomes per comparison, one "beyond noise" result per test is expected by chance (methodological; high confidence)

`tools/analysis/compare-runs.js` reports twelve outcomes with 95% ranges. The chance that at least one crosses the line when
nothing is real is 1 − 0.95¹² ≈ **0.46**. Several entries lean on a single secondary outcome at the edge: entry 28 (drownings
+1.8, range +0.04 to +3.6), entry 30 (drownings; predators −4.75, range −9.6 to +0.1), entry 31 (fire −2.75, range −5.3 to
−0.2), entry 34 (fire deaths). The headline survival result is usually within noise. **What to do:** name the primary outcome
before each test (alive at the end, plus the one cause the change targets), treat the rest as exploratory and say so in "How
the tests are run"; prefer the sign count (worlds higher/lower) over the t-interval for heavy-tailed outcomes (die-outs, mass
fire deaths), or use a permutation test. Entry 36 did write its prediction first — do that every time.

### 5. Strength labels do not follow the log's own scale (high confidence)

The scale: *strong* = large effect, many worlds; *moderate* = clear effect, ~12 worlds. Entry 19 ("strong", 12 worlds, range
+2.0 to +15.6) and entry 32 ("strong", 12 worlds) are *moderate* by that scale, or the scale should be revised to allow "strong"
for a paired result clear of zero on 12 worlds. Entry 25's "moderate" for "learning from others is bred out" rests on the
direction of change in two worlds (plus two re-runs of the same seeds with practice, which diverge after the first step but
share a start): *weak*. Entry 5's "strong" (24 worlds per size) is fine.

### 6. "About nine times too many hunters" is overstated (medium-high confidence)

[Carbone & Gittleman 2002](https://synapsesocial.com/papers/W2014666871): about 90 kg of **a given carnivore species** per
10,000 kg of prey. Genesis starts with about 4,770 kg of prey (8 deer × 70, 5 rabbits × 2, 7 bison × 600, from `config.js`)
and hunters whose masses are **not in the config** (only `size` relative to a wolf); the register's 440 kg is an estimate.
That gives about 920 kg per 10,000 kg. Against three hunter species sharing the prey the allowance is ~270 kg, a factor of
**3.4**; against one species, ~10. Entry 24 and backlog A1 should state the range, and note that the hyenas' starvation may
owe as much to hunting inefficiency in the model as to abundance (seed 2: two plant-eaters killed in 60 days with up to
8 hyenas present). Also, the follow-up literature finds the slope varies with body mass (PMC3061189), so the rule is a
ballpark.

### 7. Several register rows cite the wrong paper or an uncertain figure (high confidence on each item)

- **Pregnancy 0.62 y "Emery Thompson et al. 2007"**: that paper is about fertility and ageing. The wild figure is Gombe 225
  (208–235) days in the Sear et al. table; captive mean 228 days ([PLoS ONE 2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3174954)).
  The number is right; the attribution is wrong.
- **Brain at birth "about 40% in chimpanzees, under 30% in people"**: [Coqueugniot & Hublin 2007](https://carta.anthropogeny.org/node/309543)
  give **45%** and **25%**. The 40% matches DeSilva & Lesnik 2008's *australopith* neonatal estimate (about 180 cc against
  ~450 adult) — cite that instead.
- **Megantereon "about 100 kg"**: 100–110 kg is a large *European* M. cultridens (Senèze; Christiansen & Adolfssen 2007).
  African forms may be 60–70 kg (tooth-based, secondary source). The East African sabre-tooth may be smaller than modelled.
- **Lucy's fall (Kappelman et al. 2016)**: real paper, but disputed (White: cracks likely post-depositional). The register's
  "may have" is right; add "disputed".
- **Activity budgets**: "Mahale 40/30/40" sums to 110% (Matsumoto-Oda & Oda 1999, 15 females); "Wrangham 1992: 50% feeding,
  15% resting" is a secondary citation I could not verify; "Budongo 64.5% fruit, 19.7% leaves" — source not identified. The
  travel range 15–40% should be labelled weakly sourced.
- **Uwimbabazi et al. 2016** is a PeerJ *preprint* with two versions giving different totals; the 12.2 kcal/min figure depends
  on a fibre-fermentation assumption (9.7 without). The leaf ratio 0.48–0.64 already spans this; label it "preprint".
- **MC1R 1.2 Ma (Rogers et al. 2004)**: the paper exists (Current Anthropology 45:105); the 1.2 Ma figure was found only in
  secondary sources (CARTA). Likely right; unverified against the paper.
- **Grabowski et al. 2015**: the qualitative claim (early Homo no bigger than australopiths) is confirmed; the kg figures were
  not. **Kelley & Schwartz 2012**: not found; unverified.

### 8. The page's translator can state a meaning that is chance (honest-minds rule; high confidence)

`src/talk.js` `meaning()`: a sound "means" a situation if said ≥ 25 times, ≥ 25% of them in that situation, ≥ 1.6× the
baseline — no significance test, no correction for the roughly a thousand distinct sounds per world. By chance alone some
sounds will pass, and the page will then say "seems to mean a predator is near". The new `tools/analysis/talk-detector.js`
does this properly (binomial test, Benjamini–Hochberg, playback with controls) but the page still uses the old rule. Until
the page uses the tested version, its wording should be "used more often when… (not tested)".

### 9. Unregistered numbers still steer behaviour, and registered assumptions were not tested at both ends (medium confidence)

Not in the register (from `src/sim.js`): ready to mate only if energy > 45 (hunters 25) and water > 40; gives food only if
energy > 40; moved to feed a child only if energy > 45; the male's wait 0.1 TY (finding 2); conception cost 10 + 12 per
young; labour pain 0.6; 1% maternal death per birth; the lifespan draw (0.72 ± 0.2 of the maximum, mean 43 — stated in entry
16 but not as a register row); forced sleep when exhausted and forced staying asleep (`act = A_SLEEP` lines 503–506) — reflex-
like and defensible, but the "only reflexes are automatic" rule should list them. Registered as assumptions but **not yet
tested at both ends**, against the rule: hunger-first strength 6, mother's pull 3, temperament and care spread 0.4–1.6, mood
speed and strength, leaf threshold 0.3, tree-cover 0.4, the 0.35 catch factor, the fall rate, the cold and heat thresholds
(9/31 °C). The register's own to-do list names some of these; the list above is the full set I found.

### 10. "Learning from others is bred out" is thinner than entry 25 says, and the trait is a bundle (medium confidence)

Evidence is the direction of a generation mean in two worlds (and two re-runs of the same seeds). No per-individual test was
done. And `g.im` is defined as "how much it learns from others at all: copying them, **and feeling for them**"
(`src/creatures.js`): the same gene scales vicarious pain and fear. Selection may be acting against *fear caught from others*
(which quietens exploring and feeding) rather than against copying. Cheap test on the saved worlds: correlate each hominin's
`im` with its number of surviving offspring, and split the gene into two before drawing conclusions about copying.

**Also worth saying: what is good.** Every change has a switch; six "off" runs reproduced the earlier worlds row for row; the
failures (entries 15, 18, 22, 27, 32, 36) are logged as carefully as the successes; the 20% refeeding level was kept against a
better-looking 25% on 12 worlds; the fertility finding (entry 19) is a genuine, well-documented bug fix; the numbers in the
four entries I recomputed match their data exactly.

---

## 2. The assumptions register, row by row

Verdicts: **confirmed** (source says this) · **adjust** (number or attribution should change) · **unverified** (source not
reached) · **assumption** (correctly labelled as such; nothing to check).

### Early hominins

| Row | Verdict | Note |
|---|---|---|
| Body size 0.75 | unverified (direction plausible) | Grabowski 2015 qualitative claim confirmed; kg values not reached |
| Pregnancy 0.62 y | **adjust attribution** | Gombe 225 (208–235) d (Sear et al. table); captive 228 d; not Emery Thompson 2007 |
| First births 14 | **confirmed** | Gombe 13.3 (Wallis 1997), Mahale 14.6, Taï 13.7; 14.9 including dispersers |
| Nursing 4 y | **adjust** (finding 3) | PPA 3.9 (Gombe) / 4.6 (Mahale) confirmed via Deschner & Boesch 2007; but resulting interval 4.6 is below the real 5.2–6.0 |
| Weaning ~4 y | plausible, unverified | |
| Grown 10 y | unverified | Kelley & Schwartz 2012 not reached |
| Lifespan 60 (mean 43) | **confirmed** | Ngogo e0 = 32.8 (Wood et al. 2017); wild maximum ~55, captive 59.4 (AnAge) |
| Brain a third | **confirmed** | A. afarensis 385–550 cc (A.L. 333-84 preliminary 385; 444-2 ~550); Stw 505 ~515; none ≥ 600 (Conroy et al.) |
| Brain at birth 8/16 | **adjust attribution** | 45% chimp / 25% human (Coqueugniot & Hublin 2007); 40% fits DeSilva & Lesnik's australopith estimate |
| Cold/heat 9/31 °C | assumption | correctly labelled; untested at both ends |
| Climbing a choice | sources confirmed | grasp reflex; nest building learned (Videan 2006; Ngogo 2025); individual flight/freeze (Kemp & Kaplan 2011) |
| Tree catch × 0.35 | assumption | Busse 1980 confirmed (Moremi baboons; predation at sleeping roosts) |
| Fall 1/20,000 | assumption | Kappelman 2016 real but disputed |
| Fertile to 50 | **confirmed** | read in Emery Thompson et al. 2007: 47% of 34, 20% decline, 7% to 40, ~50 |
| Next conception after loss 74 d | **confirmed** | Jackson & Glasier 2011 (45–94 d); chimpanzee 26.6 vs 68.9 months read in the paper's table |
| Mating pull 2 | sources confirmed; strength tested at 1 and 3 | Wallen 2001; Deschner 2004 |
| Food by body size | law confirmed | Kleiber; Pontzer 2016 direction right |
| Escape from a hunter | sources confirmed | Seyfarth 1980 (later revised in its semantic claims, not in the escape responses); Mineka |
| Running speed | **confirmed** | Bates et al. 2024: ~5 m/s (max ~4.9–5) vs ~8 m/s human model; leopard 60 km/h (GPS) |
| Not grass | direction; fine | |
| Leaves 0.64 (0.48–0.64) | **adjust label** | preprint, two versions; fermentation assumption; Budongo 19.7% source unidentified |
| Leaf threshold 0.3; no thinning; people none | assumption / direction | fine |
| Hunters that can climb | direction | fine |

### Animals of East Africa

| Row | Verdict | Note |
|---|---|---|
| Antelope (impala) | plausible | fact-sheet sources; maturity 1–2.5 y disagree between sources |
| Hare | plausible | gestation 42 (38 in one source) |
| Buffalo | plausible | 340 d gestation from a Behav. Ecol. paper; first calving 5; captive interval 395 d |
| Hyena | **confirmed** | 110 d (Holekamp); first births 3–5; 11–21 months; ~20 y |
| Leopard | **confirmed** | zoo fact sheet / Balme 2013 / ADW; SK 54 leopard punctures (Brain 1970/1981; Pickering 2004) |
| Sabre-tooth 100 kg | **adjust** | European specimen; African forms possibly 60–70 kg; life history assumption as stated |

### How a world starts · mother's pull, cycle, mood · moving · temperament · mechanisms · abundance · audit

| Row | Verdict | Note |
|---|---|---|
| Founders' practice | sources confirmed; now off | Schuppli (Budongo) and burn-in practice confirmed earlier |
| Mother's pull 3 | source confirmed (Hinde index); strength untested | |
| Female cycle 36/13/5 | **confirmed** (Deschner 2003; Emery Thompson 2005) — but see finding 2 | |
| Mood | source confirmed (Eldar et al. 2016) | speed/strength untested |
| Testosterone not added | fine | |
| Moving as one choice | method; activity-budget comparison weakly sourced (finding 7) | |
| Timidity 0.4–1.6 | **adjust detail** | Oler 2010 "significant heritability" confirmed; the 0.36 figure not found; freezing h² ≈ 0.38 from a 2007 pedigree study (earlier search) |
| Parental care 0.4–1.6 | direction (Fairbanks) | spread untested |
| Pull to eat 8 × hunger | assumption | untested |
| Care weights 1/0.6/0.5/0.35 | now hominins: mother only | ape evidence confirmed earlier (Hrdy 2009 reviews; Bădescu 2016) |
| Children's pull 3 / 1.5 | assumption | untested |
| Brush shelter cover; rot | assumption | |
| Hunters to prey | **adjust magnitude** (finding 6) | 3.4–10×, not "about nine" |
| Audit rows (vision, twins, sleep, energy, food values, digging, speeds, night vision, cap) | as labelled | energy 7%/day and food values remain the largest unsourced block; the cap is gone for people on `band-wip` |

---

## 3. The research log, entry by entry

Entries 1–7 keep no raw tables and some have no switch; they cannot be re-checked and are rightly labelled. Entry 5's "strong"
(24 worlds per size) is justified; its interpretation (learning speed, not energy) is plausible but untested.
Entries 8–15: careful; conclusions follow; entry 12's two risk measures disagreeing is handled honestly; entry 15 is a model of
checking one's own guess. Entry 14's selectivity analysis is good; the youth result's distortion is correctly flagged.
Entry 16: confounded, labelled so; the explanation (old age) follows from the numbers. Entry 17: fine. Entry 18: fine; the
retraction of the leaves→fire guess is exemplary. **Entry 19:** numbers recomputed and match; "strong" should be "moderate"
by the log's scale (finding 5). Entries 20–23: fine; 22 is honest about a wrong guess. **Entry 24:** "about nine times"
overstated (finding 6). **Entry 25:** survival and birth/death numbers fine; the copying claim is weak, not moderate, and the
trait is a bundle (finding 10). Entry 26: fine. Entry 27: fine; its interpretation (mechanism missing, not idea wrong) is fair.
**Entry 28:** recomputed and matches; the drowning rise is one of twelve outcomes (finding 4). Entry 29: fine. **Entry 30:**
recomputed and matches; the predator fall (60 → 3) is the most striking result of the session and deserves a replication on 24
worlds before it is called moderate. **Entry 31:** matches; same caution. **Entry 32:** finding 2 sharpens its cause; "strong"
→ "moderate" by the scale. Entries 33–35: fine. **Entry 36:** the best-designed test in the log (prediction written first,
identical worlds, the earlier hunch corrected in print).

---

## 4. The six reviewer questions

**1. Is anything still scripted that real animals are not born with?** Automatic (not chosen): falling asleep when exhausted
and staying asleep; wolves' and hyenas' pack breeding rule; vultures waiting while hunters feed; the fixed cap on animal
numbers (people's removed on `band-wip`); the founders' practice device (off). Inborn pulls (all chosen through the brain):
hunger/thirst toward food and water; taste; wariness of hunters and making for cover; the cry pull; children to carers;
mothers to nursing young; the mating pull; sleepiness toward cover and up trees; the push to feed one's own hungry young.
Each has primate evidence for its *existence*; the *strengths* are assumptions. The handover's two debatable drives: wariness
of big hunters is well supported, but note it is applied before any learning, while the register says whom to fear is learned
— the model gates the *escape* by learned fear but not the *wariness pull* (`wary` uses `0.5 + a.fear`, so half of it is
present with no fear at all). The push to *give* food to one's own child is less ape-like than it looks: ape mothers mostly
tolerate taking rather than hand food over (Silk 1978; Ueno & Matsuzawa 2004). The ablation the handover asks for has not been
run for either; it should be, and "tolerated taking" is the ape mechanism to consider.

**2. Which reality checks matter most, with values and sources, and how to measure them fairly?** On the life clock: child
survival to adulthood (wild chimpanzees roughly half; verify Hill et al. 2001); life expectancy at birth 13 (four sites, Hill
2001) to 20 (Kanyawara) to 33 (Ngogo); birth interval with a surviving infant 5.2–6.0 years; fertility near zero by 50; births
after a lost infant at ~27 months. On the day clock: feeding 40–50% of the day, travel 15–40%, rest 15–30% (weakly sourced,
finding 7); children within sight of the mother by age. Causes of death: illness ~58% of known-cause deaths at Gombe (Williams
et al. 2008), aggression ~20%, predation site-dependent (Taï leopards high). Each check must name its clock (finding 1), use
24+ worlds, and pre-register the pass band.

**3. Why do populations decline?** On today's data: hunger (44% of deaths over 67 years), old age (23%, realistic), predators
(14%, concentrated in the two worlds that died out; now ~1 per world after entry 30). The remaining hunger is not food scarcity
(food was within two squares in ~90% of starving moments) but behaviour: not moving on when the patch is eaten (entry 30 made
this worse), no social learning of the diet, and a brain that credits the last action rather than the one that mattered.
The most realistic fixes in order: learning by watching what others eat (A4); moving to known food when the patch runs out
(A2); then disease (R9), which will *raise* deaths but make the causes real.

**4. Fire without scripting?** Fire currently has almost no value in the world where hominins live: nights at the equator are
~24 °C against a cold threshold of 9 °C, cooked food already appears from wildfires, and fire neither deters hunters nor
gives light. So there is no gradient for a learning brain to climb, and "nobody kept a fire in 36 worlds" is the expected
result — and consistent with reality, where habitual fire use is ~1 Ma later than these hominins. The honest route is to add
fire's real effects as physics (warmth that matters where nights are cold — highlands, the dry season; hunters avoiding a
burning fire at night, if the evidence supports it; cooking already), then learning by watching. Do not add a reward for fire
itself.

**5. Is the experiment design sound?** Mostly: identical seeded worlds with a switch, fairness checks that reproduce the
old worlds row for row, confounded comparisons flagged, failures kept. Weaknesses: twelve outcomes per test without a primary
outcome (finding 4); 12 worlds detect only effects of about ±8 alive; t-intervals on heavy-tailed outcomes; only entry 36 wrote
its prediction first; strength labels drift (finding 5); the first seven entries have no data.

**6. Do the conclusions follow, and are the labels fair?** Largely yes; the exceptions are listed in section 3 and findings
4–6 and 10. The log's habit of printing the range and the sign count is its best feature; it should decide in advance which
single outcome each test is about.

---

## 5. The owner's rules, checked

- **Never tune toward an outcome:** kept where it was tempting (20% vs 25% refeeding). One place sits on the generous side
  without having been chosen for it: birth spacing (finding 3). Fix by testing both ends and reporting.
- **Uncertain numbers tested at both ends:** done for the fertility limit, the mating pull, the leaf value, the refeeding
  level; not done for about ten registered assumptions (finding 9).
- **Only true reflexes automatic:** kept, with the exhausted-sleep rules to be listed as reflex-like.
- **Learned knowledge never inherited:** confirmed in `child()` (`src/creatures.js`); a comment above it says otherwise (B4).
- **Honest minds:** at risk in the translator (finding 8).
- **Verify before building:** the session did re-search before building; where it relied on snippets, the attributions slipped
  (finding 7). A second reader catches these faster than the same one.

## 6. Real-world pressures still missing or wrongly weighted

The backlog's section 3b is complete as a list. Ranking by how much they would change what the model says: **disease** (the
leading real killer, absent); **a hungry season** (food in the tropics barely varies here, so there is no lean time — the
timing evidence disagrees, as the backlog says); **intergroup violence** (~20% of Gombe deaths); crocodiles; the hunters-to-prey
balance (finding 6 narrows the gap). Hunters' body masses should be put into `config.js` before the balance is fixed.

## 7. What I could not verify

Kelley & Schwartz 2012 (growth rates); Grabowski 2015 species masses; Wrangham 1992 time budget; the Budongo 64.5% / 19.7%
figures; the MC1R 1.2 Ma date against the paper itself; Oler 2010's heritability value; impala, hare and buffalo figures beyond
fact sheets; Watts et al. 2012 details; Hill et al. 2001 child survival; who compiled the Sear et al. great-ape table; the
Nature Education body-size source. I also did not open the three working branches' diffs, the page, or the climate code.
