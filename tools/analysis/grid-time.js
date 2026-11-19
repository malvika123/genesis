const { engineSource } = require('/Users/malvikasen/genesis/tools/engine'), X = require('/Users/malvikasen/genesis/tools/experiment-core');
const src0 = engineSource();
const S = X.fromArgs({});
function time(label, W, H, cfgExtra) {
  const src = src0.replace('const W = 128,\n  H = 80,', `const W = ${W},\n  H = ${H},`);
  if (src === src0 && (W !== 128 || H !== 80)) return console.log(label, 'could not swap W/H');
  let E;
  try { E = new Function(src + '\nreturn { setSeed, reset, sim, DAY, ag: () => ag, W, H };')(); } catch (e) { return console.log(label, 'build failed', String(e).slice(0, 120)); }
  const t0 = Date.now();
  try { E.setSeed(1); E.reset({ ...S.cfg, ...cfgExtra }); } catch (e) { return console.log(label, 'reset failed', String(e).slice(0, 160)); }
  const tr = Date.now() - t0;
  const t1 = Date.now(); let n = 0;
  try { for (let t = 0; t < 96; t++) { E.sim(); n++; } } catch (e) { return console.log(label, 'sim failed at step', n, String(e).slice(0, 160)); }
  console.log(label, `grid ${E.W}x${E.H} = ${E.W * E.H} squares | reset ${tr} ms | one day (96 steps) ${(Date.now() - t1) / 1000}s = ${((Date.now() - t1) / 96).toFixed(1)} ms/step | creatures ${E.ag().length}`);
}
time('globe, default creatures', 128, 80, {});
time('globe, no creatures', 128, 80, { people: 0, herbivores: 0, predators: 0, fish: 0, band: false });
time('valley-size grid 200x240, no creatures', 200, 240, { people: 0, herbivores: 0, predators: 0, fish: 0, band: false });
