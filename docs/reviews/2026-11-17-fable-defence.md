# Fable on the defence design (17 Nov 2026) — review of docs/design/defence.md (read only; nothing run)

**Verdict: build with changes.** Measure first; then several bands; change how the hunter cap is worked out; narrow the rally switch (it does not fit the attack code as it stands); sleep-high last.

**1. Hunters held to their prey — not as written.** The prey map is on by default (entry 83) and already counts real kilograms (5,000 kg/km², squares about 9 km², `src/preymap.js`). Carbone & Gittleman's ratio compares one carnivore species
with its own prey: applied to each of three kinds over the same antelope it counts the prey three times; at 5,000 kg/km², 1:111 gives about 45 kg/km² of each kind — for leopards roughly one per km², far above real densities (not
checked against a source, but clearly too many). Putting hominins in "at their real diet share" uses an outcome as an input — a check, not a setting. In the owner's world 18 hunters is under the fixed caps (24): first find
where the 18 came from (breeding, or newcomers added by `rescue`). Instead: each kind's cap = its field density × the area hunters actually move through (the valley), registered with a range, tested at both ends; 1:111 summed over the
whole guild against prey kilograms as a check of the totals.

**2. Rally sized from Boesch — only partly honest.** The code leaves no time for a rescue: a hit kills on the spot (`t.dead = true` in `A_ATK`), and entry 91 found almost no kills by wounds; at Taï rescues happen during a struggle long enough for
others to arrive. Without a wounding phase a rally has nothing to act on. The test is circular (fitted to "about 45% still wound or kill", judged by Boesch's death rate): judge it by something it was not fitted to, e.g. who dies (Taï: young
chimpanzees die before help arrives). Evidence covers leopards only (forest leopards); no primate data for mobbing hyena clans or sabre-tooths: keep the switch to single climbing cats; label the rest no evidence.

**3. Several bands first** (after measuring): yes. One band dying out is ordinary bad luck within the real 0–17.4% range; predation by carnivores comes in episodes (Isbell 1994); merging small groups is well supported.

**4. Apes or our hominins?** Mostly the sleep-high item assumes tree nests every night. In open country at 2.5 Ma tall trees grew mostly along rivers; leopards and *Megantereon* climb in the sim (`climb: 1`; for *Megantereon* an assumption), and a
hominin up a tree is still hit at 0.35×: trees mainly protect against hyenas. Baboons on cliffs are as good a model as chimpanzees for open-country sleeping. Let rocky outcrops count as cover, if the map has them.

**Source checks (abstracts and snippets):** Carbone & Gittleman 2002 confirmed. Boesch 1991 partly (0.30 attacks per chimpanzee a year, leopards the leading cause of death, parties adjusting; **not verified** the 29/9/11/9 counts and "5 of 9 in
large parties"). Isbell 1994 partly (predation in episodes; ground-living primates not at greater risk; **not verified** median about 3%, 0–15%, leopard and lion diet shares). Pruetz et al. 2008 confirmed (Fongoli chimpanzees nest lower, farther
apart, sometimes on the ground, but still nest in trees routinely with few predators — the abstract calls it puzzling: the dusk pull may be habit more than anti-predator). Isbell, Cheney & Seyfarth 1991 confirmed (six fusions 1984–88; the
3–6 minimum from Young & Isbell 1994).

**Hominin-specific evidence.** The predator guild was richer than today: Werdelin & Lewis 2013 (*PLoS ONE*, confirmed) find the East African large-carnivore guild at its richest about 3.6–3.0 Ma, losing nearly 99% of its functional richness from
before 2 Ma; Treves & Palmqvist: 8–10 carnivore species at some sites. **The sim's three kinds leave out lions, *Homotherium*, *Dinofelis*, the hunting hyena *Chasmaporthetes*, and crocodiles** (from memory, not checked: crocodile tooth marks
on OH 8 and OH 35, Njau & Blumenschine 2012). **Flag: leaving these out is the owner's call;** it means hunter pressure in the sim is lower than the real guild's, not higher. Swartkrans carbon isotopes (secondary): leopards and *Megantereon*,
not *Dinofelis*, ate hominins — matching the current kinds. Australopiths kept climbing features; the throwing shoulder appears about 2 Ma in *Homo erectus*: no thrown stones at 2.5 Ma.

**Measure first:** nights up a tree, by band and season; where the owner's 18 hunters came from (births or `rescue` newcomers); hominins' share of each hunter kind's kills; how long an attack on a hominin lasts; how each band ended on the real
Earth over 8 worlds × 160 years.

**Each switch:** caps from field density (each kind within its field density range; a growing band does not raise hunter numbers; refuted if hunters follow hominin numbers); `--bands N` (with ≥ 8 bands and 0–15% predation the population lasts
1,000 years; refuted if it dies out anyway; needs female dispersal and merging below about 3–6 members); `--rally`, only once there is a wounding phase (fewer adults die than young; leopard kills not near zero; refuted if leopard kills drop to
about zero, or deaths among the young fall as much as among adults); `--sleep-high` (most kills at or near sleeping sites; refuted if those kills vanish).

**What not to build:** weapons or thrown stones; predators avoiding large groups; driving carnivores off carcasses (no evidence at 2.5 Ma); diet share as an input; sentinels; long watchfulness after a scare; prey switching.

Sources: Carbone & Gittleman summary (innovations-report.com/life-sciences/report-8728) · Boesch 1991 PDF (eva.mpg.de) · Isbell 1994 (laisbell.faculty.ucdavis.edu) · Pruetz 2008 · Isbell et al. 1991 (PubMed 31952380) · Werdelin & Lewis 2013 (PMC3590191) ·
Treves & Palmqvist 2007.
