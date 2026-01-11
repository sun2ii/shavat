import { BookDivision, BookMetadata } from './types';

// Cache for loaded metadata to avoid repeated imports
const metadataCache = new Map<string, BookMetadata | null>();

/**
 * Load metadata for a specific book
 * Returns null if metadata file doesn't exist or is empty
 */
export async function loadBookMetadata(bookSlug: string): Promise<BookMetadata | null> {
  // Check cache first
  if (metadataCache.has(bookSlug)) {
    return metadataCache.get(bookSlug)!;
  }

  try {
    // Dynamically import the metadata file
    const metadata = await import(`./${bookSlug}-metadata.json`);

    // Check if metadata has divisions
    if (!metadata.divisions || metadata.divisions.length === 0) {
      metadataCache.set(bookSlug, null);
      return null;
    }

    const bookMetadata: BookMetadata = {
      divisions: metadata.divisions,
      chapterSummaries: metadata.chapterSummaries || {}
    };

    metadataCache.set(bookSlug, bookMetadata);
    return bookMetadata;
  } catch (error) {
    // Metadata file doesn't exist or can't be loaded
    metadataCache.set(bookSlug, null);
    return null;
  }
}

/**
 * Synchronous version for use in Server Components
 * Note: This requires metadata to be pre-loaded or imported synchronously
 */
export function getBookMetadataSync(bookSlug: string): BookMetadata | null {
  try {
    // For synchronous access, we need to use require in Node.js context
    // This works in Next.js Server Components
    const metadata = require(`./${bookSlug}-metadata.json`);

    if (!metadata.divisions || metadata.divisions.length === 0) {
      return null;
    }

    return {
      divisions: metadata.divisions,
      chapterSummaries: metadata.chapterSummaries || {}
    };
  } catch (error) {
    return null;
  }
}

/**
 * Get all divisions for a book
 */
export function getAllDivisions(bookSlug: string): BookDivision[] {
  const metadata = getBookMetadataSync(bookSlug);
  return metadata?.divisions || [];
}

/**
 * Get a specific division by its slug ID
 */
export function getDivisionById(bookSlug: string, divisionId: string): BookDivision | undefined {
  const divisions = getAllDivisions(bookSlug);
  return divisions.find(div => div.id === divisionId);
}

/**
 * Get the division that contains a specific chapter
 */
export function getDivisionByChapter(bookSlug: string, chapter: number): BookDivision | undefined {
  const divisions = getAllDivisions(bookSlug);
  return divisions.find(div => div.chapters.includes(chapter));
}

/**
 * Get the first chapter of a division
 */
export function getFirstChapter(bookSlug: string, divisionId: string): number | undefined {
  const division = getDivisionById(bookSlug, divisionId);
  return division?.chapters[0];
}

/**
 * Get the last chapter of a division
 */
export function getLastChapter(bookSlug: string, divisionId: string): number | undefined {
  const division = getDivisionById(bookSlug, divisionId);
  return division?.chapters[division.chapters.length - 1];
}

/**
 * Check if a chapter is the first in its division
 */
export function isFirstChapterInDivision(bookSlug: string, chapter: number): boolean {
  const division = getDivisionByChapter(bookSlug, chapter);
  return division?.chapters[0] === chapter;
}

/**
 * Check if a chapter is the last in its division
 */
export function isLastChapterInDivision(bookSlug: string, chapter: number): boolean {
  const division = getDivisionByChapter(bookSlug, chapter);
  return division?.chapters[division.chapters.length - 1] === chapter;
}

/**
 * Get chapter position within its division (1-indexed)
 */
export function getChapterPositionInDivision(
  bookSlug: string,
  chapter: number
): { position: number; total: number } | undefined {
  const division = getDivisionByChapter(bookSlug, chapter);
  if (!division) return undefined;
  const position = division.chapters.indexOf(chapter) + 1;
  return { position, total: division.chapters.length };
}

/**
 * Get the next division in the sequence
 */
export function getNextDivision(bookSlug: string, divisionId: string): BookDivision | undefined {
  const divisions = getAllDivisions(bookSlug);
  const currentIndex = divisions.findIndex(div => div.id === divisionId);
  if (currentIndex === -1 || currentIndex === divisions.length - 1) return undefined;
  return divisions[currentIndex + 1];
}

/**
 * Get the previous division in the sequence
 */
export function getPreviousDivision(bookSlug: string, divisionId: string): BookDivision | undefined {
  const divisions = getAllDivisions(bookSlug);
  const currentIndex = divisions.findIndex(div => div.id === divisionId);
  if (currentIndex === -1 || currentIndex === 0) return undefined;
  return divisions[currentIndex - 1];
}

/**
 * Get the summary for a specific chapter
 */
export function getChapterSummary(bookSlug: string, chapter: number): string | undefined {
  const metadata = getBookMetadataSync(bookSlug);
  return metadata?.chapterSummaries?.[chapter.toString()];
}

/**
 * Check if a book has metadata with divisions
 */
export function hasMetadata(bookSlug: string): boolean {
  const metadata = getBookMetadataSync(bookSlug);
  return metadata !== null && metadata.divisions.length > 0;
}
