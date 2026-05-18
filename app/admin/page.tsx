'use client';
import { motion } from 'motion/react';
import { Calendar, ShoppingBag, IndianRupee, Clock, Home as HomeIcon, CheckCircle, ArrowRight, PlusCircle, Megaphone, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Aniket Kulkarni', time: '10:30 AM • Store Visit', initials: 'AK', color: 'bg-primary/10 text-primary', icon: Clock, done: false },
    { id: 2, name: 'Priya Deshmukh', time: '12:15 PM • Home Test', initials: 'PD', color: 'bg-tertiary/10 text-tertiary', icon: HomeIcon, done: false },
    { id: 3, name: 'Sanjay Mehra', time: '02:45 PM • Store Visit', initials: 'SM', color: 'bg-secondary-container text-secondary', icon: Clock, done: true },
  ]);

  const [orders, setOrders] = useState([
    { id: '1092', name: 'Ray-Ban Wayfarer Premium', price: 8499, time: '2h ago' },
    { id: '1095', name: 'Nayan Essentials Blue-Cut', price: 2200, time: '4h ago' },
  ]);

  const completeTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));
  }

  const completeOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
  }

  return (
    <main className="pt-24 pb-32 px-5 md:px-10 lg:px-16 max-w-7xl mx-auto md:ml-80">
      
      {/* KPI */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-6">
               <Calendar className="text-primary w-10 h-10 group-hover:scale-110 transition-transform" />
               <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Today</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-extrabold text-primary mb-2 tracking-tighter">12</h3>
            <p className="text-sm font-semibold text-on-surface-variant">Appointments Booked</p>
         </motion.div>
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-tertiary-container/10 p-8 rounded-3xl border border-tertiary/20 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-6">
               <ShoppingBag className="text-tertiary w-10 h-10 group-hover:scale-110 transition-transform" />
               <span className="text-[10px] font-extrabold text-tertiary uppercase tracking-widest">Pending</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-extrabold text-tertiary mb-2 tracking-tighter">{orders.length + 6}</h3>
            <p className="text-sm font-semibold text-on-tertiary-fixed-variant">Orders to Fulfill</p>
         </motion.div>
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-primary-container p-8 rounded-3xl border border-primary/20 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden group sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s]" />
            <div className="flex items-center justify-between mb-6 relative z-10">
               <IndianRupee className="text-on-primary-container w-10 h-10 group-hover:scale-110 transition-transform" />
               <span className="text-[10px] font-extrabold text-on-primary-container uppercase tracking-widest">Revenue</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-extrabold text-on-primary-container mb-2 tracking-tighter relative z-10">₹24.5k</h3>
            <p className="text-sm font-semibold text-on-primary-container/80 relative z-10">Earned Today</p>
         </motion.div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12">
         <section className="xl:col-span-7 space-y-8">
            <div className="flex justify-between items-baseline mb-4">
               <h2 className="text-3xl font-extrabold text-on-background tracking-tight">Today&apos;s Tasks</h2>
               <p className="text-sm font-extrabold text-primary cursor-pointer hover:underline tracking-widest uppercase">View All</p>
            </div>
            
            <div className="space-y-4">
               {tasks.map((t, i) => (
                 <motion.div key={t.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i*0.1 }} className="bg-surface p-5 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between border border-outline-variant hover:border-primary transition-colors shadow-sm gap-4 sm:gap-0 group">
                    <div className="flex items-center gap-5 w-full">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl ${t.color}`}>
                          {t.initials}
                       </div>
                       <div className="flex-grow">
                          <h4 className="text-xl font-extrabold text-on-background">{t.name}</h4>
                          <div className="flex items-center gap-2 text-on-surface-variant text-sm mt-1.5 font-bold">
                             <t.icon className="w-4 h-4" /> {t.time}
                          </div>
                       </div>
                    </div>
                    {t.done ? (
                      <button disabled className="bg-surface-variant text-on-surface-variant font-extrabold px-6 py-3 rounded-2xl text-sm flex gap-2 sm:w-auto w-full justify-center"><CheckCircle className="w-5 h-5"/> Confirmed</button>
                    ) : (
                      <button onClick={()=>completeTask(t.id)} className="bg-primary text-on-primary font-extrabold px-8 py-3 rounded-2xl text-sm hover:bg-primary/95 active:scale-95 transition-all shadow-md sm:w-auto w-full">Confirm</button>
                    )}
                 </motion.div>
               ))}
            </div>
         </section>

         <aside className="xl:col-span-5 space-y-12">
            <div>
               <h2 className="text-3xl font-extrabold text-on-background mb-6 tracking-tight">Order Bhejo</h2>
               <div className="bg-surface-container-highest/20 rounded-[2rem] p-4 space-y-4 border border-outline-variant/30">
                  {orders.map((o, i) => (
                    <motion.div key={o.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i*0.1 }} className="bg-surface p-6 rounded-3xl shadow-sm border border-outline-variant/40 hover:border-primary/40 transition-colors">
                       <div className="flex justify-between items-start mb-5 gap-4">
                          <div>
                             <span className="text-[10px] font-extrabold bg-primary-container text-on-primary-container px-3 py-1 rounded-full uppercase tracking-widest">#NS-{o.id}</span>
                             <h5 className="font-extrabold text-xl mt-3 leading-tight">{o.name}</h5>
                          </div>
                          <span className="font-extrabold text-tertiary text-lg">₹{o.price.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between items-center pt-3 mt-3 border-t border-outline-variant/20">
                          <p className="text-xs font-bold text-on-surface-variant">Placed {o.time}</p>
                          <button onClick={()=>completeOrder(o.id)} className="text-primary font-extrabold text-sm flex items-center gap-1.5 hover:opacity-80 active:scale-95 transition-all group">
                             Mark Shipped <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                       </div>
                    </motion.div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-center p-6 font-bold text-on-surface-variant">Sab order ship ho gaye!</p>
                  )}
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-5">
               <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="group flex flex-col sm:flex-row xl:flex-row items-center gap-5 bg-primary text-on-primary p-6 rounded-3xl shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] overflow-hidden relative">
                  <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="bg-white/20 p-4 rounded-2xl group-hover:rotate-12 transition-transform shadow-inner">
                     <PlusCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center sm:text-left xl:text-left">
                     <p className="text-xl font-extrabold">Add New Frame</p>
                     <p className="text-sm font-medium opacity-90 mt-1">Scan or manually enter inventory</p>
                  </div>
               </motion.button>
               <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="group flex flex-col sm:flex-row xl:flex-row items-center gap-5 bg-surface text-on-background p-6 rounded-3xl border-2 border-outline-variant hover:border-primary transition-all active:scale-[0.98]">
                  <div className="bg-primary-container p-4 rounded-2xl group-hover:-translate-y-1 transition-transform shadow-sm">
                     <Megaphone className="w-8 h-8 text-primary group-hover:text-on-primary-container transition-colors" />
                  </div>
                  <div className="text-center sm:text-left xl:text-left">
                     <p className="text-xl font-extrabold">Broadcast Promo</p>
                     <p className="text-sm text-on-surface-variant font-semibold mt-1">Reach 1,200+ customers</p>
                  </div>
               </motion.button>
            </div>
         </aside>
      </div>
    </main>
  );
}
