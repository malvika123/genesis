# The valley in 3D, at true size (plan item 37) — 24 Nov 2026

**Owner (24 Nov):** "i can't zoom into valley, its like a static page ... why is it not like google earth?" Stage 1 (flat map zoom and pan) shipped in 6b4a98d; this is stage 2.

**What it is.** `ui/valley3d.js`, used only on the valley page (`?valley`); it fills the same `G3D` object as the globe (`ui/globe3d.js` stays empty there), so the page's controls work unchanged: scroll or pinch zooms toward the cursor, drag moves the ground under the pointer, right-drag or Shift-drag turns and tilts, the Eyes button looks through a creature's eyes, "Flat map" switches back. Drawing only: nothing in the simulation changes.

**True size.** One unit is one 250 m square; heights are not exaggerated (1 km of height = 4 squares). The camera goes from about 85 km up (the whole 50 x 60 km window) to about 6 m from the ground, tilting toward the horizon as it comes down. Hominins about 1.3 m tall (australopiths about 1.0-1.5 m); other kinds in the same proportion to them as their pictures on the globe. A creature smaller than about 14 pixels on screen is drawn as a marker instead.

**Plants and stones, near the camera only** (up to 2 km for trees, 1 km for bushes, 400 m for grass clumps; farther off only the map's colour). Positions come from each 10 m patch's own numbers in absolute coordinates, so they stay put when the window moves.
- Trees: a 10 m patch holds a tree with chance cover x 1.6 (a crown of about 60 m2), so the number of crowns follows the square's tree cover. Flat-topped acacias on the open floor (umbrella thorn today 5-20 m, usually 5-10; Acacia in the Hadar pollen, Bonnefille et al. 2004), round-crowned trees by the river and on the plateau and one in four elsewhere. Drawn 5-10 m tall. The crown size, and which tree stands where, are drawing choices.
- Bushes, grass clumps (on 30% of grassy squares, the Hadar C4 share), basalt boulders: as in `ground-cover.md`; densities are drawing choices (none found).
- Creatures walk round trunks (drawing only).

**Not yet.** Fish (not drawn in 3D); things lying on the ground (stones, flakes, sticks, nuts) and huts in 3D; seasons in the sun's path (an equinox sun at 11 °N); the window's edge simply ends; zooming from the globe's Hadar pin straight into this view (next step).

**Checked (Chrome, 24 Nov):** no errors on either page; scroll zoom, drag, Shift-drag turn and tilt, the Eyes view through a hominin child's eyes; about 57 frames a second at 130 m up in woodland; the globe page unchanged; 99 of 99 tests.

**The land beyond the window (24 Nov, owner: "why not whole window?").** The simulation runs only in the 50 x 60 km window, which floated in empty sky. The open valley's land is a rule of position, so `openAltAt` (src/openvalley.js; tested equal to the window's own heights) gives the hills, river and plateau 75 km out on every side; it is drawn plain, in the window's average colour, with no plants or animals, because nothing is simulated there. The window shows as the detailed patch in the middle; when the band walks toward an edge the window moves and that land comes alive. Not the sim: drawing only.
