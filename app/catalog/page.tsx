'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { products } from '@/lib/data';

export default function CatalogPage() {
  const [filter, setFilter] = useState('all');
  const filters = ['All', 'Oval', 'Round', 'Square', 'Rectangular'];

  const filteredProducts = filter === 'All' || filter === 'all'
    ? products 
    : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <main className="pt-32 pb-32 max-w-7xl mx-auto px-5 md:px-16 overflow-x-hidden min-h-screen">
      <section className="mb-10 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-4 tracking-tighter">Aankhon ke liye best designs</h2>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl font-medium leading-relaxed md:mx-0 mx-auto">
          Curated collection of frames reflecting the warmth of Nagpur and precision of modern optics.
        </p>
      </section>

      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md py-4 -mx-5 px-5 md:mx-0 md:px-0 mb-10 overflow-hidden border-b border-outline-variant/30">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-outline-variant text-on-surface-variant font-bold hover:bg-surface-container active:scale-95 transition-all">
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <div className="h-6 w-0.5 bg-outline-variant flex-shrink-0 mx-2"></div>
          {filters.map(f => {
            const isActive = filter.toLowerCase() === f.toLowerCase();
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap px-7 py-3 rounded-full font-bold transition-all active:scale-95 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-md border-transparent scale-105'
                    : 'bg-surface border-2 border-outline-variant text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>
      </section>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((p, i) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            >
              <Link href={`/product/${p.id}`} className="group flex flex-col gap-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-container shadow-sm border border-transparent group-hover:border-outline-variant/40 transition-all">
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                  {p.tags && p.tags.length > 0 && (
                    <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                      {p.tags[0]}
                    </div>
                  )}
                  <button className="absolute bottom-4 right-4 bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0" onClick={(e)=>e.preventDefault()}>
                    <ShoppingCart className="w-6 h-6" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-on-surface">{p.name}</h3>
                  <div className="flex justify-between items-center mt-1.5">
                    <p className="font-bold text-primary text-lg">₹{p.price}</p>
                    <p className="text-sm font-semibold text-on-surface-variant bg-surface-container px-3 py-1 rounded-md">{p.category}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
