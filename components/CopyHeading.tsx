'use client';

import { useEffect, useRef, useState } from 'react';
import { COPY_FLASH_MS, COPY_GLOW, COPY_GLOW_OFF, COPY_TRANSITION } from '@/lib/copy-glow';

interface Props {
  /** Plain text placed on the clipboard when the heading is pressed. */
  text: string;
  /** Typography and layout — everything except color. */
  className?: string;
  /** Resting color, including its hover state. */
  restClass?: string;
  /** Color held while the copied glow burns off. */
  flashClass?: string;
  children: React.ReactNode;
}

/**
 * A heading that is its own copy button. Color classes are swapped rather than
 * stacked — two competing text-* utilities have equal specificity, so the
 * winner would depend on stylesheet order rather than on state.
 */
export default function CopyHeading({
  text,
  className = '',
  restClass = 'text-ink hover:text-gold',
  flashClass = 'text-gold',
  children,
}: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    setCopied(true);
    timer.current = setTimeout(() => setCopied(false), COPY_FLASH_MS);
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy section'}
      className={`inline-block max-w-full cursor-pointer ${COPY_TRANSITION} ${className} ${
        copied ? `${flashClass} ${COPY_GLOW}` : `${restClass} ${COPY_GLOW_OFF}`
      }`}
    >
      {children}
    </button>
  );
}
