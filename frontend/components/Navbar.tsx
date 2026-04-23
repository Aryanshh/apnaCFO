'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, PieChart, ArrowLeft, MoreHorizontal, MessageSquare, Briefcase, Calculator, ShieldAlert, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener for glass effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 py-2 md:py-3' 
          : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          {pathname !== '/' && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-full bg-slate-100/50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
              title="Go Back"
            >
              <ArrowLeft size={20} />
            </Button>
          )}

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-800 dark:text-white hidden lg:block">Apna<span className="text-emerald-600 dark:text-emerald-400">CFO</span></span>
          </Link>
        </div>

        <div className="flex items-center gap-0.5 md:gap-1.5 lg:gap-3 bg-white/50 dark:bg-slate-900/50 p-1 md:p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm shadow-sm hidden md:flex overflow-x-auto whitespace-nowrap hide-scrollbar max-w-[60vw]">
          <NavLink href="/" icon={<Home size={16} />} label="Home" active={pathname === '/'} />
          <NavLink href="/dashboard" icon={<PieChart size={16} />} label="Portfolio" active={pathname === '/dashboard'} />
          <NavLink href="/booking" icon={<Briefcase size={16} />} label="Services" active={pathname === '/booking'} />
          <NavLink href="/calculators/portfolio" icon={<Calculator size={16} />} label="Return Calculator" active={pathname === '/calculators/portfolio'} />
          <NavLink href="/calculators/risk" icon={<ShieldAlert size={16} />} label="Risk Calculator" active={pathname === '/calculators/risk'} />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="md:hidden flex gap-2">
            <Link href="/calculators/portfolio">
              <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400">
                 <Calculator size={20} />
              </Button>
            </Link>
          </div>
          
          {typeof window !== 'undefined' && document.cookie.includes('apna_cfo_session') ? (
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <User size={20} />
              </Button>
            </Link>
          ) : (
            <Link href="/auth">
              <Button className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold px-5 text-sm hidden sm:flex transition-transform hover:scale-105 active:scale-95 shadow-md">
                Secure Login
              </Button>
            </Link>
          )}

          <ThemeToggle />
          
          <Button variant="outline" size="icon" className="md:hidden border-slate-200 dark:border-slate-800 rounded-full text-slate-600 dark:text-slate-400">
             <MoreHorizontal size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
        active 
          ? 'bg-emerald-600 text-white shadow-md' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400'
      }`}>
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
}
