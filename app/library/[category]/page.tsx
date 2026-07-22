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
import { getBookTheme } from '@/lib/getBookThemes';

type TabId = 'torah' | 'psalms' | 'old-testament' | 'new-testament' | 'gospels';

type FocusableCard = {
  id: string;
  href: string;
  bookSlug: string;
  categoryId?: string;
};

const TABS = [
  { id: 'torah' as TabId, label: 'Torah' },
  { id: 'old-testament' as TabId, label: 'Old Testament' },
  { id: 'new-testament' as TabId, label: 'New Testament' },
  { id: 'gospels' as TabId, label: 'Gospels' },
  { id: 'psalms' as TabId, label: 'Psalms' },
];

const TOC_LINKS: Partial<Record<TabId, string>> = {
  torah: '/torah-toc',
  'new-testament': '/nt-toc',
  gospels: '/gospels-toc',
};

// Acts reads as two books split at Saul's conversion (ch 9); the fine-grained
// divisions in acts-metadata.json still drive the reader once inside.
const ACTS_BOOKS = [
  {
    id: 'acts:before-paul',
    title: 'Before Paul',
    theme: 'The Spirit births the church — Jerusalem to Samaria',
    href: '/acts/birth-of-the-church/1',
    count: 8,
  },
  {
    id: 'acts:after-paul',
    title: 'After Paul',
    theme: "From Saul's conversion to the ends of the earth",
    href: '/acts/sauls-conversion/9',
    count: 20,
  },
];

const MASTHEAD: Record<TabId, { kicker: string; title: string }> = {
  torah: { kicker: 'The Five Books of Moses', title: 'Torah' },
  'old-testament': { kicker: 'Historical, Wisdom & Prophets', title: 'Old Testament' },
  'new-testament': { kicker: 'Acts, Epistles & Revelation', title: 'New Testament' },
  gospels: { kicker: 'The Four Gospels', title: 'Gospels' },
  psalms: { kicker: 'The Book of Psalms', title: 'Psalms' },
};

// Harmonious warm-neutral tints (light) / low washes (dark), cycled per card.
const TINTS = [
  'bg-[#f6f1e8] dark:bg-[#211d14]',
  'bg-[#f6efe9] dark:bg-[#221a18]',
  'bg-[#eef1f4] dark:bg-[#172029]',
  'bg-[#eff2ea] dark:bg-[#1a2018]',
  'bg-[#f1eef3] dark:bg-[#201b21]',
  'bg-[#eaf1ef] dark:bg-[#152120]',
  'bg-[#f6f0e6] dark:bg-[#211c14]',
];

function Pill({ tone, children }: { tone: 'gold' | 'green'; children: React.ReactNode }) {
  const cls =
    tone === 'gold'
      ? 'text-gold-ink bg-[#efe1c0] dark:bg-[rgba(216,179,74,0.16)] dark:text-[#e6c96f]'
      : 'text-[#4a6b3a] bg-[#dfe8d2] dark:bg-[rgba(138,154,91,0.2)] dark:text-[#a9c894]';
  return (
    <span className={`font-sans text-[11px] font-semibold px-2 py-[3px] rounded-full ${cls}`}>
      {children}
    </span>
  );
}

function SectionHeader({ number, name, sub }: { number?: string; name: string; sub?: string }) {
  return (
    <div className="flex items-baseline gap-4 pt-6 pb-4 border-t-2 border-ink">
      {number && <span className="font-serif text-[15px] font-bold text-gold">{number}</span>}
      <div className="flex-1">
        <div className="font-serif text-3xl font-bold text-ink leading-none">{name}</div>
        {sub && <div className="font-sans text-[13px] text-muted mt-1">{sub}</div>}
      </div>
    </div>
  );
}

