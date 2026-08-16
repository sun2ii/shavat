'use client';

import { useRouter } from 'next/navigation';

interface Props {
  label?: string;
  className?: string;
}

export default function BackButton({ label = 'Back', className = '' }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center gap-2 font-sans text-sm text-faint hover:text-ink transition-colors cursor-pointer ${className}`}
    >
      <span>←</span>
      <span>{label}</span>
    </button>
  );
}
