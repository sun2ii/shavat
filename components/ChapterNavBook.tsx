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
  const bookChapterNum = chapterIndex + 1;

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

  const bookDisplayName = book.title.replace('The Book of ', '');

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

  const handleDoubleClick = () => {
    setIsEditing(true);
    setJumpTo('');
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpTo);
    if (!isNaN(num) && num >= 1 && num <= book.chapters.length) {
      window.location.href = `/genesis/${book.id}/${book.chapters[num - 1]}`;
    }
    setIsEditing(false);
  };

  const handleJumpKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsEditing(false);
  };

  return (
    <>
      {/* Chapter nav header */}
      <nav className="relative flex flex-col items-center justify-center mb-8 pb-5 border-b border-hairline">
        {/* Left: canonical reference + bookmark */}
        <div className="absolute left-0 top-0 flex flex-col items-start gap-2.5">
          <span className="font-sans text-[13px] font-semibold text-blue-ref bg-[rgb(var(--blue-ref)/0.12)] px-2.5 py-1 rounded-full">
            Gen {currentChapter}
          </span>
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

        {isEditing ? (
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-2 mt-2">
            <span className="font-serif text-gold text-5xl font-bold">{bookDisplayName}</span>
            <input
              type="number"
              value={jumpTo}
              onChange={(e) => setJumpTo(e.target.value)}
              onKeyDown={handleJumpKeyDown}
              onBlur={() => setIsEditing(false)}
              autoFocus
              min={1}
              max={book.chapters.length}
              className="w-20 px-2 py-1 text-4xl font-serif font-bold text-center bg-paper-2 text-gold border border-hairline rounded focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder={bookChapterNum.toString()}
            />
          </form>
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className="font-serif text-gold text-5xl font-bold cursor-pointer select-none mt-2"
            title="Double-click to jump to chapter"
          >
            {bookDisplayName} {bookChapterNum}
          </span>
        )}

        {chapterSummary && (
          <p className="font-serif italic text-lg text-muted mt-2 max-w-2xl text-center">
            {chapterSummary}
          </p>
        )}

        {/* Chapter pager */}
        <div className="flex gap-4 mt-4 font-serif text-lg">
          {book.chapters.map((chapterNum, idx) => {
            const isActive = chapterNum === currentChapter;
            return (
              <Link
                key={chapterNum}
                href={`/genesis/${book.id}/${chapterNum}`}
                className={`transition-colors ${
                  isActive ? 'text-gold font-bold' : 'text-faint hover:text-ink'
                }`}
              >
                {idx + 1}
              </Link>
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
