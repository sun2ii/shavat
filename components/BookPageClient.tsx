'use client';

import { Verse as VerseType, BookDivision } from '@/lib/types';
import ChapterNav from './ChapterNav';
import BookReader from './BookReader';
import type { Section } from '@/lib/sections';
import { getNextDivision, getPreviousDivision } from '@/lib/book-metadata-utils';

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
  const chapterIndex = division.chapters.indexOf(currentChapter);

  const hasPrevInDivision = chapterIndex > 0;
  const hasNextInDivision = chapterIndex < division.chapters.length - 1;
  const prevChapterInDivision = hasPrevInDivision ? division.chapters[chapterIndex - 1] : null;
  const nextChapterInDivision = hasNextInDivision ? division.chapters[chapterIndex + 1] : null;

  const nextDivision = !hasNextInDivision ? getNextDivision(bookSlug, division.id) : null;
  const prevDivision = !hasPrevInDivision ? getPreviousDivision(bookSlug, division.id) : null;

  const prevChapter = prevChapterInDivision || (prevDivision ? prevDivision.chapters[prevDivision.chapters.length - 1] : null);
  const nextChapter = nextChapterInDivision || (nextDivision ? nextDivision.chapters[0] : null);
  const prevDivisionId = hasPrevInDivision ? division.id : prevDivision?.id;
  const nextDivisionId = hasNextInDivision ? division.id : nextDivision?.id;

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
      <BookReader
        verses={verses}
        book={bookSlug}
        chapter={currentChapter}
        sections={sections}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        prevDivisionId={prevDivisionId}
        nextDivisionId={nextDivisionId}
      />
    </main>
  );
}
