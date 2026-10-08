'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';
import { ThemeToggleIcon } from '@/components/ui/ThemeToggleIcon';
import LogoutButton from '@/components/auth/LogoutButton';

interface AppShellProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  userEmail?: string | null;
}

// Who is signed in, and the way out. Sits at the top right of the content
// area on every page, above the scroll region so it never overlaps page
// chrome (the reader has its own top-right icon cluster).
function AccountStrip({ email }: { email: string }) {
  return (
    <div className="shrink-0 flex items-center justify-end gap-3 px-4 sm:px-6 h-7 font-sans text-[11px] text-faint">
      <span className="truncate max-w-[220px]" title={email}>
        {email}
      </span>
      <span className="text-hairline">·</span>
      <LogoutButton className="text-faint hover:text-ink" />
    </div>
  );
}

const mobileNavLinks = [
  { href: '/dashboard', label: 'Dashboard', iconSrc: '/icons/sidebar/home.webp' },
  { href: '/library', label: 'Library', iconSrc: '/icons/sidebar/library.webp' },
  { href: '/saved', label: 'Saved', iconSrc: '/icons/general/laurel.webp' },
];

export function AppShell({ children, isAuthenticated = false, userEmail = null }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Restore sidebar state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shavat-sidebar-collapsed');
      if (saved === 'true') {
        setSidebarOpen(false);
      }
    } catch {}
  }, []);

  // Toggle sidebar and persist preference
  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    try {
      localStorage.setItem('shavat-sidebar-collapsed', newState ? 'false' : 'true');
    } catch {}
  };

  return (
    // overflow-clip, not overflow-hidden: a hidden box can still be scrolled
    // by scrollIntoView, which would drag the sidebar up. Clip cannot.
    <div className="h-screen font-inter bg-paper text-ink overflow-clip">
      {/* Desktop: sidebar layout */}
      <div className="hidden lg:block h-full">
        <div
          className="h-full"
          style={{
            display: 'grid',
            gridTemplateColumns: sidebarOpen ? '200px 1fr' : '72px 1fr',
            // The single row must not grow with page content, or the content
            // column outgrows the viewport and the root clips it unscrollably.
            gridTemplateRows: 'minmax(0, 1fr)',
            transition: 'grid-template-columns 0.3s ease'
          }}
        >
          <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} isAuthenticated={isAuthenticated} />
          {/* Column: account strip (fixed height) over the scroll region, so a
              page's h-full still means "the scroll region", not strip + region.
              min-h-0 lets this grid item shrink to the row instead of its content. */}
          <main className="min-w-0 min-h-0 h-full flex flex-col">
            {userEmail && <AccountStrip email={userEmail} />}
            <div className="flex-1 min-h-0 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile/Tablet: no sidebar, hamburger menu */}
      <div className="lg:hidden h-full flex flex-col">
        {/* Mobile header — hidden inside the Capacitor iOS shell, where the
            bottom tab bar is the navigation and the header would waste space. */}
        <header className="sticky top-0 z-40 bg-sidebar-bg px-4 py-3 flex items-center gap-4 [.native-app_&]:hidden flex-shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 text-sidebar-text-muted hover:text-sidebar-text"
          >
            <NormalizedIcon src="/icons/sidebar/menu.webp" alt="Menu" width={24} height={24} />
          </button>
          <div className="flex items-center gap-2">
            <Image src="/logo.webp" alt="Shavat" width={36} height={36} />
            <span className="font-playfair text-lg font-semibold text-sidebar-text tracking-wider">SHAVAT</span>
          </div>
          {userEmail && (
            <div className="ml-auto flex items-center gap-2 font-sans text-[11px] text-sidebar-text-muted min-w-0">
              <span className="truncate max-w-[140px]" title={userEmail}>{userEmail}</span>
              <LogoutButton className="text-sidebar-text-muted hover:text-sidebar-text" />
            </div>
          )}
        </header>

        {/* Main content */}
        <main className="min-w-0 flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} isAuthenticated={isAuthenticated} />
      )}
    </div>
  );
}

function MobileMenu({ onClose, isAuthenticated = false }: { onClose: () => void; isAuthenticated?: boolean }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !root.classList.contains('dark');
    root.classList.toggle('dark', next);
    root.classList.toggle('light', !next);
    try {
      localStorage.setItem('shavat-theme', next ? 'dark' : 'light');
    } catch {}
    setIsDark(next);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-sidebar-bg z-50 lg:hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo.webp" alt="Shavat" width={48} height={48} />
              <div>
                <div className="font-playfair text-lg font-semibold text-sidebar-text tracking-wider">SHAVAT</div>
                <div className="text-[9px] tracking-[1.5px] text-sidebar-text-muted">KNOW WHERE YOU ARE</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-sidebar-text-muted hover:text-sidebar-text"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6 L18 18 M18 6 L6 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-1">
            {mobileNavLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-active-bg text-sidebar-active-text font-semibold'
                      : 'text-sidebar-text hover:bg-sidebar-hover-bg'
                  }`}
                >
                  <NormalizedIcon src={link.iconSrc} alt={link.label} width={24} height={24} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer with theme toggle and Review */}
        <div className="p-4 border-t border-sidebar-border flex flex-col gap-1">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sidebar-text-muted hover:text-sidebar-text hover:bg-sidebar-hover-bg transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <ThemeToggleIcon isDark={isDark} size={24} />
            <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <div className="text-[10px] text-sidebar-text-muted text-center mt-3">
            Stay oriented in Scripture.
          </div>
        </div>
      </div>
    </>
  );
}
