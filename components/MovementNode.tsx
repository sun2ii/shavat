import Link from 'next/link';
import { Movement } from '@/lib/story-map';

interface MovementNodeProps {
  movement: Movement;
}

// Quiet content-type tint reusing the existing highlight color language.
function tintStyle(contentType?: string): React.CSSProperties {
  switch (contentType) {
    case 'narrative':
      return { borderLeft: '3px solid rgb(var(--highlight-blue))' };
    case 'instructional':
      return { borderLeft: '3px solid rgb(var(--highlight-yellow))' };
    case 'mixed':
      return {
        borderLeft: '3px solid transparent',
        borderImage:
          'linear-gradient(to bottom, rgb(var(--highlight-blue)), rgb(var(--highlight-yellow))) 1',
      };
    default:
      return { borderLeft: '3px solid rgb(var(--border))' };
  }
}

export default function MovementNode({ movement }: MovementNodeProps) {
  // Terrain names, not formal labels: "Creation", not "The Book of Creation".
  const displayTitle = movement.title.replace(/^The Book of\s+/i, '');

  const first = movement.chapters[0];
  const last = movement.chapters[movement.chapters.length - 1];
  const range = first === last ? `${first}` : `${first}–${last}`;

  return (
    <Link
      href={movement.href}
      title={movement.theme || undefined}
      className="inline-flex items-baseline gap-2 px-3 py-1.5 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors"
      style={tintStyle(movement.contentType)}
    >
      <span className="text-sm font-light text-[rgb(var(--text-primary))] leading-tight whitespace-nowrap">
        {displayTitle}
      </span>
      <span className="text-[10px] text-[rgb(var(--text-secondary))] opacity-50 whitespace-nowrap">
        {range}
      </span>
    </Link>
  );
}
