import Link from 'next/link';
import { BibleBookEntry } from '@/lib/types';
import { readingPath } from '@/lib/routes';

interface BookCardProps {
  book: BibleBookEntry;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={readingPath(book.slug, 1)}
      className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
    >
      <h3 className="text-sm font-light text-[rgb(var(--text-primary))] mb-1 leading-tight">
        {book.name} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {book.chapterCount}</span>
      </h3>
      <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
        {book.abbreviation}
      </p>
    </Link>
  );
}
