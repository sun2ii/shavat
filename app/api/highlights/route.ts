import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { isHighlightColor, listHighlights, rowToHighlight } from '@/lib/highlights-db';

// GET: every highlight for the signed-in user
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ highlights: await listHighlights(user.email) });
}

// POST: create. Any highlight overlapping the range in that chapter is
// replaced, so a verse carries at most one highlight.
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      book?: string; chapter?: number; verseStart?: number; verseEnd?: number; color?: string; note?: string;
    };
    const { book, chapter, verseStart, verseEnd, color } = body;
    const note = body.note?.trim() || null;

    if (!book || !Number.isInteger(chapter) || !Number.isInteger(verseStart) || !Number.isInteger(verseEnd)) {
      return NextResponse.json({ error: 'Missing book, chapter, or verse range' }, { status: 400 });
    }
    if (!isHighlightColor(color)) {
      return NextResponse.json({ error: 'Invalid color' }, { status: 400 });
    }
    if (verseStart! > verseEnd!) {
      return NextResponse.json({ error: 'verseStart must be <= verseEnd' }, { status: 400 });
    }

    const removed = await sql`
      DELETE FROM highlights
      WHERE user_email = ${user.email} AND book = ${book} AND chapter = ${chapter}
        AND verse_start <= ${verseEnd} AND verse_end >= ${verseStart}
      RETURNING id
    `;

    const rows = await sql`
      INSERT INTO highlights (user_email, book, chapter, verse_start, verse_end, color, note)
      VALUES (${user.email}, ${book}, ${chapter}, ${verseStart}, ${verseEnd}, ${color}, ${note})
      RETURNING id, book, chapter, verse_start, verse_end, color, note, created_at
    `;

    return NextResponse.json({
      highlight: rowToHighlight(rows[0]),
      removedIds: removed.map((r) => r.id as string),
    });
  } catch (err) {
    console.error('Error saving highlight:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// PATCH: change color and/or note on one highlight
export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { id?: string; color?: string; note?: string | null };
    if (!body.id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    if (body.color !== undefined && !isHighlightColor(body.color)) {
      return NextResponse.json({ error: 'Invalid color' }, { status: 400 });
    }

    const rows = await sql`
      UPDATE highlights
      SET color = COALESCE(${body.color ?? null}, color),
          note = CASE WHEN ${body.note === undefined} THEN note ELSE ${body.note?.trim() || null} END,
          updated_at = NOW()
      WHERE id = ${body.id} AND user_email = ${user.email}
      RETURNING id, book, chapter, verse_start, verse_end, color, note, created_at
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ highlight: rowToHighlight(rows[0]) });
  } catch (err) {
    console.error('Error updating highlight:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// DELETE: remove one highlight
export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = (await request.json()) as { id?: string };
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    await sql`DELETE FROM highlights WHERE id = ${id} AND user_email = ${user.email}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting highlight:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
