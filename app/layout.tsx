import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Geist } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'NayanStore',
  description: "Nagpur's Finest Eyewear",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="font-sans antialiased text-on-background bg-background md:pb-0" suppressHydrationWarning>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
