import { Verse as VerseType } from '@/lib/types';

interface Props {
  verse: VerseType;
  isSelected?: boolean;
  onToggle?: (verseNum: number) => void;
  commentary?: string;
}

export default function Verse({ verse, isSelected = false, onToggle, commentary }: Props) {
  const handleInteraction = () => {
    if (onToggle) {
      onToggle(verse.verse);
    }
  };

  return (
    <>
      <span
        className={`inline-block mb-4 py-1 font-medium cursor-pointer transition-colors px-2 rounded ${
          isSelected ? 'bg-yellow-200 text-gray-900' : ''
        }`}
        data-verse={verse.verse}
        onDoubleClick={handleInteraction}
      >
        <sup className={`mr-2 text-xs font-light select-none transition-colors ${isSelected ? 'text-gray-600' : 'text-[rgb(var(--text-tertiary))]'}`}>{verse.verse}</sup>
        {verse.text}
      </span>
      <br />
      {isSelected && commentary && (
        <div className="ml-6 mb-6 p-4 bg-gray-100 dark:bg-gray-800 border-l-4 border-yellow-500 rounded-r text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {commentary}
        </div>
      )}
    </>
  );
}
