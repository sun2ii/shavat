import type { SpeakerDef } from '@/lib/speaker-quotes';

interface Props {
  speakers: Record<string, SpeakerDef>;
}

/*
  The open section's cast: which color speaks, as a chip row under the title.
  Inline rgb(var(--speaker-N)) rather than Tailwind classes — slot numbers
  come from data, and the scanner can't see interpolated class names (same
  trade HighlightsList makes).
*/
export default function SpeakerLegend({ speakers }: Props) {
  const entries = Object.entries(speakers).sort(([, a], [, b]) => a.color - b.color);
  if (entries.length === 0) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
      {entries.map(([id, def]) => (
        <span key={id} className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: `rgb(var(--speaker-${def.color}))` }}
          />
          <span className="font-sans text-[11px] tracking-[0.16em] uppercase text-muted">
            {def.name}
          </span>
        </span>
      ))}
    </div>
  );
}
