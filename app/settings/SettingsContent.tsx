'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { User } from '@/lib/auth';
import {
  useReadingPreferences,
  type LineSpacing,
  type Appearance,
  type KeyboardStyle,
  LINE_HEIGHT_MAP,
} from '@/components/providers/ReadingPreferencesProvider';

interface Props {
  user: User;
}

// Common timezone options
const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Central European (CET)' },
  { value: 'Europe/Helsinki', label: 'Eastern European (EET)' },
  { value: 'Asia/Jerusalem', label: 'Israel (IST)' },
  { value: 'Asia/Dubai', label: 'Gulf (GST)' },
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { value: 'Asia/Manila', label: 'Philippines (PHT)' },
  { value: 'Asia/Tokyo', label: 'Japan (JST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
  { value: 'Pacific/Auckland', label: 'New Zealand (NZST)' },
  { value: 'UTC', label: 'UTC' },
];

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

const TIMEZONE_SETTING_KEY = 'timezone';

export default function SettingsContent({ user }: Props) {
  const router = useRouter();
  const { preferences, setFontSize, setLineSpacing, setAppearance, setKeyboardStyle } = useReadingPreferences();
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [passwordError, setPasswordError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timezone, setTimezone] = useState<string>('');
  const [timezoneStatus, setTimezoneStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Load timezone setting on mount
  useEffect(() => {
    const loadTimezone = async () => {
      try {
        const res = await fetch(`/api/user-settings?key=${TIMEZONE_SETTING_KEY}`);
        if (res.ok) {
          const data = await res.json();
          if (data.value) {
            setTimezone(data.value);
          } else {
            // Default to browser timezone
            setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
          }
        }
      } catch {
        // Default to browser timezone
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      }
    };
    loadTimezone();
  }, []);

  const handleTimezoneChange = async (newTimezone: string) => {
    setTimezone(newTimezone);
    setTimezoneStatus('loading');
    try {
      await fetch('/api/user-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: TIMEZONE_SETTING_KEY, value: newTimezone }),
      });
      setTimezoneStatus('success');
      setTimeout(() => setTimezoneStatus('idle'), 2000);
    } catch {
      setTimezoneStatus('idle');
    }
  };

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
        <div className="mb-8">
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

        {/* Keyboard Shortcuts */}
        <div>
          <label className="block font-sans text-sm font-medium text-ink mb-3">
            Keyboard Shortcuts
          </label>
          <div className="flex gap-2 mb-4">
            {(['standard', 'vim'] as KeyboardStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setKeyboardStyle(style)}
                className={`px-4 py-2 rounded-lg font-sans text-sm capitalize transition-colors ${
                  preferences.keyboardStyle === style
                    ? 'bg-gold text-white'
                    : 'border border-hairline text-muted hover:text-ink hover:border-gold'
                }`}
              >
                {style === 'vim' ? 'Vim Style' : 'Standard'}
              </button>
            ))}
          </div>
          <div className="p-4 rounded-lg border border-hairline bg-[rgb(var(--surface))]">
            <p className="font-sans text-xs text-muted mb-3">
              {preferences.keyboardStyle === 'vim' ? 'Vim-style shortcuts:' : 'Standard shortcuts:'}
            </p>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {preferences.keyboardStyle === 'vim' ? (
                <>
                  <div><span className="text-gold">h</span> <span className="text-muted">Previous chapter</span></div>
                  <div><span className="text-gold">l</span> <span className="text-muted">Next chapter</span></div>
                  <div><span className="text-gold">j</span> <span className="text-muted">Scroll down</span></div>
                  <div><span className="text-gold">k</span> <span className="text-muted">Scroll up</span></div>
                  <div><span className="text-gold">b</span> <span className="text-muted">Bookmark</span></div>
                  <div><span className="text-gold">r</span> <span className="text-muted">Mark as read</span></div>
                  <div><span className="text-gold">&apos;</span> <span className="text-muted">Highlight</span></div>
                </>
              ) : (
                <>
                  <div><span className="text-gold">←</span> <span className="text-muted">Previous chapter</span></div>
                  <div><span className="text-gold">→</span> <span className="text-muted">Next chapter</span></div>
                  <div><span className="text-gold">b</span> <span className="text-muted">Bookmark</span></div>
                  <div><span className="text-gold">r</span> <span className="text-muted">Mark as read</span></div>
                  <div><span className="text-gold">h</span> <span className="text-muted">Highlight</span></div>
                </>
              )}
            </div>
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

        {/* Timezone */}
        <div className="mb-8">
          <label className="block font-sans text-sm font-medium text-ink mb-3">
            Timezone
          </label>
          <div className="flex items-center gap-3">
            <select
              value={timezone}
              onChange={(e) => handleTimezoneChange(e.target.value)}
              className="w-full max-w-xs px-3 py-2 rounded-lg border border-hairline bg-[rgb(var(--surface))] text-ink font-sans text-sm focus:outline-none focus:border-gold"
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
            {timezoneStatus === 'loading' && (
              <span className="font-sans text-xs text-muted">Saving...</span>
            )}
            {timezoneStatus === 'success' && (
              <span className="font-sans text-xs text-green-600">Saved</span>
            )}
          </div>
          <p className="mt-2 font-sans text-xs text-muted">
            Used for reading calendar and activity tracking
          </p>
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
