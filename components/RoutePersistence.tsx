'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { saveLastRoute, getLastRoute } from '@/lib/routePersistence';

export default function RoutePersistence() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Save current route whenever it changes (but not the home page)
    if (pathname !== '/') {
      saveLastRoute(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    // On initial load, redirect to last route if we're on home page
    const lastRoute = getLastRoute();
    if (pathname === '/' && lastRoute) {
      router.replace(lastRoute);
    }
  }, []); // Only run once on mount

  return null; // This component doesn't render anything
}
