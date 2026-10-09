'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';

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

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isAuthenticated?: boolean;
}

export function Sidebar({ isOpen, onToggle, isAuthenticated = false }: SidebarProps) {
  const pathname = usePathname();

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

      {/* Bottom: just collapse toggle, aligned right */}
      <div className={`flex ${isOpen ? 'justify-end px-2' : 'justify-center'}`}>
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
    </aside>
  );
}
