# Fable reviews "why full hunters keep hunting" (17 Nov 2026)

Read-only; sources marked by depth. Key points (the owner decides what is left out):

**Diagnosis.** Half right. Confirmed in the code: a rush costs no energy (hunters do not pay for walking either); a kill barely rewards a
fed hunter (reward = fall of 3 × hunger²; `feltHunger = (1 − energy/100) × (1 − stomach fill)`). **Correction 1:** hunger does not
return the next day — stomachs already hold days of need (leopard 11.25 kg, 2.7 days; hyena 15 kg, 3.8; sabre-tooth 27.5 kg, 3.3); the
real fault is **range**: hunger is scaled to the 25-day starvation store, not the meal cycle, so the hungry pull and the hunger input
hardly move between "just gorged" and "three days empty". **Correction 2:** "energy 80+" is not "full" (a full store with an empty
stomach is hungry). The clean measure: the chance of attacking when awake prey is beside, by stomach fill. One-world scratch run:
attacks on a stomach over 2/3 full 24% / 23% / 44% (hyena / leopard / sabre-tooth); sabre-tooth at the energy cap (meat thrown away)
19% of the time.

**Options.** Option 1 (longer satiety) as written: no — the stomach already holds days. Option 3 (rush cost): not as the unlearning
device — a leopard's kill surge costs 0.3–1.5% of a day (Wilmers et al. 2017, *Ecosphere* 8:e01850, full text), and field daily needs
already include hunting. **Option 2, keyed to the stomach, is faithful in kind**: a larger meal delays a leopard's next kill (Wilmers
2017, weakly: r² 17%). Order: (0) measure stomach fill and hours since swallowing at each attack; (1) a satiety brake: an inborn pull
against attacking that grows with stomach fill, `RF[A_ATK] −= k × gutFill × prey beside`, k borrowed from the hungry pull's full size
(12), tested at half and double; `--no-full-brake`; (2) digestion time by size (cheetah 25 h, jaguar 43 h; De Cuyper et al., via
manuscript); (3) the leopard's stomach share (0.25 unsupported; evidence 0.10–0.20); (4) the energy cap that throws meat away; then F1.

**Numbers.** Hyena 14.5 kg a sitting = 0.24 of body weight (Smith & Holekamp chapter, full text; Kruuk 1972 not seen). Lion males up to
40 kg (San Diego Zoo sheet, secondary). Leopard daily energy 20,029 kJ (Wilmers 2017, full text); between kills about 1.5–2.6 days.
Leopard daily intake: a Bardia snippet says 4.7 ± 0.3 kg, the register 4.0 (neither checked). **Adamec 1976**: the cats were 48 h
food-deprived and had only begun eating — not gorged; the register's "fed cats still attack" overstates it.

**Prediction for the brake (to write first).** Attacks on a stomach over 2/3 full fall to a small share for all kinds; sabre-tooth kills
fall to about 0.4–0.6 a day, **not** to the field's 0.12–0.23 (if they do, suspect starving); meat a day moves toward need from above
for the sabre-tooth and does not fall for the leopard; no more starvation deaths or newcomers.

**Wrong reasons.** Starving hunters replaced by newcomers; cubs and pack mates losing food; less "eaten" being only less waste (report
energy); the brake touching defence; judging by "energy 80+"; three worlds.

**Left out (the owner's list).** Hunger tied to the meal cycle, for hominins too; fat from a gorge instead of the cap; the cost of
walking and searching for hunters, injury risk in every attack; feeding on one carcass over days, hoisting, theft; a hunt as search,
stalk and rush; surplus killing; higher need for mothers and patrolling males (Wilmers: +8.3%, +25.8%); hyenas eating fast because of
rivals; rest after a gorge at field hours; digestion by body and meal size.
