'use client';

import React from 'react';
import { Newspaper, TrendingUp, AlertCircle } from 'lucide-react';

interface FinanceNewsProps {
  language: string;
}

export function FinanceNews({ language }: FinanceNewsProps) {
  const newsItems = [
    { 
      title: language === 'en' ? "RBI Governor hints at repo rate stability" : language === 'bho' ? "RBI गवर्नर रेपो रेट में बदलाव ना भईला के इशारा कईलें" : "RBI गवर्नर ने रेपो रेट स्थिर रखने के संकेत दिए", 
      source: "Mint", 
      time: language === 'en' ? "2h ago" : language === 'bho' ? "2 घंटा पहिले" : "2 घंटे पहले", 
      type: "policy" 
    },
    { 
      title: language === 'en' ? "SBI Festive FD rates extended till March 31" : language === 'bho' ? "SBI के फेस्टिव FD रेट 31 मार्च ले बढ़ल" : "SBI फेस्टिव FD दरें 31 मार्च तक बढ़ाई गईं", 
      source: "Economic Times", 
      time: language === 'en' ? "5h ago" : language === 'bho' ? "5 घंटा पहिले" : "5 घंटे पहले", 
      type: "rate" 
    },
    { 
      title: language === 'en' ? "Digital Rupee (e₹) reaches 1 million users" : language === 'bho' ? "डिजिटल रुपया (e₹) 1 मिलियन यूजर तक पहुंचल" : "डिजिटल रुपया (e₹) 1 मिलियन उपयोगकर्ताओं तक पहुंचा", 
      source: "RBI News", 
      time: language === 'en' ? "1d ago" : language === 'bho' ? "1 दिन पहिले" : "1 दिन पहले", 
      type: "digital" 
    },
    { 
      title: language === 'en' ? "Inflation dips to 4.8% in Tier-2 cities" : language === 'bho' ? "टियर-2 शहरन में महंगाई घट के 4.8% भईल" : "टियर-2 शहरों में महंगाई घटकर 4.8% हुई", 
      source: "Business Standard", 
      time: language === 'en' ? "1d ago" : language === 'bho' ? "1 दिन पहिले" : "1 दिन पहले", 
      type: "economy" 
    },
  ];

  const labels = {
    hi: { title: "फाइनेंस खबर", live: "लाइव", viewAll: "सारी खबरें देखें" },
    en: { title: "Finance News", live: "LIVE", viewAll: "View All News" },
    bho: { title: "फाइनेंस समाचार", live: "लाइव", viewAll: "सारी खबर देखीं" }
  };

  const l = labels[language as keyof typeof labels] || labels.hi;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
          <Newspaper size={20} />
          <span>{l.title}</span>
        </div>
        <div className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full animate-pulse">
          {l.live}
        </div>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {newsItems.map((news, i) => (
          <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start gap-4">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {news.title}
              </h4>
              <div className="text-[10px] text-slate-400 whitespace-nowrap">{news.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-slate-50 dark:bg-slate-800/20 text-center">
        <button className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
          {l.viewAll}
        </button>
      </div>
    </div>
  );
}
