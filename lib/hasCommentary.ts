export function hasCommentary(book: string, chapter: number): boolean {
  // Genesis chapters 1-50 have commentary
  if (book === 'genesis' && chapter >= 1 && chapter <= 50) {
    return true;
  }

  // Matthew chapters 1-28 have commentary
  if (book === 'matthew' && chapter >= 1 && chapter <= 28) {
    return true;
  }

  // Mark chapters 1-16 have commentary
  if (book === 'mark' && chapter >= 1 && chapter <= 16) {
    return true;
  }

  // Luke chapters 1-24 have commentary
  if (book === 'luke' && chapter >= 1 && chapter <= 24) {
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

  // 1 Corinthians chapters 1-16 have commentary
  if (book === '1-corinthians' && chapter >= 1 && chapter <= 16) {
    return true;
  }

  // 2 Corinthians chapters 1-13 have commentary
  if (book === '2-corinthians' && chapter >= 1 && chapter <= 13) {
    return true;
  }

  // Titus chapters 1-3 have commentary
  if (book === 'titus' && chapter >= 1 && chapter <= 3) {
    return true;
  }

  // Philemon chapter 1 has commentary
  if (book === 'philemon' && chapter === 1) {
    return true;
  }

  // Galatians chapters 1-6 have commentary
  if (book === 'galatians' && chapter >= 1 && chapter <= 6) {
    return true;
  }

  // Ephesians chapters 1-6 have commentary
  if (book === 'ephesians' && chapter >= 1 && chapter <= 6) {
    return true;
  }

  // Philippians chapters 1-4 have commentary
  if (book === 'philippians' && chapter >= 1 && chapter <= 4) {
    return true;
  }

  // Colossians chapters 1-4 have commentary
  if (book === 'colossians' && chapter >= 1 && chapter <= 4) {
    return true;
  }

  // 1 Thessalonians chapters 1-5 have commentary
  if (book === '1-thessalonians' && chapter >= 1 && chapter <= 5) {
    return true;
  }

  // 2 Thessalonians chapters 1-3 have commentary
  if (book === '2-thessalonians' && chapter >= 1 && chapter <= 3) {
    return true;
  }

  // 1 Timothy chapters 1-6 have commentary
  if (book === '1-timothy' && chapter >= 1 && chapter <= 6) {
    return true;
  }

  // 2 Timothy chapters 1-4 have commentary
  if (book === '2-timothy' && chapter >= 1 && chapter <= 4) {
    return true;
  }

  return false;
}

export function divisionHasCommentary(book: string, chapters: number[]): boolean {
  // Check if any chapter in the division has commentary
  return chapters.some(chapter => hasCommentary(book, chapter));
}
