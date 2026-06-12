// Story Map aggregation — flattens every book's existing divisions metadata
// into one canonical, ordered, era-grouped list of "movements".
// A new lens over content that already exists; no parallel dataset.

import { BIBLE_INDEX } from './bible-index';
import { BookDivision, BibleBookEntry } from './types';
import { ERAS, Era, inferEra } from './eras';

export interface Movement extends BookDivision {
  key: string;        // globally unique: `${bookSlug}:${id}`
  bookSlug: string;
  bookName: string;
  eraId: string;      // resolved era (explicit field or inferred)
  position: number;   // 0-based position in the full canonical sequence
  href: string;       // reader entry point (first chapter)
  oriented: boolean;  // true when the movement answers the orientation questions
  synthesized: boolean; // true when the book had no divisions and the whole book is one node
}

export interface EraGroup {
  era: Era;
  movements: Movement[];
}

/**
 * Read a book's divisions straight from its metadata JSON.
 * Handles both shapes in the repo: `divisions` (most books) and
 * `books` (Genesis). Returns [] when neither has content.
 */
function readDivisions(bookSlug: string): BookDivision[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const metadata = require(`./${bookSlug}-metadata.json`);
    const divisions = metadata.divisions?.length
      ? metadata.divisions
      : metadata.books?.length
        ? metadata.books
        : [];
    return divisions as BookDivision[];
  } catch {
    return [];
  }
}

function readerHref(book: BibleBookEntry, division: BookDivision | null): string {
  if (book.slug === 'psalms') return '/psalms';
  if (division) return `/${book.slug}/${division.id}/${division.chapters[0]}`;
  return `/${book.slug}/1`;
}

function isOriented(d: BookDivision): boolean {
  return Boolean(
    d.characters?.length &&
      d.conflict &&
      d.whatGodIsDoing &&
      d.keyPassages?.length
  );
}

let cache: Movement[] | null = null;

/** Every movement across the canon, in canon order then chapter order. */
export function getAllMovements(): Movement[] {
  if (cache) return cache;

  const movements: Movement[] = [];

  for (const book of BIBLE_INDEX) {
    const divisions = readDivisions(book.slug);

    if (divisions.length > 0) {
      for (const d of divisions) {
        movements.push({
          ...d,
          key: `${book.slug}:${d.id}`,
          bookSlug: book.slug,
          bookName: book.name,
          eraId: inferEra(book.slug, d.id, d.era),
          position: movements.length,
          href: readerHref(book, d),
          oriented: isOriented(d),
          synthesized: false,
        });
      }
    } else {
      // No divisions yet — the whole book is a single movement node.
      movements.push({
        id: book.slug,
        title: book.name,
        chapters: Array.from({ length: book.chapterCount }, (_, i) => i + 1),
        theme: '',
        summary: '',
        key: `${book.slug}:${book.slug}`,
        bookSlug: book.slug,
        bookName: book.name,
        eraId: inferEra(book.slug, book.slug),
        position: movements.length,
        href: readerHref(book, null),
        oriented: false,
        synthesized: true,
      });
    }
  }

  cache = movements;
  return movements;
}

/** Ordered eras, each with its movements. Empty eras are omitted. */
export function getStoryMap(): EraGroup[] {
  const all = getAllMovements();
  return ERAS.map((era) => ({
    era,
    movements: all.filter((m) => m.eraId === era.id),
  })).filter((group) => group.movements.length > 0);
}

/** Single movement by unique key (`bookSlug:divisionId`) or plain division id. */
export function getMovement(idOrKey: string): Movement | null {
  const all = getAllMovements();
  return (
    all.find((m) => m.key === idOrKey) ??
    all.find((m) => m.id === idOrKey) ??
    null
  );
}
