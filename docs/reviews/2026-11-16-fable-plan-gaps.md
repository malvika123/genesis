# Fable: is something missing from the plan? (16 Nov 2026)

The owner asked Fable to review `docs/HOMININ-PLAN.md` and say whether something seems to be missing that can be added.
Read-only review. Fable had no web access in this pass: every citation is from memory and must be checked before building.
Status of each item: not yet decided by the owner (see `docs/BACKLOG.md`).

## A. Verdict

**Yes.** The new roadmap (stages 0–7) covers brains, engine, bands and words, but the old Phase C ("the real world of that time",
R1–R25) has no home in it. The biggest single hole is the hungry season. Several validation and process pieces are also missing.

## B. Missing items, ranked

1. **The hungry season (R1)** is in no stage and not in F1–F29. Plant growth depends on temperature only (`src/climate.js`,
   `growthAt`); fruit, nuts and roots all follow it, so in the tropics food hardly changes through the year. Seasonal shortage is what
   makes fallback foods, digging, meat and marrow worth learning. Evidence: Marshall & Wrangham 2007 *Int J Primatol*; Marlowe &
   Berbesque 2009 *Am J Phys Anthropol*; Sponheimer et al. 2006 *Science*; Joannes-Boyau et al. 2019 *Nature*; Piel et al. 2017
   *J Hum Evol* (fairly sure). Where: stage 0, before F2 is frozen, with F4. Size 1–2 days. Switch: fruit follows rain or not.
   Prediction: hunger deaths and fallback eating bunch in one part of the year.
2. **Unpushed work on the only laptop**: `percept` 74 commits ahead of `origin/percept`. Push now; add "push percept" to the release
   routine. Minutes; the owner's call.
3. **No stage for the rest of Phase C**: crocodiles (R4), eagles (R5), snakes (R7), dangerous big plant-eaters (R8), insects and
   honey (R12, A29), carcass contests (R19), baboons (R18), fleeing wildfire (A3), landscape and climate (R2, R3). Add a column to
   backlog 3b: "stage N" or "parked by the owner on date". 1–2 hours.
4. **The valley (stage 2) has no real place and no sourced specification**: which basin, woody cover, river, gallery forest,
   dry-season water, distance to good stone (A43), sleeping trees. Evidence: Cerling et al. 2011 *Nature*; Plummer et al. 2009
   *PLoS ONE*; Braun et al. 2008 *J Archaeol Sci*; Stout et al. 2005 *J Hum Evol*; Bobe & Behrensmeyer 2004 *PPP*. A one-page
   reviewed specification before stage 2 code; 2–3 days.
5. **No fossil or site targets before stage 4**: C3/C4 diet share (Cerling et al. 2013, Sponheimer et al. 2013, *PNAS*); old-to-young
   adult ratio (Caspari & Lee 2004 *PNAS*); sex difference in dispersal (Copeland et al. 2011 *Nature*). A table of which real data
   each stage is checked against; keep a few checks held out (Grimm et al. 2005 *Science*). 1–2 days.
6. **Scavenging competition and the full carnivore guild**: who drives whom off a carcass, hyena arrival, danger at a carcass;
   *Dinofelis*, *Megantereon*, *Homotherium*, giant hyenas. Evidence: Blumenschine 1987 *Curr Anthropol*; Werdelin & Lewis 2005
   *Zool J Linn Soc*, 2013 *PLoS ONE*; Ferraro et al. 2013 *PLoS ONE*; Pobiner 2020 *Evol Anthropol* (fairly sure). Stage 2;
   3–5 days. Prediction: meat per day falls, deaths at carcasses rise.
7. **The disease stand-in may be biased**: Gombe's 58% is from habituated chimpanzees, many outbreaks from human viruses (Köndgen
   et al. 2008 *Curr Biol*; Negrey et al. 2019 *Emerg Microbes Infect*, fairly sure); chronic parasites, wound infection, anthrax
   from carcasses absent (Hoffmann et al. 2017 *Nature*). Register the caveat; test the outbreak rate at a low end. A few hours.
8. **Heat and water through the day**: midday rest in shade, drying water sources, danger at the last water. Pruetz & Bertolani
   2009 *PaleoAnthropology* (fairly sure); Wessling et al. 2018 (journal unverified). F2 row now; mechanism with the valley. 1–2 days.
9. **A neutral marker gene, added now**: a "chance alone" yardstick for stage 5; a sourced mutation step and generation time
   (Langergraber et al. 2012 *PNAS*; Lande & Arnold 1983 *Evolution*). On its own random stream. Hours.
10. **Reproducibility across machines and browsers**: `Math.sin/exp/pow` not guaranteed identical across engines; pin Node, a free
    GitHub Actions job (quick tests + two-seed identical-worlds check), compare one seed in Chrome and Firefox. Stage 1; ½–1 day.
11. **Party size** (fission–fusion vs cohesive): measure and label (Chapman, Wrangham & Chapman 1995 *Behav Ecol Sociobiol*;
    Lehmann & Boesch 2004, fairly sure). F2 row; hours.
12. **A mother's arm**: a hominin infant may cling less well (DeSilva et al. 2018 *Sci Adv*; contested, test both ends). Stage 4;
    about a day. Prediction: mothers with infants strike and carry less.
13. **Sex differences in every learning measure** (Lonsdorf et al. 2004 *Nature*; Pruetz & Bertolani 2007 *Curr Biol*). Stage 0
    analysis tools; hours.
14. **Real-world comparators for the hard skill**: Toth et al. 1993 *J Archaeol Sci*; Proffitt et al. 2016 *Nature*, 2023 *Sci Adv*;
    Delagnes & Roche 2005 *J Hum Evol*; Morgan et al. 2015 *Nat Commun*; untrained apes failing to flake (Motes-Rodrigo et al. 2022,
    Bandini et al. 2021: unverified). Milestone 3's prediction file; half a day.
15. **Interactions between assumptions**: a small screening design over the ~10 most uncertain numbers (ten Broeke et al. 2016
    *JASSS*). After F2, on a rented machine; 1–2 days.
16. **Review independence and citation status**: every review so far is Fable's, much from memory; five register entries are "not
    read", "via news" or "secondary"; the human expert read has not happened. Add a "source read: yes / abstract only / secondary"
    column to `docs/ASSUMPTIONS.md`; ask one working researcher to look at the F2 table before it is frozen. Half a day.

## C. Thin or out of order

- The plan holds two plans (12 Nov "where we are", "order changed" paragraphs, Phases A–E above the 16 Nov roadmap): put a one-page
  current plan on top, move the history to an archive.
- Stage 3's test uses Gombe transfer rates only; add Copeland et al. 2011.
- Wildfire still causes 5–9% of deaths; A3 (moving away from fire) has no stage: a known fail in the F2 table.
- Stage 6 needs a named climate record; F29 drops "ice ages", but wet–dry swings must stay.
- Sleep sites only touched through F12 and R25: add an F2 row.

## D. Advised against

- Freezing the faithful-day table before the hungry season is in (or without listing it as a known fail).
- "Bands last 300 years in most worlds" as a pass test (stage 3): unsourced and an outcome target (rule 2). Report it, don't aim at
  it. The "9 of 12" pass mark is likewise unsourced: fine as a stop rule if labelled so.
- Treating Fable's advice as binding ("do everything Fable said, no matter what"): rule 6 should apply to F1–F29 too — verify each,
  drop any that fails.
- The public name: *Ancestors: The Humankind Odyssey* (2019) is a game about exactly this subject, so confusion is likelier than the
  handover suggests. The owner's call.
