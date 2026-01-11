'use client';

import Link from 'next/link';
import { CHRONOLOGICAL_PERIODS, getChronologicalBooks } from '@/lib/chronology';

export default function ChronologyPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      <div className="mb-8">
        <h1 className="text-2xl font-light text-[rgb(var(--text-primary))] mb-2">
          Biblical Chronology
        </h1>
        <p className="text-sm text-[rgb(var(--text-secondary))]">
          Books arranged by the timeline of events, not canonical order
        </p>
      </div>

      {CHRONOLOGICAL_PERIODS.map((period) => {
        const books = getChronologicalBooks(period.id);

        return (
          <section key={period.id} className="mb-12">
            <div className="mb-4">
              <h2 className="text-lg font-light text-[rgb(var(--text-primary))]">
                {period.name}
              </h2>
              <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
                {period.dateRange} • {period.description}
              </p>
              {period.note && (
                <p className="text-xs text-[rgb(var(--text-secondary))] opacity-40 italic mt-1">
                  {period.note}
                </p>
              )}
            </div>

            {books.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {books.map((book) => (
                  <Link
                    key={book.slug}
                    href={`/${book.slug}/1`}
                    className="block p-3 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors"
                  >
                    <h3 className="text-sm font-light text-[rgb(var(--text-primary))]">
                      {book.name}
                    </h3>
                    <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
                      {book.abbreviation}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 border border-[rgb(var(--border))] rounded text-center opacity-50">
                <p className="text-sm text-[rgb(var(--text-secondary))] italic">
                  No biblical books from this period
                </p>
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
