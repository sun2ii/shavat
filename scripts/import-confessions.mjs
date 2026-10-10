/**
 * Import St. Augustine's Confessions from Project Gutenberg
 * Source: https://www.gutenberg.org/files/3296/3296-h/3296-h.htm
 *
 * Structure: 13 books, each as continuous prose
 * Strategy: Split each book into paragraphs as "verses"
 */

import fs from 'fs';
import path from 'path';

const READING_ID = 'confessions';
const SOURCE_URL = 'https://www.gutenberg.org/files/3296/3296-h/3296-h.htm';
const OUTPUT_DIR = path.join(process.cwd(), 'lib', 'readings', READING_ID);

const BOOKS = [
  { id: 1, title: 'Infancy and Boyhood' },
  { id: 2, title: 'Object of These Confessions' },
  { id: 3, title: 'From Sixteen to Twenty-Eight' },
  { id: 4, title: 'Augustine and the Manichees' },
  { id: 5, title: 'Augustine at Rome and Milan' },
  { id: 6, title: 'Struggle for the Faith' },
  { id: 7, title: 'Inner Conflicts' },
  { id: 8, title: 'The Conversion' },
  { id: 9, title: 'Death of Monica' },
  { id: 10, title: 'Memory and Self-Knowledge' },
  { id: 11, title: 'Time and Eternity' },
  { id: 12, title: 'Meditations on Scripture' },
  { id: 13, title: 'Allegorical Interpretation' },
];

async function fetchHTML() {
  console.log('Fetching HTML from Gutenberg...');
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.text();
}

function extractBooks(html) {
  const books = [];

  // Split by BOOK headers
  // Pattern: <h2>BOOK I</h2> or similar
  const bookPattern = /<h2[^>]*>\s*BOOK\s+([IVXLCDM]+)\s*<\/h2>/gi;

  // Find all book positions
  const bookMatches = [...html.matchAll(bookPattern)];

  for (let i = 0; i < bookMatches.length; i++) {
    const match = bookMatches[i];
    const nextMatch = bookMatches[i + 1];

    const startIndex = match.index + match[0].length;
    const endIndex = nextMatch ? nextMatch.index : html.indexOf('<!--end chapter-->', startIndex) || html.length;

    const bookContent = html.slice(startIndex, endIndex);
    books.push({
      number: i + 1,
      content: bookContent
    });
  }

  return books;
}

function parseBookContent(html, bookNumber) {
  // Extract paragraphs
  const paragraphPattern = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  const matches = [...html.matchAll(paragraphPattern)];

  const paragraphs = [];

  for (const match of matches) {
    let text = match[1]
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      // Fix common HTML entities
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&lsquo;/g, "'")
      .replace(/&rdquo;/g, '"')
      .replace(/&ldquo;/g, '"')
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–')
      .replace(/&hellip;/g, '...')
      .replace(/&nbsp;/g, ' ')
      .trim();

    // Skip empty paragraphs or very short ones (likely artifacts)
    if (text.length < 10) continue;

    // Skip table of contents entries or navigation
    if (text.includes('BOOK I') && text.includes('BOOK II')) continue;

    paragraphs.push(text);
  }

  // Split paragraphs into sentences, then convert to "verses"
  const sentences = paragraphs
    .flatMap(p => p.split(/(?<=[.!?])\s+/))
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const verses = sentences.map((text, idx) => ({
    verse: String(idx + 1),
    text,
  }));

  return verses;
}

async function main() {
  try {
    // Ensure output directory exists
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Output directory: ${OUTPUT_DIR}`);

    // Fetch the HTML
    const html = await fetchHTML();
    console.log(`Fetched ${html.length} characters`);

    // Extract books
    const extractedBooks = extractBooks(html);
    console.log(`Found ${extractedBooks.length} books`);

    if (extractedBooks.length !== 13) {
      console.warn(`Warning: Expected 13 books, found ${extractedBooks.length}`);
    }

    // Process each book
    const bookData = [];

    for (let i = 0; i < extractedBooks.length; i++) {
      const book = extractedBooks[i];
      const bookMeta = BOOKS[i] || { id: i + 1, title: `Book ${i + 1}` };

      const verses = parseBookContent(book.content, book.number);
      console.log(`Book ${bookMeta.id}: "${bookMeta.title}" - ${verses.length} sentences`);

      // Write book JSON
      const bookJson = {
        book: `Confessions Book ${bookMeta.id}`,
        slug: `confessions-${bookMeta.id}`,
        count: 1, // Each book is one "chapter" for simplicity
        chapters: [
          {
            chapter: '1',
            title: bookMeta.title,
            verses: verses
          }
        ]
      };

      const bookFilename = `confessions-${bookMeta.id}.json`;
      fs.writeFileSync(
        path.join(OUTPUT_DIR, bookFilename),
        JSON.stringify(bookJson, null, 2)
      );

      bookData.push({
        id: bookMeta.id,
        slug: `confessions-${bookMeta.id}`,
        title: bookMeta.title,
        chapters: 1,
        sentences: verses.length
      });
    }

    // Write metadata
    const metadata = {
      id: READING_ID,
      title: 'Confessions',
      author: 'Saint Augustine',
      translator: 'E. B. Pusey',
      source: SOURCE_URL,
      books: bookData.map(b => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        chapters: b.chapters
      }))
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );

    console.log('\n✓ Import complete!');
    console.log(`  - ${bookData.length} books`);
    console.log(`  - ${bookData.reduce((sum, b) => sum + b.sentences, 0)} total sentences`);
    console.log(`\nFiles written to: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

main();
