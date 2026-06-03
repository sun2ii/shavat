'use client';

import { useState } from 'react';
import ChapterSection from './ChapterSection';
import { SectionData } from '@/lib/extractSections';

interface Props {
  bookName: string;
  bookSlug: string;
  chapterSections: { [chapter: number]: SectionData[] };
}

export default function NTBookSection({ bookName, bookSlug, chapterSections }: Props) {
  const [expanded, setExpanded] = useState(true);
  const chapterCount = Object.keys(chapterSections).length;

  return (
    <div className="mb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
      >
        <span className="text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors text-lg">
          {expanded ? '▼' : '▶'}
        </span>
        <span className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {bookName}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-500">
          ({chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'})
        </span>
      </button>

      {expanded && (
        <div className="mt-2 ml-2">
          {Object.keys(chapterSections)
            .map(Number)
            .sort((a, b) => a - b)
            .map((chapter) => (
              <ChapterSection
                key={chapter}
                bookSlug={bookSlug}
                chapter={chapter}
                sections={chapterSections[chapter]}
              />
            ))}
        </div>
      )}
    </div>
  );
}
