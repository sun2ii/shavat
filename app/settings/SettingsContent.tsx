'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { User } from '@/lib/auth';
import {
  useReadingPreferences,
  type LineSpacing,
  type Appearance,
  LINE_HEIGHT_MAP,
} from '@/components/providers/ReadingPreferencesProvider';

interface Props {
  user: User;
}

// Sample verse for live preview
const PREVIEW_TEXT = `In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep.`;

function BackIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export default function SettingsContent({ user }: Props) {
  const router = useRouter();
  const { preferences, setFontSize, setLineSpacing, setAppearance } = useReadingPreferences();
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [passwordError, setPasswordError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    setPasswordStatus('loading');
    setPasswordError('');

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to change password');
      }

      setPasswordStatus('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordStatus('idle'), 3000);
    } catch (err) {
      setPasswordStatus('error');
      setPasswordError((err as Error).message);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch {
      router.push('/login');
    }
  };

  return (
    <main className="min-h-full px-6 py-8 max-w-2xl mx-auto">
      {/* Header with back button */}
      <header className="flex items-center gap-4 mb-10">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-muted hover:text-ink transition-colors"
          aria-label="Go back"
        >
          <BackIcon />
        </button>
        <div>
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            Preferences
          </p>
          <h1 className="font-serif text-3xl font-light tracking-tight text-ink">
            Settings
          </h1>
        </div>
      </header>

      {/* Reading Section */}
      <section className="mb-12">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-6 pb-2 border-b border-hairline">
          Reading
        </h2>

        {/* Font Size */}
        <div className="mb-8">
          <label className="block font-sans text-sm font-medium text-ink mb-3">
            Font Size
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFontSize(preferences.fontSize - 1)}
              disabled={preferences.fontSize <= 14}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-hairline text-lg font-medium text-muted hover:text-ink hover:border-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <span className="w-12 text-center font-sans text-sm text-ink">
              {preferences.fontSize}px
            </span>
            <button
              onClick={() => setFontSize(preferences.fontSize + 1)}
              disabled={preferences.fontSize >= 28}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-hairline text-lg font-medium text-muted hover:text-ink hover:border-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Line Spacing */}
        <div className="mb-8">
          <label className="block font-sans text-sm font-medium text-ink mb-3">
            Line Spacing
          </label>
          <div className="flex gap-2">
            {(['compact', 'comfortable', 'spacious'] as LineSpacing[]).map((spacing) => (
              <button
                key={spacing}
                onClick={() => setLineSpacing(spacing)}
                className={`px-4 py-2 rounded-lg font-sans text-sm capitalize transition-colors ${
                  preferences.lineSpacing === spacing
                    ? 'bg-gold text-white'
                    : 'border border-hairline text-muted hover:text-ink hover:border-gold'
                }`}
              >
                {spacing}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div className="mb-8">
          <label className="block font-sans text-sm font-medium text-ink mb-3">
            Preview
          </label>
          <div
            className="p-4 rounded-lg border border-hairline bg-[rgb(var(--surface))]"
            style={{
              fontFamily: 'Cardo, Georgia, serif',
              fontSize: `${preferences.fontSize}px`,
              lineHeight: LINE_HEIGHT_MAP[preferences.lineSpacing],
            }}
          >
            {PREVIEW_TEXT}
          </div>
        </div>

        {/* Appearance */}
        <div>
          <label className="block font-sans text-sm font-medium text-ink mb-3">
            Appearance
          </label>
          <div className="flex gap-2">
            {(['light', 'dark', 'system'] as Appearance[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setAppearance(mode)}
                className={`px-4 py-2 rounded-lg font-sans text-sm capitalize transition-colors ${
                  preferences.appearance === mode
                    ? 'bg-gold text-white'
                    : 'border border-hairline text-muted hover:text-ink hover:border-gold'
                }`}
              >
                {mode === 'system' ? 'System Default' : `${mode} Mode`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Account Section */}
      <section className="mb-12">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-6 pb-2 border-b border-hairline">
          Account
        </h2>

        {/* Email */}
        <div className="mb-8">
          <label className="block font-sans text-sm font-medium text-ink mb-2">
            Email
          </label>
          <p className="font-sans text-sm text-muted">{user.email}</p>
        </div>

        {/* Change Password */}
        <div className="mb-8">
          <label className="block font-sans text-sm font-medium text-ink mb-3">
            Change Password
          </label>
          <form onSubmit={handlePasswordChange} className="space-y-3 max-w-sm">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-hairline bg-[rgb(var(--surface))] text-ink font-sans text-sm placeholder:text-muted focus:outline-none focus:border-gold"
              required
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-hairline bg-[rgb(var(--surface))] text-ink font-sans text-sm placeholder:text-muted focus:outline-none focus:border-gold"
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-hairline bg-[rgb(var(--surface))] text-ink font-sans text-sm placeholder:text-muted focus:outline-none focus:border-gold"
              required
            />
            {passwordError && (
              <p className="font-sans text-sm text-red-500">{passwordError}</p>
            )}
            {passwordStatus === 'success' && (
              <p className="font-sans text-sm text-green-600">Password changed successfully</p>
            )}
            <button
              type="submit"
              disabled={passwordStatus === 'loading'}
              className="px-4 py-2 rounded-lg bg-gold text-white font-sans text-sm font-medium hover:bg-gold-ink disabled:opacity-50 transition-colors"
            >
              {passwordStatus === 'loading' ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>

        {/* Sign Out */}
        <div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-lg border border-red-300 text-red-600 font-sans text-sm font-medium hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </section>
    </main>
  );
}
