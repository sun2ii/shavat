'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

export default function Header() {
  const [bookmarkChapter, setBookmarkChapter] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const bookmark = storage.getBookmark();
      setBookmarkChapter(bookmark?.chapter || null);
    } catch (error) {
      console.error('Failed to load bookmark', error);
    }
  }, []);

  return (
    <header className="mb-6 pb-3 border-b border-[rgb(var(--border))]">
      <div className="flex items-center justify-between">
        <Link href="/genesis/1" className="text-lg font-light text-[rgb(var(--text-primary))] tracking-wide">
          Shavat
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/genesis/1" className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
            Read
          </Link>
          {bookmarkChapter && (
            <Link href={`/genesis/${bookmarkChapter}`} className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
              Bookmark ({bookmarkChapter})
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
