import { redirect } from 'next/navigation';
import { getCurrentUser, requireRole } from '@/lib/auth';
import Link from 'next/link';
import LogoutButton from '../dashboard/LogoutButton';

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (!requireRole(user, 'admin')) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))]">
      <header className="border-b border-hairline bg-[rgb(var(--surface))]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-sans text-xs tracking-widest uppercase font-bold text-gold-ink">
            Shavat
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-sans text-sm text-[rgb(var(--text-secondary))]">
              {user.email}
            </span>
            <Link
              href="/dashboard"
              className="font-sans text-xs text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]"
            >
              Dashboard
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-sans text-2xl font-bold text-[rgb(var(--text-primary))] mb-4">
          Admin Panel
        </h1>
        <div className="bg-[rgb(var(--surface))] rounded-lg border border-hairline p-6">
          <p className="font-sans text-[rgb(var(--text-secondary))]">
            This page is only accessible to administrators.
          </p>
          <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded">
            <p className="font-sans text-sm text-amber-600 dark:text-amber-400">
              Admin controls would go here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
