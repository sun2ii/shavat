import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getUserSetting, setUserSetting } from '@/lib/user-settings';
import { isTranslation } from '@/lib/translations';
import { TRANSLATION_SETTING_KEY } from '@/lib/translation-preference';

// Per-key validators. A key not listed here accepts any JSON value.
const VALIDATORS: Record<string, (v: unknown) => boolean> = {
  [TRANSLATION_SETTING_KEY]: isTranslation,
};

// GET ?key=... : read one setting for the signed-in user
export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const key = new URL(request.url).searchParams.get('key');
  if (!key) {
    return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
  }

  const value = await getUserSetting(user.email, key);
  return NextResponse.json({ value });
}

// POST { key, value } : upsert one setting for the signed-in user
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { key, value } = (await request.json()) as { key?: string; value?: unknown };

    if (!key) {
      return NextResponse.json({ error: 'Missing key' }, { status: 400 });
    }
    const validate = VALIDATORS[key];
    if (validate && !validate(value)) {
      return NextResponse.json({ error: `Invalid value for "${key}"` }, { status: 400 });
    }

    await setUserSetting(user.email, key, value);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving user setting:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
