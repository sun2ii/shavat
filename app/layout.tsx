import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import RoutePersistence from '@/components/RoutePersistence';
import ScrollToTop from '@/components/ScrollToTop';
import GlobalKeyboardNav from '@/components/GlobalKeyboardNav';

export const metadata: Metadata = {
  title: 'Shavat',
  description: 'A Sabbath for reading scripture with emotional context',
  icons: {
    icon: '/shavat.ico',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="max-w-4xl lg:max-w-6xl mx-auto px-4 md:px-16 py-6 select-none-ui">
        <RoutePersistence />
        <GlobalKeyboardNav />
        <Header />
        <Breadcrumbs />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
