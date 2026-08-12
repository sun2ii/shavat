'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDebugMode } from '@/components/SvgDebugMode';

// Actual SVGs from each file, grouped by source
const debugItems = {
  'Sidebar': [
    { name: 'Home', svg: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 8.5 L9 2.5 L16 8.5 M4 7.5 V15.5 H14 V7.5 M7.5 15.5 V11 H10.5 V15.5"/></svg> },
    { name: 'Library', svg: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg> },
    { name: 'Writings', svg: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3 H15 V15 H3 Z M6 6 H12 M6 9 H12 M6 12 H10"/></svg> },
    { name: 'Review Star', svg: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 2 L11 6 L15.5 6.5 L12 10 L13 14.5 L9 12 L5 14.5 L6 10 L2.5 6.5 L7 6 Z"/></svg> },
    { name: 'Logo', svg: <svg width="40" height="48" viewBox="0 0 72 86" fill="none" className="stroke-gold" strokeWidth="1.6"><circle cx="36" cy="6" r="2.4" className="fill-gold" stroke="none"/><path d="M14 82 V38 C14 20 24 12 36 12 C48 12 58 20 58 38 V82"/><path d="M36 30 V58 M26 40 H46"/></svg> },
    { name: 'Sun (Light)', svg: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="9" r="4"/><path d="M9 1V3M9 15V17M1 9H3M15 9H17M3.5 3.5L5 5M13 13L14.5 14.5M14.5 3.5L13 5M5 13L3.5 14.5"/></svg> },
    { name: 'Moon (Dark)', svg: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15.5 10.5C14.5 11.5 13 12.2 11.5 12.2C8 12.2 5.5 9.5 5.5 6C5.5 4.5 6 3.2 7 2.2C3.5 3 1 6.2 1 10C1 14.4 4.6 18 9 18C12.8 18 16 15.5 16.8 12C16.4 11.5 16 11 15.5 10.5Z"/></svg> },
    { name: 'Collapse', svg: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 4L6 8L10 12"/></svg> },
  ],
  'MarketingNav': [
    { name: 'Hamburger', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6 H20 M4 12 H20 M4 18 H20"/></svg> },
    { name: 'Search', svg: <svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg> },
  ],
  'HomeContent': [
    { name: 'Olive Branch', svg: <svg width="44" height="30" viewBox="0 0 64 34" fill="none" className="stroke-gold" strokeWidth="1.4"><path d="M6 30 C22 26 40 18 58 4"/><path d="M16 26 C15 21 17 18 21 17 C21 22 20 25 16 26 Z M26 21 C25 16 27 13 31 12 C31 17 30 20 26 21 Z M38 15 C37 10 39 7 43 6 C43 11 42 14 38 15 Z"/></svg> },
    { name: 'Hero Search', svg: <svg width="17" height="17" viewBox="0 0 18 18" fill="none" className="stroke-muted" strokeWidth="1.6"><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg> },
    { name: 'Orientation', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-ink" strokeWidth="1.4"><path d="M12 3 C7 8 7 16 12 21 C17 16 17 8 12 3 Z M12 3 V21"/></svg> },
    { name: 'Book', svg: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="stroke-ink" strokeWidth="1.3"><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg> },
    { name: 'Clock', svg: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="stroke-ink" strokeWidth="1.3"><circle cx="9" cy="9" r="7"/><path d="M9 5 V9 L12 11"/></svg> },
    { name: 'Terrain', svg: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="stroke-ink" strokeWidth="1.3"><path d="M2 6.5 C4 4.5 6 4.5 8 6.5 C10 8.5 12 8.5 14 6.5 M2 11.5 C4 9.5 6 9.5 8 11.5 C10 13.5 12 13.5 14 11.5" transform="translate(1 0)"/></svg> },
    { name: 'Search Card', svg: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="stroke-ink" strokeWidth="1.3"><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg> },
  ],
  'AppShell': [
    { name: 'Mobile Home', svg: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 8.5 L9 2.5 L16 8.5 M4 7.5 V15.5 H14 V7.5 M7.5 15.5 V11 H10.5 V15.5"/></svg> },
    { name: 'Mobile Library', svg: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg> },
    { name: 'Mobile Writings', svg: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3 H15 V15 H3 Z M6 6 H12 M6 9 H12 M6 12 H10"/></svg> },
    { name: 'Hamburger', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6 H20 M4 12 H20 M4 18 H20"/></svg> },
    { name: 'Close X', svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6 L18 18 M18 6 L6 18"/></svg> },
  ],
  'Pricing': [
    { name: 'Check', svg: <span className="text-gold"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="8" cy="8" r="7" /><path d="M5 8.2 L7.2 10.2 L11 5.8" /></svg></span> },
    { name: 'Book (Free)', svg: <span className="text-gold"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19" /></svg></span> },
    { name: 'Crown (Premium)', svg: <span className="text-gold"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M4 9 L7.5 12 L12 6.5 L16.5 12 L20 9 L18.5 17 H5.5 Z M5.5 17 H18.5" /></svg></span> },
    { name: 'Olive Branch', svg: <span className="text-gold"><svg width="40" height="34" viewBox="0 0 150 120" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20 116 C48 88 80 52 128 12" /><path d="M44 92 C38 76 44 64 60 60 C62 78 56 88 44 92 Z M72 62 C66 46 72 34 88 30 C90 48 84 58 72 62 Z M58 104 C70 94 82 94 92 100 C80 110 68 110 58 104 Z M88 76 C100 66 112 66 122 72 C110 82 98 82 88 76 Z" /></svg></span> },
    { name: 'Mini Olive', svg: <span className="text-gold"><svg width="12" height="12" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 34 C16 28 24 18 32 6" /><path d="M14 28 C13 23 15 20 19 19 C19 24 18 27 14 28 Z M21 20 C20 15 22 12 26 11 C26 16 25 19 21 20 Z" /></svg></span> },
  ],
};

const tabs = Object.keys(debugItems);

// Map tabs to their source pages for "View Page" links
const tabPages: Record<string, string | null> = {
  'Sidebar': null, // Component, not a page
  'MarketingNav': null, // Component used across pages
  'HomeContent': '/',
  'AppShell': null, // Component
  'Pricing': '/pricing',
};

// Pages with icons to review
const iconPages = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'About', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Resources', path: '/resources' },
];

export default function IconsAndLinksPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const svgDebug = useDebugMode('svg');
  const linkDebug = useDebugMode('link');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link href="/review" className="font-sans text-xs text-gold-ink hover:underline mb-4 inline-block">
          ← Back to Review
        </Link>
        <h1 className="font-playfair text-2xl font-semibold text-[rgb(var(--text-primary))]">
          Icons & Links Review
        </h1>
        <p className="font-sans text-sm text-[rgb(var(--text-tertiary))] mt-1">
          Toggle debug modes to highlight SVGs and links across the site
        </p>
      </div>

      {/* Debug Mode Toggles */}
      <div className="flex gap-4 mb-6 p-4 bg-[rgb(var(--surface))] rounded-lg border border-hairline">
        <button
          onClick={svgDebug.toggle}
          disabled={svgDebug.loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-sm transition-colors ${
            svgDebug.enabled
              ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-2 border-red-500'
              : 'bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] border border-hairline'
          }`}
        >
          <span className="w-4 h-4 border-2 border-current rounded-sm" />
          SVG Debug {svgDebug.enabled ? 'ON' : 'OFF'}
        </button>
        <button
          onClick={linkDebug.toggle}
          disabled={linkDebug.loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-sm transition-colors ${
            linkDebug.enabled
              ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-2 border-blue-500'
              : 'bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] border border-hairline'
          }`}
        >
          <span className="underline decoration-current">A</span>
          Link Debug {linkDebug.enabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Quick Links to Pages */}
      <div className="mb-6 p-4 bg-[rgb(var(--surface))] rounded-lg border border-hairline">
        <div className="text-xs text-[rgb(var(--text-tertiary))] mb-2">View pages with debug mode:</div>
        <div className="flex flex-wrap gap-2">
          {iconPages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="px-3 py-1.5 bg-[rgb(var(--bg-secondary))] rounded text-xs font-sans text-[rgb(var(--text-secondary))] hover:text-gold-ink hover:bg-gold/10 transition-colors"
            >
              {page.name} →
            </Link>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-hairline overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 font-sans text-xs sm:text-sm whitespace-nowrap transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-gold text-gold-ink font-semibold'
                : 'border-transparent text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {debugItems[activeTab as keyof typeof debugItems].map((item, i) => (
          <div
            key={i}
            className="bg-[rgb(var(--surface))] rounded-lg border border-hairline p-4 flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              {item.svg}
            </div>
            <span className="font-sans text-xs text-[rgb(var(--text-secondary))] text-center">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* File reference */}
      <div className="mt-6 p-4 bg-[rgb(var(--bg-secondary))] rounded-lg">
        <p className="font-mono text-xs text-faint">
          Source: <span className="text-[rgb(var(--text-secondary))]">components/home/{activeTab}.tsx</span>
        </p>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-[rgb(var(--surface))] rounded-lg border border-hairline space-y-2">
        <p className="font-sans text-sm text-[rgb(var(--text-secondary))]">
          <span className="inline-block w-3 h-3 border-2 border-red-500 rounded mr-2"></span>
          SVG Debug: Red borders appear on all SVGs site-wide
        </p>
        <p className="font-sans text-sm text-[rgb(var(--text-secondary))]">
          <span className="inline-block underline decoration-blue-500 mr-2">Link</span>
          Link Debug: Blue underlines appear on all links site-wide
        </p>
      </div>
    </div>
  );
}
