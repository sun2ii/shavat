import { getNTSections } from '@/lib/extractSections';
import { BIBLE_INDEX } from '@/lib/bible-index';
import NTBookSection from '@/components/NTBookSection';

export const metadata = {
  title: 'Torah Table of Contents',
  description: 'Comprehensive outline of all five books of the Torah with chapters and sections',
};

export default function TorahTableOfContents() {
  const allSections = getNTSections();

  // Get the 5 Torah books
  const torah = BIBLE_INDEX.filter(b => b.category === 'pentateuch');

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Torah
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Complete outline of the five books of Moses
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {torah.map(book => {
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
