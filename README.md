# Genesis

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.24050773.svg)](https://doi.org/10.5281/zenodo.24050773)

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
  forest.js         forests by climate (rainforest, woods, pine), how they spread and die back, fruit
  items.js          loose stones, sticks, sharp flakes and hard-shelled nuts that hands can use
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

## For researchers

Genesis runs without a browser and is exactly repeatable, so it can be used as an experiment tool.

```
node tools/experiment.js --seeds 1-50 --days 90 --workers 4 --out run.csv
```

This runs 50 seeded worlds and writes one table: for each world, how many people were alive at the end,
how many generations there were, why people died, and **the day each milestone first happened** (using a
stone, digging roots, eating meat, hunting, keeping fire, making fire, sharing, sounds…). The top of the
file records the version, commit, Node version and settings, so the run can be cited and repeated; the
same command on the same commit gives the same file. A summary is printed as well.

- **How the model works, with the real-world basis for each rule and what is simplified:** [docs/MODEL.md](docs/MODEL.md), written in the standard ODD format for agent-based models.
- **What is and isn't validated:** section 8 of that document. In short: not yet checked against data. Compare many seeds, never one.
- **Citing:** DOI 10.5281/zenodo.24050773 (Zenodo). See [CITATION.cff](CITATION.cff) (GitHub shows a "Cite this repository" button) and say which version or commit you used. Changes are listed in [CHANGELOG.md](CHANGELOG.md).
- Runs shorter than about 100 days seldom show a second generation: a person matures at 12 "years" of 3 days each.

Worlds are seeded, so the same command always produces the same world — useful for comparing a change against what came before.

The tests check that the world is reproducible, that creatures stay within their bodies' rules, that children and teenagers can never mate, that herbivores can graze, that loneliness needs someone to miss, that only strong habits are inherited (partly and by chance), that whispers are understood correctly, and that the mind readout matches the network.

**Play it online:** https://malvika123.github.io/genesis/

## What's in the world

- **Terrain:** every place has a height. About half the world is sea — salty, so nobody can drink it, shallow along the coasts and deep further out. Continents rise to mountain ranges, and the very highest summits reach Everest's 8.8 km while the deepest sea floor drops into a trench 11 km down like the Mariana's (most land and sea are far lower). Caves open in stony hill country: dry, out of the wind and rain, and mild in every season, the kind of place early people sheltered in. Water has to drain to the sea, so basins fill into lakes and rain gathers into rivers that start in the uplands and run downhill to the coast. There are beaches, deserts, stony uplands, boulders, pits that trap and hurt, and red berries that look like food but make you sick. Grass grows back over days.
- **Forests:** trees grow where it is warm and wet enough over the year — rainforest near the equator, broadleaf woods in the middle latitudes, pine forest in the cold and up the mountains to a treeline. They thicken over years when the soil is moist and thin out in droughts, and they shade out the grass beneath. Trees bear fruit in the growing season, which people can eat; under trees you stay dry in the rain and out of the wind; creatures among trees are harder to spot (good for hiding from predators) and see less far themselves; and thick forest is slow going. Zoom in on the 3D planet and you see the trees themselves.
- **Vision:** each creature faces the way it walks and sees only over its kind's real field of view — about 200° for people, almost all the way round for deer, bison and rabbits (eyes on the sides of the head), about 250° for wolves. Standing still, it has looked all around. Hills and thick forest hide what is behind them; at night it sees only as far as its kind's night vision allows (big cats see in light about six times dimmer than people); asleep, its eyes are shut, though it still hears or smells what is right beside it. Only people have three kinds of colour cone, so only they tell red berries from green leaves. The map lights up what the selected creature can see, and **Its eyes** puts the camera at its eye height, facing its way, with its field of view and colour vision. Simplified: its brain does not receive pictures, but what is in sight in each of eight directions and how near.
- **Feelings:** besides hunger, thirst, tiredness, pain, cold, fear, loneliness, longing for a partner, curiosity and care for its young, a creature feels heat (shade and water cool it; sweating costs people water), grief after the death of its partner, child or mother, anger after being attacked (and is readier to strike), the fun of play when young, fed, safe and with others, boredom when nothing is new (which sharpens its curiosity), and contentment when every need is met. These follow the core emotional systems found in all mammals (Panksepp). They are signals that change what it does and what it learns; whether it *experiences* them is not something anyone can say.
- **Storms:** by day the sun heats the ground, and where the air above is warm and moist it rises fast and builds thunderclouds — so thunderstorms come on hot, humid afternoons, mostly in the tropics and summers, and almost never near the poles. Lightning strikes from them (rarely hitting anyone), and the crack of thunder close by startles every creature near. Dry ground under a clear sky heats strongly by day and cools fast at night, so deserts are hot by day and cold at night.
- **Seeing is learned:** a person's eyes report what is truly in sight, but recognising what each thing is must be learned. With little skill, faint and distant things are missed, distances are rough guesses, and look-alikes are mixed up — a deer for a wolf, a person for a hunter, the sea for a lake, red berries for good food. Recognition sharpens with seeing things up close, and fast after what bit, sickened or burned them. Babies' vision is blurry for months, with a head start for faces, their mother, and predator shapes (as for snakes and spiders in real infants). The Doing tab shows what a person recognises well and what it is still learning. Simplified: the first people start grown, with grown-up perception; animals see well from the start.
- **Raw vision (an experiment):** in **New world**, tick *Raw vision* and people's eyes report only light — the colour and nearness of what each of 12 rays across their field of view meets — with no labels at all. A lake and the sea are the same blue; a wolf is a grey shape. Only what is within reach is still known by touch, taste and smell. Their brains must learn what everything is, as a newborn's must; they may well die out before they do.
- **IQ:** like a real IQ test, every person's own brain is given the same set of everyday problems (thirsty with water nearby, a predator in sight, red berries at its feet, a stone in hand and a nut on the ground, a hungry child beside it…) and scored on how strongly it chooses well. IQ compares that score with everyone alive of the same age group: 100 is average, 15 points one step above or below. So the average is always 100; the Stats tab shows each generation's raw test score, which is where real improvement would show.
- **Talking:** people can make six sounds with a voice that works alongside the body, so they can call while they walk or run. Two are inborn in every human: a baby's cry ("waa") and a scream of pain ("aah"). The other four ("ka", "mo", "ti", "su") mean nothing at first. Sounds are heard nearby (which sound, how loud, from where); a parent is drawn toward its crying child; answering someone pleases both, as turn-taking does for infants and mothers; calling out eases loneliness a little. What a sound comes to mean is never set: the Stats tab works it out only from when each sound is actually used and how hearers respond, and says so when there is no meaning yet. Tap a person and choose **Listen** to hear them (synthesized voices: higher for women and children). Children inherit genes for brain size, learning speed and how strongly they copy others; natural selection decides whether these rise. What a parent learned is *not* inherited through genes (that would be Lamarckism); it can pass on only by children copying their parents, sounds included — which is how real culture works.
- **Fire:** fire needs fuel, heat and oxygen. Fuel here is grass (catches fast), trees (burn slowly) and fallen sticks; it must be dry, which follows drought, rain and humidity. Fires start the way they do in nature — mostly lightning on dry fuel, sometimes smouldering for a while before flaring up, and very rarely sparks from rocks falling on steep, dry slopes (this world has no volcanoes). They spread with the wind and uphill, stop at water and bare rock, go out in the rain, and leave ash where grass soon grows back. Fire burns anyone caught in it; most animals flee it by instinct, while people are only wary (chimpanzees have been seen calmly watching wildfires). Fire roasts nuts and cooks animals caught in it, which gives more energy. A burning stick can be picked up, carried, and put down to start a fire, and a fire can be fed with sticks; fire warms, lights the night, and keeps predators away. For a very long time early humans could only *keep* fire, not make it: grab it from a wildfire, carry it, feed it, and lose it to the rain. Making fire is a skill, never inborn: each try is practice, those used to handling fire learn faster, and those close by who watch pick some of it up, which is how it spread. A beginner almost never succeeds; a practised hand makes fire within one step. Pyrite (a rare, shiny stone found in rocky hills) struck against a stone throws sparks that can light dry tinder — the oldest evidence of fire-making, about 400,000 years old at Barnham in England, includes pyrite — and working dry wood on wood can bring an ember too (there is no ancient evidence of friction fire, since wood rots; we know it from recent peoples). Flint struck on flint alone cannot. Nothing tells them any of this. Simplified: a square burns as a whole, and a strike stands for the many flashes of a storm.
- **Hands:** people can pick up stones and fallen sticks, put them down, and strike with what they hold. Nothing tells them what it is for; the world just follows physics — a stone breaks a nut's shell (chimpanzees and crows do this), two stones struck together can chip off a sharp flake (the oldest stone tools are made this way), a stick reaches further than an arm and helps when catching fish. The only inborn parts are a baby's grasping hand, a child's pull toward objects and urge to bang what it holds, and a liking for nuts. Simplified: one thing per hand, and the nut meat is eaten the moment the shell breaks.
- **Height matters:** it gets about 6.5 °C colder for every kilometre up, so high peaks keep their snow; climbing costs energy and steep slopes slow you down; wind pushed up a mountain rains on that side and leaves a dry rain shadow behind it.
- **People** (little figures with a pink or blue outline, no clothes), and real kinds of animal that lived alongside early humans: **deer, rabbits and bison** (plant-eaters), **wolves, big cats and bears** (hunters; bears also eat fruit and plants) and **fish**. Each kind has its real size, lifespan, age of maturity, litter size, cold tolerance, diet and habitat, only breeds with its own kind, and starts where it would live. Bigger prey is harder to bring down alone, so a pack hunting together succeeds more often and a big kill feeds the pack. How much a plant-eater eats follows its body mass the way it does in real animals (Kleiber's law: food needed grows with mass^0.75): a 600 kg bison eats far more grass in a day than a 70 kg deer, and a 2 kg rabbit very little, but the rabbit's small body burns through its reserves faster. Grazed grass grows back from its roots, which is why grasslands survive big herds; bare ground only greens again slowly, from seed.
- **A round world in 3D:** the world is a planet you can spin. Mountains stand up off the surface (heights exaggerated about 70×, as Google Earth does, since real mountains are too small to see on a whole planet; close up, people and animals are likewise drawn 2.5× life size, all by the same factor, so you can find them among the trees), lit by the sun, with clouds floating above. Drag to turn it, scroll or pinch to zoom — the view tilts toward the horizon as you come close — or switch to a flat map. Walk east far enough and you come back from the west; the poles are capped with ice.
- **Day and night are local:** the sun circles the planet once a day, so it is noon on one side and midnight on the other, and creatures on the dark side sleep while others are active.
- **Climate and seasons:** warm at the equator, cold at the poles, and four seasons that are opposite in the two hemispheres. In winter grass stops growing, water near the poles freezes (walkable, but you can't drink from it or drown in it) and snow covers the ground. Plants grow lushest in the tropics.
- **Weather and the water cycle:** lakes, rivers and wet ground evaporate, faster when it is warm. Prevailing winds carry the moisture (trade winds, westerlies and polar easterlies, as on Earth). Warm air holds far more water than cold air, so where air rises and cools — along the equator, where the trade winds meet, and in drifting storms — the water condenses into clouds and falls as rain, or snow where it is freezing. Air sinking around 30° leaves dry belts, like Earth's deserts. Rain soaks the soil, grass needs that moisture to grow, downpours on soaked ground leave puddles creatures can drink from, and rain on your skin makes you feel colder.
- **Cold:** people have no fur and feel cold below about 14 °C; herbivores and predators have thick winter coats and only feel the cold below about -10 °C. Cold burns energy and freezing hurts, huddling next to your own kind helps, and each creature feels its own cold as an input to its brain. Nobody is taught to stay warm. The first people are born in the warmer middle of the world.
- **What people eat:** like us, people cannot digest grass. They are born with the taste instincts of real babies — liking sweet (ripe fruit) and savoury, fatty food (meat, food roasted by wildfires) — and hunger makes them try putting plants in their mouths. The rest is learned, never given: roots and tubers lie hidden under certain plants and must be dug out (much easier with a stick, as the Hadza still do), a fresh body is food (a sharp stone cuts it far faster, as stone flakes did 3 million years ago), meat left a few days rots and makes you sick, and rabbits and deer can be caught, though big prey can hurt you back. Hunters and bears scavenge bodies too. Simplified: people do not eat people.
- **The dead:** a body does not vanish. It lies where it fell, wastes to bare bones over about two weeks, and the bones lie for months. Hunters, bears and people may eat its meat while it lasts (simplified: no insects or vultures).
- **Scale:** the world is 128 × 80 cells; one cell is about 3 km and one step is 15 minutes. A year is squeezed into 3 days.

## How their minds work

- **Senses:** what lies in eight directions (fresh water, food, danger, other creatures, mates, family, fish, red berries, the sea, steep climbs, trees), plus their own hunger, thirst, tiredness, pain, injury, the time of day, and remembered water and food.
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
