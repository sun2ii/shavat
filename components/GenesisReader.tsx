'use client';

import { useRef, useState, useEffect } from 'react';
import { Verse as VerseType, Highlight } from '@/lib/types';
import { storage } from '@/lib/storage';
import Verse from './Verse';
import HighlightToolbar from './HighlightToolbar';

interface Props {
  chapter: number;
  verses: VerseType[];
}

export default function GenesisReader({ chapter, verses }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  // Load highlights for current chapter
  useEffect(() => {
    const allHighlights = storage.getHighlights();
    const chapterHighlights = allHighlights.filter((h) => h.chapter === chapter);
    setHighlights(chapterHighlights);
  }, [chapter]);

  // Clear selection when clicking outside the verse container
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelection(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handleVerseClick = (verseNum: number, isShiftClick: boolean) => {
    if (isShiftClick && selection) {
      // Shift+click: extend selection
      setSelection({
        start: Math.min(selection.start, verseNum),
        end: Math.max(selection.start, verseNum),
      });
    } else if (selection && selection.start === verseNum && selection.end === verseNum) {
      // Click same verse again: deselect it
      setSelection(null);
    } else {
      // Click new verse: select it
      setSelection({ start: verseNum, end: verseNum });
    }
  };

  const handleVerseDoubleClick = (verseNum: number) => {
    // Prevent double-click from interfering
    return;
  };

  const handleHighlight = (color: 'yellow' | 'blue', note?: string) => {
    if (!selection) return;

    const newHighlight = storage.addHighlight({
      book: 'Genesis',
      chapter,
      verseStart: selection.start,
      verseEnd: selection.end,
      color,
      note,
    });

    if (newHighlight) {
      setHighlights([...highlights, newHighlight]);
    }

    setSelection(null);
  };

  const clearSelection = () => setSelection(null);

  // Build verse → highlight map for efficient lookup
  const highlightMap = new Map<number, Highlight>();
  highlights.forEach((h) => {
    for (let v = h.verseStart; v <= h.verseEnd; v++) {
      highlightMap.set(v, h);
    }
  });

  return (
    <div ref={containerRef} className="max-w-none">
      <div className="text-[rgb(var(--text-primary))] text-lg leading-relaxed">
        {verses.map((verse) => (
          <Verse
            key={verse.verse}
            verse={verse}
            isSelected={
              selection
                ? verse.verse >= selection.start && verse.verse <= selection.end
                : false
            }
            highlight={highlightMap.get(verse.verse)}
            onClick={handleVerseClick}
            onDoubleClick={handleVerseDoubleClick}
          />
        ))}
      </div>

      {selection && (
        <HighlightToolbar
          selection={selection}
          onHighlight={handleHighlight}
          onCancel={clearSelection}
        />
      )}
    </div>
  );
}
