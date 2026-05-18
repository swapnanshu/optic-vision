'use client';
import { motion } from 'motion/react';
import { Search, Plus, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { products } from '@/lib/data';
import { useState } from 'react';

export default function AdminCatalog() {
  const [filter, setFilter] = useState('All');
  
  return (
    <main className="pt-24 pb-32 px-5 md:px-10 lg:px-16 max-w-7xl mx-auto md:ml-80">
       <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-background mb-4 tracking-tighter">Catalog Management</h2>
            <div className="flex flex-wrap gap-4 items-center">
               <span className="text-sm md:text-base font-extrabold text-primary flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" /> {products.length} Active SKUs
               </span>
               <span className="text-sm md:text-base font-extrabold text-error flex items-center gap-2 bg-error/10 px-4 py-1.5 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-error" /> {products.filter(p=>p.stock===0).length} Out of Stock
               </span>
            </div>
          </div>
          <button className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-extrabold flex items-center gap-3 shadow-md hover:bg-primary/95 active:scale-[0.98] transition-all w-full xl:w-auto justify-center text-lg">
             <Plus className="w-6 h-6"/> Add New Frame
          </button>
       </header>

       <section className="bg-surface-container-highest/30 p-6 rounded-[2rem] flex flex-col md:flex-row gap-5 mb-10 border border-outline-variant/30">
          <div className="relative w-full md:flex-1">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-on-surface-variant font-bold" />
             <input type="text" placeholder="Search frame name, SKU, or collection..." className="w-full pl-14 pr-5 py-4 bg-background rounded-2xl focus:ring-2 focus:ring-primary border-none text-base font-bold placeholder:font-medium placeholder:text-outline shadow-sm" />
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
             {['All', 'Frames', 'Sunglasses', 'Lenses'].map(f => (
               <button 
                 key={f}
                 onClick={() => setFilter(f)}
                 className={`px-8 py-4 rounded-2xl text-base font-extrabold whitespace-nowrap transition-all shadow-sm ${
                   filter === f 
                    ? 'bg-primary-container text-on-primary-container scale-105' 
                    : 'bg-surface border-2 border-outline-variant text-on-surface-variant hover:bg-surface-container'
                 }`}
               >
                 {f}
               </button>
             ))}
          </div>
       </section>

       <section className="space-y-5">
          <div className="hidden lg:grid grid-cols-12 gap-8 px-8 py-4 text-xs font-extrabold text-outline uppercase tracking-[0.2em]">
             <div className="col-span-5 relative">
                Product Details
                <div className="absolute left-0 -bottom-4 w-10 h-1 bg-outline-variant/50 rounded-full"></div>
             </div>
             <div className="col-span-2">Collection</div>
             <div className="col-span-2">Price</div>
             <div className="col-span-2">Stock</div>
             <div className="col-span-1 text-right">Action</div>
          </div>

          {products.map((p, i) => (
             <motion.div key={p.sku} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.05 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-surface-container-low p-6 lg:p-8 rounded-[2rem] border border-outline-variant/30 hover:border-outline-variant hover:shadow-md transition-all group">
                <div className="col-span-5 flex items-center gap-6">
                   <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-surface-container-highest overflow-hidden shrink-0 relative shadow-sm">
                     <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                   </div>
                   <div>
                     <h3 className="text-xl md:text-2xl font-extrabold text-on-surface mb-2 tracking-tight">{p.name}</h3>
                     <p className="text-xs font-bold text-outline tracking-wider">SKU: {p.sku}</p>
                   </div>
                </div>
                <div className="col-span-2 hidden lg:block">
                   <span className="px-4 py-2 bg-tertiary-container/10 text-on-tertiary-fixed-variant rounded-full text-[10px] font-extrabold uppercase tracking-[0.15em] border border-tertiary/10">{p.collection}</span>
                </div>
                <div className="col-span-2 font-extrabold text-2xl text-on-surface">
                   ₹{p.price.toLocaleString()}
                </div>
                <div className="col-span-2">
                   <div className="flex flex-col gap-3">
                      <div className="w-full h-2 bg-outline-variant/50 rounded-full overflow-hidden">
                         <div className={`h-full rounded-full transition-all duration-1000 ${p.stock > 10 ? 'bg-primary w-3/4' : p.stock > 0 ? 'bg-tertiary w-1/4' : 'bg-error w-0'}`} />
                      </div>
                      <p className={`text-[11px] font-extrabold tracking-widest uppercase ${p.stock > 10 ? 'text-on-surface-variant' : p.stock > 0 ? 'text-tertiary-container' : 'text-error'}`}>
                         {p.stock > 10 ? `${p.stock} Units (High)` : p.stock > 0 ? `Low Stock (${p.stock})` : 'Out of Stock'}
                      </p>
                   </div>
                </div>
                <div className="col-span-1 text-right absolute right-6 top-6 lg:relative lg:right-0 lg:top-0">
                   <button className="p-3 hover:bg-primary-container hover:text-on-primary-container rounded-xl transition-colors active:scale-90">
                      <MoreVertical className="w-6 h-6" />
                   </button>
                </div>
             </motion.div>
          ))}
       </section>
    </main>
  );
}
