'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';
import { ThemeToggleIcon } from '@/components/ui/ThemeToggleIcon';

const staticNavLinks = [
  { href: '/library', label: 'Library', iconSrc: '/icons/sidebar/library.png' },
  { href: '/writings', label: 'Writings', iconSrc: '/icons/sidebar/writings.png' },
];

const homeIconSrc = '/icons/sidebar/home.png';

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
      <div className="text-center">
        <div
          className="overflow-hidden mx-auto transition-all duration-300"
          style={{ width: isOpen ? 85 : 60, height: isOpen ? 95 : 66 }}
        >
          <Image
            src="/logo.png"
            alt="Shavat"
            width={isOpen ? 110 : 78}
            height={isOpen ? 110 : 78}
            className="block mx-auto transition-all duration-300"
            style={{ transform: 'scale(1.2)', transformOrigin: 'top center' }}
          />
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 mt-3.5' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="font-playfair text-[27px] font-semibold tracking-[7px]">SHAVAT</div>
          <div className="text-[10px] tracking-[2.4px] text-sidebar-text-muted leading-[1.7] mt-2.5">
            KNOW WHERE YOU ARE<br/>IN SCRIPTURE.
          </div>
        </div>
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
          <ThemeToggleIcon isDark={isDark} size={24} />
          {isOpen && (isDark ? 'Light Mode' : 'Dark Mode')}
        </button>

        {/* Review link - only shown when authenticated */}
        {isAuthenticated && (
          <Link
            href="/review"
            className={`flex items-center py-3 px-4 transition-colors ${
              pathname.startsWith('/review')
                ? 'text-sidebar-active-text font-semibold'
                : 'text-sidebar-text-muted hover:text-sidebar-text'
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

        {/* Toggle sidebar */}
        <button
          onClick={onToggle}
          className={`flex items-center py-3 px-4 bg-transparent border-none text-sidebar-text-muted cursor-pointer text-[14.5px] hover:text-sidebar-text transition-colors ${
            isOpen ? 'gap-3.5 justify-start' : 'gap-0 justify-center'
          }`}
        >
          <div className="transition-transform duration-300" style={{ transform: isOpen ? 'rotate(0)' : 'rotate(180deg)' }}>
            <SidebarIcon src="/icons/sidebar/Collapse.png" alt="Collapse" />
          </div>
          {isOpen && 'Collapse'}
        </button>
      </div>
    </aside>
  );
}
