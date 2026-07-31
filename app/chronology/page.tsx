import { redirect } from 'next/navigation';

// The chronology page was replaced by the Terrain.
export default function ChronologyPage() {
  redirect('/terrain');
}
