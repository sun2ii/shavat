'use client';

import { useState, useEffect } from 'react';
import type { HebrewWord as HebrewWordType, StrongsEntry } from '@/lib/hebrew-interlinear';
import { getStrongsEntry, parseMorphology } from '@/lib/hebrew-interlinear';

interface Props {
  word: HebrewWordType;
}

export default function HebrewWord({ word }: Props) {
  const [entry, setEntry] = useState<StrongsEntry | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load Strong's data on mount
  useEffect(() => {
    if (loaded || word.strong.length === 0) return;

    const load = async () => {
      const data = await getStrongsEntry(word.strong[0]);
      setEntry(data);
      setLoaded(true);
    };

    load();
  }, [loaded, word.strong]);

  // Build tooltip text
  const buildTooltip = (): string => {
    if (!entry) return word.strong[0] || '';

    const morph = parseMorphology(word.morph);
    const parts: string[] = [];

    // Transliteration + meaning
    if (entry.transliteration) {
      parts.push(entry.transliteration);
    }

    // Short definition
    if (entry.definition) {
      // Truncate long definitions
      const def = entry.definition.length > 80
        ? entry.definition.slice(0, 77) + '...'
        : entry.definition;
      parts.push(def);
    }

    // Part of speech
    if (morph.partOfSpeech) {
      const morphStr = morph.details.length > 0
        ? `${morph.partOfSpeech} (${morph.details.slice(0, 3).join(', ')})`
        : morph.partOfSpeech;
      parts.push(morphStr);
    }

    return parts.join(' · ');
  };

  return (
    <span
      className="cursor-help hover:bg-amber-100/50 dark:hover:bg-amber-900/30 rounded px-0.5 transition-colors"
      title={buildTooltip()}
    >
      {word.surface}
    </span>
  );
}
