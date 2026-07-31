import manifest from '../data/commentary-manifest.json';

// The manifest is generated at build time (scripts/generate-commentary-manifest.mjs,
// wired as `prebuild`) from the files in lib/commentary/ — it cannot drift
// from what is actually on disk. Replaced 138 lines of hand-maintained ranges.

const commentaryChapters = manifest as Record<string, number[]>;

export function hasCommentary(book: string, chapter: number): boolean {
  return commentaryChapters[book]?.includes(chapter) ?? false;
}

export function divisionHasCommentary(book: string, chapters: number[]): boolean {
  return chapters.some(chapter => hasCommentary(book, chapter));
}
