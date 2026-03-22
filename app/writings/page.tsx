import Link from 'next/link';
import { getAllWritings } from '@/lib/hasWritings';
import { getBooksByTopLevelCategory } from '@/lib/top-level-categories';

export const metadata = {
  title: 'Shavat | Writings',
  description: 'Theological writings and devotionals on Scripture',
};

export default function WritingsPage() {
  const allWritings = getAllWritings();
  const allBooks = [
    ...getBooksByTopLevelCategory('torah'),
    ...getBooksByTopLevelCategory('old-testament'),
    ...getBooksByTopLevelCategory('gospels'),
    ...getBooksByTopLevelCategory('new-testament'),
  ];

  // Group writings by book
  const writingsByBook = allWritings.reduce((acc, writing) => {
    if (!acc[writing.book]) {
      acc[writing.book] = [];
    }
    acc[writing.book].push(writing);
    return acc;
  }, {} as Record<string, typeof allWritings>);

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-2">
          Writings
        </h1>
        <p className="text-sm text-[rgb(var(--text-secondary))]">
          Theological essays and devotionals on Scripture
        </p>
      </div>

      {allWritings.length === 0 ? (
        <div className="text-center py-12 text-[rgb(var(--text-secondary))]">
          <p>No writings available yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(writingsByBook).map(([bookSlug, writings]) => {
            const book = allBooks.find(b => b.slug === bookSlug);
            const bookName = book?.name || bookSlug;

            return (
              <div key={bookSlug} className="space-y-3">
                <h2 className="text-xl font-light text-[rgb(var(--text-primary))] border-b border-[rgb(var(--border))] pb-2">
                  {bookName}
                </h2>

                <div className="space-y-2">
                  {writings
                    .sort((a, b) => a.chapter - b.chapter)
                    .map((writing) => (
                      <Link
                        key={`${writing.book}-${writing.chapter}`}
                        href={writing.path}
                        className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="text-base font-normal text-[rgb(var(--text-primary))]">
                            {writing.title}
                          </h3>
                          <span className="text-xs text-[rgb(var(--text-secondary))] opacity-60 whitespace-nowrap">
                            Chapter {writing.chapter}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
