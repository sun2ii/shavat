import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getReadingHistory, getCurrentSeason, SEASON_COLORS, SEASON_LABELS, type Season } from '@/lib/seasons';
import { getBookBySlug } from '@/lib/bible-index';
import Link from 'next/link';

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatBookName(slug: string): string {
  const book = getBookBySlug(slug);
  return book?.name ?? slug;
}

const SEASON_STYLES: Record<Season, { dot: string; text: string; border: string; bg: string }> = {
  1: {
    dot: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
  },
  2: {
    dot: 'bg-purple-500',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/5',
  },
  3: {
    dot: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
  },
};

export default async function ReadingHistoryPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const currentSeason = await getCurrentSeason(user.email);
  const history = await getReadingHistory(user.email);

  // Sort seasons in reverse order (most recent first)
  const sortedHistory = [...history].sort((a, b) => b.season - a.season);

  return (
    <main className="min-h-full px-6 py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="font-sans text-xs text-muted hover:text-ink transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      <h1 className="font-serif text-2xl text-ink mb-2">Reading History</h1>
      <p className="font-sans text-sm text-muted mb-8">
        Your archived reading journeys. Currently on {SEASON_LABELS[currentSeason]}.
      </p>

      {sortedHistory.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-sans text-muted">No archived seasons yet.</p>
          <p className="font-sans text-sm text-faint mt-2">
            Complete your current reading journey and start a new season to see history here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedHistory.map(({ season, entries }) => {
            const styles = SEASON_STYLES[season];
            const color = SEASON_COLORS[season];
            const label = SEASON_LABELS[season];

            // Group entries by book
            const byBook = new Map<string, typeof entries>();
            for (const entry of entries) {
              if (!byBook.has(entry.book)) {
                byBook.set(entry.book, []);
              }
              byBook.get(entry.book)!.push(entry);
            }

            // Get total chapters and date range
            const totalChapters = entries.length;
            const firstDate = entries.length > 0 ? entries[0].completedAt : null;
            const lastDate = entries.length > 0 ? entries[entries.length - 1].completedAt : null;

            return (
              <section
                key={season}
                className={`rounded-lg border ${styles.border} ${styles.bg} p-6`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-3 h-3 rounded-full ${styles.dot}`} />
                  <h2 className={`font-serif text-lg ${styles.text}`}>
                    {label}
                  </h2>
                  <span className="font-sans text-xs text-muted ml-auto">
                    {totalChapters} chapters
                  </span>
                </div>

                {firstDate && lastDate && (
                  <p className="font-sans text-xs text-muted mb-4">
                    {formatDate(firstDate)} &ndash; {formatDate(lastDate)}
                  </p>
                )}

                <div className="space-y-4">
                  {Array.from(byBook.entries()).map(([book, chapters]) => (
                    <div key={book} className="border-t border-current/10 pt-3">
                      <h3 className="font-sans text-sm font-medium text-ink mb-2">
                        {formatBookName(book)}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {chapters.map((ch) => (
                          <span
                            key={`${ch.book}-${ch.chapter}`}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-sans bg-surface text-muted"
                            title={`Completed ${formatDate(ch.completedAt)}`}
                          >
                            {ch.chapter}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
