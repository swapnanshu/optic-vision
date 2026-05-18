'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [qty, setQty] = useState(1);
  const router = useRouter();
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin'); // redirect to admin to show app flows
  };

  return (
    <main className="pt-24 pb-32 max-w-7xl mx-auto px-5 md:px-16 lg:px-32">
       <div className="mb-10">
          <p className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">Checkout Process</p>
          <h2 className="text-4xl font-extrabold text-on-surface">Your Selection</h2>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface-container-low rounded-3xl p-5 md:p-8 shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row gap-6 items-center sm:items-start group">
                  <div className="w-full sm:w-32 aspect-square flex-shrink-0 rounded-2xl overflow-hidden bg-surface-container relative shadow-sm">
                     <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMGg5AUqHWQutVmFK7w8Yevy0jaYpCEwtWNl5e9sFUzp9yhn7PS_se9gFRu8RynrfPj7-4p2tYPoCnmLLfJxJ1gGiqA92PBPqF0RCi7wiBpN_sjxdY07zFdTt75m0KJ8JPmDb0nKDb-EFPpv3pkewsiH-ftbbucEL5urFxe0Pta-UU7UDwuxt9YsrCgmz3y-ezwWysF1SfqeY9nK9Fm-oHlUdyTKwOW7pSsDMTyFbDmGezwOa-FwhLHFnHAtnZ0INr-G5lEHpUmKVr" alt="Product" fill className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1 w-full text-center sm:text-left">
                     <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-2 sm:gap-0">
                           <h3 className="text-2xl font-extrabold text-on-surface leading-tight">Nagpur Noir</h3>
                           <span className="font-extrabold text-primary text-xl">₹3,499</span>
                        </div>
                        <p className="text-sm font-medium text-on-surface-variant mt-2">Premium Matte Acetate • Midnight Black</p>
                     </div>
                     <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 sm:gap-0">
                        <div className="flex items-center gap-4 bg-background px-5 py-2 rounded-full border border-outline-variant shadow-sm w-full sm:w-auto justify-center">
                           <button onClick={()=>setQty(Math.max(1, qty-1))} className="active:scale-90 transition-transform"><Minus className="w-4 h-4 text-primary" /></button>
                           <span className="font-bold text-base w-6 text-center">{qty}</span>
                           <button onClick={()=>setQty(qty+1)} className="active:scale-90 transition-transform"><Plus className="w-4 h-4 text-primary" /></button>
                        </div>
                        <button className="text-error flex items-center gap-1.5 hover:opacity-70 transition-opacity active:scale-95">
                           <Trash2 className="w-4 h-4" />
                           <span className="text-sm font-bold">Remove</span>
                        </button>
                     </div>
                  </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
                 <h3 className="text-2xl font-extrabold text-on-surface">Delivery Address</h3>
                 <form id="checkout" onSubmit={handleCheckout} className="grid grid-cols-1 gap-6">
                    <input type="text" placeholder="Full Name" required className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:outline-none transition-colors py-4 px-2 text-lg font-medium placeholder:text-outline-variant" />
                    <input type="text" placeholder="House / Flat No., Street Name" required className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:outline-none transition-colors py-4 px-2 text-lg font-medium placeholder:text-outline-variant" />
                    <div className="grid grid-cols-2 gap-6">
                       <div className="relative">
                          <input type="text" value="Nagpur" readOnly className="w-full bg-surface-container-low border-b-2 border-outline-variant py-4 outline-none px-4 text-lg text-on-surface-variant rounded-t-xl font-bold cursor-not-allowed" />
                          <span className="absolute right-4 top-5 text-[10px] uppercase font-extrabold text-primary">Fixed</span>
                       </div>
                       <input type="number" placeholder="Pincode (4400xx)" required min="440001" max="440035" className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:outline-none transition-colors py-4 px-2 text-lg font-medium placeholder:text-outline-variant" />
                    </div>
                    <input type="tel" placeholder="Mobile Number" required className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:outline-none transition-colors py-4 px-2 text-lg font-medium placeholder:text-outline-variant" />
                 </form>
              </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-5 mt-8 lg:mt-0">
             <div className="bg-surface-container-high rounded-[2rem] p-8 lg:p-10 lg:sticky lg:top-28 border border-white/50 shadow-xl">
                 <h3 className="text-2xl font-extrabold text-on-surface mb-8">Order Summary</h3>
                 <div className="space-y-5 mb-8">
                    <div className="flex justify-between items-center text-on-surface-variant font-semibold">
                       <span>Subtotal ({qty} Item)</span>
                       <span>₹{(3499*qty).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant font-semibold">
                       <span>GST (18%)</span>
                       <span>₹{Math.round(3499*qty*0.18).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant font-semibold">
                       <span>Delivery Charge</span>
                       <span className="text-primary font-bold">FREE</span>
                    </div>
                    <div className="pt-6 border-t border-outline-variant/50 flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-[0.2em] mb-1">Grand Total</p>
                          <p className="text-4xl md:text-5xl font-extrabold text-primary tracking-tighter">₹{(3499*qty + Math.round(3499*qty*0.18)).toLocaleString()}</p>
                       </div>
                    </div>
                 </div>

                 <button form="checkout" type="submit" className="w-full bg-primary text-on-primary font-extrabold py-5 md:py-6 rounded-2xl hover:bg-primary/95 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group text-lg shadow-md">
                    Order Place Karo
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                 </button>

                 <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-2 text-on-surface-variant">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <p className="text-xs font-bold text-center">Secure Payment Gateway • Orange City Trust</p>
                 </div>
             </div>

             <div className="mt-8 p-6 md:p-8 bg-secondary-container rounded-3xl text-on-secondary-container shadow-inner border border-outline-variant/10">
                 <p className="text-xs font-extrabold uppercase tracking-widest mb-3 text-on-secondary-fixed-variant">Nagpur Exclusive Service</p>
                 <p className="text-sm italic font-medium opacity-80 leading-relaxed md:leading-loose">&quot;Standard delivery within 24 hours for all orders placed within Nagpur city limits. Jai Maharashta!&quot;</p>
             </div>
          </motion.div>
       </div>
    </main>
  )
}