function DivisionCard({
  href,
  title,
  count,
  theme,
  hasCommentary,
  hasWritings,
  tint,
  instructional,
  focused,
}: {
  href: string;
  title: string;
  count: number;
  theme?: string;
  hasCommentary?: boolean;
  hasWritings?: boolean;
  tint: string;
  instructional?: boolean;
  focused?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-xl p-4 border transition-colors ${tint} ${
        focused ? 'border-gold ring-2 ring-gold' : 'border-hairline hover:border-muted'
      }`}
    >
      <div
        className={`font-serif text-xl leading-tight ${
          instructional ? 'text-orange-500' : 'text-ink'
        }`}
      >
        {title}
      </div>
      {theme && (
        <div className="font-serif italic text-[13px] text-muted leading-snug mt-1">{theme}</div>
      )}
      <div className="flex items-center justify-between mt-3">
        {hasCommentary ? (
          <Pill tone="gold">Commentary</Pill>
        ) : hasWritings ? (
          <Pill tone="green">Reflections</Pill>
        ) : (
          <span />
        )}
        <span className="font-sans text-xs text-faint">{count} ch</span>
      </div>
    </Link>
  );
}

export default function LibraryPage() {
  const params = useParams();
  const router = useRouter();
  const activeTab = (params.category as TabId) || 'torah';
  const [hideInstructional, setHideInstructional] = useState(true);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

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
      const filtered = hideInstructional
        ? divisions.filter((d) => d.contentType !== 'instructional')
        : divisions;
      filtered.forEach((division) => {
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
      case 'psalms': {
        psalmsCollections.forEach((collection) => {
          cards.push({
            id: collection.id,
            href: `/psalms/${collection.id}/${collection.psalms[0]}`,
            bookSlug: 'psalms',
          });
        });
        break;
      }
      case 'old-testament':
      case 'new-testament': {
        const isOT = activeTab === 'old-testament';
        const books = getBooksByTopLevelCategory(activeTab);
        const cats = isOT
          ? [CATEGORIES.HISTORICAL, CATEGORIES.WISDOM, CATEGORIES.MAJOR_PROPHETS, CATEGORIES.MINOR_PROPHETS]
          : [CATEGORIES.ACTS, CATEGORIES.PAULINE, CATEGORIES.GENERAL, CATEGORIES.APOCALYPSE];
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
              const divisions = isOT ? getAllDivisions(book.slug) : [];
              if (divisions.length > 0) {
                pushDivided(book.slug, divisions, book.slug, category.id);
              } else {
                cards.push({
                  id: book.slug,
                  href: readingPath(book.slug, 1),
                  bookSlug: book.slug,
                  categoryId: category.id,
                });
              }
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

  // Columns of the card grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3).
  const getGridColumns = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
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
  }, [activeTab, hideInstructional]);

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

      switch (e.key) {
        case '1':
          router.push('/library/torah');
          break;
        case '2':
          router.push('/library/old-testament');
          break;
        case '3':
          router.push('/library/new-testament');
          break;
        case '4':
          router.push('/library/gospels');
          break;
        case '5':
          router.push('/library/psalms');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, focusableCards, focusedCardIndex, gridColumns]);

  // Render a whole "book" that has thematic divisions (Genesis, Mark, ...).
  const renderDividedBook = (
    book: { slug: string; name: string; chapterCount: number },
    number: string,
    divisions: ReturnType<typeof getAllDivisions>,
    routePrefix?: string,
  ) => {
    const filtered = hideInstructional
      ? divisions.filter((d) => d.contentType !== 'instructional')
      : divisions;
    if (filtered.length === 0) return null;
    const prefix = routePrefix ?? book.slug;
    return (
      <section key={book.slug}>
        <SectionHeader number={number} name={book.name} sub={`${divisions.length} books · ${book.chapterCount} chapters`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((division, i) => {
            const isInstructional = division.contentType === 'instructional';
            const hasCommentary = divisionHasCommentary(book.slug, division.chapters);
            const hasWritings = divisionHasWritings(book.slug, division.chapters);
            return (
              <DivisionCard
                key={division.id}
                href={readingPath(prefix, division.id, division.chapters[0])}
                title={division.title.replace('The Book of ', '').replace(/^The /, '')}
                count={division.chapters.length}
                theme={division.theme}
                hasCommentary={hasCommentary}
                hasWritings={hasWritings}
                instructional={isInstructional}
                tint={TINTS[i % TINTS.length]}
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
              const divisions =
                book.slug === 'genesis'
                  ? (genesisBooks as unknown as ReturnType<typeof getAllDivisions>)
                  : getAllDivisions(book.slug);
              const number = String(idx + 1).padStart(2, '0');
              if (divisions.length > 0) {
                return renderDividedBook(
                  book,
                  number,
                  divisions,
                  book.slug === 'genesis' ? 'genesis' : book.slug,
                );
              }
              return (
                <section key={book.slug}>
                  <SectionHeader number={number} name={book.name} sub={`${book.chapterCount} chapters`} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <DivisionCard
                      href={readingPath(book.slug, 1)}
                      title={`Read ${book.name}`}
                      count={book.chapterCount}
                      theme={getBookTheme(book.slug)}
                      tint={TINTS[idx % TINTS.length]}
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
                  <SectionHeader number={number} name={book.name} sub={`${book.chapterCount} chapters`} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <DivisionCard
                      href={readingPath(book.slug, 1)}
                      title={`Read ${book.name}`}
                      count={book.chapterCount}
                      theme={getBookTheme(book.slug)}
                      tint={TINTS[idx % TINTS.length]}
                      focused={focusedCardId === book.slug}
                    />
                  </div>
                </section>
              );
            })}
          </div>
        );
      }

      case 'psalms':
        return (
          <div className="space-y-2">
            <SectionHeader name="Psalms" sub={`${psalmsCollections.length} collections`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {psalmsCollections.map((collection, i) => (
                <DivisionCard
                  key={collection.id}
                  href={`/psalms/${collection.id}/${collection.psalms[0]}`}
                  title={collection.title.replace('Psalms of ', '')}
                  count={collection.psalms.length}
                  theme={collection.theme}
                  tint={TINTS[i % TINTS.length]}
                  focused={focusedCardId === collection.id}
                />
              ))}
            </div>
          </div>
        );

      case 'old-testament':
      case 'new-testament': {
        const isOT = activeTab === 'old-testament';
        const books = getBooksByTopLevelCategory(activeTab);
        const cats = isOT
          ? [CATEGORIES.HISTORICAL, CATEGORIES.WISDOM, CATEGORIES.MAJOR_PROPHETS, CATEGORIES.MINOR_PROPHETS]
          : [CATEGORIES.ACTS, CATEGORIES.PAULINE, CATEGORIES.GENERAL, CATEGORIES.APOCALYPSE];

        return (
          <div className="space-y-2">
            {cats.map((category) => {
              const categoryBooks = books.filter((b) => b.category === category.id);
              const cards: React.ReactNode[] = [];
              categoryBooks.forEach((book, i) => {
                if (book.slug === 'acts') {
                  ACTS_BOOKS.forEach((actsBook, j) => {
                    cards.push(
                      <DivisionCard
                        key={actsBook.id}
                        href={actsBook.href}
                        title={actsBook.title}
                        count={actsBook.count}
                        theme={actsBook.theme}
                        tint={TINTS[(i + j) % TINTS.length]}
                        focused={focusedCardId === actsBook.id}
                      />,
                    );
                  });
                  return;
                }

                const divisions = isOT ? getAllDivisions(book.slug) : [];
                const filtered = hideInstructional
                  ? divisions.filter((d) => d.contentType !== 'instructional')
                  : divisions;

                if (divisions.length > 0) {
                  filtered.forEach((division, j) => {
                    cards.push(
                      <DivisionCard
                        key={division.id}
                        href={readingPath(book.slug, division.id, division.chapters[0])}
                        title={division.title.replace('The Book of ', '').replace(/^The /, '')}
                        count={division.chapters.length}
                        theme={division.theme}
                        instructional={division.contentType === 'instructional'}
                        hasCommentary={divisionHasCommentary(book.slug, division.chapters)}
                        hasWritings={divisionHasWritings(book.slug, division.chapters)}
                        tint={TINTS[(i + j) % TINTS.length]}
                        focused={focusedCardId === `${book.slug}:${division.id}`}
                      />,
                    );
                  });
                } else {
                  const allChapters = Array.from({ length: book.chapterCount }, (_, k) => k + 1);
                  cards.push(
                    <DivisionCard
                      key={book.slug}
                      href={readingPath(book.slug, 1)}
                      title={book.name}
                      count={book.chapterCount}
                      theme={getBookTheme(book.slug)}
                      hasCommentary={divisionHasCommentary(book.slug, allChapters)}
                      hasWritings={divisionHasWritings(book.slug, allChapters)}
                      tint={TINTS[i % TINTS.length]}
                      focused={focusedCardId === book.slug}
                    />,
                  );
                }
              });

              if (cards.length === 0) return null;
              return (
                <section key={category.id}>
                  <SectionHeader name={category.name} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{cards}</div>
                </section>
              );
            })}
          </div>
        );
      }
    }
  };

  const mast = MASTHEAD[activeTab];
  const tocHref = TOC_LINKS[activeTab];

  return (
    <main className="max-w-6xl mx-auto">
      {/* Masthead */}
      <div className="pt-2 pb-5">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-2">
          {mast.kicker}
        </p>
        <h1 className="font-serif font-bold text-5xl md:text-6xl text-ink leading-none tracking-tight">
          {mast.title}
        </h1>
      </div>

      {/* Tabs + Law toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="inline-flex bg-paper-2 rounded-full p-1 font-sans text-[13px] font-medium overflow-x-auto max-w-full">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <Link
                key={tab.id}
                href={`/library/${tab.id}`}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  active ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-5">
          {tocHref && (
            <Link
              href={tocHref}
              className="font-sans text-xs text-muted hover:text-ink transition-colors whitespace-nowrap"
            >
              Contents
            </Link>
          )}
          <label className="flex items-center gap-2 font-sans text-xs text-muted cursor-pointer whitespace-nowrap">
            <input
              type="checkbox"
              checked={hideInstructional}
              onChange={(e) => setHideInstructional(e.target.checked)}
              className="accent-[rgb(var(--gold))] cursor-pointer"
            />
            Hide the Law
          </label>
        </div>
      </div>

      {renderTabContent()}
    </main>
  );
}
