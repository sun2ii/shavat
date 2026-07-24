import { Metadata } from 'next';
import DivisionMemorial from '@/components/DivisionMemorial';
import { FORMATION } from '@/lib/writings/joshua/formation';

export const metadata: Metadata = {
  title: 'Shavat | Formation',
  description: 'Joshua 1–5: courage, faith, consecration, remembrance, and holiness.',
  openGraph: {
    title: 'Shavat | Formation',
    images: ['/shavat.png'],
  },
};

export default function FormationPage() {
  return <DivisionMemorial memorial={FORMATION} />;
}
