'use client';

import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight } from 'lucide-react';

interface LanguageSelectorProps {
  onSelect: (lang: string) => void;
}

export default function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [fade, setFade] = useState(true);
  
  const greetings = [
    { text: 'नमस्ते!', lang: 'hi' },
    { text: 'Hello!', lang: 'en' },
    { text: 'प्रणाम!', lang: 'bho' }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); // start fading out
      setTimeout(() => {
        setGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        setFade(true); // fade back in
      }, 500); // Wait for fade out to complete before changing text
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  const languages = [
    { code: 'hi', label: 'Hindi', native: 'हिन्दी', description: 'भारत की मातृभाषा' },
    { code: 'en', label: 'English', native: 'English', description: 'Global language' },
    { code: 'bho', label: 'Bhojpuri', native: 'भोजपुरी', description: 'जवन रउआ के पसंद आई' },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <Globe size={48} className="mx-auto text-emerald-600 mb-4" />
        <h2 className={`text-3xl font-extrabold text-slate-800 dark:text-white transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {greetings[greetingIndex].text}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">अपनी पसंदीदा भाषा चुनें</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className="group p-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xl transition-all text-left flex flex-col justify-between h-48"
          >
            <div>
              <p className="text-4xl font-bold text-slate-800 dark:text-white mb-2">{lang.native}</p>
              <p className="font-medium text-slate-600 dark:text-slate-400">{lang.label}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400 uppercase tracking-widest">{lang.description}</span>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ArrowRight size={20} />
              </div>
            </div>
          </button>

        ))}
      </div>

      <div className="text-sm text-slate-400">
        &quot;Aap chat ke beech mein bhi bhasha badal sakte hain&quot;
      </div>
    </div>
  );
}
