#!/usr/bin/env bash
# The identical-worlds check (the method, step 6 in docs/MASTER-PLAN.md; replaces the lost gapcheck.sh).
# Runs the same worlds on an old commit and on the code as it is now (with any switches given), and compares every data column
# both tables have, to the last digit. New columns (a new measure) are listed but not compared.
#
#   tools/identical-worlds.sh OLD_COMMIT [--the-switch ...]
#   SEEDS=1-2 DAYS=20 tools/identical-worlds.sh HEAD~1 --tool-in-hand-digs
#
# Prints IDENTICAL and exits 0, or prints the first differences and exits 1. Gentle on the laptop: nice, one worker each.
# Copyright (c) 2026 Malvika Sen. MIT License.
set -euo pipefail
OLD="${1:?usage: tools/identical-worlds.sh OLD_COMMIT [switches...]}"
shift
SEEDS="${SEEDS:-1-2}"
DAYS="${DAYS:-20}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/identical-worlds.XXXXXX")"
trap 'git -C "$ROOT" worktree remove --force "$WORK/old" >/dev/null 2>&1 || true; rm -rf "$WORK"' EXIT

git -C "$ROOT" worktree add --detach "$WORK/old" "$OLD" >/dev/null 2>&1
echo "old: $(git -C "$WORK/old" log --oneline -1)"
echo "new: working tree $(git -C "$ROOT" rev-parse --short HEAD)$(git -C "$ROOT" diff --quiet || echo ' + changes') $*"
echo "worlds: seeds $SEEDS x $DAYS days"

(cd "$WORK/old" && nice -n 19 node tools/experiment.js --seeds "$SEEDS" --days "$DAYS" --workers 1 --out "$WORK/old.csv" >"$WORK/old.log" 2>&1 || cat "$WORK/old.log") &
(cd "$ROOT" && nice -n 19 node tools/experiment.js --seeds "$SEEDS" --days "$DAYS" --workers 1 "$@" --out "$WORK/new.csv" >"$WORK/new.log" 2>&1 || cat "$WORK/new.log") &
wait

node - "$WORK/old.csv" "$WORK/new.csv" <<'EOF'
const fs = require('fs');
const read = (f) => {
  const rows = fs.readFileSync(f, 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));
  const head = rows[0].split(',');
  return { head, rows: rows.slice(1).map((r) => r.split(',')) };
};
const a = read(process.argv[2]), b = read(process.argv[3]);
const common = a.head.filter((h) => b.head.includes(h));
const added = b.head.filter((h) => !a.head.includes(h)), gone = a.head.filter((h) => !b.head.includes(h));
if (added.length) console.log('new columns (not compared): ' + added.join(', '));
if (gone.length) console.log('columns no longer written (not compared): ' + gone.join(', '));
let diffs = 0;
if (a.rows.length !== b.rows.length) (console.log(`rows: old ${a.rows.length}, new ${b.rows.length}`), diffs++);
for (let r = 0; r < Math.min(a.rows.length, b.rows.length); r++)
  for (const h of common) {
    const x = a.rows[r][a.head.indexOf(h)], y = b.rows[r][b.head.indexOf(h)];
    if (x !== y && diffs++ < 10) console.log(`row ${r + 1} ${h}: old ${x}, new ${y}`);
  }
console.log(diffs ? `DIFFERENT (${diffs} cells)` : `IDENTICAL (${a.rows.length} rows x ${common.length} columns)`);
process.exit(diffs ? 1 : 0);
EOF
