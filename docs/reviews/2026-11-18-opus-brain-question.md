# Opus on the brain question (18 Nov 2026) — review of docs/design/brain-question.md (read only; nothing run)

**Verdict: adopt with changes.** Use the brain question as the long-term frame, but keep the tradition question (and the stage 0 milestones) as the work for this season.

**1. Sound?** A good north star, and the same question as the tradition question seen from higher up: every serious explanation of why brains grew (cultural brain, cooperative breeding, better food) works through learned skills that pay; "when does a
skill become a tradition?" is ingredient 3, in practice ingredient 2 as well. As a programme for three months, six ingredients each behind a switch would pull the project six ways; the master plan names this risk ("one question a season", line 544).
Changes: **stage 0 stays** (faithful-day table, milestone 2 a 3-step chain, milestone 3 one hard skill), relabelled "can a brain of this size learn anything worth paying for?"; **add step 0.11, measuring only**: entry 105 (the gene trace) plus the
chain probe at three brain sizes (days, changes nothing in the world); **stop rule F7 unchanged** for mid-February — the draft's stop rule (every ingredient on, singly and together) cannot be reached in stage 0 because ingredients 4–6 do not
exist yet: move it to the end of stage 5, where selection is measured properly.

**2. Ingredients.** Fair but leans on contested papers without naming who contests them (abstract level): Aiello & Wheeler 1995 — Navarrete, van Schaik & Isler 2011 (*Nature* 480) found no gut–brain trade-off in 100 mammals controlling for fat-free mass;
a trade-off with fat stores instead, and a steadier energy supply. Dunbar's social brain — DeCasien et al. 2017 (*Nat Ecol Evol*): diet, not sociality, predicts primate brain size; González-Forero & Gardner 2018 (*Nature* 557): a metabolic model reaches
human-sized brains mainly with ecological challenges, about 10% between-group competition, little from competition between individuals: ingredient 6 is weakest, last. Fossils — Du et al. 2018 (*Proc R Soc B*; 94 specimens, about 3.2–0.5 Ma): gradual
increase, mostly within lineages, episodes of selection and stasis. **Not verified (memory):** exact Pontzer 2016 figures (humans burn roughly 400 kcal a day more than chimpanzees); Muthukrishna et al. 2018; Hrdy 2009; Hawkes 1998; Isler & van Schaik's
"gray ceiling"; Kuzawa et al. 2014 (brain glucose use peaks about age 5); brain volumes (about 450 cm³ *A. afarensis*, about 600 *H. habilis*, about 550–900 early *H. erectus*): read before any number goes into code. **Missing:** diet and foraging difficulty
(DeCasien; extractive foraging); climate variability (Potts; can wait for the relay); body size (the sim models absolute brain size; Du et al. also use absolute: defensible — say so). **Cooking does not belong at 2.5 Ma** (no fire; Wrangham's dates contested):
mark it out of scope.
**A gap in the code:** the draft never says which side bears the cost. Each hominin pays for its own current units (`src/sim.js` line 111), but the mother's transfer to an infant is a flat 0.03 whatever the infant's `bs`; in life a large-brained child's
cost falls mainly on the mother and helpers — exactly ingredients 4 and 5; without this those switches test nothing.

**3. Measurements.** *Selection gradient:* with about 300 adults the 95% interval on a standardised gradient is roughly ±0.15; founders' `bs` spread is narrow (0.27–0.36); the brain cost of 3 extra units is about 1.5% of energy: a null is expected and means
little; real expansion took about 100,000 generations, so a clear positive gradient in a 30-year run would be suspicious; correct for age and between-world differences. *The neutral marker in entry 105 is not like-for-like:* `nm` mutates by an absolute step
(±0.15), `bs` by ±15% of its value (about ±0.045 at 0.3), so `bs` drifts about 3× less than `nm` and "twice the marker's change" is biased toward a null: scale by each trait's own mutation variance, or add a second marker on the relative rule.
*Founder comparison:* not like with like — an all-large band measures absolute performance, not relative selection; a larger random network changes inborn behaviour before any learning; use mixed bands (half large, half small), cross the brain cost on and off,
add a learning-frozen arm. *Chain probe by size:* fair, cheap, decides a lot; entry 87 found the limit is credit assignment along a chain, not memory; **prediction: extra units will not lift chain length**; if so, "bigger brain" means nothing in this sim until
the learning rule changes. *Where the answer could be built in:* the temptation to change the learning rule so more units learn longer chains — whatever mapping from units to ability is chosen is the answer; safeguard: tie any such change to comparative
data across species (MacLean et al. 2014, Deaner et al. 2007, both from memory: absolute brain size predicts problem-solving across primates), register the mapping as an assumption with a range, test both ends, prediction first. *The mutation rule:* a 20%
chance per birth with a ±15% step is far larger than real mutation (Houle): in the relay brains would evolve unrealistically fast; register a range and run both ends.

**4. Order.** (1) finish slow eating (entry 104); (2) entry 105 with the marker fix and a power statement; (3) the chain probe at 0.3, 0.5, 0.7 brain size; (4) honest watching again now that feeding time is fixed (milestone 2, the tradition question);
(5) defence and several bands — entry 103 shows every band ends within 22–85 years, so no selection question survives without this; (6) the mother's share of the brain cost; (7) only then the controlled founder arms.

**5. Would not:** add cooking, language or Dunbar-style group-size rewards now; raise the 64-unit ceiling; treat a positive short-run gradient as expansion; change the learning rule because of the brain question; rewrite the master plan (add the brain question as
its section 1 framing and leave the stages); run the six switches before the base is faithful (milestone 1 frozen first).

Sources: Navarrete et al. 2011 (sciencedaily.com/releases/2011/11/111109131304.htm) · DeCasien et al. 2017 (carta.anthropogeny.org/node/313215) · González-Forero & Gardner 2018 (carta.anthropogeny.org/node/316568) · Du et al. 2018 (PMC5832710) ·
Lande 1979 summary (bibsonomy.org).
