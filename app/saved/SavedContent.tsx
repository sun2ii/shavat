'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { getHighlightColor } from '@/lib/highlight-colors';
import type { Bookmark, Highlight } from '@/lib/types';
import { bookName, isChristianReading, readingDisplayName, readingChapterPath } from '@/lib/book-helpers';
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

type TabType = 'bible' | 'readings';

interface Props {
  isAuthenticated?: boolean;
  serverBookmarks?: DbBookmark[];
}

// Reading categories for grouping Christian Readings
const READING_CATEGORIES = [
  { id: 'confessions', name: 'Confessions', prefix: 'confessions' },
  { id: 'imitation', name: 'Imitation of Christ', prefix: 'imitation' },
  { id: 'practice', name: 'Practice of the Presence of God', slugs: ['conversations', 'letters'] },
];

export default function SavedContent({ isAuthenticated = false, serverBookmarks = [] }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('bible');
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

  // Deduplicate highlights
  const deduped = highlights.reduce((acc, h) => {
    const key = `${h.book}:${h.chapter}:${h.verseStart}`;
    const existing = acc.get(key);
    if (!existing || h.createdAt > existing.createdAt) {
      acc.set(key, h);
    }
    return acc;
  }, new Map<string, Highlight>());
  const uniqueHighlights = Array.from(deduped.values());

  // Split highlights by type
  const bibleHighlights = uniqueHighlights.filter(h => !isChristianReading(h.book || ''));
  const readingsHighlights = uniqueHighlights.filter(h => isChristianReading(h.book || ''));

  // Group highlights by book and chapter
  const groupHighlights = (highlights: Highlight[]) => {
    return highlights.reduce((acc, h) => {
      const book = h.book || 'genesis';
      (acc[book] ??= {})[h.chapter] ??= [];
      acc[book][h.chapter].push(h);
      return acc;
    }, {} as Record<string, Record<number, Highlight[]>>);
  };

  const bibleByBookChapter = groupHighlights(bibleHighlights);
  const readingsByBookChapter = groupHighlights(readingsHighlights);

  // All bookmarks
  const bookmarks: AnyBookmark[] = isAuthenticated
    ? serverBookmarks.filter(bm => isChapterBookmarked(bm.book, bm.chapter))
    : (localBookmark ? [localBookmark] : []);

  // Split bookmarks by type
  const bibleBookmarks = bookmarks.filter(bm => !isChristianReading(bm.book));
  const readingsBookmarks = bookmarks.filter(bm => isChristianReading(bm.book));

  // Group Bible bookmarks by category
  const groupedBibleBookmarks = useMemo(() => {
    const byBook = new Map<string, AnyBookmark[]>();
    for (const bm of bibleBookmarks) {
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
  }, [bibleBookmarks]);

  // Group Christian Readings bookmarks by reading type
  const groupedReadingsBookmarks = useMemo(() => {
    const byBook = new Map<string, AnyBookmark[]>();
    for (const bm of readingsBookmarks) {
      if (!byBook.has(bm.book)) byBook.set(bm.book, []);
      byBook.get(bm.book)!.push(bm);
    }

    return READING_CATEGORIES
      .map((cat) => {
        const matchingBooks: { slug: string; name: string; items: AnyBookmark[] }[] = [];

        for (const [slug, items] of byBook.entries()) {
          let matches = false;
          if (cat.slugs) {
            matches = cat.slugs.includes(slug);
          } else if (cat.prefix) {
            matches = slug.startsWith(cat.prefix);
          }

          if (matches) {
            matchingBooks.push({
              slug,
              name: readingDisplayName(slug),
              items: items.slice().sort((x, y) => x.chapter - y.chapter),
            });
          }
        }

        return {
          cat,
          books: matchingBooks.sort((a, b) => a.slug.localeCompare(b.slug)),
        };
      })
      .filter((g) => g.books.length > 0);
  }, [readingsBookmarks]);

  // Counts for tabs
  const bibleCount = bibleHighlights.length + bibleBookmarks.length;
  const readingsCount = readingsHighlights.length + readingsBookmarks.length;
  const isEmpty = uniqueHighlights.length === 0 && bookmarks.length === 0;

  // Get link for highlight based on content type
  const getHighlightLink = (book: string, chapter: number, verseStart: number) => {
    if (isChristianReading(book)) {
      return readingChapterPath(book, chapter) + `#v${verseStart}`;
    }
    return readingPath(book, chapter) + `#v${verseStart}`;
  };

  // Get display name based on content type
  const getDisplayName = (book: string) => {
    if (isChristianReading(book)) {
      return readingDisplayName(book);
    }
    return bookName(book);
  };

  // Render highlights section
  const renderHighlights = (byBookChapter: Record<string, Record<number, Highlight[]>>, isReadings: boolean) => {
    const entries = Object.entries(byBookChapter);
    if (entries.length === 0) return null;

    return (
      <section className="mb-10">
        <h2 className="mb-3 font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold">
          Highlights
        </h2>
        <div className="space-y-4">
          {entries.map(([book, chapters]) => {
            const rows = Object.keys(chapters)
              .map(Number)
              .sort((a, b) => a - b)
              .flatMap((ch) => chapters[ch].slice().sort((a, b) => a.verseStart - b.verseStart));
            return (
              <div key={book}>
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  {getDisplayName(book)}
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
                          href={getHighlightLink(book, h.chapter, h.verseStart)}
                          className="w-16 shrink-0 font-sans text-[11px] font-semibold tabular-nums transition-opacity hover:opacity-80"
                          style={{ color: color.label }}
                          title={`${color.name} · ${getDisplayName(book)} ${ref}`}
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
                          aria-label={`Delete highlight ${getDisplayName(book)} ${ref}`}
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
    );
  };

  return (
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

      {/* Tabs */}
      <div className="mb-8 flex gap-2 border-b border-hairline">
        <button
          onClick={() => setActiveTab('bible')}
          className={`relative px-4 py-2 font-sans text-sm font-medium transition-colors ${
            activeTab === 'bible'
              ? 'text-gold'
              : 'text-muted hover:text-ink'
          }`}
        >
          Holy Bible
          {bibleCount > 0 && (
            <span className="ml-2 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] tabular-nums">
              {bibleCount}
            </span>
          )}
          {activeTab === 'bible' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('readings')}
          className={`relative px-4 py-2 font-sans text-sm font-medium transition-colors ${
            activeTab === 'readings'
              ? 'text-gold'
              : 'text-muted hover:text-ink'
          }`}
        >
          Christian Readings
          {readingsCount > 0 && (
            <span className="ml-2 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] tabular-nums">
              {readingsCount}
            </span>
          )}
          {activeTab === 'readings' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
          )}
        </button>
      </div>

      {/* Bible Tab */}
      {activeTab === 'bible' && (
        <>
          {/* Bible Bookmarks */}
          {bibleBookmarks.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-3 font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold">
                {isAuthenticated ? 'Bookmarks' : 'Reading position'}
              </h2>
              <div className="space-y-4">
                {groupedBibleBookmarks.map(({ cat, books }) => (
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

          {/* Bible Highlights */}
          {renderHighlights(bibleByBookChapter, false)}

          {bibleCount === 0 && (
            <p className="py-12 text-center font-sans text-sm text-muted">
              No Bible highlights or bookmarks yet.
            </p>
          )}
        </>
      )}

      {/* Christian Readings Tab */}
      {activeTab === 'readings' && (
        <>
          {/* Readings Bookmarks */}
          {readingsBookmarks.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-3 font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold">
                Bookmarks
              </h2>
              <div className="space-y-4">
                {groupedReadingsBookmarks.map(({ cat, books }) => (
                  <div key={cat.id}>
                    <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                      {cat.name}
                    </div>
                    <div className="divide-y divide-hairline border-y border-hairline">
                      {books.map(({ slug, name, items }) => (
                        <div key={slug} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-1.5">
                          <span className="w-48 shrink-0 font-serif text-sm font-bold text-ink">
                            {name}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {items.map((bm) => (
                              <span
                                key={bm.chapter}
                                className="inline-flex items-center rounded border border-hairline bg-surface font-sans text-[11px]"
                              >
                                <Link
                                  href={readingChapterPath(bm.book, bm.chapter)}
                                  className="px-2 py-0.5 text-ink hover:text-gold transition-colors"
                                >
                                  Ch. {bm.chapter}
                                </Link>
                                {isAuthenticated && (
                                  <button
                                    onClick={() => handleDeleteBookmark(bm.book, bm.chapter)}
                                    aria-label={`Remove bookmark ${name} ${bm.chapter}`}
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

          {/* Readings Highlights */}
          {renderHighlights(readingsByBookChapter, true)}

          {readingsCount === 0 && (
            <p className="py-12 text-center font-sans text-sm text-muted">
              No Christian Readings highlights or bookmarks yet.
            </p>
          )}
        </>
      )}

      {loaded && !isEmpty && !isAuthenticated && (
        <p className="mt-12 border-t border-hairline pt-4 font-sans text-xs text-faint">
          Saved on this device for now — sign in to sync across devices.
        </p>
      )}
    </main>
  );
}
