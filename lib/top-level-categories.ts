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

// 5 mutually exclusive top-level categories
export const TOP_LEVEL_CATEGORIES = {
  TORAH: {
    id: 'torah',
    slug: 'torah',
    name: 'Torah',
    description: 'The Five Books of Moses',
    bookCount: 5,
  },
  OLD_TESTAMENT: {
    id: 'old-testament',
    slug: 'old-testament',
    name: 'Old Testament',
    description: 'Historical Books, Wisdom, and Prophets',
    bookCount: 33,
  },
  PSALMS: {
    id: 'psalms',
    slug: 'psalms',
    name: 'Psalms',
    description: 'The Book of Psalms',
    bookCount: 1,
  },
  NEW_TESTAMENT: {
    id: 'new-testament',
    slug: 'new-testament',
    name: 'New Testament',
    description: 'Acts, Epistles, and Revelation',
    bookCount: 23,
  },
  GOSPELS: {
    id: 'gospels',
    slug: 'gospels',
    name: 'Gospels',
    description: 'The Four Gospels',
    bookCount: 4,
  },
} as const;

// Get books for a specific top-level category
export function getBooksByTopLevelCategory(categoryId: string): BibleBookEntry[] {
  switch (categoryId) {
    case 'torah':
      // Pentateuch books (Genesis through Deuteronomy)
      return BIBLE_INDEX.filter(book => book.category === 'pentateuch');

    case 'old-testament':
      // All OT books except Torah and Psalms
      return BIBLE_INDEX.filter(book =>
        book.testament === 'old' &&
        book.category !== 'pentateuch' &&
        book.slug !== 'psalms'
      );

    case 'psalms':
      // Just Psalms
      return BIBLE_INDEX.filter(book => book.slug === 'psalms');

    case 'new-testament':
      // All NT books except Gospels
      return BIBLE_INDEX.filter(book =>
        book.testament === 'new' &&
        book.category !== 'gospels'
      );

    case 'gospels':
      // Gospel books
      return BIBLE_INDEX.filter(book => book.category === 'gospels');

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
