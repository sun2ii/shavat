'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';
import { ThemeToggleIcon } from '@/components/ui/ThemeToggleIcon';

interface AppShellProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  userEmail?: string | null;
}

// Gear icon for mobile menu settings
function GearIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
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
          <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} isAuthenticated={isAuthenticated} userEmail={userEmail} />
          <main className="min-w-0 min-h-0 h-full overflow-auto">
            {children}
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
        </header>

        {/* Main content */}
        <main className="min-w-0 flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} isAuthenticated={isAuthenticated} userEmail={userEmail} />
      )}
    </div>
  );
}

function MobileMenu({ onClose, isAuthenticated = false, userEmail }: { onClose: () => void; isAuthenticated?: boolean; userEmail?: string | null }) {
  const pathname = usePathname();
  const router = useRouter();
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

  const handleSignOut = async () => {
    onClose();
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch {
      router.push('/login');
    }
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

        {/* Footer with account, settings, theme */}
        <div className="p-4 border-t border-sidebar-border flex flex-col gap-1">
          {/* User email */}
          {userEmail && (
            <div className="px-4 py-2 text-[11px] text-sidebar-text-muted truncate" title={userEmail}>
              {userEmail}
            </div>
          )}

          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sidebar-text-muted hover:text-sidebar-text hover:bg-sidebar-hover-bg transition-colors"
          >
            <GearIcon size={20} />
            <span className="text-sm">Settings</span>
          </Link>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sidebar-text-muted hover:text-sidebar-text hover:bg-sidebar-hover-bg transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <span className="text-sm">Appearance</span>
            </span>
            <ThemeToggleIcon isDark={isDark} size={20} />
          </button>

          {userEmail && (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-sidebar-hover-bg transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="text-sm">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
