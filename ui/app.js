// Genesis — The page: drawing the world, the Inspect and Whisper panels, the controls, and the animation loop.
// Copyright (c) 2026 Malvika Sen. MIT License.

let running = true,
  acc = 0;
const $ = (id) => document.getElementById(id),
  cv = $('cv'),
  cx = cv.getContext('2d'),
  cc = $('ch').getContext('2d');
// ---------- drawing ----------
function mindHTML(a, m) {
  const pc = (p) => Math.round(p * 100) + '%';
  let o = '<br><b>Its mind right now</b> (read from its neural network):';
  o += '<br>Weighing: ' + m.opts.map((q) => q[0] + ' ' + pc(q[1])).join(', ');
  o +=
    '<br>Chose: ' +
    actName(a, m.act) +
    (m.forced
      ? ' — not its choice: ' +
        (m.act === A_SLEEP ? 'its body is keeping it asleep' : 'its body overrode it') +
        ' (it would have chosen ' +
        actName(a, m.chosen) +
        ')'
      : '');
  if (!m.forced) {
    o +=
      '<br>Pushed toward it by: ' +
      (m.pos.length
        ? m.pos.map((q) => q[0] + ' (' + q[2] + ')').join(', ')
        : 'nothing strong — it was close to a random pick');
    if (m.rfc > 0.5) o += ', and an inborn urge it cannot unlearn';
    if (m.neg.length) o += '<br>Holding it back: ' + m.neg.map((q) => q[0] + ' (' + q[2] + ')').join(', ');
  }
  o +=
    '<br>Its own forecast: ' +
    (m.V > 0.3 ? 'things will get better' : m.V < -0.3 ? 'things will get worse' : 'about the same') +
    ' (' +
    m.V.toFixed(2) +
    ')';
  if (a.hunch && tick < a.hunch.until) o += '<br>A hunch is still with it: “' + a.hunch.text + '”';
  return o;
}
// ---------- the floating box: what it is thinking, what it is doing ----------
const dirTo = (a, p) => CP[(Math.round(Math.atan2(p.y - a.y, p.x - a.x) / (Math.PI / 4)) + 8) % 8];
function doingWord(a, k) {
  const nearWater = () => {
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++)
        if (inb(a.x + dx, a.y + dy) && water[idx(a.x + dx, a.y + dy)]) return true;
    return false;
  };
  if (k === A_DRINK && a.sp !== 3 && !nearWater()) return 'trying to drink, but there is no water here';
  if (k === A_EAT && a.sp < 2 && !(food[idx(a.x, a.y)] > 0.05) && !water[idx(a.x, a.y)])
    return 'trying to eat, but there is nothing to eat here';
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
function thinkHTML(a, S, pc) {
  let o = '';
  if (a.mind) o += mindHTML(a, a.mind).replace(/^<br>/, '');
  else o += 'Its mind: wait a moment for the next step…';
  o +=
    '<br><br><b>Feelings</b> fear ' +
    pc(a.fear) +
    ', loneliness ' +
    (a.metAny ? pc(a.lo) : 'none (has never met another of its kind)') +
    ', protectiveness ' +
    pc(a.pr) +
    ', desire for a partner ' +
    pc(a.lu) +
    ', curiosity ' +
    pc(Math.min(1, a.g.c * S.cur)) +
    ' (explored ' +
    a.vc +
    ' of 160 areas)';
  o +=
    '<br><b>Remembers</b> ' +
    (a.mw ? 'water to the ' + dirTo(a, a.mw) : 'no water') +
    ', ' +
    (a.mf ? 'food to the ' + dirTo(a, a.mf) : 'no food') +
    ' (memory lasts about ' +
    S.mem +
    ' days)';
  o +=
    '<br><b>Personality</b> ' +
    (a.g.b > 1.1 ? 'cautious' : a.g.b < 0.85 ? 'bold' : 'steady') +
    ', ' +
    (a.g.so > 1.2 ? 'sociable' : a.g.so < 0.8 ? 'loner' : 'average sociability');
  o += '<br><b>Lessons so far</b> ' + (a.les.length ? a.les.join('; ') : 'none yet');
  o +=
    '<br><b>Brain</b> ' +
    S.nh +
    ' neurons; ' +
    (S.adl >= 1 ? 'keeps learning well into adulthood' : 'learning slows once grown') +
    '; learning has rewired it by ' +
    a.learn.toFixed(1);
  return o;
}
function doingHTML(a, S, stage, pc, night) {
  const i = idx(a.x, a.y),
    m = a.mind;
  let now;
  if (a.asleep) now = 'Sleeping';
  else if (a.trap > 0) now = 'Stuck in a pit, trying to climb out';
  else if (m)
    now = doingWord(a, m.act).replace(/^./, (c) => c.toUpperCase()) + (m.forced ? ' (its body made it)' : '');
  else now = 'Just looking around';
  const place = placeOf(a);
  // who is around, within the distance it can see
  const r = sightRange(a, night),
    near = [0, 0, 0, 0];
  for (const o of ag) if (o !== a && !o.dead && Math.hypot(o.x - a.x, o.y - a.y) <= r) near[o.sp]++;
  const nm = ['person', 'herbivore', 'predator', 'fish'],
    around = near
      .map((n, k) => (n ? n + ' ' + nm[k] + (n > 1 ? (k === 3 ? '' : k === 0 ? '' : 's') : '') : ''))
      .filter(Boolean);
  if (near[0] > 1) around[around.findIndex((t) => t.endsWith('person'))] = near[0] + ' people';
  let o = '<b>' + now + '</b>, ' + place + (night ? ', at night' : ', in daylight');
  o +=
    '<br><br><b>Body</b> energy ' +
    a.e.toFixed(0) +
    ', water ' +
    a.w.toFixed(0) +
    ', health ' +
    a.hp.toFixed(0) +
    ', sleepiness ' +
    pc(a.sl);
  o +=
    '<br><b>Who</b> ' +
    S.n +
    ', ' +
    (a.sex ? 'female' : 'male') +
    ', ' +
    stage +
    ' (lifespan ' +
    (a.lf / TY).toFixed(0) +
    ' years), generation ' +
    a.gen;
  o +=
    '<br><b>Can see</b> about ' +
    r.toFixed(1) +
    ' cells (' +
    Math.round(r * 3) +
    ' km)' +
    (a.asleep ? ', short because it is asleep' : night ? ', shorter at night' : '') +
    ' — the dashed circle';
  o += '<br><b>Around it</b> ' + (around.length ? around.join(', ') : 'nobody in sight');
  const fam = [];
  if (a.mom && !a.mom.dead && !a.mom.gone) fam.push('its mother ' + (a.mom.name || 'is alive'));
  if (a.mate && !a.mate.dead && !a.mate.gone) fam.push('its partner ' + (a.mate.name || 'is alive'));
  if (a.kid && !a.kid.dead && !a.kid.gone) fam.push('its youngest ' + (a.kid.name || 'is alive'));
  if (fam.length) o += '<br><b>Family</b> ' + fam.join(', ');
  if (a.shared) o += '<br>Has shared food ' + a.shared + ' times';
  if (a.hunch && tick < a.hunch.until) o += '<br><b>Following a hunch</b> “' + a.hunch.text + '”';
  return o;
}

