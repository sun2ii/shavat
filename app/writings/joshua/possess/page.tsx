import { Metadata } from 'next';
import DivisionMemorial from '@/components/DivisionMemorial';
import { POSSESS } from '@/lib/writings/joshua/possess';

export const metadata: Metadata = {
  title: 'Shavat | Possess',
  description: 'Joshua 9–12: discernment, courage, dependence, and remembrance.',
  openGraph: {
    title: 'Shavat | Possess',
    images: ['/shavat.png'],
  },
};

export default function PossessPage() {
  return <DivisionMemorial memorial={POSSESS} />;
}
