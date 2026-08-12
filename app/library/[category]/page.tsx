'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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

type TabId = 'torah' | 'conquest' | 'kingdom' | 'return' | 'wisdom' | 'prophets' | 'gospels' | 'apostolic';

type FocusableCard = {
  id: string;
  href: string;
  bookSlug: string;
  categoryId?: string;
};

const TABS = [
  { id: 'torah' as TabId, label: 'Law' },
  { id: 'conquest' as TabId, label: 'Judges' },
  { id: 'kingdom' as TabId, label: 'Kings' },
  { id: 'prophets' as TabId, label: 'Prophets' },
  { id: 'return' as TabId, label: 'Exile' },
  { id: 'gospels' as TabId, label: 'Gospels' },
  { id: 'apostolic' as TabId, label: 'Apostolic' },
  { id: 'wisdom' as TabId, label: 'Wisdom' },
];


// Acts reads as two books split at Saul's conversion (ch 9); the fine-grained
// divisions in acts-metadata.json still drive the reader once inside.
const ACTS_BOOKS = [
  {
    id: 'acts:before-paul',
    title: 'Before Paul',
    theme: 'Spirit births the church',
    href: '/acts/birth-of-the-church/1',
    scripture: 'Acts 1–8',
  },
  {
    id: 'acts:after-paul',
    title: 'After Paul',
    theme: 'To the ends of the earth',
    href: '/acts/sauls-conversion/9',
    scripture: 'Acts 9–28',
  },
];

const MASTHEAD: Record<TabId, { kicker: string; title: string }> = {
  torah: { kicker: 'The Five Books of Moses', title: 'Law' },
  conquest: { kicker: 'Joshua, Judges, Ruth', title: 'Judges' },
  kingdom: { kicker: 'Samuel & Kings', title: 'Kings' },
  return: { kicker: 'Chronicles, Ezra, Nehemiah, Esther', title: 'Exile' },
  wisdom: { kicker: 'Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon', title: 'Wisdom & Poetry' },
  prophets: { kicker: 'Major & Minor Prophets', title: 'Prophets' },
  gospels: { kicker: 'The Four Gospels', title: 'Gospels' },
  apostolic: { kicker: 'Acts, Epistles & Revelation', title: 'Apostolic' },
};

// Prophet historical eras and anchors
type ProphetEra = 'north' | 'south' | 'judahs-fall' | 'exile' | 'return-era';

const PROPHET_ERAS: { id: ProphetEra; label: string }[] = [
  { id: 'north', label: 'North' },
  { id: 'south', label: 'South' },
  { id: 'judahs-fall', label: 'Fall of the South' },
  { id: 'exile', label: 'Exile' },
  { id: 'return-era', label: 'Return' },
];

