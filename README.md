# Genesis

A small, autonomous world where people, herbivores, predators and fish are born, learn to survive, and raise the next generation — on their own.

Every creature is a reinforcement-learning agent with its own neural network. Nobody scripts what they do. They feel hunger, thirst, tiredness, pain, fear, loneliness and the urge to care for their young, and they learn from what those feelings teach them. You can watch, read their minds, and whisper ideas to them.

## Run it

No install, no server, no API keys. Open `index.html` in any modern browser. The 3D planet uses WebGL; without it the page falls back to a simpler globe.

Everything runs locally in the page. Closing or reloading the tab starts a new world.

## Project structure

```
index.html          the page (layout and styles); loads the scripts below in order
src/                the simulation engine — no browser code, so it also runs headless
  config.js         world size, time scale, brain layout, each species' biology
  state.js          shared world state, seedable random numbers, the event log, east–west wrapping
  climate.js        temperature by latitude, seasons, ice, and how cold each creature feels
  weather.js        the water cycle: evaporation, winds, clouds, rain and snow, soil moisture, puddles
  brain.js          neural network, instincts, actor-critic learning
  lessons.js        detecting what a creature has learned, and what taught it
  creatures.js      bodies, genes, personality, inheritance
  terrain.js        height map: oceans, continents, mountains, lakes in basins, rivers that flow downhill
  world.js          starting a world: terrain, grass, weather and the first creatures
  senses.js         what each creature perceives and remembers
  mind.js           reading a creature's mind from its network
  whispers.js       turning your words into nudges in a brain
  sim.js            one step of the world
  ORDER             the order the engine files load in
ui/app.js           drawing, panels, controls and the animation loop
ui/globe3d.js       the planet in 3D (WebGL)
vendor/three.min.js three.js 0.149 (MIT licence), included so the page works offline
tools/              headless engine loader, experiment runner, single-file build
tests/              automated tests
```

The engine never touches the page. That separation is what lets the same world run in the browser, in tests, and in large headless experiments.

## For developers

