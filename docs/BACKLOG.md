# Backlog — everything found, decided or verified but not yet done

Kept so that points raised in long discussions are not lost (the owner, 12 November 2026). Each item says what it is,
why (the evidence or the finding), and what it waits on. When an item is done, move it to the research log
(`docs/FINDINGS.md`) and the assumptions register (`docs/ASSUMPTIONS.md`) and delete it here.

Rules for every item: verify online first (the owner's ideas included); one change at a time, with a switch; a paired
test on the same worlds; never tune toward survival.


## 0. Fable's advice — every item a commitment (the owner, 16 Nov 2026: "whatever Fable said, we need to do it no matter what")

Source: `docs/reviews/2026-11-16-fable-big-picture.md` (every word kept); summary in `docs/HOMININ-PLAN.md` (THE ROADMAP and after).
Worked in the roadmap's order; status kept here.

| # | Commitment | Stage | Status |
|---|---|---|---|
| F1 | Detectable hunts: an alert prey that sees an attack makes it fail; detection and success sourced separately; a herd stays alert after a failed attack; vigilance tied to eating and sleeping; judged by kills per hunter per day | 0 | next (prey flight, entry 84, built) |
| F2 | Faithful-day table, frozen: the world checked against field data (life history, day, diet, danger, social life, learning times), shown with its fails | 0 | to do (~3 weeks) |
| F3 | Chain-learning probe: can the brain learn a multi-step chain (stone → strike → flake → carry → cut)? plus L0, a delayed-response probe | 0 | done (entry 87): 2 yes, 3 half, 4–5 no; memory 2–4 steps. Next: the probe with copying from a skilled elder |
| F4 | A second, real-length-year clock for learning questions (test A40, a 12-day year, first) | 0 | to do |
| F5 | Count repeats, not only firsts, for every discovery | 0 | done (entry 95, 17 Nov; `rep_X`/`who_X`/`whoF_X`, `tools/analysis/repeats.js`) |
| F6 | One hard skill with repeats and a mother-to-young advantage (milestone 3) | 0 | to do (~3 months) |
| F7 | Stop rules: stop if stage-0 milestones fail, or a month passes with no change in hominin behaviour | 0 | in force |
| F8 | Engine: profile, then speed (3× faster, identical worlds by seed) | 1 | to do |
| F9 | **A valley inside the globe**: one basin at 100–250 m squares within the planet, the planet supplying weather, rivers, edge densities; all brained creatures in the valley; leavers to a calculated "elsewhere"; short steps only where something happens | 2 | to do (4–8 weeks) |
| F10 | Three bands, knowing individuals (familiar, kin, what happened last time), females moving between bands | 3 | to do |
| F11 | Things as things: each stone, stick, bone an object with weight, hardness, an edge; two hands; then the tradition test (a habit that outlasts its inventor and differs between bands) | 4 | to do |
| F12 | Physics of amounts, not shapes: stone fracture, blow energy, edge wear, carrying load, digging, branch strength for nests, rain and cold on a sleeper; nests, not huts; weak throwing early | 2–4 | to do |
| F13 | Selection measured; a population-genetic bridge built and checked against a lived 2,000 years | 5 | to do |
| F14 | The relay: 100,000 years, then a million (no hand-written selection, no stretched measurements, no free brain growth, no cherry-picked windows) | 6 | to do |
| F15 | Path to words: L0 delayed-response probe; L1 speech in seconds and working memory; L2 learning by prediction (Saffran test); L3 first learned signals vs a deaf arm; L4 band conventions; L5 combining; L6 order. Never reward being understood, no language module, no human language. Start with mother and child; gestures may come first | 1–7 | to do |
| F16 | Senses: work towards fewer labelled inputs (raw senses where feasible); add smell (A45) | 2–4 | to do |
| F17 | Positioning: an open "what would it take?" world; the brain's limits on the front page; claim/never-claim rules; a three-line front page; a fair comparison page; "to our knowledge", never "first" | now | to do |
| F18 | Trusted tool: validation table with its fails in every release; one-command reproducibility with frozen releases; a one-page statement of limits; then a lab interface | now–0 | to do |
| F19 | "What we got wrong" page | this month | **done 17 Nov** (`docs/WHAT-WE-GOT-WRONG.md`; add to it when we find another) |
| F20 | Link each research-log entry to the commit holding its prediction | this month | **done 17 Nov** (`docs/PREDICTIONS.md`, from `tools/prediction-commits.js`; regenerate after each new entry) |
| F21 | Repeat-it guide and contributor guide | with stage 0 | to do |
| F22 | Preprint (one sharp question, e.g. "when does a skill become a tradition?"), a collaborator from cultural evolution or primatology, then a simulation-friendly journal; publish nulls; pre-register publicly | after stage 0 | to do |
| F23 | Stay MIT for code; writing under CC BY 4.0 | now | **done 16 Nov** (LICENSE-docs.md) |
| F24 | Release more often (frozen, dated releases) | now | started: v0.8.0 tagged 16 Nov |
| F25 | A distinctive public name with matching web address and GitHub name; trademark only if confusion appears | this week | **name chosen 16 Nov: Genesis Odyssey: Origins** (README, page title, citation updated); tagline "an open, sourced world of early hominins, 2.5 million years ago"; GitHub repository name and a web address still to decide with the owner (renaming changes the live URL) |
| F26 | Funding order: self-fund stage 0; GitHub Sponsors once releases are public; FOSS United and Emergent Ventures after a result and a preprint; cloud credits through a collaborator; never ask money for a result. A small second desktop for runs | ongoing | to do |
| F27 | No server: static website, worlds run in visitors' browsers, rented machines by the hour; later a seed-verifiable "run a world for science" button | ongoing | partly (static site, browser runs) |
| F28 | A "traces left" test against the Oldowan record; contact the 2023 stone-transport authors | 4+ | to do |
| F29 | Let go of for now: ice ages, pigment, *Paranthropus*, friction fire (A41 stays a broken behaviour to fix later); keep `--sapiens` as a labelled thought experiment; stay at 2.5 Ma | — | agreed |

## 1. Bugs and flaws in the code (fix first: other things rest on them)

| # | What | Why it matters | Status |
|---|---|---|---|
| B28 | **fixed 14 Nov** — the second hunter of a pair (or a pack member) was placed near its group's centre without the camp rule, so it could start beside the band (2 squares away in one world) | found when the prey map became default | `--old-hunter-placement` restores |
| B29 | **fixed 14 Nov** — the page froze some seconds after clicking a name: the Doing text had no words for climbing, and the error stopped the drawing loop | the owner | climbing has words; a drawing error can no longer stop the world |
| B27 | **fixed 14 Nov (entry 76)** — rot sickness by the kg eaten, not every bite (`--rot-per-bite` restores) | deaths by wounds fell in 4 of 4 worlds | done |
| B1 | **built 12 Nov** (`--old-mating`) — After **any** mating the female enters the 4-year nursing wait, even if she did not conceive (`src/sim.js`, mating: `fem.cd = S.cd`) | Harmless while every mating led to pregnancy; with the female cycle, most matings miss the fertile days and lock her out for 4 years with no baby — births fell to a third | to fix: the wait starts only with a pregnancy |
| B2 | **built 12 Nov as B7** — After mating, a male cannot mate again for 0.1 year (about 36 days) | No source; real chimpanzee males mate several times a day | verify online, then fix |
| B3 | **done** (merged into `percept` 12 Nov; `--people-cap` restores) — A fixed population cap blocks mating (`popK + kids < S.cap`) | Not biology: real populations are limited by food, disease and fertility | remove (audit, 11 Nov) |
| B4 | A comment above `child()` (`src/creatures.js`) says learned habits can pass on | The code passes on only inborn wiring (correct); the comment is wrong and misleading | correct the comment |
| B5 | **done** (merged 12 Nov) — A sudden jolt of discomfort below 15% energy | No source | **done** on branch `refeed-wip` (smooth hunger + refeeding signal at 20%); test running |
| B6 | **Two clocks** (review finding 1): a day is 96 steps, a year 288 (3 days). Hunger, decay, fire, mood run on the day clock; pregnancy, nursing, life on the year clock — a hominin starves in 14 days = 4.8 life-years; a female cycle lasts 7 hours | Not wrong in itself, but no rule says which process uses which clock, and reality checks "per year" mix them | Assign every duration to a clock, list them in `ASSUMPTIONS.md`, state each reality check with its clock |
| B7 | **built 12 Nov** (`--male-wait`) — The male's wait after mating (0.1 year = 28.8 steps) is as long as a whole female cycle (28.4 steps), so each male can mate about once per cycle; fix with B1 | Chimpanzee males mate several times a day (hours, not weeks) | Put the wait on the day clock (verify a number online first), with B1, then retest the cycle |
| B8 | **labelled 12 Nov** (page now says "not tested against chance" and "not compared with how often they do so anyway"; the real fix waits for the detector, B12) — The page's translator says a sound "means" something with no test of chance (≥25 uses, ≥25% in one situation, ≥1.6× baseline, over ~1,000 sounds) | Honest-minds rule | Use `talk-detector.js`'s tested result, or word it "used more often when… (not tested)" |
| B9 | About ten thresholds steer behaviour unregistered (ready to mate if energy > 45 and water > 40; gives food if > 40; feeds a child if > 45; conception cost; labour pain 0.6; 1% maternal death; lifespan draw 0.72 ± 0.2; forced sleep when exhausted) | Register rule | Add them to `ASSUMPTIONS.md` with ranges |
| B10 | **built 12 Nov** (`vf` split from `im`; `--one-social-gene`) — The `im` gene bundles copying others **and** feeling their pain/fear, so "copying is bred out" (entry 25) may really be "caught fear is bred out" | Review finding 10 | Correlate each hominin's `im` with surviving children on saved worlds; split the gene in two |
| B11 | Crash when a fish learns a lesson (`LG` in `src/state.js` had three slots for four kinds); the runner then wrote the surviving worlds and exited as if all was well | Found in the 100-year run (4 of 8 worlds lost) | **done** (`26a92dd`): fixed; the runner now warns and fails when worlds are missing |
| B12 | The communication detector's **planted-sound check fails**: a sound given a known strong effect in a copy of the brains ranked below all 200 random controls (seed 1, 20 days). Likely cause: the plant scales with how far a sound is from the average sound, so a common (near-average) sound gets a tiny effect and unusual control sounds a bigger one. Until the check passes, the hearer side ("nobody responds") means nothing. Also: the exchange test's null breaks who stood near whom, so an excess can be two hominins calling at the same thing (now said in the verdict) | First test, 12 Nov (`data/findings/talk-detector-first-test/`) | Plant an effect along the planted sound's own direction, normalised; check it is found; add a null that keeps positions (shift calls by a few hours, not anywhere); then run on long worlds (20 days had no sound said 25 times) |
| B13 | **Too safe over 100 years** (entry 37): bands grow about 3% a year (25 → 606), far faster than real chimpanzee communities; no disease, and hunters die out of whole worlds (4 of 8) | Gombe declined, Kanyawara grew modestly (reviews) | Disease (R9) and a hunter population that cannot vanish (A1) move up |
| B14 | **done 12 Nov: chance, not building (entry 41)** — Trace the first shelters (entry 37: worlds 1, 4, 5 or 8, days 170, 195 and 254): who carried the branches, on purpose or by chance, was the heap kept up? | Before calling it building | `tools/analysis/` shelter trace |
| B18 | **done 13 Nov (entry 50): 5 of 7 checks pass** — **Brains expect about ten times too much** (entry 49): value estimate V 2.3–3.1 against a true value of about 0.3; the learning signal is negative on average; likely cause: the one-try boost (up to ×4 for big good surprises) also trains the value estimate | Brains priority, step 2 | Boost only the policy, not the value estimate; check V matches rewards; re-measure eating and hunger |
| B17 | **cause found and fixed: entry 50 (the grass pull fixed too, entry 49); digging as its own action still open** — **Eating does not pay, so brains stop eating** (entry 48): the "try plants when hungry" pull fires on grass (indigestible for hominins); digging roots is hidden inside "eat" and its failures cost energy; eating when full counts as a failed eat | Brains learned "eat" below a fresh brain's chance, even on fruit | Research first; fix the rules (the pull only on plants that can give something; digging its own action); re-measure; brains priority step 2 |
| B19 | Fire causes 19% of hominin deaths (entry 52) — far too many for apes | Wildfires catching whole bands; hominins do not move away from an approaching fire (A3) | Trace; then A3 |
| B20 | **numbers registered and switch added 13 Nov; tested in entry 59 (the head start came from it); the owner decided 13 Nov: OFF by default; **done (entry 61)**: off by default, `--fire-watching` restores it (checked: identical worlds both ways)** — **Fire skill spreads by a built-in rule** (Fable review 2, finding 1): `fsk` sits outside the brains; `watchFire` raises it in every awake hominin within 2 squares when someone practises or makes fire; none of its numbers is registered | `src/sim.js` (firePractice, watchFire, fireMade) | Register every number; add a switch; re-run 25 vs 80 founders with it off (prediction first); consider moving fire skill into the network |
| B21 | **validated 13 Nov (entry 56): unbiased but noisy; next: more worlds or --born-only** — **The spreading measure is unvalidated** (review 2, finding 2): no positive or negative control, pooled rates, opportunity, survivorship and founder confounds | `tools/analysis/spread.js`, entry 54 | A no-copying switch; a planted behaviour learnable only by watching; per-world ratios; only hominins born in the run; risk time only with the means at hand; longer runs |
| B22 | **done (entry 57): copying by the visible result; `--copy-by-surprise` restores; entry 60: no difference to hunger** — **"Copy what worked" scales by the elder's surprise** (review 2, finding 3): a skilled elder is rarely surprised, so it teaches little | `src/sim.js` copying | Test weighting by the visible result (the elder's gain), as an observer can see |
| B23 | **Unpaired attributions** (review 2, finding 5): "hunger fell from 39% to 17%" and "bands discover more since entry 36" span many changes | paper, entries 50–53 | **Done (entry 60)**: paired, A→C hunger 39%→23%; expectations fix about half, the rest half; the discovery gain is labelled "after many changes" |
| B24 | **Reality-check bands wider than sources** (review 2, finding 6): against the sourced ranges 2 of 7 pass (checked 13 Nov: the review said 3) | `tools/analysis/reality-check.js` | **done 13 Nov**: the tool and the write-up report both scores |
| B25 | **Newcomer hunters arrive in a world set to no predators**: the rescue rule (entry 39) treats 0 hunters as rare and sends some, so a Lab world with predators 0 still gets hunters; it broke the partner-missing test after entry 57 changed the world's course (fixed in the test with `rescue: false`) | `src/creatures.js` rescue() | Should rescue skip worlds that start with no hunters? Decide at the scale step, when newcomers are switched off |
| B26 | **done 13 Nov** — **A founding woman could be her own mother** (about 15 of 300 worlds): founding women (18–46 "forager years") and grandmothers (45+) overlapped, so the grandmother pick could be the woman herself; the page's skin-colour code then followed the loop forever ("Maximum call stack size exceeded" on the live site). Since entry 11 | `src/world.js` makeBand | Fixed: a mother must be at least 15 years older and not herself; the colour code also stops after 50 generations |
| B16 | The "first shelter" milestone (`day_shelter`) counts any heap of 7+ branches slept on, even under trees that already give more cover (all three in entry 41) | Misleading measure | Count a heap only where it adds cover beyond the tree or cave (a measurement fix) |
| B15 | **done 12 Nov — newcomers are TEMPORARY: switch them off after the scale decision (plan, priority 4)** (entry 39: newcomers; entry 40: hunters live near prey — the 'more prey' plan was wrong: prey was plentiful but far away) — **Hunters die out of whole worlds** (the owner saw it on the live site; 4 of 8 worlds in entry 37). Each hunter kind is a population of 2–10 for the whole world (caps: 10 wolves, 8 big cats, 6 bears; about 2 of each at the start), so it dies out by chance; and they starve (3–10× too many hunters for the prey). Real: Serengeti leopards about 5.5 per 100 km² (Allen et al. 2020), hyenas 80–200 per 100 km²; an isolated puma population of a few dozen has a 16–21% chance of dying out in 50 years (Benson et al. 2019); immigration rescues small carnivore populations (Brown & Kodric-Brown 1977; one marten a year cut 100-year extinction risk below 1%) | The owner, 12 Nov: build both, one at a time | (1) trace which kinds die and of what; (2) newcomers from the wider population when a kind is rare or gone (rescue effect), tested; (3) more prey per hunter to the real ratio (A1), tested |

