// Loads the Genesis engine (src/*.js) so it can run without a browser.
// Used by the tests, the experiment runner and the build script.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ORDER = fs
  .readFileSync(path.join(ROOT, 'src', 'ORDER'), 'utf8')
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean);

function engineSource() {
  return ORDER.map((n) => fs.readFileSync(path.join(ROOT, 'src', n + '.js'), 'utf8')).join('\n');
}

const { build } = require('./engine-api');

// Returns a fresh, independent world: every call gets its own copy of all engine state.
// opts.brain: the most thinking units a person's brain can grow (64 normally) — for brain-size experiments
function createEngine(opts = {}) {
  // the valley engine also carries the recorded weather of the globe at Gona (src/valleyforce.js, not part of the page's engine order)
  const src = opts.valley ? engineSource() + '\n' + fs.readFileSync(path.join(ROOT, 'src', 'valleyforce.js'), 'utf8') : engineSource();
  return build(src, opts);
}

module.exports = { createEngine, engineSource, ORDER, ROOT };
