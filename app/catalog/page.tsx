'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useCatalog } from '@/hooks/useCatalog';
import { useFilteredFrames } from '@/hooks/useFilteredFrames';
import { useFilterStore } from '@/store/filterStore';
import { FrameGrid } from '@/components/catalog/FrameGrid';
import { FilterPanel } from '@/components/catalog/FilterPanel';
import { ActiveFilters } from '@/components/catalog/ActiveFilters';
import { BottomSheet } from '@/components/ui/BottomSheet';

export default function CatalogPage() {
  const { isLoaded } = useCatalog();
  const filteredFrames = useFilteredFrames();
  const { activeFiltersCount } = useFilterStore();
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  return (
    <main className="pt-32 pb-32 max-w-7xl mx-auto px-5 md:px-16 min-h-screen">
      {/* Title Header */}
      <section className="mb-10 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tighter">
          Aankhon ke liye best designs
        </h2>
        <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl font-semibold leading-relaxed md:mx-0 mx-auto">
          Nagpur ki sabse stylish collection — browse and choose from our curated eyeglasses and sunglasses.
        </p>
      </section>

      {/* Main Layout Area */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Sidebar (Left side, sticky) */}
        <aside className="hidden lg:block w-80 shrink-0 sticky top-28">
          <FilterPanel />
        </aside>

        {/* Catalog Grid Area (Right side) */}
        <div className="flex-grow w-full">
          {/* Mobile Filter bar */}
          <div className="lg:hidden flex justify-between items-center bg-white p-4 rounded-2xl border border-[var(--color-border)] mb-6 shadow-xs">
            <button
              onClick={() => setIsFilterSheetOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary-light)] font-bold text-sm active:scale-95 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-[var(--color-primary)] text-white text-xs px-2 py-0.5 rounded-full font-extrabold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <span className="text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-3 py-1.5 rounded-xl">
              {filteredFrames.length} frames dikhe
            </span>
          </div>

          {/* Desktop Filter Stats */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-[var(--color-text-secondary)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-4 py-2 rounded-xl">
              {filteredFrames.length} frames dikhe
            </span>
          </div>

          {/* Dismissible active filters listing */}
          <ActiveFilters />

          {/* Products Grid */}
          <FrameGrid frames={filteredFrames} isLoading={!isLoaded} />
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <BottomSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="Filter Frames 👓"
      >
        <div className="pb-8 bg-transparent">
          <FilterPanel />
        </div>
      </BottomSheet>
    </main>
  );
}
