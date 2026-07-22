import { Metadata } from 'next';
import DivisionMemorial from '@/components/DivisionMemorial';
import { POSSESS_THE_LAND } from '@/lib/writings/joshua/possess-the-land';

export const metadata: Metadata = {
  title: 'Shavat | Possess the Land',
  description: 'Joshua 9–12: discernment, courage, dependence, and remembrance.',
  openGraph: {
    title: 'Shavat | Possess the Land',
    images: ['/shavat.png'],
  },
};

export default function PossessTheLandPage() {
  return <DivisionMemorial memorial={POSSESS_THE_LAND} />;
}
