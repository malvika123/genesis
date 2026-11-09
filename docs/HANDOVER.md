# Genesis — state of the project and open questions

A briefing for anyone picking the work up: a new contributor, a reviewer, or a more capable model asked
to check the science. Written November 2026, after v0.7.0. Read `README.md` for what the world contains
and `docs/MODEL.md` for the formal model description (ODD protocol).

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
  ablations: `--no-vicar`, `--no-picky`, `--old-sound`, `--no-calls`, `--modern-voice`, `--brain N`).
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

## Known problems (most important first)

1. **Populations decline over months.** 40-day checks looked fine; 150–300-day runs showed slow decline
   and some die-outs (hunger, then predators, drowning). Evolution, language and culture need a population
   that lasts. Suspects: the first band's start location (one world started at 42–44 °C by day), predator
   pressure, no mobility as a group, no food storage.
2. **No formal validation.** Comparisons with real data have been piecemeal. Needed: a reality-check
   suite (see below).
3. **Fire-making is essentially never discovered** in runs of 120+ days (fire-keeping happens rarely).
4. **No shared vocabulary yet.** Words are mostly one-offs; ape-like vocal control is meant to evolve
   but too few generations pass.
5. **Brain structure evolves only in principle:** the layout genes exist, but runs are too short to see
   change.
6. **Animals don't learn from others' pain; pregnant animals look the same as others; birds are drawn,
   not agents.**

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
   bonuses in `a.bonus`, and anything that sets behaviour directly.)
2. Which reality checks matter most, what are the best sources and values, and how should each be measured
   fairly in a 3 km grid with a 3-day "year"?
3. Why do populations decline over months? Which of: start location, predator pressure, learning speed,
   lack of group movement or storage — and what is the most realistic fix?
4. How should fire-making be made discoverable without scripting it?
5. Is the experiment design sound (sample sizes, confounds such as different random worlds when a
   brain's input layout changes)?
