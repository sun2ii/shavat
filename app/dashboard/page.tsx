import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import ReadingProgress from './ReadingProgress';

// MOCK: Hierarchical reading progress (book → sections → chapters)
// This would come from user's actual reading state in production
const mockProgress = [
  {
    book: 'Genesis',
    slug: 'genesis',
    sections: [
      { id: 'creation', title: 'Creation', chapters: [1, 2], completed: [1, 2] },
      { id: 'adam-eve', title: 'Adam & Eve', chapters: [3, 4, 5], completed: [3, 4, 5] },
      { id: 'noah', title: 'Noah', chapters: [6, 7, 8, 9, 10, 11], completed: [6, 7, 8] },
      { id: 'abraham', title: 'Abraham', chapters: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], completed: [] },
      { id: 'isaac', title: 'Isaac', chapters: [26, 27], completed: [] },
      { id: 'jacob', title: 'Jacob', chapters: [28, 29, 30, 31, 32, 33, 34, 35, 36], completed: [] },
      { id: 'joseph', title: 'Joseph', chapters: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], completed: [] },
    ],
  },
  {
    book: 'Mark',
    slug: 'mark',
    sections: [
      { id: 'preparation', title: 'Preparation', chapters: [1], completed: [1] },
      { id: 'galilean', title: 'Galilean Ministry', chapters: [2, 3, 4, 5, 6, 7, 8], completed: [2, 3, 4, 5, 6, 7, 8] },
      { id: 'journey', title: 'Journey to Jerusalem', chapters: [9, 10], completed: [9, 10] },
      { id: 'passion', title: 'Passion Week', chapters: [11, 12, 13, 14, 15, 16], completed: [11, 12, 13, 14, 15, 16] },
    ],
  },
];

// MOCK: Bookmarks
const mockBookmarks = [
  { book: 'Genesis', slug: 'genesis', chapter: 22, verse: 8, text: 'God will provide for himself the lamb...' },
  { book: 'Genesis', slug: 'genesis', chapter: 1, verse: 1, text: 'In the beginning God created the heavens and the earth.' },
  { book: 'Mark', slug: 'mark', chapter: 10, verse: 45, text: 'For even the Son of Man came not to be served but to serve...' },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Calculate stats from hierarchical data
  const stats = mockProgress.reduce(
    (acc, book) => {
      const bookSections = book.sections.length;
      const completedSections = book.sections.filter(
        (s) => s.completed.length === s.chapters.length
      ).length;
      const totalChapters = book.sections.reduce((sum, s) => sum + s.chapters.length, 0);
      const completedChapters = book.sections.reduce((sum, s) => sum + s.completed.length, 0);

      return {
        totalSections: acc.totalSections + bookSections,
        completedSections: acc.completedSections + completedSections,
        totalChapters: acc.totalChapters + totalChapters,
        completedChapters: acc.completedChapters + completedChapters,
      };
    },
    { totalSections: 0, completedSections: 0, totalChapters: 0, completedChapters: 0 }
  );

  // Find current reading position (first incomplete section)
  const currentReading = mockProgress
    .map((book) => {
      const inProgressSection = book.sections.find(
        (s) => s.completed.length > 0 && s.completed.length < s.chapters.length
      );
      if (inProgressSection) {
        const nextChapter = inProgressSection.chapters.find(
          (ch) => !inProgressSection.completed.includes(ch)
        );
        return { book: book.book, slug: book.slug, section: inProgressSection.title, chapter: nextChapter };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-2xl font-semibold text-[rgb(var(--text-primary))]">
          Dashboard
        </h1>
        <LogoutButton />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[rgb(var(--surface))] rounded-lg border border-hairline p-4 text-center">
          <div className="font-playfair text-2xl font-semibold text-[rgb(var(--text-primary))]">
            {stats.completedSections}/{stats.totalSections}
          </div>
          <div className="font-sans text-[10px] text-faint uppercase tracking-wide mt-1">Sections</div>
        </div>
        <div className="bg-[rgb(var(--surface))] rounded-lg border border-hairline p-4 text-center">
          <div className="font-playfair text-2xl font-semibold text-[rgb(var(--text-primary))]">
            {stats.completedChapters}
          </div>
          <div className="font-sans text-[10px] text-faint uppercase tracking-wide mt-1">Chapters</div>
        </div>
        <div className="bg-[rgb(var(--surface))] rounded-lg border border-hairline p-4 text-center">
          <div className="font-playfair text-2xl font-semibold text-gold-ink">
            {Math.round((stats.completedChapters / stats.totalChapters) * 100)}%
          </div>
          <div className="font-sans text-[10px] text-faint uppercase tracking-wide mt-1">Complete</div>
        </div>
      </div>

      {/* Continue Reading */}
      {currentReading.length > 0 && (
        <div className="mb-6">
          {currentReading.map((item) => (
            <Link
              key={item!.slug}
              href={`/${item!.slug}/${item!.chapter}`}
              className="block bg-[rgb(var(--surface))] rounded-lg border border-hairline p-4 hover:border-gold transition-colors"
            >
              <div className="font-sans text-[10px] uppercase tracking-widest text-faint mb-1">
                Continue Reading
              </div>
              <div className="font-playfair text-lg text-[rgb(var(--text-primary))]">
                {item!.book} · {item!.section}
              </div>
              <div className="font-sans text-sm text-muted mt-0.5">
                Chapter {item!.chapter}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Books with sections (collapsible) */}
      <ReadingProgress books={mockProgress} />

      {/* Bookmarks */}
      {mockBookmarks.length > 0 && (
        <div className="mt-6 bg-[rgb(var(--surface))] rounded-lg border border-hairline overflow-hidden">
          <div className="px-4 py-3 border-b border-hairline flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-sans text-xs tracking-widest uppercase font-bold text-[rgb(var(--text-tertiary))]">
                Bookmarks
              </h2>
              <span className="font-sans text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 uppercase">
                Mock
              </span>
            </div>
            <span className="font-sans text-xs text-faint">{mockBookmarks.length}</span>
          </div>
          <div className="divide-y divide-hairline">
            {mockBookmarks.map((bm, i) => (
              <Link
                key={i}
                href={`/${bm.slug}/${bm.chapter}?verse=${bm.verse}`}
                className="block px-4 py-3 hover:bg-[rgb(var(--bg-secondary))] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-sans text-xs font-semibold text-gold-ink">
                    {bm.book} {bm.chapter}:{bm.verse}
                  </span>
                </div>
                <p className="font-serif text-sm text-[rgb(var(--text-secondary))] line-clamp-1">
                  {bm.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
