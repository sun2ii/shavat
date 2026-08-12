import { NextRequest, NextResponse } from 'next/server';
import { resetPasswordSchema } from '@/lib/validations';
import { verifyPasswordResetToken, markTokenAsUsed, hashPassword, updateUserPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { token, password } = result.data;

    // Verify token
    const userId = await verifyPasswordResetToken(token);
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Update password
    const passwordHash = await hashPassword(password);
    await updateUserPassword(userId, passwordHash);

    // Mark token as used (single-use)
    await markTokenAsUsed(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
