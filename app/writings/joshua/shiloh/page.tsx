import { Metadata } from 'next';
import DivisionMemorial from '@/components/DivisionMemorial';
import { SHILOH } from '@/lib/writings/joshua/shiloh';

export const metadata: Metadata = {
  title: 'Shavat | Shiloh',
  description: 'Joshua 18–21: initiative, contentment, justice, and faithfulness.',
  openGraph: {
    title: 'Shavat | Shiloh',
    images: ['/shavat.png'],
  },
};

export default function ShilohPage() {
  return <DivisionMemorial memorial={SHILOH} />;
}
