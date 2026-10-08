'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { loadingBus } from '@/lib/loading-bus';

type Phase = 'idle' | 'active' | 'finishing';

// Thin gold bar across the top of the viewport.
//   idle      → hidden, width 0
//   active    → creeps toward 85% over several seconds (never completes on its own)
//   finishing → snaps to 100%, fades, then resets to idle
export default function LoadingBar() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Bus → phase
  useEffect(() => {
    return loadingBus.subscribe((active) => {
      if (active) {
        if (finishTimer.current) clearTimeout(finishTimer.current);
        setPhase('active');
        // A navigation that never lands (blocked, errored) must not spin forever.
        if (safetyTimer.current) clearTimeout(safetyTimer.current);
        safetyTimer.current = setTimeout(() => loadingBus.reset(), 15000);
      } else {
        if (safetyTimer.current) clearTimeout(safetyTimer.current);
        setPhase((p) => (p === 'active' ? 'finishing' : p));
        finishTimer.current = setTimeout(() => setPhase('idle'), 450);
      }
    });
  }, []);

  // Route landed → everything in flight is done.
  useEffect(() => {
    loadingBus.reset();
  }, [pathname]);

  // Same-origin link clicks start the bar. Programmatic navigations call
  // loadingBus.start() themselves.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // Same page (hash or identical path): nothing will load.
      if (url.pathname === location.pathname && url.search === location.search) return;
      loadingBus.start();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  const width = phase === 'active' ? '85%' : phase === 'finishing' ? '100%' : '0%';
  const opacity = phase === 'idle' ? 0 : 1;
  const transition =
    phase === 'active'
      ? 'width 6s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 120ms'
      : phase === 'finishing'
      ? 'width 180ms ease-out, opacity 300ms ease-out 150ms'
      : 'none';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]">
      <div
        className="h-full bg-gold shadow-[0_0_10px_rgb(var(--gold)/0.9)]"
        style={{ width, opacity, transition }}
      />
    </div>
  );
}
