import markMetadata from './mark-metadata.json';

export interface MarkDivision {
  id: string;
  title: string;
  chapters: number[];
  theme: string;
  summary: string;
  contentType: string;
}

interface MarkMetadata {
  divisions: MarkDivision[];
  chapterSummaries: Record<string, string>;
}

const metadata = markMetadata as MarkMetadata;

/**
 * Get all Mark divisions (story arcs)
 */
export function getAllDivisions(): MarkDivision[] {
  return metadata.divisions;
}

/**
 * Get a specific division by its ID
 */
export function getDivisionById(id: string): MarkDivision | undefined {
  return metadata.divisions.find(division => division.id === id);
}

/**
 * Get the division that contains a specific chapter
 */
export function getDivisionByChapter(chapter: number): MarkDivision | undefined {
  return metadata.divisions.find(division => division.chapters.includes(chapter));
}

/**
 * Get the first chapter of a division
 */
export function getFirstChapter(divisionId: string): number | undefined {
  const division = getDivisionById(divisionId);
  return division?.chapters[0];
}

/**
 * Get the last chapter of a division
 */
export function getLastChapter(divisionId: string): number | undefined {
  const division = getDivisionById(divisionId);
  return division?.chapters[division.chapters.length - 1];
}

/**
 * Check if a chapter is the first in its division
 */
export function isFirstChapterInDivision(chapter: number): boolean {
  const division = getDivisionByChapter(chapter);
  return division?.chapters[0] === chapter;
}

/**
 * Check if a chapter is the last in its division
 */
export function isLastChapterInDivision(chapter: number): boolean {
  const division = getDivisionByChapter(chapter);
  return division?.chapters[division.chapters.length - 1] === chapter;
}

/**
 * Get chapter position within its division (1-indexed)
 */
export function getChapterPositionInDivision(chapter: number): { position: number; total: number } | undefined {
  const division = getDivisionByChapter(chapter);
  if (!division) return undefined;
  const position = division.chapters.indexOf(chapter) + 1;
  return { position, total: division.chapters.length };
}

/**
 * Get the next division in the sequence
 */
export function getNextDivision(divisionId: string): MarkDivision | undefined {
  const currentIndex = metadata.divisions.findIndex(division => division.id === divisionId);
  if (currentIndex === -1 || currentIndex === metadata.divisions.length - 1) return undefined;
  return metadata.divisions[currentIndex + 1];
}

/**
 * Get the previous division in the sequence
 */
export function getPreviousDivision(divisionId: string): MarkDivision | undefined {
  const currentIndex = metadata.divisions.findIndex(division => division.id === divisionId);
  if (currentIndex === -1 || currentIndex === 0) return undefined;
  return metadata.divisions[currentIndex - 1];
}

/**
 * Get the summary for a specific Mark chapter
 */
export function getChapterSummary(chapterNum: number): string | undefined {
  return metadata.chapterSummaries?.[chapterNum.toString()];
}
