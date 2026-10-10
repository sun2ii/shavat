import { getReadingMetadata } from '@/lib/readings-accessor';
import PageHeader from '@/components/PageHeader';
import ReadingChapterGrid from '@/components/ReadingChapterGrid';

export default function PracticePresencePage() {
  const metadata = getReadingMetadata('practice-presence-god');

  if (!metadata) {
    return <div>Reading not found</div>;
  }

  return (
    <main className="max-w-4xl mx-auto pb-8 px-4">
      <PageHeader
        kicker={metadata.author}
        title={metadata.title}
      />

      <ReadingChapterGrid
        books={metadata.books}
        readingId="practice-presence-god"
      />
    </main>
  );
}
