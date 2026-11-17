# Smell and droppings (A45): a design note for review, not built (17 Nov 2026)

Sourced by a research agent (read only), 17 Nov 2026, at the owner's request after Fable's labelled-senses review
(`docs/reviews/2026-11-17-fable-labelled-senses.md`). **Verdict: enough published data to build a first smell sense — partly.** The
qualitative facts are sourced; almost every distance and rate we would need is not.

## What the world has today
- Wind: `windAt(y)` in `src/weather.js` — one fixed [east-west, north-south] pair per latitude band (trades -0.22 / 0.06, westerlies +0.25 / -0.04,
  polar -0.15 / 0.04, squares per step). No variation by longitude, time of day, season, terrain or weather; no gusts or calm. `fire.js` and
  `talk.js` already use it (`talk.js`: +4 dB downwind, -10 dB upwind).
- Smell: only `near = d <= 2` squares in `sense()` — felt even behind hills or in the dark. A square is about 3 km (`preymap.js` SQKM = 9), so today's
  "smell" reaches about 6 km: **hyena range, not primate range**.
- **On a 3 km grid smell cannot be honest.** Real primate smell is tens of metres and a plume is metres wide. It only works inside the planned
  fine valley (100–250 m squares, F9). Write the design now; build it with the valley.
- Rot is modelled (`items.js`, `b.rot`, size-scaled, doubling per 10 °C). Dung exists only as soil enrichment (`sim.js` ~1079). No droppings, no
  faecal parasites; disease is respiratory outbreaks only.

## What real animals smell (sourced; weak where marked)
- Carcass finding: vultures mostly by sight; mammal scavengers such as hyenas by smell, noise and watching vultures (Kruuk 1972, *The Spotted Hyena*;
  summaries only). "About 4 km" for hyenas is a popular figure with no controlled study found. A 10 km hearing range (Mills 1990) is not smell.
- Lions, leopards, sabre-tooth-era cats: nothing quantitative found.
- Wind: dispersal greatest downwind (turkey vulture, *Auk* 103:586); turbulence breaks plumes into bursts (Murlis, Elkinton & Cardé 1992, *Annu Rev
  Entomol* 37:505; secondhand summaries only). No wind-speed-to-range law found.
- Primates are weak smellers against carnivores; smell matters mostly for fruit, less for insects, not leaves (Nevo & Heymann 2015, *Evol Anthropol*
  24:137, abstract only). Chimpanzees sniff urine most and in proportion to relatedness (pilot study). Captive chimpanzees without *Toxoplasma* approached
  leopard urine less (press summary only; original not found). Putrescine made people walk away faster (Wisman & Shrira 2015, *Front Psychol* 6:1274).
- Fire and smoke: nothing sourced.

## Droppings (weakest part)
- Output: mountain gorillas 435 g (infant) to 3,609 g (silverback) a day (*Primates* 2020). Elephants 13.5–20 piles a day. Nothing found for chimpanzee,
  impala, wildebeest, hyena or leopard.
- Removal: elephant dung flattened within hours in the rains, beetles took the rest in about half a day (Laikipia write-up, secondhand); half of duiker dung
  removed within a day (*Oryx* 2023, Cameroon forest). Sun and rain rates: not found. Gijsman et al. 2026 (*Science*): 67% fewer beetles and slower decay
  without elephants (timing numbers not read).

## Carcasses and parasites
- Carcass smell range and duration: no sourced figure. Make it an assumption and test both ends.
- Parasites: no infection-risk figure for primates near droppings. Mandrills avoid heavily parasitised faeces by smell and avoid grooming infected animals
  (Poirotte et al. 2017, *Sci Adv* 3:e1601721) and return less to sites they contaminated; chimpanzee nest reuse raises faecal exposure (Plumptre & Reynolds
  1997, secondhand). A direction exists, no number: step 3 of A45 would have to be an assumption with a range.

## A minimal mechanism (if built)
- World: one scent field per kind on the valley grid: fresh carcass or rot; dung or urine (combined); smoke (only if fire exists). Predator body scent
  fourth — leave out first. Add at the source, decay with a half-life, drift with `windAt` (same upwind scheme as `advect`), diffuse a little. No gusts at
  first (the wind has none); say so.
- Brain: 8 directions × 3 kinds = 24 new inputs beside the existing channels, not replacing them; each reading is the concentration there; no names, no
  "danger" weighting — meaning is learned. Sensitivity per species (low for hominins, high for hyenas, as a sourced range); not learned or inherited yet.
- Leave out first: parasites, scent of individuals, kin scent, fire smell.
- Switch: `--no-smell` restores the `d <= 2` rule exactly. Scent field on a separate random stream (as disease), so with smell off the worlds are
  bit-identical; identical-worlds check as usual.

## Prediction template (write before any run; each uncertain number at both ends)
Carcass detection range for hominins 50 m vs 500 m; scent half-life 1 h vs 12 h; hominin sensitivity 0.1 vs 1 × the hyena value; wind present vs none.
Smell matters if, beyond seed noise over 24 worlds: scavenging success or meeting-with-hyena rates move; fear of predators is learned faster; avoidance of
rotting carcasses appears; hominins find carcasses more often downwind than upwind. It does not matter if everything is within noise at both ends and a
control with the scent inputs zeroed matches. Count a result as a smell effect only if the downwind–upwind asymmetry shows.

## Could not verify
Hyena smell range; wind-speed limits; lion, leopard and sabre-tooth data; daily dung output for chimpanzee, ungulates and hunters; sun and rain dung removal
rates; any parasite risk number; carcass smell duration; the original leopard-urine study; Nevo & Heymann beyond the abstract.

## Sources
Kruuk 1972 (summary: hyaenidae.org/the-hyaenidae/spotted-hyena-crocuta-crocuta/crocuta-diet-and-foraging/) · Scientific American "The Carcass Race"
(scientificamerican.com/blog/observations/the-carcass-race/) · Murlis et al. 1992 (annualreviews.org/doi/abs/10.1146/annurev.en.37.010192.002445) ·
*Auk* 103:586 (sora.unm.edu/sites/default/files/journals/auk/v103n03/p0586-p0592.pdf) · Nevo & Heymann 2015 (pmc.ncbi.nlm.nih.gov/articles/PMC4584505) ·
Wisman & Shrira 2015 (pmc.ncbi.nlm.nih.gov/articles/PMC4551835) · chimpanzee olfaction press (earth.com/news/chimpanzees-family-strangers-scent;
carta.anthropogeny.org/node/308307) · Poirotte et al. 2017 (pmc.ncbi.nlm.nih.gov/articles/PMC5384805) · mandrill movements
(hal.archives-ouvertes.fr/hal-02079741) · gorilla defecation, *Primates* 2020 (link.springer.com/doi/10.1007/s10329-020-00874-7) · elephant defecation
(annzool.net/PDF/anzf47/anzf47-398.pdf) · duiker dung removal, *Oryx* 2023 · Laikipia dung beetles (africanelephantjournal.com) · Gijsman et al. 2026,
*Science* (doi.org/10.1126/science.aeb7062).
