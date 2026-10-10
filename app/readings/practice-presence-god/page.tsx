import Link from 'next/link';
import { getReadingMetadata } from '@/lib/readings-accessor';
import PageHeader from '@/components/PageHeader';

export default function PracticePresencePage() {
  const metadata = getReadingMetadata('practice-presence-god');

  if (!metadata) {
    return <div>Reading not found</div>;
  }

  return (
    <main className="max-w-4xl mx-auto pb-8 px-4">
      <PageHeader
        kicker={metadata.author}
        title={metadata.title}
      />

      <div className="space-y-6">
        {metadata.books.map((book) => (
          <section key={book.id}>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-serif text-[11px] font-bold text-gold">
                {String(book.id).padStart(2, '0')}
              </span>
              <h2 className="font-serif text-lg font-bold text-ink">
                {book.title}
              </h2>
              <span className="font-sans text-[11px] text-muted">
                {book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-1">
              {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => (
                <Link
                  key={ch}
                  href={`/readings/practice-presence-god/${book.id}/${ch}`}
                  className="block rounded border border-hairline bg-surface px-2 py-2 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:bg-gold/10 hover:border-gold/50 transition-all duration-150"
                >
                  <span className="font-serif text-[13px] text-ink">{ch}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
