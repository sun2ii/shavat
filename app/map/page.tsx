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
    <main className="max-w-5xl mx-auto px-4 py-4">
      <div className="mb-4">
        <h1 className="text-xl font-light text-[rgb(var(--text-primary))]">
          Story Map
        </h1>
        <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
          The spine — one unbroken storyline in ten acts
        </p>
      </div>

      <StoryMap groups={groups} />
    </main>
  );
}
