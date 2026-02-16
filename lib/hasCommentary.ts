export function hasCommentary(book: string, chapter: number): boolean {
  // Genesis chapters 1-50 have commentary
  if (book === 'genesis' && chapter >= 1 && chapter <= 50) {
    return true;
  }

  // Mark chapters 1-16 have commentary
  if (book === 'mark' && chapter >= 1 && chapter <= 16) {
    return true;
  }

  return false;
}

export function divisionHasCommentary(book: string, chapters: number[]): boolean {
  // Check if any chapter in the division has commentary
  return chapters.some(chapter => hasCommentary(book, chapter));
}
