'use client';

import { useFilterState } from '@/lib/hooks/useFilterState';
import FilterPanel from '@/components/browse/FilterPanel';
import PsalmsGrid from '@/components/browse/PsalmsGrid';

export default function PsalmsBrowsePage() {
  const { filters, toggleFilter, toggleSafeFilter, clearFilters, filteredPsalms, hasActiveFilters } = useFilterState();

  return (
    <main>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-[#D4AF37] mb-3 tracking-wide">Browse Psalms</h1>
        <p className="text-[rgb(var(--text-secondary))] text-base">
          Filter by emotional state, direction, and other attributes to find the psalm you need
        </p>
      </div>

      <FilterPanel
        filters={filters}
        toggleFilter={toggleFilter}
        toggleSafeFilter={toggleSafeFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        resultCount={filteredPsalms.length}
      />

      <PsalmsGrid psalms={filteredPsalms} />
    </main>
  );
}
