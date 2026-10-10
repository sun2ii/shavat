import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getReadingMetadata, createReadingAccessor } from '@/lib/readings-accessor';
import { getCurrentUser } from '@/lib/auth';
import BookReader from '@/components/BookReader';

interface Props {
  params: Promise<{ book: string; chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book } = await params;
  const bookNum = parseInt(book);

  const metadata = getReadingMetadata('confessions');
  const bookInfo = metadata?.books.find((b) => b.id === bookNum);

  const title = bookInfo
    ? `Book ${bookNum}: ${bookInfo.title} | Confessions`
    : `Confessions Book ${book}`;

  return {
    title,
    openGraph: {
      title,
      images: ['/shavat.png'],
    },
  };
}

export default async function ConfessionsChapterPage({ params }: Props) {
  const { book, chapter } = await params;
  const bookNum = parseInt(book);
  const chapterNum = parseInt(chapter);

  if (isNaN(bookNum) || bookNum < 1 || bookNum > 13) {
    redirect('/readings/confessions');
  }

  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  const metadata = getReadingMetadata('confessions');
  if (!metadata) {
    notFound();
  }

  const bookInfo = metadata.books.find((b) => b.id === bookNum);
  if (!bookInfo) {
    redirect('/readings/confessions');
  }

  // Each book has only 1 chapter in this structure
  if (isNaN(chapterNum) || chapterNum !== 1) {
    redirect(`/readings/confessions/${bookNum}/1`);
  }

  const accessor = createReadingAccessor('confessions', `confessions-${bookNum}`);
  if (!accessor) {
    notFound();
  }

  const chapterData = accessor.getChapter(chapterNum);
  if (!chapterData) {
    notFound();
  }

  // For Confessions, navigation is between books (each book = 1 chapter)
  const prevBookInfo = bookNum > 1 ? metadata.books.find((b) => b.id === bookNum - 1) : null;
  const nextBookInfo = bookNum < 13 ? metadata.books.find((b) => b.id === bookNum + 1) : null;

  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/readings/confessions"
            className="text-sm text-gold hover:text-gold-ink transition-colors"
          >
            ← Confessions
          </Link>
          <h1 className="text-2xl font-serif font-light text-ink mt-2">
            Book {bookNum}: {bookInfo.title}
          </h1>
          <p className="text-sm text-muted mt-1">
            Saint Augustine
          </p>
        </div>

        {/* Divider */}
        <div className="mb-6 pb-4 border-b border-hairline" />
      </div>

      {/* Reader with all features */}
      <BookReader
        verses={chapterData.verses}
        book={`confessions-${bookNum}`}
        chapter={chapterNum}
        prevChapter={null}
        nextChapter={null}
        isAuthenticated={isAuthenticated}
        initialCursor={1}
      />

      {/* Bottom navigation */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center pt-6 border-t border-hairline">
          <div>
            {prevBookInfo ? (
              <Link
                href={`/readings/confessions/${prevBookInfo.id}/1`}
                className="inline-flex min-h-[44px] items-center px-4 py-2 text-sm border border-hairline rounded hover:border-gold/50 hover:bg-gold/10 transition-colors"
              >
                ← Book {prevBookInfo.id}
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div>
            {nextBookInfo ? (
              <Link
                href={`/readings/confessions/${nextBookInfo.id}/1`}
                className="inline-flex min-h-[44px] items-center px-4 py-2 text-sm border border-hairline rounded hover:border-gold/50 hover:bg-gold/10 transition-colors"
              >
                Book {nextBookInfo.id} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
