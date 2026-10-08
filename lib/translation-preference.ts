import { cache } from 'react';
import { cookies } from 'next/headers';
import type { User } from './auth';
import { getUserSetting } from './user-settings';
import { Translation, DEFAULT_TRANSLATION, isTranslation } from './translations';

export const TRANSLATION_COOKIE = 'shavat-translation';
export const TRANSLATION_SETTING_KEY = 'translation';

// The one place that decides which translation a request gets.
// Precedence: account setting (signed in) > cookie (anonymous/device) > default.
// Wrapped in React cache() so the layout and the reading route, which both
// call this in the same request, share a single DB round trip.
export const resolveTranslation = cache(async (user: User | null): Promise<Translation> => {
  if (user) {
    const saved = await getUserSetting(user.email, TRANSLATION_SETTING_KEY);
    if (isTranslation(saved)) return saved;
  }

  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(TRANSLATION_COOKIE)?.value;
  if (isTranslation(fromCookie)) return fromCookie;

  return DEFAULT_TRANSLATION;
});
