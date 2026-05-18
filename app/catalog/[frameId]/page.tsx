'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, Phone, MessageSquare, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useCatalog } from '@/hooks/useCatalog';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { toDisplay } from '@/lib/utils/price';
import { toast } from '@/components/ui/Toast';
import { FrameCard } from '@/components/catalog/FrameCard';
import { Skeleton } from '@/components/ui/Skeleton';

// Lens Type Options with descriptions and prices in paise
const LENS_OPTIONS = {
  'frame-only': { name: 'Zero Power (Frame Only)', desc: 'Blue-light coating included.', price: 0 },
  'single-vision': { name: 'Single Vision', desc: 'For distance or reading tasks.', price: 99900 },
  'blue-cut': { name: 'Blue Cut Screen Guard', desc: 'Blocks digital screen glare and fatigue.', price: 149900 },
  'progressive': { name: 'Progressive Multi-Focal', desc: 'Clear vision across all distances.', price: 249900 },
  'photochromic': { name: 'Photochromic (Auto-Darkening)', desc: 'Transitions dark in sunlight, clear indoors.', price: 199900 },
};

export default function FrameDetailPage() {
  const { frameId } = useParams();
  const router = useRouter();
  const { frames, isLoaded } = useCatalog();
  const { addItem } = useCart();

  // Selected Option States
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedLens, setSelectedLens] = useState<keyof typeof LENS_OPTIONS | 'frame-only'>('frame-only');
  const [isDescOpen, setIsDescOpen] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Retrieve Frame
  const frame = useMemo(() => {
    return frames.find((f) => f.id === frameId);
  }, [frames, frameId]);

  // Sync selection states when frame loads or navigates to a recommended frame
  useEffect(() => {
    if (frame) {
      setSelectedColor(frame.colors && frame.colors.length > 0 ? frame.colors[0] : '');
      setSelectedSize('medium');
      setSelectedLens('frame-only');
      setActiveImageIdx(0);
    }
  }, [frameId, frame]);

  // Recommendations: 4 items from the same category (excluding current)
  const recommendations = useMemo(() => {
    if (!frame) return [];
    return frames
      .filter((f) => f.category === frame.category && f.id !== frame.id)
      .slice(0, 4);
  }, [frames, frame]);

  if (!isLoaded) {
    return (
      <main className="pt-28 pb-32 max-w-7xl mx-auto px-5 md:px-16 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          
          {/* Left Side: Image Gallery / Carousel Skeleton */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <Skeleton className="relative aspect-[4/3] w-full rounded-[2rem]" />
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              <Skeleton className="w-24 h-18 rounded-xl shrink-0" />
              <Skeleton className="w-24 h-18 rounded-xl shrink-0" />
              <Skeleton className="w-24 h-18 rounded-xl shrink-0" />
            </div>
          </div>

          {/* Right Side: Specifications and Purchases Skeleton */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <Skeleton className="h-6 w-24 rounded-full mb-3" />
              <Skeleton className="h-10 w-3/4 rounded-xl mb-2" />
              <Skeleton className="h-5 w-1/3 rounded-lg mb-4" />
              <Skeleton className="h-8 w-1/2 rounded-xl" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-28 rounded-md mb-2" />
              <div className="flex flex-wrap gap-2.5">
                <Skeleton className="h-10 w-24 rounded-xl" />
                <Skeleton className="h-10 w-24 rounded-xl" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded-md mb-2" />
              <div className="flex gap-3">
                <Skeleton className="h-10 w-20 rounded-xl" />
                <Skeleton className="h-10 w-20 rounded-xl" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-32 rounded-md mb-1" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-16 w-full rounded-2xl" />
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <Skeleton className="h-14 w-full rounded-2xl" />
              <Skeleton className="h-14 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!frame) {
    return (
      <div className="pt-32 pb-32 max-w-7xl mx-auto px-5 md:px-16 text-center min-h-[50vh] flex flex-col justify-center items-center gap-6">
        <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)]">Frame nahi mila 🔎</h2>
        <p className="font-semibold text-[var(--color-text-secondary)]">Yeh design catalog mein available nahi hai.</p>
        <Button onClick={() => router.push('/catalog')} variant="secondary">
          Catalog pe wapas jao
        </Button>
      </div>
    );
  }

  const inStock = frame.stock > 0;
  const currentLensObj = LENS_OPTIONS[selectedLens as keyof typeof LENS_OPTIONS] || LENS_OPTIONS['frame-only'];
  const totalPricePaise = frame.price + currentLensObj.price;

  const handleAddToCart = () => {
    if (!inStock) {
      toast.error('Sorry, yeh frame abhi out of stock hai!');
      return;
    }
    addItem(frame, 1, currentLensObj.name, currentLensObj.price);
    toast.success(`${frame.name} cart mein daal diya! 🎉`);
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Hi Optic Vision Nagpur! Main "${frame.name}" (Color: ${selectedColor || 'Default'}, Size: ${selectedSize}) ke baare mein poochhna chahta hoon.`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <main className="pt-28 pb-32 max-w-7xl mx-auto px-5 md:px-16 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
        
        {/* Left Side: Image Gallery / Carousel */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-[var(--color-surface-raised)] border border-[var(--color-border)] shadow-sm">
            {frame.images && frame.images[activeImageIdx] ? (
              <Image
                src={frame.images[activeImageIdx]}
                alt={frame.name}
                fill
                priority
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 font-bold">
                No Frame Image
              </div>
            )}
            
            {/* Stock Badge */}
            <div className="absolute top-6 left-6 z-10">
              <Badge variant={inStock ? 'success' : 'danger'}>
                {inStock ? 'In Stock' : 'Abhi nahi hai'}
              </Badge>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {frame.images && frame.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {frame.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 bg-slate-50 flex-shrink-0 cursor-pointer transition-all ${
                    activeImageIdx === idx ? 'border-[var(--color-primary)] scale-105' : 'border-[var(--color-border)] opacity-70'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Specifications and Purchases */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Header Info */}
          <div>
            <span className="text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest inline-block mb-3">
              {frame.category === 'eyeglasses' ? 'Eyeglasses 👓' : 'Sunglasses 🕶️'}
            </span>
            <h1 className="text-4xl font-extrabold text-[var(--color-text-primary)] mb-2 tracking-tighter leading-tight">
              {frame.name}
            </h1>
            <p className="text-sm font-bold text-[var(--color-text-secondary)] mb-4">
              Brand: <span className="text-[var(--color-text-primary)]">{frame.brand || 'Optic Vision'}</span>
            </p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-extrabold text-[var(--color-primary)]">
                {toDisplay(totalPricePaise)}
              </p>
              {selectedLens !== 'frame-only' && (
                <span className="text-xs font-bold text-[var(--color-text-secondary)] pb-1">
                  (Lens added)
                </span>
              )}
            </div>
          </div>

          {/* Colors selection */}
          {frame.colors && frame.colors.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Select Color:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {frame.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedColor === color
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] scale-105 shadow-xs'
                        : 'border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: color.toLowerCase() === 'clear' ? '#EBF4F6' : color.toLowerCase() }} />
                    <span>{color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes Selection */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">
              Select Size:
            </span>
            <div className="flex gap-3">
              {(['small', 'medium', 'large'] as const).map((size) => {
                const isCompatible = frame.sizes ? frame.sizes.includes(size) : size === 'medium';
                if (!isCompatible) return null;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl border text-xs font-extrabold capitalize cursor-pointer transition-all ${
                      selectedSize === size
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] scale-105'
                        : 'border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:bg-slate-50'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lens Selection / Custom Add-on */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">
              Choose Lens Type:
            </span>
            <div className="flex flex-col gap-3">
              {/* Frame Only */}
              <label
                className={`flex items-start p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedLens === 'frame-only'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/30'
                    : 'border-[var(--color-border)] hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="lens-type"
                  checked={selectedLens === 'frame-only'}
                  onChange={() => setSelectedLens('frame-only')}
                  className="mt-1 accent-[var(--color-primary)] h-4 w-4 shrink-0"
                />
                <div className="ml-3 flex-grow">
                  <p className="font-extrabold text-sm text-[var(--color-text-primary)]">
                    {LENS_OPTIONS['frame-only'].name}
                  </p>
                  <p className="text-xs font-semibold text-[var(--color-text-secondary)] mt-0.5">
                    {LENS_OPTIONS['frame-only'].desc}
                  </p>
                </div>
                <span className="font-extrabold text-sm text-[var(--color-primary)] ml-2">
                  +₹0
                </span>
              </label>

              {/* Compatible Lens */}
              {Object.keys(LENS_OPTIONS)
                .filter((key) => key !== 'frame-only')
                .map((key) => {
                  const isCompatible = frame.lensCompatible
                    ? frame.lensCompatible.includes(key as any)
                    : true;
                  if (!isCompatible) return null;

                  const lensObj = LENS_OPTIONS[key as keyof typeof LENS_OPTIONS];
                  return (
                    <label
                      key={key}
                      className={`flex items-start p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedLens === key
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/30'
                          : 'border-[var(--color-border)] hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="lens-type"
                        checked={selectedLens === key}
                        onChange={() => setSelectedLens(key as any)}
                        className="mt-1 accent-[var(--color-primary)] h-4 w-4 shrink-0"
                      />
                      <div className="ml-3 flex-grow">
                        <p className="font-extrabold text-sm text-[var(--color-text-primary)]">
                          {lensObj.name}
                        </p>
                        <p className="text-xs font-semibold text-[var(--color-text-secondary)] mt-0.5">
                          {lensObj.desc}
                        </p>
                      </div>
                      <span className="font-extrabold text-sm text-[var(--color-primary)] ml-2">
                        +{toDisplay(lensObj.price)}
                      </span>
                    </label>
                  );
                })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-4 mt-2">
            <Button
              onClick={handleAddToCart}
              disabled={!inStock}
              fullWidth
              variant="primary"
              className="text-base uppercase tracking-widest font-extrabold"
            >
              <ShoppingCart className="w-5 h-5 mr-2.5" />
              Cart mein daalo
            </Button>
            
            <Button
              onClick={handleWhatsAppInquiry}
              fullWidth
              variant="secondary"
              className="text-base uppercase tracking-widest font-extrabold"
            >
              <MessageSquare className="w-5 h-5 mr-2.5" />
              WhatsApp pe poochho
            </Button>
          </div>

          {/* Collapsible Info Accordion */}
          <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden bg-white shadow-xs">
            <button
              onClick={() => setIsDescOpen(!isDescOpen)}
              className="w-full flex justify-between items-center p-5 font-extrabold text-sm text-[var(--color-text-primary)] bg-slate-50 border-b border-[var(--color-border)] cursor-pointer"
            >
              <span>Frame ke baare mein 🕶️📖</span>
              {isDescOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {isDescOpen && (
              <div className="p-5 text-sm text-[var(--color-text-secondary)] font-semibold leading-relaxed">
                {frame.description || 'Nagpur ka style aur international designs, is frame mein dono milte hain.'}
                <ul className="mt-3 space-y-1.5 text-xs text-[var(--color-text-primary)]">
                  <li>✨ Material: <span className="font-extrabold capitalize">{frame.frameMaterial}</span></li>
                  <li>✨ Style: <span className="font-extrabold capitalize">{frame.frameStyle}</span></li>
                  <li>✨ Category: <span className="font-extrabold capitalize">{frame.category}</span></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations Row */}
      {recommendations.length > 0 && (
        <section className="mt-20 border-t border-[var(--color-border)] pt-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-8">
            Yeh frames bhi dekhein 🔥
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((recFrame) => (
              <FrameCard key={recFrame.id} frame={recFrame} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
