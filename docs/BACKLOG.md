# Backlog — everything found, decided or verified but not yet done

Kept so that points raised in long discussions are not lost (the owner, 12 November 2026). Each item says what it is,
why (the evidence or the finding), and what it waits on. When an item is done, move it to the research log
(`docs/FINDINGS.md`) and the assumptions register (`docs/ASSUMPTIONS.md`) and delete it here.

Rules for every item: verify online first (the owner's ideas included); one change at a time, with a switch; a paired
test on the same worlds; never tune toward survival.

## 1. Bugs and flaws in the code (fix first: other things rest on them)

| # | What | Why it matters | Status |
|---|---|---|---|
| B1 | After **any** mating the female enters the 4-year nursing wait, even if she did not conceive (`src/sim.js`, mating: `fem.cd = S.cd`) | Harmless while every mating led to pregnancy; with the female cycle, most matings miss the fertile days and lock her out for 4 years with no baby — births fell to a third | to fix: the wait starts only with a pregnancy |
| B2 | After mating, a male cannot mate again for 0.1 year (about 36 days) | No source; real chimpanzee males mate several times a day | verify online, then fix |
| B3 | A fixed population cap blocks mating (`popK + kids < S.cap`) | Not biology: real populations are limited by food, disease and fertility | remove (audit, 11 Nov) |
| B4 | A comment above `child()` (`src/creatures.js`) says learned habits can pass on | The code passes on only inborn wiring (correct); the comment is wrong and misleading | correct the comment |
| B5 | A sudden jolt of discomfort below 15% energy | No source | **done** on branch `refeed-wip` (smooth hunger + refeeding signal at 20%); test running |

## 2. Built, tested, waiting (switched off or not merged)

| # | What | Result so far | Waits on |
|---|---|---|---|
| W1 | Female cycle: 36 days, receptive 13, fertile near ovulation (`--cycle`, off) | Births fell to a third — caused by B1 (and perhaps B2) | B1, B2; then test again |
| W2 | Animals of East Africa 2.5 million years ago (`--africa-animals`, off) | Hunters starved: Genesis has about 9× too many hunters for its prey | A1 |
| W3 | Founders' practice before the world begins (on in the runner) | Did not reduce hunger; drowning doubled | review: learning by watching (A4) may be the real fix |
| W4 | Mother's pull to keep her nursing child near | 31 alive vs 25, better in 9 of 12 worlds; fire deaths and drownings halved | log as an entry; merge |
| W5 | Lasting mood | No clear effect (with the faulty cycle on); retest without the cycle running | results due |
| W6 | Starving: smooth hunger + refeeding signal at 20% (and 25%) | test running | results due |
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

## 4. Open questions and measurements

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
