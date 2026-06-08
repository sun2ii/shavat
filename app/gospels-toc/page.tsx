import Link from 'next/link';
import { getNTSections } from '@/lib/extractSections';
import { BIBLE_INDEX } from '@/lib/bible-index';
import NTBookSection from '@/components/NTBookSection';

export const metadata = {
  title: 'Gospels Table of Contents',
  description: 'Comprehensive outline of all four Gospels with chapters and sections',
};

export default function GospelsTableOfContents() {
  const allSections = getNTSections();

  // Get the 4 Gospels
  const gospels = BIBLE_INDEX.filter(b => b.category === 'gospels');

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            Library
          </Link>
          <span className="mx-2">/</span>
          <Link href="/library/gospels" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            Gospels
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-100">Contents</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            The Gospels
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Complete outline of Matthew, Mark, Luke, and John
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gospels.map(book => {
            const sections = allSections[book.slug];
            if (!sections) return null;
            return (
              <section key={book.slug}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
                  {book.name}
                </h2>
                <div className="space-y-1">
                  <NTBookSection
                    bookName={book.name}
                    bookSlug={book.slug}
                    chapterSections={sections}
                  />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
