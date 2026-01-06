import { Highlight, Bookmark } from './types';

const STORAGE_KEYS = {
  HIGHLIGHTS: 'shavat:highlights',
  BOOKMARK: 'shavat:bookmark',
} as const;

// Safe localStorage wrapper with error handling
function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Failed to read from localStorage: ${key}`, error);
    return null;
  }
}

function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Failed to write to localStorage: ${key}`, error);
    return false;
  }
}

function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove from localStorage: ${key}`, error);
  }
}

export const storage = {
  // Highlights (append-only array)
  getHighlights: (): Highlight[] => {
    const raw = safeGetItem(STORAGE_KEYS.HIGHLIGHTS);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to parse highlights from localStorage', error);
      return [];
    }
  },

  addHighlight: (highlight: Omit<Highlight, 'id' | 'createdAt'>): Highlight | null => {
    const highlights = storage.getHighlights();
    const newHighlight: Highlight = {
      ...highlight,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    highlights.push(newHighlight);
    const success = safeSetItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(highlights));

    return success ? newHighlight : null;
  },

  deleteHighlight: (id: string): void => {
    const highlights = storage.getHighlights().filter(h => h.id !== id);
    safeSetItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(highlights));
  },

  // Bookmark (single value, overwrite)
  getBookmark: (): Bookmark | null => {
    const raw = safeGetItem(STORAGE_KEYS.BOOKMARK);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch (error) {
      console.error('Failed to parse bookmark from localStorage', error);
      return null;
    }
  },

  setBookmark: (bookmark: Bookmark): void => {
    safeSetItem(STORAGE_KEYS.BOOKMARK, JSON.stringify(bookmark));
  },

  clearBookmark: (): void => {
    safeRemoveItem(STORAGE_KEYS.BOOKMARK);
  },
};
