import Link from 'next/link';
import { SectionData } from '@/lib/extractSections';
import { readingPath } from '@/lib/routes';

interface Props {
  bookSlug: string;
  chapter: number;
  sections: SectionData[];
}

export default function ChapterSection({ bookSlug, chapter, sections }: Props) {
  return (
    <div className="mb-4 ml-8">
      <div className="mb-2">
        <Link
          href={readingPath(bookSlug, chapter)}
          className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Chapter {chapter}
        </Link>
      </div>
      <ul className="space-y-1 ml-4">
        {sections.map((section, idx) => (
          <li key={idx}>
            <Link
              href={`${readingPath(bookSlug, chapter)}#verse-${section.verseRange[0]}`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-baseline gap-2"
            >
              <span className="text-gray-400 dark:text-gray-600 text-xs">
                {section.verseRange[0]}-{section.verseRange[1]}
              </span>
              <span>{section.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
