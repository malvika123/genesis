# The big picture: realism, eureka, craft, and whether to go on

Independent review by Fable, 16 Nov 2026, branch `percept`. Read: `CLAUDE.md`, the plan, findings 54–84, the backlog, the
staying-alive design, and parts of `src/config.js`, `brain.js`, `sim.js`. Four web searches. Nothing in `src/` was changed.
Where I say "not checked", I did not open the source myself.

## Summary

- **The method is the best thing here.** Predictions written first, a switch for every change, honest nulls (entries 58, 62, 84),
  rates per hominin-year (77). That is rarer than a clever model, and it is yours.
- **The world around the hominins is getting faithful; the hominins' own experience is not yet.** Predation (1.3–3.6% a year) and
  meat (chimpanzee range) now match the field. But a hominin's life is about 11,500 decisions, its world is cut into 3 km squares,
  and its senses arrive already labelled "food" and "danger". Those three shape what it can learn more than any missing animal.
- **Eureka is not close, and the log says so honestly.** Flakes are made by accident and almost never used. That happens to match
  what monkeys and untrained chimpanzees really do.
- **Craft is not possible yet**: one hand, five kinds of thing, identical stones, and outcomes decided by a table in the code.
- **Recommendation: continue, but narrow and time-boxed** — about three months, three milestones, written stop rules. Two weeks
  (entries 63–84) went to hunters' meals; the hominin mind has not been touched since entry 62.

## 1. Realism: the gaps, ranked by how much they bend what a hominin lives and learns

**1. The clock (largest).** A year is 3 days of 96 steps: 288 decisions a year, about 11,500 in a 40-year life. A real ape gets
roughly 122 times more (backlog A40). The body eats on the day clock but ages on the year clock, so a child has about 1,400
steps of childhood in which to learn everything; a season lasts 72 steps. Every learning result (entries 54–62) carries this.
*What it takes:* not one clock for everything. Keep the squeezed year for questions about generations; add a **life-scale run**
(a real year, 35,040 steps) for questions about learning. By the project's own figure of 40–60 ms a step, a 10-year childhood is
some hours per world: feasible overnight for 4–8 worlds at 4 workers, not for 24 worlds × generations. A40's 12-day year is the
cheap first test.

**2. The 3 km square and the 15-minute step.** What matters to an ape happens inside one square and one step: an escape, a stalk,
the tree 30 m away, who sits beside whom, a hand-to-hand gift, each blow of a stone. Entry 84 met this wall directly. A band's real
range (about 63 km²) is seven squares of a 90,000 km² planet. *What it takes:* the rebuild the plan already names — one basin,
squares of 100–300 m, same number of squares, so the same cost. It is feasible on the laptop, but it is weeks of work and it
means giving up the globe. This is the biggest owner's decision in this review.

**3. Senses that come labelled.** Each direction reports "food", "danger", "predator", "mate", "family", "nuts" (`config.js`, 16
channels). The world tells the creature what a thing *is*; real animals must learn that. There is no smell (A45), and no way to
tell one band-mate from another beyond "person/family/mate" — so rank, friendship and paying back a favour cannot be learned at
all. *What it takes:* smell is easy. Identity is hard for a small network; a faithful half-step is a few inputs about the nearest
other (how familiar, how it treated me last). The `RETINA` experiment shows unlabelled sight was tried; it is the honest direction
but costly.

**4. The action set and the single hand.** 19 actions; one hand holding one of five kinds of thing. What a strike *does* is decided
by a table in `sim.js` (stone + nut → cracked; stone + stone → flake; flake + carcass → cut). Honest, but shallow: the creature can
only find what the builder already wrote. See section 3.

**5. One band, alone.** No neighbours means no females moving in or out (R14), no fear of strangers, and extinction by bad luck.
Many "collapses" are simply what one group of 25 does. Three bands of about 30 cost about what one costs now, on a smaller world.

**6. The brain.** At most 64 thinking units, 8 memory units, an actor-critic rule with credit fading by 0.78 a step (γ 0.97 × λ 0.8):
after six steps 22% is left. It can learn "see → do" and short chains. It has no goals and no map. I rank it sixth, not first,
because today the world offers nothing longer than it can learn. That will change the moment craft exists.

