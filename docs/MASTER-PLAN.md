# Genesis master plan — making the world run so hominins can evolve and build on their own

Written 16 November 2026 by Fable (independent advisor), at the owner's request: *"whatever you think should be included in the
plan for making the world simulate so we can see the hominins evolve and build on their own — tell me so we can keep it and
build upon it."*

**This is the one plan to keep.** It replaces the layered history in `docs/HOMININ-PLAN.md` (keep that file as the archive). It is
written so that the owner can go on alone, with a cheaper model, or with volunteers.

**How far to trust this file.**
- I read the rules (`CLAUDE.md`), the handover, the old plan, the backlog, both of today's reviews, the latest research-log entries,
  the assumptions register, and parts of `src/` and `tools/`. I ran no experiments and no tests.
- I had web search today. I checked about 30 sources (section 5 lists them). "Checked" means: the paper exists, the journal and
  year are right, and its main claim matches, **at the level of the abstract or a reliable summary**. I did not read full texts.
  Any exact number must still be read in the paper before it goes into the code.
- Everything marked *from memory* is my recall. Treat it as a lead, not a fact.
- This plan is advice. Rule 6 applies to it: verify each item before building; drop any item that fails its check.

---

## 1. The goal

**In one paragraph.** Genesis is a small, honest copy of East Africa about 2.5 million years ago. Its hominins get real bodies,
real needs and a small learning brain, and nothing else: no tools, no fire, no words, no scripted behaviour. Every number comes
from research or is listed as an assumption. Nothing is tuned to make them survive or "become human". The goal is to run this
world down the generations and watch, with fair measurements, whether bodies and brains change by inheritance and selection,
whether skills are found, copied and kept, and whether anything is ever built on what came before — and to report an honest
"no" as carefully as a "yes".

### What "evolve and build on their own" means, as tests

Each line is a claim that can be checked. Make no claim without its test.

| # | Claim | The test (all on 24+ worlds, prediction written first) |
|---|---|---|
| E1 | **Bodies and brains evolve** | An inherited trait's average moves the same way in most worlds, over many generations, **further than a neutral marker gene moves by chance**. Its advantage is *measured* (more surviving young for carriers), never written into the code. |
| E2 | **A skill is learned, not stumbled on** | After its first reward, the same hominin does it again, sooner and more often (count repeats, not firsts: F5). |
| E3 | **A skill spreads by copying** | More learners with copying on than with copying off, on the same worlds, counting only hominins born in the run who had the means at hand (the design of entry 58). |
| E4 | **A tradition** | A habit outlasts its inventor; neighbouring bands with the same land and the same genes differ in it; a youngster who moves takes up the new band's way (the method of Whiten et al. 1999). |
| E5 | **Cumulative culture** ("building on") | A skill gets *better* over generations (more food per hour, fewer failed blows), each step learned from others; and it ends up beyond what a lone, naive hominin with the same materials finds in a whole life (the "lone inventor" control arm). Criteria after Mesoudi & Thornton 2018 and Tennie et al. 2009 — read both before using. |
| E6 | **Building** | Things made in several steps, kept and used again. At 2.5 Ma the faithful first "building" is a **nest**, then a flake made on purpose and carried. |

**What the real record says to expect.** Stone tools appear by about 2.6 Ma (earlier at Nyayanga and, disputed, Lomekwi). Then the
Oldowan stays much the same for some 700,000 years (Morgan et al. 2015). So the faithful result for 2.5 Ma is E1–E4 at most:
*tradition without piling-up*. E5 belongs far down the relay, if anywhere. A world that shows E5 quickly is more likely wrong
than wonderful.

### What would be a fake success

- A "first" that is one random act meeting a rule in the code.
- Any behaviour with an inborn weight, a hidden skill counter or a built-in reward behind it (the old fire links were this).
- A result that appears after a number was moved, or a trait that "evolves" because the code says it is better.
- "Spread" measured by being in the same place. "Selection" claimed without the neutral marker.
- A brain that grows with no food cost. A hut at 2.5 Ma. Words that are only names for the builder's own labels ("food", "predator").
- A headline from fewer than 24 worlds, from the best window, or from one clock without saying which.
- Calculated ages shown as if creatures lived them.

---

## 2. What a world must contain for this to happen at all

For each ingredient: is it in Genesis **now** (checked against the code today), the evidence, and the stage where it goes.
Stages are in section 3.

**1. Inheritance and mutation, with sourced rates and a real generation time — PARTLY.**
- Now: children get each inherited trait from one parent or the other (`src/creatures.js`, `child()`); brain layout and inborn
  wiring are inherited; learned weights are not (correct). Traits: brain size `bs`, learning rate, copying `im`, feeling others'
  fear `vf`, timidity `tm`, parental care `pc`, voice genes `vl` `pg` `sh`, and more.
- **Gap found today:** the mutation rule is not in `docs/ASSUMPTIONS.md` and has no source. Each trait has a 1-in-5 chance per birth
  of a step up to ±15% (`mut`, `mutA`, `mut2`); each inborn wire has a 3% chance of a random nudge. The registry test does not see
  these numbers (it checks only `HOMININ.*` and `SOC.*`). This is the engine of evolution; it must be registered and tested at
  both ends before any claim E1.
- No neutral marker gene yet (the "chance alone" yardstick). Generation time is not measured (mean age of parents at a birth).
- Evidence: chimpanzee generation time over 24 years (Langergraber et al. 2012, checked); ape mutation rate per year about 1.5 times
  the human rate (Besenbacher et al. 2019, checked); how to measure selection (Lande & Arnold 1983, checked).
- Stage: register the rule and add the marker in stage 0 (hours); measure and test in stage 5.

