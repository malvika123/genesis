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
    cx.font = '12px sans-serif';
    const tw = cx.measureText(sel.th).width + 12,
      bx = clamp(sel.x * C - tw / 2, 2, W * C - tw - 2),
      by = Math.max(2, sel.y * C - 30);
    cx.fillStyle = v('--panel');
    cx.fillRect(bx, by, tw, 20);
    cx.strokeStyle = v('--line');
    cx.lineWidth = 1;
    cx.strokeRect(bx, by, tw, 20);
    cx.fillStyle = v('--ink');
    cx.fillText(sel.th, bx + 6, by + 14);
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
    $('ibody').innerHTML =
      (sel.name ? '<b>' + sel.name + '</b>, ' : '') +
      S.n +
      ', ' +
      (sel.sex ? 'female' : 'male') +
      ', ' +
      stage +
      ', age ' +
      (sel.age / TY).toFixed(1) +
      ' years (lifespan ' +
      (sel.lf / TY).toFixed(0) +
      '), generation ' +
      sel.gen +
      '<br>Energy ' +
      sel.e.toFixed(0) +
      ', water ' +
      sel.w.toFixed(0) +
      ', health ' +
      sel.hp.toFixed(0) +
      ', sleepiness ' +
      pc(sel.sl) +
      (sel.asleep ? ' (asleep)' : '') +
      '<br>Feelings: fear ' +
      pc(sel.fear) +
      ', loneliness ' +
      (sel.metAny ? pc(sel.lo) : 'none (has never met another of its kind)') +
      ', protectiveness ' +
      pc(sel.pr) +
      ', desire for a partner ' +
      pc(sel.lu) +
      ', curiosity ' +
      pc(Math.min(1, sel.g.c * S.cur)) +
      ' (explored ' +
      sel.vc +
      ' of 160 areas)' +
      '<br>Remembers: ' +
      (sel.mw
        ? 'water to the ' +
          CP[(Math.round(Math.atan2(sel.mw.y - sel.y, sel.mw.x - sel.x) / (Math.PI / 4)) + 8) % 8]
        : 'no water') +
      ', ' +
      (sel.mf
        ? 'food to the ' +
          CP[(Math.round(Math.atan2(sel.mf.y - sel.y, sel.mf.x - sel.x) / (Math.PI / 4)) + 8) % 8]
        : 'no food') +
      ' (memory lasts about ' +
      S.mem +
      ' days)' +
      '<br>Sight: about ' +
      sightRange(sel, night).toFixed(1) +
      ' cells (' +
      Math.round(sightRange(sel, night) * 3) +
      ' km) right now' +
      (sel.asleep ? ', short because it is asleep' : night ? ', shorter because it is night' : '') +
      ' (dashed circle on the map)' +
      '<br>Brain: ' +
      S.nh +
      ' neurons; ' +
      (S.adl >= 1 ? 'keeps learning well into adulthood' : 'learning slows once grown') +
      '<br>Its own forecast: ' +
      (sel.V > 0.15 ? 'things are looking up' : sel.V < -0.15 ? 'things are getting worse' : 'steady') +
      '<br>Personality: ' +
      (sel.g.b > 1.1 ? 'cautious' : sel.g.b < 0.85 ? 'bold' : 'steady') +
      ', ' +
      (sel.g.so > 1.2 ? 'sociable' : sel.g.so < 0.8 ? 'loner' : 'average sociability') +
      (sel.shared ? ', has shared food ' + sel.shared + ' times' : '') +
      (sel.mind ? mindHTML(sel, sel.mind) : '<br>Its mind: wait a moment for the next step…') +
      '<br>Lessons so far: ' +
      (sel.les.length ? sel.les.join('; ') : 'none yet') +
      '<br>How much learning has rewired its brain: ' +
      sel.learn.toFixed(1);
  } else
    $('ibody').textContent =
      'Click a creature on the map to see its body, feelings, lessons and what it is doing.';
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
  $('wmsg').textContent = 'Type anything. It reaches them in sleep or a quiet moment, as their own thought.';
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
      $('dp-whisper').hidden = b.dataset.dt !== 'whisper';
      $('dp-mind').hidden = b.dataset.dt !== 'mind';
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
