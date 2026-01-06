'use client';

import { Highlight } from '@/lib/types';
import { storage } from '@/lib/storage';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HighlightsList() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    setHighlights(storage.getHighlights());
  }, []);

  const handleDelete = (id: string) => {
    storage.deleteHighlight(id);
    setHighlights(storage.getHighlights());
  };

  // Group highlights by chapter
  const highlightsByChapter = highlights.reduce((acc, highlight) => {
    if (!acc[highlight.chapter]) {
      acc[highlight.chapter] = [];
    }
    acc[highlight.chapter].push(highlight);
    return acc;
  }, {} as Record<number, Highlight[]>);

  const chapters = Object.keys(highlightsByChapter)
    .map(Number)
    .sort((a, b) => a - b);

  if (highlights.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[rgb(var(--text-secondary))] text-lg mb-4">No highlights yet.</p>
        <Link href="/genesis/1" className="text-blue-600 hover:underline inline-block">
          Start reading
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {chapters.map((chapterNum) => (
        <div key={chapterNum} className="space-y-4">
          <h2 className="text-xl font-light text-[rgb(var(--text-primary))] border-b border-[rgb(var(--border))] pb-3">
            <Link href={`/genesis/${chapterNum}`} className="hover:text-blue-600 transition-colors">
              Genesis {chapterNum}
            </Link>
          </h2>

          <div className="space-y-5">
            {highlightsByChapter[chapterNum].map((highlight) => (
              <div
                key={highlight.id}
                className={`p-4 rounded-lg border border-[rgb(var(--border))] ${
                  highlight.color === 'yellow'
                    ? 'bg-[rgb(var(--highlight-yellow))]'
                    : 'bg-[rgb(var(--highlight-blue))]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Link
                      href={`/genesis/${highlight.chapter}`}
                      className="text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                    >
                      {highlight.verseStart === highlight.verseEnd
                        ? `Verse ${highlight.verseStart}`
                        : `Verses ${highlight.verseStart}–${highlight.verseEnd}`}
                    </Link>

                    {highlight.note && (
                      <p className="mt-2 text-[rgb(var(--text-primary))] leading-relaxed">{highlight.note}</p>
                    )}

                    <p className="mt-2 text-xs text-[rgb(var(--text-tertiary))]">
                      {new Date(highlight.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(highlight.id)}
                    className="text-[rgb(var(--text-tertiary))] hover:text-red-600 text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