**2. Real selection pressures — PARTLY, the strongest part of Genesis.**
- *Food by season:* **NO.** Plant growth follows temperature only (`src/climate.js`, `growthAt`; fruit in `src/forest.js`), so in
  the tropics food hardly changes through the year. Rain exists (`src/weather.js`) but does not drive fruit. → **Stage 0.**
  Evidence: fallback foods (Marshall & Wrangham 2007, checked); monthly fruit data for a savanna woodland still to find (Issa, Ugalla).
- *Predators:* **YES.** Leopard, hyena, a sabre-tooth (*Megantereon*); predation 1.3% a year, inside the primate range (entry 83).
  Hunts cannot yet be detected and escaped (F1, stage 0).
- *The carnivore guild and carcass competition:* **PARTLY.** Three hunters, carrion birds, rot, kills kept. Missing: *Dinofelis*,
  *Homotherium*, lions, giant hyenas, who drives whom off a carcass, danger at a carcass. → Stage 2. Evidence: Werdelin & Lewis 2013
  (checked); Blumenschine 1987 (checked); Carbone & Gittleman 2002 (checked).
- *Disease:* **PARTLY.** Outbreaks by closeness (entry 46). The stand-in is biased (habituated chimpanzees, human viruses); no
  parasites, wound infection or carcass-borne illness. → register the caveat in stage 0; more in stage 2–3.
- *Heat and water:* **PARTLY.** Thirst, heat and cold thresholds, shade (`heatOf`, `coldOf`). Missing: midday rest, water sources that
  dry up, danger at the last water. → a row in the faithful-day table now; the mechanism with the valley (stage 2).
- *Birth and infant care costs:* **YES, mostly.** Pregnancy, 4 years of nursing with an energy cost, carried infants adding to
  walking cost, birth spacing 5.3 years (real 5.2–6.0), only mothers feed young. Missing: a mother's occupied arm (stage 4).

**3. Learning brains with honest limits — PARTLY.**
- Now: up to 64 thinking units, 8 memory units, 19 actions, one learning rule (learning from surprise), credit that fades to 22%
  after six steps (`GAM` 0.97 × `LAM` 0.8). Brains cost energy (`SOC.brainF` 0.10). Senses arrive labelled ("food", "predator").
- Unknown: the longest chain of steps this brain can learn. Nobody has measured it. → F3, stage 0, one day.
- The limits must be said on the front page (F17). Changes to the brain come one at a time, each with evidence (stages 4 and 7).

**4. Social learning and copying fidelity — PARTLY.**
- Now: copying an elder's choice by its visible result, in the same square; copying sequences; inherited copying genes.
- Measured: for easy skills, watching adds nothing once the means are counted (entry 58). Copying fidelity is not measured at all.
- Evidence: Oldowan knapping passes on poorly by imitation alone (Morgan et al. 2015, checked); naive people re-invent early
  knapping alone (Snyder, Reeves & Tennie 2022, checked); capuchins make flakes by accident and never use them (Proffitt et al.
  2016, checked). → the hard-skill test in stage 0 (F6), the tradition test in stage 4.

**5. Group life, kinship, dispersal — MOSTLY NO.**
- Now: one band, alone. A "family" sense and mother–child pulls exist. No neighbours, no knowing individuals, nobody moves between
  groups, no rank.
- Evidence: females leave at adolescence in chimpanzees (Pusey and others, checked earlier in the repo); the same pattern in
  australopith teeth (Copeland et al. 2011, checked — sex was guessed from tooth size, so treat as supportive, not proof).
- → Stage 3.

**6. A landscape with real resources — PARTLY.**
- Now: a globe of 128 × 80 squares of about 3 km, with climate, weather, rivers, forest, caves. Stones and sticks are a *count* per
  square, all alike. Sleeping trees exist (tree cover 0.4 and up). No stone sources by rock type, no nests, no fine valley.
- Evidence: hominin sites were mostly open, under about 40% woody cover (Cerling et al. 2011, checked); toolmakers chose good stone
  from the start (Stout et al. 2005, checked) and carried some of it over 10 km (Braun et al. 2008, checked).
- → the valley inside the globe (stage 2), stone as real objects (stage 4).

**7. Enough time and enough individuals — NO. This is the hardest limit.**
- Speed now (rough; re-measure in stage 1): about one life-year per minute of computing per world, on the squeezed 3-day year.
- A generation is about 25 life-years, so about 25 minutes. **1,000 generations of one band is about 17 days of computing; with a
  3× faster engine, about 6 days.** 2.5 million years is about 100,000 generations: years of computing. More machines give more
  worlds, never more years in one world.
- Numbers of individuals matter as much. In a band of 30, luck swamps all but strong advantages (*from memory:* selection wins
  only when the advantage is larger than roughly 1 ÷ twice the breeding population; real hominin breeding populations were in the
  order of 10,000).
- So: lived windows of a few hundred to a few thousand years in 24+ worlds, joined by a checked calculation (the relay: stages
  5–6). Whether that calculation can be trusted is itself a test with a stop rule.

**8. Communication on the path to words — PLUMBING ONLY.**
- Now: a voice with no built-in meanings, hearing by real sound physics, pointing, inherited voice genes starting ape-low, a
  watcher (`src/talk.js`). One word per 15 minutes; only the loudest word is heard; the detector's own check fails (B12).
- → Stage 7, steps L0–L6, always with a deaf control arm.

**9. Fire — WILDFIRE YES, FIRE-MAKING NO (off since entry 77).**
- Real record: no fire use at 2.5 Ma; burning in a cave about 1.0 Ma (Berna et al. 2012, checked); earliest fire-*making* about
  415,000 years ago (Davis et al. 2025, *Nature*, Barnham — checked; the register calls it "Barnham, Nature 2025": add the authors).
