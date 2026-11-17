# Honest watching: a youngster learns from what it can see of an elder — design note for review, not built (17 Nov 2026)

**Why.** The owner (17 Nov): senses are how a creature connects to the world. The one question the project is narrowing to — when does a skill become a tradition? — rests on one sense above all: seeing what
another does and what comes of it. Today that sense is not a sense (backlog, "How a hominin sees another's actions"; `src/sim.js` ~616–700, ~531–535; `src/brain.js` `imitate`, `imitateAt`, `copySequence`):

1. The copier receives the elder's chosen act as an exact number (`tch.daAct`, one of 19) and the elder's own reward (`tch.lastR`), and both are written into its brain as a training target.
2. Watching a whole path trains the youngster on the **elder's** input vectors (its hunger, thirst and short-term memory included).
3. Whom it watches: anyone within its sight range in squares (several 3 km squares), with no field of view, hills, trees or night; the "follow the crowd" count reads every elder's exact act.
4. Voice copying copies the elder's mouth commands (`tch.vc`), not the sound heard, and is not limited to the same square.
5. "Copy the successful" reads the elder's hidden health and energy (`hp + e`).

## What real young apes do (sources: `docs/reviews/2026-11-17-ape-social-learning-sources.md`)
- They **peer**: close (1–5 m; a chimpanzee observer within 1 m, facing, a clear view: Hobaiter et al. 2014), for at least about 5 s, mostly at the **mother** (orangutans 84%), never at younger ones, mostly during
  **feeding** (82% orangutans; about 60% food in wild chimpanzees), most at ages 2–5, more on rare or hard foods.
- They copy **results** — where and what — far more than **actions** (emulation; Horner & Whiten 2005; Tennie, Call & Tomasello 2009); they copy the whole sequence only when the result cannot be seen. Watching raises
  the chance of handling the same thing soon after (Permana et al. 2025); each watched bout of moss-sponging raised a naive chimpanzee's learning rate about 15-fold (Hobaiter 2014). Skills still take their own practice and arrive at 3–6 years.
- They prefer older, skilled, higher-ranking models and copy more when unsure (Horner et al. 2010; Kendal et al. 2015).
- They do **not** learn to produce new calls; call structure is largely inborn (Fischer & Hammerschmidt 2020).

## The proposal (the smallest honest version; every piece with the old rule behind one switch, `--mind-reading-copying`)
1. **Who can be watched.** An elder (older than the watcher; the mother first) in the **same square** (the closest this 3 km grid has: a registered deviation — real peering is 1–5 m), awake, by day or by firelight, with the
   watcher awake and not travelling (staying, eating or handling), and the elder inside the watcher's field of view the way `sense()` already decides it. Nobody further away is "watched"; the crowd count uses only those
   who pass the same test.
2. **What the watcher sees.** Only what is visible: what the elder holds (`hand`), what its blow lands on (`stk`, recorded for the page since 17 Nov), and what came of it in plain sight — it **ate** (a meal, from the
   eating code), it **cracked or dug or cut** something (`stkOk`), it was **hurt** (`painA` jump, `ouch`). Not its reward number, not its chosen act.
3. **What is learned — results first (emulation).** The watched result nudges the watcher toward the act that would get the same result **from where the watcher is**: if it holds what the elder held and the same
   thing is here (a nut, a bone, roots), toward striking; if it holds nothing and the elder's tool is lying here, toward taking it; if the elder ate here, toward eating here. A hurt seen nudges away (this part already exists
   as `watchOthers` fear). Trained on the **watcher's own** inputs. Nothing is copied that the watcher could not do in its own situation (the "zone of latent solutions").
4. **Whole paths.** Off in the honest version (the evidence says apes copy sequences only when the result is hidden; that case is rare here). If kept, trained on the watcher's own view at each step, never the elder's.
5. **Voices.** No copying of mouth commands. Calls stay as they are; learning what a heard call means stays (that is ordinary learning from what follows a sound).
6. **Whom to prefer.** Mother first; then older; then those **seen** succeeding (a running count of results this watcher has seen from each elder), not hidden health or energy.

## Numbers (registered before building)
| Number | Value | Status |
|---|---|---|
| Watching distance | same square (about 0.5 km apart in this model) | **deviation**: real 1–5 m; the grid cannot do better until the fine valley (F9) |
| Who | older than the watcher; mother first | sourced (direction) |
| Watcher's state | awake, not travelling | assumption (peering is attentive, sustained watching) |
| How strongly a seen result nudges | the present `rate` (unchanged) | assumption, as now; test at ½ and 2× |
| Field of view, day/firelight | as `sense()` | as the senses |

## The test (prediction written first)
24 worlds × 100 days, honest watching against the old copying, same seeds; plus the no-copying arm (`--no-copying`) as the floor. Measures: first-day and repeats per life-year of nut, flake, dig, butcher
(`rep_X`); age at first nut-crack; how many hominins ever do each; learning-from-others genes (`learns_from_others`); the reality rows; deaths. Expect: learning from others falls toward the no-copying floor; skills
arrive later and in fewer hominins; the reality rows within noise. **Not held** if honest watching is indistinguishable from no copying *and* from old copying (the measure would then be blind). Identical worlds: with
`--mind-reading-copying`, seeds 1–2 × 20 days must match the commit before.

## Questions for the reviewer
1. Is "same square" an honest stand-in for 1–5 m peering, or does it overstate watching so much that this step should wait for the fine valley?
2. Is the results-first rule (item 3) a mechanism of our own, or a fair reading of emulation? Is there a simpler one?
3. Should whole-path copying go entirely, or stay on the watcher's own view?
4. What would you measure to know the change worked (and was not just "less learning")?
