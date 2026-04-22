'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, IndianRupee } from 'lucide-react';

export default function PortfolioCalculator() {
  const [investmentType, setInvestmentType] = useState<'SIP' | 'LUMPSUM'>('SIP');
  const [amount, setAmount] = useState<number>(5000);
  const [years, setYears] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);

  const calculateReturn = () => {
    let invested = 0;
    let expected = 0;

    if (investmentType === 'SIP') {
      const monthlyRate = expectedReturn / 12 / 100;
      const months = years * 12;
      invested = amount * months;
      expected = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      invested = amount;
      expected = amount * Math.pow(1 + expectedReturn / 100, years);
    }

    return {
      invested: Math.round(invested),
      wealth: Math.round(expected),
      gained: Math.round(expected - invested)
    };
  };

  const results = calculateReturn();

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      <div className="p-6 md:p-10 w-full max-w-6xl mx-auto space-y-10">
        <header className="flex items-center gap-4 p-8 glass-effect rounded-[2rem] border border-white/50 dark:border-slate-800 shadow-xl relative overflow-hidden bg-white/70 dark:bg-slate-900/70">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <Calculator size={36} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Portfolio Returns Calculator</h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium mt-1">Estimate your wealth creation over time with mutual funds and SIPs.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-200/60 dark:border-slate-800">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full mb-8">
              <button 
                onClick={() => setInvestmentType('SIP')}
                className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${investmentType === 'SIP' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                SIP (Monthly)
              </button>
              <button 
                onClick={() => setInvestmentType('LUMPSUM')}
                className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${investmentType === 'LUMPSUM' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Lumpsum (One-time)
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>{investmentType === 'SIP' ? 'Monthly Investment' : 'Total Investment'}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-0.5 rounded-full">₹ {amount.toLocaleString('en-IN')}</span>
                </label>
                <input 
                  type="range" min={500} max={100000} step={500} 
                  value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              
              <div>
                <label className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Investment Period (Years)</span>
                  <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-0.5 rounded-full">{years} Yr</span>
                </label>
                <input 
                  type="range" min={1} max={40} step={1} 
                  value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Expected Return Rate (p.a)</span>
                  <span className="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-0.5 rounded-full">{expectedReturn}%</span>
                </label>
                <input 
                  type="range" min={4} max={30} step={0.5} 
                  value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden text-white flex flex-col justify-center">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
             
             <div className="relative z-10 space-y-8">
               <div>
                 <p className="text-slate-400 font-medium mb-1">Total Wealth Generated</p>
                 <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                    ₹ {results.wealth.toLocaleString('en-IN')}
                 </h2>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                   <p className="text-sm text-slate-400 font-medium mb-1 flex items-center gap-1"><IndianRupee size={14}/> Invested Amount</p>
                   <p className="text-xl font-bold">₹ {results.invested.toLocaleString('en-IN')}</p>
                 </div>
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                   <p className="text-sm text-emerald-300 font-medium mb-1 flex items-center gap-1"><TrendingUp size={14}/> Est. Returns</p>
                   <p className="text-xl font-bold text-emerald-400">₹ {results.gained.toLocaleString('en-IN')}</p>
                 </div>
               </div>
               
               <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden flex">
                 <div style={{ width: `${(results.invested / results.wealth) * 100}%` }} className="bg-slate-400 h-full"></div>
                 <div style={{ width: `${(results.gained / results.wealth) * 100}%` }} className="bg-emerald-400 h-full"></div>
               </div>
               <div className="flex justify-between text-xs font-medium text-slate-400">
                 <span>Invested ({(results.invested / results.wealth * 100).toFixed(1)}%)</span>
                 <span>Gained ({(results.gained / results.wealth * 100).toFixed(1)}%)</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