- So at 2.5 Ma the faithful result is: they meet wildfire, may learn to use burned ground, and never make fire.
- → fleeing wildfire (A3) in stage 2, because wildfire still causes 5–9% of deaths. Fire-making (A41) only after fine hand actions
  exist (stage 4 or later), with the expected result "almost never".

---

## 3. The roadmap

One plan. Stage 0 is running now (it began 16 Nov 2026). Time boxes are for evenings and weekends and are guesses.

**Rules for every stage**
- A pass test compares Genesis with **real data**, named below. It never sets a target for an outcome ("bands must last…").
  Outcomes are *reported*.
- If a test fails, do not tune. Look for the real thing that is missing, source it, add it with a switch.
- At the end of each stage: re-score the faithful-day table, cut a tagged release, and re-read this plan.
- Status marks: **[done]**, **[now]**, **[to do]**, **[parked]**.

### Stage 0 — A faithful day, and can they learn? (three months: to about mid-February 2027)

**Goal.** Hominins whose days and lives match field numbers, and a clear answer to "can this brain learn a hard skill?".

Steps, in order. F-numbers are from `docs/BACKLOG.md` section 0; G-numbers are today's gap review.

| # | Step | Size | Status |
|---|---|---|---|
| 0.1 | Finish entry 85 (digging is an act): compare the arms, write the entry, tagged release (F24) | 1–2 days | [now] |
| 0.2 | Housekeeping: put the identical-worlds check in `tools/` (the old script was in a temporary folder and is lost); register the mutation rule; add a neutral marker gene on its own random stream (G9); add `preymap`, `realism-body` and `registry` tests to the `test:quick`/`test:slow` lists (they are in neither) | 1 day | [to do] |
| 0.3 | F3: the chain-learning probe (chains of 2, 3, 4, 5 steps, reward at the end) and L0, the delayed-response probe | 1 day | [to do] |
| 0.4 | **The hungry season (R1, G1).** Fruit follows rain with the real lag. Find monthly fruit data first (Issa: Piel et al. 2017; Ugalla). Switch: fruit follows warmth only. Prediction: hunger deaths and fallback eating bunch in one part of the year | 1–2 days after the data | [to do] |
| 0.5 | F1: detectable hunts. Source detection and success separately; a herd stays alert after a failed attack; vigilance tied to eating and sleeping; judge by kills per hunter per day against need. Then leave hunters alone | 1–2 weeks | [to do] (prey flight built, entry 84) |
| 0.6 | F5: count repeats, not only firsts, for every discovery; split every learning measure by sex (G13) | 2 days | [to do] |
| 0.7 | F4: the real-length-year clock for learning questions; test A40 (a 12-day year) first | 1 week | [to do] |
| 0.8 | **Milestone 1 — F2: the faithful-day table, frozen.** See below | ~3 weeks in all | [to do] |
| 0.9 | **Milestone 2 — a 3-step chain learned within one real-length childhood** | by ~week 6 | [to do] |
| 0.10 | **Milestone 3 — F6: one hard skill** (cutting with a flake, made hard by physics, not by a dial): repeats rise within a hominin; young of skilled mothers start sooner than controls, with the means counted. Write the real-world comparators into the prediction file first (G14) | by ~month 3 | [to do] |

I moved F3 ahead of F1 because it takes a day and its answer can end the stage early. The handover has F1 first; either order works.

**The faithful-day table (milestone 1).** Rows, each with its source, its range, its clock, and pass or fail over 24 worlds:
infant deaths; survival to 15; life expectancy; birth spacing; age at first birth; population change; share of deaths from
illness (these seven exist: `tools/analysis/reality-check.js`); hours feeding, resting, travelling; day range; plant, meat and
C4 shares of the diet; meat per day; predation per year; hunters' kills per day against need; when in the year hunger falls;
party size (G11, measure and label); a sleeping site each night; midday rest in heat (G8, a known fail); wildfire deaths (a known
fail); old-to-young adult ratio; mean age of parents at a birth.
- **Freeze it with its fails showing.** Do not freeze before the hungry season is in.
- **Hold three rows back**: choose them now, do not look at them during development, score them only at each release (after
  Grimm et al. 2005).
- Ask one working researcher to look at the table before it is frozen (G16).

**Real data for this stage.** Chimpanzee life tables (Hill et al. 2001; Wood et al. 2017; Emery Thompson et al. 2007); savanna
chimpanzee days and seasons (Fongoli, Issa); primate predation rates; diet isotopes (Cerling et al. 2013; Sponheimer et al. 2013);
hunt success (Schaller 1972; FitzGibbon 1989); nut-cracking ages (Inoue-Nakamura & Matsuzawa 1997; Berdugo et al. 2024); knapping
comparators (Toth et al. 1993; Snyder et al. 2022).

**Stop rules (F7, in force).** Stop and decide again if: milestone 2 fails and the owner does not want a different brain;
milestone 3 is null on both clocks (write it up — "ape brains do not knap" is a faithful result); a month passes with no measure
of hominin *behaviour* changing; or it stops being a pleasure. The pass mark "9 of 12 rows" is a convenience for the stop rule,
not a sourced number — label it so.

### Stage 1 — A faster engine that anyone can repeat (2–4 weeks)

**Goal.** More years per hour, and the same world on every machine.
- F8: profile first (`tools/analysis/profile-run.js`, `profile-top.js`), then speed. Animals far from any hominin need no brain.
- G10: pin the Node version; a free automatic check on GitHub (quick tests plus a two-seed identical-worlds check); compare one
  seed in Chrome and Firefox. *From memory:* `Math.sin`, `Math.exp` and `Math.pow` may differ in the last digit between engines —
  check before trusting browser runs as data.
- F18: one command repeats any logged entry.

