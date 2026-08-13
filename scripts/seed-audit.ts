// Usage: npx tsx scripts/seed-audit.ts reports/speaker-audit/hosea.json

import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import type { AuditReport } from '../lib/speaker-review-types';

const POSTGRES_URL = process.env.POSTGRES_URL;
if (!POSTGRES_URL) {
  console.error('POSTGRES_URL not set');
  process.exit(1);
}

const sql = neon(POSTGRES_URL);

async function seed(filePath: string) {
  const report: AuditReport = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  console.log(`Seeding ${report.book}: ${report.verses.length} verses`);

  // Upsert audit record
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

  // Delete existing verses
  await sql`DELETE FROM speaker_audit_verses WHERE book = ${report.book}`;

  // Insert verses
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

  console.log(`Done: ${report.verses.length} verses seeded for ${report.book}`);
}

const file = process.argv[2];
if (!file) {
  console.error('Usage: npx tsx scripts/seed-audit.ts <path-to-audit.json>');
  process.exit(1);
}

seed(file).catch((err) => {
  console.error(err);
  process.exit(1);
});
