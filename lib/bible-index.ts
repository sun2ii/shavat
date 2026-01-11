import { BibleBookEntry } from './types';

// Master index of all 66 Bible books in canonical order
export const BIBLE_INDEX: BibleBookEntry[] = [
  // OLD TESTAMENT - Pentateuch (5)
  { slug: 'genesis', name: 'Genesis', testament: 'old', category: 'pentateuch', order: 1, chapterCount: 50, abbreviation: 'Gen' },
  { slug: 'exodus', name: 'Exodus', testament: 'old', category: 'pentateuch', order: 2, chapterCount: 40, abbreviation: 'Ex' },
  { slug: 'leviticus', name: 'Leviticus', testament: 'old', category: 'pentateuch', order: 3, chapterCount: 27, abbreviation: 'Lev' },
  { slug: 'numbers', name: 'Numbers', testament: 'old', category: 'pentateuch', order: 4, chapterCount: 36, abbreviation: 'Num' },
  { slug: 'deuteronomy', name: 'Deuteronomy', testament: 'old', category: 'pentateuch', order: 5, chapterCount: 34, abbreviation: 'Deut' },

  // OLD TESTAMENT - Historical Books (12)
  { slug: 'joshua', name: 'Joshua', testament: 'old', category: 'historical', order: 6, chapterCount: 24, abbreviation: 'Josh' },
  { slug: 'judges', name: 'Judges', testament: 'old', category: 'historical', order: 7, chapterCount: 21, abbreviation: 'Judg' },
  { slug: 'ruth', name: 'Ruth', testament: 'old', category: 'historical', order: 8, chapterCount: 4, abbreviation: 'Ruth' },
  { slug: '1-samuel', name: '1 Samuel', testament: 'old', category: 'historical', order: 9, chapterCount: 31, abbreviation: '1 Sam' },
  { slug: '2-samuel', name: '2 Samuel', testament: 'old', category: 'historical', order: 10, chapterCount: 24, abbreviation: '2 Sam' },
  { slug: '1-kings', name: '1 Kings', testament: 'old', category: 'historical', order: 11, chapterCount: 22, abbreviation: '1 Kgs' },
  { slug: '2-kings', name: '2 Kings', testament: 'old', category: 'historical', order: 12, chapterCount: 25, abbreviation: '2 Kgs' },
  { slug: '1-chronicles', name: '1 Chronicles', testament: 'old', category: 'historical', order: 13, chapterCount: 29, abbreviation: '1 Chr' },
  { slug: '2-chronicles', name: '2 Chronicles', testament: 'old', category: 'historical', order: 14, chapterCount: 36, abbreviation: '2 Chr' },
  { slug: 'ezra', name: 'Ezra', testament: 'old', category: 'historical', order: 15, chapterCount: 10, abbreviation: 'Ezra' },
  { slug: 'nehemiah', name: 'Nehemiah', testament: 'old', category: 'historical', order: 16, chapterCount: 13, abbreviation: 'Neh' },
  { slug: 'esther', name: 'Esther', testament: 'old', category: 'historical', order: 17, chapterCount: 10, abbreviation: 'Esth' },

  // OLD TESTAMENT - Wisdom & Poetry (5)
  { slug: 'job', name: 'Job', testament: 'old', category: 'wisdom', order: 18, chapterCount: 42, abbreviation: 'Job' },
  { slug: 'psalms', name: 'Psalms', testament: 'old', category: 'wisdom', order: 19, chapterCount: 150, abbreviation: 'Ps' },
  { slug: 'proverbs', name: 'Proverbs', testament: 'old', category: 'wisdom', order: 20, chapterCount: 31, abbreviation: 'Prov' },
  { slug: 'ecclesiastes', name: 'Ecclesiastes', testament: 'old', category: 'wisdom', order: 21, chapterCount: 12, abbreviation: 'Eccl' },
  { slug: 'song-of-solomon', name: 'Song of Solomon', testament: 'old', category: 'wisdom', order: 22, chapterCount: 8, abbreviation: 'Song' },

  // OLD TESTAMENT - Major Prophets (5)
  { slug: 'isaiah', name: 'Isaiah', testament: 'old', category: 'major-prophets', order: 23, chapterCount: 66, abbreviation: 'Isa' },
  { slug: 'jeremiah', name: 'Jeremiah', testament: 'old', category: 'major-prophets', order: 24, chapterCount: 52, abbreviation: 'Jer' },
  { slug: 'lamentations', name: 'Lamentations', testament: 'old', category: 'major-prophets', order: 25, chapterCount: 5, abbreviation: 'Lam' },
  { slug: 'ezekiel', name: 'Ezekiel', testament: 'old', category: 'major-prophets', order: 26, chapterCount: 48, abbreviation: 'Ezek' },
  { slug: 'daniel', name: 'Daniel', testament: 'old', category: 'major-prophets', order: 27, chapterCount: 12, abbreviation: 'Dan' },

  // OLD TESTAMENT - Minor Prophets (12)
  { slug: 'hosea', name: 'Hosea', testament: 'old', category: 'minor-prophets', order: 28, chapterCount: 14, abbreviation: 'Hos' },
  { slug: 'joel', name: 'Joel', testament: 'old', category: 'minor-prophets', order: 29, chapterCount: 3, abbreviation: 'Joel' },
  { slug: 'amos', name: 'Amos', testament: 'old', category: 'minor-prophets', order: 30, chapterCount: 9, abbreviation: 'Amos' },
  { slug: 'obadiah', name: 'Obadiah', testament: 'old', category: 'minor-prophets', order: 31, chapterCount: 1, abbreviation: 'Obad' },
  { slug: 'jonah', name: 'Jonah', testament: 'old', category: 'minor-prophets', order: 32, chapterCount: 4, abbreviation: 'Jonah' },
  { slug: 'micah', name: 'Micah', testament: 'old', category: 'minor-prophets', order: 33, chapterCount: 7, abbreviation: 'Mic' },
  { slug: 'nahum', name: 'Nahum', testament: 'old', category: 'minor-prophets', order: 34, chapterCount: 3, abbreviation: 'Nah' },
  { slug: 'habakkuk', name: 'Habakkuk', testament: 'old', category: 'minor-prophets', order: 35, chapterCount: 3, abbreviation: 'Hab' },
  { slug: 'zephaniah', name: 'Zephaniah', testament: 'old', category: 'minor-prophets', order: 36, chapterCount: 3, abbreviation: 'Zeph' },
  { slug: 'haggai', name: 'Haggai', testament: 'old', category: 'minor-prophets', order: 37, chapterCount: 2, abbreviation: 'Hag' },
  { slug: 'zechariah', name: 'Zechariah', testament: 'old', category: 'minor-prophets', order: 38, chapterCount: 14, abbreviation: 'Zech' },
  { slug: 'malachi', name: 'Malachi', testament: 'old', category: 'minor-prophets', order: 39, chapterCount: 4, abbreviation: 'Mal' },

  // NEW TESTAMENT - Gospels (4)
  { slug: 'matthew', name: 'Matthew', testament: 'new', category: 'gospels', order: 40, chapterCount: 28, abbreviation: 'Matt' },
  { slug: 'mark', name: 'Mark', testament: 'new', category: 'gospels', order: 41, chapterCount: 16, abbreviation: 'Mark' },
  { slug: 'luke', name: 'Luke', testament: 'new', category: 'gospels', order: 42, chapterCount: 24, abbreviation: 'Luke' },
  { slug: 'john', name: 'John', testament: 'new', category: 'gospels', order: 43, chapterCount: 21, abbreviation: 'John' },

  // NEW TESTAMENT - Acts (1)
  { slug: 'acts', name: 'Acts', testament: 'new', category: 'acts', order: 44, chapterCount: 28, abbreviation: 'Acts' },

  // NEW TESTAMENT - Pauline Epistles (13)
  { slug: 'romans', name: 'Romans', testament: 'new', category: 'pauline', order: 45, chapterCount: 16, abbreviation: 'Rom' },
  { slug: '1-corinthians', name: '1 Corinthians', testament: 'new', category: 'pauline', order: 46, chapterCount: 16, abbreviation: '1 Cor' },
  { slug: '2-corinthians', name: '2 Corinthians', testament: 'new', category: 'pauline', order: 47, chapterCount: 13, abbreviation: '2 Cor' },
  { slug: 'galatians', name: 'Galatians', testament: 'new', category: 'pauline', order: 48, chapterCount: 6, abbreviation: 'Gal' },
  { slug: 'ephesians', name: 'Ephesians', testament: 'new', category: 'pauline', order: 49, chapterCount: 6, abbreviation: 'Eph' },
  { slug: 'philippians', name: 'Philippians', testament: 'new', category: 'pauline', order: 50, chapterCount: 4, abbreviation: 'Phil' },
  { slug: 'colossians', name: 'Colossians', testament: 'new', category: 'pauline', order: 51, chapterCount: 4, abbreviation: 'Col' },
  { slug: '1-thessalonians', name: '1 Thessalonians', testament: 'new', category: 'pauline', order: 52, chapterCount: 5, abbreviation: '1 Thess' },
  { slug: '2-thessalonians', name: '2 Thessalonians', testament: 'new', category: 'pauline', order: 53, chapterCount: 3, abbreviation: '2 Thess' },
  { slug: '1-timothy', name: '1 Timothy', testament: 'new', category: 'pauline', order: 54, chapterCount: 6, abbreviation: '1 Tim' },
  { slug: '2-timothy', name: '2 Timothy', testament: 'new', category: 'pauline', order: 55, chapterCount: 4, abbreviation: '2 Tim' },
  { slug: 'titus', name: 'Titus', testament: 'new', category: 'pauline', order: 56, chapterCount: 3, abbreviation: 'Titus' },
  { slug: 'philemon', name: 'Philemon', testament: 'new', category: 'pauline', order: 57, chapterCount: 1, abbreviation: 'Phlm' },

  // NEW TESTAMENT - General Epistles (8)
  { slug: 'hebrews', name: 'Hebrews', testament: 'new', category: 'general', order: 58, chapterCount: 13, abbreviation: 'Heb' },
  { slug: 'james', name: 'James', testament: 'new', category: 'general', order: 59, chapterCount: 5, abbreviation: 'Jas' },
  { slug: '1-peter', name: '1 Peter', testament: 'new', category: 'general', order: 60, chapterCount: 5, abbreviation: '1 Pet' },
  { slug: '2-peter', name: '2 Peter', testament: 'new', category: 'general', order: 61, chapterCount: 3, abbreviation: '2 Pet' },
  { slug: '1-john', name: '1 John', testament: 'new', category: 'general', order: 62, chapterCount: 5, abbreviation: '1 John' },
  { slug: '2-john', name: '2 John', testament: 'new', category: 'general', order: 63, chapterCount: 1, abbreviation: '2 John' },
  { slug: '3-john', name: '3 John', testament: 'new', category: 'general', order: 64, chapterCount: 1, abbreviation: '3 John' },
  { slug: 'jude', name: 'Jude', testament: 'new', category: 'general', order: 65, chapterCount: 1, abbreviation: 'Jude' },

  // NEW TESTAMENT - Apocalypse (1)
  { slug: 'revelation', name: 'Revelation', testament: 'new', category: 'apocalypse', order: 66, chapterCount: 22, abbreviation: 'Rev' },
];

// Utility functions

export function getBookBySlug(slug: string): BibleBookEntry | undefined {
  return BIBLE_INDEX.find(book => book.slug === slug);
}

export function getBooksByCategory(category: string): BibleBookEntry[] {
  return BIBLE_INDEX.filter(book => book.category === category);
}

export function getBooksByTestament(testament: 'old' | 'new'): BibleBookEntry[] {
  return BIBLE_INDEX.filter(book => book.testament === testament);
}

export function getNextBook(slug: string): BibleBookEntry | undefined {
  const currentBook = getBookBySlug(slug);
  if (!currentBook) return undefined;
  return BIBLE_INDEX.find(book => book.order === currentBook.order + 1);
}

export function getPreviousBook(slug: string): BibleBookEntry | undefined {
  const currentBook = getBookBySlug(slug);
  if (!currentBook) return undefined;
  return BIBLE_INDEX.find(book => book.order === currentBook.order - 1);
}

export function getAllBooks(): BibleBookEntry[] {
  return BIBLE_INDEX;
}
