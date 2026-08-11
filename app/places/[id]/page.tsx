import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlaceById, getAllPlaces } from '@/lib/terrain';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const places = getAllPlaces();
  return places.map((place) => ({
    id: place.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const place = getPlaceById(id);
  if (!place) {
    return { title: 'Place Not Found | Shavat' };
  }
  return {
    title: `${place.name} | Shavat`,
    description: place.description,
  };
}

// Precision labels
const precisionLabels: Record<string, string> = {
  exact: 'Exact location',
  region: 'Regional area',
  traditional: 'Traditional location',
  uncertain: 'Uncertain location',
};

export default async function PlacePage({ params }: Props) {
  const { id } = await params;
  const place = getPlaceById(id);

  if (!place) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/terrain?era=origins"
          className="inline-flex items-center gap-2 font-sans text-sm text-faint hover:text-ink transition-colors mb-8"
        >
          <span>←</span>
          <span>Back to Origins</span>
        </Link>

        {/* Scripture reference */}
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
          {place.scripture}
        </p>

        {/* Name */}
        <h1 className="font-serif text-4xl font-light text-[rgb(var(--speaker-9))] mb-2">
          {place.name}
        </h1>

        {/* Precision */}
        {place.precision && (
          <p className="font-sans text-xs text-faint mb-6">
            {precisionLabels[place.precision] || place.precision}
          </p>
        )}

        {/* Description */}
        <p className="font-serif text-lg text-ink leading-relaxed">
          {place.description}
        </p>
      </div>
    </div>
  );
}
