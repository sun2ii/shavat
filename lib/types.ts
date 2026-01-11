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
export interface BookJSON {
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

export type GenesisJSON = BookJSON;

// Genesis Collection (curated narrative unit)
export interface GenesisBook {
  id: string;
  title: string;
  chapters: number[];
  theme: string;
  summary: string;
}

export interface GenesisMetadata {
  books: GenesisBook[];
  chapterSummaries?: { [chapterNum: string]: string };
}

// Psalms Collection (curated emotional unit)
export interface PsalmsCollection {
  id: string;
  title: string;
  theme: string;
  psalms: number[];
}

export interface PsalmsCollectionsMetadata {
  collections: PsalmsCollection[];
}

// Bible Book Entry (for master index)
export interface BibleBookEntry {
  slug: string;           // URL/file identifier
  name: string;           // Display name
  testament: 'old' | 'new';
  category: string;       // Reference to CATEGORIES
  order: number;          // Canonical position 1-66
  chapterCount: number;   // Total chapters
  abbreviation: string;   // Common abbreviation
}

// Generic Book Division (thematic section for any book)
export interface BookDivision {
  id: string;              // URL slug (e.g., "creation", "slavery-in-egypt")
  title: string;           // Display name (e.g., "The Book of Creation")
  chapters: number[];      // [1, 2] or [1,2,3,4,5,6]
  theme: string;           // One-line theme
  summary: string;         // Brief description
}

// Generic Book Metadata (for any book)
export interface BookMetadata {
  divisions: BookDivision[];
  chapterSummaries: Record<string, string>;
}
