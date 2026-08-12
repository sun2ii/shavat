import { cookies } from 'next/headers';
import { sql } from './db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = 10;
const SESSION_COOKIE_NAME = 'session_id';
const SESSION_EXPIRY_DAYS = 7;

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'member';
  created_at: Date;
  updated_at: Date;
}

export interface Session {
  id: string;
  user_id: string;
  expires_at: Date;
  created_at: Date;
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Session management
export async function createSession(userId: string): Promise<string> {
  const sessionId = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

  await sql`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (${sessionId}, ${userId}, ${expiresAt.toISOString()})
  `;

  return sessionId;
}

export async function setSessionCookie(sessionId: string): Promise<void> {
  const cookieStore = await cookies();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionFromCookie(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) return null;

  const rows = await sql`
    SELECT id, user_id, expires_at, created_at
    FROM sessions
    WHERE id = ${sessionId}
      AND expires_at > NOW()
  `;

  if (rows.length === 0) return null;

  return rows[0] as Session;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await sql`DELETE FROM sessions WHERE id = ${sessionId}`;
}

// User retrieval
export async function getUserById(userId: string): Promise<User | null> {
  const rows = await sql`
    SELECT id, email, role, created_at, updated_at
    FROM users
    WHERE id = ${userId}
  `;

  if (rows.length === 0) return null;

  return rows[0] as User;
}

export async function getUserByEmail(email: string): Promise<(User & { password_hash: string }) | null> {
  const rows = await sql`
    SELECT id, email, password_hash, role, created_at, updated_at
    FROM users
    WHERE email = ${email.toLowerCase()}
  `;

  if (rows.length === 0) return null;

  return rows[0] as User & { password_hash: string };
}

// Get current authenticated user
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSessionFromCookie();
  if (!session) return null;

  return getUserById(session.user_id);
}

// Password reset tokens
export async function createPasswordResetToken(userId: string): Promise<string> {
  const token = uuidv4();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

  await sql`
    INSERT INTO password_reset_tokens (user_id, token, expires_at)
    VALUES (${userId}, ${token}, ${expiresAt.toISOString()})
  `;

  return token;
}

export async function verifyPasswordResetToken(token: string): Promise<string | null> {
  const rows = await sql`
    SELECT user_id
    FROM password_reset_tokens
    WHERE token = ${token}
      AND expires_at > NOW()
      AND used_at IS NULL
  `;

  if (rows.length === 0) return null;

  return rows[0].user_id as string;
}

export async function markTokenAsUsed(token: string): Promise<void> {
  await sql`
    UPDATE password_reset_tokens
    SET used_at = NOW()
    WHERE token = ${token}
  `;
}

// User creation
export async function createUser(email: string, passwordHash: string): Promise<User> {
  const rows = await sql`
    INSERT INTO users (email, password_hash)
    VALUES (${email.toLowerCase()}, ${passwordHash})
    RETURNING id, email, role, created_at, updated_at
  `;

  return rows[0] as User;
}

// Update password
export async function updateUserPassword(userId: string, passwordHash: string): Promise<void> {
  await sql`
    UPDATE users
    SET password_hash = ${passwordHash}, updated_at = NOW()
    WHERE id = ${userId}
  `;
}

// Role checking
export function requireRole(user: User | null, role: 'admin' | 'member'): boolean {
  if (!user) return false;
  if (role === 'member') return true; // Any authenticated user
  if (role === 'admin') return user.role === 'admin';
  return false;
}
