'use client';

interface Section {
  day: string;
  verseRange: [number, number];
}

interface Props {
  sections: Section[];
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
 */
export default function ChapterOutline({ sections }: Props) {
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

  return (
    <nav className="flex flex-wrap justify-center gap-2 mb-10">
      {sections.map((section, i) => (
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
      ))}
    </nav>
  );
}
