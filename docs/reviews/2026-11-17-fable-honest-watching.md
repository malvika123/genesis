# Fable on honest watching (17 Nov 2026) — review of docs/design/honest-watching.md (read only; nothing run)

**Verdict: build it, with changes.** The five problems are real. But the note's "already honest" seeing-hurt part is not honest, its results-first rule hand-codes how a skill is done, and three copying routes are missing.

**1. The five problems (checked in the code):** all real. (1) `sim.js` ~684–687 copies the elder's exact act (`tch.daAct`) weighed by its own reward (`tch.lastR`); the old branch (689) copies `tch.act` and the voice. (2) Only for whole
paths: `copySequence` → `imitateAt(o, path[i].x, …)` runs the elder's stored inputs through the watcher's brain; single-act `imitate` already uses the watcher's own inputs (`a.xi`). (3) The search covers up to `g.v` squares,
no field of view, no night; the crowd count (`seen[o.act]`) reads every elder's act in that range even with `copyClose`. (4) `imitateVoice(a, tch.vc, …)` copies mouth commands, no same-square limit. (5) `okay(o) = (hp+e)/200`.

**Missed by the note:**
- **Seeing another hurt (`watchOthers`, ~1829) is not honest:** up to 5 squares (about 15 km), no field of view or night; nudges the watcher away from the victim's exact act (`e.act`), the same mind-reading, and that act may not be what
  caused the hurt. Same who-can-be-watched test; nudge away from the place or thing, not the act.
- **`copySequence` (~531–535)** fires on the elder's hidden reward (`r > 0.3`); no check that the elder is older, nor of view or night.
- **The mother can block all copying:** her −30 bonus means a mother 2–5 squares away still wins; with `copyClose` nothing is copied, even from an elder in the same square.
- **Copying heard words (~719):** `imitateVoice(a, choicesFor(a.heardW), …)` is vocal production learning, what apes lack (Fischer & Hammerschmidt). The note keeps it.
- **Timing:** `daAct` and `lastR` come from the elder's last step while `o.act` is read mid-tick: what is copied depends on update order.
- **"About 0.5 km apart"** is a simplification in `talk.js:31`, not sourced; two random points in a 3 km square are on average about 1.6 km apart.

**2. The note's questions.** (a) Same square: fine as a registered deviation now; don't wait for the valley — the bigger gain is *what* is perceived. Word it "same 3 km square, distance unknown"; require the pair together two
steps running (a stand-in for peering of at least 5 s); it overstates watching distance by roughly 100–1000×, so a positive result is an upper bound. (b) The results-first rule as written is a hand-written table from result to act:
a mechanism of our own that gives the *how*, which watching does not give (Tennie et al.). Simpler and honest: copy only the elder's **visible body acts** (strike, take, eat, dig, drop; never stay, voice, or unseen acts), weighed by the
**visible result** (ate, cracked, hurt), trained on the watcher's own inputs — low-fidelity copying (Hobaiter). The zone of latent solutions falls out, since the nudge matters only where the watcher's own inputs make the act possible.
Enhancement, if wanted, as interest in the seen item or place through the existing curiosity term, not a new rule. (c) Remove whole-path copying from the honest arm (clear-box case: Horner & Whiten's chimpanzees emulated); keeping it
on the watcher's own view needs new machinery. (d) Measure **skill-specific transmission** (first-time rate among those who watched that skill against those who did not, each arm; the entry-55 design: honest watching should keep a
ratio above 1, no-copying only the effect of sharing a place); **mother–offspring match** (Estienne 2019); **group differences that persist over generations**; and a **dose-matched control** (old copying thinned to the honest arm's
number of copy events) to separate "fewer events" from "different content".

**3. Sources (abstracts only).** Hobaiter 2014 verified (15-fold is the most conservative model's estimate; leaf-sponge re-use did not spread; one behaviour, few learners: not a number to build on; the observer criteria are not in the
abstract: not verified). Horner & Whiten 2005 verified (12 sanctuary chimpanzees watching a human demonstrator). Tennie, Call & Tomasello 2009 verified (process vs product; zone of latent solutions; chimpanzee traditions largely from
individual learning and founder effects). Kendal 2015 verified ("expert", not "seen succeeding": the seen-results tally is an assumption). Fischer & Hammerschmidt 2020 verified in part (production vs usage learning). Not verified:
Permana 2025, Kukofka 2025, Slania 2026.

**4. Test design.** One switch per fix (who is watched; what is seen; whole paths; voice; seeing a hurt; the success bias), single-switch arms on at least 8 worlds. Rate at ½ and 2×; the two-steps-together rule on and off. Add the
transmission ratios to the prediction; "not held" if the honest arm's watched/unwatched ratio is no greater than the no-copying arm's. Identical worlds: the new code draws no random numbers with the old-rule switch on; check
100 days on one seed, not only 20. If skills vanish, do not raise the rate: look for what real thing is missing (more time near the mother, tolerated scrounging, longer childhood).

**5. The owner's calls:** copying heard words (apes can't; the hominin case is unknown); dropping whole-path copying; same-square watching now or wait for the valley; accepting that skills may arrive much later or not at all as the honest
answer; "seen succeeding" as the stand-in for "expert".

Sources: Hobaiter 2014 (journals.plos.org/plosbiology/article/info:doi/10.1371/journal.pbio.1001960) · Horner & Whiten 2005 (research-portal.st-andrews.ac.uk) · Tennie et al. 2009 (PMC2865079) · Kendal 2015 (dro.dur.ac.uk/13579) ·
Fischer & Hammerschmidt 2020 (PMC6895554).
