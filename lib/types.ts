// Verse model (normalized from JSON)
export interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

// Highlight model (persisted)
export interface Highlight {
  id: string;
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  color: 'yellow' | 'blue';
  note?: string;
  createdAt: number;
}

// Bookmark model (persisted)
export interface Bookmark {
  book: string;
  chapter: number;
  verse: number;
}

// Selection state (ephemeral)
export interface Selection {
  verseStart: number;
  verseEnd: number;
}

// Raw JSON structure from source
export interface GenesisJSON {
  book: string;
  count: number;
  chapters: Array<{
    chapter: string;
    verses: Array<{
      verse: string;
      text: string;
    }>;
  }>;
}
