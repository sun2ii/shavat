import { redirect } from 'next/navigation';

// Redirect /psalms to library
export default function PsalmsIndexPage() {
  redirect('/');
}
