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

  const highlightsByChapter = highlights.reduce((acc, highlight) => {
    if (!acc[highlight.chapter]) acc[highlight.chapter] = [];
    acc[highlight.chapter].push(highlight);
    return acc;
  }, {} as Record<number, Highlight[]>);

  const chapters = Object.keys(highlightsByChapter)
    .map(Number)
    .sort((a, b) => a - b);

  if (highlights.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-serif italic text-muted text-xl mb-4">No highlights yet.</p>
        <Link
          href="/genesis/creation/1"
          className="font-sans text-sm text-brand hover:underline inline-block"
        >
          Start reading →
        </Link>
      </div>
    );
  }

  return (
    <main>
      <header className="mb-8">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-2">
          Your Reading
        </p>
        <div className="flex items-baseline gap-4">
          <h1 className="font-serif font-bold text-5xl text-ink leading-none">Highlights</h1>
          <span className="font-sans text-sm text-faint">
            {highlights.length} saved · {chapters.length}{' '}
            {chapters.length === 1 ? 'chapter' : 'chapters'}
          </span>
        </div>
      </header>

      <div className="space-y-10">
        {chapters.map((chapterNum) => (
          <section key={chapterNum}>
            <h2 className="font-serif font-bold text-2xl text-ink pb-3 border-b-2 border-ink mb-5">
              <Link href={`/genesis/${chapterNum}`} className="hover:text-gold transition-colors">
                Genesis {chapterNum}
              </Link>
            </h2>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {highlightsByChapter[chapterNum].map((highlight) => {
                const isYellow = highlight.color === 'yellow';
                return (
                  <div
                    key={highlight.id}
                    className="flex bg-surface border border-hairline rounded-xl overflow-hidden"
                  >
                    <span
                      className="w-[5px] shrink-0"
                      style={{ background: isYellow ? '#e5c65a' : '#7ba0cf' }}
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-center justify-between mb-2.5">
                        <Link
                          href={`/genesis/${highlight.chapter}`}
                          className={`font-sans text-[11px] font-bold tracking-[0.12em] uppercase transition-colors hover:opacity-80 ${
                            isYellow ? 'text-gold-ink' : 'text-blue-ref'
                          }`}
                        >
                          {highlight.verseStart === highlight.verseEnd
                            ? `Verse ${highlight.verseStart}`
                            : `Verses ${highlight.verseStart}–${highlight.verseEnd}`}
                        </Link>
                        <button
                          onClick={() => handleDelete(highlight.id)}
                          className="font-sans text-xs text-faint hover:text-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>

                      {highlight.note && (
                        <p className="font-serif text-lg leading-snug text-ink">{highlight.note}</p>
                      )}

                      <p className="mt-2 font-sans text-xs text-faint">
                        {new Date(highlight.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
