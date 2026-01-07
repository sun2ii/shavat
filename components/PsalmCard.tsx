import Link from 'next/link';

interface Props {
  number: number;
  categoryId: string;
  categoryNumber: number;
  emotional_state: string;
  directional_movement: string;
  safe_when_fragile: boolean;
}

export default function PsalmCard({ number, categoryId, categoryNumber, emotional_state, directional_movement, safe_when_fragile }: Props) {
  return (
    <Link
      href={`/psalms/${categoryId}`}
      className="text-[rgb(var(--text-secondary))] hover:text-[#D4AF37] transition-colors text-lg"
      title={`${emotional_state} ${categoryNumber} (Psalm ${number})`}
    >
      {categoryNumber}
    </Link>
  );
}
