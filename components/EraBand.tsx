import { EraGroup } from '@/lib/story-map';
import MovementNode from './MovementNode';

interface EraBandProps {
  group: EraGroup;
}

export default function EraBand({ group }: EraBandProps) {
  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className="text-lg font-light text-[rgb(var(--text-primary))]">
          {group.era.label}
        </h2>
        <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
          {group.era.description}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {group.movements.map((movement) => (
          <MovementNode key={movement.key} movement={movement} />
        ))}
      </div>
    </section>
  );
}
