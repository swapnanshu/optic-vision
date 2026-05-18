import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';

const FACE_SHAPES = [
  {
    id: 'oval',
    name: 'Oval Face Shape 🥚',
    desc: 'Versatile aur balanced outline. Aapka face slightly elongated hai aur jawline rounded hai. Nagpur creatives ka sabse flexible look!',
    bestStyles: ['aviator', 'square', 'wayfarer', 'rectangle'],
    avoid: 'Extremely oversized frames jo balanced features ko hide karein.',
    emoji: '🥚',
  },
  {
    id: 'round',
    name: 'Round Face Shape 🟡',
    desc: 'Soft angles aur equal width-height layout. Chehre par rectangular ya square designs sharpness add karte hain aur chehra sleek lagta hai.',
    bestStyles: ['square', 'rectangle', 'clubmaster'],
    avoid: 'Small round frames jo cheeks ko extra spherical look dete hain.',
    emoji: '🟡',
  },
  {
    id: 'square',
    name: 'Square Face Shape 🔲',
    desc: 'Strong, defined angles aur prominent jawline. Round ya cat-eye shapes face lines ko beautifully soften aur balance karte hain.',
    bestStyles: ['round', 'aviator', 'cat-eye'],
    avoid: 'Sharp square frames jo chehre ke sharp structures ko excessively highlight karein.',
    emoji: '🔲',
  },
  {
    id: 'heart',
    name: 'Heart Face Shape ❤️',
    desc: 'Chauras forehead aur narrow chin layout. Bottom-heavy styles ya clubmaster designs jawline lines ko support karte hain.',
    bestStyles: ['round', 'wayfarer', 'clubmaster', 'cat-eye'],
    avoid: 'Top-heavy designs jo forehead area ko and narrow point ko extra contrast dein.',
    emoji: '❤️',
  },
  {
    id: 'diamond',
    name: 'Diamond Face Shape 💎',
    desc: 'Chauras cheekbones aur narrow forehead & jawline lines. Cat-eye aur oval frames cheekbones ke structure ko beautifully suit karte hain.',
    bestStyles: ['cat-eye', 'oval', 'round', 'clubmaster'],
    avoid: 'Narrow rectangle designs jo features ki natural width ko mismatch karein.',
    emoji: '💎',
  },
];

export default function FaceShapeGuidePage() {
  return (
    <main className="pt-32 pb-32 max-w-5xl mx-auto px-5 md:px-16 min-h-screen">
      {/* Title Header */}
      <section className="mb-12 text-center">
        <span className="text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] border border-[var(--color-primary-light)] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">
          Face Guide 👓
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tighter">
          Apne Face Shape ke hisab se frame chunein
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto font-semibold leading-relaxed">
          Har face unique hota hai! Nagpur ki dhoop aur dukan ke sabse best frames ko apne face shape ke sath match karein.
        </p>
      </section>

      {/* Guide Cards */}
      <div className="flex flex-col gap-10 mb-16">
        {FACE_SHAPES.map((face) => (
          <Card key={face.id} hoverable={false} className="p-8 border border-[var(--color-border)] shadow-xs relative overflow-hidden">
            {/* Visual background element */}
            <div className="absolute right-6 top-6 text-7xl opacity-20 pointer-events-none">
              {face.emoji}
            </div>

            <div className="max-w-2xl">
              <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-4">
                {face.name}
              </h3>
              <p className="text-sm md:text-base font-semibold text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {face.desc}
              </p>

              {/* Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest block mb-1">
                    🟢 Recommended Styles:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {face.bestStyles.map((style) => (
                      <span key={style} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-2.5 py-1 rounded-lg font-bold capitalize">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
                  <span className="text-[10px] font-extrabold text-red-800 uppercase tracking-widest block mb-1">
                    🔴 Avoid States:
                  </span>
                  <p className="text-xs text-red-700 font-semibold mt-1">
                    {face.avoid}
                  </p>
                </div>
              </div>

              {/* Action Filter Button */}
              <Link
                href={`/catalog?faceShape=${face.id}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
              >
                <span>Browse frames for {face.id} face</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Box */}
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
