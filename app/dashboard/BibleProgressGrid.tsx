'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BIBLE_INDEX } from '@/lib/bible-index';

interface Props {
  completedByBook: Record<string, number[]>;
}

type TabId = 'torah' | 'judges' | 'kings' | 'prophets' | 'exile' | 'wisdom' | 'gospels' | 'apostolic';

// Prophet eras for sub-divisions
type ProphetEra = 'north' | 'south' | 'judahs-fall' | 'exile-era' | 'return-era';

const PROPHET_ERAS: { id: ProphetEra; label: string; books: string[] }[] = [
  { id: 'north', label: 'North', books: ['jonah', 'amos', 'hosea'] },
  { id: 'south', label: 'South', books: ['isaiah', 'micah'] },
  { id: 'judahs-fall', label: 'Fall of the South', books: ['nahum', 'zephaniah', 'jeremiah', 'habakkuk'] },
  { id: 'exile-era', label: 'Exile', books: ['lamentations', 'ezekiel', 'daniel', 'obadiah'] },
  { id: 'return-era', label: 'Return', books: ['haggai', 'zechariah', 'malachi', 'joel'] },
];

// Apostolic divisions
type ApostolicDiv = 'acts' | 'pauline' | 'general' | 'apocalypse';

const APOSTOLIC_DIVS: { id: ApostolicDiv; label: string; books: string[] }[] = [
  { id: 'acts', label: '', books: ['acts'] },
  { id: 'pauline', label: 'Pauline', books: ['romans', '1-corinthians', '2-corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', '1-thessalonians', '2-thessalonians', '1-timothy', '2-timothy', 'titus', 'philemon'] },
  { id: 'general', label: 'General', books: ['hebrews', 'james', '1-peter', '2-peter', '1-john', '2-john', '3-john', 'jude'] },
  { id: 'apocalypse', label: 'Apocalypse', books: ['revelation'] },
];