**Test.** Three times faster with **identical worlds by seed**. This stage is checked against itself, not against field data:
the faithful-day table must not move at all.
**Stop rule.** If two weeks of profiling give less than 1.5×, stop optimising JavaScript and bring the owner the rebuild choice
(a fast core in another language) with measured costs. Do not rebuild before stage 0 is done.

### Stage 2 — The valley inside the globe (1–2 months, after a written specification)

**Goal.** A place at walking scale, so that an escape, a stalk, a tree 30 m away and a gift between hands can exist.
1. **The specification first** (G4; 2–3 days; reviewed before any code): which real basin is borrowed as the stand-in; woody
   cover; the river and gallery forest; dry-season water; where good stone lies; sleeping trees. One page, every number sourced.
2. F9: one basin of about 25 × 30 km at 100–250 m squares inside the planet. The planet supplies weather, river flow and animal
   densities at the edge. All brained creatures live in the valley. Leavers go to a calculated "elsewhere". Short time steps only
   where something happens.
3. Every rule tied to "a square" or "a step" re-written in metres and minutes, each with a switch back to the coarse world.
4. With the valley: heat and water through the day (G8); sleep sites and nests (R25, F12); fleeing wildfire (A3); rock quality
   by place (A43); the wider carnivore guild and carcass contests (G6, R19); smell (A45, F16).

**Test against real data.** Woody cover and habitat mix against Cerling et al. 2011 and the chosen basin; distances to stone
against Braun et al. 2008 and Stout et al. 2005; scavenging chances against Blumenschine 1987; the guild against Werdelin & Lewis
2013; and the faithful-day table re-scored — it must not get worse. Entry 84's escapes should now be visible.
**Stop rule.** If the table falls by more than two rows and the cause is not found in a month, keep the coarse world for
generation questions and use the valley only for learning questions. Say so on the page.

### Stage 3 — Bands, kin and moving between groups (1–2 months)

**Goal.** A connected population instead of one band alone.
- F10: three bands of about 30; a few inputs about the nearest other (how familiar, kin or not, what happened last time);
  females moving at adolescence; newcomers from "elsewhere" at field rates.
- Later, each verified first: male rank (R13), grooming and alliances (R15), raids and infanticide (R10).
- L3 of the path to words starts here (stage 7).

**Test against real data.** Share of females who transfer and their age (Gombe, Mahale: Pusey and others); the sex difference
in who moves (Copeland et al. 2011); community and party sizes (chimpanzee sites).
**Reported, not targeted:** how long bands last. The earlier "bands last 300 years in most worlds" is withdrawn — it was an
unsourced outcome target.
**Stop rule.** If knowing individuals cannot be learned by this brain in a bare test world, that is a brain change: one evidenced
change, one switch, or stay with "familiar / kin" only and say so.

### Stage 4 — Things as things, then the tradition test (2–3 months)

**Goal.** Make craft possible without scripting it; then ask whether a habit lasts.
- F11: each stone, stick and bone an object with weight, hardness and an edge that wears; two hands; bones and heads carried (A46).
- F12: physics of amounts, not shapes — blow energy, fracture by angle and rock, load, digging by soil, branch strength for
  nests, rain and cold on a sleeper. Weak throwing. Nests, not huts.
- G12: a mother's occupied arm (contested evidence: test both ends).
- F28: the **traces-left test** — do they leave what the real ones left? Flakes and cores per site, stone carried how far, cut and
  hammer marks.
- Then the tradition test (E4), and E3 again for the hard skill.

**Test against real data.** The Oldowan record itself (Gona, Kanjera South, Nyayanga: Stout et al. 2005; Braun et al. 2008;
Plummer et al. 2023); learning comparators (Morgan et al. 2015; Snyder et al. 2022; Proffitt et al. 2016); Whiten et al. 1999
for the method of calling something a tradition.
**Stop rule.** If no tradition appears on the real-length clock with working objects: change the brain one evidenced change at a
time (more memory; a map of places; learning that predicts what an act will do), or stop here and write it up.

### Stage 5 — Selection measured, and the bridge checked (2–3 months)

**Goal.** Know which inherited traits selection really moves here, and whether a calculation can carry them forward.
- Test the mutation rule at both ends of a sourced range. Report every trait beside the neutral marker.
- Measure selection on each trait (surviving young against trait value, all traits together: Lande & Arnold 1983).
- F13: build the bridge — a standard population-genetics calculation for a population of thousands, using the measured selection,
  a sourced mutation step and generation time.
- **The check:** measure in the first 200 years, let the bridge predict year 2,000, then *live* 2,000 years in 24 worlds on a
  rented machine and compare.
- G15: a small screening run over the ten most uncertain numbers, to find the ones that interact.

**Test against real data.** Generation time against Langergraber et al. 2012; mutation step against Besenbacher et al. 2019 and
measured heritabilities (the register already cites Oler et al. 2010 for temperament); selection strengths against field
studies (*from memory:* Kingsolver et al. 2001, *American Naturalist* — check). The bridge itself is checked against the lived
2,000 years, which it has never seen.
**Stop rule.** If the bridge misses the lived run by more than the spread between worlds, millions of years cannot be reached
faithfully this way. Stay with lived centuries and say so.

### Stage 6 — The relay: 100,000 years, then a million (3+ months, a few hundred dollars of rented machines)

**Goal.** Lived windows joined by checked bridges, each window started from the bridge's traits in that time's climate.
- F14. Never fast-forwarded: anything learned, anything new. Every discovery happens in a lived window or not at all.
- Name the climate record before starting (candidates, *from memory*: the deep-sea oxygen-isotope stack of Lisiecki & Raymo 2005;
  African dust and aridity, deMenocal 2004 — the paper is checked, its step dates are not). F29 parks ice sheets, but wet–dry
  swings must stay.
