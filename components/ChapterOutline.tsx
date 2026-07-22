'use client';

import { getChapterTheme } from '@/lib/chapter-themes';

interface Section {
  day: string;
  verseRange: [number, number];
}

interface Props {
  sections: Section[];
  book?: string;
  chapter?: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Thematic section outline, rendered as horizontally-scrolling chips.
 * First chip reads as "active"; all jump to their section on click.
 * Chapters with a theme are introduced by it above the chips.
 */
export default function ChapterOutline({ sections, book, chapter }: Props) {
  const scrollToSection = (sectionTitle: string) => {
    const id = slugify(sectionTitle);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!sections || sections.length === 0) {
    return null;
  }

  const theme = getChapterTheme(book, chapter);

  const chips = sections.map((section, i) => (
    <button
      key={section.day}
      onClick={() => scrollToSection(section.day)}
      className={`font-sans text-xs rounded-full px-3.5 py-1.5 transition-colors ${
        i === 0
          ? 'bg-ink text-paper font-semibold'
          : 'bg-paper-2 text-muted hover:text-ink font-medium'
      }`}
    >
      {section.day}
    </button>
  ));

  if (!theme) {
    return <nav className="flex flex-wrap justify-center gap-2 mb-10">{chips}</nav>;
  }

  return (
    <div className="mb-10 text-center">
      <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
        Chapter {chapter}
      </p>

      <h2 className="font-serif text-2xl md:text-3xl text-ink mb-5">{theme}</h2>

      <nav className="flex flex-wrap justify-center gap-2">{chips}</nav>
    </div>
  );
}
