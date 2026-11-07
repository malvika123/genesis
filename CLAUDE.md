# Genesis — guidance for working on this project

## The guiding principle

**The world should be as close as possible to how Earth really was from the beginning of time for
humans and animals.** Every new feature is judged against that. When there is a choice, pick what
matches real Earth — its physics, climate, geography, biology and the evidence about early humans and
animals — over what is convenient or looks nice. Research it when unsure (biology, anthropology,
climate science) rather than guessing.

That means, for example:

- The first humans start with nothing: no clothes, no tools, no fire, no language, no shelters. Any of
  these must be *discovered* by the creatures themselves, not given to them.
- Nature works the way it does on Earth: a round planet with local day and night, seasons by latitude,
  the water cycle, prevailing winds, mountains that are colder and wring rain from the wind, salty
  seas, rivers that run downhill, forests where it is warm and wet enough.
- Bodies and lifespans follow real species: how fast they grow, when they can breed, how many young,
  what they eat, how they sense the world, how cold or heat affects them.
- Where the simulation must simplify (a coarse grid, a year squeezed into 3 days, exaggerated mountain
  heights on the globe), say so honestly in the README and the About tab.

## The other rules the owner has set

- **Autonomous.** Nobody scripts behaviour. Creatures have their own neural networks and learn by
  reinforcement from what their bodies feel. Teaching, sharing, cooperation, tools, culture — all must
  emerge on their own. Survival needs (food, water) may be hard-wired like a brainstem; everything else
  is learned.
- **Honest minds.** What the page shows a creature thinking must come from its real network, translated
  into plain words — never invented text.
- **Whispers** (the owner's "god speaking through intuition") are the only outside influence: small
  nudges to a creature's brain, delivered in sleep or quiet moments, never commands.
- **Grow in patches.** Start simple and add realism step by step, checking after each step that the
  world still works.

## How to work on it

- After any change to the world, run `npm test` and check balance across seeded worlds (e.g.
  `npm run worlds`, or the 60-day comparison used during development): people should survive and have
  children, herbivores and predators should not routinely die out. Trace causes of death
  (`state().deaths`) before tuning.
- Keep the engine (`src/`) free of browser code so it runs headless.
- Develop on a branch, merge to `develop` when balanced; `develop` is what GitHub Pages serves live.
- Copyright (c) 2026 Malvika Sen, MIT licence. Commit as the owner with a co-author line for Claude.
