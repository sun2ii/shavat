import { redirect } from 'next/navigation';

// The chronology page was replaced by the Story Map.
export default function ChronologyPage() {
  redirect('/map');
}
