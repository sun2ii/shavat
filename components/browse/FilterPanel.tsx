'use client';

import { useState } from 'react';
import { FilterState } from '@/lib/hooks/useFilterState';
import psalmsMetadata from '@/lib/psalms-metadata.json';

interface Props {
  filters: FilterState;
  toggleFilter: (category: keyof FilterState, value: string) => void;
  toggleSafeFilter: () => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
}

export default function FilterPanel({
  filters,
  toggleFilter,
  toggleSafeFilter,
  clearFilters,
  hasActiveFilters,
  resultCount,
}: Props) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border))] rounded transition-colors"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'} ({resultCount} psalms)
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border))] rounded">
          {/* Emotional State */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-2">Emotional State</h3>
            <div className="flex flex-wrap gap-2">
              {psalmsMetadata.categories.emotional_state.map((state) => (
                <button
                  key={state}
                  onClick={() => toggleFilter('emotional_state', state)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    filters.emotional_state.includes(state)
                      ? 'bg-[#D4AF37] text-white'
                      : 'bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border))]'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Function */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-2">Type</h3>
            <div className="flex flex-wrap gap-2">
              {psalmsMetadata.categories.primary_function.map((func) => (
                <button
                  key={func}
                  onClick={() => toggleFilter('primary_function', func)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    filters.primary_function.includes(func)
                      ? 'bg-[#D4AF37] text-white'
                      : 'bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border))]'
                  }`}
                >
                  {func}
                </button>
              ))}
            </div>
          </div>

          {/* Direction */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-2">Direction</h3>
            <div className="flex flex-wrap gap-2">
              {psalmsMetadata.categories.directional_movement.map((dir) => (
                <button
                  key={dir}
                  onClick={() => toggleFilter('directional_movement', dir)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    filters.directional_movement.includes(dir)
                      ? 'bg-[#D4AF37] text-white'
                      : 'bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border))]'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          {/* Resolution */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-2">Resolution</h3>
            <div className="flex flex-wrap gap-2">
              {psalmsMetadata.categories.resolution_type.map((res) => (
                <button
                  key={res}
                  onClick={() => toggleFilter('resolution_type', res)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    filters.resolution_type.includes(res)
                      ? 'bg-[#D4AF37] text-white'
                      : 'bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border))]'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-2">Intensity</h3>
            <div className="flex flex-wrap gap-2">
              {psalmsMetadata.categories.intensity.map((int) => (
                <button
                  key={int}
                  onClick={() => toggleFilter('intensity', int)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    filters.intensity.includes(int)
                      ? 'bg-[#D4AF37] text-white'
                      : 'bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border))]'
                  }`}
                >
                  {int}
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-2">Length</h3>
            <div className="flex flex-wrap gap-2">
              {psalmsMetadata.categories.length.map((len) => (
                <button
                  key={len}
                  onClick={() => toggleFilter('length', len)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    filters.length.includes(len)
                      ? 'bg-[#D4AF37] text-white'
                      : 'bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border))]'
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          {/* Safe When Fragile */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-2">Safety</h3>
            <button
              onClick={toggleSafeFilter}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                filters.safe_when_fragile === true
                  ? 'bg-[#D4AF37] text-white'
                  : filters.safe_when_fragile === false
                  ? 'bg-red-600 text-white'
                  : 'bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border))]'
              }`}
            >
              {filters.safe_when_fragile === null ? 'All Psalms' : filters.safe_when_fragile ? 'Safe When Fragile' : 'Not Safe When Fragile'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
