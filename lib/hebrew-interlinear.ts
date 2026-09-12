/**
 * Hebrew Interlinear Data Access
 *
 * Provides access to Hebrew word data and Strong's lexicon lookups.
 * Data is lazy-loaded on first access.
 */

// Types matching our imported data structure
export interface HebrewWord {
  index: number;
  surface: string;
  lemma: string;
  strong: string[];
  morph: string;
  id: string;
}

export interface StrongsEntry {
  strong: string;
  lemma: string;
  transliteration: string;
  pronunciation: string;
  derivation: string;
  definition: string;
  kjvGloss: string;
}

interface HebrewBook {
  book: string;
  language: 'hebrew';
  source: string;
  version: string;
  chapters: {
    [chapterNum: string]: {
      verses: {
        [verseNum: string]: HebrewWord[];
      };
    };
  };
}

interface StrongsLexicon {
  language: 'hebrew';
  source: string;
  version: string;
  entries: Record<string, StrongsEntry>;
}

// Lazy-loaded data
let proverbsData: HebrewBook | null = null;
let strongsData: StrongsLexicon | null = null;

/**
 * Load Proverbs Hebrew data (lazy, cached)
 */
async function loadProverbsHebrew(): Promise<HebrewBook> {
  if (proverbsData) return proverbsData;

  const data = await import('@/lib/data/interlinear/hebrew/proverbs.json');
  proverbsData = data.default as HebrewBook;
  return proverbsData;
}

/**
 * Load Strong's Hebrew lexicon (lazy, cached)
 */
async function loadStrongsHebrew(): Promise<StrongsLexicon> {
  if (strongsData) return strongsData;

  const data = await import('@/lib/data/lexicon/hebrew-strongs.json');
  strongsData = data.default as StrongsLexicon;
  return strongsData;
}

/**
 * Get Hebrew words for a specific Proverbs verse.
 */
export async function getHebrewVerse(
  chapter: number,
  verse: number
): Promise<HebrewWord[] | null> {
  const data = await loadProverbsHebrew();
  return data.chapters[String(chapter)]?.verses[String(verse)] || null;
}

/**
 * Look up a Strong's entry by number (e.g., "H4912")
 */
export async function getStrongsEntry(
  strongNum: string
): Promise<StrongsEntry | null> {
  const data = await loadStrongsHebrew();
  return data.entries[strongNum] || null;
}

/**
 * Parse Hebrew morphology code into human-readable parts.
 *
 * OSHB morph codes: https://hb.openscriptures.org/parsing/HebrewMorphologyCodes.html
 *
 * Format: H[prefix/]PartOfSpeech[details]
 * Examples:
 *   HNcmpc = Hebrew Noun common masculine plural construct
 *   HVqp3ms = Hebrew Verb qal perfect 3rd masculine singular
 *   HR/Vqc = Hebrew preposition + Verb qal infinitive construct
 */
export function parseMorphology(morph: string): {
  partOfSpeech: string;
  details: string[];
  raw: string;
} {
  if (!morph) {
    return { partOfSpeech: '', details: [], raw: '' };
  }

  // Strip leading H (Hebrew marker)
  let code = morph.startsWith('H') ? morph.slice(1) : morph;

  // Handle prefixes (e.g., "R/Vqc" = preposition + verb)
  const prefixes: string[] = [];
  while (code.includes('/')) {
    const slashIdx = code.indexOf('/');
    const prefix = code.slice(0, slashIdx);
    prefixes.push(parsePrefix(prefix));
    code = code.slice(slashIdx + 1);
  }

  // Parse main part of speech
  const pos = code[0];
  const rest = code.slice(1);

  const partOfSpeech = parsePartOfSpeech(pos);
  const details = [...prefixes];

  // Parse details based on POS
  if (pos === 'N') {
    details.push(...parseNounDetails(rest));
  } else if (pos === 'V') {
    details.push(...parseVerbDetails(rest));
  } else if (pos === 'A') {
    details.push(...parseAdjectiveDetails(rest));
  } else if (rest) {
    // For other POS, just note we have extra info
    details.push(rest);
  }

  return { partOfSpeech, details, raw: morph };
}

function parsePrefix(p: string): string {
  const prefixes: Record<string, string> = {
    'R': 'preposition',
    'C': 'conjunction',
    'D': 'article',
    'Td': 'definite article',
  };
  return prefixes[p] || p;
}

function parsePartOfSpeech(pos: string): string {
  const posMap: Record<string, string> = {
    'A': 'adjective',
    'C': 'conjunction',
    'D': 'adverb',
    'N': 'noun',
    'P': 'pronoun',
    'R': 'preposition',
    'S': 'suffix',
    'T': 'particle',
    'V': 'verb',
  };
  return posMap[pos] || pos;
}

function parseNounDetails(rest: string): string[] {
  const details: string[] = [];

  // Type: c=common, p=proper
  if (rest[0] === 'c') details.push('common');
  if (rest[0] === 'p') details.push('proper');

  // Gender: m=masculine, f=feminine, b=both
  if (rest.includes('m')) details.push('masculine');
  if (rest.includes('f')) details.push('feminine');

  // Number: s=singular, p=plural, d=dual
  if (rest.includes('s') && !rest.includes('ms') && !rest.includes('fs')) {
    // Check it's actually number, not part of 'ms'
  }
  if (rest.endsWith('s') || rest.includes('sa') || rest.includes('sc')) details.push('singular');
  if (rest.endsWith('p') || rest.includes('pa') || rest.includes('pc')) details.push('plural');
  if (rest.endsWith('d') || rest.includes('da') || rest.includes('dc')) details.push('dual');

  // State: a=absolute, c=construct
  if (rest.includes('a')) details.push('absolute');
  if (rest.includes('c') && rest[0] !== 'c') details.push('construct');

  return details;
}

function parseVerbDetails(rest: string): string[] {
  const details: string[] = [];

  // Stem
  const stems: Record<string, string> = {
    'q': 'qal',
    'N': 'niphal',
    'p': 'piel',
    'P': 'pual',
    'h': 'hiphil',
    'H': 'hophal',
    't': 'hithpael',
  };
  if (rest[0] && stems[rest[0]]) {
    details.push(stems[rest[0]]);
  }

  // Conjugation
  if (rest.includes('p')) details.push('perfect');
  if (rest.includes('i')) details.push('imperfect');
  if (rest.includes('w')) details.push('wayyiqtol');
  if (rest.includes('v')) details.push('imperative');
  if (rest.includes('a')) details.push('participle active');
  if (rest.includes('s')) details.push('participle passive');
  if (rest.includes('c')) details.push('infinitive construct');
  if (rest.includes('r')) details.push('infinitive absolute');

  return details;
}

function parseAdjectiveDetails(rest: string): string[] {
  const details: string[] = [];
  if (rest.includes('m')) details.push('masculine');
  if (rest.includes('f')) details.push('feminine');
  if (rest.includes('s')) details.push('singular');
  if (rest.includes('p')) details.push('plural');
  return details;
}

/**
 * Check if Hebrew data is available for a book.
 */
export function hasHebrewData(book: string): boolean {
  // Currently only Proverbs
  return book.toLowerCase() === 'proverbs';
}
