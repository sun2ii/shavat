import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

// Reads the session cookie, so it can never be prerendered. Declaring it
// stops `next build` from attempting to and logging a DYNAMIC_SERVER_USAGE
// error during "Generating static pages".
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ user: null });
  }
}
