import { useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useCatalogStore } from '@/store/catalogStore';
import { Frame } from '@/types';
import { products } from '@/lib/data';

// Map mock products to Frame interfaces as fallback
export const mockFrames: Frame[] = products.map((p) => ({
  id: p.id,
  name: p.name,
  brand: 'NayanStore',
  category: (p.id === 'nagpur-noir' || p.id === 'crystal-clear' || p.id === 'urban-tortoise') ? 'eyeglasses' : 'sunglasses',
  frameStyle: (p.category.toLowerCase() === 'rectangular' ? 'rectangle' : p.category.toLowerCase()) as any,
  frameMaterial: p.id === 'nagpur-noir' ? 'acetate' : 'metal',
  faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
  price: p.price * 100, // convert to paise
  stock: p.stock,
  images: [p.image, p.image2].filter(Boolean) as string[],
  colors: p.id === 'nagpur-noir' ? ['Black'] : ['Gold', 'Silver'],
  sizes: ['medium', 'large'],
  lensCompatible: ['single-vision', 'blue-cut', 'progressive', 'photochromic'],
  description: `${p.name} reflects premium elegance, perfect for everyday wear in Nagpur. Crafted with high quality materials for long-lasting comfort.`,
  isTrending: p.id === 'nagpur-noir' || p.id === 'gold-meridian',
  isActive: true,
  createdAt: {} as any, // Mock timestamps
  updatedAt: {} as any,
}));

export function useCatalog() {
  const { frames, isLoaded, setFrames } = useCatalogStore();

  useEffect(() => {
    if (isLoaded) return;

    const fetchAll = async () => {
      try {
        if (!db) {
          console.warn('Firebase db not found. Using local mock frames.');
          setFrames(mockFrames);
          return;
        }
        const snapshot = await getDocs(collection(db, 'frames'));
        if (snapshot.empty) {
          console.warn('Firestore frames collection is empty. Falling back to mock frames.');
          setFrames(mockFrames);
          return;
        }
        const allFrames = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as Frame))
          .filter(f => f.isActive);
        setFrames(allFrames);
      } catch (err) {
        console.error('Catalog fetch failed, falling back to mock frames:', err);
        setFrames(mockFrames);
      }
    };

    fetchAll();
  }, [isLoaded, setFrames]);

  return { frames, isLoaded };
}
