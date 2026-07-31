// Generates data/commentary-manifest.json from what actually exists in
// lib/commentary/ — both layouts: flat (<book>-<ch>.json) and per-book
// subdirectory (<book>/<book>-<ch>.json), mirroring lib/getCommentary.ts.
//
// Runs as `prebuild`, so the manifest can never drift from the files.
// Output is sorted and deterministic.
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'lib', 'commentary');
const chapters = {}; // book -> Set of chapter numbers

function record(book, chapter) {
  (chapters[book] ||= new Set()).add(chapter);
}

for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    for (const f of fs.readdirSync(path.join(dir, entry.name))) {
      const m = f.match(/^(.+)-(\d+)\.json$/);
      if (m && m[1] === entry.name) record(entry.name, Number(m[2]));
    }
  } else {
    const m = entry.name.match(/^([a-z0-9-]+?)-(\d+)\.json$/);
    if (m) record(m[1], Number(m[2]));
  }
}

const manifest = {};
for (const book of Object.keys(chapters).sort()) {
  manifest[book] = [...chapters[book]].sort((a, b) => a - b);
}

const out = path.join(process.cwd(), 'data', 'commentary-manifest.json');
fs.writeFileSync(out, JSON.stringify(manifest, null, 2) + '\n');
const total = Object.values(manifest).reduce((n, c) => n + c.length, 0);
console.log(`commentary-manifest.json: ${Object.keys(manifest).length} books, ${total} chapters`);
