// Genesis — The page: drawing the world, the Inspect and Whisper panels, the controls, and the animation loop.
// Copyright (c) 2026 Malvika Sen. MIT License.

let view = 'globe',
  running = true,
  acc = 0;
const $ = (id) => document.getElementById(id),
  cv = $('cv'),
  cx = cv.getContext('2d'),
  cc = $('ch').getContext('2d');
// ---------- drawing ----------
// ---------- the floating box: what it is thinking, what it is doing ----------
const dirTo = (a, p) => CP[(Math.round(Math.atan2(p.y - a.y, dxw(p.x - a.x)) / (Math.PI / 4)) + 8) % 8];
function doingWord(a, k) {
  const nearWater = () => {
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++)
        if (inb(a.x + dx, a.y + dy) && water[idx(a.x + dx, a.y + dy)]) return true;
    return false;
  };
  if (k === A_DRINK && a.sp !== 3 && !nearWater()) return 'trying to drink, but there is no water here';
  if (k === A_DRINK && a.sp !== 3) {
    let fresh = false;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++)
        if (inb(a.x + dx, a.y + dy) && drinkable(idx(a.x + dx, a.y + dy))) fresh = true;
    if (!fresh) return 'trying to drink, but the sea is salty';
  }
  if (k === A_MATE && a.age < a.S.smat) return 'trying to mate, but it is far too young';
  if (k === A_MATE && !a.rd) return 'wanting to mate, but its body is not ready';
  if (k === A_MATE) return 'looking for a partner';
  if (k === A_EAT && a.sp < 2 && !(food[idx(a.x, a.y)] > 0.05) && !water[idx(a.x, a.y)])
    return 'trying to eat, but there is nothing to eat here';
  if (k === A_TAKE) {
    const i = idx(a.x, a.y);
    return a.hand
      ? 'reaching for something, but its hand is already full'
      : stone[i]
        ? 'picking up a stone'
        : stick[i]
          ? 'picking up a stick'
          : flake[i]
            ? 'picking up a sharp stone'
            : 'reaching for something, but there is nothing here to pick up';
  }
  if (k === A_DROP) return a.hand ? 'putting down ' + HAND[a.hand] : 'opening its empty hands';
  if (k === A_STRIKE) {
    const i = idx(a.x, a.y);
    return !a.hand
      ? 'swinging its empty hands'
      : a.hand === 1 && nut[i] > 0.05
        ? 'cracking a nut with a stone'
        : a.hand === 1 && stone[i]
          ? 'knocking two stones together'
          : 'banging ' + HAND[a.hand] + ' on the ground';
  }
  if (k < 8) return 'walking ' + CP[k];
  return [
    'staying put',
    'eating',
    'drinking',
    'sleeping',
    'mating',
    a.sp === 2 ? 'attacking' : a.sp === 0 ? 'grabbing' : 'snapping',
    'sharing food',
  ][k - 8];
}

