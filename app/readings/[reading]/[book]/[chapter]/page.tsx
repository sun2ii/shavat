import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getReadingMetadata, createReadingAccessor } from '@/lib/readings-accessor';
import { getCurrentUser } from '@/lib/auth';
import BookReader from '@/components/BookReader';
import ReadingNav from '@/components/ReadingNav';

// Supported readings with their configuration
const READINGS_CONFIG: Record<string, {
  maxBooks: number;
  getBookSlug: (bookNum: number) => string;
  getTitle: () => string;
}> = {
  'imitation-of-christ': {
    maxBooks: 4,
    getBookSlug: (bookNum) => `imitation-${bookNum}`,
    getTitle: () => 'The Imitation of Christ',
  },
  'confessions': {
    maxBooks: 13,
    getBookSlug: (bookNum) => `confessions-${bookNum}`,
    getTitle: () => 'Confessions',
  },
  'practice-presence-god': {
    maxBooks: 2,
    getBookSlug: (bookNum) => {
      // Practice of Presence uses slugs from metadata
      const metadata = getReadingMetadata('practice-presence-god');
      return metadata?.books.find(b => b.id === bookNum)?.slug ?? '';
    },
    getTitle: () => 'Practice of the Presence of God',
  },
};

interface Props {
  params: Promise<{ reading: string; book: string; chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { reading, book, chapter } = await params;
  const config = READINGS_CONFIG[reading];
  if (!config) return { title: 'Reading Not Found' };

  const bookNum = parseInt(book);
  const chapterNum = parseInt(chapter);
  const metadata = getReadingMetadata(reading);
  const bookInfo = metadata?.books.find((b) => b.id === bookNum);

  const title = bookInfo
    ? `${bookInfo.title} ${reading === 'confessions' ? '' : `- Chapter ${chapterNum}`} | ${config.getTitle()}`
    : config.getTitle();

  return {
    title,
    openGraph: {
      title,
      images: ['/shavat.png'],
    },
  };
}

export default async function ReadingChapterPage({ params }: Props) {
  const { reading, book, chapter } = await params;
  const config = READINGS_CONFIG[reading];

  // Validate reading exists
  if (!config) {
    notFound();
  }

  const bookNum = parseInt(book);
  const chapterNum = parseInt(chapter);

  // Validate book number
  if (isNaN(bookNum) || bookNum < 1 || bookNum > config.maxBooks) {
    redirect(`/readings/${reading}`);
  }

  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  const metadata = getReadingMetadata(reading);
  if (!metadata) {
    notFound();
  }

  const bookInfo = metadata.books.find((b) => b.id === bookNum);
  if (!bookInfo) {
    redirect(`/readings/${reading}`);
  }

  // Validate chapter number
  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > bookInfo.chapters) {
    redirect(`/readings/${reading}/${bookNum}/1`);
  }

  const bookSlug = config.getBookSlug(bookNum);
  const accessor = createReadingAccessor(reading, bookSlug);
  if (!accessor) {
    notFound();
  }

  const chapterData = accessor.getChapter(chapterNum);
  if (!chapterData) {
    notFound();
  }

  // Calculate prev/next for BookReader
  const prevChapter = chapterNum > 1 ? chapterNum - 1 : null;
  const nextChapter = chapterNum < bookInfo.chapters ? chapterNum + 1 : null;

  // Build book title based on reading type
  const bookTitle = reading === 'confessions' || reading === 'practice-presence-god'
    ? (reading === 'confessions' ? `Book ${bookNum}: ${bookInfo.title}` : bookInfo.title)
    : `Book ${bookNum}: ${bookInfo.title}`;

  return (
    <main>
      <ReadingNav
        readingId={reading}
        readingTitle={config.getTitle()}
        bookSlug={bookSlug}
        bookTitle={bookTitle}
        bookId={bookNum}
        currentChapter={chapterNum}
        totalChapters={bookInfo.chapters}
        chapterTitle={chapterData.title}
        allBooks={metadata.books}
        isAuthenticated={isAuthenticated}
      />

      <BookReader
        verses={chapterData.verses}
        book={bookSlug}
        chapter={chapterNum}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        isAuthenticated={isAuthenticated}
        initialCursor={1}
      />
    </main>
  );
}
