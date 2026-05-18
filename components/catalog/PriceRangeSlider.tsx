import React from 'react';
import { useFilterStore } from '@/store/filterStore';
import { toDisplay } from '@/lib/utils/price';

export const PriceRangeSlider: React.FC = () => {
  const { priceRange, setFilter } = useFilterStore();

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(e.target.value || '0', 10) * 100); // convert Rs to paise
    setFilter('priceRange', [value, priceRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(priceRange[0], parseInt(e.target.value || '10000', 10) * 100); // convert Rs to paise
    setFilter('priceRange', [priceRange[0], value]);
  };

  const minRs = Math.round(priceRange[0] / 100);
  const maxRs = Math.round(priceRange[1] / 100);

  return (
    <div className="flex flex-col gap-4 py-2 bg-transparent">
      <div className="flex justify-between items-center text-xs font-bold text-[var(--color-text-secondary)]">
        <span>Min: {toDisplay(priceRange[0])}</span>
        <span>Max: {toDisplay(priceRange[1])}</span>
      </div>

      <div className="flex gap-4">
        <div className="flex-grow flex flex-col gap-1">
          <label className="text-[10px] font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">Min Price</label>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={minRs}
            onChange={handleMinChange}
            className="w-full accent-[var(--color-primary)] cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
          />
        </div>

        <div className="flex-grow flex flex-col gap-1">
          <label className="text-[10px] font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">Max Price</label>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={maxRs}
            onChange={handleMaxChange}
            className="w-full accent-[var(--color-primary)] cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
