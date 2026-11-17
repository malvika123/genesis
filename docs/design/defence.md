# Defence and lasting as a population: hunters held to their prey, rally and chase, sleeping high, several bands — reviewed by Fable 17 Nov (build with changes: `docs/reviews/2026-11-17-fable-defence.md`), not built

**Why.** The owner's page world (real Earth): 25 hominins grew to 82 by year 88, then hunters — 18 of them, up from 6 — killed every one by year 157. The owner: "they barely climb trees, share space with predators, never chase
them off… fetch info online, then put it behind a switch and test… I don't want them to become apes, I want them to be our hominins." Evidence: `docs/reviews/2026-11-17-defence-and-persistence-sources.md`; also
`docs/reviews/2026-11-17-startle-vigilance-alarm-sources.md` (alarm calls, vigilance). Entry 102: real-Earth predation on hominins 2.7% a year (median world 2.9%, range 0–17.4%) against the real primate median about 3% (0 to over 15%).

**Hominins, not apes.** Living apes are the default only where nothing hominin-specific is known. Early hominins (about 2.5 Ma) walked upright but kept climbing adaptations, lived in more open, mixed country with more large
carnivores, ate more meat and marrow, and made stone tools. Where that changes a defence, say so; every choice is labelled "hominin evidence" or "inferred from living primates (which species)".

## Today, in the code
- **Hunter numbers:** fixed caps per kind (`HKINDS` in `src/config.js`: hyena 10, leopard 8, sabre-tooth 6), not tied to prey; breeding fills them (`src/sim.js` mating, `S.cap`); newcomers arrive when a kind is rare (entry 39).
- **Trees:** a sleepy hominin under a big tree is pulled to climb it (`src/sim.js` ~413: `RF[A_CLIMB] += 2 * k`) and toward cover (channel 12); afraid with a hunter in sight, a pull to climb (~455). How often hominins actually sleep up a tree
  is **not measured**.
- **Defence:** none in a group; flight, climbing, children kept close, learned fear (seeing others hurt now only in the same square with `--honest-hurt`).
- **Bands:** one band of 25 founders; when it is gone the world's hominin story ends.

## The proposal (each behind its own switch, off until measured; a prediction first; identical worlds with it off)
1. **Measure first (no change):** share of hominin nights asleep up a tree; time within a square of each hunter kind; hunters' diet share of hominins; hunter numbers and prey biomass over 160 years (entry 103, queued).
2. **Hunters held to their prey (`--hunters-by-prey`).** The cap of each hunter kind follows the prey biomass it can reach, about 90 kg of a carnivore species per 10,000 kg of prey (Carbone & Gittleman 2002), with hominins counted at their
   real share of the diet (leopards about 10% primates, lions under 1%: Isbell 1994) — not a fixed number. Needs one decision before building: what area the world's prey stands for (the prey map's herds stand for many animals).
   **Refuted if** predation on hominins stays above about 15% a year for years, or hunters still multiply on a growing band.
3. **Rally and chase (`--rally`).** When a hunter attacks a hominin, awake adults in the same square (mothers and males first: Boesch 1991) are pulled to come and threaten it; with helpers present the attack can be driven off.
   Taï: 29 leopard–chimpanzee interactions in 5 years — 9 chases, 11 rescues, 9 attacks (6 wounded, 4 killed); about 0.055 a year chance of being killed; group defence did not stop leopards (5 of 9 victims in large parties).
   A pull (the brain can learn otherwise), and the chance a rally drives the hunter off sized so that, with helpers, about 45% of attacks still wound or kill. **Refuted if** leopard kills of hominins fall to near zero, or
   yearly mortality from predators falls far below about 0.05 where predators are dense. Inferred from chimpanzees (Taï) and one bonobo encounter; baboon male defence weak.
4. **Sleep high (`--sleep-high`, only if item 1 shows they rarely do).** The existing pull to climb at dusk is the inborn urge (great apes nest in trees almost every night; chimpanzees nest higher where predators are: Pruetz et al. 2008,
   Stewart & Pruetz 2013); add only leaving a sleeping place after a kill there (baboons: Anderson 1998), and test the existing pull's strength at both ends. **Refuted if** kills at sleeping places stop being the most common kind.
   Hominin evidence: climbing adaptations kept (Lucy's possible fall from a tree, disputed).
5. **Several bands (`--bands N`) and merging.** The most important piece: no primate group is documented wiped out by predators; shrunken groups merge (vervets at about 3–6 members or under 2 adults); populations last through many
   groups and dispersal. N founding bands far enough apart, young females dispersing between them (chimpanzee-like; Fable's F10), small bands merging. **Refuted if** with 8 or more bands and predation held to 0–15% a year the whole
   population still dies out within 1,000 years. A larger build: its own note after this review.
6. **Not modelled:** weapons for defence (no evidence at 2.5 Ma; sticks and stones "wholly inadequate" against a surprise attack: Treves & Palmqvist 2007); predators giving up on large groups (Boesch: they don't); prey switching.

## Test
Real Earth, 24 worlds × 100 days and 8 worlds × 160 years: predation on hominins per year (against about 3%, 0–15%), hunter numbers against prey biomass, share of nights up a tree, how bands end. Each switch alone, then together.

## Questions for the reviewer
1. Is "hunters held to their prey" honest given the prey map's herds stand for many animals and the world's area is not one real place? What would you do instead?
2. Is the rally sized honestly from Boesch's 29 interactions (forest chimpanzees with leopards), applied to hominins in open country with hyenas and sabre-tooths too?
3. Should several bands come before rally and sleep-high, given it is the biggest real difference?
4. Anything here that would make them apes rather than our hominins, or the other way round, without evidence?

## Revised after Fable's review (17 Nov)
Order: **measure first** (nights up a tree; where the hunters came from — births or `rescue` newcomers; hominins' share of each kind's kills; how long an attack lasts; how bands end over 160 years) → **several bands** (with
female dispersal and merging) → **hunter caps from field density × the area hunters range over**, with 1:111 summed over the guild only as a check, never diet share as an input → **rally**, only after a wounding phase exists, for single
climbing cats only, judged by who dies (young before adults), not by the number it was sized from → **sleep high** last, with baboon cliffs as a model as good as chimpanzee nests; rocky outcrops as cover if the map has them.
**The owner decides:** the real guild at 2.5 Ma had 8–10 large carnivores (lions, *Homotherium*, *Dinofelis*, *Chasmaporthetes*, crocodiles left out); the sim's hunter pressure is lower than the real guild's.
