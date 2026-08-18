'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { getHighlightColor } from '@/lib/highlight-colors';
import type { Highlight } from '@/lib/types';
import { bookName } from '@/lib/book-helpers';
import ThemeToggle from '@/components/ThemeToggle';
import LogoutButton from '@/app/dashboard/LogoutButton';
import BibleProgressGrid from '@/app/dashboard/BibleProgressGrid';

interface Props {
  isAuthenticated: boolean;
  currentReading: { book: string; slug: string; chapter: number } | null;
  stats: { completedChapters: number; totalChapters: number; percentage: string } | null;
  completedByBook: Record<string, number[]>;
}

/** Most recent saved verse — a small remembrance card and the door to Saved. */
function RecentHighlight() {
  const [latest, setLatest] = useState<Highlight | null>(null);

  useEffect(() => {
    const highlights = storage.getHighlights();
    if (highlights.length > 0) {
      setLatest([...highlights].sort((a, b) => b.createdAt - a.createdAt)[0]);
    }
  }, []);

  if (!latest) return null;

  const color = getHighlightColor(latest.color);
  const verses =
    latest.verseStart === latest.verseEnd
      ? `verse ${latest.verseStart}`
      : `verses ${latest.verseStart}–${latest.verseEnd}`;

  return (
    <section className="mt-10">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold">
          From your reading
        </h2>
        <Link
          href="/saved"
          className="inline-block py-2 -my-2 font-sans text-xs text-muted hover:text-ink active:text-ink transition-colors"
        >
          All saved →
        </Link>
      </div>
      <Link
        href={`/${latest.book}/${latest.chapter}`}
        className="flex overflow-hidden rounded-xl border border-hairline bg-surface transition-colors hover:bg-paper-2 active:bg-paper-2"
      >
        <span className="w-[5px] shrink-0" style={{ background: color.swatch }} />
        <span className="flex-1 p-4">
          <span className="block font-sans text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: color.label }}>
            {bookName(latest.book)} {latest.chapter} · {verses}
          </span>
          {latest.note && (
            <span className="mt-1.5 block font-serif text-lg leading-snug text-ink">
              {latest.note}
            </span>
          )}
        </span>
      </Link>
    </section>
  );
}

export default function TodayContent({ isAuthenticated, currentReading, stats, completedByBook }: Props) {
  const [dateLine, setDateLine] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Set after mount so the server render never disagrees with the client's timezone.
    setDateLine(
      new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    );
  }, []);

  const continueHref = currentReading
    ? `/${currentReading.slug}/${currentReading.chapter}`
    : '/genesis/1';

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
      {/* Date + settings */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <p className="font-serif italic text-muted text-sm min-h-[1.25rem]">{dateLine}</p>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Settings"
            className="flex h-10 w-10 -m-1 items-center justify-center rounded-full text-faint hover:text-ink active:text-ink transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
            </svg>
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 cursor-default"
                aria-hidden="true"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-hairline bg-surface p-3 shadow-xl">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-sans text-xs text-muted">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="mt-3 border-t border-hairline pt-3">
                  {isAuthenticated ? (
                    <LogoutButton />
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="font-sans text-xs text-muted hover:text-ink active:text-ink transition-colors"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Hero: the open door back into the text */}
      <section>
        <p className="mb-3 font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold">
          {currentReading ? 'Continue reading' : 'Begin reading'}
        </p>
        <Link
          href={continueHref}
          className="group block rounded-2xl border border-hairline bg-surface px-6 py-8 sm:px-8 transition-colors hover:bg-paper-2 active:bg-paper-2"
        >
          {currentReading ? (
            <>
              <span className="block font-serif text-3xl sm:text-4xl text-ink leading-tight">
                {currentReading.book} {currentReading.chapter}
              </span>
              <span className="mt-2 block font-serif italic text-muted">
                is waiting for you
              </span>
            </>
          ) : (
            <>
              <span className="block font-serif text-3xl sm:text-4xl text-ink leading-tight">
                In the beginning
              </span>
              <span className="mt-2 block font-serif italic text-muted">
                Genesis 1 — start where the story starts
              </span>
            </>
          )}
          <span className="mt-4 inline-block font-sans text-sm text-gold-ink transition-transform group-hover:translate-x-0.5">
            Open →
          </span>
        </Link>

        {/* Presence line: position, not pressure */}
        {isAuthenticated && stats && stats.completedChapters > 0 && (
          <p className="mt-3 px-1 font-sans text-xs text-faint">
            {stats.completedChapters} of {stats.totalChapters} chapters · {stats.percentage}%
          </p>
        )}
        {!isAuthenticated && (
          <p className="mt-3 px-1 font-sans text-xs text-faint">
            A Sabbath for reading —{' '}
            <Link href="/login" className="underline hover:text-muted active:text-muted">
              sign in
            </Link>{' '}
            to keep your place across devices.
          </p>
        )}
      </section>

      <RecentHighlight />

      {/* The full picture, out of the way until wanted */}
      {isAuthenticated && (
        <section className="mt-12">
          <h2 className="mb-4 font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold">
            Your Bible
          </h2>
          <BibleProgressGrid completedByBook={completedByBook} />
        </section>
      )}
    </main>
  );
}
