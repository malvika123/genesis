# Second independent review of Genesis — 13 November 2026

**Reviewer:** Claude (Fable 5.2), run as a separate agent with no part in building entries 37–54. The brief came from the
session that built them, so treat every finding as a claim to verify.

**Scope.** The public write-up (`docs/paper/band-size.md`, `paper.html`); research log entries 36–54 and their data folders; the
code behind entries 44, 46, 49, 50, 51, 52 (`src/sim.js`, `src/brain.js`, `src/creatures.js`, `src/world.js`); the register; the
plan; backlog section 1; `tools/analysis/spread.js`, `reality-check.js`, `community-compare.js`.

**How I worked.** I read files and data only. I ran no simulation, no test, no experiment. I edited nothing but this file. Two
web searches checked sources. Where I say "the code does X", I read it. Where I say "likely" or "plausibly", I did not measure it.

**Headline.** The paired design, the written predictions and the honest log are real strengths. The numbers in the write-up
match the data files (I checked every figure in sections 4.1–4.3 against the CSV summaries and JSON). But the write-up's central
sentence — "the reason, measured directly: skills did not spread" — is not supported. The code contains a hard-wired channel that
spreads fire-making skill by watching, which nobody measured. The spreading measure has no control and several confounds. And
the copying rule cannot, by its construction, pass on a skill an elder already knows well. The safe claim is narrower: "kinds of
first-time event per world did not rise with band size, within ±1 kind, over 20 years".

---

## 1. The eight findings that matter most, ranked

### 1. A hard-wired fire skill spreads by watching, outside the brains. The paper says skills do not spread.

- **Severity.** High. It touches the paper's main conclusion and the "nothing scripted" rule.
- **Where.** `src/sim.js` lines 1136–1154 (striking and rubbing), 1346–1378 (`firePractice`, `watchFire`, `fireMade`).
- **What the code does.** Each hominin has a number `fsk` (fire skill, 0 to 1). It is not in the neural network. Rubbing dry wood
  raises it (`firePractice`, 0.004 a step). The chance of fire is `0.0004 + 0.6 × fsk²` a step. `watchFire` then raises `fsk` in
  **every awake hominin within 2 squares** (about 6 km) by 40% of the practiser's gain, 1.5 times that for the young. A success
  gives watchers +0.06. The log line even says "They had watched X try".
- **Why it matters.**
  1. This is scripted social transmission of a skill. The paper says each hominin "learns only from what its body feels and what
     it sees others do, and is told nothing", and that "the hypothesis's own mechanism — discoveries spreading — is absent".
     For fire-making it is present, by rule.
  2. The channel grows with density. More hominins nearby means more rubbing watched, so `fsk` rises faster in a bigger band.
  3. The four firsts that came "about two weeks sooner" with 80 founders are all fire events: picking up a burning stick, eating
     cooked food, fire by rubbing, starting a fire with a burning stick (`data/findings/53-band-size-again/first-times.txt`). Meat
     did not come sooner (later in 3 of 5 worlds). A made fire supplies burning sticks and cooked food. So "sooner by numbers
     alone" may in part be this watching channel. That would be the opposite of the paper's reading.
  4. `spread.js` does not measure it. It tracks nuts, stick digging, cooked food, burning stick, meat, cutting. Not fire-making.
- **Also.** None of these numbers (0.004, 0.012, 0.4, 0.06, 0.12, 0.6, 0.0003, 0.0004, the 2-square radius, the 1.5) is in
  `docs/ASSUMPTIONS.md` (I searched for fsk, knack, fire). It is not in the backlog. My first review missed it.
- **Face validity.** Fire by rubbing happened in 20 of 24 worlds within 20 simulated years, from founders who know nothing. The
  real record has no accepted fire-making for more than two million years after 2.5 Ma. A reviewer will ask why it is so easy.
- **What to do.** (a) Now, with no runs: say in the paper that fire skill is a rule outside the brains with a watching channel,
  and withdraw "skills did not spread" for fire. (b) Add a switch that turns `watchFire` off. (c) Repeat 25 vs 80 with it off;
  prediction written first. (d) Register every number, or move the skill into the network.
- **Confidence.** High that the mechanism exists, is unregistered and was not measured. Medium that it drives the "sooner"
  result; that needs the switch test.

### 2. The spreading measure (entry 54) cannot show that skills do not spread.

