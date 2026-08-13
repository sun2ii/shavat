import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { BIBLE_INDEX } from '@/lib/bible-index';
import DashboardContent from './DashboardContent';

// Total chapters in the Bible
const TOTAL_BIBLE_CHAPTERS = BIBLE_INDEX.reduce((sum, book) => sum + book.chapterCount, 0);

// Get completed chapters per book from database
async function getCompletedChapters(userEmail: string): Promise<Record<string, number[]>> {
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
}

// Calculate stats for the entire Bible
function calculateBibleStats(completedByBook: Record<string, number[]>) {
  let completedChapters = 0;
  let completedBooks = 0;
  let inProgressBooks = 0;

  for (const book of BIBLE_INDEX) {
    const completed = completedByBook[book.slug] || [];
    completedChapters += completed.length;

    if (completed.length === book.chapterCount) {
      completedBooks++;
    } else if (completed.length > 0) {
      inProgressBooks++;
    }
  }

  const percentage = ((completedChapters / TOTAL_BIBLE_CHAPTERS) * 100).toFixed(2);

  return {
    completedChapters,
    totalChapters: TOTAL_BIBLE_CHAPTERS,
    completedBooks,
    inProgressBooks,
    totalBooks: 66,
    percentage,
  };
}

// Find current reading position (first incomplete chapter in an in-progress book)
function findCurrentReading(completedByBook: Record<string, number[]>) {
  for (const book of BIBLE_INDEX) {
    const completed = completedByBook[book.slug] || [];
    if (completed.length > 0 && completed.length < book.chapterCount) {
      // Find first incomplete chapter
      for (let ch = 1; ch <= book.chapterCount; ch++) {
        if (!completed.includes(ch)) {
          return { book: book.name, slug: book.slug, chapter: ch };
        }
      }
    }
  }
  return null;
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const completedByBook = await getCompletedChapters(user.email);
  const stats = calculateBibleStats(completedByBook);
  const currentReading = findCurrentReading(completedByBook);

  return (
    <DashboardContent
      stats={stats}
      currentReading={currentReading}
      completedByBook={completedByBook}
    />
  );
}
