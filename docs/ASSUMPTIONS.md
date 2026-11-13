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
| Body size relative to a forager (`HOMININ.size`) | 0.75 | Australopiths about 30–50 kg, 1.2–1.5 m (Nature Education, *Australopithecus and kin*); earliest Homo no bigger (Grabowski et al. 2015); foragers about 45–55 kg | direction (range 0.6–0.95) |
| Pregnancy (`HOMININ.gest`) | 0.62 years | Chimpanzees: Gombe 225 days (208–235, n = 28; compiled in Sear et al., Open Book Publishers); captive mean 228 days (PLoS ONE 2011). Corrected 12 Nov 2026 after review: earlier cited Emery Thompson et al. 2007, which is about fertility, not pregnancy | sourced (chimpanzee proxy) |
| First births (`HOMININ.smat`) | 14 years | Wild chimpanzees about 14–15 (Gombe, Mahale, Taï); captive about 10 | sourced (chimpanzee proxy; range 10–15) |
| Nursing (no cycling) after a birth (`HOMININ.cd`) | 4 years, then mating and pregnancy (0.62 y) | Postpartum amenorrhoea with a surviving infant 3.9 years at Gombe (Wallis 1997), 4.6 at Mahale (Nishida et al. 1990); birth-to-birth 68.9 months with a surviving infant (Emery Thompson et al. 2007) | sourced (chimpanzee proxy) |
| Weaning (`HOMININ.wn`) | about 4 years (0.4 × 10) | Chimpanzees wean at about 4–5 years | direction |
| Grown (`HOMININ.mat`) | 10 years | Australopith teeth grew at least as fast as chimpanzees' (Kelley & Schwartz 2012; Smith et al. 2015) | direction (range 9–13) |
| Lifespan (`HOMININ.life`) | life 60 (most die by about 43; at most 60) | Life expectancy at birth about 33 even at Ngogo, the best-off chimpanzee community; maximum below foragers' (Wood et al. 2017) | direction |
| Brain (adult) | about a third of a person's: inherited 0.27–0.36 of 64 units, can evolve to 0.2–1 | Australopiths 420–550 cm³ against about 1,350 in people | sourced (proportion) |
| Brain at birth (`HOMININ.nh`) | 8 units (people 16) | Chimpanzees about 45% of adult size at birth, people about 25% (Coqueugniot & Hublin 2007); australopith newborns about 180 cc (95% CI 158–205; DeSilva & Lesnik 2008) against adults about 400–550 cc, so roughly 35–45%. Corrected 12 Nov 2026 after review (the earlier 40% / 30% had no source) | direction |
| Feels cold below / heat above (`HOMININ.cold` `HOMININ.hot`) | 9 °C / 31 °C (people 14 / 33) | Still hairy: hair loss dated to about 1.2 million years ago from skin-colour genes (Rogers et al. 2004), likely with Homo erectus; sweating evolved later | **assumption** for the numbers; direction only |
| Climbing a tree | a **choice** (an action the brain makes and learns), not automatic: under a tree of cover ≥ 0.4, sleepiness adds a pull to climb (2 × how sleepy, as the pull to settle somewhere safe), and fear with a hunter in sight adds a pull to climb (and, up a tree, to stay) as strong as the pull to move away from it. To go anywhere it climbs down. Only a baby clinging to its climbing mother is automatic | The owner's rule: only true reflexes are automatic. The infant grasp reflex is a spinal reflex that lets primate young cling to the mother's fur (Britannica; reviews). Nest building in chimpanzees is largely learned: young ones practise by day and improve with age; captive-reared ones without the experience never build full nests (Ngogo study, *Am. J. Primatol.* 2025; Videan 2006; Kyrrest 2014). Fight, flight or freeze differs consistently between individuals (marmosets: Kemp & Kaplan 2011; macaque freezing: reviews). All great apes sleep in trees or safe places (Anderson 1998) | direction; the strengths of the pulls **assumptions** |
| A sleeper in a tree caught by a climbing hunter | × 0.35 | Leopards do take primates from sleeping trees (Busse 1980) | **assumption** |
| Falling from a tree while asleep | 1 in 20,000 sleep steps | Falls injure and kill wild apes; one may have killed "Lucy" (Kappelman et al. 2016 — **disputed**: White and others read the cracks as made after death); no rate | **assumption** |
| Fertile until (`HOMININ.fert` `HOMININ.fertMax`) | the end of each one's own life (`fert` 1; people 0.6, about 50), but not past 50 (`--fert-max`, range 45–55); `--human-fertility` restores the old rule | Wild chimpanzees have no menopause: fertility falls from 25–35 and approaches zero at about 50, but mostly through failing health — healthy females lose only about 20% after 35; 47% of 34 mothers living past 40 gave birth again; the oldest known wild mother about 55; only 7% of wild-born females live to 40 (Emery Thompson et al. 2007, six populations, 534 births). Until 11 Nov 2026 hominins kept people's 0.6, which ended their fertility at 16–36 (mean 26) — an error | sourced (chimpanzee proxy); the cap at 50 **direction** (45–55); the fall after about 35 (about 20% in healthy females) not modelled |
| Next conception after a nursing baby dies (`SOC.resume`) | after 74 days (`--resume-days`, range 45–94; `--no-loss-resume` the old rule: the full nursing time) | Suckling holds back ovulation; women who do not nurse ovulate again 45–94 days after a birth (Jackson & Glasier 2011, systematic review). Check, not target: chimpanzees' birth-to-birth gap is 26.6 months after a lost baby against 68.9 after a surviving one (Emery Thompson et al. 2007, six populations) | sourced (human proxy for the timing) |
| Inborn pull toward a ready partner (both sexes; toward one sensed, and to mate when beside one) (`SOC.lust`) | strength 2 (`--lust`; 0 none); tested at 1 and 3, research log entry 20 | In primates, hormones govern the wish to mate more than the ability (Wallen 2001); chimpanzee males seek out females in full swelling, and most mating happens then (Deschner et al. 2004) | direction; the strength an **assumption** |
| Food needed for body size | a hominin (0.75 of a forager's mass) gets 1/0.75 of a forager's share of its store from the same food and burns it 0.75^-0.25 as fast: about 0.81 of the food in all (`--no-body-scaling` the old rule: as much as a full-sized forager) | Kleiber's law (energy use ∝ mass^0.75), already used here for plant-eaters. Not included: apes' lower metabolic rate than people's at the same size (Pontzer et al. 2016, *Nature*), which would lower hominins' needs further | sourced (the law); the mass ratio as in the body-size row |
| Escape from a hunter in sight | afraid (fear above 0.25), hominins make for trees or cover, and climb a tree of cover 0.4 or more and stay up while the hunter is in sight (`--old-flight`: they only walk away) | Vervets run into trees on a leopard alarm (Seyfarth, Cheney & Marler 1980); baboons flee up trees from lions; a lion drove chimpanzees up trees (Ugalla). But chimpanzees at Gombe threatened and followed a leopard, and a 2025 baboon study found no consistent avoidance: mobbing and group defence are **not modelled**. Whom to fear is learned fast from pain and others' fear (monkeys and snakes: Mineka, Öhman) — so the escape goes with learned fear. The 0.25 threshold an **assumption** | direction |
| Running speed of hominins | the same as walking (0.15; unchanged) | *Australopithecus afarensis* top speed 1.7–5.0 m/s in a physics model, against 7.9 for a modern human (Bates et al. 2024, *Current Biology*); leopards up to about 60 km/h (16.7 m/s, GPS collars). So hominins ran at 10–30% of a leopard's top speed: about walking pace on this model's scale. Running could not save them; trees could | sourced (relative to the hunters) |
| What hominins and people see as food | fruit, cooked food, the leaves of root plants, meat; **not grass** (`--grass-looks-like-food` restores the old rule, which counted grass half as good as fruit) | They cannot digest grass (people get almost nothing from it: a rule since 8 Nov 2026); apes are not drawn to grass when hungry. Early hominins ate fruit, leaves, underground storage organs and some meat; sedges and grass seeds possibly (C4 isotopes) — not grass leaves | direction; the old 0.5 was a leftover with no source |
| Leaves as food (when there is no fruit, roots or meat) (`HOMININ.leaf`) | 0.64 of ripe fruit's food a minute; switch `--no-leaves`, value `--leaf-value` | Kibale chimpanzees: young leaves 7.8 against ripe fruit 12.2 kcal a minute with fibre fermented, 4.7 against 9.7 without (Uwimbabazi et al., PeerJ **preprint** 2016, not peer-reviewed; its two versions give different daily totals); chimpanzees spend about a fifth of feeding time on leaves and lean on them when fruit is scarce (Budongo 19.7%; Ngogo: Watts et al. 2012) | sourced (chimpanzee proxy; range 0.48–0.64) |
| Where leaves can be eaten | tree cover above 0.3 (the same as plant-eaters' browsing) | — | **assumption** |
| Eating leaves does not thin the trees | — | A band of apes eats a small share of a forest's leaves | **assumption** |
| Modern people from leaves | nothing | Humans have a short colon and ferment little fibre; foragers eat few leaves as staple food | direction |
| Hunters that can climb | big cats and bears, not wolves | Leopards climb; lions poorly; wolves not | direction |

## The animals of East Africa about 2.5 million years ago (`HKINDS` in `src/config.js`; patch 6)

Each replaces an ice-age kind in the hominin world with `--africa-animals` — **off by default** until hunters and prey are balanced (research log entry 24). Life histories from the living
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
| Sabre-tooth | *Megantereon* (in East Africa about 3.5–1.4 million years ago) | about 100 kg (size 1.8 of a hyena); 1–4 cubs; pregnancy 0.3 y; first births 3.5; about 2 y apart; life 15; climbs | body mass 100–110 kg from the skeleton of a large **European** *M. cultridens* (Senèze; Christiansen & Adolfssen 2007); African forms may have been smaller (60–70 kg from teeth, secondary source) — the range 60–110 kg; life history from living cats of its size (jaguar, lioness): **assumption**; climbing suggested (scansorial like *Promegantereon*), not established | body sourced; life history and climbing **assumption** |
| (gone) | wolves, bison, bears, deer, rabbits | — | not in East Africa 2.5 million years ago | — |

Not yet included: lions, *Dinofelis*, *Homotherium*, hunting hyenas (*Chasmaporthetes*), crocodiles, crowned eagles (which
took the Taung child: Berger & Clarke 1995); pigs, horses (*Eurygnathohippus*), giraffids, elephants, hippos, other primates.

## How a world starts (11 November 2026)

| Setting | Value | Evidence | Status |
|---|---|---|---|
| What founders know | what their kind has always known, learned the ordinary way in a **practice before the world begins**: the world is built from its seed and runs with nobody able to die, then is built again identically and each founder keeps its trained brain (`--naive-founders`: the old blank minds). Every child is still born knowing nothing (learned weights are never inherited). Tools, fire and words are still to be discovered | No real population ever started without knowing its diet: young chimpanzees learn much of theirs by watching (366 peering events in 1,000 hours at Budongo, about 60% about food; Schuppli et al., Max Planck 2026). Starting a simulation from a sensible state rather than an impossible one is standard practice (burn-in / warm-up: Kang & Aldstadt 2021). Caveat: hominins of 2.5 million years ago already made stone tools (Lomekwi 3.3 Ma; Oldowan 2.6–2.9 Ma), so "tools must be discovered" is an experiment, not history | direction; the idea is the owner's |
| Length of the practice | 10 days (about 3 years) for every founder (`--practice-days`) | Young chimpanzees travel with their mothers 4–5 years after weaning; real founders' experience would grow with their age | **assumption** (to test at 5 and 20 days) |
| During practice nobody dies | — | A device: as children are kept alive by their mothers while they learn | **assumption** |

## Starving (12 November 2026)

| Setting | Value | Evidence | Status |
|---|---|---|---|
| How hunger is felt | smoothly, 3 × hunger² (the old sudden extra jolt below 15% energy removed; `--old-starving` restores it) | The hunger hormone ghrelin rises in proportion to time since the last meal and falls after eating (reviews; Siberian hamsters); no evidence of a sudden jump in the feeling | direction |
| How strongly hunger and thirst win over other pulls (`SOC.hungerK`; `--hunger-pull`) | 6 (× need above 30%) | A starving or parched animal thinks of little else: hunger overrides thirst, anxiety, fear and the wish for company (mice: Burnett et al. 2016); no number for the strength | **assumption**: test the ends |
| The refeeding signal (`SOC.refeedAt`) | below a critical reserve (20% of the store), the urge to search for food doubles | Late in fasting, below a critical body mass, animals sharply increase food seeking: rats about 10× more active (Koubi et al. 1991), emperor penguins abandon their eggs to feed before reserves are lethal (Robin et al. 1998); the signal may come before the metabolic switch in the wild (Adélie penguins, 2016). The switch comes once about 80% of initial fat stores are gone, in rats and birds alike (review, Durban symposium); king penguins at about a quarter of their fat; emperor penguins up to 8× more active below the threshold | the 20% level sourced (range 20–25); the doubling an **assumption** |

## Mother's pull, the female cycle, mood (12 November 2026)

| Setting | Value | Evidence | Status |
|---|---|---|---|
| A mother keeps her nursing child near | a pull toward her own child when it is more than a square away, 3 × (1 − its age ÷ weaning age) × her inherited parental care (`--no-mother-pull`: only toward its cry) | Early on the mother does most of the work of keeping close (carrying, retrieving, restraining), the infant later (monkeys: Hinde & Atkinson 1970; reviews). Measured in Genesis before: children aged 1–4 out of sight 17% of the time, the child doing most of the work — earlier than in real primates | direction; the strength 3 an **assumption** (as children's own pull) |
| The female cycle | about 36 days; receptive (swollen) 13 of them; conception only in the last 5 of those; each female her own phase; **on by default since 12 Nov 2026** (entry 38; `--no-cycle` turns it off) | Chimpanzees: mean cycle about 36 days (Deschner et al. 2003); maximal swelling mean about 13 days, up to 21 (Emery Thompson 2005); ovulation near its end, mating rises then (Deschner et al. 2004; Emery Thompson & Wrangham 2008) | sourced; the 5-day fertile window and certain conception within it **assumptions** |
| Mating (hominins) (`SOC.maleWaitH`) | she enters the nursing wait only if she conceived; he can mate again after **1 hour** (`--male-wait`, tested at 1 and 4); a mating costs him 0.5 energy (`--old-mating`: after any mating she waits the whole nursing time, he waits 36 days and pays 10) | Wild chimpanzee females in full swelling mate from under one to about five times an hour, up to 439 times in one swelling (*Wild Chimpanzees*, Cambridge); the high-ranking males who mate most show no higher energy costs (urinary C-peptide; Harvard dissertation). No study gives a male's own rest time between matings | direction; the 1 hour and the 0.5 **assumptions** |
| Chance a cycle can conceive (`SOC.conceive`) | **0.2** (`--conceive`, tested at 0.2 and 0.1), per female per cycle (`--certain-conception`: every cycle, the old rule) | Wild chimpanzees need about 4.7 cycles to conceive at Gombe, 5 at Kanyawara, 8.9 at Mahale, 11.7–19.4 at Taï (Deschner & Boesch 2007); cycles with higher ovarian hormones are likelier to conceive (Emery Thompson). 0.2 ≈ 1 in 5, the East African sites. Before, conception within the fertile days was certain, and births came 4.7 years apart against 5.2–6.0 (entry 42) | direction; a constant chance per cycle is a simplification |
| Disease: outbreaks among hominins (`SOC.diseaseRate`) | an outbreak starts in one hominin about **once in 7 life-years** (`--disease-rate`, tested at 1/7 and 1/20); a sick hominin passes it each step to each well one within 2 squares with chance 0.02; the illness lasts 1 day (day clock); at its end the hominin dies with chance 0.3 (infants), 0.1 (juveniles), 0.02 (adults), 0.1 (from 35), doubled when starving; survivors cannot catch that outbreak again (`--no-disease`: none) | Illness is the leading cause of death in wild chimpanzees (58% of known causes at Gombe, mostly in epidemics, mostly respiratory: Williams et al. 2008); in an outbreak 87–100% fall sick and about 2–18% of the community dies; some outbreaks kill only the young (Taï 2004), others adults (review, Primates 2020; Kanyawara 2013); outbreaks about once in 5–8 years at Gombe and Kanyawara, but many were human viruses, so ancient outbreaks were probably rarer; spread by sharing space (2021) | direction; every number an **assumption** within the evidence; the illness's length is on the day clock (backlog B6). First check: 40–87% fell sick (low against 87–100%), 0–10% died |
| Mood | a running average of recent surprises (about a day), added to how each new outcome feels (`--no-mood`) | Mood tracks the momentum of recent reward prediction errors and biases how outcomes are perceived (Eldar, Rutledge, Dolan & Niv 2016; people) | direction; its speed and strength **assumptions** |
| Testosterone | not added | In chimpanzees it rises with males' competition for mates (Muller & Wrangham 2004); Genesis has no male rivalry yet for it to act on | — |

## Moving as one choice (12 November 2026)

| Setting | Value | Evidence | Status |
|---|---|---|---|
| How an undecided brain weighs moving | the eight directions together count as one choice (each loses ln 8), then a direction is picked (`--eight-walks`: the old rule) | Not a number from nature but the removal of a design flaw: with eight "walk" choices among nineteen, a fresh brain walked 80% of the time and hominins walked 68–80% of their waking time. Wild chimpanzees travel roughly 15–40% of the day, feed 40–50%, rest 15–30% (**weakly sourced**: Mahale females about 40% feeding, 30% resting, 40% moving — Matsumoto-Oda & Oda 1999, 15 females; Wrangham 1992 known only from a secondary citation; Taï and Gombe locomotion 14% and 18%). With the fix, hominins walked 25% in their first five days — a result to check, not a target | (method) |

## Temperament and parental care (inherited; 12 November 2026)

| Setting | Value | Evidence | Status |
|---|---|---|---|
| Timidity (inborn temperament) | each hominin inherits 0.4–1.6 (mean 1): how strongly fear rises after a bad surprise and how strongly it pulls away from a hunter (`--no-temperament`: everyone 1) | Freezing under threat in young rhesus monkeys is stable and heritable; anxious temperament significantly heritable in a 238-monkey pedigree (Oler et al. 2010), about 29% in later Kalin-lab work; behavioural inhibition in children 20–40% heritable | direction; the spread an **assumption** |
| Parental care | each inherits 0.4–1.6 (mean 1): how strongly its own young's hunger moves it to share (`--no-parental-care`: everyone 1) | Monkey mothers have consistent individual styles (protective, rejecting) across their infants, shaped by genes and rearing (Fairbanks 1996; reviews) | direction; the spread an **assumption** |
| Both drawn from a separate random stream | — | So that adding them changes nothing else in a world | (method) |
| Feeling others' pain and fear (gene `vf`), separate from copying them (gene `im`) | each inherits 0.1–1.7 (as `im`), drawn from the separate stream; independent of `im` at the start (`--one-social-gene`: one gene for both, the old rule) | Observational fear learning engages its own brain systems (Olsson & Phelps 2007); in rhesus monkeys attention to others and attention to threat are separate, weakly heritable traits (8–14% and 10%). No study shows the two are inherited apart. Split on 12 Nov 2026 to measure which one selection acts on (review finding 10) | **assumption** (that they are separate genes); a measuring device |

## Mechanisms added in November 2026

| Setting | Value | Evidence | Status |
|---|---|---|---|
| Seeking food stops when liked food is in reach | — | Appetitive and consummatory phases of feeding in animals | direction |
| Pull to eat liked food when hungry | 8 × hunger | — | **assumption** |
| Care for a hungry child: own / sibling / nephew or niece / other | modern people: 1 / 0.6 / 0.5 / 0.35 × inherited trait (foragers: Hrdy 2009; Kramer 2010; Hawkes et al. 1998). **Early hominins: only a mother feeds her own young** (`--human-care` restores the forager pattern) | Among great apes, care and feeding of infants by others is essentially absent (reviews citing Hrdy 2009); gorilla mothers rarely let others hold theirs; at Ngogo others hold chimpanzee infants but do not feed them (Bădescu et al. 2016); no ape evidence of grandmothers or fathers provisioning. Many hands feeding a child is human | direction |
| Children's pull to stay near carers | strength 3 (under 5) / 1.5, rising with distance and fear | Attachment is inborn (Bowlby 1969) | direction; strengths **assumptions** |
| A heap of branches as cover | (branches − 4) / 8, at most 0.8 | Brush shelters and windbreaks keep off wind and rain | **assumption** |
| Branches in a heap rot | 1 in 3,300 a step per branch | — | **assumption** |

## Fire skill (registered 13 Nov 2026 after the second review, finding 1)

| Setting | Value | Evidence | Status |
|---|---|---|---|
| Fire skill (`fsk`) | a number 0–1 for each hominin, outside its brain, raised only by practice and (below) by watching | Making fire by friction or sparks is a learned knack: a beginner can try for days, a skilled hand succeeds in minutes | **assumption** (a body skill, like a practised hand) |
| Chance of fire per step | striking sparks into dry tinder: 0.0003 + 0.5 × skill²; rubbing dry wood (after 4 steady steps): 0.0004 + 0.6 × skill² | no measured rate for early hominins (who are not known to have made fire) | **assumption** |
| Practice | each step of sparks into tinder +0.012, sparks without tinder or steady rubbing +0.004, scaled by familiarity with fire (0.3 + 0.7 × handled-fire count ÷ 10) and by what is left to learn; a fire made +0.12 | none | **assumption** |
| Watching fire work (`watchFire`) | every awake hominin within 2 squares (about 6 km) gains 40% of the practiser's gain, 1.5× if young; +0.06 when someone makes fire — **off by default** since entry 61 (`--fire-watching` restores it) | none — social learning built in as a rule, outside the brains; it conflicts with "nothing scripted" (research log entry 59) | **assumption**, switched off (the owner's decision) |
| Cracking a nut: an expert's chance per strike (`SOC.nutCeil`) | 0.83 | Bossou: whole kernel in 83.2% of 3,882 bouts by 21 chimpanzees aged 6–60; 8.2% fail, 8.7% smashed (Berdugo et al. 2024, *Nature Human Behaviour*; checked in the preprint, 13 Nov) | **sourced per nut, applied per strike** (one step is about a day's work): assumption in the unit |
| Cracking a nut: a beginner's chance per strike (`--nut-beginner`) (`SOC.nutP0`) | 0.02 | none found; naive wild chimpanzees given nuts and stones never cracked them (Koops et al. 2022, *Nature Human Behaviour*) | **assumption**: tested at 0.005 and 0.10 |
| Cracking a nut: strikes to get 80% of the way to expert (`--nut-sessions`) (`SOC.nutG`) | 500 | onset about 3.5 years, learnt by about 7 (Inoue-Nakamura & Matsuzawa 1997; Biro et al. 2003), "3–7 years to master" (review); about 3.5 years of practice ≈ 1,280 days, one step ≈ 1.3 days, practising on about half the days ≈ 500; no count of practice bouts found | **assumption** (fixed in practice units, never set from simulated behaviour): tested at 150 and 1,500 |
| Cracking a nut: no success before 3.5 years; strikes before then still count as practice | 3.5 years | the **observed age of onset**: Bossou infants begin hammer-and-anvil use at about 3.5 years and have the separate actions by 2.5 (Inoue-Nakamura & Matsuzawa 1997); Taï first nut by 5 (Boesch 2022). Its cause is **coordination** (ordering nut, anvil and hammer), **not strength**: capuchins of 1.8 kg crack harder nuts (Fragaszy et al. 2010); `docs/reviews/2026-11-13-fable-nut-physics.md` | **a hard-coded outcome** whose cause Genesis does not model (the strike is one action): to be tested without it |
| Cracking a nut: skill is the hands', grown only by own strikes, 0 at birth, never inherited (`--easy-nuts`: every strike works, the old rule) | — | motor skill improves with practice to about age 11 and differs between individuals (Berdugo et al. 2024) | **assumption** (a built-in rule, outside the brains; watching changes nothing in it) |

## Abundance (all worlds)

| Setting | Value | Evidence | Status |
|---|---|---|---|
| Where hunters start and newcomers arrive (`SOC.preyRadius`) | only with plant-eaters within **8 squares** (`--prey-radius`, tested at 8 and 4), inside the hunter's own habitat (`--hunters-anywhere`: anywhere that suits it, the old rule) | Carnivores live where their prey is: their numbers follow prey biomass (Carbone & Gittleman 2002). Before, each kind was placed anywhere on the planet that suited it, and big cats were never within 5 squares of any plant-eater in 30 days (research log entry 40) | direction; the 8 squares an **assumption** |
| Newcomers from the wider population (`SOC.rescueRate` `SOC.rescueBelow`) | while a hunter kind has fewer than 4 animals, a young adult of that kind arrives about **once a life-year** (`--rescue-rate`, tested at 1 and 0.25), somewhere that suits it, away from the band, with a blank mind; on the life clock, checked daily (`--no-rescue`: a closed world) | One simulated world holds a few hunters of each kind where the real landscape held thousands (Serengeti leopards about 5.5 per 100 km², Allen et al. 2020; hyenas 80–200); real local carnivore populations persist through immigration (the rescue effect, Brown & Kodric-Brown 1977); one immigrant a year cut a reintroduced marten population's 100-year extinction risk below 1% (J. Wildl. Manage. 2019); an isolated puma population of a few dozen has a 16–21% chance of dying out in 50 years (Benson et al. 2019) | direction; the rate and the threshold of 4 **assumptions** — a stand-in for the wider population until the scale is decided |
| Hunters to prey | at the start about 8 kg of hunter per 100 kg of prey (6 hunters, 20 plant-eaters) | About 90 kg of each carnivore species per 10,000 kg of prey, across 25 species (Carbone & Gittleman 2002). Genesis starts with about 4,770 kg of prey and an estimated 440 kg of hunters (their masses are not in the config): about 3.4 times too many if the three hunter kinds share the prey, about 10 times against one kind (corrected 12 Nov 2026 after review; earlier "about nine"). And the world is about 90,000 km² with a few dozen plant-eaters, where the Serengeti (25,000 km²) holds over a million | **deviation**: the next thing to fix (what an animal stands for, the world's size or the numbers) |

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
