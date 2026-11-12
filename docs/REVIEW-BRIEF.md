# Brief for an independent science review (for a stronger model, e.g. Claude Fable 5.2)

You are asked to check the science and the reasoning of Genesis, a simulation of early hominins in East Africa about 2.5 million
years ago in which learning creatures with their own neural networks survive, evolve and discover things nobody taught them.
The owner's rules are in `CLAUDE.md` and `docs/HOMININ-PLAN.md`. You review; you do **not** fix.

## What to read, in this order (about 40,000 tokens)

1. `CLAUDE.md` and `docs/HOMININ-PLAN.md` — the rules and the plan.
2. `docs/ASSUMPTIONS.md` — every number, its source or its status as an assumption.
3. `docs/FINDINGS.md` — the research log (entries 1–36), with data under `data/findings/NN-…/`.
4. `docs/BACKLOG.md` — what is found but not built.
5. `docs/HANDOVER.md`, section "Questions for a reviewer".
6. Only where a claim needs it: the code in `src/` (the engine, about 5,800 lines) and `tools/analysis/`.

## What to do

A. **Check every sourced number in `ASSUMPTIONS.md`** against the source named (search the web; open the paper if you can). Mark
   each: confirmed / source says something different / source not found / the number is used for something the source does not
   support. Quote what the source says, with a link. Do not trust a figure because it looks plausible.
B. **Check the research log.** For each entry: does the conclusion follow from the numbers and the ranges? Is the strength label
   fair? Is the comparison fair (the same seeded worlds; "confounded" where the world itself changes)? Is a cause stated as found
   when it was only guessed? Where possible recompute a figure from the data with
   `node tools/analysis/compare-runs.js BEFORE.csv AFTER.csv`.
C. **Look for anything still scripted** that real animals are not born with, anything that sets behaviour directly, and
   modern-human leftovers applied to hominins (the fertility rule was one; grass seen as food was another). Search `src/` for
   inborn pulls (`RF[...]`), bonuses (`a.bonus`), and rules that go by a species name.
D. **Check the owner's rules are kept:** nothing tuned toward an outcome; every uncertain number has a range and was tested at both
   ends; only true reflexes automatic; learned knowledge never inherited; honest minds.
E. **Answer the six questions** in `docs/HANDOVER.md` ("Questions for a reviewer"), and say which real-world pressures of 2.5 million
   years ago are still missing or wrongly weighted (the list is in `BACKLOG.md` section 3b).
F. **Check the evidence behind the main open questions:** why hunger is still the top killer; why learning from others is bred
   out across generations; whether "a bigger band is the key" is supported (entry 36).

## How to report

Write one file, `docs/reviews/2026-11-fable-review.md`, and nothing else. Start with the **ten findings that matter most**, ranked
(severity, where, what is wrong or doubtful, the evidence with a link, what you would check or change). Then a table of every
`ASSUMPTIONS.md` row with your verdict, then findings per log entry, then "things I could not verify". State your confidence for
each finding. Never present a guess as a fact; say "I could not find" when you could not.

## Limits (keep the owner's laptop and data safe)

- Do not change `src/`, `ui/`, `tests/`, `data/` or any existing document. Do not commit or push.
- Do not run experiments longer than a few seconds (the laptop overheats; the saved CSVs are enough). `compare-runs.js` on saved
  data is fine.
- Quote sources; do not paste long passages. Never send the owner's name or email to any outside service.
- Everything you report may be wrong: the owner will verify before anything is changed.

## How to start (the owner)

In Claude Code type `/model`, choose Claude Fable 5.2, then say: *Read docs/REVIEW-BRIEF.md and do the review.* Expect it to take a
while and to cost a few dollars; set the effort to `high`.
