import { Metadata } from 'next';
import DivisionMemorial from '@/components/DivisionMemorial';
import { FIRST_TESTS } from '@/lib/writings/joshua/first-tests';

export const metadata: Metadata = {
  title: 'Shavat | First Tests',
  description: 'Joshua 6–8: obedience, holiness, and restoration.',
  openGraph: {
    title: 'Shavat | First Tests',
    images: ['/shavat.png'],
  },
};

export default function FirstTestsPage() {
  return <DivisionMemorial memorial={FIRST_TESTS} />;
}
