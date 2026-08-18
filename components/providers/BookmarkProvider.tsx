'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface BookmarkContextType {
  isBookmarked: (book: string, chapter: number) => boolean;
  getBookmarkedChapters: (book: string) => Set<number>;
  toggleBookmark: (book: string, chapter: number) => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export function BookmarkProvider({
  children,
  initialBookmarks,
}: {
  children: ReactNode;
  initialBookmarks: Record<string, number[]>;
}) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const isBookmarked = useCallback(
    (book: string, chapter: number) => {
      return bookmarks[book]?.includes(chapter) ?? false;
    },
    [bookmarks]
  );

  const getBookmarkedChapters = useCallback(
    (book: string) => {
      return new Set(bookmarks[book] || []);
    },
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    async (book: string, chapter: number) => {
      const isCurrentlyBookmarked = bookmarks[book]?.includes(chapter);

      // Optimistic update
      setBookmarks((prev) => {
        const bookChapters = prev[book] || [];
        if (isCurrentlyBookmarked) {
          return { ...prev, [book]: bookChapters.filter((ch) => ch !== chapter) };
        } else {
          return { ...prev, [book]: [...bookChapters, chapter].sort((a, b) => a - b) };
        }
      });

      // Sync to API
      try {
        if (isCurrentlyBookmarked) {
          await fetch('/api/bookmarks', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ book, chapter }),
          });
        } else {
          await fetch('/api/bookmarks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ book, chapter, verse: 1 }),
          });
        }
      } catch (err) {
        // Revert on error
        setBookmarks((prev) => {
          const bookChapters = prev[book] || [];
          if (isCurrentlyBookmarked) {
            return { ...prev, [book]: [...bookChapters, chapter].sort((a, b) => a - b) };
          } else {
            return { ...prev, [book]: bookChapters.filter((ch) => ch !== chapter) };
          }
        });
        console.error('Failed to sync bookmark:', err);
      }
    },
    [bookmarks]
  );

  return (
    <BookmarkContext.Provider value={{ isBookmarked, getBookmarkedChapters, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    // Return no-op for unauthenticated (they use localStorage)
    return {
      isBookmarked: () => false,
      getBookmarkedChapters: () => new Set<number>(),
      toggleBookmark: async () => {},
    };
  }
  return context;
}
