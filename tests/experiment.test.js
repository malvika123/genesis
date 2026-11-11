const { test } = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const run = (...args) =>
  spawnSync(process.execPath, [path.join(__dirname, '..', 'tools', 'experiment.js'), ...args], { encoding: 'utf8' });

test('the experiment runner gives the same table every time, whatever the number of workers', () => {
  const a = run('--seeds', '3-4', '--days', '1', '--naive-founders', '--workers', '1');
  const b = run('--seeds', '3-4', '--days', '1', '--naive-founders', '--workers', '2');
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

test('the Lab and the command line agree: settings round-trip through the command the Lab shows', () => {
  const X = require('../tools/experiment-core');
  const v = { days: 30, people: 12, predators: 3, brain: 128, earth: true, homeland: false, vicar: false, modernVoice: true };
  const S = X.build(v);
  const cmd = X.command(S, '1-5', 1);
  const argv = cmd.split(' ').slice(2);
  const a = {};
  for (let i = 0; i < argv.length; i++)
    if (argv[i].startsWith('--')) a[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  assert.equal(a.seeds, '1-5');
  assert.deepEqual(X.fromArgs(a), S);
  assert.deepEqual(X.fromArgs({}), X.build({}), 'the same defaults on both sides');
});
