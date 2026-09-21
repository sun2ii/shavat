'use client';

import { useState } from 'react';
import Link from 'next/link';
import BibleProgressGrid from './BibleProgressGrid';
import LogoutButton from './LogoutButton';

type ViewMode = 'unfinished' | 'all';

interface Props {
  stats: {
    completedBooks: number;
    totalBooks: number;
    inProgressBooks: number;
    completedChapters: number;
    totalChapters: number;
    percentage: string;
  };
  currentReading: { book: string; slug: string; chapter: number } | null;
  completedByBook: Record<string, number[]>;
}

export default function DashboardContent({ stats, currentReading, completedByBook }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('unfinished');

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 mb-6">
        <div className="flex items-center gap-4">
          <h1 className="font-playfair text-2xl font-semibold text-[rgb(var(--text-primary))]">
            Dashboard
          </h1>
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode('unfinished')}
              className={`px-3 py-1.5 font-sans text-[11px] font-medium rounded-lg transition-colors cursor-pointer ${
                viewMode === 'unfinished'
                  ? 'bg-gold/10 text-gold'
                  : 'text-muted hover:text-ink hover:bg-surface'
              }`}
            >
              Unfinished
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 font-sans text-[11px] font-medium rounded-lg transition-colors cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-gold/10 text-gold'
                  : 'text-muted hover:text-ink hover:bg-surface'
              }`}
            >
              All Books
            </button>
          </div>
        </div>
        <LogoutButton />
      </div>

      {/* Currently Reading */}
      {currentReading && (
        <div className="mb-6">
          <div className="font-sans text-[10px] font-semibold uppercase tracking-wider text-gold mb-2">
            Currently Reading
          </div>
          <Link
            href={`/${currentReading.slug}/${currentReading.chapter}`}
            className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-gold/5 border border-gold/20 hover:border-gold/40 hover:bg-gold/10 transition-colors"
          >
            <span className="font-serif text-lg text-ink">{currentReading.book} {currentReading.chapter}</span>
            <span className="font-sans text-xs text-gold">Continue →</span>
          </Link>
        </div>
      )}

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-6 font-sans text-xs md:text-[11px]">
        <span><span className="font-semibold text-ink">{stats.completedBooks}</span><span className="text-faint"> / {stats.totalBooks} books</span></span>
        <span className="text-hairline">·</span>
        <span><span className="font-semibold text-gold-ink">{stats.inProgressBooks}</span> <span className="text-faint">in progress</span></span>
        <span className="text-hairline">·</span>
        <span><span className="font-semibold text-ink">{stats.completedChapters}</span><span className="text-faint"> / {stats.totalChapters} chapters</span></span>
        <span className="text-hairline">·</span>
        <span className={`font-semibold ${stats.percentage === '100.00' ? 'text-emerald-500' : 'text-gold-ink'}`}>{stats.percentage}%</span>
      </div>

      {/* Progress Grid */}
      <BibleProgressGrid completedByBook={completedByBook} showOnlyUnfinished={viewMode === 'unfinished'} />
    </div>
  );
}
