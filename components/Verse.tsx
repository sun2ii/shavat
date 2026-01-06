import { Verse as VerseType } from '@/lib/types';

interface Props {
  verse: VerseType;
}

export default function Verse({ verse }: Props) {
  return (
    <>
      <span className="inline-block mb-4 py-1 font-medium" data-verse={verse.verse}>
        <sup className="text-[rgb(var(--text-tertiary))] mr-2 text-xs font-light select-none">{verse.verse}</sup>
        {verse.text}
      </span>
      <br />
    </>
  );
}
