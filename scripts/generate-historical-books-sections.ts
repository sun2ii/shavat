import fs from 'fs';
import path from 'path';

// Color palette that rotates through sections
const COLORS = [
  { color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

interface MetadataSection {
  verses: string;
  title: string;
}

interface OutputSection {
  title: string;
  verseRange: [number, number];
  color: string;
  borderColor: string;
}

function parseVerseRange(verses: string): [number, number] {
  const parts = verses.split('-').map(v => parseInt(v.trim()));
  if (parts.length === 1) {
    return [parts[0], parts[0]];
  }
  return [parts[0], parts[1]];
}

function convertBook(bookSlug: string) {
  const metadataPath = path.join(process.cwd(), 'lib', `${bookSlug}-metadata.json`);
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

  if (!metadata.chapterSections) {
    console.error(`No chapterSections found in ${bookSlug}-metadata.json`);
    return;
  }

  const output: {
    book: string;
    chapters: Record<string, OutputSection[]>;
  } = {
    book: bookSlug,
    chapters: {}
  };

  for (const [chapterNum, sections] of Object.entries(metadata.chapterSections) as [string, MetadataSection[]][]) {
    output.chapters[chapterNum] = sections.map((section, idx) => ({
      title: section.title,
      verseRange: parseVerseRange(section.verses),
      ...COLORS[idx % COLORS.length]
    }));
  }

  const outputPath = path.join(process.cwd(), 'data', 'sections', `${bookSlug}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`✓ Generated ${outputPath}`);
}

// Generate for all Historical Books
const historicalBooks = ['1-chronicles', '2-chronicles', 'ezra', 'nehemiah', 'esther'];

historicalBooks.forEach(book => convertBook(book));

console.log('\n✅ All Historical Books sections generated!');
