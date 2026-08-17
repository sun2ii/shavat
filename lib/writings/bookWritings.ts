import { BookMemorial, BookOrientation } from '@/lib/types';
import { JOSHUA } from './joshua/book';
import { RUTH } from './ruth/book';
import { ACTS } from './acts/book';
import { HOSEA } from './hosea/book';
import { GALATIANS } from './galatians/book';
import { FIRST_THESSALONIANS } from './1-thessalonians/book';
import { SECOND_THESSALONIANS } from './2-thessalonians/book';
import { FIRST_CORINTHIANS } from './1-corinthians/book';
import { SECOND_CORINTHIANS } from './2-corinthians/book';
import { ROMANS } from './romans/book';
import { PHILIPPIANS } from './philippians/book';
import { PHILEMON } from './philemon/book';
import { COLOSSIANS } from './colossians/book';
import { EPHESIANS } from './ephesians/book';
import { FIRST_TIMOTHY } from './1-timothy/book';
import { TITUS } from './titus/book';
import { SECOND_TIMOTHY } from './2-timothy/book';

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
  acts: ACTS,
  hosea: HOSEA,
  galatians: GALATIANS,
  '1-thessalonians': FIRST_THESSALONIANS,
  '2-thessalonians': SECOND_THESSALONIANS,
  '1-corinthians': FIRST_CORINTHIANS,
  '2-corinthians': SECOND_CORINTHIANS,
  romans: ROMANS,
  philippians: PHILIPPIANS,
  philemon: PHILEMON,
  colossians: COLOSSIANS,
  ephesians: EPHESIANS,
  '1-timothy': FIRST_TIMOTHY,
  titus: TITUS,
  '2-timothy': SECOND_TIMOTHY,
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

/** All book slugs that have a memorial or orientation. */
export function getAllBookWritingSlugs(): string[] {
  return [...new Set([...Object.keys(BOOK_MEMORIALS), ...Object.keys(BOOK_ORIENTATIONS)])];
}
