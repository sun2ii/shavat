'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { BookDivision } from '@/lib/types';
import { getNextDivision, getPreviousDivision } from '@/lib/book-metadata-utils';
import { hasWriting, getWriting } from '@/lib/hasWritings';

interface Props {
  bookSlug: string;
  bookName: string;
  bookAbbreviation: string;
  currentChapter: number;
  division: BookDivision;
  chapterSummary?: string;
}

export default function ChapterNav({
  bookSlug,
  bookName,
  bookAbbreviation,
  currentChapter,
  division,
  chapterSummary,
}: Props) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [jumpTo, setJumpTo] = useState('');

  const chapterIndex = division.chapters.indexOf(currentChapter);
  const divisionChapterNum = chapterIndex + 1;

  const isInstructional = division.contentType === 'instructional';
  // Instructional passages read in a warm orange; everything else in gold.
  const titleColor = isInstructional ? 'text-orange-500' : 'text-gold';

  const hasPrevInDivision = chapterIndex > 0;
  const hasNextInDivision = chapterIndex < division.chapters.length - 1;
  const prevChapterInDivision = hasPrevInDivision ? division.chapters[chapterIndex - 1] : null;
  const nextChapterInDivision = hasNextInDivision ? division.chapters[chapterIndex + 1] : null;

  const nextDivision = !hasNextInDivision ? getNextDivision(bookSlug, division.id) : null;
  const prevDivision = !hasPrevInDivision ? getPreviousDivision(bookSlug, division.id) : null;

  const prevChapter = prevChapterInDivision || (prevDivision ? prevDivision.chapters[prevDivision.chapters.length - 1] : null);
  const nextChapter = nextChapterInDivision || (nextDivision ? nextDivision.chapters[0] : null);
  const prevDivisionId = hasPrevInDivision ? division.id : prevDivision?.id;
  const nextDivisionId = hasNextInDivision ? division.id : nextDivision?.id;
  const prevDivisionChapterNum = hasPrevInDivision ? chapterIndex : (prevDivision ? prevDivision.chapters.length : null);
  const nextDivisionChapterNum = hasNextInDivision ? chapterIndex + 2 : (nextDivision ? 1 : null);

  const divisionDisplayName = division.title.replace('The Book of ', '').replace(/^The /, '');

  const writingExists = hasWriting(bookSlug, currentChapter);
  const writing = writingExists ? getWriting(bookSlug, currentChapter) : null;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const bookmark = storage.getBookmark();
    setIsBookmarked(bookmark?.chapter === currentChapter && bookmark?.book === bookName);
  }, [currentChapter, bookName]);

  // Prefetch adjacent chapters for instant navigation
  useEffect(() => {
    if (prevChapter && prevDivisionId) {
      router.prefetch(`/${bookSlug}/${prevDivisionId}/${prevChapter}`);
    }
    if (nextChapter && nextDivisionId) {
      router.prefetch(`/${bookSlug}/${nextDivisionId}/${nextChapter}`);
    }
  }, [router, bookSlug, prevChapter, nextChapter, prevDivisionId, nextDivisionId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Home navigation
      if (e.key === 'h') {
        router.push('/');
        return;
      }

      // Chapter navigation
      if (e.key === 'ArrowLeft' && prevChapter && prevDivisionId && prevDivisionChapterNum !== null) {
        router.push(`/${bookSlug}/${prevDivisionId}/${prevChapter}`);
      } else if (e.key === 'ArrowRight' && nextChapter && nextDivisionId && nextDivisionChapterNum !== null) {
        router.push(`/${bookSlug}/${nextDivisionId}/${nextChapter}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, bookSlug, prevChapter, nextChapter, prevDivisionId, nextDivisionId, prevDivisionChapterNum, nextDivisionChapterNum]);

  const handleBookmark = () => {
    if (typeof window === 'undefined') return;
    try {
      storage.setBookmark({ book: bookName, chapter: currentChapter, verse: 1 });
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
      window.location.href = `/${bookSlug}/${division.id}/${division.chapters[num - 1]}`;
    }
    setIsEditing(false);
  };

  const handleJumpKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsEditing(false);
  };

  return (
    <>
      <nav className="relative flex flex-col items-center justify-center mb-8 pb-5 border-b border-hairline">
        {/* Left: canonical reference + bookmark */}
        <div className="absolute left-0 top-0 flex flex-col items-start gap-2.5">
          <span className="font-sans text-[13px] font-semibold text-blue-ref bg-[rgb(var(--blue-ref)/0.12)] px-2.5 py-1 rounded-full">
            {bookAbbreviation} {currentChapter}
          </span>
          <button
            onClick={handleBookmark}
            className="text-lg text-faint hover:text-gold transition-colors leading-none"
            title={showSaved ? 'Saved!' : isBookmarked ? 'Bookmarked' : 'Bookmark this chapter'}
          >
            {showSaved ? '✓' : isBookmarked ? '★' : '☆'}
          </button>
        </div>

        <p className="font-sans text-xs tracking-[0.24em] uppercase text-muted font-semibold">
          {bookName}
        </p>

        {isEditing ? (
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-2 mt-2">
            <span className={`font-serif ${titleColor} text-5xl font-bold`}>{divisionDisplayName}</span>
            <input
              type="number"
              value={jumpTo}
              onChange={(e) => setJumpTo(e.target.value)}
              onKeyDown={handleJumpKeyDown}
              onBlur={() => setIsEditing(false)}
              autoFocus
              min={1}
              max={division.chapters.length}
              className={`w-20 px-2 py-1 text-4xl font-serif font-bold text-center bg-paper-2 ${titleColor} border border-hairline rounded focus:outline-none focus:ring-2 focus:ring-gold`}
              placeholder={divisionChapterNum.toString()}
            />
          </form>
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className={`font-serif ${titleColor} text-5xl font-bold cursor-pointer select-none mt-2`}
            title="Double-click to jump to chapter"
          >
            {divisionDisplayName} {divisionChapterNum}
          </span>
        )}

        {chapterSummary && (
          <p className="font-serif italic text-lg text-muted mt-2 max-w-2xl text-center">
            {chapterSummary}
          </p>
        )}

        {writing && (
          <Link
            href={writing.path}
            className="mt-3 inline-flex items-center gap-2 font-sans text-sm text-blue-ref hover:opacity-80 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Read Essay: {writing.title}</span>
          </Link>
        )}

        {/* Chapter pager */}
        <div className="flex gap-4 mt-4 font-serif text-lg">
          {division.chapters.map((chapterNum, idx) => {
            const isActive = chapterNum === currentChapter;
            return (
              <Link
                key={chapterNum}
                href={`/${bookSlug}/${division.id}/${chapterNum}`}
                className={`transition-colors ${
                  isActive ? `${titleColor} font-bold` : 'text-faint hover:text-ink'
                }`}
              >
                {idx + 1}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Fixed left navigation */}
      {prevChapter && prevDivisionId && prevDivisionChapterNum !== null ? (
        <Link
          href={`/${bookSlug}/${prevDivisionId}/${prevChapter}`}
          className="fixed left-0 top-80 bottom-0 w-12 md:w-20 flex items-center justify-start pl-2 md:pl-4 group cursor-pointer"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-muted group-hover:text-ink text-lg md:text-2xl">
            ← <span className="hidden md:inline">{prevDivisionChapterNum}</span>
          </div>
        </Link>
      ) : (
        <div className="fixed left-0 top-80 bottom-0 w-12 md:w-20" />
      )}

      {/* Fixed right navigation */}
      {nextChapter && nextDivisionId && nextDivisionChapterNum !== null ? (
        <Link
          href={`/${bookSlug}/${nextDivisionId}/${nextChapter}`}
          className="fixed right-0 top-80 bottom-0 w-12 md:w-20 flex items-center justify-end pr-2 md:pr-4 group cursor-pointer"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-muted group-hover:text-ink text-lg md:text-2xl">
            <span className="hidden md:inline">{nextDivisionChapterNum}</span> →
          </div>
        </Link>
      ) : (
        <div className="fixed right-0 top-80 bottom-0 w-12 md:w-20" />
      )}
    </>
  );
}
