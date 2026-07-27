import { BookMemorial, BookOrientation } from '@/lib/types';
import { JOSHUA } from './joshua/book';
import { RUTH } from './ruth/book';

/**
 * Books with a writing at /writings/<slug>. Two kinds live here:
 *
 *   memorial     what a book left behind, written after reading it
 *   orientation  the map of a book, written to be read before it
 *
 * A book has at most one, and the route renders whichever it finds. One
 * registry, so the page and every link into it agree about what exists.
 */
const BOOK_MEMORIALS: Record<string, BookMemorial> = {
  joshua: JOSHUA,
};

const BOOK_ORIENTATIONS: Record<string, BookOrientation> = {
  ruth: RUTH,
};

export function getBookMemorial(bookSlug: string): BookMemorial | undefined {
  return BOOK_MEMORIALS[bookSlug];
}

export function getBookOrientation(bookSlug: string): BookOrientation | undefined {
  return BOOK_ORIENTATIONS[bookSlug];
}

/** Whether /writings/<slug> resolves — the test every link into it should use. */
export function hasBookWriting(bookSlug: string): boolean {
  return bookSlug in BOOK_MEMORIALS || bookSlug in BOOK_ORIENTATIONS;
}
