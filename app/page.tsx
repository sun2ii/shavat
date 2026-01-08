import Link from 'next/link';
import { getAllBooks } from '@/lib/genesis-collections';
import { getAllCollections } from '@/lib/psalms-collections';

export default function LibraryPage() {
  const genesisBooks = getAllBooks();
  const psalmsCollections = getAllCollections();

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      {/* Psalms Section */}
      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4">
          Psalms
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {psalmsCollections.map((collection) => (
            <Link
              key={collection.id}
              href={`/psalms/${collection.id}/${collection.psalms[0]}`}
              className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
            >
              <h3 className="text-sm font-light text-[rgb(var(--text-primary))] mb-1 leading-tight">
                {collection.title.replace('Psalms of ', '')}
              </h3>
              <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
                {collection.theme}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Genesis Section */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4">
          Genesis
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {genesisBooks.map((book) => (
            <Link
              key={book.id}
              href={`/genesis/${book.id}/${book.chapters[0]}`}
              className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
            >
              <h3 className="text-sm font-light text-[rgb(var(--text-primary))] mb-1 leading-tight">
                {book.title.replace('The Book of ', '')}
              </h3>
              <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
                {book.theme}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
