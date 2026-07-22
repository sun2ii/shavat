import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getBookBySlug } from '@/lib/bible-index';
import { getBookUtils } from '@/lib/getBookUtils';
import {
  getBookMetadataSync,
  getDivisionById,
  getDivisionByChapter,
  getChapterSummary,
} from '@/lib/book-metadata-utils';
import { readingPath, resolveDivisionId, testamentPrefix, TestamentPrefix } from '@/lib/routes';
import BookPageClient from '@/components/BookPageClient';
import GenesisReader from '@/components/GenesisReader';

export interface BookReadingParams {
  book: string;
  slug?: string[];
}

export function bookReadingMetadata(book: string): Metadata {
  const bookEntry = getBookBySlug(book);

  if (!bookEntry) {
    return { title: 'Shavat' };
  }

  return {
    title: `Shavat | ${bookEntry.name}`,
    openGraph: {
      title: `Shavat | ${bookEntry.name}`,
      images: ['/shavat.png'],
    },
  };
}

/**
 * The single reading surface, mounted under /ot and /nt. `testament` is the
 * prefix the request arrived on; a book reached through the wrong one is
 * redirected to its canonical path rather than rendered twice.
 */
export default function BookReadingRoute({
  book,
  slug = [],
  testament,
}: BookReadingParams & { testament: TestamentPrefix }) {
  const bookEntry = getBookBySlug(book);
  if (!bookEntry) {
    notFound();
  }

  if (testamentPrefix(book) !== testament) {
    redirect(readingPath(book, ...slug));
  }

  // Get book utils using static imports (avoids webpack bundling hooks)
  const bookUtils = getBookUtils(book);
  if (!bookUtils) {
    notFound();
  }

  // Check if book has metadata with divisions
  const metadata = getBookMetadataSync(book);
  const hasDivisions = metadata !== null && metadata.divisions.length > 0;

  // Handle /[testament]/[book] (no chapter specified)
  if (slug.length === 0) {
    if (hasDivisions) {
      // Redirect to first division, first chapter
      const firstDivision = metadata!.divisions[0];
      redirect(readingPath(book, firstDivision.id, firstDivision.chapters[0]));
    } else {
      // Redirect to chapter 1
      redirect(readingPath(book, 1));
    }
  }

  // Handle /[testament]/[book]/[chapter] (no divisions, or direct chapter access)
  if (slug.length === 1) {
    const chapterNum = parseInt(slug[0]);

    if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > bookEntry.chapterCount) {
      redirect(readingPath(book, 1));
    }

    const verses = bookUtils.getChapter(chapterNum);
    if (!verses) {
      notFound();
    }

    // If book has divisions, redirect to division-based URL
    if (hasDivisions) {
      const division = getDivisionByChapter(book, chapterNum);
      if (division) {
        redirect(readingPath(book, division.id, chapterNum));
      }
    }

    // Fallback to simple navigation (no divisions)
    return (
      <main>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-[rgb(var(--text-primary))]">
                {bookEntry.name}
              </h1>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Chapter {chapterNum} of {bookEntry.chapterCount}
              </p>
            </div>
            <div className="flex gap-2">
              {chapterNum > 1 && (
                <a
                  href={readingPath(book, chapterNum - 1)}
                  className="px-4 py-2 text-sm border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors"
                >
                  ← Previous
                </a>
              )}
              {chapterNum < bookEntry.chapterCount && (
                <a
                  href={readingPath(book, chapterNum + 1)}
                  className="px-4 py-2 text-sm border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors"
                >
                  Next →
                </a>
              )}
            </div>
          </div>
        </div>
        <GenesisReader verses={verses} book={book} chapter={chapterNum} />
      </main>
    );
  }

  // Handle /[testament]/[book]/[division]/[chapter]
  if (slug.length === 2) {
    const [divisionSlug, chapterSlug] = slug;
    const chapterNum = parseInt(chapterSlug);

    if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > bookEntry.chapterCount) {
      redirect(readingPath(book, 1));
    }

    // Check if book has divisions
    if (!hasDivisions) {
      // No divisions, redirect to simple /[testament]/[book]/[chapter]
      redirect(readingPath(book, chapterNum));
    }

    // A division renamed since this URL was written still resolves
    const divisionId = resolveDivisionId(book, divisionSlug);
    if (divisionId !== divisionSlug) {
      redirect(readingPath(book, divisionId, chapterNum));
    }

    // Get the division
    const division = getDivisionById(book, divisionId);
    if (!division) {
      // Invalid division, try to find the right one for this chapter
      const correctDivision = getDivisionByChapter(book, chapterNum);
      if (correctDivision) {
        redirect(readingPath(book, correctDivision.id, chapterNum));
      } else {
        redirect(readingPath(book, 1));
      }
    }

    // Verify chapter is in this division
    if (!division.chapters.includes(chapterNum)) {
      // Chapter not in this division, find the correct one
      const correctDivision = getDivisionByChapter(book, chapterNum);
      if (correctDivision) {
        redirect(readingPath(book, correctDivision.id, chapterNum));
      } else {
        redirect(readingPath(book, 1));
      }
    }

    const verses = bookUtils.getChapter(chapterNum);
    if (!verses) {
      notFound();
    }

    const chapterSummary = getChapterSummary(book, chapterNum);

    return (
      <BookPageClient
        bookSlug={book}
        bookName={bookEntry.name}
        bookAbbreviation={bookEntry.abbreviation}
        verses={verses}
        division={division}
        currentChapter={chapterNum}
        chapterSummary={chapterSummary}
      />
    );
  }

  // Too many segments - redirect to chapter 1
  redirect(readingPath(book, 1));
}