function placeOf(a) {
  const i = idx(a.x, a.y);
  if (iced(i)) return salt[i] ? 'on the sea ice' : 'on frozen water';
  if (salt[i]) return deep[i] ? 'out in the deep sea' : 'in the shallow sea';
  if (river[i]) return 'in a river';
  if (tree[i] > 0.35) return 'in the ' + FOREST[fkind[i] || 2];
  if (!water[i] && cellT(i) < -2) return 'in the snow';
  return water[i]
    ? deep[i]
      ? 'in deep water'
      : 'in shallow water'
    : pit[i]
      ? 'in a pit'
      : food[i] > 0.4
        ? 'on grass'
        : ['on bare ground', 'on sand', 'on stony ground'][ter[i]] || 'on bare ground';
}
// ---- plain-language reading of the network ----
const PLAIN_CH = {
  water: 'sees water',
  food: 'sees food',
  'a rock, pit or deep water': 'sees danger (rocks, a pit or deep water)',
  'a herbivore': 'sees a herbivore',
  'a person': 'sees a person',
  'a predator': 'sees a predator',
  'a possible mate': 'senses a possible partner',
  family: 'sees family',
  fish: 'sees fish',
  'red berries': 'sees red berries',
  'the sea': 'sees the sea',
  'a steep climb': 'sees a steep climb',
  trees: 'sees trees',
  'a stone or stick on the ground': 'sees a stone or stick lying there',
  nuts: 'sees nuts',
};
const PLAIN = {
  'food right here': 'there is food right here',
  'water within reach': 'water is right next to it',
  'prey within reach': 'prey is within reach',
  'a mate beside it': 'a partner is right beside it',
  hunger: 'it is hungry',
  cold: 'it is cold',
  thirst: 'it is thirsty',
  tiredness: 'it is tired',
  pain: 'it is in pain',
  injury: 'it is hurt',
  darkness: 'it is dark',
  'being young': 'it is young',
  'desire to mate': 'it wants a partner',
  curiosity: 'it is curious',
  loneliness: 'it is lonely',
  'being in deep water': 'it is in deep water',
  'memory of water': 'it remembers where water is',
  'memory of food': 'it remembers where food is',
  'red berries here': 'there are red berries here',
  'a hungry child nearby': 'a hungry child is nearby',
  'a stone in its hand': 'it is holding a stone',
  'a stick in its hand': 'it is holding a stick',
  'a sharp stone in its hand': 'it is holding a sharp stone',
  'a stone at its feet': 'there is a stone at its feet',
  'a stick at its feet': 'there is a stick at its feet',
  'a nut at its feet': 'there is a nut at its feet',
  'the urge to eat': 'a strong urge to eat',
  'the urge to drink': 'a strong urge to drink',
  'the urge to strike': 'a strong urge to attack',
};
function plainReason(n) {
  const m = /^(.*) to the (.*)$/.exec(n);
  if (m && PLAIN_CH[m[1]]) return 'it ' + PLAIN_CH[m[1]] + ' to the ' + m[2];
  return PLAIN[n] || n;
}
function plainAct(a, k) {
  if (k < 8) return 'heads ' + CP[k];
  return [
    'stays where it is',
    'eats',
    'drinks',
    'sleeps',
    'tries to mate',
    a.sp === 2 ? 'attacks' : a.sp === 0 ? 'grabs' : 'snaps',
    'shares food',
    'picks something up',
    'puts it down',
    'strikes with what it holds',
  ][k - 8];
}
function joinReasons(r) {
  const m0 = /^(.*) to the (.*)$/.exec(r[0] || ''),
    m1 = /^(.*) to the (.*)$/.exec(r[1] || '');
  if (m0 && m1 && m0[1] === m1[1]) return m0[1] + ' to the ' + m0[2] + ' and ' + m1[2];
  if (r.length === 2 && r[0].startsWith('it sees ') && r[1].startsWith('it sees '))
    return r[0] + ' and ' + r[1].slice(8);
  return r.join(' and ');
}
const ING = {
  'stay put': 'staying put',
  eat: 'eating',
  drink: 'drinking',
  sleep: 'sleeping',
  mate: 'mating',
  grab: 'grabbing',
  attack: 'attacking',
  snap: 'snapping',
  'give food': 'sharing food',
  'pick up': 'picking something up',
  'put down': 'putting it down',
  strike: 'striking',
};
const cap = (s) => s.replace(/^./, (c) => c.toUpperCase());
function thoughtText(a) {
  const m = a.mind;
  if (!m) return 'Taking in the world…';
  if (m.forced)
    return m.act === A_SLEEP
      ? 'Asleep. Its body needs rest, so it can’t wake up yet.'
      : 'Its instincts took over: it ' + plainAct(a, m.act) + ' (it wanted to ' + actName(a, m.chosen) + ').';
  const why = m.pos.map((q) => q[0]);
  if (m.rfc > 0.5)
    why.unshift(
      m.act === A_EAT ? 'the urge to eat' : m.act === A_DRINK ? 'the urge to drink' : 'the urge to strike'
    );
  const sure = m.sure < 0.15 ? 'Just a guess.' : m.sure < 0.4 ? 'Leaning that way.' : 'Fairly sure.';
  let t = why.length
    ? cap(joinReasons(why.slice(0, 2).map(plainReason))) + ', so it ' + plainAct(a, m.act) + '. ' + sure
    : 'Nothing clear is guiding it yet, so it tries something: it ' + plainAct(a, m.act) + '.';
  if (a.hunch && tick < a.hunch.until) t += ' A thought stays with it: “' + a.hunch.text + '”';
  return t;
}
function feelingsText(a, S) {
  const f = [];
  if (a.e < 65) f.push(a.e < 35 ? 'very hungry' : 'hungry');
  if (a.w < 65) f.push(a.w < 35 ? 'very thirsty' : 'thirsty');
  if (a.sl > 0.5) f.push(a.sl > 0.8 ? 'exhausted' : 'sleepy');
  if (raining(idx(a.x, a.y)) && a.sp !== 3) f.push('wet');
  if (a.cold > 0.15) f.push(a.cold > 0.6 ? 'freezing' : 'cold');
  if (a.hp < 60) f.push('hurt');
  if (a.fear > 0.25) f.push('afraid');
  if (a.metAny && a.lo > 0.25) f.push('lonely');
  if (a.pr > 0.5) f.push('protective of its young');
  if (a.lu > 0.5) f.push('longing for a partner');
  if (Math.min(1, a.g.c * S.cur) > 0.5) f.push('curious');
  return f.length ? f.join(', ') : 'calm';
}
function thinkHTML(a, S) {
  let o = '<b>' + thoughtText(a) + '</b>';
  o += '<br><br>Feels: ' + feelingsText(a, S);
  if (a.mind && !a.mind.forced)
    o +=
      '<br>Also considered: ' +
      a.mind.opts
        .filter((q) => q[0] !== actName(a, a.mind.act))
        .slice(0, 2)
        .map((q) => ING[q[0]] || q[0].replace(/^go /, 'heading '))
        .join(' or ');
  const ex = a.mind ? a.mind.V : 0;
  o += '<br>Expects things to ' + (ex > 0.3 ? 'get better' : ex < -0.3 ? 'get worse' : 'stay about the same');
  const mem = [
    a.mw ? 'water to the ' + dirTo(a, a.mw) : '',
    a.mf ? 'food to the ' + dirTo(a, a.mf) : '',
  ].filter(Boolean);
  o += '<br>Remembers: ' + (mem.length ? mem.join(', ') : 'nothing useful yet');
  o += '<br>Has learned: ' + (a.les.length ? a.les.join('; ') : 'nothing yet');
  return o;
}
function doingHTML(a, S, stage, night) {
  const r = sightRange(a, night),
    near = [0, 0, 0, 0];
  for (const o of ag) if (o !== a && !o.dead && Math.hypot(dxw(o.x - a.x), o.y - a.y) <= r) near[o.sp]++;
  const nm = [
      ['person', 'people'],
      ['herbivore', 'herbivores'],
      ['predator', 'predators'],
      ['fish', 'fish'],
    ],
    around = near.map((n, k) => (n ? n + ' ' + nm[k][n > 1 ? 1 : 0] : '')).filter(Boolean);
  let o = '<b>' + doingText(a) + '</b>';
  o +=
    '<br>' +
    Math.round(cellTemp(idx(a.x, a.y), night)) +
    ' °C, ' +
    (alt[idx(a.x, a.y)] > 0.4 ? alt[idx(a.x, a.y)].toFixed(1) + ' km up, ' : '') +
    (Math.abs(lat(a.y)) < 0.2 ? 'tropics, warm all year' : seasonName(a.y) + ' here') +
    (Math.abs(lat(a.y)) < 0.2
      ? ''
      : Math.abs(lat(a.y)) > 0.75
        ? ' (near the ' + (lat(a.y) < 0 ? 'north' : 'south') + ' pole)'
        : '');
  o += '<br>' + weatherText(idx(a.x, a.y));
  o += '<br><br>' + (a.sex ? 'Female' : 'Male') + ' ' + stage + ', generation ' + a.gen;
  o += '<br>Energy ' + a.e.toFixed(0) + ' · water ' + a.w.toFixed(0) + ' · health ' + a.hp.toFixed(0);
  if (a.sp === 0) o += '<br>In its hand: ' + HAND[a.hand] + (a.nuts ? ' · nuts cracked: ' + a.nuts : '');
  o += '<br>Nearby: ' + (around.length ? around.join(', ') : 'no one in sight');
  const fam = [];
  if (a.mom && !a.mom.dead && !a.mom.gone) fam.push('mother ' + (a.mom.name || ''));
  if (a.mate && !a.mate.dead && !a.mate.gone) fam.push('partner ' + (a.mate.name || ''));
  if (a.kid && !a.kid.dead && !a.kid.gone) fam.push('child ' + (a.kid.name || ''));
  if (fam.length) o += '<br>Family alive: ' + fam.map((s) => s.trim()).join(', ');
  return o;
}
function weatherText(i) {
  const sky = snowing(i)
      ? 'Snowing'
      : raining(i)
        ? RAIN[i] > 0.01
          ? 'Pouring with rain'
          : 'Raining'
        : CLD[i] > 0.08
          ? 'Cloudy'
          : 'Clear sky',
    shelter = raining(i) && tree[i] > 0.4 ? ', but sheltered by the trees' : '',
    ground = water[i]
      ? ''
      : PUD[i]
        ? ', puddles on the ground'
        : MOIST[i] < 0.15
          ? ', parched ground'
          : MOIST[i] < 0.35
            ? ', dry ground'
            : MOIST[i] > 0.8
              ? ', soaked ground'
              : '';
  return sky + shelter + ground;
}
function doingText(a) {
  const m = a.mind;
  let now = a.asleep
    ? 'Sleeping'
    : a.trap > 0
      ? 'Stuck in a pit, climbing out'
      : m
        ? doingWord(a, m.act).replace(/^./, (c) => c.toUpperCase())
        : 'Looking around';
  const i = idx(a.x, a.y);
  return now + ', ' + placeOf(a) + (snowing(i) ? ', in the snow' : raining(i) ? ', in the rain' : '');
}
let tipTab = 'think';
function updateTip() {
  const tip = $('tip');
  if (!sel || sel.gone || !$('v-world').offsetParent) {
    tip.hidden = true;
    return;
  }
  const t = tipTab === 'think' ? thoughtText(sel) : doingText(sel);
  if ($('tiptxt').textContent !== t) $('tiptxt').textContent = t;
  tip.hidden = false;
  const P = screenPos(sel);
  if (!P) {
    tip.hidden = true; // round the back of the planet
    return;
  }
  const cr = cv.getBoundingClientRect(),
    wr = $('v-world').getBoundingClientRect(),
    px = cr.left - wr.left + P[0],
    py = cr.top - wr.top + P[1] - 10,
    w = tip.offsetWidth,
    h = tip.offsetHeight;
  const left = clamp(px - w / 2, 4, wr.width - w - 4),
    below = py - h < 4;
  tip.style.left = left + 'px';
  tip.style.top = (below ? py + P[2] + 24 : py - h) + 'px';
}
document.querySelectorAll('[data-tt]').forEach(
  (b) =>
    (b.onclick = (e) => {
      e.stopPropagation();
      tipTab = b.dataset.tt;
      document.querySelectorAll('[data-tt]').forEach((x) => x.setAttribute('aria-selected', x === b));
      updateTip();
    })
);
function sightRange(a, night) {
  // must match the range used in senses.js
  return Math.max(1.5, a.g.v * (night ? a.S.nv : 1) * (a.asleep ? 0.3 : 1));
}
// ---------- drawing the world: shared pieces ----------
// Terrain into any 2D context, in map units (one cell = C units).
function drawTerrain(g, v, relief = true) {
  g.fillStyle = v('--dirt');
  g.fillRect(0, 0, W * C, H * C);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = idx(x, y),
        t = ter[i];
      if (water[i]) {
        g.fillStyle = v(iced(i) ? '--ice' : '--water');
        g.fillRect(x * C, y * C, C, C);
        if (!iced(i)) {
          // the sea gets darker the deeper it is; deep lakes are a little darker too
          const d = salt[i] ? 0.12 + 0.6 * Math.min(1, -alt[i] / 3) : deep[i] ? 0.25 : 0;
          if (d) {
            g.fillStyle = 'rgba(0,25,70,' + d.toFixed(2) + ')';
            g.fillRect(x * C, y * C, C, C);
          }
        }
        continue;
      }
      if (t) {
        g.fillStyle = v(t === 1 ? '--sand' : '--stone');
        g.fillRect(x * C, y * C, C, C);
      }
      if (rock[i]) {
        g.fillStyle = v('--rock');
        g.fillRect(x * C + 1, y * C + 1, C - 2, C - 2);
      } else if (pit[i]) {
        g.fillStyle = '#1b1410';
        g.beginPath();
        g.arc(x * C + C / 2, y * C + C / 2, C / 2 - 1, 0, 7);
        g.fill();
      } else if (t !== 1 && food[i] > 0.05) {
        g.globalAlpha = Math.min(0.85, food[i]);
        g.fillStyle = v('--plant');
        g.fillRect(x * C, y * C, C, C);
        g.globalAlpha = 1;
        if (poison[i]) {
          g.fillStyle = '#c0263d';
          g.fillRect(x * C + 2, y * C + 2, 3, 3);
          g.fillRect(x * C + 6, y * C + 5, 3, 3);
        }
      }
    }
  // forests: a canopy of tree crowns, darkest in the rainforest, blue-green for pines; ripe fruit shows
  const FC = ['', '#2d5a45', '#3b7a35', '#1f5e2a'];
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x,
        t = tree[i];
      if (t < 0.12 || water[i]) continue;
      g.globalAlpha = Math.min(0.9, t * 1.1);
      g.fillStyle = FC[fkind[i]] || FC[2];
      g.fillRect(x * C, y * C, C, C);
      if (t > 0.35) {
        g.globalAlpha = Math.min(0.55, t * 0.6);
        g.fillStyle = '#0e2a14';
        g.beginPath();
        g.arc(x * C + 3, y * C + 3.5, 2.2, 0, 7);
        g.arc(x * C + 8, y * C + 6, 2.4, 0, 7);
        g.arc(x * C + 4, y * C + 8.5, 2, 0, 7);
        g.fill();
      }
      if (fruit[i] > 0.15) {
        g.globalAlpha = Math.min(1, fruit[i] * 2);
        g.fillStyle = '#f0a020';
        g.fillRect(x * C + 6, y * C + 2, 2, 2);
        g.fillRect(x * C + 2, y * C + 7, 2, 2);
      }
    }
  g.globalAlpha = 1;
  // relief: light from the north-west, so slopes facing it are lit and the far sides are in shade;
  // the highest ground turns to bare grey rock (the 3D globe does its own shading)
  for (let y = 0; y < H && relief; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (water[i]) continue;
      const h = alt[i],
        nw = Math.max(0, alt[idx(x - 1, Math.max(0, y - 1))]),
        se = Math.max(0, alt[idx(x + 1, Math.min(H - 1, y + 1))]),
        sl = (nw - se) * 1.1;
      if (h > 2.2) {
        g.globalAlpha = Math.min(0.6, (h - 2.2) / 3);
        g.fillStyle = '#8a8580';
        g.fillRect(x * C, y * C, C, C);
      }
      if (Math.abs(sl) > 0.02) {
        g.globalAlpha = Math.min(0.5, Math.abs(sl));
        g.fillStyle = sl > 0 ? '#000000' : '#ffffff';
        g.fillRect(x * C, y * C, C, C);
      }
    }
  g.globalAlpha = 1;
  // parched ground looks dusty; puddles after heavy rain
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (water[i] || rock[i]) continue;
      if (MOIST[i] < 0.2) {
        g.globalAlpha = (0.2 - MOIST[i]) * 2;
        g.fillStyle = '#d9b77a';
        g.fillRect(x * C, y * C, C, C);
      }
      if (PUD[i]) {
        g.globalAlpha = 0.85;
        g.fillStyle = v('--water');
        g.fillRect(x * C + 2, y * C + 3, C - 4, C - 5);
      }
    }
  g.globalAlpha = 1;
  // snow on cold ground: the colder the row, the thicker the snow
  g.fillStyle = v('--snow');
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (water[i]) continue;
      const sn = clamp(-cellT(i) / 10, 0, 0.75);
      if (sn <= 0) continue;
      g.globalAlpha = sn;
      g.fillRect(x * C, y * C, C, C);
    }
  g.globalAlpha = 1;
}
// Clouds, rain and snow over the land.
let showSky = true;
function drawSky(g, streaks = true) {
  if (!showSky) return;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x,
        c = CLD[i];
      if (c > 0.03) {
        g.globalAlpha = clamp(c * 3, 0, 0.6);
        g.fillStyle = c > 0.2 ? '#c9d0d8' : '#ffffff';
        g.fillRect(x * C - 1, y * C - 1, C + 2, C + 2);
      }
      if (streaks && RAIN[i] > 0.002) {
        const snow = cellT(i) < 0;
        g.globalAlpha = clamp(RAIN[i] * 60, 0.35, 0.9);
        if (snow) {
          g.fillStyle = '#ffffff';
          g.fillRect(x * C + 2, y * C + 2, 2, 2);
          g.fillRect(x * C + 7, y * C + 5, 2, 2);
          g.fillRect(x * C + 4, y * C + 8, 2, 2);
        } else {
          g.strokeStyle = '#3d6fa8';
          g.lineWidth = 1;
          g.beginPath();
          g.moveTo(x * C + 3, y * C + 1);
          g.lineTo(x * C + 1, y * C + 6);
          g.moveTo(x * C + 8, y * C + 4);
          g.lineTo(x * C + 6, y * C + 9);
          g.stroke();
        }
      }
    }
  g.globalAlpha = 1;
}
// A person as a simple little human figure — no clothes, as early humans had none. A thin pink or blue
// outline shows whether they are female or male. Children have bigger heads for their size; walkers
// take steps; sleepers lie down.
function drawPerson(g, a, X, Y, k, gr, col) {
  const h = (5.5 + 6 * gr) * k, // full height
    head = h * (0.2 + 0.1 * (1 - gr)),
    skin = '#e7b896',
    hair = '#3b2a20',
    lw = Math.max(1, h * 0.09);
  g.save();
  // standing figures have their feet on their spot; sleepers lie across it
  g.translate(X, a.asleep ? Y : Y - h * 0.35);
  if (a.asleep) g.rotate(-Math.PI / 2); // lying down
  const top = -h / 2,
    neck = top + head * 2,
    hip = neck + (h - head * 2) * 0.48,
    foot = h / 2,
    // legs swing while they are actually walking from one spot to the next
    step = a.asleep || !a.moving ? 0 : Math.sin(performance.now() / 110 + a.id) * h * 0.16,
    reach = a.act === A_EAT || a.act === A_DRINK || a.act === A_GIVE ? -h * 0.18 : 0;
  g.lineCap = 'round';
  // legs
  g.strokeStyle = skin;
  g.lineWidth = lw * 1.3;
  g.beginPath();
  g.moveTo(-h * 0.05, hip);
  g.lineTo(-h * 0.1 - step, foot);
  g.moveTo(h * 0.05, hip);
  g.lineTo(h * 0.1 + step, foot);
  g.stroke();
  // arms
  g.strokeStyle = skin;
  g.lineWidth = lw;
  g.beginPath();
  g.moveTo(-h * 0.11, neck + h * 0.04);
  g.lineTo(-h * 0.2 + step * 0.6, hip + reach);
  g.moveTo(h * 0.11, neck + h * 0.04);
  g.lineTo(h * 0.2 - step * 0.6, hip + reach);
  g.stroke();
  // body
  g.fillStyle = skin;
  g.beginPath();
  g.moveTo(-h * 0.13, neck);
  g.lineTo(h * 0.13, neck);
  g.lineTo(h * 0.1, hip + h * 0.04);
  g.lineTo(-h * 0.1, hip + h * 0.04);
  g.closePath();
  g.fill();
  // head and hair
  g.fillStyle = skin;
  g.beginPath();
  g.arc(0, top + head, head, 0, 7);
  g.fill();
  g.fillStyle = hair;
  g.beginPath();
  g.arc(0, top + head * 0.9, head, Math.PI, 2 * Math.PI);
  g.fill();
  if (a.sex) g.fillRect(-head, top + head * 0.9, head * 0.35, head * 1.3); // longer hair
  // a thin pink or blue outline (female or male), which also makes them stand out on any ground
  g.strokeStyle = col;
  g.lineWidth = Math.max(0.8, lw * 0.45);
  g.beginPath();
  g.arc(0, top + head, head, 0, 7);
  g.moveTo(-h * 0.13, neck);
  g.lineTo(h * 0.13, neck);
  g.lineTo(h * 0.1, hip + h * 0.04);
  g.lineTo(-h * 0.1, hip + h * 0.04);
  g.closePath();
  g.stroke();
  g.restore();
}
// One creature at (X, Y); k scales its size (1 = flat-map size).
// Animals, side on, facing the way they last walked. Each kind has its own shape and colour.
const LOOK = {
  Deer: { col: '#a0703f', w: 4.2, h: 1.9, leg: 2.6, s: 1 },
  Rabbit: { col: '#9b8a78', w: 2.3, h: 1.7, leg: 0.8, s: 0.7 },
  Bison: { col: '#4a3222', w: 5.4, h: 2.8, leg: 1.8, s: 1.35 },
  Wolf: { col: '#868b91', w: 4, h: 1.6, leg: 2, s: 0.95 },
  'Big cat': { col: '#c9963b', w: 4.6, h: 1.6, leg: 1.8, s: 1 },
  Bear: { col: '#5b3b26', w: 4.8, h: 2.9, leg: 1.6, s: 1.3 },
};
function drawAnimal(g, a, X, Y, k) {
  const L = LOOK[a.S.n] || LOOK.Deer,
    gr = clamp(a.age / a.S.mat, 0.35, 1),
    u = k * L.s * (0.45 + 0.55 * gr) * 1.3,
    f = a.face || 1,
    bw = L.w * u,
    bh = L.h * u,
    leg = a.asleep ? 0 : L.leg * u,
    swing = a.moving && !a.asleep ? Math.sin(performance.now() / 120 + a.id) * u * 0.7 : 0,
    by = Y - leg - bh / 2 + (a.asleep ? bh * 0.3 : 0); // body centre; feet on the ground at Y
  g.save();
  g.lineCap = 'round';
  g.strokeStyle = L.col;
  g.fillStyle = L.col;
  // legs
  if (leg) {
    g.lineWidth = Math.max(1, u * (a.S.n === 'Bison' || a.S.n === 'Bear' ? 0.75 : 0.45));
    g.beginPath();
    for (const [lx, sw] of [
      [-0.32, swing],
      [-0.22, -swing],
      [0.25, -swing],
      [0.35, swing],
    ]) {
      g.moveTo(X + lx * bw, by + bh * 0.3);
      g.lineTo(X + lx * bw + sw * 0.5, Y);
    }
    g.stroke();
  }
  // tail
  g.lineWidth = Math.max(1, u * 0.4);
  g.beginPath();
  const tx = X - f * bw * 0.5;
  if (a.S.n === 'Wolf') {
    g.moveTo(tx, by - bh * 0.1);
    g.quadraticCurveTo(tx - f * bw * 0.25, by + bh * 0.1, tx - f * bw * 0.35, by + bh * 0.4);
    g.lineWidth = Math.max(1.5, u * 0.8);
  } else if (a.S.n === 'Big cat') {
    g.moveTo(tx, by - bh * 0.1);
    g.quadraticCurveTo(tx - f * bw * 0.45, by + bh * 0.6, tx - f * bw * 0.55, by - bh * 0.3);
  } else {
    g.moveTo(tx, by - bh * 0.2);
    g.lineTo(tx - f * u * 0.5, by);
  }
  g.stroke();
  // body (bison have a hump at the shoulders)
  g.beginPath();
  g.ellipse(X, by, bw / 2, bh / 2, 0, 0, 7);
  g.fill();
  if (a.S.n === 'Bison') {
    g.beginPath();
    g.ellipse(X + f * bw * 0.18, by - bh * 0.35, bw * 0.25, bh * 0.45, 0, 0, 7);
    g.fill();
  }
  // head
  const head = (a.S.n === 'Rabbit' ? 0.7 : a.S.n === 'Bear' || a.S.n === 'Bison' ? 0.95 : 0.75) * bh,
    hx = X + f * (bw / 2 + head * 0.35),
    hy = by - bh * (a.S.n === 'Bison' ? 0.05 : 0.45) + (a.act === A_EAT ? bh * 0.7 : 0);
  g.beginPath();
  g.arc(hx, hy, head / 2, 0, 7);
  g.fill();
  // snout
  if (a.S.n === 'Deer' || a.S.n === 'Wolf') {
    g.beginPath();
    g.ellipse(hx + f * head * 0.45, hy + head * 0.1, head * 0.32, head * 0.2, 0, 0, 7);
    g.fill();
  }
  // ears, antlers, horns
  g.lineWidth = Math.max(1, u * 0.35);
  g.beginPath();
  if (a.S.n === 'Rabbit') {
    g.ellipse(hx - f * head * 0.15, hy - head * 1.05, head * 0.16, head * 0.6, -f * 0.2, 0, 7);
    g.ellipse(hx + f * head * 0.1, hy - head * 1.0, head * 0.16, head * 0.6, f * 0.15, 0, 7);
    g.fill();
  } else if (a.S.n === 'Wolf' || a.S.n === 'Big cat') {
    const e = a.S.n === 'Wolf' ? 0.55 : 0.3;
    g.moveTo(hx - head * 0.3, hy - head * 0.3);
    g.lineTo(hx - head * 0.15, hy - head * (0.4 + e));
    g.lineTo(hx + head * 0.05, hy - head * 0.35);
    g.fill();
  } else if (a.S.n === 'Bear') {
    g.arc(hx - head * 0.28, hy - head * 0.42, head * 0.17, 0, 7);
    g.arc(hx + head * 0.2, hy - head * 0.45, head * 0.17, 0, 7);
    g.fill();
  } else if (a.S.n === 'Deer' && !a.sex && gr > 0.8) {
    g.strokeStyle = '#d8c6a0';
    g.moveTo(hx, hy - head * 0.4);
    g.lineTo(hx - f * head * 0.3, hy - head * 1.4);
    g.moveTo(hx - f * head * 0.1, hy - head * 0.9);
    g.lineTo(hx + f * head * 0.25, hy - head * 1.25);
    g.stroke();
  } else if (a.S.n === 'Bison') {
    g.strokeStyle = '#e0d6c0';
    g.moveTo(hx - head * 0.3, hy - head * 0.3);
    g.quadraticCurveTo(hx - head * 0.55, hy - head * 0.75, hx - head * 0.25, hy - head * 0.8);
    g.stroke();
  }
  // a pale tail patch on deer and rabbits
  if (a.S.n === 'Deer' || a.S.n === 'Rabbit') {
    g.fillStyle = '#f2ece2';
    g.beginPath();
    g.arc(X - f * bw * 0.48, by - bh * 0.15, Math.max(0.8, u * 0.4), 0, 7);
    g.fill();
  }
  g.restore();
}
// One creature at (X, Y); k scales its size (1 = flat-map size).
function drawCreature(g, a, X, Y, k, v, dim = 1) {
  const S = a.S,
    gr = clamp(a.age / S.mat, 0.3, 1);
  g.globalAlpha = (a.asleep ? 0.45 : 1) * dim;
  if (a.sp === 0) {
    g.globalAlpha = (a.asleep ? 0.8 : 1) * dim;
    drawPerson(g, a, X, Y, k, gr, a.sex ? v('--f') : v('--m'));
  } else if (a.sp === 1 || a.sp === 2) {
    g.globalAlpha = (a.asleep ? 0.75 : 1) * dim;
    drawAnimal(g, a, X, Y + 3.5 * k, k);
  } else {
    g.fillStyle = v('--fish');
    const q = (1.5 + 2 * gr) * k;
    g.beginPath();
    g.ellipse(X, Y, q * 1.4, q * 0.7, 0, 0, 7);
    g.fill();
    g.beginPath();
    g.moveTo(X - q * 1.2, Y);
    g.lineTo(X - q * 2.2, Y - q * 0.8);
    g.lineTo(X - q * 2.2, Y + q * 0.8);
    g.fill();
  }
  g.globalAlpha = 1;
}

