// Terrain — the landscape view of Scripture.
//
// Primitives:
//   Dimension — a way of looking at the landscape (Story, People, Places,
//               Timeline). Only Story is live; the rest are placeholders
//               that already exist architecturally.
//   Stop      — a destination on the journey: a Collection of books.
//   Branch    — a stop connected sideways rather than forward (Chronicles:
//               a parallel retelling, not the next stop).
//   Gap       — a stretch of the path where the story goes silent
//               (the 400 years between the testaments).
//   Layer     — future overlays on the Story terrain (prophets, wisdom,
//               themes, geography, cross references, journeys). Declared
//               here so the terrain's shape never changes when they land.
//
// The journey composes as an ordered list of segments (stop | gap).
// Books resolve against the canonical BIBLE_INDEX; nothing here duplicates
// book data.

import { getBookBySlug } from './bible-index';

// ---------------------------------------------------------------------------
// Dimensions
// ---------------------------------------------------------------------------

export type DimensionId = 'story' | 'people' | 'places' | 'timeline';

export interface Dimension {
  id: DimensionId;
  label: string;
  status: 'live' | 'coming-soon';
  tagline: string;
}

export const DIMENSIONS: Dimension[] = [
  { id: 'story', label: 'Story', status: 'live', tagline: 'One storyline, beginning to end' },
  { id: 'people', label: 'People', status: 'coming-soon', tagline: 'The lives the story follows' },
  { id: 'places', label: 'Places', status: 'coming-soon', tagline: 'The ground it happened on' },
  { id: 'timeline', label: 'Timeline', status: 'coming-soon', tagline: 'The centuries it spans' },
];

// ---------------------------------------------------------------------------
// Layers (architectural placeholder — no UI yet)
// ---------------------------------------------------------------------------

export type LayerId =
  | 'prophets'
  | 'wisdom'
  | 'themes'
  | 'geography'
  | 'cross-references'
  | 'journeys';

export interface TerrainLayer {
  id: LayerId;
  label: string;
}

// Empty until layers ship. The Story terrain below must never change shape
// to accommodate a layer — layers attach to stops, they don't reroute the path.
export const LAYERS: TerrainLayer[] = [];

// ---------------------------------------------------------------------------
// The Story journey
// ---------------------------------------------------------------------------

export interface TerrainBook {
  slug: string;
  name: string;
  chapterCount: number;
  href: string;
}

export interface TerrainBranch {
  id: string;
  title: string;
  relation: string; // why it sits beside, not after — "A parallel retelling"
  bookSlugs: string[];
}

export interface TerrainStopDef {
  id: string;
  title: string;
  bookSlugs: string[];
  branch?: TerrainBranch;
}

export type TerrainSegmentDef =
  | { kind: 'stop'; stop: TerrainStopDef }
  | { kind: 'gap'; id: string; label: string; note: string };

const STORY_JOURNEY: TerrainSegmentDef[] = [
  {
    kind: 'stop',
    stop: {
      id: 'torah',
      title: 'Torah',
      bookSlugs: ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy'],
    },
  },
  {
    kind: 'stop',
    stop: {
      id: 'joshua-judges-ruth',
      title: 'Joshua, Judges, Ruth',
      bookSlugs: ['joshua', 'judges', 'ruth'],
    },
  },
  {
    kind: 'stop',
    stop: {
      id: 'samuel-kings',
      title: 'Samuel & Kings',
      bookSlugs: ['1-samuel', '2-samuel', '1-kings', '2-kings'],
      branch: {
        id: 'chronicles',
        title: 'Chronicles',
        relation: 'A parallel retelling',
        bookSlugs: ['1-chronicles', '2-chronicles'],
      },
    },
  },
  {
    kind: 'stop',
    stop: {
      id: 'ezra-nehemiah-esther',
      title: 'Ezra, Nehemiah, Esther',
      bookSlugs: ['ezra', 'nehemiah', 'esther'],
    },
  },
  {
    kind: 'gap',
    id: 'four-hundred-years',
    label: '400 Years',
    note: 'Four centuries of silence between the testaments',
  },
  {
    kind: 'stop',
    stop: {
      id: 'gospels',
      title: 'Gospels',
      bookSlugs: ['matthew', 'mark', 'luke', 'john'],
    },
  },
  {
    kind: 'stop',
    stop: {
      id: 'acts',
      title: 'Acts',
      bookSlugs: ['acts'],
    },
  },
  {
    kind: 'stop',
    stop: {
      id: 'letters',
      title: 'Letters',
      bookSlugs: [
        'romans',
        '1-corinthians',
        '2-corinthians',
        'galatians',
        'ephesians',
        'philippians',
        'colossians',
        '1-thessalonians',
        '2-thessalonians',
        '1-timothy',
        '2-timothy',
        'titus',
        'philemon',
        'hebrews',
        'james',
        '1-peter',
        '2-peter',
        '1-john',
        '2-john',
        '3-john',
        'jude',
      ],
    },
  },
  {
    kind: 'stop',
    stop: {
      id: 'revelation',
      title: 'Revelation',
      bookSlugs: ['revelation'],
    },
  },
];

// ---------------------------------------------------------------------------
// Resolution — serializable shapes the client components render directly
// ---------------------------------------------------------------------------

export interface ResolvedBranch {
  id: string;
  title: string;
  relation: string;
  books: TerrainBook[];
}

export interface ResolvedStop {
  id: string;
  title: string;
  books: TerrainBook[];
  branch?: ResolvedBranch;
}

export type ResolvedSegment =
  | { kind: 'stop'; stop: ResolvedStop }
  | { kind: 'gap'; id: string; label: string; note: string };

/** Books with dedicated experiences keep their own entry points. */
function bookHref(slug: string): string {
  if (slug === 'genesis') return '/genesis';
  if (slug === 'psalms') return '/psalms';
  return `/${slug}`;
}

function resolveBooks(slugs: string[]): TerrainBook[] {
  return slugs.flatMap((slug) => {
    const book = getBookBySlug(slug);
    if (!book) return [];
    return [
      {
        slug: book.slug,
        name: book.name,
        chapterCount: book.chapterCount,
        href: bookHref(book.slug),
      },
    ];
  });
}

/** The Story dimension's journey, resolved and ready to render. */
export function getStoryTerrain(): ResolvedSegment[] {
  return STORY_JOURNEY.map((segment) => {
    if (segment.kind === 'gap') return segment;
    const { stop } = segment;
    return {
      kind: 'stop' as const,
      stop: {
        id: stop.id,
        title: stop.title,
        books: resolveBooks(stop.bookSlugs),
        branch: stop.branch
          ? {
              id: stop.branch.id,
              title: stop.branch.title,
              relation: stop.branch.relation,
              books: resolveBooks(stop.branch.bookSlugs),
            }
          : undefined,
      },
    };
  });
}
