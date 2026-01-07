'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';

interface Props {
  currentChapter: number;
  totalChapters: number;
  bookName?: string;
  bookRoute?: string;
}

export default function ChapterNav({
  currentChapter,
  totalChapters,
  bookName = 'Genesis',
  bookRoute = 'genesis',
}: Props) {
  const hasPrev = currentChapter > 1;
  const hasNext = currentChapter < totalChapters;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [jumpTo, setJumpTo] = useState('');

  // Check if current chapter is bookmarked
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const bookmark = storage.getBookmark();
    setIsBookmarked(bookmark?.chapter === currentChapter && bookmark?.book === bookName);
  }, [currentChapter, bookName]);

  const handleBookmark = () => {
    if (typeof window === 'undefined') return;

    try {
      storage.setBookmark({
        book: bookName,
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

  const handleDoubleClick = () => {
    setIsEditing(true);
    setJumpTo('');
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpTo);
    if (!isNaN(num) && num >= 1 && num <= totalChapters) {
      window.location.href = `/${bookRoute}/${num}`;
    }
    setIsEditing(false);
  };

  const handleJumpKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <>
      {/* Top header with chapter title and bookmark */}
      <nav className="relative flex items-center justify-center mb-6 pb-3 border-b border-[rgb(var(--border))]">
        {isEditing ? (
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-2">
            <span className="text-[#D4AF37] text-3xl font-semibold tracking-wide">{bookName}</span>
            <input
              type="number"
              value={jumpTo}
              onChange={(e) => setJumpTo(e.target.value)}
              onKeyDown={handleJumpKeyDown}
              onBlur={() => setIsEditing(false)}
              autoFocus
              min={1}
              max={totalChapters}
              className="w-20 px-2 py-1 text-2xl font-semibold text-center bg-[rgb(var(--bg-secondary))] text-[#D4AF37] border border-[rgb(var(--border))] rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              placeholder={currentChapter.toString()}
            />
          </form>
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className="text-[#D4AF37] text-3xl font-semibold tracking-wide cursor-pointer select-none"
            title="Double-click to jump to chapter"
          >
            {bookName} {currentChapter}
          </span>
        )}

        {/* Bookmark Icon */}
        <button
          onClick={handleBookmark}
          className="absolute right-0 p-2 text-[rgb(var(--text-secondary))] hover:text-[#D4AF37] transition-colors"
          title={showSaved ? 'Saved!' : isBookmarked ? 'Bookmarked' : 'Bookmark this chapter'}
        >
          {showSaved ? '✓' : isBookmarked ? '★' : '☆'}
        </button>
      </nav>

      {/* Fixed left navigation */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2">
        {hasPrev ? (
          <Link
            href={`/${bookRoute}/${currentChapter - 1}`}
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
            href={`/${bookRoute}/${currentChapter + 1}`}
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