- **Severity.** High. Section 4.3 and the word "directly" rest on it.
- **Where.** `tools/analysis/spread.js`; entry 54; paper sections 3, 4.3, 5.
- **What is doubtful.**
  1. **No controls.** The tool was never run on a case where spreading is known to happen (a positive control), nor with copying
     switched off (a negative control). There is no switch for "no copying at all". A null from an untested instrument is weak.
     The project already learned this with the sound detector (backlog B12).
  2. **The two halves disagree, the same way under both rules.** Nuts: 0.74 and 1.50 with new copying; 0.75 and 1.46 with old.
     So something about the worlds drives the ratio, not the copying rule. The measure is dominated by differences between worlds.
  3. **Rates are pooled over worlds, steps and ages.** One large world can set the ratio. There is no per-world ratio and no
     interval.
  4. **Opportunity is not controlled.** A first nut-crack needs a stone in hand on a nut square. The risk time counts every awake
     step anywhere. Being in a square where someone cracked nuts also means being where nuts are. Location, not watching, sets
     both.
  5. **Survivorship.** "Watched" is permanent. Those still at risk long after watching are those slow to do it. That pushes the
     ratio below 1 by itself.
  6. **"Watched" does not match the copying rule.** The tool counts anyone awake in the square. The rule
     (`src/sim.js` about 568–640) copies only from one chosen teacher who is older and mature (or the mother), and only when that
     teacher's surprise is not zero.
  7. **Who are the doers?** Runs last 60 days (20 years). Hominins mature at about 14. So most of the roughly 20 doers per world
     are probably the founders, all naive adults starting together. "Reinvented alone by most" may mostly describe founders who
     had nobody to learn from. The tool does not split founders from those born later. (I infer this from run length; the JSON
     does not record ages.)
  8. **Rare behaviours hint the other way.** Meat: ratio 13.3 (new, worlds 1–4) and 4.4 (old). Counts are tiny, so "too few to
     judge" is right. But it is not evidence of no spreading.
- **What to do.** Add a no-copying switch. Plant a behaviour that can only be acquired by watching and confirm the tool finds it.
  Report per-world ratios with a sign count. Restrict to hominins born in the run. Count risk time only when the means are there
  (stone in hand on a nut square). Run long enough for two generations. Until then, write "we could not detect spreading with a
  simple measure".
- **Confidence.** High on the design gaps. Medium on point 7.

### 3. "Copy what worked" copies the elder's private surprise. A skilled elder has none, so it teaches nothing.

- **Severity.** High for the paper's interpretation; medium for the model.
- **Where.** `src/sim.js` about 623–634: `imitate(a, tch.daAct, rate × (1 − cf) × clamp(tch.da, −1, 1))`. Entry 52.
- **What is doubtful.**
  1. `tch.da` is the elder's own learning signal: how much better things went than **it expected**. No real watcher can see that.
     A real youngster sees the act and the result (the elder got food).
  2. Entry 50 made expectations match rewards (average signal 0.00). So an elder who cracks nuts every day expects the meal, its
     surprise is near zero, and almost nothing is copied. The rule copies most from the surprised, that is, from beginners. Real
     young apes watch skilled models most (the Budongo study says they peered at experienced individuals).
  3. A negative surprise makes the watcher **avoid** the act. Disappointed experts teach avoidance of good acts. I know no primate
     evidence for this beyond fear learning.
  4. The update is applied to the watcher's own senses at that step. A youngster without a stone learns "strike" with an empty
     hand.
  5. The "skills" are single actions. Nut cracking is: stone in hand, choose "strike" on a nut square, success every time
     (`src/sim.js` about 1154). With 19 actions and random exploration, there is little for watching to add.
- **Why it matters.** The paper concludes that "learning by watching single actions does not supply" spreading. What was shown is
  narrower: **this** rule did not. It could not have, for skills elders know well.
