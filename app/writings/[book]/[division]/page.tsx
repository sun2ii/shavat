import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { getWritingByPath, getWritingContent } from '@/lib/hasWritings';
import { getBooksByTopLevelCategory } from '@/lib/top-level-categories';

interface Props {
  params: {
    book: string;
    division: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const writing = getWritingByPath(params.book, params.division);

  if (writing) {
    return {
      title: `Shavat | ${writing.title}`,
      description: `Theological writing on ${params.book}`,
    };
  }

  return {
    title: 'Shavat | Writings',
  };
}

export default async function WritingPage({ params }: Props) {
  const writing = getWritingByPath(params.book, params.division);

  if (!writing) {
    notFound();
  }

  const content = await getWritingContent(params.book, writing.chapter);

  if (!content) {
    notFound();
  }

  const allBooks = [
    ...getBooksByTopLevelCategory('torah'),
    ...getBooksByTopLevelCategory('old-testament'),
    ...getBooksByTopLevelCategory('gospels'),
    ...getBooksByTopLevelCategory('new-testament'),
  ];

  const book = allBooks.find(b => b.slug === params.book);
  const bookName = book?.name || params.book;

  return (
    <main className="max-w-3xl mx-auto">
      {/* Link to chapter */}
      <div className="mb-6">
        <Link
          href={`/${params.book}/${writing.chapter}`}
          className="inline-flex items-center gap-2 text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>←</span>
          <span>Read {bookName} {writing.chapter}</span>
        </Link>
      </div>

      {/* Markdown content */}
      <article className="prose prose-lg prose-invert max-w-none">
        <ReactMarkdown
          components={{
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
            hr: () => (
              <hr className="border-[rgb(var(--border))] my-8" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {/* Navigation */}
      <div className="mt-12 pt-6 border-t border-[rgb(var(--border))] flex justify-between">
        <Link
          href="/writings"
          className="text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          ← All Writings
        </Link>
        <Link
          href={`/${params.book}/${writing.chapter}`}
          className="text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          Read Chapter →
        </Link>
      </div>
    </main>
  );
}
