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
