'use client';

import { AppShell } from './home/AppShell';

interface InnerLayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

export default function InnerLayout({ children, isAuthenticated = false }: InnerLayoutProps) {
  // ALL routes get the AppShell (sidebar + mobile menu)
  return <AppShell isAuthenticated={isAuthenticated}>{children}</AppShell>;
}
