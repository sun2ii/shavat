'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          setFieldErrors(data.details);
        } else {
          setError(data.error || 'Signup failed');
        }
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-[rgb(var(--surface))] rounded-lg border border-hairline p-8">
          <h1 className="font-sans text-2xl font-bold text-[rgb(var(--text-primary))] text-center mb-6">
            Create account
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-sans text-sm text-[rgb(var(--text-secondary))] mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 rounded border bg-[rgb(var(--bg-secondary))] text-gray-900 dark:text-white font-sans ${
                  fieldErrors.email ? 'border-red-500' : 'border-hairline'
                } focus:outline-none focus:ring-2 focus:ring-gold/50`}
                required
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="block font-sans text-sm text-[rgb(var(--text-secondary))] mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded border bg-[rgb(var(--bg-secondary))] text-gray-900 dark:text-white font-sans ${
                  fieldErrors.password ? 'border-red-500' : 'border-hairline'
                } focus:outline-none focus:ring-2 focus:ring-gold/50`}
                required
              />
              {fieldErrors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.password[0]}</p>
              )}
              <p className="mt-1 text-xs text-[rgb(var(--text-tertiary))]">
                Min 8 characters, uppercase, lowercase, number, and special character
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[rgb(var(--gold))] text-white font-sans font-semibold rounded hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-sans text-sm text-[rgb(var(--text-tertiary))]">
              Already have an account?{' '}
              <Link href="/login" className="text-gold-ink hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="font-sans text-sm text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
