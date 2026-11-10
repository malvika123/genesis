# Genesis — state of the project and open questions

A briefing for anyone picking the work up: a new contributor, a reviewer, or a more capable model asked
to check the science. Written November 2026 after v0.7.0; updated 10 November 2026. Read `README.md` for what the world contains
and `docs/MODEL.md` for the formal model description (ODD protocol).

## Where things stand (10 November 2026, evening) — start here

- `develop` (live) has everything up to research log entry 17: the first four patches of the early-hominin
  plan (`docs/HOMININ-PLAN.md`) — hominins as the default world, the `--sapiens` switch, hominin bodies and
  life history (`docs/ASSUMPTIONS.md`), sleeping in trees (`--no-trees`) — and their tests (entries 16–17:
  the hominin world still works, 14.5 alive against 25.5 for modern humans, with old age now a main cause of
  death; tree-sleeping made no measurable difference).
- **Patch 5 (diet), first part, on `percept` (not merged):** early hominins can live on young leaves when fruit
  is short (0.64 of ripe fruit's food a minute, range 0.48–0.64; `--no-leaves`, `--leaf-value`). Entry 18: no
  clear effect in 12 worlds; fire deaths rose (17 → 44–50) in bursts of one wildfire catching a band, and the
  obvious explanation (more time in the woods) was traced and is wrong. Before merging: 12 more worlds (seeds
  13–24) to see whether the fire rise is real. Still missing from the diet: sedges and other C4 foods (early
  Homo about 35% C4), insects; the older food values are not yet audited.
- Known gap that entry 18 points at: hominins react only to fire beside them; real savanna chimpanzees watch a
  wildfire and move ahead of it (Pruetz & LaDuke 2010). Check the evidence before adding anything.
- Run experiments gently on the owner's laptop: `--workers 4` under `nice -n 19` (8 workers overheat it).
- Then patch 6 (predators and animals of the time). Work on one branch (`percept`), one behaviour change at
  a time; never tune toward an outcome.
- A 12-world × 60-day set takes about 13 minutes (hominins) to 25 minutes (modern humans) with 8 workers;
  `npm test` about 70 seconds.

## The rules the project is held to

1. **As close to real Earth and real early humans as possible.** Every feature is judged against
   evidence; where we simplify, the README and About tab say so.
2. **Nothing scripted.** Creatures have their own neural networks and learn by reinforcement. Only
   instincts that real animals and people are born with may be built in (hunger, taste, fear of being
   hurt, a baby's cry, attachment, babbling…). Knowledge, skills, words and culture must emerge.
3. **Honest minds.** What the page says a creature thinks must come from its actual network. The log and
   the translator never invent reasons.
4. **Whispers** are the only outside influence: small nudges, never commands.
5. **Grow in patches;** check survival across many seeded worlds after every change.

## How it is built

- Plain JavaScript, no dependencies. Engine in `src/` (headless, deterministic from a seed), page in
  `ui/`, tests in `tests/`, experiment runner `tools/experiment.js` (CSV per world, switches for
  ablations: `--no-vicar`, `--no-picky`, `--old-sound`, `--no-calls`, `--modern-voice`, `--brain N`,
  `--earth`, `--any-start`, `--no-care`, `--no-shelter`). The same experiments run in the browser on the Lab page (`lab.html`), which
  shares `tools/experiment-core.js` with the command line and gives identical rows.
- Land: the real Earth about 70,000 years ago (ETOPO1 relief, sea 80 m lower; the page's default) or a
  seeded made-up planet (the engine's and experiment runner's default). The first band starts where our
  species lived (warm tropical land near fresh water; in Africa on the real Earth).
- **Next direction (owner, 10 Nov 2026):** Genesis becomes early hominins in East Africa ~2.5 million years ago; see `docs/HOMININ-PLAN.md`.
- The research log `docs/FINDINGS.md` records every survival test, including null and negative results,
  with its raw data in `data/findings/`; the Research page (`research.html`) is built from it and from
  `CHANGELOG.md`. Analysis scripts: `tools/analysis/predators.js` (predator deaths per 1,000 person-days
  by age, encounters, who the victims were) and `tools/analysis/compare-predators.js` (paired comparison).
- Several agents may work on the repo (Claude, ChatGPT). Each works on its own branch, one behaviour change
  at a time across all of them, pulls before pushing, never force-pushes, and logs who ran each test.
- `npm run test:quick` (≈20 s) while working; `npm test` (≈10 min) before merging.
- Branches: work on `percept`, merge to `develop` (served live by GitHub Pages) only after a balance check.

## What we have measured (with how strong the evidence is)

| Finding | Evidence |
|---|---|
| Learning from others' pain (vicarious learning) did not hurt survival; with choosy copying, predator deaths roughly halved | 12 worlds × 30–40 days, same worlds with/without; moderate |
| Making vultures behave realistically (wait for predators, warm lands only) restored survival that unrealistic vultures had cut | 12 worlds × 40 days; moderate |
| Bigger brains alone survive worse in a short life: 64 units 8.2 alive, 256 → 6.1, 1,024 → 2.2 | 24 worlds per size × 40 days; strong |
| Bonded partners feeling less pull to others raised the share of full siblings from ~30% to ~50% (humans ~66%) | 12 worlds; weak–moderate |
| With a band of 25 of all ages, parental feeding and stronger one-shot learning, child survival to 12 reached ~56% in one world (foragers ~50%) and fishing was repeated and spread | 2 worlds × 120 days; weak |
| Starting the band where our species lived: 23.1 vs 15.3 alive, better in 10 of 12 seeds, 0 vs 1 die-outs — but predator deaths did not fall (hunger and fire did) | 12 worlds × 60 days; weak–moderate, range of difference includes zero |
| The real Earth map: populations survive about as well (20.3 alive, none died out) | 12 worlds × 60 days; weak (different worlds) |

## Known problems (most important first)

1. **Populations decline over months.** 40-day checks looked fine; 150–300-day runs showed slow decline
   and some die-outs (hunger, then predators, drowning). Evolution, language and culture need a population
   that lasts. Suspects: predator pressure, no mobility as a group, no food storage. (The start location
   has now been made realistic; it seems to help over 60 days, not yet tested over 300.) Hunger is the
   largest cause of death in every recent run. Traced on 9–10 Nov (entries 10–12): people starved with food
   around them, mostly weaned children and orphans, alone. Eating food in reach did not help; cooperative
   care cut hunger deaths by about a sixth (not yet clear); predators kill the isolated (86–94% of victims
   had no grown person within reach; few were asleep), so isolation, not sleeping sites, is the next lever.
2. **No formal validation.** Comparisons with real data have been piecemeal. Needed: a reality-check
   suite (see below).
3. **Fire-making is essentially never discovered** in runs of 120+ days (fire-keeping happens rarely).
4. **No shared vocabulary yet.** Words are mostly one-offs; ape-like vocal control is meant to evolve
   but too few generations pass.
5. **Brain structure evolves only in principle:** the layout genes exist, but runs are too short to see
   change.
6. **Animals don't learn from others' pain; pregnant animals look the same as others; birds are drawn,
   not agents.**
7. **The real-Earth map is today's climate:** no ice-age ice sheets, no colder climate, no monsoon (India
   too dry), Sahel too dry, a spurious lake in the Congo basin.

## The proposed reality-check suite

Run automatically over long multi-world runs; each check a real target with a source; publish pass/fail.

| Check | Real target (source to confirm) |
|---|---|
| Population over 300+ days | roughly stable |
| Children surviving to 15 | about half (Hadza, !Kung) |
| Life expectancy at birth / adults reaching 60+ | ~30 years / common (forager demography) |
| Births per woman | ~5–7 (forager total fertility) |
| Interbirth interval | ~3–4 years |
| Full-sibling share | ~66% (Dyble 2026) |
| Predator : prey ratios | realistic for the kinds present |
| Carcass decay time by temperature | ~20 days in summer for small carcasses |
| Sound ranges | shout ~2 km, wolf howl 6–10 km, lion roar ≤8 km |
| Gestation lengths | as each species |

## Questions for a reviewer

1. Is anything still scripted that real people or animals are not born with? (Search for pulls in `RF`,
   bonuses in `a.bonus`, and anything that sets behaviour directly.) The most debatable built-in drives
   are the wariness of big hunters and the push to feed one's own hungry young (`src/sim.js`): real, but
   possibly carrying survival; an ablation would show it.
2. Which reality checks matter most, what are the best sources and values, and how should each be measured
   fairly in a 3 km grid with a 3-day "year"?
3. Why do populations decline over months? Which of: start location, predator pressure, learning speed,
   lack of group movement or storage — and what is the most realistic fix?
4. How should fire-making be made discoverable without scripting it?
5. Is the experiment design sound (sample sizes, confounds such as different random worlds when a
   brain's input layout changes)?
6. Do the research log's conclusions (`docs/FINDINGS.md`) follow from the numbers, and are the strength
   labels fair?
