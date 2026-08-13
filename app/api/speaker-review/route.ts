import { NextRequest, NextResponse } from 'next/server';
import type { AuditReport, VerseReview, VerseAudit } from '@/lib/speaker-review-types';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';

// GET: Load audit report and review state for a book
export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');

  if (!book) {
    // Return list of available audited books from database
    try {
      const rows = await sql`SELECT book FROM speaker_audits ORDER BY book`;
      const books = rows.map((r) => r.book as string);
      return NextResponse.json({ books });
    } catch (err) {
      console.error('Error fetching books:', err);
      return NextResponse.json({ books: [] });
    }
  }

  // Load audit from database
  try {
    const auditRows = await sql`
      SELECT id, book, timestamp, summary
      FROM speaker_audits
      WHERE book = ${book}
    `;

    if (auditRows.length === 0) {
      return NextResponse.json({ error: 'Audit report not found' }, { status: 404 });
    }

    const audit = auditRows[0];

    // Load verses
    const verseRows = await sql`
      SELECT chapter, verse, canonical_text, previous_verse, next_verse,
             spans, classification, reasons, current_segments, proposed_segments
      FROM speaker_audit_verses
      WHERE book = ${book}
      ORDER BY chapter, verse
    `;

    const verses: VerseAudit[] = verseRows.map((row) => ({
      chapter: row.chapter as number,
      verse: row.verse as number,
      canonicalText: row.canonical_text as string,
      previousVerse: row.previous_verse as string | null,
      nextVerse: row.next_verse as string | null,
      spans: row.spans as VerseAudit['spans'],
      classification: row.classification as VerseAudit['classification'],
      reasons: row.reasons as string[],
      currentSegments: row.current_segments as VerseAudit['currentSegments'],
      proposedSegments: row.proposed_segments as VerseAudit['proposedSegments'],
    }));

    const report: AuditReport = {
      book: audit.book as string,
      timestamp: audit.timestamp as string,
      summary: audit.summary as AuditReport['summary'],
      verses,
    };

    // Load speaker data for colors (still from filesystem for now)
    let speakers: Record<string, { name: string; color: number }> = {};
    try {
      // Dynamic import for speaker data
      const speakerModule = await import(`@/data/speakers/${book}.json`);
      speakers = speakerModule.default?.speakers || speakerModule.speakers || {};
    } catch {
      // No speaker data available
    }

    // Load reviews from database for current user
    const reviews: Record<string, VerseReview> = {};
    const reviewRows = await sql`
      SELECT chapter, verse, status, comment, classification_at_review, proposed_segments, reviewed_at
      FROM speaker_reviews
      WHERE user_email = ${user.email} AND book = ${book}
    `;

    for (const row of reviewRows) {
      const key = `${row.chapter}:${row.verse}`;
      reviews[key] = {
        status: row.status as VerseReview['status'],
        comment: row.comment as string | undefined,
        classificationAtReview: row.classification_at_review as VerseReview['classificationAtReview'],
        proposedSegments: row.proposed_segments as VerseReview['proposedSegments'],
        reviewedAt: row.reviewed_at as string,
      };
    }

    return NextResponse.json({ report, speakers, reviews });
  } catch (err) {
    console.error('Error loading audit:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// POST: Save review for a verse
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { book, chapter, verse, review } = body as {
      book: string;
      chapter: number;
      verse: number;
      review: VerseReview;
    };

    if (!book || chapter === undefined || verse === undefined || !review) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upsert review into database
    await sql`
      INSERT INTO speaker_reviews (
        user_email, book, chapter, verse, status, comment,
        classification_at_review, proposed_segments, reviewed_at
      ) VALUES (
        ${user.email}, ${book}, ${chapter}, ${verse}, ${review.status},
        ${review.comment || null},
        ${review.classificationAtReview || null},
        ${review.proposedSegments ? JSON.stringify(review.proposedSegments) : null}::jsonb,
        ${review.reviewedAt || new Date().toISOString()}
      )
      ON CONFLICT (user_email, book, chapter, verse)
      DO UPDATE SET
        status = EXCLUDED.status,
        comment = EXCLUDED.comment,
        classification_at_review = EXCLUDED.classification_at_review,
        proposed_segments = EXCLUDED.proposed_segments,
        reviewed_at = EXCLUDED.reviewed_at,
        updated_at = NOW()
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving review:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
