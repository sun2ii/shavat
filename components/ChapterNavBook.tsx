'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { GenesisBook } from '@/lib/types';
import { getNextBook, getPreviousBook } from '@/lib/genesis-collections';

interface Props {
  currentChapter: number;
  book: GenesisBook;
  onCopyChapter: () => void;
  copied: boolean;
  chapterSummary?: string;
}

export default function ChapterNavBook({ currentChapter, book, onCopyChapter, copied, chapterSummary }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [jumpTo, setJumpTo] = useState('');

  const chapterIndex = book.chapters.indexOf(currentChapter);
  const bookChapterNum = chapterIndex + 1; // 1-indexed position within book

  // Current book navigation
  const hasPrevInBook = chapterIndex > 0;
  const hasNextInBook = chapterIndex < book.chapters.length - 1;
  const prevChapterInBook = hasPrevInBook ? book.chapters[chapterIndex - 1] : null;
  const nextChapterInBook = hasNextInBook ? book.chapters[chapterIndex + 1] : null;

  // Cross-book navigation
  const nextBook = !hasNextInBook ? getNextBook(book.id) : null;
  const prevBook = !hasPrevInBook ? getPreviousBook(book.id) : null;

  // Final navigation targets
  const prevChapter = prevChapterInBook || (prevBook ? prevBook.chapters[prevBook.chapters.length - 1] : null);
  const nextChapter = nextChapterInBook || (nextBook ? nextBook.chapters[0] : null);
  const prevBookId = hasPrevInBook ? book.id : prevBook?.id;
  const nextBookId = hasNextInBook ? book.id : nextBook?.id;
  const prevBookChapterNum = hasPrevInBook ? chapterIndex : (prevBook ? prevBook.chapters.length : null);
  const nextBookChapterNum = hasNextInBook ? chapterIndex + 2 : (nextBook ? 1 : null);

  // Book display name (without "The Book of")
  const bookDisplayName = book.title.replace('The Book of ', '');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const bookmark = storage.getBookmark();
    setIsBookmarked(bookmark?.chapter === currentChapter && bookmark?.book === 'Genesis');
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

  const handleDoubleClick = () => {
    setIsEditing(true);
    setJumpTo('');
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpTo);
    if (!isNaN(num) && num >= 1 && num <= book.chapters.length) {
      const targetChapter = book.chapters[num - 1];
      window.location.href = `/genesis/${book.id}/${targetChapter}`;
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
      {/* Chapter nav header */}
      <nav className="relative flex flex-col items-center justify-center mb-6 pb-3 border-b border-[rgb(var(--border))]">
        {/* Copy chapter icon - top right */}
        <button
          onClick={onCopyChapter}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-base text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
          title="Copy chapter"
        >
          {copied ? '✓' : '⧉'}
        </button>

        {/* Canonical reference - left corner */}
        <span className="absolute left-0 top-0 text-xs text-blue-400 opacity-70">
          Gen {currentChapter}
        </span>

        {isEditing ? (
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-2">
            <span className="text-[#D4AF37] text-3xl font-semibold tracking-wide">{bookDisplayName}</span>
            <input
              type="number"
              value={jumpTo}
              onChange={(e) => setJumpTo(e.target.value)}
              onKeyDown={handleJumpKeyDown}
              onBlur={() => setIsEditing(false)}
              autoFocus
              min={1}
              max={book.chapters.length}
              className="w-16 px-2 py-1 text-2xl font-semibold text-center bg-[rgb(var(--bg-secondary))] text-[#D4AF37] border border-[rgb(var(--border))] rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              placeholder={bookChapterNum.toString()}
            />
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <span
              onDoubleClick={handleDoubleClick}
              className="text-[#D4AF37] text-3xl font-semibold tracking-wide cursor-pointer select-none"
              title="Double-click to jump to chapter"
            >
              {bookDisplayName} {bookChapterNum}
            </span>
            {chapterSummary && (
              <p className="text-sm text-[rgb(var(--text-secondary))] mt-2 max-w-2xl text-center italic">
                {chapterSummary}
              </p>
            )}
          </div>
        )}

        {/* Chapter links */}
        <div className="flex gap-3 mt-3">
          {book.chapters.map((chapterNum, idx) => {
            const isActive = chapterNum === currentChapter;
            return (
              <Link
                key={chapterNum}
                href={`/genesis/${book.id}/${chapterNum}`}
                className={`text-sm transition-colors ${
                  isActive
                    ? 'text-[#D4AF37] font-semibold'
                    : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'
                }`}
              >
                {idx + 1}
              </Link>
            );
          })}
        </div>

        {/* Bookmark Icon - below Gen reference */}
        <button
          onClick={handleBookmark}
          className="absolute left-0 top-5 p-2 text-[rgb(var(--text-secondary))] hover:text-[#D4AF37] transition-colors"
          title={showSaved ? 'Saved!' : isBookmarked ? 'Bookmarked' : 'Bookmark this chapter'}
        >
          {showSaved ? '✓' : isBookmarked ? '★' : '☆'}
        </button>
      </nav>

      {/* Fixed left navigation */}
      <div className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2">
        {prevChapter && prevBookId && prevBookChapterNum !== null ? (
          <Link
            href={`/genesis/${prevBookId}/${prevChapter}`}
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors text-lg md:text-2xl"
          >
            ← <span className="hidden md:inline">{prevBookChapterNum}</span>
          </Link>
        ) : (
          <span className="text-[rgb(var(--text-tertiary))] text-lg md:text-2xl opacity-30">←</span>
        )}
      </div>

      {/* Fixed right navigation */}
      <div className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2">
        {nextChapter && nextBookId && nextBookChapterNum !== null ? (
          <Link
            href={`/genesis/${nextBookId}/${nextChapter}`}
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors text-lg md:text-2xl"
          >
            <span className="hidden md:inline">{nextBookChapterNum}</span> →
          </Link>
        ) : (
          <span className="text-[rgb(var(--text-tertiary))] text-lg md:text-2xl opacity-30">→</span>
        )}
      </div>
    </>
  );
}
