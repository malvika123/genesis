# Plan: Genesis as early hominins, East Africa, about 2.5 million years ago

Written 10 November 2026 with the owner. Status: **planned; built in patches, each tested and logged.**

## Why

Genesis's founders start with nothing — no fire, no tools, no language — and must discover everything.
That does not fit modern Homo sapiens 70,000 years ago, who were born into a culture tens of thousands of
years deep (fire, complex tools, almost certainly language). It does fit **early hominins**: upright-walking
apes with small brains, at the time our own genus, Homo, appeared. So Genesis's main scenario becomes:

> **How did a population of small-brained, upright-walking apes survive in a changing African environment,
> and what conditions favoured the changes that led toward humans — tools, fire, bigger brains,
> cooperation?**

The present world (modern-human bodies and instincts, no culture, Earth 70,000 years ago) stays available
as a second scenario, honestly described as a thought experiment: can culture re-emerge from nothing?

A simulation cannot prove whether we evolved on our own or with help from outside; it can show which
natural conditions are sufficient, within the rules it is given, and which are hard (see the Research page).

## Who and when

East Africa, about 2.5 million years ago: late australopiths and the earliest Homo. Around this time the
first stone tools of the Oldowan kind appear (about 2.6 million years ago; older, rarer tools at Lomekwi,
3.3 million), the climate swings between wetter and drier, and grassland spreads. Knowledge of behaviour at
this time is inferred from fossils, tools, isotopes and comparison with chimpanzees and bonobos; the README
and the Research page will say which parts are evidence and which are reasoned guesses.

## The patches (in order; each tested on seeded worlds and logged in docs/FINDINGS.md)

1. **Name and appearance.** "Hominins" instead of "people" in the page, the log and the panels, in the
   hominin scenario; drawn as small upright apes (about 1.1–1.5 m, hairy, longer arms, a projecting face).
   Picture and words only. *Evidence:* australopith and early-Homo skeletons (e.g. A.L. 288-1 "Lucy",
   KNM-ER 1813).
2. **A scenario switch.** "Early hominins, 2.5 million years ago" (default) and "Homo sapiens, 70,000
   years ago (no culture)" on the New world form, the Lab and `tools/experiment.js` (`--scenario`).
3. **Bodies and life history.** Brain about a third of ours (roughly 450–600 cm³), smaller bodies (about
   30–45 kg), growth faster than ours and closer to a chimpanzee's (dental development: Bromage & Dean
   1985), a shorter life, longer gaps between births (chimpanzees: about 5 years). Brain size and growth
   inherited and able to evolve. *To verify before building:* each number against current reviews.
4. **Climbing and sleeping in trees.** Strong arms and curved fingers show australopiths still climbed;
   sleeping in trees or on rock ledges is inferred (as all great apes nest off the ground or in safe places).
   An inborn pull at dusk toward a climbable tree, cliff or rock shelter; predators that cannot climb cannot
   reach a sleeper in a tree, those that can (leopards) still can; falling is possible. *Evidence:* Anderson
   1998 on primate sleeping sites; australopith arm and hand bones.
5. **Diet.** More plants — fruit, leaves, tubers and other underground storage organs (fallback foods),
   sedges — meat mainly scavenged, and later butchered with stone tools (cut marks, about 2.6–2 million
   years ago). *Evidence:* isotope studies of australopith and early-Homo teeth; cut-marked bones.
6. **Predators and animals of the time.** Big cats including sabre-toothed ones (Megantereon,
   Homotherium, Dinofelis), leopards, hyenas, crowned eagles (the Taung child: Berger & Clarke 1995; a
   leopard's bite in a Swartkrans skull, SK 54); prey of the time — antelopes, pigs, and others — instead of
   deer, bison, wolves and bears.
7. **The world of 2.5 million years ago.** The continents much as now; Africa warmer and wetter in places,
   with grassland spreading and the climate swinging over long cycles; sea level varying. *To decide:* how
   to represent the swings in a short simulated time.
8. **Voice.** No speech: ape-like calls, with the inborn calls of the young; the vocal-control genes start
   low (they already do) and can evolve.

Each patch keeps the rules: nothing scripted; only what real animals are born with is built in; honest
minds; whispers are only nudges.

## Measurement

The same tools as now: `tools/experiment.js`, the Lab, `tools/analysis/*`. New things to track over long
runs: brain size and body size over generations, first stone flaking, first meat cut with a stone, first
fire kept, tree-sleeping, group size.
