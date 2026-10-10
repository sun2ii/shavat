import { getReadingMetadata } from '@/lib/readings-accessor';
import PageHeader from '@/components/PageHeader';
import ReadingChapterGrid from '@/components/ReadingChapterGrid';

export default function ConfessionsPage() {
  const metadata = getReadingMetadata('confessions');

  if (!metadata) {
    return <div>Reading not found</div>;
  }

  return (
    <main className="max-w-4xl mx-auto pb-8 px-4">
      <PageHeader
        kicker={metadata.author}
        title={metadata.title}
        subtitle={`Translated by ${metadata.translator}`}
      />

      <ReadingChapterGrid
        books={metadata.books}
        readingId="confessions"
        singleChapterPerBook
      />
    </main>
  );
}
