import { Metadata } from 'next';
import DivisionMemorial from '@/components/DivisionMemorial';
import { UNFINISHED_CONQUEST } from '@/lib/writings/judges/unfinished-conquest';

export const metadata: Metadata = {
  title: 'Shavat | The Unfinished Conquest',
  description: 'Judges 1–2: compromise and forgetting.',
  openGraph: {
    title: 'Shavat | The Unfinished Conquest',
    images: ['/shavat.png'],
  },
};

export default function UnfinishedConquestPage() {
  return <DivisionMemorial memorial={UNFINISHED_CONQUEST} />;
}
