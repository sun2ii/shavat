'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useReadingProgress } from '@/components/providers/ReadingProgressProvider';
import PageHeader from '@/components/PageHeader';
import { getBooksByTopLevelCategory } from '@/lib/top-level-categories';
import { readingPath } from '@/lib/routes';
import { CATEGORIES } from '@/lib/bible-metadata';
import { getAllBooks } from '@/lib/genesis-collections';
import { getAllCollections } from '@/lib/psalms-collections';
import { getAllDivisions as getMarkDivisions } from '@/lib/mark-collections';
import { getAllDivisions } from '@/lib/book-metadata-utils';
import { divisionHasCommentary } from '@/lib/hasCommentary';
import { divisionHasWritings } from '@/lib/hasWritings';
import { divisionHasSpeakers } from '@/lib/hasSpeakers';
import { getBookTheme } from '@/lib/getBookThemes';
import { GENESIS_SECTIONS } from '@/lib/genesis-views';

// A section is one render unit (a group of books). A tab shows one or more
// sections: "ot" composes judges + kingdom + prophets + wisdom under headings.
type SectionId = 'torah' | 'judges' | 'kingdom' | 'prophets' | 'seventeen' | 'wisdom' | 'gospels' | 'apostolic';
type TabId = 'ot' | 'seventeen' | 'nt';

const TAB_SECTIONS: Record<TabId, SectionId[]> = {
  ot: ['torah', 'judges', 'kingdom', 'prophets', 'wisdom'],
  seventeen: ['seventeen'],
  nt: ['gospels', 'apostolic'],
};

// Old per-section URLs still resolve to the tab that now contains them.
const LEGACY_TABS: Record<string, TabId> = {
  torah: 'ot',
  judges: 'ot',
  kingdom: 'ot',
  prophets: 'ot',
  wisdom: 'ot',
  gospels: 'nt',
  apostolic: 'nt',
};

// Headings shown above each section inside a multi-section tab.
const SECTION_HEADINGS: Record<SectionId, { title: string; sub: string }> = {
  torah: { title: 'Torah', sub: 'The Five Books of Moses' },
  judges: { title: 'Judges', sub: 'Joshua, Judges, Ruth' },
  kingdom: { title: 'Kings', sub: 'Samuel, Kings & Chronicles' },
  prophets: { title: 'Prophets', sub: 'Isaiah, Jeremiah, Ezekiel' },
  seventeen: { title: '17', sub: 'Minor Prophets & Restoration' },
  wisdom: { title: 'Wisdom & Poetry', sub: 'Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon' },
  gospels: { title: 'Gospels', sub: 'The Four Gospels' },
  apostolic: { title: 'Apostolic', sub: 'Acts, Epistles & Revelation' },
};

type FocusableCard = {
  id: string;
  href: string;
  bookSlug: string;
  categoryId?: string;
};

const TABS = [
  { id: 'ot' as TabId, label: 'OT' },
  { id: 'seventeen' as TabId, label: '17' },
  { id: 'nt' as TabId, label: 'NT' },
];


// Acts in three phases matching the geographical/structural flow of the book.
// The fine-grained divisions in acts-metadata.json still drive the reader once inside.
const ACTS_SECTIONS = [
  {
    id: 'acts:early-church',
    title: 'Early Church',
    theme: 'Jerusalem → Judea → Samaria',
    href: '/acts/birth-of-the-church/1',
    scripture: 'Acts 1–12',
    chapters: Array.from({ length: 12 }, (_, i) => i + 1),
  },
  {
    id: 'acts:pauls-journeys',
    title: "Paul's Journeys",
    theme: 'Antioch → Asia Minor → Greece',
    href: '/acts/first-missionary-journey/13',
    scripture: 'Acts 13–20',
    chapters: Array.from({ length: 8 }, (_, i) => i + 13),
  },
  {
    id: 'acts:to-rome',
    title: 'To Rome',
    theme: 'Arrest → Trials → Rome',
    href: '/acts/pauls-arrest/21',
    scripture: 'Acts 21–28',
    chapters: Array.from({ length: 8 }, (_, i) => i + 21),
  },
];

/*
  Pauline Epistles organized by theme.

  01 EARLY CHURCH: Galatians, 1-2 Thessalonians
  02 CHURCH & GOSPEL: 1-2 Corinthians, Romans
  03 LIFE IN CHRIST: Philippians, Philemon, Colossians, Ephesians
  04 LEADING THE CHURCH: 1 Timothy, Titus, 2 Timothy
*/
type PaulineEra = {
  id: string;
  number: string;
  title: string;
  books: string[];
};

const PAULINE_ERAS: PaulineEra[] = [
  {
    id: 'early-church',
    number: '01',
    title: 'Early Church',
    books: ['galatians', '1-thessalonians', '2-thessalonians'],
  },
  {
    id: 'church-gospel',
    number: '02',
    title: 'Church & Gospel',
    books: ['romans', '1-corinthians', '2-corinthians'],
  },
  {
    id: 'life-in-christ',
    number: '03',
    title: 'Life in Christ',
    books: ['philemon', 'philippians', 'colossians', 'ephesians'],
  },
  {
    id: 'leading-the-church',
    number: '04',
    title: 'Leading the Church',
    books: ['titus', '1-timothy', '2-timothy'],
  },
];

/*
  General Epistles organized by authorship.

  01 JESUS' DISCIPLES: 1-2 Peter, 1-2-3 John
  02 OTHER: Hebrews, James, Jude
*/
type GeneralEra = {
  id: string;
  number: string;
  title: string;
  books: string[];
};

const GENERAL_ERAS: GeneralEra[] = [
  {
    id: 'jesus-disciples',
    number: '01',
    title: "Jesus' Disciples",
    books: ['1-peter', '2-peter', '1-john', '2-john', '3-john'],
  },
  {
    id: 'other',
    number: '02',
    title: 'Other Voices',
    books: ['hebrews', 'james', 'jude'],
  },
];

const MASTHEAD: Record<TabId, { kicker: string; title: string }> = {
  ot: { kicker: 'Torah, History, Prophets & Wisdom', title: 'Old Testament' },
  seventeen: { kicker: 'Minor Prophets & Restoration', title: '17 Prophets' },
  nt: { kicker: 'Gospels, Acts, Epistles & Revelation', title: 'New Testament' },
};

// Prophet eras for the "17" section
type ProphetEra = 'north' | 'south' | 'exile' | 'return-era' | 'restoration';

const PROPHET_ERAS: { id: ProphetEra; label: string }[] = [
  { id: 'north', label: 'North' },
  { id: 'south', label: 'South' },
  { id: 'exile', label: 'Exile' },
  { id: 'return-era', label: 'Return' },
  { id: 'restoration', label: 'Restoration' },
];

