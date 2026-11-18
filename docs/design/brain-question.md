# The organising question: what would make a bigger brain pay? — a draft reframing; Opus's review (adopt with changes): `docs/reviews/2026-11-18-opus-brain-question.md` (18 Nov 2026)

**Why.** The owner (18 Nov): "the brain makes us mostly, so the whole thing should revolve around how hominins would have expanded their brains to reach our state." Brain expansion (encephalization) is the clearest difference between our line and
the other apes, and the long vision (millions of years, groups with their own ways, language) is a story about it. This note proposes making it the organising question, with the work done so far as its ingredients. It does **not** change
the realism rules, the switches-and-predictions method, or the stop rules; it changes what the work is *for*.

**What the sim has today.** Each hominin inherits a brain-size trait `bs` (the share of the 64-unit ceiling it can grow: founders 0.27–0.36, about 17–23 units), which mutates at birth; brains grow through childhood and are pruned after maturity;
brains cost energy (`SOC.brainF`, registered); nothing rewards a bigger brain directly; learning is simple reward learning. The README found bigger brains on their own made things worse. The brain's measured limits (entry 87): chains of 2 acts learned,
3 by half, 4–5 not; a cue held 2–4 steps. Entry 105 (queued) traces the inherited traits and the selection on them against a neutral marker.

## The reframing
**Question:** under which honest conditions does a larger brain leave more surviving descendants than a smaller one — and what is the smallest set of real ingredients that makes that true? A result either way is a finding: "ape-like learners
do not expand their brains under these ingredients, here" is as valid as the opposite.

**Ingredients from the literature (each to be sourced and checked before building; each behind a switch):**
1. **Energy supply** — meat, marrow, later cooking raise the energy per hour of feeding, making a costly brain affordable (the expensive-tissue idea, Aiello & Wheeler 1995, contested; cooking, Wrangham; total energy budgets, Pontzer et al. 2016).
   Sim: slow eating (entry 104) makes feeding time honest; rich foods (marrow, meat) already exist in kg; cooking needs fire, which the world does not model.
2. **What a bigger brain can learn (the potential)** — more capacity must open skills a smaller one cannot: longer chains, longer memory, harder tool tasks. Sim: the chain probe by brain size; the "one hard skill" milestone.
3. **Social learning and culture** — skills that pass between generations make a larger learning capacity pay (cultural brain hypotheses; Muthukrishna et al. 2018; Boyd & Richerson). Sim: honest watching (entry 101) and the tradition question.
4. **Life history** — a longer childhood to grow and train a brain; weaning and birth spacing. Sim: growth curves (chimpanzee-shaped, registered), nursing.
5. **Cooperative breeding and sharing food** — others help feed the young, so mothers can afford costly offspring (Hrdy; Hawkes). Sim: sharing exists only from mothers (entry 95: 100% mothers).
6. **Social complexity** — larger groups with more relationships (Dunbar). Sim: one band of 25; several bands is the defence plan (F10).

**What Genesis can measure now, and what it cannot.** Now (short runs): the selection gradient on `bs` with each ingredient on and off; controlled founder comparisons (bands differing only in `bs`); the chain probe by brain size; whether skills depend on brain
size. Not now: actual expansion over generations — brains changed over about 100,000 generations; runs give 1–8. That needs the long-run relay (stage 6). So short runs answer "is there a push, and from which ingredient"; the relay answers "does it add up".

**How the existing plan maps in.** Stage 0's tradition question becomes ingredient 3; the honest senses and feeding time are the faithful base every ingredient rests on; defence and several bands (F10) are ingredient 6 and also what lets a population last long enough
to evolve; the faithful-day table stays the realism check; F13/F14 (population-genetic bridge, the relay) become the route to the actual expansion.

**Stop rule (to agree):** if with every honest ingredient on, singly and together, the selection gradient on brain size is not positive within its interval over a stated number of worlds and generations, write it up as the result and decide then.

**What this does not claim:** that the sim hominins will become human; that these are all the causes; that any ingredient works as the literature says (several are contested).

## Questions for the reviewer
1. Is this a sound organising question for the project, better or worse than "when does a skill become a tradition?" (Opus advised narrowing to the tradition question on 17 Nov)? Is it too big, or the same question seen from the top?
2. Is the list of ingredients fair and sourced where it matters? What is missing (e.g. bipedalism and travel energy, climate variability, predation pressure on group size, hunting, language) and what is weak?
3. Are the measurements right: selection gradient on `bs`, founder comparisons, chain probe by size? Can a short run really say "is there a push"?
4. Where does the project risk building the answer in (tuning toward expansion)? What would make it honest?
5. Order: which ingredient first, given the sim's state (honest eye, slow eating in progress, honest watching waiting)?

## Revised after Opus's review (18 Nov) — pending the owner's decision
- **A long-term frame, not this season's programme.** The brain question frames the project; stage 0 (faithful-day table, milestone 2 a 3-step chain, milestone 3 one hard skill) and the tradition question stay as the work, relabelled "can a brain of this size
  learn anything worth paying for?". **New step 0.11 (measuring only):** entry 105 (gene trace) and the chain probe at brain sizes 0.3, 0.5, 0.7. F7's stop rule (mid-February) unchanged; the brain stop rule moves to the end of stage 5.
- **Ingredients:** fair, but name who contests them (Navarrete et al. 2011 against the expensive-tissue gut trade-off; DeCasien et al. 2017 and González-Forero & Gardner 2018 against the social brain as first driver, so group complexity is last); add diet and
  foraging difficulty; climate variability later; state that the sim models absolute brain size (as Du et al. 2018); cooking is out of scope at 2.5 Ma.
- **A gap:** the mother's transfer to an infant is a flat 0.03 whatever the infant's `bs` (`src/sim.js` ~111): ingredients 4 and 5 test nothing until the cost falls on the mother and helpers.
- **Measurements:** the selection gradient needs a power statement (a null is expected; a clear positive gradient in 30 years is suspicious); the neutral marker is not like-for-like with `bs` (absolute against relative mutation): scale by each trait's own mutation
  spread (done in the tool); founder comparison with mixed bands, brain cost crossed on/off, a learning-frozen arm; the chain probe by size is fair and cheap (prediction: extra units will not lift chain length because the limit is credit assignment).
- **Where the answer could be built in:** changing the learning rule so more units learn longer chains; tie any mapping from units to ability to comparative primate data (MacLean et al. 2014; Deaner et al. 2007: to verify), register it, test both ends; also register the mutation rate
  (20% a birth, ±15% is far above real mutation) and run both ends before the relay.
- **Order:** slow eating → entry 105 → chain probe by size → honest watching → defence and several bands → the mother's share of the brain cost → founder arms. **Not:** cooking, language, group-size rewards, raising 64 units, changing the learning rule for this question,
  rewriting the master plan (add the brain question as its section 1 framing).
