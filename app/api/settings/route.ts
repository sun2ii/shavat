import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// GET: Retrieve a setting
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
  }

  try {
    const rows = await sql`
      SELECT value FROM app_settings WHERE key = ${key}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ value: null });
    }

    return NextResponse.json({ value: rows[0].value });
  } catch (err) {
    console.error('Error reading setting:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// POST: Update a setting (requires auth)
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { key, value } = await request.json();

    if (!key) {
      return NextResponse.json({ error: 'Missing key' }, { status: 400 });
    }

    await sql`
      INSERT INTO app_settings (key, value, updated_at)
      VALUES (${key}, ${JSON.stringify(value)}::jsonb, NOW())
      ON CONFLICT (key)
      DO UPDATE SET value = ${JSON.stringify(value)}::jsonb, updated_at = NOW()
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving setting:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
