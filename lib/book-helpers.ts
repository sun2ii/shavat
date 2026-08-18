import { BIBLE_INDEX } from './bible-index';

/**
 * Get the display name for a book given its slug.
 * Returns the slug itself if not found.
 */
export function bookName(slug: string): string {
  return BIBLE_INDEX.find((b) => b.slug === slug)?.name ?? slug;
}
