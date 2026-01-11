'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { BookDivision } from '@/lib/types';
import { getNextDivision, getPreviousDivision } from '@/lib/book-metadata-utils';

interface Props {
  bookSlug: string;                // e.g., "genesis", "exodus"
  bookName: string;                // e.g., "Genesis", "Exodus"
  bookAbbreviation: string;        // e.g., "Gen", "Exod"
  currentChapter: number;
  division: BookDivision;
  onCopyChapter: () => void;
  copied: boolean;
  chapterSummary?: string;
}

export default function ChapterNav({
  bookSlug,
  bookName,
  bookAbbreviation,
  currentChapter,
  division,
  onCopyChapter,
  copied,
  chapterSummary
}: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [jumpTo, setJumpTo] = useState('');

  const chapterIndex = division.chapters.indexOf(currentChapter);
  const divisionChapterNum = chapterIndex + 1; // 1-indexed position within division

  // Current division navigation
  const hasPrevInDivision = chapterIndex > 0;
  const hasNextInDivision = chapterIndex < division.chapters.length - 1;
  const prevChapterInDivision = hasPrevInDivision ? division.chapters[chapterIndex - 1] : null;
  const nextChapterInDivision = hasNextInDivision ? division.chapters[chapterIndex + 1] : null;

  // Cross-division navigation
  const nextDivision = !hasNextInDivision ? getNextDivision(bookSlug, division.id) : null;
  const prevDivision = !hasPrevInDivision ? getPreviousDivision(bookSlug, division.id) : null;

  // Final navigation targets
  const prevChapter = prevChapterInDivision || (prevDivision ? prevDivision.chapters[prevDivision.chapters.length - 1] : null);
  const nextChapter = nextChapterInDivision || (nextDivision ? nextDivision.chapters[0] : null);
  const prevDivisionId = hasPrevInDivision ? division.id : prevDivision?.id;
  const nextDivisionId = hasNextInDivision ? division.id : nextDivision?.id;
  const prevDivisionChapterNum = hasPrevInDivision ? chapterIndex : (prevDivision ? prevDivision.chapters.length : null);
  const nextDivisionChapterNum = hasNextInDivision ? chapterIndex + 2 : (nextDivision ? 1 : null);

  // Division display name (without "The Book of" or similar prefixes)
  const divisionDisplayName = division.title.replace('The Book of ', '').replace(/^The /, '');

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
    if (!isNaN(num) && num >= 1 && num <= division.chapters.length) {
      const targetChapter = division.chapters[num - 1];
      window.location.href = `/${bookSlug}/${division.id}/${targetChapter}`;
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
          className="absolute right-0 top-1/2 -translate-y-1/2 text-base text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors cursor-pointer"
          title="Copy chapter"
        >
          {copied ? '✓' : '⧉'}
        </button>

        {/* Canonical reference - left corner */}
        <span className="absolute left-0 top-0 text-xs text-blue-400 opacity-70">
          {bookAbbreviation} {currentChapter}
        </span>

        {isEditing ? (
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-2">
            <span className="text-[#D4AF37] text-3xl font-semibold tracking-wide">{divisionDisplayName}</span>
            <input
              type="number"
              value={jumpTo}
              onChange={(e) => setJumpTo(e.target.value)}
              onKeyDown={handleJumpKeyDown}
              onBlur={() => setIsEditing(false)}
              autoFocus
              min={1}
              max={division.chapters.length}
              className="w-16 px-2 py-1 text-2xl font-semibold text-center bg-[rgb(var(--bg-secondary))] text-[#D4AF37] border border-[rgb(var(--border))] rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              placeholder={divisionChapterNum.toString()}
            />
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <span
              onDoubleClick={handleDoubleClick}
              className="text-[#D4AF37] text-3xl font-semibold tracking-wide cursor-pointer select-none"
              title="Double-click to jump to chapter"
            >
              {divisionDisplayName} {divisionChapterNum}
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
          {division.chapters.map((chapterNum, idx) => {
            const isActive = chapterNum === currentChapter;
            return (
              <Link
                key={chapterNum}
                href={`/${bookSlug}/${division.id}/${chapterNum}`}
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

        {/* Bookmark Icon - below canonical reference */}
        <button
          onClick={handleBookmark}
          className="absolute left-0 top-5 p-2 text-[rgb(var(--text-secondary))] hover:text-[#D4AF37] transition-colors"
          title={showSaved ? 'Saved!' : isBookmarked ? 'Bookmarked' : 'Bookmark this chapter'}
        >
          {showSaved ? '✓' : isBookmarked ? '★' : '☆'}
        </button>
      </nav>

      {/* Fixed left navigation */}
      {prevChapter && prevDivisionId && prevDivisionChapterNum !== null ? (
        <Link
          href={`/${bookSlug}/${prevDivisionId}/${prevChapter}`}
          className="fixed left-0 top-80 bottom-0 w-24 md:w-32 flex items-center justify-start pl-2 md:pl-4 group cursor-pointer"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))] transition-colors text-lg md:text-2xl">
            ← <span className="hidden md:inline">{prevDivisionChapterNum}</span>
          </div>
        </Link>
      ) : (
        <div className="fixed left-0 top-80 bottom-0 w-24 md:w-32 flex items-center justify-start pl-2 md:pl-4 group">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[rgb(var(--text-tertiary))] text-lg md:text-2xl opacity-30">←</span>
          </div>
        </div>
      )}

      {/* Fixed right navigation */}
      {nextChapter && nextDivisionId && nextDivisionChapterNum !== null ? (
        <Link
          href={`/${bookSlug}/${nextDivisionId}/${nextChapter}`}
          className="fixed right-0 top-80 bottom-0 w-24 md:w-32 flex items-center justify-end pr-2 md:pr-4 group cursor-pointer"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))] transition-colors text-lg md:text-2xl">
            <span className="hidden md:inline">{nextDivisionChapterNum}</span> →
          </div>
        </Link>
      ) : (
        <div className="fixed right-0 top-80 bottom-0 w-24 md:w-32 flex items-center justify-end pr-2 md:pr-4 group">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[rgb(var(--text-tertiary))] text-lg md:text-2xl opacity-30">→</span>
          </div>
        </div>
      )}
    </>
  );
}
