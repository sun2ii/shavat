// Story Map aggregation — flattens every book's existing divisions metadata
// into one canonical, ordered, era-grouped list of "movements".
// A new lens over content that already exists; no parallel dataset.

import { BIBLE_INDEX } from './bible-index';
import { BookDivision, BibleBookEntry } from './types';
import { ERAS, Era, inferEra, getPlacement, BookRole } from './eras';
import { readingPath } from './routes';

export interface Movement extends BookDivision {
  key: string;        // globally unique: `${bookSlug}:${id}`
  bookSlug: string;
  bookName: string;
  eraId: string;      // resolved act (explicit field or inferred)
  position: number;   // 0-based position in the full canonical sequence
  href: string;       // reader entry point (first chapter)
  oriented: boolean;  // true when the movement answers the orientation questions
  synthesized: boolean; // true when the book had no divisions and the whole book is one node
  spine: boolean;     // true = part of the unbroken storyline
  role: BookRole;     // story | voice | wisdom
  anchor?: string;    // slot-ins: one line on why the book sits in this act
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
  if (division) return readingPath(book.slug, division.id, division.chapters[0]);
  return readingPath(book.slug, 1);
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
    const placement = getPlacement(book.slug);

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
          spine: placement.spine,
          role: placement.role,
          anchor: placement.anchor,
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
        spine: placement.spine,
        role: placement.role,
        anchor: placement.anchor,
      });
    }
  }

  cache = movements;
  return movements;
}

// Books whose map nodes are their movements, not the whole book.
// Only books that contain multiple distinct stories belong here.
const SPLIT_ON_MAP = new Set(['genesis']);

/**
 * Ordered acts, each with its map nodes. Empty acts are omitted.
 *
 * Zoom rule: one node ≈ one narrative unit you can hold. Most spine books
 * are one node ("Joshua", "Acts") linking to the book page, where its
 * movements (scenes) live. Genesis alone splits into its movements on the
 * map, since 50 chapters span several distinct stories.
 *
 * Spine-first: only storyline books are returned by default.
 * Pass `{ includeSlotIns: true }` for the full terrain (later pass).
 */
export function getStoryMap(options?: { includeSlotIns?: boolean }): EraGroup[] {
  const nodes: Movement[] = [];

  for (const book of BIBLE_INDEX) {
    const placement = getPlacement(book.slug);
    if (!placement.spine && !options?.includeSlotIns) continue;

    if (SPLIT_ON_MAP.has(book.slug)) {
      nodes.push(...getAllMovements().filter((m) => m.bookSlug === book.slug));
      continue;
    }

    nodes.push({
      id: book.slug,
      title: book.name,
      chapters: Array.from({ length: book.chapterCount }, (_, i) => i + 1),
      theme: placement.tagline ?? '',
      summary: '',
      contentType: 'narrative',
      key: `${book.slug}:book`,
      bookSlug: book.slug,
      bookName: book.name,
      eraId: placement.act,
      position: nodes.length,
      href: `/${book.slug}`,
      oriented: false,
      synthesized: false,
      spine: placement.spine,
      role: placement.role,
      anchor: placement.anchor,
    });
  }

  return ERAS.map((era) => ({
    era,
    movements: nodes.filter((m) => m.eraId === era.id),
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
