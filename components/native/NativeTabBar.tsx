'use client';

/**
 * iOS-style bottom tab bar, rendered ONLY inside the Capacitor native shell
 * (see isNativeApp in ./native.ts). On the web this component returns null,
 * so the browser experience is unchanged.
 *
 * Information architecture (decided 2026-08-17): Today · Read · Map · Saved.
 * Progress is not a tab — the Today screen absorbs it. The 5th slot stays
 * empty until a concept earns it. One owner per concept; no duplicates.
 *
 * It also adds the `native-app` class to <html> so globals.css can reserve
 * space above the iPhone home indicator (safe-area padding), and redirects
 * '/' to /today so the native app opens at its front door instead of the
 * marketing home page.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isNativeApp } from './native';
import { tapTick } from './haptics';

type Tab = {
  href: string;
  label: string;
  /** Route prefixes that light this tab up as active. */
  match: string[];
  icon: React.ReactNode;
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const TABS: Tab[] = [
  {
    href: '/today',
    label: 'Today',
    match: ['/today'],
    icon: (
      // rising sun
      <svg {...iconProps} aria-hidden="true">
        <path d="M12 3v3" />
        <path d="M5.6 5.6 7.7 7.7" />
        <path d="M18.4 5.6 16.3 7.7" />
        <path d="M4 17a8 8 0 0 1 16 0" />
        <path d="M2 21h20" />
      </svg>
    ),
  },
  {
    href: '/library',
    label: 'Read',
    match: [
      '/library',
      '/ot',
      '/nt',
      '/psalms',
      '/writings',
      '/genesis',
      '/torah-toc',
      '/nt-toc',
      '/gospels-toc',
    ],
    icon: (
      // open book
      <svg {...iconProps} aria-hidden="true">
        <path d="M2 4.5A9.5 9.5 0 0 1 12 6a9.5 9.5 0 0 1 10-1.5V18A9.5 9.5 0 0 0 12 19.5 9.5 9.5 0 0 0 2 18Z" />
        <path d="M12 6v13.5" />
      </svg>
    ),
  },
  {
    href: '/map',
    label: 'Map',
    match: ['/map', '/terrain', '/timeline', '/chronology'],
    icon: (
      // folded map
      <svg {...iconProps} aria-hidden="true">
        <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z" />
        <path d="M9 4v13" />
        <path d="M15 6.5v13" />
      </svg>
    ),
  },
  {
    href: '/saved',
    label: 'Saved',
    match: ['/saved', '/highlights'],
    icon: (
      // bookmark
      <svg {...iconProps} aria-hidden="true">
        <path d="M6 3.5h12V21l-6-4.2L6 21V3.5Z" />
      </svg>
    ),
  },
];

export default function NativeTabBar() {
  const [native, setNative] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isNativeApp()) {
      setNative(true);
      document.documentElement.classList.add('native-app');
      // The native app's front door is Today, not the marketing home page.
      if (window.location.pathname === '/') {
        router.replace('/today');
      }
      // Warm the haptics module so the first tap doesn't pay the import.
      import('@capacitor/haptics').catch(() => {});
    }
  }, [router]);

  if (!native) return null;

  return (
    <nav
      aria-label="App navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-paper/95 font-sans backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex h-14 items-stretch justify-around">
        {TABS.map((tab) => {
          const active = tab.match.some(
            (m) => pathname === m || pathname.startsWith(`${m}/`)
          );
          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => tapTick()}
              className={`group flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors duration-200 ${
                active ? 'text-gold-ink' : 'text-faint'
              }`}
            >
              {/* Press: icon squishes under the finger. Land: it springs.
                  Keyframes live in globals.css (tab-bounce). */}
              <span
                className={`transition-transform duration-150 ease-out group-active:scale-[0.85] ${
                  active ? 'animate-[tab-bounce_0.35s_ease-out]' : ''
                }`}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.08em] transition-colors duration-200">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
