import fs from 'fs';
import path from 'path';
import { Verse } from './types';
import { getBookBySlug } from './bible-index';

// One factory for all 66 books — replaces the per-book wrapper modules
// (lib/<book>.ts) and the getBookUtils switch. Server-only: reads the
// canonical lib/<book>.json on first access, cached per slug.

export interface BookAccessor {
  getChapter(chapterNum: number): Verse[] | null;
  getChapterCount(): number;
}

interface BookJSON {
  book: string;
  count: number;
  chapters: { chapter: string; verses: { verse: string; text: string }[] }[];
}

const cache = new Map<string, BookAccessor | null>();

export function createBookAccessor(slug: string): BookAccessor | null {
  if (cache.has(slug)) {
    return cache.get(slug)!;
  }

  // Only slugs in the canonical index resolve — never raw user input.
  if (!getBookBySlug(slug)) {
    cache.set(slug, null);
    return null;
  }

  const file = slug === 'psalms' ? 'psalms-data.json' : `${slug}.json`;
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'lib', file), 'utf-8')
  ) as BookJSON;

  const accessor: BookAccessor = {
    getChapter(chapterNum: number): Verse[] | null {
      if (chapterNum < 1 || chapterNum > data.count) {
        return null;
      }
      const chapterData = data.chapters.find(
        (c) => parseInt(c.chapter) === chapterNum
      );
      if (!chapterData) return null;
      return chapterData.verses.map((v) => ({
        book: data.book,
        chapter: chapterNum,
        verse: parseInt(v.verse),
        text: v.text,
      }));
    },
    getChapterCount(): number {
      return data.count;
    },
  };

  cache.set(slug, accessor);
  return accessor;
}
