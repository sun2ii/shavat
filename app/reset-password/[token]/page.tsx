'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          setFieldErrors(data.details);
        } else {
          setError(data.error || 'Reset failed');
        }
        return;
      }

      router.push('/login?reset=success');
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
          <h1 className="font-sans text-2xl font-bold text-[rgb(var(--text-primary))] text-center mb-2">
            Set new password
          </h1>
          <p className="font-sans text-sm text-[rgb(var(--text-tertiary))] text-center mb-6">
            Enter your new password below.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-sans text-sm text-[rgb(var(--text-secondary))] mb-1">
                New Password
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

            <div>
              <label className="block font-sans text-sm text-[rgb(var(--text-secondary))] mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded border border-hairline bg-[rgb(var(--bg-secondary))] text-gray-900 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[rgb(var(--gold))] text-white font-sans font-semibold rounded hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset password'}
            </button>
          </form>
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
