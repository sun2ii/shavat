'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  EraContent,
  EraPerson,
  getEraContent,
  ResolvedBranch,
  ResolvedEraContext,
  ResolvedProphet,
  ResolvedSegment,
  ResolvedStop,
  ResolvedWisdom,
  TerrainBook,
} from '@/lib/terrain';

/*
  The Story terrain — a landscape, not a list.

  On desktop the journey crosses the screen in two rows — the Old Testament
  road above, the New Testament road below — filling one viewport:
  destinations are dots on the path, Chronicles rides above its stop as a
  parallel track, and opening a destination cascades its books downward,
  growing the row without breaking the path. Between the rows lies the 400
  years of silence as a dashed band of fixed, comfortable height; the whole
  composition centers in the viewport so spare height splits evenly around
  it instead of pooling anywhere. On small screens the same journey stands
  vertically and stacks naturally.

  Aliveness is deliberate and quiet: the path draws itself in destination by
  destination on arrival, dots answer the hand on hover, and a dot fills with
  gold while its destination is open. Expansion state is shared by both
  orientations, so rotating a device loses nothing.
*/

// ---------------------------------------------------------------------------
// Arrival — the journey draws itself in, one destination after the next.
// ---------------------------------------------------------------------------

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setShown(true);
      return;
    }
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared pieces
// ---------------------------------------------------------------------------

