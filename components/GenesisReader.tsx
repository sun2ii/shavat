'use client';

import { Verse as VerseType } from '@/lib/types';
import Verse from './Verse';

interface Props {
  verses: VerseType[];
}

export default function GenesisReader({ verses }: Props) {
  return (
    <div className="max-w-none">
      <div className="text-[rgb(var(--text-primary))] text-lg leading-relaxed">
        {verses.map((verse) => (
          <Verse key={verse.verse} verse={verse} />
        ))}
      </div>
    </div>
  );
}