function placeOf(a) {
  const i = idx(a.x, a.y);
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
function thoughtText(a) {
  const m = a.mind;
  if (!m) return 'Taking in the world…';
  if (m.forced)
    return (
      (m.act === A_SLEEP ? 'Its body keeps it asleep' : 'Its body took over') +
      '; it would have chosen to ' +
      actName(a, m.chosen)
    );
  const why = m.pos.map((q) => q[0]);
  if (m.rfc > 0.5)
    why.unshift(
      m.act === A_EAT ? 'the urge to eat' : m.act === A_DRINK ? 'the urge to drink' : 'the urge to strike'
    );
  let t = why.length
    ? why
        .slice(0, 2)
        .join(', ')
        .replace(/^./, (c) => c.toUpperCase()) +
      ' → ' +
      actName(a, m.act)
    : 'Nothing clear; it picks ' + actName(a, m.act) + ' almost at random';
  t += ' (' + Math.round(m.sure * 100) + '% sure)';
  if (a.hunch && tick < a.hunch.until) t += ' · hunch: “' + a.hunch.text + '”';
  return t;
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
  return now + ', ' + placeOf(a);
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
  const cr = cv.getBoundingClientRect(),
    wr = $('v-world').getBoundingClientRect(),
    px = cr.left - wr.left + ((sel.x + 0.5) / W) * cr.width,
    py = cr.top - wr.top + (sel.y / H) * cr.height - 10,
    w = tip.offsetWidth,
    h = tip.offsetHeight;
  const left = clamp(px - w / 2, 4, wr.width - w - 4),
    below = py - h < 4;
  tip.style.left = left + 'px';
  tip.style.top = (below ? py + cr.height / H + 24 : py - h) + 'px';
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
  return Math.max(1.5, a.g.v * (night ? SP[a.sp].nv : 1) * (a.asleep ? 0.3 : 1));
}
function draw() {
  cx.setTransform(cv.width / (W * C), 0, 0, cv.height / (H * C), 0, 0);
  const s = getComputedStyle(document.documentElement),
    v = (n) => s.getPropertyValue(n).trim();
  cx.fillStyle = v('--dirt');
  cx.fillRect(0, 0, W * C, H * C);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = idx(x, y),
        t = ter[i];
      if (water[i]) {
        cx.fillStyle = v('--water');
        cx.fillRect(x * C, y * C, C, C);
        if (deep[i]) {
          cx.fillStyle = 'rgba(0,30,70,.25)';
          cx.fillRect(x * C, y * C, C, C);
        }
        continue;
      }
      if (t) {
        cx.fillStyle = v(t === 1 ? '--sand' : '--stone');
        cx.fillRect(x * C, y * C, C, C);
      }
      if (rock[i]) {
        cx.fillStyle = v('--rock');
        cx.fillRect(x * C + 1, y * C + 1, C - 2, C - 2);
      } else if (pit[i]) {
        cx.fillStyle = '#1b1410';
        cx.beginPath();
        cx.arc(x * C + C / 2, y * C + C / 2, C / 2 - 1, 0, 7);
        cx.fill();
      } else if (t !== 1 && food[i] > 0.05) {
        cx.globalAlpha = Math.min(0.85, food[i]);
        cx.fillStyle = v('--plant');
        cx.fillRect(x * C, y * C, C, C);
        cx.globalAlpha = 1;
        if (poison[i]) {
          cx.fillStyle = '#c0263d';
          cx.fillRect(x * C + 2, y * C + 2, 3, 3);
          cx.fillRect(x * C + 6, y * C + 5, 3, 3);
        }
      }
    }
  for (const a of ag) {
    const S = SP[a.sp],
      X = a.x * C + C / 2,
      Y = a.y * C + C / 2,
      gr = clamp(a.age / S.mat, 0.3, 1);
    cx.globalAlpha = a.asleep ? 0.45 : 1;
    if (a.sp === 0) {
      cx.fillStyle = a.sex ? v('--f') : v('--m');
      cx.beginPath();
      cx.arc(X, Y, 1.5 + 3.2 * gr, 0, 7);
      cx.fill();
    } else if (a.sp === 1) {
      cx.fillStyle = v('--herb');
      cx.beginPath();
      cx.ellipse(X, Y, 2 + 3 * gr, 1.5 + 2.2 * gr, 0, 0, 7);
      cx.fill();
    } else if (a.sp === 3) {
      cx.fillStyle = v('--fish');
      const k = 1.5 + 2 * gr;
      cx.beginPath();
      cx.ellipse(X, Y, k * 1.4, k * 0.7, 0, 0, 7);
      cx.fill();
      cx.beginPath();
      cx.moveTo(X - k * 1.2, Y);
      cx.lineTo(X - k * 2.2, Y - k * 0.8);
      cx.lineTo(X - k * 2.2, Y + k * 0.8);
      cx.fill();
    } else {
      cx.fillStyle = v('--bad');
      const k = 3 + 4 * gr;
      cx.beginPath();
      cx.moveTo(X, Y - k);
      cx.lineTo(X + k * 0.85, Y);
      cx.lineTo(X, Y + k);
      cx.lineTo(X - k * 0.85, Y);
      cx.fill();
    }
    cx.globalAlpha = 1;
  }
  const night = isNight();
  if (night) {
    cx.fillStyle = 'rgba(8,16,48,.3)';
    cx.fillRect(0, 0, W * C, H * C);
  }
  if (sel && sel.gone) {
    sel = null;
    fillIdeas();
  }
  if (sel) {
    const S = SP[sel.sp];
    cx.strokeStyle = v('--ink');
    cx.lineWidth = 2;
    cx.beginPath();
    cx.arc(sel.x * C + C / 2, sel.y * C + C / 2, 8, 0, 7);
    cx.stroke();
    // how far it can see right now (the same range its senses use)
    cx.save();
    cx.strokeStyle = v('--ink');
    cx.globalAlpha = 0.6;
    cx.lineWidth = 1;
    cx.setLineDash([4, 4]);
    cx.beginPath();
    cx.arc(sel.x * C + C / 2, sel.y * C + C / 2, sightRange(sel, night) * C, 0, 7);
    cx.stroke();
    cx.restore();
    const stage =
        sel.age < S.mat * S.wn
          ? 'baby'
          : sel.age < S.mat
            ? 'child'
            : sel.age < S.smat
              ? 'teenager (too young to mate)'
              : sel.age < sel.lf * 0.7
                ? 'adult'
                : 'elder',
      pc = (x) => (x * 100).toFixed(0) + '%';
    $('ithink').innerHTML = thinkHTML(sel, S, pc);
    $('idoing').innerHTML = doingHTML(sel, S, stage, pc, night);
  }
  const c = [0, 0, 0, 0];
  ag.forEach((a) => c[a.sp]++);
  const asl = ag.filter((a) => a.asleep),
    sc = [0, 0, 0, 0];
  asl.forEach((a) => sc[a.sp]++);
  const st = [
    [c[0], 'People'],
    [c[1], 'Herbivores'],
    [c[2], 'Predators'],
    [c[3], 'Fish'],
    [fished, 'Fish caught by people'],
    [maxGen, 'Latest human generation'],
    ['Year ' + Math.floor(tick / TY) + ', day ' + dayN() + (night ? ', night' : ', day'), 'Time'],
    [sc[0] + ' / ' + sc[1] + ' / ' + sc[2], 'Asleep now (people / herbivores / predators)'],
    [kills[0] + ' / ' + kills[1], 'Predator kills (people / herbivores)'],
    [nLessons, 'Lessons learned'],
  ];
  $('stats').innerHTML = st
    .map((x) => '<div class="stat"><b>' + x[0] + '</b><span>' + x[1] + '</span></div>')
    .join('');
  $('hud').innerHTML = [
    c[0] + ' people',
    c[1] + ' herbivores',
    c[2] + ' predators',
    c[3] + ' fish',
    'Year ' + Math.floor(tick / TY) + ', day ' + dayN() + (night ? ' (night)' : ''),
  ]
    .map((t) => '<span>' + t + '</span>')
    .join('');
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
function loop() {
  if (running) {
    acc += +$('spd').value / 3;
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
    ? 'Whisper to ' + (sel.name || 'this ' + SP[sel.sp].n.toLowerCase()) + '…'
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
    (off.length ? ' A ' + SP[sel.sp].n.toLowerCase() + ' has no use for: ' + off.join(', ') + '.' : '') +
    (sel.asleep ? ' It will reach them in their sleep.' : ' It will come in sleep or a quiet moment.');
};
$('wtxt').onkeydown = (e) => {
  if (e.key === 'Enter') $('wgo').onclick();
};
cv.onclick = (e) => {
  const r = cv.getBoundingClientRect(),
    k = (W * C) / r.width,
    qx = ((e.clientX - r.left) * k) / C,
    qy = ((e.clientY - r.top) * k) / C;
  let b = null,
    bd = 6;
  for (const a of ag) {
    const d = (a.x + 0.5 - qx) ** 2 + (a.y + 0.5 - qy) ** 2;
    if (d < bd) {
      bd = d;
      b = a;
    }
  }
  sel = b;
  fillIdeas();
};
// ---------- full-screen world, tabs ----------
function fit() {
  const r = $('stage').getBoundingClientRect(),
    pad = 16,
    asp = W / H;
  let w = r.width - pad,
    h = w / asp;
  if (h > r.height - pad) {
    h = r.height - pad;
    w = h * asp;
  }
  if (w < 50) return;
  const d = window.devicePixelRatio || 1;
  cv.style.width = w + 'px';
  cv.style.height = h + 'px';
  cv.width = Math.round(w * d);
  cv.height = Math.round(h * d);
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
      (sel.name || SP[sel.sp].n) +
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
fit();
loop();
