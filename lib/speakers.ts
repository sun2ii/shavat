import fs from 'fs';
import path from 'path';
import type { ChapterSpeakers, QuoteSpan, SpeakerDef, VerseSpeakers } from './speaker-quotes';

// Server-only accessor for data/speakers/<book>.json — quote-span speaker
// attribution for dialogue coloring. Mirrors lib/sections.ts.

/*
  Speaker file format supports two attribution modes:

  1. Quote-based (translation-specific): Exact substring matching for inline highlighting
     "chapters": { "1": [{ "verse": 7, "speaker": "the-lord", "quote": "..." }] }

  2. Verse-range (translation-agnostic): For speaker legend without highlighting
     "verseSpeakers": { "1": { "6-12": ["the-lord", "satan"], "21": ["job"] } }

  Both can coexist. verseSpeakers provides fallback when quotes don't match.
*/

interface SpeakerFile {
  book: string;
  speakers: Record<string, SpeakerDef>;
  /* Quote-based attribution (optional, translation-specific) */
  chapters?: Record<string, QuoteSpan[]>;
  /* Verse-range attribution (optional, translation-agnostic) */
  verseSpeakers?: Record<string, VerseSpeakers>;
}

interface BookSpeakers {
  [bookSlug: string]: {
    speakers: Record<string, SpeakerDef>;
    chapters: { [chapter: number]: QuoteSpan[] };
    verseSpeakers: { [chapter: number]: VerseSpeakers };
  };
}

let cachedSpeakers: BookSpeakers | null = null;

function getAllSpeakers(): BookSpeakers {
  // The JSON is fs-read, not imported, so the dev watcher can't invalidate
  // this module when the data changes — re-read per request in development.
  if (cachedSpeakers && process.env.NODE_ENV === 'production') {
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

      // Parse quote-based chapters (optional)
      const chapters: { [chapter: number]: QuoteSpan[] } = {};
      if (parsed.chapters) {
        for (const [chapter, spans] of Object.entries(parsed.chapters)) {
          chapters[Number(chapter)] = spans;
        }
      }

      // Parse verse-range speakers (optional)
      const verseSpeakers: { [chapter: number]: VerseSpeakers } = {};
      if (parsed.verseSpeakers) {
        for (const [chapter, ranges] of Object.entries(parsed.verseSpeakers)) {
          verseSpeakers[Number(chapter)] = ranges;
        }
      }

      speakers[parsed.book] = { speakers: parsed.speakers, chapters, verseSpeakers };
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
  if (!book) return null;

  const spans = book.chapters[chapter] || [];
  const verseSpeakersData = book.verseSpeakers[chapter];

  // If no quote spans and no verse-range data, no speaker info available
  if (spans.length === 0 && !verseSpeakersData) {
    return null;
  }

  // Collect speakers from both sources
  const speakers: Record<string, SpeakerDef> = {};

  // From quote spans (for inline highlighting)
  for (const span of spans) {
    const def = book.speakers[span.speaker];
    if (def) speakers[span.speaker] = def;
  }

  // From verse-range attribution (for legend)
  if (verseSpeakersData) {
    for (const speakerIds of Object.values(verseSpeakersData)) {
      for (const id of speakerIds) {
        const def = book.speakers[id];
        if (def) speakers[id] = def;
      }
    }
  }

  return { speakers, spans, verseSpeakers: verseSpeakersData };
}
