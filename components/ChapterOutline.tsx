'use client';

import { getChapterTheme } from '@/lib/chapter-themes';

interface Section {
  title: string;
  verseRange: [number, number];
}

interface Props {
  sections: Section[];
  book?: string;
  chapter?: number;
}

/**
 * The chapter's header: its number and its theme. Navigation lives in the
 * folded section cards below — every control here said the same thing twice.
 */
export default function ChapterOutline({ sections, book, chapter }: Props) {
  if (!sections || sections.length === 0) {
    return null;
  }

  const theme = getChapterTheme(book, chapter);

  if (!theme) {
    return null;
  }

  return (
    <div className="mb-10 text-center">
      <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
        Chapter {chapter}
      </p>

      <h2 className="font-serif text-2xl md:text-3xl text-ink">{theme}</h2>
    </div>
  );
}
