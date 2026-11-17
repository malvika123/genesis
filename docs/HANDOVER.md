# Handover — where Genesis stands (16 Nov 2026)

Read this first in a new session, then **`docs/MASTER-PLAN.md` (the one plan to keep, written by Fable on 16 Nov; it replaces the layered history in the old plan)**, `CLAUDE.md`, `docs/HOMININ-PLAN.md` (THE ROADMAP and the sections after it) and
`docs/BACKLOG.md` (section 0: Fable's advice as numbered commitments F1–F29, with status).

## The owner's decisions (16 Nov 2026)

- **Do everything Fable advised, no matter what** — every item is in `docs/BACKLOG.md` section 0 (F1–F29); full text, every word kept,
  in `docs/reviews/2026-11-16-fable-big-picture.md`.
- **Keep the globe**, with a fine-grained valley (100–250 m squares) *inside* it (F9).
- Narrow and time-box: **stage 0, about three months**, with milestones and stop rules (F1–F7).
- The long vision: millions of years, groups with their own ways, language — reached in small, tested pieces (stages 1–7, path to words L0–L6).
- **Public name chosen (F25): Genesis Odyssey: Origins** — tagline "an open, sourced world of early hominins, 2.5 million years ago"
  (README, page title, citation updated). Still to decide with the owner: renaming the GitHub repository and a web address (both change the
  live URL; ask first). Note: "Odyssey" and "Origins" also appear in famous game titles — the tagline keeps it clearly a science instrument.

## The state of the code (branch `percept`)

- Live on GitHub Pages (`develop`): up to commit `3d312fd` (research log entries 82–83: the prey map on by default, cutting is an act,
  the camp fix B28; freeze fix B29; one selection ring; bodies drawn by flesh left; each animal drawn as itself).
- **On `percept`, not yet released (18 commits):**
  - entry 84: plant-eaters have the inborn pull to flee (`--no-prey-flight`); measured: they *choose* to flee more (37 → 56% with a hunter
    in their square) but a 3 km square hides the escape, and attack success is unchanged (about 50%) — detectable hunts (F1) are what matters;
  - entry 85 (built, being measured): digging with a tool is an act (`--tool-in-hand-digs`); prediction written in
    `data/findings/85-digging-is-an-act/`;
  - the writing under CC BY 4.0 (`LICENSE-docs.md`, F23 done); the roadmap, positioning, funding and all Fable sections in the plan;
    backlog section 0.
- **Entry 85 measured (16 Nov evening):** digging is an act — the first stick-dig comes about 2.5× sooner (chance striking), hunger
  deaths unchanged; both predictions not held; written in `docs/FINDINGS.md`. Released as **v0.8.0** (tagged).
- **`docs/MASTER-PLAN.md`** (Fable, 16 Nov): the one plan to keep. Its next steps supersede the list below where they differ
  (it puts the one-day chain probe F3 before detectable hunts F1, and the hungry season in stage 0).

## Later on 16 Nov (v0.9.0, live and tagged)

- Entry 86: mutation rule registered; neutral marker gene; learning from others fell in 17 of 18 worlds beside it (cause unmeasured:
  backlog). `tools/identical-worlds.sh OLD_COMMIT --switch` is the identical-worlds check.
- Entry 87: chain probe — chains of 2 learned, 3 by half, 4–5 none; a cue held 2–4 steps. Next: the probe with copying from an elder.
- Entries 88–89: the hungry season, step 1. Rain at home is seasonal only by chance of latitude; the owner chose "a real station's
  year": fruit now follows Uvinza's dry months (Piel et al. 2017). Fable's hungry-season review is in `docs/reviews/`; its citation for
  a late-dry peak was wrong (a Guinea-Bissau paper), corrected in entry 89.
- PDFs: no reader is installed (the owner was asked about `brew install poppler`, no answer); a stdlib extractor worked:
  `python3 -I <scratchpad>/pdftext.py IN.pdf OUT.txt` (rewrite it if the scratchpad is gone: decompress FlateDecode streams, read Tj/TJ).
- **Next, per the master plan:** 0.5 detectable hunts (F1), or finish the hungry season (nuts by season once sourced; Piel's Figure 3
  ratio), then 0.6 count repeats and split by sex, 0.7 the real-length year (F4) — where the body-side test of the season belongs.

## Detectable hunts (F1), where it stands

- Fable's review: `docs/reviews/2026-11-16-fable-detectable-hunts.md` (do not build yet; leopard and sabre-tooth only; hyenas unchanged).
- Entries 90–91 (measuring): success 35–52% per attack; few attacks on sleepers; **sabre-tooths attack when full (80% of attacks)**.
- Traced (entry 91): full hunters attack mostly from **learning**, not the fixed pull (`--hunt-pull-fixed 0`: sabre-tooth fed
  attacks 80% → 61%). **Next:** a design note for review — what stops a real cat hunting when full (satiety, the cost of a rush),
  sourced; trace where the leopard's carcass goes; then a 24-world baseline; then the detection rule with a registered assumption tested at both ends.

## The satiety brake (entries 92–94, 17 Nov) — released in v0.10.0

- Full hunters let prey pass; hominin predation 1.5% → 2.1% a year, toward the real primate median (~3%, range 0–15%): kept.
- Causes traced (entry 94, weak): hyenas spend more time beside the band; leopards hungrier when they meet hominins. Burned deaths
  falling (90 → 36) is unexplained.
- **Next for hunters (Fable's order):** digestion by size (`--digest-hours`), the leopard's stomach share (0.25 unsupported; 0.10–0.20),
  the energy cap that throws meat away; then F1 detection (leopard and sabre-tooth only). Each needs a source read first.
- Pitfalls: `hunt-measure.js` and `hominin-attacks.js` re-read the code for each world (never edit `src/` while they run); in zsh
  `set -- $a` does not split words; read a hunter's stomach before its attack.

## 18 Nov morning: where things stand (read this first)

- **Released (develop `4bc39ef`):** entries 99–103. Honest watching is merged behind six switches, all off (`--honest-watching`); experiments run on the real Earth by default (`--made-up-planet` for the old planet).
- **Key results:** copying of any kind barely changes how common skills are (entry 101, two planets); honest watching could not be tested properly because **adults eat or strike in only 5–6% of waking steps against about 37%
  feeding in wild chimpanzees** — elders are rarely seen foraging (bouts 0.20 an hour against the registered 0.3–1.5). On seeds 1–8 every band ended by predators within 85 years; hunters fill their fixed caps within 10 years by
  births and newcomers (entry 103).
- **Next, in order:** (1) **the feeding time budget** (backlog "FIRST TOMORROW"): source intake rates by food and daily feeding hours, find why a 15-minute eating step gives so much, fix behind a switch with a prediction;
  (2) honest watching again (bout rate, transmission, single switches, ends of hypotheses); (3) defence per `docs/design/defence.md` as revised by Fable: measure (nights up a tree, hunters' origins), then **several bands**,
  then hunter caps from field density × range, rally only with a wounding phase, sleep high last. **The owner's call pending:** add the missing 2.5 Ma predators (lions, *Homotherium*, *Dinofelis*, *Chasmaporthetes*, crocodiles)?
- **Pitfall learned:** never commit while `npm test` runs (the experiment test compares two tables that name the commit).

## 17 Nov, later: v0.11.0 and what changed (read this first)

- **Experiments default to the real Earth since entry 102** (the owner's choice, 17 Nov); every table before it is a made-up planet (`--made-up-planet`). Entry 102 is the real-Earth baseline: 4 of 7 reality rows pass, population −1.0% a year.
- **Entry 101 (honest watching) is in progress on the `honest-watching` branch** (worktree `~/genesis-wt/honest-watching`): arms A (old copying), B0 (too-low rate), C (no copying) done on the made-up planet; B1 (corrected) running; to re-run on the real Earth after merging. First look: copying, even the old mind-reading kind, barely changes skills.

- **The default eye is honest** (entry 97): food, water and prey are seen by how much is there, not how much the body needs it. `--need-weighted-eye` restores the old eye. **Every table before v0.11.0 used the old eye.**
  Baselines re-made in entry 98 (24 × 100 days, both eyes): the same 3 of 7 reality rows pass (3 of the 5 with sourced bands) (survival to 15, life expectancy, birth spacing); both eyes fail babies dying (too few), age at first birth (too high) and the
  population (−2.0% old, −3.1% honest a year; assumed band).
- Entry 96: the mother's pull explains part of the male lean in butchery and fire acts (weak). Entry 95's "shared words" are probably chance (Opus: `docs/reviews/2026-11-17-opus-human-style-words.md`).
- Page: ape-like Listen voice (audio only), people in water and on river banks drawn right, what a strike hits drawn, a carried baby clings to its mother, sleepers hold still. F19 `docs/WHAT-WE-GOT-WRONG.md` and F20 `docs/PREDICTIONS.md` done.
- Design notes and sources: `docs/design/smell-droppings.md` (build with the fine valley), `docs/design/hominin-voice.md`, `docs/design/real-year.md` (step 0.7 plan), `docs/reviews/2026-11-17-fable-labelled-senses.md`, nuts/roots sources (no honest seasonal rule).
- **Hunter steps are partly unparked:** De Cuyper et al. 2020 (gut fill) is read (retention time about 14–16 h for hunter-sized carnivores against the sim's 24 h: test both ends); the 2019 kill-frequency paper (stomach capacity) is
  free as the Zurich accepted manuscript. Check Table 3 of the 2020 paper by eye (my text extraction garbled some digits).
- Work in separate branches/worktrees works well: `git worktree add` a copy to run experiments from while editing; the owner asked for this. **Never edit `src/` while an experiment or reality-check runs from the same folder** (the tools rebuild the engine for every world).
- **Next, in order (the owner agreed 17 Nov):** entry 99, the trace of entry 97's loose ends (running); **honest watching** — a youngster learns from what it can see of an elder (hands, what is held, food eaten,
  a hurt), within view and reach, not from the elder's chosen act number, reward and inputs (backlog: "How a hominin sees another's actions"; sources being gathered; design note and a Fable review before building);
  then the digestion-time test (14–16 h against 24 h); `words_shared` band-local with a chance baseline (measuring only); step 0.7 (`yearDays`, 3 against 12 days); finish 0.6; then 0.8.
- **Opus's advice to the owner (17 Nov):** narrow to one question ("when does a skill become a tradition?"), stop broadening (no smell, voice design or new senses unless they could fake that answer), keep the stop rule with
  a date (about mid-February); the owner asked whether the project is useful to anyone: say plainly on the front page what it is (a small, open, honest testbed), F17. Fable's next honest-label steps (mate channel, family by familiarity, founders' recognition skill) are the owner's call.

## Step 0.6 done (17 Nov, entry 95, live on develop at `29ef613`; not tagged)

- Every first is now also counted each time (`rep_X`, `who_X`, `whoF_X`; `tools/analysis/repeats.js`); worlds identical.
- Found: flake and stick-digging are habits of many (not one-offs); butchery, burning sticks and marrow lean male across worlds;
  hunting leans female (70%, but 37 hunters in 6 worlds); sharing is 100% mothers. Causes untested — follow-ups in `docs/BACKLOG.md`
  ("Follow-ups from entry 95"): test `--no-mother-pull` with the counts; split the other learning measures by sex (second half of 0.6).
- **Next, per the master plan:** the second half of 0.6 or 0.7 (F4, the real-length year; test A40 first).

## Task card: master plan 0.6 — count repeats, split by sex (DONE, kept for the record)

The hunter steps are **parked**: digestion by size and the leopard's stomach share need De Cuyper et al. 2019 (*Oikos* 128:13–22),
blocked for automated download (Zurich and UCL); the owner may download it by hand later.

**Goal.** For every discovery the world records as a "first" (`firsts.X = 1` in `src/sim.js`, about 32 places; `MILESTONES` in
`tools/experiment-core.js`), also count **every time it happens**, **how many different individuals did it**, and **how many of them
were female / male**. Measuring only: the world must not change.

**Steps.**
1. Write `data/findings/95-repeats/prediction-written-before.txt` first (e.g. which discoveries are repeated by many, which by one;
   whether females and males differ — say what you expect and why, before any run).
2. In `src/state.js` add a measuring-only record, e.g. `DONE = {}` (reset with the world like `firsts`). In `src/sim.js`, at each place a
   first is set, call a helper before the `if (!firsts.X)` check, e.g. `did(a, 'X')`, which increments `DONE.X.n`, adds `a.id` to a
   Set, and counts females (`a.sex === 1`; check which value is female in `src/creatures.js`) and males by first occurrence. Only where
   the event is done by an individual `a`; list any first not tied to one. **No random numbers, no change to any creature.**
3. In `tools/experiment-core.js` add columns `rep_X` (times), `who_X` (individuals), `whoF_X` (female individuals) after the `hd_X`
   columns; expose `DONE` through `state()` in `tools/engine-api.js`.
4. `tools/identical-worlds.sh HEAD` must print IDENTICAL (new columns are listed, not compared). Run `npm run test:quick`.
5. Run 24 worlds × 100 days, 4 workers, nice: `nice -n 19 node tools/experiment.js --seeds 1-24 --days 100 --workers 4 --out
   data/findings/95-repeats/repeats.csv`. **Never edit `src/` while it runs.**
6. Extend `tools/analysis/rates.js` (or a new `repeats.js`) to report, per discovery: worlds where it happened, total repeats per 1,000
   hominin-life-years (hominin_days / 3), individuals per world, share female.
7. Write entry 95 in `docs/FINDINGS.md` (prediction held / not held, with the table), update the master plan's step 0.6 status and
   `docs/BACKLOG.md` F5, then the release routine (tests, page check in Chrome, merge to develop, push develop on its own, confirm live).

**Stop and ask for Opus** if: worlds are not identical; a first has no individual and the right counting is unclear; or the results
look like a bug rather than a finding.

## Next, in order

1. ~~Finish entry 85~~ (done, v0.8.0). Was: compare the two arms (dig firsts per 1,000 hominin-life-years with `node tools/analysis/rates.js`; hunger deaths),
   write the entry in `docs/FINDINGS.md`, then the release routine below — and make it a **tagged release** (F24: release more often;
   bump `package.json`, `CITATION.cff` version/date, CHANGELOG "Unreleased" → the version).
2. **Stage 0, F1: detectable hunts.** Design: `docs/design/staying-alive.md` (step 2). Fable's cautions (big-picture review, section 5):
   source detection and success separately (FitzGibbon 1989 checked; Elliott, Cowan & Holling 1977, Stander 1992, Hunter & Skinner 1998
   to check), a herd stays alert after a failed attack, vigilance tied to eating and sleeping, judge by kills per hunter per day.
3. F3: the chain-learning probe and the L0 delayed-response probe (about a day).
4. F2 the faithful-day table; F4 the real-length-year clock; F5 count repeats; then F6 one hard skill.
5. Alongside: F19 "What we got wrong" page, F20 link entries to commits, F17/F18 front page with the brain's limits and the validation
   table, F21 guides.

## How the work is done (the owner's rules — also in memory)

- Plain, simple English. Lead every report with "Did it make a difference? yes/no, before → after".
- Verify every claim online before building; cite sources; every number sourced or registered in `docs/ASSUMPTIONS.md` (a registry test
  enforces it).
- Never tune toward an outcome. One change at a time, each with a switch that restores the old rule — checked to give **identical
  worlds** (`/private/tmp/.../scratchpad/gapcheck.sh NAME --switch` in the old session; equivalent: run `tools/experiment.js` on seeds
  1–2 × 20 days at the old commit and with the switch, and compare the data rows) — and a **prediction written before the run** in
  `data/findings/NN-name/prediction-written-before.txt`. Log failures and nulls.
- Every design step gets an independent review (Fable) before release when possible; leaving out something real is the owner's call.
- Gentle on the only laptop: `nice -n 19`, at most 4 workers, heavy jobs one after another; `npm test` (90 tests) is slow now.
- **Release routine** (no need to ask): `npm test` → page check in Chrome (serve with `python3 -m http.server 8765 --bind 127.0.0.1`,
  force-reload scripts, check the console for errors) → `git checkout develop && git merge --ff-only percept && git checkout percept` →
  **push as its own step** (`git push origin develop`; a combined command was blocked once) → confirm the live file with curl.
- Commits: author Malvika Sen; end messages with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Keep `docs/BACKLOG.md`, `CHANGELOG.md` and `docs/FINDINGS.md` current. Never send the owner's name or email to outside services.

## Known pitfalls from this session

- `tools/experiment.js` passes `preyMap:false` by default; the prey map is on unless `--no-prey-map` (or the page checkbox) — fixed once
  after a mistaken run (entry 83).
- Measures tied to the 3 km grid can hide behaviour (entry 84): measure choices as well as outcomes.
- A drawing error used to freeze the page; the loop now catches it, but check the console in every page check.
- If GitHub is unreachable from the laptop, check the Wi-Fi has a real IPv4 address (it once had only a self-assigned 169.254 one).