Needs [Node.js](https://nodejs.org) 18 or newer. There are no dependencies to install.

```
npm test                      # run the tests (about 30 seconds)
npm run worlds                # run 5 seeded worlds for 60 days and summarise them
npm run worlds -- --worlds 20 --days 90 --people 4 --seed 100
npm run worlds -- --json      # machine-readable results, e.g. for analysis in Python
npm run build                 # bundle everything into one file: dist/genesis.html
```

Worlds are seeded, so the same command always produces the same world — useful for comparing a change against what came before.

The tests check that the world is reproducible, that creatures stay within their bodies' rules, that children and teenagers can never mate, that herbivores can graze, that loneliness needs someone to miss, that only strong habits are inherited (partly and by chance), that whispers are understood correctly, and that the mind readout matches the network.

**Play it online:** https://malvika123.github.io/genesis/

## What's in the world

- **Terrain:** every place has a height. About half the world is sea — salty, so nobody can drink it, shallow along the coasts and deep further out. Continents rise to mountain ranges up to about 5 km high. Water has to drain to the sea, so basins fill into lakes and rain gathers into rivers that start in the uplands and run downhill to the coast. There are beaches, deserts, stony uplands, boulders, pits that trap and hurt, and red berries that look like food but make you sick. Grass grows back over days.
- **Height matters:** it gets about 6.5 °C colder for every kilometre up, so high peaks keep their snow; climbing costs energy and steep slopes slow you down; wind pushed up a mountain rains on that side and leaves a dry rain shadow behind it.
- **People** (pink and blue), **herbivores** (yellow-green), **predators** (red) and **fish** (in the water). Each species has its own lifespan, age of maturity, litter size, sleep need and senses, based on real animals.
- **A round world in 3D:** the world is a planet you can spin. Mountains stand up off the surface (heights exaggerated about 70×, as Google Earth does, since real mountains are too small to see on a whole planet), lit by the sun, with clouds floating above. Drag to turn it, scroll or pinch to zoom — the view tilts toward the horizon as you come close — or switch to a flat map. Walk east far enough and you come back from the west; the poles are capped with ice.
- **Day and night are local:** the sun circles the planet once a day, so it is noon on one side and midnight on the other, and creatures on the dark side sleep while others are active.
- **Climate and seasons:** warm at the equator, cold at the poles, and four seasons that are opposite in the two hemispheres. In winter grass stops growing, water near the poles freezes (walkable, but you can't drink from it or drown in it) and snow covers the ground. Plants grow lushest in the tropics.
- **Weather and the water cycle:** lakes, rivers and wet ground evaporate, faster when it is warm. Prevailing winds carry the moisture (trade winds, westerlies and polar easterlies, as on Earth). Warm air holds far more water than cold air, so where air rises and cools — along the equator, where the trade winds meet, and in drifting storms — the water condenses into clouds and falls as rain, or snow where it is freezing. Air sinking around 30° leaves dry belts, like Earth's deserts. Rain soaks the soil, grass needs that moisture to grow, downpours on soaked ground leave puddles creatures can drink from, and rain on your skin makes you feel colder.
- **Cold:** people have no fur and feel cold below about 14 °C; herbivores and predators have thick winter coats and only feel the cold below about -10 °C. Cold burns energy and freezing hurts, huddling next to your own kind helps, and each creature feels its own cold as an input to its brain. Nobody is taught to stay warm. The first people are born in the warmer middle of the world.
- **Scale:** the world is 128 × 80 cells; one cell is about 3 km and one step is 15 minutes. A year is squeezed into 3 days.

## How their minds work

- **Senses:** what lies in eight directions (fresh water, food, danger, other creatures, mates, family, fish, red berries, the sea, steep climbs), plus their own hunger, thirst, tiredness, pain, injury, the time of day, and remembered water and food.
- **Brain:** a small neural network chooses one of 15 actions — walk in 8 directions, stay, eat, drink, sleep, mate, attack, or share food.
- **Learning:** actor-critic reinforcement learning with eligibility traces. Rewards come only from the body: relief from hunger and thirst, rest, warmth, company, mating, finding new places; pain, drowning, cold and injury hurt.
- **Hard-wired survival:** like a brainstem, a starving creature reaches for food in front of it and a parched one drinks. Learning can't override that.
- **Body rules:** you can only fall asleep when tired, then you sleep until rested or woken by pain. Children can't mate (people from 16, predators from 4, herbivores from 1.5).
- **Inheritance:** a child gets a random mix of both parents' wiring. Only habits a parent learned strongly can pass on, each with a 50% chance and only partly.
- **Human differences** (from research on human vs. ape brains): a longer learning window into adulthood, more curiosity, imitation of elders, and a longer memory.
- **Feelings with limits:** loneliness only exists after you've bonded with someone — you can't miss people you've never met.

## Watching and whispering

- **Click any creature** and a bubble over it shows, in plain words, what it is thinking (what pushed its choice, translated straight from its neural network, and how sure it was) and what it is doing. A floating box gives a little more: its feelings, what else it considered, what it expects, remembers and has learned, its body, who is nearby and its family.
- **Whisper an idea** in your own words. It reaches the creature in its sleep or a quiet moment and becomes its own thought. The words are read for ideas the creature can understand (water, food, fish, berries, hunters, pits, sharing, others, sleep, a partner, exploring, a direction) and whether you said do or don't. Each idea is only a small nudge in its brain — it still has to act on it, and the world decides whether it sticks.

## Honest limitations

- Learning is slow. Clicking an adult often shows a mind that is still mostly undecided.
- In tests, the "human" brain did not yet out-survive an animal-style brain in this world — a bigger, more curious brain is a cost until there is something like culture, language or tools to make it pay off.
- Whispers are understood through keywords, so nuanced sentences only get their basic ideas across.
- Names are labels for the observer. The creatures have no language and don't know their names.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Malvika Sen.
