import { getNTSections } from '@/lib/extractSections';
import { BIBLE_INDEX, getBooksByCategory } from '@/lib/bible-index';
import NTBookSection from '@/components/NTBookSection';

export const metadata = {
  title: 'New Testament Table of Contents',
  description: 'Comprehensive outline of all New Testament books, chapters, and sections',
};

export default function NTTableOfContents() {
  const allSections = getNTSections();

  // Group NT books by category (excluding Gospels - they have their own page)
  const acts = BIBLE_INDEX.filter(b => b.category === 'acts');
  const pauline = BIBLE_INDEX.filter(b => b.category === 'pauline');
  const general = BIBLE_INDEX.filter(b => b.category === 'general');
  const apocalypse = BIBLE_INDEX.filter(b => b.category === 'apocalypse');

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            New Testament
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Acts, Letters, and Revelation (Gospels have their own page)
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Acts + Revelation */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
              History
            </h2>
            <div className="space-y-1 mb-6">
              {acts.map(book => {
                const sections = allSections[book.slug];
                if (!sections) return null;
                return (
                  <NTBookSection
                    key={book.slug}
                    bookName={book.name}
                    bookSlug={book.slug}
                    chapterSections={sections}
                  />
                );
              })}
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
              Prophecy
            </h2>
            <div className="space-y-1">
              {apocalypse.map(book => {
                const sections = allSections[book.slug];
                if (!sections) return null;
                return (
                  <NTBookSection
                    key={book.slug}
                    bookName={book.name}
                    bookSlug={book.slug}
                    chapterSections={sections}
                  />
                );
              })}
            </div>
          </section>

          {/* Pauline Epistles */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
              Paul's Letters
            </h2>
            <div className="space-y-1">
              {pauline.map(book => {
                const sections = allSections[book.slug];
                if (!sections) return null;
                return (
                  <NTBookSection
                    key={book.slug}
                    bookName={book.name}
                    bookSlug={book.slug}
                    chapterSections={sections}
                  />
                );
              })}
            </div>
          </section>

          {/* General Epistles */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
              General Letters
            </h2>
            <div className="space-y-1">
              {general.map(book => {
                const sections = allSections[book.slug];
                if (!sections) return null;
                return (
                  <NTBookSection
                    key={book.slug}
                    bookName={book.name}
                    bookSlug={book.slug}
                    chapterSections={sections}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
