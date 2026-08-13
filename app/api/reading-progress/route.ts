import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';

// GET: Fetch completed chapters for a book (or all books)
export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');

  try {
    if (book) {
      // Get completed chapters for a specific book
      const rows = await sql`
        SELECT chapter
        FROM reading_progress
        WHERE user_email = ${user.email} AND book = ${book}
        ORDER BY chapter
      `;
      const chapters = rows.map((r) => r.chapter as number);
      return NextResponse.json({ chapters });
    } else {
      // Get all progress grouped by book
      const rows = await sql`
        SELECT book, array_agg(chapter ORDER BY chapter) as chapters
        FROM reading_progress
        WHERE user_email = ${user.email}
        GROUP BY book
      `;
      const progress: Record<string, number[]> = {};
      for (const row of rows) {
        progress[row.book as string] = row.chapters as number[];
      }
      return NextResponse.json({ progress });
    }
  } catch (err) {
    console.error('Error fetching reading progress:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// POST: Mark a chapter as completed
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

    // Upsert: insert or update completed_at if already exists
    await sql`
      INSERT INTO reading_progress (user_email, book, chapter, completed_at)
      VALUES (${user.email}, ${book}, ${chapter}, NOW())
      ON CONFLICT (user_email, book, chapter)
      DO UPDATE SET completed_at = NOW()
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving reading progress:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// DELETE: Unmark a chapter as completed
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

    await sql`
      DELETE FROM reading_progress
      WHERE user_email = ${user.email} AND book = ${book} AND chapter = ${chapter}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting reading progress:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
