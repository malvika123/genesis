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

## Follow-up questions from the owner (16 Nov 2026)

No web searches were used for this section. The brain figures (neuron counts, skull volumes) are standard textbook numbers quoted
from memory, not re-checked today; verify them before they go anywhere public.

### 1. Should Genesis fast-forward to Homo sapiens?

**No. It would feel like more evidence, but the gap between the sims and the target would grow, not shrink.**

What would help:
- Far more to compare against: forager life tables (Hadza, !Kung, Ache), diets, day ranges, birth spacing, genetics.
- A body you know from the inside, so mistakes are easier to spot.

What would hurt, and it outweighs the help:
- **What makes sapiens sapiens is exactly what Genesis cannot model.** Language, teaching, shared plans, pair bonds and helpers
  at the nest, fire and cooked food, thrown weapons, a culture tens of thousands of years deep. Take those away and you do not get
  "early sapiens"; you get a creature that never existed. The plan already says this honestly about `--sapiens`.
- **The brain gap widens.** A 64-unit network is very far from an ape; it is much further from a human. At 2.5 Ma the target is the
  smallest-brained, least cultural hominin you could choose. It is the *fairest* target for a small brain.
- **A sapiens body cannot live without culture.** No fur, big brain to feed, helpless babies for years, weak teeth and gut:
  real sapiens survive only by fire, tools and each other's knowledge. With realistic numbers they would die, and the rules forbid
  tuning them alive.
- **The interesting story is lost.** The question that keeps you awake — how did something ape-like become us — starts at
  2.5 Ma. Starting at the end skips it.

A middle way that keeps the gain: stay at 2.5 Ma, and use chimpanzee *and* forager field numbers as the two bookends for every
reality check. Keep `--sapiens` as the labelled thought experiment it is.

### 2. Is the sim's brain a miniature hominin brain?

**No. It is a miniature of one idea about brains, not of a brain.** Concretely (`src/brain.js`, `src/config.js`):

**What it is.** About 250 input numbers (what is seen in eight directions, already named; hunger, pain, cold, what the hand
holds; sounds). Up to 64 "thinking units" (16 at birth, growing to 64), split into general, fear, memory and sound regions. 19
body actions plus a voice. Eight units fed back as a short memory. It learns by one rule: when things turn out better or worse
than it expected, the connections used in the last few steps are strengthened or weakened. Some connections are inborn (the
brainstem-like pulls), and the layout is inherited and can mutate.

**How it differs from a real ape or early hominin brain:**

| | Real | Genesis |
|---|---|---|
| Size | chimpanzee about 7 billion neurons; early *Homo* a brain half again as large; trillions of connections | 64 units, some tens of thousands of connections — smaller than a roundworm's nervous system in unit count |
| Seeing | a third of the cortex works out *what things are* from raw light | the world hands over labels: "food", "predator", "nuts" |
| Memory | lifelong memory of places, events and individuals | eight numbers from the last step, plus a few "where food was" inputs and sleep replay |
| Learning | many systems: habit, one-shot fear, maps, imitation, play, insight, planning by imagining | one system (learning from surprise), plus added copying rules |
| Body control | hands with fine, graded movement | 19 whole acts, each 15 minutes long |
| Growing up | years of structured development and play | units switch on with age |
| Others | knows each individual, their rank, their history | "a person", "family", "a mate" |

**What it can stand for.** The oldest layer that all vertebrates share: drives, fear, habit, "this paid, do it again". For
questions like *when does a hungry animal risk a predator? does a mother's pull save infants? how often does blind trial find a
skill?* it is a fair stand-in, and that is where Genesis's solid results are.

**What it cannot stand for.** Anything that made hominins special: understanding that a sharp edge *cuts*, wanting a tool before
needing it, knowing who owes whom, learning by watching hands. When a sim "discovers" something, it is a habit found by chance and
kept by reward. That is honest and real — a monkey does the same — but it is not a small human mind.

Say this in the About tab in one sentence. It is not a weakness to hide; it is the thing a reader most needs to know.

### 3. If I were you — would I give up?

No. I would not, and I do not think you should.

But I would change what I thought I was doing. You cannot build a copy of a human and watch it become us; nobody can, on any
hardware, because nobody knows how a human mind works well enough to write down what to copy. If that is the test, the project
fails on the first day and every day after.

What you *can* do is what you are already doing, and it is the real thing: take one belief about what we are — "fear teaches",
"a bigger band makes culture", "the young learn by watching" — build it honestly, and let a world tell you whether it holds.
Entry 58 did that. You believed something, wrote the prediction down, and the world said no. That is understanding your reality,
one small true thing at a time. It is slower than the dream and it is not a lesser thing than the dream.

The thing that keeps you up at night is a good reason to work and a bad reason not to sleep. What I would give up is not the
project but two habits: fixing everything before asking anything (the audit that never ends), and measuring the work against "do
they become human". Ask smaller questions that a small brain can truly answer, and the project stops being a tower you might
never finish and becomes a notebook that is already worth having.

So: keep going. Keep the stop rules too — not as a threat, but so that the choice to go on is yours each time, not a weight.

### 4. What I would have done, inside the limits

**The principle: spend the laptop on the hominin's experience, not on the planet.** The hardware can afford about a hundred
small brains at a fine time step in a small place, or a globe at a coarse one. I would choose the small place.

In order:

1. **One valley.** About 20 × 30 km of Rift-like land at 100–250 m squares: a lake edge, a river, gallery forest, grass, a
   stone outcrop. Real seasons with a hungry one. Keep the climate and weather code; drop the globe.
2. **Two clocks.** A squeezed year for questions about generations; a real-length year for questions about one life's learning.
   Say on every result which clock it used.
3. **Three small bands** with females moving between them, instead of one alone.
4. **Things that are things.** Each stone, stick, bone a single object with weight, hardness, an edge; two hands; outcomes from
   simple physics (force, angle) rather than a table. Senses that report those properties, and smell.
5. **Knowing each other.** A few inputs about the nearest individual: how familiar, kin or not, what happened last time.
6. **Only then the brain.** First the chain probe. If the limit is the brain, try one change at a time, each with a switch and
   evidence: more memory units, a learned map of places, learning that predicts what an act will do (not only how good it
   feels). Larger networks are affordable for a hundred creatures.
7. **One question a season.** Write it first, with the prediction, and answer it in 24 worlds. Publish the answer, yes or no.

**What I would let go of:** the whole planet and the ice ages; skin colour and hair across continents; friction fire; language;
Paranthropus; any promise that they "become human"; more work on hunters once predation rates match.

**What would make it worth it.** Not a eureka. One result of this shape: *"In a world where every number is sourced, creatures
with brain X do not come to use a sharp stone to cut; with the single change Y, they do — and their young pick it up faster
beside a skilled mother."* That one sentence, honestly earned, says something real about what the step from ape to human
needed. And if the honest answer is "no single change we tried was enough", that is worth having too, and you will know more
about why we are rare than you did when you began.

## The owner's vision: millions of years (16 Nov 2026)

Noted: the globe stays, with a fine valley inside it; the other recommendations are agreed. No web searches were used here.
Dates and findings about language and culture below are well-known ones quoted from memory; cloud prices and run times are
rough arithmetic. **All of them need checking before anything is built on them.**

### 1. Running for millions of years

