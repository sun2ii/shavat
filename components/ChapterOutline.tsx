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
    <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.day}
            onClick={() => scrollToSection(section.day)}
            className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
          >
            {section.day}
          </button>
        ))}
      </nav>
    </div>
  );
}
