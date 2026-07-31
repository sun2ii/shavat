import fs from 'fs';
import path from 'path';

// Server-only accessor for data/sections/<book>.json — the canonical home
// of chapter section headings. Replaces lib/extractSections.ts, which
// recovered the same data by regex-parsing the reader component's source (Phase 1, 2026-07-30).

export interface SectionData {
  title: string;
  verseRange: [number, number];
}

export interface Section extends SectionData {
  color: string;
  borderColor: string;
}

export interface BookSections {
  [bookSlug: string]: {
    [chapter: number]: Section[];
  };
}

let cachedSections: BookSections | null = null;

export function getAllSections(): BookSections {
  if (cachedSections) {
    return cachedSections;
  }

  const dir = path.join(process.cwd(), 'data', 'sections');
  const sections: BookSections = {};
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.json')) continue;
    const parsed = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8')) as {
      book: string;
      chapters: Record<string, Section[]>;
    };
    sections[parsed.book] = {};
    for (const [chapter, chapterSections] of Object.entries(parsed.chapters)) {
      sections[parsed.book][Number(chapter)] = chapterSections;
    }
  }

  cachedSections = sections;
  return sections;
}

export function getBookSections(bookSlug: string): { [chapter: number]: Section[] } | null {
  return getAllSections()[bookSlug] || null;
}

export function getChapterSections(bookSlug: string, chapter: number): Section[] | null {
  return getBookSections(bookSlug)?.[chapter] || null;
}