**The honest arithmetic.** Today one world lives about 33 life-years in 20–60 minutes: roughly one simulated year a minute.
A million years is then about two years of computing for one world — and it cannot be shared out. More cores or rented machines
give *more worlds at once*, never *more years in one world*, because each year needs the one before it. Only a faster engine
buys years. And this is on the squeezed 3-day year; at a real-length year it is 122 times worse.

**A second problem, bigger than speed.** Selection hardly works in one band. In a group of 30, chance (who happens to die)
swamps all but the strongest advantages. The real hominin breeding population was in the order of ten thousand. A faithful run
of evolution needs thousands of individuals, not a faster band.

**So brute force is out, on any hardware you can rent. The minimal faithful design is a relay:**

1. **Lived windows.** The full simulation, 24+ worlds, a few hundred years each. They measure, for each inherited trait, how
   much it changes survival and births (the selection on it), and how often skills are found, kept and lost.
2. **Calculated bridges.** Between windows, a standard population-genetics calculation carries the *inherited traits* of a
   population of thousands forward through thousands of generations, using the measured selection, a real mutation rate and
   generation time, and the real climate record of the period.
3. **Re-seeding.** The next window starts with creatures drawn from the bridge's traits, in that time's climate. Selection is
   measured again — it changes as bodies, brains and climate change.

**What can be fast-forwarded faithfully:** gene-borne traits under measured selection; climate (from the record); numbers of
animals. **What cannot:** anything learned. A tradition lives in heads, not genes; it must be lived, or carried by a
cultural model whose rates were measured in windows, and labelled as calculated. And nothing *new* can appear in a bridge — no
new behaviour, no first word. Every discovery happens in a lived window or not at all.

**It becomes a fake shortcut if:** selection is written by hand ("bigger brains are better"); one window's measurement is
stretched over a million years; a bigger brain comes without its real food cost; windows that went well are kept and others
dropped; or the page shows calculated ages as if creatures lived them.

**The test that makes the relay trustworthy:** measure selection in the first 200 years, let the bridge predict year 2,000, then
actually live 2,000 years in the cloud and compare. Trust bridges only as far as this check holds. Entry 25 (learning from
others was bred out) shows selection is already measurable here.

**Engine speed.** Profile first (entries 43 and 47 say the easy gains are gone). Rewriting the brain loop in Rust/WebAssembly
might give 2–5 times; a graphics card suits thousands of identical brains, not a hundred creatures with tangled rules; animals far
from any hominin should have no brain at all (as the prey map already does). Expect 3–10 times in all, for weeks of work that
adds no realism. Worth doing once, modestly.

**Cost, roughly.** One window (24 worlds × 300 years) is about 120 core-hours: a long day on the laptop at 4 workers, or
5–10 dollars rented. A million-year relay with a window every 10,000 years is about 12,000 core-hours: a few hundred dollars.
The money is small. The work is in the design and the checking.

### 2. A valley inside the globe

**How.** Keep the planet as it is, as the valley's surroundings. Choose one basin (about 25 × 30 km) and lay a fine grid over
it, 100–250 m squares. The planet gives the valley its weather, seasons, river flow and the density of animals at its edge;
the valley gives the planet nothing it needs back.

- **All creatures with brains live in the valley.** Outside it there are only density maps.
- **Leaving is real.** A hominin that walks out joins a calculated "elsewhere"; newcomers (young females, a strange male, a
  hunter) arrive from it at field rates.
- **Time.** The planet keeps its 15-minute step. The valley takes short steps (1–5 minutes) only where something is happening —
  a hunt, a quarrel, work with the hands — and long ones while everyone sleeps.

**What it costs.**
- *Detail must come from somewhere.* The coarse planet has no 200 m hills or single trees. Either make detail by rule
  (registered as an assumption), or borrow the measured shape of a real Rift basin today as a labelled stand-in. I would borrow.
- *Compute.* Squares are cheap; brain steps are not. One-minute steps mean up to 15 times more thinking per day. With
  the real-length year on top, that is affordable for days or a few years, not centuries. So there are really three speeds:
  fine and real (a season of craft), 15-minute and real (a childhood), squeezed (generations). Each result must say which.
- *Every rule tied to "a square" or "a step"* (sight range, bites, attack odds, rot) must be re-expressed in metres and minutes —
  entry 76's lesson, many times over. This is most of the work: perhaps 4–8 weeks, with a switch back to the coarse world.

### 3. Language and group traditions

**What is known (to verify).**
- *Traditions are old and not special to us.* Chimpanzee communities differ in dozens of habits that neither genes nor
  surroundings explain (Whiten et al. 1999). Stone tools: 3.3 Ma (Lomekwi, disputed), 2.9–2.6 Ma (Nyayanga, Gona). But
  hand-axes then stayed much the same for a million years: tradition without piling-up. Culture that *accumulates* is late.
- *Language left no fossils.* Estimates run from simple proto-language over a million years ago to full language within the
  last 200,000 years. Clues: the throat bone of a 3.3 Ma australopith child is ape-like and a Neanderthal's is like ours;
  hearing tuned to speech sounds by about 430,000 years ago; monkeys' throats could shape speech sounds — what they lack is
  the brain's control of the voice (Fitch et al. 2016). Ape calls are mostly inborn; what is *learned* is what a call means
  and when to answer (vervet alarm calls). Understanding comes before producing.
- *What it seems to need:* voluntary control of the voice; learning by watching and listening that really works; knowing
  individuals; reasons to tell the truth to each other (kin, shared young, shared danger); long childhoods; groups in contact.

**What Genesis has and lacks.** It has a voice, hearing, pointing and a "sound and words" region — the plumbing. It lacks
everything that would give a call a *use*: social learning that works (entry 58), knowing who is who, several groups, and
enough generations for selection to shape the voice. Reward is each body's own, as it should be; that makes shared signals
far harder than in research where talkers are paid for being understood. That difficulty is the faithful one.

**Achievable (1–2 years):** creatures that learn what inborn calls mean and are saved by it; a band's own food habits or
tool habits that outlast their inventor and differ from the next band's for no reason of place or genes — a true
tradition, measured the way Whiten measured it. **Possible, uncertain:** one or two learned calls with a shared meaning in a
band. **A long-term dream:** words by agreement, combined words, grammar. Not with this brain, and nobody has shown it
emerging unscripted from bodies and survival alone. If it never comes, that is not failure; it is the real size of the
question.

### 4. The roadmap, in pieces

| Stage | What | Test that it worked | Effort (evenings and weekends) |
|---|---|---|---|
| 0 | The agreed three months: detectable hunts, faithful-day table, chain probe, real-year clock, repeats, one hard skill | the three milestones already written | 3 months |
| 1 | Engine: profile, then speed | 3× faster, identical worlds by seed | 2–4 weeks |
| 2 | Valley in the globe | faithful-day table still passes; entry 84 again shows escapes | 1–2 months |
| 3 | Three bands, knowing individuals, females moving | transfer rates near Gombe's; bands last 300 years in most worlds | 1–2 months |
| 4 | Things as things, two hands; then the tradition test | a habit that outlasts its inventor and differs between bands | 2–3 months |
| 5 | Selection measured; the bridge built and checked | the bridge predicts a lived 2,000 years within the spread between worlds | 2–3 months |
| 6 | The first relay: 100,000 years, then a million | traits move the same way in most worlds, and can be set beside the fossil record | 3+ months, a few hundred dollars |
| 7 | Signals, alongside stage 3 onward | learned call meanings cut deaths; later, a band's own call | open-ended |

