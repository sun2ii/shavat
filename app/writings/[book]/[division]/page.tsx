import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown, { Components } from 'react-markdown';
import Link from 'next/link';
import { getWritingByPath } from '@/lib/hasWritings';
import {
  getWritingContent,
  getDivisionWritingContent,
  divisionWritingFile,
} from '@/lib/getWritingContent';
import { getDivisionById } from '@/lib/book-metadata-utils';
import { getBooksByTopLevelCategory } from '@/lib/top-level-categories';
import { readingPath } from '@/lib/routes';

interface Props {
  params: {
    book: string;
    division: string;
  };
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6 mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-normal text-[rgb(var(--text-primary))] mb-3 mt-6">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
      {children}
    </p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gold pl-4 italic my-6 text-[rgb(var(--text-secondary))]">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[rgb(var(--text-primary))]">
      {children}
    </strong>
  ),
  hr: () => <hr className="border-[rgb(var(--border))] my-8" />,
};

function getBookName(bookSlug: string): string {
  const allBooks = [
    ...getBooksByTopLevelCategory('torah'),
    ...getBooksByTopLevelCategory('old-testament'),
    ...getBooksByTopLevelCategory('gospels'),
    ...getBooksByTopLevelCategory('new-testament'),
  ];

  return allBooks.find((b) => b.slug === bookSlug)?.name || bookSlug;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const writing = getWritingByPath(params.book, params.division);

  if (writing) {
    return {
      title: `Shavat | ${writing.title}`,
      description: `Theological writing on ${params.book}`,
    };
  }

  const division = getDivisionById(params.book, params.division);

  if (division) {
    return {
      title: `Shavat | ${division.title}`,
      description: `Writing on ${getBookName(params.book)}: ${division.title}`,
    };
  }

  return {
    title: 'Shavat | Writings',
  };
}

export default async function WritingPage({ params }: Props) {
  const bookName = getBookName(params.book);
  const writing = getWritingByPath(params.book, params.division);

  // A registered chapter writing
  if (writing) {
    const content = await getWritingContent(params.book, writing.chapter);

    if (!content) {
      notFound();
    }

    return (
      <WritingLayout
        backHref={readingPath(params.book, writing.chapter)}
        backLabel={`Read ${bookName} ${writing.chapter}`}
      >
        <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
      </WritingLayout>
    );
  }

  // A division writing — the summary of a whole movement
  const division = getDivisionById(params.book, params.division);

  if (!division) {
    notFound();
  }

  const content = await getDivisionWritingContent(params.book, params.division);
  const firstChapter = division.chapters[0];

  return (
    <WritingLayout
      backHref={readingPath(params.book, division.id, firstChapter)}
      backLabel={`Read ${bookName} ${firstChapter}`}
    >
      {content ? (
        <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
      ) : (
        <>
          <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-2 mt-0">
            {division.title}
          </h1>
          <p className="text-sm text-[rgb(var(--text-secondary))] opacity-70 mb-8">
            {bookName} {division.chapters[0]}–{division.chapters[division.chapters.length - 1]}
            {division.theme ? ` · ${division.theme}` : ''}
          </p>
          <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-4">
            Nothing recorded here yet. Write this summary in:
          </p>
          <p className="font-mono text-sm text-[rgb(var(--text-primary))] px-4 py-3 rounded border border-[rgb(var(--border))] inline-block">
            {divisionWritingFile(params.book, division.id)}
          </p>
        </>
      )}
    </WritingLayout>
  );
}

function WritingLayout({
  backHref,
  backLabel,
  children,
}: {
  backHref: string;
  backLabel: string;
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-3xl lg:max-w-none mx-auto select-text">
      <div className="mb-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>←</span>
          <span>{backLabel}</span>
        </Link>
      </div>

      <article className="prose prose-lg prose-invert max-w-none">{children}</article>

      <div className="mt-12 pt-6 border-t border-[rgb(var(--border))] flex justify-between">
        <Link
          href="/writings"
          className="text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          ← All Writings
        </Link>
        <Link
          href={backHref}
          className="text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          Read Chapter →
        </Link>
      </div>
    </main>
  );
}
