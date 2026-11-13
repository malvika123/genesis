# Design: making nut cracking realistically hard (backlog A26) — for review before building

Status: **draft for independent review (checkpoint 1)**, 13 Nov 2026. Nothing below is built yet.

## Why

Entry 58: with copying on against off, youngsters showed no learning by watching for nut cracking or stick digging. These skills are
so easy in Genesis (one strike with a stone on a nut always works) that nearly every youngster finds them alone. A tradition can only
appear for a skill that is hard to find alone. Real nut cracking is hard.

## Evidence (checked 13 Nov)

- Experienced Bossou chimpanzees (aged 6–60) retrieve a whole kernel in **83%** of 3,672 bouts; 8% fail, 9% smash the kernel
  (Berdugo et al., bioRxiv 2023.11.21.568000; Nature Human Behaviour 2024).
- Young chimpanzees start trying at **3.5–6 years** and need **3–7 years** to master it at Bossou (Matsuzawa and colleagues), about
  **4 years** of practice at Taï (Boesch); efficiency keeps improving to about 11 and stays different between individuals; old age
  lowers it (eLife 2025).
- Not found: beginners' success rates; how many strikes a learner makes a year; how many never learn. These are **assumptions**.

## Today's code (`src/sim.js`, the strike action)

`act === A_STRIKE && a.hand === 1 (stone) && nut[i] > 0.05` → always succeeds: removes up to 0.25 of the nut cover, gives energy,
counts `a.nuts`. No skill.

## Proposed change (one change, one switch: `--easy-nuts` restores today's rule)

1. **A nut skill per hominin, `nsk`, 0 to 1, starting at 0.** It lives in the body (the hands), outside the network, like fire
   skill `fsk`. It grows only with the hominin's **own** strikes on nuts — never by watching (no rule like the old fire-watching).
2. **A strike on a nut succeeds with chance `p = p0 + (0.83 − p0) · nsk`.**
   - `p0` (a beginner) = **0.02** — an assumption; test at both ends (0.005 and 0.10).
   - The ceiling 0.83 is **sourced** (Berdugo et al.).
   - A failed strike costs the usual energy and gives nothing. (A smashed kernel — 9% — is left out: one more number for little.)
3. **Practice:** each strike on a nut raises `nsk += g · (1 − nsk)`. `g` is chosen so that a hominin striking nuts at the rate
   *the founders do today* reaches about 80% of the ceiling after **4 years of practice (12 simulated days)** — the middle of 3–5
   years. This calibration uses a measured strike rate, so it is the step most at risk of tuning: the rate is measured once, in a
   short run with copying off, before any outcome is looked at, and written down with `g`. Test at both ends (2 and 7 years).
4. **Young hands:** before about 3.5 years of age a strike on a nut never succeeds (motor development; sourced as the earliest age
   at which young chimpanzees start). An assumption about the shape: success possible from 3.5 years, nothing else age-based.
5. **What the brain sees:** only what its body feels (a meal or nothing) and what others visibly get — as now. Nobody is told its
   skill, nobody is stopped, guided or rewarded for trying.

Everything else is unchanged. All numbers go into `docs/ASSUMPTIONS.md` with their status.

## Fairness check

With `--easy-nuts`, the new code must reproduce today's worlds to the last digit (2 seeds × 20 days). The success roll draws from
the separate random stream.

## The test (after the review)

- 24 identical worlds × 150+ days (two generations), copying on against `--no-copying`, the means at hand counted
  (`spread.js --born-only --means`, entry 58's design).
- **Main outcome, named first:** among hominins born in the run, the share who reach real skill (say `nsk` ≥ 0.5) by age 10, copying
  on against off, paired by world.
- Secondary: watched-vs-not first-success rate ratio (spread.js); whether skill persists after the first skilled hominin dies.
- Prediction written before running. Both ends of `p0` and `g`.

## Questions for the reviewer

1. Is a body-level skill grown only by own practice honest ("nothing scripted"), or is any built-in skill variable a hidden rule?
2. Is calibrating `g` to today's strike rate tuning? Is there a better anchor (e.g. a number of practice bouts)?
3. Can copying in Genesis (copying an elder's chosen action, in the same square, by its visible result) even, in principle, make
   a youngster practise more — and so learn faster — or is the test bound to find nothing?
4. What would make a positive result convincing to a primatologist, and what would be a false positive?
5. Anything missing or wrong in the evidence?

## Revised after the checkpoint-1 review (13 Nov 2026; `docs/reviews/2026-11-13-fable-review-3-nut-design.md`)

- **`g` fixed in practice units**: 500 strikes on nuts to get 80% of the way to expert (range 150–1,500), from about 3.5 years of
  practice, never calibrated from simulated behaviour. Years to skill will be reported as a result, not a target. (Finding 1.)
- **Main outcome changed** to strikes on nuts per 1,000 steps with the means at hand, ages 3.5–10, born in the run; an attempts
  counter `nutTry` added. Skilled = 0.5, fixed. (Finding 2.)
- **A nut-specific arm**: `--no-nut-copying` keeps all copying but copies nothing from a strike on a nut (neither the single act
  nor the sequence that led to it). The claim rests on "on" against this arm. (Finding 3.)
- **Ages**: no success before 3.5 years; strikes before then count as practice (the separate actions develop by 2.5). Infants
  getting kernels from others (real: Inoue-Nakamura & Matsuzawa 1997) is **not** built in this step — one change at a time; it is
  the next step if this one finds nothing. (Finding 4.)
- **Burn-in**: the main outcome counts only hominins born after the first one in the world reached skill 0.5. (Finding 5.)
- **Units and registration**: 0.83 registered as sourced per nut, applied per strike; every number in `docs/ASSUMPTIONS.md`;
  skill 0 at birth, never inherited; the first-nut log line no longer claims "nobody showed them how". (Findings 6–7.)
- **Evidence corrected**: 3,882 bouts by 21 chimpanzees (not 3,672), 83.2% / 8.2% / 8.7% (checked in the preprint); Koops et al.
  2022 added.