// The three large prophetic books (Isaiah 66ch, Jeremiah 52ch, Ezekiel 48ch)
const BIG_THREE = ['isaiah', 'jeremiah', 'ezekiel'];

// Data for "17" group only (the three big books are handled separately)
const PROPHET_DATA: Record<string, { era: ProphetEra; anchor: string }> = {
  // North - prophets to the northern kingdom (Israel)
  'jonah': { era: 'north', anchor: '2 Kings 14:23–29' },
  'amos': { era: 'north', anchor: '2 Kings 14:23–29' },
  'hosea': { era: 'north', anchor: '2 Kings 14–17' },
  // South - prophets to the southern kingdom (Judah)
  'micah': { era: 'south', anchor: '2 Kings 15:32–20' },
  'nahum': { era: 'south', anchor: '~2 Kings 21–23' },
  'zephaniah': { era: 'south', anchor: '2 Kings 22–23' },
  'habakkuk': { era: 'south', anchor: '~2 Kings 23–24' },
  // Exile - Jerusalem has fallen, God's people in exile
  'lamentations': { era: 'exile', anchor: '2 Kings 25' },
  'daniel': { era: 'exile', anchor: '2 Kings 24' },
  'obadiah': { era: 'exile', anchor: '~2 Kings 25' },
  // Return - exiles return and rebuild
  'haggai': { era: 'return-era', anchor: 'Ezra 4–6' },
  'zechariah': { era: 'return-era', anchor: 'Ezra 5–6' },
  'malachi': { era: 'return-era', anchor: 'Ezra–Nehemiah' },
  'joel': { era: 'return-era', anchor: 'Date uncertain' },
  // Restoration - post-exilic narratives
  'ezra': { era: 'restoration', anchor: '538–458 BC' },
  'nehemiah': { era: 'restoration', anchor: '445–432 BC' },
  'esther': { era: 'restoration', anchor: '483–473 BC' },
};

/*
  Accents — one per book, and they are only ever a LINE. Never a fill.

  A card carries no color at rest: same surface, same hairline, every one of
  them. The book's accent shows up in exactly two places — the rule under its
  heading, and the card's left edge on hover. That is enough to say "these six
  belong to Joshua" without six tinted rectangles competing for the eye.

  Chroma is higher than a fill could ever take, because a 1–2px line needs it
  to register at all. Lightness sits mid-scale so one value works on paper and
  on ink without a dark-mode variant.
*/
const ACCENTS = [
  'oklch(72% 0.11 85)',  // gold
  'oklch(60% 0.07 140)', // olive
  'oklch(55% 0.09 245)', // deep blue
  'oklch(57% 0.13 25)',  // crimson
  'oklch(60% 0.07 195)', // teal
  'oklch(55% 0.07 305)', // plum
];

/*
  A card earns at most one mark: gold = commentary, green = reflections.
  A dot instead of a labeled pill — at eight columns the word costs more
  than the signal is worth.
*/
// Format scripture range like "Genesis 1–3" or "Exodus 5–11"
function formatScripture(bookName: string, chapters: number[]): string {
  if (chapters.length === 0) return bookName;
  const first = chapters[0];
  const last = chapters[chapters.length - 1];
  return first === last ? `${bookName} ${first}` : `${bookName} ${first}–${last}`;
}

// Group heading inside a tab (Torah, Judges, Kings… and the 17's eras).
// Deliberately unlike everything around it: sans, uppercase, wide-tracked,
// and a deep blue-teal that is neither the ink of book names nor the amber
// accent. No rule — the color and the type do the separating.
function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-0.5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
      <h2 className="font-sans text-lg font-bold uppercase tracking-[0.18em] text-[#2f6f8f] dark:text-[#8fc1da]">
        {title}
      </h2>
      {sub && <span className="font-serif italic text-[12px] text-muted">{sub}</span>}
    </div>
  );
}

function BookHeader({ number, name, sub, noBorder }: { number?: string; name: string; sub?: string; noBorder?: boolean }) {
  // Every book starts collapsed to this header row on every breakpoint.
  // Click to unfold its cards. The `book-collapsed` class hides all following
  // siblings in the section via a rule in globals.css.
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((v) => !v)}
      role="button"
      aria-expanded={open}
      className={`flex flex-wrap items-baseline gap-2 pt-1.5 pb-1 ${noBorder ? '' : 'border-t border-hairline'} cursor-pointer select-none hover:text-gold ${
        open ? '' : 'book-collapsed'
      }`}
    >
      {number && <span className="font-serif text-[11px] font-bold text-gold">{number}</span>}
      <div className="flex flex-wrap items-baseline gap-2.5">
        <span className="font-serif text-lg font-bold text-ink leading-none">{name}</span>
        {sub && <span className="font-serif italic text-[11px] text-muted">{sub}</span>}
      </div>
      <span
        aria-hidden="true"
        className={`ml-auto font-sans text-faint transition-transform ${open ? 'rotate-90' : ''}`}
      >
        ›
      </span>
    </div>
  );
}

function DivisionCard({
  href,
  title,
  scripture,
  hasCommentary,
  hasWritings,
  hasSpeakers,
  hasPlaces,
  hasPeople,
  hasMap,
  accent,
  focused,
  isComplete,
}: {
  href: string;
  title: string;
  scripture: string;
  theme?: string;
  hasCommentary?: boolean;
  hasWritings?: boolean;
  hasSpeakers?: boolean;
  hasPlaces?: boolean;
  hasPeople?: boolean;
  hasMap?: boolean;
  accent: string;
  focused?: boolean;
  isComplete?: boolean;
}) {
  // Content-type dots (commentary, writings, voices, places, people, map) were
  // removed from the grid as noise. The flags are still accepted so the many
  // call sites need no change, but nothing renders from them.
  void hasCommentary; void hasWritings; void hasSpeakers; void hasPlaces; void hasPeople; void hasMap;
  return (
    /*
      One surface, one hairline, on every card in the app. The left border is
      2px at rest as well as on hover — it only changes color, so nothing
      reflows. Feedback lives in the hover state, not in the resting card.
    */
    <Link
      href={href}
      style={{ '--accent': accent } as React.CSSProperties}
      className={`relative block rounded px-2 py-2 border shadow-sm hover:shadow-md transition-[background-color,border-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-gold/10 hover:border-gold/50 active:bg-gold/10 active:border-gold/50 text-center ${
        isComplete
          ? 'bg-emerald-500/5 border-emerald-500/30'
          : 'bg-surface border-hairline'
      } ${
        focused
          ? 'ring-2 ring-gold'
          : 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold'
      }`}
    >
      <div className="font-serif text-[12px] leading-tight text-ink">
        {title}
      </div>
      <div className="font-sans text-[10px] text-gold mt-0.5">
        {scripture}
      </div>
    </Link>
  );
}

const VALID_TABS: TabId[] = ['ot', 'seventeen', 'nt'];

