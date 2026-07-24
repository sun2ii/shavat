import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BookMemorial from '@/components/BookMemorial';
import { getBookMemorial } from '@/lib/writings/bookMemorials';

interface Props {
  params: { book: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const book = getBookMemorial(params.book);

  if (!book) {
    return { title: 'Shavat | Writings' };
  }

  return {
    title: `Shavat | ${book.title}`,
    description: `${book.scripture}: ${book.subtitle}`,
    openGraph: {
      title: `Shavat | ${book.title}`,
      images: ['/shavat.png'],
    },
  };
}

/**
 * The book-level memorial. Only books in the registry have one; everything
 * else still reaches its divisions through /writings/<book>/<division>.
 */
export default function BookWritingPage({ params }: Props) {
  const book = getBookMemorial(params.book);

  if (!book) {
    notFound();
  }

  return <BookMemorial book={book} />;
}
