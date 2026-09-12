'use client';

import { useState, useEffect } from 'react';
import type { HebrewWord as HebrewWordType } from '@/lib/hebrew-interlinear';
import { getHebrewVerse } from '@/lib/hebrew-interlinear';
import HebrewWord from './HebrewWord';

interface Props {
  chapter: number;
  verse: number;
}

export default function HebrewLine({ chapter, verse }: Props) {
  const [words, setWords] = useState<HebrewWordType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getHebrewVerse(chapter, verse);
      setWords(data);
      setLoading(false);
    };
    load();
  }, [chapter, verse]);

  if (loading) {
    return null;
  }

  if (!words || words.length === 0) {
    return null;
  }

  return (
    <div
      className="mt-1 ml-7 font-serif text-lg text-muted leading-relaxed"
      style={{ direction: 'rtl' }}
    >
      {words.map((word, i) => (
        <span key={word.id || i}>
          <HebrewWord word={word} />
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </div>
  );
}
