'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { GenesisBook } from '@/lib/types';
import { getAllBooks, getNextBook, getPreviousBook } from '@/lib/genesis-collections';
import BookMap from './BookMap';

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

  const chapterIndex = book.chapters.indexOf(currentChapter);

  const hasPrevInBook = chapterIndex > 0;
  const hasNextInBook = chapterIndex < book.chapters.length - 1;
  const prevChapterInBook = hasPrevInBook ? book.chapters[chapterIndex - 1] : null;
  const nextChapterInBook = hasNextInBook ? book.chapters[chapterIndex + 1] : null;

  const nextBook = !hasNextInBook ? getNextBook(book.id) : null;
  const prevBook = !hasPrevInBook ? getPreviousBook(book.id) : null;

  const prevChapter = prevChapterInBook || (prevBook ? prevBook.chapters[prevBook.chapters.length - 1] : null);
  const nextChapter = nextChapterInBook || (nextBook ? nextBook.chapters[0] : null);
  const prevBookId = hasPrevInBook ? book.id : prevBook?.id;
  const nextBookId = hasNextInBook ? book.id : nextBook?.id;
  const prevBookChapterNum = hasPrevInBook ? chapterIndex : (prevBook ? prevBook.chapters.length : null);
  const nextBookChapterNum = hasNextInBook ? chapterIndex + 2 : (nextBook ? 1 : null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const bookmark = storage.getBookmark();
    setIsBookmarked(bookmark?.chapter === currentChapter && bookmark?.book === 'Genesis');
  }, [currentChapter]);

  const handleBookmark = () => {
    if (typeof window === 'undefined') return;
    try {
      storage.setBookmark({ book: 'Genesis', chapter: currentChapter, verse: 1 });
      setIsBookmarked(true);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save bookmark', error);
    }
  };

  return (
    <>
      {/* Chapter nav header */}
      <nav className="relative flex flex-col items-center justify-center mb-8 pb-5 border-b border-hairline">
        {/* Left: canonical reference + bookmark */}
        <div className="absolute left-0 top-0 flex flex-col items-start gap-2.5">
          <BookMap
            label={`Gen ${currentChapter}`}
            divisions={getAllBooks()}
            basePath="/genesis"
            currentChapter={currentChapter}
            currentDivisionId={book.id}
          />
          <button
            onClick={handleBookmark}
            className="text-lg text-faint hover:text-gold transition-colors leading-none"
            title={showSaved ? 'Saved!' : isBookmarked ? 'Bookmarked' : 'Bookmark this chapter'}
          >
            {showSaved ? '✓' : isBookmarked ? '★' : '☆'}
          </button>
        </div>

        {/* Right: copy chapter */}
        <button
          onClick={onCopyChapter}
          className="absolute right-0 top-0 w-9 h-9 flex items-center justify-center rounded-lg border border-hairline text-muted hover:text-ink transition-colors"
          title="Copy chapter"
        >
          {copied ? '✓' : '⧉'}
        </button>

        <p className="font-sans text-xs tracking-[0.24em] uppercase text-muted font-semibold">
          Torah · Genesis
        </p>

        {chapterSummary && (
          <p className="font-serif italic text-lg text-muted mt-2 max-w-2xl text-center">
            {chapterSummary}
          </p>
        )}

        {/* Book terrain — all of Genesis's books with their chapters, readable in place */}
        <div className="flex flex-wrap justify-center items-start gap-x-8 gap-y-4 mt-5 max-w-3xl">
          {getAllBooks().map((b) => {
            const isCurrentBook = b.id === book.id;
            const bTitle = b.title
              .replace('The Book of ', '')
              .replace(/^The /, '');
            return (
              <div key={b.id} className="text-center">
                <div
                  className={`font-sans text-[10px] tracking-[0.16em] uppercase font-bold mb-1 ${
                    isCurrentBook ? 'text-gold-ink' : 'text-faint'
                  }`}
                >
                  {bTitle}
                </div>
                <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 font-serif text-[15px] leading-none">
                  {b.chapters.map((ch) => {
                    const isActive = isCurrentBook && ch === currentChapter;
                    return (
                      <Link
                        key={ch}
                        href={`/genesis/${b.id}/${ch}`}
                        className={`transition-colors ${
                          isActive ? 'text-gold font-bold' : 'text-faint hover:text-ink'
                        }`}
                      >
                        {ch}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Fixed left navigation */}
      {prevChapter && prevBookId && prevBookChapterNum !== null ? (
        <Link
          href={`/genesis/${prevBookId}/${prevChapter}`}
          className="fixed left-0 top-80 bottom-0 w-24 md:w-32 flex items-center justify-start pl-2 md:pl-4 group cursor-pointer"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-muted group-hover:text-ink text-lg md:text-2xl">
            ← <span className="hidden md:inline">{prevBookChapterNum}</span>
          </div>
        </Link>
      ) : (
        <div className="fixed left-0 top-80 bottom-0 w-24 md:w-32" />
      )}

      {/* Fixed right navigation */}
      {nextChapter && nextBookId && nextBookChapterNum !== null ? (
        <Link
          href={`/genesis/${nextBookId}/${nextChapter}`}
          className="fixed right-0 top-80 bottom-0 w-24 md:w-32 flex items-center justify-end pr-2 md:pr-4 group cursor-pointer"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-muted group-hover:text-ink text-lg md:text-2xl">
            <span className="hidden md:inline">{nextBookChapterNum}</span> →
          </div>
        </Link>
      ) : (
        <div className="fixed right-0 top-80 bottom-0 w-24 md:w-32" />
      )}
    </>
  );
}
