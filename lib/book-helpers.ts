import { BIBLE_INDEX } from './bible-index';

// Christian Readings slug patterns and their display info
const CHRISTIAN_READINGS: Record<string, { readingId: string; displayName: string }> = {
  // Confessions: confessions-1 through confessions-13
  'confessions': { readingId: 'confessions', displayName: 'Confessions' },
  // Imitation of Christ: imitation-1 through imitation-4
  'imitation': { readingId: 'imitation-of-christ', displayName: 'Imitation of Christ' },
  // Practice of Presence: conversations, letters
  'conversations': { readingId: 'practice-presence-god', displayName: 'Practice of the Presence of God' },
  'letters': { readingId: 'practice-presence-god', displayName: 'Practice of the Presence of God' },
};

/**
 * Check if a book slug is a Christian Reading (not Bible).
 */
export function isChristianReading(slug: string): boolean {
  // Check direct match first (conversations, letters)
  if (CHRISTIAN_READINGS[slug]) return true;
  // Check prefix match (confessions-1, imitation-2)
  const prefix = slug.split('-')[0];
  return !!CHRISTIAN_READINGS[prefix];
}

/**
 * Check if a book slug is a Bible book.
 */
export function isBibleBook(slug: string): boolean {
  return BIBLE_INDEX.some((b) => b.slug === slug);
}

/**
 * Get display name for a Christian Reading book slug.
 */
export function readingDisplayName(slug: string): string {
  // Direct match (conversations, letters)
  if (CHRISTIAN_READINGS[slug]) {
    return CHRISTIAN_READINGS[slug].displayName;
  }
  // Prefix match with book number (confessions-1 -> "Confessions Book 1")
  const parts = slug.split('-');
  const prefix = parts[0];
  const reading = CHRISTIAN_READINGS[prefix];
  if (reading && parts.length > 1) {
    const bookNum = parts[1];
    return `${reading.displayName} Book ${bookNum}`;
  }
  return slug;
}

/**
 * Get the reading ID (for URL routing) from a book slug.
 */
export function getReadingIdFromSlug(slug: string): string | null {
  if (CHRISTIAN_READINGS[slug]) {
    return CHRISTIAN_READINGS[slug].readingId;
  }
  const prefix = slug.split('-')[0];
  return CHRISTIAN_READINGS[prefix]?.readingId ?? null;
}

/**
 * Get URL path for a Christian Reading chapter.
 * e.g., readingChapterPath('confessions-1', 1) -> '/readings/confessions/1/1'
 */
export function readingChapterPath(bookSlug: string, chapter: number): string {
  const readingId = getReadingIdFromSlug(bookSlug);
  if (!readingId) return '#';

  // Extract book number from slug
  if (bookSlug === 'conversations' || bookSlug === 'letters') {
    // practice-presence-god uses book slug directly
    return `/readings/${readingId}/${bookSlug}/${chapter}`;
  }

  // confessions-1 -> book 1, imitation-2 -> book 2
  const parts = bookSlug.split('-');
  const bookNum = parts.length > 1 ? parts[parts.length - 1] : '1';
  return `/readings/${readingId}/${bookNum}/${chapter}`;
}

/**
 * Get the display name for a book given its slug.
 * Returns the slug itself if not found.
 */
export function bookName(slug: string): string {
  return BIBLE_INDEX.find((b) => b.slug === slug)?.name ?? slug;
}
