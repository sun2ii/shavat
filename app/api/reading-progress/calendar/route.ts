import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { getCurrentSeason } from '@/lib/seasons';

// GET: Fetch reading activity aggregated by date for the past 365 days (current season only)
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const season = await getCurrentSeason(user.email);

    const rows = await sql`
      SELECT
        TO_CHAR(DATE(completed_at AT TIME ZONE 'UTC'), 'YYYY-MM-DD') as date,
        COUNT(*)::int as count
      FROM reading_progress
      WHERE user_email = ${user.email}
        AND season = ${season}
        AND completed_at >= NOW() - INTERVAL '365 days'
      GROUP BY DATE(completed_at AT TIME ZONE 'UTC')
      ORDER BY DATE(completed_at AT TIME ZONE 'UTC')
    `;

    const data: Record<string, number> = {};
    for (const row of rows) {
      data[row.date as string] = row.count as number;
    }

    return NextResponse.json({ data, season });
  } catch (err) {
    console.error('Error fetching reading calendar:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
