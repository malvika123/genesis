# Assumptions register

Every number in Genesis should come from research, or be listed here as an assumption with the range the
research allows. **Nothing is tuned toward an outcome**: uncertain numbers are tested at both ends of their
range, and results that depend on them say so (see `docs/FINDINGS.md`).

Status of each entry: **sourced** (the number is from research), **direction** (research gives the direction
or a range; the number is our choice within it), **assumption** (no research number exists; our choice),
**deviation** (we knowingly depart from the evidence, and why).

Started 10 November 2026; covers the early-hominin world and the mechanisms added in November 2026. The
older parts of the model are still to be audited the same way.

## Early hominins, about 2.5 million years ago (`HOMININ` in `src/config.js`)

| Setting | Value | Evidence | Status |
|---|---|---|---|
| Body size relative to a forager | 0.75 | Australopiths about 30–50 kg, 1.2–1.5 m (Nature Education, *Australopithecus and kin*); earliest Homo no bigger (Grabowski et al. 2015); foragers about 45–55 kg | direction (range 0.6–0.95) |
| Pregnancy | 0.62 years | Chimpanzees 225–230 days in the wild (Emery Thompson et al. 2007; compiled in Sear et al., Open Book Publishers) | sourced (chimpanzee proxy) |
| First births | 14 years | Wild chimpanzees about 14–15 (Gombe, Mahale, Taï); captive about 10 | sourced (chimpanzee proxy; range 10–15) |
| Births apart (nursing + pregnancy) | about 4.6 years | Mahale chimpanzees 4.6 years (2.8–6.2) | sourced (chimpanzee proxy) |
| Weaning | about 4 years (0.4 × 10) | Chimpanzees wean at about 4–5 years | direction |
| Grown | 10 years | Australopith teeth grew at least as fast as chimpanzees' (Kelley & Schwartz 2012; Smith et al. 2015) | direction (range 9–13) |
| Lifespan | life 60 (most die by about 43; at most 60) | Life expectancy at birth about 33 even at Ngogo, the best-off chimpanzee community; maximum below foragers' (Wood et al. 2017) | direction |
| Brain (adult) | about a third of a person's: inherited 0.27–0.36 of 64 units, can evolve to 0.2–1 | Australopiths 420–550 cm³ against about 1,350 in people | sourced (proportion) |
| Brain at birth | 8 units (people 16) | About 40% of adult size at birth in chimpanzees, under 30% in people | direction |
| Feels cold below / heat above | 9 °C / 31 °C (people 14 / 33) | Still hairy: hair loss dated to about 1.2 million years ago from skin-colour genes (Rogers et al. 2004), likely with Homo erectus; sweating evolved later | **assumption** for the numbers; direction only |
| Sleeping in trees | when settling to sleep where tree cover ≥ 0.4 | Long arms and curved fingers suggest continued part-time climbing, though they may be retained traits (debated); all great apes sleep in trees or safe places (Anderson 1998) | direction (debated); the 0.4 threshold an **assumption** |
| A sleeper in a tree caught by a climbing hunter | × 0.35 | Leopards do take primates from sleeping trees (Busse 1980) | **assumption** |
| Falling from a tree while asleep | 1 in 20,000 sleep steps | Falls injure and kill wild apes; one may have killed "Lucy" (Kappelman et al. 2016); no rate | **assumption** |
| Leaves as food (when there is no fruit, roots or meat) | 0.64 of ripe fruit's food a minute; switch `--no-leaves`, value `--leaf-value` | Kibale chimpanzees: young leaves 7.8 against ripe fruit 12.2 kcal a minute with fibre fermented, 4.7 against 9.7 without (Uwimbabazi et al., PeerJ preprint 2016); chimpanzees spend about a fifth of feeding time on leaves and lean on them when fruit is scarce (Budongo 19.7%; Ngogo: Watts et al. 2012) | sourced (chimpanzee proxy; range 0.48–0.64) |
| Where leaves can be eaten | tree cover above 0.3 (the same as plant-eaters' browsing) | — | **assumption** |
| Eating leaves does not thin the trees | — | A band of apes eats a small share of a forest's leaves | **assumption** |
| Modern people from leaves | nothing | Humans have a short colon and ferment little fibre; foragers eat few leaves as staple food | direction |
| Hunters that can climb | big cats and bears, not wolves | Leopards climb; lions poorly; wolves not | direction |

## Mechanisms added in November 2026

| Setting | Value | Evidence | Status |
|---|---|---|---|
| Seeking food stops when liked food is in reach | — | Appetitive and consummatory phases of feeding in animals | direction |
| Pull to eat liked food when hungry | 8 × hunger | — | **assumption** |
| Care for a hungry child: own / sibling / nephew or niece / other | 1 / 0.6 / 0.5 / 0.35 × inherited trait | Family helps most; others less (Hrdy 2009; Kramer 2010; Hawkes et al. 1998) | direction; the weights are **assumptions** |
| Children's pull to stay near carers | strength 3 (under 5) / 1.5, rising with distance and fear | Attachment is inborn (Bowlby 1969) | direction; strengths **assumptions** |
| A heap of branches as cover | (branches − 4) / 8, at most 0.8 | Brush shelters and windbreaks keep off wind and rain | **assumption** |
| Branches in a heap rot | 1 in 3,300 a step per branch | — | **assumption** |

## To do

- Audit the older parts of the model the same way (temperatures, energy use, foods, predators, sound…).
- Test each **assumption** that matters at both ends of its range (sensitivity), starting with the cold and
  heat thresholds, the tree-sleeping numbers and the care weights.
- Diet, still missing: sedges and other C4 foods (early Homo about 35% C4 by carbon isotopes, Cerling et al. 2013;
  Paranthropus about 75%), insects, and the energy values of fruit, roots, nuts and meat (older parts, not yet audited).
