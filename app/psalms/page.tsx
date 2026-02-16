import Link from 'next/link';
import { getAllCollections } from '@/lib/psalms-collections';

export default function PsalmsPage() {
  const psalmsCollections = getAllCollections();

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold mb-8 text-[rgb(var(--text-primary))]">Psalms</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {psalmsCollections.map((collection) => (
          <Link
            key={collection.id}
            href={`/psalms/${collection.id}/${collection.psalms[0]}`}
            className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
          >
            <h3 className="text-sm font-light text-[rgb(var(--text-primary))] mb-1 leading-tight">
              {collection.title.replace('Psalms of ', '')} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {collection.psalms.length}</span>
            </h3>
            <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
              {collection.theme}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
