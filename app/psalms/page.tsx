'use client';

import PsalmsGroupedView from '@/components/browse/PsalmsGroupedView';
import psalmsMetadata from '@/lib/psalms-metadata.json';

export default function PsalmsBrowsePage() {
  return (
    <main>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-[#D4AF37] mb-3 tracking-wide">Browse Psalms</h1>
        <p className="text-[rgb(var(--text-secondary))] text-base">
          Organized by emotional state with biblical psalm numbers as reference
        </p>
      </div>

      <PsalmsGroupedView psalms={psalmsMetadata.psalms} />
    </main>
  );
}
