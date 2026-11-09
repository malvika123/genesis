// Genesis Lab: one background worker that runs seeded worlds for the Lab page, one at a time. The page
// starts as many of these as the computer has cores to spare. It runs exactly the same engine and the same
// measuring code as the command-line runner (tools/experiment.js).
//
// Copyright (c) 2026 Malvika Sen. MIT License.

importScripts('../tools/engine-api.js', '../tools/experiment-core.js');

const X = self.GenesisExperiment;
let source = null; // the engine's source, src/*.js in the order of src/ORDER
const engines = new Map(); // one engine per brain size, reused from world to world (reset() starts afresh)

async function loadSource() {
  if (source) return source;
  const order = (await (await fetch('../src/ORDER', { cache: 'no-cache' })).text())
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const parts = await Promise.all(order.map(async (n) => (await fetch('../src/' + n + '.js', { cache: 'no-cache' })).text()));
  return (source = parts.join('\n'));
}

self.onmessage = async (ev) => {
  const m = ev.data;
  if (m.type !== 'run') return;
  try {
    const src = await loadSource();
    const S = X.build(m.values);
    if (!engines.has(S.brain)) engines.set(S.brain, self.GenesisEngineAPI.build(src, { brain: S.brain }));
    const E = engines.get(S.brain);
    const t0 = performance.now();
    const row = X.runWorld(E, m.seed, S, (day) => {
      self.postMessage({ type: 'day', id: m.id, day, ms: performance.now() - t0 });
    });
    self.postMessage({ type: 'done', id: m.id, row, ms: performance.now() - t0 });
  } catch (e) {
    self.postMessage({ type: 'error', id: m.id, message: String((e && e.stack) || e) });
  }
};
