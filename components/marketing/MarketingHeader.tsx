'use client';

import Link from 'next/link';
import Image from 'next/image';

type PageId = 'home' | 'features' | 'how-it-works' | 'about' | 'pricing' | 'resources';

interface MarketingHeaderProps {
  activePage: PageId;
}

const NAV_LINKS: { id: PageId; label: string; href: string }[] = [
  { id: 'home', label: 'HOME', href: '/' },
  { id: 'features', label: 'FEATURES', href: '/features' },
  { id: 'how-it-works', label: 'HOW IT WORKS', href: '/how-it-works' },
  { id: 'about', label: 'ABOUT', href: '/about' },
  { id: 'pricing', label: 'PRICING', href: '/pricing' },
  { id: 'resources', label: 'RESOURCES', href: '/resources' },
];

export function MarketingHeader({ activePage }: MarketingHeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '28px',
        padding: '18px 36px',
        background: '#F7F5F1',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        <span
          className="font-playfair"
          style={{
            fontSize: '30px',
            fontWeight: 500,
            letterSpacing: '3px',
            color: '#1F2E24',
          }}
        >
          SHAVAT
        </span>
        {/* Olive branch SVG */}
        <svg
          width="30"
          height="24"
          viewBox="0 0 40 32"
          fill="none"
          stroke="#C8A248"
          strokeWidth="1.6"
                 >
          <path d="M4 28 C14 24 24 16 36 4" />
          <path d="M12 22 C11 17 13 14 17 13 C17 18 16 21 12 22 Z M20 15 C19 10 21 7 25 6 C25 11 24 14 20 15 Z M15 26 C19 23 23 23 26 25 C22 28 18 28 15 26 Z" />
        </svg>
      </Link>

      {/* Navigation */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          fontSize: '12.5px',
          letterSpacing: '2px',
          color: '#3A4A3C',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = link.id === activePage;
          return (
            <Link
              key={link.id}
              href={link.href}
              style={{
                color: isActive ? '#1F2E24' : '#3A4A3C',
                fontWeight: isActive ? 700 : 500,
                borderBottom: isActive ? '2px solid #C8A248' : 'none',
                paddingBottom: isActive ? '6px' : '0',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side: Search + buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', whiteSpace: 'nowrap' }}>
        {/* Search */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#FDFCF9',
            border: '1px solid #D9D1B5',
            borderRadius: '8px',
            padding: '11px 16px',
            width: '220px',
          }}
        >
<Image src="/icons/general/search.png" alt="Search" width={18} height={18} />
          <input
            type="text"
            placeholder="Search Scripture or topics..."
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#1F2E24',
              width: '100%',
            }}
          />
        </label>

        {/* Sign In */}
        <Link
          href="#"
          style={{
            border: '1px solid #E2C98A',
            background: '#FDF9F0',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '12px',
            letterSpacing: '2px',
            color: '#C8A248',
            fontWeight: 600,
          }}
        >
          SIGN IN
        </Link>

        {/* Get Started */}
        <Link
          href="#"
          style={{
            background: '#1F2E24',
            color: '#F7F5F1',
            padding: '13px 24px',
            borderRadius: '6px',
            fontSize: '12px',
            letterSpacing: '2px',
            fontWeight: 600,
          }}
        >
          GET STARTED
        </Link>
      </div>
    </header>
  );
}
