import Link from 'next/link';
import { Eye, Shield, Cpu, Sun, Glasses, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';

const LENS_GUIDES = [
  {
    id: 'single-vision',
    name: 'Single Vision (Standard)',
    icon: <Eye className="w-10 h-10 text-[var(--color-primary)]" />,
    priceRange: '₹999 - ₹1,499',
    desc: 'Simple and crystal clear. Distance dekhne ke liye ya reading ke liye perfect lenses.',
    tip: 'Perfect for everyday reading and driving.',
  },
  {
    id: 'blue-cut',
    name: 'Blue Cut (Digital Guard)',
    icon: <Shield className="w-10 h-10 text-amber-500" />,
    priceRange: '₹1,499 - ₹2,499',
    desc: 'Laptop aur phone screens ki harmful blue light ko block karke eye fatigue aur strain se bachaye.',
    tip: 'Must-have for IT professionals and heavy screen users in Nagpur.',
  },
  {
    id: 'progressive',
    name: 'Progressive (No-Line Bifocal)',
    icon: <Cpu className="w-10 h-10 text-emerald-500" />,
    priceRange: '₹2,499 - ₹4,999',
    desc: 'Distance, intermediate, aur reading — sab ek lens mein. Bina kisi visible line ke multi-focal view.',
    tip: 'Super smooth transitions for ages 40+.',
  },
  {
    id: 'photochromic',
    name: 'Photochromic (Sun-Sensors)',
    icon: <Sun className="w-10 h-10 text-orange-500" />,
    priceRange: '₹1,999 - ₹3,499',
    desc: 'Indoors bilkul clear aur dhoop mein jaate hi automatic black shades ho jaate hain. 2-in-1 lens protection.',
    tip: 'Great for active lifestyles and switching between indoor/outdoor Nagpur heat.',
  },
  {
    id: 'anti-glare',
    name: 'Anti-Glare (Clear View)',
    icon: <Glasses className="w-10 h-10 text-teal-500" />,
    priceRange: '₹799 - ₹1,299',
    desc: 'Raat ko driving karte waqt high-beam headlights ki reflection ko kam kare. Clear reflections, better photos.',
    tip: 'Highly recommended for night-time two-wheeler riders.',
  },
];

export default function LensesPage() {
  return (
    <main className="pt-32 pb-32 max-w-6xl mx-auto px-5 md:px-16 min-h-screen">
      {/* Title */}
      <section className="mb-12 text-center">
        <span className="text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">
          Lens Guide 📖
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tighter">
          Aapki aankhon ke liye perfect lens
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto font-semibold leading-relaxed">
          NayanStore Nagpur mein premium lens design aur coatings choose karein. Kis kaam ke liye kaunsa lens sahi hai, yahan samjhein.
        </p>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {LENS_GUIDES.map((lens) => (
          <Card key={lens.id} hoverable className="flex flex-col justify-between h-full p-6 md:p-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-[var(--color-primary-subtle)] rounded-2xl border border-[var(--color-primary-light)]">
                  {lens.icon}
                </div>
                <span className="text-sm font-extrabold text-[var(--color-primary)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-3 py-1 rounded-xl">
                  {lens.priceRange}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-3">
                {lens.name}
              </h3>
              <p className="text-sm md:text-base font-semibold text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {lens.desc}
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <p className="text-xs font-bold text-[var(--color-text-primary)] mb-4">
                💡 Tip: {lens.tip}
              </p>
              <Link href={`/catalog?lens=${lens.id}`} className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[var(--color-primary)] hover:underline">
                <span>Browse frames compatible with this lens</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* General Call to Action */}
      <section className="bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] rounded-3xl p-8 text-center flex flex-col items-center gap-5">
        <h2 className="text-2xl font-extrabold text-[var(--color-primary-dark)]">
          Free digital eye check-up chahiye?
        </h2>
        <p className="text-sm md:text-base font-bold text-[var(--color-text-secondary)] max-w-xl">
          NayanStore in Nagpur me certified optometrists se digital eye checkup karwayein. Appointment book karna bilkul free hai!
        </p>
        <Link href="/appointments">
          <Button variant="primary">
            Book Eye Test Now 📅
          </Button>
        </Link>
      </section>
    </main>
  );
}
