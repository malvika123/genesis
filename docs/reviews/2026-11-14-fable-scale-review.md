# Review of the scale-step design (Fable, 14 Nov 2026) — verdict: build with changes

Read-only. Web search hit a limit part-way; rows marked "memory" must be checked before building.

## Findings
1. HIGH — the design repeated a diagnosis entry 40 disproved: hunters starved from position (never near prey), not scarcity. Re-trace under today's defaults first.
2. HIGH — the numbers disagree: 5,000 kg/km² of prey with Carbone's rule implies about 75 leopards per 100 km², 16 × the measured 5.4–5.7. Use measured densities as inputs; Carbone only as an output check; extinct hunters as a registered range (0 to leopard-like), not Carbone-scaled.
3. HIGH — the clock is an unregistered number: a year is 3 simulated days, so a hyena's 4 kg a day is 4 kg or about 490 kg per simulated day; carcass decay runs on the day clock. Decide, register, test both ways.
4. HIGH — "hyenas drive off a lone hominin" would script the outcome; let contests come from the existing eating and attack rules and the brains.
5. HIGH — background carcasses would be free meat; each needs a sourced state by killer and habitat, and a killer present or a registered delay.
6. HIGH — encounter rates and deaths by hunters must be outputs (reality checks), never pass criteria.
7. MEDIUM — where visible animals appear is an invented rule: appear out of sight, conserve mass with the map, register and test both ends; individual hunters eat only visible kills and carcasses (else hunger is a hidden knob).
8. MEDIUM — today's guild is a partial stand-in: 17 large carnivore species in eastern Africa at 3–2.5 Ma, 15 at 2.5–2 Ma, 6 today (Werdelin & Lewis 2013); *Crocuta* genus present (not the modern species); *Chasmaporthetes* missing from the design; modern densities probably a lower bound on predator load.
9. MEDIUM — eagles and crocodiles have no per-exposure rate; registered assumptions with zero in range, and perceivable, or fear cannot be learned.
10. LOW — "drought study, AJE 2010" is not an identifiable citation; hyena 82–214 per 100 km² unconfirmed (143 Ngorongoro, Kruuk 1972).

## Evidence (checked unless "memory")
Ungulate biomass follows rainfall, 100–10,000 kg/km² across parks (Coe, Cumming & Phillipson 1976, *Oecologia* 22:341–354); Carbone & Gittleman 2002 (*Science* 295:2273); leopard 5.41 / 5.72 per 100 km² Serengeti (Allen et al. 2020), 6.31 Lake Mburo (PeerJ e12307); spotted hyena 3.55–10.80 per 100 km² (Ruaha), 10.99 (Lake Mburo); hyena intake 3.8–4.0 kg/day (Henschel & Tilson 1988); leopard 3.5–4.9 kg/day (Bothma & Le Riche 1984); most carcasses keep some scavengeable food (Pobiner 2015); *Dinofelis* and *Megantereon* left no larger carcasses than living cats, *Homotherium* did (Lewis 1997); guild sizes (Werdelin & Lewis 2013); Nile crocodile attacks 275–745 a year on modern people (not a per-exposure rate); Taung child taken by an eagle (Berger & Clarke 1995; Berger 2006); Hadza scavenge 20% of medium and large carcasses (O'Connell et al. 1988; armed modern people).

## Build order
0. A ledger on today's defaults (no change to the world): per hominin-day prey, hunters and carcasses in sight; each hunter's kg eaten a day against need; distance from hunters to nearest prey. Prediction first.
1. Prey density map from rainfall (Coe; tested 1,000 and 10,000 kg/km²), mass conserved with visible animals, behind a switch.
2. Carcasses from non-predation deaths, then from kills with the killer present.
3. Hunters at measured densities (both ends), newcomers off.
4. *Dinofelis*, *Homotherium*, *Chasmaporthetes*, crocodile, eagle — one at a time.
5. Carcass contests observed, no rule added.
