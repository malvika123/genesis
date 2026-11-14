# Design: making stone flakes as the stone allows (backlog A27, Oldowan toolmaking) — for review before building

Status: **draft for independent review**, 14 Nov 2026. Nothing below is built.

## Why

Oldowan stone tools (from about 2.6 Ma, Gona, Ledi-Geraru, Lomekwi earlier at 3.3 Ma) are the main evidence of what hominins of this
time did. Today Genesis makes a flake with a fixed chance (`SOC.flakeP` 0.05) whenever a hominin strikes a stone held in the hand on a
stone lying in the square (`src/sim.js`, the strike branch, `a.hand === 1 && stone[i] > 0 && rnd() < SOC.flakeP`) — an invented
number, the same for every stone and every hand. The owner's rule: the world decides (materials, shape, force), not a switch.

## Evidence (14 Nov; to strengthen)

- Conchoidal fracture needs a fine-grained, brittle, isotropic rock (chert, obsidian, fine lavas, quartzite; coarse or weathered rock
  crumbles) and an edge whose angle is under about 90° where it is struck; flake size falls as the angle of blow rises (Dibble & Rezek
  2009; Li et al. 2022).
- Wild bearded capuchins break sharp, conchoidal flakes from quartzite cobbles by accident while pounding stone on stone, often several
  from one rock, and ignore them (Proffitt et al. 2016, *Nature*): flakes do not need intent.
- Captive bonobos taught to knap (Kanzi; Toth, Schick and colleagues) made flakes, mostly lacking the features of hominin flakes.
- Human novices: about 0.38 usable flakes per strike (Putt 2015); skill shows in acute platform angles, fewer battering scars, more
  parallel-sided flakes (Toth et al. 2006; Stout et al. 2009).
- Hammerstones in Oldowan assemblages: about 0.2–3 kg (backlog note, to check); the force of a blow follows the hammer's mass and speed.

## Proposal

1. **Stones with properties.** Each stone lying in a square has a rock quality (fracture: good, poor, none — from the land's geology
   where it can be sourced, otherwise registered shares) and a mass; a cobble's edges vary (a share of its surface offers an angle under
   90°, to source).
2. **A strike (15 minutes of pounding) with a stone in hand on a stone on the ground** removes flakes as the physics allows: none if the
   rock does not fracture conchoidally or the hammer is too light for the target; otherwise a number of flakes from the chance that blows
   land on a suitable edge with enough force. The step is a bout of many blows (a 15-minute bout cannot resolve a single blow).
3. **What stands for skill?** Options, as for fire: (a) no skill — a bout gives flakes at the accidental rate of untrained pounding
   (capuchins), the brain's part being the choice to pound good stone on good stone; (b) a body (motor) skill grown only by own pounding,
   raising flakes per bout from the accidental rate towards the novice and expert rates (as nut cracking, entry 62); (c) finer actions
   (choose a platform, aim). The accidental rate (capuchins) and the novice rate (people) can perhaps be sourced; the expert ceiling too.
4. **Flakes are what they are.** A flake cuts meat faster (`SOC.cutFlake`), as now. Nothing tells anyone flakes are useful; nothing
   rewards making them.
5. **Switch:** `--old-flaking` restores today's fixed 0.05.

## Questions for the reviewer

1. Is option (a), (b) or (c) faithful at a 15-minute step? Which numbers can be sourced (capuchin flakes per pounding bout; novice and
   expert flakes per strike; rock-quality shares in East African river cobbles; hammer mass and force needed)?
2. Does the inborn pull to bang held objects (`src/brain.js`, Hands) make flaking too easy, as it did fire?
3. What would make a result (flakes common or rare; tools used or not) look right for the wrong reason?
4. What should be measured against the record (e.g. flakes per hominin-year; cut-marked bones; use of flakes at carcasses)?
