import { notFound, redirect } from 'next/navigation';
import { getChapter } from '@/lib/genesis';
import { getBookById, getBookByChapter } from '@/lib/genesis-collections';
import GenesisReader from '@/components/GenesisReader';
import ChapterNavBook from '@/components/ChapterNavBook';

interface Props {
  params: {
    slug: string[];
  };
}

export default function GenesisPage({ params }: Props) {
  const { slug } = params;

  // Handle /genesis/[chapter] (legacy numeric route)
  if (slug.length === 1) {
    const chapterNum = parseInt(slug[0]);

    if (!isNaN(chapterNum) && chapterNum >= 1 && chapterNum <= 50) {
      const book = getBookByChapter(chapterNum);
      if (book) {
        redirect(`/genesis/${book.id}/${chapterNum}`);
      }
    }

    // Invalid: redirect to library
    redirect('/');
  }

  // Handle /genesis/[book]/[chapter]
  if (slug.length === 2) {
    const [bookId, chapterStr] = slug;
    const chapterNum = parseInt(chapterStr);
    const book = getBookById(bookId);

    // Invalid book → redirect to library
    if (!book) {
      redirect('/');
    }

    // Invalid chapter number
    if (isNaN(chapterNum)) {
      redirect(`/genesis/${bookId}/${book.chapters[0]}`);
    }

    // Chapter not in this book → redirect to correct book
    if (!book.chapters.includes(chapterNum)) {
      const correctBook = getBookByChapter(chapterNum);
      if (correctBook) {
        redirect(`/genesis/${correctBook.id}/${chapterNum}`);
      }
      redirect('/');
    }

    const verses = getChapter(chapterNum);

    if (!verses) {
      notFound();
    }

    return (
      <main>
        <ChapterNavBook
          currentChapter={chapterNum}
          book={book}
        />
        <GenesisReader verses={verses} />
      </main>
    );
  }

  // Too many segments
  redirect('/');
}
