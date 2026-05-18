'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Store, Home as HomeIcon, ArrowRight, ShieldCheck, Eye, Compass } from 'lucide-react';
import { useCatalog } from '@/hooks/useCatalog';
import { useFilterStore } from '@/store/filterStore';
import { FrameCard } from '@/components/catalog/FrameCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';

export default function HomePage() {
  const router = useRouter();
  const { frames, isLoaded } = useCatalog();
  const setFilter = useFilterStore((state) => state.setFilter);
  const clearAllFilters = useFilterStore((state) => state.clearAllFilters);

  // Filter trending frames from cached catalog
  const trendingFrames = frames.filter((f) => f.isTrending).slice(0, 6);

  const handleCategorySelect = (cat: 'eyeglasses' | 'sunglasses') => {
    clearAllFilters();
    setFilter('category', cat);
    router.push('/catalog');
  };

  return (
    <main className="pt-24 pb-32 max-w-7xl mx-auto px-5 md:px-16 overflow-x-hidden">
      
      {/* Hero section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative aspect-[3/4] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden group shadow-md border border-[var(--color-border)]"
      >
        <Image
          src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1600&auto=format&fit=crop"
          alt="Premium NayanStore Boutique"
          fill
          className="object-cover group-hover:scale-102 transition-transform duration-[3s]"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 md:p-14 w-full">
          <span className="text-[var(--color-cta)] font-extrabold text-xs md:text-sm uppercase tracking-[0.2em] block mb-2">
            Nagpur's Finest Optical Boutique
          </span>
          <h2 className="text-[2.2rem] md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tighter">
            Aankhon ki jaanch <br />book karo
          </h2>
          <Link href="/appointments">
            <Button variant="primary" className="text-base uppercase tracking-wider font-extrabold shadow-lg">
              BOOK EYE TEST 📅
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Services Bento Grid / Categories row */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => handleCategorySelect('eyeglasses')}
          className="bg-white p-8 rounded-[2rem] flex flex-col justify-between h-52 md:h-64 border border-[var(--color-border)] hover:border-[var(--color-primary-light)] active:scale-[0.99] transition-all shadow-xs hover:shadow-sm cursor-pointer group"
        >
          <div className="p-3 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] rounded-2xl w-fit border border-[var(--color-primary-light)]">
            <Eye className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
              Eyeglasses Collection 👓
            </h3>
            <p className="text-sm font-semibold text-[var(--color-text-secondary)] mt-1.5 flex items-center gap-1">
              Browse specs and frames <ArrowRight className="w-4 h-4 ml-1" />
            </p>
          </div>
        </div>

        <div
          onClick={() => handleCategorySelect('sunglasses')}
          className="bg-white p-8 rounded-[2rem] flex flex-col justify-between h-52 md:h-64 border border-[var(--color-border)] hover:border-[var(--color-primary-light)] active:scale-[0.99] transition-all shadow-xs hover:shadow-sm cursor-pointer group"
        >
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit border border-amber-200">
            <Compass className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
              Sunglasses Collection 🕶️
            </h3>
            <p className="text-sm font-semibold text-[var(--color-text-secondary)] mt-1.5 flex items-center gap-1">
              Browse styles and shades <ArrowRight className="w-4 h-4 ml-1" />
            </p>
          </div>
        </div>
      </section>

      {/* Trending Frames Horizontal Strip */}
      <section className="mt-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[var(--color-primary-dark)] font-extrabold text-xs uppercase tracking-widest block mb-2">
              Best Sellers
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Trending Nagpur Frames 🔥
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-[var(--color-primary-dark)] font-extrabold flex items-center gap-1 hover:underline text-sm uppercase tracking-wider"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-6 -mx-5 px-5 md:mx-0 md:px-0 no-scrollbar">
          {isLoaded ? (
            trendingFrames.map((frame) => (
              <div key={frame.id} className="min-w-[280px] md:min-w-[320px] flex-shrink-0">
                <FrameCard frame={frame} />
              </div>
            ))
          ) : (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="min-w-[280px] md:min-w-[320px] flex-shrink-0 flex flex-col gap-4 animate-pulse">
                <div className="aspect-[4/3] bg-slate-200 rounded-3xl" />
                <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
                <div className="h-5 bg-slate-200 rounded-lg w-1/2" />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Lens Guides teaser banner */}
      <section className="mt-16 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[2.5rem] p-8 md:p-14 shadow-xs">
        <div className="max-w-2xl">
          <span className="text-[var(--color-primary-dark)] font-extrabold text-xs uppercase tracking-wider block mb-3">
            Premium Coatings
          </span>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tighter">
            Aapki screens ke liye correct lens guard!
          </h3>
          <p className="text-base font-semibold text-[var(--color-text-secondary)] leading-relaxed mb-6">
            Laptop glare aur mobile screens ke pressure se aankhon ko bachane ke liye humare custom Blue Cut aur Photochromic coatings check karein.
          </p>
          <Link href="/lenses">
            <Button variant="secondary" className="text-xs uppercase tracking-wider font-extrabold">
              Understand Lenses 📖
            </Button>
          </Link>
        </div>
      </section>

      {/* Face shape illustrated banner */}
      <section className="mt-12 bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] rounded-[2.5rem] p-8 md:p-14 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-xl">
          <span className="text-[var(--color-primary-dark)] font-extrabold text-xs uppercase tracking-wider block mb-3">
            Face Shape Guide
          </span>
          <h3 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tighter">
            Kaunsa style aap par suit karega?
          </h3>
          <p className="text-base font-semibold text-[var(--color-text-secondary)] leading-relaxed">
            Oval, Round, ya Square? Apne chehre ke curves aur angles ke according frames search karein aur local styling test karein.
          </p>
        </div>
        <Link href="/face-shape-guide" className="shrink-0">
          <Button variant="primary" className="text-xs uppercase tracking-wider font-extrabold">
            Match My Face Shape 👓
          </Button>
        </Link>
      </section>
      
      {/* Store Location Footer banner */}
      <section className="mt-20 border-t border-[var(--color-border)] pt-16">
        <div className="flex flex-col lg:flex-row gap-10 items-center bg-white border border-[var(--color-border)] rounded-[2.5rem] p-5 lg:p-8 shadow-xs">
          <div className="w-full lg:w-1/2 aspect-video rounded-3xl overflow-hidden relative border border-[var(--color-border)] shadow-xs">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.144458315802!2d79.05739827607738!3d21.146663583723382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0fa0f576e27%3A0xe54ef864811b712c!2sDharampeth%2C%20Nagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716035000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tighter">
              Boutique Studio in Dharampeth 🏬
            </h2>
            <p className="text-sm md:text-base font-semibold text-[var(--color-text-secondary)] leading-relaxed mb-6">
              Dharampeth Metro Station ke bilkul paas, Nagpur. Studio visit karein aur complete collections ka offline fit aur styling experience karein.
            </p>
            <div className="flex gap-4">
              <Link href="/about">
                <Button variant="secondary" className="text-xs uppercase tracking-wider font-extrabold">
                  View Store Details
                </Button>
              </Link>
              <a href="tel:07123456789">
                <Button variant="ghost" className="text-xs uppercase tracking-wider font-extrabold text-[var(--color-primary)]">
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