// ---------- flat map ----------
const FLAT = { c: null, g: null, n: 0 };
function drawFlat(v) {
  // the land and sky change slowly, so they are drawn to a cached picture a few times a second
  if (!FLAT.c) {
    FLAT.c = document.createElement('canvas');
    FLAT.c.width = W * C;
    FLAT.c.height = H * C;
    FLAT.g = FLAT.c.getContext('2d');
    FLAT.n = 0;
  }
  if (FLAT.n++ % 10 === 0) {
    drawTerrain(FLAT.g, v);
    drawSky(FLAT.g);
  }
  cx.setTransform(1, 0, 0, 1, 0, 0);
  cx.imageSmoothingEnabled = true;
  cx.drawImage(FLAT.c, 0, 0, cv.width, cv.height);
  cx.setTransform(cv.width / (W * C), 0, 0, cv.height / (H * C), 0, 0);
  for (const a of ag) drawCreature(cx, a, a.rx * C + C / 2, a.ry * C + C / 2, 1, v);
  // night is local: shade the half of the world where the sun is down
  cx.fillStyle = 'rgba(8,16,48,.38)';
  for (let x = 0; x < W; x++) if (isNightAt(x)) cx.fillRect(x * C, 0, C, H * C);
  if (sel) {
    cx.strokeStyle = v('--ink');
    cx.lineWidth = 2;
    cx.beginPath();
    cx.arc(sel.rx * C + C / 2, sel.ry * C + C / 2, 8, 0, 7);
    cx.stroke();
    // how far it can see right now (the same range its senses use)
    cx.save();
    cx.globalAlpha = 0.6;
    cx.lineWidth = 1;
    cx.setLineDash([4, 4]);
    cx.beginPath();
    cx.arc(sel.rx * C + C / 2, sel.ry * C + C / 2, sightRange(sel, isNightAt(sel.x)) * C, 0, 7);
    cx.stroke();
    cx.restore();
  }
}

