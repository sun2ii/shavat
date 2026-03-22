import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';

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
  themeColor: '#D4AF37',
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
      </head>
      <body className="max-w-4xl mx-auto px-4 md:px-20 py-6">
        <Header />
        <Breadcrumbs />
        {children}
      </body>
    </html>
  );
}
