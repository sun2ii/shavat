import { sql } from './db';

// Server-only accessors for the user_settings table (migrations/007).
// Values are opaque JSON; callers validate on read (see translation-preference.ts).

export async function getUserSetting(userEmail: string, key: string): Promise<unknown> {
  try {
    const rows = await sql`
      SELECT value FROM user_settings
      WHERE user_email = ${userEmail} AND key = ${key}
    `;
    return rows.length === 0 ? null : rows[0].value;
  } catch (err) {
    console.error(`Error reading user setting "${key}":`, err);
    return null;
  }
}

export async function setUserSetting(userEmail: string, key: string, value: unknown): Promise<void> {
  const json = JSON.stringify(value);
  await sql`
    INSERT INTO user_settings (user_email, key, value, updated_at)
    VALUES (${userEmail}, ${key}, ${json}::jsonb, NOW())
    ON CONFLICT (user_email, key)
    DO UPDATE SET value = ${json}::jsonb, updated_at = NOW()
  `;
}
