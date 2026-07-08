'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { href: '/library', label: 'Library' },
  { href: '/map', label: 'Map' },
  { href: '/writings', label: 'Writings' },
];

export default function Header() {
  return (
    <header className="mb-6 pb-3 border-b border-hairline">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-[30px] h-[30px] rounded-lg bg-brand text-gold flex items-center justify-center font-serif text-[17px] leading-none">
            ש
          </span>
          <span className="font-sans text-base font-bold tracking-tight text-ink">Shavat</span>
        </Link>

        <nav className="flex items-center gap-1.5 font-sans text-[13px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-muted hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <span className="ml-1">
            <ThemeToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}
