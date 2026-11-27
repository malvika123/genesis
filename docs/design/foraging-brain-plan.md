# Why the people starve, and a plan for the brain (27 Nov 2026)

**Owner (27 Nov):** "then we need better brain for them ... a brain that evolves", and "when hunger is bad they have to eat anything they find."

## What was ruled out (entries 156-178, each with its prediction written first)
- The berry rule (fixed, entries 155-156), too little food nearby (166), one-slot memory (167-168: small gain), no urge to eat when starving (173), digging success (175), the band's size and crowding (177-178), injury or illness (174), too little eaten early (172).
- Starvation is a pure feeding failure in a healthy body: 8-9 energy points a day for about 10 days with no cushion, movement falling, 12% of steps spent trying to eat (mostly leaves, meat, nuts, rarely roots).
- The target (entry 165): wild chimpanzee adults lose 4-7% a year; our band loses more than half in 330 days.

## What is left
The brain's own use of its senses and learning. A newborn mammal does not need to learn that food in sight is to be walked to and eaten; the reflexes (docs: `RF` pulls) are meant to do that, with learning on top. Candidates, to be measured one at a time, prediction first:
1. **Does foraging improve with experience?** Intake per day and the share of low-energy steps spent eating on food, by person and by month, in a 330-day run. If it does not improve over months, the brain is not learning foraging.
2. **Credit over a long walk.** Learning uses a discount of 0.97 per step and eligibility 0.8 (`GAM`, `LAM`, `src/config.js`), so a reward is credited to choices about 30 steps back (about 8 hours at the sim's step); a walk to a food patch beyond that is learned poorly. Test by raising `GAM` to 0.99 (a registered assumption).
3. **The inborn reflex toward seen food.** `seek` in `src/sim.js` pulls toward food seen in a direction only when nothing is under the feet; check how strong it is against the pulls it competes with, and that roots (barely visible: 0.6 x ROOT) and leaves are seen at all.
4. **Fat as a buffer** (the store is one flat 0-100 number): a body-fat reserve laid down in good seasons.
5. **An evolving brain over generations**, which needs a band that lasts: later.

Not to do: more levers on the supply side; each of those was tested and gave nothing.
