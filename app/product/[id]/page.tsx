'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ScanFace } from 'lucide-react';
import { products } from '@/lib/data';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id) || products[0];
  const [lens, setLens] = useState('zero');
  
  return (
    <main className="pt-28 pb-32 max-w-7xl mx-auto px-5 md:px-16 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        
        {/* Left Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-container shadow-md border border-outline-variant/20"
          >
            <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" priority />
          </motion.div>
          
          <div className="grid grid-cols-2 gap-6">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="aspect-square overflow-hidden rounded-3xl bg-surface-container relative shadow-sm border border-outline-variant/20"
            >
              {product.image2 && <Image src={product.image2} alt="Detail" fill className="object-cover" referrerPolicy="no-referrer" />}
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="aspect-square overflow-hidden rounded-3xl bg-surface-container relative shadow-sm border border-outline-variant/20"
            >
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFk4bQ5VPbIVU8ARexiOEczDAuYXIg088VYy5PxRSvx_XyKboYl9Hed5wBcKaO-GyHqa4ObaqDo5hWj83n1RensG63AI9g0z_a38c5zITJYA47oV7YtUu8WSls-fq6epWmQvTgP_LOiOjHewueo3zoVaMLrvsRxaRo3hmOz-_fpFiJjR-nLEvQBQkalsvNMy3z0U3SFMgbOluQn-G2WqEkWZgWD7HK6xAE7hJHx_Kl4YIdNqDny_InO5VCcyrShwp0maPQDuV9JuTy" alt="Lifestyle" fill className="object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        </div>

        {/* Right Info */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {product.tags.map(t => (
                <span key={t} className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-3 tracking-tighter">{product.name}</h2>
            <p className="text-3xl font-extrabold text-primary">₹{product.price}</p>
            <p className="mt-6 text-on-surface-variant font-medium text-lg leading-relaxed md:leading-loose">
              A sophisticated blend of local warmth and contemporary precision. Handcrafted matte acetate frames designed for the discerning Nagpur creative. Lightweight, durable, and eternally stylish.
            </p>
          </motion.div>

          {/* Virtual Try On */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
            <h3 className="text-sm font-extrabold text-on-surface mb-6 flex items-center gap-2 uppercase tracking-widest">
              <ScanFace className="text-primary w-6 h-6" /> VIRTUAL TRY-ON
            </h3>
            <div className="relative w-full aspect-video bg-white rounded-2xl overflow-hidden flex items-center justify-center border border-outline-variant/20 shadow-inner">
               <div className="relative w-48 h-48 animate-pulse">
                  <svg className="w-full h-full text-surface-dim fill-current" viewBox="0 0 100 100">
                      <path d="M50 10C30 10 15 30 15 55C15 80 30 95 50 95C70 95 85 80 85 55C85 30 70 10 50 10Z"></path>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-32 opacity-90">
                      <svg className="w-full text-on-surface fill-current" viewBox="0 0 200 60">
                          <path d="M10 20C10 10 30 10 45 10C60 10 80 15 100 15C120 15 140 10 155 10C170 10 190 10 190 20C190 35 170 50 155 50C140 50 125 40 100 40C75 40 60 50 45 50C30 50 10 35 10 20ZM50 25C50 20 40 20 30 20C20 20 20 35 30 40C40 45 50 40 50 35V25ZM170 20C160 20 150 20 150 25V35C150 40 160 45 170 40C180 35 180 20 170 20Z"></path>
                      </svg>
                  </div>
               </div>
            </div>
            <p className="text-center text-xs font-bold text-on-surface-variant mt-4 opacity-70">Simulation Active</p>
          </motion.section>

          {/* Lens Selection */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-5">
            <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-widest">Select Lens Type</h3>
            <div className="grid grid-cols-1 gap-4">
              <label className={`relative flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all ${lens === 'zero' ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant hover:bg-surface-container-high'}`}>
                <input type="radio" name="lens" value="zero" checked={lens === 'zero'} onChange={()=>setLens('zero')} className="w-5 h-5 text-primary border-outline focus:ring-primary" />
                <div className="ml-5">
                  <p className="font-extrabold text-on-surface text-lg">Zero Power (Fashion)</p>
                  <p className="text-sm font-medium text-on-surface-variant mt-1">Blue-light coating included</p>
                </div>
                <span className="ml-auto font-extrabold text-primary text-lg">+₹0</span>
              </label>
              
              <label className={`relative flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all ${lens === 'power' ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant hover:bg-surface-container-high'}`}>
                <input type="radio" name="lens" value="power" checked={lens === 'power'} onChange={()=>setLens('power')} className="w-5 h-5 text-primary border-outline focus:ring-primary" />
                <div className="ml-5">
                  <p className="font-extrabold text-on-surface text-lg">Single Vision</p>
                  <p className="text-sm font-medium text-on-surface-variant mt-1">For distance or reading</p>
                </div>
                <span className="ml-auto font-extrabold text-primary text-lg">+₹999</span>
              </label>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}  className="flex flex-col gap-4 mt-2">
            <Link href="/checkout" className="w-full bg-primary text-on-primary py-5 rounded-2xl font-extrabold uppercase tracking-widest transition-all hover:bg-primary/95 hover:shadow-lg active:scale-[0.98] shadow-md text-center text-sm md:text-base">
               Cart mein daalo
            </Link>
            <button className="w-full border-2 border-primary text-primary py-5 rounded-2xl font-extrabold uppercase tracking-widest transition-all hover:bg-primary/5 active:scale-[0.98] text-sm md:text-base">
               Book Nagpur Eye Test
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
