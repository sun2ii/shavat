import { useMemo } from 'react';
import CategorySection from './CategorySection';

interface Psalm {
  number: number;
  category_id: string;
  category_number: number;
  emotional_state: string;
  directional_movement: string;
  safe_when_fragile: boolean;
}

interface Props {
  psalms: Psalm[];
}

export default function PsalmsGroupedView({ psalms }: Props) {
  // Group psalms by emotional_state
  const groupedPsalms = useMemo(() => {
    const groups: Record<string, Psalm[]> = {};

    psalms.forEach(psalm => {
      const category = psalm.emotional_state;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(psalm);
    });

    // Sort each group by category_number
    Object.keys(groups).forEach(category => {
      groups[category].sort((a, b) => a.category_number - b.category_number);
    });

    return groups;
  }, [psalms]);

  // Define category order (positive, neutral, negative)
  const categoryOrder = [
    'praise',
    'joy',
    'gratitude',
    'confidence',
    'trust',
    'wisdom',
    'endurance',
    'anxiety',
    'fear',
    'exhaustion',
    'confusion',
    'guilt',
    'grief',
    'anger',
    'despair',
  ];

  // Sort categories by the defined order
  const sortedCategories = Object.keys(groupedPsalms).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    // If both in order list, sort by order
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If only a in order, a comes first
    if (indexA !== -1) return -1;
    // If only b in order, b comes first
    if (indexB !== -1) return 1;
    // If neither in order, alphabetical
    return a.localeCompare(b);
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {sortedCategories.map(category => (
        <CategorySection
          key={category}
          category={category}
          psalms={groupedPsalms[category]}
        />
      ))}
    </div>
  );
}
