'use client';

import { useState } from 'react';

interface Section {
  id: string;
  title: string;
  chapters: number[];
  completed: number[];
}

interface BookProgress {
  book: string;
  slug: string;
  sections: Section[];
}

interface ReadingProgressProps {
  books: BookProgress[];
}

export default function ReadingProgress({ books }: ReadingProgressProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleBook = (bookName: string) => {
    setCollapsed((prev) => ({ ...prev, [bookName]: !prev[bookName] }));
  };

  return (
    <div className="space-y-4">
      {books.map((book) => {
        const completedSections = book.sections.filter(
          (s) => s.completed.length === s.chapters.length
        ).length;
        const totalChapters = book.sections.reduce((sum, s) => sum + s.chapters.length, 0);
        const completedChapters = book.sections.reduce((sum, s) => sum + s.completed.length, 0);
        const isComplete = completedChapters === totalChapters;
        const isCollapsed = collapsed[book.book] ?? false;

        return (
          <div
            key={book.book}
            className="bg-[rgb(var(--surface))] rounded-lg border border-hairline overflow-hidden"
          >
            {/* Book header - clickable to collapse */}
            <button
              onClick={() => toggleBook(book.book)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-[rgb(var(--bg-secondary))] transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* Collapse chevron */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`text-faint transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
                >
                  <path d="M4 2 L8 6 L4 10" />
                </svg>
                {/* Checkmark */}
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                    isComplete
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-hairline'
                  }`}
                >
                  {isComplete && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6 L5 9 L10 3" />
                    </svg>
                  )}
                </div>
                <span className="font-playfair font-semibold text-[rgb(var(--text-primary))]">
                  {book.book}
                </span>
              </div>
              <span className="font-sans text-xs text-faint">
                {completedSections} / {book.sections.length}
              </span>
            </button>

            {/* Sections - collapsible */}
            {!isCollapsed && (
              <div className="divide-y divide-hairline border-t border-hairline">
                {book.sections.map((section) => {
                  const sectionComplete = section.completed.length === section.chapters.length;
                  const sectionInProgress = section.completed.length > 0 && !sectionComplete;
                  const chapterRange =
                    section.chapters.length === 1
                      ? section.chapters[0]
                      : `${section.chapters[0]}–${section.chapters[section.chapters.length - 1]}`;

                  return (
                    <div
                      key={section.id}
                      className={`px-4 py-2.5 flex items-center gap-3 ${
                        sectionComplete ? 'opacity-50' : ''
                      }`}
                    >
                      {/* Status indicator */}
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          sectionComplete
                            ? 'bg-emerald-500'
                            : sectionInProgress
                            ? 'bg-gold'
                            : 'border border-hairline'
                        }`}
                      />
                      {/* Section title */}
                      <span
                        className={`font-sans text-sm flex-1 ${
                          sectionComplete
                            ? 'text-faint line-through'
                            : 'text-[rgb(var(--text-primary))]'
                        }`}
                      >
                        {section.title}
                      </span>
                      {/* Chapter range */}
                      <span className="font-sans text-xs text-faint">{chapterRange}</span>
                      {/* Progress for in-progress sections */}
                      {sectionInProgress && (
                        <span className="font-sans text-xs text-gold-ink">
                          {section.completed.length}/{section.chapters.length}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
