#!/usr/bin/env node
/**
 * Import "The Imitation of Christ" from Standard Ebooks.
 *
 * Fetches XHTML chapter files, parses them, and outputs JSON files
 * in the same format as Bible books (so BookReader works unchanged).
 *
 * Usage: node scripts/import-imitation-of-christ.mjs
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'lib', 'readings', 'imitation-of-christ');

const BASE_URL = 'https://raw.githubusercontent.com/standardebooks/thomas-a-kempis_the-imitation-of-christ_william-benham/master/src/epub/text';

// Book structure: 4 books with varying chapter counts
const BOOKS = [
  { id: 1, title: 'Admonitions Profitable for the Spiritual Life', chapters: 25 },
  { id: 2, title: 'Admonitions Concerning the Inner Life', chapters: 12 },
  { id: 3, title: 'On Inward Consolation', chapters: 59 },
  { id: 4, title: 'Of the Sacrament of the Altar', chapters: 18 },
];

/**
 * Fetch a chapter's XHTML from GitHub.
 */
async function fetchChapter(bookNum, chapterNum) {
  const url = `${BASE_URL}/chapter-${bookNum}-${chapterNum}.xhtml`;
  console.log(`  Fetching: chapter-${bookNum}-${chapterNum}.xhtml`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

/**
 * Parse XHTML and extract chapter title + paragraphs.
 */
function parseChapter(xhtml) {
  // Extract the bridgehead (subtitle/title) from <p epub:type="bridgehead">
  const bridgeheadMatch = xhtml.match(/<p[^>]*epub:type="[^"]*bridgehead[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
  let title = 'Untitled';
  if (bridgeheadMatch) {
    // Clean HTML tags from title
    title = bridgeheadMatch[1]
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Extract all <p> elements that are NOT the bridgehead
  // and NOT footnote references
  const paragraphs = [];

  // Match all <p> tags (but not bridgehead)
  const pMatches = xhtml.matchAll(/<p(?![^>]*bridgehead)[^>]*>([\s\S]*?)<\/p>/gi);

  for (const match of pMatches) {
    let text = match[1]
      // Remove footnote references like <a href="endnotes.xhtml#note-4"...>4</a>
      .replace(/<a[^>]*noteref[^>]*>[\s\S]*?<\/a>/gi, '')
      // Remove all other HTML tags
      .replace(/<[^>]+>/g, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim();

    // Skip empty paragraphs
    if (text.length > 0) {
      paragraphs.push(text);
    }
  }

  return { title, paragraphs };
}

/**
 * Process a single book and return its data structure.
 */
async function processBook(bookInfo) {
  console.log(`\nProcessing Book ${bookInfo.id}: ${bookInfo.title}`);

  const chapters = [];

  for (let ch = 1; ch <= bookInfo.chapters; ch++) {
    const xhtml = await fetchChapter(bookInfo.id, ch);
    const { title, paragraphs } = parseChapter(xhtml);

    // Split paragraphs into sentences, then convert to "verses"
    const sentences = paragraphs
      .flatMap(p => p.split(/(?<=[.!?])\s+/))
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const verses = sentences.map((text, idx) => ({
      verse: String(idx + 1),
      text,
    }));

    chapters.push({
      chapter: String(ch),
      title,
      verses,
    });

    console.log(`    Chapter ${ch}: "${title.slice(0, 50)}..." (${verses.length} sentences)`);
  }

  return {
    book: `Imitation ${bookInfo.id}`,
    slug: `imitation-${bookInfo.id}`,
    count: bookInfo.chapters,
    chapters,
  };
}

/**
 * Main entry point.
 */
async function main() {
  console.log('Importing "The Imitation of Christ" from Standard Ebooks...\n');

  // Ensure output directory exists
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Write metadata.json
  const metadata = {
    id: 'imitation-of-christ',
    title: 'The Imitation of Christ',
    author: 'Thomas a Kempis',
    translator: 'William Benham',
    source: 'https://standardebooks.org/ebooks/thomas-a-kempis/the-imitation-of-christ/william-benham',
    books: BOOKS.map(b => ({
      id: b.id,
      slug: `imitation-${b.id}`,
      title: b.title,
      chapters: b.chapters,
    })),
  };

  writeFileSync(
    join(OUTPUT_DIR, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
  console.log('Wrote: metadata.json');

  // Process each book
  for (const bookInfo of BOOKS) {
    const bookData = await processBook(bookInfo);

    const filename = `imitation-${bookInfo.id}.json`;
    writeFileSync(
      join(OUTPUT_DIR, filename),
      JSON.stringify(bookData, null, 2)
    );
    console.log(`Wrote: ${filename}`);
  }

  console.log('\nDone! Files written to lib/readings/imitation-of-christ/');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
