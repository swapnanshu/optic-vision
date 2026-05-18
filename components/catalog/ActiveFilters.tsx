import React from 'react';
import { X } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import { toDisplay } from '@/lib/utils/price';

export const ActiveFilters: React.FC = () => {
  const filters = useFilterStore();

  const handleRemoveFilter = (key: string, defaultValue: any = null) => {
    filters.setFilter(key, defaultValue);
  };

  const hasPriceFilter = filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000000;

  if (filters.activeFiltersCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-[0.1em]">
        Filters:
      </span>

      {filters.category && (
        <button
          onClick={() => handleRemoveFilter('category')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
        >
          <span>Category: {filters.category}</span>
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {filters.frameStyle && (
        <button
          onClick={() => handleRemoveFilter('frameStyle')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
        >
          <span>Style: {filters.frameStyle}</span>
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {filters.faceShape && (
        <button
          onClick={() => handleRemoveFilter('faceShape')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
        >
          <span>Face Shape: {filters.faceShape}</span>
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {filters.material && (
        <button
          onClick={() => handleRemoveFilter('material')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
        >
          <span>Material: {filters.material}</span>
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {hasPriceFilter && (
        <button
          onClick={() => handleRemoveFilter('priceRange', [0, 1000000])}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
        >
          <span>
            Price: {toDisplay(filters.priceRange[0])} - {toDisplay(filters.priceRange[1])}
          </span>
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      <button
        onClick={filters.clearAllFilters}
        className="text-xs font-extrabold text-[var(--color-danger)] hover:underline ml-1"
      >
        Clear All
      </button>
    </div>
  );
};

export default ActiveFilters;
