/**
 * EntityLegend: Shows the color key for interactive entity types
 * Displayed below the chapter header to help readers understand clickable elements
 */

interface Props {
  /** If provided, shows heading (used when SpeakerLegend is not present) */
  heading?: string;
  detail?: string;
  className?: string;
}

export default function EntityLegend({ heading, detail, className = '' }: Props) {
  return (
    <div className={`px-6 md:px-8 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 ${className}`}>
      {/* Left side: heading if provided */}
      {heading ? (
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="font-sans text-[11px] tracking-[0.16em] uppercase font-bold text-gold truncate">
            {heading}
          </span>
          {detail && (
            <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-muted whitespace-nowrap">
              {detail}
            </span>
          )}
        </div>
      ) : (
        <div />
      )}

      {/* Right side: entity color legend */}
      <div className="flex items-center gap-4">
        <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-blue-600 dark:text-blue-400">
          Character
        </span>
        <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-amber-700 dark:text-amber-500">
          Place
        </span>
        <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-emerald-700 dark:text-emerald-400">
          Reference
        </span>
      </div>
    </div>
  );
}
