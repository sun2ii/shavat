import fs from 'fs';
import path from 'path';

export interface SectionData {
  title: string;
  verseRange: [number, number];
}

export interface ChapterSections {
  book: string;
  chapter: number;
  sections: SectionData[];
}

export interface BookSections {
  [bookSlug: string]: {
    [chapter: number]: SectionData[];
  };
}

// Cache for parsed sections
let cachedSections: BookSections | null = null;

export function getNTSections(): BookSections {
  // Note: Despite the name, this now returns all books (Torah + NT) with sections
  // Keeping the name for backwards compatibility
  if (cachedSections) {
    return cachedSections;
  }

  const genesisReaderPath = path.join(process.cwd(), 'components', 'GenesisReader.tsx');
  const content = fs.readFileSync(genesisReaderPath, 'utf-8');

  const sections: BookSections = {};

  // Book mappings (constant name patterns to book slugs)
  const bookMappings: Record<string, string> = {
    // Torah (OT)
    'GENESIS': 'genesis',
    'EXODUS': 'exodus',
    'LEVITICUS': 'leviticus',
    'NUMBERS': 'numbers',
    'DEUTERONOMY': 'deuteronomy',
    'JOSHUA': 'joshua',
    'JUDGES': 'judges',
    // NT
    'MATTHEW': 'matthew',
    'MARK': 'mark',
    'LUKE': 'luke',
    'JOHN(?!\\d)': 'john',  // Match JOHN_ but not JOHN1, JOHN2, JOHN3 (without underscore)
    'ACTS': 'acts',
    'ROMANS': 'romans',
    'CORINTHIANS_1': '1-corinthians',
    'CORINTHIANS_2': '2-corinthians',
    'GALATIANS': 'galatians',
    'EPHESIANS': 'ephesians',
    'PHILIPPIANS': 'philippians',
    'COLOSSIANS': 'colossians',
    'THESSALONIANS_1': '1-thessalonians',
    'THESSALONIANS_2': '2-thessalonians',
    'TIMOTHY_1': '1-timothy',
    'TIMOTHY_2': '2-timothy',
    'TITUS': 'titus',
    'PHILEMON': 'philemon',
    'HEBREWS': 'hebrews',
    'JAMES': 'james',
    'PETER1': '1-peter',
    'PETER2': '2-peter',
    'JOHN1': '1-john',
    'JOHN2': '2-john',
    'JOHN3': '3-john',
    'JUDE': 'jude',
    'REVELATION': 'revelation',
  };

  // Parse section constants
  // Pattern: const BOOK_CHAPTER_SECTIONS: DaySection[] = [
  const sectionRegex = /const\s+([A-Z_0-9]+)_(\d+)_SECTIONS:\s*DaySection\[\]\s*=\s*\[([\s\S]*?)\];/g;

  let match;
  while ((match = sectionRegex.exec(content)) !== null) {
    const constantPrefix = match[1];
    const chapter = parseInt(match[2], 10);
    const sectionContent = match[3];

    // Find matching book slug
    let bookSlug: string | null = null;
    for (const [pattern, slug] of Object.entries(bookMappings)) {
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(constantPrefix)) {
        bookSlug = slug;
        break;
      }
    }

    if (!bookSlug) {
      continue; // Skip books not in mapping
    }

    // Parse individual sections
    // Pattern: { day: 'Title', verseRange: [1, 5], color: '...', borderColor: '...' },
    // Handle escaped quotes in titles like "Paul\'s Greeting" by matching up to comma before verseRange
    const sectionItemRegex = /\{\s*day:\s*['"](.+?)['"],\s*verseRange:\s*\[(\d+),\s*(\d+)\]/g;

    const chapterSections: SectionData[] = [];
    let itemMatch;
    while ((itemMatch = sectionItemRegex.exec(sectionContent)) !== null) {
      // Unescape quotes in the title
      const title = itemMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
      chapterSections.push({
        title,
        verseRange: [parseInt(itemMatch[2], 10), parseInt(itemMatch[3], 10)],
      });
    }

    // Store in sections object
    if (!sections[bookSlug]) {
      sections[bookSlug] = {};
    }
    sections[bookSlug][chapter] = chapterSections;
  }

  cachedSections = sections;
  return sections;
}

// Get sections for a specific book
export function getBookSections(bookSlug: string): { [chapter: number]: SectionData[] } | null {
  const allSections = getNTSections();
  return allSections[bookSlug] || null;
}

// Get sections for a specific chapter
export function getChapterSections(bookSlug: string, chapter: number): SectionData[] | null {
  const bookSections = getBookSections(bookSlug);
  return bookSections?.[chapter] || null;
}
