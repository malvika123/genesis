# Plan: Genesis as early hominins, East Africa, about 2.5 million years ago

Written 10 November 2026 with the owner; **rewritten 12 November 2026** after the first day of tests (research log entries 16–36).
This is the whole plan, in order. What is found but not yet done is in `docs/BACKLOG.md`; what has been measured is in
`docs/FINDINGS.md`; every number and its source or assumption is in `docs/ASSUMPTIONS.md`.

## Why

Genesis's founders start with nothing — no fire, no tools, no language — and must discover everything. That does not fit
modern Homo sapiens 70,000 years ago, who were born into a culture tens of thousands of years deep. It does fit **early
hominins**: upright-walking apes with small brains, at the time our own genus, Homo, appeared. So Genesis's main scenario is:

> **How did a population of small-brained, upright-walking apes survive in a changing African environment, and what
> conditions favoured the changes that led toward humans — tools, fire, bigger brains, cooperation?**

The modern-human world (Earth 70,000 years ago, no culture) stays available as a second scenario (`--sapiens`), honestly
described as a thought experiment. A simulation cannot prove whether we evolved on our own or with help from outside; it can
show which natural conditions are sufficient, within the rules it is given, and which are hard.

**The owner's requirement (12 Nov 2026): Genesis must not be a safe world.** The pressures that shaped hominins — hunger in the
dry season, crocodiles at the water, disease, rival groups — are what we are trying to understand; leaving them out would hide
the answers. They are added one at a time, each checked against the evidence.

## Who and when

East Africa, about 2.5 million years ago: late australopiths and the earliest Homo, with Paranthropus alongside. The first stone
tools appear (Oldowan about 2.6–2.9 million years ago; older, rarer tools at Lomekwi, 3.3 million), the climate swings between
wetter and drier, and grassland spreads. Behaviour is inferred from fossils, tools, isotopes and comparison with chimpanzees and
bonobos; the README and the Research page say which parts are evidence and which are reasoned guesses. Because hominins already
made stone tools, "they must discover tools" is an **experiment** ("could they?"), not a picture of history — the Research page
says so. Chimpanzees are a forest species and are *not* part of this world (the only fossil chimpanzees are 500,000-year-old
teeth from Kenya); they are our yardstick for numbers.

## The rules (all of them, in one place)

1. **Every number from the evidence, or recorded as an assumption** with the range the evidence allows (`docs/ASSUMPTIONS.md`).
2. **Never tune a number toward an outcome.** If realistic numbers fail, something real is missing: find it. Uncertain numbers are
   tested at both ends of their range; results that flip are reported as such.
