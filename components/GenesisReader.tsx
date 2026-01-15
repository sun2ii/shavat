'use client';

import { useState, useEffect } from 'react';
import { Verse as VerseType } from '@/lib/types';
import Verse from './Verse';

interface Props {
  verses: VerseType[];
}

export default function GenesisReader({ verses }: Props) {
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());

  const toggleVerse = (verseNum: number) => {
    setSelectedVerses(prev => {
      const next = new Set(prev);
      if (next.has(verseNum)) {
        next.delete(verseNum);
      } else {
        next.add(verseNum);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleCopy = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'c' && selectedVerses.size > 0) {
        const selectedText = verses
          .filter(v => selectedVerses.has(v.verse))
          .map(v => `${v.verse}. ${v.text}`)
          .join('\n\n');

        if (selectedText) {
          navigator.clipboard.writeText(selectedText);
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleCopy);
    return () => window.removeEventListener('keydown', handleCopy);
  }, [selectedVerses, verses]);

  return (
    <div className="max-w-none">
      <div className="text-[rgb(var(--text-primary))] text-lg leading-relaxed">
        {verses.map((verse) => (
          <Verse
            key={verse.verse}
            verse={verse}
            isSelected={selectedVerses.has(verse.verse)}
            onToggle={toggleVerse}
          />
        ))}
      </div>
    </div>
  );
}