- Forbidden: hand-written selection; one window's measurement stretched across the whole span; brains that grow without their
  food cost; keeping the windows that went well.

**Test against real data.** Direction and pace of brain and body size against the fossil series (to choose and verify; the
old plan's table gives about 600 cm³ at 2 Ma and about 900 at 1.8 Ma; the register gives 420–550 for australopiths); first appearances against the archaeological
record. **Written as predictions before the relay runs.**
**Stop rule.** If traits move in different directions in different worlds, the result is "chance rules at this scale". Report it.

### Stage 7 — Signals, alongside stages 3 to 6 (open-ended)

**Goal.** Make a first learned signal *possible*, never rewarded. F15, one switch and one bare-world test each:
- L0 (stage 0) how long can the brain hold a cue? L1 speech in seconds, learned working memory. L2 learning by prediction from
  listening alone (the Saffran test). L3 a signal that is not inborn, used in one situation, acted on by hearers, and worlds with
  hearing beat a **deaf arm**. L4 bands differ in which sound means what. L5 combining. L6 order that carries meaning.
- First fix the detector's own planted-sound check (B12). Start with mother and child. Gestures may be the more faithful road.
- Never: a reward for being understood; a ready-made language part; anything trained on human language.

**Test against real data.** Delayed-response results for monkeys and apes; statistical learning (Saffran et al. 1996; a monkey
version, Hauser et al. 2001, *from memory*); alarm calls (Seyfarth, Cheney & Marler 1980).
**Stop rule.** If L3 stays null against the deaf arm on the real-length clock, the world gives nothing worth saying. That is the
result. My odds, as a judgment: L1–L2 will work; L3 likely; L4 possible; L5 a long shot; L6 not a bet.

### Running beside the stages (the instrument others can trust)

| Item | When | Status |
|---|---|---|
| F23 code MIT, writing CC BY 4.0 | — | [done] 16 Nov |
| F25 public name | — | name chosen; addresses open (section 7) |
| F24 tagged releases, often | from step 0.1 | [to do] — only v0.7.0 exists |
| F19 "What we got wrong" page; F20 link each entry to the commit holding its prediction | this month | [to do] |
| F17 front page with the brain's limits; F18 validation table with its fails in every release, a one-page statement of limits | with milestone 1 | [to do] |
| G16 a "source read: yes / abstract only / secondary" column in `docs/ASSUMPTIONS.md` | this month | [to do] |
| F21 repeat-it guide and contributor guide | end of stage 0 | [to do] |
| F22 a preprint on one sharp question; a collaborator; nulls published | after stage 0 | [to do] |
| F26 funding order; a small second desktop | ongoing | [to do] |
| F27 no server: static site, worlds in the visitor's browser | — | partly |
| G2 push `percept` | — | [done] — `git status` today shows it level with `origin/percept`; keep it in the routine |

### Where the rest of the real world goes (the old Phase C)

Nothing here is dropped. Each has a stage, or is parked **by the owner** with a date. The "parked" marks below are my
recommendation only (section 7).

| Item | Goes to |
|---|---|
| Hungry season (R1) | stage 0, step 0.4 |
| Heat and water through the day; sleep sites; fleeing wildfire (A3); rock quality (A43); carcass contests (R19); the wider guild; smell and droppings (A45) | stage 2 |
| Insects, termites, honey, eggs, sedges (R12, A15, A29); baboons as competitors (R18); crocodiles at water (R4) | stage 2, after the valley works — each needs the fine scale |
| Several groups, transfer, rank, raids (R14, R13, R10, R15) | stage 3 |
| Bones carried (A46), carrying far (R20), a mother's arm | stage 4 |
| Hair and sweat as evolvable traits (R22) | stage 5–6 (needs heat that builds with activity) |
| Long wet–dry climate swings (R3), the changing landscape (R2) | stage 6 |
| Specific alarm calls (R16) | stage 7 |
| Fire-making (A41) | after stage 4; expected "almost never" |
| Eagles (R5), snakes (R7), elephants and hippos (R8) | recommend [parked] until stage 2 is done; real, so the owner decides |
| *Paranthropus* (R17), skin pigment (R23), ice sheets | [parked], agreed 16 Nov (F29) |

---

## 4. The method — a checklist for every change

Follow it in order. If a step is skipped, say so in the entry.

**Before building**
1. **Write the task in one sentence** and add it to `docs/BACKLOG.md` if it is not there.
2. **Verify online.** Find the source. Read the number in the paper itself, not in a summary. Note where sources disagree. This
   applies to the owner's ideas, a reviewer's ideas and this plan alike.
3. **Register every number** in `docs/ASSUMPTIONS.md`: value, source, status (sourced / direction / assumption / deviation), and
   the range to test. The registry test catches unregistered `HOMININ.*` and `SOC.*` numbers; numbers elsewhere (like the mutation
   rule) it does not catch, so check by eye.
4. **Is anything real being left out?** Then it is the owner's decision. List it; do not drop it.

**Building**
5. **One change, one switch.** The switch restores the old rule. Add it in `tools/experiment-core.js` beside the others. New
   random draws use a separate random stream, so the rest of the world stays the same.
6. **The identical-worlds check.** With the switch set to the old rule, the new code must give the old code's worlds, to the last
   digit. Run two seeds for 20 days on the old commit and on the new code with the switch, then compare the data rows:
   ```
   git worktree add ../genesis-old <old-commit>
   (cd ../genesis-old && nice -n 19 node tools/experiment.js --seeds 1-2 --days 20 --out /tmp/old.csv)
   nice -n 19 node tools/experiment.js --seeds 1-2 --days 20 --<the-switch> --out /tmp/new.csv
   diff <(grep -v '^#' /tmp/old.csv) <(grep -v '^#' /tmp/new.csv) && echo IDENTICAL
   git worktree remove ../genesis-old
   ```
   (Lines starting with `#` hold the commit and command, so they differ. This is my reconstruction of the lost `gapcheck.sh`;
   test it once, then save it as a script in `tools/`.) If the worlds differ, the change touched something else. Find it.
7. `npm run test:quick` while working (fast). The full `npm test` before release.

**Testing**
8. **Write the prediction first**, with **one main outcome**, in `data/findings/NN-name/prediction-written-before.txt`. Commit it
   before the run, so its date is on record.
9. **Run both arms on the same seeds**, gently:
   ```
   nice -n 19 node tools/experiment.js --seeds 1-24 --days 100 --workers 2 --out data/findings/NN-name/new.csv
   nice -n 19 node tools/experiment.js --seeds 1-24 --days 100 --workers 2 --<the-switch> --out data/findings/NN-name/old.csv
   ```
   Never more than 4 workers in total. Heavy jobs one after another. A smoke run of 2–4 worlds first, to catch a broken world.
   Known trap: check that defaults are what you think (the prey map was once off by mistake, entry 83).
10. **Compare.**
    ```
    node tools/analysis/compare-runs.js data/findings/NN-name/old.csv data/findings/NN-name/new.csv old new
    node tools/analysis/rates.js data/findings/NN-name/new.csv
    node tools/analysis/reality-check.js 1,5,9 100 out/      then      node tools/analysis/reality-check.js --summary out/
    ```
    Trace causes before explaining them (`hunger-trace.js`, `hunters-trace.js`, `life-trace.js`, `generations.js SEED DAYS`).
    Measure the *choice* as well as the outcome: a measure tied to the grid can hide what creatures do (entry 84).
11. **Both ends.** For every uncertain number, run the low and the high end of its range. If the result flips, say so.
12. **24 worlds** for anything that matters; 12 at least. Fewer is a trace, labelled "weak".

**Writing up**
13. **A findings entry** in `docs/FINDINGS.md`, by the outline at its end: Version and commit · Data · what was added · the
    real-world basis · the test · the result against each prediction (held / not held) · interpretation · strength · lesson.
    Lead with "Did it make a difference? yes/no, before → after". Nulls and failures get the same care.
14. Update `CHANGELOG.md` and `docs/BACKLOG.md`. State which clock the result used.
15. **A review** before release when possible (section 5 says what to ask).

**Releasing** (no need to ask the owner if everything passes; stop if anything fails)
16. `npm test`
17. Page check: `python3 -m http.server 8765 --bind 127.0.0.1`, open the page in Chrome, force-reload, **read the console for
    errors**.
18. `git checkout develop && git merge --ff-only percept && git checkout percept`
19. Push as separate steps: `git push origin develop`, then `git push origin percept`. Confirm the live file with `curl`.
20. Often, a **tagged release**: bump `package.json` and `CITATION.cff` (version and date), turn CHANGELOG "Unreleased" into the
    version, then `git tag -a vX.Y.Z -m "…"` and `git push origin vX.Y.Z`.
21. Commits: author Malvika Sen, with a co-author line naming whichever model helped.

**Backups**
22. Push `percept` at the end of every session. Once a month, also keep a copy off the laptop and off GitHub
    (`git bundle create genesis-YYYY-MM.bundle --all`, saved to a USB stick or a cloud drive). `data/findings/` is the record of
    two months of predictions; it must exist in more than one place.
23. Never send the owner's name or email to outside services.

---

## 5. How to keep going without an expensive model

### Split the work into cards

One card, one change, one sitting. A card that cannot be written this way is too big — split it.

```
CARD NN — title
Why: the backlog item and the stage.
Source: the paper(s), and who has read the number in them (yes / abstract only / not yet).
Change: one sentence. Files likely touched.
Switch name: --…          Old rule restored: yes/no
Prediction (one main outcome):
Run: the two commands, seeds, days.
Done when: identical-worlds check passes; tests pass; entry written; backlog updated.
Not allowed: changing any other number; touching anything outside the files named.
```

**Safe for a cheaper model or a volunteer**
- Finding and reading sources; filling the "source read" column; fixing citations.
- Analysis scripts that only *read* a world (`tools/analysis/`).
- Running prepared experiments and filling the result table.
- Writing switches for a change that is already designed and reviewed.
- Web page text, guides, the "What we got wrong" page.
- Registering unregistered numbers (never changing them).

**Not safe to hand over without a second pair of eyes**
- Anything in `src/brain.js`, the learning rule or the random streams.
- Choosing a number, a range or a pass mark.
- Deciding that a result "held", or what it means.
- Any design step of stages 2, 5 and 6 (the valley's rules, the bridge).

**Guard rails that work with any helper.** The identical-worlds check, the registry test and the prediction file are mechanical:
they catch most mistakes whoever made them. Give every helper `CLAUDE.md` and section 4 of this file. A cheaper model will sound
sure when it is wrong; make it show the source page and the diff, and never accept "I verified" without the link.

**When there is money for one expensive review, spend it on:** the valley specification (stage 2), the bridge design and its
check (stage 5), and the write-up before a human expert sees it. Not on routine changes.

**People are better than any model here.** One working primatologist or cultural-evolution researcher reading the faithful-day
table is worth more than all of my reviews. Ask for criticism, not approval.

### What to always ask a reviewer (model or human)

1. Which number here has no source, or a source that does not say what we claim?
2. Is anything scripted — an inborn weight, a counter or a reward that makes the result happen?
3. Could this result come from chance, from the grid, from the clock, or from a change other than the one named?
4. Was any number moved after seeing a result?
5. What real thing is missing that would change the answer? (Leaving it out is the owner's call.)
6. Does the written conclusion say more than the table shows? Is the strength label fair?
7. What would you check first if you wanted to prove this wrong?
8. Mark each of your own claims: read in the source / from memory.

### Reading list

**V** = checked by web search in this session (exists; journal and year right; main claim matches at abstract or summary level).
**R** = recorded as checked earlier in this repository (`docs/ASSUMPTIONS.md`, reviews). **M** = from my memory — check before use.

*The record at 2.5 Ma*
1. Plummer et al. 2023, *Science* — Nyayanga, Kenya: Oldowan tools about 3.0–2.6 Ma, hippo butchery, *Paranthropus* teeth. **V**
2. Braun et al. 2019, *PNAS* — Ledi-Geraru, Oldowan older than 2.58 Ma (the dating is contested). **V**
3. Harmand et al. 2015, *Nature* — Lomekwi 3, 3.3 Ma (disputed). **V**
4. Semaw et al. 1997, *Nature* — Gona, 2.6–2.5 Ma. **R**
5. de Heinzelin et al. 1999, *Science* 284:625 — Bouri, cut and hammer marks, 2.5 Ma. **R**
6. Stout et al. 2005, *J Hum Evol* 48:365–380 — toolmakers at Gona chose good stone. **V**
7. Braun et al. 2008, *J Archaeol Sci* 35:2329–2345 — Kanjera South, stone carried over 10 km. **V**
8. Ferraro et al. 2013, *PLoS ONE* — Kanjera South, carcass parts carried, 2.0 Ma. **R**
9. Cerling et al. 2011, *Nature* 476:51–56 — woody cover mostly under 40% at hominin sites. **V**
10. Cerling et al. 2013 and Sponheimer et al. 2013, *PNAS* — C3/C4 diet shares. **R** (journal for Sponheimer: **M**)
11. Copeland et al. 2011, *Nature* — strontium in teeth: females moved, males stayed. **V**
12. Caspari & Lee 2004, *PNAS* — few old adults among early hominins. **R** (the exact ratio is not verified)

*Bodies, lives and danger*
13. Hill et al. 2001, *J Hum Evol* 40:437–450 — wild chimpanzee mortality; life expectancy at birth under 15. **V**
14. Wood et al. 2017 (Ngogo life table); Emery Thompson et al. 2007 (birth spacing). **R**
15. Langergraber et al. 2012, *PNAS* — chimpanzee generation time over 24 years. **V** (the figure via a commentary)
16. Besenbacher et al. 2019, *Nat Ecol Evol* — ape mutation rates, about 1.5× the human yearly rate. **V**
17. Carbone & Gittleman 2002, *Science* 295:2273–2276 — 10,000 kg of prey supports about 90 kg of a carnivore. **V**
18. Werdelin & Lewis 2013, *PLoS ONE* 8:e57944 — the East African carnivore guild, 3.5–1.5 Ma. **V**
19. Blumenschine 1987, *Curr Anthropol* 28:383–407 — the scavenging niche. **V**
20. Marshall & Wrangham 2007, *Int J Primatol* — fallback foods. **V** (volume not confirmed)
21. Piel et al. 2017, *J Hum Evol* — Issa seasons. **R** (monthly fruit tables not yet read)
22. Aiello & Wheeler 1995, *Curr Anthropol* 36:199–221 — the costly brain; challenged by Navarrete et al. 2011, *Nature* 480:91–93. **V**
23. Williams et al. 2008 (Gombe causes of death). **R**

*Learning, tradition, culture*
24. Whiten et al. 1999, *Nature* 399:682–685 — 39 behaviours that differ between chimpanzee communities. **V**
25. Tennie, Call & Tomasello 2009, *Phil Trans R Soc B* 364:2405–2415 — the ratchet; the "zone of latent solutions". **V**
26. Mesoudi & Thornton 2018, *Proc R Soc B* 285:20180712 — what counts as cumulative culture. **V** (criteria only partly read)
27. Morgan et al. 2015, *Nat Commun* 6:6029 — Oldowan knapping passes on poorly without teaching. **V**
28. Snyder, Reeves & Tennie 2022, *Sci Adv* 8:eabo2894 — naive people re-invent early knapping alone. **V**
29. Proffitt et al. 2016, *Nature* 539:85–88 — capuchins flake stone by accident and do not use the flakes. **V**
30. Bandini, Motes-Rodrigo et al. 2021, *Open Research Europe* — naive chimpanzees did not make or use flakes. **R**
31. Berdugo et al. 2024, *Nat Hum Behav*; Inoue-Nakamura & Matsuzawa 1997 — learning to crack nuts. **R**
32. Henrich 2004, *Am Antiq* 69:197–214 (population size and skill) against Vaesen et al. 2016, *PNAS* 113:E2241 (it does not
    explain the record). **V** — read both sides before any band-size claim.

*Evolution, method, signals, fire*
33. Lande & Arnold 1983, *Evolution* 37:1210–1226 — measuring selection on several traits at once. **V**
34. Grimm et al. 2005, *Science* 310:987–991 — test a model against several patterns at once, some held back. **V**
35. Grimm et al. 2020, *JASSS* 23(2):7 — the ODD format for describing a simulation (use it for the methods paper). **V**
36. deMenocal 2004, *Earth Planet Sci Lett* 220:3–24 — African climate and faunal change. **V** (step dates not confirmed)
37. Berna et al. 2012, *PNAS* 109 — burning at Wonderwerk Cave about 1.0 Ma. **V**
38. Davis et al. 2025, *Nature* — Barnham: fire-making about 415,000 years ago. **V**
39. Saffran, Aslin & Newport 1996, *Science*; Kirby, Cornish & Smith 2008, *PNAS*. **V** (through summaries only)
40. Seyfarth, Cheney & Marler 1980 (vervet alarm calls); FitzGibbon 1989, *Anim Behav* 37:508–510; Schaller 1972. **R**

*Leads from memory, not yet checked (**M**):* Kingsolver et al. 2001 (strength of selection in the wild); Lisiecki & Raymo 2005
(climate stack); Potts 1998 (variability selection); Boyd & Richerson 1996 (why cumulative culture is rare); Dean et al. 2012,
*Science* (what cumulative culture needs); Kaplan et al. 2000 (human life history); Pruetz & Bertolani 2009 (Fongoli heat);
ten Broeke et al. 2016, *JASSS* (sensitivity analysis); Toth et al. 1993 (Kanzi); a compiled series of hominin brain sizes.

---

## 6. Risks, and how to notice them

| Risk | How to notice it | What to do |
|---|---|---|
| **Tuning by the back door** | A number changed after a result was seen. A range chosen so the "good" end is inside it. A switch flipped to default because worlds "look better". A row dropped from the faithful-day table. The same test rerun with new seeds until it passes | Every number change gets its own entry with the source. Ranges are set before runs. The held-back rows stay unseen. Ask review question 4 |
| **Chance mistaken for selection** | A trait moves in one or two worlds; no neutral marker beside it; fewer than 24 worlds; a different direction in other worlds | Marker gene on its own stream; report how many worlds moved each way; name the main outcome first |
| **Measures hidden by the grid or the clock** | A sourced behaviour shows "no effect"; the outcome is counted per square or per step (entry 84) | Measure the choice and the outcome; state the clock; trace one world by hand |
| **Not repeatable on another machine** | A volunteer's table differs in late digits or after many days | Pin Node; the automatic two-seed check; record the runtime in the CSV header (already done); treat browser runs as demonstrations until Chrome and Firefox agree |
| **Scope creep** | The backlog grows faster than it closes; a month with no change in hominin behaviour; work on animals while the hominin mind waits (entries 63–84 were this) | The stop rule. One question a season. New ideas go to the backlog with a stage or "parked", not into the week |
| **The reviewer is always the same** | Every review is by Fable; sources "from memory" | A human expert on the table; the "source read" column; this plan itself verified item by item |
| **Wrong default, silent** | A run's settings differ from what was meant (entry 83) | Read the `#` header lines of every CSV before reading results |
| **Burnout** | Sessions feel like duty; sleep is lost; nothing was released for weeks | Small tagged releases; the stop rules are permission, not threat; a null written up is a finished thing |
| **The one laptop** | Heat, a full disk, a spill | `nice -n 19`, 4 workers at most; push every session; a monthly bundle elsewhere; the second small desktop when it can be afforded (F26); rented machines by the hour for 24-world long runs |
| **Being believed too much** | A visitor reads the sims as small humans | The brain's limits on the front page; "to our knowledge", never "first"; fails shown beside passes |

---

## 7. Open decisions for the owner

| # | Decision | My recommendation |
|---|---|---|
| 1 | **Is Fable's advice binding?** ("do everything Fable said, no matter what") | **No.** Keep F1–F29 as the working list, but put them under rule 6 like everything else: verify each; drop or change any that fails. Much of it was from memory. This plan too |
| 2 | **Parked hazards**: eagles, snakes, elephants and hippos, crocodiles, baboons, insects and honey | Give each a stage or a dated "parked" mark in backlog 3b (my suggestion is the table in section 3). They are real, so only the owner can park them |
| 3 | **The hungry season before the table is frozen** | Yes. Otherwise list it in the table as a known fail |
| 4 | **"Bands last 300 years" and "9 of 12" as pass marks** | Withdraw the first (an outcome target). Keep the second only as a labelled stop-rule convenience |
| 5 | **The public name** — *Genesis Odyssey: Origins* | Think once more. *Ancestors: The Humankind Odyssey* (2019) is a game on this very subject, so confusion is likely. If kept, always show the tagline. Decide before renaming anything |
| 6 | **Repository name and web address** | Do not rename now: it changes the live URL and every link in the log. If ever, do it once, at a tagged release, after the name is final, and keep the old address pointing to the new one |
| 7 | **Order of F1 and F3** | F3 first (one day; it can trigger a stop rule). The handover says F1 first; either is fine |
| 8 | **The mutation rule** (found unregistered today) | Register it now as an assumption with a range; do not change the number until stage 5 tests it |
| 9 | **Which real basin the valley borrows** | Decide with the stage 2 specification, from two or three candidates with data (*from memory:* Turkana, the Awash and the Homa Peninsula are well studied) — not before stage 0 ends |
| 10 | **Rebuild the engine in a faster language?** | Not before stage 0 is done; decide in stage 1 with measurements |
| 11 | **A human expert** | Ask one researcher to read the faithful-day table before it is frozen. This is the cheapest large gain in trust |
| 12 | **Fire** | Keep fire-making off. Fleeing wildfire in stage 2. A41 after stage 4, expected "almost never" |
| 13 | **Three test files outside the quick and slow lists** | Add them; small, but a release should not depend on remembering `npm test` covers more |
| 14 | **A second machine** | When affordable. Until then rent by the hour for anything above 24 worlds × 100 days |
| 15 | **When to stop** | Keep the stage 0 stop rules exactly as written. Re-read section 1 at every stage end and ask: is the next stage still the smallest honest step? |

---

## One page to remember

1. The method is the asset: sources, switches, identical worlds, predictions first, nulls kept.
2. Stage 0 first: the hungry season, detectable hunts, the chain probe, the frozen table, one hard skill. Then decide again.
3. Evolution needs a registered mutation rule, a neutral marker, many individuals and a checked bridge. None exists yet.
4. At 2.5 Ma, tradition without piling-up is the faithful ceiling. Quick "progress" is a warning sign.
5. Never tune. If real numbers fail, something real is missing: find it, source it, add it with a switch.
