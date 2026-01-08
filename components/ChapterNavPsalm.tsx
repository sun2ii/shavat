'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { PsalmsCollection } from '@/lib/types';

interface Props {
  currentPsalm: number;
  collection: PsalmsCollection;
}

export default function ChapterNavPsalm({ currentPsalm, collection }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [jumpTo, setJumpTo] = useState('');

  const psalmIndex = collection.psalms.indexOf(currentPsalm);
  const collectionPosition = psalmIndex + 1; // 1-indexed position within collection
  const hasPrev = psalmIndex > 0;
  const hasNext = psalmIndex < collection.psalms.length - 1;
  const prevPsalm = hasPrev ? collection.psalms[psalmIndex - 1] : null;
  const nextPsalm = hasNext ? collection.psalms[psalmIndex + 1] : null;
  const prevCollectionPosition = hasPrev ? psalmIndex : null;
  const nextCollectionPosition = hasNext ? psalmIndex + 2 : null;

  // Collection display name (without "Psalms of")
  const collectionDisplayName = collection.title.replace('Psalms of ', '');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const bookmark = storage.getBookmark();
    setIsBookmarked(bookmark?.chapter === currentPsalm && bookmark?.book === 'Psalms');
  }, [currentPsalm]);

  const handleBookmark = () => {
    if (typeof window === 'undefined') return;

    try {
      storage.setBookmark({
        book: 'Psalms',
        chapter: currentPsalm,
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
    if (!isNaN(num) && num >= 1 && num <= collection.psalms.length) {
      const targetPsalm = collection.psalms[num - 1];
      window.location.href = `/psalms/${collection.id}/${targetPsalm}`;
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
      {/* Back to library link */}
      <div className="mb-4">
        <Link
          href="/"
          className="text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          ← Library
        </Link>
      </div>

      {/* Chapter nav header */}
      <nav className="relative flex items-center justify-center mb-6 pb-3 border-b border-[rgb(var(--border))]">
        {/* Canonical reference - left corner */}
        <span className="absolute left-0 text-xs text-[rgb(var(--text-secondary))] opacity-50">
          Ps {currentPsalm}
        </span>

        {isEditing ? (
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-2">
            <span className="text-[#D4AF37] text-3xl font-semibold tracking-wide">{collectionDisplayName}</span>
            <input
              type="number"
              value={jumpTo}
              onChange={(e) => setJumpTo(e.target.value)}
              onKeyDown={handleJumpKeyDown}
              onBlur={() => setIsEditing(false)}
              autoFocus
              min={1}
              max={collection.psalms.length}
              className="w-16 px-2 py-1 text-2xl font-semibold text-center bg-[rgb(var(--bg-secondary))] text-[#D4AF37] border border-[rgb(var(--border))] rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              placeholder={collectionPosition.toString()}
            />
          </form>
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className="text-[#D4AF37] text-3xl font-semibold tracking-wide cursor-pointer select-none"
            title="Double-click to jump to psalm"
          >
            {collectionDisplayName} {collectionPosition}
          </span>
        )}

        {/* Bookmark Icon - right corner */}
        <button
          onClick={handleBookmark}
          className="absolute right-0 p-2 text-[rgb(var(--text-secondary))] hover:text-[#D4AF37] transition-colors"
          title={showSaved ? 'Saved!' : isBookmarked ? 'Bookmarked' : 'Bookmark this psalm'}
        >
          {showSaved ? '✓' : isBookmarked ? '★' : '☆'}
        </button>
      </nav>

      {/* Fixed left navigation */}
      <div className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2">
        {hasPrev && prevPsalm && prevCollectionPosition ? (
          <Link
            href={`/psalms/${collection.id}/${prevPsalm}`}
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors text-lg md:text-2xl"
          >
            ← <span className="hidden md:inline">{prevCollectionPosition}</span>
          </Link>
        ) : (
          <span className="text-[rgb(var(--text-tertiary))] text-lg md:text-2xl opacity-30">←</span>
        )}
      </div>

      {/* Fixed right navigation */}
      <div className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2">
        {hasNext && nextPsalm && nextCollectionPosition ? (
          <Link
            href={`/psalms/${collection.id}/${nextPsalm}`}
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors text-lg md:text-2xl"
          >
            <span className="hidden md:inline">{nextCollectionPosition}</span> →
          </Link>
        ) : (
          <span className="text-[rgb(var(--text-tertiary))] text-lg md:text-2xl opacity-30">→</span>
        )}
      </div>
    </>
  );
}
