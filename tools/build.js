#!/usr/bin/env node
// Bundle Genesis into a single self-contained HTML file: dist/genesis.html
// Handy for sharing one file or hosting it anywhere.
//
// Copyright (c) 2026 Malvika Sen. MIT License.

const fs = require('fs');
const path = require('path');
const { ORDER, ROOT } = require('./engine');

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const files = [...ORDER.map((n) => `src/${n}.js`), 'vendor/three.min.js', 'ui/globe3d.js', 'ui/app.js'];
for (const f of files) {
  const tag = `<script src="${f}"></script>`;
  if (!html.includes(tag)) throw new Error('index.html is missing ' + tag);
  const code = fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/<\/script/gi, '<\\/script');
  html = html.replace(tag, () => `<script>\n// ---- ${f} ----\n${code}</script>`);
}
fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'dist', 'genesis.html'), html);
console.log('Wrote dist/genesis.html (' + Math.round(html.length / 1024) + ' KB)');
