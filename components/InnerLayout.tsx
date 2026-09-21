'use client';

import { usePathname } from 'next/navigation';
import { AppShell } from './home/AppShell';

interface InnerLayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

export default function InnerLayout({ children, isAuthenticated = false }: InnerLayoutProps) {
  const pathname = usePathname();

  // Login page (/) for unauthenticated users should NOT have the AppShell
  // The home page handles its own layout with branding
  if (pathname === '/' && !isAuthenticated) {
    return <>{children}</>;
  }

  // All other routes get the AppShell (sidebar + mobile menu)
  return <AppShell isAuthenticated={isAuthenticated}>{children}</AppShell>;
}
