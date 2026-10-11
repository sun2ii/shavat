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

  // min-h-full, never h-full: a short page may still claim the shell's full
  // height, but a tall page must GROW this box rather than overflow it. The
  // native shell appends a tab-bar spacer (main::after) after this wrapper;
  // with a fixed h-full box the spacer landed at 100% height, buried under
  // the overflowing chapter, and Next / Previous stayed under the tab bar.
  return <div ref={ref} className="min-h-full">{children}</div>;
}
