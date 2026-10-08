import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { getBookBySlug } from '@/lib/bible-index';
import { readingPath } from '@/lib/routes';
import { nextChapterAfter } from '@/lib/next-chapter';
import JumpBack, { ReadingTarget } from '@/components/dashboard/JumpBack';

// "Continue reading" = the first unread chapter after the one most recently
// marked complete. Finish Psalm 91 and this points at Psalm 92.
async function getContinueTarget(userEmail: string): Promise<ReadingTarget | null> {
  try {
    const latest = await sql`
      SELECT book, chapter
      FROM reading_progress
      WHERE user_email = ${userEmail}
      ORDER BY completed_at DESC
      LIMIT 1
    `;
    if (latest.length === 0) return null;
    const last = { book: latest[0].book as string, chapter: latest[0].chapter as number };

    const rows = await sql`
      SELECT chapter FROM reading_progress
      WHERE user_email = ${userEmail} AND book = ${last.book}
    `;
    const next = nextChapterAfter(last, rows.map((r) => r.chapter as number));
    if (!next) return null;

    const book = getBookBySlug(next.book);
    if (!book) return null;
    return { href: readingPath(next.book, next.chapter), label: `${book.name} ${next.chapter}` };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const target = await getContinueTarget(user.email);
  return <JumpBack target={target} />;
}
