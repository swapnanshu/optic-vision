import { create } from 'zustand';
import { Frame } from '@/types';

interface CatalogStore {
  frames: Frame[];
  isLoaded: boolean;
  lastFetched: number | null;
  setFrames: (frames: Frame[]) => void;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  frames: [],
  isLoaded: false,
  lastFetched: null,
  setFrames: (frames) => set({ frames, isLoaded: true, lastFetched: Date.now() }),
}));
