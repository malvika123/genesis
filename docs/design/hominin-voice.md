# An ape-like hominin voice (17 Nov 2026): sources and a first audio-only rendering

The owner asked (17 Nov): "can we fix their voices, to be more hominin / gorilla-like". Research agent, read only. **Enough published data to render an
ape-like hominin voice: partly.** Chimpanzee and gorilla values exist for some calls; several key numbers could not be verified and are assumptions.

## Today
- Page (`ui/app.js` `speak()`): a human synthesis — sawtooth at 125 Hz men, 210 Hz women, 330 Hz children; human vowel formants F1 300–750, F2 900–2300 Hz;
  consonant bursts; 0.2–0.7 s a syllable.
- Sim (`src/voice.js`): a "simplified human vocal tract" forming consonant-vowel syllables (144 syllables, over 20,000 two-syllable words); only vocal control
  (`vl`) starts ape-low. Changing the sim's call model is a separate design question (below), not part of the audio rendering.

## What is known about 2.5 Ma (thin evidence)
- **Hyoid:** the Dikika child (*A. afarensis*, about 3.3 Ma) has a hyoid within the African-ape range and outside the human range; the air-sac inference is Spoor's,
  from bone shape, not soft tissue; commentary treats it as open (Alemseged et al. 2006, *Nature* 443:296; abstract and press only).
- **Breathing control:** australopithecines and *H. ergaster* had apelike thoracic nerve canals; humans and Neanderthals larger (MacLarnon & Hewitt 1999, *Am J Phys
  Anthropol* 109:341); an inference from bone, contested.
- **Hearing:** *A. africanus* and *P. robustus* closer to chimpanzees, with a small shift toward human (Quam et al. 2015, *Sci Adv*); Sima de los Huesos hominins a broader range
  (Conde-Valverde et al. 2021, *Nat Ecol Evol*); press summaries only.
- **Vowels and consonants:** macaque vocal tracts could in principle make a range of vowels, the limit is neural control (Fitch et al. 2016, *Sci Adv* 2:e1600723); larynx descent
  not needed for contrasting formants (Boë et al. 2019, *Sci Adv* 5:eaaw3916), a critique says vowels, not consonants.
- **Consensus:** scholars disagree; nothing found supports human-like CV syllables at 2.5 Ma; hyoid, nerve canals and hearing point to a graded, ape-like repertoire.
  Larynx position and air sacs for *A. afarensis, africanus, garhi* are not settled.

## Living comparators (checked values only; the rest is general knowledge, not from a paper opened)
| Call | Who | F0 | Duration | Context | Status |
|---|---|---|---|---|---|
| Chest beat (non-vocal) | Gorilla males | peak about 639 Hz (459–1003); larger males lower (about −35 Hz per SD of body size) | — | display | measured (Wright et al. 2021, *Sci Rep*) |
| Close calls (grunts, hums, grumbles) | Gorilla | low, tonal and atonal units | short | feeding, travel, contact | structure only, Hz not found (Hedwig et al. 2014, *Behaviour*) |
| Belch, roar, bark, hoot series | Gorilla | not found | not found | contact, threat, alarm, display | assumption needed |
| Pant-hoot | Chimpanzee (mostly males) | not verified; four phases: introduction, build-up, climax, let-down | seconds | long-distance contact, arrival, food | structure only |
| "Hoo" | Chimpanzee | formants F1 about 359 (SD 57), F2 about 896 (SD 133) Hz; F0 often near F1 | about 0.6 s (SD 0.3) | rest, contact | measured, but 8 calls from 3 animals (ICPHS 2023 paper) |
| Grunt | Chimpanzee | 70–700 Hz | short | food, contact | secondary table only |
| Scream | Chimpanzee | 800–2000 Hz, flat middle | short | distress, fight | secondary table only |
| Lowest-F0 loud call | Chimpanzee / bonobo | 128 ± 46 / 299 ± 54 Hz | — | loud calls | measured (Grawunder et al. 2018, response 2019, *Curr Biol*) |
F0 follows larynx size, not body size alone (bonobos about an octave above chimpanzees). **Not found:** any gorilla juvenile or female F0; pant-hoot F0; gorilla grunt, belch, bark, roar F0.
Voice qualities (noisy, harsh, breathy, voiced inhalation, pitch rising to the pant-hoot's climax) are general knowledge, not verified from a source here.
The chimpanzee hoo's formants (about 360, 900 Hz) sit at the bottom edge of the page's human range: a narrower, lower vowel range.

## First audio-only rendering (what the agent proposed; every number an assumption unless marked)
1. Low grunt (contact, food): F0 about 70–300 Hz, 0.1–0.4 s, flat or falling, buzzy.
2. Hoo (soft contact): F0 about 300–500 Hz, formants about 360 and 900 Hz (measured, weak), about 0.6 s, tonal.
3. Pant-hoot: rising then falling over seconds with a climax; F0 by sex an assumption.
4. Scream (distress, fight): F0 800–2000 Hz, short, harsh with noise.
5. Bark or alarm: short and noisy; no measured values.
6. Chest-beat display: noisy thump, peak 460–1000 Hz, centre about 640 Hz (measured for gorillas; non-vocal).
Scale F0 by body size within an assumed range; children higher. Say plainly on the page that *A. afarensis* was neither a gorilla nor a chimpanzee: the voice is a stand-in.

## The sim's call model (a view, not verified)
Human CV syllables for words do not fit an ape-like model: apes use graded calls, few and context-bound (alarm, food, contact), though gorilla close-call work shows units
concatenated flexibly. That is a design question for the word-learning stages (L0–L6), with a Fable review; nothing is changed in the sim now.

## Could not verify
The 2006 Dikika paper's full text; larynx or air-sac evidence for *A. africanus, A. garhi* and early *Homo*; gorilla grunt, belch, bark, roar F0 and any juvenile or female gorilla F0;
pant-hoot F0 values (Riede, Lameira); the 2022 *Communications Biology* table's original paper (page blocked).

## Sources
Alemseged et al. 2006 doi 10.1038/nature05047 · Hedwig et al. 2014 eva.mpg.de/documents/Brill/Hedwig_Acoustic_Behaviour_2014_2043808.pdf · Salmi et al. 2013 *Ethology* doi 10.1111/eth.12122 ·
Wright et al. 2021 nature.com/articles/s41598-021-86261-8 · Grawunder et al. 2018 eva.mpg.de/fileadmin/content_files/ecology/pdfs/Grawunder_et_al_2018_bonobo_larynx.pdf and the 2019 response
eva.mpg.de/documents/Elsevier/Grawunder_Response_CurrBiol_2019_3081160.pdf · chimpanzee hoo formants, ICPHS 2023 guarant.cz/icphs2023/22.pdf · Communications Biology 2022 table pmc.ncbi.nlm.nih.gov/articles/PMC9110424/table/Tab2 ·
Fitch et al. 2016 pmc.ncbi.nlm.nih.gov/articles/PMC5148209 · Boë et al. 2019 pmc.ncbi.nlm.nih.gov/articles/PMC7000245 · MacLarnon & Hewitt 1999 · Quam et al. 2015 · Conde-Valverde et al. 2021.
