# Design: the scale step — the right numbers of prey and hunters (realism audit, gap 1 and 7; plan: "scale step")

Status: **draft for independent review (checkpoint before building)**, 14 Nov 2026. Nothing below is built yet.

## The problem, in numbers

| | Real (East African savanna today, a stand-in for 2.5 Ma) | Genesis now |
|---|---|---|
| Land | a band's range: savanna chimpanzees use about 63 km² (Fongoli: Pruetz 2006) | a whole planet of 128 × 80 squares of about 3 km (about 90,000 km²) |
| Plant-eater biomass | about 5,000 kg per km² at one East African site (native ungulates; drought study, AJE 2010) — a band's 65 km² holds about 300,000 kg: thousands of antelope-sized animals | 20 animals in the whole world (about 4,800 kg) |
| Leopards | 5.4–5.7 per 100 km² (Serengeti camera traps); 0.25–12.7 across Africa | 2 in the whole world |
| Spotted hyenas | 3.5–11 per 100 km² in woodland (Ruaha, Lake Mburo); 82–214 in the Serengeti and Ngorongoro | 2 in the whole world |
| Hunters to prey | about 90 kg of each carnivore species per 10,000 kg of prey (Carbone & Gittleman 2002) | about 9 times too many hunters for the prey (entry 24) |
| Carcasses | in a big-predator savanna, kills and natural deaths leave carcasses that hyenas, vultures and (it is argued) hominins scavenge; cut-marked bones at 2.5 Ma were probably scavenged | only from the few animals there are |

So the mismatch is not "too many hunters": around the band, hunters are about right (2 leopards and 2 hyenas against a real 3–4 and 2–50 in the
band's range), but **prey is thousands of times too scarce**, and it is spread over a whole planet. That is why hunters starved
(entry 24), why newcomers are needed (entry 39), and why scavenging — the likely main source of meat at 2.5 Ma — barely exists.

## What matters for the hominins

The hominins only experience their own neighbourhood: how often they meet prey, hunters and carcasses, per day, within their range.
Matching those **encounter rates** to the evidence matters more than matching the number of animals on the planet.

## Options

**A. More individual animals.** Thousands of antelopes per band range: far too slow (each animal has a brain; a step is already
40–60 ms in the browser). Rejected.

**B. Herds as single agents.** Each plant-eater agent is a herd (antelope 20–50, buffalo 100+), carrying the herd's biomass; a kill
takes one animal from it and leaves a carcass. Faithful to herd living; a large rewrite of plant-eater behaviour, and hunters still
need individual prey decisions.

**C. A background population plus visible animals near the band (recommended).**
- The land carries **prey as a density map** (kg per square, by habitat, from the evidence; it grows and is grazed like grass).
- **Visible animals** (as now, with brains) live near the band, so the hominins see, chase, flee and learn from real individuals;
  their numbers follow the local density.
- **Background predation:** in each square, hunters at their real densities (leopards, hyenas, sabre-tooths, and the missing ones)
  kill from the background prey at rates set by their energy needs (Carbone & Gittleman), and **leave carcasses** — so carcasses
  appear at realistic rates for hominins and hyenas to find and contest.
- **Hunters near the band are individuals** (with brains) at real densities for the band's range (leopard about 5 per 100 km²,
  hyena 4–80 per 100 km², tested at both ends), fed by the background prey; newcomers (entry 39) can then be switched off.
- **The missing hunters:** *Dinofelis* and *Homotherium* (body size from fossils; densities scaled by Carbone & Gittleman, an
  assumption), **crocodiles** at the water's edge (a danger when drinking or wading), **eagles** taking small children (the Taung
  child: Berger & Clarke 1995). Each with its source or registered as an assumption.
- **Hyenas at carcasses:** hyenas come to carcasses and drive off a lone hominin (a group may hold them off): the contest that shaped
  scavenging.

**Cost:** the density map and background kills are cheap (no brains); visible animals stay a few dozen. One question for the
rebuild decision in the plan: whether the world should shrink to the band's region (a few thousand km², finer squares) rather than
a whole planet of 3 km squares. That is a bigger change and is kept separate.

## Numbers to source before building (none invented)

- Plant-eater biomass by habitat (grassland, woodland, forest edge) in East Africa; the 5,000 kg/km² figure needs a Serengeti or
  Plio-Pleistocene-relevant check.
- Predator densities (leopard, spotted hyena, and the extinct ones by scaling); kill rates per predator (kg prey a day).
- Carcass availability for scavengers (e.g. Blumenschine 1986, Serengeti and Ngorongoro scavenging opportunities).
- Crocodile attack risk at water; eagle predation on primates of child size.
- Hyena–hominin contests: evidence on how primates or people fare against hyenas at carcasses.

## Test (after review)

Prediction written first. 24 worlds × 100 days, the reality checks plus: kills per hunter a year against Carbone-based needs; hominin
encounters with carcasses, hunters and prey per day; deaths by hunters as a share (against the chimpanzee and forager ranges); with
newcomers off. One change at a time: (1) density map + background predation + carcasses; (2) hunters at real densities, newcomers off;
(3) each missing hunter; (4) hyenas at carcasses.

## Questions for the reviewer

1. Is option C faithful, or does a background population "script" the world in a way that matters for what hominins learn?
2. Which numbers above are the weakest, and are there better sources (especially for 2.5 Ma rather than today's Serengeti)?
3. Should the world shrink to the band's region now, before this step?
4. What could make the result look right for the wrong reasons?
