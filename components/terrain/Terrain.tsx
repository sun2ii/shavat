'use client';

import { useState } from 'react';
import { DIMENSIONS, Dimension, DimensionId, ResolvedSegment } from '@/lib/terrain';
import StoryTerrain from './StoryTerrain';

/*
  Terrain — orientation before navigation.

  Dimensions sit across the top like map modes. Story is the landscape that
  exists today; People, Places, and Timeline are already part of the
  architecture and simply haven't been surveyed yet.
*/

function DimensionTabs({
  active,
  onSelect,
}: {
  active: DimensionId;
  onSelect: (id: DimensionId) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Dimensions"
      className="mt-5 flex justify-center gap-2 font-sans text-[13px]"
    >
      {DIMENSIONS.map((dimension) => {
        const selected = dimension.id === active;
        return (
          <button
            key={dimension.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`terrain-panel-${dimension.id}`}
            onClick={() => onSelect(dimension.id)}
            className={`relative rounded-full px-4 py-1.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
              selected
                ? 'font-medium text-ink after:absolute after:-bottom-1 after:left-1/2 after:h-[3px] after:w-[18px] after:-translate-x-1/2 after:rounded-full after:bg-gold'
                : 'text-muted hover:text-ink'
            }`}
          >
            {dimension.label}
          </button>
        );
      })}
    </div>
  );
}

function ComingSoon({ dimension }: { dimension: Dimension }) {
  return (
    <div className="py-24 text-center md:py-36">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
        Coming soon
      </p>
      <h2 className="mt-4 font-serif text-3xl font-light text-ink">{dimension.label}</h2>
      <p className="mt-2 font-serif italic text-muted">{dimension.tagline}</p>
    </div>
  );
}

export default function Terrain({ segments }: { segments: ResolvedSegment[] }) {
  const [active, setActive] = useState<DimensionId>('story');
  const dimension = DIMENSIONS.find((d) => d.id === active) ?? DIMENSIONS[0];

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
        <DimensionTabs active={active} onSelect={setActive} />
      </header>

      <section id={`terrain-panel-${dimension.id}`} role="tabpanel" aria-label={dimension.label}>
        {dimension.status === 'live' ? (
          <StoryTerrain segments={segments} />
        ) : (
          <ComingSoon dimension={dimension} />
        )}
      </section>
    </main>
  );
}
