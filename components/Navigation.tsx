'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, LayoutGrid, Calendar, User, ShoppingBag, Menu, 
  Package, LayoutDashboard, ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

export default function Navigation() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  if (pathname.startsWith('/admin')) {
    return (
      <>
        {/* Admin Desktop Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 h-screen overflow-y-auto hidden md:flex flex-col bg-surface w-80 border-r border-outline-variant shadow-sm py-10">
           <div className="px-8 mb-10">
              <h1 className="text-2xl font-extrabold text-primary mb-1 tracking-tight">Optical Admin</h1>
              <p className="text-sm font-bold text-on-surface-variant opacity-70">Nagpur Central Branch</p>
           </div>
           <nav className="px-5 space-y-2 flex-grow">
              <AdminNavItem href="/admin" icon={LayoutDashboard} label="Dashboard" active={pathname === '/admin'} />
              <AdminNavItem href="/admin/catalog" icon={Package} label="Inventory" active={pathname === '/admin/catalog'} />
              <AdminNavItem href="#" icon={User} label="Patients" />
              <AdminNavItem href="#" icon={ShoppingBag} label="Sales" />
           </nav>
        </aside>
        
        {/* Admin Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface-container/95 backdrop-blur-md rounded-t-2xl shadow-lg border-t border-outline-variant md:hidden">
          <NavItem href="/admin" icon={Home} label="Home" active={pathname === '/admin'} />
          <NavItem href="/admin/catalog" icon={Package} label="Inventory" active={pathname === '/admin/catalog'} />
          <NavItem href="#" icon={Calendar} label="Calendar" />
          <NavItem href="#" icon={Menu} label="Menu" />
        </nav>
      </>
    );
  }

  // Retail Navigation
  const isCheckout = pathname === '/checkout';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md flex justify-between items-center px-5 md:px-16 py-4 h-20 border-b border-outline-variant/30 text-primary">
        <div className="flex items-center gap-4">
          {(isCheckout || pathname.startsWith('/product/')) && (
            <Link href={isCheckout ? "/catalog" : "/catalog"} className="active:scale-90 transition-transform">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          )}
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Optic Vision</h1>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/checkout" className="active:scale-90 transition-transform relative">
            <ShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-primary)] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>
          <Link href="/admin" className="active:scale-90 transition-transform hidden md:block">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </header>

      {!isCheckout && (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface/80 backdrop-blur-md pb-6 pt-3 px-4 shadow-[0_-4px_20px_0_rgba(13,148,136,0.08)] border-t border-[var(--color-border)]/50 rounded-t-[2rem] md:hidden">
          <NavItem href="/" icon={Home} label="Home" active={pathname === '/'} />
          <NavItem href="/catalog" icon={LayoutGrid} label="Catalog" active={pathname === '/catalog' || pathname.startsWith('/catalog/')} />
          <NavItem href="/appointments" icon={Calendar} label="Book" active={pathname === '/appointments'} />
          <NavItem href="/admin" icon={User} label="Account" active={pathname === '/admin'} />
        </nav>
      )}
    </>
  );
}

function NavItem({ href, icon: Icon, label, active }: { href: string, icon: any, label: string, active?: boolean }) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center relative w-16 group active:scale-90 transition-transform">
      {active && (
        <motion.div 
          layoutId="active-pill" 
          className="absolute inset-0 bg-primary-container rounded-full w-16 h-10 -z-10 -mt-1 shadow-sm" 
        />
      )}
      <Icon className={`w-5 h-5 ${active ? 'text-on-primary-container' : 'text-on-surface-variant group-hover:text-primary'}`} />
      <span className={`text-[11px] mt-1.5 font-bold ${active ? 'text-on-primary-container' : 'text-on-surface-variant group-hover:text-primary'}`}>{label}</span>
    </Link>
  )
}

function AdminNavItem({ href, icon: Icon, label, active }: { href: string, icon: any, label: string, active?: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all active:scale-95 ${active ? 'bg-primary-container text-on-primary-container font-extrabold shadow-sm' : 'text-on-surface-variant hover:bg-secondary-container font-bold'}`}>
       <Icon className="w-5 h-5" />
       <span>{label}</span>
    </Link>
  )
}
