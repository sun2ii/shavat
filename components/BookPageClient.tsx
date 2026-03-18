'use client';

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
  return (
    <main>
      <ChapterNav
        bookSlug={bookSlug}
        bookName={bookName}
        bookAbbreviation={bookAbbreviation}
        currentChapter={currentChapter}
        division={division}
        chapterSummary={chapterSummary}
      />
      <GenesisReader verses={verses} book={bookSlug} chapter={currentChapter} />
    </main>
  );
}
