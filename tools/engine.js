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
  return build(engineSource(), opts);
}

module.exports = { createEngine, engineSource, ORDER, ROOT };
