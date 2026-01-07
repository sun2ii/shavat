import { useState, useMemo } from 'react';
import psalmsMetadata from '@/lib/psalms-metadata.json';

export interface FilterState {
  emotional_state: string[];
  primary_function: string[];
  directional_movement: string[];
  resolution_type: string[];
  intensity: string[];
  length: string[];
  safe_when_fragile: boolean | null;
}

const initialFilterState: FilterState = {
  emotional_state: [],
  primary_function: [],
  directional_movement: [],
  resolution_type: [],
  intensity: [],
  length: [],
  safe_when_fragile: null,
};

export function useFilterState() {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  const toggleFilter = (category: keyof FilterState, value: string) => {
    if (category === 'safe_when_fragile') return;

    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const toggleSafeFilter = () => {
    setFilters((prev) => ({
      ...prev,
      safe_when_fragile: prev.safe_when_fragile === null ? true : prev.safe_when_fragile ? false : null,
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilterState);
  };

  const filteredPsalms = useMemo(() => {
    return psalmsMetadata.psalms.filter((psalm) => {
      if (filters.emotional_state.length > 0 && !filters.emotional_state.includes(psalm.emotional_state)) return false;
      if (filters.primary_function.length > 0 && !filters.primary_function.includes(psalm.primary_function)) return false;
      if (filters.directional_movement.length > 0 && !filters.directional_movement.includes(psalm.directional_movement)) return false;
      if (filters.resolution_type.length > 0 && !filters.resolution_type.includes(psalm.resolution_type)) return false;
      if (filters.intensity.length > 0 && !filters.intensity.includes(psalm.intensity)) return false;
      if (filters.length.length > 0 && !filters.length.includes(psalm.length)) return false;
      if (filters.safe_when_fragile !== null && psalm.safe_when_fragile !== filters.safe_when_fragile) return false;
      return true;
    });
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some((v) => Array.isArray(v) ? v.length > 0 : v !== null);
  }, [filters]);

  return {
    filters,
    toggleFilter,
    toggleSafeFilter,
    clearFilters,
    filteredPsalms,
    hasActiveFilters,
  };
}
