/**
 * One-word thematic titles for individual chapters, keyed by book slug.
 * A chapter with no entry renders its outline without a heading, so books
 * can adopt themes incrementally.
 */
const CHAPTER_THEMES: Record<string, Record<number, string>> = {
  joshua: {
    9: 'Discernment',
    10: 'Courage',
    11: 'Dependence',
    12: 'Remembrance',
  },
};

export function getChapterTheme(book?: string, chapter?: number): string | null {
  if (!book || !chapter) return null;
  return CHAPTER_THEMES[book.toLowerCase()]?.[chapter] ?? null;
}