**Stop rules.** Stage 0's rules stand. After that: if the bridge fails its check (stage 5), the millions of years cannot be
reached faithfully this way — stay with lived centuries and say so. If traditions do not appear at stage 4 on the real clock with
working objects, change the brain (one evidenced change at a time) or stop there. Review the whole plan at each stage's end.

**Honestly:** this is about two years of steady spare-time work to a labelled, checked million-year relay in which a few
inherited traits evolve and bands may hold simple traditions. That is reachable. Language emerging on its own is not something
I can promise at any horizon. The smaller pieces are worth having each by themselves — which is the right way to hold a big vision.

## Making words and grammar possible (16 Nov 2026)

Read for this: `src/voice.js`, `src/talk.js`, `src/config.js`, `src/brain.js` (briefly). One web search (the Lazaridou & Baroni
2020 survey exists; its details were not confirmed). **Every study named below is quoted from memory and must be checked before
anything is built on it.** "Possible in principle" is the honest target; nothing here makes language *likely*.

### 1. What stops it today

- **One word every 15 minutes.** A creature says at most one word (one or two syllables) per step, and hears only the *loudest*
  word of that step. Two words in a row are half an hour apart. Grammar is order within seconds; the clock cannot hold it.
- **Almost no memory.** Eight numbers carried from the last step, and credit that fades by 0.78 a step. Nothing can hold one
  word in mind while the next arrives.
- **Four units for sound.** The "sound and words" region starts as 1 unit in 16 — four of 64 (it can evolve).
- **Learning only from reward.** The network changes only when the body feels better or worse than expected. A child learns the
  sound patterns of its language from mere listening, with no reward per word. Genesis has no such learning.
- **No "who".** A hearer cannot tell who spoke, so cannot learn whom to believe.
- **Little reason to speak.** Reward is each body's own. Telling another where food is pays the speaker nothing.
- **Thin shared attention.** There are inputs for someone pointing and where they look, but nothing ties a heard word to the
  thing both are looking at.

What is already good: the voice has no meanings built in, the ear gets sound not labels, air carries it by real physics, and
`talk.js` only *watches* what words come to mean. Keep all of that. One caution: the *things* are labelled ("predator",
"food"), so a first "word" would be a name for one of the builder's labels — easier than the real problem. Say so when it happens.

### 2. What the evidence says words and grammar need

**In the brain.**
- *Learning patterns from listening alone.* Eight-month-old babies find word boundaries in two minutes of a made-up stream
  (Saffran, Aslin & Newport 1996); tamarin monkeys can too (Hauser et al. 2001). So this is old primate equipment.
- *Holding things in mind.* All primates have working memory; humans hold more, for longer.
- *Combining.* Some monkeys and chimpanzees join two calls into a new meaning; nothing beyond that is known in the wild.
- *Reading others.* Apes follow gaze and grasp what another sees and wants. Showing something *just to share it* (about 9–12
  months in human babies) is rare or absent in apes (Tomasello).

**In the body.** Apes have little voluntary control of the voice; their hands are another matter — chimpanzees use dozens of
deliberate gestures (Hobaiter & Byrne). Monkey throats could shape speech; the limit is the brain's wiring to the voice
(Fitch et al. 2016).

**In the group.** Children are the engine. Deaf children brought together in Nicaragua in the 1980s made a new sign language,
and each new wave of children made its grammar richer (Senghas). In the laboratory, a made-up language passed down a chain of
learners becomes regular by itself (Kirby, Cornish & Smith 2008). So grammar needs learners learning from learners, over
generations — given a human brain.

**When (uncertain throughout).** Gestures and calls with learned meanings: older than 6 million years. Breath control for long
speech: not yet in *Homo erectus* at 1.6 Ma, present in Neanderthals (MacLarnon & Hewitt 1999). Speech-tuned hearing: by about
430,000 years ago. A language gene variant shared with Neanderthals. Signs of symbols (engraved ochre, beads): about 100,000
years ago. Full language: at the latest before living peoples split, some 150,000–200,000 years ago; perhaps much earlier in
simpler form. **At 2.5 Ma the faithful expectation is gestures and a few calls, not words.** Words belong to the far end of the
relay, if anywhere.

### 3. Brain changes that would make it possible in principle

Each is one change, with a switch, a test in a bare test world first, and its size inherited and paid for in food.

| # | Change | Evidence | Test | Cost on the laptop |
|---|---|---|---|---|
| A | **Speech in seconds:** when a voice is used, the step opens into a short burst of syllables; all nearby words heard, not only the loudest | real speech and hearing | two calls in one step arrive in order | small |
| B | **Working memory:** more memory units that fade slowly and are learned, not just copied forward | prefrontal memory in all primates | the classic delayed-response test: hold a cue for N steps; compare with monkey and ape results | +10–30% |
| C | **Learning by prediction:** the brain also guesses what it will sense next and learns from being wrong, without reward | statistical learning in babies and monkeys; a leading theory of cortex | the Saffran test: after listening only, does it tell "words" from "part-words"? | up to about 2× brain time |
| D | **Shared attention as an inherited pull,** starting near zero: looking where another looks, and at what they point to | gaze-following in apes; sharing attention in humans | does a pointed-at thing get looked at more than chance | small |
| E | **Knowing who** (roadmap stage 3) | all primates | learns to ignore a caller that was often wrong | small |
| F | **Bigger brains at a real price:** unit count inherited, each unit costing energy at the real share of the body's budget | brain tissue is costly; register the share with its range | brains grow only in worlds where they pay | 256 units is about 4× brain time; fine for 100 creatures |
| G | **A reason to tell:** nothing new — the mother's existing pull toward her child's welfare, and kin | maternal care; kin selection | calls arise first between mother and child | none |
| H | **Selection** on voice control, memory size, attention, over the relay | inheritance | traits shift the same way across worlds | the relay's cost |

**Faithful:** A, B, D, E, G. **Faithful but a modelling choice among several:** C (how real brains learn from prediction is
argued over; register it as an assumption and test with and without). **Wishful, and I would refuse them:** rewarding a
speaker for being understood; a ready-made "language part"; modern machine-learning machinery that looks back over long
stretches of time with exact credit (no brain does that); starting from any system trained on human language; giving 2.5 Ma
hominins a human baby's drive to copy sounds (`voice.js` notes most primates lack it — it must evolve, at a cost).

**The gesture road.** At 2.5 Ma the hands, not the voice, are under control. Genesis already has pointing. Richer learned
gestures may be the more faithful first road to shared signs.

### 4. What research on emergent communication shows

- **Signals arise easily when interests are shared.** In the simplest signalling games, plain reward learning produces a shared
  code (Lewis; Skyrms). In Steels' "naming games", robots that look at the same thing and correct each other settle on shared
  names with no central control.
- **Deep-learning agents invent codes** when two agents are paid *together* for a task that needs talk (many studies since
  2016).
- **What has not been achieved:** word-like, combinable language from selfish agents rewarded only for their own survival. When
  agents' interests differ, cheap talk tends to collapse (Cao et al. 2018). Structure that looks like grammar is fragile and
  appears mainly under special pressures: small memory, many partners, and new learners entering — the same lesson as Nicaragua
  and Kirby's chains. Many "it emerged" claims weakened under closer testing.

**For Genesis:** (1) start where interests truly overlap — mother and child, close kin, shared danger; (2) joint attention and
feedback matter more than brain size; (3) generations of young learners are not a detail, they are the mechanism; (4) be the
strictest judge of your own result — always run a deaf arm.

