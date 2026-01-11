'use client';

import { useState } from 'react';
import { Verse as VerseType, BookDivision } from '@/lib/types';
import ChapterNav from './ChapterNav';
import GenesisReader from './GenesisReader';

interface Props {
  bookSlug: string;
  bookName: string;
  bookAbbreviation: string;
  verses: VerseType[];
  division: BookDivision;
  currentChapter: number;
  chapterSummary?: string;
}

export default function BookPageClient({
  bookSlug,
  bookName,
  bookAbbreviation,
  verses,
  division,
  currentChapter,
  chapterSummary
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyChapter = async () => {
    const chapterText = verses.map(v => `${v.verse}. ${v.text}`).join('\n\n');
    await navigator.clipboard.writeText(chapterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main>
      <ChapterNav
        bookSlug={bookSlug}
        bookName={bookName}
        bookAbbreviation={bookAbbreviation}
        currentChapter={currentChapter}
        division={division}
        onCopyChapter={handleCopyChapter}
        copied={copied}
        chapterSummary={chapterSummary}
      />
      <GenesisReader verses={verses} />
    </main>
  );
}
