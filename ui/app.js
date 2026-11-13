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
  if (k === A_GIVE) {
    // sharing only happens when a hungry child of its own is right beside it
    const child = ag.some((o) => kinYoung(a, o) && Math.abs(dxw(o.x - a.x)) <= 1 && Math.abs(o.y - a.y) <= 1);
    return !child
      ? 'reaching out to share food, but no child is beside it'
      : a.e <= 40
        ? 'wanting to share food, but too hungry itself'
        : 'sharing food with its child';
  }
  if (k === A_EAT && a.sp < 2 && !(food[idx(a.x, a.y)] > 0.05) && !water[idx(a.x, a.y)])
    return 'trying to eat, but there is nothing to eat here';
  if (k === A_TAKE) {
    const i = idx(a.x, a.y);
    return a.hand
      ? 'reaching for something, but its hand is already full'
      : FIRE[i] > 0.05 && stick[i]
        ? 'picking up a burning stick'
        : pyrite[i]
          ? 'picking up a shiny yellow stone'
          : stone[i]
            ? 'picking up a stone'
            : stick[i]
              ? 'picking up a stick'
              : flake[i]
                ? 'picking up a sharp stone'
                : 'reaching for something, but there is nothing here to pick up';
  }
  if (k === A_DROP)
    return a.hand === 4
      ? 'putting the burning stick down'
      : a.hand
        ? 'putting down ' + HAND[a.hand]
        : 'opening its empty hands';
  if (k === A_STRIKE) {
    const i = idx(a.x, a.y);
    return !a.hand
      ? 'swinging its empty hands'
      : a.hand === 2 && FIRE[i] > 0.05
        ? 'pushing a stick into the fire'
        : a.hand === 5 && stone[i] + flake[i]
          ? 'striking the shiny stone against a stone — sparks fly'
          : a.hand === 2 && stick[i]
            ? 'rubbing its stick hard against another'
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
  if (FIRE[i] > 0.03) return 'in the middle of a fire';
  if (fireNear(a.x, a.y) > 0.03) return 'by a fire';
  if (iced(i)) return salt[i] ? 'on the sea ice' : 'on frozen water';
  if (salt[i]) return deep[i] ? 'out in the deep sea' : 'in the shallow sea';
  if (river[i]) return 'by a river'; // a river square is 3 km of land with a channel tens of metres wide through it
  if (tree[i] > 0.35) return 'in the ' + FOREST[fkind[i] || 2];
  if (!water[i] && cellT(i) < -2) return 'in the snow';
  return water[i]
    ? deep[i]
      ? 'in deep water'
      : 'in shallow water'
    : cave[i]
      ? 'in a cave'
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
  fire: 'sees fire',
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
  'loneliness or grief': 'it is lonely, or missing someone',
  heat: 'it is too hot',
  anger: 'it is angry',
  'being in deep water': 'it is in deep water',
  'memory of water': 'it remembers where water is',
  'memory of food': 'it remembers where food is',
  'what it was just thinking': 'it is still caught up in what just happened',
  'the warmth of a fire': 'it feels the warmth of a fire',
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
  if (n.startsWith('hearing ')) return 'it hears ' + n.slice(8);
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
    'tries to share food',
    'picks something up',
    'puts it down',
    'strikes with what it holds',
    a.up ? 'climbs down' : 'climbs a tree',
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
      ? a.dream
        ? 'Asleep, going over a moment from earlier: it ' +
          plainAct(a, a.dream.act) +
          ', and then came ' +
          WHY[a.dream.why] +
          '. Its brain is learning from it again.'
        : 'Asleep. Its body needs rest, so it can’t wake up yet.'
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
  if (a.voice > 0 && a.saidT === tick) t += a.voice === 3 ? ' And it says “' + a.word + '”.' : ' And it calls out “' + a.word + '”.';
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
  if (a.heat > 0.15) f.push(a.heat > 0.6 ? 'overheating' : 'too hot');
  if (a.grief > 0.2) f.push('distressed since finding ' + (a.lost && a.lost.name ? a.lost.name + '’s' : 'a') + ' body');
  else if ((a.miss || 0) > 0.2) f.push('missing someone it is close to');
  if (a.rage > 0.3) f.push('angry');
  if (a.play > 0.3) f.push('playful');
  if (a.bored > 0.6) f.push('bored');
  if (a.hp < 60) f.push('hurt');
  if (a.fear > 0.25) f.push('afraid');
  if (a.metAny && a.lo > 0.25) f.push('lonely');
  if (a.pr > 0.5) f.push('protective of its young');
  if (a.lu > 0.5) f.push('longing for a partner');
  if (Math.min(1, a.g.c * S.cur) > 0.5) f.push('curious');
  const content =
    a.e > 70 &&
    a.w > 70 &&
    a.painA < 0.1 &&
    a.cold < 0.1 &&
    a.heat < 0.1 &&
    a.lo < 0.2 &&
    a.fear < 0.1 &&
    a.grief < 0.2 &&
    (a.miss || 0) < 0.2;
  if (content && !a.asleep) f.unshift('content');
  return f.length ? f.join(', ') : 'calm';
}
// "More" sections keep their open/closed state between refreshes of the panel
const MORE = { think: false, doing: false };
const more = (key, html) =>
  html ? '<details class="more" data-k="' + key + '"' + (MORE[key] ? ' open' : '') + '><summary>More</summary>' + html + '</details>' : '';
