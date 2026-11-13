// Reality tests, layer 1: every number that stands for something real is registered (the owner, 13 Nov 2026).
// Each setting of the hominin (HOMININ in src/config.js) and each numeric world setting (SOC in src/sim.js) must be named in
// docs/ASSUMPTIONS.md as `HOMININ.key` or `SOC.key`, in a row that gives its evidence and status. A new number that nobody has
// registered fails here. (Switches that are on/off are not numbers about the world and are not checked.)
// Copyright (c) 2026 Malvika Sen. MIT License.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

// the object literal that follows `const NAME = ` in a source file, evaluated (TY is the only constant these use)
function objectLiteral(src, name) {
  const i = src.indexOf('const ' + name + ' = {');
  assert.ok(i >= 0, name + ' not found');
  let d = 0,
    j = src.indexOf('{', i);
  const start = j;
  for (; j < src.length; j++) {
    if (src[j] === '{') d++;
    else if (src[j] === '}' && --d === 0) break;
  }
  // eslint-disable-next-line no-new-func
  return new Function('TY', 'return (' + src.slice(start, j + 1) + ');')(288);
}

const REG = read('docs/ASSUMPTIONS.md');
function missing(name, obj) {
  return Object.keys(obj)
    .filter((k) => typeof obj[k] === 'number' || (Array.isArray(obj[k]) && obj[k].every((v) => typeof v === 'number')))
    .filter((k) => !REG.includes('`' + name + '.' + k + '`'));
}

test('every setting of the hominin is registered with its evidence', () => {
  const m = missing('HOMININ', objectLiteral(read('src/config.js'), 'HOMININ'));
  assert.deepEqual(m, [], 'not registered in docs/ASSUMPTIONS.md: ' + m.map((k) => 'HOMININ.' + k).join(', '));
});

test('every numeric world setting is registered with its evidence', () => {
  const m = missing('SOC', objectLiteral(read('src/sim.js'), 'SOC'));
  assert.deepEqual(m, [], 'not registered in docs/ASSUMPTIONS.md: ' + m.map((k) => 'SOC.' + k).join(', '));
});
