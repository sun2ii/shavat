import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Shavat',
  description: 'A Sabbath for reading text',
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
      <body className="max-w-4xl mx-auto px-20 py-6">
        <Header />
        {children}
      </body>
    </html>
  );
}
