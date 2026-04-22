'use client';

import React, { useState } from 'react';
import ChatWindow from '@/components/ChatWindow';
import LanguageSelector from '@/components/LanguageSelector';
import { FinanceNews } from '@/components/FinanceNews';
import { ServiceMenu } from '@/components/ServiceMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Globe, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<'landing' | 'chat' | 'fd' | 'portfolio'>('landing');

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === 'chat') setView('chat');
    else if (serviceId === 'fd') window.location.href = '/booking';
    else if (serviceId === 'portfolio') window.location.href = '/dashboard';
  };

  if (!selectedLanguage) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-500">
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        <div className="text-center mb-12 animate-in fade-in zoom-in duration-700">
          <h1 className="text-5xl font-black text-emerald-600 dark:text-emerald-400 mb-2">APNA CFO</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Desh ka Financial Advisor</p>
        </div>
        <LanguageSelector onSelect={setSelectedLanguage} />
      </main>
    );
  }

  const labels = {
    hi: {
      nav: 'डैशबोर्ड पर वापस जाएं',
      footer: '© 2024 अपना CFO. भारत के लिए ❤️ से बनाया गया।',
      header_title: 'अपना CFO',
      welcome: 'नमस्ते, आपका स्वागत है!',
      secure: 'सुरक्षित खाता',
      services_title: 'हमारी सेवाएँ',
      services_sub: '',
      banner_title: 'अब FD बुक करें सीधे चैट से!',
      banner_desc: 'डिजीलॉकर KYC के साथ, बुकिंग सिर्फ 2 मिनट में।',
      banner_btn: 'अभी शुरू करें',
      market_update: 'बाज़ार की जानकारी'
    },
    en: {
      nav: 'Back to Dashboard',
      footer: '© 2024 Apna CFO. Made with ❤️ for Bharat.',
      header_title: 'APNA CFO',
      welcome: 'Welcome, Nice to see you!',
      secure: 'SECURE ACCOUNT',
      services_title: 'Our Services',
      services_sub: '',
      banner_title: 'Book FD Directly via Chat!',
      banner_desc: 'With DigiLocker KYC, booking takes only 2 minutes.',
      banner_btn: 'Start Now',
      market_update: 'Market Updates'
    },
    bho: {
      nav: 'डैशबोर्ड पर वापस चलीं',
      footer: '© 2024 अपना CFO. भारत खातिर ❤️ से बनावल गइल बा।',
      header_title: 'अपना CFO',
      welcome: 'नमस्ते, राउर स्वागत बा!',
      secure: 'सुरक्षित खाता',
      services_title: 'हमार सेवा',
      services_sub: '',
      banner_title: 'अब FD बुक करीं चैटवे से!',
      banner_desc: 'डिजीलॉकर KYC के साथे, बुकिंग सिर्फ 2 मिनट में।',
      banner_btn: 'अभी शुरू करीं',
      market_update: 'बाज़ार के जानकारी'
    }
  };

  const l = labels[selectedLanguage as keyof typeof labels] || labels.hi;

  if (view === 'chat') {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex flex-col items-center pt-20">
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-5xl flex justify-between items-center mb-6 px-4">
          <button 
            onClick={() => setView('landing')}
            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
          >
            ← {l.nav}
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Globe size={14} /> {selectedLanguage === 'hi' ? 'Hindi' : selectedLanguage === 'bho' ? 'Bhojpuri' : 'English'}
            </span>
          </div>
        </div>
        <ChatWindow initialLanguage={selectedLanguage} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              {l.header_title} <span className="text-emerald-600">.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{l.welcome}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Verified User</span>
              <span className="text-[10px] text-emerald-500 flex items-center gap-1">
                <ShieldCheck size={12} /> {l.secure}
              </span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Services */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                {l.services_title} <span className="text-xs font-normal text-slate-400">{l.services_sub}</span>
              </h2>
              <ServiceMenu onSelect={handleServiceSelect} language={selectedLanguage} />
            </section>
            
            {/* Promotional Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative group">
              <div className="relative z-10 w-full md:w-2/3">
                <h3 className="text-2xl font-bold mb-2">{l.banner_title}</h3>
                <p className="text-emerald-100 mb-6">{l.banner_desc}</p>
                <button 
                  onClick={() => window.location.href = '/booking'}
                  className="bg-white text-emerald-700 px-6 py-2.5 rounded-full font-bold hover:bg-emerald-50 transition-colors"
                >
                  {l.banner_btn}
                </button>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform">
                <ShieldCheck size={200} />
              </div>
            </div>
          </div>

          {/* Sidebar: News */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                {l.market_update}
              </h2>
              <FinanceNews language={selectedLanguage} />
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-400 text-sm">{l.footer}</p>
        </footer>
      </div>
    </main>
  );
}
