import fs from 'fs';
import path from 'path';
import { tokenizeVerse, type QuoteSpan, type SpeakerDef } from '../lib/speaker-quotes';
import type { BookJSON } from '../lib/types';

/*
  Validate data/speakers/*.json against the actual verse text. The runtime
  tokenizer is deliberately fail-soft (a bad span renders as plain text), so
  this script is the only place authoring drift becomes visible. Run with:
  npx tsx scripts/validate-speakers.ts
*/

interface SpeakerFile {
  book: string;
  speakers: Record<string, SpeakerDef>;
  chapters: Record<string, QuoteSpan[]>;
}

let errors = 0;
let warnings = 0;

function error(msg: string) {
  errors++;
  console.error(`  ERROR   ${msg}`);
}

function warn(msg: string) {
  warnings++;
  console.warn(`  warning ${msg}`);
}

const dir = path.join(process.cwd(), 'data', 'speakers');
const files = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
  : [];

if (files.length === 0) {
  console.log('No speaker files found in data/speakers/.');
  process.exit(0);
}

for (const file of files) {
  console.log(`\n${file}`);
  const parsed = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8')) as SpeakerFile;

  if (!parsed.book || !parsed.speakers || !parsed.chapters) {
    error(`missing top-level book/speakers/chapters`);
    continue;
  }

  const bookPath = path.join(process.cwd(), 'lib', `${parsed.book}.json`);
  if (!fs.existsSync(bookPath)) {
    error(`no verse text at lib/${parsed.book}.json`);
    continue;
  }
  const bookJson = JSON.parse(fs.readFileSync(bookPath, 'utf-8')) as BookJSON;
  const verseText = new Map<string, string>();
  for (const chapter of bookJson.chapters) {
    for (const verse of chapter.verses) {
      verseText.set(`${chapter.chapter}:${verse.verse}`, verse.text);
    }
  }

  for (const [id, def] of Object.entries(parsed.speakers)) {
    if (!Number.isInteger(def.color) || def.color < 1 || def.color > 10) {
      error(`speaker "${id}" has color slot ${def.color}; expected an integer 1-10`);
    }
  }

  for (const [chapter, spans] of Object.entries(parsed.chapters)) {
    const chapterSpeakers = new Set<string>();

    // Group per verse so tokenizeVerse sees exactly what the reader passes it.
    const byVerse = new Map<number, QuoteSpan[]>();
    for (const span of spans) {
      if (!parsed.speakers[span.speaker]) {
        error(`${chapter}:${span.verse} references unknown speaker "${span.speaker}"`);
        continue;
      }
      chapterSpeakers.add(span.speaker);
      const existing = byVerse.get(span.verse);
      if (existing) existing.push(span);
      else byVerse.set(span.verse, [span]);
    }

    for (const [verse, verseSpans] of byVerse) {
      const text = verseText.get(`${chapter}:${verse}`);
      if (text === undefined) {
        error(`${chapter}:${verse} does not exist in lib/${parsed.book}.json`);
        continue;
      }
      const runs = tokenizeVerse(text, verseSpans);
      const matched = runs.filter((r) => r.speaker).length;
      if (matched < verseSpans.length) {
        for (const span of verseSpans) {
          if (!text.includes(span.quote)) {
            error(`${chapter}:${verse} quote not found in text: ${span.quote.slice(0, 60)}…`);
          }
        }
        if (verseSpans.every((s) => text.includes(s.quote))) {
          error(`${chapter}:${verse} spans overlap or are out of document order`);
        }
      }
    }

    // Two voices sharing a slot is fine across chapters, illegible within one.
    const slotOwner = new Map<number, string>();
    for (const id of chapterSpeakers) {
      const slot = parsed.speakers[id].color;
      const owner = slotOwner.get(slot);
      if (owner && owner !== id) {
        error(`chapter ${chapter}: speakers "${owner}" and "${id}" share color slot ${slot}`);
      }
      slotOwner.set(slot, id);
    }

    // Dialogue the author may have missed — advisory only, since a chapter
    // can be intentionally partial mid-authoring.
    const bookChapter = bookJson.chapters.find((c) => c.chapter === chapter);
    for (const verse of bookChapter?.verses ?? []) {
      if (verse.text.includes('“') && !byVerse.has(Number(verse.verse))) {
        warn(`${chapter}:${verse.verse} contains “ but has no spans`);
      }
    }
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s).`);
process.exit(errors > 0 ? 1 : 0);
