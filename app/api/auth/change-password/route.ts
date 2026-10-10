import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, getUserByEmail, verifyPassword, hashPassword, updateUserPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = (await request.json()) as {
      currentPassword?: string;
      newPassword?: string;
    };

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Get user with password hash
    const fullUser = await getUserByEmail(user.email);
    if (!fullUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify current password
    const isValid = await verifyPassword(currentPassword, fullUser.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash and update new password
    const newHash = await hashPassword(newPassword);
    await updateUserPassword(user.id, newHash);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error changing password:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
