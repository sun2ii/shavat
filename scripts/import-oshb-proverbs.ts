/**
 * OSHB Proverbs Import Script
 *
 * Parses the Open Scriptures Hebrew Bible Proverbs XML
 * and outputs normalized JSON for the interlinear layer.
 *
 * Usage: npx tsx scripts/import-oshb-proverbs.ts
 *
 * Input:  scripts/Prov.xml (downloaded from OSHB)
 * Output: lib/data/interlinear/hebrew/proverbs.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Types for our normalized output
interface HebrewWord {
  index: number;
  surface: string;
  lemma: string;
  /** Strong's numbers - array to handle compound words */
  strong: string[];
  morph: string;
  /** Original OSHB word ID for provenance */
  id: string;
}

interface HebrewVerse {
  [verseNum: string]: HebrewWord[];
}

interface HebrewChapter {
  verses: HebrewVerse;
}

interface HebrewBook {
  book: string;
  language: 'hebrew';
  source: 'OSHB';
  version: string;
  chapters: {
    [chapterNum: string]: HebrewChapter;
  };
}

/**
 * Parse lemma attribute to extract Strong's number(s).
 *
 * Examples:
 *   "4912"       → ["H4912"]
 *   "1121 a"     → ["H1121a"]
 *   "l/3045"     → ["H3045"] (prefix stripped)
 *   "c/4148"     → ["H4148"]
 *   "b/m/6440"   → ["H6440"] (multiple prefixes)
 */
function parseLemma(lemma: string): { strongs: string[]; baseLemma: string } {
  // Split on space to handle variants like "1121 a"
  const parts = lemma.split(' ');

  // Handle prefix notation: strip everything before last /
  let mainPart = parts[0];
  if (mainPart.includes('/')) {
    const segments = mainPart.split('/');
    mainPart = segments[segments.length - 1];
  }

  // Combine with variant letter if present
  const variant = parts[1] || '';
  const baseLemma = mainPart + variant;

  // Format as Strong's number
  const strongNum = `H${baseLemma}`;

  return {
    strongs: [strongNum],
    baseLemma,
  };
}

/**
 * Strip Hebrew cantillation marks (taamim) and vowel points if needed.
 * For now, we preserve the full pointed text.
 */
function cleanSurface(text: string): string {
  // Remove the slash notation that OSHB uses for morpheme boundaries
  // e.g., "לָ/דַ֣עַת" → "לָדַ֣עַת"
  return text.replace(/\//g, '');
}

/**
 * Parse the XML and extract word data.
 * Using regex parsing since the XML is well-structured and consistent.
 */
function parseOSHB(xmlContent: string): HebrewBook {
  const book: HebrewBook = {
    book: 'Proverbs',
    language: 'hebrew',
    source: 'OSHB',
    version: '2.1',
    chapters: {},
  };

  // Match chapters
  const chapterRegex = /<chapter osisID="Prov\.(\d+)">([\s\S]*?)<\/chapter>/g;
  let chapterMatch;

  while ((chapterMatch = chapterRegex.exec(xmlContent)) !== null) {
    const chapterNum = chapterMatch[1];
    const chapterContent = chapterMatch[2];

    book.chapters[chapterNum] = {
      verses: {},
    };

    // Match verses within chapter
    const verseRegex = /<verse osisID="Prov\.\d+\.(\d+)">([\s\S]*?)<\/verse>/g;
    let verseMatch;

    while ((verseMatch = verseRegex.exec(chapterContent)) !== null) {
      const verseNum = verseMatch[1];
      const verseContent = verseMatch[2];

      const words: HebrewWord[] = [];
      let wordIndex = 1;

      // Match word elements
      // <w lemma="4912" n="1.0" morph="HNcmpc" id="20xeN">מִ֭שְׁלֵי</w>
      const wordRegex = /<w\s+([^>]+)>([^<]+)<\/w>/g;
      let wordMatch;

      while ((wordMatch = wordRegex.exec(verseContent)) !== null) {
        const attrs = wordMatch[1];
        const surface = wordMatch[2];

        // Extract attributes
        const lemmaMatch = attrs.match(/lemma="([^"]+)"/);
        const morphMatch = attrs.match(/morph="([^"]+)"/);
        const idMatch = attrs.match(/id="([^"]+)"/);

        if (lemmaMatch) {
          const { strongs } = parseLemma(lemmaMatch[1]);

          words.push({
            index: wordIndex++,
            surface: cleanSurface(surface),
            lemma: lemmaMatch[1],
            strong: strongs,
            morph: morphMatch ? morphMatch[1] : '',
            id: idMatch ? idMatch[1] : '',
          });
        }
      }

      book.chapters[chapterNum].verses[verseNum] = words;
    }
  }

  return book;
}

/**
 * Validate the parsed data
 */
function validate(book: HebrewBook): void {
  const chapterCount = Object.keys(book.chapters).length;
  console.log(`Chapters: ${chapterCount}`);

  if (chapterCount !== 31) {
    console.warn(`Warning: Expected 31 chapters, got ${chapterCount}`);
  }

  let totalVerses = 0;
  let totalWords = 0;

  for (const [chNum, chapter] of Object.entries(book.chapters)) {
    const verseCount = Object.keys(chapter.verses).length;
    totalVerses += verseCount;

    for (const words of Object.values(chapter.verses)) {
      totalWords += words.length;
    }
  }

  console.log(`Verses: ${totalVerses}`);
  console.log(`Words: ${totalWords}`);

  // Sample output
  console.log('\nSample - Proverbs 1:1:');
  const sample = book.chapters['1']?.verses['1'];
  if (sample) {
    sample.forEach((w) => {
      console.log(`  ${w.index}. ${w.surface} | lemma=${w.lemma} | strong=${w.strong.join(',')} | morph=${w.morph}`);
    });
  }
}

// Main execution
const scriptDir = join(process.cwd(), 'scripts');
const outputDir = join(process.cwd(), 'lib', 'data', 'interlinear', 'hebrew');

const xmlPath = join(scriptDir, 'Prov.xml');
const outputPath = join(outputDir, 'proverbs.json');

console.log('Reading OSHB Proverbs XML...');
const xmlContent = readFileSync(xmlPath, 'utf-8');

console.log('Parsing...');
const book = parseOSHB(xmlContent);

console.log('Validating...');
validate(book);

console.log(`\nWriting to ${outputPath}...`);
writeFileSync(outputPath, JSON.stringify(book, null, 2));

console.log('Done!');
