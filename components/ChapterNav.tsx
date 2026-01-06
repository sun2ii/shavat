'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';

interface Props {
  currentChapter: number;
  totalChapters: number;
}

export default function ChapterNav({ currentChapter, totalChapters }: Props) {
  const hasPrev = currentChapter > 1;
  const hasNext = currentChapter < totalChapters;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  // Check if current chapter is bookmarked
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const bookmark = storage.getBookmark();
    setIsBookmarked(bookmark?.chapter === currentChapter);
  }, [currentChapter]);

  const handleBookmark = () => {
    if (typeof window === 'undefined') return;

    try {
      storage.setBookmark({
        book: 'Genesis',
        chapter: currentChapter,
        verse: 1,
      });
      setIsBookmarked(true);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save bookmark', error);
    }
  };

  return (
    <>
      {/* Top header with chapter title and bookmark */}
      <nav className="flex flex-col items-center justify-center gap-2 mb-6 pb-3 border-b border-[rgb(var(--border))]">
        <span className="text-[#D4AF37] text-3xl font-semibold tracking-wide">Genesis {currentChapter}</span>
        <button
          onClick={handleBookmark}
          className="px-3 py-1 text-xs bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border))] rounded transition-colors"
        >
          {showSaved ? '✓ Saved' : isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </nav>

      {/* Fixed left navigation */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2">
        {hasPrev ? (
          <Link
            href={`/genesis/${currentChapter - 1}`}
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors text-2xl"
          >
            ← {currentChapter - 1}
          </Link>
        ) : (
          <span className="text-[rgb(var(--text-tertiary))] text-2xl">← {currentChapter - 1}</span>
        )}
      </div>

      {/* Fixed right navigation */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2">
        {hasNext ? (
          <Link
            href={`/genesis/${currentChapter + 1}`}
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors text-2xl"
          >
            {currentChapter + 1} →
          </Link>
        ) : (
          <span className="text-[rgb(var(--text-tertiary))] text-2xl">{currentChapter + 1} →</span>
        )}
      </div>
    </>
  );
}
