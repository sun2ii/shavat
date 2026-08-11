'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import { AppShell } from './home/AppShell';

// Marketing pages that should render without the app header/breadcrumbs
const MARKETING_ROUTES = ['/about', '/features', '/how-it-works', '/pricing', '/resources'];
// Routes that get the sidebar layout
const SIDEBAR_ROUTE_PREFIXES = ['/library', '/terrain', '/writings', '/ot', '/nt'];

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isMarketingPage = MARKETING_ROUTES.includes(pathname);
  const isSidebarRoute = SIDEBAR_ROUTE_PREFIXES.some(prefix => pathname.startsWith(prefix));

  // Homepage and marketing pages render without the app wrapper
  // (they use their own ClientLayout or AppShell)
  if (isHomePage || isMarketingPage) {
    return <>{children}</>;
  }

  // Library and Terrain get the sidebar
  if (isSidebarRoute) {
    return <AppShell>{children}</AppShell>;
  }

  // All other routes get Header + Breadcrumbs
  return (
    <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 md:px-16 py-6">
      <Header />
      <Breadcrumbs />
      {children}
    </div>
  );
}
