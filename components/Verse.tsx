import { Verse as VerseType } from '@/lib/types';

interface Props {
  verse: VerseType;
  isSelected?: boolean;
  onToggle?: (verseNum: number) => void;
}

export default function Verse({ verse, isSelected = false, onToggle }: Props) {
  const handleClick = () => {
    if (onToggle) {
      onToggle(verse.verse);
    }
  };

  return (
    <>
      <span
        className={`inline-block mb-4 py-1 font-medium cursor-pointer transition-colors px-2 rounded ${
          isSelected ? 'bg-yellow-200 text-gray-900' : 'hover:bg-yellow-100 hover:text-gray-900'
        }`}
        data-verse={verse.verse}
        onClick={handleClick}
      >
        <sup className={`mr-2 text-xs font-light select-none transition-colors ${isSelected ? 'text-gray-600' : 'text-[rgb(var(--text-tertiary))] group-hover:text-gray-600'}`}>{verse.verse}</sup>
        {verse.text}
      </span>
      <br />
    </>
  );
}
