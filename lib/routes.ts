import { getBookBySlug } from './bible-index';

export type TestamentPrefix = 'ot' | 'nt';

/**
 * Reading routes are namespaced by testament: /ot/joshua/possess/9.
 * The prefix comes from the canonical index, so a book only ever resolves to
 * one of them.
 */
export function testamentPrefix(bookSlug: string): TestamentPrefix {
  return getBookBySlug(bookSlug)?.testament === 'new' ? 'nt' : 'ot';
}

/**
 * Canonical reading path.
 *   readingPath('joshua')                       -> /ot/joshua
 *   readingPath('joshua', 9)                    -> /ot/joshua/9
 *   readingPath('joshua', 'possess', 9)         -> /ot/joshua/possess/9
 */
export function readingPath(
  bookSlug: string,
  ...segments: Array<string | number>
): string {
  const tail = segments.length > 0 ? `/${segments.join('/')}` : '';
  return `/${testamentPrefix(bookSlug)}/${bookSlug}${tail}`;
}

/**
 * Recorded summaries. With a division id, the memorial for that movement;
 * without one, the book-level overview those movements hang from.
 *   writingPath('joshua')             -> /writings/joshua
 *   writingPath('joshua', 'shiloh')   -> /writings/joshua/shiloh
 */
export function writingPath(bookSlug: string, divisionId?: string): string {
  return divisionId ? `/writings/${bookSlug}/${divisionId}` : `/writings/${bookSlug}`;
}

/**
 * Division ids that shipped under earlier titles. Old URLs keep working by
 * resolving through here before redirecting to the canonical path.
 */
const LEGACY_DIVISION_IDS: Record<string, Record<string, string>> = {
  joshua: {
    'crossing-the-jordan': 'formation',
    'jericho-and-ai': 'first-tests',
    'the-conquest': 'possess',
    'possess-the-land': 'possess',
    'dividing-the-land': 'inheritance',
    'choose-this-day': 'legacy',
  },
};

export function resolveDivisionId(bookSlug: string, divisionId: string): string {
  return LEGACY_DIVISION_IDS[bookSlug]?.[divisionId] ?? divisionId;
}
