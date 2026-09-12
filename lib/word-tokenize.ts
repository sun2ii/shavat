/**
 * Word Tokenization for Dictionary Lookups
 *
 * Splits text into word tokens while preserving punctuation and whitespace.
 * Used to wrap individual words with definition tooltips.
 */

export interface WordToken {
  text: string;
  isWord: boolean;
}

// Common words that don't need definitions
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'by', 'from', 'as', 'is', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'this', 'that', 'these',
  'those', 'it', 'its', 'he', 'she', 'they', 'them', 'his', 'her', 'their',
  'we', 'us', 'our', 'you', 'your', 'who', 'whom', 'which', 'what', 'where',
  'when', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most',
  'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
  'than', 'too', 'very', 'just', 'also', 'now', 'then', 'here', 'there',
  'are', 'am', 'if', 'into', 'my', 'me', 'him', 'up', 'out', 'about',
]);

/**
 * Check if a word should have a definition lookup.
 * Returns false for stopwords and very short words.
 */
export function shouldLookupWord(word: string): boolean {
  const normalized = word.toLowerCase();
  if (normalized.length < 2) return false;
  if (STOPWORDS.has(normalized)) return false;
  return true;
}

/**
 * Tokenize text into words and non-words (punctuation/whitespace).
 *
 * Examples:
 *   "Hello, world!" → [
 *     { text: "Hello", isWord: true },
 *     { text: ", ", isWord: false },
 *     { text: "world", isWord: true },
 *     { text: "!", isWord: false }
 *   ]
 */
export function tokenizeWords(text: string): WordToken[] {
  const tokens: WordToken[] = [];

  // Match words (letters, apostrophes, hyphens) or non-words
  const regex = /([a-zA-Z][a-zA-Z'\-]*[a-zA-Z]|[a-zA-Z])|([^a-zA-Z]+)/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, word, nonWord] = match;
    if (word) {
      tokens.push({ text: word, isWord: true });
    } else if (nonWord) {
      tokens.push({ text: nonWord, isWord: false });
    }
  }

  return tokens;
}
