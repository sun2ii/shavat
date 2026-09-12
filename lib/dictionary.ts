/**
 * English Dictionary Service
 *
 * Fetches definitions from free Dictionary API with localStorage caching.
 */

export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  definition: string;
  partOfSpeech?: string;
}

// In-memory cache for session
const memoryCache = new Map<string, DictionaryEntry | null>();

// localStorage key prefix
const CACHE_PREFIX = 'dict_';

/**
 * Get definition from cache (memory or localStorage)
 */
function getFromCache(word: string): DictionaryEntry | null | undefined {
  const key = word.toLowerCase();

  // Check memory first
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }

  // Check localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(CACHE_PREFIX + key);
    if (stored) {
      const entry = JSON.parse(stored) as DictionaryEntry | null;
      memoryCache.set(key, entry);
      return entry;
    }
  }

  return undefined; // Not in cache
}

/**
 * Save to cache (memory and localStorage)
 */
function saveToCache(word: string, entry: DictionaryEntry | null): void {
  const key = word.toLowerCase();
  memoryCache.set(key, entry);

  if (typeof window !== 'undefined') {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  }
}

/**
 * Fetch definition from Dictionary API
 */
async function fetchDefinition(word: string): Promise<DictionaryEntry | null> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const entry = data[0];
    const meaning = entry.meanings?.[0];
    const def = meaning?.definitions?.[0];

    if (!def?.definition) {
      return null;
    }

    return {
      word: entry.word || word,
      phonetic: entry.phonetic || entry.phonetics?.[0]?.text,
      definition: def.definition,
      partOfSpeech: meaning.partOfSpeech,
    };
  } catch {
    return null;
  }
}

/**
 * Get definition for a word (cached, lazy-loaded)
 */
export async function getDefinition(word: string): Promise<DictionaryEntry | null> {
  const cached = getFromCache(word);

  // Return cached value (including null for "not found")
  if (cached !== undefined) {
    return cached;
  }

  // Fetch and cache
  const entry = await fetchDefinition(word);
  saveToCache(word, entry);
  return entry;
}

/**
 * Preload definitions for multiple words (in background)
 */
export function preloadDefinitions(words: string[]): void {
  // Filter to words not in cache
  const toLoad = words.filter(w => getFromCache(w) === undefined);

  // Load in background (don't await)
  toLoad.forEach(word => {
    getDefinition(word).catch(() => {});
  });
}
