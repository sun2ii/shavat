'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { getHighlightColor } from '@/lib/highlight-colors';
import type { Bookmark, Highlight } from '@/lib/types';
import { bookName } from '@/lib/book-helpers';
import { useBookmarks } from '@/components/providers/BookmarkProvider';
import PageHeader from '@/components/PageHeader';

interface DbBookmark {
  book: string;
  chapter: number;
  verse: number | null;
  created_at: string;
}

interface Props {
  isAuthenticated?: boolean;
  serverBookmarks?: DbBookmark[];
}

export default function SavedContent({ isAuthenticated = false, serverBookmarks = [] }: Props) {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [localBookmark, setLocalBookmark] = useState<Bookmark | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setHighlights(storage.getHighlights());
    if (!isAuthenticated) {
      setLocalBookmark(storage.getBookmark());
    }
    setLoaded(true);
  }, [isAuthenticated]);

  const handleDelete = (id: string) => {
    storage.deleteHighlight(id);
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  const { toggleBookmark, isBookmarked: isChapterBookmarked } = useBookmarks();

  const handleDeleteBookmark = async (book: string, chapter: number) => {
    if (!isAuthenticated) return;
    await toggleBookmark(book, chapter);
  };

  // Group highlights by book, then chapter, newest books last edited first.
  const byBookChapter = highlights.reduce((acc, h) => {
    const book = h.book || 'genesis';
    (acc[book] ??= {})[h.chapter] ??= [];
    acc[book][h.chapter].push(h);
    return acc;
  }, {} as Record<string, Record<number, Highlight[]>>);

  // Use server bookmarks for authenticated (filtered by context for optimistic deletes), localStorage for unauthenticated
  const bookmarks = isAuthenticated
    ? serverBookmarks.filter(bm => isChapterBookmarked(bm.book, bm.chapter))
    : (localBookmark ? [localBookmark] : []);
  const isEmpty = highlights.length === 0 && bookmarks.length === 0;

  return (
    // No top padding on the container: PageHeader owns the top spacing so
    // all tabs sit at exactly the same height.
    <main className="mx-auto max-w-5xl px-4 sm:px-6 pb-8">
      <PageHeader
        kicker="Your hand in the text"
        title="Saved"
        subtitle={
          highlights.length > 0
            ? `${highlights.length} ${highlights.length === 1 ? 'highlight' : 'highlights'}${bookmarks.length > 0 ? ` · ${bookmarks.length} ${bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}` : ''}`
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
          <div className="space-y-2">
            {bookmarks.map((bm, idx) => (
              <div
                key={`${bm.book}-${bm.chapter}-${idx}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-hairline bg-surface p-4 transition-colors hover:bg-paper-2"
              >
                <Link
                  href={`/${bm.book}/${bm.chapter}`}
                  className="flex-1"
                >
                  <span className="block font-serif text-xl text-ink">
                    {bookName(bm.book)} {bm.chapter}
                  </span>
                  {bm.verse && (
                    <span className="mt-0.5 block font-sans text-xs text-faint">
                      verse {bm.verse}
                    </span>
                  )}
                </Link>
                <div className="flex items-center gap-3">
                  {isAuthenticated && (
                    <button
                      onClick={() => handleDeleteBookmark(bm.book, bm.chapter)}
                      className="font-sans text-xs text-faint hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                  <Link
                    href={`/${bm.book}/${bm.chapter}`}
                    className="font-sans text-sm text-gold-ink whitespace-nowrap hover:text-gold transition-colors"
                  >
                    Return →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Highlights, grouped by book and chapter */}
      {highlights.length > 0 && (
        <div className="space-y-10">
          {Object.entries(byBookChapter).map(([book, chapters]) => (
            <section key={book}>
              <h2 className="mb-5 border-b-2 border-ink pb-3 font-serif font-bold text-2xl text-ink">
                {bookName(book)}
              </h2>
              <div className="space-y-8">
                {Object.keys(chapters)
                  .map(Number)
                  .sort((a, b) => a - b)
                  .map((chapterNum) => (
                    <div key={chapterNum}>
                      <h3 className="mb-3 font-sans text-xs tracking-[0.16em] uppercase text-muted font-semibold">
                        <Link
                          href={`/${book}/${chapterNum}`}
                          className="hover:text-gold active:text-gold transition-colors"
                        >
                          Chapter {chapterNum} →
                        </Link>
                      </h3>
                      <div className="grid gap-3.5 sm:grid-cols-2">
                        {chapters[chapterNum]
                          .slice()
                          .sort((a, b) => a.verseStart - b.verseStart)
                          .map((highlight) => {
                            const color = getHighlightColor(highlight.color);
                            return (
                              <div
                                key={highlight.id}
                                className="flex overflow-hidden rounded-xl border border-hairline bg-surface"
                              >
                                <span className="w-[5px] shrink-0" style={{ background: color.swatch }} />
                                <div className="flex-1 p-4">
                                  <div className="mb-2.5 flex items-center justify-between">
                                    <Link
                                      href={`/${book}/${highlight.chapter}`}
                                      className="font-sans text-[11px] font-bold tracking-[0.12em] uppercase transition-colors hover:opacity-80 active:opacity-80"
                                      style={{ color: color.label }}
                                    >
                                      {highlight.verseStart === highlight.verseEnd
                                        ? `Verse ${highlight.verseStart}`
                                        : `Verses ${highlight.verseStart}–${highlight.verseEnd}`}
                                    </Link>
                                    <button
                                      onClick={() => handleDelete(highlight.id)}
                                      className="p-2.5 -m-2.5 font-sans text-xs text-faint transition-colors hover:text-red-500 active:text-red-500"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                  {highlight.note && (
                                    <p className="font-serif text-lg leading-snug text-ink">{highlight.note}</p>
                                  )}
                                  <p className="mt-2 font-sans text-xs text-faint">
                                    {new Date(highlight.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {loaded && !isEmpty && !isAuthenticated && (
        <p className="mt-12 border-t border-hairline pt-4 font-sans text-xs text-faint">
          Saved on this device for now — sign in to sync across devices.
        </p>
      )}

      {/*
        ── VISION PREVIEW — remove when SAVED_ROADMAP.md ships ──
        Non-functional example cards showing what Saved becomes, so the end
        state can be seen and felt in the app before it's built. Dashed
        borders + "example" pills mark everything below as not real.
      */}
      <section className="mt-2">
        <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold">
            The vision — coming soon
          </h2>
          <span className="font-sans text-[10px] text-faint">
            examples · SAVED_ROADMAP.md
          </span>
        </div>

        <div className="space-y-3">
          {/* Example highlight — with the actual verse text on the card */}
          <div className="rounded-xl border border-dashed border-hairline">
            <div className="flex overflow-hidden rounded-xl">
              <span className="w-[5px] shrink-0 bg-[#e5c65a]" />
              <div className="flex-1 p-3">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-[#b08a2e]">
                    Highlight · Genesis 1:3
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-faint">
                    example
                  </span>
                </div>
                <p className="font-serif text-base leading-snug text-ink">
                  "And God said, 'Let there be light,' and there was light."
                </p>
                <p className="mt-1 font-serif italic text-xs text-muted">
                  The first words spoken into the dark.
                </p>
              </div>
            </div>
          </div>

          {/* Example reflection — the reader's own writing, passage-anchored */}
          <div className="rounded-xl border border-dashed border-hairline p-3">
            <div className="mb-1 flex items-center justify-between gap-3">
              <span className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-gold-ink">
                Reflection · Genesis 1:1–5
              </span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-faint">
                example
              </span>
            </div>
            <p className="font-serif text-base leading-snug text-ink">
              Order doesn't arrive all at once — light, then sky, then land.
              I want to stop rushing the middle days of things.
            </p>
            <div className="mt-1.5 flex items-center gap-3 font-sans text-[10px] text-faint">
              <span>Written Aug 17</span>
              <span className="opacity-50">Edit</span>
              <span className="opacity-50">Delete</span>
            </div>
          </div>

          {/* Example bookmark — a place deliberately held */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-hairline p-3">
            <span>
              <span className="mb-0.5 flex items-center gap-3">
                <span className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-gold-ink">
                  Bookmark
                </span>
                <span className="font-sans text-[9px] uppercase tracking-wider text-faint">
                  example
                </span>
              </span>
              <span className="block font-serif text-lg leading-tight text-ink">Exodus 14</span>
              <span className="block font-sans text-[11px] text-faint">
                held on purpose — the sea, the crossing
              </span>
            </span>
            <span className="whitespace-nowrap font-sans text-sm text-gold-ink opacity-50">
              Return →
            </span>
          </div>
        </div>

        <p className="mt-3 font-sans text-[11px] text-faint">
          Marks, thoughts, places — synced, verse text on every card, private by default.
        </p>
      </section>
    </main>
  );
}