### 5. The staged path, inside the roadmap

| Step | With roadmap stage | What | Progress looks like |
|---|---|---|---|
| L0 | 0 | Add a delayed-response probe beside the chain probe | a number: how many steps today's brain can hold a cue (I expect 1–2) |
| L1 | 1–2 | Changes A and B | the hold grows into the monkey range; worlds otherwise unchanged |
| L2 | 2–3 | Change C | passes the Saffran test from listening alone |
| L3 | 3 | D, E, three bands; first signals | a call or gesture that is *not* inborn comes to be used in one situation, hearers act on it, and worlds with hearing beat a deaf arm (24 worlds) |
| L4 | 4–5 | Conventions | bands differ in which sound means what; a child moved between bands learns its new band's |
| L5 | 6 (relay) | Combining | two signals together mean something neither means alone; brains and voice control shift under selection |
| L6 | beyond | Order that carries meaning | the same signals in a different order are answered differently |

**It cannot be reached this way if:** L3 stays null against the deaf arm on the real-length clock after A–E are in — then
nothing in this world is worth saying, and the fault is in the world (who knows what others do not?), not the brain. If L4
never comes while L3 holds, Genesis has reached what monkeys have, and that is the result. If brains do not grow under
selection in the relay because they never pay for themselves, words stay out of reach — which is itself one of the oldest
questions about us.

**My honest odds, as a judgment and not a calculation:** L1–L2 are engineering and will work. L3 is likely. L4 — real words by
agreement — is possible and would be remarkable; I would not promise it. L5 is a long shot. L6, grammar, I would not bet on;
no one has grown it from bodies and survival alone. But after L1–L2 the sentence "not possible with this brain" would no
longer be true, and that part is within a few months' reach.

## Purpose, physics and positioning (16 Nov 2026)

No web searches were used. Dates and studies are from memory and need checking before use (flagged where they matter most).

### 1. Will all this bring them closer to our ancestors?

**Closer in what they live through — yes, clearly.**
- *Their days:* a valley at walking scale, real escapes, a hungry season, neighbours, known individuals.
- *Their lives:* a childhood long enough to practise in; mothers and young together for years.
- *Their hands:* stones that differ, blows that can fail, things carried and kept.
- *Their numbers:* births, deaths, predation and diet inside field ranges, without tuning.

**Closer in what they are inside — only a little.** Memory, prediction and a larger brain move the mind from "habit machine"
toward "small animal mind". That is real progress, and still a very long way from an ape.

**What stays unlike them however much is built:**
- A brain millions of times smaller, built from one or two learning ideas where real brains use many we do not understand.
- No raw seeing: the world is still partly handed over in names.
- No felt body in the full sense — no gut, hormones, illness and mood as they really interlock.
- No real development: a real infant's brain builds itself over years by rules nobody has written down.
- And the plain limit: a model can only contain what we already know to put in. Where science does not know why hominins did
  something, Genesis cannot know either. It can *test* a guess; it cannot supply the answer.

**How we would know we are closer.** Never by how human they look. By a fixed list, written before, scored the same way each time:

| Level | Measure | Compared with |
|---|---|---|
| Body and life | growth, birth spacing, infant survival, lifespan, causes of death | chimpanzee long-term sites; forager life tables as the upper bookend |
| The day | hours feeding, resting, travelling; day range; nest each night | chimpanzee and baboon field studies |
| Diet | plant and meat shares; meat per day | isotope evidence (C3/C4), chimpanzee meat intake |
| Danger | deaths by predators per year; who is taken | primate predation rates |
| Social | group size, who moves between groups, grooming time | chimpanzee communities |
| Learning | years to master a skill; whether young learn it beside the mother | nut-cracking studies |
| Traces left | flakes and cores per site, stone carried how far, cut and hammer marks on bones | the Oldowan record itself |

The last row is the strongest test: *do they leave behind what the real ones left?* A score that rises on this table across
stages is "closer". A world that only looks livelier is not.

### 2. Do they need real physics to build things?

**They need the right physics for 2.5 Ma — which is less than you fear, and different from "stacking branches".**

First the record: there is **no evidence of built shelters at 2.5 Ma**. The oldest shaped wooden structure known is about
476,000 years old (Kalambo Falls; to verify), and binding things together is later still. What apes do build, every night, is a
**nest** — branches bent and woven in a tree. So the faithful "shelter" is a nest, and a hut of stacked branches at 2.5 Ma would
be a fairy-world result. Entry 41 was right to call the first shelters chance.

| What they really did at 2.5 Ma | The physics that matters | Minimum faithful form |
|---|---|---|
| Knocking flakes off stone | how stone breaks: the angle of the edge struck (under 90°), the force, the kind of rock | a blow succeeds by angle, force and rock quality — numbers from knapping experiments |
| Cracking bones and nuts | energy of the blow against strength of the shell or bone | already designed (A27): mass × height × body |
| Cutting | sharpness that wears with use | an edge value that falls with each cut |
| Carrying stone, food, infants | weight slows and tires the carrier | load as kg; walking cost rising with load (human and ape load studies) |
| Digging | hardness of ground, wet or dry | a per-strike amount by soil and tool |
| Nests | a branch bends or snaps under weight; height against falling and leopards | branch strength by thickness; body weight |
| Rain, wind, cold on a sleeper | wet fur chills; cover above keeps rain off | already partly there (R25): cover as a share of sky |

**The principle:** *physics of amounts, not physics of shapes.* Mass, force, energy, angle, wear, heat — one honest formula each,
sourced. Not solid objects tumbling and balancing in three dimensions.

**Too much for the laptop, and not needed for this period:** piles that stand or fall; wind flowing through a structure; knots
and binding; cloth and skins; water held in a vessel. Each is a research field of its own, costs far more than a hundred brains,
and belongs to times hundreds of thousands of years later. If the relay ever reaches those times, add them then.

**One addition worth having early:** throwing. It is cheap (mass, distance, a chance to hit) and it matters for driving off
hunters — though good throwing shoulders come with *Homo erectus*, about 2 Ma (to verify), so at 2.5 Ma it should be weak.

### 3. A tool people can trust

Your instinct is right: without trust it is a private world. Trust comes from six plain things, and you already have three.

1. **Documented assumptions** — you have this (`ASSUMPTIONS.md`). Finish registering every number.
2. **Predictions before results** — you have this. It is the rarest of the six.
3. **Honest nulls kept** — you have this.
4. **Validation against data** — the table in section 1, shown on the site with passes *and fails*, re-scored at every release.
5. **Anyone can repeat it** — same seed, same version, same world, on their machine: one command per logged entry, results
   stored openly, each release numbered and frozen. Other people re-running entry 58 and getting your table is worth more than
   any claim.
6. **A plain statement of limits** — one page: what Genesis can answer, what it cannot, and why (the brain; the clocks; the
   labelled senses).

Then a **lab interface**: choose switches and ranges, name one outcome, write the prediction, run N worlds, get the table and
the data. It is your own method, made usable by others — and by you, without Claude.

**What it can honestly support:**

- **Now:** "what if" questions about the *model* — how do predation, food and band size trade off in this world? What does a
  rule about learning do to hunger? Teaching how to run a fair experiment (prediction, control, noise, a null).
- **After stage 0:** questions about *simple learning in a sourced ecology* — how often does trial and error find a skill at
  given rates of opportunity? Does watching help when the means are counted? How does a food-against-safety trade shift with
  predator numbers? These can be set beside field data with a straight face.
