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
import { useReadingProgress } from '@/components/providers/ReadingProgressProvider';
import { CURSOR_ACCENTS } from '@/lib/cursor-accents';

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

// Season display info
type Season = 1 | 2 | 3;

const SEASON_LABELS: Record<Season, string> = {
  1: 'First Reading',
  2: 'Second Reading',
  3: 'Third Reading',
};

const SEASON_STYLES: Record<Season, { bg: string; text: string; border: string; dot: string }> = {
  1: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-500',
  },
  2: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/30',
    dot: 'bg-purple-500',
  },
  3: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-500',
  },
};

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
  const { preferences, setFontSize, setLineSpacing, setAppearance, setKeyboardStyle, setCursorAccent } = useReadingPreferences();
  const { season, startNewSeason } = useReadingProgress();
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [passwordError, setPasswordError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timezone, setTimezone] = useState<string>('');
  const [timezoneStatus, setTimezoneStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showSeasonModal, setShowSeasonModal] = useState(false);
  const [seasonConfirmText, setSeasonConfirmText] = useState('');
  const [isStartingSeason, setIsStartingSeason] = useState(false);

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

  const handleStartNewSeason = async () => {
    if (seasonConfirmText !== 'new season') return;
    setIsStartingSeason(true);
    const result = await startNewSeason();
    if (result) {
      router.refresh();
    }
    setIsStartingSeason(false);
    setShowSeasonModal(false);
    setSeasonConfirmText('');
  };

  const nextSeason = ((season % 3) + 1) as Season;
  const currentStyles = SEASON_STYLES[season];
  const nextStyles = SEASON_STYLES[nextSeason];

  return (
    <main className="min-h-full px-6 py-8 max-w-5xl mx-auto">
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

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {/* Left Column */}
        <div>
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

        {/* Cursor Color: the verse you are on. Each swatch carries its own
            data-cursor so it previews its accent regardless of the current one;
            the sample line below uses the live selection via <html>. */}
        <div className="mb-8">
          <label className="block font-sans text-sm font-medium text-ink mb-3">
            Cursor Color
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {CURSOR_ACCENTS.map((accent) => {
              const selected = preferences.cursorAccent === accent.id;
              return (
                <button
                  key={accent.id}
                  type="button"
                  onClick={() => setCursorAccent(accent.id)}
                  data-cursor={accent.id}
                  title={accent.hint}
                  aria-pressed={selected}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-sans text-sm transition-colors ${
                    selected
                      ? 'border border-gold text-ink bg-[rgb(var(--surface))]'
                      : 'border border-hairline text-muted hover:text-ink hover:border-gold'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-3.5 w-3.5 rounded-full"
                    style={{
                      background: 'rgb(var(--cursor))',
                      boxShadow: '0 0 8px rgb(var(--cursor) / 0.7)',
                    }}
                  />
                  {accent.name}
                </button>
              );
            })}
          </div>
          <div
            className="p-4 rounded-lg border border-hairline bg-[rgb(var(--surface))]"
            style={{
              fontFamily: 'Cardo, Georgia, serif',
              fontSize: `${preferences.fontSize}px`,
              lineHeight: LINE_HEIGHT_MAP[preferences.lineSpacing],
            }}
          >
            <p className="text-ink">And God said, Let there be light: and there was light.</p>
            <p className="verse-cursor rounded-sm"><span className="verse-text">And God saw the light, that it was good: and God divided the light from the darkness.</span></p>
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

      {/* Reading Journey Section */}
      <section className="mb-12">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-6 pb-2 border-b border-hairline">
          Reading Journey
        </h2>

        {/* Current Season */}
        <div className="mb-8">
          <label className="block font-sans text-sm font-medium text-ink mb-3">
            Current Season
          </label>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${currentStyles.bg} ${currentStyles.border} border`}>
            <span className={`w-2 h-2 rounded-full ${currentStyles.dot}`} />
            <span className={`font-sans text-xs font-medium ${currentStyles.text}`}>
              {SEASON_LABELS[season]}
            </span>
          </div>
          <p className="mt-2 font-sans text-xs text-muted">
            Your reading progress is tracked within this season. Starting a new season will archive your current progress.
          </p>
        </div>

        {/* View History */}
        <div className="mb-8">
          <Link
            href="/dashboard/history"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-hairline text-ink font-sans text-sm font-medium hover:border-gold transition-colors"
          >
            View Reading History
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Start New Season */}
        <div>
          <label className="block font-sans text-sm font-medium text-ink mb-3">
            Start New Season
          </label>
          <p className="font-sans text-xs text-muted mb-3">
            Archive your current progress and begin a fresh {SEASON_LABELS[nextSeason]} journey with a new color.
          </p>
          <button
            onClick={() => setShowSeasonModal(true)}
            className="px-4 py-2 rounded-lg border border-red-300 text-red-600 font-sans text-sm font-medium hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            Start New Season
          </button>
        </div>
      </section>
        </div>

        {/* Right Column */}
        <div>
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
              <form onSubmit={handlePasswordChange} className="space-y-3">
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
        </div>
      </div>

      {/* Danger Modal for New Season */}
      {showSeasonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setShowSeasonModal(false);
              setSeasonConfirmText('');
            }}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-xl bg-[rgb(var(--bg-primary))] border border-red-500/30 shadow-2xl p-6">
            {/* Warning icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h3 className="font-serif text-xl text-ink mb-2">Start New Season</h3>
            <p className="font-sans text-sm text-muted mb-4">
              This will archive all your current reading progress and start a fresh {SEASON_LABELS[nextSeason]} journey.
            </p>

            {/* Season transition preview */}
            <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-surface">
              <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full ${currentStyles.bg} ${currentStyles.border} border`}>
                <span className={`w-2 h-2 rounded-full ${currentStyles.dot}`} />
                <span className={`font-sans text-xs ${currentStyles.text}`}>{SEASON_LABELS[season]}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full ${nextStyles.bg} ${nextStyles.border} border`}>
                <span className={`w-2 h-2 rounded-full ${nextStyles.dot}`} />
                <span className={`font-sans text-xs ${nextStyles.text}`}>{SEASON_LABELS[nextSeason]}</span>
              </div>
            </div>

            {/* Confirmation input */}
            <div className="mb-6">
              <label className="block font-sans text-sm text-ink mb-2">
                Type <span className="font-mono bg-surface px-1 py-0.5 rounded text-red-600 dark:text-red-400">new season</span> to confirm
              </label>
              <input
                type="text"
                value={seasonConfirmText}
                onChange={(e) => setSeasonConfirmText(e.target.value)}
                placeholder="new season"
                className="w-full px-3 py-2 rounded-lg border border-hairline bg-[rgb(var(--surface))] text-gray-900 dark:text-white font-sans text-sm placeholder:text-muted focus:outline-none focus:border-red-500"
                autoFocus
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSeasonModal(false);
                  setSeasonConfirmText('');
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-hairline text-ink font-sans text-sm font-medium hover:bg-surface transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStartNewSeason}
                disabled={seasonConfirmText !== 'new season' || isStartingSeason}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-sans text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isStartingSeason ? 'Starting...' : 'Start New Season'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
