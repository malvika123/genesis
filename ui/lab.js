// Genesis Lab: the page where anyone can run seeded experiments in the browser, compare two setups on
// the same seeds, and take the results away as CSV (the same table the command-line runner writes).
//
// Copyright (c) 2026 Malvika Sen. MIT License.

(() => {
  const X = window.GenesisExperiment;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const OPTS = X.SETTINGS.filter((s) => s.key !== 'days');
  const KEEP = 'genesis-lab-last';
  let version = '?';
  fetch('package.json')
    .then((r) => r.json())
    .then((p) => (version = p.version))
    .catch(() => {});

  // ---------- the form ----------
  const cores = Math.max(1, navigator.hardwareConcurrency || 2);
  for (let i = 1; i <= cores; i++) $('workers').insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`);
  $('workers').value = String(Math.max(1, cores - 1));

  const defaults = () => Object.fromEntries(OPTS.map((s) => [s.key, s.def]));
  // start with the real Earth, as on the main page, and an example comparison: B starts the band anywhere
  let vals = { A: { ...defaults(), earth: true }, B: { ...defaults(), earth: true, homeland: false } };

  function drawSetups() {
    const two = $('compare').checked;
    $('setups').className = 'setups' + (two ? ' two' : '');
    $('setups').innerHTML = (two ? ['A', 'B'] : ['A'])
      .map(
        (k) => `<div class="setup ${k.toLowerCase()}"><h3 class="c${k.toLowerCase()}">Setup ${k}</h3>` +
          OPTS.map((s) => {
            const v = vals[k][s.key],
              on = s.kind === 'num' ? '' : v ? 'checked' : '';
            const input =
              s.kind === 'num'
                ? `<input type="number" data-s="${k}" data-k="${s.key}" min="${s.min}" max="${s.max}" value="${v}" />`
                : `<input type="checkbox" data-s="${k}" data-k="${s.key}" ${on} />`;
            return s.kind === 'num'
              ? `<label class="opt" data-row="${s.key}">${esc(s.label)} ${input}</label>`
              : `<label class="opt" data-row="${s.key}">${input} ${esc(s.label)}</label>`;
          }).join('') +
          '</div>'
      )
      .join('');
    markDiffs();
  }
  function markDiffs() {
    const two = $('compare').checked;
    let n = 0;
    for (const s of OPTS) {
      const d = two && vals.A[s.key] !== vals.B[s.key];
      if (d) n++;
      document.querySelectorAll(`[data-row="${s.key}"]`).forEach((el) => el.classList.toggle('diff', d));
    }
    plan(n);
  }
  function plan(nDiff) {
    let seeds = [];
    try {
      seeds = X.seedList($('seeds').value);
    } catch {}
    const two = $('compare').checked,
      worlds = seeds.length * (two ? 2 : 1);
    let t = `${worlds} world${worlds === 1 ? '' : 's'} × ${$('days').value} days.`;
    if (two && nDiff === 0) t += ' A and B are the same; change something in B to compare.';
    else if (two && nDiff > 1) t += ` A and B differ in ${nDiff} ways, so a difference can't be put down to one of them.`;
    $('plan').textContent = t;
  }
  $('setups').addEventListener('input', (e) => {
    const el = e.target,
      s = OPTS.find((o) => o.key === el.dataset.k);
    if (!s) return;
    vals[el.dataset.s][s.key] = s.kind === 'num' ? Number(el.value) : el.checked;
    markDiffs();
  });
  $('compare').addEventListener('change', drawSetups);
  $('seeds').addEventListener('input', () => markDiffs());
  $('days').addEventListener('input', () => markDiffs());

  // ---------- running ----------
  let run = null; // the experiment in progress, or the last one

  function start() {
    let seeds;
    try {
      seeds = X.seedList($('seeds').value);
    } catch (e) {
      return alertLine(e.message);
    }
    if (!seeds.length) return alertLine('Give at least one seed.');
    const days = Math.max(1, Math.min(2000, Math.round(Number($('days').value) || 1)));
    const two = $('compare').checked,
      sets = two ? ['A', 'B'] : ['A'];
    // A and B take turns seed by seed, so a stopped run still compares like with like
    const jobs = [];
    for (const seed of seeds) for (const k of sets) jobs.push({ id: jobs.length, set: k, seed, day: 0, row: null });
    run = {
      seedsText: $('seeds').value.trim(),
      days,
      sets,
      values: Object.fromEntries(sets.map((k) => [k, { ...vals[k], days }])),
      jobs,
      next: 0,
      t0: performance.now(),
      workers: [],
      stopped: false,
      version,
    };
    $('progress').hidden = false;
    $('results').hidden = true;
    $('tiles').innerHTML = jobs
      .map((j) => `<div class="tile ${j.set.toLowerCase()}" id="t${j.id}"><div>${two ? j.set + ' · ' : ''}seed ${j.seed}</div><div class="n">…</div><div class="fill"></div></div>`)
      .join('');
    $('run').disabled = true;
    $('stop').disabled = false;
    const n = Math.min(Number($('workers').value) || 1, jobs.length);
    for (let i = 0; i < n; i++) {
      const w = new Worker('ui/lab-worker.js');
      w.onmessage = (ev) => onMsg(w, ev.data);
      w.onerror = (ev) => alertLine('A worker failed: ' + (ev.message || 'unknown error'));
      run.workers.push(w);
      give(w);
    }
    progress();
  }
  function give(w) {
    if (run.next >= run.jobs.length) {
      w.terminate();
      run.workers = run.workers.filter((x) => x !== w);
      if (!run.workers.length) finish();
      return;
    }
    const j = run.jobs[run.next++];
    w.postMessage({ type: 'run', id: j.id, seed: j.seed, values: run.values[j.set] });
  }
  function onMsg(w, m) {
    if (!run || run.stopped) return;
    const j = run.jobs[m.id];
    if (m.type === 'day') {
      j.day = m.day;
      const t = $('t' + j.id);
      if (t) {
        t.querySelector('.fill').style.width = (100 * m.day) / run.days + '%';
        t.querySelector('.n').textContent = 'day ' + m.day;
      }
      progress();
    } else if (m.type === 'done') {
      j.row = m.row;
      j.day = run.days;
      const t = $('t' + j.id);
      if (t) {
        t.querySelector('.fill').style.width = '100%';
        t.querySelector('.n').textContent = m.row.people_alive + (m.row.people_alive === 1 ? ' person' : ' people');
        t.classList.toggle('out', m.row.people_alive === 0);
        t.title = `${m.row.people_alive} people alive after ${m.row.days_run} days`;
      }
      progress();
      results();
      give(w);
    } else if (m.type === 'error') {
      alertLine('A world failed (seed ' + j.seed + '): ' + m.message.split('\n')[0]);
      stop();
    }
  }
  function progress() {
    const busy = run.workers.length > 0;
    $('ptitle').textContent = busy ? 'Running' : run.stopped ? 'Stopped' : 'Finished';
    const total = run.jobs.length * run.days,
      done = run.jobs.reduce((t, j) => t + j.day, 0),
      worlds = run.jobs.filter((j) => j.row).length;
    $('pbar').style.width = (100 * done) / total + '%';
    const el = (performance.now() - run.t0) / 1000;
    let eta = '';
    if (done > 0 && done < total) {
      const left = (el / done) * (total - done);
      eta = ' · about ' + (left < 90 ? Math.round(left) + ' s' : left < 5400 ? Math.round(left / 60) + ' min' : (left / 3600).toFixed(1) + ' h') + ' left';
    }
    $('pinfo').textContent = `${worlds} of ${run.jobs.length} worlds finished · ${Math.round(el)} s so far${eta}` + (run.stopped ? ' · stopped' : '');
  }
  function stop() {
    if (!run) return;
    run.stopped = true;
    run.workers.forEach((w) => w.terminate());
    run.workers = [];
    finish();
  }
  function finish() {
    $('run').disabled = false;
    $('stop').disabled = true;
    progress();
    results();
    keep();
  }
  function alertLine(t) {
    $('progress').hidden = false;
    $('pinfo').textContent = t;
  }
  $('run').addEventListener('click', start);
  $('stop').addEventListener('click', stop);

  // ---------- results ----------
  const rowsOf = (k) => run.jobs.filter((j) => j.set === k && j.row).map((j) => j.row).sort((a, b) => a.seed - b.seed);
  const f1 = (x) => (x === null || x === undefined ? '–' : (Math.round(x * 10) / 10).toFixed(1));

  function results() {
    const sets = run.sets.filter((k) => rowsOf(k).length);
    if (!sets.length) return;
    $('results').hidden = false;
    const S = Object.fromEntries(sets.map((k) => [k, X.stats(rowsOf(k))]));
    const two = sets.length === 2,
      lab = (k) => (run.sets.length > 1 ? `<span class="c${k.toLowerCase()}">${k}</span> ` : '');

    // headline cards
    let cards = '';
    for (const k of sets) {
      const s = S[k];
      cards += `<div class="card"><div class="k">${lab(k)}People alive at the end (mean of ${s.worlds} world${s.worlds === 1 ? '' : 's'})</div>
        <div class="big c${k.toLowerCase()}">${f1(s.alive.mean)}${s.alive.se !== null ? ` <span class="k">± ${f1(s.alive.se)}</span>` : ''}</div>
        <div class="k">median ${s.alive.median} · ${s.diedOut} died out · ${f1(s.hunters.mean)} predators, ${f1(s.plantEaters.mean)} plant-eaters at the end</div></div>`;
    }
    $('cards').innerHTML = cards;

    // A against B
    let v = '';
    if (two) {
      const a = S.A.alive,
        b = S.B.alive,
        d = a.mean - b.mean;
      if (a.se !== null && b.se !== null) {
        const se = Math.sqrt(a.se * a.se + b.se * b.se),
          lo = d - 2 * se,
          hi = d + 2 * se;
        const clear = lo > 0 || hi < 0;
        v = `<p class="verdict"><b>A − B: ${d >= 0 ? '+' : ''}${f1(d)} people</b> (likely between ${f1(lo)} and ${f1(hi)}). ` +
          (clear
            ? `With ${Math.min(a.n, b.n)} worlds each, that is a <b>clear difference</b>: ${d > 0 ? 'more' : 'fewer'} people survive in A.`
            : `With ${Math.min(a.n, b.n)} worlds each, A and B <b>can't be told apart</b> yet; run more seeds to narrow the range.`) +
          ` Die-outs: ${S.A.diedOut} of ${S.A.worlds} in A, ${S.B.diedOut} of ${S.B.worlds} in B.</p>`;
      }
    }
    $('verdict').innerHTML = v;

    // world by world: each seed's people alive in A and B, joined
    $('dots').innerHTML = dots(sets);

    // causes of death
    const causes = X.CAUSES.filter((c) => sets.some((k) => S[k].dead[c]));
    $('deaths').innerHTML =
      `<tr><th>Cause</th>${sets.map((k) => `<th>${lab(k)}deaths</th><th>${lab(k)}per world</th>`).join('')}</tr>` +
      (causes.length
        ? causes.map((c) => `<tr><td>${esc(c)}</td>${sets.map((k) => `<td>${S[k].dead[c] || 0}</td><td>${f1((S[k].dead[c] || 0) / S[k].worlds)}</td>`).join('')}</tr>`).join('')
        : `<tr><td colspan="${1 + 2 * sets.length}">No one has died yet.</td></tr>`);

    // discoveries
    $('firsts').innerHTML =
      `<tr><th>Someone…</th>${sets.map((k) => `<th>${lab(k)}worlds</th><th>${lab(k)}median day</th>`).join('')}</tr>` +
      X.MILESTONES.map(
        (m) => `<tr><td>${esc(X.MILESTONE_NAMES[m] || m)}</td>${sets.map((k) => {
          const f = S[k].firsts[m];
          return `<td>${f.worlds} / ${S[k].worlds}</td><td>${f.worlds ? f.median : '–'}</td>`;
        }).join('')}</tr>`
      ).join('');

    // each world
    const top = (r) => {
      const e = Object.entries(r.died).sort((a, b) => b[1] - a[1])[0];
      return e ? `${e[0]} (${e[1]})` : '–';
    };
    $('worlds').innerHTML =
      '<tr><th>World</th><th>Days</th><th>People</th><th>Generations</th><th>Plant-eaters</th><th>Predators</th><th>Main cause of death</th></tr>' +
      sets
        .flatMap((k) =>
          rowsOf(k).map(
            (r) => `<tr><td>${lab(k)}seed ${r.seed}</td><td>${r.days_run}</td><td>${r.people_alive}</td><td>${r.generations}</td><td>${r.plant_eaters}</td><td>${r.hunters}</td><td>${esc(top(r))}</td></tr>`
          )
        )
        .join('');

    // downloads and the command line
    $('downloads').innerHTML = sets.map((k) => `<button data-csv="${k}">Download CSV${run.sets.length > 1 ? ' for ' + k : ''}</button>`).join('');
    $('cmd').textContent = run.sets
      .map((k) => (run.sets.length > 1 ? `# ${k}\n` : '') + X.command(X.build(run.values[k]), run.seedsText, 1) + ` --out ${k === 'A' ? 'a' : 'b'}.csv`)
      .join('\n');
  }

  function dots(sets) {
    const seeds = [...new Set(run.jobs.filter((j) => j.row).map((j) => j.seed))].sort((a, b) => a - b);
    if (!seeds.length) return '';
    const by = (k, s) => run.jobs.find((j) => j.set === k && j.seed === s && j.row);
    let max = 1;
    for (const j of run.jobs) if (j.row) max = Math.max(max, j.row.people_alive);
    max = Math.ceil(max / 5) * 5;
    const L = 34,
      R = 10,
      T = 10,
      B = 28,
      step = Math.max(22, Math.min(48, 640 / seeds.length)),
      w = L + R + step * seeds.length,
      h = 180,
      y = (v) => T + (h - T - B) * (1 - v / max),
      x = (i) => L + step * (i + 0.5);
    let g = '';
    for (let v = 0; v <= max; v += Math.max(5, Math.ceil(max / 25) * 5)) g += `<line x1="${L}" x2="${w - R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" /><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
    seeds.forEach((s, i) => {
      const a = by('A', s),
        b = by('B', s);
      if (a && b) g += `<line x1="${x(i)}" x2="${x(i)}" y1="${y(a.row.people_alive)}" y2="${y(b.row.people_alive)}" stroke="var(--mute)" stroke-width="1.5" opacity=".5" />`;
      for (const k of sets) {
        const j = by(k, s);
        if (j) g += `<circle cx="${x(i) + (sets.length > 1 ? (k === 'A' ? -3 : 3) : 0)}" cy="${y(j.row.people_alive)}" r="5" fill="var(--${k.toLowerCase()})"><title>${run.sets.length > 1 ? k + ', ' : ''}seed ${s}: ${j.row.people_alive} people alive</title></circle>`;
      }
      g += `<text x="${x(i)}" y="${h - 10}" text-anchor="middle">${s}</text>`;
    });
    return `<svg width="${w}" height="${h}" role="img" aria-label="People alive at the end of each world">${g}</svg><div class="mute">seed →${run.sets.length > 1 ? ' · <span class="ca">●</span> A · <span class="cb">●</span> B, joined when both have run' : ''}</div>`;
  }

  $('downloads').addEventListener('click', (e) => {
    const k = e.target.dataset && e.target.dataset.csv;
    if (!k) return;
    const S = X.build(run.values[k]);
    const text = X.csv(rowsOf(k), S, {
      version: run.version,
      commit: 'unknown',
      runtime: 'browser (Genesis Lab), ' + (navigator.userAgent.match(/(Firefox|Edg|Chrome|Safari)\/[\d.]+/) || ['browser'])[0],
      seeds: run.seedsText,
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' }));
    a.download = `genesis-${k}-seeds-${run.seedsText.replace(/[^\d-]+/g, '_')}-${run.days}d.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  // ---------- remember the last experiment in this browser ----------
  function keep() {
    try {
      const jobs = run.jobs.map((j) => ({ id: j.id, set: j.set, seed: j.seed, day: j.row ? run.days : 0, row: j.row }));
      localStorage.setItem(KEEP, JSON.stringify({ ...run, workers: [], jobs, compare: run.sets.length > 1, vals }));
    } catch {}
  }
  function restore() {
    try {
      const k = JSON.parse(localStorage.getItem(KEEP) || 'null');
      if (!k || !k.jobs) return;
      vals = { A: { ...defaults(), ...k.vals.A }, B: { ...defaults(), ...k.vals.B } };
      $('seeds').value = k.seedsText;
      $('days').value = k.days;
      $('compare').checked = !!k.compare;
      run = { ...k, workers: [], t0: performance.now() };
      if (run.jobs.some((j) => j.row)) results();
    } catch {}
  }

  restore();
  drawSetups();
  if (location.protocol === 'file:')
    alertLine('Open this page from a web server (for example run "npx serve" in the Genesis folder): browsers do not let a page opened as a file start background workers.');
})();
