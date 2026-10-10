'use client';

import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { BookDivision } from '@/lib/types';
import { getAllDivisions, getNextDivision, getPreviousDivision } from '@/lib/book-metadata-utils';
import { hasWriting, getWriting } from '@/lib/hasWritings';
import { hasBookWriting } from '@/lib/writings/bookWritings';
import { readingPath, writingPath } from '@/lib/routes';
import { loadingBus } from '@/lib/loading-bus';
import { FIRST_VERSE_HASH } from '@/lib/reader-keys';
import BookMap from './BookMap';
import TranslationToggle from './TranslationToggle';
import SettingsDropdown from './SettingsDropdown';
import { useReadingProgress } from '@/components/providers/ReadingProgressProvider';
import { useBookmarks } from '@/components/providers/BookmarkProvider';
import { useReadingPreferences } from '@/components/providers/ReadingPreferencesProvider';

interface Props {
  bookSlug: string;
  bookName: string;
  bookAbbreviation: string;
  currentChapter: number;
  division: BookDivision;
  chapterSummary?: string;
  isAuthenticated?: boolean;
  userEmail?: string | null;
}

function DivisionMap({ divisions, bookSlug, currentDivisionId, currentChapter, bookmarkedChapters }: {
  divisions: BookDivision[];
  bookSlug: string;
  currentDivisionId: string;
  currentChapter: number;
  bookmarkedChapters: Set<number>;
}) {
  const [open, setOpen] = useState(false);
  const currentDivision = divisions.find(d => d.id === currentDivisionId);
  const { isChapterComplete } = useReadingProgress();
  const divisionName = currentDivision?.title.replace('The Book of ', '').replace(/^The /, '') || '';

  return (
    <div
      className="relative"
      // Hover open/close is mouse-only: on touch, the emulated mouseenter +
      // click sequence would toggle the popover open-then-closed in one tap.
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpen(false); }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="font-sans text-[13px] font-semibold text-blue-ref bg-[rgb(var(--blue-ref)/0.12)] px-3 py-2 md:px-2.5 md:py-1 rounded-full cursor-pointer"
      >
        {divisionName}
      </button>

      {open && (
        <>
          {/* Invisible scrim so a tap anywhere outside closes the popover on touch. */}
          <div
            className="fixed inset-0 z-40 cursor-default"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
          <div className="w-72 bg-surface border border-hairline rounded-xl shadow-xl p-4 space-y-3 text-left">
            {divisions.map((div) => {
              const isCurrentDivision = div.id === currentDivisionId;
              const title = div.title
                .replace('The Book of ', '')
                .replace(/^The /, '');

              // Color map for people (consistent with terrain modal)
              const peopleColorMap: Record<string, string> = {
                'adam-eve': 'text-[rgb(var(--speaker-3))]',      // emerald
                'cain-abel': 'text-[rgb(var(--speaker-2))]',     // crimson
                'serpent': 'text-[rgb(var(--speaker-7))]',       // sienna
                'noah': 'text-[rgb(var(--speaker-1))]',          // blue
                'noahs-sons': 'text-[rgb(var(--speaker-4))]',    // violet
                'abraham': 'text-[rgb(var(--speaker-1))]',       // blue
                'lot': 'text-[rgb(var(--speaker-5))]',           // teal
                'hagar-ishmael': 'text-[rgb(var(--speaker-6))]', // magenta
                'isaac': 'text-[rgb(var(--speaker-3))]',         // emerald
                'esau-jacob': 'text-[rgb(var(--speaker-4))]',    // violet
                'jacob': 'text-[rgb(var(--speaker-1))]',         // blue
                'rachel-leah': 'text-[rgb(var(--speaker-6))]',   // magenta
                'laban': 'text-[rgb(var(--speaker-7))]',         // sienna
                'joseph': 'text-[rgb(var(--speaker-3))]',        // emerald
                'judah': 'text-[rgb(var(--speaker-2))]',         // crimson
                'pharaoh': 'text-[rgb(var(--speaker-4))]',       // violet
              };

              return (
                <div key={div.id} className="space-y-1">
                  <Link
                    href={writingPath(bookSlug, div.id)}
                    onClick={() => setOpen(false)}
                    className={`block font-sans text-[10px] tracking-[0.16em] uppercase font-bold transition-colors ${
                      isCurrentDivision ? 'text-gold-ink hover:text-gold' : 'text-faint hover:text-ink'
                    }`}
                  >
                    {title}
                  </Link>

                  {/* People */}
                  {div.people && div.people.length > 0 && (
                    <p className="font-serif text-[11px] leading-tight">
                      {div.people.map((p, idx) => (
                        <span key={p.id}>
                          <span className={peopleColorMap[p.id] || 'text-muted'}>{p.name}</span>
                          {idx < div.people!.length - 1 && <span className="text-faint"> · </span>}
                        </span>
                      ))}
                    </p>
                  )}

                  {/* Places */}
                  {div.places && div.places.length > 0 && (
                    <p className="font-serif text-[11px] leading-tight text-[rgb(var(--speaker-9))]">
                      {div.places.map((place, idx) => (
                        <span key={place.id}>
                          {place.name}
                          {idx < div.places!.length - 1 && <span className="text-faint"> · </span>}
                        </span>
                      ))}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-x-1.5 gap-y-1.5 font-serif text-[15px] leading-none">
                    {div.chapters.map((chapter) => {
                      const isCurrent = isCurrentDivision && chapter === currentChapter;
                      const isRead = isChapterComplete(bookSlug, chapter);
                      const isBookmarkedCh = bookmarkedChapters.has(chapter);
                      return (
                        <Link
                          key={chapter}
                          href={readingPath(bookSlug, div.id, chapter)}
                          onClick={() => setOpen(false)}
                          className={`relative inline-flex min-w-[30px] min-h-[32px] items-center justify-center rounded ${
                            isCurrent && isRead
                              ? 'text-emerald-500 font-bold'
                              : isCurrent
                              ? 'text-muted font-bold'
                              : isRead
                              ? 'text-emerald-500 hover:text-emerald-400 transition-colors'
                              : 'text-muted/50 hover:text-ink active:text-ink transition-colors'
                          }`}
                        >
                          {chapter}
                          {isBookmarkedCh && (
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] text-gold">★</span>
                          )}
                          {isCurrent && (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-blue-500">▲</span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ChapterNav({
  bookSlug,
  bookName,
  bookAbbreviation,
  currentChapter,
  division,
  chapterSummary,
  isAuthenticated = false,
  userEmail,
}: Props) {
  const router = useRouter();
  const [showSaved, setShowSaved] = useState(false);
  const { preferences } = useReadingPreferences();
  const isVim = preferences.keyboardStyle === 'vim';

  // Use reading progress from context (loaded server-side, no delay)
  const { isChapterComplete, toggleChapterComplete } = useReadingProgress();
  const isCurrentComplete = isChapterComplete(bookSlug, currentChapter);
  const [isToggling, setIsToggling] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  // Use bookmarks from context (loaded server-side, no delay)
  const { isBookmarked: isChapterBookmarked, getBookmarkedChapters, toggleBookmark } = useBookmarks();
  const bookmarkedChapters = getBookmarkedChapters(bookSlug);

  // For authenticated users, use context; for unauthenticated, use localStorage state
  const [localBookmark, setLocalBookmark] = useState(false);
  const isBookmarked = isAuthenticated ? isChapterBookmarked(bookSlug, currentChapter) : localBookmark;

  const chapterIndex = division.chapters.indexOf(currentChapter);

  const titleColor = 'text-gold';

  const hasPrevInDivision = chapterIndex > 0;
  const hasNextInDivision = chapterIndex < division.chapters.length - 1;
  const prevChapterInDivision = hasPrevInDivision ? division.chapters[chapterIndex - 1] : null;
  const nextChapterInDivision = hasNextInDivision ? division.chapters[chapterIndex + 1] : null;

  const nextDivision = !hasNextInDivision ? getNextDivision(bookSlug, division.id) : null;
  const prevDivision = !hasPrevInDivision ? getPreviousDivision(bookSlug, division.id) : null;

  const prevChapter = prevChapterInDivision || (prevDivision ? prevDivision.chapters[prevDivision.chapters.length - 1] : null);
  const nextChapter = nextChapterInDivision || (nextDivision ? nextDivision.chapters[0] : null);
  const prevDivisionId = hasPrevInDivision ? division.id : prevDivision?.id;
  const nextDivisionId = hasNextInDivision ? division.id : nextDivision?.id;
  const prevDivisionChapterNum = hasPrevInDivision ? chapterIndex : (prevDivision ? prevDivision.chapters.length : null);
  const nextDivisionChapterNum = hasNextInDivision ? chapterIndex + 2 : (nextDivision ? 1 : null);

  const writingExists = hasWriting(bookSlug, currentChapter);
  const writing = writingExists ? getWriting(bookSlug, currentChapter) : null;

  // Load localStorage bookmark state for unauthenticated users
  useEffect(() => {
    if (typeof window === 'undefined' || isAuthenticated) return;
    const bookmark = storage.getBookmark();
    setLocalBookmark(bookmark?.chapter === currentChapter && bookmark?.book === bookSlug);
  }, [currentChapter, bookSlug, isAuthenticated]);

  // Prefetch adjacent chapters for instant navigation
  useEffect(() => {
    if (prevChapter && prevDivisionId) {
      router.prefetch(readingPath(bookSlug, prevDivisionId, prevChapter));
    }
    if (nextChapter && nextDivisionId) {
      router.prefetch(readingPath(bookSlug, nextDivisionId, nextChapter));
    }
  }, [router, bookSlug, prevChapter, nextChapter, prevDivisionId, nextDivisionId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Chapter navigation. The #v1 hash makes the chapter that loads open its
      // first section with the cursor on verse 1 (BookReader's hash handler).
      const prevKey = isVim ? 'h' : 'ArrowLeft';
      const nextKey = isVim ? 'l' : 'ArrowRight';

      if (e.key === prevKey && prevChapter && prevDivisionId && prevDivisionChapterNum !== null) {
        loadingBus.start();
        router.push(readingPath(bookSlug, prevDivisionId, prevChapter) + FIRST_VERSE_HASH);
      } else if (e.key === nextKey && nextChapter && nextDivisionId && nextDivisionChapterNum !== null) {
        loadingBus.start();
        router.push(readingPath(bookSlug, nextDivisionId, nextChapter) + FIRST_VERSE_HASH);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, bookSlug, prevChapter, nextChapter, prevDivisionId, nextDivisionId, prevDivisionChapterNum, nextDivisionChapterNum, isVim]);

  // b = bookmark this chapter, r = mark as read. No dependency array on
  // purpose: the handlers below close over current state, and re-subscribing
  // each render is cheaper than threading every piece of state through deps.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'b') {
        e.preventDefault();
        void handleBookmark();
      } else if (e.key === 'r') {
        e.preventDefault();
        void handleToggleComplete();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const handleBookmark = () => {
    if (typeof window === 'undefined') return;

    if (isAuthenticated) {
      // Show toast immediately (optimistic), API syncs in background
      if (!isBookmarked) {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 1500);
      }
      void toggleBookmark(bookSlug, currentChapter);
    } else {
      // Use localStorage for unauthenticated users
      if (localBookmark) {
        storage.clearBookmark();
        setLocalBookmark(false);
      } else {
        storage.setBookmark({ book: bookSlug, chapter: currentChapter, verse: 1 });
        setLocalBookmark(true);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 1500);
      }
    }
  };

  const handleToggleComplete = async () => {
    if (!isAuthenticated || isToggling) return;
    const wasComplete = isCurrentComplete;
    setIsToggling(true);
    try {
      await toggleChapterComplete(bookSlug, currentChapter);
      // Trigger animation when marking as complete (not when unmarking)
      if (!wasComplete) {
        setJustCompleted(true);
        setTimeout(() => setJustCompleted(false), 1500);
      }
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      <nav className="relative flex flex-col items-center justify-center mb-2 pt-5 pb-3 border-b border-hairline px-4 sm:px-6">
        {/* Left: canonical reference */}
        <div className="absolute left-4 sm:left-6 top-6">
          <BookMap
            label={`${bookAbbreviation} ${currentChapter}`}
            divisions={getAllDivisions(bookSlug)}
            basePath={readingPath(bookSlug)}
            currentChapter={currentChapter}
            currentDivisionId={division.id}
            bookSlug={bookSlug}
          />
        </div>

        {/* Right: bookmark · read · translation, as icons so the header stays compact */}
        <div className="absolute right-4 sm:right-6 top-6 flex items-center gap-1.5">
          <button
            onClick={handleBookmark}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this chapter'}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this chapter'}
            className={`flex h-7 w-7 items-center justify-center rounded text-[15px] leading-none transition-all duration-300 ${
              showSaved
                ? 'bg-gold/20 text-gold scale-110'
                : isBookmarked
                ? 'text-gold hover:bg-gold/10'
                : 'text-muted hover:text-gold hover:bg-gold/10'
            }`}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
          {isAuthenticated && (
            <button
              onClick={handleToggleComplete}
              disabled={isToggling}
              aria-label={isCurrentComplete ? 'Mark as unread' : 'Mark as read'}
              title={isCurrentComplete ? 'Mark as unread' : 'Mark as read'}
              className={`flex h-7 w-7 items-center justify-center rounded text-[15px] leading-none transition-all duration-300 ${
                justCompleted
                  ? 'bg-green-500/20 text-green-500 scale-110'
                  : isCurrentComplete
                  ? 'text-green-600 dark:text-green-400 hover:bg-green-500/10'
                  : 'text-muted hover:text-ink hover:bg-gold/10'
              } ${isToggling ? 'opacity-50' : ''}`}
            >
              {isCurrentComplete ? '✓' : '○'}
            </button>
          )}
          <TranslationToggle />
        </div>

        {/* The book's name is the way up to its overview, when one is recorded. */}
        {hasBookWriting(bookSlug) ? (
          <Link
            href={writingPath(bookSlug)}
            title={`${bookName} overview`}
            className="max-w-[calc(100%-120px)] truncate text-center py-1 font-sans text-xs tracking-[0.24em] uppercase text-muted hover:text-ink active:text-ink font-semibold transition-colors"
          >
            {bookName}
          </Link>
        ) : (
          <p className="max-w-[calc(100%-120px)] truncate text-center font-sans text-xs tracking-[0.24em] uppercase text-muted font-semibold">
            {bookName}
          </p>
        )}

        {chapterSummary && (
          <p className="font-serif italic text-lg text-muted mt-2 max-w-2xl text-center">
            {chapterSummary}
          </p>
        )}

        {writing && (
          <Link
            href={writing.path}
            className="mt-3 inline-flex items-center gap-2 font-sans text-sm text-blue-ref hover:opacity-80 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Read Essay: {writing.title}</span>
          </Link>
        )}

        {/* Division selector with hover map */}
        <div className="mt-3 flex flex-col items-center gap-2">
          <DivisionMap
            divisions={getAllDivisions(bookSlug)}
            bookSlug={bookSlug}
            currentDivisionId={division.id}
            currentChapter={currentChapter}
            bookmarkedChapters={bookmarkedChapters}
          />

          {/* Current division chapters. Long divisions (Psalms) become a grid
              with enough columns to fit in at most three rows. */}
          {(() => {
            const dense = division.chapters.length > 24;
            const cols = dense ? Math.ceil(division.chapters.length / 3) : 0;
            return (
          <div
            className={
              dense
                ? 'grid gap-x-0.5 gap-y-0.5 font-serif text-[14px] leading-none'
                : 'flex flex-wrap justify-center gap-x-1 gap-y-2 font-serif text-[15px] leading-none'
            }
            style={dense ? { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` } : undefined}
          >
            {division.chapters.map((ch) => {
              const isActive = ch === currentChapter;
              const isCompleted = isChapterComplete(bookSlug, ch);
              const isBookmarkedCh = bookmarkedChapters.has(ch);
              return (
                <Link
                  key={ch}
                  href={readingPath(bookSlug, division.id, ch)}
                  aria-label={isCompleted ? `Chapter ${ch}, completed` : `Chapter ${ch}`}
                  className={`inline-flex items-center justify-center transition-colors relative ${
                    dense ? 'min-w-[34px] min-h-[30px]' : 'min-w-[32px] min-h-[36px]'
                  } ${
                    isActive && isCompleted
                      ? 'text-green-600 dark:text-green-400 font-bold'
                      : isActive
                      ? 'text-muted font-bold'
                      : isCompleted
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-faint hover:text-ink'
                  }`}
                  title={isCompleted ? 'Completed' : undefined}
                >
                  {ch}
                  {isBookmarkedCh && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] text-gold">★</span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-blue-500">▲</span>
                  )}
                </Link>
              );
            })}
          </div>
            );
          })()}

          {/* Prophets active during this chapter */}
          {(() => {
            const activeProphets = division.prophets?.filter(p => p.chapters.includes(currentChapter)) ?? [];
            if (activeProphets.length === 0) return null;

            const northProphets = activeProphets.filter(p => p.region === 'north');
            const southProphets = activeProphets.filter(p => p.region === 'south');

            const prophetColors: Record<string, string> = {
              jonah: 'rgb(var(--speaker-1))',
              amos: 'rgb(var(--speaker-2))',
              hosea: 'rgb(var(--speaker-3))',
              isaiah: 'rgb(var(--speaker-4))',
              micah: 'rgb(var(--speaker-5))',
              nahum: 'rgb(var(--speaker-6))',
              zephaniah: 'rgb(var(--speaker-7))',
              jeremiah: 'rgb(var(--speaker-8))',
              habakkuk: 'rgb(var(--speaker-9))',
              daniel: 'rgb(var(--speaker-10))',
              ezekiel: 'rgb(var(--speaker-11))',
              obadiah: 'rgb(var(--speaker-12))',
            };

            const renderProphets = (prophets: typeof activeProphets) => (
              <div className="flex flex-wrap items-center justify-center gap-1">
                {prophets.map((p, i) => (
                  <Fragment key={p.id}>
                    {i > 0 && <span className="text-faint">·</span>}
                    <Link
                      href={`/${p.id}`}
                      className="inline-block px-1 py-1.5 font-sans text-xs transition-opacity hover:opacity-70 active:opacity-70"
                      style={{ color: prophetColors[p.id] || 'rgb(var(--text-secondary))' }}
                    >
                      {p.name}
                    </Link>
                  </Fragment>
                ))}
              </div>
            );

            return (
              <div className="mt-3 flex flex-col items-center gap-2">
                {northProphets.length > 0 && (
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-sans text-[10px] text-faint uppercase tracking-wider">Northern Prophets</span>
                    {renderProphets(northProphets)}
                  </div>
                )}
                {southProphets.length > 0 && (
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-sans text-[10px] text-faint uppercase tracking-wider">Southern Prophets</span>
                    {renderProphets(southProphets)}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </nav>

      {/* Bookmark toast - brief visual confirmation */}
      {showSaved && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="bg-surface/95 backdrop-blur-sm border border-gold/30 rounded-xl px-6 py-4 shadow-xl animate-[fade-in_0.15s_ease-out]">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-gold">★</span>
              <span className="font-sans text-sm font-medium text-ink">Bookmarked</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
