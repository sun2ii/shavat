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
  const { book, chapter } = await params;
  const bookNum = parseInt(book);
  const chapterNum = parseInt(chapter);

  const metadata = getReadingMetadata('practice-presence-god');
  const bookInfo = metadata?.books.find((b) => b.id === bookNum);

  const title = bookInfo
    ? `${bookInfo.title} ${chapterNum} | Practice of the Presence of God`
    : `Practice of the Presence of God`;

  return {
    title,
    openGraph: {
      title,
      images: ['/shavat.png'],
    },
  };
}

export default async function PracticePresenceChapterPage({ params }: Props) {
  const { book, chapter } = await params;
  const bookNum = parseInt(book);
  const chapterNum = parseInt(chapter);

  if (isNaN(bookNum) || bookNum < 1 || bookNum > 2) {
    redirect('/readings/practice-presence-god');
  }

  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  const metadata = getReadingMetadata('practice-presence-god');
  if (!metadata) {
    notFound();
  }

  const bookInfo = metadata.books.find((b) => b.id === bookNum);
  if (!bookInfo) {
    redirect('/readings/practice-presence-god');
  }

  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > bookInfo.chapters) {
    redirect(`/readings/practice-presence-god/${bookNum}/1`);
  }

  const accessor = createReadingAccessor('practice-presence-god', bookInfo.slug);
  if (!accessor) {
    notFound();
  }

  const chapterData = accessor.getChapter(chapterNum);
  if (!chapterData) {
    notFound();
  }

  // Calculate prev/next navigation
  const prevChapter = chapterNum > 1 ? chapterNum - 1 : null;
  const nextChapter = chapterNum < bookInfo.chapters ? chapterNum + 1 : null;

  // Calculate prev/next book boundaries
  const prevBookInfo = bookNum > 1 ? metadata.books.find((b) => b.id === bookNum - 1) : null;
  const nextBookInfo = bookNum < 2 ? metadata.books.find((b) => b.id === bookNum + 1) : null;

  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/readings/practice-presence-god"
            className="text-sm text-gold hover:text-gold-ink transition-colors"
          >
            ← Practice of the Presence of God
          </Link>
          <h1 className="text-2xl font-serif font-light text-ink mt-2">
            {bookInfo.title}
          </h1>
          <p className="text-sm text-muted mt-1">
            {chapterData.title}
          </p>
        </div>

        {/* Divider */}
        <div className="mb-6 pb-4 border-b border-hairline" />
      </div>

      {/* Reader with all features */}
      <BookReader
        verses={chapterData.verses}
        book={bookInfo.slug}
        chapter={chapterNum}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        isAuthenticated={isAuthenticated}
        initialCursor={1}
      />

      {/* Bottom navigation */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center pt-6 border-t border-hairline">
          <div>
            {prevChapter ? (
              <Link
                href={`/readings/practice-presence-god/${bookNum}/${prevChapter}`}
                className="inline-flex min-h-[44px] items-center px-4 py-2 text-sm border border-hairline rounded hover:border-gold/50 hover:bg-gold/10 transition-colors"
              >
                ← {bookInfo.title} {prevChapter}
              </Link>
            ) : prevBookInfo ? (
              <Link
                href={`/readings/practice-presence-god/${prevBookInfo.id}/${prevBookInfo.chapters}`}
                className="inline-flex min-h-[44px] items-center px-4 py-2 text-sm border border-hairline rounded hover:border-gold/50 hover:bg-gold/10 transition-colors"
              >
                ← {prevBookInfo.title}
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div>
            {nextChapter ? (
              <Link
                href={`/readings/practice-presence-god/${bookNum}/${nextChapter}`}
                className="inline-flex min-h-[44px] items-center px-4 py-2 text-sm border border-hairline rounded hover:border-gold/50 hover:bg-gold/10 transition-colors"
              >
                {bookInfo.title} {nextChapter} →
              </Link>
            ) : nextBookInfo ? (
              <Link
                href={`/readings/practice-presence-god/${nextBookInfo.id}/1`}
                className="inline-flex min-h-[44px] items-center px-4 py-2 text-sm border border-hairline rounded hover:border-gold/50 hover:bg-gold/10 transition-colors"
              >
                {nextBookInfo.title} →
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
