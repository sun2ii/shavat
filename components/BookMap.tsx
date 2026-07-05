'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface MapDivision {
  id: string;
  title: string;
  chapters: number[];
}

interface Props {
  label: string;
  divisions: MapDivision[];
  basePath: string;
  currentChapter: number;
  currentDivisionId: string;
}

/**
 * The canonical reference pill ("Acts 21") expanded into a map of the whole
 * book: every division with its canonical chapter numbers, current position
 * in gold, every number a jump link. Click/tap toggles; hover opens on
 * desktop; Esc or outside click closes.
 */
export default function BookMap({
  label,
  divisions,
  basePath,
  currentChapter,
  currentDivisionId,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (divisions.length === 0) {
    return (
      <span className="font-sans text-[13px] font-semibold text-blue-ref bg-[rgb(var(--blue-ref)/0.12)] px-2.5 py-1 rounded-full">
        {label}
      </span>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Show book map"
        className="font-sans text-[13px] font-semibold text-blue-ref bg-[rgb(var(--blue-ref)/0.12)] px-2.5 py-1 rounded-full cursor-pointer"
      >
        {label}
      </button>

      {open && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="w-72 max-h-96 overflow-y-auto bg-surface border border-hairline rounded-xl shadow-xl p-4 space-y-3 text-left">
            {divisions.map((division) => {
              const isCurrentDivision = division.id === currentDivisionId;
              const title = division.title
                .replace('The Book of ', '')
                .replace(/^The /, '');
              return (
                <div key={division.id}>
                  <div
                    className={`font-sans text-[10px] tracking-[0.16em] uppercase font-bold mb-1 ${
                      isCurrentDivision ? 'text-gold-ink' : 'text-faint'
                    }`}
                  >
                    {title}
                  </div>
                  <div className="flex flex-wrap gap-x-2.5 gap-y-1 font-serif text-[15px] leading-none">
                    {division.chapters.map((chapter) => {
                      const isCurrent =
                        isCurrentDivision && chapter === currentChapter;
                      return (
                        <Link
                          key={chapter}
                          href={`${basePath}/${division.id}/${chapter}`}
                          onClick={() => setOpen(false)}
                          className={
                            isCurrent
                              ? 'text-gold font-bold'
                              : 'text-muted hover:text-ink transition-colors'
                          }
                        >
                          {chapter}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
