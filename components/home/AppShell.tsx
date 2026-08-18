'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';
import { ThemeToggleIcon } from '@/components/ui/ThemeToggleIcon';

interface AppShellProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

const mobileNavLinks = [
  { href: '/', label: 'Home', iconSrc: '/icons/sidebar/home.webp' },
  { href: '/library', label: 'Library', iconSrc: '/icons/sidebar/library.webp' },
  { href: '/writings', label: 'Writings', iconSrc: '/icons/sidebar/writings.webp' },
];

export function AppShell({ children, isAuthenticated = false }: AppShellProps) {
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
    <div className="min-h-screen font-inter bg-paper text-ink">
      {/* Desktop: sidebar layout */}
      <div className="hidden lg:block">
        <div
          className="min-h-screen"
          style={{
            display: 'grid',
            gridTemplateColumns: sidebarOpen ? '200px 1fr' : '72px 1fr',
            transition: 'grid-template-columns 0.3s ease'
          }}
        >
          <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} isAuthenticated={isAuthenticated} />
          <main className="min-w-0 overflow-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile/Tablet: no sidebar, hamburger menu */}
      <div className="lg:hidden">
        {/* Mobile header — hidden inside the Capacitor iOS shell, where the
            bottom tab bar is the navigation and the header would waste space. */}
        <header className="sticky top-0 z-40 bg-sidebar-bg px-4 py-3 flex items-center gap-4 [.native-app_&]:hidden">
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
        <main className="min-w-0 overflow-auto">
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

          {/* Review link - only shown when authenticated */}
          {isAuthenticated && (
            <Link
              href="/review"
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname.startsWith('/review')
                  ? 'bg-sidebar-active-bg text-sidebar-active-text font-semibold'
                  : 'text-sidebar-text-muted hover:text-sidebar-text hover:bg-sidebar-hover-bg'
              }`}
            >
              <span className={pathname.startsWith('/review') ? 'text-sidebar-active-text' : 'text-gold'}>
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 2 L11 6 L15.5 6.5 L12 10 L13 14.5 L9 12 L5 14.5 L6 10 L2.5 6.5 L7 6 Z" />
                </svg>
              </span>
              <span className="text-sm text-blue-500">Review</span>
            </Link>
          )}

          <div className="text-[10px] text-sidebar-text-muted text-center mt-3">
            Stay oriented in Scripture.
          </div>
        </div>
      </div>
    </>
  );
}