// ---------- the globe ----------
// The map wraps all the way around: column → longitude (−180°…180°), row → latitude (+80° at the
// top … −80° at the bottom). Beyond ±80° are the polar ice caps. Drawn as a sphere seen from space,
// lit by the sun, which circles the planet once a day.
const LATMAX = (80 * Math.PI) / 180,
  TS = 4; // texture pixels per cell
const lonOfX = (x) => ((x + 0.5) / W) * 2 * Math.PI - Math.PI,
  latOfY = (y) => LATMAX * (1 - (2 * (y + 0.5)) / H);
const GL = {
  lon0: 0,
  lat0: 0.3,
  zoom: 1,
  spin: true, // turns slowly on its own, like a planet
  held: false, // being dragged right now
  vel: 0.0012, // current turning speed (radians per frame)
  BW: 0,
  BH: 0,
  key: '',
  tex: null,
  tctx: null,
  tdata: null,
  tframe: 0,
  buf: null,
  bctx: null,
  img: null,
  off: null,
  nx: null,
  ny: null,
  nz: null,
  limb: null,
  cap: [240, 246, 250],
};
const R0 = () => (Math.min(GL.BW, GL.BH) / 2) * 0.9 * GL.zoom;
function globeCache() {
  const BW = GL.BW,
    BH = GL.BH,
    R = R0(),
    TW = W * TS,
    TH = H * TS,
    key = [BW, BH, GL.lon0.toFixed(4), GL.lat0.toFixed(4), GL.zoom.toFixed(4)].join();
  if (key === GL.key) return;
  GL.key = key;
  const n = BW * BH;
  if (!GL.off || GL.off.length !== n) {
    GL.off = new Int32Array(n);
    GL.nx = new Float32Array(n);
    GL.ny = new Float32Array(n);
    GL.nz = new Float32Array(n);
    GL.limb = new Float32Array(n);
  }
  const s0 = Math.sin(GL.lat0),
    c0 = Math.cos(GL.lat0);
  for (let py = 0; py < BH; py++)
    for (let px = 0; px < BW; px++) {
      const p = py * BW + px,
        u = (px + 0.5 - BW / 2) / R,
        w = (BH / 2 - py - 0.5) / R,
        rr = u * u + w * w;
      if (rr > 1) {
        GL.off[p] = -1;
        continue;
      }
      const z = Math.sqrt(1 - rr),
        la = Math.asin(clamp(w * c0 + z * s0, -1, 1)),
        lo = GL.lon0 + Math.atan2(u, z * c0 - w * s0),
        cl = Math.cos(la);
      GL.nx[p] = cl * Math.cos(lo);
      GL.ny[p] = cl * Math.sin(lo);
      GL.nz[p] = Math.sin(la);
      GL.limb[p] = 0.72 + 0.28 * z;
      if (Math.abs(la) > LATMAX) {
        GL.off[p] = -2;
        continue;
      }
      let tu = Math.floor((((lo + Math.PI) / (2 * Math.PI)) % 1) * TW);
      if (tu < 0) tu += TW;
      const tv = clamp(Math.floor(((LATMAX - la) / (2 * LATMAX)) * TH), 0, TH - 1);
      GL.off[p] = (tv * TW + tu) * 4;
    }
}
// where a map cell appears on the globe, in globe-buffer pixels; null if it is round the back
function globeProject(x, y) {
  const la = latOfY(y),
    dl = lonOfX(x) - GL.lon0,
    cl = Math.cos(la),
    s0 = Math.sin(GL.lat0),
    c0 = Math.cos(GL.lat0),
    c = s0 * Math.sin(la) + c0 * cl * Math.cos(dl);
  if (c <= 0) return null;
  const R = R0();
  return [GL.BW / 2 + R * cl * Math.sin(dl), GL.BH / 2 - R * (c0 * Math.sin(la) - s0 * cl * Math.cos(dl)), c];
}
function drawGlobe(v) {
  const BW = GL.BW,
    BH = GL.BH;
  if (!BW) return;
  if (!GL.tex) {
    GL.tex = document.createElement('canvas');
    GL.tex.width = W * TS;
    GL.tex.height = H * TS;
    GL.tctx = GL.tex.getContext('2d', { willReadFrequently: true });
  }
  if (!GL.buf || GL.buf.width !== BW || GL.buf.height !== BH) {
    GL.buf = document.createElement('canvas');
    GL.buf.width = BW;
    GL.buf.height = BH;
    GL.bctx = GL.buf.getContext('2d');
    GL.img = GL.bctx.createImageData(BW, BH);
    GL.key = '';
  }
  // Keep turning. A flick carries on with momentum, then eases back to the planet's slow spin.
  if (!GL.held) {
    GL.lon0 += GL.vel;
    GL.vel += ((GL.spin ? 0.0012 : 0) - GL.vel) * 0.03;
  }
  // refresh the planet's surface a few times a second (grass, snow and ice change slowly)
  if (!GL.tdata || ++GL.tframe % 12 === 0) {
    GL.tctx.setTransform(TS / C, 0, 0, TS / C, 0, 0);
    drawTerrain(GL.tctx, v);
    drawSky(GL.tctx);
    GL.tdata = GL.tctx.getImageData(0, 0, W * TS, H * TS).data;
    const sn = /^#([0-9a-f]{6})$/i.exec(v('--snow'));
    if (sn) GL.cap = [0, 2, 4].map((k) => parseInt(sn[1].slice(k, k + 2), 16));
  }
  globeCache();
  // the sun is overhead where it is local noon
  const xs = ((((0.5 - (tick % DAY) / DAY) * W) % W) + W) % W,
    ls = (xs / W) * 2 * Math.PI - Math.PI,
    sx = Math.cos(ls),
    sy = Math.sin(ls);
  const T = GL.tdata,
    o = GL.img.data,
    off = GL.off,
    cap = GL.cap;
  for (let p = 0, q = 0; p < off.length; p++, q += 4) {
    const t = off[p];
    if (t === -1) {
      o[q + 3] = 0;
      continue;
    }
    let r, g, b;
    if (t === -2) {
      r = cap[0];
      g = cap[1];
      b = cap[2];
    } else {
      r = T[t];
      g = T[t + 1];
      b = T[t + 2];
    }
    const d = GL.nx[p] * sx + GL.ny[p] * sy,
      l = d > 0.1 ? 1 : d < -0.1 ? 0 : (d + 0.1) * 5,
      f = (0.2 + 0.8 * l) * GL.limb[p],
      blue = (1 - l) * 18;
    o[q] = r * f;
    o[q + 1] = g * f;
    o[q + 2] = b * f + blue;
    o[q + 3] = 255;
  }
  GL.bctx.putImageData(GL.img, 0, 0);
  const k = cv.width / BW,
    R = R0() * k,
    c = cv.width / 2,
    cy = cv.height / 2;
  cx.setTransform(1, 0, 0, 1, 0, 0);
  cx.clearRect(0, 0, cv.width, cv.height);
  // a thin glow of atmosphere
  const at = cx.createRadialGradient(c, cy, R * 0.98, c, cy, R * 1.08);
  at.addColorStop(0, 'rgba(120,180,255,.45)');
  at.addColorStop(1, 'rgba(120,180,255,0)');
  cx.fillStyle = at;
  cx.beginPath();
  cx.arc(c, cy, R * 1.08, 0, 7);
  cx.fill();
  cx.imageSmoothingEnabled = true;
  cx.drawImage(GL.buf, 0, 0, cv.width, cv.height);
  // creatures: one cell is about this many screen pixels at the middle of the globe
  const cell = (2 * Math.PI * R) / W,
    ks = clamp((cell / C) * 0.9, 0.25, 9);
  for (const a of ag) {
    const P = globeProject(a.x, a.y);
    if (!P) continue;
    drawCreature(cx, a, P[0] * k, P[1] * k, ks * (0.5 + 0.5 * P[2]), v, isNightAt(a.x) ? 0.5 : 1);
  }
  if (sel) {
    const P = globeProject(sel.x, sel.y);
    if (P) {
      cx.strokeStyle = v('--ink');
      cx.lineWidth = 2;
      cx.beginPath();
      cx.arc(P[0] * k, P[1] * k, Math.max(7, 8 * ks), 0, 7);
      cx.stroke();
    }
  }
}
// where a creature is on screen, in CSS pixels relative to the canvas; null if out of view
function screenPos(a) {
  const r = cv.getBoundingClientRect();
  if (view === 'flat') return [((a.rx + 0.5) / W) * r.width, (a.ry / H) * r.height, r.height / H];
  if (G3D.ok) {
    const Q = G3D.project(a.rx, a.ry),
      d = cv.width / r.width;
    return Q ? [Q[0] / d, Q[1] / d - 6, Q[2] / d] : null;
  }
  const P = globeProject(a.x, a.y);
  if (!P) return null;
  const k = r.width / GL.BW;
  return [P[0] * k, P[1] * k - 6, ((2 * Math.PI * R0()) / W) * k];
}

