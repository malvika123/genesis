# Backlog — everything found, decided or verified but not yet done

Kept so that points raised in long discussions are not lost (the owner, 12 November 2026). Each item says what it is,
why (the evidence or the finding), and what it waits on. When an item is done, move it to the research log
(`docs/FINDINGS.md`) and the assumptions register (`docs/ASSUMPTIONS.md`) and delete it here.

Rules for every item: verify online first (the owner's ideas included); one change at a time, with a switch; a paired
test on the same worlds; never tune toward survival.

## 1. Bugs and flaws in the code (fix first: other things rest on them)

| # | What | Why it matters | Status |
|---|---|---|---|
| B1 | **built 12 Nov** (`--old-mating`) — After **any** mating the female enters the 4-year nursing wait, even if she did not conceive (`src/sim.js`, mating: `fem.cd = S.cd`) | Harmless while every mating led to pregnancy; with the female cycle, most matings miss the fertile days and lock her out for 4 years with no baby — births fell to a third | to fix: the wait starts only with a pregnancy |
| B2 | After mating, a male cannot mate again for 0.1 year (about 36 days) | No source; real chimpanzee males mate several times a day | verify online, then fix |
| B3 | A fixed population cap blocks mating (`popK + kids < S.cap`) | Not biology: real populations are limited by food, disease and fertility | remove (audit, 11 Nov) |
| B4 | A comment above `child()` (`src/creatures.js`) says learned habits can pass on | The code passes on only inborn wiring (correct); the comment is wrong and misleading | correct the comment |
| B5 | A sudden jolt of discomfort below 15% energy | No source | **done** on branch `refeed-wip` (smooth hunger + refeeding signal at 20%); test running |
| B6 | **Two clocks** (review finding 1): a day is 96 steps, a year 288 (3 days). Hunger, decay, fire, mood run on the day clock; pregnancy, nursing, life on the year clock — a hominin starves in 14 days = 4.8 life-years; a female cycle lasts 7 hours | Not wrong in itself, but no rule says which process uses which clock, and reality checks "per year" mix them | Assign every duration to a clock, list them in `ASSUMPTIONS.md`, state each reality check with its clock |
| B7 | **built 12 Nov** (`--male-wait`) — The male's wait after mating (0.1 year = 28.8 steps) is as long as a whole female cycle (28.4 steps), so each male can mate about once per cycle; fix with B1 | Chimpanzee males mate several times a day (hours, not weeks) | Put the wait on the day clock (verify a number online first), with B1, then retest the cycle |
| B8 | **labelled 12 Nov** (page now says "not tested against chance" and "not compared with how often they do so anyway"; the real fix waits for the detector, B12) — The page's translator says a sound "means" something with no test of chance (≥25 uses, ≥25% in one situation, ≥1.6× baseline, over ~1,000 sounds) | Honest-minds rule | Use `talk-detector.js`'s tested result, or word it "used more often when… (not tested)" |
| B9 | About ten thresholds steer behaviour unregistered (ready to mate if energy > 45 and water > 40; gives food if > 40; feeds a child if > 45; conception cost; labour pain 0.6; 1% maternal death; lifespan draw 0.72 ± 0.2; forced sleep when exhausted) | Register rule | Add them to `ASSUMPTIONS.md` with ranges |
| B10 | **built 12 Nov** (`vf` split from `im`; `--one-social-gene`) — The `im` gene bundles copying others **and** feeling their pain/fear, so "copying is bred out" (entry 25) may really be "caught fear is bred out" | Review finding 10 | Correlate each hominin's `im` with surviving children on saved worlds; split the gene in two |
| B11 | Crash when a fish learns a lesson (`LG` in `src/state.js` had three slots for four kinds); the runner then wrote the surviving worlds and exited as if all was well | Found in the 100-year run (4 of 8 worlds lost) | **done** (`26a92dd`): fixed; the runner now warns and fails when worlds are missing |
| B12 | The communication detector's **planted-sound check fails**: a sound given a known strong effect in a copy of the brains ranked below all 200 random controls (seed 1, 20 days). Likely cause: the plant scales with how far a sound is from the average sound, so a common (near-average) sound gets a tiny effect and unusual control sounds a bigger one. Until the check passes, the hearer side ("nobody responds") means nothing. Also: the exchange test's null breaks who stood near whom, so an excess can be two hominins calling at the same thing (now said in the verdict) | First test, 12 Nov (`data/findings/talk-detector-first-test/`) | Plant an effect along the planted sound's own direction, normalised; check it is found; add a null that keeps positions (shift calls by a few hours, not anywhere); then run on long worlds (20 days had no sound said 25 times) |
| B13 | **Too safe over 100 years** (entry 37): bands grow about 3% a year (25 → 606), far faster than real chimpanzee communities; no disease, and hunters die out of whole worlds (4 of 8) | Gombe declined, Kanyawara grew modestly (reviews) | Disease (R9) and a hunter population that cannot vanish (A1) move up |
| B14 | Trace the first shelters (entry 37: worlds 1, 4, 5 or 8, days 170–233): who carried the branches, on purpose or by chance, was the heap kept up? | Before calling it building | `tools/analysis/` shelter trace |
| B15 | **Hunters die out of whole worlds** (the owner saw it on the live site; 4 of 8 worlds in entry 37). Each hunter kind is a population of 2–10 for the whole world (caps: 10 wolves, 8 big cats, 6 bears; about 2 of each at the start), so it dies out by chance; and they starve (3–10× too many hunters for the prey). Real: Serengeti leopards about 5.5 per 100 km² (Allen et al. 2020), hyenas 80–200 per 100 km²; an isolated puma population of a few dozen has a 16–21% chance of dying out in 50 years (Benson et al. 2019); immigration rescues small carnivore populations (Brown & Kodric-Brown 1977; one marten a year cut 100-year extinction risk below 1%) | The owner, 12 Nov: build both, one at a time | (1) trace which kinds die and of what; (2) newcomers from the wider population when a kind is rare or gone (rescue effect), tested; (3) more prey per hunter to the real ratio (A1), tested |

## 2. Built, tested, waiting (switched off or not merged)

| # | What | Result so far | Waits on |
|---|---|---|---|
| W1 | Female cycle: 36 days, receptive 13, fertile near ovulation (`--cycle`, off) | Births fell to a third — caused by B1 (and perhaps B2) | B1, B2; then test again |
| W2 | Animals of East Africa 2.5 million years ago (`--africa-animals`, off) | Hunters starved: Genesis has about 9× too many hunters for its prey | A1 |
| W3 | Founders' practice before the world begins (on in the runner) | Did not reduce hunger; drowning doubled | review: learning by watching (A4) may be the real fix |
| W4 | Mother's pull to keep her nursing child near | 31 alive vs 25, better in 9 of 12 worlds; fire deaths and drownings halved | log as an entry; merge |
| W5 | Lasting mood | No clear effect (with the faulty cycle on); retest without the cycle running | results due |
| W6 | Starving: smooth hunger + refeeding signal at 20% (and 25%) | 24 worlds: no measurable effect on survival or hunger at either end; 20% vs 25% within noise — keep, at 20% (evidence) | merge; then **each hominin inherits its own threshold in 20–25%** (the owner's idea: individuals differ; selection may favour one end) |
| W7 | Ape-like care: only mothers feed their young (`--human-care` restores foragers') | test queued | results due |

## 3. Verified, not built yet (in a sensible order)

| # | What | Evidence | Note |
|---|---|---|---|
| A1 | Hunters to prey about 90 kg per 10,000 kg (more prey) | Carbone & Gittleman 2002 | measure the slow-down first; perhaps a rented server by the hour |
| A2 | Knowing when to move on when food around runs out | After "moving is one choice", hunger rose (80 → 115); real apes travel to known food | research foraging decisions first |
| A3 | Moving away from an approaching wildfire | Fongoli chimpanzees watch and anticipate fire (Pruetz & LaDuke 2010) | fire deaths are high |
| A4 | Learning by watching what others eat (not only copying movements) | Young chimpanzees learn much of their diet by peering, about 60% of it about food (Schuppli et al. 2026) | likely the root of hunger and of copying being selected against |
| A5 | Copy what worked, and copy those one trusts | Social learning strategies (Kendal et al. 2018); oxytocin and trust (Stallen 2012; mixed evidence) | after A4 |
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
| A19 | Birth spacing at both ends: Genesis minimum 4.6 years (nursing 4 + pregnancy 0.62) vs wild chimpanzees with a surviving infant 5.2–6.0 (Gombe 5.2: Deschner & Boesch 2007; Mahale 5.6–6.0). Measure the actual mean interval first (entry 19's trace gave 4.6–6.5) | Review finding 3 | |
| A20 | Mothers *tolerate* their young taking food rather than handing it over: captive mothers gave only unpalatable parts, infants initiated (Ueno & Matsuzawa 2004); Mahale mothers shared only when the infant asked | Review, question 1 | replace the push to give with tolerance of taking |
| A21 | Test the registered assumptions never tried at both ends: hunger-first 6, mother's pull 3, temperament/care spread, mood, leaf threshold 0.3, tree cover 0.4, catch × 0.35, fall rate, cold/heat 9/31 °C | Review finding 9 | |
| A22 | **done 12 Nov** — Fix register attributions: pregnancy (Gombe 225 d, not Emery Thompson 2007); brain at birth (45%/25%, Coqueugniot & Hublin 2007; 40% is DeSilva & Lesnik's australopith estimate); sabre-tooth 100 kg is a European specimen; leaf study is a preprint; Lucy's fall disputed; activity budgets weakly sourced; hunters ~3.4–10× too many, not ~9× | Review finding 6–7 | |
| A23 | Name one primary outcome before each test (12 outcomes give a chance "beyond noise" in about half of tests); align strength labels with the log's scale (entries 19, 32 → moderate; 25's copying → weak) | Review findings 4–5 | method |

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
| R9 | Disease and parasites | **Researched 12 Nov:** at Gombe illness caused 58% of chimpanzee deaths with known cause, mostly in respiratory epidemics; aggression 20% (Williams et al. 2008); Kanyawara: respiratory illness the top cause, 27% of deaths over 31 years. Genesis has none — its hunger deaths may stand in for deaths that were mostly disease | **high priority**; research how illness spreads between apes and how deadly it is, then build |
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
