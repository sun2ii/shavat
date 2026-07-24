import { Metadata } from 'next';
import DivisionMemorial from '@/components/DivisionMemorial';
import { LEGACY } from '@/lib/writings/joshua/legacy';

export const metadata: Metadata = {
  title: 'Shavat | Legacy',
  description: 'Joshua 22–24: unity, perseverance, and the choice every generation faces.',
  openGraph: {
    title: 'Shavat | Legacy',
    images: ['/shavat.png'],
  },
};

export default function LegacyPage() {
  return <DivisionMemorial memorial={LEGACY} />;
}
