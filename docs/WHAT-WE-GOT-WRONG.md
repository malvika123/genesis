# What we got wrong

Genesis is a research instrument, so its mistakes are part of the record. This page lists the ones we found, what each cost, and what changed. Each links to the research-log entry
(`docs/FINDINGS.md`) where it is written up in full. We add to it whenever we find another. Last updated 17 November 2026.

## Wrong guesses about causes (we guessed, measured, and the guess failed)

- **Entries 14–15: why predators took children less often than chance.** We guessed it was the founders' hidden protection. Removing it changed nothing; the likelier cause is that
  children stay close to grown people and predators take the isolated.
- **Entry 22: why starving hominins did not find food.** We guessed they saw grass as food. We fixed that (it was a real fault) but it did not help; the cause is still open.
- **Entry 40: the planned fix for hunters was wrong.** The traces showed the prey were already at their caps and died mostly of hunger and old age, not of predators.
- **Entry 95: hunting more by males.** We predicted males because a heavier body raises the chance in an attack. In the model it does not (`pc`, `src/sim.js`); 70% of hunters were female, and
  the cause is not measured. Entry 96 found the mother's pull explains part of the male lean in butchery and fire acts, not the hunting.

## Measuring tools that misled us

- **Entries 48, 52, 54–56: only founders were measured.** Three analysis tools read a list of creatures saved at the start of a run; the world makes a new list as creatures are born and
  die, so hominins born later were never measured. Found in entry 57; the entries were marked and the tools fixed.
- **Entry 54: "discoveries do not spread by watching".** The measure was never tested on a case where spreading is known to happen, and a built-in fire rule did spread skill. Revised after
  the second independent review; entry 59 switched the rule off and found the bigger-band head start of entry 53 came mostly from it.
- **Entry 63: "hunters killed no prey at all".** A bug in the ledger tool (the world removes the dead at the end of each step, so the tool never saw a kill). Corrected the same day.
- **Entries 52 and 57: hunger falling by 13 points and by 17% → 23%.** Entry 60 paired the same worlds and found about 7 points, and that the other difference was run-to-run noise.
- **Entry 95, "shared words": probably chance.** The count asks for three speakers and ten uses anywhere in the world, in a space of only 144 sounds, and at founder vocal control 0–0.3 most
  mouth choices are random. Opus's estimate (`docs/reviews/2026-11-17-opus-human-style-words.md`, not yet measured): read "not held" as "the test cannot tell chance from convergence".

## Measuring tools that misled us (17 Nov)

- **"3 of 7 sourced rows".** The reality-check tool printed "against the sourced ranges only: N of 7" though only 5 rows have sourced bands; entries 98 and 100 repeated it. It is 3 of 5. Fixed in the tool; the tool now also gives 95% intervals, which showed entry 100's population change was noise.

## Bugs in the world itself

- **Entry 99: carried babies attacked antelopes and buffalo,** were hurt by them and died "of wounds". Most of the old eye's infant deaths (entry 98, 9.6%) came from this. Being fixed (entry 100).
- **"Its wounds" is a catch-all:** any death where health runs out on land is called that, so it mixes injuries with cold, heat, falls and pits. Read wound deaths with care.

- **Entry 76: sickness from rotting meat.** The 0.35 chance of falling sick was rolled at every 15-minute bite; since meat is eaten in kg, the same meat gave many more chances. It now
  follows the kg eaten. `--rot-per-bite` restores the bug.
- **The prey map default.** `tools/experiment.js` passed the prey map as off by default after it had been switched on in the page, so some runs used the wrong setting. Fixed (entry 83);
  the mistaken runs are kept and labelled.
- **A drawing error froze the page.** Fixed so that the loop catches it and goes on.

## Things the page showed that the world did not do (and the other way round)

On 17 November the owner pointed out that the page must show what the world does, since it cannot be run to check. We found: sleepers on a river square drawn in the river (the world treats a
river square as mostly bank); wading and swimming not drawn at all; strikes drawn as a swing with no target or result; a carried baby drawn standing beside its mother, so it looked dragged;
and sleepers sliding because the world's sleep is in many short dozes. All are fixed (drawing only). The human-voiced "words" and the human synthesis of the Listen sound are still a stand-in.

## A different world measured from the one shown

- **Entry 102: the page runs the real Earth; every experiment so far ran a made-up planet,** which is harsher (population −4.8% against −1.0% a year). Found by the owner watching the page grow. The owner decides which the experiments use.

- **Entry 101: the watching chance counted foraging twice.** A sourced chance for all time together was applied only while the elder foraged, so watching ran far too low; caught by a check before the next arm, kept as arm B0.

- **Entry 105: an arm that ran without its switch.** Two gene-trace arms called "slow eating" were run from a folder where the switch did not exist; the tools ignore unknown flags, so they ran the default again. Found because the two summaries were identical to every digit. The duplicate was deleted; the tools should reject unknown flags.

- **Entries 87 and 107: the chain probe was confounded.** It put the chain's states on inputs that carry inborn hand reflexes (TAKE −4 while holding), so chain lengths of 2–3 and cue holding of 2–4 steps measured the reflexes as much as the learner, and entry 107's "credit passing is the limit" was too strong. Found by Opus's review of the code. Corrected in both entries; the probe is being fixed (entry 108).

## Sources and numbers we got wrong

- **Entry 89: a wrong paper.** The paper cited for "a late-dry-season fruit peak at Issa" is about Guinea-Bissau (Carvalho, Vicente & Marques 2015). The Issa direction comes from Piel
  et al. 2017. **Still to check:** entry 89 says fruit is "lowest late in the rains", which a later reading of Piel 2017's text did not find (it says inverse to rainfall, peak early dry).

## A shortcut that carried more than we knew

- **Entry 97: the eye.** Until 17 November the food and water the brain was handed were multiplied by hunger and thirst, a cue no real eye gives. Without it hominins live smaller
  lives (23% fewer hominin-days) and do many everyday acts less. **Every table made before v0.11.0 (entries 1–96) used the old eye**; `--need-weighted-eye` restores it, and the
  baselines are being re-run (entry 98).
- **The senses arrive labelled** ("food", "predator"): the world, not an eye or a brain, recognises things. Known and listed from the start; Fable's review (`docs/reviews/2026-11-17-fable-labelled-senses.md`) ranks the worst of it.

## How we find our mistakes

Two independent reviews (`docs/reviews/`), a prediction written before every run (`docs/PREDICTIONS.md`), identical-worlds checks for every change, and the owner looking at the page.
Tell us if you find another.
