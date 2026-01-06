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
    const bookmark = storage.getBookmark();
    setIsBookmarked(bookmark?.chapter === currentChapter);
  }, [currentChapter]);

  const handleBookmark = () => {
    storage.setBookmark({
      book: 'Genesis',
      chapter: currentChapter,
      verse: 1,
    });
    setIsBookmarked(true);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <nav className="flex items-center justify-between mb-6 pb-3 border-b border-[rgb(var(--border))]">
      <div className="flex-1">
        {hasPrev ? (
          <Link
            href={`/genesis/${currentChapter - 1}`}
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors text-base"
          >
            ← {currentChapter - 1}
          </Link>
        ) : (
          <span className="text-[rgb(var(--text-tertiary))] text-base">← {currentChapter - 1}</span>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center gap-3">
        <span className="text-[rgb(var(--text-secondary))] text-base font-light">Genesis {currentChapter}</span>
        <button
          onClick={handleBookmark}
          className="px-3 py-1 text-xs bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border))] rounded transition-colors"
        >
          {showSaved ? '✓ Saved' : isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>

      <div className="flex-1 flex justify-end">
        {hasNext ? (
          <Link
            href={`/genesis/${currentChapter + 1}`}
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors text-base"
          >
            {currentChapter + 1} →
          </Link>
        ) : (
          <span className="text-[rgb(var(--text-tertiary))] text-base">{currentChapter + 1} →</span>
        )}
      </div>
    </nav>
  );
}
