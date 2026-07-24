import { BookMemorial } from '@/lib/types';
import { JOSHUA } from './joshua/book';

/**
 * Books that have a book-level memorial at /writings/<slug>. One registry, so
 * the route and every link into it agree about what exists.
 */
const BOOK_MEMORIALS: Record<string, BookMemorial> = {
  joshua: JOSHUA,
};

export function getBookMemorial(bookSlug: string): BookMemorial | undefined {
  return BOOK_MEMORIALS[bookSlug];
}

export function hasBookMemorial(bookSlug: string): boolean {
  return bookSlug in BOOK_MEMORIALS;
}