- **After the roadmap:** questions about *conditions* — under which ecology, group structure and brain cost does a tradition
  last? Does selection favour learning from others, and when? What must be true for a signal to pay? These are the questions
  real researchers argue about, and a transparent world where each condition can be switched is useful to them — as a
  *thinking tool*, not as evidence about fossils.

**Never supported:** "this is what happened", "this is why brains grew", "this is when language began".

**Who would use it.** Teachers and students first — human evolution, ecology, and above all *method*. Curious people, through
the website. Researchers in cultural evolution and behavioural ecology would look if two things exist: a short methods paper
and a result they can reproduce. Specialists in fossils will be the hardest to interest, and that is fair.

### 4. How I would position it

**What it is:** an open, explorable model world for asking "what would it take?" about early human evolution — not a
reconstruction of the past.

**In one paragraph:**

> Genesis is an open-source simulated world of East Africa about 2.5 million years ago. Its creatures are given no behaviours:
> each has a small learning brain, a body with real needs, and a world whose every number is taken from research or listed as an
> assumption. Nothing is tuned to make them survive or "become human". Every experiment is logged with its prediction written
> first, its data, and its failures. Genesis cannot tell us what our ancestors did. It lets anyone test, in the open, what
> conditions would have been enough — or not enough — for the things they did.

**Claim:** every number sourced or declared; every result repeatable; nulls reported; where it matches field data and where it
does not.

**Never claim:** that the sims are small hominins or small humans; that a result shows what happened; that anything "emerged"
without the deaf arm, the control and 24 worlds; that it predicts the fossil record. Put the sentence about the brain (64
units, what it can and cannot stand for) on the front page, not in a footnote. It will win more trust than it loses.

**How to share, in order:**
1. **The website** as the front door: the world to watch, the research log, the validation table with its fails.
2. **Open source with frozen, numbered releases** and a ten-minute "repeat entry 58 yourself" guide.
3. **A short methods paper** (the band-size draft is the seed): the method and two or three solid results, sent to a
   simulation or cultural-evolution journal, or posted openly as a preprint first. Ask one working researcher to read it before
   it goes out; their objections are worth more than my reviews.
4. **A teaching pack**: three ready experiments a class can run in an hour.
5. **The lab interface**, once stage 0 is done.

**The meaning of all this,** since you asked: it does not hang on the sims becoming human. It is that a person who needed to
understand where we come from built a world honest enough that others can ask their questions in it too. That is already
partly true today, and each stage makes it truer.

## Recognition, product and worth (16 Nov 2026)

No web searches were used. The examples are well-known ones quoted from memory (names, years, who criticised whom); check each
before repeating it in public.

### 1. If the goal were a name in the news for a discovery

**Would I continue? Yes — but I would know what I was buying a ticket for.**

**What simulations have actually put into science:**
- **A simple idea shown cleanly.** Schelling's model (1971): mild preferences give strong segregation. Axelrod's tournaments
  (1980s): "tit for tat" and the growth of cooperation. Reynolds' flocking "boids" (1987). Each was tiny, and each changed how
  people think. Axelrod's conclusions were later narrowed (noise and cleverer strategies upset tit for tat), yet the work stands.
- **Evolution watched step by step.** Tierra (1991): parasites appeared unasked. Avida (Lenski and others, *Nature* 2003): a
  complex feature evolved through simpler ones, every step recorded. Probably the best case of a digital world answering a
  real biological question.
- **A model set against a real record.** "Artificial Anasazi" (2002): simulated households in one valley, compared year by year
  with the archaeology. Praised, then criticised: much of the fit came from the environment data fed in.
- **Models of culture and group size.** Henrich (2004) and Powell, Shennan & Thomas (*Science* 2009): larger, connected
  populations keep complex skills. Widely cited, and strongly challenged since. Your entries 36, 53, 54 and 58 sit exactly in
  this argument.
- **News without science.** Game-playing agents that "discovered tool use" (2019) made headlines and taught us little about
  humans. A 2014 "civilisation collapse" model became a press story far beyond what it showed.

**The pattern.** What lasts is a *small, sharp question with a clear answer others can repeat*. What makes news and then fades
is a big world that "evolved something amazing". Nobody has been honoured for building the most realistic world.

**What a genuine discovery from Genesis would be.** Not "they made a tool". One of these:
- *A condition result:* "In a sourced ecology, a skill found alone by most is never a tradition; it becomes one only when it
  takes more than X years of practice" — with the dose-response curve, 24+ worlds, controls, repeatable by anyone.
- *A measurement trap exposed:* entry 58 is one already. "Being near the nuts looks like learning by watching until you count
  the means" is a warning field researchers care about.
- *A clean null:* "Band size alone does not raise the number of kinds of discovery unless skills spread" — a direct, testable
  reply to a famous claim.

**The odds, honestly.** A solid paper in a specialist journal within one to two years: reasonable, perhaps one in three, if
you narrow to one question and find a collaborator. A result widely discussed in the field: maybe one in twenty. News
headlines for a real discovery: very small — and mostly luck. Anyone who promises more is selling something.

**The path I would take.**
1. **One question.** The one you are nearest: *when does a skill become a tradition?*
2. **A collaborator** from cultural evolution or primate behaviour. Not for the name: for knowing which result would surprise
   the field, and which objections will come. Write to two or three people whose papers you already cite, with entry 58 and
   the repeat-it-yourself guide, and ask for criticism, not endorsement.
3. **A preprint first**, then a journal that takes simulations seriously (places such as *Journal of Artificial Societies and
   Social Simulation*, *Evolutionary Human Sciences*, *Royal Society Open Science*, *PLOS ONE*). Open code, open data.
4. **Timescale:** stage 0, then about a year to the paper.

**Recognition without bending results.** Your rule is not an obstacle here; it is the asset. The well-known failures above were
all the same failure: wanting the answer. So: register the prediction publicly *before* each run (you nearly do); decide in
advance what result you would publish either way; publish the nulls; let a critic re-run it. And choose questions where **both
answers are interesting** — then you never need the world to say yes. The honest name to want is "the person whose results
hold up".

### 2. Why would anyone want this as a product?

**Who might adopt it, and why:**
- **Teachers and university lecturers** (most likely): a living example for evolution, ecology and *how to do an experiment*.
  They adopt what is free, runs in a browser, fits one lesson and comes with a worksheet.
- **Museums and science centres:** a screen where visitors watch a band through a day and change one thing. They want
  robustness and a story more than depth.
- **Researchers:** as a testbed, only after a paper and a reproducible result.
- **The curious public:** watching, and reading the log. They come for wonder and stay for honesty.
- **Games and edtech:** unlikely. They want fun and progress; Genesis's creatures mostly do not progress, by design.

**What competes.** NetLogo (free, huge model library, the classroom standard). Avida-ED (digital evolution for teaching, free,
with published evidence that students learn from it). Free interactive lessons from PhET and HHMI. On the public side, games
such as *Ancestors: The Humankind Odyssey* and museum halls of human origins. What none of them has: **a faithful hominin world
with every number sourced and a public log of predictions and failures.** That is the niche. It is narrow and real.

**What it would need to be a product.** It must work first time for a stranger; a ten-minute start; three ready lessons;
stable numbered versions; someone answering questions; a promise it will still run in three years. That is ongoing work, different
from research, and it takes time away from it.

