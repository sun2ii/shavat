'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLastRoute } from '@/lib/routePersistence';
import { getBookBySlug } from '@/lib/bible-index';

export interface ReadingTarget {
  href: string;
  label: string;
}

// Turn a reading URL into a human label, or null if it isn't a reading URL.
//   /ot/psalms/23            -> Psalms 23
//   /psalms/lament/23        -> Psalms 23
//   /nt/mark/galilee/3       -> Mark 3
export function describeReadingPath(path: string): ReadingTarget | null {
  const segments = path.split('?')[0].split('#')[0].split('/').filter(Boolean);
  if (segments.length < 2) return null;

  const slug =
    segments[0] === 'ot' || segments[0] === 'nt' ? segments[1] : segments[0];
  const book = getBookBySlug(slug);
  if (!book) return null;

  const last = segments[segments.length - 1];
  const chapter = /^\d+$/.test(last) ? Number(last) : null;
  return { href: path, label: chapter ? `${book.name} ${chapter}` : book.name };
}

interface Props {
  /** Server-computed: the next unread chapter after the last one marked complete. */
  target: ReadingTarget | null;
  /** Category label (e.g., "Holy Bible" or "Christian Readings") */
  category?: string;
  /** Fallback href when no target */
  fallbackHref?: string;
}

export default function JumpBack({ target: serverTarget, category, fallbackHref = '/library' }: Props) {
  // The account's "next chapter" wins. Only when nothing has ever been marked
  // complete do we fall back to the last page this device visited.
  const [target, setTarget] = useState<ReadingTarget | null>(serverTarget);

  useEffect(() => {
    if (serverTarget) return;
    // Only use route persistence for Bible (no category or "Holy Bible")
    if (!category || category === 'Holy Bible') {
      const last = getLastRoute();
      const described = last ? describeReadingPath(last) : null;
      if (described) setTarget(described);
    }
  }, [serverTarget, category]);

  const fallbackLabel = category === 'Christian Readings' ? 'Readings' : 'Library';

  return (
    <div className="pl-1">
      {category && (
        <span className={`font-sans text-[10px] font-semibold uppercase tracking-[0.2em] mb-2 block ${
          category === 'Christian Readings' ? 'text-blue-400' : 'text-gold'
        }`}>
          {category}
        </span>
      )}
      <Link
        href={target?.href ?? fallbackHref}
        className="group inline-flex flex-col gap-1 transition-colors"
      >
        <span className="font-serif text-3xl md:text-4xl font-bold text-ink">
          {target?.label ?? fallbackLabel}
        </span>
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500 group-hover:text-emerald-400 transition-colors select-none animate-pulse">
          Continue reading →
        </span>
      </Link>
    </div>
  );
}
