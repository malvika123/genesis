# Independent review, checkpoint 1: the hard nut-cracking design (13 Nov 2026)

Reviewer: Claude Fable (subagent, read-only). Reviewed: `docs/design/nut-cracking-hard.md` at commit d9aeeda.
Verdict: **build with changes**. Its estimate that the test as first designed could detect learning by watching: about 25–35%.
Its prediction: fail (ratio 1.0–1.3).

## Findings (summarised; how each was handled is recorded in the revised design)

1. HIGH — `g` calibrated to today's strike rate, which the change itself destroys: fix `g` in practice units, never from simulated behaviour.
2. HIGH — the main outcome was a strike count with an open threshold and survivor bias: use nut-strike attempts per means-at-hand step, ages 3.5–10, born in run; fix all thresholds; add an attempts counter.
3. HIGH — copying on against off is not specific to nuts: add an arm with copying on except for nut strikes.
4. MEDIUM — ages 1.5–3.5: copied toddlers always fail and learn to stop; check whether watching young get any of the elder's kernels (real infants do).
5. MEDIUM — elders start unskilled, so watched failures teach avoidance: burn-in, or count only births after the first elder is skilled.
6. MEDIUM — 83% is per nut; Genesis applies it per session: register as an assumption.
7. LOW — `nsk` 0 at birth, never inherited; the log line "Nobody showed them how" may become untrue.

Evidence: the published paper is Nature Human Behaviour 2024, doi 10.1038/s41562-024-02071-8, reporting 3,882 bouts from 21
chimpanzees (the design cited the preprint's 3,672); 83/8/9% not verified by the reviewer; "3–7 years to master" not found in that
form (onset 3.5–5, learnt by about 7: Inoue-Nakamura & Matsuzawa 1997; Biro et al. 2003); Koops et al. 2022 (Nature Human Behaviour):
naive wild chimpanzees given nuts and stones did not crack — a better target for the copying-off arm.

Pass criterion proposed: "on" beats "on-except-nuts" in ≥ 18 of 24 paired worlds with a median ratio ≥ 1.5, same sign at both ends of
`p0` and `g`. Anything else is a published no.
