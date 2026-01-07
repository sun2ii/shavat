import PsalmCard from '../PsalmCard';

interface Psalm {
  number: number;
  emotional_state: string;
  directional_movement: string;
  safe_when_fragile: boolean;
}

interface Props {
  psalms: Psalm[];
}

export default function PsalmsGrid({ psalms }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {psalms.map((psalm) => (
        <PsalmCard
          key={psalm.number}
          number={psalm.number}
          emotional_state={psalm.emotional_state}
          directional_movement={psalm.directional_movement}
          safe_when_fragile={psalm.safe_when_fragile}
        />
      ))}
    </div>
  );
}
