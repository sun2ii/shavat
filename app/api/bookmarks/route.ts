import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';

// GET: Fetch bookmarks for user (optionally filtered by book)
export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');

  try {
    if (book) {
      // Get bookmarks for a specific book
      const rows = await sql`
        SELECT book, chapter, verse, created_at
        FROM bookmarks
        WHERE user_email = ${user.email} AND book = ${book}
        ORDER BY chapter
      `;
      return NextResponse.json({ bookmarks: rows });
    } else {
      // Get all bookmarks
      const rows = await sql`
        SELECT book, chapter, verse, created_at
        FROM bookmarks
        WHERE user_email = ${user.email}
        ORDER BY created_at DESC
      `;
      return NextResponse.json({ bookmarks: rows });
    }
  } catch (err) {
    console.error('Error fetching bookmarks:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// POST: Add or update a bookmark
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { book, chapter, verse } = body as { book: string; chapter: number; verse?: number };

    if (!book || chapter === undefined) {
      return NextResponse.json({ error: 'Missing book or chapter' }, { status: 400 });
    }

    // Upsert: insert or update if already exists
    await sql`
      INSERT INTO bookmarks (user_email, book, chapter, verse, created_at)
      VALUES (${user.email}, ${book}, ${chapter}, ${verse ?? null}, NOW())
      ON CONFLICT (user_email, book, chapter)
      DO UPDATE SET verse = ${verse ?? null}, created_at = NOW()
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving bookmark:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// DELETE: Remove a bookmark
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
      DELETE FROM bookmarks
      WHERE user_email = ${user.email} AND book = ${book} AND chapter = ${chapter}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting bookmark:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
