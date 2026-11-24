# The open valley: real space for the hominins (plan item 36) — 24 Nov 2026

**Owner (24 Nov):** "it's not about my view ... it's about them, we want to give them room, and make things as similar as it can be, is there no way to give them real-like space, otherwise all this is just a lie." Decision: go with the open valley, not the globe window of `valley-on-globe.md` (that note stays as the record; the globe becomes the planet's map with a true-scale marker).

**The problem.** The valley is a 50 x 60 km box with walls. Real communities range over tens to hundreds of km2, females leave their birth group (strontium evidence for australopith females moving away from their residential groups: Max Planck report on early hominin landscape use), and populations spread over thousands of km. In 5-year valley runs (6 worlds, `/tmp/edge.js`, 24 Nov) the band's centre moved 0.3 to 2.2 km, the nearest any hominin came to a wall was 7 to 18 km (29 to 74 squares), and the band was spread 5.5 to 8.5 km across, so the walls do not matter in short runs; they will over generations, and the aim is to run down the generations.

**The idea.** The 250 m world is a window that moves with the band. When anyone nears an edge, the window shifts by a strip and new land is generated ahead from the same rules; the strip behind is dropped. No walls. Compatible with what exists: hunters at real density appear near people, herds appear near people from a kg-per-square map, far-off animals are not simulated. The cost stays that of one window (200 x 240 squares).

**What lies beyond the Awash at Hadar (live search, 24 Nov; qualitative).**
- The Hadar basin is a western fault block 40 km east of the escarpment of the Western Plateau (so about 160 squares west of the valley's middle the land climbs to the plateau). Deposits of more than 3.4 to about 2.9 Ma (Hadar Formation) are mostly river and lake: a broad, vegetated, flat distal floodplain of the ancestral meandering Awash, with Lake Hadar advancing and retreating from the east; dry open woodland and savanna around it; reeds and sedges on marshy margins.
- Medium-density tree and bush cover dominated much of the formation; pollen shows bushland and shrubland, a more wooded and a more grassy phase alternating (Bonnefille et al. 2004).
- NOT FOUND: the lake's size in km, distances from Ledi-Geraru to the escarpment, what lies hundreds of km north or south along the river, any Pliocene hominin density or home-range measure (an online table gives 0.2-0.5 and 0.4-6 km2 for early hominins with unclear sourcing; one model gives a mean australopith group of 41.6 from a brain-size time-budget model, not field data).
So beyond the stand-in valley every habitat rule is an **assumption with a stated range**, to be registered and tested; what the generator draws far from Hadar is not data.

**Build, in steps, each with its own check and prediction written first.**
1. **The valley as a function of position.** Make the terrain, trees, river and stone a function of absolute coordinates, so any strip can be generated on demand; check that inside the current window it reproduces today's valley exactly (identical-worlds check).
2. **The window moves.** Shift all state (terrain arrays, plants, items, fire, creatures' positions) by a strip when the band's edge comes within a margin; keep every creature's identity. Check: a world with forced shifts every N steps and no content change behaves like the same world without shifts (no creature lost, no state corrupted); then the population check.
3. **Habitats beyond the Awash**, west to the plateau (the escarpment 40 km from Hadar), east to the lake basin, with each rule registered as an assumption.
4. **The globe marker at true scale:** the band's offset in km from Hadar moves the marker on the real Earth.
5. **Population check:** a long run where the band travels farther than the old window, against the walled valley on the same seeds; before any edge contact the two are identical; after it, no wall effects.

**Switch:** `--open-valley` (off = the walled valley; off = identical worlds), with the valley switch.

**Not to do:** a corridor, or a finer grid than 250 m; invented habitats presented as data; a map of today's Afar used as 2.5 Ma land.
