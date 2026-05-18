import { useMemo } from 'react';
import { useCatalogStore } from '@/store/catalogStore';
import { useFilterStore } from '@/store/filterStore';

export function useFilteredFrames() {
  const { frames } = useCatalogStore();
  const filters = useFilterStore();

  return useMemo(() => {
    return frames.filter((frame) => {
      // Category filter (eyeglasses / sunglasses)
      if (filters.category && frame.category !== filters.category) return false;

      // Style filter (round, square, aviator, etc.)
      if (filters.frameStyle && frame.frameStyle !== filters.frameStyle) return false;

      // Face shape filter (oval, round, etc.)
      if (filters.faceShape && !frame.faceShapes.includes(filters.faceShape as any)) return false;

      // Material filter (metal, acetate, etc.)
      if (filters.material && frame.frameMaterial !== filters.material) return false;

      // Price range filter
      if (frame.price < filters.priceRange[0] || frame.price > filters.priceRange[1]) return false;

      return true;
    });
  }, [frames, filters.category, filters.frameStyle, filters.faceShape, filters.material, filters.priceRange]);
}
