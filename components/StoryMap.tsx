import { EraGroup } from '@/lib/story-map';
import EraBand from './EraBand';

interface StoryMapProps {
  groups: EraGroup[];
}

export default function StoryMap({ groups }: StoryMapProps) {
  return (
    <div>
      {groups.map((group) => (
        <EraBand key={group.era.id} group={group} />
      ))}
    </div>
  );
}
