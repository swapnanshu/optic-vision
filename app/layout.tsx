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
  title: "Optic Vision",
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
        <meta name="apple-mobile-web-app-title" content="Optic Vision" />

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
          className="fixed bottom-28 right-6 md:bottom-6 md:right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba56] hover:scale-110 active:scale-95 transition-all duration-150 flex items-center justify-center"
          title="Chat on WhatsApp"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-8 h-8 fill-white"
          >
            <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.762.463 3.417 1.277 4.856L2 22l5.302-1.226c1.39.774 2.974 1.23 4.702 1.23 5.524 0 10.004-4.48 10.004-10.004C22.008 6.48 17.528 2 12.004 2zm5.682 14.303c-.247.696-1.203 1.272-1.657 1.328-.396.048-.912.084-2.52-.556-2.064-.82-3.376-2.916-3.48-3.056-.104-.136-.832-1.108-.832-2.112 0-1.004.524-1.496.712-1.7.188-.204.412-.256.548-.256.136 0 .272.004.388.008.12.004.284-.044.444.34.164.396.564 1.376.612 1.472.048.096.08.208.016.336-.064.128-.096.208-.192.32-.096.112-.204.252-.292.348-.1.108-.204.224-.088.424.116.196.516.852 1.108 1.38.764.68 1.408.892 1.612.98.204.088.324.076.444-.064.12-.14.516-.6.656-.804.14-.204.28-.168.472-.096.192.072 1.22.576 1.428.68.208.104.348.156.396.24.048.084.048.5-.2 1.196z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
