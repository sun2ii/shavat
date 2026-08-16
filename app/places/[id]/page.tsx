import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPlaceById as getTerrainPlace, getAllPlaces as getTerrainPlaces } from '@/lib/terrain';
import { getPlaceById as getSimplePlace, getAllPlacesSimple } from '@/lib/places';
import BackButton from '@/components/BackButton';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  // Combine terrain places (rich data) with simple places list
  const terrainPlaces = getTerrainPlaces();
  const simplePlaces = getAllPlacesSimple();

  const allIds = new Set<string>();
  terrainPlaces.forEach(p => allIds.add(p.id));
  simplePlaces.forEach(p => allIds.add(p.id));

  return Array.from(allIds).map(id => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Try terrain first (has descriptions), then simple places
  const terrainPlace = getTerrainPlace(id);
  if (terrainPlace) {
    return {
      title: `${terrainPlace.name} | Shavat`,
      description: terrainPlace.description,
    };
  }

  const simplePlace = getSimplePlace(id);
  if (simplePlace) {
    return {
      title: `${simplePlace.name} | Shavat`,
      description: `${simplePlace.name} - a biblical location`,
    };
  }

  return { title: 'Place Not Found | Shavat' };
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

  // Try terrain first (has rich data)
  const terrainPlace = getTerrainPlace(id);
  if (terrainPlace) {
    return (
      <div className="min-h-screen bg-paper">
        <ScrollToTopOnMount />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <BackButton label="Back" className="mb-8" />

          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
            {terrainPlace.scripture}
          </p>

          <h1 className="font-serif text-4xl font-light text-amber-900 dark:text-amber-600 mb-2">
            {terrainPlace.name}
          </h1>

          {terrainPlace.precision && (
            <p className="font-sans text-xs text-faint mb-6">
              {precisionLabels[terrainPlace.precision] || terrainPlace.precision}
            </p>
          )}

          <p className="font-serif text-lg text-ink leading-relaxed">
            {terrainPlace.description}
          </p>
        </div>
      </div>
    );
  }

  // Fall back to simple place (just name, no description yet)
  const simplePlace = getSimplePlace(id);
  if (simplePlace) {
    return (
      <div className="min-h-screen bg-paper">
        <ScrollToTopOnMount />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <BackButton label="Back" className="mb-8" />

          <h1 className="font-serif text-4xl font-light text-amber-900 dark:text-amber-600 mb-6">
            {simplePlace.name}
          </h1>

          <p className="font-serif text-lg text-muted italic">
            Description coming soon.
          </p>
        </div>
      </div>
    );
  }

  notFound();
}
