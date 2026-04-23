'use client';

import React, { useEffect, useState } from 'react';
import { Newspaper, TrendingUp, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

interface FinanceNewsProps {
  language: string;
}

interface NewsItem {
  title: string;
  source: string;
  time: string;
  type: string;
}

interface FinanceData {
  market_status: string;
  indices: {
    SENSEX?: {
      value: number;
      change: number;
      percent_change: number;
    };
  };
  news: NewsItem[];
}

export function FinanceNews({ language }: FinanceNewsProps) {
  const [data, setData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/finance/live?language=${language}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch live finance data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinance();
    const interval = setInterval(fetchFinance, 300000); // refresh every 5 mins
    return () => clearInterval(interval);
  }, [language]);

  const labels = {
    hi: { title: "फाइनेंस खबर", live: "लाइव", viewAll: "सारी खबरें देखें", loading: "लोड हो रहा है..." },
    en: { title: "Finance News", live: "LIVE", viewAll: "View All News", loading: "Loading real-time data..." },
    bho: { title: "फाइनेंस समाचार", live: "लाइव", viewAll: "सारी खबर देखीं", loading: "लोड होत बा..." }
  };

  const l = labels[language as keyof typeof labels] || labels.hi;

  if (loading && !data) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 text-center text-slate-500 animate-pulse">
        {l.loading}
      </div>
    );
  }

  const sensex = data?.indices?.SENSEX;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden glass-effect">
      <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-lg">
          <Newspaper size={20} />
          <span>{l.title}</span>
        </div>
        <div className="flex items-center gap-3">
          {sensex && (
             <div className="flex items-center gap-2 text-sm font-bold bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm">
                <span className="text-slate-700 dark:text-slate-300">SENSEX: {sensex.value.toLocaleString('en-IN')}</span>
                {sensex.change >= 0 ? (
                  <span className="text-emerald-500 flex items-center"><ArrowUp size={14}/> {sensex.percent_change}%</span>
                ) : (
                  <span className="text-red-500 flex items-center"><ArrowDown size={14}/> {Math.abs(sensex.percent_change)}%</span>
                )}
             </div>
          )}
          <div className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full animate-pulse tracking-widest uppercase">
            {l.live}
          </div>
        </div>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {(data?.news || []).map((news, i) => (
          <div key={i} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer group">
            <div className="flex justify-between items-start gap-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                {news.title}
              </h4>
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 whitespace-nowrap bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                {news.time}
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1">
               <TrendingUp size={12} className="text-emerald-500" /> {news.source}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 text-center border-t border-slate-100 dark:border-slate-800/60">
        <button className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 hover:underline tracking-wide uppercase transition-colors">
          {l.viewAll}
        </button>
      </div>
    </div>
  );
}
