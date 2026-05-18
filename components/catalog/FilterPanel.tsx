import React from 'react';
import { useFilterStore } from '@/store/filterStore';
import { FilterChip } from './FilterChip';
import { PriceRangeSlider } from './PriceRangeSlider';

export const FilterPanel: React.FC = () => {
  const { category, frameStyle, faceShape, material, setFilter, clearAllFilters } = useFilterStore();

  const handleToggle = (key: string, value: string) => {
    const store = useFilterStore.getState() as any;
    if (store[key] === value) {
      setFilter(key, null);
    } else {
      setFilter(key, value);
    }
  };

  const categories = ['eyeglasses', 'sunglasses'];
  const styles = ['round', 'square', 'aviator', 'cat-eye', 'rectangle', 'wayfarer', 'clubmaster'];
  const faceShapes = ['oval', 'round', 'square', 'heart', 'diamond'];
  const nameToFaceEmoji: Record<string, string> = {
    oval: '🥚',
    round: '🟡',
    square: '🔲',
    heart: '❤️',
    diamond: '💎',
  };
  const nameToStyleEmoji: Record<string, string> = {
    round: '⭕',
    square: '⬛',
    aviator: '🕶️',
    'cat-eye': '🐱',
    rectangle: '➖',
    wayfarer: '🕶️',
    clubmaster: '👓',
  };
  const materials = ['metal', 'acetate', 'titanium', 'plastic', 'wood'];

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl border border-[var(--color-border)] shadow-xs">
      <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border)]">
        <h3 className="text-lg font-extrabold text-[var(--color-text-primary)]">Filters 🔍</h3>
        <button
          onClick={clearAllFilters}
          className="text-xs font-extrabold text-[var(--color-danger)] hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Category Section */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Category
        </h4>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All 🌟"
            selected={category === null}
            onClick={() => setFilter('category', null)}
          />
          {categories.map((c) => (
            <FilterChip
              key={c}
              label={c === 'eyeglasses' ? 'Eyeglasses 👓' : 'Sunglasses 🕶️'}
              selected={category === c}
              onClick={() => handleToggle('category', c)}
            />
          ))}
        </div>
      </div>

      {/* Style Section */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Style
        </h4>
        <div className="flex flex-wrap gap-2">
          {styles.map((s) => (
            <FilterChip
              key={s}
              label={s}
              icon={nameToStyleEmoji[s]}
              selected={frameStyle === s}
              onClick={() => handleToggle('frameStyle', s)}
            />
          ))}
        </div>
      </div>

      {/* Face Shape Section */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Face Shape
        </h4>
        <div className="flex flex-wrap gap-2">
          {faceShapes.map((f) => (
            <FilterChip
              key={f}
              label={f}
              icon={nameToFaceEmoji[f]}
              selected={faceShape === f}
              onClick={() => handleToggle('faceShape', f)}
            />
          ))}
        </div>
      </div>

      {/* Material Section */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Material
        </h4>
        <div className="flex flex-wrap gap-2">
          {materials.map((m) => (
            <FilterChip
              key={m}
              label={m}
              selected={material === m}
              onClick={() => handleToggle('material', m)}
            />
          ))}
        </div>
      </div>

      {/* Price Slider Section */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Price Range
        </h4>
        <PriceRangeSlider />
      </div>
    </div>
  );
};

export default FilterPanel;
