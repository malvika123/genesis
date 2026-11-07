# Genesis

A small, autonomous world where people, herbivores, predators and fish are born, learn to survive, and raise the next generation — on their own.

Every creature is a reinforcement-learning agent with its own neural network. Nobody scripts what they do. They feel hunger, thirst, tiredness, pain, fear, loneliness and the urge to care for their young, and they learn from what those feelings teach them. You can watch, read their minds, and whisper ideas to them.

## Run it

No install, no server, no API keys. Open `index.html` in any modern browser.

Everything runs locally in the page. Closing or reloading the tab starts a new world.

## What's in the world

- **Terrain:** grass that grows back over days, sand, stony ground, boulders, a river, a lake and small ponds (shallow edges for drinking, deep middles that can drown you), pits that trap and hurt, and red berries that look like food but make you sick.
- **People** (pink and blue), **herbivores** (yellow-green), **predators** (red) and **fish** (in the water). Each species has its own lifespan, age of maturity, litter size, sleep need and senses, based on real animals.
- **Scale:** one cell is about 3 km and one step is 15 minutes. A year is squeezed into 3 days.

## How their minds work

- **Senses:** what lies in eight directions (water, food, rocks and pits, other creatures, mates, family, fish, red berries), plus their own hunger, thirst, tiredness, pain, injury, the time of day, and remembered water and food.
- **Brain:** a small neural network chooses one of 15 actions — walk in 8 directions, stay, eat, drink, sleep, mate, attack, or share food.
- **Learning:** actor-critic reinforcement learning with eligibility traces. Rewards come only from the body: relief from hunger and thirst, rest, company, mating, finding new places; pain, drowning and injury hurt.
- **Hard-wired survival:** like a brainstem, a starving creature reaches for food in front of it and a parched one drinks. Learning can't override that.
- **Body rules:** you can only fall asleep when tired, then you sleep until rested or woken by pain. Children can't mate (people from 16, predators from 4, herbivores from 1.5).
- **Inheritance:** a child gets a random mix of both parents' wiring. Only habits a parent learned strongly can pass on, each with a 50% chance and only partly.
- **Human differences** (from research on human vs. ape brains): a longer learning window into adulthood, more curiosity, imitation of elders, and a longer memory.
- **Feelings with limits:** loneliness only exists after you've bonded with someone — you can't miss people you've never met.

## Watching and whispering

- **Click any creature** to read its mind, straight from its neural network: the options it is weighing and how likely each is, which senses and feelings pushed it toward its choice and which held it back, and its own forecast of whether things will get better or worse.
- **Whisper an idea** in your own words. It reaches the creature in its sleep or a quiet moment and becomes its own thought. The words are read for ideas the creature can understand (water, food, fish, berries, hunters, pits, sharing, others, sleep, a partner, exploring, a direction) and whether you said do or don't. Each idea is only a small nudge in its brain — it still has to act on it, and the world decides whether it sticks.

## Honest limitations

- Learning is slow. Clicking an adult often shows a mind that is still mostly undecided.
- In tests, the "human" brain did not yet out-survive an animal-style brain in this world — a bigger, more curious brain is a cost until there is something like culture, language or tools to make it pay off.
- Whispers are understood through keywords, so nuanced sentences only get their basic ideas across.
- Names are labels for the observer. The creatures have no language and don't know their names.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Malvika Sen.
