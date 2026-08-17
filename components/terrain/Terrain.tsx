'use client';

import StoryTerrain from './StoryTerrain';
import PageHeader from '@/components/PageHeader';

/*
  Terrain — orientation before navigation.
  Read is space (the shelf); the Map is time (the story). One scrolling
  terrain of ten acts, Creation to all things new.
*/

export default function Terrain() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-8">
      <PageHeader
        kicker="The landscape of Scripture"
        title="Terrain"
        subtitle="One story, from creation to all things new."
      />

      <section role="region" aria-label="Story terrain">
        <StoryTerrain />
      </section>
    </main>
  );
}