**7. The herd as one agent, and the hunters.** After entries 66–83 this is the *least* distorting item: encounter and predation
rates match the field. I would stop here on hunters, except for section 5.

Cheap and missing: the hungry season (R1), which shaped real hominins and needs only that fruit follows rain.

## 2. Eureka: how close?

**What the log shows.** Easy skills (nuts, digging) are found alone by nearly everyone; watching adds nothing once you count who
had the means (entry 58, your strongest result). Per 1,000 hominin-life-years: flakes 21–44, cutting meat with a stone 1.8–3.7,
keeping or making fire 0 (entries 77, 83). So a band of 20 sees a first cut about every 15–25 years, and nothing shows it is
repeated or passed on. The log counts *firsts*, not *repeats* — that is the missing measurement.

**Against the record.** Wild capuchins knock sharp flakes off stones by accident and never use them (Proffitt et al. 2016). Naive
chimpanzees given stones and a reason did not make or use flakes at all (Bandini, Motes-Rodrigo et al. 2021). So "flakes by
accident, almost never used" is roughly what a faithful ape-brained creature should do. Genesis is where monkeys are, not where
Gona's knappers were. The real step — seeing that the sharp thing cuts, and making one *on purpose* — is exactly what nobody
knows how to model, and what the 2.6 Ma record itself does not explain.

**What could faithfully give a real discovery.** (a) Count repeats: does one hominin cut again, sooner, after its first reward?
(b) Make the skill hard by physics, not by a chance (A27, A43): a blow at the wrong angle gives nothing. (c) Give the young real
time beside a skilled mother (the life-scale clock). (d) Then entry 58's test again.

**A false eureka would be:** a "first" logged when a random strike meets a rule; any behaviour with an inborn weight or built-in
reward behind it (the old fire links); a rate that appears after a number was moved; "spread" measured by being in the same
place; a headline from fewer than 24 worlds.

## 3. Play and craft

**Play exists, thinly.** A well-fed, unafraid youngster near its own kind gets a small built-in reward for moving, picking up or
striking (`sim.js` about 690–705). That is a fair inborn pull. But there is little to play *with*.

**What craft needs and Genesis lacks:**
- **Things that are individuals.** Stones are a count per square, all alike. Craft needs *this* stone, with mass, hardness and an
  edge that change when struck.
- **Combining.** Only two combinations exist (stone on stone, stick in fire). No hafting, no anvil, no holding one thing while
  working another: there is one hand.
- **Shaping by degrees.** A flake is made or not; nothing gets better with work.
- **Keeping.** No place of one's own, no carrying more than one thing (A46 is a good start).
- **Feeling the result.** The hand reports what kind of thing it holds, not how sharp or heavy.
- **Time.** A bout of work is many blows over minutes; a step is 15 minutes.

**Can the network learn chains?** Short ones, yes — take a stone, walk to nuts, strike is learned. Chains with several unrewarded
steps (carry a stone a kilometre, knap, cut) are at the edge of a 0.78-per-step trace, and backward replay showed no effect
(entry 51). Nobody has measured the limit. **Measure it before building craft:** a bare test world with chains of 2, 3, 4, 5
steps and reward only at the end; how many lifetimes of steps does each need? It is a day's work and it decides whether the
brain or the world is the limit.

## 4. Potential, and the decision

**Scientific potential, honestly.** As evidence about real hominin evolution: low. Too many stand-ins, one author, compressed
scales; a specialist would not accept a Genesis result as a finding about 2.5 Ma. As a *method demonstration* and an open,
explorable teaching world with an honest research log: real and unusual. Entry 58 and the band-size write-up could be shared as
they are.

**Personal potential.** High, if it still gives you joy. The risk is plain in the log: a realism audit never ends. Each fix
uncovers the next (entries 63–84), the backlog grows faster than it closes, and "mini copies, then do something" has no finishing
line as written. A project with no line cannot succeed; it can only stop.

