'use client';

import { Suspense } from 'react';
import { ResolvedSegment } from '@/lib/terrain';
import StoryTerrain from './StoryTerrain';

/*
  Terrain — orientation before navigation.

  The story terrain shows the biblical journey from creation to all things new.
*/

export default function Terrain({ segments }: { segments: ResolvedSegment[] }) {
  return (
    <main className="mx-auto max-w-5xl px-4">
      {/* Compact on purpose: the header orients, then hands the viewport to the land. */}
      <header className="pb-6 pt-2 text-center md:pb-8 md:pt-4">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">
          The landscape of Scripture
        </p>
        <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-ink md:text-4xl">
          Terrain
        </h1>
        <p className="mx-auto mt-1.5 max-w-md font-serif text-sm italic text-muted">
          One story, from creation to all things new.
        </p>
      </header>

      <section role="region" aria-label="Story terrain">
        <Suspense fallback={<div className="py-24 text-center text-muted">Loading...</div>}>
          <StoryTerrain segments={segments} />
        </Suspense>
      </section>
    </main>
  );
}
