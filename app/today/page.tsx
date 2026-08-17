import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { BIBLE_INDEX } from '@/lib/bible-index';
import TodayContent from './TodayContent';

// Today — the app's front door. Continue-reading hero, a quiet presence
// line, the most recent saved verse, and the full progress grid below.
// Progress is not a separate destination: this screen absorbs it.

const TOTAL_BIBLE_CHAPTERS = BIBLE_INDEX.reduce((sum, book) => sum + book.chapterCount, 0);

async function getCompletedChapters(userEmail: string): Promise<Record<string, number[]>> {
  try {
    const rows = await sql`
      SELECT book, array_agg(chapter ORDER BY chapter) as chapters
      FROM reading_progress
      WHERE user_email = ${userEmail}
      GROUP BY book
    `;

    const completedByBook: Record<string, number[]> = {};
    for (const row of rows) {
      completedByBook[row.book as string] = row.chapters as number[];
    }
    return completedByBook;
  } catch {
    return {};
  }
}

// First incomplete chapter in an in-progress book — the "Continue" target.
function findCurrentReading(completedByBook: Record<string, number[]>) {
  for (const book of BIBLE_INDEX) {
    const completed = completedByBook[book.slug] || [];
    if (completed.length > 0 && completed.length < book.chapterCount) {
      for (let ch = 1; ch <= book.chapterCount; ch++) {
        if (!completed.includes(ch)) {
          return { book: book.name, slug: book.slug, chapter: ch };
        }
      }
    }
  }
  return null;
}

export default async function TodayPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <TodayContent isAuthenticated={false} currentReading={null} stats={null} completedByBook={{}} />;
  }

  const completedByBook = await getCompletedChapters(user.email);

  let completedChapters = 0;
  for (const book of BIBLE_INDEX) {
    completedChapters += (completedByBook[book.slug] || []).length;
  }
  const stats = {
    completedChapters,
    totalChapters: TOTAL_BIBLE_CHAPTERS,
    percentage: ((completedChapters / TOTAL_BIBLE_CHAPTERS) * 100).toFixed(0),
  };

  return (
    <TodayContent
      isAuthenticated
      currentReading={findCurrentReading(completedByBook)}
      stats={stats}
      completedByBook={completedByBook}
    />
  );
}
