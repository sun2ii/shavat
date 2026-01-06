'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const bookmark = storage.getBookmark();
    if (bookmark) {
      router.push(`/genesis/${bookmark.chapter}`);
    } else {
      router.push('/genesis/1');
    }
  }, [router]);

  return null;
}
