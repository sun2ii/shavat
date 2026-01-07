import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import RegisterServiceWorker from './register-sw';

export const metadata: Metadata = {
  title: 'Shavat',
  description: 'A Sabbath for reading scripture with emotional context',
  manifest: '/manifest.json',
  themeColor: '#D4AF37',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Shavat',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="max-w-4xl mx-auto px-20 py-6">
        <RegisterServiceWorker />
        <Header />
        {children}
      </body>
    </html>
  );
}
