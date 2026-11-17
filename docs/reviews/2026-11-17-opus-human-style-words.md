# Opus on the human-style word model (17 Nov 2026)

Asked by the owner after hearing the ape-like audio ("it's like radio, ask Opus about the human styled word"). Read only; nothing was run.

**Verdict: yes, it is a real realism problem. Smaller than the labelled senses issue for survival results, but entry 95's `shared` words are almost certainly a fake
success: chance collisions, not convergence.**

**1. How serious.**
- Not ape-like: every hominin has a human syllable grammar (onsets b/p, d/t, g/k, 9 vowel qualities, rounding, 144 syllables) and the ear decodes human cues (burst place,
  voicing, F1/F2). The evidence points to a graded, ape-like repertoire at 2.5 Ma (`docs/design/hominin-voice.md`). Low `vl` adds noise but keeps the human categories.
- Smaller than the labelled senses: calls barely touch survival (a small loneliness bonus, `bonus[7]`), so deaths, births and food results are not affected; it distorts the
  word and language claims only.
- Entry 95's `shared` is a fake success, but not because words name labels. (a) **Chance alone passes the test** (Opus's own arithmetic, not run): `vl` starts at 0–0.3
  (`src/creatures.js:15`); when a hominin speaks each mouth choice is replaced by a random one with chance 1 − `vl`, so 70–100% of the time (`src/sim.js` ~586). 467,940 speaks ÷ 24
  worlds is about 19,500 per world; about half are one syllable, spread over 144 forms, so each form is said roughly 60–70 times by dozens of speakers, and nearly every common
  one-syllable form passes "3 speakers, 10 times". The observed 116 per world sits close to that ceiling. (b) **`WSTAT` counts the whole world**: the three speakers never need to hear
  each other or share a band. Labelled senses still reach words in one place: what a word "means" (`tally(st, context(a))`, the pointing tallies for the translator) is read from builder labels.

**2. Smallest honest change: (a) now, then (b) before any stage-7 claim.**
- Now, (a) plus a measurement fix, no change to the creatures: rename it in the log and on the page (an abstract call space with ape-limited control, shown as grunt variants rather
  than "de"); fix `shared`: speakers must have heard each other (same band), and the count must beat a shuffled-speaker baseline and the deaf arm.
- At L0–L3, (b): replace the syllables with a few graded dimensions (F0, duration, noisiness, rise/fall, perhaps one formant). Starting points: chimpanzee hoo formants about 360 and
  900 Hz; grunt 70–700 Hz and scream 800–2000 Hz (secondary sources only). Group-level call learning in apes is weak and disputed: Taï pant-hoots differ between neighbouring communities
  (Crockford et al. 2004, *Ethology* 110:221; abstract only); a Gombe study reported no dialects (secondary source); food grunts converged after two groups were merged (Watson et al.
  2015, *Curr Biol*), disputed by Fischer et al. 2015 (arousal not ruled out, calls overlapped from the start).
- Would not: (c) vowels-only or a smaller set (still human phonology, and the size is an unsourced knob); (d) alone (leaves a known fake count in the record); let `vl` evolve the voice
  into CV syllables (writes the human end-point into the space it can evolve toward); any reward for convergence.

**3. What the measures count.** `words_said` means calls made: rename it. `words_shared` means nothing until it is band-local and above chance: report the excess over the shuffled
baseline and over the deaf arm. The plan's word probes (L3 against a deaf arm) stay valid only if judged that way. **Caveat entry 95** (done, 17 Nov). The `speak` sex split still
stands. No other FINDINGS entry claims shared words; entry 4 (sound physics) is unaffected.

**4. A fair test.** Prediction first, in the old CV space and the graded space: band-local sharing above baseline about zero at founder `vl`; hearing worlds do not beat the deaf arm;
deaths, births and causes of death within seed noise. Switch (like `--cv-voice`) restoring today's model exactly; identical-worlds check seeds 1–2 × 20 days. Both ends of uncertain numbers:
founder `vl` 0–0.05 and 0–0.3; how finely the graded space is heard (3 and 8 steps per dimension); listener blur ±50%. Runs: 24 worlds × 100 days, three arms (graded, CV, deaf), 4 workers, nice.
**Measurement-only step first:** add the baseline and band-local `shared` to today's model and re-measure, to see how much of entry 95 was chance.

**Could not verify:** full texts of Crockford 2004 and Watson 2015 (abstracts and reply PDFs only); the Gombe no-dialect study (secondary); chimpanzee grunt and scream ranges (secondary
table). The chance arithmetic is an estimate, not a run.

Sources: Crockford et al. 2004 eva.mpg.de/documents/Wiley-Blackwell/Crockford_Wild_Ethology_2004_1555595.pdf · Fischer et al. 2015 critique (lists.stir.ac.uk, Fischeretal.2015-Critique.pdf) ·
Watson et al. reply eprints.whiterose.ac.uk/93291/1/Reply_to_Fischer_et_al_2015.pdf · VOA voanews.com/a/scientists-dispute-study-touting-vocal-learning-in-chimpanzees/3034165.html
