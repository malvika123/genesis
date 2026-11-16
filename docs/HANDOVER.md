# Handover — where Genesis stands (16 Nov 2026)

Read this first in a new session, then `CLAUDE.md`, `docs/HOMININ-PLAN.md` (THE ROADMAP and the sections after it) and
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
- **Running when this was written:** the entry 85 comparison, 24 worlds × 100 days, both arms (`data/findings/85-digging-is-an-act/dig-act.csv`
  and `tool-in-hand.csv`). If the files are missing, run again:
  `nice -n 19 node tools/experiment.js --seeds 1-24 --days 100 --workers 2 [--tool-in-hand-digs] --out data/findings/85-digging-is-an-act/<arm>.csv`
  (run both arms in parallel, 2 workers each — never more than 4 workers in total).

## Next, in order

1. Finish entry 85: compare the two arms (dig firsts per 1,000 hominin-life-years with `node tools/analysis/rates.js`; hunger deaths),
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
