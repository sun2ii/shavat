'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';
import { ThemeToggleIcon } from '@/components/ui/ThemeToggleIcon';

const staticNavLinks = [
  { href: '/library', label: 'Holy Bible', iconSrc: '/icons/sidebar/library.webp' },
  { href: '/readings', label: 'Readings', iconSrc: '/icons/sidebar/writings.webp' },
  { href: '/saved', label: 'Saved', iconSrc: '/icons/general/laurel.webp' },
];

const homeIconSrc = '/icons/sidebar/home.webp';

function SidebarIcon({ src, alt, size = 24 }: { src: string; alt: string; size?: number }) {
  return (
    <NormalizedIcon
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="flex-shrink-0"
    />
  );
}

// User icon for account menu
function UserIcon({ size = 20 }: { size?: number }) {
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
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  );
}

// Gear icon for settings
function GearIcon({ size = 16 }: { size?: number }) {
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

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isAuthenticated?: boolean;
  userEmail?: string | null;
}

export function Sidebar({ isOpen, onToggle, isAuthenticated = false, userEmail }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

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
    setMenuOpen(false);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch {
      router.push('/login');
    }
  };

  return (
    <aside className="bg-sidebar-bg text-sidebar-text flex flex-col sticky top-0 h-screen border-r border-sidebar-border transition-[padding] duration-300"
      style={{ padding: isOpen ? '36px 20px 28px' : '36px 12px 28px' }}
    >
      {/* Logo */}
      <div className="text-center">
        <div
          className="overflow-hidden mx-auto transition-all duration-300"
          style={{ width: isOpen ? 85 : 44, height: isOpen ? 95 : 48 }}
        >
          <Image
            src="/logo.webp"
            alt="Shavat"
            width={isOpen ? 110 : 44}
            height={isOpen ? 110 : 44}
            className="block mx-auto transition-all duration-300"
            style={{ transform: isOpen ? 'scale(1.2)' : 'scale(1)', transformOrigin: 'top center' }}
          />
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 mt-3.5' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="font-playfair text-[27px] font-semibold tracking-[7px]">SHAVAT</div>
          <div className="text-[15px] text-sidebar-text-muted mt-0.5">שָׁבַת</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1.5 mt-9 text-[14.5px]">
        {/* Dashboard = "jump back to where I was". Signed out, the slot is Home (/). */}
        {(() => {
          const homeHref = isAuthenticated ? '/dashboard' : '/';
          const isHomeActive = pathname === '/' || pathname === '/dashboard';
          return (
            <Link
              href={homeHref}
              className={`flex items-center rounded-lg py-3 px-4 transition-colors ${
                isHomeActive
                  ? 'bg-sidebar-active-bg text-sidebar-active-text font-semibold'
                  : 'text-sidebar-text hover:bg-sidebar-hover-bg'
              } ${isOpen ? 'gap-3.5 justify-start' : 'gap-0 justify-center'}`}
            >
              <SidebarIcon src={homeIconSrc} alt={isAuthenticated ? 'Dashboard' : 'Home'} />
              {isOpen && (isAuthenticated ? 'Dashboard' : 'Home')}
            </Link>
          );
        })()}
        {staticNavLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded-lg py-3 px-4 transition-colors ${
                isActive
                  ? 'bg-sidebar-active-bg text-sidebar-active-text font-semibold'
                  : 'text-sidebar-text hover:bg-sidebar-hover-bg'
              } ${isOpen ? 'gap-3.5 justify-start' : 'gap-0 justify-center'}`}
            >
              <SidebarIcon src={link.iconSrc} alt={link.label} />
              {isOpen && link.label}
            </Link>
          );
        })}

      </nav>

      {/* Spacer to push bottom items down */}
      <div className="flex-1" />

      {/* Bottom: account menu + collapse toggle */}
      <div className={`flex items-center ${isOpen ? '' : 'flex-col gap-2'}`}>
        {/* Account menu - centered in remaining space when expanded */}
        {userEmail && (
          <div className={`relative ${isOpen ? 'flex-1 flex justify-center' : ''}`} ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center p-2 rounded-lg bg-transparent border-none text-sidebar-text-muted cursor-pointer hover:text-sidebar-text hover:bg-sidebar-hover-bg transition-colors"
              aria-label="Account menu"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              title="Account"
            >
              <UserIcon size={20} />
            </button>

            {menuOpen && (
              <div className="absolute left-0 bottom-full mb-2 w-56 bg-[rgb(var(--surface-elevated))] border border-hairline rounded-lg shadow-lg z-50 py-2">
                {/* Email */}
                <div className="px-4 py-2 text-[12px] text-muted truncate" title={userEmail}>
                  {userEmail}
                </div>

                <div className="h-px bg-hairline my-1" />

                {/* Settings link */}
                <Link
                  href="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-[13px] text-ink hover:bg-[rgb(var(--bg-secondary))] transition-colors"
                >
                  <GearIcon size={16} />
                  <span>Settings</span>
                </Link>

                {/* Appearance toggle */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-between w-full px-4 py-2 text-[13px] text-ink hover:bg-[rgb(var(--bg-secondary))] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                    <span>Appearance</span>
                  </span>
                  <ThemeToggleIcon isDark={isDark} size={16} />
                </button>

                <div className="h-px bg-hairline my-1" />

                {/* Sign out */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-4 py-2 text-[13px] text-red-600 dark:text-red-400 hover:bg-[rgb(var(--bg-secondary))] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Collapse toggle - sticky right */}
        <div className="w-10 flex-shrink-0 flex justify-center">
          <button
            onClick={onToggle}
            className="flex items-center justify-center p-2 rounded-lg bg-transparent border-none text-sidebar-text-muted cursor-pointer hover:text-sidebar-text hover:bg-sidebar-hover-bg transition-colors"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <div className="transition-transform duration-300" style={{ transform: isOpen ? 'rotate(0)' : 'rotate(180deg)' }}>
              <SidebarIcon src="/icons/sidebar/collapse.webp" alt="Collapse" />
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
