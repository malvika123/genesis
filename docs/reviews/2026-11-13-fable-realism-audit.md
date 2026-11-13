# Realism audit of the hominin (Fable, 13 Nov 2026) — the owner's aim: faithful mini copies of 2.5 Ma hominins

Read-only. Classes: H hominin evidence · S stand-in · I invented · M missing. Citations not marked "checked" are from the reviewer's
memory or the register and must be verified before building. Claude checked gap 1 in the code (`src/world.js:51-55`): confirmed.

## Gaps, furthest from reality first
1. **Default animals are ice-age** (wolf, bear, bison, deer, rabbit) unless `--africa-animals`; still missing *Dinofelis*,
   *Homotherium*, crocodiles, eagles (Taung child: Berger & Clarke 1995). (I) Fix: scale/hunter-to-prey decision, then African default;
   until then every result is labelled "ice-age animals".
2. **One body for all ages and both sexes** (`size: 0.75`). Adults 31–41 kg by species (Jungers et al. 2016); males 1.2–1.55 × females
   (McHenry 1992). (M) Fix: A27 — growth (Gombe shape, stand-in) scaled to hominin adults by sex; Kleiber.
3. **Human pair bonds and fathers** (`pair: 1`; founders in couples; father attached) on chimpanzee mating. Strong dimorphism argues
   against pair bonds; females dispersed (Copeland et al. 2011, *Nature*, checked). (S) Fix: switch, pairing off by default for
   hominins, test both; female dispersal needs several groups.
4. **Fire-making** (pyrite, friction): earliest known about 400 ka (Barnham, *Nature* 2025, checked via news); none at 2.5 Ma. (I)
   Fix: natural fire only; making fire a labelled experiment, tested off.
5. **Stone flakes: flat 5% per strike, no skill, quality or transport; flake only speeds cutting meat (0.35 vs 0.12)** — unregistered.
   Oldowan 2.6 Ma (Gona, Ledi-Geraru); tools used mostly on plants, also butchery and pounding (Plummer et al. 2023; Lemorini et al.
   2014); stone carried about 10 km (Braun et al. 2008). (I) Fix: register; plant uses; marrow (R11); skilled knapping after A27.
6. **Diet:** no C4/sedge foods or insects (early *Homo* about 35% C4, Cerling et al. 2013; *P. boisei* about 77%, 2011); raw roots
   valued above fruit (Hadza rank tubers last); nuts grow by oak/hazel/walnut rules. (S/M)
7. **Hunting 0.25 per try, bare-hand fishing, uncontested carcasses** (unregistered). Cut-marked bones 2.5 Ma, probably scavenged
   (Bouri; Gona); aquatic foods only from 1.95 Ma (Braun et al. 2010). (I) Fix: register; small prey only; hyena contests (R19); fishing off.
8. **Walking on the flat costs nothing; babies nurse from 6 squares away.** Human walking about 75% cheaper than chimpanzee
   (Sockol et al. 2007, checked); australopiths at or below ape cost (Pontzer et al. 2009). (M) Fix: mass-based travel cost, both ends;
   nursing in the mother's square; carrying cost (to verify).
9. **Nursing 4 years (chimpanzee).** *A. africanus* / *P. robustus* took other foods within months; early *Homo* about 3–4 years
   (Tacail et al. 2019, checked). (S) Fix: state which hominin; test about 1 year exclusive.
10. **Fur and sweat contradict:** furless rain and sweat penalties, but fur-like cold/heat limits. (I) Fix: one consistent choice, both ends.
11. **Swimming learned** (modern human; apes do not swim). (S) Fix: off or both ends.
12. **Babbling, vocal imitation, pointing** (human). (S) Fix: label; test with genes at 0.
13. **Brain cost about 2%** against 8–10% in primates, 20–25% in humans (Leonard & Robertson 1994). (S) Fix: scale.
14. **Nut cracking** (West African chimpanzee; no evidence at 2.5 Ma); the 3.5-year limit is a hard-coded outcome.
15. **Founding ages from foragers (12% elders)**; old adults rare among australopiths (Caspari & Lee 2004). (S) Fix: chimpanzee pyramid.

## Already faithful
Body size range, brain proportion and newborn brain (H); fast ape-like growth timing (H); slow running (H); tree sleeping as a
choice; African homeland and habitat; no grass eating; labelled chimpanzee stand-ins for pregnancy, first birth, cycle, conception,
no menopause, disease, leaves, mother-only feeding; digging roots with sticks; flakes speeding butchery; carcass decay and vultures.

## Too thin to build (keep as switches tested at both ends)
Group size and range; mating system beyond "probably not pair-bonded"; hunting success; sleep length; fur and temperature limits;
a hominin growth curve; strike energy; nut use; separate *garhi*/*aethiopicus* bodies; vocal ability; any fire use.

## Recommended order
1. Cheap honesty fixes: fur/sweat (10); register unsourced numbers (5, 7, 11); pair-bond switch (3); swimming and fishing switches.
2. Growing, dimorphic bodies (2). 3. Travel cost, carrying (8), brain cost (13). 4. Diet (6), nursing (9).
5. Scale decision → African animals by default (1) → carcass contests (7). 6. Strike energy → marrow, plant cutting → skilled knapping
and transport (5). 7. Several groups → female dispersal, male rivalry (3). Fire (4) stays a labelled experiment throughout.
