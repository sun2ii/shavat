import { BibleBookEntry } from './types';
import { BIBLE_INDEX } from './bible-index';

// Top-level category definition
export interface TopLevelCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  bookCount: number;
}

// 7 mutually exclusive top-level categories
export const TOP_LEVEL_CATEGORIES = {
  TORAH: {
    id: 'torah',
    slug: 'torah',
    name: 'Torah',
    description: 'The Five Books of Moses',
    bookCount: 5,
  },
  HISTORICAL: {
    id: 'historical',
    slug: 'historical',
    name: 'Historical',
    description: 'Joshua through Esther',
    bookCount: 12,
  },
  WISDOM: {
    id: 'wisdom',
    slug: 'wisdom',
    name: 'Wisdom & Poetry',
    description: 'Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon',
    bookCount: 5,
  },
  PROPHETS: {
    id: 'prophets',
    slug: 'prophets',
    name: 'Prophets',
    description: 'Major and Minor Prophets',
    bookCount: 17,
  },
  GOSPELS: {
    id: 'gospels',
    slug: 'gospels',
    name: 'Gospels',
    description: 'The Four Gospels',
    bookCount: 4,
  },
  APOSTOLIC: {
    id: 'apostolic',
    slug: 'apostolic',
    name: 'Apostolic',
    description: 'Acts, Epistles, and Revelation',
    bookCount: 23,
  },
} as const;

// Get books for a specific top-level category
export function getBooksByTopLevelCategory(categoryId: string): BibleBookEntry[] {
  switch (categoryId) {
    case 'torah':
      // Pentateuch books (Genesis through Deuteronomy)
      return BIBLE_INDEX.filter(book => book.category === 'pentateuch');

    case 'historical':
      // Historical books: Joshua through Esther
      return BIBLE_INDEX.filter(book => book.category === 'historical');

    case 'wisdom':
      // Wisdom & Poetry: Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon
      return BIBLE_INDEX.filter(book => book.category === 'wisdom');

    case 'prophets':
      // Major and Minor Prophets
      return BIBLE_INDEX.filter(book =>
        book.category === 'major-prophets' ||
        book.category === 'minor-prophets'
      );

    case 'gospels':
      // Gospel books
      return BIBLE_INDEX.filter(book => book.category === 'gospels');

    case 'apostolic':
      // All NT books except Gospels
      return BIBLE_INDEX.filter(book =>
        book.testament === 'new' &&
        book.category !== 'gospels'
      );

    default:
      return [];
  }
}

// Get all top-level categories as an array
export function getAllTopLevelCategories(): TopLevelCategory[] {
  return Object.values(TOP_LEVEL_CATEGORIES);
}

// Get a specific top-level category by slug
export function getTopLevelCategoryBySlug(slug: string): TopLevelCategory | undefined {
  return Object.values(TOP_LEVEL_CATEGORIES).find(cat => cat.slug === slug);
}
