'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, PieChart, ArrowLeft, MoreHorizontal, MessageSquare, Briefcase } from 'lucide-react';
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
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-full bg-slate-100/50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
            title="Go Back"
          >
            <ArrowLeft size={20} />
          </Button>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-800 dark:text-white hidden sm:block">Apna<span className="text-emerald-600 dark:text-emerald-400">CFO</span></span>
          </Link>
        </div>

        <div className="flex items-center gap-1 md:gap-3 bg-white/50 dark:bg-slate-900/50 p-1 md:p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm shadow-sm hidden md:flex">
          <NavLink href="/" icon={<Home size={18} />} label="Home" active={pathname === '/'} />
          <NavLink href="/dashboard" icon={<PieChart size={18} />} label="Portfolio" active={pathname === '/dashboard'} />
          <NavLink href="/booking" icon={<Briefcase size={18} />} label="Services" active={pathname === '/booking'} />
        </div>

        <div className="flex items-center gap-3">
          <div className="md:hidden flex gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400">
                 <PieChart size={20} />
              </Button>
            </Link>
          </div>
          
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
