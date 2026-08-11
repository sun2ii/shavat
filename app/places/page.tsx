import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPlaces } from '@/lib/terrain';

export const metadata: Metadata = {
  title: 'Shavat | Places',
  description: 'The ground it happened on',
  openGraph: {
    title: 'Shavat | Places',
    images: ['/shavat.png'],
  },
};

export default function PlacesPage() {
  const places = getAllPlaces();

  return (
    <main className="mx-auto max-w-5xl px-4">
      <header className="pb-6 pt-2 text-center md:pb-8 md:pt-4">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">
          The ground it happened on
        </p>
        <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-ink md:text-4xl">
          Places
        </h1>
      </header>

      <div className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <Link
              key={place.id}
              href={`/places/${place.id}`}
              className="group block p-5 rounded-xl border border-hairline hover:border-gold/40 transition-colors"
            >
              <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-faint mb-1">
                {place.scripture}
              </p>
              <h3 className="font-serif text-xl font-light text-[rgb(var(--speaker-9))] group-hover:text-gold-ink transition-colors">
                {place.name}
              </h3>
              <p className="font-serif text-sm text-muted mt-2 line-clamp-2">
                {place.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
