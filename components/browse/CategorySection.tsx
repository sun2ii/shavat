'use client';

import { useState } from 'react';
import PsalmCard from '../PsalmCard';

interface Psalm {
  number: number;
  category_id: string;
  category_number: number;
  emotional_state: string;
  directional_movement: string;
  safe_when_fragile: boolean;
}

interface Props {
  category: string;
  psalms: Psalm[];
  defaultExpanded?: boolean;
}

export default function CategorySection({ category, psalms, defaultExpanded = false }: Props) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mb-8">
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center mb-4 p-4 bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border))] rounded hover:bg-[#D4AF37]/10 transition-colors"
      >
        <span className="text-2xl font-semibold text-[#D4AF37] capitalize">
          {category}
        </span>
      </button>

      {/* Psalms List */}
      {isExpanded && (
        <div className="grid grid-cols-7 gap-4">
          {psalms.map((psalm) => (
            <PsalmCard
              key={psalm.category_id}
              number={psalm.number}
              categoryId={psalm.category_id}
              categoryNumber={psalm.category_number}
              emotional_state={psalm.emotional_state}
              directional_movement={psalm.directional_movement}
              safe_when_fragile={psalm.safe_when_fragile}
            />
          ))}
        </div>
      )}
    </div>
  );
}
