// Genesis — Whispers: your words, read for ideas, become small nudges in a creature's brain and arrive as its own thought.
// Copyright (c) 2026 Malvika Sen. MIT License.

// ---------- whispers ----------
// You can plant an idea. It arrives as the creature's own hunch, in sleep or a calm moment. It is a small push in its brain, never a command:
// it still has to act on it, and the world decides whether it sticks.
const LWI = (k, i) => O3 + k * NI + i;
function nearestCell2(a, test) {
  let best = null,
    bd = 1e9;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const d = dxw(x - a.x) ** 2 + (y - a.y) ** 2;
      if (d < bd && test(idx(x, y))) {
        bd = d;
        best = { x, y };
      }
    }
  return best;
}
const dirTo2 = (a, m) => CP[(Math.round(Math.atan2(m.y - a.y, dxw(m.x - a.x)) / (Math.PI / 4)) + 8) % 8];
// A whisper can be any words. They are read for the ideas they contain (water, food, fish, berries, hunters,
// pits, sharing, others, sleep, partners, exploring, a direction) and whether they say do or don't.
// Each idea becomes a small push in the brain. Words it can't connect to anything stay a vague feeling.
const DIRS = [
  ['north-east', 7],
  ['north-west', 5],
  ['south-east', 1],
  ['south-west', 3],
  ['north', 6],
  ['south', 2],
  ['east', 0],
  ['west', 4],
];
const NEG =
  /\b(don'?t|do not|never|avoid|away|not|no|bad|danger\w*|poison\w*|stop|careful|beware|harm\w*|sick|deadly|hurt\w*)\b/;
const CONCEPTS = [
  { k: 'water', re: /\b(water|drink\w*|river|pond|lake|thirst\w*)\b/, sp: [0, 1, 2] },
  { k: 'fish', re: /\b(fish\w*|catch\w*)\b/, sp: [0] },
  { k: 'berries', re: /\b(berr\w*|red plant\w*|red fruit\w*)\b/, sp: [0, 1], defNeg: true },
  { k: 'food', re: /\b(food|eat\w*|grass|hungry|hunger|plant\w*|graz\w*)\b/, sp: [0, 1, 3] },
  {
    k: 'danger',
    re: /\b(hunter\w*|predator\w*|lion\w*|beast\w*|red one\w*|run|flee|danger\w*)\b/,
    sp: [0, 1],
    defNeg: true,
  },
  { k: 'pits', re: /\b(pit\w*|hole\w*|deep|fall\w*|drown\w*)\b/, sp: [0, 1, 2], defNeg: true },
  { k: 'share', re: /\b(share|give|feed|child\w*|little one\w*|baby|babies|kid\w*)\b/, sp: [0] },
  {
    k: 'together',
    re: /\b(others|together|friend\w*|people|family|group|alone|lonely|herd|pack)\b/,
    sp: [0, 1, 2, 3],
  },
  { k: 'sleep', re: /\b(sleep\w*|rest\w*|tired|night)\b/, sp: [0, 1, 2, 3] },
  { k: 'mate', re: /\b(mate|partner|love|lover|wife|husband)\b/, sp: [0, 1, 2, 3] },
  { k: 'explore', re: /\b(explore\w*|new|wander\w*|curious|discover\w*|far)\b/, sp: [0, 1, 2, 3] },
];
function interpret(text, a) {
  const t = ' ' + text.toLowerCase().replace(/[’]/g, "'") + ' ',
    parts = t.split(/[.,;!?]| but | and /);
  let dir = null;
  for (const [w, d] of DIRS) {
    if (t.replace(/(north|south)\s+(east|west)/g, '$1-$2').includes(w)) {
      dir = d;
      break;
    }
  }
  const found = [],
    BER = CONCEPTS.find((c) => c.k === 'berries').re,
    SHR = CONCEPTS.find((c) => c.k === 'share').re;
  for (const C of CONCEPTS) {
    const part = parts.find((p) => C.re.test(p) && !(C.k === 'food' && (BER.test(p) || SHR.test(p))));
    if (!part || found.some((f) => f.k === C.k)) continue;
    let neg = NEG.test(part);
    if (C.defNeg && !/\b(eat|good|safe|go to|follow|approach)\b/.test(part)) neg = true;
    if (C.k === 'together' && /\balone\b/.test(part) && !/\b(be|stay) alone\b/.test(part)) neg = false;
    found.push({ k: C.k, neg, ok: C.sp.includes(a.sp) });
  }
  return { found, dir, useful: found.filter((f) => f.ok) };
}
const bearing = (a, x, y) => (Math.round(Math.atan2(y - a.y, dxw(x - a.x)) / (Math.PI / 4)) + 8) % 8;
function nearestDir(a, test, dir) {
  let best = null,
    bd = 1e9;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const d = dxw(x - a.x) ** 2 + (y - a.y) ** 2;
      if (d === 0 || d >= bd || !test(idx(x, y))) continue;
      if (dir !== null && Math.abs(((bearing(a, x, y) - dir + 12) % 8) - 4) < 3) continue;
      bd = d;
      best = { x, y };
    }
  return best;
}
function nudge(a, f, dir) {
  const sg = f.neg ? -1 : 1,
    own = a.sp === 3 ? 8 : a.sp === 1 ? 3 : a.sp === 0 ? 4 : 5,
    all = (fn) => {
      for (let s = 0; s < 8; s++) fn(s);
    };
  switch (f.k) {
    case 'water': {
      if (sg > 0) {
        const m = nearestDir(a, (i) => water[i] && !deep[i], dir);
        if (m) {
          a.mw = m;
          a.mwT = tick;
        }
        a.lw[LWI(A_DRINK, HB + 1)] += 1;
      }
      all((s) => (a.lw[LWI(s, s * NCH)] += sg * 1));
      return sg > 0 ? 'water' : 'stay away from water';
    }
    case 'food': {
      if (sg > 0 && a.sp < 2) {
        const m = nearestDir(a, (i) => !water[i] && !poison[i] && !pit[i] && food[i] > 0.5, dir);
        if (m) {
          a.mf = m;
          a.mfT = tick;
        }
      }
      a.lw[LWI(A_EAT, HB)] += sg * 1;
      all((s) => (a.lw[LWI(s, s * NCH + 1)] += sg * 1));
      return sg > 0 ? 'food' : 'leave food alone';
    }
    case 'fish':
      a.lw[LWI(A_ATK, HB + 2)] += sg * 1.5;
      all((s) => (a.lw[LWI(s, s * NCH + 8)] += sg * 1.2));
      return sg > 0 ? 'fish can be caught' : 'leave the fish alone';
    case 'berries':
      a.lw[LWI(A_EAT, IB + 16)] += sg * 2;
      all((s) => (a.lw[LWI(s, s * NCH + 9)] += sg * 1));
      return sg > 0 ? 'red berries are good to eat' : 'red berries are bad';
    case 'danger':
      all((s) => {
        a.lw[LWI((s + 4) % 8, s * NCH + 5)] -= sg * 1.2;
        a.lw[LWI(s, s * NCH + 5)] += sg * 1.2;
      });
      return sg > 0 ? 'go toward the hunters' : 'keep away from hunters';
    case 'pits':
      all((s) => (a.lw[LWI(s, s * NCH + 2)] += sg * 1.5));
      return sg > 0 ? 'go toward pits and deep water' : 'keep clear of pits and deep water';
    case 'share':
      a.lw[LWI(A_GIVE, IB + 17)] += sg * 2;
      return sg > 0 ? 'share food with hungry children' : 'keep food for itself';
    case 'together':
      all((s) => (a.lw[LWI(s, s * NCH + own)] += sg * 1));
      return sg > 0 ? 'stay with others' : 'keep to itself';
    case 'sleep':
      a.lw[LWI(A_SLEEP, IB + 2)] += sg * 1.2;
      a.lw[LWI(A_SLEEP, IB + 5)] += sg * 0.6;
      return sg > 0 ? 'rest when tired' : 'stay awake';
    case 'mate':
      a.lw[LWI(A_MATE, HB + 3)] += sg * 1.5;
      all((s) => (a.lw[LWI(s, s * NCH + 6)] += sg * 1));
      return sg > 0 ? 'find a partner' : 'avoid partners';
    case 'explore':
      a.cuX = sg > 0 ? 1.8 : 0.4;
      a.cuT = tick + 3 * DAY;
      return sg > 0 ? 'explore new places' : 'stay near familiar places';
  }
}
function firstPerson(t) {
  return t
    .trim()
    .replace(/\byou are\b/gi, 'I am')
    .replace(/\byou're\b/gi, "I'm")
    .replace(/\byourself\b/gi, 'myself')
    .replace(/\byour\b/gi, 'my')
    .replace(/\byou\b/gi, 'I')
    .replace(/^\w/, (c) => c.toUpperCase());
}
function deliver(a) {
  const W0 = a.wh;
  a.wh = null;
  if (!W0) return;
  const r = interpret(W0, a);
  const got = [];
  for (const f of r.useful) {
    const d = nudge(a, f, r.dir);
    if (d) got.push(d);
  }
  if (r.dir !== null && !r.useful.some((f) => f.k === 'water' || f.k === 'food')) {
    a.lw[LWI(r.dir, IB + 11)] += 1;
    got.push('head ' + CP[r.dir]);
  }
  const text = firstPerson(W0),
    nm = a.sp === 0 ? a.name : 'a ' + a.S.n.toLowerCase();
  a.hunch = { k: got.join(', '), text, until: tick + 2 * DAY };
  a.whO =
    (
      r.useful.find((f) => !f.neg && ['fish', 'water', 'food', 'share'].includes(f.k)) ||
      r.useful.find((f) => f.k === 'berries' && f.neg) ||
      {}
    ).k || null;
  a.ts.unshift({ k: 'hunch', t: 'Day ' + dayN() + ': your whisper reached it — “' + text + '”' });
  if (a.ts.length > 6) a.ts.pop();
  if (!got.length) {
    log(
      'Your whisper reached ' +
        nm +
        (a.asleep ? ' in its sleep' : '') +
        ': “' +
        text +
        '”. It stirred something, but nothing in its life gave the words a meaning.'
    );
    return;
  }
  log(
    (a.asleep ? 'In ' + nm + '’s sleep, a thought took shape' : 'A thought came to ' + nm) +
      ': “' +
      text +
      '”'
  );
}
function followed(a, k, what) {
  if (a.whO !== k) return;
  a.whO = null;
  log(who(a) + ' followed the hunch and ' + what + '.');
}
