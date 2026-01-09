'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="mb-6 pb-3 border-b border-[rgb(var(--border))]">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/shavat.png" alt="Shavat" className="h-6 w-auto" />
          <span className="text-lg font-light text-[rgb(var(--text-primary))] tracking-wide">Shavat</span>
        </Link>
      </div>
    </header>
  );
}
