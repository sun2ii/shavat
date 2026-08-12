import { NextRequest, NextResponse } from 'next/server';
import { resetRequestSchema } from '@/lib/validations';
import { getUserByEmail, createPasswordResetToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = resetRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Always return success to prevent email enumeration
    const genericMessage = 'If an account exists with this email, you will receive a password reset link.';

    // Find user
    const user = await getUserByEmail(email);
    if (!user) {
      // Return success even if user doesn't exist (prevent enumeration)
      return NextResponse.json({ message: genericMessage });
    }

    // Create reset token and send email
    const token = await createPasswordResetToken(user.id);
    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ message: genericMessage });
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
