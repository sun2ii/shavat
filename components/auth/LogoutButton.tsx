'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton({ className }: { className?: string } = {}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch {
      console.error('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`font-sans text-xs disabled:opacity-50 ${
        className ?? 'text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]'
      }`}
    >
      {loading ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
