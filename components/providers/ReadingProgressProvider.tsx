'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ReadingProgress = Record<string, number[]>;
type Season = 1 | 2 | 3;
type SeasonColor = 'gold' | 'purple' | 'green';

const SEASON_COLORS: Record<Season, SeasonColor> = {
  1: 'gold',
  2: 'purple',
  3: 'green',
};

interface ReadingProgressContextType {
  progress: ReadingProgress;
  season: Season;
  seasonColor: SeasonColor;
  isChapterComplete: (book: string, chapter: number) => boolean;
  isDivisionComplete: (book: string, chapters: number[]) => boolean;
  markChapterComplete: (book: string, chapter: number) => void;
  toggleChapterComplete: (book: string, chapter: number) => Promise<boolean>;
  startNewSeason: () => Promise<{ previousSeason: Season; newSeason: Season; archivedCount: number } | null>;
}

const ReadingProgressContext = createContext<ReadingProgressContextType | null>(null);

export function useReadingProgress() {
  const context = useContext(ReadingProgressContext);
  if (!context) {
    // Return a no-op version for unauthenticated users
    return {
      progress: {},
      season: 1 as Season,
      seasonColor: 'gold' as SeasonColor,
      isChapterComplete: () => false,
      isDivisionComplete: () => false,
      markChapterComplete: () => {},
      toggleChapterComplete: async () => false,
      startNewSeason: async () => null,
    };
  }
  return context;
}

interface Props {
  children: ReactNode;
  initialProgress: ReadingProgress;
  initialSeason?: Season;
}

export function ReadingProgressProvider({ children, initialProgress, initialSeason = 1 }: Props) {
  const [progress, setProgress] = useState<ReadingProgress>(initialProgress);
  const [season, setSeason] = useState<Season>(initialSeason);
  const seasonColor = SEASON_COLORS[season];

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

  const startNewSeason = useCallback(async (): Promise<{ previousSeason: Season; newSeason: Season; archivedCount: number } | null> => {
    try {
      const res = await fetch('/api/reading-progress/seasons', {
        method: 'POST',
      });
      if (!res.ok) {
        console.error('Failed to start new season:', await res.text());
        return null;
      }
      const data = await res.json();
      // Clear progress and update season
      setProgress({});
      setSeason(data.newSeason.number as Season);
      return {
        previousSeason: data.previousSeason.number as Season,
        newSeason: data.newSeason.number as Season,
        archivedCount: data.archivedChapters,
      };
    } catch (err) {
      console.error('Failed to start new season:', err);
      return null;
    }
  }, []);

  return (
    <ReadingProgressContext.Provider
      value={{ progress, season, seasonColor, isChapterComplete, isDivisionComplete, markChapterComplete, toggleChapterComplete, startNewSeason }}
    >
      {children}
    </ReadingProgressContext.Provider>
  );
}
