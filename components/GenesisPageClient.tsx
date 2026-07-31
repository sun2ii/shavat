'use client';

import { useState } from 'react';
import { Verse as VerseType } from '@/lib/types';
import { GenesisBook } from '@/lib/types';
import ChapterNavBook from './ChapterNavBook';
import type { Section } from '@/lib/sections';
import BookReader from './BookReader';

interface Props {
  verses: VerseType[];
  book: GenesisBook;
  currentChapter: number;
  chapterSummary?: string;
  sections?: Section[];
}

export default function GenesisPageClient({ verses, book, currentChapter, chapterSummary, sections }: Props) {
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
      <BookReader verses={verses} sections={sections} />
    </main>
  );
}
