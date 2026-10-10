/**
 * Import "The Practice of the Presence of God" by Brother Lawrence
 * Source: https://www.gutenberg.org/cache/epub/13871/pg13871.txt
 *
 * Structure: 4 Conversations + 15 Letters
 * Strategy: Split into sentences as "verses"
 */

import fs from 'fs';
import path from 'path';

const READING_ID = 'practice-presence-god';
const SOURCE_URL = 'https://www.gutenberg.org/cache/epub/13871/pg13871.txt';
const OUTPUT_DIR = path.join(process.cwd(), 'lib', 'readings', READING_ID);

async function fetchText() {
  console.log('Fetching text from Gutenberg...');
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.text();
}

function cleanText(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Fix common OCR/encoding issues
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/—/g, '—')
    // Remove markdown-style underscores (italics)
    .replace(/_([^_]+)_/g, '$1')
    // Fix ordinal numbers: 1st, 2nd, 3rd, etc.
    .replace(/\b(\d+)d\b/g, '$1rd')  // 3d -> 3rd
    .replace(/\b(\d+)th\b/g, '$1th') // keep 4th, 5th etc
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSections(text) {
  // Remove Gutenberg header/footer
  const startMarker = '*** START OF THE PROJECT GUTENBERG EBOOK';
  const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK';

  let startIdx = text.indexOf(startMarker);
  if (startIdx !== -1) {
    startIdx = text.indexOf('\n', startIdx) + 1;
  } else {
    startIdx = 0;
  }

  let endIdx = text.indexOf(endMarker);
  if (endIdx === -1) endIdx = text.length;

  const content = text.slice(startIdx, endIdx);

  const sections = [];

  // Pattern for conversations: FIRST CONVERSATION, SECOND CONVERSATION, etc.
  const convNames = ['FIRST', 'SECOND', 'THIRD', 'FOURTH'];

  // Pattern for letters: FIRST LETTER, SECOND LETTER, etc.
  const letterNames = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH',
                       'SEVENTH', 'EIGHTH', 'NINTH', 'TENTH', 'ELEVENTH',
                       'TWELFTH', 'THIRTEENTH', 'FOURTEENTH', 'FIFTEENTH'];

  // Find conversations
  for (let i = 0; i < convNames.length; i++) {
    const pattern = new RegExp(`${convNames[i]}\\s+CONVERSATION`, 'i');
    const match = content.match(pattern);
    if (match) {
      sections.push({
        type: 'conversation',
        num: i + 1,
        title: `${convNames[i].charAt(0) + convNames[i].slice(1).toLowerCase()} Conversation`,
        startPattern: pattern
      });
    }
  }

  // Find letters
  for (let i = 0; i < letterNames.length; i++) {
    const pattern = new RegExp(`${letterNames[i]}\\s+LETTER`, 'i');
    const match = content.match(pattern);
    if (match) {
      sections.push({
        type: 'letter',
        num: i + 1,
        title: `${letterNames[i].charAt(0) + letterNames[i].slice(1).toLowerCase()} Letter`,
        startPattern: pattern
      });
    }
  }

  // Sort by position in text
  sections.forEach(s => {
    const match = content.match(s.startPattern);
    s.position = match ? match.index : -1;
  });
  sections.sort((a, b) => a.position - b.position);

  // Extract content for each section
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const nextSection = sections[i + 1];

    const startMatch = content.match(section.startPattern);
    if (!startMatch) continue;

    const startPos = startMatch.index + startMatch[0].length;
    const endPos = nextSection ? content.match(nextSection.startPattern).index : content.length;

    section.content = content.slice(startPos, endPos).trim();
  }

  return sections;
}

function parseContent(content) {
  // Split into paragraphs (double newline or significant whitespace)
  const paragraphs = content
    .split(/\n\s*\n/)
    .map(p => cleanText(p))
    .filter(p => p.length > 20);

  // Split paragraphs into sentences
  const sentences = paragraphs
    .flatMap(p => p.split(/(?<=[.!?])\s+/))
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.match(/^[A-Z\s]+$/)); // Skip all-caps headers

  return sentences.map((text, idx) => ({
    verse: String(idx + 1),
    text,
  }));
}

async function main() {
  try {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Output directory: ${OUTPUT_DIR}`);

    const text = await fetchText();
    console.log(`Fetched ${text.length} characters`);

    const sections = extractSections(text);
    console.log(`Found ${sections.length} sections`);

    // Group into two "books": Conversations and Letters
    const conversations = sections.filter(s => s.type === 'conversation');
    const letters = sections.filter(s => s.type === 'letter');

    console.log(`  - ${conversations.length} conversations`);
    console.log(`  - ${letters.length} letters`);

    // Book 1: Conversations
    const convChapters = [];
    for (const conv of conversations) {
      const verses = parseContent(conv.content);
      console.log(`Conversation ${conv.num}: ${verses.length} sentences`);
      convChapters.push({
        chapter: String(conv.num),
        title: conv.title,
        verses,
      });
    }

    const book1 = {
      book: 'Conversations',
      slug: 'conversations',
      count: convChapters.length,
      chapters: convChapters,
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'conversations.json'),
      JSON.stringify(book1, null, 2)
    );

    // Book 2: Letters
    const letterChapters = [];
    for (const letter of letters) {
      const verses = parseContent(letter.content);
      console.log(`Letter ${letter.num}: ${verses.length} sentences`);
      letterChapters.push({
        chapter: String(letter.num),
        title: letter.title,
        verses,
      });
    }

    const book2 = {
      book: 'Letters',
      slug: 'letters',
      count: letterChapters.length,
      chapters: letterChapters,
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'letters.json'),
      JSON.stringify(book2, null, 2)
    );

    // Write metadata
    const metadata = {
      id: READING_ID,
      title: 'The Practice of the Presence of God',
      author: 'Brother Lawrence',
      source: SOURCE_URL,
      books: [
        { id: 1, slug: 'conversations', title: 'Conversations', chapters: convChapters.length },
        { id: 2, slug: 'letters', title: 'Letters', chapters: letterChapters.length },
      ],
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );

    const totalSentences = convChapters.reduce((sum, c) => sum + c.verses.length, 0) +
                           letterChapters.reduce((sum, c) => sum + c.verses.length, 0);

    console.log('\n✓ Import complete!');
    console.log(`  - 2 books (Conversations + Letters)`);
    console.log(`  - ${convChapters.length + letterChapters.length} total chapters`);
    console.log(`  - ${totalSentences} total sentences`);
    console.log(`\nFiles written to: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

main();
