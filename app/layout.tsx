import type { Metadata, Viewport } from 'next';
import './globals.css';
import RoutePersistence from '@/components/RoutePersistence';
import GlobalKeyboardNav from '@/components/GlobalKeyboardNav';
import InnerLayout from '@/components/InnerLayout';
import DebugModeSync from '@/components/SvgDebugMode';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { ReadingProgressProvider } from '@/components/providers/ReadingProgressProvider';

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
};

// No-flash theme init: reads saved choice, falls back to system preference.
const themeScript = `(function(){try{var t=localStorage.getItem('shavat-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.classList.add(d?'dark':'light');}catch(e){document.documentElement.classList.add('light');}})();`;

// Fetch reading progress for authenticated user
async function getReadingProgress(userEmail: string | null): Promise<Record<string, number[]>> {
  if (!userEmail) return {};

  try {
    const rows = await sql`
      SELECT book, array_agg(chapter ORDER BY chapter) as chapters
      FROM reading_progress
      WHERE user_email = ${userEmail}
      GROUP BY book
    `;

    const progress: Record<string, number[]> = {};
    for (const row of rows) {
      progress[row.book as string] = row.chapters as number[];
    }
    return progress;
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
  const readingProgress = await getReadingProgress(user?.email ?? null);

  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Public+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="select-none-ui">
        <RoutePersistence />
        <GlobalKeyboardNav />
        <DebugModeSync />
        <ReadingProgressProvider initialProgress={readingProgress}>
          <InnerLayout isAuthenticated={isAuthenticated}>{children}</InnerLayout>
        </ReadingProgressProvider>
      </body>
    </html>
  );
}
