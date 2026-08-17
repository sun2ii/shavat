import { Metadata } from 'next';
import Terrain from '@/components/terrain/Terrain';

export const metadata: Metadata = {
  title: 'Shavat | Terrain',
  description: 'The landscape of Scripture — one story, from creation to all things new.',
  openGraph: {
    title: 'Shavat | Terrain',
    images: ['/shavat.png'],
  },
};

export default function TerrainPage() {
  return <Terrain />;
}