3. **Nothing scripted.** Creatures have their own neural networks and learn by reinforcement. **Only true reflexes are automatic**
   (blinking, a startle, an infant's grip); running, climbing, hiding and feeding are choices the brain makes, with inborn pulls
   that differ between individuals. Knowledge, skills, words and culture must emerge. Learned knowledge is never inherited.
4. **Honest minds.** What the page shows a creature thinking comes from its real network; never invented text.
5. **Principles of the mind** (the owner; checked against evidence, `CLAUDE.md`): fear is the teacher; help (lasting bonds) is
   survival; hunger and thirst come first.
6. **Verify every claim online before building it — the owner's ideas included** — and say where the sources disagree with the plan.
7. **One change at a time**, each with a switch to the old behaviour and a paired test on the same seeded worlds; the prediction is
   written down before a comparison that could be fooled by chance; failures are logged as carefully as successes.
8. Work on `percept`; merge to `develop` (live) only after a balance check and `npm test`. Run experiments gently on the owner's
   laptop (`--workers 4`, `nice -n 19`).

## Where we are (12 November 2026)

**Done and live** (`develop`, entries 16–19): hominin bodies and life history, sleeping in trees, leaves as a fallback food, and
the fertility fix — hominins had kept modern people's fertility rule, which ended it at about 26; fixed to the chimpanzee pattern
(fertile to about 50), births per world 12 → 26.

**Built and tested, not yet live** (entries 20–36; code on `percept` and the working branches `refeed-wip` → `apecare-wip` →
`band-wip`, to be merged): the mating pull; quicker conception after a lost baby; grass not seen as food; food needs by body size
(Kleiber); climbing as a choice; hunger and thirst first (hunger deaths −37%); inherited temperament and parental care; moving as
one choice (walking 70–80% → 25%, predator deaths 60 → 3); the mother keeps her nursing child near (31 alive vs 25, drownings
and fire deaths halved); mood; smooth hunger and the refeeding signal; ape-like care (only mothers feed their young); up to 200
founders and no cap on people. **Off by default:** the African animals (their hunters starve: Genesis has about nine times too
many hunters for its prey), the female cycle (it exposed the 4-year lockout bug), the founders' practice.

**Measured:** 6 of 8 bands lasted 67 years (the best reached 112 over 5 generations); 2 died out. Births now roughly match deaths.
The inborn tendency to learn from others is bred out across generations in two separate worlds, with and without practised
founders; learned skill does not rise; a bigger founding band (25, 40, 80) does not change survival per hominin and has not made
discoveries more common; nobody has kept a fire going or built a shelter.

## Priorities after Phase A (the owner, 12 November 2026; reordered after Fable's opinion the same day)

Breadth is now the risk, not sloppiness: many small realistic pieces while the two big structural questions — the brains and
the scale — wait. Fable (asked for an independent opinion) argued that brains and scale are one problem, that the reality checks
are measurement and must come before a scale change, and that the brain's short memory for cause and effect was missing. The
owner chose that order:

1. **Done 12 Nov — the heaps were chance (entry 41).** **The shelter, cheaply first.** What was the heap worth? A heap of 7 gives cover 0.375, below the 0.4 needed to keep dry and
   to feel safe to sleep (`src/forest.js`, `src/climate.js`, `src/sim.js`); under trees it adds nothing; nights are warm. If it gave
   nothing, the heaps were chance. Only if it helped: the trace (B14) and a frozen-brain test (same inputs, only the cover reading
   changed, against band-mates who never heaped), prediction written first.
2. **Done 12 Nov — 3 of 7 checks pass (entry 42).** **A small reality-check suite** on worlds already saved (child survival, birth spacing, life expectancy, population change,
   causes of death), each with its clock — measurement, so that a scale change can be judged.
3. **Speed** (the owner, 12 Nov: "far ahead and close to our reality, no matter what"). Realistic scale is impossible at about
   11 s of computing per simulated day, and Genesis chose rich creatures over many creatures. In order: (a) measure where the
   time goes (profile one world); (b) fix the hotspots with **identical results** (the identical-worlds check proves nothing
   changed); (c) move the brains to the graphics card with WebGPU, which keeps the page in the browser with no installation
   (verify before relying on it); (d) a rented server by the hour for the big runs. If real speed ever needs a tool outside the
   "plain JavaScript, no dependencies" rule, the owner decides, with the trade-off shown first.
4. **The scale.** What one simulated animal stands for and how big the world is (a whole planet holds a few dozen animals; a
   year is 3 days; two clocks). The real fix for hunters dying out. **When it is done, switch off the temporary newcomers (`--no-rescue`, entry 39) and test that hunters still last on their own.**
5. **The brains.** First their short memory for cause and effect: the record of what it just did halves in about 3 steps
   (`GAM` 0.97 × `LAM` 0.8, `src/config.js`), while a day is 96 steps and a life about 130 nights; the value estimate reaches
   about 33 steps. Then learning by watching what worked (Phase B).

**Freeze (the owner, 12 Nov):** nothing new is added until Phase A, the hunter release and these five priorities are done; new ideas go
to the backlog only.

Paused: the communication detector (B12) — its own check fails, and it is breadth.

**What would make Genesis valuable to others** (Fable's opinion, 12 Nov, adopted by the owner). Fable's summary: *the method is
better than the model; the method is already worth sharing; the model's claims should stay small.* Genesis cannot say what
happened 2.5 million years ago; it can say honestly what appears, and what does not, in a world built from stated rules. So:

- **One small, solid result a stranger can repeat** — the goal of the brains step: for example "does learning by watching make
  discoveries spread? yes or no, on 24+ worlds, prediction written first". A clear "no" counts.
- **The reality-check table published with its passes and its fails** (on the Research page) — few simulations show where they fail.
- **A short method guide** (`docs/METHOD.md`): switches to the old behaviour, paired seeded worlds and the identical-worlds check,
  the assumptions register, predictions written first, failures logged — usable by others even if the hominins never learn much.

**Ways of working that go with them:** add fewer things and test claims that matter on 24+ worlds (a floor: for die-out rates even 24 worlds leave a wide range), with one primary outcome
named in advance; go live in smaller, more frequent steps (the live site lagged 18 entries behind and the owner met the
hunter problem there first); have a fresh session, with no history in the project, repeat the science review.

## The phases

### Phase A — finish this round and put it live (12 November; in progress)

Added 12 Nov: the mating fix (B1, B7), the gene split (B10). **Go live as soon as the mating tests are logged** (the owner, after
Fable's advice); the hunter fixes (B15: newcomers from the wider population, then more prey per hunter, each tested) are the next
small release.

1. The 100-year run (8 worlds × 300 days, all fixes in; started 12 Nov 13:25) → log as an entry.
2. First test of the communication detector (`tools/analysis/talk-detector.js`), with its false-alarm and planted-sound checks → log.
3. Small fixes, one at a time: the nursing lockout after any mating (B1), the 36-day male wait (B2, verify online first), the
   wrong comment (B4); then test the female cycle again.
4. Merge the working branches into `percept`; `npm test`; open the page in a browser; merge to `develop` and push. Update the
   README and About tab for everything that changed.

### Phase B — bands that last, and knowledge that passes on (a few sessions)

0. **The shelter test first** (B14; see the priorities above).

1. **Learning by watching what worked** (A4): a youngster sees an elder eat or do something and what came of it, not only the
   movement. Then copying what worked, and trust (A5). This is the step that can turn rare discoveries into common ones.
2. Know when to move on when food runs out (A2); move away from an approaching wildfire (A3); keep young children out of deep
   water (A8, research first); mobbing a hunter together (A9).
3. **Repeat the community-size test** (25, 40, 80 founders on identical worlds, `--extra-people`) with a new written prediction:
   with learning by watching, discoveries should rise with band size and come earlier.
4. A **culture measurement**: are discoveries repeated, by how many, and do they spread from one hominin to others?
5. The **reality-check suite** (HANDOVER.md): pass/fail against real numbers — about half of children reaching adulthood,
   birth spacing, life expectancy, a stable population over 300+ days.
6. **Targets:** most bands last 100+ years; discoveries get repeated and spread.

### Phase C — the real dangers, foods and world of that time (weeks; each item its own patch)

Order (dependencies first; full list R1–R24 in `docs/BACKLOG.md`):

1. **Bone marrow** broken with stones (R11; researched: Oldowan hominins did it; strongest evidence, buildable as physics).
2. **Disease** (R9; at Gombe illness caused 58% of chimpanzee deaths with a known cause; Genesis has none) — research first.
3. **Several groups, with females moving between them at adolescence** (R14; researched) — the realistic form of "a bigger band".
4. **Male rank and rivalry**, then testosterone, infanticide and raids between groups (R13, R10).
5. **Crocodiles** at water (R4; the attack rate is an assumption, tested at both ends); eagles taking children (R5); snakes (R7).
6. **Fix the hunters-to-prey balance** (A1; about 90 kg of each carnivore per 10,000 kg of prey, Carbone & Gittleman 2002), then
   switch on the animals of the time (patch 6: hyenas, leopards, sabre-tooths, antelopes, buffalo), then lions, elephants,
   hippos, baboons, scavenging contests (R6, R8, R18, R19).
7. **The landscape and climate of the time** (R2, R3): the Rift, lakes that grow and shrink, spreading grassland, climate swings;
   and a **hungry season** (R1; the studies disagree on its timing — find monthly data first).
8. **Insects, termites, eggs, honey, sedges and grass seeds** (R12, A15); a second hominin kind, **Paranthropus** (R17);
   specific alarm calls (R16); carrying things far (R20).

### Phase D — evolution at scale (weeks to months)

1. **A much faster engine** (about 11 seconds of computing per simulated day today; 125,000 generations separate 2.5 million
   years ago from now), and long runs of key periods compared by direction and pace of change rather than every generation.
   A rented server by the hour if the laptop is not enough.
2. **Traits that can evolve with real costs and benefits:** brain size (already), body size, **hair and sweat** (R22: cooling
   in hot open country, fewer parasites), climbing.
3. **Predictions written down before long runs** (for example: more predators → a larger fear centre), then checked against
   the table below.

### Phase E — far ahead

Regional differences between separated groups — skin pigment, hair, sweat glands (R23: dark skin first, light skin with weak
sun, Europeans and East Asians separately; recent, within the last 30,000 years) — and real language emerging (the detector
reports honestly when it has not). Conditions only, never the outcome.

## The long-term aim: run down the generations, and compare with what really happened

| Roughly when | What changed in reality |
|---|---|
| 3.3–2.6 million years ago | first stone tools (Lomekwi, then the Oldowan) |
| about 2 million years ago | early Homo: brain about 600 cm³; meat cut with stone tools |
| about 1.8 million years ago | Homo erectus: brain about 900 cm³, larger bodies, long legs, probably less hair and more sweating (permanent dark skin by about 1.2 million years ago); hand-axes |
| about 1 million–400,000 years ago | fire, first occasional, then habitual |
| about 300,000 years ago | Homo sapiens: brain about 1,350 cm³ |

Real populations numbered tens of thousands to a few hundred thousand, in many groups of a few dozen that met and mixed. At present
one band of 25–80 changes mostly by chance and a generation takes about 60 simulated days.

## Supporting threads

- **Science review by a stronger model** (Claude Fable 5.2, the owner has access): an independent check of the assumptions register,
  the research log and the rules against sources — brief in `docs/REVIEW-BRIEF.md`; reports go in `docs/reviews/`. Optional API
  script later (a standalone tool, never in the engine, which has no dependencies).
- **Keep the backlog current** (`docs/BACKLOG.md`): every bug, idea and verified fact not yet built goes there.
- **Tell the page's visitors honestly** what is evidence and what is a simplification (a 3-day year, a coarse grid, one band).

## Measurement

`tools/experiment.js`, the Lab, and `tools/analysis/`: `compare-runs.js` (paired comparison of two runs), `generations.js` (inborn
traits and learned scores by generation), `hunger-trace.js`, `drowning-trace.js`, `hunters-trace.js`, `fire-trace.js`,
`life-trace.js`, `children-near-mothers.js`, `community-compare.js`, `first-times.js`, `talk-detector.js`. To track over long runs:
brain and body size by generation, first stone flaking, first meat cut with a stone, first fire kept, group size, and — once it
exists — whether discoveries are repeated and spread.