## 2. Built, tested, waiting (switched off or not merged)

| # | What | Result so far | Waits on |
|---|---|---|---|
| W8 | The prey map: antelope and buffalo as kg per square, one herd per square near hominins and hunters (`--prey-map`, off; entry 66) | Weight balances; hunters kill 38–95 kg a day (need about 4); fewer hominins alive in 3 of 4 worlds | A30 (hunters’ meals), then test again; then why hunters stay far from herds |
| W1 | **on by default since 12 Nov (entry 38)** — Female cycle: 36 days, receptive 13, fertile near ovulation (`--cycle`, off) | Births fell to a third — caused by B1 (and perhaps B2) | B1, B2; then test again |
| W2 | Animals of East Africa 2.5 million years ago (`--africa-animals`, off) | Hunters starved: Genesis has about 9× too many hunters for its prey | A1 |
| W3 | **off by default since 12 Nov** — Founders' practice before the world begins (on in the runner) | Did not reduce hunger; drowning doubled | review: learning by watching (A4) may be the real fix |
| W4 | **merged into `percept` 12 Nov, goes live with Phase A** — Mother's pull to keep her nursing child near | 31 alive vs 25, better in 9 of 12 worlds; fire deaths and drownings halved | log as an entry; merge |
| W5 | **merged into `percept` 12 Nov, goes live with Phase A** — Lasting mood | No clear effect (with the faulty cycle on); retest without the cycle running | results due |
| W6 | **merged into `percept` 12 Nov, goes live with Phase A** — Starving: smooth hunger + refeeding signal at 20% (and 25%) | 24 worlds: no measurable effect on survival or hunger at either end; 20% vs 25% within noise — keep, at 20% (evidence) | merge; then **each hominin inherits its own threshold in 20–25%** (the owner's idea: individuals differ; selection may favour one end) |
| W7 | **merged into `percept` 12 Nov, goes live with Phase A** — Ape-like care: only mothers feed their young (`--human-care` restores foragers') | test queued | results due |

**Roadmap (16 Nov 2026):** the staged plan to the owner's vision is in `docs/HOMININ-PLAN.md` ("THE ROADMAP"); the full advice in
`docs/reviews/2026-11-16-fable-big-picture.md`. Items below are worked in its order: stage 0 first.

## 3. Verified, not built yet (in a sensible order)

| # | What | Evidence | Note |
|---|---|---|---|
| A46 | **Bones and heads as things to carry (the owner, 15 Nov 2026)** — once a carcass is mostly eaten, its limb bones (with their marrow inside) and its head (with the brain) can be picked up, carried, put down and cracked with a stone anywhere; the marrow and brain go with them. Nothing tells anyone to carry them; a safer place to eat is something a brain may learn. Bone tools stay out (later than 2.5 Ma) | **2.5 Ma, Bouri** (Ethiopia): cut marks and the earliest percussion marks on antelope and horse bones — meat and marrow taken with stone tools (de Heinzelin et al. 1999, *Science* 284:625); where the bones were broken is not known, and some marks may be crocodile damage (a later reassessment). **2.0 Ma, Kanjera South** (Kenya): small antelope carried in whole and many heads of wildebeest-sized antelope carried some distance before being broken open — the earliest evidence of carrying animal parts (Ferraro et al. 2013, *PLoS ONE*). **Brain and marrow**: impala brain 102 g, marrow 154 g (Blumenschine & Madrigal 1993, via Kuipers et al. 2010). **Later, not for now**: bone tools to dig into termite mounds, Swartkrans and Sterkfontein about 1.8–1.0 Ma (Backwell & d'Errico 2001, *PNAS*); shaped bone tools at Olduvai 1.5 Ma (de la Torre et al. 2025, *Nature*) | carrying parts is firmly evidenced by 2.0 Ma, plausible at 2.5 Ma; build after the Oldowan steps; to source: how far parts were carried, how long a head stays edible (heads resist even lions and hyenas) |
| A45 | **Droppings (the owner, 14 Nov 2026: all three steps important)** — (1) every animal and hominin leaves droppings where it has been, at real daily rates for its kind, removed by dung beetles, sun and rain at real rates; (2) fresh droppings **and rotting carcasses** (the owner, 14 Nov: "bad smell keeps sims and animals away") can be smelled, by kind, carried downwind, with a direction — what they mean is learned, never told (hunters may learn trails lead to prey, hominins that hyena smell comes before pain); (3) faecal parasites: living near droppings carries a sourced infection risk, so cleanliness can pay without being taught | to source: carcass odour (putrescine, cadaverine) raises vigilance and escape in people even unnoticed (Wisman & Shrira 2015, to check: a possible inborn aversion); hyenas find carcasses by smell, vultures by sight; defecation rates (impala, buffalo, hyena, leopard, chimpanzee), dung-beetle removal rates in East African savanna by season, scent detection distances, faecal-oral parasite transmission in wild apes; apes do not soil their sleeping nests | after the Oldowan steps; step 2 adds senses to every brain (test that old worlds still work) |
| A43 | Rock quality by place from real geology (chert, fine lava, quartzite flake; coarse or weathered rock crumbles), visible and feelable so choosing good stone can be learned | Fable's Oldowan review (14 Nov): today all stones are identical | **waits for real geology** (the owner, 14 Nov); the 3 km squares are coarse |
| A44 | Holding a stick (or flake, or stone) makes digging for roots easier by itself (`SOC.digStick` etc.) — the same false link as holding a flake while eating (fixed in entry 82) | Fable's Oldowan review, finding on free tool use | make digging with a tool an act; source chimpanzee and baboon digging rates |
| A42 | **built 14 Nov (entry 81)** — only the edible flesh (half) is meat (`--whole-body-meat`) | less meat for hominins and leopards in 4 of 4 worlds | test 0.44 and 0.58 |
| A40 | Offered, not chosen yet (the owner, 14 Nov): test the length of the year once (3 against 12 days a year) for skill learning; more worlds for exposure; several bands with young adults moving between them (needs design) | Fable's review of fire and scale: the squeezed year gives each life about 122 times less practice and watching, so entries on learning (54–58, 62) carry a clock caveat | the owner decides when |
| A41 | **A broken behaviour to fix (the owner, 14 Nov 2026)** — fire-making made physically real (a rub act with no inborn pull, a notch cut with a flake, tinder brought to the spot, a motor skill grown only by own rubbing, the weather deciding); since entry 78 fire cannot be made at all | Fable: doable in about 3–4 days, but a 15-minute step cannot hold the minutes of drilling an ember needs; expected result "almost never" | after the remaining gaps and the year-length test; better with finer actions (drill, blow) |
| R1 | **done 14 Nov (entry 75)** — checkpoint big run, 24 × 100 days, map on and off | hominins alive in 16–17 worlds, median 2; hunters the main killer (31–39%); wounds 24% with the map on | next: B27, then predation rates |
| A38 | **built 14 Nov (entry 71)** — hunters remember where they ate meat (`--hunters-forget-kills`) | leopards ate more in 4 of 4 worlds, hyenas in 3; still under need | next: A36 (herds with young) |
| A39 | **built 14 Nov (entry 80)** — bigger carcasses rot more slowly, inside the studied 20–90 kg (`--one-rot-rate`) | more carcasses in sight, more meat eaten in 3 of 4 worlds | done |
| A35 | **built 14 Nov (entry 70), no difference** — a hunter resting at its kill keeps the birds off (`--unguarded-sleep`) | hunters walk away from kills; birds still take 25% and rot 32% of the meat | open question: why hunters do not stay with a kill (owner's call) |
| A36 | **built 14 Nov (entry 73)** — antelope herds with yearlings, females and males (`--adult-herds`) | no clear effect in 4 worlds (as large as world-to-world differences) | measure in the big run |
| A37 | **built 14 Nov (entry 74)** — hominins eat meat in kg with its real energy (`--meat-units`) | with the map on, 0.13–0.31 kg a day, in the chimpanzee range (was 0.3–1.1) | marrow still in the old units; a hominin stomach is a separate step |
| A34 | How easy a kill is (a 15-minute attack beside prey succeeds 37–49%; real hunts are stalks, 14–38%) | after entries 69–74 hyenas eat about their need, sabre-tooths a little over, leopards under for other reasons — no gap points here now | kept; look again after the checkpoint run |
| A32 | **built 14 Nov (entry 68)** — a hunter's inborn pull to attack grows with hunger, a quarter always there (`--fixed-hunt-pull` restores) | full hunters no longer kill; with the map on, half-fed ones still kill 15–45 kg a day | test the share at 0.1 and 0.5; then A34 |
| A33 | **checked 14 Nov** — a hunter lasts about 25 days from full | wolves: two weeks or more, months if necessary (Mech & Boitani 2003, secondary); lions 7–14 days (weak) | within the evidence; not changed |
| A31 | **built 14 Nov (entry 72)** — forest antelope at 1,000 kg/km² (`--forest-prey`) | herds back in forest worlds; fewer hominins taken in 3 of 4 | test 300 and 3,000; herds out to sight still open (cost: about a thousand herds); why hunters are still far from herds: trace |
| A30 | **built 14 Nov (entry 67)** — a hunter's stomach: a kill fills it, digested over a day, a full one is felt and makes it sleepy (`--instant-meals` restores) | kills with the map on fell only in 1 of 4 worlds; with the map off hunters go hungrier and take more hominins | next: A32 |
| A1 | Hunters to prey about 90 kg per 10,000 kg (more prey) | Carbone & Gittleman 2002 | measure the slow-down first; perhaps a rented server by the hour |
| A2 | Knowing when to move on when food around runs out | After "moving is one choice", hunger rose (80 → 115); real apes travel to known food | research foraging decisions first |
| A3 | Moving away from an approaching wildfire | Fongoli chimpanzees watch and anticipate fire (Pruetz & LaDuke 2010) | fire deaths are high |
| A4 | **built 13 Nov (entry 52)** — Learning by watching what others eat (not only copying movements) | Young chimpanzees learn much of their diet by peering, about 60% of it about food (Schuppli et al. 2026) | likely the root of hunger and of copying being selected against |
| A5 | **built 13 Nov in part: copy what worked (entry 52)** — Copy what worked, and copy those one trusts | Social learning strategies (Kendal et al. 2018); oxytocin and trust (Stallen 2012; mixed evidence) | after A4 |
| A6 | Lasting change of fear with experience (braver after moderate scares, more fearful after heavy ones) | Stress inoculation, J-shaped (Parker et al. 2006; 2019) | |
| A7 | Well-repeated learning becoming lasting; learning slows with age | Sensitive periods (songbirds); spacing and sleep (Mazza 2016); lifelong plasticity reduced with age | needs a memory mechanism |
| A8 | Young children kept out of deep water | 11 of 12 drowned in one world were children aged 1–9 | research how young apes avoid water (carried, near mother) — not yet verified |
| A9 | Driving off hunters together with sticks or branches (mobbing) | Chimpanzees threaten leopards with branches (Kortlandt); Gombe chimpanzees barked at and followed a leopard | no numbers: an assumption, tested at both ends |
| A10 | Mating during pregnancy | Gombe: swelling in 41% / 27% / 3% of the three trimesters (Wallis & Goodall 1993) | after B2; matters once male rivalry exists |
| A11 | Testosterone | Rises with male competition for mates (Muller & Wrangham 2004) | needs male rivalry first |
| A12 | Carrying food away from danger | Animals trade food against risk (squirrels eat under cover); no ape evidence found | verify more |
| A13 | Others holding (not feeding) infants | Ngogo: handling linked to faster weaning (Bădescu et al. 2016) | small |
| A14 | Sex ratio at birth about 105 boys : 100 girls (people) | Orzack et al. 2015; chimpanzees not found | small |
| A15 | Sedges and other C4 foods, insects | Early Homo about 35% C4 (Cerling et al. 2013) | diet patch 5, second part |
| A16 | Audit of food values (fruit 70, roots 80, meat 110…) | Hadza digging rates are in scanned papers (needs text recognition installed) | roots in Genesis are generous, not too hard |
| A17 | Disease | Not yet researched | |
| A18 | Sleep that reorganises memories into new insight (not only replays them) | Sleep tripled the chance of discovering a hidden shortcut (Wagner et al. 2004, *Nature*); replay of the day's routes during sleep (Wilson & McNaughton 1994) — Genesis already has replay | how the brain recombines is not well understood: research first, do not invent |
| A19 | **fixed 12 Nov: 5.3 years (entry 44)** — Birth spacing at both ends: Genesis minimum 4.6 years (nursing 4 + pregnancy 0.62) vs wild chimpanzees with a surviving infant 5.2–6.0 (Gombe 5.2: Deschner & Boesch 2007; Mahale 5.6–6.0). Measure the actual mean interval first (entry 19's trace gave 4.6–6.5) | Review finding 3 | |
| A20 | Mothers *tolerate* their young taking food rather than handing it over: captive mothers gave only unpalatable parts, infants initiated (Ueno & Matsuzawa 2004); Mahale mothers shared only when the infant asked | Review, question 1 | replace the push to give with tolerance of taking |
| A21 | Test the registered assumptions never tried at both ends: hunger-first 6, mother's pull 3, temperament/care spread, mood, leaf threshold 0.3, tree cover 0.4, catch × 0.35, fall rate, cold/heat 9/31 °C | Review finding 9 | |
| A22 | **done 12 Nov** — Fix register attributions: pregnancy (Gombe 225 d, not Emery Thompson 2007); brain at birth (45%/25%, Coqueugniot & Hublin 2007; 40% is DeSilva & Lesnik's australopith estimate); sabre-tooth 100 kg is a European specimen; leaf study is a preprint; Lucy's fall disputed; activity budgets weakly sourced; hunters ~3.4–10× too many, not ~9× | Review finding 6–7 | |
| A23 | Name one primary outcome before each test (12 outcomes give a chance "beyond noise" in about half of tests); align strength labels with the log's scale (entries 19, 32 → moderate; 25's copying → weak) | Review findings 4–5 | method |
| A24 | **done 13 Nov: table (entry 42), method guide (docs/METHOD.md), write-up draft (docs/paper/band-size.md)** — A short method guide (`docs/METHOD.md`) and the reality-check table with passes and fails on the Research page | Fable's opinion, adopted by the owner 12 Nov | after the reality-check suite |
| A25 | **postponed (the owner, 13 Nov)** — Website: a Discoveries panel (who found what, when, who learned it from whom) and a first-visit guide | The owner, 13 Nov: after the review fixes | 1–2 days |
| A26 | **Make nut cracking realistically hard** (Fable's step 3 toward a tradition; the owner, 13 Nov): today one strike with a stone on a nut always works, so nearly everyone finds it alone. Real: young chimpanzees start at 3.5–6 years and need 3–7 years to master it (Bossou), about 4 years of practice at Taï; efficiency keeps improving to about 11 and stays different between individuals; old age lowers it (Berdugo et al., Nature Human Behaviour; eLife 2025). Design: nobody is stopped or guided; a strike succeeds with a chance that grows with the hominin's own practice (its hands improvin| A27 | **in progress (entries 82–)** — Oldowan toolmaking as the stone allows (design `docs/design/oldowan-knapping.md`, review `docs/reviews/2026-11-14-fable-oldowan.md`): step 1 cutting is an act (82); step 2 flakes per bout from a core that runs out, with hammer weight and body strength; no skill counter (the owner) | Snyder et al. 2022: naive people get cutting flakes within 21–36 minutes; capuchins flake by accident (Proffitt et al. 2016) | rock quality waits for geology (A43) |
| A27 | **APPROVED 13 Nov (the owner): build next, after entry 62** — **Bodies that grow, and strikes with real physics** (the owner, 13 Nov: "we shouldn't hardcode stuff out of air") | Body mass by age from Gombe (Pusey et al. 2005: about 10 kg at 5, 21–24 kg at 10, adults 31–39); strike energy E = k·m_stone·g·h (capuchins: Liu et al. 2016); shell strength by nut (Peters 1987; Visalberghi et al. 2008). For today's nut it would block only infants under 1–2 years; it matters for hard nuts (Panda) and stone size. Missing: energy needed to crack Coula or oil palm, stone masses in Genesis | Then the 3.5-year limit can go, if practice alone puts first success near 3.5–5 years (test first: run without the limit) |
| A28 | **Realism audit (13 Nov, the owner's aim)**: 15 gaps from real 2.5 Ma hominins, ranked, with fixes and an order — `docs/reviews/2026-11-13-fable-realism-audit.md`. Biggest: ice-age animals by default; one body for all ages and sexes; human pair bonds; fire-making; unregistered flake/hunting/fishing numbers; diet; free walking; fur/sweat contradiction | Fable audit | Work through in the audit's order; verify each citation before building; one change at a time with a switch |
| A29 | **Insects in the diet** (realism audit, gap 6, not yet built): termites and other insects are part of the C4 signal and of every ape's diet; chimpanzees fish termites with probes (Gombe); bone tools at Swartkrans and Sterkfontein were used to dig termite mounds (Backwell & d'Errico 2001, about 1.8–1.0 Ma) | Needs a new food (mounds), a way to sense it, and probing as a use of a stick | After the scale step |

## 3b. The real world of 2.5 million years ago — must be added (the owner, 12 Nov 2026)

Genesis must not be a safe world: the pressures that shaped hominins are what we are trying to understand. Each item is
verified online, built with a switch, and tested on its own before the next, in roughly this order (dependencies first).

| # | What | Why (to verify before building) | Depends on |
|---|---|---|---|
| R1 | A hungry season for hominins in the tropics | **Checked 12 Nov:** Genesis has a rain belt that follows the sun, and grass grows with rain, but fruit, roots and nuts grow with warmth only, so in the tropics hominin food barely changes through the year — no hungry season. Real savanna woodland: fruit peaks in the *late dry season*, scarce in the *early wet season* (Ugalla: chimpanzees fall back on fibrous foods, smaller parties); forests: fruit follows rain (Kalinzu); Fongoli: some fruit every month | find month-by-month fruit data for an African savanna woodland, so the lag after the rains is right — do not simply tie fruit to rain. **12 Nov:** Issa wet season Nov–Apr, dry May–Oct (Piel et al. 2017); Ugalla studies disagree on the scarcest time (early rains vs dry season); monthly tables are in the full papers — not yet built |
| R2 | The real East African landscape: the Rift, lakes that grow and shrink, volcanoes, spreading grassland | Patch 7 of the plan | climate data of the time |
| R3 | Long climate swings between wetter and drier periods | Plan, patch 7 | R2 |
| R4 | Crocodiles at rivers and lakes | **Researched 12 Nov:** the OH 8 Homo habilis foot (about 1.8 Ma) bears crocodile damage; some Oldowan sites lay near crocodile habitat (Njau); Nile crocodiles live throughout chimpanzee range and can kill one; chimpanzees rarely recorded as their prey; small crocodiles flee. **No attack rate found** | build second, the attack rate an assumption tested at both ends |
| R5 | Eagles taking small children | The Taung child (Berger & Clarke 1995) | birds as agents |
| R6 | Lions, and the hunters balanced against prey | | A1 |
| R7 | Venomous snakes | Primates detect snakes fast (snake detection theory) | |
| R8 | Dangerous large plant-eaters: elephants, hippos, buffalo | They kill when threatened | A1 |
| R9 | **built 12 Nov (entry 46)** — Disease and parasites | **Researched 12 Nov:** at Gombe illness caused 58% of chimpanzee deaths with known cause, mostly in respiratory epidemics; aggression 20% (Williams et al. 2008); Kanyawara: respiratory illness the top cause, 27% of deaths over 31 years. Genesis has none — its hunger deaths may stand in for deaths that were mostly disease | **high priority**; research how illness spreads between apes and how deadly it is, then build |
| R10 | Violence between groups (raids) and infanticide by males | Chimpanzees raid neighbours and kill; males kill infants not theirs | several groups (R14); male rivalry (R13) |
| R11 | Bone marrow from bones broken with stones | **Researched 12 Nov:** Oldowan hominins certainly broke bones with hammerstones for marrow; Nyayanga (2.9 Ma) tools used for marrow and roots (Plummer et al. 2023); Dikika (3.4 Ma) disputed; wild chimpanzees break bones or use sticks for marrow; fresh tibia and femur about 664–685 kJ per 100 g of bone | **build first**: bones already lie where animals died; striking one with a stone cracks it for marrow, as with nuts — physics, not scripted |
| R12 | Termites and other insects, eggs, honey, small animals; sedges and grass seeds | Diet evidence | A15 |
| R13 | Males competing for rank and mates (and testosterone) | Chimpanzee males; Muller & Wrangham 2004 | B2 |
| R14 | Several groups, and females moving between them at adolescence | **Researched 12 Nov:** males stay; many females leave about a year after first full swelling (9–12 years): about half at Gombe's Kasekela, four in five at Mitumba; never seen mature males immigrate at Mahale in 34 years (Pusey & Schroepfer-Walker 2013 and others). Several groups of 25–40 that exchange females make a bigger connected population — the owner's "bigger is the key" | after the community test; the laptop handles 80+ hominins |
| R15 | Grooming, alliances, making up after fights | Primate social life | |
| R16 | Specific alarm calls for different dangers | Vervet monkeys' leopard / eagle / snake calls (Seyfarth et al. 1980) | |
| R17 | Paranthropus: a second hominin species living alongside | **Researched 12 Nov:** earliest probable *P. aethiopicus* about 2.66 Ma (Laetoli), a 2.5 Ma cranium west of Turkana (not all researchers accept it as a separate species); *P. boisei* after about 2 Ma lived alongside early Homo in eastern Africa; by about 2 Ma Turkana Homo ate about 65% C3 / 35% C4 foods but *P. boisei* about 25% / 75% — C4 grasses or sedges (Cerling et al. 2013); microwear suggests it did not chew much abrasive food, so soft, brittle C4 plants (2016 study). *Australopithecus garhi* (about 2.5 Ma, Ethiopia) not checked | needs a second hominin kind with its own body, big chewing teeth and a sedge diet (R12/A15), and the landscape and climate that split the two species' food (R2, R3) |
| R18 | Baboons competing for the same foods | | A1 |
| R19 | Scavenging contests with hyenas at carcasses | | A1, W2 |
| R20 | Carrying things over long distances (stones carried kilometres to Oldowan sites) | Oldowan sites | |
| R22 | Hair and sweat as inherited, evolvable traits: how furry vs. how many sweat glands, with real costs and benefits (the owner's question: how did hominins become hairless?) | **Researched 12 Nov:** permanent dark skin (so functional hairlessness) by about 1.2 Ma or earlier from the MC1R gene (Jablonski & Chaplin; Rogers 2004) — Homo erectus; some genetic dates much later (about 240–350 ka), so disputed; humans have about 10× the sweat glands of chimpanzees and macaques; hair follicles and sweat glands come from the same embryonic skin layer and share switches (the gene *En1* increases sweat glands, reduces hair); leading explanation: cooling during walking and running in hot open country, which may have let the brain grow (Wheeler 1984, revised by Ruxton & Wilkinson 2011); also fewer ectoparasites (Pagel & Bodmer 2003) and sexual selection. Genesis today: cold and heat thresholds fixed (9 °C and 31 °C, assumptions), nothing can change | needs: heat that builds with activity in the open, water to sweat with, night cold, sunburn, later parasites (R9). Then hairlessness can spread by selection — never set by hand |
| R23 | Regional differences between groups: skin pigment, and later hair and sweat-gland traits (the owner's question: how did we become different in skin, eyes, hair across continents?) — long-term, research only | **Researched 12 Nov:** all living people descend from Africa (exit within about 55–200 ka; main spread into Eurasia over by about 43.5 ka, 2024); more genetic variety inside Africa than anywhere else; dark skin first (UV protection, folate), light skin later with weak sun (vitamin D) — skin colour follows latitude (Jablonski & Chaplin); Europeans and East Asians lightened separately with mostly different genes (SLC24A5, SLC45A2, TYRP1 vs OCA2, DCT, ATRN; KITLG shared); timing recent: KITLG about 30 ka, European-specific genes about 11–19 ka (Beleza et al., wide uncertainty); EDAR 370A selected in East Asians about 10 ka (hair thickness, sweat glands, teeth; Bryk et al. 2008); the eyelid fold has no solid explanation (snow-glare idea unverified) | needs: several isolated groups in different latitudes (R14), a UV and latitude climate (R2, R3), an inherited pigment trait with real costs (sunburn and folate loss vs vitamin D), hair and sweat (R22), and about 1,000+ generations — at today's speed roughly a week of computing per world (a generation of about 20 years is 60 simulated days; about 11 seconds per simulated day), so a much faster engine first. Conditions only, never the outcome |
| R24 | Chimpanzees | **Researched 12 Nov:** not part of the East African world at 2.5 Ma — chimpanzees are a forest species of West and Central Africa; the only fossil chimpanzees ever found are three teeth about 500,000 years old at Kapthurin, Kenya, in the Rift Valley beside an extinct Homo (McBrearty & Jablonski 2005); the Rift was thought a barrier to them. So not added as a species of this world; they stay our yardstick for numbers | maybe later: a separate forest world with chimpanzee traits as a comparison |
| R21 | Stone tools already existing (2.6–3.3 million years ago): say on the Research page that "discover them" is an experiment | Lomekwi, Gona, Nyayanga | — |
| R25 | Rain and sleep (the owner's question, 13 Nov: should rain bother a sleeper?) | **Checked 13 Nov:** apes do sleep through rain but choose where: before rainy nights Nyungwe chimpanzees pick taller trees with denser canopy and build thicker, deeper nests in cooler or wetter weather (Current Biology 2026; UWA release); Fongoli savanna chimpanzees adjust nest building to the weather (Stewart et al. 2018); bonobos and orangutans may roof nests, chimpanzees build open ones. Not found: measured sleep disruption by rain. Genesis today: rain feels about 5 °C colder unless under cover (`coldOf`), and a sleepy hominin's pull toward cover is 2.5× stronger in rain; nothing wakes a sleeper in rain, and nests are not modelled (only heaps of branches, A-shelter) | maybe: rain on an uncovered sleeper chills it more (and may wake it); nests as something to discover. Research the size of the effect first; not under the freeze |

## 4. Open questions and measurements

- **A communication detector (the owner's idea, 12 Nov): did they start to exchange words and understand each other?**
  Genesis already has a partial one (`src/talk.js`, `meaning()`: a sound counts as meaning something when it is used at
  least 25 times, at least a quarter of those in one situation, at least 1.6 times as often as people are usually in it;
  hearers' reactions: come closer, move away, answer). Weaknesses: a fixed threshold with no statistical test and no
  correction for the thousand sounds tried (chance alone will label some as meaningful); it records hearers' reactions
  but cannot show that they *use* the sound (Lowe et al. 2019: a signal can carry information without the listener using
  it); nothing measures exchanges or shared understanding. Build as an analysis tool (no change to the world):
  (1) speaker side — sound vs situation with a binomial test and a false-discovery correction, plus mutual information;
  (2) hearer side — a playback experiment as in vervet research: replay the sound into a hominin's brain in a neutral
  moment against silence and against another equally common sound, read-only, and see whether its action odds change,
  and consistently across hearers (Macedonia & Evans 1993 criteria: production specificity and perception specificity);
  (3) exchange — call-and-answer chains within a few steps, against chance; (4) shared code — how many hominins both
  use and respond consistently to the same sound, and whether children pick it up; (5) controls — it must report
  nothing on blank brains and shuffled data. Report in plain words, never more than the data support: none / sounds
  spreading but no meaning / speaker-side meaning / meaning with response / exchange. Expect nothing for a long time:
  voice control starts ape-like.

- **Are discoveries repeated and passed on, or one-offs?** The counts so far are the *first time* something happened
  (cracking a nut, a sharp flake, cutting meat, a fire); many happen by chance on day 1. Measure how often each is
  repeated, by how many hominins, and whether it spreads from one to others — that is what culture is.
- Why are cutting meat (2 of 12 worlds) and starting fires (6 of 12) rare? Each needs two chance events at once, and a
  discovery cannot spread by watching (A4). More hominins and longer runs (A1, speed) give more chances — never make them
  artificially easier.

- Why is learning from others bred out across generations (0.76 → 0.42 and 0.90 → 0.31 in two worlds)? Check again
  with practised founders (results saved, unread) and after A4.
- How long do bands last beyond 67 years? Long runs after the current fixes.
- Children aged 1–4 out of their mother's sight 17% of the time (real infants almost never): re-measure with W4.
- What does one creature in Genesis stand for — one animal or a herd? (A1)
- The Research page should say that "tools must be discovered" is an experiment: hominins made stone tools by 2.6–3.3
  million years ago.

## Follow-ups from entry 86 (16 Nov 2026)

- **Why does learning from others fall?** It fell in 17 of 18 worlds beside a neutral marker that drifted 9 up / 8 down. Split the
  change into deaths and births (founders who died vs lived; children vs their parents), by age and cause of death; then test with
  the mutation rule 10 × slower (`SOC.mutP` 0.02). No change to the world until the cause is measured.
- Report every inherited trait beside `neutral_marker` in every future entry about evolution (master plan, test E1).

## Parked 17 Nov 2026 (the owner: go on with the plan; the paper may be downloaded by hand later)

- Hunters, digestion by size and the leopard's stomach share: need De Cuyper et al. 2019, *Oikos* 128:13–22 (gut capacity and kill
  frequency by body mass; "above 30 kg, predators can afford to hunt every second day", as summarised). Both open copies refuse automated
  download. Then the energy cap (fat from a gorge), then F1 detection.
- Unexplained from entry 93: hominins burned to death fell 90 → 36 with the satiety brake.

- **De Cuyper reference, exact (from a Wiley citation export the owner saved, 17 Nov):** De Cuyper A, Clauss M, Carbone C, Codron D, Cools A, Hesta M, Janssens GPJ (2019) Predator size and prey
  size–gut capacity ratios determine kill frequency and carcass production in terrestrial carnivorous mammals. *Oikos* 128(1):13–22. doi:10.1111/oik.05488. Not open access (the owner's download of
  `oik.05151`, an unrelated parasitoid paper, came from the same list). **What the abstract alone supports (qualitative, no numbers):** small carnivores may have to eat to full stomach capacity
  repeatedly a day, needing fast digestion; large carnivores need not eat to full capacity every day, or every day at all, which lowers kill frequency and drives scavenging and partial carcass
  consumption; the model uses carnivore mass, prey mass, pack size, partial consumption and gut capacity, with a negative size–kill-frequency relation for large prey-feeders. That backs the
  direction of the satiety brake (entries 92–94) but gives no stomach share, digestion time or leopard figure: those need the full text, the Dryad data (doi 10.5061/dryad.n23q7q1, assumed
  to be this paper's) or the companion gut-fill paper (De Cuyper et al. 2020, *Comp Biochem Physiol A*, LJMU repository record 12632).

- **De Cuyper et al. 2020 read (17 Nov; the owner downloaded the LJMU copy; text decoded by a plain-text extractor with garbled capitals and digits 2, 3, 6, 7, not checked against the page images: re-check
  Table 3 by eye, e.g. after `brew install poppler`).** *Comp Biochem Physiol A* 2020 (doi 10.1016/j.cbpa.2020.110683): dry-matter gut contents for 25 Carnivora species by the occupancy principle.
  Abstract (clean text): across Carnivora and herbivores dry matter intake ~ BM^0.75, digestibility ~ BM^0, retention time ~ BM^0.11, dry-matter gut contents ~ BM^0.88; carnivores' intake level reached
  77%, their retention time about 32% and their dry-matter gut contents only 29% of the herbivores'. **Table 3 (carnivores, as decoded):** mean retention time RT (h) = 8.1 × BM(kg)^0.14 (phylogenetic fit; 95% interval of the
  intercept 3.5–18.9, of the exponent −0.04–0.31), or 6.7 × BM^0.23 (ordinary fit): about 14–16 h for a 50 kg leopard or a 60 kg hyena; dry-matter gut contents DMC (kg) = 0.009 × BM^0.77 (phylogenetic; intervals wide)
  or 0.006 × BM^0.98. **What it supports for the sim:** the digestion time (`SOC.digestH` = 24 h to empty a full stomach, sim.js:114) looks long against a mean retention time of about 14–16 h for hunter-sized carnivores
  — test both ends (14–16 h and 24 h) with a prediction first; mean retention time is not the same as time to empty a full stomach, so say so. **What it does not give:** the largest stomach a hunter can fill at one gorge
  (the sim's `SOC.gutShare` 0.25 of body weight, spotted hyena 14.5 of 60 kg): that is stomach *capacity*, which the 2019 kill-frequency paper (Zurich accepted manuscript) uses; this paper gives the average content
  (wet gut contents of a dog and of a smaller carnivore about 13.9% and 0.7% of body mass as decoded; one citation of wolves eating up to 22% of body mass at a meal).

## Follow-ups from entry 95 (17 Nov 2026)

- **Entry 96 (17 Nov): the mother's pull explains part of it** (butchery 32 → 43% female, burning sticks 30 → 44% without it; weak evidence). Still open: why the band is smaller without the pull (births? not measured), and why hunting leans female. Original item: Why do butchery, burning sticks and marrow lean male, and hunting a little female? Test the mother's pull (`--no-mother-pull`) with the repeat counts; measure where mothers of young infants spend their time against carcasses and fires.
- The hunting lean rests on 37 hunters in 6 worlds: count again over more worlds before reading anything into it.
- Split the other learning measures by sex (step 0.6, second half): the chain probe, copying from others, fire skill.
- The shared-word count (2,791 in 24 worlds) is far above the prediction: check what "three say it, ten times" means against the
  word list (`words_shared`) before treating it as language.


## Follow-ups from Fable on labelled senses (17 Nov 2026; `docs/reviews/2026-11-17-fable-labelled-senses.md`) — the owner decides
- Honest-label fixes (smallest step toward F16): (1) remove the hunger/thirst multipliers from the food and water channels (`src/senses.js`
  lines ~236–276; need already reaches the brain at `x[IB]`, `x[IB+1]`); (2) mate channel from sight and visible cues only (not `o.rd`, not 6 × range
  through hills); (3) family by familiarity; (4) founders' recognition skill 0.9 → test about 0.5. Each with a switch restoring the old rule,
  identical-worlds check, prediction first. Test: labels / honest labels / blind control (/ raw `retina()`), 24 worlds.
- Smell (A45) before raw vision. Not: raw vision as default, heritable eye traits (ape eye was fixed at 2.5 Ma), a bigger brain for raw light.
- `retina()` has never been measured in an entry: run it once as a blind-or-raw reference.

## Smell design note (17 Nov 2026): `docs/design/smell-droppings.md`
- Sourced as far as the literature goes: qualitative yes, distances and rates mostly not (hyena range, wind limits, dung output, removal by sun and rain,
  carcass smell duration, parasite risk: all unverified). Today's `near` (2 squares = about 6 km) is hyena range, not primate range; smell cannot be honest on
  a 3 km grid, so **build it with the fine valley (F9)**, not before. The owner decides; a Fable review of the note comes first.

## Nuts and roots by season (17 Nov 2026): `docs/reviews/2026-11-17-nuts-roots-seasons-sources.md`
- No honest seasonal rule for nuts (no savanna data) or for roots' size of swing; Ugalla roots are dug in the rains, **not** as a lean-season fallback. Do not
  build a seasonal nut/root rule; register the root swing as an assumption (1× to mild wet-season rise) or leave it flat.
- **Check entry 89**: "lowest late in the rains" was not found in Piel et al. 2017's text (inverse to rainfall, peak early dry, Figure 3 only). If it is
  not in the paper, correct the wording (second correction of a citation after the Guinea-Bissau one).

## The page must show what the sim does (the owner, 17 Nov 2026: "the UI needs to be accurate")
The owner cannot run the sim to check, so what is drawn is what is believed. Audit of a seed-3 world, 20 days, people sampled every 4th step:
- **Sleeping on a river square (0.3% of sleeping samples; 12 of 4,291)**: the sim treats a river square as mostly bank, but the page drew the sleeper on the river line.
  Fixed on branch `ui-actions` (drawn 0.3 of a square beside the channel, on one bank by id); verified by the drawn coordinates, not by eye.
- **In water (577 samples, none in deep water)**: wading and swim practice were not drawn at all. Built on `ui-actions`: body below the surface, arms reaching in
  turn, ripples. Verified on a test canvas (the flat-map and figure drawing); the globe's ripple rings **seen by eye on 17 Nov** (a person in the sea: body below the surface, arm in a stroke, a ring on the water); released with the river fix.
- **Striking is 23% of all person samples (3,299): stick 1,502, stone 973, empty hand 813, flake 11.** The page draws the swing but not what is struck or what comes of it
  (a nut cracking, a flake coming off, a root dug, a bone broken, soil flying). Needs a drawing-only record in the sim of what each strike hit (no random numbers) so the page
  can show it. **Built 17 Nov** (nut, bone, stone, flake, dig, cut, poke, spark, rub, hit; seen on a test canvas; identical worlds).
- Still to audit action by action against the 19 actions (`src/config.js` A_*): climbing a tree (is the climber drawn up it?), mating, attack on prey, giving, carrying a burning
  stick, running or fleeing, drinking from a river square, a mother nursing; and a newborn (carried until 2 years: drawn riding on the mother, `ui/app.js` ~2490; the owner saw
  one walking at birth — not reproduced; ask which view and which baby).
- Check that every Doing text matches the drawn pose.

## Hominin voice (17 Nov 2026): `docs/design/hominin-voice.md`
- Sourced partly. First step (built on branch `ui-voice`, audio only, nothing in the sim changes): ape-like calls in the page's Listen sound — grunt, hoo, scream — with every
  F0, duration and noise share registered as an assumption. **Open (a design question, Fable review first):** the sim's words are human consonant-vowel syllables; apes use few,
  graded, context-bound calls. Not changed.

## Human-style words (Opus, 17 Nov 2026): `docs/reviews/2026-11-17-opus-human-style-words.md` — the owner decides
- **Measurement-only first:** make `words_shared` band-local (speakers heard each other) and report its excess over a shuffled-speaker baseline and over the deaf arm; re-measure
  entry 95's worlds to see how much of 116 shared words a world was chance. Rename `words_said` (calls made).
- Rename in the log and page: an abstract call space with ape-limited control, shown as grunt variants rather than "de" (no change to the creatures).
- At the language stage (L0–L3): a graded call space (F0, duration, noisiness, rise/fall) in place of CV syllables, with a switch (`--cv-voice`) restoring today's model; three arms
  (graded, CV, deaf); founder `vl` 0–0.05 and 0–0.3. Not: a smaller syllable set, letting `vl` evolve CV syllables, any reward for convergence.

## Follow-ups from entry 97 (17 Nov 2026)
- Trace why, with the honest eye, leaf eating fell 91% and picking things up 45%; why deaths from wounds fell about two thirds; why predator deaths of hominins rose by half; why thirst
  deaths went to zero. Measure hunters' attacks while full (`tools/analysis/hunt-measure.js`) in both arms.
- Every earlier table used the old eye: re-run the headline baselines (reality-check rows, hunger, learning) with the default, before the faithful-day table is frozen (step 0.8).
- Fable's next honest-label steps (labelled-senses review): the mate channel (`o.rd`, 6 × range through hills), family by familiarity, founders' recognition skill 0.9 → test 0.5.
- **Sleep is fragmented in the sim** (17 Nov, seed 3, 10 days): 641 sleep periods among about 25 hominins, median 3.25 hours, 46% an hour or less. Real chimpanzees sleep about
  ten hours in one night nest; check against sources (is a doze by day real? how long are bouts?) before trusting the sleep numbers. The page now holds sleepers still.
- **Seen by eye:** the baby clinging to its mother was seen on a drawing canvas (2D figure code), not on the globe (a thinking bubble covered the figure); the globe lifts it by the same fraction.

## Follow-ups from entry 98 (17 Nov 2026)
- Both eyes fail the population row (−2.0% and −3.1% a year), babies dying (too few), age at first birth (too high): the first fails of the faithful-day table. Why do infant deaths halve with the honest eye (wounds among babies? births per
  mother?) — trace with the per-world files in `data/findings/98-baselines-honest-eye/`.
- Why the world shrinks even with the old eye: births per mother-year against real chimpanzees (the birth spacing passes), deaths of adults by predators (32–44% of all deaths).


## How a hominin "sees" another's actions (read 17 Nov 2026, the owner's question: senses connect a creature to the world) — the owner decides
Social learning is not perception in the code (`src/sim.js` ~616–700, ~531–535; `src/brain.js` `imitate`, `imitateAt`, `copySequence`):
- **The elder's choice and its reward are read straight out of its mind.** The copier gets the elder's chosen act as an exact number (`tch.daAct`, one of 19) and the elder's own reward (`tch.lastR`), and both are
  written into the copier's brain weights as a training target (`imitate`). No sense is involved: a real youngster sees hands and food, not a choice or a reward.
- **Watching a whole path uses the elder's own senses** (`copySequence`: "the elder's own record of each moment stands for what it saw"): the youngster is trained on the elder's input vectors, including the elder's
  hunger, thirst and short-term memory, not on what the youngster itself saw.
- **Whom it watches:** anyone within its sight range in squares (`a.g.v`, several 3 km squares), with no check of field of view, hills, trees or night; the "follow the crowd" count reads every one of those elders'
  exact acts. Copying a choice needs the same square (about 0.5 km apart in this model; real peering is within arm's reach), but **voice copying is not limited to the same square** and copies the elder's mouth
  commands (`tch.vc`), not the sound heard.
- **"Copy the successful"** reads the elder's hidden health and energy (`hp + e`).
- What is fair: mothers first, elders only, more copying when unsure, the youngster's own inputs used for single-choice copying (`imitate` uses `a.xi`).
**Smallest honest steps (each with a switch, identical worlds, a prediction):** (1) copy only from an elder actually in view (field of view, line of sight, daylight); (2) replace the act number and reward with what is visible:
what the elder holds and does with its hands, and whether it then eats or is hurt; (3) watching a path: train on the youngster's own view, not the elder's inputs; (4) voice copied from the sound heard, within earshot.
Expect learning from others to fall a lot. Entries resting on copying (48–60, 86) would need re-reading. Real apes copy with low fidelity (emulation vs imitation: to be sourced before building).
- **Done 17 Nov — intervals for the reality rows (entry 100):** the population row moved −3.1% → −4.8% a year between two 24-world runs of nearly the same code. Add a bootstrap over worlds to `reality-check.js --summary`, so a change can be read against run-to-run spread.

- **The page and the experiments simulate different planets (found 17 Nov from the owner's observation: 43 hominins at year 19 on the page).** The page's Land menu defaults to "Earth, 70,000 years ago" (`index.html`
  `#land`, first option); `tools/experiment-core.js` defaults to `earth: false` (a made-up planet). Every table so far was measured on made-up planets. Next: the reality checks with `--earth` (24 worlds), then the owner
  decides whether experiments default to the real Earth (recommended: the aim is East Africa), and the baselines are made again on it.

## Startle, staying on guard, vigilance, alarm calls — under F1 (17 Nov 2026; evidence: `docs/reviews/2026-11-17-startle-vigilance-alarm-sources.md`; the owner: only what the evidence supports)
- **Model (each a close hypothesis):** (a) a startle to any sudden loud sound, a reflex of seconds that fades with harmless repeats (the 15-minute step can show it only as one interrupted step; say so); (c) vigilance as a cost to
  feeding on the ground, nearly free at rest, more on the ground than in trees, less with close neighbours; (d) an alarm call with an inborn sound whose triggers are learned, given more when others near have not seen the threat.
- **Do not model:** staying guarded for hours after a scare (baboons return to normal looking within about 5 minutes: Allan et al. 2024); sentinels; a strong many-eyes effect; vigilance while asleep.
- **A finding against the present model:** fear now halves about every 1.5 hours, far longer than the evidence for vigilance (minutes). Separate fast vigilance (minutes) from slow stress (days to weeks, hormones and grooming) and test a
  short half-life for the fast part; with a prediction, both ends, one switch.
- **How these are built (the owner, 17 Nov):** each behind its own switch, off by default until measured, identical worlds with the switch off, a prediction first that names what result would show it adds something
  artificial (then it stays off and the reason is written here); each registered as **inferred from living primates** (which species, how safe: startle very safe, alarm calls fairly safe, vigilance moderate, minutes-long
  watchfulness weak — one baboon study).
