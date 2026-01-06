'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

export default function Header() {
  const [bookmarkChapter, setBookmarkChapter] = useState<number | null>(null);

  useEffect(() => {
    const bookmark = storage.getBookmark();
    setBookmarkChapter(bookmark?.chapter || null);
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
          <Link href="/highlights" className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
            Highlights
          </Link>
        </nav>
      </div>
    </header>
  );
}
