export function hasCommentary(book: string, chapter: number): boolean {
  // Genesis chapters 1-50 have commentary
  if (book === 'genesis' && chapter >= 1 && chapter <= 50) {
    return true;
  }

  // Mark chapters 1-16 have commentary
  if (book === 'mark' && chapter >= 1 && chapter <= 16) {
    return true;
  }

  // John chapters 1-21 have commentary
  if (book === 'john' && chapter >= 1 && chapter <= 21) {
    return true;
  }

  // Hebrews chapters 1-13 have commentary
  if (book === 'hebrews' && chapter >= 1 && chapter <= 13) {
    return true;
  }

  // James chapters 1-5 have commentary
  if (book === 'james' && chapter >= 1 && chapter <= 5) {
    return true;
  }

  // 1 Peter chapters 1-5 have commentary
  if (book === '1-peter' && chapter >= 1 && chapter <= 5) {
    return true;
  }

  // 2 Peter chapters 1-3 have commentary
  if (book === '2-peter' && chapter >= 1 && chapter <= 3) {
    return true;
  }

  // 1 John chapters 1-5 have commentary
  if (book === '1-john' && chapter >= 1 && chapter <= 5) {
    return true;
  }

  // 2 John chapter 1 has commentary
  if (book === '2-john' && chapter === 1) {
    return true;
  }

  // 3 John chapter 1 has commentary
  if (book === '3-john' && chapter === 1) {
    return true;
  }

  // Jude chapter 1 has commentary
  if (book === 'jude' && chapter === 1) {
    return true;
  }

  // Romans chapters 1-16 have commentary
  if (book === 'romans' && chapter >= 1 && chapter <= 16) {
    return true;
  }

  return false;
}

export function divisionHasCommentary(book: string, chapters: number[]): boolean {
  // Check if any chapter in the division has commentary
  return chapters.some(chapter => hasCommentary(book, chapter));
}
