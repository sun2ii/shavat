'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

export default function Header() {
  const [bookmark, setBookmark] = useState<{ book: string; chapter: number } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedBookmark = storage.getBookmark();
      if (savedBookmark) {
        setBookmark({ book: savedBookmark.book, chapter: savedBookmark.chapter });
      }
    } catch (error) {
      console.error('Failed to load bookmark', error);
    }
  }, []);

  return (
    <header className="mb-6 pb-3 border-b border-[rgb(var(--border))]">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg font-light text-[rgb(var(--text-primary))] tracking-wide">
          Shavat
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
            Library
          </Link>
          {bookmark && (
            <Link
              href={`/${bookmark.book.toLowerCase()}/${bookmark.chapter}`}
              className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
            >
              Bookmark
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