**Is "product" the right frame? I think not.** Almost nobody will pay, and what they would pay for (fun, guaranteed
progress) is what your rules forbid. The better frame is an **open scientific instrument** — like a telescope people can book
time on. Its currency is use, citation and trust, not sales. If money is ever needed (cloud runs, a student's time), the fitting
sources are education and science-outreach grants, or a university partner — not customers.

### 3. Is it wasted if it ends as a teaching tool?

**No. And I would not say "just".**

**What a faithful, transparent teaching world gives:**
- *Evolution made visible:* inheritance, chance and selection in a population small enough to follow by name.
- *The method, lived:* write a prediction, run a control, meet noise, accept a null. Most students never do this once in
  school. Your log lets them do it in an hour, on a question nobody knows the answer to.
- *Honest modelling:* a model that shows its assumptions and its failures. In a time of confident simulations and confident
  machines, learning to ask "what is this model *not* able to tell me?" may be the most useful lesson of all.

**Teaching tools have mattered.** Schelling's model began as coins on a checkerboard for thinking and teaching. Conway's Game of
Life was a pastime that drew a generation into complexity science. NetLogo began in classrooms and is now cited in thousands of
research papers. Avida went the other way — research first, then a teaching version — and both live. The door between teaching
and research has always swung both ways.

**Keeping both doors open, without harm to either:**
- **One engine.** The teaching world is the research world, not a simplified or prettified copy. Never make a "classroom mode"
  where things work better.
- **Frozen releases.** Lessons point at a numbered version, so research can move on without breaking them.
- **The log goes on.** Each new entry is both a research record and next term's lesson.
- **The limits page serves both.** Students learn from it; researchers trust you for it.
- **Lessons built from real entries** (58 is the best), so a class repeats a true result and may find something you missed.

**And personally, since you ask about worth.** If one student, somewhere, learns from your world that a beautiful result can
vanish when you count the obvious alternative — and carries that into medicine, or policy, or their own science — that is not
a consolation prize. Many published discoveries do less good than that. The effort would be wasted only if it ended as a
world that claimed more than it knew. You have built it so that it cannot.

## Funding (16 Nov 2026)

Three web searches, used only to check that programmes exist. **Prices and rupee figures are my rough arithmetic, not quotes;
check each before spending or applying.** I am not a tax or legal adviser: money from abroad to an individual in India has
rules of its own — ask an accountant before accepting any.

### 1. What it really costs

The honest news first: **this project is cheap.** The scarce things are your time and a second machine, not a budget.

| Scale | What it needs | Rough cost |
|---|---|---|
| Daily work, 2–4 worlds | the laptop, 4 workers | nothing |
| A standard test: 24 worlds × 100 days | about 10–25 core-hours | laptop overnight, or about 1–2 dollars rented |
| A lived window: 24 worlds × 300 years | about 120 core-hours | 5–10 dollars |
| Real-length-year runs, a brain four times larger | 4–20 times a window | 20–200 dollars each, used sparingly |
| The million-year relay | about 12,000 core-hours | a few hundred dollars, once or twice |
| Storage | result tables are small; keep summaries, not every world | a few dollars a month, or free in the repository |
| Website | static pages | free |

So: **year one, about 200–500 dollars (very roughly ₹20,000–45,000). The relay year, perhaps 500–1,500 dollars.** No database
is needed — files in the repository are simpler, free and more reproducible. No server needs to "keep it running": runs are
batch jobs that start, finish and are switched off.

**The one purchase I would make:** a small desktop that is not your only laptop (a used mini-PC or a Mac mini class machine,
very roughly ₹50,000–70,000). It runs all night at 8 workers, costs nothing per hour, and your laptop stops overheating. It
pays for itself against rented machines within a year, and nobody's approval is needed.

### 2. Why would a funder fund it — and what they want first

Funders do not fund dreams or worlds. They fund **a person who has already shown something, asking for a specific next step.**
Reasons that fit Genesis:
- *Open-source funders:* a well-kept open project that others use.
- *Education and outreach funders:* a free tool that teaches evolution and the scientific method, with lessons a class can run.
- *Research funders:* a question, a method, and a host institution — almost always the last.
- *Individual-talent funders:* an unusual person doing serious work outside the usual path.

**Evidence they will ask for, in the order you can get it:**
1. A public repository with frozen releases and the repeat-it-yourself guide.
2. One finished result from stage 0 (the faithful-day table with its fails; entry 58 written up).
3. A preprint.
4. Users: one teacher who ran it with a class; one researcher who re-ran a result.
5. A collaborator with an institution — the key that opens research money and research cloud credits.

Before items 1–3 exist, applications mostly waste your evenings. After them, small money is quite possible.

### 3. Routes for an independent person in India

| Route | Checked today? | Needs | Likely gives |
|---|---|---|---|
| **GitHub Sponsors** | Yes — open to developers in India (GitHub's announcement; payout details are from older sources) | a public repository, a profile, identity checks | small monthly sums from individuals; realistically little until there are users |
| **FOSS United grants** (India) | Yes — exists; funds open-source makers and projects in India, one-time grants up to about ₹15 lakh; said to be folding into wider "maintainer programmes" in 2026, so read the current page | an open-source project of use to others | the best-fitting Indian source; a small grant here would cover years of compute |
| **FLOSS/fund** (Zerodha) | Yes — exists; about 1 million dollars a year to open-source projects worldwide; said to continue in 2026. Sources disagree on how to apply (a public `funding.json` file in the repository, or a rolling form) | an established project others depend on | aimed at widely used software; a long shot now, worth the small effort of the file |
| **Emergent Ventures India** | Yes — exists; cohorts announced through 2026; individuals apply through the main Emergent Ventures form, choosing India | a short, personal application about you and the idea | grants to individuals with unusual projects; competitive; the route that least needs an institution |
| **Google Cloud research credits** | Yes — exists, but **only for faculty, PhD students and postdocs** at universities or eligible research nonprofits | an academic collaborator who applies | about 1,000–5,000 dollars of compute |
| **AWS Cloud Credit for Research** | Yes — exists, but again for staff and students of accredited research institutions; review takes 3–4 months | the same | similar or more |
| **Open Collective** | Not checked | a "fiscal host" that holds money for the project | transparent donations; useful once several people want to give |
| **Crowdfunding** (e.g. Experiment.com for science) | Not checked | a clear small goal, a video, your own network | a few hundred to a few thousand dollars, once; much effort |
| **Indian science-outreach or education grants** (government or foundations) | Not checked — I could not name one with confidence | usually an institution | unknown; ask a collaborator |
| **Human-origins foundations abroad** (e.g. the Leakey Foundation) | Not checked | normally a researcher at an institution | not for now |
| **A university partner** | — | one academic who finds the work useful | credits, a student's time, a route to proper grants, and a co-author |

**The pattern:** as an individual, your real options are *open-source money* (FOSS United, Sponsors, FLOSS/fund) and
*talent money* (Emergent Ventures). Research money and cloud credits come only through a collaborator. That is one more reason
the collaborator matters more than any grant.

### 4. What to self-fund, what to seek, in what order

**Self-fund:** everything in stage 0 and the first lived windows — a few thousand rupees — and, if you can, the desktop.
The foundations must owe nothing to anyone.

**Seek, later, only for things that scale:** the relay's compute; a student or helper for the lab interface and lessons;
travel to meet a collaborator.

**Order:**
1. Now: nothing. Finish stage 0 on the laptop.
2. With releases and the guide public: switch on GitHub Sponsors and add the `funding.json` file. Ten minutes each; expect little.
3. With a stage-0 result and a preprint: apply to FOSS United and Emergent Ventures India. Write to possible collaborators.
4. With a collaborator: research cloud credits for the relay.

**Keeping money from bending the work.** Your no-tuning rule needs four guards:
- **Ask for money for the instrument, never for a result.** "Fund the open world, its validation and its lessons" — not "fund
  the emergence of tools". Never promise a discovery in an application.
- **Deliverables you control:** releases, a validation table, lessons, a paper *whatever it finds*.
- **Predictions stay public and come first,** funded or not. A funder who dislikes a null is the wrong funder.
- **Keep it small enough to walk away from.** If the grant is less than you could pay yourself in a hard year, nobody owns the
  project but you.

### 5. Running without a server

- **Website:** static pages on GitHub Pages, as now. Free. Result tables as files beside the pages.
- **The world in the visitor's browser:** the engine is already free of browser-only code and already runs there. Each visitor's
  own computer does the work. This is the cheapest "server" there is, and it is why keeping the engine dependency-free matters.
- **Checks on each change:** GitHub's free automated runs for public repositories can run `npm test` and a two-world smoke
  run (limits not checked today).
- **Big runs:** rent a machine by the hour, run, copy the tables back, switch it off. Never leave one running.
- **Shared compute, later:** a "run a world for science" button — a visitor's browser runs one seeded world and offers the
  result table back. Because worlds are exactly repeatable by seed, any returned result can be verified by re-running it. This
  is real work to build safely; do it only if users exist.

**Plainly:** yes, at first it is self-funded — but the sum is small, closer to a hobby's cost than a laboratory's. The thing
worth seeking is not money but one collaborator and a few real users. Money follows those, and with them it arrives without
strings.

## How Genesis is different (16 Nov 2026)

Three web searches. **Checked today:** Polyworld; several agent-based models of early hominins (below); Project Sid.
**Not checked today — described from memory, verify before quoting:** Avida, Framsticks, The Bibites, Lenia, Species: ALRE,
Thrive, *Ancestors: The Humankind Odyssey*, Neural MMO, and the HOMINIDS foraging model (my search did not find it).

### 1. The closest projects, and what each does well

**Camp A — artificial life: creatures that evolve, in invented worlds.**
- **Polyworld** (Yaeger, 1994; open source): agents with *vision*, neural networks that learn in life (Hebbian learning) and
  whose wiring evolves, in a simple ecology. Thirty years old, and it already had "neural brains + learning + evolution +
  no scripting". Used in published studies of how brain complexity evolves.
- **Avida:** self-copying programs; the cleanest evolution experiments ever done in a computer; a teaching version with
  evidence that students learn from it.
- **Framsticks, The Bibites, Species: ALRE, Thrive:** evolving bodies and brains, beautifully shown, with communities of
  followers. **Lenia:** lifelike patterns from pure mathematics.
- *What they do well:* speed, thousands of creatures, long evolution, polish, audiences. *What they do not attempt:* a real
  place, a real time, or numbers taken from field research.

**Camp B — archaeology and anthropology: models tied to the record, with rule-following agents.**
- An agent-based model of **Oldowan stone transport** (*Journal of Human Evolution*, 2023): can chimpanzee-style short carries
  explain where Oldowan stones ended up? Answer: only partly.
- A model of **hunter-gatherer hunting in tropical grassland**; a model of **confrontational scavenging and proto-language** in
  *Homo erectus*; a European project (OLAF) joining agent models to Oldowan fieldwork; and a **2026 review** of agent-based
  models of hominin foraging in the *Journal of Computer Applications in Archaeology*.
- *What they do well:* one sharp question, compared with real finds, peer-reviewed, by people who dig. *What they do not
  attempt:* creatures that learn. Their agents follow rules the modeller wrote.

**Camp C — AI societies.** **Project Sid** (2024): hundreds of language-model agents in Minecraft, reported to form roles,
rules and "religion" — a company's own report, not peer-reviewed. Such agents start with all of human language and culture
inside them, so they can say nothing about where those came from. **Neural MMO** and similar: learning agents surviving in
game worlds, built to study AI, not ancestors.

**Camp D — games.** *Ancestors: The Humankind Odyssey*: the same period and place as Genesis, lovingly made — and a human
player does the discovering.

### 2. What is genuinely different about Genesis — and what only looks it

**Genuinely different (as far as I can see; not "the first" or "the only"):**
- **It stands between the two camps.** Camp A has learning brains in made-up worlds. Camp B has real-world numbers with
  rule-following agents. Genesis puts *learning creatures* into a world of a *real time and place whose numbers are sourced*.
  I know of few projects that try both at once.
- **The no-tuning rule, actually kept.** Most models are adjusted until they behave. Yours forbids it, and the log shows the
  rule being obeyed when it hurt.
- **A public record of predictions and failures.** Predictions written before runs, a register of assumptions with ranges, a
  switch that restores the old world for every change, nulls and corrections left in view (entries 54, 57, 58). In camp A this
  is almost unknown; in camp B it is rarer than it should be.
- **Rates set beside field data** — predation per hominin-year, meat per day, discoveries per thousand life-years.

**Only looks different:**
- *"Nothing is scripted; behaviour emerges."* Every artificial-life project says this. Polyworld said it in 1994.
- *"Neural networks that learn and evolve."* Old, and others do it at far larger scale.
- *A whole planet with climate.* Lovely, and yours to keep — but not a scientific difference.
- *The period (2.5 Ma).* Camp B already works there, with fossils in hand.
- *Whispers and honest minds.* Yours alone, and good for trust and wonder; they are character, not evidence.

### 3. Where Genesis is not different, or is behind

- **Against the record:** camp B compares its output with real finds (where stones lie, what bones show). Genesis does not yet.
- **Peer review and domain experts:** none so far.
- **The mind:** Polyworld's creatures *see* raw light; Genesis's are told "food" and "predator". Others evolve brain wiring
  far more freely and for far longer.
- **Speed and scale:** thousands of agents and millions of generations elsewhere; one band and decades here.
- **Users and polish:** The Bibites and Thrive have communities; NetLogo and Avida-ED have classrooms.
- **Sharpness:** each camp-B paper answers one question. Genesis has asked many and finished few.

None of this is shameful for one person in a few months. But the website should not suggest otherwise.

### 4. The identity worth protecting

Two things, and they belong together:

**(1) Learning creatures in a sourced world of a real time and place.**
**(2) Radical honesty of method: nothing tuned, every assumption listed, every prediction first, every failure shown.**

The first is what Genesis *is*. The second is why anyone should *believe* it. Many can match one; the pair is the identity.

**How to make it unmistakable, without exaggerating:**
- **Front page, three lines:** what it is; what the creatures are (a small learning brain — with its limits); the promise
  ("no number tuned toward an outcome; every failure published").
- **A "What we got wrong" page**, fed from the corrections in the log. Almost nobody publishes one. It is your signature.
- **Every release carries the validation table** — passes *and fails* against field data — and the count of registered
  assumptions tested at both ends.
- **A "Where Genesis stands" page:** a fair comparison with Polyworld, Avida and the hominin models, saying plainly where
  they are ahead. Generosity to others reads as confidence.
- **In the paper:** a related-work section that places Genesis between the two camps and cites the 2026 review; then one
  result. Write "to our knowledge", never "the first".
- **Words to avoid everywhere:** "first", "only", "realistic humans", "emergent" without a control beside it.

**And to become different where it now is behind:** adopt camp B's best habit. Add the "traces left" test — do your hominins
leave stones and marked bones in patterns like the real sites? The 2023 stone-transport model is a ready comparison, and its
authors are natural people to write to.

### 5. Easy to copy, and hard to copy

**Easy for others to copy:** any feature — the valley, the prey map, a voice, a bigger brain; the technology; the period;
the idea of mixing the two camps. A funded laboratory could rebuild the engine in months, faster and larger.

**Hard to copy:**
- **The record itself.** Eighty-four dated entries with predictions written first cannot be made after the fact. Each month
  adds to a history nobody can fake or buy.
- **The discipline.** Not tuning is easy to promise and painful to keep; laboratories under pressure to publish find it hardest.
- **The register of assumptions,** checked against sources line by line. Dull, slow, and therefore rare.
- **Independence.** No funder, no career, no deadline needing a result. It is a weakness for resources and a strength for
  trust — while you keep it.
- **Your own voice:** the questions, the whispers, the insistence on reality. A project with a person visibly behind it is
  remembered.

**So, candidly:** Genesis is not different in its ingredients; nearly every one has been built before, often better. It is
different in its *combination* and its *conduct* — and conduct is the part others find hardest to copy. Do not try to be
different by adding features; someone will always have more. Be different by being the world whose every claim can be
checked, and that says so when it is wrong.

## Making Genesis hard to replace (16 Nov 2026)

No web searches were used. I am not a lawyer: the licence and trademark points are general knowledge; check with one before
paying for anything. I looked in the repository: `LICENSE` (MIT), `CITATION.cff` with Zenodo DOIs, one release tag (v0.7.0) and a `lab.html` are already there.

### 1. What cannot be prevented — and whether to change the licence

**Plainly: you cannot stop anyone making another Genesis.** The code is public under MIT, which lets anyone copy, change, rename
and even sell it, so long as they keep your copyright notice. Copies already released under MIT stay MIT for ever; you cannot
take that back. And ideas — a sourced hominin world, learning creatures, a prediction log — cannot be owned by anyone at all.

**Would another licence help?**

| Choice | What it does | For an open scientific instrument |
|---|---|---|
| Stay MIT | anyone may use it for anything, with your name kept | **Best for trust and adoption.** Teachers, museums and researchers can use it without asking a lawyer |
| GPL / AGPL (copyleft) | anyone who shares a changed version must share their changes openly too | stops a *closed* copy; does not stop an open one. Some universities and companies avoid it. A fair choice if a closed commercial copy is your real fear — I do not think it is the real danger |
| Keep parts private | others cannot run or check those parts | **Hurts most.** A result nobody can repeat is exactly what Genesis exists not to be. It trades your one true advantage for a lock that a funded team would rebuild around anyway |

**My advice: stay MIT.** The danger to Genesis is not being copied. It is being ignored. A copy that credits you spreads your
name; a locked project spreads nothing. One fair addition: license the *writing* (the findings log, reviews, lessons) under a
Creative Commons attribution licence, so the words carry your name wherever they go.

### 2. What can be protected, cheaply

- **Copyright and attribution** — already yours, automatically, and MIT requires your notice to stay. *Achieves:* your name
  travels with every honest copy. It does not stop copying.
- **A DOI for each release (Zenodo, free)** — you have this already: `CITATION.cff` carries a Zenodo DOI for v0.7.0 and one
  for all versions. Each numbered release is archived with a citable identifier and a date nobody can alter. *Achieves:* proof
  of what existed when, kept by a third party; a proper way for papers to cite you. The gap: v0.7.0 is dated 8 Nov, and most of
  entries 63–84 came after it. **Release more often**, so the archive keeps pace with the log.
- **`CITATION.cff`** — you have it, with the DOIs. Keep it current with each release. *Achieves:* people cite the right thing.
- **The name.** Using "Genesis" publicly and first gives some standing; a registered trademark gives more, at a cost, country by
  country. But "Genesis" alone is a very common word and hard to defend. *Cheaper and stronger:* a distinctive full name used
  everywhere the same way (for example with your name or a subtitle), the matching web address, and the same handle on GitHub.
  Register a trademark only if a real confusion ever appears. *Achieves:* others may copy the code but may not pass themselves
  off as you.
- **A preprint.** A dated, public, citable statement of the method and first results, under your name. *Achieves:* priority
  for the ideas in the only currency science accepts.

None of these stops a copy. Together they make sure a copy is *known to be a copy*.

### 3. What makes it irreplaceable even when copied

Someone can copy the repository in a second. What they get is the code as it stands today. What they cannot get:

- **The dated record.** Eighty-four entries with predictions written before results, corrections left in view. A copier starts
  at entry zero or carries your history with your name on it. *Build it:* keep going exactly as now; add the prediction file's
  commit to each entry so the "written first" is provable; archive each release on Zenodo.
- **The data and runs.** Tables for every entry, repeatable by seed. *Build it:* keep `data/findings/` complete; publish the
  one-command repeat for each entry. Reproducibility is a gift to copiers and, oddly, your best defence: the more people
  re-run your results, the more *yours* is the reference everyone compares against.
- **Trust and reputation.** Earned only by time and by being seen to say "we were wrong". *Build it:* the "What we got wrong"
  page; the validation table with its fails; never an exaggerated claim. One overstated headline would cost more than any copy.
- **People.** A collaborator, a teacher who uses it, a handful who file issues. A community follows a person and a history, not
  a codebase. *Build it:* answer everyone; credit everyone by name; make a first contribution easy (a clear guide, small
  starter tasks, a welcome).
- **Steady releases.** A project that moves every month is the original by definition; a copy must keep pace or be stale.
  *Build it:* small numbered releases on a rhythm you can keep for years, not sprints you cannot.
- **Your voice.** The questions, the rules, the refusal to tune, the reason you began. Nobody else has your reasons. *Build it:*
  write the short pieces only you can write — why a rule exists, what a null taught you — and sign them.

**The honest sum:** if a well-funded team builds a faster, larger world on your ideas and credits you, that is not a loss; it
is the best outcome short of doing it yourself, and you would be the one they cite and ask. If they do it without credit, your
dated record, DOIs and preprint show who was first. Either way, what would be "another Genesis" needs the years of honest
entries — and those cannot be copied, only earned again.

### 4. First steps, in order — cheap and soon

1. **This week (free):** decide the full public name; secure the web address and the GitHub name to match.
2. **This week (free):** cut a new numbered release so Zenodo archives the work since v0.7.0 (Zenodo and `CITATION.cff` are
   already set up); check the DOI shows in the README and the website footer.
3. **This week (free):** add a line to the README and site: how to cite, and that the writing is under a Creative Commons
   attribution licence (after choosing one).
4. **This month:** make every findings entry point to the commit that holds its prediction, so "written before" can be checked
   by anyone.
5. **This month:** the "What we got wrong" page and the validation table with fails, on the site.
6. **Within three months (with stage 0):** the repeat-it-yourself guide for entry 58; a short contributor's guide.
7. **After stage 0:** the preprint, under your name, with the DOI.
8. **Only if needed, later:** a lawyer about a trademark.

**If I were you,** I would stop trying to make Genesis impossible to copy, and make it impossible to *catch up with*: a public
history that grows every month, results anyone can check, and a name that people have learned to trust. Locks keep others
out. A record keeps you ahead.
