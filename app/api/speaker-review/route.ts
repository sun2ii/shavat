import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { AuditReport, VerseReview } from '@/lib/speaker-review-types';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';

const REPORTS_DIR = path.join(process.cwd(), 'reports', 'speaker-audit');

// GET: Load audit report and review state for a book
export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');

  if (!book) {
    // Return list of available audited books
    try {
      const files = fs.existsSync(REPORTS_DIR)
        ? fs.readdirSync(REPORTS_DIR).filter((f) => f.endsWith('.json'))
        : [];
      const books = files.map((f) => f.replace('.json', ''));
      return NextResponse.json({ books });
    } catch {
      return NextResponse.json({ books: [] });
    }
  }

  // Load audit report
  const reportPath = path.join(REPORTS_DIR, `${book}.json`);
  if (!fs.existsSync(reportPath)) {
    return NextResponse.json({ error: 'Audit report not found' }, { status: 404 });
  }

  let report: AuditReport;
  try {
    report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  } catch {
    return NextResponse.json({ error: 'Invalid audit report' }, { status: 500 });
  }

  // Load speaker data for colors
  const speakerPath = path.join(process.cwd(), 'data', 'speakers', `${book}.json`);
  let speakers: Record<string, { name: string; color: number }> = {};
  if (fs.existsSync(speakerPath)) {
    try {
      const speakerData = JSON.parse(fs.readFileSync(speakerPath, 'utf-8'));
      speakers = speakerData.speakers || {};
    } catch {
      // Ignore errors
    }
  }

  // Load reviews from database for current user
  const reviews: Record<string, VerseReview> = {};
  try {
    const rows = await sql`
      SELECT chapter, verse, status, comment, classification_at_review, proposed_segments, reviewed_at
      FROM speaker_reviews
      WHERE user_email = ${user.email} AND book = ${book}
    `;
    for (const row of rows) {
      const key = `${row.chapter}:${row.verse}`;
      reviews[key] = {
        status: row.status as VerseReview['status'],
        comment: row.comment,
        classificationAtReview: row.classification_at_review,
        proposedSegments: row.proposed_segments,
        reviewedAt: row.reviewed_at,
      };
    }
  } catch (err) {
    console.error('Error loading reviews from database:', err);
    // Continue with empty reviews
  }

  return NextResponse.json({ report, speakers, reviews });
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
