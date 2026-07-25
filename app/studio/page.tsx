import { Metadata } from 'next';
import { BIBLE_INDEX } from '@/lib/bible-index';
import { getAllDivisions } from '@/lib/book-metadata-utils';
import { STUDIO_IS_LIVE } from '@/lib/studio/files';
import StudioEditor, { BookOption } from './StudioEditor';

export const metadata: Metadata = {
  title: 'Shavat | Studio',
  // Unlinked and unindexed. It writes to the working tree and only runs in dev.
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

/**
 * Where a memorial is written. The division list is the same one the reading
 * routes use — <book>-metadata.json is the join key across the whole app, so
 * the studio can only ever write to a movement that already exists.
 */
export default function StudioPage() {
  const books: BookOption[] = BIBLE_INDEX.map((book) => ({
    slug: book.slug,
    name: book.name,
    divisions: getAllDivisions(book.slug).map((division) => ({
      id: division.id,
      title: division.title,
      chapters: division.chapters,
    })),
  })).filter((book) => book.divisions.length > 0);

  return <StudioEditor books={books} live={STUDIO_IS_LIVE} />;
}
