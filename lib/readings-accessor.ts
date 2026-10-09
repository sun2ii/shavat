import fs from 'fs';
import path from 'path';
import { Verse } from './types';

/**
 * Accessor for devotional readings (e.g., Imitation of Christ).
 * Mirrors the Bible book-accessor pattern so BookReader works unchanged.
 */

export interface ReadingMetadata {
  id: string;
  title: string;
  author: string;
  translator?: string;
  source?: string;
  books: {
    id: number;
    slug: string;
    title: string;
    chapters: number;
  }[];
}

interface ReadingChapterData {
  chapter: string;
  title: string;
  verses: { verse: string; text: string }[];
}

interface ReadingBookJSON {
  book: string;
  slug: string;
  count: number;
  chapters: ReadingChapterData[];
}

export interface ReadingAccessor {
  getChapter(chapterNum: number): { verses: Verse[]; title: string } | null;
  getChapterCount(): number;
  getBookTitle(): string;
}

// Cache keyed by reading slug (e.g., "imitation-1")
const bookCache = new Map<string, ReadingAccessor | null>();
const metadataCache = new Map<string, ReadingMetadata | null>();

/**
 * Get metadata for a reading (all books info).
 */
export function getReadingMetadata(readingId: string): ReadingMetadata | null {
  if (metadataCache.has(readingId)) {
    return metadataCache.get(readingId)!;
  }

  const filePath = path.join(process.cwd(), 'lib', 'readings', readingId, 'metadata.json');
  if (!fs.existsSync(filePath)) {
    metadataCache.set(readingId, null);
    return null;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as ReadingMetadata;
  metadataCache.set(readingId, data);
  return data;
}

/**
 * Create an accessor for a specific book within a reading.
 * e.g., createReadingAccessor('imitation-of-christ', 'imitation-1')
 */
export function createReadingAccessor(readingId: string, bookSlug: string): ReadingAccessor | null {
  const cacheKey = `${readingId}:${bookSlug}`;

  if (bookCache.has(cacheKey)) {
    return bookCache.get(cacheKey)!;
  }

  const filePath = path.join(process.cwd(), 'lib', 'readings', readingId, `${bookSlug}.json`);
  if (!fs.existsSync(filePath)) {
    bookCache.set(cacheKey, null);
    return null;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as ReadingBookJSON;

  const accessor: ReadingAccessor = {
    getChapter(chapterNum: number): { verses: Verse[]; title: string } | null {
      if (chapterNum < 1 || chapterNum > data.count) {
        return null;
      }
      const chapterData = data.chapters.find(
        (c) => parseInt(c.chapter) === chapterNum
      );
      if (!chapterData) return null;

      return {
        title: chapterData.title,
        verses: chapterData.verses.map((v) => ({
          book: data.book,
          chapter: chapterNum,
          verse: parseInt(v.verse),
          text: v.text,
        })),
      };
    },
    getChapterCount(): number {
      return data.count;
    },
    getBookTitle(): string {
      return data.book;
    },
  };

  bookCache.set(cacheKey, accessor);
  return accessor;
}
