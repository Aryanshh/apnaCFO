'use client';

import LanguageSelector from '@/components/LanguageSelector';
import { useRouter } from 'next/navigation';

export default function SelectLanguage() {
  const router = useRouter();
  
  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative flex items-center justify-center p-6 overflow-hidden">
       {/* Background Graphic & Blur overlay */}
       <div className="absolute inset-0 bg-slate-100/30 dark:bg-slate-900/30 backdrop-blur-2xl -z-10" />
       <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl -z-20 pointer-events-none animate-pulse" />
       <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-20 pointer-events-none" />
       
       {/* Inject the exact same UI as before, but wrapped gracefully */}
       <div className="z-10 w-full max-w-4xl p-10 bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[3rem] shadow-2xl">
         <h2 className="text-2xl font-black text-center text-slate-800 dark:text-white mb-8 tracking-wide uppercase">Setup Protocol</h2>
         <LanguageSelector onSelect={(lang) => router.push(`/home?lang=${lang}`)} />
       </div>
    </div>
  )
}
