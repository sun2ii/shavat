import { BIBLE_INDEX, getBookBySlug } from './bible-index';

export interface ChapterRef {
  book: string;
  chapter: number;
}

/**
 * Where to continue after the most recently completed chapter.
 *
 * Rule: walk forward from the chapter after `last`, skipping chapters already
 * completed in that book. Past the end of the book, continue at chapter 1 of
 * the next book in canonical order. Past Revelation, wrap to Genesis 1.
 *
 *   last = Psalms 91, completed = {91}        -> Psalms 92
 *   last = Psalms 91, completed = {91, 92}    -> Psalms 93
 *   last = Psalms 150                         -> Proverbs 1
 */
export function nextChapterAfter(last: ChapterRef, completedInBook: number[]): ChapterRef | null {
  const book = getBookBySlug(last.book);
  if (!book) return null;

  const done = new Set(completedInBook);
  for (let ch = last.chapter + 1; ch <= book.chapterCount; ch++) {
    if (!done.has(ch)) return { book: book.slug, chapter: ch };
  }

  const idx = BIBLE_INDEX.findIndex((b) => b.slug === book.slug);
  const next = BIBLE_INDEX[(idx + 1) % BIBLE_INDEX.length];
  return { book: next.slug, chapter: 1 };
}
