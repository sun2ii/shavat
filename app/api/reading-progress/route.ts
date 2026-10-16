import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { getCurrentSeason } from '@/lib/seasons';
import { isChristianReading } from '@/lib/book-helpers';

// Christian Readings always use season 1 (not affected by Bible reading seasons)
const CHRISTIAN_READINGS_SEASON = 1;

// GET: Fetch completed chapters for a book (or all books)
// Bible books use current season; Christian Readings always use season 1
export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');

  try {
    const bibleSeason = await getCurrentSeason(user.email);

    if (book) {
      // Determine which season to query based on book type
      const season = isChristianReading(book) ? CHRISTIAN_READINGS_SEASON : bibleSeason;

      const rows = await sql`
        SELECT chapter
        FROM reading_progress
        WHERE user_email = ${user.email} AND book = ${book} AND season = ${season}
        ORDER BY chapter
      `;
      const chapters = rows.map((r) => r.chapter as number);
      return NextResponse.json({ chapters, season: bibleSeason });
    } else {
      // Get all progress: Bible books from current season, Christian Readings from season 1
      const rows = await sql`
        SELECT book, array_agg(chapter ORDER BY chapter) as chapters
        FROM reading_progress
        WHERE user_email = ${user.email}
          AND season = ${bibleSeason}
        GROUP BY book
      `;

      // Also get Christian Readings from season 1 if different
      let readingsRows: Record<string, unknown>[] = [];
      if (bibleSeason !== CHRISTIAN_READINGS_SEASON) {
        readingsRows = await sql`
          SELECT book, array_agg(chapter ORDER BY chapter) as chapters
          FROM reading_progress
          WHERE user_email = ${user.email}
            AND season = ${CHRISTIAN_READINGS_SEASON}
          GROUP BY book
        `;
      }

      const progress: Record<string, number[]> = {};
      for (const row of rows) {
        progress[row.book as string] = row.chapters as number[];
      }
      // Add Christian Readings (filter to only include actual readings)
      for (const row of readingsRows) {
        if (isChristianReading(row.book as string)) {
          progress[row.book as string] = row.chapters as number[];
        }
      }
      return NextResponse.json({ progress, season: bibleSeason });
    }
  } catch (err) {
    console.error('Error fetching reading progress:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// POST: Mark a chapter as completed
// Bible books use current season; Christian Readings always use season 1
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { book, chapter } = body as { book: string; chapter: number };

    if (!book || chapter === undefined) {
      return NextResponse.json({ error: 'Missing book or chapter' }, { status: 400 });
    }

    const bibleSeason = await getCurrentSeason(user.email);
    const season = isChristianReading(book) ? CHRISTIAN_READINGS_SEASON : bibleSeason;

    // Upsert: insert or update completed_at if already exists for this season
    await sql`
      INSERT INTO reading_progress (user_email, book, chapter, season, completed_at)
      VALUES (${user.email}, ${book}, ${chapter}, ${season}, NOW())
      ON CONFLICT (user_email, book, chapter, season)
      DO UPDATE SET completed_at = NOW()
    `;

    return NextResponse.json({ success: true, season: bibleSeason });
  } catch (err) {
    console.error('Error saving reading progress:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// DELETE: Unmark a chapter as completed
// Bible books use current season; Christian Readings always use season 1
export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { book, chapter } = body as { book: string; chapter: number };

    if (!book || chapter === undefined) {
      return NextResponse.json({ error: 'Missing book or chapter' }, { status: 400 });
    }

    const bibleSeason = await getCurrentSeason(user.email);
    const season = isChristianReading(book) ? CHRISTIAN_READINGS_SEASON : bibleSeason;

    await sql`
      DELETE FROM reading_progress
      WHERE user_email = ${user.email} AND book = ${book} AND chapter = ${chapter} AND season = ${season}
    `;

    return NextResponse.json({ success: true, season: bibleSeason });
  } catch (err) {
    console.error('Error deleting reading progress:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
