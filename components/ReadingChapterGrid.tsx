'use client';

import Link from 'next/link';
import { useReadingProgress } from '@/components/providers/ReadingProgressProvider';

interface Book {
  id: number;
  slug: string;
  title: string;
  chapters: number;
}

interface Props {
  books: Book[];
  readingId: string;
  /** For readings like Confessions where each book is a single chapter */
  singleChapterPerBook?: boolean;
}

/**
 * Chapter grid for Christian Readings that shows reading progress.
 * Completed chapters are styled in green.
 */
export default function ReadingChapterGrid({ books, readingId, singleChapterPerBook = false }: Props) {
  const { isChapterComplete } = useReadingProgress();

  if (singleChapterPerBook) {
    // Confessions style: each book is clickable, one chapter each
    return (
      <div className="space-y-6">
        {books.map((book) => {
          const isComplete = isChapterComplete(book.slug, 1);
          return (
            <section key={book.id}>
              <Link
                href={`/readings/${readingId}/${book.id}/1`}
                className="flex items-baseline gap-2 mb-2 group"
              >
                <span className={`font-serif text-[11px] font-bold ${isComplete ? 'text-emerald-500' : 'text-gold'}`}>
                  {String(book.id).padStart(2, '0')}
                </span>
                <h2 className={`font-serif text-lg font-bold transition-colors ${
                  isComplete
                    ? 'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500'
                    : 'text-ink group-hover:text-gold'
                }`}>
                  {book.title}
                </h2>
                {isComplete && (
                  <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </Link>
            </section>
          );
        })}
      </div>
    );
  }

  // Standard style: each book has multiple chapters in a grid
  return (
    <div className="space-y-6">
      {books.map((book) => {
        const completedCount = Array.from({ length: book.chapters }, (_, i) => i + 1)
          .filter(ch => isChapterComplete(book.slug, ch)).length;
        const allComplete = completedCount === book.chapters;

        return (
          <section key={book.id}>
            <div className="flex items-baseline gap-2 mb-2">
              <span className={`font-serif text-[11px] font-bold ${allComplete ? 'text-emerald-500' : 'text-gold'}`}>
                {String(book.id).padStart(2, '0')}
              </span>
              <h2 className={`font-serif text-lg font-bold ${allComplete ? 'text-emerald-600 dark:text-emerald-400' : 'text-ink'}`}>
                {book.title}
              </h2>
              <span className="font-sans text-[11px] text-muted">
                {completedCount > 0 ? `${completedCount}/${book.chapters}` : `${book.chapters} chapters`}
              </span>
              {allComplete && (
                <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-1">
              {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => {
                const isComplete = isChapterComplete(book.slug, ch);
                return (
                  <Link
                    key={ch}
                    href={`/readings/${readingId}/${book.id}/${ch}`}
                    className={`block rounded border px-2 py-2 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 ${
                      isComplete
                        ? 'border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500/60'
                        : 'border-hairline bg-surface hover:bg-gold/10 hover:border-gold/50'
                    }`}
                  >
                    <span className={`font-serif text-[13px] ${isComplete ? 'text-emerald-600 dark:text-emerald-400' : 'text-ink'}`}>
                      {ch}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
