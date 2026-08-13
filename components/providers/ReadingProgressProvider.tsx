'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ReadingProgress = Record<string, number[]>;

interface ReadingProgressContextType {
  progress: ReadingProgress;
  isChapterComplete: (book: string, chapter: number) => boolean;
  isDivisionComplete: (book: string, chapters: number[]) => boolean;
  markChapterComplete: (book: string, chapter: number) => void;
  toggleChapterComplete: (book: string, chapter: number) => Promise<boolean>;
}

const ReadingProgressContext = createContext<ReadingProgressContextType | null>(null);

export function useReadingProgress() {
  const context = useContext(ReadingProgressContext);
  if (!context) {
    // Return a no-op version for unauthenticated users
    return {
      progress: {},
      isChapterComplete: () => false,
      isDivisionComplete: () => false,
      markChapterComplete: () => {},
      toggleChapterComplete: async () => false,
    };
  }
  return context;
}

interface Props {
  children: ReactNode;
  initialProgress: ReadingProgress;
}

export function ReadingProgressProvider({ children, initialProgress }: Props) {
  const [progress, setProgress] = useState<ReadingProgress>(initialProgress);

  const isChapterComplete = useCallback((book: string, chapter: number): boolean => {
    return progress[book]?.includes(chapter) ?? false;
  }, [progress]);

  const isDivisionComplete = useCallback((book: string, chapters: number[]): boolean => {
    const completed = progress[book] || [];
    return chapters.length > 0 && chapters.every(ch => completed.includes(ch));
  }, [progress]);

  const markChapterComplete = useCallback((book: string, chapter: number) => {
    setProgress(prev => {
      const bookProgress = prev[book] || [];
      if (bookProgress.includes(chapter)) return prev;
      return {
        ...prev,
        [book]: [...bookProgress, chapter].sort((a, b) => a - b),
      };
    });
  }, []);

  const toggleChapterComplete = useCallback(async (book: string, chapter: number): Promise<boolean> => {
    const isCurrentlyComplete = progress[book]?.includes(chapter) ?? false;
    const newState = !isCurrentlyComplete;

    // Optimistically update UI
    setProgress(prev => {
      const bookProgress = prev[book] || [];
      if (newState) {
        // Mark as complete
        if (bookProgress.includes(chapter)) return prev;
        return {
          ...prev,
          [book]: [...bookProgress, chapter].sort((a, b) => a - b),
        };
      } else {
        // Mark as incomplete
        return {
          ...prev,
          [book]: bookProgress.filter(ch => ch !== chapter),
        };
      }
    });

    // Persist to database
    try {
      if (newState) {
        await fetch('/api/reading-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ book, chapter }),
        });
      } else {
        await fetch('/api/reading-progress', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ book, chapter }),
        });
      }
    } catch (err) {
      console.error('Failed to toggle reading progress:', err);
      // Revert on error
      setProgress(prev => {
        const bookProgress = prev[book] || [];
        if (!newState) {
          return {
            ...prev,
            [book]: [...bookProgress, chapter].sort((a, b) => a - b),
          };
        } else {
          return {
            ...prev,
            [book]: bookProgress.filter(ch => ch !== chapter),
          };
        }
      });
    }

    return newState;
  }, [progress]);

  return (
    <ReadingProgressContext.Provider
      value={{ progress, isChapterComplete, isDivisionComplete, markChapterComplete, toggleChapterComplete }}
    >
      {children}
    </ReadingProgressContext.Provider>
  );
}
