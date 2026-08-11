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

  // Removed auto-redirect from home page - we now have a real home page to show
  // Users can navigate to their bookmarks manually from the navigation

  return null; // This component doesn't render anything
}