export default function LibraryPage() {
  const params = useParams();
  const router = useRouter();
  const rawTab = params.category as string;
  const activeTab: TabId = VALID_TABS.includes(rawTab as TabId)
    ? (rawTab as TabId)
    : LEGACY_TABS[rawTab] ?? 'ot';
  const sections = TAB_SECTIONS[activeTab];

  // Rewrite legacy section URLs (/library/judges etc.) to their tab.
  useEffect(() => {
    if (LEGACY_TABS[rawTab]) router.replace(`/library/${LEGACY_TABS[rawTab]}`);
  }, [rawTab, router]);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  // Get reading progress from context (server-side fetched, no delay)
  const { isDivisionComplete } = useReadingProgress();

  // Calculate progress stats for the current tab
  const tabProgress = useMemo(() => {
    let totalDivisions = 0;
    let completedDivisions = 0;

    const countDivisions = (bookSlug: string, divisions: { chapters: number[] }[]) => {
      divisions.forEach((div) => {
        totalDivisions++;
        if (isDivisionComplete(bookSlug, div.chapters)) {
          completedDivisions++;
        }
      });
    };

    const countSingleBook = (bookSlug: string, chapterCount: number) => {
      const allChapters = Array.from({ length: chapterCount }, (_, i) => i + 1);
      totalDivisions++;
      if (isDivisionComplete(bookSlug, allChapters)) {
        completedDivisions++;
      }
    };

    for (const sectionId of sections) switch (sectionId) {
      case 'torah':
        getBooksByTopLevelCategory('torah').forEach((book) => {
          if (book.slug === 'genesis') {
            GENESIS_SECTIONS.forEach((sec) => {
              const chapters = Array.from(
                { length: sec.endChapter - sec.startChapter + 1 },
                (_, i) => sec.startChapter + i
              );
              totalDivisions++;
              if (isDivisionComplete('genesis', chapters)) completedDivisions++;
            });
          } else {
            const divisions = getAllDivisions(book.slug);
            if (divisions.length > 0) {
              countDivisions(book.slug, divisions);
            } else {
              countSingleBook(book.slug, book.chapterCount);
            }
          }
        });
        break;
      case 'gospels':
        getBooksByTopLevelCategory('gospels').forEach((book) => {
          const divisions = book.slug === 'mark' ? getMarkDivisions() : getAllDivisions(book.slug);
          if (divisions.length > 0) {
            countDivisions(book.slug, divisions as { chapters: number[] }[]);
          } else {
            countSingleBook(book.slug, book.chapterCount);
          }
        });
        break;
      case 'judges':
        ['joshua', 'judges', 'ruth'].forEach((slug) => {
          const book = getBooksByTopLevelCategory('historical').find(b => b.slug === slug);
          if (!book) return;
          const divisions = getAllDivisions(slug);
          if (divisions.length > 0) {
            countDivisions(slug, divisions);
          } else {
            countSingleBook(slug, book.chapterCount);
          }
        });
        break;
      case 'kingdom':
        ['1-samuel', '2-samuel', '1-kings', '2-kings', '1-chronicles', '2-chronicles'].forEach((slug) => {
          const book = getBooksByTopLevelCategory('historical').find(b => b.slug === slug);
          if (!book) return;
          const divisions = getAllDivisions(slug);
          if (divisions.length > 0) {
            countDivisions(slug, divisions);
          } else {
            countSingleBook(slug, book.chapterCount);
          }
        });
        break;
      case 'prophets':
        // Just the 3 big prophets: Isaiah, Jeremiah, Ezekiel
        BIG_THREE.forEach((slug) => {
          const book = getBooksByTopLevelCategory('prophets').find(b => b.slug === slug);
          if (!book) return;
          const divisions = getAllDivisions(slug);
          if (divisions.length > 0) {
            countDivisions(slug, divisions);
          } else {
            countSingleBook(slug, book.chapterCount);
          }
        });
        break;
      case 'seventeen':
        // The 17: minor prophets + Lamentations, Daniel + Ezra, Nehemiah, Esther
        const seventeenSlugs = [
          ...getBooksByTopLevelCategory('prophets').filter(b => !BIG_THREE.includes(b.slug)).map(b => b.slug),
          'ezra', 'nehemiah', 'esther'
        ];
        seventeenSlugs.forEach((slug) => {
          const book = getBooksByTopLevelCategory('prophets').find(b => b.slug === slug)
            || getBooksByTopLevelCategory('historical').find(b => b.slug === slug);
          if (!book) return;
          const divisions = getAllDivisions(slug);
          if (divisions.length > 0) {
            countDivisions(slug, divisions);
          } else {
            countSingleBook(slug, book.chapterCount);
          }
        });
        break;
      case 'wisdom':
        getBooksByTopLevelCategory('wisdom').forEach((book) => {
          if (book.slug === 'psalms') {
            getAllCollections().forEach((col) => {
              totalDivisions++;
              if (isDivisionComplete('psalms', col.psalms)) completedDivisions++;
            });
          } else {
            const divisions = getAllDivisions(book.slug);
            if (divisions.length > 0) {
              countDivisions(book.slug, divisions);
            } else {
              countSingleBook(book.slug, book.chapterCount);
            }
          }
        });
        break;
      case 'apostolic':
        getBooksByTopLevelCategory('apostolic').forEach((book) => {
          if (book.slug === 'acts') {
            // Acts has 3 sections now
            ACTS_SECTIONS.forEach((section) => {
              totalDivisions++;
              if (isDivisionComplete('acts', section.chapters)) completedDivisions++;
            });
          } else {
            countSingleBook(book.slug, book.chapterCount);
          }
        });
        break;
    }

    const percentage = totalDivisions > 0 ? Math.round((completedDivisions / totalDivisions) * 100) : 0;
    return { completed: completedDivisions, total: totalDivisions, percentage };
  }, [sections, isDivisionComplete]);

  const genesisBooks = getAllBooks();
  const psalmsCollections = getAllCollections();
  const markDivisions = getMarkDivisions();

  // Focusable cards in the exact order the tab renders them (keyboard navigation).
  const extractFocusableCards = (): FocusableCard[] => {
    const cards: FocusableCard[] = [];

    const pushDivided = (
      bookSlug: string,
      divisions: ReturnType<typeof getAllDivisions>,
      routePrefix: string,
      categoryId?: string,
    ) => {
      divisions.forEach((division) => {
        cards.push({
          id: `${bookSlug}:${division.id}`,
          href: readingPath(routePrefix, division.id, division.chapters[0]),
          bookSlug,
          categoryId,
        });
      });
    };

    for (const sectionId of sections) switch (sectionId) {
      case 'torah': {
        getBooksByTopLevelCategory('torah').forEach((book) => {
          const divisions =
            book.slug === 'genesis'
              ? (genesisBooks as unknown as ReturnType<typeof getAllDivisions>)
              : getAllDivisions(book.slug);
          if (divisions.length > 0) {
            pushDivided(book.slug, divisions, book.slug);
          } else {
            cards.push({ id: book.slug, href: readingPath(book.slug, 1), bookSlug: book.slug });
          }
        });
        break;
      }
      case 'gospels': {
        getBooksByTopLevelCategory('gospels').forEach((book) => {
          const divisions =
            book.slug === 'mark'
              ? (markDivisions as unknown as ReturnType<typeof getAllDivisions>)
              : getAllDivisions(book.slug);
          if (divisions.length > 0) {
            pushDivided(book.slug, divisions, book.slug);
          } else {
            cards.push({ id: book.slug, href: readingPath(book.slug, 1), bookSlug: book.slug });
          }
        });
        break;
      }
      case 'wisdom':
      case 'prophets': {
        const books = getBooksByTopLevelCategory(sectionId);
        books.forEach((book) => {
          if (book.slug === 'psalms') {
            // Psalms uses collections
            psalmsCollections.forEach((collection) => {
              cards.push({
                id: collection.id,
                href: `/psalms/${collection.id}/${collection.psalms[0]}`,
                bookSlug: 'psalms',
              });
            });
            return;
          }
          const divisions = getAllDivisions(book.slug);
          if (divisions.length > 0) {
            pushDivided(book.slug, divisions, book.slug);
          } else {
            cards.push({ id: book.slug, href: readingPath(book.slug, 1), bookSlug: book.slug });
          }
        });
        break;
      }
      case 'apostolic': {
        const books = getBooksByTopLevelCategory(sectionId);

        // Acts sections
        ACTS_SECTIONS.forEach((section) => {
          cards.push({
            id: section.id,
            href: section.href,
            bookSlug: 'acts',
            categoryId: 'acts',
          });
        });

        // Pauline epistles in chronological order
        PAULINE_ERAS.forEach((era) => {
          era.books.forEach((slug) => {
            const book = books.find((b) => b.slug === slug);
            if (book) {
              cards.push({
                id: book.slug,
                href: readingPath(book.slug, 1),
                bookSlug: book.slug,
                categoryId: 'pauline',
              });
            }
          });
        });

        // General epistles
        books
          .filter((b) => b.category === 'general')
          .forEach((book) => {
            cards.push({
              id: book.slug,
              href: readingPath(book.slug, 1),
              bookSlug: book.slug,
              categoryId: 'general',
            });
          });

        // Revelation
        books
          .filter((b) => b.category === 'apocalypse')
          .forEach((book) => {
            cards.push({
              id: book.slug,
              href: readingPath(book.slug, 1),
              bookSlug: book.slug,
              categoryId: 'apocalypse',
            });
          });

        break;
      }
    }

    return cards;
  };

  const focusableCards = extractFocusableCards();
  const focusedCardId =
    focusedCardIndex !== null ? focusableCards[focusedCardIndex]?.id ?? null : null;

  // Must track the grid classes exactly, or arrow keys skip rows:
  // grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7.
  const getGridColumns = () => {
    if (typeof window === 'undefined') return 7;
    const width = window.innerWidth;
    if (width < 640) return 2;
    if (width < 768) return 3;
    if (width < 1024) return 4;
    return 7;
  };
  const [gridColumns, setGridColumns] = useState(getGridColumns);

  useEffect(() => {
    const handleResize = () => setGridColumns(getGridColumns());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset focus when the visible card set changes.
  useEffect(() => {
    setFocusedCardIndex(null);
  }, [activeTab]);

  // Keep the focused card in view.
  useEffect(() => {
    if (focusedCardIndex === null) return;
    const focusedCard = focusableCards[focusedCardIndex];
    if (!focusedCard) return;
    const cardElement = document.querySelector(`a[href="${focusedCard.href}"]`);
    cardElement?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }, [focusedCardIndex, focusedCardId, focusableCards]);

  // Keyboard navigation: arrows move, Enter opens, 1-5 switch tabs.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedCardIndex((prev) => (prev === null ? 0 : Math.max(0, prev - 1)));
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedCardIndex((prev) =>
          prev === null ? 0 : Math.min(focusableCards.length - 1, prev + 1),
        );
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedCardIndex((prev) => (prev === null ? 0 : Math.max(0, prev - gridColumns)));
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedCardIndex((prev) => {
          if (prev === null) return 0;

          const currentCard = focusableCards[prev];
          const tentativeIndex = prev + gridColumns;

          if (tentativeIndex < focusableCards.length) {
            const tentativeCard = focusableCards[tentativeIndex];

            // Crossing into a new category: land on its first card.
            if (
              currentCard.categoryId &&
              tentativeCard.categoryId &&
              currentCard.categoryId !== tentativeCard.categoryId
            ) {
              const first = focusableCards.findIndex(
                (card) => card.categoryId === tentativeCard.categoryId,
              );
              return first !== -1 ? first : tentativeIndex;
            }

            // Crossing into a new book: land on its first card.
            if (currentCard.bookSlug !== tentativeCard.bookSlug) {
              const first = focusableCards.findIndex(
                (card) => card.bookSlug === tentativeCard.bookSlug,
              );
              return first !== -1 ? first : tentativeIndex;
            }
          }

          return Math.min(focusableCards.length - 1, tentativeIndex);
        });
        return;
      }

      if (e.key === 'Enter') {
        if (focusedCardIndex !== null && focusableCards[focusedCardIndex]) {
          e.preventDefault();
          router.push(focusableCards[focusedCardIndex].href);
        }
        return;
      }

      // Number keys 1-9 navigate to tabs dynamically based on TABS array
      // Only trigger when no modifier keys are held (Cmd/Ctrl/Alt)
      const numKey = parseInt(e.key, 10);
      if (numKey >= 1 && numKey <= TABS.length && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tab = TABS[numKey - 1];
        if (tab) {
          router.push(`/library/${tab.id}`);
        }
      }

      // ? opens shortcuts modal
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
      }

      // / opens search modal
      if (e.key === '/' && !e.shiftKey) {
        e.preventDefault();
        setShowSearch(true);
      }

      // Escape closes modals
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setShowSearch(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, focusableCards, focusedCardIndex, gridColumns, activeTab]);

  // Render a whole "book" that has thematic divisions (Genesis, Mark, ...).
  const renderDividedBook = (
    book: { slug: string; name: string; chapterCount: number },
    number: string,
    divisions: ReturnType<typeof getAllDivisions>,
    routePrefix?: string,
  ) => {
    if (divisions.length === 0) return null;
    const prefix = routePrefix ?? book.slug;
    // One accent for the whole book; `number` is its 1-based position.
    const accent = ACCENTS[(parseInt(number, 10) - 1) % ACCENTS.length];
    return (
      <section key={book.slug}>
        <BookHeader number={number} name={book.name} sub={`${divisions.length} sections · ${book.chapterCount} chapters`} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
          {divisions.map((division) => {
            const hasCommentary = divisionHasCommentary(book.slug, division.chapters);
            const hasWritings = divisionHasWritings(book.slug, division.chapters);
            const hasSpeakers = divisionHasSpeakers(book.slug, division.chapters);
            return (
              <DivisionCard
                key={division.id}
                href={readingPath(prefix, division.id, division.chapters[0])}
                title={division.title.replace('The Book of ', '').replace(/^The /, '')}
                scripture={formatScripture(book.name, division.chapters)}
                theme={division.theme}
                hasCommentary={hasCommentary}
                hasWritings={hasWritings}
                hasSpeakers={hasSpeakers}
                accent={accent}
                focused={focusedCardId === `${book.slug}:${division.id}`}
                isComplete={isDivisionComplete(book.slug, division.chapters)}
              />
            );
          })}
        </div>
      </section>
    );
  };

  // One tab = one or more sections. A single-section tab renders bare; a
  // multi-section tab (OT) puts a heading above each section.
  const renderTabContent = () => {
    if (sections.length === 1) return renderSection(sections[0]);
    return (
      <div className="space-y-3">
        {sections.map((id) => {
          const heading = SECTION_HEADINGS[id];
          return (
            <section key={id}>
              <SectionHeading title={heading.title} sub={heading.sub} />
              {renderSection(id)}
            </section>
          );
        })}
      </div>
    );
  };

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'torah': {
        const torahBooks = getBooksByTopLevelCategory('torah');
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
            {torahBooks.map((book, idx) => {
              const number = String(idx + 1).padStart(2, '0');
              const accent = ACCENTS[idx % ACCENTS.length];

              // Genesis uses section views
              if (book.slug === 'genesis') {
                return (
                  <section key={book.slug}>
                    <BookHeader number={number} name={book.name} sub={`${GENESIS_SECTIONS.length} sections · 50 chapters`} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                      {GENESIS_SECTIONS.map((item) => {
                        const chapters = Array.from(
                          { length: item.endChapter - item.startChapter + 1 },
                          (_, i) => item.startChapter + i
                        );
                        return (
                          <DivisionCard
                            key={item.title}
                            href={readingPath('genesis', item.startChapter)}
                            title={item.title}
                            scripture={item.scripture}
                            hasCommentary={divisionHasCommentary('genesis', chapters)}
                            hasWritings={divisionHasWritings('genesis', chapters)}
                            hasSpeakers={divisionHasSpeakers('genesis', chapters)}
                            accent={accent}
                            isComplete={isDivisionComplete('genesis', chapters)}
                          />
                        );
                      })}
                    </div>
                  </section>
                );
              }

              // Other Torah books use the standard divisions
              const divisions = getAllDivisions(book.slug);
              if (divisions.length > 0) {
                return renderDividedBook(book, number, divisions, book.slug);
              }
              return (
                <section key={book.slug}>
                  <BookHeader number={number} name={book.name} sub={`${book.chapterCount} chapters`} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                    <DivisionCard
                      href={readingPath(book.slug, 1)}
                      title={`Read ${book.name}`}
                      scripture={formatScripture(book.name, Array.from({ length: book.chapterCount }, (_, i) => i + 1))}
                      theme={getBookTheme(book.slug)}
                      hasCommentary={divisionHasCommentary(book.slug, Array.from({ length: book.chapterCount }, (_, i) => i + 1))}
                      hasWritings={divisionHasWritings(book.slug, Array.from({ length: book.chapterCount }, (_, i) => i + 1))}
                      hasSpeakers={divisionHasSpeakers(book.slug, Array.from({ length: book.chapterCount }, (_, i) => i + 1))}
                      accent={accent}
                      focused={focusedCardId === book.slug}
                      isComplete={isDivisionComplete(book.slug, Array.from({ length: book.chapterCount }, (_, i) => i + 1))}
                    />
                  </div>
                </section>
              );
            })}
          </div>
        );
      }

      case 'gospels': {
        const gospelBooks = getBooksByTopLevelCategory('gospels');
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
            {gospelBooks.map((book, idx) => {
              const divisions =
                book.slug === 'mark'
                  ? (markDivisions as unknown as ReturnType<typeof getAllDivisions>)
                  : getAllDivisions(book.slug);
              const number = String(idx + 1).padStart(2, '0');
              if (divisions.length > 0) {
                return renderDividedBook(book, number, divisions, book.slug);
              }
              return (
                <section key={book.slug}>
                  <BookHeader number={number} name={book.name} sub={`${book.chapterCount} chapters`} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                    <DivisionCard
                      href={readingPath(book.slug, 1)}
                      title={`Read ${book.name}`}
                      scripture={formatScripture(book.name, Array.from({ length: book.chapterCount }, (_, i) => i + 1))}
                      theme={getBookTheme(book.slug)}
                      hasCommentary={divisionHasCommentary(book.slug, Array.from({ length: book.chapterCount }, (_, i) => i + 1))}
                      hasWritings={divisionHasWritings(book.slug, Array.from({ length: book.chapterCount }, (_, i) => i + 1))}
                      hasSpeakers={divisionHasSpeakers(book.slug, Array.from({ length: book.chapterCount }, (_, i) => i + 1))}
                      accent={ACCENTS[idx % ACCENTS.length]}
                      focused={focusedCardId === book.slug}
                      isComplete={isDivisionComplete(book.slug, Array.from({ length: book.chapterCount }, (_, i) => i + 1))}
                    />
                  </div>
                </section>
              );
            })}
          </div>
        );
      }

      case 'judges': {
        // Joshua, Judges, Ruth
        const judgesSlugs = ['joshua', 'judges', 'ruth'];
        const judgesBooks = getBooksByTopLevelCategory('historical').filter(b => judgesSlugs.includes(b.slug));

        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
            {judgesBooks.map((book, idx) => {
              const number = String(idx + 1).padStart(2, '0');
              const accent = ACCENTS[idx % ACCENTS.length];
              const divisions = getAllDivisions(book.slug);

              if (divisions.length > 0) {
                return renderDividedBook(book, number, divisions, book.slug);
              }

              const allChapters = Array.from({ length: book.chapterCount }, (_, k) => k + 1);
              return (
                <section key={book.slug}>
                  <BookHeader number={number} name={book.name} sub={`${book.chapterCount} chapters`} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                    <DivisionCard
                      href={readingPath(book.slug, 1)}
                      title={`Read ${book.name}`}
                      scripture={formatScripture(book.name, allChapters)}
                      theme={getBookTheme(book.slug)}
                      hasCommentary={divisionHasCommentary(book.slug, allChapters)}
                      hasWritings={divisionHasWritings(book.slug, allChapters)}
                      hasSpeakers={divisionHasSpeakers(book.slug, allChapters)}
                      accent={accent}
                      focused={focusedCardId === book.slug}
                      isComplete={isDivisionComplete(book.slug, allChapters)}
                    />
                  </div>
                </section>
              );
            })}
          </div>
        );
      }

      case 'kingdom': {
        // 1-2 Samuel, 1-2 Kings, 1-2 Chronicles
        const kingdomSlugs = ['1-samuel', '2-samuel', '1-kings', '2-kings', '1-chronicles', '2-chronicles'];
        const kingdomBooks = getBooksByTopLevelCategory('historical').filter(b => kingdomSlugs.includes(b.slug));
        // Sort to ensure correct order
        kingdomBooks.sort((a, b) => kingdomSlugs.indexOf(a.slug) - kingdomSlugs.indexOf(b.slug));

        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
            {kingdomBooks.map((book, idx) => {
              const number = String(idx + 1).padStart(2, '0');
              const accent = ACCENTS[idx % ACCENTS.length];
              const divisions = getAllDivisions(book.slug);

              if (divisions.length > 0) {
                return renderDividedBook(book, number, divisions, book.slug);
              }

              const allChapters = Array.from({ length: book.chapterCount }, (_, k) => k + 1);
              return (
                <section key={book.slug}>
                  <BookHeader number={number} name={book.name} sub={`${book.chapterCount} chapters`} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                    <DivisionCard
                      href={readingPath(book.slug, 1)}
                      title={`Read ${book.name}`}
                      scripture={formatScripture(book.name, allChapters)}
                      theme={getBookTheme(book.slug)}
                      hasCommentary={divisionHasCommentary(book.slug, allChapters)}
                      hasWritings={divisionHasWritings(book.slug, allChapters)}
                      hasSpeakers={divisionHasSpeakers(book.slug, allChapters)}
                      accent={accent}
                      focused={focusedCardId === book.slug}
                      isComplete={isDivisionComplete(book.slug, allChapters)}
                    />
                  </div>
                </section>
              );
            })}
          </div>
        );
      }

      case 'prophets': {
        // Just the 3 big prophets: Isaiah, Jeremiah, Ezekiel
        const allProphetBooks = getBooksByTopLevelCategory('prophets');
        const bigThreeBooks = allProphetBooks.filter((book) => BIG_THREE.includes(book.slug));
        const sortedBigThree = bigThreeBooks.sort((a, b) =>
          BIG_THREE.indexOf(a.slug) - BIG_THREE.indexOf(b.slug)
        );

        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
            {sortedBigThree.map((book, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              const divisions = getAllDivisions(book.slug);

              if (divisions.length > 0) {
                return (
                  <div key={book.slug}>
                    <BookHeader
                      number={String(i + 1).padStart(2, '0')}
                      name={book.name}
                      sub={`${divisions.length} sections · ${book.chapterCount} ch`}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                      {divisions.map((division) => (
                        <DivisionCard
                          key={division.id}
                          href={readingPath(book.slug, division.id, division.chapters[0])}
                          title={division.title.replace('The Book of ', '').replace(/^The /, '')}
                          scripture={formatScripture(book.name, division.chapters)}
                          theme={division.theme}
                          hasCommentary={divisionHasCommentary(book.slug, division.chapters)}
                          hasWritings={divisionHasWritings(book.slug, division.chapters)}
                          hasSpeakers={divisionHasSpeakers(book.slug, division.chapters)}
                          accent={accent}
                          focused={focusedCardId === `${book.slug}:${division.id}`}
                          isComplete={isDivisionComplete(book.slug, division.chapters)}
                        />
                      ))}
                    </div>
                  </div>
                );
              } else {
                const allChapters = Array.from({ length: book.chapterCount }, (_, k) => k + 1);
                return (
                  <div key={book.slug}>
                    <BookHeader
                      number={String(i + 1).padStart(2, '0')}
                      name={book.name}
                      sub={`${book.chapterCount} chapters`}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                      <DivisionCard
                        href={readingPath(book.slug, 1)}
                        title={book.name}
                        scripture={formatScripture(book.name, allChapters)}
                        theme={getBookTheme(book.slug)}
                        hasCommentary={divisionHasCommentary(book.slug, allChapters)}
                        hasWritings={divisionHasWritings(book.slug, allChapters)}
                        hasSpeakers={divisionHasSpeakers(book.slug, allChapters)}
                        accent={accent}
                        focused={focusedCardId === book.slug}
                        isComplete={isDivisionComplete(book.slug, allChapters)}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      }

      case 'seventeen': {
        // The 17: minor prophets + Lamentations, Daniel + Ezra, Nehemiah, Esther
        const allProphetBooks = getBooksByTopLevelCategory('prophets');
        const restorationBooks = getBooksByTopLevelCategory('historical').filter(b =>
          ['ezra', 'nehemiah', 'esther'].includes(b.slug)
        );

        const eraOrder: Record<ProphetEra, string[]> = {
          'north': ['jonah', 'amos', 'hosea'],
          'south': ['micah', 'nahum', 'zephaniah', 'habakkuk'],
          'exile': ['lamentations', 'daniel', 'obadiah'],
          'return-era': ['haggai', 'zechariah', 'malachi', 'joel'],
          'restoration': ['ezra', 'nehemiah', 'esther'],
        };

        // Combine prophet books with restoration books
        const allBooksForEras = [...allProphetBooks, ...restorationBooks];

        let globalBookIndex = 0;

        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
            {PROPHET_ERAS.map((era) => {
              const eraBooks = allBooksForEras
                .filter((book) => {
                  const prophetData = PROPHET_DATA[book.slug];
                  return prophetData && prophetData.era === era.id;
                })
                .sort((a, b) => {
                  const order = eraOrder[era.id];
                  return order.indexOf(a.slug) - order.indexOf(b.slug);
                });

              return (
                <div key={era.id}>
                  <SectionHeading title={era.label} />
                  <div className="space-y-2">
                    {eraBooks.map((book) => {
                      globalBookIndex++;
                      const accent = ACCENTS[(globalBookIndex - 1) % ACCENTS.length];
                      const divisions = getAllDivisions(book.slug);

                      if (divisions.length > 0) {
                        return (
                          <div key={book.slug}>
                            <BookHeader
                              number={String(globalBookIndex).padStart(2, '0')}
                              name={book.name}
                              sub={`${divisions.length} sections · ${book.chapterCount} ch`}
                            />
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                              {divisions.map((division) => (
                                <DivisionCard
                                  key={division.id}
                                  href={readingPath(book.slug, division.id, division.chapters[0])}
                                  title={division.title.replace('The Book of ', '').replace(/^The /, '')}
                                  scripture={formatScripture(book.name, division.chapters)}
                                  theme={division.theme}
                                  hasCommentary={divisionHasCommentary(book.slug, division.chapters)}
                                  hasWritings={divisionHasWritings(book.slug, division.chapters)}
                                  hasSpeakers={divisionHasSpeakers(book.slug, division.chapters)}
                                  accent={accent}
                                  focused={focusedCardId === `${book.slug}:${division.id}`}
                                  isComplete={isDivisionComplete(book.slug, division.chapters)}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      } else {
                        const allChapters = Array.from({ length: book.chapterCount }, (_, k) => k + 1);
                        return (
                          <div key={book.slug}>
                            <BookHeader
                              number={String(globalBookIndex).padStart(2, '0')}
                              name={book.name}
                              sub={`${book.chapterCount} chapters`}
                            />
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                              <DivisionCard
                                href={readingPath(book.slug, 1)}
                                title={book.name}
                                scripture={formatScripture(book.name, allChapters)}
                                theme={getBookTheme(book.slug)}
                                hasCommentary={divisionHasCommentary(book.slug, allChapters)}
                                hasWritings={divisionHasWritings(book.slug, allChapters)}
                                hasSpeakers={divisionHasSpeakers(book.slug, allChapters)}
                                accent={accent}
                                focused={focusedCardId === book.slug}
                                isComplete={isDivisionComplete(book.slug, allChapters)}
                              />
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      case 'wisdom': {
        const books = getBooksByTopLevelCategory(sectionId);
        const bookBlocks: React.ReactNode[] = [];
        let looseTiles: React.ReactNode[] = [];

        const flushLooseTiles = () => {
          if (looseTiles.length === 0) return;
          bookBlocks.push(
            <div key={`tiles-${bookBlocks.length}`} className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                {looseTiles}
              </div>
            </div>,
          );
          looseTiles = [];
        };

        books.forEach((book, i) => {
          const accent = ACCENTS[i % ACCENTS.length];

          // Psalms uses collections
          if (book.slug === 'psalms') {
            flushLooseTiles();
            bookBlocks.push(
              <div key="psalms">
                <BookHeader number={String(i + 1).padStart(2, '0')} name="Psalms" sub={`${psalmsCollections.length} collections`} />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                  {psalmsCollections.map((collection, j) => {
                    const first = collection.psalms[0];
                    const last = collection.psalms[collection.psalms.length - 1];
                    const scripture = first === last ? `Psalm ${first}` : `Psalms ${first}–${last}`;
                    return (
                      <DivisionCard
                        key={collection.id}
                        href={`/psalms/${collection.id}/${collection.psalms[0]}`}
                        title={collection.title.replace('Psalms of ', '')}
                        scripture={scripture}
                        theme={collection.theme}
                        hasCommentary={divisionHasCommentary('psalms', collection.psalms)}
                        hasWritings={divisionHasWritings('psalms', collection.psalms)}
                        hasSpeakers={divisionHasSpeakers('psalms', collection.psalms)}
                        accent={ACCENTS[j % ACCENTS.length]}
                        focused={focusedCardId === collection.id}
                        isComplete={isDivisionComplete('psalms', collection.psalms)}
                      />
                    );
                  })}
                </div>
              </div>,
            );
            return;
          }

          const divisions = getAllDivisions(book.slug);

          if (divisions.length > 0) {
            flushLooseTiles();
            bookBlocks.push(
              <div key={book.slug}>
                <BookHeader number={String(i + 1).padStart(2, '0')} name={book.name} sub={`${divisions.length} sections · ${book.chapterCount} ch`} />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                  {divisions.map((division) => (
                    <DivisionCard
                      key={division.id}
                      href={readingPath(book.slug, division.id, division.chapters[0])}
                      title={division.title.replace('The Book of ', '').replace(/^The /, '')}
                      scripture={formatScripture(book.name, division.chapters)}
                      theme={division.theme}
                      hasCommentary={divisionHasCommentary(book.slug, division.chapters)}
                      hasWritings={divisionHasWritings(book.slug, division.chapters)}
                      hasSpeakers={divisionHasSpeakers(book.slug, division.chapters)}
                      hasMap={book.slug === 'proverbs'}
                      accent={accent}
                      focused={focusedCardId === `${book.slug}:${division.id}`}
                      isComplete={isDivisionComplete(book.slug, division.chapters)}
                    />
                  ))}
                </div>
              </div>,
            );
            return;
          }

          const allChapters = Array.from({ length: book.chapterCount }, (_, k) => k + 1);
          looseTiles.push(
            <DivisionCard
              key={book.slug}
              href={readingPath(book.slug, 1)}
              title={book.name}
              scripture={formatScripture(book.name, allChapters)}
              theme={getBookTheme(book.slug)}
              hasCommentary={divisionHasCommentary(book.slug, allChapters)}
              hasWritings={divisionHasWritings(book.slug, allChapters)}
              hasSpeakers={divisionHasSpeakers(book.slug, allChapters)}
              hasMap={book.slug === 'proverbs'}
              accent={accent}
              focused={focusedCardId === book.slug}
              isComplete={isDivisionComplete(book.slug, allChapters)}
            />,
          );
        });

        flushLooseTiles();

        return <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">{bookBlocks}</div>;
      }

      case 'apostolic': {
        const books = getBooksByTopLevelCategory(sectionId);
        const paulineBooks = books.filter((b) => b.category === 'pauline');
        const generalBooks = books.filter((b) => b.category === 'general');
        const apocalypseBooks = books.filter((b) => b.category === 'apocalypse');
        const actsBook = books.find((b) => b.slug === 'acts');

        // Helper to render a book card
        const renderBookCard = (book: typeof books[0], accent: string) => {
          const allChapters = Array.from({ length: book.chapterCount }, (_, k) => k + 1);
          return (
            <DivisionCard
              key={book.slug}
              href={readingPath(book.slug, 1)}
              title={book.name}
              scripture={formatScripture(book.name, allChapters)}
              theme={getBookTheme(book.slug)}
              hasCommentary={divisionHasCommentary(book.slug, allChapters)}
              hasWritings={divisionHasWritings(book.slug, allChapters)}
              hasSpeakers={divisionHasSpeakers(book.slug, allChapters)}
              accent={accent}
              focused={focusedCardId === book.slug}
              isComplete={isDivisionComplete(book.slug, allChapters)}
            />
          );
        };

        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
            {/* Reading order: Acts · Paul's Epistles · General Epistles · Revelation */}
            {/* ACTS */}
            {actsBook && (
                <section>
                  <BookHeader name="Acts" sub={`${ACTS_SECTIONS.length} sections · ${actsBook.chapterCount} chapters`} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                    {ACTS_SECTIONS.map((section, i) => (
                      <DivisionCard
                        key={section.id}
                        href={section.href}
                        title={section.title}
                        scripture={section.scripture}
                        theme={section.theme}
                        hasCommentary={divisionHasCommentary('acts', section.chapters)}
                        hasWritings={divisionHasWritings('acts', section.chapters)}
                        hasSpeakers={divisionHasSpeakers('acts', section.chapters)}
                        accent={ACCENTS[i % ACCENTS.length]}
                        focused={focusedCardId === section.id}
                        isComplete={isDivisionComplete('acts', section.chapters)}
                      />
                    ))}
                  </div>
                </section>
              )}

            {/* PAULINE EPISTLES - Organized by theme */}
            <section>
              <BookHeader name="Paul's Epistles" sub="13 books" />
              <div className="grid grid-cols-1 gap-y-2 mt-2">
                {PAULINE_ERAS.map((era, eraIdx) => {
                  const eraBooks = era.books
                    .map(slug => paulineBooks.find(b => b.slug === slug))
                    .filter((b): b is typeof paulineBooks[0] => b !== undefined);

                  return (
                    <div key={era.id}>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="font-serif text-[11px] font-bold text-gold">{era.number}</span>
                        <span className="font-serif text-[11px] font-semibold text-ink">{era.title}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                        {eraBooks.map((book, i) => renderBookCard(book, ACCENTS[(eraIdx + i) % ACCENTS.length]))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* GENERAL EPISTLES - Organized by authorship */}
            <section>
              <BookHeader name="General Epistles" sub={`${generalBooks.length} books`} />
              <div className="grid grid-cols-1 gap-y-2 mt-2">
                {GENERAL_ERAS.map((era, eraIdx) => {
                  const eraBooks = era.books
                    .map(slug => generalBooks.find(b => b.slug === slug))
                    .filter((b): b is typeof generalBooks[0] => b !== undefined);

                  return (
                    <div key={era.id}>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="font-serif text-[11px] font-bold text-gold">{era.number}</span>
                        <span className="font-serif text-[11px] font-semibold text-ink">{era.title}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                        {eraBooks.map((book, i) => renderBookCard(book, ACCENTS[(eraIdx + i) % ACCENTS.length]))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* REVELATION */}
            {apocalypseBooks.length > 0 && (
                <section>
                  <BookHeader name="Revelation" sub={`${apocalypseBooks[0].chapterCount} chapters`} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                    {apocalypseBooks.map((book, i) => renderBookCard(book, ACCENTS[i % ACCENTS.length]))}
                  </div>
                </section>
            )}
          </div>
        );
      }
    }
  };

  const mast = MASTHEAD[activeTab];

  return (
    <main className="max-w-6xl mx-auto md:select-text pb-8 px-4">
      {/* Header: the shared PageHeader recipe (same as Map and Saved),
          then the centered tabs row beneath it. */}
      <PageHeader
        kicker={activeTab === 'nt' ? 'New Testament' : 'Old Testament'}
        title={mast.title}
        subtitle={mast.kicker}
      />
      <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-3 pb-3">
        <div className="flex w-full flex-col items-stretch gap-0.5 md:w-auto md:items-center md:pt-1">
          {/* Mobile: one row of three pills */}
          <div className="grid grid-cols-3 gap-1.5 md:hidden font-sans text-xs font-medium">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/library/${tab.id}`}
                  className={`rounded-full px-3 py-2 whitespace-nowrap text-center transition-colors ${
                    active
                      ? 'bg-surface text-ink shadow-sm border border-hairline'
                      : 'bg-paper-2 text-muted active:text-ink'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop: one capsule, a divider between each act: OT | 17 | NT */}
          <div className="hidden md:flex md:flex-col md:items-center">
            <div className="inline-flex bg-paper-2 rounded-full p-1 font-sans text-[13px] font-medium">
              {TABS.map((tab, i) => {
                const active = activeTab === tab.id;
                const showDivider = i > 0;
                return (
                  <span key={tab.id} className="flex items-center">
                    {showDivider && <span className="mx-2.5 h-5 w-px bg-hairline" />}
                    <Link
                      href={`/library/${tab.id}`}
                      className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                        active ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {tab.label}
                    </Link>
                  </span>
                );
              })}
            </div>
          </div>
          {/* Progress indicator - below tabs */}
          {tabProgress.total > 0 && (
            <div className="flex items-center gap-2 font-sans text-[11px] mt-1">
              <span className={tabProgress.percentage === 100 ? 'text-emerald-500 font-medium' : 'text-muted'}>
                {tabProgress.completed} / {tabProgress.total}
              </span>
              <span className={tabProgress.percentage === 100 ? 'text-emerald-500 font-medium' : 'text-gold'}>
                {tabProgress.percentage}%
              </span>
            </div>
          )}
        </div>
      </div>

      {renderTabContent()}

      {/* Help button - desktop only */}
      <button
        onClick={() => setShowShortcuts(true)}
        className="hidden md:flex fixed bottom-4 right-4 h-8 w-8 items-center justify-center rounded-full bg-surface border border-hairline text-muted hover:text-ink hover:border-gold/50 transition-colors font-sans text-sm"
        title="Keyboard shortcuts (?)"
      >
        ?
      </button>

      {/* Shortcuts Modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="bg-surface border border-hairline rounded-lg shadow-xl max-w-md w-full mx-4 p-5 max-h-[80dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-bold text-lg text-ink">Keyboard Shortcuts</h2>
              <button
                onClick={() => setShowShortcuts(false)}
                className="h-11 w-11 -m-2 flex items-center justify-center text-muted hover:text-ink active:text-ink text-xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="space-y-3 font-sans text-sm">
              <div>
                <div className="text-muted text-xs uppercase tracking-wide mb-1">Navigation</div>
                <div className="space-y-1">
                  <div className="flex justify-between"><span className="text-ink">Navigate tabs</span><span className="text-muted">1 &ndash; {TABS.length}</span></div>
                  <div className="flex justify-between"><span className="text-ink">Move selection</span><span className="text-muted">&larr; &rarr; &uarr; &darr;</span></div>
                  <div className="flex justify-between"><span className="text-ink">Open selected</span><span className="text-muted">Enter</span></div>
                </div>
              </div>
              <div>
                <div className="text-muted text-xs uppercase tracking-wide mb-1">Actions</div>
                <div className="space-y-1">
                  <div className="flex justify-between"><span className="text-ink">Search</span><span className="text-muted">/</span></div>
                  <div className="flex justify-between"><span className="text-ink">Show shortcuts</span><span className="text-muted">?</span></div>
                  <div className="flex justify-between"><span className="text-ink">Close modal</span><span className="text-muted">Esc</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10dvh] bg-black/40"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="bg-surface border border-hairline rounded-lg shadow-xl max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 p-3 border-b border-hairline">
              <span className="text-muted">/</span>
              <input
                type="text"
                autoFocus
                placeholder="Search books, divisions..."
                className="flex-1 bg-transparent outline-none font-sans text-base sm:text-sm text-ink placeholder:text-muted"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setShowSearch(false);
                }}
              />
            </div>
            <div className="p-3 text-center text-muted text-sm font-sans">
              Start typing to search
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
