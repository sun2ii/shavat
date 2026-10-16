/**
 * Scripture Reference System
 *
 * Tracks Old Testament quotations and cross-references within Bible text.
 * Marks the quoted text inline and links to the source passage.
 */

export interface ScriptureRef {
  // Location of the reference (where it appears)
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;

  // The actual quoted text to match and highlight
  quotedText: string;

  // Full href to the source (includes section hash)
  sourceHref: string;

  // Display label for tooltip
  sourceLabel: string;

  // Type of reference
  type: 'quotation' | 'allusion' | 'fulfillment';
}

// Scripture references data
const REFERENCES: ScriptureRef[] = [
  // Mark 1:2 quotes Malachi 3:1
  {
    book: 'mark',
    chapter: 1,
    verseStart: 2,
    quotedText: "I'm sending my preacher ahead of you; He'll make the road smooth for you.",
    sourceHref: '/ot/malachi/coming-judgment-and-elijah/3#the-messenger-preparing-the-way',
    sourceLabel: 'Malachi 3:1',
    type: 'quotation',
  },
  // Mark 1:3 quotes Isaiah 40:3
  {
    book: 'mark',
    chapter: 1,
    verseStart: 3,
    quotedText: 'Thunder in the desert! Prepare for God\'s arrival! Make the road smooth and straight!',
    sourceHref: '/ot/isaiah/comfort-for-gods-people/40#comfort-my-people',
    sourceLabel: 'Isaiah 40:3',
    type: 'quotation',
  },
];

// Build lookup: "book-chapter-verse" -> ScriptureRef[]
function buildReferenceLookup(): Map<string, ScriptureRef[]> {
  const lookup = new Map<string, ScriptureRef[]>();

  for (const ref of REFERENCES) {
    const endVerse = ref.verseEnd ?? ref.verseStart;
    for (let v = ref.verseStart; v <= endVerse; v++) {
      const key = `${ref.book}-${ref.chapter}-${v}`;
      const existing = lookup.get(key) || [];
      existing.push(ref);
      lookup.set(key, existing);
    }
  }

  return lookup;
}

const referenceLookup = buildReferenceLookup();

/**
 * Get all scripture references for a specific verse.
 */
export function getReferencesForVerse(
  book: string,
  chapter: number,
  verse: number
): ScriptureRef[] {
  const key = `${book}-${chapter}-${verse}`;
  return referenceLookup.get(key) || [];
}

/**
 * Get all references for a chapter (for batch loading).
 */
export function getReferencesForChapter(
  book: string,
  chapter: number
): Map<number, ScriptureRef[]> {
  const result = new Map<number, ScriptureRef[]>();

  for (const [key, refs] of referenceLookup.entries()) {
    if (key.startsWith(`${book}-${chapter}-`)) {
      const verse = parseInt(key.split('-')[2], 10);
      result.set(verse, refs);
    }
  }

  return result;
}

export interface RefSegment {
  text: string;
  isRef: boolean;
  ref?: ScriptureRef;
}

/**
 * Tokenize text to identify scripture reference quotations.
 * Returns segments where quoted text is marked for styling.
 */
export function tokenizeReferences(text: string, refs: ScriptureRef[]): RefSegment[] {
  if (!refs || refs.length === 0) {
    return [{ text, isRef: false }];
  }

  const segments: RefSegment[] = [];
  let remaining = text;
  let lastIndex = 0;

  // Sort refs by quotedText length (longest first) for greedy matching
  const sortedRefs = [...refs].sort((a, b) => b.quotedText.length - a.quotedText.length);

  // Find all matches
  const matches: { start: number; end: number; ref: ScriptureRef }[] = [];

  for (const ref of sortedRefs) {
    const idx = text.indexOf(ref.quotedText);
    if (idx !== -1) {
      // Check for overlap with existing matches
      const overlaps = matches.some(
        (m) => (idx >= m.start && idx < m.end) || (idx + ref.quotedText.length > m.start && idx + ref.quotedText.length <= m.end)
      );
      if (!overlaps) {
        matches.push({ start: idx, end: idx + ref.quotedText.length, ref });
      }
    }
  }

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);

  // Build segments
  for (const match of matches) {
    if (match.start > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.start), isRef: false });
    }
    segments.push({ text: text.slice(match.start, match.end), isRef: true, ref: match.ref });
    lastIndex = match.end;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isRef: false });
  }

  return segments.length > 0 ? segments : [{ text, isRef: false }];
}
