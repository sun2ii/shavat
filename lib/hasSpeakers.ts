// Books with speaker/voice data in data/speakers/*.json
// Update this list when adding new speaker files.
const SPEAKER_BOOKS = new Set(['amos', 'jonah', 'hosea', '2-kings']);

export function hasSpeakers(book: string): boolean {
  return SPEAKER_BOOKS.has(book);
}

export function divisionHasSpeakers(book: string, _chapters: number[]): boolean {
  // Speaker data is book-level, not chapter-level, so chapters param is unused
  // but kept for API consistency with divisionHasCommentary/divisionHasWritings
  return hasSpeakers(book);
}
