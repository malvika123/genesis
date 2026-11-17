# Fable on labelled senses (17 Nov 2026)

Asked by the owner: "the creatures are not seeing like we do; eyes see, not brains; how are they close to real hominins if they read labels?"
Fable read the code (read only, nothing run). The report, kept in full in substance:

**Verdict: the owner is right about the principle, but "all brain and no organ" overstates it. Genesis already has a partial eye. The worst
"cheats" are a few specific channels, not labels in general.**

**1. Right, and how serious.** The world code decides what each thing is (`sense()` writes predator, family, mate… into 16 slots per direction).
MASTER-PLAN line 54 already names it. But the code already models: field of view per species; hills and thick forest blocking sight
(`inSight`); range shrinking at night and in forest; red berries visible only to three-colour eyes (`S.col>=3`); and for people, learned
recognition in `perceive()` (per-kind skill, faint things missed, distance guessed roughly, look-alikes mixed up `CONFUSE`, blurry infant
eyes, a head start for faces, mother and predators). Labels degraded by distance largely exist. The raw `retina()` mode exists but no entry
in FINDINGS measures it.

The real cheats, in order:
- Food and water are multiplied by hunger and thirst (`cl*(0.15+te)`, `cl*(0.15+tw)`): the eye reports how much the body needs the thing.
  The worst one. (Checked in `src/senses.js` lines 236–276, 299.)
- The mate channel reads another's hidden breeding state (`o.rd`) and works all round at 6 × sight range through hills (`hr = r*6`, lines 301–311).
- Family is handed over by identity (`o === a.kid || a.mom`); real primates learn kin by familiarity.
- "Danger" lumps rocks, pits and deep water: a meaning, not an appearance.
- Founders start with 0.9 recognition skill.

Most affected results: hunger falling with learning by watching (entries 52, 60); fear of predators (the category arrives sorted); mating;
words (HOMININ-PLAN ~352). Middle: discoveries; sharing. Least: the chain-learning limit (entry 87), birth spacing, meat in kg, body and
ecology numbers; hearing and speech (12 sound cues, not labels: good).

**2. The owner's/Claude's five points.** (1) too strong: there is a coarse organ model. (2) partly wrong: "partly inborn, partly learned" is
right (monkeys raised without seeing faces still preferred faces, a month of faces narrowed them to one species: Sugita 2008, *PNAS* 105:394;
macaque pulvinar neurons respond fastest to snakes: Van Le et al. 2013, *PNAS* 110:19000; babies with cataracts from birth to 2–6 months keep
lasting deficits in judging the spacing of facial features: Le Grand et al. 2001, *Nature* 410:890; Project Prakash: acuity and contrast stay
reduced after long early blindness, summaries only). But **heritable, selected eye traits are the wrong idea at this timescale**: Old World
monkeys and apes all have three-colour vision with no known variation between individuals (Jacobs review; the duplication is usually dated to
the base of the catarrhines, a 2020 preprint argues separate origins in apes and monkeys, still debated); macaque acuity looks broadly like
ours (indirect sources only). The 2.5 Ma eye was an ape eye: use fixed, sourced species values; letting acuity "evolve" over a few hundred
generations invites a trait that evolves because the code says it is better. (3) right, the key point: the labels stand in for an evolved
visual system. (4) half right: do not tune deaths away, but dying on raw light mostly measures a 64-unit brain learning from scratch in one
lifetime, so it tells little. (5) right: F16 is a design item, except the hunger-weighting, a one-line honest fix that could be a switch.

**3. Smallest honest next step (the owner's call).** First remove the hunger and thirst multipliers from what the eye reports (the body's need
already reaches the brain separately, `x[IB]`, `x[IB+1]`). Then limit the mate channel to sight and visible cues (within view, no 360° long
range through hills). Then family by familiarity from early life, and founders with lower skill (test both ends). Smell (A45) before raw vision:
cheap, ecologically central, replaces some labels honestly.
**Would not:** full raw vision as default; heritable eye traits; a bigger brain just to cope with raw light; tuning to restore survival.

**4. A fair test.** Prediction written before; 24 seeded worlds, three setups: today's labels, the honest-label fixes, a "blind" control with all
sight inputs zeroed; optionally the raw `retina()` mode. Measure hunger deaths, how fast fear of predators is learned, first nut-cracking, births
and words; founder recognition skill at 0.9 and about 0.5. Labels matter if headline results move beyond seed noise under the honest labels, or
if raw vision comes out like blind (the brain cannot use light, so the labels carried the behaviour). If results hold under honest labels, those
findings stand.

Not verified by Fable: the Ostrovsky/Sinha 2009 paper itself; a direct macaque-versus-human acuity figure.

Sources: Sugita 2008 https://pmc.ncbi.nlm.nih.gov/articles/PMC2224224 · Le Grand et al. 2001 https://mail.maurer.ca/dpubs/LeGrand_DeprivedFaces.pdf ·
Van Le et al. 2013 https://www.sciencedaily.com/releases/2013/10/131028162928.htm · Jacobs https://pmc.ncbi.nlm.nih.gov/articles/PMC2781856 ·
2020 preprint https://www.biorxiv.org/content/10.1101/2020.03.23.003855.full.pdf · Project Prakash https://grantome.com/grant/NIH/R01-EY020517-08 ·
marmoset acuity (indirect) https://marmolab.bcs.rochester.edu/pubs/2016_Nummela_Marmoset_Myopia.pdf
