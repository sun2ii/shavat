import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import type { AuditReport, VerseAudit } from '@/lib/speaker-review-types';

// POST: Seed audit data from JSON (admin only)
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const report: AuditReport = await request.json();

    if (!report.book || !report.verses || !report.summary) {
      return NextResponse.json({ error: 'Invalid audit report format' }, { status: 400 });
    }

    // Upsert the audit record
    const auditRows = await sql`
      INSERT INTO speaker_audits (book, timestamp, summary)
      VALUES (${report.book}, ${report.timestamp}, ${JSON.stringify(report.summary)}::jsonb)
      ON CONFLICT (book)
      DO UPDATE SET
        timestamp = EXCLUDED.timestamp,
        summary = EXCLUDED.summary,
        updated_at = NOW()
      RETURNING id
    `;

    const auditId = auditRows[0].id;

    // Delete existing verses for this book (will be replaced)
    await sql`DELETE FROM speaker_audit_verses WHERE book = ${report.book}`;

    // Insert all verses
    for (const verse of report.verses) {
      await sql`
        INSERT INTO speaker_audit_verses (
          audit_id, book, chapter, verse, canonical_text,
          previous_verse, next_verse, spans, classification,
          reasons, current_segments, proposed_segments
        ) VALUES (
          ${auditId}, ${report.book}, ${verse.chapter}, ${verse.verse},
          ${verse.canonicalText}, ${verse.previousVerse || null}, ${verse.nextVerse || null},
          ${JSON.stringify(verse.spans)}::jsonb, ${verse.classification},
          ${JSON.stringify(verse.reasons)}::jsonb, ${JSON.stringify(verse.currentSegments)}::jsonb,
          ${verse.proposedSegments ? JSON.stringify(verse.proposedSegments) : null}::jsonb
        )
      `;
    }

    return NextResponse.json({
      success: true,
      book: report.book,
      versesSeeded: report.verses.length,
    });
  } catch (err) {
    console.error('Error seeding audit data:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
