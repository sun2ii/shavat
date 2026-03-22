/**
 * Script to generate book summary pages for all Bible books
 * Run with: npx ts-node scripts/generate-book-pages.ts
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { BIBLE_INDEX } from '../lib/bible-index';

interface BookSummary {
  opening: string;
  themes: Array<{
    title: string;
    description: string;
  }>;
  structureOverview: string;
  whyRead: string;
}

// Book summaries database
const BOOK_SUMMARIES: Record<string, BookSummary> = {
  'philippians': {
    opening: 'Paul writes from prison with joy, encouraging the Philippians to rejoice in the Lord always. This letter combines personal warmth with profound Christology, presenting Jesus\' humiliation and exaltation as the pattern for Christian life and the source of confidence despite suffering.',
    themes: [
      { title: 'Joy in suffering', description: 'Paul rejoices in chains because the gospel advances. Circumstances do not determine joy; Christ does. Even facing death, Paul is torn between desire to depart and be with Christ and the need to remain for the church\'s progress.' },
      { title: 'The mind of Christ', description: 'Christ Jesus, though in the form of God, did not count equality with God a thing to be grasped, but emptied himself, taking the form of a servant. This hymn grounds Christian humility and service in Christ\'s own trajectory from glory to cross to exaltation.' },
      { title: 'Righteousness through faith', description: 'Paul counts everything as loss for the surpassing worth of knowing Christ. His own righteousness from the law is rubbish compared to the righteousness that comes through faith in Christ. This is knowing Christ and the power of his resurrection.' },
      { title: 'Pressing toward the goal', description: 'Not that Paul has already obtained perfection, but he presses on toward the goal for the prize of the upward call of God in Christ Jesus. Believers live between the already and the not yet, citizenship in heaven while feet remain on earth.' },
      { title: 'Partnership in the gospel', description: 'From the first day until now, the Philippians have been partners in the gospel. Paul thanks God for their every remembrance, confident that he who began a good work will bring it to completion at the day of Christ Jesus.' },
    ],
    structureOverview: 'After thanksgiving and prayer (1:1-11), Paul discusses his imprisonment and joy in gospel advancement (1:12-26), calls for unity and humility patterned on Christ (1:27-2:18), commends Timothy and Epaphroditus (2:19-30), warns against false teachers and defines true righteousness (3:1-21), and concludes with exhortations to joy, peace, and thanksgiving (4:1-23).',
    whyRead: 'Philippians is the most personal and joyful of Paul\'s letters, demonstrating that Christian joy is grounded not in circumstances but in Christ. Its presentation of Christ\'s humiliation and exaltation remains central to Christian meditation, and its call to press on toward the goal encourages perseverance in faith.',
  },
  'colossians': {
    opening: 'Paul writes to a church he has never visited, combating false teaching by presenting the absolute supremacy and sufficiency of Christ. Colossians declares that Christ is the image of the invisible God, the firstborn of all creation, and in him all the fullness of God was pleased to dwell.',
    themes: [
      { title: 'The supremacy of Christ', description: 'Christ is before all things, and in him all things hold together. He is the head of the body, the church, the beginning, the firstborn from the dead, that in everything he might be preeminent. All the fullness of God dwells in him bodily.' },
      { title: 'Fullness in Christ', description: 'You have been filled in him, who is the head of all rule and authority. Do not let anyone disqualify you through asceticism, mysticism, or angel worship. These are shadows; the substance belongs to Christ.' },
      { title: 'Hidden with Christ', description: 'You have died, and your life is hidden with Christ in God. When Christ who is your life appears, then you also will appear with him in glory. Set your minds on things above, not on earthly things.' },
      { title: 'Putting off and putting on', description: 'Put to death what is earthly in you: sexual immorality, impurity, passion, evil desire, and covetousness. Put on compassionate hearts, kindness, humility, meekness, patience, bearing with one another, forgiving each other, and above all, love.' },
      { title: 'Christ all in all', description: 'Here there is not Greek and Jew, circumcised and uncircumcised, barbarian, Scythian, slave, free; but Christ is all, and in all. The gospel creates a new humanity transcending all ethnic, social, and religious divisions.' },
    ],
    structureOverview: 'Thanksgiving and prayer for the Colossians (1:1-14), the supremacy of Christ (1:15-23), Paul\'s ministry (1:24-2:5), warnings against false teaching (2:6-23), putting off the old self and putting on the new (3:1-17), household codes (3:18-4:1), and final instructions and greetings (4:2-18).',
    whyRead: 'Colossians presents the most concentrated Christology in Paul\'s letters. Its emphasis on Christ\'s supremacy and sufficiency counters every form of syncretism and legalism, making it essential for churches tempted to add human traditions or mystical experiences to the gospel.',
  },
  // Add more book summaries here for remaining books
  // This is a template that can be extended
};

function generateBookPage(slug: string, name: string): string {
  const summary = BOOK_SUMMARIES[slug];

  if (!summary) {
    // Return a basic template for books without detailed summaries
    return `import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | ${name}',
  description: '${name}',
};

export default function ${name.replace(/[^a-zA-Z]/g, '')}Page() {
  const divisions = getAllDivisions('${slug}');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          ${name}
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          [Book description to be added]
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={\`/${slug}/\${division.id}/\${division.chapters[0]}\`}
              className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-base font-normal text-[rgb(var(--text-primary))] mb-1">
                    {division.title}
                  </h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))] opacity-70">
                    {division.summary}
                  </p>
                </div>
                <span className="text-xs text-[rgb(var(--text-secondary))] opacity-60 whitespace-nowrap">
                  {division.chapters.length} {division.chapters.length === 1 ? 'chapter' : 'chapters'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
`;
  }

  return `import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | ${name}',
  description: '${name}',
};

export default function ${name.replace(/[^a-zA-Z]/g, '')}Page() {
  const divisions = getAllDivisions('${slug}');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          ${name}
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          ${summary.opening}
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          ${summary.themes.map(theme => `<div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              ${theme.title}
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              ${theme.description}
            </p>
          </div>`).join('\n\n          ')}
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          ${summary.structureOverview}
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          ${summary.whyRead}
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={\`/${slug}/\${division.id}/\${division.chapters[0]}\`}
              className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-base font-normal text-[rgb(var(--text-primary))] mb-1">
                    {division.title}
                  </h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))] opacity-70">
                    {division.summary}
                  </p>
                </div>
                <span className="text-xs text-[rgb(var(--text-secondary))] opacity-60 whitespace-nowrap">
                  {division.chapters.length} {division.chapters.length === 1 ? 'chapter' : 'chapters'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
`;
}

// Skip books that already have pages
const EXISTING_PAGES = ['genesis', 'john', 'psalms', 'matthew', 'mark', 'luke', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'acts', 'romans', 'hebrews', 'revelation', '1-corinthians', 'galatians', 'ephesians'];

// Generate pages for all books
BIBLE_INDEX.forEach(book => {
  if (EXISTING_PAGES.includes(book.slug)) {
    console.log(`Skipping ${book.name} (already exists)`);
    return;
  }

  const dir = join(__dirname, '..', 'app', book.slug);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const content = generateBookPage(book.slug, book.name);
  const filePath = join(dir, 'page.tsx');

  writeFileSync(filePath, content);
  console.log(`Generated ${book.name} page`);
});

console.log('\\nDone! Generated all book pages.');
console.log('\\nNote: Books without detailed summaries have been created with placeholder content.');
console.log('You can add full summaries by extending the BOOK_SUMMARIES object in this script.');
