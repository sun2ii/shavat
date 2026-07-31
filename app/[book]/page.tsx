import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllDivisions } from '@/lib/book-metadata-utils';
import { readingPath } from '@/lib/routes';

// The one landing template for every book. Prose lives in
// data/books/<slug>.json; a book is added by adding a JSON file.

interface LandingItem {
  title: string;
  body: string;
}

interface BookLanding {
  slug: string;
  name: string;
  description: string;
  intro: string;
  themes?: LandingItem[];
  structure?: LandingItem[];
  whyRead?: string;
}

const booksDir = path.join(process.cwd(), 'data', 'books');

function loadLanding(slug: string): BookLanding | null {
  const file = path.join(booksDir, `${slug}.json`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as BookLanding;
}

interface Props {
  params: { book: string };
}

export function generateStaticParams() {
  return fs
    .readdirSync(booksDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ book: f.replace(/\.json$/, '') }));
}

export function generateMetadata({ params }: Props): Metadata {
  const landing = loadLanding(params.book);
  if (!landing) {
    return { title: 'Shavat' };
  }
  return {
    title: `Shavat | ${landing.name}`,
    description: landing.description,
  };
}

function ItemList({ items, spacing, titleMargin }: { items: LandingItem[]; spacing: string; titleMargin?: string }) {
  return (
    <div className={`${spacing} mb-8`}>
      {items.map((item) => (
        <div key={item.title}>
          <h3 className={`text-base font-semibold text-[rgb(var(--text-primary))]${titleMargin ? ` ${titleMargin}` : ''}`}>
            {item.title}
          </h3>
          <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function BookLandingPage({ params }: Props) {
  const landing = loadLanding(params.book);
  if (!landing) {
    notFound();
  }

  const divisions = getAllDivisions(landing.slug);

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          {landing.name}
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          {landing.intro}
        </p>

        {landing.themes && (
          <>
            <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
              Key Themes
            </h2>
            <ItemList items={landing.themes} spacing="space-y-4" titleMargin="mb-1" />
          </>
        )}

        {landing.structure && (
          <>
            <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
              Structure Overview
            </h2>
            <ItemList items={landing.structure} spacing="space-y-3" />
          </>
        )}

        {landing.whyRead && (
          <>
            <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
              Why read this book?
            </h2>
            <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
              {landing.whyRead}
            </p>
          </>
        )}

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={readingPath(landing.slug, division.id, division.chapters[0])}
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
