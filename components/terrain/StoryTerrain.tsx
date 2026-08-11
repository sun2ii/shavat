'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ResolvedSegment } from '@/lib/terrain';

// ---------------------------------------------------------------------------
// Tabs — same categories as the library
// ---------------------------------------------------------------------------

type TabId = 'torah' | 'historical' | 'prophets' | 'gospels' | 'apostolic' | 'wisdom';
type ViewMode = 'events' | 'characters';

const TABS: { id: TabId; label: string }[] = [
  { id: 'torah', label: 'Torah' },
  { id: 'historical', label: 'Historical' },
  { id: 'prophets', label: 'Prophets' },
  { id: 'gospels', label: 'Gospels' },
  { id: 'apostolic', label: 'Apostolic' },
  { id: 'wisdom', label: 'Wisdom' },
];

// Which tabs have a "Contents" link
const TAB_CONTENTS: Partial<Record<TabId, string>> = {
  torah: '/torah-toc',
  gospels: '/gospels-toc',
  apostolic: '/nt-toc',
};

function TerrainControls({
  activeTab,
  onTabChange,
  viewMode,
  onViewChange,
}: {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  viewMode: ViewMode;
  onViewChange: (view: ViewMode) => void;
}) {
  const contentsHref = TAB_CONTENTS[activeTab];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
      {/* Tabs */}
      <div className="inline-flex bg-paper-2 rounded-full p-0.5 font-sans text-[11px] font-medium overflow-x-auto max-w-full">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                active ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right side: Contents link (if available) + View toggle */}
      <div className="flex items-center gap-5">
        {contentsHref && (
          <a
            href={contentsHref}
            className="font-sans text-xs text-muted hover:text-ink transition-colors whitespace-nowrap"
          >
            Contents
          </a>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onViewChange('events')}
            className={`font-sans text-xs transition-colors whitespace-nowrap ${
              viewMode === 'events' ? 'text-ink font-medium' : 'text-muted hover:text-ink'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => onViewChange('characters')}
            className={`font-sans text-xs transition-colors whitespace-nowrap ${
              viewMode === 'characters' ? 'text-ink font-medium' : 'text-muted hover:text-ink'
            }`}
          >
            Characters
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The terrain
// ---------------------------------------------------------------------------

export default function StoryTerrain({ segments }: { segments: ResolvedSegment[] }) {
  const [activeTab, setActiveTab] = useState<TabId>('torah');
  const [viewMode, setViewMode] = useState<ViewMode>('events');

  return (
    <>
      {/* Controls: Tabs + Contents link + View toggle */}
      <TerrainControls
        activeTab={activeTab}
        onTabChange={setActiveTab}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      {/* Content area */}
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="font-serif text-muted italic">
          {viewMode === 'events' ? 'Events view' : 'Characters view'} for {activeTab}
        </p>
      </div>
    </>
  );
}
