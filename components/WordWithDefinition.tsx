'use client';

import { useState, useEffect } from 'react';
import { getDefinition, type DictionaryEntry } from '@/lib/dictionary';
import { shouldLookupWord } from '@/lib/word-tokenize';

interface Props {
  word: string;
}

export default function WordWithDefinition({ word }: Props) {
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Check if this word should have a definition lookup
  const shouldLookup = shouldLookupWord(word);

  // Load definition on mount (if applicable)
  useEffect(() => {
    if (!shouldLookup || loaded) return;

    const load = async () => {
      const data = await getDefinition(word);
      setEntry(data);
      setLoaded(true);
    };

    load();
  }, [word, shouldLookup, loaded]);

  // Build tooltip
  const tooltip = entry
    ? `${entry.definition}${entry.partOfSpeech ? ` (${entry.partOfSpeech})` : ''}`
    : undefined;

  // If no lookup needed or no entry found, render plain text
  if (!shouldLookup) {
    return <>{word}</>;
  }

  return (
    <span
      className={entry ? 'cursor-help' : undefined}
      title={tooltip}
    >
      {word}
    </span>
  );
}
