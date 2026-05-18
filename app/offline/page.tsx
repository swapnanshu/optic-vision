'use client';

import { WifiOff, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main className="pt-32 pb-32 max-w-md mx-auto px-5 min-h-screen flex flex-col justify-center items-center text-center">
      <div className="p-6 bg-red-50 text-[var(--color-danger)] rounded-full border border-red-100 mb-6 animate-pulse">
        <WifiOff className="w-16 h-16 stroke-[2]" />
      </div>

      <h1 className="text-4xl font-extrabold text-[var(--color-text-primary)] mb-3 tracking-tighter">
        Net nahi hai? 📶❌
      </h1>
      
      <p className="text-base font-semibold text-[var(--color-text-secondary)] mb-8 leading-relaxed max-w-sm">
        Nagpur ke weather ki tarah internet bhi thoda down lag raha hai! Kripya apna network connections check karein aur dobara try karein.
      </p>

      <Button onClick={handleReload} variant="primary" className="flex items-center gap-2.5 px-8">
        <RotateCw className="w-4 h-4" />
        <span>Try Again</span>
      </Button>
    </main>
  );
}
