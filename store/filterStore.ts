import { create } from 'zustand';

interface FilterStore {
  category: string | null;
  frameStyle: string | null;
  faceShape: string | null;
  material: string | null;
  priceRange: [number, number];  // paise
  activeFiltersCount: number;
  setFilter: (key: string, value: any) => void;
  clearAllFilters: () => void;
}

const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000000]; // ₹0 to ₹10,000 in paise

const calculateActiveCount = (state: Partial<FilterStore>) => {
  let count = 0;
  if (state.category) count++;
  if (state.frameStyle) count++;
  if (state.faceShape) count++;
  if (state.material) count++;
  if (state.priceRange && (state.priceRange[0] !== DEFAULT_PRICE_RANGE[0] || state.priceRange[1] !== DEFAULT_PRICE_RANGE[1])) {
    count++;
  }
  return count;
};

export const useFilterStore = create<FilterStore>((set) => ({
  category: null,
  frameStyle: null,
  faceShape: null,
  material: null,
  priceRange: DEFAULT_PRICE_RANGE,
  activeFiltersCount: 0,
  setFilter: (key, value) => set((state) => {
    const nextState = { ...state, [key]: value };
    const activeFiltersCount = calculateActiveCount(nextState);
    return { ...nextState, activeFiltersCount };
  }),
  clearAllFilters: () => set({
    category: null,
    frameStyle: null,
    faceShape: null,
    material: null,
    priceRange: DEFAULT_PRICE_RANGE,
    activeFiltersCount: 0,
  }),
}));
