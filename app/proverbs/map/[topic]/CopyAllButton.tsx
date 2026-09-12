'use client';

import { useState } from 'react';

interface Verse {
  chapter: number;
  verse: number;
  text: string;
}

interface Props {
  label: string;
  verses: Verse[];
}

export default function CopyAllButton({ label, verses }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const lines = verses.map(v => `Proverbs ${v.chapter}:${v.verse} ${v.text}`);
    const copyText = `${label}\n\n${lines.join('\n\n')}`;
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 p-2 text-muted hover:text-gold transition-colors mt-1"
      title="Copy all verses"
    >
      {copied ? (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}
