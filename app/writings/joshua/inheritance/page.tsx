import { Metadata } from 'next';
import DivisionMemorial from '@/components/DivisionMemorial';
import { INHERITANCE } from '@/lib/writings/joshua/inheritance';

export const metadata: Metadata = {
  title: 'Shavat | Inheritance',
  description:
    'Joshua 13–17: stewardship, wholeheartedness, compromise, and responsibility.',
  openGraph: {
    title: 'Shavat | Inheritance',
    images: ['/shavat.png'],
  },
};

export default function InheritancePage() {
  return <DivisionMemorial memorial={INHERITANCE} />;
}
