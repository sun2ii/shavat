// Testament metadata
export const TESTAMENTS = {
  OLD: { id: 'old' as const, name: 'Old Testament', bookCount: 39 },
  NEW: { id: 'new' as const, name: 'New Testament', bookCount: 27 }
};

// Category metadata
export const CATEGORIES = {
  // Old Testament
  PENTATEUCH: {
    id: 'pentateuch',
    name: 'Law',
    testament: 'old' as const,
    bookCount: 5
  },
  HISTORICAL: {
    id: 'historical',
    name: 'Historical Books',
    testament: 'old' as const,
    bookCount: 12
  },
  WISDOM: {
    id: 'wisdom',
    name: 'Wisdom & Poetry',
    testament: 'old' as const,
    bookCount: 5
  },
  MAJOR_PROPHETS: {
    id: 'major-prophets',
    name: 'Major Prophets',
    testament: 'old' as const,
    bookCount: 5
  },
  MINOR_PROPHETS: {
    id: 'minor-prophets',
    name: 'Minor Prophets',
    testament: 'old' as const,
    bookCount: 12
  },

  // New Testament
  GOSPELS: {
    id: 'gospels',
    name: 'Gospels',
    testament: 'new' as const,
    bookCount: 4
  },
  ACTS: {
    id: 'acts',
    name: 'Acts',
    testament: 'new' as const,
    bookCount: 1
  },
  PAULINE: {
    id: 'pauline',
    name: 'Pauline Epistles',
    testament: 'new' as const,
    bookCount: 13
  },
  GENERAL: {
    id: 'general',
    name: 'General Epistles',
    testament: 'new' as const,
    bookCount: 8
  },
  APOCALYPSE: {
    id: 'apocalypse',
    name: 'Revelation',
    testament: 'new' as const,
    bookCount: 1
  }
};

export type Testament = typeof TESTAMENTS.OLD | typeof TESTAMENTS.NEW;
export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];
