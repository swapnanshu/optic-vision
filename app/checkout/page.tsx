'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toDisplay } from '@/lib/utils/price';
import { toast } from '@/components/ui/Toast';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

// Nagpur Pincodes validated against Settings (same as Appointments)
const NAGPUR_PINCODES = [
  '440001', '440002', '440003', '440004', '440005', '440006', '440007', '440008',
  '440009', '440010', '440011', '440012', '440013', '440014', '440015', '440016',
  '440017', '440018', '440019', '440020', '440021', '440022', '440023', '440024',
  '440025', '440026', '440027', '440028', '440029', '440030', '440033', '440034',
  '440035'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, updateQty, removeItem, clearCart, isMounted } = useCart();

  // Steps: 'checkout' | 'completed'
  const [step, setStep] = useState<'checkout' | 'completed'>('checkout');
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'placing' | 'success'>('idle');

  // Form Fields
  const [name, setName] = useState<string>('');
  const [addressLine, setAddressLine] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Form states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [placedOrderId, setPlacedOrderId] = useState<string>('');

  // Validation
  const handleValidation = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 3) {
      newErrors.name = 'Kripya apna sahi naam likhein (minimum 3 characters).';
    }

    if (!addressLine.trim() || addressLine.trim().length < 5) {
      newErrors.address = 'Kripya apna poora delivery address likhein.';
    }

    if (!NAGPUR_PINCODES.includes(pincode.trim())) {
      newErrors.pincode = 'Delivery sirf select Nagpur pincodes (440001 - 440035) mein available hai.';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Kripya ek valid 10-digit WhatsApp mobile number likhein.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Order
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Aapka cart khaali hai!');
      return;
    }

    if (!handleValidation()) {
      toast.error('Kripya address form errors check karein!');
      return;
    }

    setIsSubmitting(true);
    setCheckoutStatus('placing');
    setOrderTotal(subtotal); // Capture order total snapshot BEFORE clearing!

    const orderPayload = {
      userId: null,
      customerName: name.trim(),
      phone: phone.trim(),
      email: null,
      address: {
        line1: addressLine.trim(),
        line2: null,
        city: 'Nagpur',
        pincode: pincode.trim(),
        landmark: null,
      },
      items: items.map((item) => ({
        frameId: item.frameId,
        name: item.name,
        image: item.image,
        qty: item.qty,
        price: item.price,
        lensType: item.lensType,
        lensPrice: item.lensPrice,
      })),
      subtotal: subtotal,
      deliveryCharge: 0,
      totalAmount: subtotal,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      status: 'placed',
      statusHistory: [
        {
          status: 'placed',
          timestamp: Timestamp.now(),
          note: 'Order successfully placed!',
        },
      ],
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 24 hrs
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    try {
      if (db) {
        const docRef = await addDoc(collection(db, 'orders'), orderPayload);
        setPlacedOrderId(docRef.id);
      } else {
        const randomId = 'NS_ORD_' + Math.random().toString(36).substr(2, 9).toUpperCase();
        setPlacedOrderId(randomId);
        // Fallback save in localStorage for local testing
        const existingLocal = JSON.parse(localStorage.getItem('local_orders') || '[]');
        existingLocal.push({ id: randomId, ...orderPayload, createdAt: new Date().toISOString() });
        localStorage.setItem('local_orders', JSON.stringify(existingLocal));
      }

      setCheckoutStatus('success');
      setTimeout(() => {
        toast.success('Order successfully placed! 🎉');
        clearCart();
        setStep('completed');
        setCheckoutStatus('idle');
      }, 2000);
    } catch (err) {
      console.error('Order creation failed:', err);
      toast.error('Order complete nahi ho paya. Kripya dobara try karein.');
      setCheckoutStatus('idle');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hydration protection
  if (!isMounted) {
    return (
      <main className="pt-28 pb-32 max-w-7xl mx-auto px-5 md:px-16 flex flex-col gap-10 items-center justify-center min-h-[60vh]">
        <div className="animate-spin text-[var(--color-primary)] text-5xl">⏳</div>
        <p className="font-bold text-[var(--color-text-secondary)]">Aapka cart load ho raha hai...</p>
      </main>
    );
  }

  // Placed Order Confirmation Screen
  if (step === 'completed') {
    return (
      <main className="pt-32 pb-32 max-w-2xl mx-auto px-5 min-h-screen flex flex-col justify-center items-center">
        <Card hoverable={false} className="w-full p-8 md:p-10 border border-[var(--color-primary-light)] bg-white text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal-500 via-amber-500 to-teal-500" />
          
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-[var(--color-primary)] stroke-[2.5]" />
          </div>

          <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-3 tracking-tighter">
            Order Place Ho Gaya! 🛍️🎉
          </h2>
          
          <p className="text-base font-semibold text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-4 py-2 rounded-xl inline-block mb-6">
            Order ID: <span className="font-extrabold font-mono text-sm">{placedOrderId}</span>
          </p>

          <div className="text-left bg-slate-50 border border-[var(--color-border)] rounded-2xl p-6 mb-8 flex flex-col gap-4 text-sm font-semibold">
            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-text-secondary)]">Customer Name:</span>
              <span className="text-[var(--color-text-primary)] font-extrabold">{name}</span>
            </div>
            
            <div className="flex justify-between items-start pb-3 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-text-secondary)]">Delivery Address:</span>
              <span className="text-[var(--color-text-primary)] font-extrabold text-right max-w-xs">
                {addressLine}, Nagpur - {pincode}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-text-secondary)]">Phone Number:</span>
              <span className="text-[var(--color-text-primary)] font-extrabold">{phone}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border)] text-emerald-800 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
              <span className="text-xs font-bold uppercase tracking-wider">Payment Method:</span>
              <span className="text-sm font-extrabold uppercase">Cash On Delivery (COD)</span>
            </div>

            <div className="flex justify-between items-center text-primary-dark bg-primary-subtle p-3 rounded-xl border border-primary-light">
              <span className="text-xs font-bold uppercase tracking-wider">Grand Total (COD):</span>
              <span className="text-lg font-extrabold">{toDisplay(orderTotal)}</span>
            </div>
          </div>

          <div className="text-xs font-bold text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-md mx-auto">
            💬 Hinglish updates: Ek order confirmation message aapke WhatsApp number <span className="text-[var(--color-text-primary)] font-extrabold">{phone}</span> par bhej diya gaya hai. Nagpur city limits ke andar 24 ghante mein delivery active hai!
          </div>

          <div className="flex gap-4">
            <Button onClick={() => router.push('/catalog')} variant="primary" className="flex-1">
              Aur Shopping Karein 👓
            </Button>
            <Button onClick={() => router.push('/')} variant="secondary" className="flex-grow">
              Wapas Home Jao
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  // Cart Empty Screen
  if (items.length === 0) {
    return (
      <main className="pt-32 pb-32 max-w-2xl mx-auto px-5 min-h-[80vh] flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-border)] shadow-sm flex flex-col items-center gap-6 w-full"
        >
          <div className="w-20 h-20 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] rounded-full flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tighter">
            Aapka Cart Khaali Hai! 🛒
          </h2>
          <p className="text-base font-semibold text-[var(--color-text-secondary)] max-w-md leading-relaxed">
            Lagta hai aapne abhi tak koi trendy eyeframe select nahi kiya hai. Nagpur ki sabse stylish collection dekhne ke liye catalog page visit karein.
          </p>
          <Button onClick={() => router.push('/catalog')} variant="primary" className="mt-2 px-8">
            Browse Catalog 👓✨
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <>
      <AnimatePresence>
        {checkoutStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-6 text-center"
          >
            {checkoutStatus === 'placing' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center gap-6"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-teal-600/20 border-t-teal-600 border-r-teal-600 rounded-full animate-spin" />
                  <span className="text-3xl">🛍️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Aapka Order Place Ho Raha Hai...</h3>
                  <p className="text-sm font-semibold text-slate-500 max-w-xs leading-relaxed font-sans">Optics Vision Nagpur limits ke andar premium delivery secure kar raha hai.</p>
                </div>
              </motion.div>
            )}

            {checkoutStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-6"
              >
                <div className="w-28 h-28 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                    className="absolute inset-0 bg-emerald-500 rounded-full"
                  />
                  <svg
                    className="w-14 h-14 text-white z-10 stroke-[4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-tighter mb-2">Successfully Placed! 🎉</h3>
                  <p className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full inline-block border border-emerald-100 font-sans">
                    Aapka slot and order secure ho chuka hai.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-28 pb-32 max-w-7xl mx-auto px-5 md:px-16 min-h-screen">
      <div className="mb-10">
        <span className="text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">
          Your Selected Items 🛒
        </span>
        <h2 className="text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tighter">
          Shopping Cart & Checkout
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Cart Items List & Delivery Form */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Cart Items List */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              1. Review Selection ({itemCount} Item{itemCount > 1 ? 's' : ''})
            </h3>
            
            <div className="flex flex-col gap-4 max-h-[480px] overflow-y-auto pr-2 no-scrollbar">
              <AnimatePresence initial={false}>
                {items.map((item) => {
                  const itemPriceWithLens = item.price + (item.lensPrice || 0);
                  const totalItemPrice = itemPriceWithLens * item.qty;

                  return (
                    <motion.div
                      key={`${item.frameId}-${item.lensType || 'none'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="bg-white rounded-3xl p-4 sm:p-5 border border-[var(--color-border)] shadow-xs flex flex-col gap-4 group hover:border-[var(--color-primary-light)] transition-all duration-300"
                    >
                      {/* Top Row: Adjacent Image and Info */}
                      <div className="flex gap-4 items-start w-full">
                        {/* Product Image */}
                        <div className="w-24 h-18 sm:w-28 sm:h-21 shrink-0 rounded-2xl overflow-hidden bg-slate-50 relative border border-[var(--color-border)]">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-xs font-bold text-slate-400">
                              No Image
                            </div>
                          )}
                        </div>

                        {/* Product Details (Adjacent to Image) */}
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-base sm:text-lg font-extrabold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors leading-snug truncate">
                              {item.name}
                            </h4>
                            <span className="font-extrabold text-[var(--color-primary)] text-sm sm:text-base whitespace-nowrap">
                              {toDisplay(itemPriceWithLens)}
                            </span>
                          </div>

                          {/* Selected Lens Option tag */}
                          {item.lensType ? (
                            <p className="text-[10px] sm:text-xs font-semibold text-[var(--color-text-secondary)] mt-1.5 inline-flex items-center gap-1 bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-2.5 py-0.5 rounded-lg text-[var(--color-primary-dark)]">
                              ⚡ {item.lensType} (+{toDisplay(item.lensPrice || 0)})
                            </p>
                          ) : (
                            <p className="text-[11px] sm:text-xs font-semibold text-[var(--color-text-secondary)] mt-1.5">
                              Premium Glass & Frame Only
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bottom Row: Qty Pill & Delete Button */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
                        <div className="flex items-center gap-3.5 bg-slate-50 px-4 py-1.5 rounded-full border border-[var(--color-border)] shadow-xs">
                          <button
                            type="button"
                            onClick={() => updateQty(item.frameId, item.qty - 1)}
                            className="active:scale-75 transition-transform cursor-pointer text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                            title="Kam karein"
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                          <span className="font-extrabold text-sm w-5 text-center text-[var(--color-text-primary)]">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.frameId, item.qty + 1)}
                            className="active:scale-75 transition-transform cursor-pointer text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                            title="Badhayein"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.frameId)}
                          className="text-[var(--color-danger)] hover:text-red-700 flex items-center gap-1 active:scale-95 transition-all font-bold text-xs cursor-pointer bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl border border-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hatao</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Delivery Form */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              2. Delivery Address (Cash On Delivery)
            </h3>
            
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-5 bg-white p-6 md:p-8 rounded-3xl border border-[var(--color-border)] shadow-xs">
              <Input
                label="Aapka Name (Full Name)"
                placeholder="e.g. Nayan Sharma"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                error={errors.name}
                required
              />

              <Input
                label="Delivery Address (Ghar / Flat ka address)"
                placeholder="e.g. House No 42, Near Hanuman Mandir, Dharampeth"
                value={addressLine}
                onChange={(e) => {
                  setAddressLine(e.target.value);
                  if (errors.address) setErrors({ ...errors, address: '' });
                }}
                error={errors.address}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-text-secondary)]">City</label>
                  <input
                    type="text"
                    value="Nagpur"
                    disabled
                    className="bg-slate-50 border border-[var(--color-border)] rounded-xl px-4 py-3 text-base text-[var(--color-text-secondary)] font-extrabold cursor-not-allowed outline-none min-h-[48px]"
                  />
                </div>

                <Input
                  label="Nagpur Pincode"
                  placeholder="e.g. 440010"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, ''));
                    if (errors.pincode) setErrors({ ...errors, pincode: '' });
                  }}
                  error={errors.pincode}
                  required
                />
              </div>

              <Input
                label="WhatsApp Mobile Number"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ''));
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                error={errors.phone}
                helperText="Isi number par delivery updates and WhatsApp message bhejenge."
                required
              />
            </form>
          </div>

        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-[var(--color-border)] shadow-md">
            <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4 mb-6">
              Order Summary 🗒️
            </h3>
            
            <div className="flex flex-col gap-4 mb-6 text-sm font-semibold">
              <div className="flex justify-between items-center text-[var(--color-text-secondary)]">
                <span>Subtotal ({itemCount} Item{itemCount > 1 ? 's' : ''})</span>
                <span className="text-[var(--color-text-primary)] font-extrabold">{toDisplay(subtotal)}</span>
              </div>
              
              <div className="flex justify-between items-center text-[var(--color-text-secondary)]">
                <span>GST (18% - GST Included)</span>
                <span className="text-[var(--color-text-primary)] font-extrabold">₹0</span>
              </div>
              
              <div className="flex justify-between items-center text-[var(--color-text-secondary)]">
                <span>Delivery Charge</span>
                <span className="text-[var(--color-primary)] font-extrabold uppercase">FREE</span>
              </div>
              
              <div className="pt-4 border-t border-[var(--color-border)] flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
                    Grand Total (COD)
                  </p>
                  <p className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tighter">
                    {toDisplay(subtotal)}
                  </p>
                </div>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--color-cta)] hover:bg-[var(--color-cta-dark)] text-white font-extrabold py-4 rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 group text-base shadow-md disabled:opacity-50 disabled:pointer-events-none cursor-pointer uppercase tracking-wider"
            >
              {isSubmitting ? 'Order Process Ho Raha...' : 'Order Place Karo'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[var(--color-text-secondary)]">
              <ShieldCheck className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
              <p className="text-[11px] font-bold text-center">Nagpur City Limits: Delivered within 24 Hours guaranteed.</p>
            </div>
          </div>

          <div className="mt-6 p-5 bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] rounded-3xl border border-[var(--color-primary-light)]">
            <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1.5">Local Orange City Advantage</p>
            <p className="text-xs italic font-semibold opacity-90 leading-relaxed">
              &quot;Nagpur ke verified opticians aapko home-trial aur absolute quality guarantee dete hain. Order ke baad direct team aapse coordination karegi.&quot;
            </p>
          </div>
        </div>
      </div>
    </main>
  </>
  );
}
