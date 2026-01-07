import Link from 'next/link';
import { getDirectionArrow, getEmotionalStateColor } from '@/lib/psalms-utils';

interface Props {
  number: number;
  emotional_state: string;
  directional_movement: string;
  safe_when_fragile: boolean;
}

export default function PsalmCard({ number, emotional_state, directional_movement, safe_when_fragile }: Props) {
  const directionArrow = getDirectionArrow(directional_movement);
  const emotionalColor = getEmotionalStateColor(emotional_state);

  return (
    <Link
      href={`/psalms/${number}`}
      className={`
        relative flex flex-col items-center justify-center
        min-h-[140px] p-4
        bg-[rgb(var(--bg-secondary))]
        border rounded
        transition-all duration-200
        hover:bg-[#D4AF37] hover:text-white hover:scale-105
        ${!safe_when_fragile ? 'border-2 border-red-600/50' : 'border border-[rgb(var(--border))]'}
      `}
      title={`Psalm ${number}: ${emotional_state} • ${directional_movement}${!safe_when_fragile ? ' ⚠️ Use with care' : ''}`}
    >
      {/* Safety Warning */}
      {!safe_when_fragile && (
        <div className="absolute top-2 right-2">
          <span className="text-xs text-red-500" title="Not safe when fragile">
            ⚠
          </span>
        </div>
      )}

      {/* Psalm Number */}
      <div className="text-4xl font-semibold text-[rgb(var(--text-primary))] group-hover:text-white mb-1">
        {number}
      </div>

      {/* Emotional State */}
      <div className={`text-sm font-light ${emotionalColor} group-hover:text-white/90`}>
        {emotional_state}
      </div>

      {/* Direction Arrow */}
      <div className="absolute bottom-2 right-3 text-2xl text-[rgb(var(--text-tertiary))] group-hover:text-white/80">
        {directionArrow}
      </div>
    </Link>
  );
}
