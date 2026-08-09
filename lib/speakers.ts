import fs from 'fs';
import path from 'path';
import type { ChapterSpeakers, QuoteSpan, SpeakerDef } from './speaker-quotes';

// Server-only accessor for data/speakers/<book>.json — quote-span speaker
// attribution for dialogue coloring. Mirrors lib/sections.ts.

interface SpeakerFile {
  book: string;
  speakers: Record<string, SpeakerDef>;
  chapters: Record<string, QuoteSpan[]>;
}

interface BookSpeakers {
  [bookSlug: string]: {
    speakers: Record<string, SpeakerDef>;
    chapters: { [chapter: number]: QuoteSpan[] };
  };
}

let cachedSpeakers: BookSpeakers | null = null;

function getAllSpeakers(): BookSpeakers {
  if (cachedSpeakers) {
    return cachedSpeakers;
  }

  const dir = path.join(process.cwd(), 'data', 'speakers');
  const speakers: BookSpeakers = {};
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.json')) continue;
      const parsed = JSON.parse(
        fs.readFileSync(path.join(dir, file), 'utf-8')
      ) as SpeakerFile;
      const chapters: { [chapter: number]: QuoteSpan[] } = {};
      for (const [chapter, spans] of Object.entries(parsed.chapters)) {
        chapters[Number(chapter)] = spans;
      }
      speakers[parsed.book] = { speakers: parsed.speakers, chapters };
    }
  }

  cachedSpeakers = speakers;
  return speakers;
}

export function getChapterSpeakers(
  bookSlug: string,
  chapter: number
): ChapterSpeakers | null {
  const book = getAllSpeakers()[bookSlug];
  const spans = book?.chapters[chapter];
  if (!spans || spans.length === 0) {
    return null;
  }

  // Narrow the book-wide cast to this chapter so the legend lists exactly
  // the voices heard in it.
  const speakers: Record<string, SpeakerDef> = {};
  for (const span of spans) {
    const def = book.speakers[span.speaker];
    if (def) speakers[span.speaker] = def;
  }

  return { speakers, spans };
}
