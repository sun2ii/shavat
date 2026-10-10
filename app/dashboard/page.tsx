import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { getBookBySlug } from '@/lib/bible-index';
import { readingPath } from '@/lib/routes';
import { nextChapterAfter } from '@/lib/next-chapter';
import { isChristianReading, readingDisplayName, readingChapterPath } from '@/lib/book-helpers';
import JumpBack, { ReadingTarget } from '@/components/dashboard/JumpBack';
import ReadingCalendar from '@/components/dashboard/ReadingCalendar';

// Get continue target for Bible books only
async function getBibleContinueTarget(userEmail: string): Promise<ReadingTarget | null> {
  try {
    // Get all Bible reading progress
    const allProgress = await sql`
      SELECT book, chapter, completed_at
      FROM reading_progress
      WHERE user_email = ${userEmail}
      ORDER BY completed_at DESC
    `;

    // Filter to Bible books only and find the most recent
    const bibleProgress = allProgress.filter(r => !isChristianReading(r.book as string));
    if (bibleProgress.length === 0) return null;

    const last = { book: bibleProgress[0].book as string, chapter: bibleProgress[0].chapter as number };

    const completedChapters = bibleProgress
      .filter(r => r.book === last.book)
      .map(r => r.chapter as number);

    const next = nextChapterAfter(last, completedChapters);
    if (!next) return null;

    const book = getBookBySlug(next.book);
    if (!book) return null;
    return { href: readingPath(next.book, next.chapter), label: `${book.name} ${next.chapter}` };
  } catch {
    return null;
  }
}

// Get continue target for Christian Readings only
async function getReadingsContinueTarget(userEmail: string): Promise<ReadingTarget | null> {
  try {
    // Get all Christian Readings progress
    const allProgress = await sql`
      SELECT book, chapter, completed_at
      FROM reading_progress
      WHERE user_email = ${userEmail}
      ORDER BY completed_at DESC
    `;

    // Filter to Christian Readings only and find the most recent
    const readingsProgress = allProgress.filter(r => isChristianReading(r.book as string));
    if (readingsProgress.length === 0) return null;

    const lastBook = readingsProgress[0].book as string;
    const lastChapter = readingsProgress[0].chapter as number;

    // Find completed chapters for this book
    const completedChapters = readingsProgress
      .filter(r => r.book === lastBook)
      .map(r => r.chapter as number);

    // Simple next chapter logic for readings (they're sequential)
    const maxCompleted = Math.max(...completedChapters);
    const nextChapter = maxCompleted + 1;

    // For now, just suggest the next chapter in the same book
    const displayName = readingDisplayName(lastBook);
    const shortName = displayName.includes('Book')
      ? displayName
      : displayName.split(' ').slice(0, 2).join(' ');

    return {
      href: readingChapterPath(lastBook, nextChapter),
      label: `${shortName} ${nextChapter}`
    };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch all reading progress with book slugs to separate Bible from Christian Readings
  const calendarRows = await sql`
    SELECT
      TO_CHAR(DATE(completed_at AT TIME ZONE 'UTC'), 'YYYY-MM-DD') as date,
      book,
      COUNT(*)::int as count
    FROM reading_progress
    WHERE user_email = ${user.email}
      AND completed_at >= NOW() - INTERVAL '365 days'
    GROUP BY DATE(completed_at AT TIME ZONE 'UTC'), book
    ORDER BY DATE(completed_at AT TIME ZONE 'UTC')
  `;

  // Separate calendar data for Bible and Christian Readings
  const bibleCalendarData: Record<string, number> = {};
  const readingsCalendarData: Record<string, number> = {};

  for (const row of calendarRows) {
    const date = row.date as string;
    const book = row.book as string;
    const count = row.count as number;

    if (isChristianReading(book)) {
      readingsCalendarData[date] = (readingsCalendarData[date] || 0) + count;
    } else {
      bibleCalendarData[date] = (bibleCalendarData[date] || 0) + count;
    }
  }

  const bibleTarget = await getBibleContinueTarget(user.email);
  const readingsTarget = await getReadingsContinueTarget(user.email);

  return (
    <main className="min-h-full px-6 py-8 max-w-6xl mx-auto">
      {/* Continue reading - side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <section>
          <JumpBack target={bibleTarget} category="Holy Bible" fallbackHref="/library" />
        </section>
        <section>
          <JumpBack target={readingsTarget} category="Christian Readings" fallbackHref="/readings" />
        </section>
      </div>

      {/* Reading activity calendars - side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Holy Bible reading activity */}
        <section>
          <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Holy Bible
          </h2>
          <ReadingCalendar data={bibleCalendarData} weeks={26} />
        </section>

        {/* Christian Readings activity */}
        <section>
          <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400 mb-4">
            Christian Readings
          </h2>
          <ReadingCalendar data={readingsCalendarData} colorScheme="blue" weeks={26} />
        </section>
      </div>
    </main>
  );
}
