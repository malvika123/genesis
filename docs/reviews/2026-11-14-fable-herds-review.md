# The prey map: a visible animal as one animal, or as a herd? (Fable, 14 Nov 2026)

Recommendation: **option (ii), a visible plant-eater is a herd**, with two changes: the number of herds comes from the map (never a
fixed count kept near the band), and the thinning still needed is one registered number tested at both ends, including no thinning.

Why: a 9 km² square at 5,000 kg/km² holds about 45,000 kg — never empty — and medium antelope are not solitary; a thin sample of
lone individuals (option i) would make most squares look empty and its sample size (about 1 in 100) would directly set every
encounter rate. Herds flee together and remain after a kill, as real ones do.

Sources found: the level of plant-eater biomass on rainfall and soil nutrients, Fritz & Duncan 1994 (*Proc R Soc B* 256:77–82):
log10 B = 1.58 log10 P − 0.67 (high-nutrient soil, n = 19), 1.78 log P − 1.32 (medium, n = 16), 1.96 log P − 2.04 (low, n = 24),
B in kg/km², P in mm a year, wild ungulates over 15 kg (checked by Claude in the paper's text) — about 5,200 kg/km² at 600 mm on
rich soil, 1,150–8,300 across 400–800 mm; Genesis has no rainfall in mm, so the map's shape follows plant growth and the level is
a registered range (5,000; 1,000 and 10,000). Herd sizes (secondary sources, to check): medium antelope about 36 (6–100); buffalo
about 350 (45–1,600). Not found: the Coe et al. 1976 equation (paywalled), production relative to biomass, observed primate
encounter rates with ungulates or predators (only modelled: Piel et al. 2018, Issa).

Noted: leopard preferred size 40 kg against adult antelope 50 kg, so leopards take mostly young antelope — reported, not tuned.

Build spec (`--prey-map`, off at first): a map of kg in two classes (antelope, buffalo) by plant growth; plant-eater agents carry a
head count; herds appear out of sight within sight + 1 square of any hominin or individual hunter, their weight taken from the map
and returned when everyone is far; a kill takes one animal and leaves one carcass; hares and hunters unchanged; the map does not
yet graze the grass (leaving that out is the owner's call). Test: switch off identical; mass balance within 1% daily; standing
biomass inside 1,000–10,000 kg/km²; predictions on hunter intake, carcasses in reach, and the thinning (0.05 vs 1.0 should change
hunter intake by under 2×, else the thinning scripts the result).
