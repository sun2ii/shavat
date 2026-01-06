import { Verse as VerseType, Highlight } from '@/lib/types';

interface Props {
  verse: VerseType;
  isSelected: boolean;
  highlight?: Highlight;
  onClick: (verseNum: number, isShiftClick: boolean) => void;
  onDoubleClick: (verseNum: number) => void;
}

export default function Verse({ verse, isSelected, highlight, onClick, onDoubleClick }: Props) {
  return (
    <>
      <span
        onClick={(e) => onClick(verse.verse, e.shiftKey)}
        onDoubleClick={() => onDoubleClick(verse.verse)}
        className={`
          cursor-pointer transition-all inline-block
          ${isSelected ? 'ring-2 ring-offset-4 ring-blue-500' : ''}
          ${highlight?.color === 'yellow' ? 'bg-[rgb(var(--highlight-yellow))]' : ''}
          ${highlight?.color === 'blue' ? 'bg-[rgb(var(--highlight-blue))]' : ''}
        `}
        data-verse={verse.verse}
      >
        <sup className="text-[rgb(var(--text-tertiary))] mr-2 text-xs font-light select-none">{verse.verse}</sup>
        {verse.text}
      </span>
      <br />
    </>
  );
}
