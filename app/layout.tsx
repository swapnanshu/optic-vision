import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/components/ui/Toast";
import { MessageCircle } from "lucide-react";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Optics Vision",
  description:
    "Nagpur ki premium optical boutique — trendy frames, eye tests & custom lenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", jakarta.variable)}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#0D9488" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Optics Vision" />

        {/* Inline script to register custom service worker on client load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
        `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="relative min-h-screen">
        <ToastProvider />
        <Navigation />
        {children}

        {/* Global WhatsApp FAB */}
        <a
          href="https://wa.me/919511696861?text=Hello%20Optic%20Vision%20Nagpur!%20Main%20eyewear%20designs%20ke%20baare%20mein%20poochhna%20chahta%20hoon."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-28 right-6 md:bottom-6 md:right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:bg-[#128C7E] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group animate-bounce-subtle"
          title="Chat on WhatsApp"
        >
          {/* Ambient Pulse Glow */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none group-hover:hidden"></span>

          {/* Authentic WhatsApp SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            className="w-8 h-8 z-10 transition-transform duration-300 group-hover:rotate-12"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
