# Review: making stone flakes as the stone allows (design A27, Oldowan) — Fable, 14 Nov 2026

Read-only: no source code changed. Reviewed `docs/design/oldowan-knapping.md` and the code on branch `percept`. Sources were
checked today and are linked. "Not found" means I searched and could not reach the figure; "memory" means unchecked.

**In one line.** Flaking is the opposite case to fire: banging stone on stone really does make sharp flakes, so the world side can
be built honestly now, with no skill counter. The weak points are elsewhere: a flake in the hand cuts meat by itself (no creature
has to find out what it is for), every stone is the same, and the capuchin "flakes per bout" number the design hopes for is not
published in any form I could reach.

## Findings

**1. HIGH — Option (a) is the faithful one; option (b) has nothing sourced to act on; option (c) cannot fit the step.**
Making *a* sharp flake is easy for a body that pounds. Of 25 people who had never seen knapping, all used knapping techniques and
22 made and used cutting tools, the first after about 21–36 minutes on average; they made 1,172 flakes from 33 cores in sessions of
at most 4 hours ([Snyder, Reeves & Tennie 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9258951); modern adults, glass cores, a
reason to cut). Two beginners averaged 0.38 usable flakes per strike
([Putt 2015, poster](https://paleoanthro.net/media/meetings/files/Putt_2015.pdf); two people, thin). So one 15-minute bout on good
rock is a whole episode: several flakes or none. What skill changes is *quality*, not whether a flake comes: bonobos swing the
hammer at 3.67 m/s, expert people at 7.12, Gona estimated at 5 or more; flake scars per core 5.5 (bonobo), 9.3 (Gona), 9.1 (people);
heavy edge battering on about 52% of bonobo cores
([Toth, Schick & Semaw 2006](https://www.stoneageinstitute.org/pdfs/oldowan-ch6-toth-etal.pdf)). Six students with a mean 167 hours
of practice over 22 months tripled the flake area they got from five flakes
([Stout et al. 2015](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0121804)). Genesis has one kind of flake, so
a skill number could only change the flake count, which is not what the evidence says skill does. (c): choosing a platform and an
angle happens blow by blow, in seconds; the flake's size is set mainly by platform depth and exterior platform angle
([Li et al. 2022, review of Dibble's experiments](https://link.springer.com/article/10.1007/s10816-022-09586-2); Dibble & Rezek
2009 itself not read). A 15-minute step cannot hold that.

**2. HIGH — Holding a flake is using it.** `src/sim.js:936–937`: eating meat with `hand === 3` takes three times the meat, with no
act of cutting. `src/items.js:230–235` picks up whatever lies there, and the inborn take pull is 1.6 (`src/brain.js:131–132`). So
"butchery with a flake" (17 of 24 worlds, `rates-map-on.txt`) can happen with no creature having learned anything. Real monkeys
make flakes and never use them (Proffitt et al. 2016, [press](https://www.eurekalert.org/news-releases/496586)); 11 chimpanzees
given ready flakes did not use them ([Bandini et al. 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC7612464)). This, not the 0.05,
is where a result would look right for the wrong reason.

**3. MEDIUM — The capuchin rate cannot be sourced as hoped.** I reached only: 111 artefacts, about half the flakes conchoidal,
"often several flakes from one rock" (press and abstract of [Proffitt et al. 2016](https://www.nature.com/articles/nature20112);
full text behind a wall). No flakes per bout or per hour found. Captive capuchins: 6 of 11 made flakes unprompted (Westergaard &
Suomi 1994, as cited by Bandini et al.). The per-bout yield for unaimed banging stays an **assumption**; the evidence in finding 1
says on good rock it is high (my reading: 0.3 to 1 a bout), so today's 0.05 is likely too low on good rock and too high on bad.

**4. MEDIUM — The strike pull, again.** `src/brain.js:133–135`: 0.9 for any held stone, stick or flake, every age. For fire it was
wrong because the world turned banging into fire. Here the physics is true, so the pull does not fake the result. But it is still
unsourced for adults, and apes differ: naive chimpanzees did "no percussive actions with a tool" in any trial (Bandini et al.
2021); orangutans hit walls and floor, not the core, and got no flake
([Motes-Rodrigo et al. 2022, summary](https://www.sci.news/biology/stone-tool-making-orangutans-10562.html)). First flakes in 24
of 24 worlds within about 93 hominin-days (`rates-map-on.txt`: 10.8 per 1,000) is capuchin-like, not ape-like. Do not change it
to get a flake rate; measure and source it (my fire review, finding 6).

**5. MEDIUM — All stones are one stone.** `src/items.js:71–72`: unsourced placement, no rock type, no mass; a flake uses up a whole
stone (`sim.js:1272`) though a core gives 5–9. The brain cannot tell a flake from a stone on the ground (`src/senses.js:435`), so
choosing good rock could never be learned unless quality can be seen. Gona knappers chose by rock type and grain
([Stout et al. 2005](https://doi.org/10.1016/j.jhevol.2004.10.006), percentages not reached); cobbles picked by outside look alone
were over 75% good to excellent (Toth et al. 2006, picked by experts). At Kanjera about 30% of the stone came 10 km or more
([Plummer & Bishop 2016](https://researchonline.ljmu.ac.uk/id/eprint/3115/3/Bishop_JAS_94_2016.pdf), after Braun et al. 2008);
durability mattered more than easy fracture (Braun et al. 2009, abstract).

**6. LOW — A flake adds pain 0.1** (`sim.js:1274`): an unregistered punishment. Source it (cut hands) or remove it.

**7. LOW — Numbers in the design not confirmed.** Hammerstones "0.2–3 kg": no assemblage figure found. Used in experiments: 0.5–1 kg
hammers, 0.8–1.5 kg cores (Bandini et al. 2021). Final cores: Gona 226 g, people 385 g, bonobos 687 g; flakes 18–31 g (Toth et al.
2006). Lomekwi cores of 1.8–4.7 kg, a 15 kg anvil
([single pieces](https://africanfossils.org/tools/LOM3_2012_H18_1); mean not reached). Force needed to start a fracture: not found.

## What a 15-minute step can and cannot hold

- **Can:** whether this rock fractures; whether the hammer is heavy enough for the core; flakes per bout as a draw; a core that
  runs out; which stones the hominin picks up, carries and bangs (the brain's part).
- **Cannot:** a single blow, a chosen platform, turning the core, hand-held against anvil technique.
- **Honest stand-in:** a bout is one whole episode with a yield drawn from a registered range; say so in the About tab.

## Recommended design (each one change, one switch, prediction written first)

1. **Cutting becomes an act** (`--old-flake-use`). A flake helps only on a step where the hominin strikes at the carcass with it
   in hand. No pull beyond the existing strike pull. Prediction: flake butchery firsts fall from 17/24 worlds; report the rate.
2. **Rock quality by place** (`--old-stones`). Good rock in river gravels and volcanic ground, poor elsewhere; shares registered
   as assumptions, both ends tested; quality visible to the senses as one input. Prediction: flakes cluster within one square of
   water, as Oldowan sites do near channel gravels.
3. **Yield by bout, no skill** (`--old-flaking`). Good rock: a bout gives k flakes, k from a registered range; poor rock: none;
   a core gives at most about 9 flakes, then is spent. Prediction: more flakes per bout than today, fewer places. With the old
   flag: identical to today to the last digit.
4. **Hammer and body** (with A27's growing bodies). Blow energy from hammer mass and the striker's speed by body size (3.7–7 m/s
   as the adult range); small children cannot flake. The threshold is an assumption until a fracture figure is found.
5. **Later, only if flakes get a size:** a motor skill moving yield and flake size from bonobo values toward Gona's.

## What would look right for the wrong reason (question 3)

- Flakes used because holding is using (finding 2).
- Flakes common because of an unsourced pull (finding 4), or rare because of unsourced stone placement.
- "Selection" of good rock that is only living beside rivers: compare struck stones with stones within reach.
- "Skill like Gona's" from a counter that was given Gona's ceiling.
- A tradition that is each generation finding it again: compare with copying off.

## What to measure against the record (question 4)

Stone-on-stone bouts per 1,000 steps with a stone in hand, by age; flakes per bout and per core (Gona 9.3 scars); share of flakes
ever picked up and ever used on a carcass; share of carcasses cut; good rock among struck stones against what is available (Gona);
distance from pick-up to flaking (Kanjera: 30% at 10 km or more, about 3 squares); whether use lasts across generations. The
record gives no flakes per hominin-year: sites are heaps built over unknown time, so report it but do not judge by it.

## Choices for the owner

**A. Skill.** (1) None now, yield by the world [recommended]. Cost: Gona's good workmanship is left out; say so. (2) A motor
counter now. Cost: an invented link, since flakes have no quality for it to change. (3) Finer actions. Cost: needs a shorter step.

**B. Flake use.** (1) Make cutting an act [recommended]. Cost: butchery may become rare; that is then a finding. (2) Leave holding
as using. Cost: tool use stays unearned.

**C. The strike pull.** (1) Measure by age and source before any change [recommended]. (2) Fade it with age now. Cost: an
unsourced curve.

**D. Rock shares.** (1) Assumed shares at both ends now [recommended]. (2) Wait for real geology per square. Cost: weeks, and the
map is too coarse (3 km squares) to carry it.