function thinkHTML(a, S) {
  // what matters at a glance: what it is thinking, what it feels, what it has learned
  let o = '<b>' + thoughtText(a) + '</b>';
  o += translateHTML(a);
  o += '<br><br>Feels: ' + feelingsText(a, S);
  o += '<br>Has learned: ' + (a.les.length ? a.les.join('; ') : 'nothing yet');
  // the rest, one tap away
  let d = '';
  if (a.mind && !a.mind.forced)
    d +=
      '<br>Also considered: ' +
      a.mind.opts
        .filter((q) => q[0] !== actName(a, a.mind.act))
        .slice(0, 2)
        .map((q) => ING[q[0]] || q[0].replace(/^go /, 'heading ').replace(/^call /, 'calling '))
        .join(' or ');
  // the dopamine-like signal and the mood chemicals, straight from its learning
  if (a.da > 0.3) d += '<br>Dopamine: a burst — that went better than it expected';
  else if (a.da < -0.3) d += '<br>Dopamine: a dip — that went worse than it expected';
  if (a.mod > 1.05 || a.mod < 0.95)
    d +=
      '<br>Learning ' +
      (a.mod > 1 ? 'faster now' : 'slower now') +
      ' (' +
      [
        a.da < 0 && a.fear > 0.1 ? 'fear makes the bad moment stick' : '',
        tick - (a.novel ?? -9) < 2 ? 'something new' : '',
        a.stress > 0.5 ? 'worn down by long stress' : '',
      ]
        .filter(Boolean)
        .join(', ') +
      ')';
  const ex = a.mind ? a.mind.V : 0;
  d += '<br>Expects things to ' + (ex > 0.3 ? 'get better' : ex < -0.3 ? 'get worse' : 'stay about the same');
  const mem = [
    a.mw ? 'water to the ' + dirTo(a, a.mw) : '',
    a.mf ? 'food to the ' + dirTo(a, a.mf) : '',
  ].filter(Boolean);
  d += '<br>Remembers: ' + (mem.length ? mem.join(', ') : 'nothing useful yet');
  return o + more('think', d);
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
  let o = '<b>' + doingText(a) + '</b>',
    d = ''; // the less important details, shown under "More"
  d +=
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
  d += '<br>' + weatherText(idx(a.x, a.y));
  o += '<br><br>' + (a.sex ? 'Female' : 'Male') + ' ' + stage + ', generation ' + a.gen;
  o += '<br>Energy ' + a.e.toFixed(0) + ' · water ' + a.w.toFixed(0) + ' · health ' + a.hp.toFixed(0);
  if (a.sp === 0) o += '<br>In its hand: ' + HAND[a.hand] + (a.nuts ? ' · nuts cracked: ' + a.nuts : '') + ' · swimming: ' + ((a.swim || 0) < 0.1 ? 'cannot swim' : Math.round(100 * a.swim) + '%');
  if (a.sp === 0 && (a.fh || a.fsk > 0.005))
    o +=
      '<br>Fire: handled ' +
      (a.fh || 0) +
      ' times · fire-making skill ' +
      Math.round(100 * (a.fsk || 0)) +
      '%' +
      (a.made ? ' · has made fire ' + a.made + ' times' : '') +
      (a.fTeach ? ' · watched ' + a.fTeach : '');
  if (a.preg) {
    const left = (a.preg.due - tick) / DAY,
      along = 1 - (a.preg.due - tick) / Math.max(1, a.S.gest);
    o +=
      '<br>Pregnant' +
      (a.preg.young.length > 1 ? ' with ' + a.preg.young.length : '') +
      ': ' +
      Math.round(100 * along) +
      '% of the way, due in about ' +
      (left < 1 ? Math.max(1, Math.round(left * 24)) + ' hours' : left.toFixed(1) + ' days') +
      (along > 0.6 ? ' · heavier now: slower to walk and much slower to run' : '');
  }
  if (a.sp === 0) o += '<br>' + learnerText(a);
  o += '<br>Nearby: ' + (around.length ? around.join(', ') : 'no one in sight');
  o += '<br>' + seesText(a);
  if (a.sp === 0) {
    const q = iqTable().get(a);
    if (q)
      d +=
        '<br>IQ ' +
        q.iq +
        ' — on a test of everyday problems put to its own brain it chose well ' +
        Math.round(100 * q.raw) +
        '% of the time, compared with others its age';
  }
  if (a.per) {
    // how well it has learned to recognise things by sight
    const NM = {
        0: 'fresh water',
        1: 'food',
        3: 'plant-eaters',
        4: 'people',
        5: 'hunters',
        7: 'family',
        9: 'red berries',
        10: 'the sea',
        14: 'nuts',
        15: 'fire',
      },
      cap = clamp(0.3 + (0.7 * a.age) / (0.5 * TY), 0, 1),
      sk = Object.keys(NM).map((c) => [NM[c], Math.min(a.per[c], cap)]),
      good = sk.filter((q) => q[1] >= 0.7).map((q) => q[0]),
      poor = sk.filter((q) => q[1] < 0.5).map((q) => q[0]);
    d +=
      '<br>Recognises well: ' +
      (good.length ? good.join(', ') : 'nothing yet') +
      (poor.length
        ? '. Still learning: ' + poor.join(', ') + ' (often misses them, or takes them for something else)'
        : '');
  }
  {
    const H = a.h.length,
      grown = a.nh,
      max = Math.max(a.S.nh, Math.round(H * (a.g.bs ?? 1))),
      L = layOf(a.g, H),
      cnt = (k) => [...Array(grown).keys()].filter((j) => L.kind[L.reg[j]] === k).length,
      fear = cnt(1),
      memo = cnt(2),
      words = cnt(3),
      extra = L.masks.length - 4;
    d +=
      '<br>Brain: ' +
      grown +
      ' thinking units' +
      (grown < max ? ' (still growing, up to ' + max + ')' : '') +
      ' — ' +
      fear +
      ' in its fear centre, ' +
      memo +
      ' in its memory centre, ' +
      words +
      ' for sound and words' +
      (extra > 0 ? ', across ' + extra + ' extra region' + (extra > 1 ? 's' : '') + ' evolved by copying' : '') +
      ', the rest general; ' +
      connections(a).toLocaleString() +
      ' connections' +
      (a.pruned ? ', ' + a.pruned.toLocaleString() + ' unused ones pruned' : '');
  }
  const fam = [];
  if (a.mom && !a.mom.dead && !a.mom.gone) fam.push('mother ' + (a.mom.name || ''));
  if (a.mate && !a.mate.dead && !a.mate.gone) fam.push('partner ' + (a.mate.name || ''));
  if (a.kid && !a.kid.dead && !a.kid.gone) fam.push('child ' + (a.kid.name || ''));
  if (fam.length) o += '<br>Family alive: ' + fam.map((s) => s.trim()).join(', ');
  return o + more('doing', d);
}
// What its eyes are taking in right now, read from its real senses (the same numbers its brain gets).
function seesText(a) {
  if (a.asleep) return 'Eyes shut: it only hears and smells what is right beside it';
  if (RETINA && a.sp === 0)
    return 'Sees only light and colour (raw vision): what any of it is, its brain must learn';
  const x = a.xi,
    look = a.sp === 3 || a.act === A_STAY,
    want = [
      [1, 'food'],
      [0, 'water'],
      [4, 'a person'],
      [3, 'a plant-eater'],
      [5, 'a hunter'],
      [7, 'family'],
      [8, 'fish'],
      [9, 'red berries'],
      [14, 'nuts'],
      [13, 'stones or sticks'],
      [15, 'fire'],
    ],
    seen = [];
  for (const [c, n] of want) {
    let best = 0,
      dir = -1;
    for (let s = 0; s < 8; s++)
      if (x[s * NCH + c] > best) {
        best = x[s * NCH + c];
        dir = s;
      }
    if (best > 0.05) seen.push(n + ' to the ' + CP[dir]);
  }
  const fov = a.S.fov >= 360 || look ? 'all around' : 'about ' + a.S.fov + '° around, facing ' + CP[a.hd];
  return (
    'Sees ' +
    fov +
    (a.S.col < 3 && a.sp !== 3 ? ' (red and green look alike to it)' : '') +
    ': ' +
    (seen.length ? seen.slice(0, 4).join(', ') : 'nothing it cares about')
  );
}
function weatherText(i) {
  const sky = snowing(i)
      ? 'Snowing'
      : stormy(i)
        ? 'Thunderstorm'
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
    : typeof carried === 'function' && carried(a)
      ? 'Riding on its mother' + (m && m.act < 8 ? ' (it wants to go ' + CP[m.act] + ')' : '')
    : a.trap > 0
      ? 'Stuck in a pit, climbing out'
      : m
        ? doingWord(a, m.act).replace(/^./, (c) => c.toUpperCase())
        : 'Looking around';
  const i = idx(a.x, a.y);
  const call =
    (a.voice > 0 && a.saidT === tick ? (a.voice === 3 ? ', saying “' : ', calling “') + a.word + '”' : '') +
    (a.ptT !== undefined && tick - a.ptT <= 1 && a.pt >= 0 ? ', pointing ' + CP[a.pt] : '');
  return (
    now +
    call +
    (a.up ? ', up a tree' : '') +
    ', ' +
    placeOf(a) +
    (snowing(i) ? ', in the snow' : raining(i) ? (cover(i) >= 0.4 ? ', in the rain, sheltered by the trees' : ', in the rain, getting wet') : '')
  );
}
let tipTab = 'think';
function updateTip() {
  const tip = $('tip');
  if (!sel || sel.gone || GL.eye || !$('v-world').offsetParent) {
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
function drawRivers(g, v, colour, width = 0.32) {
  // Rivers: a square is 3 km across and a river only tens of metres wide, so a river square is land
  // with a channel running through it, joined to the next stretch of river, the lake or the sea.
  g.strokeStyle = colour || v('--water');
  g.lineCap = 'round';
  g.lineWidth = C * width;
  g.beginPath();
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (!river[i]) continue;
      // flow on to the lowest neighbouring water: a lake or the sea if there is one, else the river downhill
      let to = -1,
        tx = 0,
        ty = 0,
        lo = Infinity;
      for (const [dx, dy] of MV) {
        const Y = y + dy;
        if (Y < 0 || Y >= H) continue;
        const j = idx(x + dx, Y);
        if (!water[j]) continue;
        const h = river[j] ? alt[j] : -99;
        if (h < lo) {
          lo = h;
          to = j;
          tx = x + dx;
          ty = Y;
        }
      }
      g.moveTo(x * C + C / 2, y * C + C / 2);
      if (to >= 0) g.lineTo(tx * C + C / 2, ty * C + C / 2);
      else g.lineTo(x * C + C / 2 + 0.01, y * C + C / 2);
    }
  g.stroke();
}
function drawTerrain(g, v, relief = true) {
  g.fillStyle = v('--dirt');
  g.fillRect(0, 0, W * C, H * C);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = idx(x, y),
        t = ter[i];
      if (water[i] && !river[i]) {
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
        g.fillRect(x * C, y * C, C, C);
      } else if (cave[i]) {
        g.fillStyle = v('--rock');
        g.fillRect(x * C, y * C, C, C);
        g.fillStyle = '#120d0a';
        g.beginPath();
        g.arc(x * C + C / 2, y * C + C * 0.7, C * 0.38, Math.PI, 0);
        g.lineTo(x * C + C * 0.88, y * C + C * 0.9);
        g.lineTo(x * C + C * 0.12, y * C + C * 0.9);
        g.fill();
      } else if (pit[i]) {
        g.fillStyle = '#1b1410';
        g.beginPath();
        g.arc(x * C + C / 2, y * C + C / 2, C / 2 - 1, 0, 7);
        g.fill();
      } else if (t !== 1 && food[i] > 0.05) {
        g.globalAlpha = Math.min(0.85, food[i]);
        g.fillStyle = v('--plant');
        g.fillRect(x * C, y * C, C, C);
        // richer soil (where something rotted, or herds left dung): a deeper green
        if (soil[i] > 1.1) {
          g.globalAlpha = Math.min(0.5, (soil[i] - 1) * 0.6);
          g.fillStyle = '#1f5a1c';
          g.fillRect(x * C, y * C, C, C);
        }
        g.globalAlpha = 1;
        if (poison[i]) {
          g.fillStyle = '#c0263d';
          g.fillRect(x * C + 2, y * C + 2, 3, 3);
          g.fillRect(x * C + 6, y * C + 5, 3, 3);
        }
      }
    }
  // freshly burnt ground: black ash, slowly greening again
  for (let i = 0; i < W * H; i++)
    if (BURNT[i] > 0.05 && !water[i]) {
      g.fillStyle = 'rgba(70,64,58,' + (0.6 * BURNT[i]).toFixed(2) + ')'; // grey ash
      g.fillRect((i % W) * C, ((i / W) | 0) * C, C, C);
    }
  drawRivers(g, v);
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
        // a puddle: a soft round pool, not a square
        g.globalAlpha = 0.7;
        g.fillStyle = v('--water');
        g.beginPath();
        g.ellipse(x * C + C * (0.35 + 0.3 * ((i * 7) % 5) / 5), y * C + C * 0.55, C * 0.3, C * 0.2, 0, 0, 7);
        g.fill();
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
// Rain falling and lightning flashing, drawn every frame over the map or the globe. P(x, y) gives where
// a cell is on screen and how big it looks, or null if it is out of sight.
function drawWeatherFx(g, P, rainToo = true) {
  if (!showSky) return;
  if (rainToo)
    for (let i = 0; i < W * H; i++) {
      if (!(RAIN[i] > 0.002)) continue;
      const Q = P(i % W, (i / W) | 0);
      if (!Q || Q[2] < 6) continue;
      const k = Q[2],
        snow = cellT(i) < 0,
        t = performance.now() / 400 + i;
      g.globalAlpha = clamp(RAIN[i] * 60, 0.3, 0.8);
      g.strokeStyle = g.fillStyle = snow ? '#ffffff' : '#9cc3ee';
      g.lineWidth = Math.max(1, k * 0.04);
      g.beginPath();
      for (let j = 0; j < 3; j++) {
        const fx = (((j * 0.37 + i * 0.13) % 1) - 0.5) * k,
          fy = ((((t + j * 0.33) % 1) - 0.5) * k) | 0;
        if (snow) g.fillRect(Q[0] + fx, Q[1] + fy, k * 0.06, k * 0.06);
        else {
          g.moveTo(Q[0] + fx, Q[1] + fy);
          g.lineTo(Q[0] + fx - k * 0.05, Q[1] + fy + k * 0.18);
        }
      }
      g.stroke();
    }
  // Lightning is a flash: it shows for about a third of a second of real time after it first appears, so it
  // does not hang on the screen while the world is paused or running slowly.
  const nowMs = performance.now();
  for (const b of STRIKES) {
    if (tick - b.t > 1) continue;
    if (b.seen === undefined) b.seen = nowMs;
    const age = nowMs - b.seen;
    if (age > 320) continue;
    const Q = P(b.x, b.y);
    if (!Q) continue;
    const k = Math.max(8, Q[2]);
    g.globalAlpha = age < 120 ? 0.95 : 0.4;
    g.strokeStyle = '#fff7c2';
    g.lineWidth = Math.max(1.5, k * 0.06);
    g.beginPath();
    let x = Q[0],
      y = Q[1] - k * 1.6;
    g.moveTo(x, y);
    for (let j = 0; j < 4; j++) {
      x += (j % 2 ? 1 : -1) * k * 0.15;
      y += k * 0.4;
      g.lineTo(x, y);
    }
    g.stroke();
  }
  g.globalAlpha = 1;
}
function drawSky(g, streaks = true) {
  if (!showSky) return;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x,
        c = CLD[i];
      if (c > 0.03) {
        g.globalAlpha = clamp(c * 3, 0, 0.6);
        // thunderclouds are dark and towering
        g.fillStyle = stormy(i) ? '#59606b' : c > 0.2 ? '#c9d0d8' : '#ffffff';
        if (stormy(i)) g.globalAlpha = 0.7;
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
// What is in a person's hand, drawn at the hand: a stone, a stick or a sharp-edged flake.
function drawHeld(g, kind, hx, hy, h, lw) {
  if (kind === 1) {
    g.fillStyle = '#8f8e86';
    g.beginPath();
    g.ellipse(hx, hy, h * 0.075, h * 0.06, 0.3, 0, 7);
    g.fill();
  } else if (kind === 2) {
    g.strokeStyle = '#7a5232';
    g.lineWidth = Math.max(1, lw * 0.9);
    g.beginPath();
    g.moveTo(hx - h * 0.05, hy + h * 0.08);
    g.lineTo(hx + h * 0.1, hy - h * 0.38);
    g.stroke();
  } else if (kind === 4) {
    // a burning stick: the wood, and a flickering flame at its end
    g.strokeStyle = '#5a3a22';
    g.lineWidth = Math.max(1, lw * 0.9);
    g.beginPath();
    g.moveTo(hx - h * 0.05, hy + h * 0.08);
    g.lineTo(hx + h * 0.1, hy - h * 0.38);
    g.stroke();
    const fl = 1 + 0.25 * Math.sin(performance.now() / 70);
    g.fillStyle = '#ffb02e';
    g.beginPath();
    g.ellipse(hx + h * 0.11, hy - h * 0.45, h * 0.06 * fl, h * 0.11 * fl, 0, 0, 7);
    g.fill();
    g.fillStyle = '#fff1a8';
    g.beginPath();
    g.ellipse(hx + h * 0.11, hy - h * 0.43, h * 0.03, h * 0.06 * fl, 0, 0, 7);
    g.fill();
  } else if (kind === 5) {
    g.fillStyle = '#c9a43a'; // pyrite: brassy, shiny
    g.beginPath();
    g.ellipse(hx, hy, h * 0.07, h * 0.055, -0.3, 0, 7);
    g.fill();
    g.fillStyle = '#f3e3a0';
    g.fillRect(hx - h * 0.02, hy - h * 0.03, h * 0.025, h * 0.025);
  } else if (kind === 3) {
    g.fillStyle = '#d4d8d6';
    g.beginPath();
    g.moveTo(hx - h * 0.05, hy + h * 0.04);
    g.lineTo(hx + h * 0.07, hy - h * 0.12);
    g.lineTo(hx + h * 0.06, hy + h * 0.05);
    g.closePath();
    g.fill();
  }
}
// Fire: flames over every burning square, sized by how fiercely it burns, and smoke drifting off
// downwind. P(x, y) gives where a place is on screen and how big a square looks.
function drawFire(g, P) {
  if (!BURNING.length) return;
  const t = performance.now() / 1000;
  for (const i of BURNING) {
    const f = FIRE[i];
    if (!f) continue;
    const x = i % W,
      y = (i / W) | 0,
      Q = P(x, y);
    if (!Q) continue;
    // flames and smoke are drawn at a size you can see, but never bigger than a tree up close
    const k = clamp(Q[2], 4, 160),
      [u, v] = windAt(y);
    // smoke: a few grey puffs rising and drifting with the wind
    for (let s = 0; s < 3; s++) {
      const age = (t * 0.5 + s / 3 + i * 0.07) % 1,
        S = P(x + u * 8 * age, y + v * 8 * age);
      if (!S) continue;
      g.globalAlpha = 0.22 * (1 - age) * Math.min(1, f * 2);
      g.fillStyle = '#6f6a66';
      g.beginPath();
      g.arc(S[0], S[1] - k * (0.3 + age), Math.min(50, k * (0.12 + 0.25 * age)), 0, 7);
      g.fill();
    }
    // flames: a few flickering tongues of fire scattered over the square
    const n = 2 + Math.round(f * 4);
    for (let s = 0; s < n; s++) {
      const a = ((i * 37 + s * 101) % 100) / 100 - 0.5,
        b = ((i * 61 + s * 53) % 100) / 100 - 0.5,
        F = P(x + a * 0.8, y + b * 0.8);
      if (!F) continue;
      const fl = 0.75 + 0.35 * Math.sin(t * 9 + s * 2 + i),
        hgt = k * (0.12 + 0.25 * f) * fl,
        wid = hgt * 0.45;
      g.globalAlpha = 0.9;
      g.fillStyle = '#e8541c';
      g.beginPath();
      g.moveTo(F[0] - wid, F[1]);
      g.quadraticCurveTo(F[0] - wid * 0.3, F[1] - hgt * 0.6, F[0], F[1] - hgt);
      g.quadraticCurveTo(F[0] + wid * 0.3, F[1] - hgt * 0.6, F[0] + wid, F[1]);
      g.fill();
      g.fillStyle = '#ffc93c';
      g.beginPath();
      g.moveTo(F[0] - wid * 0.5, F[1]);
      g.quadraticCurveTo(F[0], F[1] - hgt * 0.5, F[0] + wid * 0.5, F[1]);
      g.fill();
    }
  }
  g.globalAlpha = 1;
}
// What people say, drawn as a small speech mark over their heads for a moment after they call.
// P(a) gives [x, y of the feet, how tall it looks] on the canvas, or null.
// Sound you can see: each call spreads out as a faint ring at the real speed of sound (about 343 m/s,
// faster in warm air), fading as it weakens, out to about where it can no longer be heard. At real-time
// speed a howl takes half a minute to cross 10 km; sped up, a ring flashes out in a blink. Animals'
// calls get a small word too (howl, roar, snort).
const RING_KM = { voice: 2.5, 0: 9, 1: 8, 2: 1 };
function drawSounds(g, P) {
  const now = worldT();
  for (const c of [...HEARD, ...CALLS]) {
    if (c.t === undefined) continue;
    const Q = P(c.x, c.y);
    if (!Q) continue;
    const T = cellT(idx(c.x, c.y)),
      secs = (now - c.t) * STEP_S,
      km = ((331.3 + 0.606 * T) * secs) / 1000,
      maxKm = c.an !== undefined ? RING_KM[c.an] : RING_KM.voice;
    if (km > maxKm || km <= 0) continue;
    const r = (km / 3) * Q[2],
      f = 1 - km / maxKm;
    g.globalAlpha = 0.45 * f;
    g.strokeStyle = c.an === undefined ? '#fff6d8' : c.an === 2 ? '#ffe2a8' : '#f4f0ff';
    g.lineWidth = Math.max(1, Q[2] * 0.04);
    g.beginPath();
    g.arc(Q[0], Q[1], r, 0, 7);
    g.stroke();
  }
  g.globalAlpha = 1;
  // a word for the animal's call, while it is calling
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  for (const c of CALLS.concat(HEARD)) {
    if (c.an === undefined || !c.a || c.a.dead) continue;
    const Q = P(c.a.rx ?? c.x, c.a.ry ?? c.y);
    if (!Q) continue;
    const fs = clamp(Q[2] * 0.6, 9, 13);
    g.font = 'italic 600 ' + fs + 'px system-ui, sans-serif';
    g.globalAlpha = c.t === tick ? 0.9 : 0.45;
    g.fillStyle = '#fffdf6';
    g.strokeStyle = 'rgba(0,0,0,.55)';
    g.lineWidth = 3;
    const w = ['awoooo', 'ROAR', 'snort!'][c.an];
    g.strokeText(w, Q[0], Q[1] - Q[2] - fs);
    g.fillText(w, Q[0], Q[1] - Q[2] - fs);
  }
  g.globalAlpha = 1;
}
function drawTalk(g, P, scale = 1) {
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  for (const a of ag) {
    if (a.sp !== 0 || a.saidT === undefined || tick - a.saidT > 1 || a.dead) continue;
    const Q = P(a);
    if (!Q) continue;
    const t = (a.word || SAYN[a.said]) + (a.said === 1 ? '!' : a.said === 0 ? '…' : ''),
      fs = 11 * scale,
      x = Q[0],
      y = Q[1] - Q[2] - 9 * scale;
    g.font = '600 ' + fs + 'px system-ui, sans-serif';
    const w = g.measureText(t).width + 10 * scale;
    g.globalAlpha = tick === a.saidT ? 0.95 : 0.55;
    g.fillStyle = '#fffdf6';
    g.strokeStyle = 'rgba(0,0,0,.25)';
    g.lineWidth = scale;
    g.beginPath();
    g.roundRect(x - w / 2, y - fs * 0.8, w, fs * 1.6, fs * 0.6);
    g.moveTo(x - 3 * scale, y + fs * 0.8);
    g.lineTo(x, y + fs * 0.8 + 5 * scale);
    g.lineTo(x + 3 * scale, y + fs * 0.8);
    g.fill();
    g.stroke();
    g.fillStyle = '#2b2620';
    g.fillText(t, x, y);
  }
  g.globalAlpha = 1;
}
// Hearing them: each sound is spoken with a small synthesized voice — a consonant, then a vowel
// shaped by the throat (two formants) — higher for women and higher still for children. The cry and
// the scream are made the way babies and frightened people make them.
let listen = false,
  AC = null,
  lastVoice = 0;
// The voice played back from the mouth that made it: a buzzing source (the vocal folds) shaped by the
// vowel's two resonances (F1, F2 — the same numbers the listeners hear), with a burst of breath for a
// p, t or k, a short voiced start for b, d or g. The cry and the scream are inborn sounds.
function speak(a, k, w) {
  if (!listen) return;
  const now = performance.now();
  if (now - lastVoice < 120) return;
  lastVoice = now;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const young = a.age < a.S.mat,
      f0 = young ? 330 : a.sex ? 210 : 125,
      syl = w || [[0, 1, k === 0 ? 2 : 2, 1, 0]],
      sd = k === 0 ? 0.7 : k === 1 ? 0.5 : 0.2; // seconds per syllable
    let t0 = AC.currentTime + 0.02;
    for (const [o, v, h, b, r] of syl) {
      const F1v = [300, 500, 750][h],
        F2v = [2300, 1500, 900][b] - 250 * r,
        out = AC.createGain(),
        vs = o && !v ? 0.06 : 0; // a voiceless consonant: breath first, then the voice
      out.gain.setValueAtTime(0, t0);
      out.gain.linearRampToValueAtTime(0.25, t0 + vs + 0.03);
      out.gain.setValueAtTime(0.25, t0 + sd * 0.75);
      out.gain.linearRampToValueAtTime(0, t0 + sd);
      out.connect(AC.destination);
      const src = AC.createOscillator();
      src.type = 'sawtooth';
      const p = k === 1 ? f0 * 3.2 : k === 0 ? f0 * 1.3 : f0;
      src.frequency.setValueAtTime(p, t0);
      src.frequency.linearRampToValueAtTime(p * (k === 0 ? 0.8 : 0.92), t0 + sd);
      for (const [f, q] of [
        [F1v, 6],
        [F2v, 9],
      ]) {
        const bp = AC.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = f;
        bp.Q.value = q;
        src.connect(bp).connect(out);
      }
      src.start(t0 + vs);
      src.stop(t0 + sd + 0.03);
      if (o) {
        // the release of the closure: a burst of noise, lowest for the lips, highest for the tongue tip
        const n = AC.createBuffer(1, AC.sampleRate * 0.05, AC.sampleRate),
          d = n.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        const ns = AC.createBufferSource(),
          bp = AC.createBiquadFilter(),
          ng = AC.createGain();
        ns.buffer = n;
        bp.type = 'bandpass';
        bp.frequency.value = [0, 900, 4000, 2000][o];
        ng.gain.value = v ? 0.12 : 0.3;
        ns.connect(bp).connect(ng).connect(AC.destination);
        ns.start(t0);
        ns.stop(t0 + (v ? 0.02 : 0.05));
      }
      t0 += sd;
    }
  } catch (e) {}
}
// the world tells the page whenever someone calls; we hear the one we are watching and those near it
function onCall(a, k, w) {
  if (!listen || !sel || sel.gone) return;
  if (a === sel || Math.hypot(dxw(a.x - sel.x), a.y - sel.y) <= 1) speak(a, k, w);
}
// Things lying on the ground, drawn when you are close enough to see them: stones, fallen sticks,
// sharp flakes and nuts, scattered about each square. P(x, y) gives where a place is on screen.
function drawGroundItems(g, P) {
  for (let i = 0; i < W * H; i++) {
    const nn = nut[i] > 0.05 ? Math.min(6, Math.ceil(nut[i] * 8)) : 0;
    if (!lying(i) && !nn) continue;
    const x = i % W,
      y = (i / W) | 0,
      Q = P(x, y);
    if (!Q || Q[2] < 40) continue;
    const r = clamp(Q[2] * 0.012, 1.5, 7),
      spot = (n) => {
        // the same scattered places every time, a little way from the middle of the square
        const a = (i * 7919 + n * 104729) % 1000,
          b = (i * 6271 + n * 15485863) % 1000;
        return P(x + (a / 1000 - 0.5) * 0.7, y + (b / 1000 - 0.5) * 0.7);
      };
    let n = 0;
    for (let k = 0; k < stone[i] + flake[i]; k++) {
      const S = spot(n++);
      if (!S) continue;
      g.fillStyle = k < stone[i] ? '#8f8e86' : '#d4d8d6';
      g.beginPath();
      g.ellipse(S[0], S[1], r * 1.3, r * 0.8, 0, 0, 7);
      g.fill();
    }
    for (let k = 0; k < pyrite[i]; k++) {
      const S = spot(n++);
      if (!S) continue;
      g.fillStyle = '#c9a43a';
      g.beginPath();
      g.ellipse(S[0], S[1], r * 1.1, r * 0.8, 0, 0, 7);
      g.fill();
    }
    g.strokeStyle = '#6e4a2c';
    g.lineWidth = Math.max(1, r * 0.5);
    for (let k = 0; k < stick[i]; k++) {
      const S = spot(n++);
      if (!S) continue;
      g.beginPath();
      g.moveTo(S[0] - r * 3, S[1] + r * (k % 2 ? 0.8 : -0.8));
      g.lineTo(S[0] + r * 3, S[1] - r * (k % 2 ? 0.8 : -0.8));
      g.stroke();
    }
    g.fillStyle = '#7b5a35';
    for (let k = 0; k < nn; k++) {
      const S = spot(n++);
      if (!S) continue;
      g.beginPath();
      g.arc(S[0], S[1], r * 0.6, 0, 7);
      g.fill();
    }
  }
}
// Carrion birds, seen from far off as people really found carcasses: circling high over a body, or
// waiting on the ground nearby while a hunter or a person is at it. Vultures (big, brown) where it is
// warm; ravens (small, black) in cold lands.
// Each carcass's birds have a story on screen: they come gliding in from far off, spiralling down,
// feed on the ground at the carcass (or wait nearby while a hunter or a person is at it), and when
// the meat is gone or night falls they take off and fly away the way they came. (They are still
// what birds do, not creatures with homes and minds of their own.)
const BIRDS = new WeakMap(),
  FLY = 6; // world steps (an hour and a half) to fly in or away
function drawCarrion(g, P) {
  const now = worldT(),
    t = performance.now() / 1000;
  for (const b of BODIES) {
    const feeding = b.birdT && tick - b.birdT < 6 && b.meat > 0.03,
      waiting = b.waitT && tick - b.waitT < 6 && b.meat > 0.03;
    let st = BIRDS.get(b);
    if (feeding || waiting) {
      if (!st || st.leave) {
        // they arrive from a direction of their own, from about 25 squares away
        const a = ((b.x * 73 + b.y * 151 + b.t) % 360) * (Math.PI / 180);
        st = { t0: now, dx: Math.cos(a), dy: Math.sin(a) * 0.6, leave: 0 };
        BIRDS.set(b, st);
      }
    } else if (st && !st.leave) st.leave = now;
    if (!st) continue;
    const Q0 = P(b.x, b.y);
    if (!Q0) continue;
    const u = clamp(Q0[2] * 0.06, 2.5, 9) * (b.vul ? 1 : 0.65); // a bird's half-wingspan on screen
    g.save();
    g.strokeStyle = g.fillStyle = b.vul ? '#3b2f25' : '#141414';
    g.lineWidth = Math.max(1, u * 0.22);
    g.lineCap = 'round';
    const wing = (x, y, flap) => {
      const f = u * (0.3 + 0.25 * flap);
      g.beginPath();
      g.moveTo(x - u, y - f);
      g.quadraticCurveTo(x - u * 0.4, y - u * 0.55, x, y);
      g.quadraticCurveTo(x + u * 0.4, y - u * 0.55, x + u, y - f);
      g.stroke();
    };
    const sitting = (x, y) => {
      g.beginPath();
      g.ellipse(x, y, u * 0.35, u * 0.5, 0, 0, 7); // hunched body
      g.fill();
      g.beginPath();
      g.arc(x + u * 0.15, y - u * 0.55, u * 0.15, 0, 7); // head
      g.fill();
    };
    const N = 3;
    let gone = !!st.leave;
    for (let k = 0; k < N; k++) {
      // each bird a little behind the one before
      const lag = k * 1.2,
        inF = clamp((now - st.t0 - lag) / FLY, 0, 1), // 0 far away … 1 arrived
        outF = st.leave ? clamp((now - st.leave - lag * 0.5) / FLY, 0, 1) : 0, // 0 here … 1 gone
        far = Math.max(1 - inF, outF) * 25, // how far out, in squares
        high = Math.max(1 - inF, outF); // how high, 0 on the ground
      if (outF < 1) gone = false;
      if (inF <= 0 || outF >= 1) continue;
      const ang = t * 0.5 + (k * 2 * Math.PI) / N,
        ring = 0.6 + 0.8 * high, // they spiral down as they come in
        Q = P(b.x + st.dx * far + Math.cos(ang) * ring, b.y + st.dy * far + Math.sin(ang) * ring * 0.5);
      if (!Q) continue;
      if (high > 0.02) wing(Q[0], Q[1] - u * (2 + 14 * high), Math.sin(t * 6 + k));
      else {
        // on the ground: at the carcass if they may feed, a little way off if they must wait
        const r = waiting && !feeding ? u * 3 : u * 1.4,
          a = (k * 2 * Math.PI) / N + 0.4;
        sitting(Q0[0] + Math.cos(a) * r, Q0[1] + Math.sin(a) * r * 0.5 + (feeding ? Math.sin(t * 3 + k) * u * 0.15 : 0));
      }
    }
    g.restore();
    if (gone) BIRDS.delete(b);
  }
}
// the dead: a still figure on the ground that darkens and shrinks, then bare bones
function drawBodies(g, P) {
  for (const b of BODIES) {
    const Q = P(b.x, b.y);
    if (!Q || Q[2] < 3) continue;
    const age = tick - b.t,
      bones = clamp((age - 3 * 96) / (BODY_BONES - 3 * 96), 0, 1),
      r = clamp(Q[2] * 0.02 * (b.sp === 0 ? 1 : 0.8 + 0.2 * b.size), 2.5, 12);
    g.save();
    g.translate(Q[0], Q[1]);
    if (bones < 1) {
      g.globalAlpha = 1 - 0.5 * bones;
      g.fillStyle = b.sp === 0 ? '#c99a7a' : ['', '#8a6a46', '#9a8a78', '#4a3a2a', '#707478', '#b08a3c', '#5a3e2a'][b.sp] || '#777';
      g.beginPath();
      g.ellipse(0, 0, r * 2, r * 0.7 * (1 - 0.4 * bones), 0, 0, 7);
      g.fill();
      g.beginPath();
      g.arc(-r * 2, 0, r * 0.6, 0, 7);
      g.fill();
    }
    g.globalAlpha = 0.4 + 0.6 * bones;
    g.strokeStyle = '#e8e4d6';
    g.lineWidth = Math.max(1, r * 0.25);
    for (let k = 0; k < 4; k++) {
      g.beginPath();
      g.moveTo(-r * 1.6 + k * r, -r * 0.3);
      g.lineTo(-r * 1.6 + k * r, r * 0.3);
      g.stroke();
    }
    g.globalAlpha = 1;
    const t = performance.now() / 1000;
    // flies buzzing over a body that is rotting in the warmth
    if (b.flyT && tick - b.flyT < 8 && b.meat > 0.03) {
      g.fillStyle = '#1b1b1b';
      for (let k = 0; k < 7; k++) {
        const a = t * (2 + k * 0.7) + k * 2.1;
        g.fillRect(Math.cos(a) * r * (1.2 + (k % 3) * 0.5), -r * 0.8 + Math.sin(a * 1.3) * r * 0.7, Math.max(1, r * 0.12), Math.max(1, r * 0.12));
      }
    }
    g.restore();
  }
}
// Looking through a person's eyes: its own arms and hands at the bottom of the view, doing what it
// is doing — swinging with its walk, reaching down to pick something up, lifting food to its mouth,
// bringing a stone down hard — and holding whatever it holds.
function drawEyeHands(g, a, w, h) {
  if (a.sp !== 0 || a.asleep) return;
  const s = h / 700,
    skin = skinCol(skinOf(a)),
    bob = a.moving ? Math.sin(a.ph || 0) * 14 * s : 0,
    act = a.act,
    sw = bodySwing(a);
  let rx = w * 0.6,
    ry = h * 0.84 - bob;
  if (act === A_STRIKE) {
    rx = w * 0.53;
    ry = h * (0.45 + 0.42 * ((1 - sw) / 2));
  } else if (act === A_TAKE || act === A_DROP || act === A_DRINK) {
    rx = w * 0.5;
    ry = h * 0.97;
  } else if (act === A_EAT) {
    rx = w * 0.47;
    ry = h * 0.93;
  } else if (act === A_GIVE) {
    rx = w * 0.55;
    ry = h * 0.62;
  }
  const arm = (x0, y0, x1, y1) => {
    g.strokeStyle = skin;
    g.lineCap = 'round';
    g.lineWidth = 64 * s;
    g.beginPath();
    g.moveTo(x0, y0);
    g.lineTo(x1, y1);
    g.stroke();
    g.fillStyle = skin;
    g.beginPath();
    g.ellipse(x1, y1, 40 * s, 34 * s, 0, 0, 7);
    g.fill();
  };
  g.globalAlpha = isNightAt(a.x) ? 0.55 : 1;
  arm(w * 0.1, h + 40 * s, w * 0.27, h * 0.88 + bob);
  arm(w * 0.78, h + 40 * s, rx, ry);
  if (a.hand) drawHeld(g, a.hand, rx + 10 * s, ry - 30 * s, 320 * s, 26 * s);
  g.globalAlpha = 1;
}
// A person, seen from the front, in the pose of what they are doing: walking, bending down to pick
// something up or drink, a hand to the mouth when eating, an arm swinging when striking, an arm held
// out when sharing — with whatever they hold in their hand.
// Skin: early humans in warm, sunny lands were dark-skinned (dark pigment protects bare skin from strong
// sun once body hair was lost). Here each founder's shade varies a little around that, and children
// take after both parents with a small difference of their own — drawn only; it changes nothing in
// the world.
const SKIN_LIGHT = [241, 194, 125],
  SKIN_DARK = [74, 44, 28];
function skinOf(a, depth = 0) {
  if (a.skin !== undefined) return a.skin;
  if (depth > 50) return 0.75; // never loop forever on a broken family tree
  const hsh = ((a.id || 0) * 2654435761) % 1000 / 1000;
  const m = a.mom ? skinOf(a.mom, depth + 1) : null,
    d = a.dad ? skinOf(a.dad, depth + 1) : null;
  a.skin = clamp(m !== null ? ((d !== null ? (m + d) / 2 : m) + (hsh - 0.5) * 0.12) : 0.62 + hsh * 0.3, 0, 1);
  return a.skin;
}
const skinCol = (t, dk = 0) =>
  'rgb(' + SKIN_LIGHT.map((c, i) => Math.round((c + (SKIN_DARK[i] - c) * t) * (1 - dk))).join(',') + ')';
// A person, seen from the front, with human proportions: a head about an eighth of the height in an
// adult and much bigger in a child, shoulders and hips (broader shoulders in men, wider hips in women),
// arms and legs that bend at elbow and knee, hands and feet. Bare, as the first people were. In the
// pose of what they are doing: walking, bending down to pick something up or drink, a hand to the mouth
// when eating, an arm swinging when striking, an arm held out when sharing or pointing.
function drawPerson(g, a, X, Y, k, gr, col) {
  // Early hominins (the default world): small upright apes — a little shorter, covered in dark hair, a long
  // body on shorter legs, arms reaching to the knees, no waist, a heavy brow and a projecting lower face
  // (as australopith and early-Homo skeletons show). Modern people otherwise.
  const ape = typeof ERA !== 'undefined' && ERA === 'hominin',
    h = (5.5 + 6 * gr) * k * (ape ? 0.85 : 1), // full height
    tone = a.skv ?? skinOf(a),
    skin = ape ? '#4a3526' : skinCol(tone),
    shade = ape ? '#33241a' : skinCol(tone, 0.22),
    face = ape ? '#7a5a45' : null,
    hair = '#1e1612',
    act = a.asleep ? -1 : a.act,
    crouch = act === A_TAKE || act === A_DROP || act === A_DRINK || act === A_STRIKE ? 1 : 0,
    sw = act === A_STRIKE ? (a.swf ?? bodySwing(a)) : 0,
    fem = !!a.sex,
    adult = gr > 0.85;
  g.save();
  g.translate(X, a.asleep ? Y : Y - h * 0.35);
  if (a.asleep) g.rotate(-Math.PI / 2);
  const dn = crouch * h * 0.16,
    top = -h / 2 + dn,
    hr = h * (0.062 + 0.07 * (1 - gr)), // head radius: children have big heads
    hcy = top + hr * 1.1,
    neckY = top + hr * 2.15,
    sh = neckY + h * 0.035, // shoulders
    shW = h * (adult ? (fem ? 0.115 : 0.135) : 0.1),
    waist = sh + h * (ape ? 0.2 : 0.17),
    waW = ape ? shW * 0.95 : h * (fem && adult ? 0.068 : 0.078),
    hip = sh + h * (ape ? 0.33 : 0.27),
    hiW = h * (ape ? 0.1 : fem && adult ? 0.1 : 0.088),
    crotch = hip + h * 0.035,
    foot = h / 2,
    step = a.asleep || !a.moving || crouch ? 0 : Math.sin(a.ph || 0) * h * 0.14;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  const limb = (pts, w0, w1, c) => {
    // a limb as two tapered segments
    g.strokeStyle = c;
    for (let s = 0; s < pts.length - 1; s++) {
      g.lineWidth = Math.max(0.6, w0 + (w1 - w0) * (s / Math.max(1, pts.length - 2)));
      g.beginPath();
      g.moveTo(pts[s][0], pts[s][1]);
      g.lineTo(pts[s + 1][0], pts[s + 1][1]);
      g.stroke();
    }
  };
  // legs: thigh, knee, calf, foot
  const knee = crotch + (foot - crotch) * 0.5;
  for (const sd of [-1, 1]) {
    const hx = sd * h * 0.045,
      st = sd * step,
      kx = crouch ? sd * h * 0.15 : hx + st * 0.5 + sd * h * 0.005,
      ax = crouch ? sd * h * 0.09 : hx + st + sd * h * 0.01;
    limb([[hx, crotch - h * 0.03], [kx, knee], [ax, foot - h * 0.03]], h * 0.066, h * 0.05, sd < 0 ? shade : skin);
    g.fillStyle = sd < 0 ? shade : skin;
    g.beginPath();
    g.ellipse(ax + sd * h * 0.012, foot - h * 0.012, h * 0.035, h * 0.016, 0, 0, 7);
    g.fill();
  }
  // where the working (right) hand goes
  let rx = shW + h * 0.04 - step * 0.5,
    ry = ape ? knee - h * 0.02 : hip + h * 0.04;
  if (act === A_STRIKE) {
    rx = h * 0.17;
    ry = top - h * 0.1 + ((1 - sw) / 2) * (foot - top - h * 0.05);
  } else if (crouch) {
    rx = h * 0.14;
    ry = foot - h * 0.03;
  } else if (act === A_EAT) {
    rx = h * 0.03;
    ry = hcy + hr * 0.6;
  } else if (act === A_GIVE) {
    rx = h * 0.38;
    ry = sh + h * 0.08;
  } else if ((a.ptv ?? (a.ptT !== undefined && tick - a.ptT <= 1 && a.pt >= 0 ? a.pt : -1)) >= 0) {
    const d = a.ptv ?? a.pt,
      [mx, my] = MV[d];
    rx = h * (mx === 0 ? 0.3 : 0.45) * (mx < 0 ? -1 : 1) * (a.face === -1 ? -1 : 1);
    ry = sh + h * (0.0 + 0.08 * my);
  }
  // the resting (left) arm swings with walking, behind the body's edge
  const lhx = -shW - h * 0.035 + step * 0.5,
    lhy = crouch ? hip + h * 0.08 : ape ? knee - h * 0.02 : hip + h * 0.05;
  limb([[-shW + h * 0.03, sh + h * 0.02], [(-shW + lhx) / 2 - h * 0.015, (sh + lhy) / 2], [lhx, lhy]], h * 0.048, h * 0.04, shade);
  g.fillStyle = shade;
  g.beginPath();
  g.arc(lhx, lhy + h * 0.012, h * 0.024, 0, 7);
  g.fill();
  // the torso: shoulders, chest, waist, hips
  const grad = g.createLinearGradient(-shW, 0, shW, 0);
  grad.addColorStop(0, shade);
  grad.addColorStop(0.35, skin);
  grad.addColorStop(0.7, skin);
  grad.addColorStop(1, shade);
  g.fillStyle = grad;
  g.beginPath();
  g.moveTo(-h * 0.028, neckY - h * 0.005);
  g.lineTo(h * 0.028, neckY - h * 0.005);
  g.quadraticCurveTo(h * 0.05, sh - h * 0.005, shW, sh + h * 0.02);
  g.quadraticCurveTo(shW - h * 0.005, sh + h * 0.08, waW, waist);
  g.quadraticCurveTo(hiW + h * 0.01, hip - h * 0.02, hiW, hip);
  g.quadraticCurveTo(hiW * 0.6, crotch + h * 0.01, 0, crotch);
  g.quadraticCurveTo(-hiW * 0.6, crotch + h * 0.01, -hiW, hip);
  g.quadraticCurveTo(-hiW - h * 0.01, hip - h * 0.02, -waW, waist);
  g.quadraticCurveTo(-shW + h * 0.005, sh + h * 0.08, -shW, sh + h * 0.02);
  g.quadraticCurveTo(-h * 0.05, sh - h * 0.005, -h * 0.028, neckY - h * 0.005);
  g.closePath();
  g.fill();
  // a pregnant belly, rounder as the birth nears
  const pg = a.pgv ?? (a.preg ? clamp(1 - (a.preg.due - tick) / Math.max(1, a.S.gest), 0, 1) : 0);
  if (pg > 0.3) {
    const bw = h * (0.06 + 0.05 * pg);
    g.fillStyle = skin;
    g.beginPath();
    g.ellipse(0, waist + h * 0.03, bw, bw * 0.9, 0, 0, 7);
    g.fill();
    g.strokeStyle = 'rgba(0,0,0,0.18)';
    g.lineWidth = Math.max(0.4, h * 0.006);
    g.stroke();
  }
  // the working arm: upper arm, elbow, forearm, hand
  const ex = (shW + rx) / 2 + h * 0.03,
    ey = (sh + ry) / 2 + (act === A_STRIKE ? -h * 0.04 : h * 0.01);
  limb([[shW - h * 0.03, sh + h * 0.02], [ex, ey], [rx, ry]], h * 0.048, h * 0.04, skin);
  g.fillStyle = skin;
  g.beginPath();
  g.arc(rx, ry, h * 0.024, 0, 7);
  g.fill();
  if (a.hand) drawHeld(g, a.hand, rx, ry, h, Math.max(1, h * 0.04));
  // neck and head
  g.fillStyle = skin;
  g.fillRect(-h * 0.025, hcy + hr * 0.7, h * 0.05, neckY - hcy - hr * 0.6);
  g.beginPath();
  g.ellipse(0, hcy, hr * 0.84, hr * 1.06, 0, 0, 7);
  g.fill();
  // ears
  g.beginPath();
  g.ellipse(-hr * 0.84, hcy + hr * 0.05, hr * 0.13, hr * 0.22, 0, 0, 7);
  g.ellipse(hr * 0.84, hcy + hr * 0.05, hr * 0.13, hr * 0.22, 0, 0, 7);
  g.fill();
  if (ape) {
    // a lighter, bare face with a heavy brow and a jaw that juts forward
    g.fillStyle = face;
    g.beginPath();
    g.ellipse(0, hcy + hr * 0.2, hr * 0.6, hr * 0.62, 0, 0, 7);
    g.ellipse(0, hcy + hr * 0.55, hr * 0.5, hr * 0.36, 0, 0, 7);
    g.fill();
  } else {
  // hair: short and tightly curled, a little longer on women
  g.fillStyle = hair;
  g.beginPath();
  g.ellipse(0, hcy - hr * 0.2, hr * 0.95, hr * 0.95, 0, Math.PI * 0.95, Math.PI * 2.05);
  g.fill();
  for (let q = -3; q <= 3; q++) {
    g.beginPath();
    g.arc(q * hr * 0.27, hcy - hr * (1.05 - Math.abs(q) * 0.07), hr * 0.2, 0, 7);
    g.fill();
  }
  if (fem && adult) {
    g.beginPath();
    g.ellipse(-hr * 0.82, hcy + hr * 0.1, hr * 0.2, hr * 0.55, 0, 0, 7);
    g.ellipse(hr * 0.82, hcy + hr * 0.1, hr * 0.2, hr * 0.55, 0, 0, 7);
    g.fill();
  }
  }
  // face: brow, eyes, a nose's shadow, closed when asleep
  if (h > 9) {
    g.fillStyle = ape ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.18)';
    g.fillRect(-hr * 0.55, hcy - hr * 0.22, hr * 1.1, hr * (ape ? 0.2 : 0.12));
    g.fillStyle = '#120c09';
    if (a.asleep) {
      g.fillRect(-hr * 0.42, hcy, hr * 0.26, hr * 0.06);
      g.fillRect(hr * 0.16, hcy, hr * 0.26, hr * 0.06);
    } else {
      g.beginPath();
      g.arc(-hr * 0.3, hcy, hr * 0.11, 0, 7);
      g.arc(hr * 0.3, hcy, hr * 0.11, 0, 7);
      g.fill();
    }
    g.fillStyle = 'rgba(0,0,0,0.15)';
    g.beginPath();
    g.ellipse(0, hcy + hr * 0.32, hr * 0.15, hr * 0.1, 0, 0, 7);
    g.fill();
  }
  // a thin pink or blue outline round the head (female or male), so they stand out on any ground
  g.strokeStyle = col;
  g.lineWidth = Math.max(0.7, h * 0.02);
  g.beginPath();
  g.ellipse(0, hcy, hr * 0.98, hr * 1.2, 0, 0, 7);
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
// East Africa 2.5 million years ago: each drawn with the shape of the kind it borrows (config.js: look), in its own colours
Object.assign(LOOK, {
  Antelope: { ...LOOK.Deer, col: '#b47a42', s: 0.9 },
  Hare: { ...LOOK.Rabbit, col: '#a39079' },
  Buffalo: { ...LOOK.Bison, col: '#2e2926' },
  Hyena: { ...LOOK.Wolf, col: '#a08a5c' },
  Leopard: { ...LOOK['Big cat'], col: '#d6a648' },
  'Sabre-tooth': { ...LOOK['Big cat'], col: '#b2895a', s: 1.25 },
});
function drawAnimal(g, a, X, Y, k) {
  const L = LOOK[a.S.n] || LOOK[a.S.look] || LOOK.Deer,
    nm = a.S.look || a.S.n,
    gr = clamp(a.age / a.S.mat, 0.35, 1),
    u = k * L.s * (0.45 + 0.55 * gr) * 1.3,
    f = a.face || 1,
    bw = L.w * u,
    bh = L.h * u,
    leg = a.asleep ? 0 : L.leg * u,
    swing = a.moving && !a.asleep ? Math.sin(a.ph || 0) * u * 0.7 : 0,
    by = Y - leg - bh / 2 + (a.asleep ? bh * 0.3 : 0); // body centre; feet on the ground at Y
  g.save();
  g.lineCap = 'round';
  g.strokeStyle = L.col;
  g.fillStyle = L.col;
  // legs
  if (leg) {
    g.lineWidth = Math.max(1, u * (nm === 'Bison' || nm === 'Bear' ? 0.75 : 0.45));
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
  if (nm === 'Wolf') {
    g.moveTo(tx, by - bh * 0.1);
    g.quadraticCurveTo(tx - f * bw * 0.25, by + bh * 0.1, tx - f * bw * 0.35, by + bh * 0.4);
    g.lineWidth = Math.max(1.5, u * 0.8);
  } else if (nm === 'Big cat') {
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
  if (nm === 'Bison') {
    g.beginPath();
    g.ellipse(X + f * bw * 0.18, by - bh * 0.35, bw * 0.25, bh * 0.45, 0, 0, 7);
    g.fill();
  }
  // head
  const head = (nm === 'Rabbit' ? 0.7 : nm === 'Bear' || nm === 'Bison' ? 0.95 : 0.75) * bh,
    hx = X + f * (bw / 2 + head * 0.35),
    hy = by - bh * (nm === 'Bison' ? 0.05 : 0.45) + (a.act === A_EAT ? bh * 0.7 : 0);
  g.beginPath();
  g.arc(hx, hy, head / 2, 0, 7);
  g.fill();
  // snout
  if (nm === 'Deer' || nm === 'Wolf') {
    g.beginPath();
    g.ellipse(hx + f * head * 0.45, hy + head * 0.1, head * 0.32, head * 0.2, 0, 0, 7);
    g.fill();
  }
  // ears, antlers, horns
  g.lineWidth = Math.max(1, u * 0.35);
  g.beginPath();
  if (nm === 'Rabbit') {
    g.ellipse(hx - f * head * 0.15, hy - head * 1.05, head * 0.16, head * 0.6, -f * 0.2, 0, 7);
    g.ellipse(hx + f * head * 0.1, hy - head * 1.0, head * 0.16, head * 0.6, f * 0.15, 0, 7);
    g.fill();
  } else if (nm === 'Wolf' || nm === 'Big cat') {
    const e = nm === 'Wolf' ? 0.55 : 0.3;
    g.moveTo(hx - head * 0.3, hy - head * 0.3);
    g.lineTo(hx - head * 0.15, hy - head * (0.4 + e));
    g.lineTo(hx + head * 0.05, hy - head * 0.35);
    g.fill();
  } else if (nm === 'Bear') {
    g.arc(hx - head * 0.28, hy - head * 0.42, head * 0.17, 0, 7);
    g.arc(hx + head * 0.2, hy - head * 0.45, head * 0.17, 0, 7);
    g.fill();
  } else if (nm === 'Deer' && !a.sex && gr > 0.8) {
    g.strokeStyle = '#d8c6a0';
    g.moveTo(hx, hy - head * 0.4);
    g.lineTo(hx - f * head * 0.3, hy - head * 1.4);
    g.moveTo(hx - f * head * 0.1, hy - head * 0.9);
    g.lineTo(hx + f * head * 0.25, hy - head * 1.25);
    g.stroke();
  } else if (nm === 'Bison') {
    g.strokeStyle = '#e0d6c0';
    g.moveTo(hx - head * 0.3, hy - head * 0.3);
    g.quadraticCurveTo(hx - head * 0.55, hy - head * 0.75, hx - head * 0.25, hy - head * 0.8);
    g.stroke();
  }
  // hunters get a thin red outline, as people get pink or blue, so they are easy to pick out
  if (a.sp === 2) {
    g.strokeStyle = '#d23c2c';
    g.lineWidth = Math.max(1, u * 0.35);
    g.beginPath();
    g.ellipse(X, by, bw / 2, bh / 2, 0, 0, 7);
    g.moveTo(hx + head / 2, hy);
    g.arc(hx, hy, head / 2, 0, 7);
    g.stroke();
  }
  // a pale tail patch on deer and rabbits
  if (nm === 'Deer' || nm === 'Rabbit') {
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
    // A fish seen from the side, just under the surface: dark on the back and silver underneath
    // (countershading, as real fish are), a forked tail that sways as it swims, a fin and an eye.
    g.globalAlpha *= 0.8;
    const q = (1.2 + 1.6 * gr) * k,
      f = a.face === -1 ? -1 : 1,
      sw = Math.sin(performance.now() / 160 + (a.id || 0)) * (a.asleep ? 0.1 : 0.35);
    g.save();
    g.translate(X, Y);
    g.scale(f, 1);
    const grad = g.createLinearGradient(0, -q * 0.7, 0, q * 0.7);
    grad.addColorStop(0, '#3e5560');
    grad.addColorStop(0.45, '#7f97a0');
    grad.addColorStop(1, '#dfe7ea');
    g.fillStyle = grad;
    // the body: a spindle, pointed at the head, narrow at the tail
    g.beginPath();
    g.moveTo(q * 1.6, 0);
    g.quadraticCurveTo(q * 0.6, -q * 0.75, -q * 0.9, -q * 0.22);
    g.lineTo(-q * 0.9, q * 0.22);
    g.quadraticCurveTo(q * 0.6, q * 0.75, q * 1.6, 0);
    g.fill();
    // the tail, swaying
    g.fillStyle = '#4d6670';
    g.beginPath();
    g.moveTo(-q * 0.85, 0);
    g.lineTo(-q * 1.7, -q * (0.6 - sw));
    g.lineTo(-q * 1.4, 0);
    g.lineTo(-q * 1.7, q * (0.6 + sw));
    g.closePath();
    g.fill();
    // a fin on the back
    g.beginPath();
    g.moveTo(q * 0.4, -q * 0.55);
    g.lineTo(-q * 0.1, -q * 0.95);
    g.lineTo(-q * 0.3, -q * 0.4);
    g.fill();
    // the eye
    g.fillStyle = '#111';
    g.beginPath();
    g.arc(q * 1.05, -q * 0.12, Math.max(0.6, q * 0.11), 0, 7);
    g.fill();
    g.restore();
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
    FLAT.s = document.createElement('canvas');
    FLAT.s.width = W * C;
    FLAT.s.height = H * C;
    FLAT.sg = FLAT.s.getContext('2d');
    FLAT.n = 0;
  }
  if (FLAT.n++ % 10 === 0) {
    // the land blends smoothly from square to square (as on the globe), with its detail laid lightly
    // over; then the clouds, drawn square by square and blurred into soft shapes
    drawTerrain(FLAT.g, v);
    const sg = FLAT.sg,
      t = FLAT.t || (FLAT.t = document.createElement('canvas'));
    t.width = W;
    t.height = H;
    const tg = t.getContext('2d');
    tg.imageSmoothingEnabled = true;
    tg.imageSmoothingQuality = 'high';
    tg.drawImage(FLAT.c, 0, 0, W, H);
    sg.imageSmoothingEnabled = true;
    sg.imageSmoothingQuality = 'high';
    sg.clearRect(0, 0, FLAT.s.width, FLAT.s.height);
    sg.drawImage(t, 0, 0, FLAT.s.width, FLAT.s.height);
    sg.globalAlpha = 0.18;
    sg.drawImage(FLAT.c, 0, 0);
    sg.globalAlpha = 1;
    FLAT.g.clearRect(0, 0, FLAT.c.width, FLAT.c.height);
    drawSky(FLAT.g);
    sg.filter = 'blur(' + C * 0.9 + 'px)';
    sg.drawImage(FLAT.c, 0, 0);
    sg.filter = 'none';
  }
  cx.setTransform(1, 0, 0, 1, 0, 0);
  cx.imageSmoothingEnabled = true;
  cx.drawImage(FLAT.s, 0, 0, cv.width, cv.height);
  cx.setTransform(cv.width / (W * C), 0, 0, cv.height / (H * C), 0, 0);
  for (const a of ag) drawCreature(cx, a, a.rx * C + C / 2, a.ry * C + C / 2, 1, v);
  drawWeatherFx(cx, (x, y) => [x * C + C / 2, y * C + C / 2, C], false);
  drawFire(cx, (x, y) => [x * C + C / 2, y * C + C / 2, C]);
  drawBodies(cx, (x, y) => [x * C + C / 2, y * C + C / 2, 30]);
  drawCarrion(cx, (x, y) => [x * C + C / 2, y * C + C / 2, C * 12]);
  drawSounds(cx, (x, y) => [x * C + C / 2, y * C + C / 2, C]);
  drawTrails(cx, (x, y) => [x * C + C / 2, y * C + C / 2, C]);
  drawTalk(cx, (a) => [a.rx * C + C / 2, a.ry * C + C / 2, 6], 0.6);
  // night is local: shade the half of the world where the sun is down
  cx.fillStyle = 'rgba(8,16,48,.38)';
  for (let x = 0; x < W; x++) if (isNightAt(x)) cx.fillRect(x * C, 0, C, H * C);
  if (sel) {
    cx.strokeStyle = v('--ink');
    cx.lineWidth = 2;
    cx.beginPath();
    cx.arc(sel.rx * C + C / 2, sel.ry * C + C / 2, 8, 0, 7);
    cx.stroke();
    // what its eyes can see right now (the cells its senses actually took in)
    if (sel.view) {
      cx.fillStyle = 'rgba(255,255,230,.22)';
      for (const i of sel.view) cx.fillRect((i % W) * C, ((i / W) | 0) * C, C, C);
    }
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
  eye: null, // the creature whose eyes we are looking through, if any
  spin: false, // false: held still like a weather satellite sees Earth; true: turns with the day, seen from the sun
  held: false, // being dragged right now
  vel: 0, // extra turning from a flick (radians per frame)
  lastT: 0, // world time at the last frame, to turn the planet with its day
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
  // Turn with the world's day (see spinStep), plus any flick.
  spinStep();
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
  const xs = ((((0.5 - (worldT() % DAY) / DAY) * W) % W) + W) % W,
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
// ---------- the translator ----------
// Two honest ways to say what someone's words mean. From the speaker's own brain: which of the things it
// sensed pushed it most toward speaking just then (the speak-or-stay-quiet choice traced back through
// its network). And from how everyone uses the word: the situations it is said in, compared with how
// often people are in them anyway, and what hearers tend to do. Neither ever makes up a meaning.
function speakReasons(a) {
  const H = a.h.length,
    OVD = OVDof(H),
    OVH = OVHof(H),
    w = a.lw,
    x = a.xl || a.xi,
    h = a.h,
    out = [];
  for (let i = 0; i < NI; i++) {
    if (!x[i]) continue;
    let c = w[OVD + 3 * NI + i] - w[OVD + i]; // toward speaking rather than staying quiet
    for (let j = 0; j < a.nh; j++) {
      const wi = w[OI + j * NI + i];
      if (wi) c += (w[OVH + 3 * H + j] - w[OVH + j]) * (1 - h[j] * h[j]) * wi;
    }
    c *= x[i];
    const n = featName(i);
    if (c > 0.05 && n && !/^the sound of the word/.test(n)) out.push([n, c]);
  }
  const seen = new Set();
  return out
    .sort((p, q) => q[1] - p[1])
    .filter(([n]) => !seen.has(n) && seen.add(n))
    .slice(0, 3)
    .map(([n]) => n);
}
function meaningText(word) {
  const S = WSTAT.get(word),
    m = meaning(word);
  if (!S || S.n < 25) return S && S.n > 1 ? 'Said ' + S.n + ' times so far: too few to tell what it means.' : 'Hardly ever said: no meaning yet.';
  if (!m.best && !m.resp) return 'Said ' + S.n + ' times, in all kinds of situations: no meaning yet.';
  let t = '';
  if (m.best)
    t += 'Said mostly when ' + CTXN[m.best.c] + ' (' + Math.round(100 * m.best.p) + '% of the time, against ' + Math.round(100 * m.best.q) + '% usually; not tested against chance). ';
  if (m.resp) t += m.resp[0].toUpperCase() + m.resp.slice(1) + ' (not compared with how often they do so anyway).';
  if (S.npt >= 5) {
    const [c, n] = Object.entries(S.pts).sort((p, q) => q[1] - p[1])[0];
    if (n / S.npt > 0.4) t += ' Often said while pointing at ' + CHN[c] + ' (' + Math.round((100 * n) / S.npt) + '% of the times it was said with a point).';
  }
  return t;
}
function translateHTML(a) {
  if (a.sp !== 0 || a.saidT === undefined || tick - a.saidT > 3 || a.said !== 2) return '';
  const r = speakReasons(a);
  return (
    '<div class="tr"><b>Said “' + a.word + '”.</b> ' +
    (r.length ? 'What pushed it to speak, in its brain: ' + r.join('; ') + '. ' : 'Nothing clear in its brain pushed it to speak: babbling, or trying out its voice. ') +
    '<br><i>What “' + a.word + '” means, from how everyone uses it:</i> ' + meaningText(a.word) +
    '</div>'
  );
}
// What each sound has come to mean, worked out only from when it is really used
function soundsHTML() {
  const words = [...WSTAT.entries()].sort((p, q) => q[1].n - p[1].n).slice(0, 12);
  return (
    '<p class="sub">' + WSTAT.size + ' different words have been said so far' +
    (WSTAT.size ? ', ' + [...WSTAT.values()].filter((s) => s.who && s.who.size >= 3).length + ' of them by three or more people' : '') +
    '. Meanings are worked out only from how words are really used.</p>' +
    '<table class="tbl"><tr><th>Sound</th><th>Used</th><th>When it is said (not yet tested against chance)</th></tr>' +
    SAYN.map((n, k) => [n, SNDSTAT[k], k])
      .concat(words.map(([w, S]) => [w, S, w]))
      .map(([n, S, k]) => {
      const m = meaning(k);
      let t = k === 0 ? 'Inborn: a baby’s cry. ' : k === 1 ? 'Inborn: a scream of pain. ' : S.who ? 'Said by ' + S.who.size + (S.who.size === 1 ? ' person. ' : ' people. ') : '';
      if (!S || S.n < 25) t += S && S.n ? 'Too few uses to tell yet.' : 'Not used yet.';
      else if (!m.best && !m.resp) t += 'No meaning yet: used in all kinds of situations.';
      else {
        if (m.best)
          t +=
            'Used mostly when ' +
            CTXN[m.best.c] +
            ' (' +
            Math.round(100 * m.best.p) +
            '% of the time, against ' +
            Math.round(100 * m.best.q) +
            '% usually; not tested against chance). ';
        if (m.resp) t += m.resp[0].toUpperCase() + m.resp.slice(1) + ' (not compared with how often they do so anyway).';
      }
      return '<tr><td><b>“' + n + '”</b></td><td>' + (S ? S.n : 0) + '</td><td>' + t + '</td></tr>';
    }).join('') +
    '</table>'
  );
}
// What kind of learner it was born as: how much it learns from others, and whom it copies
function learnerText(a) {
  const im = a.g.im ?? 1,
    pb = a.g.pb ?? 0.5,
    cf = a.g.cf ?? 0.3;
  let t =
    'Born a learner who ' +
    (im < 0.35 ? 'mostly ignores others and learns the hard way' : im < 0.9 ? 'learns a little from others' : im < 1.5 ? 'learns from others' : 'learns a lot from others');
  if (im >= 0.35)
    t +=
      (pb > 0.6 ? ', copying those doing well' : pb < 0.3 ? ', copying whoever is near' : '') +
      (cf > 0.6 ? ', going with the crowd' : '');
  if (a.vic > 0.05) t += ' · has learned from others\' pain';
  const lv = (v) => (v < 0.2 ? 'very little' : v < 0.45 ? 'some' : v < 0.75 ? 'good' : 'full, like a modern human');
  t +=
    '<br>Born with ' + lv(a.g.vl ?? 1) + ' control of its voice, ' +
    ((a.g.pg ?? 1) < 0.2 ? 'hardly any urge to point' : (a.g.pg ?? 1) < 0.5 ? 'a little urge to point' : 'a strong urge to point') +
    ', and ' + ((a.g.sh ?? 1) < 0.2 ? 'little joy in sharing attention' : (a.g.sh ?? 1) < 0.5 ? 'some joy in sharing attention' : 'great joy in sharing attention');
  return t;
}
// Each generation of people: what they were born with, on average, and what they learned
function gensHTML() {
  const T = iqTable(),
    now = [];
  for (const [a, q] of T) (now[a.gen] = now[a.gen] || []).push(q.raw);
  const rows = GENSTAT.map((G, g) =>
    G && G.n
      ? '<tr><td>' +
        g +
        '</td><td>' +
        G.n +
        '</td><td>' +
        Math.round((100 * G.bs) / G.n) +
        '%</td><td>' +
        (G.lr / G.n).toFixed(2) +
        '</td><td>' +
        (G.im / G.n).toFixed(2) +
        '</td><td>' +
        Math.round((100 * (G.pb || 0)) / G.n) +
        '%</td><td>' +
        Math.round((100 * (G.cf || 0)) / G.n) +
        '%</td><td>' +
        Math.round((100 * (G.lone || 0)) / G.n) +
        '%</td><td>' +
        Math.round((100 * (G.vl || 0)) / G.n) +
        '%</td><td>' +
        Math.round((100 * (G.pg || 0)) / G.n) +
        '%</td><td>' +
        Math.round((100 * (G.sh || 0)) / G.n) +
        '%</td><td>' +
        (G.reg ? G.reg.map((v) => Math.round((100 * v) / G.n)).slice(1).join(' / ') + ' / ' + Math.round((100 * G.reg[0]) / G.n) : '–') +
        '</td><td>' +
        (G.nreg ? (G.nreg / G.n).toFixed(1) : '–') +
        '</td><td>' +
        (G.les / G.n).toFixed(1) +
        '</td><td>' +
        (now[g] ? Math.round((100 * now[g].reduce((t, v) => t + v, 0)) / now[g].length) + '%' : '–') +
        '</td></tr>'
      : ''
  ).join('');
  return (
    '<table class="tbl"><tr><th>Gen.</th><th>Born</th><th>Brain size</th><th>Learning speed</th><th>Learns from others</th><th>Copies the successful</th><th>Follows the crowd</th><th>Loners</th><th>Voice control</th><th>Urge to point</th><th>Joy in shared attention</th><th>Brain: fear / memory / words / general (%)</th><th>Brain regions</th><th>Lessons each</th><th>Test score now</th></tr>' +
    rows +
    '</table>'
  );
}
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
  focusOn(list[findAt[sp]++ % list.length]);
}
// select a creature, turn the planet to it and keep it in view, and flash a ring round it so it can be found in a crowd
function focusOn(a) {
  sel = a;
  GL.flash = performance.now();
  fillIdeas();
  if (view === 'globe') {
    GL.lon0 = lonOfX(a.x);
    GL.lat0 = latOfY(a.y);
    GL.zoom = Math.max(GL.zoom, 2.6);
    setSpin(false);
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
// Walking is drawn at its real pace: a creature on its way to the next square is shown that far along
// the way (its progress in the world, plus how far into the next world step we are), so it moves
// steadily instead of dashing from square to square. Its legs step in time: about two steps a second
// of world time, sped up with the world but never faster than three a second on screen.
let lastGlide = performance.now(),
  bodyT = 0;
const bodySwing = (a) => Math.sin(bodyT * 2 * Math.PI + a.id);
function glide() {
  const now = performance.now(),
    dt = Math.min(0.1, (now - lastGlide) / 1000),
    f = running ? clamp(acc, 0, 1) : 0,
    cadence = 3 * 2 * Math.PI;
  lastGlide = now;
  // the body's clock: hands and arms move at the same pace as walking legs would at this speed of the
  // world (a stride's worth of a walking person per cycle), and stop when the world is paused
  if (running) bodyT += dt * Math.min(3, (stepsPerSec() * SP[0].walk) / 0.4);
  // paused: nothing moves on screen (before, bodies kept gliding to catch up with frozen legs: the owner, 14 Nov 2026)
  if (!running) {
    for (const a of ag) a.moving = false;
    return;
  }
  for (const a of ag) {
    // a carried infant rides on its mother: drawn on her, moving with her, never walking or jumping on its own
    if (typeof carried === 'function' && carried(a) && a.mom.rx !== undefined) {
      a.rx = a.mom.rx + 0.07 * (a.mom.face || 1);
      a.ry = a.mom.ry + 0.04;
      a.face = a.mom.face;
      a.moving = false;
      continue;
    }
    let tx = a.x,
      ty = a.y;
    const walking = a.mvv > 0 && !a.asleep && !a.dead;
    // how far it has got toward the next square stays where it is when it stops, lies down or dies:
    // it doesn't drift back to the middle of its square while lying still
    if (a.mvd !== undefined && a.acc > 0) {
      const [mx, my] = MV[a.mvd],
        p = clamp(a.acc + (walking ? a.mvv * f : 0), 0, 1);
      tx += mx * p;
      ty += my * p;
      if (walking && mx) a.face = mx > 0 ? 1 : -1;
    }
    if (a.rx === undefined) {
      a.rx = tx;
      a.ry = ty;
    }
    const dx = dxw(tx - a.rx),
      dy = ty - a.ry;
    let moved = 0;
    // only a big gap (a very fast world, or a new world) is jumped; one falling asleep walks the last bit, then lies down
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      a.rx = wx(Math.round(tx)) + (tx - Math.round(tx));
      a.ry = ty;
    } else {
      // walk toward where it should be, never faster than a brisk version of its own pace, so a turn
      // or a blocked step is walked out instead of jumped
      const d = Math.hypot(dx, dy),
        most = Math.max(a.mvv || 0, a.S.walk) * stepsPerSec() * dt * 1.6;
      const k = d > most ? most / d : 1;
      a.rx = (((a.rx + dx * k) % W) + W) % W;
      a.ry += dy * k;
      moved = d * k;
    }
    // legs step with the ground they actually cover (a stride is about 0.4 of a square, the size the
    // body is drawn at), so feet never slide; and never faster than a few steps a second on screen
    a.moving = moved > 1e-5 && !a.dead && running;
    if (a.moving) a.ph = (a.ph || 0) + Math.min((moved / 0.4) * Math.PI, dt * cadence);
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
    setHTML($('ithink'), thinkHTML(sel, S));
    setHTML($('idoing'), doingHTML(sel, S, stage, night));
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
    [
      SIBS[0] && SIBS[0].pairs ? Math.round((100 * SIBS[0].full) / SIBS[0].pairs) + '%' : '–',
      'Brothers and sisters with the same father too (living foragers about 66%, chimpanzees 4%)',
    ],
    [ag.filter((a) => a.sp === 0 && a.mate && !a.mate.gone).length, 'People with a partner they are bonded to'],
  ];
  $('stats').innerHTML = st
    .map((x) => '<div class="stat"><b>' + x[0] + '</b><span>' + word(x[1]) + '</span></div>')
    .join('');
  if (tick !== drawHud.talkT && $('v-stats').offsetParent) {
    drawHud.talkT = tick;
    $('sounds').innerHTML = soundsHTML();
    $('gens').innerHTML = gensHTML();
  }
  // the counts are buttons: tap one to fly to the next creature of that kind
  const hudKey = c.join() + (tick % DAY) + seasonName(0);
  if (hudKey !== drawHud.k) {
    drawHud.k = hudKey;
    $('hud').innerHTML =
      [
        [0, c[0] + word(' people')],
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
// World time including how far it is into the next step, so the sun and the turning move smoothly.
const worldT = () => tick + (running ? clamp(acc, 0, 0.999) : 0);
// When "Turn with the sun" is on, the planet turns once a world day, west to east like Earth, so the
// sunlit half stays facing us; it follows the speed slider and stops when paused. When it is off, the
// planet holds still and day and night sweep across it. A flick adds momentum that fades either way.
function spinStep() {
  const t = worldT(),
    now = performance.now(),
    sec = Math.min(0.25, (now - (GL.lastW || now)) / 1000),
    d = (-2 * Math.PI * (t - GL.lastT)) / DAY,
    most = 2.5 * sec; // at the very fastest speeds the turning can't keep up with the sun
  GL.lastT = t;
  GL.lastW = now;
  if (GL.held) return;
  if (GL.spin && Math.abs(d) < 3) GL.lon0 += clamp(d, -most, most);
  GL.lon0 += GL.vel;
  GL.vel *= 0.97;
}
let lastT = performance.now();
// ---------- the Time view: where everyone has been, and what happened when ----------
// Off by default. Each creature's place is noted once an hour (every 4 steps) in the page only; the
// world itself knows nothing about this, so it can't change what happens.
let timeOn = false;
try {
  timeOn = localStorage.getItem('genesis-time') === '1';
} catch (e) {}
const TRAIL = new WeakMap(),
  TRAIL_MAX = 720; // 30 days of hours
function recordTrails() {
  if (!timeOn) return;
  for (const a of ag) {
    let t = TRAIL.get(a);
    if (!t) TRAIL.set(a, (t = []));
    t.push(a.rx ?? a.x, a.ry ?? a.y);
    if (t.length > TRAIL_MAX * 2) t.splice(0, 2);
  }
}
function trailSet() {
  const who = $('tr-who').value;
  if (who === 'all') return ag;
  if (who === 'ppl') return ag.filter((a) => a.sp === 0);
  if (!sel) return [];
  return [sel, sel.mom, sel.mate, sel.kid].filter((a) => a && !a.dead);
}
function drawTrails(g, P) {
  if (!timeOn) return;
  const keep = +$('tr-len').value / 4; // how many hourly points to show
  for (const a of trailSet()) {
    const t = TRAIL.get(a);
    if (!t || t.length < 4) continue;
    const from = Math.max(0, t.length / 2 - keep),
      n = t.length / 2;
    g.lineCap = 'round';
    let prev = null;
    for (let i = Math.floor(from); i < n; i++) {
      const x = t[i * 2],
        y = t[i * 2 + 1];
      const Q = P(x, y);
      if (prev && Q && Math.abs(x - prev.x) < W / 2) {
        const f = (i - from) / Math.max(1, n - from); // older = fainter
        g.strokeStyle = (a.sp === 0 ? 'rgba(255,214,120,' : a.sp === 2 ? 'rgba(255,120,110,' : 'rgba(150,220,255,') + (0.15 + 0.8 * f) + ')';
        g.lineWidth = clamp(Q[2] * (a === sel ? 0.3 : 0.2), 1.2, 6);
        g.beginPath();
        g.moveTo(prev.q[0], prev.q[1]);
        g.lineTo(Q[0], Q[1]);
        g.stroke();
      }
      prev = Q ? { x, q: Q } : null;
    }
  }
}
// the strip: every event ever logged as a dot along the time the world has run
const EVC = { born: '#8fd18f', died: '#e07a7a', fire: '#ffb347', other: '#9fb4d4' };
let tlDots = [];
function eventKind(s) {
  return /born/.test(s) ? 'born' : /died|killed|starved|drowned|burned|struck/.test(s) ? 'died' : /fire|flame|burning|cook/.test(s) ? 'fire' : 'other';
}
function drawTimeline() {
  if (!timeOn) return;
  const c = $('tlc'),
    g = c.getContext('2d'),
    w = c.width,
    h = c.height,
    span = Math.max(tick, 1);
  g.clearRect(0, 0, w, h);
  g.strokeStyle = 'rgba(160,170,180,.5)';
  g.beginPath();
  g.moveTo(0, h - 8);
  g.lineTo(w, h - 8);
  g.stroke();
  tlDots = [];
  for (const e of events) {
    const x = 6 + (e.t / span) * (w - 12),
      k = eventKind(e.s);
    g.fillStyle = EVC[k];
    g.beginPath();
    g.arc(x, k === 'died' ? 22 : k === 'born' ? 10 : 16, 3, 0, 7);
    g.fill();
    tlDots.push([x, e]);
  }
}
$('tlc').onmousemove = (ev) => {
  const r = $('tlc').getBoundingClientRect(),
    x = ((ev.clientX - r.left) / r.width) * $('tlc').width;
  let best = null;
  for (const d of tlDots) if (Math.abs(d[0] - x) < 6 && (!best || Math.abs(d[0] - x) < Math.abs(best[0] - x))) best = d;
  $('tl-tip').textContent = best ? 'Day ' + (Math.floor(best[1].t / DAY) + 1) + ': ' + best[1].s : 'Hover a dot. Green: births · orange: fire · red: deaths · blue: other firsts.';
};
function setTime(on) {
  timeOn = on;
  $('timebtn').setAttribute('aria-pressed', on);
  $('timebar').hidden = !on;
  try {
    localStorage.setItem('genesis-time', on ? '1' : '0');
  } catch (e) {}
  if (on) for (const a of ag) if (!TRAIL.has(a)) TRAIL.set(a, [a.rx, a.ry]);
}
$('timebtn').onclick = () => setTime(!timeOn);
setTime(timeOn);
let tlN = -1;
function loop() {
  const now = performance.now(),
    dt = Math.min(0.25, (now - lastT) / 1000);
  lastT = now;
  if (running) {
    acc += stepsPerSec() * dt;
    let n = 0;
    // a time budget per frame (about 25 ms): at high speeds the world runs as fast as the computer can while the
    // picture stays smooth; before, up to 10 steps a frame took half a second and creatures jumped (the owner, 14 Nov)
    while (acc >= 1 && n < 10 && (n === 0 || performance.now() - now < 25)) {
      sim();
      if (tick % 4 === 0) recordTrails();
      acc--;
      n++;
    }
    if (acc > 3) acc = 3; // what the computer could not keep up with is dropped, not saved up
  }
  draw();
  if (timeOn && events.length + tick % 16 !== tlN) {
    tlN = events.length + (tick % 16);
    drawTimeline();
  }
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
  retina: $('ret').checked,
  earth: $('land').value === 'earth',
  sapiens: $('era').value === 'sapiens',
});
// What's happening: the latest events float over the world, newest on top; new ones pop in and glow
// for a moment. It can be folded away; folded, it counts what you've missed.
let feedTop = null,
  feedMissed = 0,
  feedMin = false;
try {
  const s = localStorage.getItem('genesis-feed-min');
  feedMin = s === null ? innerWidth < 600 : s === '1'; // on a phone it starts folded, to leave room for the world
} catch (e) {}
// it sits just under the row of counts, however many lines that row wraps onto
new ResizeObserver(() => ($('feed').style.top = $('hud').offsetTop + $('hud').offsetHeight + 8 + 'px')).observe($('hud'));
function setFeedMin(v) {
  feedMin = v;
  $('feed').classList.toggle('min', v);
  $('fmin').textContent = v ? '+' : '−';
  $('fmin').title = v ? 'Show' : 'Minimise';
  $('fmin').setAttribute('aria-expanded', !v);
  if (!v) feedMissed = 0;
  $('fnew').hidden = !(v && feedMissed);
  $('fnew').textContent = feedMissed ? '· ' + feedMissed + ' new' : '';
  try {
    localStorage.setItem('genesis-feed-min', v ? '1' : '0');
  } catch (e) {}
}
$('fmin').onclick = () => setFeedMin(!feedMin);
setFeedMin(feedMin);
// The news can be all of it, or only what concerns the hominins (or people): an entry about them names one
// of them, or speaks of them.
const FEED = { tab: 'all', names: new Set(), logs: [], fresh: 0 };
function aboutUs(t) {
  if (/\b(hominins?|people|person|Hominins?|People|Person)\b/.test(t)) return true;
  for (const n of FEED.names) if (n && t.includes(n)) return true;
  return false;
}
function drawFeed() {
  let rows;
  if (FEED.tab === 'hom') {
    for (const a of ag) if (a.sp === 0 && a.name) FEED.names.add(a.name);
    rows = [];
    for (let i = events.length - 1; i >= 0 && rows.length < 8; i--)
      if (aboutUs(events[i].s)) rows.push('Day ' + (Math.floor(events[i].t / DAY) + 1) + ': ' + events[i].s);
    if (!rows.length) rows = ['Nothing yet about the ' + word('people') + '.'];
  } else rows = FEED.logs;
  $('log').innerHTML = rows.map((l, i) => '<li' + (FEED.tab === 'all' && i < FEED.fresh ? ' class="new"' : '') + '>' + linkNames(word(l)) + '</li>').join('');
}
// Names in the news are links: clicking one selects that creature and shows it (the owner, 14 Nov 2026). Those who have
// died are shown faded and cannot be followed.
function linkNames(t) {
  const who = new Map();
  for (const a of ag) if (a.name && (!who.has(a.name) || !a.gone)) who.set(a.name, a);
  if (!who.size) return t;
  const names = [...who.keys()].sort((x, y) => y.length - x.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return t.replace(new RegExp('\\b(' + names.join('|') + ')\\b', 'g'), (n) => {
    const a = who.get(n);
    return a.dead || a.gone
      ? '<span class="who gone" title="No longer alive">' + n + '</span>'
      : '<button type="button" class="who" data-who="' + a.id + '" title="Show ' + n + '">' + n + '</button>';
  });
}
$('log').addEventListener('click', (e) => {
  const b = e.target.closest('button.who');
  if (!b) return;
  const a = ag.find((o) => String(o.id) === b.dataset.who && !o.gone);
  if (a) focusOn(a);
});
document.querySelectorAll('[data-ft]').forEach(
  (b) =>
    (b.onclick = () => {
      FEED.tab = b.dataset.ft;
      document.querySelectorAll('[data-ft]').forEach((x) => x.setAttribute('aria-selected', x === b));
      if (feedMin) setFeedMin(false);
      drawFeed();
    })
);
function onLog(logs) {
  let fresh = logs.indexOf(feedTop);
  if (fresh < 0) fresh = feedTop === null ? 0 : logs.length;
  feedTop = logs[0];
  if (feedMin && fresh) {
    feedMissed += fresh;
    $('fnew').hidden = false;
    $('fnew').textContent = '· ' + feedMissed + ' new';
  }
  FEED.logs = logs;
  FEED.fresh = fresh;
  $('fthom').textContent = word('People');
  drawFeed();
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
  const iq = sel && sel.sp === 0 ? iqTable().get(sel) : null;
  T.placeholder = sel
    ? 'Whisper to ' + (sel.name || 'this ' + sel.S.n.toLowerCase()) + (iq ? ' (IQ ' + iq.iq + ')' : '') + '…'
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
// Pick the creature under a click (in CSS pixels), on either view. A figure stands above the spot
// where its feet are, so a click anywhere on its body counts; a click that just misses keeps the
// creature you were watching instead of losing it.
function selectAt(e) {
  const r = cv.getBoundingClientRect(),
    qx = e.clientX - r.left,
    qy = e.clientY - r.top,
    close = view === 'globe' && G3D.ok && GL.zoom >= 6;
  let b = null,
    bd = Infinity,
    near = Infinity;
  for (const a of ag) {
    const P = screenPos(a);
    if (!P) continue;
    const feet = P[1] + (view === 'globe' ? 6 : P[2] / 2),
      // how tall it looks on screen: a close-up figure (2.5× life size, see globe3d) or a marker
      tall = close ? Math.max(14, P[2] * (a.sp === 0 ? 0.11 : 0.08)) : Math.max(14, P[2] * 0.9),
      half = Math.max(12, tall * 0.4),
      cy = feet - tall / 2,
      inside = Math.abs(qx - P[0]) <= half && qy >= feet - tall - 4 && qy <= feet + 8,
      d = (qx - P[0]) ** 2 + (qy - cy) ** 2;
    if (d < near) near = d;
    if (inside && d < bd) {
      bd = d;
      b = a;
    }
  }
  if (!b && near < 60 ** 2) return; // a near miss: keep watching the one you had
  sel = b;
  fillIdeas();
}
// Zoom toward the place under the cursor (or between the fingers), not the middle of the screen, so
// whatever you are zooming in on stays in view — like a map app.
function zoomAt(z, cx, cy) {
  const z0 = GL.zoom,
    z1 = clamp(z, 1, 40);
  if (z1 === z0) return;
  const P = G3D.ok && G3D.pick ? G3D.pick(cx, cy) : null;
  GL.zoom = z1;
  if (!P || GL.eye) return;
  // turn the planet until the same place is back under the cursor (the camera also tilts as it
  // comes close, so this is corrected a few times)
  for (let k = 0; k < 4; k++) {
    G3D.aim();
    const Q = G3D.pick(cx, cy);
    if (!Q) break;
    GL.lon0 += Math.atan2(Math.sin(P.lon - Q.lon), Math.cos(P.lon - Q.lon));
    GL.lat0 = clamp(GL.lat0 + (P.lat - Q.lat), -1.45, 1.45);
  }
  GL.follow = null;
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
    if (GL.eye) setEye(null);
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
    if (pinch0) {
      const r = cv.getBoundingClientRect();
      zoomAt(
        (zoom0 * Math.hypot(a.x - b.x, a.y - b.y)) / pinch0,
        (a.x + b.x) / 2 - r.left,
        (a.y + b.y) / 2 - r.top
      );
    }
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
    const r = cv.getBoundingClientRect();
    zoomAt(GL.zoom * Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top);
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
$('view').onclick = () => {
  setView(view === 'globe' ? 'flat' : 'globe');
  $('turn').hidden = view !== 'globe';
};
// Two honest ways to watch a planet. Held still, as a satellite that circles in step with Earth sees
// it: the land stays put and day and night sweep across it, so only the creatures move. Or seen from
// the sun: the sunlit side stays facing you and the planet turns beneath it.
function setSpin(v) {
  GL.spin = v;
  $('turn').textContent = v ? 'Turning with the sun' : 'Turn with the sun';
  $('turn').title = v ? 'The planet turns with the day, sunlit side toward you. Click to hold it still.' : 'The planet holds still while day and night sweep across it. Click to turn it with the sun.';
  $('turn').setAttribute('aria-pressed', v ? 'true' : 'false');
}
$('turn').onclick = () => setSpin(!GL.spin);
$('sky').onclick = () => {
  showSky = !showSky;
  $('sky').textContent = showSky ? 'Hide clouds' : 'Show clouds';
  GL.tdata = null;
  FLAT.n = 0;
  if (G3D.ok) G3D.repaint();
};
// The realistic view: real-looking water and sky, for those who want them (it is slower to draw, so it
// starts off, and each visitor's choice is remembered on their device)
function setReal(on) {
  $('real').setAttribute('aria-pressed', on ? 'true' : 'false');
  $('real').textContent = on ? 'Realistic: on' : 'Realistic';
  if (G3D.ok && G3D.setReal) G3D.setReal(on);
  try {
    localStorage.setItem('genesis-real', on ? '1' : '0');
  } catch {}
}
if (!G3D.ok) $('real').hidden = true;
else {
  let r0 = false;
  try {
    r0 = localStorage.getItem('genesis-real') === '1';
  } catch {}
  setReal(r0);
}
$('real').onclick = () => setReal($('real').getAttribute('aria-pressed') !== 'true');
// The view options live in a small menu behind the "View" button, so the bar stays tidy
function showOpts(on) {
  $('opts').hidden = !on;
  $('optsbtn').setAttribute('aria-expanded', on ? 'true' : 'false');
}
$('optsbtn').onclick = (e) => {
  e.stopPropagation();
  showOpts($('opts').hidden);
};
document.addEventListener('click', (e) => {
  if (!$('opts').hidden && !e.target.closest('.menuwrap')) showOpts(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !$('opts').hidden) {
    showOpts(false);
    $('optsbtn').focus();
  }
});
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
function setHTML(el, h) {
  h = word(h); // hominins, not people, in the early-hominin world
  if (el._h !== h) el.innerHTML = el._h = h;
}
['ithink', 'idoing'].forEach((id) =>
  $(id).addEventListener(
    'toggle',
    (e) => {
      if (e.target.dataset && e.target.dataset.k) MORE[e.target.dataset.k] = e.target.open;
    },
    true
  )
);
function updateDock() {
  const d = $('dock');
  if (GL.eye && (GL.eye !== sel || GL.eye.gone)) setEye(null);
  if (!sel || sel.gone) {
    d.hidden = true;
    return;
  }
  const yrs = sel.age / TY,
    iq = sel.sp === 0 ? iqTable().get(sel) : null,
    age = yrs < 1
      ? ((m) => m + (m === 1 ? ' month' : ' months'))(Math.max(1, Math.round(yrs * 12)))
      : yrs.toFixed(1) + ' years',
    kg = sel.sp === 0 && SOC.growBodies && sel.S.growF ? ' · ' + Math.round(bodyKg(sel)) + ' kg' : '',
    sx = sel.sp === 3 ? '' : sel.sex ? ' · female' : ' · male',
    sub = age + sx + kg + (iq ? ' · IQ ' + iq.iq : '');
  const nm = sel.name || sel.S.n;
  if ($('dname').textContent !== nm) $('dname').textContent = nm;
  if ($('dsub').textContent !== sub) $('dsub').textContent = sub;
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
// See through its eyes: the camera stands where it stands, at its eye height, facing where it faces,
// with its field of view — and for animals that see two colours, red and green look alike.
function setEye(a) {
  GL.eye = a;
  $('deye').setAttribute('aria-pressed', a ? 'true' : 'false');
  $('deye').textContent = a ? 'Map' : 'Eyes';
  if (a && view !== 'globe') setView('globe');
  if (!a && G3D.eyeOff) G3D.eyeOff();
}
$('deye').onclick = () => setEye(GL.eye ? null : sel);
$('dlisten').onclick = () => {
  listen = !listen;
  $('dlisten').setAttribute('aria-pressed', listen ? 'true' : 'false');
  $('dlisten').textContent = listen ? 'Listening' : 'Listen';
  if (listen) {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      AC.resume();
    } catch (e) {}
  }
};
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
