import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import SpeakerReviewClient from './SpeakerReviewClient';

export default async function SpeakerReviewPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login?returnTo=/review/speakers');
  }
  return <SpeakerReviewClient />;
}
