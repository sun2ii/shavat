import { Metadata } from 'next';
import { getStoryMap } from '@/lib/story-map';
import StoryMap from '@/components/StoryMap';

export const metadata: Metadata = {
  title: 'Shavat | Story Map',
  openGraph: {
    title: 'Shavat | Story Map',
    images: ['/shavat.png'],
  },
};

export default function MapPage() {
  const groups = getStoryMap();

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      <div className="mb-8">
        <h1 className="text-2xl font-light text-[rgb(var(--text-primary))] mb-2">
          Story Map
        </h1>
        <p className="text-sm text-[rgb(var(--text-secondary))]">
          The whole story, Genesis to Revelation — ordered movements grouped by era
        </p>
      </div>

      <StoryMap groups={groups} />
    </main>
  );
}
