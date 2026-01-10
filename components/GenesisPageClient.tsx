'use client';

import { useState } from 'react';
import { Verse as VerseType } from '@/lib/types';
import { GenesisBook } from '@/lib/types';
import ChapterNavBook from './ChapterNavBook';
import GenesisReader from './GenesisReader';

interface Props {
  verses: VerseType[];
  book: GenesisBook;
  currentChapter: number;
  chapterSummary?: string;
}

export default function GenesisPageClient({ verses, book, currentChapter, chapterSummary }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyChapter = async () => {
    const chapterText = verses.map(v => `${v.verse}. ${v.text}`).join('\n\n');
    await navigator.clipboard.writeText(chapterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main>
      <ChapterNavBook
        currentChapter={currentChapter}
        book={book}
        onCopyChapter={handleCopyChapter}
        copied={copied}
        chapterSummary={chapterSummary}
      />
      <GenesisReader verses={verses} />
    </main>
  );
}
