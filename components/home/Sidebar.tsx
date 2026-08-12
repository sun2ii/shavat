'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const staticNavLinks = [
  { href: '/library', label: 'Library', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg> },
  { href: '/writings', label: 'Writings', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3 H15 V15 H3 Z M6 6 H12 M6 9 H12 M6 12 H10"/></svg> },
];

const homeIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 8.5 L9 2.5 L16 8.5 M4 7.5 V15.5 H14 V7.5 M7.5 15.5 V11 H10.5 V15.5"/></svg>;

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isAuthenticated?: boolean;
}

export function Sidebar({ isOpen, onToggle, isAuthenticated = false }: SidebarProps) {
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
    <aside className="bg-sidebar-bg text-sidebar-text flex flex-col sticky top-0 h-screen border-r border-sidebar-border transition-[padding] duration-300"
      style={{ padding: isOpen ? '36px 20px 28px' : '36px 12px 28px' }}
    >
      {/* Logo */}
      <div className="text-center px-1.5">
        <svg
          width={isOpen ? 72 : 40}
          height={isOpen ? 86 : 48}
          viewBox="0 0 72 86"
          fill="none"
          className="stroke-gold block mx-auto transition-all duration-300"
          strokeWidth="1.6"
                 >
          <circle cx="36" cy="6" r="2.4" className="fill-gold" stroke="none" />
          <path d="M14 82 V38 C14 20 24 12 36 12 C48 12 58 20 58 38 V82" />
          <path d="M36 30 V58 M26 40 H46" />
        </svg>
        {isOpen && (
          <>
            <div className="font-playfair text-[27px] font-semibold tracking-[7px] mt-3.5">SHAVAT</div>
            <div className="text-[10px] tracking-[2.4px] text-sidebar-text-muted leading-[1.7] mt-2.5">
              KNOW WHERE YOU ARE<br/>IN SCRIPTURE.
            </div>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1.5 mt-9 text-[14.5px]">
        {/* Home link - goes to /dashboard when authenticated, / when not */}
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
              <span className={isHomeActive ? 'text-sidebar-active-text' : 'text-gold'}>{homeIcon}</span>
              {isOpen && 'Home'}
            </Link>
          );
        })()}
        {staticNavLinks.map((link) => {
          const isActive = pathname === link.href;
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
              <span className={isActive ? 'text-sidebar-active-text' : 'text-gold'}>{link.icon}</span>
              {isOpen && link.label}
            </Link>
          );
        })}

        {/* Review link - only shown when authenticated */}
        {isAuthenticated && (
          <Link
            href="/review"
            className={`flex items-center rounded-lg py-3 px-4 transition-colors ${
              pathname.startsWith('/review')
                ? 'bg-sidebar-active-bg text-sidebar-active-text font-semibold'
                : 'text-sidebar-text hover:bg-sidebar-hover-bg'
            } ${isOpen ? 'gap-3.5 justify-start' : 'gap-0 justify-center'}`}
          >
            <span className={pathname.startsWith('/review') ? 'text-sidebar-active-text' : 'text-gold'}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 2 L11 6 L15.5 6.5 L12 10 L13 14.5 L9 12 L5 14.5 L6 10 L2.5 6.5 L7 6 Z" />
              </svg>
            </span>
            {isOpen && <span className="text-blue-500">Review</span>}
          </Link>
        )}
      </nav>

      {/* Spacer to push bottom items down */}
      <div className="flex-1" />

      {/* Bottom controls */}
      <div className="flex flex-col gap-2">
        {/* Settings = Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center py-3 px-4 bg-transparent border-none text-sidebar-text-muted cursor-pointer text-[14.5px] hover:text-sidebar-text transition-colors ${
            isOpen ? 'gap-3.5 justify-start' : 'gap-0 justify-center'
          }`}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
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
          {isOpen && (isDark ? 'Light Mode' : 'Dark Mode')}
        </button>

        {/* Toggle sidebar */}
        <button
          onClick={onToggle}
          className={`flex items-center py-3 px-4 bg-transparent border-none text-sidebar-text-muted cursor-pointer text-[14.5px] hover:text-sidebar-text transition-colors ${
            isOpen ? 'gap-3.5 justify-start' : 'gap-0 justify-center'
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(0)' : 'rotate(180deg)' }}
          >
            <path d="M10 4L6 8L10 12"/>
          </svg>
          {isOpen && 'Collapse'}
        </button>
      </div>
    </aside>
  );
}