const drawHud = { k: '' };
// e.g. "9 deer, 31 rabbits, 4 bison"
function kindCounts(sp) {
  const n = {};
  for (const a of ag) if (a.sp === sp) n[a.S.n] = (n[a.S.n] || 0) + 1;
  return (
    Object.entries(n)
      .map(([k, c]) => c + ' ' + (c > 1 ? plural(k) : k).toLowerCase())
      .join(', ') || 'none'
  );
}
// fly to the next creature of a kind, select it and show what it is thinking
const findAt = [0, 0, 0, 0];
function findOne(sp) {
  const list = ag.filter((a) => a.sp === sp && !a.dead);
  if (!list.length) return;
  const a = list[findAt[sp]++ % list.length];
  sel = a;
  fillIdeas();
  if (view === 'globe') {
    GL.lon0 = lonOfX(a.x);
    GL.lat0 = latOfY(a.y);
    GL.zoom = Math.max(GL.zoom, 2.6);
    GL.spin = false;
    GL.vel = 0;
    GL.follow = a; // keep it in view as it walks, until you drag the planet
    $('ghint').hidden = true;
  }
}
$('hud').addEventListener('click', (e) => {
  const b = e.target.closest('[data-find]');
  if (b) findOne(+b.dataset.find);
});
// Creatures move one square at a time in the simulation; on screen they walk smoothly between squares
// (rx, ry are where they are drawn), and the short way round the east–west seam.
function glide() {
  for (const a of ag) {
    if (a.rx === undefined) {
      a.rx = a.x;
      a.ry = a.y;
    }
    const dx = dxw(a.x - a.rx),
      dy = a.y - a.ry;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      a.rx = a.x;
      a.ry = a.y;
    } else {
      a.rx = (((a.rx + dx * 0.12) % W) + W) % W;
      a.ry += dy * 0.12;
    }
    a.moving = Math.abs(dx) + Math.abs(dy) > 0.05;
    if (Math.abs(dx) > 0.05) a.face = dx > 0 ? 1 : -1;
  }
}
function draw() {
  glide();
  const s = getComputedStyle(document.documentElement),
    v = (n) => s.getPropertyValue(n).trim();
  if (sel && sel.gone) {
    sel = null;
    fillIdeas();
  }
  if (view === 'globe') G3D.ok ? G3D.draw(v) : drawGlobe(v);
  else drawFlat(v);
  const night = sel ? isNightAt(sel.x) : false;
  if (sel) {
    const S = sel.S;
    const stage =
      sel.age < S.mat * S.wn
        ? 'baby'
        : sel.age < S.mat
          ? 'child'
          : sel.age < S.smat
            ? 'teenager'
            : sel.age < sel.lf * 0.7
              ? 'adult'
              : 'elder';
    $('ithink').innerHTML = thinkHTML(sel, S);
    $('idoing').innerHTML = doingHTML(sel, S, stage, night);
  }
  const c = [0, 0, 0, 0];
  ag.forEach((a) => c[a.sp]++);
  const asl = ag.filter((a) => a.asleep),
    sc = [0, 0, 0, 0];
  asl.forEach((a) => sc[a.sp]++);
  const st = [
    [c[0], 'People'],
    [c[1], 'Plant-eaters: ' + kindCounts(1)],
    [c[2], 'Hunters: ' + kindCounts(2)],
    [c[3], 'Fish'],
    [fished, 'Fish caught by people'],
    [maxGen, 'Latest human generation'],
    ['Year ' + Math.floor(tick / TY) + ', day ' + dayN(), 'Time'],
    [seasonName(0) + ' / ' + seasonName(H - 1), 'Season (north / south)'],
    [
      Math.round((100 * RAIN.reduce((t, r) => t + (r > 0.002), 0)) / (W * H)) + '%',
      'Of the world under rain or snow',
    ],
    [sc[0] + ' / ' + sc[1] + ' / ' + sc[2], 'Asleep now (people / herbivores / predators)'],
    [kills[0] + ' / ' + kills[1], 'Predator kills (people / herbivores)'],
    [nLessons, 'Lessons learned'],
  ];
  $('stats').innerHTML = st
    .map((x) => '<div class="stat"><b>' + x[0] + '</b><span>' + x[1] + '</span></div>')
    .join('');
  // the counts are buttons: tap one to fly to the next creature of that kind
  const hudKey = c.join() + (tick % DAY) + seasonName(0);
  if (hudKey !== drawHud.k) {
    drawHud.k = hudKey;
    $('hud').innerHTML =
      [
        [0, c[0] + ' people'],
        [1, c[1] + ' plant-eaters'],
        [2, c[2] + ' hunters'],
        [3, c[3] + ' fish'],
      ]
        .map(([k, t]) => '<button data-find="' + k + '" title="Show me one">' + t + '</button>')
        .join('') +
      [
        'Year ' + Math.floor(tick / TY) + ', day ' + dayN(),
        'North: ' + seasonName(0) + ' · South: ' + seasonName(H - 1),
      ]
        .map((t) => '<span>' + t + '</span>')
        .join('');
  }
  cc.clearRect(0, 0, 440, 120);
  const mx = Math.max(20, ...hist.flat());
  [
    ['--acc', 0],
    ['--herb', 1],
    ['--bad', 2],
    ['--water', 3],
  ].forEach(([col, k]) => {
    cc.strokeStyle = v(col);
    cc.lineWidth = 2;
    cc.beginPath();
    hist.forEach((p, i) => {
      const X = i * 2,
        Y = 115 - (p[k] / mx) * 105;
      i ? cc.lineTo(X, Y) : cc.moveTo(X, Y);
    });
    cc.stroke();
  });
  cc.fillStyle = v('--mute');
  cc.font = '11px sans-serif';
  cc.fillText('peak ' + mx, 4, 12);
}
// Speed: a slider from real time (one second here is one second there) up to very fast, on a
// logarithmic scale so every part of it is useful. One step of the world is 15 minutes.
const STEP_S = 900,
  SPD_LO = Math.log10(1 / STEP_S),
  SPD_HI = Math.log10(600);
