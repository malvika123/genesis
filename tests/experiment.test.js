const { test } = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const run = (...args) =>
  spawnSync(process.execPath, [path.join(__dirname, '..', 'tools', 'experiment.js'), ...args], { encoding: 'utf8' });

test('the experiment runner gives the same table every time, whatever the number of workers', () => {
  const a = run('--seeds', '3-4', '--days', '1', '--workers', '1');
  const b = run('--seeds', '3-4', '--days', '1', '--workers', '2');
  assert.equal(a.status, 0, a.stderr);
  assert.equal(a.stdout, b.stdout);
  const lines = a.stdout.trim().split('\n');
  assert.ok(lines[0].startsWith('# Genesis experiment'));
  assert.ok(lines[1].includes('genesis ') && lines[1].includes('commit'));
  const head = lines.find((l) => l.startsWith('seed,'));
  assert.ok(head.includes('people_alive') && head.includes('day_madefire'));
  const rows = lines.slice(lines.indexOf(head) + 1);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].split(',').length, head.split(',').length);
});
