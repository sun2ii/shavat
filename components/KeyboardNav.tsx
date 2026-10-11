'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useReadingProgress } from '@/components/providers/ReadingProgressProvider';
import { useBookmarks } from '@/components/providers/BookmarkProvider';
import { useReadingPreferences } from '@/components/providers/ReadingPreferencesProvider';
import { storage } from '@/lib/storage';
import { loadingBus } from '@/lib/loading-bus';

interface Props {
  book: string;
  chapter: number;
  prevHref?: string | null;
  nextHref?: string | null;
  isAuthenticated: boolean;
  /** Called when bookmark is added (for showing toast) */
  onBookmarkAdded?: () => void;
  /** Called when chapter is marked complete (for showing toast) */
  onMarkedComplete?: () => void;
}

/**
 * Centralized keyboard navigation handler for Bible and Readings.
 * Handles chapter navigation, bookmarks, and mark-as-read.
 *
 * Returns handlers that parent components can call, plus handles
 * chapter-level keyboard shortcuts directly.
 *
 * Vim mode (hjkl):
 *   h/l = prev/next chapter
 *   o = toggle bookmark
 *   p = mark as read
 *
 * Standard mode (arrows):
 *   Left/Right = prev/next chapter
 */
export function useKeyboardNav({
  book,
  chapter,
  prevHref,
  nextHref,
  isAuthenticated,
  onBookmarkAdded,
  onMarkedComplete,
}: Props) {
  const router = useRouter();
  const { preferences } = useReadingPreferences();
  const isVim = preferences.keyboardStyle === 'vim';

  // Bookmark state
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [localBookmark, setLocalBookmark] = useState(false);

  // Reading progress
  const { isChapterComplete, toggleChapterComplete, markChapterComplete } = useReadingProgress();

  // Load localStorage bookmark for unauthenticated users
  useEffect(() => {
    if (typeof window === 'undefined' || isAuthenticated) return;
    const bookmark = storage.getBookmark();
    setLocalBookmark(bookmark?.chapter === chapter && bookmark?.book === book);
  }, [chapter, book, isAuthenticated]);

  // Track current bookmark/complete state for toast logic
  const currentlyBookmarked = isAuthenticated ? isBookmarked(book, chapter) : localBookmark;
  const currentlyComplete = isChapterComplete(book, chapter);

  const handleBookmark = useCallback(() => {
    // Only show toast when ADDING bookmark (not removing)
    const willShowToast = !currentlyBookmarked;

    if (isAuthenticated) {
      void toggleBookmark(book, chapter);
    } else {
      if (localBookmark) {
        storage.clearBookmark();
        setLocalBookmark(false);
      } else {
        storage.setBookmark({ book, chapter, verse: 1 });
        setLocalBookmark(true);
      }
    }

    if (willShowToast) {
      onBookmarkAdded?.();
    }
  }, [isAuthenticated, toggleBookmark, book, chapter, localBookmark, currentlyBookmarked, onBookmarkAdded]);

  const handleToggleComplete = useCallback(() => {
    if (!isAuthenticated) return;

    // Only show toast when MARKING complete (not unmarking)
    const willShowToast = !currentlyComplete;

    void toggleChapterComplete(book, chapter);

    if (willShowToast) {
      onMarkedComplete?.();
    }
  }, [isAuthenticated, toggleChapterComplete, book, chapter, currentlyComplete, onMarkedComplete]);

  const handlePrev = useCallback(() => {
    if (prevHref) {
      loadingBus.start();
      router.push(prevHref);
    }
  }, [prevHref, router]);

  const handleNext = useCallback(() => {
    if (nextHref) {
      // Mark current chapter as read before navigating
      if (isAuthenticated) {
        markChapterComplete(book, chapter);
        fetch('/api/reading-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ book, chapter }),
        }).catch(err => console.error('Failed to save reading progress:', err));
      }
      loadingBus.start();
      router.push(nextHref);
    }
  }, [nextHref, isAuthenticated, markChapterComplete, book, chapter, router]);

  return {
    isVim,
    canGoPrev: !!prevHref,
    canGoNext: !!nextHref,
    isBookmarked: isAuthenticated ? isBookmarked(book, chapter) : localBookmark,
    isComplete: isChapterComplete(book, chapter),
    handlePrev,
    handleNext,
    handleBookmark,
    handleToggleComplete,
  };
}
