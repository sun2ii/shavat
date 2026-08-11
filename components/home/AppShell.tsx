'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

const mobileNavLinks = [
  { href: '/', label: 'Home', icon: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 8.5 L9 2.5 L16 8.5 M4 7.5 V15.5 H14 V7.5 M7.5 15.5 V11 H10.5 V15.5"/></svg> },
  { href: '/library', label: 'Library', icon: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg> },
  { href: '/terrain', label: 'Terrain', icon: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6 C4 4 6 4 8 6 C10 8 12 8 14 6 M2 12 C4 10 6 10 8 12 C10 14 12 14 14 12" transform="translate(1 0)"/></svg> },
  { href: '/characters', label: 'Characters', icon: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="5" r="3"/><path d="M3 16 C3 12 6 10 9 10 C12 10 15 12 15 16"/></svg> },
  { href: '/places', label: 'Places', icon: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 2 C6 2 4 4.5 4 7 C4 11 9 16 9 16 C9 16 14 11 14 7 C14 4.5 12 2 9 2 Z"/><circle cx="9" cy="7" r="2"/></svg> },
  { href: '/timeline', label: 'Timeline', icon: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 2 V16 M5 5 H13 M5 9 H13 M5 13 H13"/></svg> },
  { href: '/writings', label: 'Writings', icon: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3 H15 V15 H3 Z M6 6 H12 M6 9 H12 M6 12 H10"/></svg> },
];

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen light font-inter bg-[#F7F5F1] text-[#1F2E24]">
      {/* Desktop: sidebar layout */}
      <div className="hidden lg:block">
        <div
          className="min-h-screen"
          style={{
            display: 'grid',
            gridTemplateColumns: sidebarOpen ? '222px 1fr' : '64px 1fr',
            transition: 'grid-template-columns 0.3s ease'
          }}
        >
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="min-w-0 overflow-auto p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile/Tablet: no sidebar, hamburger menu */}
      <div className="lg:hidden">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 bg-[#1F2E24] px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 text-[#B8C0AE] hover:text-[#F7F5F1]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6 H20 M4 12 H20 M4 18 H20" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <svg width="24" height="28" viewBox="0 0 72 86" fill="none" stroke="#C8A248" strokeWidth="1.6">
              <circle cx="36" cy="6" r="2.4" fill="#C8A248" stroke="none" />
              <path d="M14 82 V38 C14 20 24 12 36 12 C48 12 58 20 58 38 V82" />
              <path d="M36 30 V58 M26 40 H46" />
            </svg>
            <span className="font-playfair text-lg font-semibold text-[#F7F5F1] tracking-wider">SHAVAT</span>
          </div>
        </header>

        {/* Main content */}
        <main className="min-w-0 overflow-auto p-4 sm:p-6">
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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#1F2E24] z-50 lg:hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#33422F]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg width="32" height="38" viewBox="0 0 72 86" fill="none" stroke="#C8A248" strokeWidth="1.6">
                <circle cx="36" cy="6" r="2.4" fill="#C8A248" stroke="none" />
                <path d="M14 82 V38 C14 20 24 12 36 12 C48 12 58 20 58 38 V82" />
                <path d="M36 30 V58 M26 40 H46" />
              </svg>
              <div>
                <div className="font-playfair text-lg font-semibold text-[#F7F5F1] tracking-wider">SHAVAT</div>
                <div className="text-[9px] tracking-[1.5px] text-[#B8C0AE]">KNOW WHERE YOU ARE</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#B8C0AE] hover:text-[#F7F5F1]"
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
                      ? 'bg-[#F7F5F1] text-[#1F2E24] font-semibold'
                      : 'text-[#E8E5DC] hover:bg-[#2A3D2F]'
                  }`}
                >
                  <span className={isActive ? 'text-[#1F2E24]' : 'text-[#C8A248]'}>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#33422F]">
          <div className="text-[10px] text-[#B8C0AE] text-center">
            Stay oriented in Scripture.
          </div>
        </div>
      </div>
    </>
  );
}