const PROPHET_DATA: Record<string, { era: ProphetEra; anchor: string }> = {
  // North - prophets to the northern kingdom (Israel)
  'jonah': { era: 'north', anchor: '2 Kings 14:23–29' },
  'amos': { era: 'north', anchor: '2 Kings 14:23–29' },
  'hosea': { era: 'north', anchor: '2 Kings 14–17' },
  // South - prophets to the southern kingdom (Judah) while North still exists
  'isaiah': { era: 'south', anchor: '2 Kings 15–20' },
  'micah': { era: 'south', anchor: '2 Kings 15:32–20' },
  // Judah's Fall - North has fallen, Judah approaches Babylon
  'nahum': { era: 'judahs-fall', anchor: '~2 Kings 21–23' },
  'zephaniah': { era: 'judahs-fall', anchor: '2 Kings 22–23' },
  'jeremiah': { era: 'judahs-fall', anchor: '2 Kings 22–25' },
  'habakkuk': { era: 'judahs-fall', anchor: '~2 Kings 23–24' },
  // Exile - Jerusalem has fallen, God's people in exile
  'lamentations': { era: 'exile', anchor: '2 Kings 25' },
  'ezekiel': { era: 'exile', anchor: '2 Kings 24–25' },
  'daniel': { era: 'exile', anchor: '2 Kings 24' },
  'obadiah': { era: 'exile', anchor: '~2 Kings 25' },
  // Return - exiles return and rebuild
  'haggai': { era: 'return-era', anchor: 'Ezra 4–6' },
  'zechariah': { era: 'return-era', anchor: 'Ezra 5–6' },
  'malachi': { era: 'return-era', anchor: 'Ezra–Nehemiah' },
  'joel': { era: 'return-era', anchor: 'Date uncertain' },
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

function Mark({ tone }: { tone: 'red' | 'green' | 'blue' | 'orange' | 'purple' }) {
  const titles = { red: 'Commentary', green: 'Writings', blue: 'Voices', orange: 'Places', purple: 'People' };
  const colors = {
    red: 'bg-[rgb(155,30,40)] dark:bg-[rgb(230,130,130)]',
    green: 'bg-[rgb(122,153,90)] dark:bg-[rgb(138,154,91)]',
    blue: 'bg-[rgb(25,70,135)] dark:bg-[rgb(130,170,230)]',
    orange: 'bg-[rgb(180,100,40)] dark:bg-[rgb(230,160,100)]',
    purple: 'bg-[rgb(100,50,160)] dark:bg-[rgb(180,150,230)]',
  };
  return (
    <span
      title={titles[tone]}
      className={`h-1 w-1 shrink-0 rounded-full ${colors[tone]}`}
    />
  );
}

function BookHeader({ number, name, sub, anchor }: { number?: string; name: string; sub?: string; anchor?: string }) {
  return (
    <div className="flex items-baseline gap-2 pt-5 pb-1.5 border-t border-hairline">
      {number && <span className="font-serif text-[11px] font-bold text-gold">{number}</span>}
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-base font-bold text-ink leading-none">{name}</span>
          {anchor && <span className="font-sans text-[10px] text-gold/80">{anchor}</span>}
        </div>
        {sub && <div className="font-sans text-[10px] text-muted">{sub}</div>}
      </div>
    </div>
  );
}

function DivisionCard({
  href,
  title,
  scripture,
  theme,
  hasCommentary,
  hasWritings,
  hasSpeakers,
  hasPlaces,
  hasPeople,
  accent,
  instructional,
  focused,
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
  accent: string;
  instructional?: boolean;
  focused?: boolean;
}) {
  const showDots = hasCommentary || hasWritings || hasSpeakers || hasPlaces || hasPeople;
  return (
    /*
      One surface, one hairline, on every card in the app. The left border is
      2px at rest as well as on hover — it only changes color, so nothing
      reflows. Feedback lives in the hover state, not in the resting card.
    */
    <Link
      href={href}
      style={{ '--accent': accent } as React.CSSProperties}
      className={`relative block rounded px-2 py-1.5 bg-surface border border-l-2 transition-[background-color,border-color,transform] duration-150 hover:-translate-y-px hover:bg-paper-2 hover:border-l-[var(--accent)] text-center h-[72px] flex flex-col justify-between ${
        focused
          ? 'border-gold ring-2 ring-gold'
          : 'border-hairline focus-visible:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold'
      }`}
    >
      <div>
        <div
          className={`font-serif text-[12px] leading-tight ${
            instructional ? 'text-orange-500' : 'text-ink'
          }`}
        >
          {title}
        </div>
        {theme && (
          <div className="font-serif italic text-[10px] text-muted leading-snug mt-0.5 line-clamp-2 whitespace-pre-line">
            {theme}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <span className="font-sans text-[10px] text-gold">{scripture}</span>
      </div>
      {/* Dots in bottom-right corner */}
      {showDots && (
        <div className="absolute bottom-1 right-1 flex items-center gap-0.5">
          {hasCommentary && <Mark tone="red" />}
          {hasWritings && <Mark tone="green" />}
          {hasSpeakers && <Mark tone="blue" />}
          {hasPlaces && <Mark tone="orange" />}
          {hasPeople && <Mark tone="purple" />}
        </div>
      )}
    </Link>
  );
}

const VALID_TABS: TabId[] = ['torah', 'conquest', 'kingdom', 'return', 'wisdom', 'prophets', 'gospels', 'apostolic'];

export default function LibraryPage() {
  const params = useParams();
  const router = useRouter();
  const rawTab = params.category as string;
  const activeTab: TabId = VALID_TABS.includes(rawTab as TabId) ? (rawTab as TabId) : 'torah';
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  const [prophetEra, setProphetEra] = useState<ProphetEra>('north');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

    switch (activeTab) {
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
        const books = getBooksByTopLevelCategory(activeTab);
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
        const books = getBooksByTopLevelCategory(activeTab);
        const cats = [CATEGORIES.ACTS, CATEGORIES.PAULINE, CATEGORIES.GENERAL, CATEGORIES.APOCALYPSE];
        cats.forEach((category) => {
          books
            .filter((b) => b.category === category.id)
            .forEach((book) => {
              if (book.slug === 'acts') {
                ACTS_BOOKS.forEach((actsBook) => {
                  cards.push({
                    id: actsBook.id,
                    href: actsBook.href,
                    bookSlug: 'acts',
                    categoryId: category.id,
                  });
                });
                return;
              }
              cards.push({
                id: book.slug,
                href: readingPath(book.slug, 1),
                bookSlug: book.slug,
                categoryId: category.id,
              });
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
      const numKey = parseInt(e.key, 10);
      if (numKey >= 1 && numKey <= TABS.length) {
        const tab = TABS[numKey - 1];
        if (tab) {
          router.push(`/library/${tab.id}`);
        }
      }

      // Prophet era shortcuts: qwerty keys map to PROPHET_ERAS dynamically
      if (activeTab === 'prophets') {
        const qwertyKeys = ['q', 'w', 'e', 'r', 't', 'y'];
        const keyIndex = qwertyKeys.indexOf(e.key.toLowerCase());
        if (keyIndex !== -1 && keyIndex < PROPHET_ERAS.length) {
          setProphetEra(PROPHET_ERAS[keyIndex].id);
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
          {divisions.map((division, i) => {
            const isInstructional = division.contentType === 'instructional';
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
                instructional={isInstructional}
                focused={focusedCardId === `${book.slug}:${division.id}`}
              />
            );
          })}
        </div>
      </section>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'torah': {
        const torahBooks = getBooksByTopLevelCategory('torah');
        return (
          <div className="space-y-2">
            {torahBooks.map((book, idx) => {
              const number = String(idx + 1).padStart(2, '0');
              const accent = ACCENTS[idx % ACCENTS.length];

              // Genesis uses section views
              if (book.slug === 'genesis') {
                return (
                  <section key={book.slug}>
                    <BookHeader number={number} name={book.name} sub={`${GENESIS_SECTIONS.length} sections · 50 chapters`} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
                      {GENESIS_SECTIONS.map((item) => (
                        <Link
                          key={item.title}
                          href={readingPath('genesis', item.startChapter)}
                          className="block rounded px-2 py-1.5 bg-surface border border-l-2 border-hairline transition-[background-color,border-color,transform] duration-150 hover:-translate-y-px hover:bg-paper-2 hover:border-l-[var(--accent)] focus-visible:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold text-center h-[72px] flex flex-col justify-between"
                          style={{ '--accent': accent } as React.CSSProperties}
                        >
                          <div>
                            <div className="font-serif text-[12px] leading-tight text-ink">
                              {item.title}
                            </div>
                            <div className="font-serif italic text-[10px] text-muted leading-snug mt-0.5 line-clamp-2">
                              {item.theme}
                            </div>
                          </div>
                          <div className="font-sans text-[10px] text-gold">
                            {item.scripture}
                          </div>
                        </Link>
                      ))}
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
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
          <div className="space-y-2">
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
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
                    />
                  </div>
                </section>
              );
            })}
          </div>
        );
      }

      case 'conquest': {
        // Joshua, Judges, Ruth
        const conquestSlugs = ['joshua', 'judges', 'ruth'];
        const conquestBooks = getBooksByTopLevelCategory('historical').filter(b => conquestSlugs.includes(b.slug));

        return (
          <div className="space-y-2">
            {conquestBooks.map((book, idx) => {
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
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
                    />
                  </div>
                </section>
              );
            })}
          </div>
        );
      }

      case 'kingdom': {
        // 1-2 Samuel, 1-2 Kings
        const kingdomSlugs = ['1-samuel', '2-samuel', '1-kings', '2-kings'];
        const kingdomBooks = getBooksByTopLevelCategory('historical').filter(b => kingdomSlugs.includes(b.slug));

        return (
          <div className="space-y-2">
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
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
                    />
                  </div>
                </section>
              );
            })}
          </div>
        );
      }

      case 'return': {
        // 1-2 Chronicles (retelling leading to exile), then Ezra, Nehemiah, Esther
        const exileSlugs = ['1-chronicles', '2-chronicles', 'ezra', 'nehemiah', 'esther'];
        const exileBooks = getBooksByTopLevelCategory('historical').filter(b => exileSlugs.includes(b.slug));
        // Sort to ensure correct order
        const sortedExileBooks = exileBooks.sort((a, b) => exileSlugs.indexOf(a.slug) - exileSlugs.indexOf(b.slug));

        return (
          <div className="space-y-2">
            {sortedExileBooks.map((book, idx) => {
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
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
                    />
                  </div>
                </section>
              );
            })}
          </div>
        );
      }

      case 'prophets': {
        const allProphetBooks = getBooksByTopLevelCategory('prophets');
        // Filter books by selected era
        const books = allProphetBooks.filter((book) => {
          const prophetData = PROPHET_DATA[book.slug];
          return prophetData && prophetData.era === prophetEra;
        });
        // Sort to ensure consistent order within each era
        const eraOrder: Record<ProphetEra, string[]> = {
          'north': ['jonah', 'amos', 'hosea'],
          'south': ['isaiah', 'micah'],
          'judahs-fall': ['nahum', 'zephaniah', 'jeremiah', 'habakkuk'],
          'exile': ['lamentations', 'ezekiel', 'daniel', 'obadiah'],
          'return-era': ['haggai', 'zechariah', 'malachi', 'joel'],
        };
        const sortedBooks = books.sort((a, b) => {
          const order = eraOrder[prophetEra];
          return order.indexOf(a.slug) - order.indexOf(b.slug);
        });

        const bookBlocks: React.ReactNode[] = [];

        sortedBooks.forEach((book, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const prophetData = PROPHET_DATA[book.slug];
          const divisions = getAllDivisions(book.slug);

          if (divisions.length > 0) {
            bookBlocks.push(
              <div key={book.slug}>
                <BookHeader
                  number={String(i + 1).padStart(2, '0')}
                  name={book.name}
                  anchor={prophetData?.anchor}
                  sub={`${divisions.length} sections · ${book.chapterCount} ch`}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
                  {divisions.map((division) => (
                    <DivisionCard
                      key={division.id}
                      href={readingPath(book.slug, division.id, division.chapters[0])}
                      title={division.title.replace('The Book of ', '').replace(/^The /, '')}
                      scripture={formatScripture(book.name, division.chapters)}
                      theme={division.theme}
                      instructional={division.contentType === 'instructional'}
                      hasCommentary={divisionHasCommentary(book.slug, division.chapters)}
                      hasWritings={divisionHasWritings(book.slug, division.chapters)}
                      hasSpeakers={divisionHasSpeakers(book.slug, division.chapters)}
                      accent={accent}
                      focused={focusedCardId === `${book.slug}:${division.id}`}
                    />
                  ))}
                </div>
              </div>,
            );
          } else {
            const allChapters = Array.from({ length: book.chapterCount }, (_, k) => k + 1);
            bookBlocks.push(
              <div key={book.slug}>
                <BookHeader
                  number={String(i + 1).padStart(2, '0')}
                  name={book.name}
                  anchor={prophetData?.anchor}
                  sub={`${book.chapterCount} chapters`}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
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
                  />
                </div>
              </div>,
            );
          }
        });

        return (
          <div className="space-y-2">
            {bookBlocks}
          </div>
        );
      }

      case 'wisdom': {
        const books = getBooksByTopLevelCategory(activeTab);
        const bookBlocks: React.ReactNode[] = [];
        let looseTiles: React.ReactNode[] = [];

        const flushLooseTiles = () => {
          if (looseTiles.length === 0) return;
          bookBlocks.push(
            <div key={`tiles-${bookBlocks.length}`} className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
                  {divisions.map((division) => (
                    <DivisionCard
                      key={division.id}
                      href={readingPath(book.slug, division.id, division.chapters[0])}
                      title={division.title.replace('The Book of ', '').replace(/^The /, '')}
                      scripture={formatScripture(book.name, division.chapters)}
                      theme={division.theme}
                      instructional={division.contentType === 'instructional'}
                      hasCommentary={divisionHasCommentary(book.slug, division.chapters)}
                      hasWritings={divisionHasWritings(book.slug, division.chapters)}
                      hasSpeakers={divisionHasSpeakers(book.slug, division.chapters)}
                      accent={accent}
                      focused={focusedCardId === `${book.slug}:${division.id}`}
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
              accent={accent}
              focused={focusedCardId === book.slug}
            />,
          );
        });

        flushLooseTiles();

        return <div className="space-y-2">{bookBlocks}</div>;
      }

      case 'apostolic': {
        const books = getBooksByTopLevelCategory(activeTab);
        const cats = [CATEGORIES.ACTS, CATEGORIES.PAULINE, CATEGORIES.GENERAL, CATEGORIES.APOCALYPSE];

        return (
          <div className="space-y-2">
            {cats.map((category) => {
              const categoryBooks = books.filter((b) => b.category === category.id);
              const bookBlocks: React.ReactNode[] = [];
              let looseTiles: React.ReactNode[] = [];

              const flushLooseTiles = () => {
                if (looseTiles.length === 0) return;
                bookBlocks.push(
                  <div key={`tiles-${bookBlocks.length}`} className="pt-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
                      {looseTiles}
                    </div>
                  </div>,
                );
                looseTiles = [];
              };

              categoryBooks.forEach((book, i) => {
                const accent = ACCENTS[i % ACCENTS.length];

                if (book.slug === 'acts') {
                  flushLooseTiles();
                  bookBlocks.push(
                    <div key={book.slug}>
                      <BookHeader number={String(i + 1).padStart(2, '0')} name={book.name} sub={`${ACTS_BOOKS.length} sections · ${book.chapterCount} ch`} />
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
                        {ACTS_BOOKS.map((actsBook) => {
                          const chapters = actsBook.id === 'acts:before-paul'
                            ? Array.from({ length: 8 }, (_, i) => i + 1)
                            : Array.from({ length: 20 }, (_, i) => i + 9);
                          return (
                            <DivisionCard
                              key={actsBook.id}
                              href={actsBook.href}
                              title={actsBook.title}
                              scripture={actsBook.scripture}
                              theme={actsBook.theme}
                              hasCommentary={divisionHasCommentary('acts', chapters)}
                              hasWritings={divisionHasWritings('acts', chapters)}
                              hasSpeakers={divisionHasSpeakers('acts', chapters)}
                              accent={accent}
                              focused={focusedCardId === actsBook.id}
                            />
                          );
                        })}
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
                    accent={accent}
                    focused={focusedCardId === book.slug}
                  />,
                );
              });

              flushLooseTiles();

              if (bookBlocks.length === 0) return null;

              // Skip section header for Acts (single book, already has BookHeader)
              if (category.id === 'acts') {
                return <div key={category.id} className="space-y-2">{bookBlocks}</div>;
              }

              return (
                <section key={category.id}>
                  <BookHeader
                    name={category.name}
                    sub={`${categoryBooks.length} ${categoryBooks.length === 1 ? 'book' : 'books'}`}
                  />
                  <div className="space-y-2">{bookBlocks}</div>
                </section>
              );
            })}
          </div>
        );
      }
    }
  };

  const mast = MASTHEAD[activeTab];

  return (
    <main className="max-w-6xl mx-auto md:select-text pb-8">
      {/* Header: Title + Tabs in one row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 pt-1 pb-2">
        <div>
          <h1 className="font-serif font-bold text-xl md:text-2xl text-ink leading-none tracking-tight">
            {mast.title}
          </h1>
          <span className="font-sans text-[10px] text-muted">
            {mast.kicker}
          </span>
          {/* Color legend */}
          <div className="flex items-center gap-3 mt-1.5 font-sans text-[10px] text-muted">
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-[rgb(155,30,40)] dark:bg-[rgb(230,130,130)]" />
              Commentary
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-[rgb(122,153,90)] dark:bg-[rgb(138,154,91)]" />
              Writings
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-[rgb(25,70,135)] dark:bg-[rgb(130,170,230)]" />
              Voices
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-[rgb(180,100,40)] dark:bg-[rgb(230,160,100)]" />
              Places
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-[rgb(100,50,160)] dark:bg-[rgb(180,150,230)]" />
              People
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="inline-flex bg-paper-2 rounded-full p-0.5 font-sans text-[10px] font-medium overflow-x-auto max-w-full">
            {TABS.map((tab, idx) => {
              const active = activeTab === tab.id;
              // Dividers: Kings|Prophets (narrative vs prophetic) and Exile|Gospels (OT/NT)
              const showDivider = tab.id === 'prophets' || tab.id === 'gospels';
              return (
                <span key={tab.id} className="flex items-center">
                  {showDivider && (
                    <span className="mx-2 h-4 w-px bg-hairline" />
                  )}
                  <Link
                    href={`/library/${tab.id}`}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      active ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {tab.label}
                  </Link>
                </span>
              );
            })}
          </div>
          {/* Prophet era sub-navigation */}
          {activeTab === 'prophets' && (
            <div className="flex gap-1">
              {PROPHET_ERAS.map((era) => (
                <button
                  key={era.id}
                  onClick={() => setProphetEra(era.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-sans transition-colors ${
                    prophetEra === era.id
                      ? 'bg-gold/20 text-gold font-medium'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {era.label}
                </button>
              ))}
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
            className="bg-surface border border-hairline rounded-lg shadow-xl max-w-md w-full mx-4 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-bold text-lg text-ink">Keyboard Shortcuts</h2>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-muted hover:text-ink text-xl leading-none"
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
              {activeTab === 'prophets' && (
                <div>
                  <div className="text-muted text-xs uppercase tracking-wide mb-1">Prophet Eras</div>
                  <div className="space-y-1">
                    {PROPHET_ERAS.map((era, i) => (
                      <div key={era.id} className="flex justify-between">
                        <span className="text-ink">{era.label}</span>
                        <span className="text-muted">{['Q', 'W', 'E', 'R', 'T', 'Y'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/40"
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
                className="flex-1 bg-transparent outline-none font-sans text-sm text-ink placeholder:text-muted"
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