const TABS: { id: TabId; label: string; books: string[]; testament: 'old' | 'new' }[] = [
  { id: 'torah', label: 'Law', testament: 'old', books: ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy'] },
  { id: 'judges', label: 'Judges', testament: 'old', books: ['joshua', 'judges', 'ruth'] },
  { id: 'kings', label: 'Kings', testament: 'old', books: ['1-samuel', '2-samuel', '1-kings', '2-kings'] },
  { id: 'prophets', label: 'Prophets', testament: 'old', books: [] }, // handled separately with eras
  { id: 'exile', label: 'Exile', testament: 'old', books: ['1-chronicles', '2-chronicles', 'ezra', 'nehemiah', 'esther'] },
  { id: 'wisdom', label: 'Wisdom', testament: 'old', books: ['job', 'psalms', 'proverbs', 'ecclesiastes', 'song-of-solomon'] },
  { id: 'gospels', label: 'Gospels', testament: 'new', books: ['matthew', 'mark', 'luke', 'john'] },
  { id: 'apostolic', label: 'Apostolic', testament: 'new', books: [] }, // handled separately with divisions
];

function BookTile({
  book,
  completedChapters
}: {
  book: typeof BIBLE_INDEX[number];
  completedChapters: number[];
}) {
  const completed = completedChapters.length;
  const total = book.chapterCount;
  const isComplete = completed === total;
  const isInProgress = completed > 0 && !isComplete;
  const percentage = Math.round((completed / total) * 100);

  // Find the first incomplete chapter for in-progress books
  let targetChapter = 1;
  if (isInProgress) {
    for (let ch = 1; ch <= total; ch++) {
      if (!completedChapters.includes(ch)) {
        targetChapter = ch;
        break;
      }
    }
  }

  return (
    <Link
      href={`/${book.slug}/${targetChapter}`}
      className={`relative flex min-h-[44px] items-center justify-center w-20 rounded px-2 py-2.5 border transition-colors ${
        isComplete
          ? 'bg-emerald-500/10 border-emerald-500/40'
          : isInProgress
          ? 'bg-gold/5 border-gold/40'
          : 'bg-[rgb(var(--surface))] border-hairline hover:border-gold/50'
      }`}
      title={`${book.name}: ${completed}/${total} chapters`}
      aria-label={`${book.name}: ${completed} of ${total} chapters`}
    >
      <span className={`font-sans text-[11px] font-medium whitespace-nowrap ${
        isComplete ? 'text-emerald-500' : isInProgress ? 'text-gold' : 'text-muted'
      }`}>
        {isInProgress ? `${book.abbreviation} ${percentage}%` : book.abbreviation}
      </span>
    </Link>
  );
}

function getTabProgress(tab: typeof TABS[number], completedByBook: Record<string, number[]>) {
  let completedBooks = 0;
  for (const slug of tab.books) {
    const book = BIBLE_INDEX.find(b => b.slug === slug);
    if (!book) continue;
    const completed = completedByBook[slug]?.length || 0;
    if (completed === book.chapterCount) completedBooks++;
  }
  return { completed: completedBooks, total: tab.books.length };
}

function isTabComplete(tab: typeof TABS[number], completedByBook: Record<string, number[]>) {
  const progress = getTabProgress(tab, completedByBook);
  return progress.completed === progress.total;
}

function getEraProgress(era: typeof PROPHET_ERAS[number], completedByBook: Record<string, number[]>) {
  let completedBooks = 0;
  for (const slug of era.books) {
    const book = BIBLE_INDEX.find(b => b.slug === slug);
    if (!book) continue;
    const completed = completedByBook[slug]?.length || 0;
    if (completed === book.chapterCount) completedBooks++;
  }
  return { completed: completedBooks, total: era.books.length };
}

function isEraComplete(era: typeof PROPHET_ERAS[number], completedByBook: Record<string, number[]>) {
  const progress = getEraProgress(era, completedByBook);
  return progress.completed === progress.total;
}

function getApostolicDivProgress(div: typeof APOSTOLIC_DIVS[number], completedByBook: Record<string, number[]>) {
  let completedBooks = 0;
  for (const slug of div.books) {
    const book = BIBLE_INDEX.find(b => b.slug === slug);
    if (!book) continue;
    const completed = completedByBook[slug]?.length || 0;
    if (completed === book.chapterCount) completedBooks++;
  }
  return { completed: completedBooks, total: div.books.length };
}

function isApostolicDivComplete(div: typeof APOSTOLIC_DIVS[number], completedByBook: Record<string, number[]>) {
  const progress = getApostolicDivProgress(div, completedByBook);
  return progress.completed === progress.total;
}

export default function BibleProgressGrid({ completedByBook }: Props) {
  const otTabs = TABS.filter(t => t.testament === 'old');
  const ntTabs = TABS.filter(t => t.testament === 'new');

  // Calculate OT stats
  const otBooks = [
    ...TABS.filter(t => t.testament === 'old' && t.id !== 'prophets').flatMap(t => t.books),
    ...PROPHET_ERAS.flatMap(e => e.books)
  ];
  const otTotal = otBooks.length;
  let otCompleted = 0;
  for (const slug of otBooks) {
    const book = BIBLE_INDEX.find(b => b.slug === slug);
    if (book && (completedByBook[slug]?.length || 0) === book.chapterCount) otCompleted++;
  }
  const otAllComplete = otCompleted === otTotal;

  // Calculate NT stats
  const ntBooks = [
    ...TABS.filter(t => t.testament === 'new' && t.id !== 'apostolic').flatMap(t => t.books),
    ...APOSTOLIC_DIVS.flatMap(d => d.books)
  ];
  const ntTotal = ntBooks.length;
  let ntCompleted = 0;
  for (const slug of ntBooks) {
    const book = BIBLE_INDEX.find(b => b.slug === slug);
    if (book && (completedByBook[slug]?.length || 0) === book.chapterCount) ntCompleted++;
  }
  const ntAllComplete = ntCompleted === ntTotal;

  const renderTabSection = (tab: typeof TABS[number]) => {
    // Special handling for Prophets - show sub-divisions inline
    if (tab.id === 'prophets') {
      const allProphetBooks = PROPHET_ERAS.flatMap(e => e.books);
      const totalBooks = allProphetBooks.length;
      let completedBooks = 0;
      for (const slug of allProphetBooks) {
        const book = BIBLE_INDEX.find(b => b.slug === slug);
        if (!book) continue;
        const completed = completedByBook[slug]?.length || 0;
        if (completed === book.chapterCount) completedBooks++;
      }
      const allComplete = completedBooks === totalBooks;

      return (
        <div key={tab.id}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`font-sans text-[10px] ${
              allComplete ? 'text-emerald-500' : 'text-faint'
            }`}>
              ({completedBooks}/{totalBooks})
            </span>
            <Link
              href={`/library/${tab.id}`}
              className={`font-sans text-[11px] font-medium transition-colors ${
                allComplete ? 'text-emerald-500' : 'text-muted hover:text-ink'
              }`}
            >
              {tab.label}
            </Link>
          </div>
          <div className="space-y-1.5">
            {PROPHET_ERAS.map(era => {
              const eraComplete = isEraComplete(era, completedByBook);
              const books = era.books.map(slug => BIBLE_INDEX.find(b => b.slug === slug)!).filter(Boolean);

              return (
                <div key={era.id} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-1">
                  <span className={`font-sans text-[10px] w-auto sm:w-20 flex-shrink-0 py-0 sm:py-2.5 flex items-center gap-1 ${
                    eraComplete ? 'text-emerald-500' : 'text-faint'
                  }`}>
                    <span className="text-faint">›</span>
                    <span>{era.label}</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {books.map(book => (
                      <BookTile
                        key={book.slug}
                        book={book}
                        completedChapters={completedByBook[book.slug] || []}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Special handling for Apostolic - show sub-divisions inline
    if (tab.id === 'apostolic') {
      const allApostolicBooks = APOSTOLIC_DIVS.flatMap(d => d.books);
      const totalBooks = allApostolicBooks.length;
      let completedBooks = 0;
      for (const slug of allApostolicBooks) {
        const book = BIBLE_INDEX.find(b => b.slug === slug);
        if (!book) continue;
        const completed = completedByBook[slug]?.length || 0;
        if (completed === book.chapterCount) completedBooks++;
      }
      const allComplete = completedBooks === totalBooks;

      return (
        <div key={tab.id}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`font-sans text-[10px] ${
              allComplete ? 'text-emerald-500' : 'text-faint'
            }`}>
              ({completedBooks}/{totalBooks})
            </span>
            <Link
              href={`/library/${tab.id}`}
              className={`font-sans text-[11px] font-medium transition-colors ${
                allComplete ? 'text-emerald-500' : 'text-muted hover:text-ink'
              }`}
            >
              {tab.label}
            </Link>
          </div>
          <div className="space-y-1.5">
            {APOSTOLIC_DIVS.map(div => {
              const divComplete = isApostolicDivComplete(div, completedByBook);
              const books = div.books.map(slug => BIBLE_INDEX.find(b => b.slug === slug)!).filter(Boolean);

              return (
                <div key={div.id} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-1">
                  <span className={`font-sans text-[10px] w-auto sm:w-20 flex-shrink-0 py-0 sm:py-2.5 flex items-center gap-1 ${
                    divComplete ? 'text-emerald-500' : 'text-faint'
                  }`}>
                    {div.label && <><span className="text-faint">›</span><span>{div.label}</span></>}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {books.map(book => (
                      <BookTile
                        key={book.slug}
                        book={book}
                        completedChapters={completedByBook[book.slug] || []}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    const progress = getTabProgress(tab, completedByBook);
    const complete = isTabComplete(tab, completedByBook);
    const books = tab.books.map(slug => BIBLE_INDEX.find(b => b.slug === slug)!).filter(Boolean);

    return (
      <div key={tab.id}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`font-sans text-[10px] ${
            complete ? 'text-emerald-500' : 'text-faint'
          }`}>
            ({progress.completed}/{progress.total})
          </span>
          <Link
            href={`/library/${tab.id}`}
            className={`font-sans text-[11px] font-medium transition-colors ${
              complete ? 'text-emerald-500' : 'text-muted hover:text-ink'
            }`}
          >
            {tab.label}
          </Link>
        </div>
        <div className="flex flex-wrap gap-1">
          {books.map(book => (
            <BookTile
              key={book.slug}
              book={book}
              completedChapters={completedByBook[book.slug] || []}
            />
          ))}
        </div>
      </div>
    );
  };

  // Collapsed by default on mobile so Today/dashboard open clean; the
  // md:hidden fallback keeps desktop always expanded regardless of state.
  const [otOpen, setOtOpen] = useState(false);
  const [ntOpen, setNtOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Old Testament */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setOtOpen(v => !v)}
            className="md:pointer-events-none flex items-center gap-2 py-3 -my-3 px-2 -mx-2 md:p-0 md:m-0 font-sans text-[10px] font-semibold uppercase tracking-wider text-gold cursor-pointer md:cursor-default"
          >
            <span className={`md:hidden transition-transform ${otOpen ? 'rotate-90' : ''}`}>›</span>
            Old Testament
          </button>
          <span className={`font-sans text-[10px] ${otAllComplete ? 'text-emerald-500' : 'text-faint'}`}>
            {otCompleted} / {otTotal}
          </span>
        </div>
        <div className={`space-y-4 ${otOpen ? '' : 'hidden md:block'}`}>
          {otTabs.map(renderTabSection)}
        </div>
      </div>

      {/* New Testament */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setNtOpen(v => !v)}
            className="md:pointer-events-none flex items-center gap-2 py-3 -my-3 px-2 -mx-2 md:p-0 md:m-0 font-sans text-[10px] font-semibold uppercase tracking-wider text-gold cursor-pointer md:cursor-default"
          >
            <span className={`md:hidden transition-transform ${ntOpen ? 'rotate-90' : ''}`}>›</span>
            New Testament
          </button>
          <span className={`font-sans text-[10px] ${ntAllComplete ? 'text-emerald-500' : 'text-faint'}`}>
            {ntCompleted} / {ntTotal}
          </span>
        </div>
        <div className={`space-y-4 ${ntOpen ? '' : 'hidden md:block'}`}>
          {ntTabs.map(renderTabSection)}
        </div>
      </div>
    </div>
  );
}
