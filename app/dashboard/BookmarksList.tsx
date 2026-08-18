'use client';

import Link from 'next/link';
import { bookName } from '@/lib/book-helpers';
import { useBookmarks } from '@/components/providers/BookmarkProvider';

interface Props {
  bookmarks: { book: string; chapter: number; verse: number | null; created_at: string }[];
}

export default function BookmarksList({ bookmarks: initialBookmarks }: Props) {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  // Filter to only show bookmarks that are still in the context (handles optimistic deletes)
  const bookmarks = initialBookmarks.filter(bm => isBookmarked(bm.book, bm.chapter));

  const handleDelete = async (book: string, chapter: number) => {
    await toggleBookmark(book, chapter);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-4xl mb-4">
          <span className="text-gold">☆</span>
        </div>
        <h2 className="font-playfair text-xl font-semibold text-ink mb-2">
          No bookmarks yet
        </h2>
        <p className="font-sans text-sm text-muted max-w-sm">
          Bookmark chapters as you read to save your place and return to meaningful passages.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="font-sans text-xs text-muted mb-4">
        {bookmarks.length} {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
      </p>
      {bookmarks.map((bm, idx) => (
        <div
          key={`${bm.book}-${bm.chapter}-${idx}`}
          className="flex items-center justify-between gap-4 rounded-xl border border-hairline bg-surface p-4 transition-colors hover:bg-paper-2"
        >
          <Link href={`/${bm.book}/${bm.chapter}`} className="flex-1">
            <span className="block font-serif text-lg text-ink">
              {bookName(bm.book)} {bm.chapter}
            </span>
            {bm.verse && (
              <span className="mt-0.5 block font-sans text-xs text-faint">
                verse {bm.verse}
              </span>
            )}
            <span className="mt-1 block font-sans text-[10px] text-faint">
              {new Date(bm.created_at).toLocaleDateString()}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleDelete(bm.book, bm.chapter)}
              className="font-sans text-xs text-faint hover:text-red-500 transition-colors"
            >
              Remove
            </button>
            <Link
              href={`/${bm.book}/${bm.chapter}`}
              className="font-sans text-sm text-gold-ink whitespace-nowrap hover:text-gold transition-colors"
            >
              Read →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
