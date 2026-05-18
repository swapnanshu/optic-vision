'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { Calendar, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/firebase/firebase';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { toast } from '@/components/ui/Toast';
import { toDisplay } from '@/lib/utils/price';

// Nagpur Pincodes listed in Settings (PRD Section 7.6)
const NAGPUR_PINCODES = [
  '440001', '440002', '440003', '440004', '440005', '440006', '440007', '440008',
  '440009', '440010', '440011', '440012', '440013', '440014', '440015', '440016',
  '440017', '440018', '440019', '440020', '440021', '440022', '440023', '440024',
  '440025', '440026', '440027', '440028', '440029', '440030', '440033', '440034',
  '440035'
];

const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30'
];

export default function AppointmentsPage() {
  const router = useRouter();

  // Step state: 'booking' | 'confirming' | 'completed'
  const [step, setStep] = useState<'booking' | 'completed'>('booking');

  // Form Fields
  const [testType, setTestType] = useState<'store-test' | 'home-test'>('store-test');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [addressLine, setAddressLine] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedBookingId, setPlacedBookingId] = useState<string>('');

  // Get tomorrow's date for date-picker min limit
  const tomorrowStr = useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  }, []);

  const handleValidation = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedDate) newErrors.date = 'Date select karna zaroori hai!';
    if (!selectedTime) newErrors.time = 'Time slot select karna zaroori hai!';

    if (!name.trim() || name.trim().length < 3) {
      newErrors.name = 'Please enter a valid name (minimum 3 characters).';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (testType === 'home-test') {
      if (!addressLine.trim()) {
        newErrors.address = 'Home eye test ke liye address zaroori hai!';
      }
      if (!NAGPUR_PINCODES.includes(pincode.trim())) {
        newErrors.pincode = 'Home eye test sirf select Nagpur pincodes mein available hai (e.g. 440001 - 440035).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) {
      toast.error('Kripya form errors check karein!');
      return;
    }

    setIsSubmitting(true);

    const feeAmount = testType === 'home-test' ? 19900 : 0; // ₹199 in paise or ₹0

    const appointmentPayload = {
      userId: null,
      customerName: name.trim(),
      phone: phone.trim(),
      type: testType,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      status: 'pending',
      address: testType === 'home-test' ? {
        line1: addressLine.trim(),
        city: 'Nagpur',
        pincode: pincode.trim(),
      } : null,
      fee: feeAmount,
      feeStatus: testType === 'home-test' ? 'pending' : null,
      notes: notes.trim() || null,
      reminderSent: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    try {
      if (db) {
        // Save to Firestore
        const docRef = await addDoc(collection(db, 'appointments'), appointmentPayload);
        setPlacedBookingId(docRef.id);
      } else {
        // Fallback for local testing without Firebase configuration
        const randomId = 'MOCK_APT_' + Math.random().toString(36).substr(2, 9).toUpperCase();
        setPlacedBookingId(randomId);
        // Save mock data locally to display in admin panel if needed
        const existingLocal = JSON.parse(localStorage.getItem('local_appointments') || '[]');
        existingLocal.push({ id: randomId, ...appointmentPayload, createdAt: new Date().toISOString() });
        localStorage.setItem('local_appointments', JSON.stringify(existingLocal));
      }

      toast.success('Appointment booking successful! 🎉');
      setStep('completed');
    } catch (err) {
      console.error('Appointment booking failed:', err);
      toast.error('Booking complete nahi ho payi. Dobara try karein.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'completed') {
    return (
      <main className="pt-32 pb-32 max-w-2xl mx-auto px-5 min-h-screen flex flex-col justify-center items-center">
        <Card hoverable={false} className="w-full p-8 md:p-10 border border-[var(--color-primary-light)] bg-white text-center shadow-lg relative overflow-hidden">
          {/* Confetti decoration */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal-500 via-amber-500 to-teal-500" />
          
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-[var(--color-primary)] stroke-[2.5]" />
          </div>

          <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-3 tracking-tighter">
            Appointment Book Ho Gaya!
          </h2>
          <p className="text-base font-semibold text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-4 py-2 rounded-xl inline-block mb-6">
            Booking ID: <span className="font-extrabold font-mono text-sm">{placedBookingId}</span>
          </p>

          <div className="text-left bg-slate-50 border border-[var(--color-border)] rounded-2xl p-6 mb-8 flex flex-col gap-4 text-sm font-semibold">
            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-text-secondary)]">Name:</span>
              <span className="text-[var(--color-text-primary)] font-extrabold">{name}</span>
            </div>
            
            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-text-secondary)]">Test Type:</span>
              <Badge variant={testType === 'store-test' ? 'brand' : 'warning'}>
                {testType === 'store-test' ? 'In-Store Eye Test' : 'Home Eye Test'}
              </Badge>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-text-secondary)]">Date & Time:</span>
              <span className="text-[var(--color-text-primary)] font-extrabold">
                {selectedDate} ko @ {selectedTime}
              </span>
            </div>

            {testType === 'home-test' && (
              <>
                <div className="flex justify-between items-start pb-3 border-b border-[var(--color-border)]">
                  <span className="text-[var(--color-text-secondary)]">Address:</span>
                  <span className="text-[var(--color-text-primary)] font-extrabold text-right max-w-xs">
                    {addressLine}, Nagpur - {pincode}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold">Home Test Fee (Collected at visit):</span>
                  </div>
                  <span className="text-sm font-extrabold">{toDisplay(19900)}</span>
                </div>
              </>
            )}

            {testType === 'store-test' && (
              <div className="flex justify-between items-center text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                <span className="text-xs font-bold">In-Store Test Fee:</span>
                <span className="text-sm font-extrabold uppercase">FREE (₹0)</span>
              </div>
            )}
          </div>

          <div className="text-xs font-bold text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-md mx-auto">
            💬 Hinglish update: Ek WhatsApp confirmation text hum aapke number <span className="text-[var(--color-text-primary)] font-extrabold">{phone}</span> par bhej rahe hain. Optics Vision Nagpur team aapse confirm karne jald contact karegi!
          </div>

          <div className="flex gap-4">
            <Button onClick={() => router.push('/catalog')} variant="primary" className="flex-1">
              Shop Eyewear 👓
            </Button>
            <Button onClick={() => router.push('/')} variant="secondary" className="flex-grow">
              Wapas Home Jao
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-32 max-w-4xl mx-auto px-5 min-h-screen">
      {/* Title Header */}
      <section className="mb-10 text-center">
        <span className="text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">
          Eye Check-up 📅
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tighter">
          Apna Eye Test Slot book karein
        </h1>
        <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto font-semibold leading-relaxed">
          Nagpur ke certified optometrists se premium eye checkup. Free in-store visit karein ya ₹199 me home eye checkup karwayein.
        </p>
      </section>

      <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Select Test Type & Slot */}
        <div className="md:col-span-7 flex flex-col gap-6">
          
          {/* Test Type Selectors */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">
              1. Choose Eye Test Mode:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTestType('store-test')}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                  testType === 'store-test'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] shadow-xs scale-102'
                    : 'border-[var(--color-border)] bg-white hover:bg-slate-50'
                }`}
              >
                <div className="text-3xl">🏬</div>
                <div className="font-extrabold text-sm text-[var(--color-text-primary)]">In-Store Test</div>
                <Badge variant="success">FREE</Badge>
              </button>

              <button
                type="button"
                onClick={() => setTestType('home-test')}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                  testType === 'home-test'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] shadow-xs scale-102'
                    : 'border-[var(--color-border)] bg-white hover:bg-slate-50'
                }`}
              >
                <div className="text-3xl">🏠</div>
                <div className="font-extrabold text-sm text-[var(--color-text-primary)]">Home Eye Test</div>
                <Badge variant="warning">₹199 fee</Badge>
              </button>
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
              <span>2. Select Date:</span>
            </label>
            <input
              type="date"
              min={tomorrowStr}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                if (errors.date) setErrors({ ...errors, date: '' });
              }}
              className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-base text-[var(--color-text-primary)] focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none min-h-[48px]"
            />
            {errors.date && <span className="text-xs text-[var(--color-danger)] font-bold">{errors.date}</span>}
          </div>

          {/* Time Slots grid */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--color-primary)]" />
              <span>3. Choose Time Slot:</span>
            </label>
            {!selectedDate ? (
              <p className="text-xs font-bold text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100">
                Pehle upar date select karein to check available time slots.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((time) => {
                  const displayTime = time.startsWith('12') || parseInt(time.split(':')[0]) < 12
                    ? `${time} AM`
                    : `${parseInt(time.split(':')[0]) - 12 || 12}:${time.split(':')[1]} PM`;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        setSelectedTime(time);
                        if (errors.time) setErrors({ ...errors, time: '' });
                      }}
                      className={`py-2 px-1 rounded-xl text-[10px] md:text-xs font-extrabold border text-center transition-all cursor-pointer ${
                        selectedTime === time
                          ? 'bg-[var(--color-primary)] text-white border-transparent scale-105'
                          : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-slate-50'
                      }`}
                    >
                      {displayTime}
                    </button>
                  );
                })}
              </div>
            )}
            {errors.time && <span className="text-xs text-[var(--color-danger)] font-bold">{errors.time}</span>}
          </div>
        </div>

        {/* Right Column: Customer Info Form */}
        <div className="md:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-[var(--color-border)] shadow-xs flex flex-col gap-6">
          <h3 className="text-lg font-extrabold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
            4. Personal Information
          </h3>

          <Input
            label="Aapka Name (Full Name)"
            placeholder="e.g. Nayan Sharma"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
          />

          <Input
            label="WhatsApp Mobile Number"
            placeholder="10-digit number"
            maxLength={10}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, ''));
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            error={errors.phone}
            helperText="Isi number par appointment updates bhejenge."
          />

          {testType === 'home-test' && (
            <>
              <Input
                label="Home Address"
                placeholder="Flat No, Wing, Area details"
                value={addressLine}
                onChange={(e) => {
                  setAddressLine(e.target.value);
                  if (errors.address) setErrors({ ...errors, address: '' });
                }}
                error={errors.address}
              />

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
                helperText="Sirf selected Nagpur pin codes (440001 - 440035) ke liye service hai."
              />
            </>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[var(--color-text-secondary)]">
              Koi details ya note? (Optional)
            </label>
            <textarea
              placeholder="Jaise lens power, eye problem details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-white border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none min-h-[80px]"
            />
          </div>

          <div className="border-t border-[var(--color-border)] pt-5">
            {testType === 'home-test' && (
              <div className="flex justify-between items-center font-extrabold mb-4 text-sm bg-slate-50 p-3.5 rounded-xl border border-[var(--color-border)]">
                <span className="text-[var(--color-text-secondary)]">Eye Checkup Charge:</span>
                <span className="text-[var(--color-primary-dark)]">{toDisplay(19900)}</span>
              </div>
            )}

            {testType === 'store-test' && (
              <div className="flex justify-between items-center font-extrabold mb-4 text-sm bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 text-emerald-800">
                <span>In-Store Eye Test:</span>
                <span>FREE (₹0)</span>
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              className="font-extrabold uppercase tracking-widest text-sm"
            >
              {isSubmitting ? 'Booking Slot...' : 'Book Appointment Now'}
            </Button>
          </div>
        </div>

      </form>
    </main>
  );
}
