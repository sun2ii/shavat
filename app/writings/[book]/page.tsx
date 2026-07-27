import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BookMemorial from '@/components/BookMemorial';
import BookOrientation from '@/components/BookOrientation';
import { getBookMemorial, getBookOrientation } from '@/lib/writings/bookWritings';

interface Props {
  params: { book: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const memorial = getBookMemorial(params.book);
  const orientation = getBookOrientation(params.book);
  const writing = memorial ?? orientation;

  if (!writing) {
    return { title: 'Shavat | Writings' };
  }

  return {
    title: `Shavat | ${writing.title}`,
    description: orientation
      ? orientation.summary
      : `${writing.scripture}: ${writing.subtitle}`,
    openGraph: {
      title: `Shavat | ${writing.title}`,
      images: ['/shavat.png'],
    },
  };
}

/**
 * The book-level writing: a memorial of what a book left behind, or an
 * orientation to the ground before reading it. A book has one or the other;
 * everything else still reaches its divisions through /writings/<book>/<division>.
 */
export default function BookWritingPage({ params }: Props) {
  const memorial = getBookMemorial(params.book);
  if (memorial) {
    return <BookMemorial book={memorial} />;
  }

  const orientation = getBookOrientation(params.book);
  if (orientation) {
    return <BookOrientation book={orientation} />;
  }

  notFound();
}
