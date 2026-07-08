import { EraGroup } from '@/lib/story-map';
import MovementNode from './MovementNode';

interface EraBandProps {
  group: EraGroup;
}

export default function EraBand({ group }: EraBandProps) {
  return (
    <section className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-6 py-2 border-t border-[rgb(var(--border))] first:border-t-0 first:pt-0">
      <div className="md:w-44 shrink-0" title={group.era.description}>
        <h2 className="text-sm font-light text-[rgb(var(--text-primary))] leading-tight">
          {group.era.label}
        </h2>
      </div>

      <div className="flex flex-wrap gap-1.5 flex-1">
        {group.movements.map((movement) => (
          <MovementNode key={movement.key} movement={movement} />
        ))}
      </div>
    </section>
  );
}