const stepsPerSec = () => 10 ** (SPD_LO + ((SPD_HI - SPD_LO) * +$('spd').value) / 100);
function spdLabel() {
  const r = stepsPerSec() * STEP_S; // seconds of world time per real second
  const f = (v, u) =>
    (v < 10 ? v.toFixed(1).replace(/\.0$/, '') : Math.round(v)) + ' ' + u + (v >= 1.05 ? 's' : '');
  $('spdl').textContent =
    r < 1.5
      ? 'real time'
      : '1 s = ' +
        (r < 60
          ? f(r, 'second')
          : r < 3600
            ? f(r / 60, 'minute')
            : r < 86400
              ? f(r / 3600, 'hour')
              : f(r / 86400, 'day'));
}
try {
  const v = localStorage.getItem('genesis-speed');
  if (v !== null) $('spd').value = v;
} catch (e) {}
$('spd').oninput = () => {
  spdLabel();
  try {
    localStorage.setItem('genesis-speed', $('spd').value);
  } catch (e) {}
};
spdLabel();
let lastT = performance.now();
function loop() {
  const now = performance.now(),
    dt = Math.min(0.25, (now - lastT) / 1000);
  lastT = now;
  if (running) {
    acc += stepsPerSec() * dt;
    let n = 0;
    while (acc >= 1 && n < 10) {
      sim();
      acc--;
      n++;
    }
    if (acc > 10) acc = 0;
  }
  draw();
  updateDock();
  updateTip();
  requestAnimationFrame(loop);
}
$('play').onclick = () => {
  running = !running;
  $('play').textContent = running ? 'Pause' : 'Play';
};
const readCfg = () => ({
  people: +$('fnd').value || 2,
  herbivores: +$('hrb').value || 0,
  predators: +$('prd').value || 0,
  fish: +$('fsh').value || 0,
});
function onLog(logs) {
  $('log').innerHTML = logs.map((l) => '<li>' + l + '</li>').join('');
}
function onExtinct() {
  running = false;
  $('play').textContent = 'Play';
}
$('reset').onclick = () => {
  FLAT.n = 0;
  GL.tdata = null;
  if (G3D.ok) G3D.repaint();
  reset(readCfg());
  fillIdeas();
  running = true;
  $('play').textContent = 'Pause';
  showTab('world');
};
function fillIdeas() {
  const T = $('wtxt'),
    B = $('wgo');
  $('wmsg').textContent = '';
  T.disabled = B.disabled = !sel;
  T.placeholder = sel
    ? 'Whisper to ' + (sel.name || 'this ' + sel.S.n.toLowerCase()) + '…'
    : 'Click a creature first';
  if (sel && sel.wh) $('wmsg').textContent = 'A whisper is already on its way.';
}
$('wgo').onclick = () => {
  if (!sel || sel.gone) return;
  const t = $('wtxt').value.trim();
  if (!t) return;
  sel.wh = t;
  $('wtxt').value = '';
  const r = interpret(t, sel),
    u = r.useful.map((f) => (f.neg ? 'not ' : '') + f.k),
    off = r.found.filter((f) => !f.ok).map((f) => f.k);
  $('wmsg').textContent =
    (u.length
      ? 'It will carry: ' + u.join(', ') + (r.dir !== null ? ' (toward the ' + CP[r.dir] + ')' : '') + '.'
      : 'Nothing in these words connects to its world yet, so it will only stir a feeling.') +
    (off.length ? ' A ' + sel.S.n.toLowerCase() + ' has no use for: ' + off.join(', ') + '.' : '') +
    (sel.asleep ? ' It will reach them in their sleep.' : ' It will come in sleep or a quiet moment.');
};
$('wtxt').onkeydown = (e) => {
  if (e.key === 'Enter') $('wgo').onclick();
};
// pick the creature nearest to a click (in CSS pixels), on either view
function selectAt(e) {
  const r = cv.getBoundingClientRect(),
    qx = e.clientX - r.left,
    qy = e.clientY - r.top;
  let b = null,
    bd = 18 ** 2;
  for (const a of ag) {
    const P = screenPos(a);
    if (!P) continue;
    const d = (P[0] - qx) ** 2 + (P[1] + (view === 'globe' ? 6 : P[2] / 2) - qy) ** 2;
    if (d < bd) {
      bd = d;
      b = a;
    }
  }
  sel = b;
  fillIdeas();
}
// drag to spin the globe, scroll or pinch to zoom; a click without dragging selects
const ptr = new Map();
let dragged = false,
  pinch0 = 0,
  zoom0 = 1;
