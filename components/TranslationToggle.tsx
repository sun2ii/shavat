'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation, TRANSLATIONS, Translation } from './providers/TranslationProvider';

export default function TranslationToggle() {
  const { translation, setTranslation } = useTranslation();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const options = Object.entries(TRANSLATIONS) as [Translation, { name: string; fullName: string }][];

  const handleSelect = (key: Translation) => {
    if (key !== translation) {
      setTranslation(key);
      // Refresh to load new translation from server
      router.refresh();
    }
    setOpen(false);
  };

  return (
    <div
      className="relative"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpen(false); }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="font-sans text-[11px] font-semibold text-muted hover:text-ink bg-surface/80 px-2 py-1 rounded cursor-pointer transition-colors"
      >
        {TRANSLATIONS[translation].name}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 cursor-default"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full pt-1 z-50">
            <div className="bg-surface border border-hairline rounded-lg shadow-xl py-1 min-w-[140px]">
              {options.map(([key, { name, fullName }]) => (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`w-full text-left px-3 py-1.5 font-sans text-[12px] transition-colors ${
                    translation === key
                      ? 'text-gold-ink font-semibold'
                      : 'text-muted hover:text-ink hover:bg-surface-hover'
                  }`}
                >
                  <span className="font-semibold">{name}</span>
                  <span className="text-faint ml-1.5">{fullName}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
