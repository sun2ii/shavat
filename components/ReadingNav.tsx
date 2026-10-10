'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReadingProgress } from '@/components/providers/ReadingProgressProvider';
import { useBookmarks } from '@/components/providers/BookmarkProvider';
import { useReadingPreferences } from '@/components/providers/ReadingPreferencesProvider';
import { storage } from '@/lib/storage';
import { loadingBus } from '@/lib/loading-bus';
import SettingsDropdown from './SettingsDropdown';

interface Book {
  id: number;
  slug: string;
  title: string;
  chapters: number;
}

interface Props {
  readingId: string;
  readingTitle: string;
  bookSlug: string;
  bookTitle: string;
  bookId: number;
  currentChapter: number;
  totalChapters: number;
  chapterTitle?: string;
  allBooks: Book[];
  isAuthenticated: boolean;
}

/**
 * Navigation header for Christian Readings, mirroring ChapterNav's layout:
 * - Left: chapter reference pill with book map popup
 * - Center: reading title, book title, chapter selector
 * - Right: bookmark, mark-as-read, settings icons
 */
export default function ReadingNav({
  readingId,
  readingTitle,
  bookSlug,
  bookTitle,
  bookId,
  currentChapter,
  totalChapters,
  chapterTitle,
  allBooks,
  isAuthenticated,
}: Props) {
  const router = useRouter();
  const [mapOpen, setMapOpen] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const { preferences } = useReadingPreferences();
  const isVim = preferences.keyboardStyle === 'vim';

  const { isChapterComplete, toggleChapterComplete } = useReadingProgress();
  const isCurrentComplete = isChapterComplete(bookSlug, currentChapter);
  const [isToggling, setIsToggling] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const { isBookmarked: isChapterBookmarked, toggleBookmark } = useBookmarks();
  const [localBookmark, setLocalBookmark] = useState(false);
  const isBookmarked = isAuthenticated ? isChapterBookmarked(bookSlug, currentChapter) : localBookmark;

  // Build short label for the pill (e.g., "Imit 1:3" or "Conf 5")
  const shortLabel = (() => {
    if (readingId === 'imitation-of-christ') {
      return `Imit ${bookId}:${currentChapter}`;
    } else if (readingId === 'confessions') {
      return `Conf ${bookId}`;
    } else if (readingId === 'practice-presence-god') {
      const abbrev = bookSlug === 'conversations' ? 'Conv' : 'Lett';
      return `${abbrev} ${currentChapter}`;
    }
    return `${currentChapter}`;
  })();

  // Calculate prev/next
  const prevChapter = currentChapter > 1 ? currentChapter - 1 : null;
  const nextChapter = currentChapter < totalChapters ? currentChapter + 1 : null;
  const prevBookInfo = bookId > 1 ? allBooks.find(b => b.id === bookId - 1) : null;
  const nextBookInfo = bookId < allBooks.length ? allBooks.find(b => b.id === bookId + 1) : null;

  const buildHref = (bId: number, ch: number) => `/readings/${readingId}/${bId}/${ch}`;

  const prevHref = prevChapter
    ? buildHref(bookId, prevChapter)
    : prevBookInfo
    ? buildHref(prevBookInfo.id, prevBookInfo.chapters)
    : null;

  const nextHref = nextChapter
    ? buildHref(bookId, nextChapter)
    : nextBookInfo
    ? buildHref(nextBookInfo.id, 1)
    : null;

  // Close map on outside click or Escape
  useEffect(() => {
    if (!mapOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (mapRef.current && !mapRef.current.contains(e.target as Node)) {
        setMapOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMapOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mapOpen]);

  // Load localStorage bookmark for unauthenticated users
  useEffect(() => {
    if (typeof window === 'undefined' || isAuthenticated) return;
    const bookmark = storage.getBookmark();
    setLocalBookmark(bookmark?.chapter === currentChapter && bookmark?.book === bookSlug);
  }, [currentChapter, bookSlug, isAuthenticated]);

  // Prefetch adjacent chapters
  useEffect(() => {
    if (prevHref) router.prefetch(prevHref);
    if (nextHref) router.prefetch(nextHref);
  }, [router, prevHref, nextHref]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const prevKey = isVim ? 'h' : 'ArrowLeft';
      const nextKey = isVim ? 'l' : 'ArrowRight';

      if (e.key === prevKey && prevHref) {
        loadingBus.start();
        router.push(prevHref);
      } else if (e.key === nextKey && nextHref) {
        loadingBus.start();
        router.push(nextHref);
      } else if (e.key === 'b') {
        e.preventDefault();
        handleBookmark();
      } else if (e.key === 'r' && isAuthenticated) {
        e.preventDefault();
        void handleToggleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleBookmark = () => {
    if (typeof window === 'undefined') return;

    if (isAuthenticated) {
      if (!isBookmarked) {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 1500);
      }
      void toggleBookmark(bookSlug, currentChapter);
    } else {
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
        {/* Top row: pill left, icons right */}
        <div className="w-full flex items-center justify-between mb-3">
          {/* Left: reference pill with book map */}
          <div
            ref={mapRef}
            className="relative"
            onMouseEnter={() => setMapOpen(true)}
            onMouseLeave={() => setMapOpen(false)}
          >
            <button
              onClick={() => setMapOpen(v => !v)}
              aria-expanded={mapOpen}
              aria-label="Show book map"
              className="font-sans text-[13px] font-semibold text-blue-ref bg-[rgb(var(--blue-ref)/0.12)] px-2.5 py-1 rounded-full cursor-pointer"
            >
              {shortLabel}
            </button>

            {mapOpen && (
              <div className="absolute left-0 top-full pt-2 z-50">
                <div className="w-72 max-h-96 overflow-y-auto bg-surface border border-hairline rounded-xl shadow-xl p-4 space-y-3 text-left">
                  {allBooks.map((book) => {
                    const isCurrentBook = book.id === bookId;
                    return (
                      <div key={book.id}>
                        <div
                          className={`font-sans text-[10px] tracking-[0.16em] uppercase font-bold mb-1 ${
                            isCurrentBook ? 'text-gold-ink' : 'text-faint'
                          }`}
                        >
                          {book.title}
                        </div>
                        <div className="flex flex-wrap gap-x-2.5 gap-y-1 font-serif text-[15px] leading-none">
                          {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => {
                            const isCurrent = isCurrentBook && ch === currentChapter;
                            const isRead = isChapterComplete(book.slug, ch);
                            return (
                              <Link
                                key={ch}
                                href={buildHref(book.id, ch)}
                                onClick={() => setMapOpen(false)}
                                className={
                                  isCurrent
                                    ? 'text-gold font-bold'
                                    : isRead
                                    ? 'text-emerald-500 hover:text-emerald-400 transition-colors'
                                    : 'text-muted/50 hover:text-ink transition-colors'
                                }
                              >
                                {ch}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: bookmark, mark-as-read, settings */}
          <div className="flex items-center gap-1.5">
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
          <SettingsDropdown />
          </div>
        </div>

        {/* Center: reading title */}
        <Link
          href={`/readings/${readingId}`}
          className="max-w-[calc(100%-120px)] truncate text-center py-1 font-sans text-xs tracking-[0.24em] uppercase text-muted hover:text-ink active:text-ink font-semibold transition-colors"
        >
          {readingTitle}
        </Link>

        {/* Book title and chapter info */}
        <p className="font-serif text-lg text-ink mt-1">
          {bookTitle}
        </p>

        {chapterTitle && (
          <p className="font-serif italic text-base text-muted mt-1 max-w-2xl text-center">
            {chapterTitle}
          </p>
        )}

        {/* Chapter selector */}
        <div className="mt-3 flex flex-wrap justify-center gap-x-1 gap-y-2 font-serif text-[15px] leading-none">
          {Array.from({ length: totalChapters }, (_, i) => i + 1).map((ch) => {
            const isActive = ch === currentChapter;
            const isCompleted = isChapterComplete(bookSlug, ch);
            return (
              <Link
                key={ch}
                href={buildHref(bookId, ch)}
                aria-label={isCompleted ? `Chapter ${ch}, completed` : `Chapter ${ch}`}
                className={`inline-flex items-center justify-center min-w-[32px] min-h-[36px] transition-colors relative ${
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
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-blue-500">▲</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bookmark toast */}
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