cv.addEventListener('pointerdown', (e) => {
  cv.setPointerCapture(e.pointerId);
  ptr.set(e.pointerId, { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY });
  dragged = false;
  if (view === 'globe') {
    GL.follow = null;
    GL.held = true;
    GL.vel = 0;
    $('ghint').hidden = true;
  }
  if (ptr.size === 2) {
    const [p, q] = [...ptr.values()];
    pinch0 = Math.hypot(p.x - q.x, p.y - q.y);
    zoom0 = GL.zoom;
  }
});
cv.addEventListener('pointermove', (e) => {
  const p = ptr.get(e.pointerId);
  if (!p) return;
  const dx = e.clientX - p.x,
    dy = e.clientY - p.y;
  p.x = e.clientX;
  p.y = e.clientY;
  if (Math.hypot(e.clientX - p.x0, e.clientY - p.y0) > 5) dragged = true;
  if (view !== 'globe') return;
  if (ptr.size === 2) {
    const [a, b] = [...ptr.values()];
    if (pinch0) GL.zoom = clamp((zoom0 * Math.hypot(a.x - b.x, a.y - b.y)) / pinch0, 1, 40);
    return;
  }
  const r = cv.getBoundingClientRect(),
    R = (Math.min(r.width, r.height) / 2) * 0.9 * GL.zoom;
  GL.lon0 -= dx / R;
  GL.vel = clamp(-dx / R, -0.08, 0.08); // remembered for the flick
  GL.lat0 = clamp(GL.lat0 + dy / R, -1.45, 1.45);
});
const endPtr = (e) => {
  if (!ptr.has(e.pointerId)) return;
  ptr.delete(e.pointerId);
  if (ptr.size === 0) GL.held = false;
  if (!dragged && ptr.size === 0 && e.type === 'pointerup') selectAt(e);
  if (ptr.size < 2) pinch0 = 0;
};
cv.addEventListener('pointerup', endPtr);
cv.addEventListener('pointercancel', endPtr);
cv.addEventListener(
  'wheel',
  (e) => {
    if (view !== 'globe') return;
    e.preventDefault();
    GL.zoom = clamp(GL.zoom * Math.exp(-e.deltaY * 0.0015), 1, 40);
  },
  { passive: false }
);
function setView(v) {
  view = v;
  $('view').textContent = v === 'globe' ? 'Flat map' : 'Globe';
  $('ghint').hidden = v !== 'globe';
  cv.classList.toggle('round', v === 'globe');
  $('v-world').classList.toggle('space', v === 'globe');
  if (G3D.ok) G3D.show(v === 'globe');
  fit();
}
$('view').onclick = () => setView(view === 'globe' ? 'flat' : 'globe');
$('sky').onclick = () => {
  showSky = !showSky;
  $('sky').textContent = showSky ? 'Hide clouds' : 'Show clouds';
  GL.tdata = null;
  FLAT.n = 0;
  if (G3D.ok) G3D.repaint();
};
// ---------- full-screen world, tabs ----------
function fit() {
  const r = $('stage').getBoundingClientRect(),
    pad = 16,
    asp = W / H;
  let w = r.width - pad,
    h = w / asp;
  if (view === 'globe') {
    w = r.width;
    h = r.height;
  } else if (h > r.height - pad) {
    h = r.height - pad;
    w = h * asp;
  }
  if (w < 50) return;
  const d = window.devicePixelRatio || 1;
  cv.style.width = w + 'px';
  cv.style.height = h + 'px';
  cv.width = Math.round(w * d);
  cv.height = Math.round(h * d);
  // the globe is rendered pixel by pixel, so cap its resolution to keep it smooth
  const g = Math.min(1, Math.sqrt((560 * 560) / (cv.width * cv.height)));
  GL.BW = Math.max(1, Math.round(cv.width * g));
  GL.BH = Math.max(1, Math.round(cv.height * g));
}
function showTab(name) {
  document
    .querySelectorAll('nav button')
    .forEach((b) => b.setAttribute('aria-selected', b.dataset.tab === name));
  document.querySelectorAll('.view').forEach((v) => (v.hidden = v.id !== 'v-' + name));
  if (name === 'world') fit();
}
document.querySelectorAll('nav button').forEach((b) => (b.onclick = () => showTab(b.dataset.tab)));
function updateDock() {
  const d = $('dock');
  if (!sel || sel.gone) {
    d.hidden = true;
    return;
  }
  const yrs = sel.age / TY,
    t =
      (sel.name || sel.S.n) +
      ', ' +
      (yrs < 1
        ? ((m) => m + (m === 1 ? ' month' : ' months'))(Math.max(1, Math.round(yrs * 12)))
        : yrs.toFixed(1) + ' years');
  if ($('dname').textContent !== t) $('dname').textContent = t;
  d.hidden = false;
}
document.querySelectorAll('[data-dt]').forEach(
  (b) =>
    (b.onclick = () => {
      document.querySelectorAll('[data-dt]').forEach((x) => x.setAttribute('aria-selected', x === b));
      $('dp-think').hidden = b.dataset.dt !== 'think';
      $('dp-doing').hidden = b.dataset.dt !== 'doing';
      $('dock').classList.remove('min');
    })
);
$('dmin').onclick = () => {
  const m = $('dock').classList.toggle('min');
  $('dmin').textContent = m ? '+' : '–';
};
new ResizeObserver(fit).observe($('stage'));
window.addEventListener('resize', fit);
reset(readCfg());
fillIdeas();
setView('globe');
loop();
