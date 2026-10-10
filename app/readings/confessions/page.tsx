import Link from 'next/link';
import { getReadingMetadata } from '@/lib/readings-accessor';
import PageHeader from '@/components/PageHeader';

export default function ConfessionsPage() {
  const metadata = getReadingMetadata('confessions');

  if (!metadata) {
    return <div>Reading not found</div>;
  }

  return (
    <main className="max-w-4xl mx-auto pb-8 px-4">
      <PageHeader
        kicker={metadata.author}
        title={metadata.title}
        subtitle={`Translated by ${metadata.translator}`}
      />

      <div className="space-y-6">
        {metadata.books.map((book) => (
          <section key={book.id}>
            <Link
              href={`/readings/confessions/${book.id}/1`}
              className="flex items-baseline gap-2 mb-2 group"
            >
              <span className="font-serif text-[11px] font-bold text-gold">
                {String(book.id).padStart(2, '0')}
              </span>
              <h2 className="font-serif text-lg font-bold text-ink group-hover:text-gold transition-colors">
                {book.title}
              </h2>
            </Link>
          </section>
        ))}
      </div>
    </main>
  );
}
