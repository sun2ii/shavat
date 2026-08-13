import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { parseRoadmap } from '@/lib/roadmap';
import { BIBLE_INDEX } from '@/lib/bible-index';
import RoadmapClient from './RoadmapClient';

export default async function RoadmapPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login?returnTo=/review/roadmap');
  }

  const roadmap = await parseRoadmap();
  const otBooks = BIBLE_INDEX.filter(b => b.testament === 'old');
  const ntBooks = BIBLE_INDEX.filter(b => b.testament === 'new');

  return (
    <RoadmapClient
      roadmap={roadmap}
      otBooks={otBooks}
      ntBooks={ntBooks}
    />
  );
}
