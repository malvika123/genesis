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
| Nursing (no cycling) after a birth | 4 years, then mating and pregnancy (0.62 y) | Postpartum amenorrhoea with a surviving infant 3.9 years at Gombe (Wallis 1997), 4.6 at Mahale (Nishida et al. 1990); birth-to-birth 68.9 months with a surviving infant (Emery Thompson et al. 2007) | sourced (chimpanzee proxy) |
| Weaning | about 4 years (0.4 × 10) | Chimpanzees wean at about 4–5 years | direction |
| Grown | 10 years | Australopith teeth grew at least as fast as chimpanzees' (Kelley & Schwartz 2012; Smith et al. 2015) | direction (range 9–13) |
| Lifespan | life 60 (most die by about 43; at most 60) | Life expectancy at birth about 33 even at Ngogo, the best-off chimpanzee community; maximum below foragers' (Wood et al. 2017) | direction |
| Brain (adult) | about a third of a person's: inherited 0.27–0.36 of 64 units, can evolve to 0.2–1 | Australopiths 420–550 cm³ against about 1,350 in people | sourced (proportion) |
| Brain at birth | 8 units (people 16) | About 40% of adult size at birth in chimpanzees, under 30% in people | direction |
| Feels cold below / heat above | 9 °C / 31 °C (people 14 / 33) | Still hairy: hair loss dated to about 1.2 million years ago from skin-colour genes (Rogers et al. 2004), likely with Homo erectus; sweating evolved later | **assumption** for the numbers; direction only |
| Sleeping in trees | when settling to sleep where tree cover ≥ 0.4 | Long arms and curved fingers suggest continued part-time climbing, though they may be retained traits (debated); all great apes sleep in trees or safe places (Anderson 1998) | direction (debated); the 0.4 threshold an **assumption** |
| A sleeper in a tree caught by a climbing hunter | × 0.35 | Leopards do take primates from sleeping trees (Busse 1980) | **assumption** |
| Falling from a tree while asleep | 1 in 20,000 sleep steps | Falls injure and kill wild apes; one may have killed "Lucy" (Kappelman et al. 2016); no rate | **assumption** |
| Fertile until | the end of each one's own life (`fert` 1; people 0.6, about 50), but not past 50 (`--fert-max`, range 45–55); `--human-fertility` restores the old rule | Wild chimpanzees have no menopause: fertility falls from 25–35 and approaches zero at about 50, but mostly through failing health — healthy females lose only about 20% after 35; 47% of 34 mothers living past 40 gave birth again; the oldest known wild mother about 55; only 7% of wild-born females live to 40 (Emery Thompson et al. 2007, six populations, 534 births). Until 11 Nov 2026 hominins kept people's 0.6, which ended their fertility at 16–36 (mean 26) — an error | sourced (chimpanzee proxy); the cap at 50 **direction** (45–55); the fall after about 35 (about 20% in healthy females) not modelled |
| Next conception after a nursing baby dies | after 74 days (`--resume-days`, range 45–94; `--no-loss-resume` the old rule: the full nursing time) | Suckling holds back ovulation; women who do not nurse ovulate again 45–94 days after a birth (Jackson & Glasier 2011, systematic review). Check, not target: chimpanzees' birth-to-birth gap is 26.6 months after a lost baby against 68.9 after a surviving one (Emery Thompson et al. 2007, six populations) | sourced (human proxy for the timing) |
| Inborn pull toward a ready partner (both sexes; toward one sensed, and to mate when beside one) | strength `--lust` (off until tested; to test at 1 and 3) | In primates, hormones govern the wish to mate more than the ability (Wallen 2001); chimpanzee males seek out females in full swelling, and most mating happens then (Deschner et al. 2004) | direction; the strength an **assumption** |
| Food needed for body size | a hominin (0.75 of a forager's mass) gets 1/0.75 of a forager's share of its store from the same food and burns it 0.75^-0.25 as fast: about 0.81 of the food in all (`--no-body-scaling` the old rule: as much as a full-sized forager) | Kleiber's law (energy use ∝ mass^0.75), already used here for plant-eaters. Not included: apes' lower metabolic rate than people's at the same size (Pontzer et al. 2016, *Nature*), which would lower hominins' needs further | sourced (the law); the mass ratio as in the body-size row |
| Escape from a hunter in sight | afraid (fear above 0.25), hominins make for trees or cover, and climb a tree of cover 0.4 or more and stay up while the hunter is in sight (`--old-flight`: they only walk away) | Vervets run into trees on a leopard alarm (Seyfarth, Cheney & Marler 1980); baboons flee up trees from lions; a lion drove chimpanzees up trees (Ugalla). But chimpanzees at Gombe threatened and followed a leopard, and a 2025 baboon study found no consistent avoidance: mobbing and group defence are **not modelled**. Whom to fear is learned fast from pain and others' fear (monkeys and snakes: Mineka, Öhman) — so the escape goes with learned fear. The 0.25 threshold an **assumption** | direction |
| Running speed of hominins | the same as walking (0.15; unchanged) | *Australopithecus afarensis* top speed 1.7–5.0 m/s in a physics model, against 7.9 for a modern human (Bates et al. 2024, *Current Biology*); leopards up to about 60 km/h (16.7 m/s, GPS collars). So hominins ran at 10–30% of a leopard's top speed: about walking pace on this model's scale. Running could not save them; trees could | sourced (relative to the hunters) |
| What hominins and people see as food | fruit, cooked food, the leaves of root plants, meat; **not grass** (`--grass-looks-like-food` restores the old rule, which counted grass half as good as fruit) | They cannot digest grass (people get almost nothing from it: a rule since 8 Nov 2026); apes are not drawn to grass when hungry. Early hominins ate fruit, leaves, underground storage organs and some meat; sedges and grass seeds possibly (C4 isotopes) — not grass leaves | direction; the old 0.5 was a leftover with no source |
| Leaves as food (when there is no fruit, roots or meat) | 0.64 of ripe fruit's food a minute; switch `--no-leaves`, value `--leaf-value` | Kibale chimpanzees: young leaves 7.8 against ripe fruit 12.2 kcal a minute with fibre fermented, 4.7 against 9.7 without (Uwimbabazi et al., PeerJ preprint 2016); chimpanzees spend about a fifth of feeding time on leaves and lean on them when fruit is scarce (Budongo 19.7%; Ngogo: Watts et al. 2012) | sourced (chimpanzee proxy; range 0.48–0.64) |
| Where leaves can be eaten | tree cover above 0.3 (the same as plant-eaters' browsing) | — | **assumption** |
| Eating leaves does not thin the trees | — | A band of apes eats a small share of a forest's leaves | **assumption** |
| Modern people from leaves | nothing | Humans have a short colon and ferment little fibre; foragers eat few leaves as staple food | direction |
| Hunters that can climb | big cats and bears, not wolves | Leopards climb; lions poorly; wolves not | direction |

## The animals of East Africa about 2.5 million years ago (`HKINDS` in `src/config.js`; patch 6)

Each replaces an ice-age kind in the hominin world (`--ice-animals` keeps the old ones). Life histories from the living
species; numbers inside the ranges given. Abundance (`cap`, `share`) and the model's own settings (speed, size relative
to a deer or wolf) are carried over from the kinds they replace: **assumptions**. Temperature limits and habitat ranges
(warm lands) are **direction**.

| Kind | Stands for | Values | Evidence | Status |
|---|---|---|---|---|
| Antelope | impala-like bovids (*Aepyceros*; bovids dominate the fossil sites) | 50 kg; one calf; pregnancy 0.55 y; breeding from 1.5; life 15; a calf a year | 40–76 kg; gestation 194–204 days (Kruger, Mkuzi); maturity 1–2.5 y; 12–15 y in the wild (Ultimate Ungulate fact sheet; Kruger Park) | sourced (living proxy) |
| Hare | scrub hare (*Lepus saxatilis*) | 2 kg; 1–3 young; pregnancy 42 days; 2–4 litters a year; life 5 | gestation about 42 days (38 in one source), 1–3 young (several compilations) | sourced (living proxy); maturity and life **assumption** |
| Buffalo | the *Pelorovis*–*Syncerus* lineage | 600 kg; one calf; pregnancy 340 days; first calving about 5; calves 13–18 months apart; life 20 | gestation about 340 days (Behav. Ecol. 2007); first calving at 5; calving interval 395 days in captivity; 425–870 kg; 11–25 y | sourced (living proxy) |
| Hyena | spotted hyena (*Crocuta*) | hunts in clans, scavenges, cannot climb; 1–3 cubs (usually 2); pregnancy 110 days; first births 3.5; a litter every 11–21 months; life 20; every female breeds | Holekamp et al. 1996 (gestation 110 days, first parturition 3–5 y, rank and intervals); Animal Diversity Web (twins usual, 11–21 months, about 20 y in the wild) | sourced (living proxy) |
| Leopard | leopard (*Panthera pardus*) | climbs; 1–3 cubs; pregnancy 90–106 days; first births at 3; 15–24 months apart; life 15 | San Diego Zoo fact sheet; Balme et al. 2013; Animal Diversity Web; leopards took hominins (SK 54, Swartkrans: Brain 1981) | sourced |
| Sabre-tooth | *Megantereon* (in East Africa about 3.5–1.4 million years ago) | about 100 kg (size 1.8 of a hyena); 1–4 cubs; pregnancy 0.3 y; first births 3.5; about 2 y apart; life 15; climbs | body mass 100–110 kg from the skeleton (Christiansen & Adolfssen 2007); life history from living cats of its size (jaguar, lioness): **assumption**; climbing suggested (scansorial like *Promegantereon*), not established | body sourced; life history and climbing **assumption** |
| (gone) | wolves, bison, bears, deer, rabbits | — | not in East Africa 2.5 million years ago | — |

Not yet included: lions, *Dinofelis*, *Homotherium*, hunting hyenas (*Chasmaporthetes*), crocodiles, crowned eagles (which
took the Taung child: Berger & Clarke 1995); pigs, horses (*Eurygnathohippus*), giraffids, elephants, hippos, other primates.

## Mechanisms added in November 2026

| Setting | Value | Evidence | Status |
|---|---|---|---|
| Seeking food stops when liked food is in reach | — | Appetitive and consummatory phases of feeding in animals | direction |
| Pull to eat liked food when hungry | 8 × hunger | — | **assumption** |
| Care for a hungry child: own / sibling / nephew or niece / other | 1 / 0.6 / 0.5 / 0.35 × inherited trait | Family helps most; others less (Hrdy 2009; Kramer 2010; Hawkes et al. 1998) | direction; the weights are **assumptions** |
| Children's pull to stay near carers | strength 3 (under 5) / 1.5, rising with distance and fear | Attachment is inborn (Bowlby 1969) | direction; strengths **assumptions** |
| A heap of branches as cover | (branches − 4) / 8, at most 0.8 | Brush shelters and windbreaks keep off wind and rain | **assumption** |
| Branches in a heap rot | 1 in 3,300 a step per branch | — | **assumption** |

## Audit of the older numbers for people and hominins (11 November 2026)

The per-kind numbers in `SP[0]` (`src/config.js`) and the main food rules (`src/sim.js`), checked for leftovers from
modern people that should have changed with the hominins, and for numbers without a source. Changed after this audit:
fertility (entry 19), grass seen as food, food needed for body size, the next birth after a lost baby (entries 20–23).

| Setting | Value | Finding | Status |
|---|---|---|---|
| Field of view, colour vision | 200°, three cone types | Human visual field about 200°; catarrhine primates are trichromatic | sourced |
| Twins | 2% of births | Human twinning about 1–2%; twins rare in chimpanzees too | direction |
| Sleep | 8 hours | Captive chimpanzees about 8 h; wild ones spend about 12 h in the nest (not all asleep); Samson & Nunn 2015 predict about 9.5 h for a primate of our size and argue short human sleep came after leaving the trees. Mixed evidence; 8 h is inside it | **assumption** (range 8–10), unchanged |
| Energy and water use | 7 and 4 (% of store a day, before the body-size rule) | No research number in these units; humans burn more than apes of the same size (Pontzer et al. 2016) | **assumption** |
| Food per bite: fruit 70, roots 80, meat 110, cooked 120, nuts 110 (× bite size) | — | Relative values are plausible in order (cooked and meat richest), but not from measured intake rates; Kibale chimpanzees: ripe fruit 12.2 kcal a minute (Uwimbabazi et al. 2016) is the only rate used so far (for leaves) | **assumption**: to source from intake-rate studies |
| Digging roots: chance a step 0.15 bare-handed, 0.55 with a stick | — | Hadza dig with sticks; no measured rate | **assumption** |
| Walking and running | both 0.15 | Checked: relative to the hunters, australopiths' top speed (Bates et al. 2024) was about walking pace on this scale (see the escape rows above); for modern people (top speed about 7.9 m/s) running should be faster — not yet changed | sourced for hominins; **to fix** for modern people |
| Fleeing a hunter (inborn) | 0.8 | Fear of big predators is inborn in primates; strength not measured | direction; strength **assumption** |
| Night vision | 0.4 (big cats 1.3) | Primates see poorly in the dark compared with cats | direction |
| Most of a kind the world can hold | 120 people | A fixed cap stops mating when reached; real populations are limited by food, disease and fertility, not a number. Not reached by hominin bands of about 25 | **deviation**, to remove |
| Learning settings (plasticity, curiosity, imitation, memory) | — | Properties of the model's networks; no real-world numbers in these units | model settings, not biology |

## To do

- Audit the older parts of the model the same way (temperatures, energy use, foods, predators, sound…).
- Test each **assumption** that matters at both ends of its range (sensitivity), starting with the cold and
  heat thresholds, the tree-sleeping numbers and the care weights.
- Diet, still missing: sedges and other C4 foods (early Homo about 35% C4 by carbon isotopes, Cerling et al. 2013;
  Paranthropus about 75%), insects, and the energy values of fruit, roots, nuts and meat (older parts, not yet audited).
