'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';

interface MarketingNavProps {
  variant?: 'light' | 'dark'; // light = dark text on light bg, dark = white text on dark/image bg
  onHamburgerClick?: () => void; // When provided, shows hamburger menu button on mobile
}

export function MarketingNav({ variant = 'dark', onHamburgerClick }: MarketingNavProps) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setIsAuthenticated(!!data.user))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    // Hard navigation to bust layout cache
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/features', label: 'FEATURES' },
    { href: '/about', label: 'ABOUT' },
    { href: '/pricing', label: 'PRICING' },
    { href: '/resources', label: 'RESOURCES' },
  ];

  const isActive = (href: string) => pathname === href;

  const textColor = variant === 'dark'
    ? 'text-white/85'
    : 'text-muted dark:text-white/85';

  const activeTextColor = variant === 'dark'
    ? 'text-white'
    : 'text-ink dark:text-white';

  return (
    <header className="relative z-10 flex items-center justify-between gap-3 sm:gap-6 p-4 sm:px-8 sm:pt-5 md:px-11">
      {/* Left side: hamburger (optional) + nav links */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu - only shown when onHamburgerClick is provided */}
        {onHamburgerClick && (
          <button
            onClick={onHamburgerClick}
            className="lg:hidden p-2 -ml-2 text-white/90 hover:text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6 H20 M4 12 H20 M4 18 H20" />
            </svg>
          </button>
        )}

        {/* Nav links - hidden on mobile when hamburger is shown */}
        <nav className={`flex flex-wrap items-center gap-3 sm:gap-5 md:gap-7 text-[10px] sm:text-[11px] md:text-[12.5px] tracking-[2px] ${textColor} font-medium`}>
          {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isActive(link.href)
              ? `${activeTextColor} font-bold border-b-2 border-gold pb-1`
              : 'hover:text-gold'
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
      </div>

      {/* Right side: search + auth */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search - hidden on mobile */}
        <label className="hidden md:flex items-center gap-2.5 bg-white/90 dark:bg-surface/90 border border-hairline rounded-lg px-3 py-2 w-[220px]">
<NormalizedIcon src="/icons/general/search.png" alt="Search" width={18} height={18} />
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none bg-transparent font-inter text-xs text-ink w-full"
          />
        </label>
        {isAuthenticated ? (
          <>
            <Link
              href="/dashboard"
              className={`whitespace-nowrap text-[9px] sm:text-[12px] tracking-[1.5px] ${textColor} hover:text-gold transition-colors font-medium`}
            >
              DASHBOARD
            </Link>
            <button
              onClick={handleLogout}
              className="whitespace-nowrap bg-white/95 text-shavat-darkest px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg text-[9px] sm:text-[11px] tracking-[1.5px] font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              LOG OUT
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`whitespace-nowrap text-[9px] sm:text-[12px] tracking-[1.5px] ${textColor} hover:text-gold transition-colors font-medium`}
            >
              SIGN IN
            </Link>
            <Link
              href="/signup"
              className="whitespace-nowrap bg-white/95 text-shavat-darkest px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg text-[9px] sm:text-[11px] tracking-[1.5px] font-semibold hover:bg-white transition-colors"
            >
              GET STARTED
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
