'use client';

/**
 * Cross-fade between tab screens in the native shell — WITHOUT remounting.
 * On pathname change we retrigger the CSS animation on the existing wrapper
 * (remove class → force reflow → re-add), so the page keeps all its state
 * and none of the remount cost. The animation itself is scoped to
 * html.native-app in globals.css; the web renders a plain, motionless div.
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageFade({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    // Skip the very first render — the splash owns the entrance.
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    el.classList.remove('page-fade-run');
    void el.offsetWidth; // force reflow so the animation restarts
    el.classList.add('page-fade-run');
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
