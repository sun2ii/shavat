'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ResolvedBranch,
  ResolvedSegment,
  ResolvedStop,
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

function HorizontalStop({
  stop,
  open,
  branchOpen,
  onToggle,
  left,
  right,
}: StopProps & {
  left: PathEdge;
  right: PathEdge;
}) {
  const listId = `terrain-stop-${stop.id}`;
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
        onClick={() => onToggle(stop.id)}
        aria-expanded={open}
        aria-controls={listId}
        className="group flex flex-col items-center rounded-xl px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      >
        <Dot open={open} />
        <span
          className={`mt-2.5 max-w-[13rem] font-serif text-lg font-light leading-snug transition-colors duration-200 lg:text-xl ${
            open ? 'text-ink' : 'text-ink group-hover:text-gold-ink'
          }`}
        >
          {stop.title}
        </span>
      </button>
      <BookList id={listId} books={stop.books} open={open} />
    </div>
  );
}

function HorizontalRow({
  stops,
  openIds,
  onToggle,
  baseDelay,
  sky,
  leadingSilence,
  trailingSilence,
}: {
  stops: ResolvedStop[];
  openIds: Set<string>;
  onToggle: (id: string) => void;
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

function VerticalStop({ stop, open, branchOpen, onToggle }: StopProps) {
  const listId = `terrain-stop-v-${stop.id}`;
  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <button
          type="button"
          onClick={() => onToggle(stop.id)}
          aria-expanded={open}
          aria-controls={listId}
          className="group flex flex-col items-center rounded-xl px-6 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          <Dot open={open} />
          <span
            className={`mt-2 font-serif text-xl font-light leading-tight transition-colors duration-200 ${
              open ? 'text-ink' : 'text-ink group-hover:text-gold-ink'
            }`}
          >
            {stop.title}
          </span>
        </button>
        <BookList id={listId} books={stop.books} open={open} />
      </div>

      {/* The branch tucks beneath its stop, still visibly sideways. */}
      {stop.branch && (
        <div className="mt-3 flex justify-center">
          <span aria-hidden className="mr-3 mt-[26px] h-px w-8 bg-hairline" />
          <BranchNode
            branch={stop.branch}
            open={branchOpen}
            onToggle={() => onToggle(stop.branch!.id)}
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// The journey
// ---------------------------------------------------------------------------

export default function StoryTerrain({ segments }: { segments: ResolvedSegment[] }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

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
        <HorizontalRow
          stops={firstRoad}
          openIds={openIds}
          onToggle={toggle}
          baseDelay={0}
          sky
          trailingSilence={gap !== null}
        />
        {gap && (
          <SilenceBand label={gap.label} note={gap.note} delay={firstRoad.length * 90} />
        )}
        {secondRoad.length > 0 && (
          <HorizontalRow
            stops={secondRoad}
            openIds={openIds}
            onToggle={toggle}
            baseDelay={firstRoad.length + 1}
            leadingSilence
          />
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
    </>
  );
}
