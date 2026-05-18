import type {Metadata} from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import { cn } from "@/lib/utils";
import { ToastProvider } from '@/components/ui/Toast';
import { MessageCircle } from 'lucide-react';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Optic Vision',
  description: "Nagpur ki premium optical boutique — trendy frames, eye tests & custom lenses",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", jakarta.variable)}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#0D9488" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Optic Vision" />
        
        {/* Inline script to register custom service worker on client load */}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').then(
                function(reg) {
                  console.log('PWA ServiceWorker registered successfully under scope: ', reg.scope);
                },
                function(err) {
                  console.log('PWA ServiceWorker registration failed: ', err);
                }
              );
            });
          }
        `}} />
      </head>
      <body suppressHydrationWarning className="relative min-h-screen">
        <ToastProvider />
        <Navigation />
        {children}
        
        {/* Global WhatsApp FAB */}
        <a
          href="https://wa.me/919876543210?text=Hello%20Optic%20Vision%20Nagpur!%20Main%20eyewear%20designs%20ke%20baare%20mein%20poochhna%20chahta%20hoon."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-28 right-6 md:bottom-6 md:right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20ba56] hover:scale-110 active:scale-95 transition-all duration-150 flex items-center justify-center"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </body>
    </html>
  );
}