- **What to do.** Test a rule that weights by the visible result (the elder's reward, or its energy gain), not its surprise;
  one change, a switch, prediction first. Make at least one skill truly hard (success that rises with practice inside the
  network, not a side variable). Then measure spreading again.
- **Confidence.** High on what the code does. Medium that this is why nothing spreads.

### 4. "Kinds of hard discovery per world" is a blunt measure, and "no effect of size" is stronger than the data allow.

- **Severity.** High for the headline.
- **Where.** `tools/analysis/community-compare.js` (the 11 kinds); entries 36, 53; paper summary, 4.1, 4.2, 6.
- **Evidence.**
  1. **Ceiling and floor.** In entry 53: cooked food 22/24, burning stick 23/24, fire set 22/24, rubbing 20/24; keeping a fire
     0/24. Only about four kinds can vary (meat, hunting, cutting, sparks), and those are linked (cutting needs meat).
  2. **One kind is known to be wrong.** "Sleeping in a heap of branches" was shown to be chance (entry 41), and backlog B16
     calls the milestone misleading. It is still one of the 11.
  3. **Some kinds are weather.** Cooked food and burning sticks need wildfire, as entry 36 itself says.
  4. **It is not the hypothesis's variable.** Henrich's model is about how much skill is kept and built up over generations.
     "Did it happen once in this world" is a different thing. Runs of 20 years are about one generation.
  5. **Precision.** The 95% ranges are about ±0.9 kinds on a mean of 5.5. A rise of one whole kind (about 20%) cannot be ruled
     out. Both tests lean the same way (+0.46, +0.33), on the same seeds. Section 4.1 says "**No effect of size**". Section 6 says
     the worlds are "enough for effects of about the size we looked for". No effect size was named in advance (the prediction
     says only "range clear of zero").
  6. **A mixed comparison in the summary.** "5.5 vs 5.8 … 80: 5.9" sets the 80-founder mean (12 worlds) beside the 25-founder
     mean of 24 worlds. On the same 12 worlds the 25-founder mean is 6.08. The body gives this correctly; the summary does not.
- **What to do.** Say "no detectable effect; a change of up to about one kind is not excluded". Drop the shelter kind. Report the
  varying kinds separately. Add a measure of keeping: how many hominins do the thing, and whether it is still done a generation
  after the first doer dies.
- **Confidence.** High.

### 5. Two causal statements in the paper are not paired tests.

- **Severity.** Medium–high.
- **Where.** Paper 4.2 and summary; entry 53.
- **(a) "Bands of every size discovered more" because of entries 50 and 52.** Between the entry 36 runs and the entry 53 runs
  the code also gained: the mating fix (38), predator newcomers (39), hunters near prey (40), conception chance (44), disease
  (46), the grass pull (49) and backward replay (51). 4.13 → 5.46 is a before-and-after across about nine changes. Section 4.1
  is titled as if only copying differed. The project's own rule (one change, paired worlds) was not applied to this sentence.
- **(b) "Some firsts came about two weeks sooner … by numbers alone."** Sign counts: 10 of 12 (two-sided p about 0.04), 9 of 12
  (0.15), 9 of 12 (0.15), 8 of 11 (0.23) — my arithmetic. Four were picked from seven; meat went the other way. One is nominally
  significant, with no correction. The four are not independent: one made fire yields a burning stick and cooked food. Entry 36
  said "no sign test is significant" for its counts; entry 53 and the paper drop that care. And "numbers alone" is an
  interpretation that finding 1 puts in doubt.
- **(c) "Bigger bands went hungrier."** This one is solid: hunger deaths rose in 23 of 24 and 12 of 12 worlds. But all extra
  founders start in the same place as the first 25 (as I read the design). Real larger groups range wider and split up. Say so.
  "Survived worse per founder" holds at 80 only (range −0.64 to −0.02, 12 worlds); at 40 it is within noise.
- **What to do.** For (a): run today's code with `--boosted-value --copy-moves` on the same seeds, or say "after many changes".
  For (b): give the p-values, call it suggestive, and name the fire chain.
- **Confidence.** High.

### 6. "Passes 5 of 7 checks" is used as validation, but the checks steered the work and two bands are wider than their sources.

- **Severity.** Medium–high (this is the tuning question).
- **Where.** `tools/analysis/reality-check.js` lines 18–25; entries 42–52; paper summary and section 2.
- **Evidence.**
  1. Entries 44, 46, 50 and 52 each changed the model and then scored it on this table ("5 of 7 — the best yet"). A table used
     to guide development is calibration, not an independent test.
  2. **Illness.** The band is 15–60%. The lowest sourced figure in the tool is Kanyawara 27%. The 15% has no source. It was set
     after the first disease result (entry 46 says so, to its credit). Genesis now "passes" at 16.3%, by 1.3 points.
  3. **Age at first birth.** Sources: 13.3–14.9. Band: to 15.5. Genesis: 15.3. It passes only in the margin above every site.
  4. Against the sourced numbers alone, I count 3 of 7 (life expectancy, birth spacing, population change — and that last band is
     itself an assumption).
  5. Birth spacing passes because conception chance was added to move it. Sourced, yes, but then it is a fitted quantity.
- **What to do.** In the paper, give both scores: against the sourced ranges and against the widened bands. Say the table guided
  development. Add checks never used so far (time spent feeding, daily travel, deaths by age class) and score them once.
- **Confidence.** High on the bands. The count of 3 is my reading of the tool's own source strings.

### 7. Entry 52's explanation ("the young learn from their mothers what is worth eating") is not shown by its own probe.

- **Severity.** Medium.
- **Where.** Entry 52 table and interpretation; paper 4.2.
- **Evidence.** In the probe, weaned young chose "eat" 6.0% / 2.1% with the new rule up close, against 5.3% / 2.3% with the old
  rule; "it paid" 54% / 87% against 65% / 81%. That is no clear gain for the young. Yet hunger fell from 30% to 17% of deaths.
  Entry 45 found most who starve are adults. The rule also changes what adults copy (any hominin copies an older mature one).
  And the change did two things at once: it removed the old copying (copy whatever the elder is doing) and added the signed
  rule. The gain may come from removing harmful copying. There is no arm with copying off. The hunger change itself has no
  paired interval in the log (shares of deaths only).
- **What to do.** Three arms on the same seeds: no copying, old, new. Report hunger deaths per world with ranges, split by age.
- **Confidence.** Medium.

### 8. Register, citation and reproducibility gaps.

- **Severity.** Medium to low, but each is the kind of thing a reviewer finds in ten minutes.
- **Unregistered numbers.** No rows in `docs/ASSUMPTIONS.md` for: the value-learning change (entry 50); backward replay's 16
  steps, 0.3 trigger and 0.5 rate (entry 51 calls them assumptions; the register has no row); the copy rule's ±1 clamp and
  same-square rule; sequence copying's 0.85 and ×3; all fire-skill numbers (finding 1). Row 143 files all "learning settings"
  as "model settings, not biology". After entries 49–52 that no longer holds: these settings decide who lives.
- **Stale row.** Register row 68 says founders practise before the world begins. The code default is off
  (`practiceDays: 0`), and the paper says founders know nothing. The paper is right; the register is wrong.
- **Citation.** "Schuppli et al. (2026)" appears to be Slania et al., with Schuppli as senior author; a press listing gives
  *iScience*. Give the journal reference. The paper says the idea is "debated" but cites no critic: add Vaesen et al. 2016
  (PNAS) and the Henrich et al. reply, which says the theory concerns the **effective** number of people who exchange skills,
  not head count. One closed band of 80 is not that.
- **Reproduce.** Section 8 gives commands but no commit. Since `c0254bc`, sequence copying is on by default, so today's code
  will not reproduce sections 4.2–4.3 without `--no-copy-sequence`. Name the commits (`f4df84f`, `f3e547c`).
- **Test edits.** See B below.
- **Confidence.** High, except the citation (medium: from a press release, not the paper).

---

## 2. Short answers

### A. The public write-up

- **Numbers.** Every figure I checked in 4.1–4.3 matches the data files. Good.
- **Overstated.** "Measured directly: skills did not spread" (findings 1–3). "No effect of size" (finding 4). "Two changes"
  explain the rise in discoveries (finding 5a). "Sooner … by numbers alone" (5b). "Passes 5 of 7" as validation (finding 6).
  "Told nothing" (finding 1).
- **Missing.** The fire-skill rule. A no-copying control. The critics of the population-size idea. That 20 years is about one
  generation. That extra founders share one starting place. Commit ids.
- **Is the conclusion justified by 36, 53, 54?** Partly. Justified: "in these runs, more founders did not give more kinds of
  first-time event, and gave more hunger." Not justified: "because skills do not spread". Entry 54 cannot carry that, and
  one skill does spread by rule. The closing line of section 5 ("with spreading, the hypothesis remains untested") is the
  right tone; the summary should match it.
- **Statistics.** Paired worlds with 95% ranges and sign counts are a sound base. They are adequate for the hunger result. They
  are not adequate for a claim of no effect (ranges of ±0.9 kinds), for the "sooner" claim (uncorrected, dependent outcomes),
  or for entry 54 (two halves is not a test; no interval at all). 25 vs 40 and 25 vs 80 share seeds 1–12, so they are not
  two independent tests.

### B. Tuning risk

- **Entry 50 (calm value).** I read it as a principled fix, with two reservations. For it: the fault was found by measuring
  something that has a right answer regardless of survival (the value estimate should equal discounted reward: 2.3–3.1 against
  0.3 before; 0.38 against 0.39 after). Unequal learning rates for good and bad surprises are known to bias such an estimate
  upward. The code change matches the description (`src/sim.js` line 520). Changes that did not help survival were also kept
  (grass, replay), so the project is not keeping only what helps. Reservations: (1) the hunt was started by "too many hunger
  deaths" and judged on the reality table, so a hostile reader will call it tuning; lead with the value-against-reward
  measurement and present survival as a consequence. (2) The action side still weights good surprises up to 4 times and bad
  ones up to 1.5; that asymmetry is an unregistered assumption and should be tested at both ends.
- **Illness band (entry 46).** The correction note is honest. But the 15% bound has no source and now decides a pass by 1.3
  points. Report both bands (finding 6).
- **The two test edits (entries 51, 52).** Each is defensible alone: a unit test should isolate what it tests. But the stated
  reasons do not fit the timing. The cycle's conception chance came in at entry 44; the mating-pull test was edited at entry 51.
  Disease came in at entry 46; the grief test was edited at entry 52. So either the tests were not run in between, or the
  learning changes broke them and the comments name a different cause. I could not run them to find out. Also, with the cycle
  off in the test, nothing now shows the mating pull works in the live setting. Keep both versions (isolated and live), use
  several seeds, and log the before and after numbers when a test is edited. This is not tuning toward survival, but it is
  "edit the test until it passes" unless the cause is recorded.

### C. Mechanism realism

- **Copy what worked.** The idea (copy by result, up close) fits the peering evidence. The implementation does not: it uses
  the elder's hidden surprise, teaches avoidance from disappointment, and is silent for experts (finding 3). The same-square
  rule (3 km) is a coarse stand-in for "within reach"; say so.
- **Backward replay.** Defensible. Reverse replay after reward is well documented in rats and there is indirect human evidence.
  It acts like a longer memory trace for credit. Caveats: the trigger is reward above 0.3, not surprise, though the log says
  "good surprise"; the numbers are unregistered; "kept because harmless" rests on one 24-world table; and it is now the
  carrier for sequence copying, so it is no longer inert.
- **Confounds in entry 54.** Yes, several: place and opportunity, age, survivorship, pooling over worlds, exposure that does
  not match the rule, founders who all start naive together, and no controls (finding 2).

### D. The one thing to do next, and what a reviewer would demand

- **Next.** Correct the public write-up today (no runs needed): disclose the fire-skill rule, change "measured directly: skills
  did not spread" to "we could not detect spreading of the two easy skills we could measure", change "no effect" to "no
  detectable effect", and give both check scores. Then, when the laptop is free: a switch for `watchFire`, a switch for no
  copying, and a positive control for `spread.js`, before any new copying mechanism is tested. Sequence copying (already
  committed as `c0254bc`) will be judged with the same unvalidated tool otherwise.
- **A reviewer at an artificial-life or cultural-evolution venue would ask for:**
  1. A positive control: a setting where transmission is known to work, in which band size does raise the outcome. Without it,
     a null says little.
  2. An outcome that measures keeping and build-up over generations, not first occurrence; runs of several generations.
  3. A validated transmission measure (proper network-based diffusion analysis, or at least per-world, age-split, opportunity-
     matched hazards) with controls.
  4. At least one skill hard enough that individual learning rarely finds it.
  5. More than one band, or an argument about effective population size (the Henrich reply to Vaesen).
  6. All hard-wired learning rules disclosed (fire skill), and a sensitivity analysis of the learning settings.
  7. Validation on checks not used during development.
  8. Exact commits, and an effect size the design was powered to find.

---

## 3. Things I could not check

- Anything that needs a run: whether the fire-skill channel explains the "sooner" result; whether the tests fail with the cycle
  or disease on; whether "identical worlds" switches reproduce to the last digit (I took the "checked" notes on trust).
- Who the doers in entry 54 were (founders or born later). The JSON has no ages.
- The per-world CSVs line by line; I used the summary files the tools wrote and spot-read headers.
- That the first 25 founders are identical with extra founders. I read the flag and the claim, not the placement code in full.
- Where extra founders are placed (I assume with the band; I did not trace it).
- The full text of the peering paper, Henrich 2004, Kline & Boyd 2010, and Franz & Nunn 2009. Journal details for the last three
  match what I know; the peering authorship comes from press material only.
- The disease, conception and life-history sources (Williams 2008, Deschner & Boesch 2007 and others) were not re-checked this
  time. The code for both matches the log's description.
- `paper.html` beyond a spot check that its key sentences match the Markdown.
- Entries 37–43 and 47 in detail (read 37, 42; skimmed the rest by title).
- My sign-test p-values are hand arithmetic; recompute before quoting.

## Sources checked on the web

- [Study reveals overlooked breadth of chimpanzee culture (Max Planck Society)](https://www.mpg.de/26529583/study-reveals-overlooked-breadth-of-chimpanzee-culture)
- [News release on the same study (EurekAlert)](https://www.eurekalert.org/news-releases/1129171)
- [Vaesen et al. 2016, Population size does not explain past changes in cultural complexity (PNAS)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4843435)
- [Henrich et al. 2016, Understanding cumulative cultural evolution (PNAS)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5098611)
- [Vaesen et al. 2016, Reply to Henrich et al. (PNAS)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5098628)
