'use client';

/**
 * Launch animation for the Capacitor iOS shell — a breath, not an ad.
 *
 * Flash-proof in two layers: an inline script in layout.tsx adds
 * `native-splash` to <html> BEFORE first paint (same trick as the theme
 * no-flash script), and CSS paints an instant solid-green cover. This
 * component then mounts, shows the animated splash on top, drops the CSS
 * cover, and dissolves into the app. Plays once per launch (sessionStorage),
 * tap to skip, never on the web.
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';

const TOTAL_MS = 2600;

export default function NativeSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    // The pre-paint script already decided whether this launch gets a splash.
    if (!root.classList.contains('native-splash')) return;
    try {
      sessionStorage.setItem('shavat-splash-played', '1');
    } catch {}
    setShow(true);
    // The animated overlay now covers the screen — retire the CSS cover so
    // our exit fade reveals the app, not a second green wall.
    root.classList.remove('native-splash');
    const t = setTimeout(() => setShow(false), TOTAL_MS);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      onClick={() => setShow(false)}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1F2E24] animate-[splash-exit_2.6s_ease-in_forwards]"
      aria-hidden="true"
    >
      <Image
        src="/logo.webp"
        alt=""
        width={96}
        height={96}
        priority
        className="animate-[splash-logo_0.9s_ease-out_both]"
      />
      <div className="mt-5 font-playfair text-3xl font-semibold text-[#F7F5F1] animate-[splash-title_1.1s_ease-out_0.25s_both]">
        SHAVAT
      </div>
      <div className="mt-2 text-xl text-[#F7F5F1]/70 animate-[splash-title_1.1s_ease-out_0.35s_both]">
        שָׁבַת
      </div>
      <div className="mt-3 font-sans text-[10px] uppercase tracking-[0.35em] text-[#C8A248] animate-[splash-kicker_0.8s_ease-out_0.95s_both]">
        Know where you are
      </div>
    </div>
  );
}
