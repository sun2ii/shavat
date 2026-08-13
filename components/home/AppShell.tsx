'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

const mobileNavLinks = [
  { href: '/', label: 'Home', iconSrc: '/icons/01_home.png' },
  { href: '/library', label: 'Library', iconSrc: '/icons/Library.png' },
  { href: '/writings', label: 'Writings', iconSrc: '/icons/Writings.png' },
];

export function AppShell({ children, isAuthenticated = false }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-inter bg-paper text-ink">
      {/* Desktop: sidebar layout */}
      <div className="hidden lg:block">
        <div
          className="min-h-screen"
          style={{
            display: 'grid',
            gridTemplateColumns: sidebarOpen ? '222px 1fr' : '110px 1fr',
            transition: 'grid-template-columns 0.3s ease'
          }}
        >
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} isAuthenticated={isAuthenticated} />
          <main className="min-w-0 overflow-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile/Tablet: no sidebar, hamburger menu */}
      <div className="lg:hidden">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 bg-sidebar-bg px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 text-sidebar-text-muted hover:text-sidebar-text"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6 H20 M4 12 H20 M4 18 H20" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Shavat" width={36} height={36} />
            <span className="font-playfair text-lg font-semibold text-sidebar-text tracking-wider">SHAVAT</span>
          </div>
        </header>

        {/* Main content */}
        <main className="min-w-0 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} />
      )}
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
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
              <Image src="/logo.png" alt="Shavat" width={48} height={48} />
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
                  <Image src={link.iconSrc} alt={link.label} width={28} height={28} className="dark:invert" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer with Settings (theme toggle) */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sidebar-text-muted hover:text-sidebar-text hover:bg-sidebar-hover-bg transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="9" r="4"/>
                <path d="M9 1V3M9 15V17M1 9H3M15 9H17M3.5 3.5L5 5M13 13L14.5 14.5M14.5 3.5L13 5M5 13L3.5 14.5"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15.5 10.5C14.5 11.5 13 12.2 11.5 12.2C8 12.2 5.5 9.5 5.5 6C5.5 4.5 6 3.2 7 2.2C3.5 3 1 6.2 1 10C1 14.4 4.6 18 9 18C12.8 18 16 15.5 16.8 12C16.4 11.5 16 11 15.5 10.5Z"/>
              </svg>
            )}
            <span className="text-sm">Settings</span>
          </button>
          <div className="text-[10px] text-sidebar-text-muted text-center mt-3">
            Stay oriented in Scripture.
          </div>
        </div>
      </div>
    </>
  );
}