/** The dot that marks a destination on the path. */
function Dot({ open, small }: { open: boolean; small?: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative z-10 block rounded-full border transition-all duration-200 ${
        small ? 'h-2 w-2' : 'h-3 w-3'
      } ${
        open
          ? 'border-gold bg-gold ring-4 ring-gold/15'
          : 'border-gold bg-paper group-hover:scale-125 group-hover:ring-4 group-hover:ring-gold/20'
      }`}
    />
  );
}

function BookLink({ book, open, compact }: { book: TerrainBook; open: boolean; compact?: boolean }) {
  return (
    <Link
      href={book.href}
      tabIndex={open ? undefined : -1}
      className={`group/book inline-flex items-baseline gap-1.5 whitespace-nowrap rounded font-serif text-muted transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
        compact ? 'text-sm' : 'text-base'
      }`}
    >
      <span>{book.name}</span>
      <span className="font-sans text-[10px] text-faint transition-colors duration-150 group-hover/book:text-muted">
        {book.chapterCount}
      </span>
    </Link>
  );
}

function BookList({
  id,
  books,
  open,
  compact,
}: {
  id: string;
  books: TerrainBook[];
  open: boolean;
  compact?: boolean;
}) {
  const wide = books.length > 6;
  return (
    /*
      w-max, not w-full: a wide list (Letters) may be broader than its terrain
      column, and the fold animation's overflow-hidden would shear it at the
      column edge. Sized to content, it spreads into the open ground instead;
      the parent column centers it over the dot.
    */
    <div
      id={id}
      className={`grid w-max max-w-[92vw] transition-[grid-template-rows,opacity] duration-300 ease-out ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <ul
          className={
            wide
              ? 'mx-auto mb-1 mt-3 grid w-max grid-cols-2 gap-x-6 gap-y-1 text-left'
              : 'mb-1 mt-3 flex flex-col items-center gap-1.5'
          }
        >
          {books.map((book) => (
            <li key={book.slug} className={wide ? undefined : 'flex justify-center'}>
              <BookLink book={book} open={open} compact={compact || wide} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Era context — prophetic voices, wisdom, parallel books (progressive disclosure)
// ---------------------------------------------------------------------------

function ProphetLink({ prophet }: { prophet: ResolvedProphet }) {
  return (
    <Link
      href={prophet.href}
      className={`group/prophet inline-flex items-baseline gap-1 whitespace-nowrap font-serif text-sm transition-colors duration-150 hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
        prophet.spansEras ? 'text-gold/80' : 'text-muted'
      }`}
      title={prophet.note}
    >
      <span>{prophet.name}</span>
      {prophet.spansEras && (
        <span className="font-sans text-[9px] text-gold/60">→</span>
      )}
    </Link>
  );
}

function WisdomLink({ wisdom }: { wisdom: ResolvedWisdom }) {
  return (
    <Link
      href={wisdom.href}
      className={`group/wisdom inline-flex items-baseline gap-1 whitespace-nowrap font-serif text-sm transition-colors duration-150 hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
        wisdom.uncertain ? 'text-faint' : 'text-muted'
      }`}
      title={wisdom.note}
      style={wisdom.uncertain ? { borderBottom: '1px dotted currentColor' } : undefined}
    >
      <span>{wisdom.name}</span>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Era Modal — full context for an era shown in an overlay
// ---------------------------------------------------------------------------

function EraModal({
  stop,
  onClose,
}: {
  stop: ResolvedStop;
  onClose: () => void;
}) {
  const context = stop.eraContext;

  // Collect all prophets
  const israelProphets = context?.prophets?.israel || [];
  const judahProphets = context?.prophets?.judah || [];
  const generalProphets = context?.prophets?.general || [];
  const hasIsraelJudah = israelProphets.length > 0 || judahProphets.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-xl bg-paper border border-hairline shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-faint hover:text-ink transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl font-light text-ink">{stop.title}</h2>
          {stop.bookNote && (
            <p className="mt-1 font-serif text-sm italic text-muted">{stop.bookNote}</p>
          )}
        </div>

        {/* Historical Books */}
        <div className="mb-5">
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-gold mb-2">
            Historical
          </p>
          <div className="flex flex-wrap gap-2">
            {stop.books.map((book) => (
              <Link
                key={book.slug}
                href={book.href}
                className="font-serif text-sm text-ink hover:text-gold-ink transition-colors"
              >
                {book.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Prophetic Voices */}
        {(israelProphets.length > 0 || judahProphets.length > 0 || generalProphets.length > 0) && (
          <div className="mb-5">
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-gold mb-2">
              Prophetic Voices
            </p>
            {hasIsraelJudah ? (
              <div className="space-y-2">
                {israelProphets.length > 0 && (
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-sans text-[8px] uppercase tracking-wider text-faint w-10">Israel</span>
                    {israelProphets.map((p) => (
                      <ProphetLink key={p.slug} prophet={p} />
                    ))}
                  </div>
                )}
                {judahProphets.length > 0 && (
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-sans text-[8px] uppercase tracking-wider text-faint w-10">Judah</span>
                    {judahProphets.map((p) => (
                      <ProphetLink key={p.slug} prophet={p} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {generalProphets.map((p) => (
                  <ProphetLink key={p.slug} prophet={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wisdom & Poetry */}
        {context?.wisdom && context.wisdom.length > 0 && (
          <div className="mb-5">
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-gold mb-2">
              Wisdom & Poetry
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {context.wisdom.map((w) => (
                <WisdomLink key={w.slug} wisdom={w} />
              ))}
            </div>
          </div>
        )}

        {/* Parallel Retelling */}
        {stop.branch && (
          <div className="pt-4 border-t border-hairline">
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-faint mb-2">
              {stop.branch.relation}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {stop.branch.books.map((book) => (
                <Link
                  key={book.slug}
                  href={book.href}
                  className="font-serif text-sm text-muted hover:text-gold-ink transition-colors"
                >
                  {book.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Backbone Modal — rich editorial content for eras with backbone content
// ---------------------------------------------------------------------------

// Section navigation maps for each era
// Maps movement number to the book/section/chapter for navigation
const SECTION_MAPS: Record<string, Record<string, { book?: string; section: string; chapter: number }>> = {
  origins: {
    '01': { section: 'creation', chapter: 1 },      // Genesis 1–2
    '02': { section: 'adam-and-eve', chapter: 3 },  // Genesis 3
    '03': { section: 'adam-and-eve', chapter: 4 },  // Genesis 4–5
    '04': { section: 'noah', chapter: 6 },          // Genesis 6–9
    '05': { section: 'noah', chapter: 10 },         // Genesis 10–11
  },
  patriarchs: {
    '01': { section: 'abraham', chapter: 12 },      // Genesis 12–14
    '02': { section: 'abraham', chapter: 15 },      // Genesis 15–24
    '03': { section: 'jacob', chapter: 25 },        // Genesis 25–36
    '04': { section: 'joseph', chapter: 37 },       // Genesis 37–47
    '05': { section: 'joseph', chapter: 48 },       // Genesis 48–50
  },
  exodus: {
    '01': { book: 'exodus', section: 'bondage', chapter: 1 },
    '02': { book: 'exodus', section: 'plagues', chapter: 7 },
    '03': { book: 'exodus', section: 'sinai', chapter: 19 },
    '04': { book: 'leviticus', section: 'holiness', chapter: 1 },
    '05': { book: 'deuteronomy', section: 'covenant', chapter: 1 },
  },
  tribes: {
    '01': { book: 'joshua', section: 'conquest', chapter: 1 },
    '02': { book: 'joshua', section: 'inheritance', chapter: 13 },
    '03': { book: 'judges', section: 'cycles', chapter: 1 },
    '04': { book: 'judges', section: 'chaos', chapter: 17 },
    '05': { book: 'ruth', section: 'faithfulness', chapter: 1 },
  },
  kingdom: {
    '01': { book: '1-samuel', section: 'transition', chapter: 1 },
    '02': { book: '2-samuel', section: 'david', chapter: 1 },
    '03': { book: '1-kings', section: 'solomon', chapter: 1 },
    '04': { book: '1-kings', section: 'division', chapter: 12 },
    '05': { book: '2-kings', section: 'judah', chapter: 18 },
  },
  exile: {
    '01': { book: 'lamentations', section: 'grief', chapter: 1 },
    '02': { book: 'ezekiel', section: 'judgment', chapter: 1 },
    '03': { book: 'ezekiel', section: 'nations', chapter: 25 },
    '04': { book: 'ezekiel', section: 'restoration', chapter: 33 },
    '05': { book: 'daniel', section: 'faithfulness', chapter: 1 },
  },
  return: {
    '01': { book: 'ezra', section: 'return', chapter: 1 },
    '02': { book: 'ezra', section: 'reform', chapter: 7 },
    '03': { book: 'nehemiah', section: 'walls', chapter: 1 },
    '04': { book: 'nehemiah', section: 'renewal', chapter: 8 },
    '05': { book: 'esther', section: 'preservation', chapter: 1 },
  },
};

// Era header metadata
const ERA_HEADERS: Record<string, { bookNote: string; name: string }> = {
  origins: { bookNote: 'Genesis 1–11', name: 'Origins' },
  patriarchs: { bookNote: 'Genesis 12–50', name: 'Patriarchs' },
  exodus: { bookNote: 'Exodus–Deuteronomy', name: 'Exodus' },
  tribes: { bookNote: 'Joshua–Ruth', name: 'Tribes' },
  kingdom: { bookNote: '1 Samuel–2 Kings', name: 'Kingdom' },
  exile: { bookNote: 'Lamentations, Ezekiel, Daniel', name: 'Exile' },
  return: { bookNote: 'Ezra, Nehemiah, Esther', name: 'Return' },
};

// Previous era mapping (reverse of nextEra)
const PREV_ERA: Record<string, { id: string; name: string }> = {
  patriarchs: { id: 'origins', name: 'Origins' },
  exodus: { id: 'patriarchs', name: 'Patriarchs' },
  tribes: { id: 'exodus', name: 'Exodus' },
  kingdom: { id: 'tribes', name: 'Tribes' },
  exile: { id: 'kingdom', name: 'Kingdom' },
  return: { id: 'exile', name: 'Exile' },
};

function BackboneModal({
  content,
  onClose,
  onNavigateToEra,
}: {
  content: EraContent;
  onClose: () => void;
  onNavigateToEra?: (eraId: string) => void;
}) {
  const eraHeader = ERA_HEADERS[content.id] || { bookNote: '', name: content.id };
  const sectionMap = SECTION_MAPS[content.id] || {};

  const prevEra = PREV_ERA[content.id];
  const nextEra = content.nextEra;

  // Keyboard navigation: Escape to close, arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && prevEra) {
        onNavigateToEra?.(prevEra.id);
      } else if (e.key === 'ArrowRight' && nextEra) {
        onNavigateToEra?.(nextEra.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigateToEra, prevEra, nextEra]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-paper rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-faint hover:text-ink transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header - inline */}
        <header className="pt-5 pb-4 px-6 border-b border-hairline">
          <div className="flex items-baseline gap-4">
            <div>
              <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.3em] text-gold">
                {eraHeader.bookNote}
              </p>
              <h1 className="font-serif text-2xl font-light text-ink">
                {eraHeader.name}
              </h1>
            </div>
            <div>
              <p className="font-serif text-sm italic text-muted">
                {content.tagline}
              </p>
              {/* Color legend - directly below tagline */}
              <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[rgb(var(--speaker-1))]" />
                  <span className="font-sans text-[10px] text-faint">Characters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[rgb(var(--speaker-9))]" />
                  <span className="font-sans text-[10px] text-faint">Places</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* The Backbone */}
        <section className="py-6 px-6">
          <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold mb-5">
            The Backbone
          </h2>

          <div className="flex items-start">
            {content.movements.map((movement, i) => {
              const link = sectionMap[movement.number];
              const book = link?.book || 'genesis';
              const href = link ? `/ot/${book}/${link.section}/${link.chapter}` : `/ot/${book}`;

              return (
              <>
                <article key={movement.number} className="flex-1 min-w-0 text-center">
                  {/* Movement header - larger */}
                  <div className="flex items-baseline justify-center gap-2.5">
                    <span className="font-sans text-xs font-semibold text-gold">
                      {movement.number}
                    </span>
                    <h3 className="font-serif text-xl font-light text-ink">
                      {movement.title}
                    </h3>
                  </div>
                  <Link
                    href={href}
                    className="inline-block font-sans text-[9px] uppercase tracking-wider text-faint hover:text-gold transition-colors mt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {movement.scripture}
                  </Link>

                  {/* Subtle links to people and places */}
                  {(movement.people || movement.places) && (
                    <div className="mt-2 font-serif text-[11px] space-y-0.5">
                      {movement.people && movement.people.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-x-2">
                          {movement.people.map((p) => (
                            <Link
                              key={p.id}
                              href={`/characters/${p.id}`}
                              className="text-[rgb(var(--speaker-1))] hover:underline transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      )}
                      {movement.places && movement.places.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-x-2">
                          {movement.places.map((place) => (
                            <Link
                              key={place.id}
                              href={`/places/${place.id}`}
                              className="text-[rgb(var(--speaker-9))] hover:underline transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {place.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Body - larger */}
                  <p className="font-serif text-sm text-ink leading-relaxed mt-3 text-left">
                    {movement.body.join(' ')}
                  </p>

                  {/* Key idea */}
                  {movement.closingInsight && (
                    <p className="font-serif text-sm italic text-gold-ink mt-3 text-left">
                      {movement.closingInsight}
                    </p>
                  )}
                </article>

                {/* Arrow connector */}
                {i < content.movements.length - 1 && (
                  <span className="px-4 text-faint/40 pt-1 text-lg">→</span>
                )}
              </>
              );
            })}
          </div>
        </section>

        {/* Footer with navigation */}
        <footer className="py-4 px-6 border-t border-hairline">
          <div className="flex items-center justify-between">
            {/* Previous Era button */}
            {prevEra ? (
              <button
                onClick={() => onNavigateToEra?.(prevEra.id)}
                className="group flex items-center gap-2 pr-4 border-r border-hairline"
              >
                <span className="text-faint/60 group-hover:text-gold-ink transition-colors">←</span>
                <div className="text-left">
                  <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-faint">
                    Previous
                  </p>
                  <span className="font-serif text-lg font-light text-ink group-hover:text-gold-ink transition-colors">
                    {prevEra.name}
                  </span>
                </div>
              </button>
            ) : (
              <div />
            )}

            {/* The Big Question (center) */}
            {content.transition && (
              <div className="flex-1 flex items-center justify-center gap-4 px-4">
                <p className="font-serif text-base italic text-ink text-center">
                  {content.transition.question}
                </p>
              </div>
            )}

            {/* Next Era button */}
            {nextEra ? (
              <button
                onClick={() => onNavigateToEra?.(nextEra.id)}
                className="group flex items-center gap-2 pl-4 border-l border-hairline"
              >
                <div className="text-right">
                  <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-faint">
                    Next
                  </p>
                  <span className="font-serif text-lg font-light text-ink group-hover:text-gold-ink transition-colors">
                    {nextEra.name}
                  </span>
                </div>
                <span className="text-faint/60 group-hover:text-gold-ink transition-colors">→</span>
              </button>
            ) : (
              <div />
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

/** Chronicles — connected sideways: the same era told again, not the next stop. */
function BranchNode({
  branch,
  open,
  onToggle,
}: {
  branch: ResolvedBranch;
  open: boolean;
  onToggle: () => void;
}) {
  const listId = `terrain-branch-${branch.id}`;
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={listId}
        className="group flex flex-col items-center rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      >
        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-faint">
          {branch.relation}
        </span>
        <span className="mt-1 flex items-center gap-2">
          <Dot open={open} small />
          <span className="font-serif text-lg font-light text-ink">{branch.title}</span>
        </span>
      </button>
      <BookList id={listId} books={branch.books} open={open} compact />
    </div>
  );
}

interface StopProps {
  stop: ResolvedStop;
  open: boolean;
  branchOpen: boolean;
  onToggle: (id: string) => void;
  onEraClick?: (stop: ResolvedStop) => void;
}

// ---------------------------------------------------------------------------
// Horizontal journey (md and up) — the whole landscape in one viewport.
// ---------------------------------------------------------------------------

/*
  Every column owns the piece of path that crosses it, split at the dot into
  a left and a right half. Equal flex columns make the halves meet seamlessly
  at the boundaries, and each left half fades to gold as it arrives at its
  destination — the line itself moves the eye forward.
*/
function PathHalf({ side, dashed }: { side: 'left' | 'right'; dashed?: boolean }) {
  const span = side === 'left' ? 'left-0 right-1/2' : 'left-1/2 right-0';
  if (dashed) {
    return (
      <span
        aria-hidden
        className={`absolute top-[5.5px] ${span} border-t border-dashed border-[rgb(var(--text-tertiary))] opacity-50`}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`absolute top-[5.5px] h-px ${span} ${
        side === 'left' ? 'bg-gradient-to-r from-hairline via-hairline to-gold/50' : 'bg-hairline'
      }`}
    />
  );
}

type PathEdge = 'none' | 'solid' | 'dashed';

/** Compact book summary for era display (e.g., "Exodus · Leviticus · Numbers · Deuteronomy") */
function BookSummary({ books, bookNote }: { books: TerrainBook[]; bookNote?: string }) {
  if (bookNote) {
    return (
      <span className="font-serif text-xs italic text-faint">{bookNote}</span>
    );
  }

  // Group consecutive numbered books (1 Samuel, 2 Samuel → 1–2 Samuel)
  const grouped: string[] = [];
  let i = 0;
  while (i < books.length) {
    const book = books[i];
    const match = book.name.match(/^([12]) (.+)$/);
    if (match && match[1] === '1') {
      // Check if next book is "2 [same name]"
      const nextBook = books[i + 1];
      if (nextBook) {
        const nextMatch = nextBook.name.match(/^([12]) (.+)$/);
        if (nextMatch && nextMatch[1] === '2' && nextMatch[2] === match[2]) {
          grouped.push(`1–2 ${match[2]}`);
          i += 2;
          continue;
        }
      }
    }
    grouped.push(book.name);
    i++;
  }

  return (
    <span className="font-serif text-xs italic text-faint">
      {grouped.join(' · ')}
    </span>
  );
}

function HorizontalStop({
  stop,
  open,
  branchOpen,
  onToggle,
  onEraClick,
  left,
  right,
}: StopProps & {
  left: PathEdge;
  right: PathEdge;
}) {
  const handleClick = () => {
    if (onEraClick) {
      onEraClick(stop);
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      {left !== 'none' && <PathHalf side="left" dashed={left === 'dashed'} />}
      {right !== 'none' && <PathHalf side="right" dashed={right === 'dashed'} />}

      {/* The parallel track rides above the path, anchored to its dot. */}
      {stop.branch && (
        <>
          <span
            aria-hidden
            className="absolute bottom-full left-1/2 h-4 w-px -translate-x-1/2 bg-hairline"
          />
          <div className="absolute bottom-full left-1/2 mb-4 w-max -translate-x-1/2">
            <BranchNode
              branch={stop.branch}
              open={branchOpen}
              onToggle={() => onToggle(stop.branch!.id)}
            />
          </div>
        </>
      )}

      <button
        type="button"
        onClick={handleClick}
        className="group flex flex-col items-center rounded-xl px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      >
        <Dot open={false} />
        <span
          className="mt-2.5 max-w-[13rem] font-serif text-lg font-light leading-snug transition-colors duration-200 lg:text-xl text-ink group-hover:text-gold-ink"
        >
          {stop.title}
        </span>
        {/* Book summary appears below the title */}
        {stop.bookNote ? (
          <span className="mt-1">
            <BookSummary books={stop.books} bookNote={stop.bookNote} />
          </span>
        ) : stop.books.length <= 4 && (
          <span className="mt-1">
            <BookSummary books={stop.books} />
          </span>
        )}
      </button>
    </div>
  );
}

function HorizontalRow({
  stops,
  openIds,
  onToggle,
  onEraClick,
  baseDelay,
  sky,
  leadingSilence,
  trailingSilence,
}: {
  stops: ResolvedStop[];
  openIds: Set<string>;
  onToggle: (id: string) => void;
  onEraClick: (stop: ResolvedStop) => void;
  baseDelay: number;
  sky?: boolean; // reserve room above the path for a parallel track
  leadingSilence?: boolean;
  trailingSilence?: boolean;
}) {
  return (
    <div className={`flex w-full items-start ${sky ? 'pt-24' : 'pt-2'}`}>
      {stops.map((stop, i) => {
        const first = i === 0;
        const last = i === stops.length - 1;
        return (
          <Reveal key={stop.id} delay={(baseDelay + i) * 90} className="min-w-0 flex-1">
            <HorizontalStop
              stop={stop}
              open={openIds.has(stop.id)}
              branchOpen={stop.branch ? openIds.has(stop.branch.id) : false}
              onToggle={onToggle}
              onEraClick={onEraClick}
              left={first ? (leadingSilence ? 'dashed' : 'none') : 'solid'}
              right={last ? (trailingSilence ? 'dashed' : 'none') : 'solid'}
            />
          </Reveal>
        );
      })}
    </div>
  );
}

/*
  The silence between the testaments — a quiet band between the two roads,
  tall enough to read as an era, never so tall it reads as a void.
*/
function SilenceBand({ label, note, delay }: { label: string; note: string; delay: number }) {
  return (
    <Reveal delay={delay} className="w-full">
      <div className="flex w-full items-center gap-8 py-10 lg:py-12">
        <span
          aria-hidden
          className="flex-1 border-t border-dashed border-[rgb(var(--text-tertiary))] opacity-40"
        />
        <div className="text-center">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-faint">
            {label}
          </p>
          <p className="mt-1 font-serif text-xs italic text-faint">{note}</p>
        </div>
        <span
          aria-hidden
          className="flex-1 border-t border-dashed border-[rgb(var(--text-tertiary))] opacity-40"
        />
      </div>
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Vertical journey (small screens) — the same path, standing up.
// ---------------------------------------------------------------------------

function VerticalConnector({ dashed }: { dashed?: boolean }) {
  return (
    <div aria-hidden className="flex min-h-4 flex-1 justify-center">
      {dashed ? (
        <span className="w-0 border-l border-dashed border-[rgb(var(--text-tertiary))] opacity-50" />
      ) : (
        <span className="w-px bg-gradient-to-b from-hairline via-hairline to-gold/50" />
      )}
    </div>
  );
}

function VerticalGap({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex flex-col items-center py-1 text-center">
      <div className="flex items-center gap-4">
        <span aria-hidden className="h-px w-10 bg-hairline" />
        <span className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-faint">
          {label}
        </span>
        <span aria-hidden className="h-px w-10 bg-hairline" />
      </div>
      <p className="mt-1 font-serif italic text-xs text-faint">{note}</p>
    </div>
  );
}

function VerticalStop({ stop, onEraClick }: StopProps) {
  const handleClick = () => {
    if (onEraClick) {
      onEraClick(stop);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <button
          type="button"
          onClick={handleClick}
          className="group flex flex-col items-center rounded-xl px-6 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          <Dot open={false} />
          <span className="mt-2 font-serif text-xl font-light leading-tight transition-colors duration-200 text-ink group-hover:text-gold-ink">
            {stop.title}
          </span>
          {/* Book summary appears below the title */}
          {stop.bookNote ? (
            <span className="mt-1">
              <BookSummary books={stop.books} bookNote={stop.bookNote} />
            </span>
          ) : stop.books.length <= 4 && (
            <span className="mt-1">
              <BookSummary books={stop.books} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The journey
// ---------------------------------------------------------------------------

export default function StoryTerrain({ segments }: { segments: ResolvedSegment[] }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [modalStop, setModalStop] = useState<ResolvedStop | null>(null);
  const [urlParamHandled, setUrlParamHandled] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Auto-open modal if ?era=origins (or other era) is in URL (only once on mount)
  useEffect(() => {
    if (urlParamHandled) return;

    const eraParam = searchParams.get('era');
    if (eraParam) {
      // Find the stop for this era
      const allStops = segments
        .filter((s): s is Extract<ResolvedSegment, { kind: 'stop' }> => s.kind === 'stop')
        .map((s) => s.stop);
      const targetStop = allStops.find((s) => s.eraId === eraParam);
      if (targetStop) {
        setModalStop(targetStop);
        // Clear URL immediately after opening
        router.replace('/terrain', { scroll: false });
      }
      setUrlParamHandled(true);
    }
  }, [searchParams, segments, urlParamHandled, router]);

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const openEraModal = (stop: ResolvedStop) => setModalStop(stop);
  const closeEraModal = () => setModalStop(null);

  // The silence splits the journey into its two roads.
  const gapIndex = segments.findIndex((s) => s.kind === 'gap');
  const gap = gapIndex === -1 ? null : (segments[gapIndex] as Extract<ResolvedSegment, { kind: 'gap' }>);
  const firstRoad = (gapIndex === -1 ? segments : segments.slice(0, gapIndex))
    .filter((s): s is Extract<ResolvedSegment, { kind: 'stop' }> => s.kind === 'stop')
    .map((s) => s.stop);
  const secondRoad = (gapIndex === -1 ? [] : segments.slice(gapIndex + 1))
    .filter((s): s is Extract<ResolvedSegment, { kind: 'stop' }> => s.kind === 'stop')
    .map((s) => s.stop);

  return (
    <>
      {/*
        Desktop: two roads across the screen — the old covenant above, the
        new below — with the silent centuries stretched between them. Books
        fall into the ground beneath their row, growing it without ever
        breaking the path.
      */}
      <div className="hidden min-h-[calc(100dvh-330px)] flex-col justify-center pb-8 md:flex">
        {/* Old Testament section */}
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold text-center">
          Old Testament
        </p>
        <HorizontalRow
          stops={firstRoad}
          openIds={openIds}
          onToggle={toggle}
          onEraClick={openEraModal}
          baseDelay={0}
          sky
          trailingSilence={gap !== null}
        />
        {gap && (
          <SilenceBand label={gap.label} note={gap.note} delay={firstRoad.length * 90} />
        )}
        {secondRoad.length > 0 && (
          <>
            {/* New Testament section */}
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold text-center">
              New Testament
            </p>
            <HorizontalRow
              stops={secondRoad}
              openIds={openIds}
              onToggle={toggle}
              onEraClick={openEraModal}
              baseDelay={firstRoad.length + 1}
              leadingSilence
            />
          </>
        )}
      </div>

      {/* Small screens: the same journey, standing up. */}
      <div className="mx-auto flex min-h-[calc(100dvh-320px)] max-w-3xl flex-col pb-6 md:hidden">
        <ol className="flex min-h-0 flex-1 list-none flex-col">
          {segments.map((segment, i) => {
            const prev = segments[i - 1];
            const dashed = segment.kind === 'gap' || prev?.kind === 'gap';
            const key = segment.kind === 'gap' ? segment.id : segment.stop.id;
            return (
              <li key={key} className={i > 0 ? 'flex min-h-0 flex-1 flex-col' : undefined}>
                {i > 0 && <VerticalConnector dashed={dashed} />}
                <Reveal delay={i * 70}>
                  {segment.kind === 'gap' ? (
                    <VerticalGap label={segment.label} note={segment.note} />
                  ) : (
                    <VerticalStop
                      stop={segment.stop}
                      open={openIds.has(segment.stop.id)}
                      branchOpen={
                        segment.stop.branch ? openIds.has(segment.stop.branch.id) : false
                      }
                      onToggle={toggle}
                      onEraClick={openEraModal}
                    />
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* The path ends the way it travels — settling into gold. */}
        <div aria-hidden className="flex flex-col items-center pt-1">
          <span className="h-5 w-px bg-gradient-to-b from-hairline to-transparent" />
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold/60" />
        </div>
      </div>

      {/* Era Modal */}
      {modalStop && (
        modalStop.eraId && getEraContent(modalStop.eraId) ? (
          <BackboneModal
            content={getEraContent(modalStop.eraId)!}
            onClose={closeEraModal}
            onNavigateToEra={(eraId) => {
              // Find the stop for this era and open its modal
              const targetStop = [...firstRoad, ...secondRoad].find(s => s.eraId === eraId);
              if (targetStop) {
                setModalStop(targetStop);
              }
            }}
          />
        ) : (
          <EraModal stop={modalStop} onClose={closeEraModal} />
        )
      )}
    </>
  );
}
