# Design: making fire as nature allows it (backlog A41) — for review before building

Status: **draft for independent review**, 14 Nov 2026. Nothing below is built. Fire-making is off by default since entry 77, as a
placeholder labelled "not modelled yet" — a hidden switch, which the owner rejected as unnatural: "imagine yesterday I was not able
to make a bubble out of a setup and today I am, when everything is the same". In nature the same conditions give the same result;
what made fire late in human history was the world: materials, weather, a hard chain of steps, and no one to learn from.

## What the old mechanism did (and why it was wrong)

The strike action while holding a stick over a dry stick counted as "rubbing"; after 4 steady steps a 0.0004 chance a step, plus
0.6 × skill², the skill a counter outside the brain raised by practice and (formerly) by watching; a built-in "smoke" reward; the
pyrite path the same (`src/sim.js` about 1170–1215, 1494–1498). The inborn pull to bang what is in the hand filled it for free: fire
in 20 of 24 worlds (entry 75), about one invention per 1,000 hominin-life-years, against none known in some 10^10 real hominin-years
before about 400,000 years ago (Fable, `docs/reviews/2026-11-14-fable-fire-and-scale.md`).

## Evidence (14 Nov; mostly practitioners, to strengthen)

- An ember forms from wood dust at about 430 °C or more; finer char dust ignites lower; moisture in the wood cools it (practitioner
  measurements, e.g. primitiveways.com; not peer-reviewed). A skilled hand-drill maker gets an ember in under a minute; it needs a
  spindle, a hearth board with a notch to collect the dust, dry soft wood, then dry tinder and blowing to turn the ember into flame.
- Pyrite struck on flint throws 1 to about 10 sparks a strike; catching one in tinder depends strongly on the tinder (Sorensen et al.
  2018 *Sci Rep*; Sorensen 2024: manganese dioxide or pyrite powder in tinder helps). Pyrite weathers in humid air.
- Banging wood on wood does not reach ember heat (the motion is not sustained in one spot).

## The proposal: the physics decides, the brain must find the chain

1. **No skill counter for fire.** Remove `fsk` from fire-making (keep nothing hidden). Whether fire happens depends only on the
   world and on what the hominin's body does.
2. **Friction heat at a spot, kept across steps.** Rubbing stick on stick in the same square, step after step without stopping,
   builds heat in the wood dust there; each step it also loses heat (to air, more when the wood is damp — `stickDry`, humidity
   `HUM`, rain `RAIN`). An ember appears when the heat passes a threshold. Banging (a strike without sustained rubbing) adds almost no
   heat. The numbers (heat a step, loss a step, threshold) come from the evidence where it exists and are registered with ranges.
3. **What stands for technique?** The open question. A 15-minute "rub" cannot say whether the spindle was drilled fast in a notch
   or rubbed anyhow. Options: (a) every sustained rub is a plausible attempt, so success depends only on materials, dryness and time
   — the brain's part is choosing to keep rubbing on dry wood, in dry weather, with tinder at hand; (b) a motor-skill variable in the
   body, grown only by the hominin's own sustained rubbing (as nut cracking, entry 62, which the owner accepted), sourced from
   practice data; (c) new, finer actions (drill, blow). The risk of (b) is that it is the hidden counter again; of (a), that it makes
   fire too easy; of (c), many mechanisms at a time step too coarse.
4. **Ember to flame.** An ember dies within the step unless dry tinder (dry grass, `food` with high `dryness`) is in the square;
   blowing is not an action — either it is part of tending (a choice to stay, "stay" with an ember), or an ember in dry tinder in wind
   catches with a chance from weather.
5. **Sparks.** Pyrite struck on a hard stone throws sparks each strike (sourced count); a spark catches only in very dry, fine tinder,
   with a chance per spark (to source). No skill.
6. **Nothing rewards the outcome before it happens.** Remove the "smoke" bonus; smoke and heat are felt only as what they are.
7. **Switch:** `--fire-making` turns the natural physics on (default off until tested); `--old-fire-making` keeps the old rule for
   comparison.

## Test (after review)

Prediction first. 24 worlds × 100 days: fire-making rate per 1,000 hominin-life-years (rates tool) with its upper bound, against the
record (none known before about 400 ka); what hominins do (how often they rub sustainedly, on dry wood, with tinder). Every number at
both ends.

## Questions for the reviewer

1. Is any of options (a)–(c) faithful without scripting? Which, and why?
2. Which numbers can be sourced (heat, loss, threshold, spark catch), and where (fire science, experimental archaeology)?
3. Could the inborn pull to bang held objects still make this too easy, and is that pull itself sourced well enough?
4. What would make a result (fire happening, or never) look right for the wrong reason?
