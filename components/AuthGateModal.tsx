import Link from 'next/link';

interface AuthGateModalProps {
  returnTo?: string;
}

export function AuthGateModal({ returnTo }: AuthGateModalProps) {
  const signupUrl = returnTo ? `/signup?returnTo=${encodeURIComponent(returnTo)}` : '/signup';
  const loginUrl = returnTo ? `/login?returnTo=${encodeURIComponent(returnTo)}` : '/login';

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="bg-surface border border-hairline rounded-xl p-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-shavat-darkest flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.3">
              <path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19" />
            </svg>
          </div>

          <h1 className="font-playfair text-2xl font-semibold text-ink mb-2">
            Sign up to read Scripture
          </h1>
          <p className="text-muted text-sm mb-6">
            Create a free account to access the full text of the Bible.
          </p>

          <div className="space-y-3">
            <Link
              href={signupUrl}
              className="block w-full py-3 bg-shavat-darkest text-shavat-cream font-semibold rounded-lg hover:bg-shavat-dark transition-colors text-sm tracking-wide"
            >
              CREATE FREE ACCOUNT
            </Link>
            <Link
              href={loginUrl}
              className="block w-full py-3 border border-hairline text-ink font-medium rounded-lg hover:bg-surface-elevated transition-colors text-sm"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-hairline">
            <Link
              href="/library"
              className="text-sm text-muted hover:text-ink transition-colors"
            >
              ← Back to Library
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
