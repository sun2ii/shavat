import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';

// GET: Fetch reading activity aggregated by date for the past 365 days
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rows = await sql`
      SELECT
        DATE(completed_at AT TIME ZONE 'UTC') as date,
        COUNT(*)::int as count
      FROM reading_progress
      WHERE user_email = ${user.email}
        AND completed_at >= NOW() - INTERVAL '365 days'
      GROUP BY DATE(completed_at AT TIME ZONE 'UTC')
      ORDER BY date
    `;

    const data: Record<string, number> = {};
    for (const row of rows) {
      // Format as YYYY-MM-DD string
      const date = row.date as Date;
      const key = date.toISOString().split('T')[0];
      data[key] = row.count as number;
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error('Error fetching reading calendar:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
