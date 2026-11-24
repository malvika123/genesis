# The valley on the globe (plan item 35) — 24 Nov 2026

**Owner (24 Nov):** "i want valley on globe ... and it should help the way valley helps in population."

**What the valley gives (measured, entry 133).** With the same real hunter numbers, bands on the globe were wiped out in about 2 years (hunter tries at a hominin 1.85 per hominin-year) and in the 250 m valley all 12 bands lived 5 years (0.05 tries per hominin-year). The help comes from the fine squares: a hunter must be within about 750 m, not 9 km, to attack. So "the valley on the globe" must keep the band's world at 250 m.

**What is already decided (docs/design/valley-spec.md, 20 Nov).** The valley is its own engine instance, 200 x 240 squares of 250 m (50 x 60 km), at the real Hadar/Awash place (about 40 °E, 11 °N), taking its weather from the globe's square there. That is already "inside the globe" in the sense of climate; what is missing is that the page does not show or run it.

**Plan, in steps, each with its own check.**
1. **Merge the valley into the main line** (off unless asked). Done in the test copy `valrd`: merged without conflicts; checks below.
2. **The page can run a valley world.** A second engine built from the same sources (`build(src, {valley})`, as the tools do), run beside the globe: the page asks "New world: Globe / Valley at Hadar". Valley view: the existing flat map and 3D views must read the valley's grid (W, H, no wrap), its terrain, trees, water and creatures.
3. **The valley appears on the globe.** The globe stays the planet. A patch at 40 °E, 11 °N shows the valley's fine terrain and creatures at their real scale; zooming in from space ends in the valley. The globe engine runs the rest of the planet's weather and climate; the valley engine runs the band, the hunters and the herds.
4. **The edges.** First version: the valley edge is a wall (as built), so a band stays in its 50 x 60 km (real home ranges are tens of km2). Later: leaving the window, newcomers (the rescue effect), and animals crossing.
5. **Population check (the owner's requirement).** The valley on the globe must give the valley's population result: a run through the globe page's path vs the standalone valley (entry 133 setup), same seeds: bands alive after 5 years and hunter tries per hominin-year must match within noise. Predictions written before.

**Not to do (from the spec):** 100 m squares, two square sizes in one grid, or a fine grid over the whole planet (Earth at 250 m is about 160,000 x 80,000 squares).

**Risks.** The page code reads engine state as globals (one engine); a second engine needs the UI to switch which engine it reads. Rendering a fine patch on a sphere needs its own mesh and the right heights. The valley's rules rewritten in metres and minutes (spec V2) are not all done; entry 133 used the valley with the globe's rules where they were not rewritten.

## Build log
**Step 2 done (24 Nov 2026): the page runs a valley world with `?valley` in the address** (e.g. `index.html?valley=1`). The page's engine files are loaded by a small loader in `index.html`: normal page unchanged (checked: 128 x 80 globe, no errors); with `?valley`, the same files plus `src/valleyforce.js` are fetched, patched for 200 x 240 by `GenesisEngineAPI.valleySource` (now exported from `tools/engine-api.js`) and run as one script; the page starts on the flat map (the globe button does nothing yet). Checked in Chrome: 200 x 240 grid, 0.9% water, one river down the middle, 25 hominins, 6 hunters, no console errors. Two things found on the way: the browser kept old copies of the source files (hard refresh needed after code changes), and the page's own `VALLEY` name clashed with the engine's (renamed `VALLEY_MODE`).
**Not yet:** the 3D view of a valley (step 3), the creature figures and sizes at 250 m, and whether the valley run on the page matches the standalone valley (step 5).
