/**
 * Strong's Hebrew Lexicon Import Script
 *
 * Converts the Open Scriptures Strong's Hebrew dictionary JS file
 * to a normalized JSON format for the lexicon layer.
 *
 * Usage: npx tsx scripts/import-strongs-hebrew.ts
 *
 * Input:  scripts/strongs-hebrew-dictionary.js
 * Output: lib/data/lexicon/hebrew-strongs.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Types for our normalized output
interface StrongsEntry {
  strong: string;
  lemma: string;
  transliteration: string;
  pronunciation: string;
  derivation: string;
  definition: string;
  kjvGloss: string;
}

interface StrongsLexicon {
  language: 'hebrew';
  source: 'Open Scriptures';
  version: string;
  entries: Record<string, StrongsEntry>;
}

// Main execution
const scriptDir = join(process.cwd(), 'scripts');
const outputDir = join(process.cwd(), 'lib', 'data', 'lexicon');

const jsPath = join(scriptDir, 'strongs-hebrew-dictionary.js');
const outputPath = join(outputDir, 'hebrew-strongs.json');

console.log('Reading Strong\'s Hebrew dictionary JS...');
const jsContent = readFileSync(jsPath, 'utf-8');

// Extract the object from the JS file
// The file contains: var strongsHebrewDictionary = {...};
// and ends with: module.exports = strongsHebrewDictionary;
const match = jsContent.match(/var strongsHebrewDictionary = (\{[\s\S]+?\});\s*\n\s*module\.exports/);
if (!match) {
  throw new Error('Could not extract dictionary object from JS file');
}

console.log('Parsing JSON...');
const rawDict = JSON.parse(match[1]) as Record<string, {
  lemma: string;
  xlit: string;
  pron: string;
  derivation?: string;
  strongs_def?: string;
  kjv_def?: string;
}>;

console.log('Normalizing entries...');
const lexicon: StrongsLexicon = {
  language: 'hebrew',
  source: 'Open Scriptures',
  version: '1.0',
  entries: {},
};

let count = 0;
for (const [strongNum, entry] of Object.entries(rawDict)) {
  lexicon.entries[strongNum] = {
    strong: strongNum,
    lemma: entry.lemma || '',
    transliteration: entry.xlit || '',
    pronunciation: entry.pron || '',
    derivation: entry.derivation || '',
    definition: entry.strongs_def || '',
    kjvGloss: entry.kjv_def || '',
  };
  count++;
}

console.log(`Entries: ${count}`);

// Sample output
console.log('\nSample entries:');
const samples = ['H1', 'H2451', 'H3045', 'H4912', 'H7225'];
for (const s of samples) {
  const e = lexicon.entries[s];
  if (e) {
    console.log(`  ${s}: ${e.lemma} (${e.transliteration}) - ${e.definition.slice(0, 50)}...`);
  }
}

console.log(`\nWriting to ${outputPath}...`);
writeFileSync(outputPath, JSON.stringify(lexicon, null, 2));

console.log('Done!');