**Recommendation: continue, narrowed, for about three months, then decide again.** Narrow means: one basin, not a planet; park
skin colour, ice sheets, Paranthropus, crocodiles; stop refining hunters after section 5.

- **Milestone 1 (about 3 weeks) — the faithful day.** Freeze a table of about 12 field numbers (activity budget, day range,
  diet shares, meat a day, predation, birth spacing, infant survival, lifespan; entry 42 is the seed). Pass: 9 of 12 inside the
  field range in 24 worlds, with nothing tuned. Then call the hominins "faithful enough" *and stop auditing*.
- **Milestone 2 (about 6 weeks) — can they learn at all?** The chain probe, and one life-scale run. Pass: a 3-step chain learned
  within one real-length childhood.
- **Milestone 3 (about 3 months) — one hard skill.** Cutting with a flake, made hard by physics: repeat use rises within a
  hominin, and the young of skilled mothers start sooner than controls with the means counted.

**Stop if:** milestone 2 fails and you do not want a different brain; milestone 3 is null on both clocks (write it up — "ape
brains do not knap" is a faithful result, and a respectable place to end); a month passes with no measure of hominin *behaviour*
changing; or it stops being a pleasure.

## 5. The staying-alive design: a hunt that can be detected

**Yes, it is the faithful next step, and the unit is right:** a real stalk and rush fits inside 15 minutes, so one attack act is
one whole hunt, comparable with field rates per hunt.

**Three cautions.**
1. *Detection × success is two numbers whose product can be set to anything.* Source both separately, write the predicted overall
   rate first, and accept what comes out — even if it is not 15–30%.
2. *A failed hunt must leave the herd alert.* Today a hunter can attack again 15 minutes later; then detection only delays the
   kill. Judge the change by **kills per hunter per day against its need** and hunts per kill, not by success per attack.
3. *Tie vigilance to what the prey is already doing* — head down eating, asleep, or looking — not to a new dial. That gives the real
   trade of food against safety with no new number.

**Numbers that can be sourced.** Lions: Schaller 1972 (already used); Elliott, Cowan & Holling 1977 split the hunt into search,
stalk, attack and subdue (the paper exists; its figures not checked); Stander 1992 by group size (not checked). Vigilance:
FitzGibbon 1989 — cheetahs chased the least watchful gazelle in 14 of 16 chases (checked); FitzGibbon 1990 on bigger and mixed
groups detecting sooner; impala scanning shares (Hunter & Skinner 1998, not checked). Entry 84 itself is weak (2–3 worlds, 10
days): repeat it at 24 before building on it.

Housekeeping: `sim.js` cites an "entry 85" (digging as an act) that I could not find in `FINDINGS.md`.

## Choices for the owner

| # | Choice | My recommendation |
|---|---|---|
| 1 | Continue / narrow / close | **Narrow and continue for three months**, with the milestones and stop rules above |
| 2 | Planet of 3 km squares, or one basin of 100–300 m squares | **One basin.** The largest gain in faithfulness per week of work; decide before more is built on the big grid |
| 3 | One clock, or a second life-scale clock for learning | **Add the life-scale run**; test A40 (12-day year) first |
| 4 | Keep auditing, or freeze at a "faithful day" table | **Freeze** at milestone 1 |
| 5 | Build craft now, or measure chain learning first | **Measure first** (one day) |
| 6 | Count firsts, or repeats | **Repeats**, from now on, for every discovery |
| 7 | Detectable hunts | **Build**, with the three cautions; then leave hunters alone |
| 8 | Leaving out for now: globe, ice, pigment, Paranthropus, crocodiles, friction fire | Yours to decide; I would park all six |

Sources checked in this review: Proffitt et al. 2016 (capuchin flakes, via Scientific American); Bandini, Motes-Rodrigo et al.
2021, *Open Research Europe* ("Naïve, unenculturated chimpanzees fail to make and use flaked stone tools"); FitzGibbon 1989,
*Animal Behaviour* 37: 508–510; Elliott 1975 thesis / Elliott, Cowan & Holling 1977 (existence only).
