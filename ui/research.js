// Genesis Research: the research log (docs/FINDINGS.md) and the changelog (CHANGELOG.md), shown version
// by version, read straight from those files so the page is always up to date with them.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

(async () => {
  const { render, inline, esc } = window.GenesisMD;
  const $ = (id) => document.getElementById(id);
  const LOG = new URL('docs/FINDINGS.md', location.href).href,
    REPO = 'https://github.com/malvika123/genesis';
  const get = async (p) => {
    const r = await fetch(p, { cache: 'no-cache' });
    if (!r.ok) throw new Error(p + ': ' + r.status);
    return r.text();
  };
  let findings, changes, cff;
  try {
    [findings, changes, cff] = await Promise.all([get('docs/FINDINGS.md'), get('CHANGELOG.md'), get('CITATION.cff').catch(() => '')]);
  } catch (e) {
    $('vlist').innerHTML = `<p class="err">Could not load the research log (${esc(e.message)}). It is also on <a href="${REPO}/blob/develop/docs/FINDINGS.md">GitHub</a>.</p>`;
    return;
  }

  // ---------- the research log, in its parts ----------
  const parts = {};
  let intro = '';
  {
    const chunks = findings.split(/^## /m);
    intro = chunks.shift();
    for (const c of chunks) {
      const nl = c.indexOf('\n');
      parts[c.slice(0, nl).trim().toLowerCase()] = c.slice(nl + 1);
    }
  }
  const part = (start) => {
    const k = Object.keys(parts).find((t) => t.startsWith(start));
    return k ? parts[k] : '';
  };
  // the question, and the opening paragraph
  const q = intro.match(/^>.*$/m);
  $('question').innerHTML = q ? render(q[0], LOG) : '';
  const firstPara = intro
    .replace(/^#.*$/m, '')
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith('>'));
  $('intro').innerHTML = firstPara.map((p) => inline(p.replace(/\n/g, ' '), LOG)).join(' ');

  // the summary table (and any lines after it)
  $('summary').innerHTML = render(part('summary').replace(/^---\s*$/m, ''), LOG);
  // badges in the summary's strength column
  $('summary')
    .querySelectorAll('td:last-child')
    .forEach((td) => {
      const k = strengthOf(td.textContent);
      if (k) td.innerHTML = `<span class="badge b-${k}">${esc(td.textContent.trim())}</span>`;
    });
  $('method').innerHTML = render(part('how the tests'), LOG);
  $('open').innerHTML = render(part('open questions'), LOG);

  // ---------- each entry ----------
  function strengthOf(t) {
    const s = t.toLowerCase().trim();
    if (/^weak[–-]moderate/.test(s)) return 'weak-moderate';
    for (const k of ['strong', 'moderate', 'weak', 'none']) if (s.startsWith(k)) return k;
    return null;
  }
  const entries = part('log')
    .split(/^### /m)
    .slice(1)
    .map((c) => {
      const nl = c.indexOf('\n'),
        head = c.slice(0, nl).trim(),
        body = c.slice(nl + 1).replace(/^---\s*$/m, '').trim(),
        m = head.match(/^(\d+)\.\s*(.*?)(?:\s+—\s+(.*))?$/) || [null, '', head, ''];
      // its labelled paragraphs: **Version.** **Data.** **Added.** **Result.** **Strength.** …
      const para = {};
      for (const p of body.split(/\n\s*\n/)) {
        const mm = p.match(/^\*\*([^*]+?)\.\*\*\s*([\s\S]*)$/);
        if (mm) para[mm[1].toLowerCase()] = mm[2].replace(/\n/g, ' ');
      }
      // the strength: its own paragraph, or "**Strength:** x" within another
      let st = para.strength || '';
      if (!st) {
        const sm = body.match(/\*\*Strength[.:]\*\*\s*([^\n]*)/i);
        st = sm ? sm[1] : '';
      }
      const version = (para.version || '').match(/^(Unreleased|\d+\.\d+\.\d+)/i);
      const commits = [...(para.version || '').matchAll(/`([0-9a-f]{7,})`/g)].map((x) => x[1]);
      return {
        n: m[1],
        title: m[2],
        date: m[3] || '',
        body,
        para,
        strength: strengthOf(st) || 'none',
        strengthText: st.split(/[.;(]/)[0].trim(),
        version: version ? (version[1].toLowerCase() === 'unreleased' ? 'Unreleased' : version[1]) : 'Unreleased',
        commits,
      };
    });

  // ---------- the changelog, version by version ----------
  const versions = changes
    .split(/^## /m)
    .slice(1)
    .map((c) => {
      const nl = c.indexOf('\n'),
        head = c.slice(0, nl).trim(),
        m = head.match(/^(\S+)(?:\s+—\s+(.*))?$/);
      const items = [];
      for (const l of c.slice(nl + 1).split('\n')) {
        if (/^- /.test(l)) items.push(l.slice(2));
        else if (/^\s+\S/.test(l) && items.length) items[items.length - 1] += ' ' + l.trim();
      }
      return { name: m ? m[1] : head, date: m && m[2] ? m[2] : '', items };
    });

  // ---------- the page ----------
  const nVer = new Set(entries.map((e) => e.version)).size;
  $('stats').innerHTML =
    `<div><b>${entries.length}</b><span class="mute">results</span></div>` +
    `<div><b>${entries.filter((e) => ['strong', 'moderate'].includes(e.strength)).length}</b><span class="mute">moderate or strong</span></div>` +
    `<div><b>${versions.length}</b><span class="mute">versions</span></div>` +
    `<div><b>${esc(entries.length ? entries[entries.length - 1].date || '–' : '–')}</b><span class="mute">latest result</span></div>`;

  // filter by strength
  const KINDS = [
    ['all', 'All results'],
    ['strong', 'Strong'],
    ['moderate', 'Moderate'],
    ['weak-moderate', 'Weak–moderate'],
    ['weak', 'Weak'],
    ['none', 'No effect'],
  ];
  let filter = 'all';
  $('filters').innerHTML = KINDS.filter(([k]) => k === 'all' || entries.some((e) => e.strength === k))
    .map(([k, t]) => `<button class="btn" data-f="${k}" aria-pressed="${k === filter}">${t}</button>`)
    .join('');
  $('filters').addEventListener('click', (e) => {
    const k = e.target.dataset.f;
    if (!k) return;
    filter = k;
    $('filters').querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.f === k));
    drawVersions();
  });

  const LABEL = { strong: 'Strong', moderate: 'Moderate', 'weak-moderate': 'Weak–moderate', weak: 'Weak', none: 'No effect' };
  function card(e) {
    const links = [];
    // its data files and a Lab link, from the **Data.** paragraph
    const data = e.para.data || '';
    for (const mm of data.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)) {
      const url = new URL(mm[2], LOG).href;
      if (/lab\.html/.test(url)) links.push(`<a class="btn go" href="${esc(url)}">Re-run in the Lab</a>`);
      else if (/\.(csv|jsonl|json|txt)$/.test(url)) links.push(`<a class="btn" href="${esc(url)}" download>⬇ ${esc(mm[1])} (${url.split('.').pop().toUpperCase()})</a>`);
    }
    const cmd = data.match(/`(node tools\/experiment\.js[^`]*)`/);
    if (cmd) links.push(`<button class="btn" data-copy="${esc(cmd[1])}">Copy command</button>`);
    for (const c of e.commits) links.push(`<a class="btn" href="${REPO}/commit/${c}" target="_blank" rel="noopener">Commit ${c}</a>`);
    const result = e.para.result || e.para.interpretation || e.para.problem || '';
    return `<article class="card" id="finding-${e.n}">
      <div class="top"><span class="num">#${esc(e.n)}</span><h4>${inline(e.title, LOG)}</h4><span class="badge b-${e.strength}" title="Strength of the evidence: ${esc(e.strengthText)}">${LABEL[e.strength]}</span></div>
      <div class="meta">${esc(e.date)}${e.para.test ? ' · ' + inline(e.para.test.split('. ')[0] + '.', LOG) : ''}</div>
      <div class="result">${inline(result, LOG)}</div>
      ${e.para.lesson ? `<p class="result"><strong>Lesson.</strong> ${inline(e.para.lesson, LOG)}</p>` : ''}
      <details><summary>The full entry: what was added, the evidence from the real world, the test</summary><div class="full">${render(e.body, LOG)}</div></details>
      <div class="actions">${links.join('')}</div>
    </article>`;
  }

  function drawVersions() {
    const shown = entries.filter((e) => filter === 'all' || e.strength === filter);
    $('vlist').innerHTML = versions
      .map((v) => {
        const mine = shown.filter((e) => e.version === v.name);
        if (filter !== 'all' && !mine.length) return '';
        const title = v.name === 'Unreleased' ? 'In development (live on the site, not yet a release)' : 'Version ' + esc(v.name);
        const many = v.items.length;
        return `<div class="version">
          <div class="vhead"><h3>${title}</h3><span class="mute">${esc(v.date)}${v.name !== 'Unreleased' ? ` · <a href="${REPO}/releases/tag/v${esc(v.name)}" target="_blank" rel="noopener">release</a>` : ''}</span></div>
          ${many ? `<details class="added"${v.name === 'Unreleased' ? '' : ''}><summary>What was added (${many} change${many === 1 ? '' : 's'})</summary><ul>${v.items.map((t) => '<li>' + inline(t, location.href) + '</li>').join('')}</ul></details>` : ''}
          ${mine.length ? `<div class="cards">${mine.map(card).join('')}</div>` : `<p class="empty">No survival tests were logged for this version${v.name === '0.7.0' ? ' (the experiment runner itself was added in it)' : ''}.</p>`}
        </div>`;
      })
      .join('');
  }
  drawVersions();

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-copy]');
    if (!t) return;
    const text = t.dataset.copy;
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
      .then(() => {
        const was = t.textContent;
        t.textContent = 'Copied';
        setTimeout(() => (t.textContent = was), 1500);
      })
      .catch(() => prompt('Copy the command:', text));
  });

  // ---------- citing ----------
  const doi = (cff.match(/^doi:\s*(\S+)/m) || [])[1],
    ver = (cff.match(/^version:\s*(\S+)/m) || [])[1];
  $('citebtn').onclick = () => {
    const c = $('cite');
    c.hidden = !c.hidden;
    if (!c.hidden && !c.innerHTML)
      c.innerHTML =
        `<p class="mute" style="margin-top:12px">Please cite Genesis, and state the version or commit you used (each result above names its commit).</p>` +
        `<pre>Sen, M. (2026). Genesis: an autonomous world of learning creatures${ver ? ' (version ' + esc(ver) + ')' : ''} [Computer software].${doi ? ' https://doi.org/' + esc(doi) : ''}</pre>` +
        `<div class="row">${doi ? `<a class="btn" href="https://doi.org/${esc(doi)}" target="_blank" rel="noopener">DOI ${esc(doi)}</a>` : ''}<a class="btn" href="CITATION.cff" download>CITATION.cff</a></div>`;
  };

  // jump to a finding named in the address (research.html#finding-8)
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) {
      const d = el.querySelector('details');
      if (d) d.open = true;
      el.scrollIntoView();
    }
  }
})();
