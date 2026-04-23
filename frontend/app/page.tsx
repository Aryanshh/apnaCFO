'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-teal-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      {/* Main Content */}
      <div className="max-w-4xl text-center space-y-16 relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
        
        {/* Quote Block */}
        <div className="space-y-6">
          <div className="mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shadow-lg border border-emerald-200 dark:border-emerald-800/50 mb-8">
            <span className="text-4xl font-serif">"</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-800 dark:text-white leading-[1.1] tracking-tight">
            Wealth is not about having a lot of money; <br/>
            it's about having a lot of <span className="text-emerald-600 dark:text-emerald-400 underline decoration-emerald-200 dark:decoration-emerald-900 underline-offset-8">options.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mt-6">
            Meet Apna CFO, the intelligent advisor built for Bharat. Secure your assets and explore your financial freedom today.
          </p>
        </div>

        {/* Start Chatting Button */}
        <div className="pt-8">
          <Link href="/chat">
            <button className="group px-12 py-6 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white rounded-full font-extrabold text-xl md:text-2xl shadow-xl shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center mx-auto border-4 border-transparent hover:border-emerald-500/30">
              Start Chatting
              <span className="text-xs font-bold text-slate-400 dark:text-emerald-200 mt-2 tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">Powered by Gen-AI</span>
            </button>
          </Link>
        </div>
        
      </div>
    </main>
  );
}
