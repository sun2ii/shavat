import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';

export default async function ReviewPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login?returnTo=/review');
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-playfair text-2xl font-semibold text-[rgb(var(--text-primary))] mb-2">
        Review Tools
      </h1>
      <p className="font-sans text-sm text-[rgb(var(--text-tertiary))] mb-8">
        Quality assurance and content review
      </p>

      <div className="space-y-4">
        <Link
          href="/review/speakers"
          className="block bg-[rgb(var(--surface))] rounded-lg border border-hairline p-5 hover:border-gold transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-sans text-sm font-semibold text-[rgb(var(--text-primary))]">
                Speaker Review
              </h2>
              <p className="font-sans text-xs text-[rgb(var(--text-tertiary))] mt-1">
                Review and fix speaker/quote attributions
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-faint" strokeWidth="1.5">
              <path d="M6 4 L10 8 L6 12"/>
            </svg>
          </div>
        </Link>

        <Link
          href="/review/roadmap"
          className="block bg-[rgb(var(--surface))] rounded-lg border border-hairline p-5 hover:border-gold transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-sans text-sm font-semibold text-[rgb(var(--text-primary))]">
                Project Roadmap
              </h2>
              <p className="font-sans text-xs text-[rgb(var(--text-tertiary))] mt-1">
                Feature milestones and book status tracking
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-faint" strokeWidth="1.5">
              <path d="M6 4 L10 8 L6 12"/>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
