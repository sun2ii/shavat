'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { DIMENSIONS, Dimension, DimensionId, ResolvedSegment, getAllPeople, getAllPlaces } from '@/lib/terrain';
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

function CharactersIndex() {
  const characters = getAllPeople();

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {characters.map((character) => (
          <Link
            key={character.id}
            href={`/characters/${character.id}`}
            className="group block p-5 rounded-xl border border-hairline hover:border-gold/40 transition-colors"
          >
            <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-faint mb-1">
              {character.scripture}
            </p>
            <h3 className="font-serif text-xl font-light text-[rgb(var(--speaker-1))] group-hover:text-gold-ink transition-colors">
              {character.name}
            </h3>
            <p className="font-serif text-sm text-muted mt-2 line-clamp-2">
              {character.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PlacesIndex() {
  const places = getAllPlaces();

  return (
    <div className="py-12">
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

        {/* Stats bar */}
        <div className="flex justify-center gap-8 mt-5">
          <div className="text-center">
            <span className="font-serif text-2xl font-light text-ink">66</span>
            <span className="block font-sans text-[9px] uppercase tracking-wider text-faint">Books</span>
          </div>
          <div className="text-center">
            <span className="font-serif text-2xl font-light text-gold">39</span>
            <span className="block font-sans text-[9px] uppercase tracking-wider text-faint">Old Testament</span>
          </div>
          <div className="text-center">
            <span className="font-serif text-2xl font-light text-gold">27</span>
            <span className="block font-sans text-[9px] uppercase tracking-wider text-faint">New Testament</span>
          </div>
        </div>

        <DimensionTabs active={active} onSelect={setActive} />
      </header>

      <section id={`terrain-panel-${dimension.id}`} role="tabpanel" aria-label={dimension.label}>
        {dimension.status === 'coming-soon' ? (
          <ComingSoon dimension={dimension} />
        ) : dimension.id === 'story' ? (
          <Suspense fallback={<div className="py-24 text-center text-muted">Loading...</div>}>
            <StoryTerrain segments={segments} />
          </Suspense>
        ) : dimension.id === 'characters' ? (
          <CharactersIndex />
        ) : dimension.id === 'places' ? (
          <PlacesIndex />
        ) : (
          <ComingSoon dimension={dimension} />
        )}
      </section>
    </main>
  );
}
