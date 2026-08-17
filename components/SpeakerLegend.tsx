import type { SpeakerDef } from '@/lib/speaker-quotes';

interface Props {
  /* Compact reference, e.g. "2 Kings 11:4–12". */
  heading: string;
  detail?: string;
  speakers: Record<string, SpeakerDef>;
  /* Outer positioning tweaks (e.g. hugging an open card's edges). */
  className?: string;
}

/*
  Voices bar: who is speaking where you are. Sticky, so while its container is
  on screen it rides the viewport top — never a scroll back up to check a
  color — and leaves with its container, keeping the context honest. Inline
  rgb(var(--speaker-N)) rather than Tailwind classes — slot numbers come from
  data, and the scanner can't see interpolated class names (same trade
  HighlightsList makes).
*/
export default function SpeakerLegend({ heading, detail, speakers, className = '' }: Props) {
  const entries = Object.entries(speakers).sort(([, a], [, b]) => a.color - b.color);

  // Dark walnut band, both themes. The bar is dark regardless of theme, so
  // every color inside is chosen FOR the brown: gold reference, warm-cream
  // names, and a faint ring around the speaker dots (the light theme's
  // speaker colors are dark inks that would otherwise sink into the brown).
  return (
    <div
      className={`sticky top-0 z-30 border-b border-black/20 bg-[#3B3226] dark:bg-[#2E2820] ${className}`}
    >
      <div className="px-6 md:px-8 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5">
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="font-sans text-[11px] tracking-[0.16em] uppercase font-bold text-[#C8A248] truncate">
            {heading}
          </span>
          {detail && (
            <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#D9D1B5]/70 whitespace-nowrap">
              {detail}
            </span>
          )}
        </div>
        {entries.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {entries.map(([id, def]) => (
              <span key={id} className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full ring-1 ring-[#F7F5F1]/35"
                  style={{ backgroundColor: `rgb(var(--speaker-${def.color}))` }}
                />
                <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-[#EEEBE6]/85">
                  {def.name}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
