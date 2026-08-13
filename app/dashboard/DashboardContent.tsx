'use client';

import { useState } from 'react';
import Link from 'next/link';
import BibleProgressGrid from './BibleProgressGrid';
import BookmarksPlaceholder from './BookmarksPlaceholder';
import HighlightsPlaceholder from './HighlightsPlaceholder';
import LogoutButton from './LogoutButton';

type DashboardTab = 'progress' | 'bookmarks' | 'highlights';

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
  const [activeTab, setActiveTab] = useState<DashboardTab>('progress');

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="font-playfair text-2xl font-semibold text-[rgb(var(--text-primary))]">
            Dashboard
          </h1>
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-3 py-1.5 font-sans text-[11px] font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'progress'
                  ? 'bg-gold/10 text-gold'
                  : 'text-muted hover:text-ink hover:bg-surface'
              }`}
            >
              Progress
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3 py-1.5 font-sans text-[11px] font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'bookmarks'
                  ? 'bg-gold/10 text-gold'
                  : 'text-muted hover:text-ink hover:bg-surface'
              }`}
            >
              Bookmarks
            </button>
            <button
              onClick={() => setActiveTab('highlights')}
              className={`px-3 py-1.5 font-sans text-[11px] font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'highlights'
                  ? 'bg-gold/10 text-gold'
                  : 'text-muted hover:text-ink hover:bg-surface'
              }`}
            >
              Highlights
            </button>
          </div>
        </div>
        <LogoutButton />
      </div>

      {/* Stats row + Continue Reading */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-4 font-sans text-[11px]">
          <span><span className="font-semibold text-ink">{stats.completedBooks}</span><span className="text-faint"> / {stats.totalBooks} books</span></span>
          <span className="text-hairline">·</span>
          <span><span className="font-semibold text-gold-ink">{stats.inProgressBooks}</span> <span className="text-faint">in progress</span></span>
          <span className="text-hairline">·</span>
          <span><span className="font-semibold text-ink">{stats.completedChapters}</span><span className="text-faint"> / {stats.totalChapters} chapters</span></span>
          <span className="text-hairline">·</span>
          <span className={`font-semibold ${stats.percentage === '100.00' ? 'text-emerald-500' : 'text-gold-ink'}`}>{stats.percentage}%</span>
        </div>
        {currentReading && (
          <>
            <span className="text-hairline">|</span>
            <Link
              href={`/${currentReading.slug}/${currentReading.chapter}`}
              className="font-sans text-[11px] text-muted hover:text-gold transition-colors"
            >
              Continue: <span className="text-ink">{currentReading.book} {currentReading.chapter}</span>
            </Link>
          </>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'progress' && <BibleProgressGrid completedByBook={completedByBook} />}
      {activeTab === 'bookmarks' && <BookmarksPlaceholder />}
      {activeTab === 'highlights' && <HighlightsPlaceholder />}
    </div>
  );
}
