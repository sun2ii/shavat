'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { getHighlightColor } from '@/lib/highlight-colors';
import type { Bookmark, Highlight } from '@/lib/types';
import { bookName } from '@/lib/book-helpers';
import { BIBLE_INDEX } from '@/lib/bible-index';
import { getAllTopLevelCategories, getTopLevelCategoryForBook } from '@/lib/top-level-categories';
import { readingPath } from '@/lib/routes';
import { useBookmarks } from '@/components/providers/BookmarkProvider';
import { useHighlights } from '@/components/providers/HighlightProvider';
import PageHeader from '@/components/PageHeader';

interface DbBookmark {
  book: string;
  chapter: number;
  verse: number | null;
  created_at: string;
}

// The minimum either source (DB or localStorage) provides.
type AnyBookmark = { book: string; chapter: number; verse?: number | null };

interface Props {
  isAuthenticated?: boolean;
  serverBookmarks?: DbBookmark[];
}

export default function SavedContent({ isAuthenticated = false, serverBookmarks = [] }: Props) {
  // Highlights come from the provider: account-backed when signed in,
  // this device's localStorage when not.
  const { highlights, removeHighlight } = useHighlights();
  const [localBookmark, setLocalBookmark] = useState<Bookmark | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocalBookmark(storage.getBookmark());
    }
    setLoaded(true);
  }, [isAuthenticated]);

  const handleDelete = (id: string) => {
    void removeHighlight(id);
  };

  const { toggleBookmark, isBookmarked: isChapterBookmarked } = useBookmarks();

  const handleDeleteBookmark = async (book: string, chapter: number) => {
    if (!isAuthenticated) return;
    await toggleBookmark(book, chapter);
  };

  // Group highlights by book, then chapter, newest books last edited first.
  // Deduplicate: only keep one highlight per book+chapter+verseStart (keep newest)
  const deduped = highlights.reduce((acc, h) => {
    const key = `${h.book}:${h.chapter}:${h.verseStart}`;
    const existing = acc.get(key);
    if (!existing || h.createdAt > existing.createdAt) {
      acc.set(key, h);
    }
    return acc;
  }, new Map<string, Highlight>());
  const uniqueHighlights = Array.from(deduped.values());

  const byBookChapter = uniqueHighlights.reduce((acc, h) => {
    const book = h.book || 'genesis';
    (acc[book] ??= {})[h.chapter] ??= [];
    acc[book][h.chapter].push(h);
    return acc;
  }, {} as Record<string, Record<number, Highlight[]>>);

  // Use server bookmarks for authenticated (filtered by context for optimistic deletes), localStorage for unauthenticated
  const bookmarks: AnyBookmark[] = isAuthenticated
    ? serverBookmarks.filter(bm => isChapterBookmarked(bm.book, bm.chapter))
    : (localBookmark ? [localBookmark] : []);
  const isEmpty = uniqueHighlights.length === 0 && bookmarks.length === 0;

  // Bookmarks grouped the way the library is: category → book → chapters,
  // all in canonical order. One dense row per book, one chip per chapter.
  const groupedBookmarks = useMemo(() => {
    const byBook = new Map<string, AnyBookmark[]>();
    for (const bm of bookmarks) {
      if (!byBook.has(bm.book)) byBook.set(bm.book, []);
      byBook.get(bm.book)!.push(bm);
    }
    return getAllTopLevelCategories()
      .map((cat) => ({
        cat,
        books: BIBLE_INDEX
          .filter((b) => byBook.has(b.slug) && getTopLevelCategoryForBook(b.category, b.testament) === cat.id)
          .map((b) => ({
            book: b,
            items: byBook.get(b.slug)!.slice().sort((x, y) => x.chapter - y.chapter),
          })),
      }))
      .filter((g) => g.books.length > 0);
  }, [bookmarks]);

  return (
    // No top padding on the container: PageHeader owns the top spacing so
    // all tabs sit at exactly the same height.
    <main className="mx-auto max-w-5xl px-4 sm:px-6 pb-8">
      <PageHeader
        kicker="Your hand in the text"
        title="Saved"
        subtitle={
          uniqueHighlights.length > 0
            ? `${uniqueHighlights.length} ${uniqueHighlights.length === 1 ? 'highlight' : 'highlights'}${bookmarks.length > 0 ? ` · ${bookmarks.length} ${bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}` : ''}`
            : bookmarks.length > 0
            ? `${bookmarks.length} ${bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}`
            : 'Highlights and bookmarks from your reading.'
        }
      />

      {/* Bookmarks section */}
      {bookmarks.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold">
            {isAuthenticated ? 'Bookmarks' : 'Reading position'}
          </h2>
          <div className="space-y-4">
            {groupedBookmarks.map(({ cat, books }) => (
              <div key={cat.id}>
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  {cat.name}
                </div>
                <div className="divide-y divide-hairline border-y border-hairline">
                  {books.map(({ book, items }) => (
                    <div key={book.slug} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-1.5">
                      <span className="w-28 shrink-0 font-serif text-sm font-bold text-ink">
                        {book.name}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {items.map((bm) => (
                          <span
                            key={bm.chapter}
                            className="inline-flex items-center rounded border border-hairline bg-surface font-sans text-[11px]"
                          >
                            <Link
                              href={readingPath(bm.book, bm.chapter)}
                              className="px-2 py-0.5 text-ink hover:text-gold transition-colors"
                            >
                              {bm.chapter}
                              {bm.verse && bm.verse > 1 ? `:${bm.verse}` : ''}
                            </Link>
                            {isAuthenticated && (
                              <button
                                onClick={() => handleDeleteBookmark(bm.book, bm.chapter)}
                                aria-label={`Remove bookmark ${book.name} ${bm.chapter}`}
                                className="pr-1.5 text-faint hover:text-red-500 transition-colors"
                              >
                                ×
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Highlights: same dense treatment as bookmarks. One row per
          highlight under its book, in chapter and verse order. */}
      {uniqueHighlights.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold">
            Highlights
          </h2>
          <div className="space-y-4">
            {Object.entries(byBookChapter).map(([book, chapters]) => {
              const rows = Object.keys(chapters)
                .map(Number)
                .sort((a, b) => a - b)
                .flatMap((ch) => chapters[ch].slice().sort((a, b) => a.verseStart - b.verseStart));
              return (
                <div key={book}>
                  <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    {bookName(book)}
                  </div>
                  <div className="divide-y divide-hairline border-y border-hairline">
                    {rows.map((h) => {
                      const color = getHighlightColor(h.color);
                      const ref =
                        h.verseStart === h.verseEnd
                          ? `${h.chapter}:${h.verseStart}`
                          : `${h.chapter}:${h.verseStart}–${h.verseEnd}`;
                      return (
                        <div key={h.id} className="flex items-baseline gap-3 py-1.5">
                          <span className="h-3 w-1 shrink-0 self-center rounded" style={{ background: color.swatch }} />
                          <Link
                            href={readingPath(book, h.chapter) + `#v${h.verseStart}`}
                            className="w-16 shrink-0 font-sans text-[11px] font-semibold tabular-nums transition-opacity hover:opacity-80"
                            style={{ color: color.label }}
                            title={`${color.name} · ${bookName(book)} ${ref}`}
                          >
                            {ref}
                          </Link>
                          <span
                            className={`min-w-0 flex-1 truncate font-serif text-sm ${h.note?.startsWith('[v]') ? '' : 'italic'}`}
                            style={{ color: h.note?.startsWith('[v]') ? 'rgb(var(--text-tertiary))' : color.label }}
                          >
                            {h.note?.startsWith('[v]') ? h.note.slice(3) : (h.note ?? '')}
                          </span>
                          <span className="shrink-0 font-sans text-[10px] text-faint tabular-nums">
                            {new Date(h.createdAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => handleDelete(h.id)}
                            aria-label={`Delete highlight ${bookName(book)} ${ref}`}
                            className="shrink-0 px-1 text-faint hover:text-red-500 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {loaded && !isEmpty && !isAuthenticated && (
        <p className="mt-12 border-t border-hairline pt-4 font-sans text-xs text-faint">
          Saved on this device for now — sign in to sync across devices.
        </p>
      )}
    </main>
  );
}
