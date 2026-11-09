// A small Markdown reader for Genesis's own documents (the research log and the changelog): headings,
// paragraphs, lists, tables, quotes, code, links, bold and italics. Enough for what the project writes,
// with no outside library.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

(function (root) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  // inline: `code`, **bold**, *italic*, [text](url); base resolves relative links (as GitHub would)
  function inline(t, base) {
    const codes = [];
    t = t.replace(/`([^`]+)`/g, (_, c) => '\u0000' + (codes.push(c) - 1) + '\u0000');
    t = esc(t);
    t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, txt, href) => {
      let u = href.replace(/&amp;/g, '&');
      try {
        u = new URL(u, base || location.href).href;
      } catch {}
      const ext = /^https?:/.test(u) && !u.startsWith(location.origin);
      return `<a href="${esc(u)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${txt}</a>`;
    });
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    return t.replace(/\u0000(\d+)\u0000/g, (_, i) => '<code>' + esc(codes[+i]) + '</code>');
  }

  function render(src, base) {
    const L = src.replace(/\r/g, '').split('\n'),
      out = [];
    let i = 0;
    const para = [];
    const flush = () => {
      if (para.length) out.push('<p>' + inline(para.join(' '), base) + '</p>');
      para.length = 0;
    };
    while (i < L.length) {
      const l = L[i];
      if (/^```/.test(l)) {
        flush();
        const code = [];
        for (i++; i < L.length && !/^```/.test(L[i]); i++) code.push(L[i]);
        i++;
        out.push('<pre><code>' + esc(code.join('\n')) + '</code></pre>');
        continue;
      }
      let m;
      if ((m = l.match(/^(#{1,6})\s+(.*)$/))) {
        flush();
        out.push(`<h${m[1].length}>${inline(m[2], base)}</h${m[1].length}>`);
        i++;
        continue;
      }
      if (/^---+\s*$/.test(l)) {
        flush();
        out.push('<hr />');
        i++;
        continue;
      }
      if (/^\s*\|/.test(l) && i + 1 < L.length && /^\s*\|[\s:|-]+\|\s*$/.test(L[i + 1])) {
        flush();
        const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        const head = cells(l);
        let h = '<div class="tablewrap"><table><thead><tr>' + head.map((c) => '<th>' + inline(c, base) + '</th>').join('') + '</tr></thead><tbody>';
        for (i += 2; i < L.length && /^\s*\|/.test(L[i]); i++) h += '<tr>' + cells(L[i]).map((c) => '<td>' + inline(c, base) + '</td>').join('') + '</tr>';
        out.push(h + '</tbody></table></div>');
        continue;
      }
      if (/^>\s?/.test(l)) {
        flush();
        const q = [];
        for (; i < L.length && /^>\s?/.test(L[i]); i++) q.push(L[i].replace(/^>\s?/, ''));
        out.push('<blockquote>' + render(q.join('\n'), base) + '</blockquote>');
        continue;
      }
      if ((m = l.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/))) {
        flush();
        const ordered = /\d/.test(m[2]),
          items = [];
        while (i < L.length) {
          const mm = L[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
          if (mm) {
            items.push(mm[3]);
            i++;
          } else if (/^\s{2,}\S/.test(L[i]) && items.length) {
            items[items.length - 1] += ' ' + L[i].trim();
            i++;
          } else break;
        }
        out.push(`<${ordered ? 'ol' : 'ul'}>` + items.map((t) => '<li>' + inline(t, base) + '</li>').join('') + `</${ordered ? 'ol' : 'ul'}>`);
        continue;
      }
      if (!l.trim()) {
        flush();
        i++;
        continue;
      }
      para.push(l.trim());
      i++;
    }
    flush();
    return out.join('\n');
  }
  root.GenesisMD = { render, inline, esc };
})(typeof self !== 'undefined' ? self : this);
