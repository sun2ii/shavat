'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { BookDivision } from '@/lib/types';
import { getAllDivisions, getNextDivision, getPreviousDivision } from '@/lib/book-metadata-utils';
import { hasWriting, getWriting } from '@/lib/hasWritings';
import { hasBookWriting } from '@/lib/writings/bookWritings';
import { readingPath, writingPath } from '@/lib/routes';
import BookMap from './BookMap';

interface Props {
  bookSlug: string;
  bookName: string;
  bookAbbreviation: string;
  currentChapter: number;
  division: BookDivision;
  chapterSummary?: string;
}

function DivisionMap({ divisions, bookSlug, currentDivisionId, currentChapter }: {
  divisions: BookDivision[];
  bookSlug: string;
  currentDivisionId: string;
  currentChapter: number;
}) {
  const [open, setOpen] = useState(false);
  const currentDivision = divisions.find(d => d.id === currentDivisionId);
  const divisionName = currentDivision?.title.replace('The Book of ', '').replace(/^The /, '') || '';

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="font-sans text-[13px] font-semibold text-blue-ref bg-[rgb(var(--blue-ref)/0.12)] px-2.5 py-1 rounded-full cursor-pointer"
      >
        {divisionName}
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
          <div className="w-72 max-h-96 overflow-y-auto bg-surface border border-hairline rounded-xl shadow-xl p-4 space-y-3 text-left">
            {divisions.map((div) => {
              const isCurrentDivision = div.id === currentDivisionId;
              const title = div.title
                .replace('The Book of ', '')
                .replace(/^The /, '');
              return (
                <div key={div.id}>
                  <Link
                    href={writingPath(bookSlug, div.id)}
                    onClick={() => setOpen(false)}
                    className={`block font-sans text-[10px] tracking-[0.16em] uppercase font-bold mb-1 transition-colors ${
                      isCurrentDivision ? 'text-gold-ink hover:text-gold' : 'text-faint hover:text-ink'
                    }`}
                  >
                    {title}
                  </Link>
                  <div className="flex flex-wrap gap-x-2.5 gap-y-1 font-serif text-[15px] leading-none">
                    {div.chapters.map((chapter) => {
                      const isCurrent = isCurrentDivision && chapter === currentChapter;
                      return (
                        <Link
                          key={chapter}
                          href={readingPath(bookSlug, div.id, chapter)}
                          onClick={() => setOpen(false)}
                          className={
                            isCurrent
                              ? 'text-gold font-bold'
                              : 'text-muted hover:text-ink transition-colors'
                          }
                        >
                          {chapter}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
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

  const chapterIndex = division.chapters.indexOf(currentChapter);

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
      router.prefetch(readingPath(bookSlug, prevDivisionId, prevChapter));
    }
    if (nextChapter && nextDivisionId) {
      router.prefetch(readingPath(bookSlug, nextDivisionId, nextChapter));
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
        router.push(readingPath(bookSlug, prevDivisionId, prevChapter));
      } else if (e.key === 'ArrowRight' && nextChapter && nextDivisionId && nextDivisionChapterNum !== null) {
        router.push(readingPath(bookSlug, nextDivisionId, nextChapter));
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

  return (
    <>
      <nav className="relative flex flex-col items-center justify-center mb-8 pb-5 border-b border-hairline">
        {/* Left: canonical reference + bookmark */}
        <div className="absolute left-0 top-0 flex flex-col items-start gap-2.5">
          <BookMap
            label={`${bookAbbreviation} ${currentChapter}`}
            divisions={getAllDivisions(bookSlug)}
            basePath={readingPath(bookSlug)}
            currentChapter={currentChapter}
            currentDivisionId={division.id}
          />
          <button
            onClick={handleBookmark}
            className="text-lg text-faint hover:text-gold transition-colors leading-none"
            title={showSaved ? 'Saved!' : isBookmarked ? 'Bookmarked' : 'Bookmark this chapter'}
          >
            {showSaved ? '✓' : isBookmarked ? '★' : '☆'}
          </button>
        </div>

        {/* The book's name is the way up to its overview, when one is recorded. */}
        {hasBookWriting(bookSlug) ? (
          <Link
            href={writingPath(bookSlug)}
            title={`${bookName} overview`}
            className="font-sans text-xs tracking-[0.24em] uppercase text-muted hover:text-ink font-semibold transition-colors"
          >
            {bookName}
          </Link>
        ) : (
          <p className="font-sans text-xs tracking-[0.24em] uppercase text-muted font-semibold">
            {bookName}
          </p>
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

        {/* Division selector with hover map */}
        <div className="mt-5 flex flex-col items-center gap-3">
          <DivisionMap
            divisions={getAllDivisions(bookSlug)}
            bookSlug={bookSlug}
            currentDivisionId={division.id}
            currentChapter={currentChapter}
          />

          {/* Current division chapters */}
          <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 font-serif text-[15px] leading-none">
            {division.chapters.map((ch) => {
              const isActive = ch === currentChapter;
              return (
                <Link
                  key={ch}
                  href={readingPath(bookSlug, division.id, ch)}
                  className={`transition-colors ${
                    isActive ? `${titleColor} font-bold` : 'text-faint hover:text-ink'
                  }`}
                >
                  {ch}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
