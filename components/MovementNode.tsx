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
  const chapterCount = movement.chapters.length;

  return (
    <Link
      href={movement.href}
      className={`block p-3 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors ${
        movement.synthesized ? 'opacity-60' : ''
      }`}
      style={tintStyle(movement.contentType)}
    >
      <h3 className="text-sm font-light text-[rgb(var(--text-primary))] leading-tight">
        {movement.title}
      </h3>
      <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60 mt-0.5">
        {movement.bookName}
        {' · '}
        {chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'}
      </p>
      {movement.theme ? (
        <p className="text-xs text-[rgb(var(--text-secondary))] mt-1">
          {movement.theme}
        </p>
      ) : (
        <p className="text-xs text-[rgb(var(--text-tertiary))] italic mt-1">
          not yet oriented
        </p>
      )}
    </Link>
  );
}
