'use client';

import { Verse as VerseType, BookDivision } from '@/lib/types';
import ChapterNav from './ChapterNav';
import BookReader from './BookReader';
import type { Section } from '@/lib/sections';

interface Props {
  bookSlug: string;
  bookName: string;
  bookAbbreviation: string;
  verses: VerseType[];
  division: BookDivision;
  currentChapter: number;
  chapterSummary?: string;
  sections?: Section[];
}

export default function BookPageClient({
  bookSlug,
  bookName,
  bookAbbreviation,
  verses,
  division,
  currentChapter,
  chapterSummary,
  sections
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
      <BookReader verses={verses} book={bookSlug} chapter={currentChapter} sections={sections} />
    </main>
  );
}
