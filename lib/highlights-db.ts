import { sql } from './db';
import type { Highlight, HighlightColor } from './types';
import { ALL_HIGHLIGHT_COLORS } from './highlight-colors';

// Server-only access to the highlights table (migrations/008).

export function isHighlightColor(value: unknown): value is HighlightColor {
  // Accept retired colors too: existing rows may carry them.
  return typeof value === 'string' && ALL_HIGHLIGHT_COLORS.some((c) => c.id === value);
}

export function rowToHighlight(row: Record<string, unknown>): Highlight {
  return {
    id: row.id as string,
    book: row.book as string,
    chapter: row.chapter as number,
    verseStart: row.verse_start as number,
    verseEnd: row.verse_end as number,
    color: row.color as HighlightColor,
    note: (row.note as string | null) ?? undefined,
    createdAt: new Date(row.created_at as string).getTime(),
  };
}

export async function listHighlights(userEmail: string): Promise<Highlight[]> {
  try {
    const rows = await sql`
      SELECT id, book, chapter, verse_start, verse_end, color, note, created_at
      FROM highlights
      WHERE user_email = ${userEmail}
      ORDER BY created_at ASC
    `;
    return rows.map(rowToHighlight);
  } catch (err) {
    console.error('Error listing highlights:', err);
    return [];
  }
}
