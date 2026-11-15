# Design: staying alive — prey that flee, hunts that can fail (for review before building)

Status: **draft for independent review**, 15 Nov 2026. Nothing below is built. The owner (14 Nov): "I have a greater concern with the
number of animals and their instincts towards not living. In the real world everyone hides and runs; life is very important."

## What was measured (a measuring-only trace, 3 worlds × 10 days, the default world)

| Herd, nearest hunter | Stayed in place | Moved away | Moved closer/sideways | Died |
|---|---|---|---|---|
| same square | 96% | 4% | 0% | 1% |
| 1 square | 95% | 3% | 1% | 0% |
| 2 squares | 97% | 0% | 3% | 0% |

Hunters' attacks: 594, kills 279 — **47% success per 15-minute attack** (field: lions about 15% hunting alone, 30% in groups,
Serengeti; leopards 14–38%). No hominin was within 2 squares of a hunter in these runs (to measure in longer ones).

## Why (the code)

- Hominins have inborn pulls to flee: when a hunter is seen in a direction, a pull away from it and towards cover, and up a tree
  (`src/sim.js` about 415–433, scaled by fear and temperament).
- Plant-eaters have only an inborn **weight** in the starting network: "hunter seen in direction s → move the opposite way",
  `3 × SP.fl` (`src/brain.js` about 142–146), competing with every other drive; there is no pull outside the network, and a hunter
  in the **same square** is not seen in any direction, so nothing pushes a herd away from a leopard standing among it.
- An attack succeeds with a fixed chance (0.6, or 0.9 on a sleeper or a young one) × size odds, each 15 minutes, whether or not the
  prey is watching (`src/sim.js`, the A_ATK branch).

## Evidence (to strengthen)

- Prey detect predators and flee at a distance that grows with the danger; impala watch longest those predators that catch them most
  (a model-predator study); vigilance and flight are partly inborn, partly learned (predator-naive populations lose and regain fear
  quickly, e.g. moose and wolves: Berger et al. 2001).
- Most hunts fail, chiefly because the prey detects the hunter before it is close: lions in the Serengeti 37 kills in 249 solitary
  hunts and 82 in 273 group hunts (Schaller 1972, via a review); leopards 14–38%, worse by day (Bertram: 3 of 64 by day).
- Primates flee to trees and give alarm calls (vervets: Seyfarth, Cheney & Marler 1980).

## Proposal (three changes, each with a switch and a prediction)

1. **An inborn pull to flee for plant-eaters**, of the same kind hominins have: away from a hunter seen in a direction, growing with
   how near and how clear it is; a hunter in the same square is felt as the closest danger of all (it can be seen, smelled, heard).
   A pull, not a command: the brain can still learn when to ignore it (a sated lion lying in the grass). Strength from the inborn
   weights already there (no new number) — or sourced from flight distances if found.
2. **A hunt that can be detected.** An attack on a prey that is awake and not already fleeing is detected with a chance that grows
   with how alert it is (vigilance: lower while grazing with its head down, higher in a bigger herd — many eyes), and a detected
   attack fails; the success of an undetected attack stays as now. The aim is that overall success comes out near the field rates
   because of detection and flight, not because it is set there. Numbers: vigilance shares from field studies (impala, gazelle); the
   rest registered at both ends.
3. **Hominins measured** in longer runs: how often they move away, climb or stay with a hunter near; whether their pulls work.

## Questions for the reviewer

1. Is an inborn flight pull for plant-eaters faithful, and how strong should it be without tuning toward survival? What sources give
   flight initiation distances or flight probabilities for impala, gazelle, buffalo against leopards, lions, hyenas?
2. Is "detection makes an attack fail" faithful at a 15-minute step, and what would make success rates come out right for the wrong
   reason?
3. What about hominins: are their pulls enough, and what evidence on early hominin anti-predator behaviour (trees, groups, stones) should
   shape a test?
4. The owner's concern is that creatures do not value life enough. Is anything else missing (alarm calls among prey, group vigilance,
   avoiding places where hunters were, hiding the young)?
