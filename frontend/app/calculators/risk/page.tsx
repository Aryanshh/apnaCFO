'use client';

import React, { useState } from 'react';
import { Target, AlertTriangle, ShieldCheck, Flame, RefreshCcw } from 'lucide-react';

export default function RiskCalculator() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      q: 'How old are you?',
      options: [
        { text: 'Under 30 (I have time on my side)', points: 4 },
        { text: '31 - 45 (Getting serious)', points: 3 },
        { text: '46 - 60 (Approaching retirement)', points: 2 },
        { text: 'Over 60 (Need steady income)', points: 1 }
      ]
    },
    {
      q: 'What is your primary investment goal?',
      options: [
        { text: 'Maximum long-term wealth creation', points: 4 },
        { text: 'Balanced growth and safety', points: 3 },
        { text: 'Create a regular monthly income', points: 2 },
        { text: 'Protect my money from losing value', points: 1 }
      ]
    },
    {
      q: 'If your investment drops by 20% in one month, you would:',
      options: [
        { text: 'Buy more, it is a great discount!', points: 4 },
        { text: 'Hold and wait for recovery', points: 3 },
        { text: 'Sell some to prevent further loss', points: 2 },
        { text: 'Sell everything immediately', points: 1 }
      ]
    },
    {
      q: 'How much of your monthly income do you save?',
      options: [
        { text: 'More than 40%', points: 4 },
        { text: '20% to 40%', points: 3 },
        { text: '10% to 20%', points: 2 },
        { text: 'Less than 10%', points: 1 }
      ]
    }
  ];

  const handleAnswer = (points: number) => {
    setScore(score + points);
    setStep(step + 1);
  };

  const getProfile = () => {
    if (score >= 14) return { profile: 'Aggressive', icon: <Flame size={48} className="text-orange-500"/>, text: 'You are a risk-taker! You prioritize high returns and are willing to ride out market volatility. Best suited for Small/Mid Cap Equities and Direct Stocks.', color: 'from-orange-500 to-red-600', ring: 'ring-orange-500/30' };
    if (score >= 10) return { profile: 'Moderate', icon: <Target size={48} className="text-blue-500"/>, text: 'You want growth but hate losing sleep. A balanced mix of Equity and Debt works best for you. Consider Flexi-cap funds and Corporate Bonds.', color: 'from-blue-500 to-indigo-600', ring: 'ring-blue-500/30' };
    return { profile: 'Conservative', icon: <ShieldCheck size={48} className="text-emerald-500"/>, text: 'You prioritize safety over everything else. You want your money secure. Focus on High-yield FDs, PPF, and Sovereign Gold Bonds.', color: 'from-emerald-500 to-teal-600', ring: 'ring-emerald-500/30' };
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="p-6 md:p-10 w-full max-w-4xl mx-auto space-y-10">
        <header className="flex items-center gap-4 p-8 glass-effect rounded-[2rem] border border-white/50 dark:border-slate-800 shadow-xl relative overflow-hidden bg-white/70 dark:bg-slate-900/70">
          <div className="p-4 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-2xl">
            <AlertTriangle size={36} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Risk Profiler</h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium mt-1">Discover your exact risk appetite before investing.</p>
          </div>
        </header>

        {step < questions.length ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-200/60 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-500">
             <div className="mb-6 flex items-center justify-between">
               <span className="text-sm font-bold text-slate-400 tracking-wider uppercase">Question {step + 1} of {questions.length}</span>
               <div className="flex gap-1.5">
                 {questions.map((_, i) => (
                   <div key={i} className={`w-10 h-2 rounded-full transition-colors ${i <= step ? 'bg-orange-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                 ))}
               </div>
             </div>
             
             <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-8">{questions[step].q}</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {questions[step].options.map((opt, i) => (
                 <button 
                   key={i}
                   onClick={() => handleAnswer(opt.points)}
                   className="p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-left font-bold text-slate-700 dark:text-slate-300 transition-all group"
                 >
                   <span className="group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{opt.text}</span>
                 </button>
               ))}
             </div>
          </div>
        ) : (
          <div className={`bg-gradient-to-br ${getProfile().color} rounded-[2rem] p-10 shadow-2xl relative overflow-hidden text-white flex flex-col items-center text-center animate-in zoom-in duration-700`}>
             <div className={`p-6 bg-white/20 backdrop-blur-md rounded-full ring-8 ${getProfile().ring} mb-6 shadow-xl`}>
               {getProfile().icon}
             </div>
             <h2 className="text-4xl font-black mb-4">{getProfile().profile} Investor</h2>
             <p className="text-lg font-medium opacity-90 max-w-xl mx-auto mb-8">{getProfile().text}</p>
             
             <button 
               onClick={() => { setStep(0); setScore(0); }}
               className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full font-bold transition-colors"
             >
               <RefreshCcw size={18} /> Retake Assessment
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
