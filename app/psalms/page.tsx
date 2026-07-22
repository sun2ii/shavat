import Link from 'next/link';
import { getAllCollections } from '@/lib/psalms-collections';

const SAD_COLLECTIONS = new Set(['grief', 'fear', 'anxiety', 'despair', 'anger', 'guilt', 'confusion', 'exhaustion']);

export default function PsalmsPage() {
  const psalmsCollections = getAllCollections();
  const sad = psalmsCollections.filter(c => SAD_COLLECTIONS.has(c.id));
  const happy = psalmsCollections.filter(c => !SAD_COLLECTIONS.has(c.id));

  const CollectionGrid = ({ collections }: { collections: typeof psalmsCollections }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/ot/psalms/${collection.id}/${collection.psalms[0]}`}
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
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold mb-8 text-[rgb(var(--text-primary))]">Psalms</h1>

      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-60 mb-4">Happy</h2>
        <CollectionGrid collections={happy} />
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-60 mb-4">Sad</h2>
        <CollectionGrid collections={sad} />
      </section>
    </main>
  );
}
