# How Genesis tests things — a short method guide

The method is the part of Genesis most worth copying, even for a different model. It is five habits, each written into the code and
the research log (`docs/FINDINGS.md`).

## 1. Every number has a source, or says it has none

`docs/ASSUMPTIONS.md` lists every setting that stands for something real: its value, the evidence, and a status — **sourced**,
**direction** (the evidence gives a range or a direction; the number is chosen inside it), **assumption** (no evidence; our choice),
or **deviation** (we knowingly depart from the evidence, and why). Uncertain numbers are tested at both ends of their range.
**Nothing is tuned toward an outcome**: if realistic numbers fail, something real is missing — find it.

## 2. One change at a time, with a switch back

Every change comes with a switch that restores the old behaviour (`--old-mating`, `--no-disease`, `--copy-moves`…; the list is in
`tools/experiment-core.js`). Before a change is trusted, the switch is checked: **the world with the switch off must reproduce the
earlier code's worlds to the last digit** (two seeds, compared row for row). That proves the change, and only the change, is being
measured.

## 3. The same worlds, before and after

A seed fixes a whole world. Comparisons run the same seeds with and without the change and compare world by world (the paired
difference, its 95% range, and in how many worlds it went up or down: `tools/analysis/compare-runs.js`). Things added later draw
their random numbers from a separate stream, so adding them leaves everything else identical. Where a change reshuffles the world,
the entry says **confounded**. Claims rest on 12 worlds at least, 24 for anything that matters.

## 4. The prediction is written first

Before a comparison that chance could fool, a short prediction — and the **one main outcome** — is written down and kept with the
data. The log reports which predictions held and which failed. Twelve outcomes per test would give a "significant" one by chance
about half the time; naming the main one first is the guard.

## 5. Failures are logged like successes

Every test gets an entry: the question, the evidence, what was changed, the test, the table, the result against the prediction,
the interpretation, how strong it is, and a lesson. Wrong guesses and corrections stay in, marked as such (for example entries 15,
32, 41, 45, 49, 54). Data and the exact commit are linked from each entry, so anyone can rerun it.

## Tools that make this cheap

- `tools/experiment.js` — run seeded worlds in parallel, one CSV row each (it fails loudly if a world is missing).
- `tools/analysis/compare-runs.js` — paired comparison of two runs.
- `tools/analysis/reality-check.js` — the whole world against real demography (pass/fail table).
- Trace tools in `tools/analysis/` — follow one cause (hunger, hunters, shelters, learning signals) through a world.
- The Lab page runs the same experiments in a browser.

## What this does not guarantee

A careful method does not make a model true: it makes it honest about what it shows. Genesis's limits (a small world, a squeezed
year, small brains, one band) are listed where results are reported, and the reality-check table shows where it still fails.
