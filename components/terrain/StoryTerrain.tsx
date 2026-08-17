'use client';

/*
  The terrain, v1 skeleton — calm by design.

  At rest: ten collapsed act bands, the whole story visible as one shape on a
  single screen. Tap an act to breathe it open: its spine (story) movements
  as cards, and beneath them the "meanwhile" voices — prophets, letters,
  wisdom — anchored inside the act they speak into. Jonah sits inside the
  fall of the kingdom here, not on a shelf marked Prophets.

  "You are here": the act (and node) containing the reader's current
  position is quietly marked from reading progress — location, not progress.
  No percentages, no completion states, ever (STORY_MAP_PLAN.md §9).

  The movement panel (seven orientation questions) is the next phase; for
  now a node links straight into the reader — the map is always a door.
*/

import { useState } from 'react';
import Link from 'next/link';
import { getStoryMap, type Movement } from '@/lib/story-map';
import { useReadingProgress } from '@/components/providers/ReadingProgressProvider';
import { BIBLE_INDEX } from '@/lib/bible-index';

/** First in-progress book (canon order) and its first unread chapter. */
function findCurrentPosition(progress: Record<string, number[]>) {
  for (const book of BIBLE_INDEX) {
    const completed = progress[book.slug] || [];
    if (completed.length > 0 && completed.length < book.chapterCount) {
      for (let ch = 1; ch <= book.chapterCount; ch++) {
        if (!completed.includes(ch)) return { bookSlug: book.slug, chapter: ch };
      }
    }
  }
  return null;
}

function HereDot() {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
      <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-gold-ink">
        You are here
      </span>
    </span>
  );
}

export default function StoryTerrain() {
  const { progress } = useReadingProgress();
  const groups = getStoryMap({ includeSlotIns: true });

  const here = findCurrentPosition(progress);
  const hereNode: Movement | undefined = here
    ? groups
        .flatMap((g) => g.movements)
        .find(
          (m) =>
            m.bookSlug === here.bookSlug &&
            (m.chapters.includes(here.chapter) || m.key === `${m.bookSlug}:book`)
        )
    : undefined;
  const hereActId = hereNode?.eraId ?? null;

  // Calm at rest: ALL acts folded — the whole story as ten quiet lines.
  // The you-are-here dot still marks the reader's act on its band.
  const [openActs, setOpenActs] = useState<Set<string>>(() => new Set());
  const toggleAct = (id: string) =>
    setOpenActs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="space-y-2">
      {groups.map(({ era, movements }) => {
        const open = openActs.has(era.id);
        const isHereAct = era.id === hereActId;
        const spine = movements.filter((m) => m.spine);
        const slotIns = movements.filter((m) => !m.spine);

        return (
          <section key={era.id} className="rounded-xl border border-hairline bg-surface">
            {/* Act band — the resting face of the terrain */}
            {/* Compact at rest so all ten acts fit one screen: label only.
                The act's description reveals with its contents on expand. */}
            <button
              onClick={() => toggleAct(era.id)}
              aria-expanded={open}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left"
            >
              <span className="min-w-0 flex-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="font-serif text-[15px] font-bold text-ink">
                  {era.label}
                </span>
                {isHereAct && <HereDot />}
              </span>
              <span
                aria-hidden="true"
                className={`font-sans text-faint transition-transform ${open ? 'rotate-90' : ''}`}
              >
                ›
              </span>
            </button>

            {open && (
              <div className="border-t border-hairline px-4 pb-4 pt-3">
                <p className="mb-3 font-serif italic text-[11px] leading-snug text-muted">
                  {era.description}
                </p>
                {/* The spine — story movements that advance the plot */}
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4">
                  {spine.map((m) => {
                    const isHereNode = hereNode?.key === m.key;
                    return (
                      <Link
                        key={m.key}
                        href={m.href}
                        className={`relative flex min-h-[64px] flex-col justify-between rounded border border-l-2 bg-paper px-2.5 py-2 text-left transition-colors hover:bg-paper-2 active:bg-paper-2 ${
                          isHereNode
                            ? 'border-gold/60 border-l-gold'
                            : 'border-hairline border-l-hairline'
                        }`}
                      >
                        <span>
                          <span className="block font-serif text-[13px] leading-tight text-ink">
                            {m.title}
                          </span>
                          <span className="mt-0.5 block font-serif italic text-[10px] leading-snug text-muted">
                            {m.theme || 'not yet oriented'}
                          </span>
                        </span>
                        {isHereNode && (
                          <span className="mt-1.5">
                            <HereDot />
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* The meanwhile — voices and wisdom anchored inside this act */}
                {slotIns.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-gold">
                      Meanwhile, in this act
                    </p>
                    <div className="space-y-0.5">
                      {slotIns.map((m) => (
                        <Link
                          key={m.key}
                          href={m.href}
                          className="flex flex-wrap items-baseline gap-x-2 rounded px-1 py-1.5 -mx-1 transition-colors hover:bg-paper-2 active:bg-paper-2"
                        >
                          <span className="font-sans text-xs font-semibold text-gold-ink">
                            {m.bookName}
                          </span>
                          {m.anchor && (
                            <span className="font-serif italic text-[11px] text-muted">
                              {m.anchor}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
