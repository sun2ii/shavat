import type { Metadata, Viewport } from 'next';
import './globals.css';
import RoutePersistence from '@/components/RoutePersistence';
import InnerLayout from '@/components/InnerLayout';
import NativeTabBar from '@/components/native/NativeTabBar';
import NativeSplash from '@/components/native/NativeSplash';
import PageFade from '@/components/native/PageFade';
import DebugModeSync from '@/components/SvgDebugMode';
import LoadingBar from '@/components/LoadingBar';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { ReadingProgressProvider } from '@/components/providers/ReadingProgressProvider';
import { BookmarkProvider } from '@/components/providers/BookmarkProvider';
import { TranslationProvider } from '@/components/providers/TranslationProvider';
import { HighlightProvider } from '@/components/providers/HighlightProvider';
import { ReadingPreferencesProvider } from '@/components/providers/ReadingPreferencesProvider';
import { resolveTranslation } from '@/lib/translation-preference';
import { listHighlights } from '@/lib/highlights-db';

export const metadata: Metadata = {
  title: 'Shavat',
  description: 'A Sabbath for reading scripture with emotional context',
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Shavat',
    description: 'A Sabbath for reading scripture with emotional context',
    images: ['/shavat.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1e3a5f',
  // Lets content extend into the iPhone notch/home-indicator areas so the
  // native shell (components/native/) can manage safe-area insets itself.
  // No effect in desktop/mobile browsers.
  viewportFit: 'cover',
};

// No-flash theme init: reads saved choice, falls back to system preference.
const themeScript = `(function(){try{var t=localStorage.getItem('shavat-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.classList.add(d?'dark':'light');}catch(e){document.documentElement.classList.add('light');}})();`;

// No-flash native splash: inside the Capacitor shell, cover the screen in
// splash green BEFORE first paint (CSS on html.native-splash), so the page
// never flashes before the animated splash (NativeSplash) takes over.
const splashScript = `(function(){try{var c=window.Capacitor;if(c&&c.isNativePlatform&&c.isNativePlatform()&&!sessionStorage.getItem('shavat-splash-played')){document.documentElement.classList.add('native-splash');}}catch(e){}})();`;

// Get current season for authenticated user
async function getCurrentSeasonForUser(userEmail: string | null): Promise<1 | 2 | 3> {
  if (!userEmail) return 1;

  try {
    const rows = await sql`
      SELECT current_season FROM reading_seasons WHERE user_email = ${userEmail}
    `;

    if (rows.length === 0) {
      // Initialize user with season 1
      await sql`
        INSERT INTO reading_seasons (user_email, current_season, started_at)
        VALUES (${userEmail}, 1, NOW())
        ON CONFLICT (user_email) DO NOTHING
      `;
      return 1;
    }

    return rows[0].current_season as 1 | 2 | 3;
  } catch {
    return 1;
  }
}

// Fetch reading progress for authenticated user
// Bible books use current season; Christian Readings always use season 1
async function getReadingProgress(userEmail: string | null, bibleSeason: 1 | 2 | 3): Promise<Record<string, number[]>> {
  if (!userEmail) return {};

  const CHRISTIAN_READINGS_SEASON = 1;

  try {
    // Get progress from current Bible season
    const rows = await sql`
      SELECT book, array_agg(chapter ORDER BY chapter) as chapters
      FROM reading_progress
      WHERE user_email = ${userEmail} AND season = ${bibleSeason}
      GROUP BY book
    `;

    const progress: Record<string, number[]> = {};
    for (const row of rows) {
      progress[row.book as string] = row.chapters as number[];
    }

    // Also get Christian Readings from season 1 if we're in a different season
    if (bibleSeason !== CHRISTIAN_READINGS_SEASON) {
      const { isChristianReading } = await import('@/lib/book-helpers');
      const readingsRows = await sql`
        SELECT book, array_agg(chapter ORDER BY chapter) as chapters
        FROM reading_progress
        WHERE user_email = ${userEmail} AND season = ${CHRISTIAN_READINGS_SEASON}
        GROUP BY book
      `;
      for (const row of readingsRows) {
        if (isChristianReading(row.book as string)) {
          progress[row.book as string] = row.chapters as number[];
        }
      }
    }

    return progress;
  } catch {
    return {};
  }
}

// Fetch bookmarks for authenticated user
async function getBookmarks(userEmail: string | null): Promise<Record<string, number[]>> {
  if (!userEmail) return {};

  try {
    const rows = await sql`
      SELECT book, array_agg(chapter ORDER BY chapter) as chapters
      FROM bookmarks
      WHERE user_email = ${userEmail}
      GROUP BY book
    `;

    const bookmarks: Record<string, number[]> = {};
    for (const row of rows) {
      bookmarks[row.book as string] = row.chapters as number[];
    }
    return bookmarks;
  } catch {
    return {};
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;
  const currentSeason = await getCurrentSeasonForUser(user?.email ?? null);
  const [readingProgress, bookmarks, translation, highlights] = await Promise.all([
    getReadingProgress(user?.email ?? null, currentSeason),
    getBookmarks(user?.email ?? null),
    resolveTranslation(user),
    user ? listHighlights(user.email) : Promise.resolve([]),
  ]);

  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Public+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="select-none-ui">
        <LoadingBar />
        <RoutePersistence />
        <DebugModeSync />
        <ReadingPreferencesProvider>
          <TranslationProvider initialTranslation={translation} persistToAccount={isAuthenticated}>
            <BookmarkProvider initialBookmarks={bookmarks}>
              <HighlightProvider initialHighlights={highlights} persistToAccount={isAuthenticated}>
                <ReadingProgressProvider initialProgress={readingProgress} initialSeason={currentSeason}>
                  <InnerLayout isAuthenticated={isAuthenticated} userEmail={user?.email ?? null}>
                    {/* Cross-fades tab switches in the native shell; inert on web. */}
                    <PageFade>{children}</PageFade>
                  </InnerLayout>
                </ReadingProgressProvider>
              </HighlightProvider>
            </BookmarkProvider>
          </TranslationProvider>
        </ReadingPreferencesProvider>
        {/* These render only inside the Capacitor iOS shell; null on the web. */}
        <NativeTabBar />
        <NativeSplash />
      </body>
    </html>
  );
}
