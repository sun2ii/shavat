import { Metadata } from 'next';
import BookReadingRoute, { BookReadingParams, bookReadingMetadata } from '@/components/BookReadingRoute';

interface Props {
  params: BookReadingParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return bookReadingMetadata(params.book);
}

export default function NewTestamentBookPage({ params }: Props) {
  return <BookReadingRoute book={params.book} slug={params.slug} testament="nt" />;
}
