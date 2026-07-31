/**
 * Dumps the two baseline oracles for the architecture cleanup
 * (docs/architecture-observatory.html · 03 Verification · B4/B5).
 *
 *   docs/baseline/sections.current.json   — lib/sections output (the frozen B4
 *     oracle, sections.oracle.json, was dumped from lib/extractSections before
 *     Phase 1 and must never be overwritten)
 *   docs/baseline/commentary.oracle.json  — hasCommentary(book, chapter) over every chapter
 *
 * Output is canonicalized (sorted keys) so later parity checks are a plain diff.
 * Run: npx tsx scripts/dump-oracles.ts
 */
import fs from 'fs';
import path from 'path';
import { getAllSections } from '../lib/sections';
import { hasCommentary } from '../lib/hasCommentary';
import { BIBLE_INDEX } from '../lib/bible-index';

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as object).sort()) {
      out[key] = canonicalize((value as Record<string, unknown>)[key]);
    }
    return out;
  }
  return value;
}

const outDir = path.join(process.cwd(), 'docs', 'baseline');
fs.mkdirSync(outDir, { recursive: true });

// B4 — sections
const sections = getAllSections();
fs.writeFileSync(
  path.join(outDir, 'sections.current.json'),
  JSON.stringify(canonicalize(sections), null, 2) + '\n'
);
const bookCount = Object.keys(sections).length;
const chapterCount = Object.values(sections).reduce(
  (n, b) => n + Object.keys(b).length, 0
);
console.log(`sections.current.json: ${bookCount} books, ${chapterCount} chapters`);

// B5 — commentary coverage
const commentary: Record<string, Record<number, boolean>> = {};
for (const book of BIBLE_INDEX) {
  commentary[book.slug] = {};
  for (let ch = 1; ch <= book.chapterCount; ch++) {
    commentary[book.slug][ch] = hasCommentary(book.slug, ch);
  }
}
fs.writeFileSync(
  path.join(outDir, 'commentary.oracle.json'),
  JSON.stringify(canonicalize(commentary), null, 2) + '\n'
);
const trueCount = Object.values(commentary).reduce(
  (n, b) => n + Object.values(b).filter(Boolean).length, 0
);
console.log(`B5 commentary.oracle.json: ${BIBLE_INDEX.length} books, ${trueCount} chapters with commentary`);
