'use client';

import React from 'react';
import { PieChart, TrendingUp, Wallet, ArrowRight, ShieldCheck, ArrowUpRight, Activity } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const activeFDs = [
    { bank: 'SBI', amount: 50000, rate: 7.0, maturity: '2026-05-20', status: 'Active' },
    { bank: 'AU Small Finance', amount: 120000, rate: 7.75, maturity: '2027-02-15', status: 'Active' },
    { bank: 'HDFC Bank', amount: 200000, rate: 7.20, maturity: '2025-11-10', status: 'Nearing Maturity' },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-600/20 to-transparent dark:from-emerald-900/20 -z-10 pointer-events-none" />
      
      <div className="p-6 md:p-10 w-full mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass-effect p-6 md:p-8 rounded-[2rem] border border-white/50 dark:border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 w-full lg:w-auto">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Mera Portfolio</h1>
              <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm">
                <ShieldCheck size={14} /> Secured
              </div>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-xl">Apni savings aur FDs ka live track yahan dekhein. You are currently averaging an excellent return profile.</p>
          </div>
          <Link href="/booking" className="relative z-10 w-full sm:w-auto">
            <button className="w-full sm:w-auto group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold overflow-hidden transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <span className="relative z-10 flex items-center justify-center gap-2">Naya FD Book Karein <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute inset-0 bg-white/20 dark:bg-black/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 pointer-events-none" />
            </button>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-lg border border-slate-200/50 dark:border-slate-800/50 group hover:border-emerald-500/50 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
                <Wallet size={28} />
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">+12% vs last month</span>
            </div>
            <h3 className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-sm mb-2">Kul Nivesh (Total Investment)</h3>
            <p className="text-4xl font-extrabold text-slate-900 dark:text-white">₹3,70,000</p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-lg border border-slate-200/50 dark:border-slate-800/50 group hover:border-blue-500/50 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
                <TrendingUp size={28} />
              </div>
            </div>
            <h3 className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-sm mb-2">Anumaanit Return (Proj. Returns)</h3>
            <p className="text-4xl font-extrabold text-slate-900 dark:text-white">₹27,850</p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-lg border border-slate-200/50 dark:border-slate-800/50 group hover:border-purple-500/50 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
                <PieChart size={28} />
              </div>
            </div>
            <h3 className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-sm mb-2">Average Interest Rate</h3>
            <p className="text-4xl font-extrabold text-slate-900 dark:text-white">7.35%</p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-[2rem] shadow-lg border border-emerald-500/30 text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-teal-900/20 rounded-full blur-2xl" />
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                   <Activity size={24} className="text-white" />
                 </div>
                 <h3 className="font-bold text-emerald-100 uppercase tracking-wider text-sm">Portfolio Health</h3>
               </div>
               <p className="text-3xl font-extrabold">Excellent</p>
               <p className="text-sm text-emerald-100 mt-2 font-medium">Your investments are fully secured and outperforming inflation.</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200/60 dark:border-slate-800 overflow-hidden relative z-10">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Active Fixed Deposits</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">All your current investments in one place.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-extrabold tracking-widest border-b border-slate-100 dark:border-slate-800/80">
                <tr>
                  <th className="px-8 py-5">Bank</th>
                  <th className="px-8 py-5">Rashi (Amount)</th>
                  <th className="px-8 py-5">Dar (Rate)</th>
                  <th className="px-8 py-5">Maturity Date</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-900">
                {activeFDs.map((fd, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm">{fd.bank.charAt(0)}</div>
                         <span className="font-bold text-slate-800 dark:text-slate-200 text-base">{fd.bank}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-base font-bold text-slate-700 dark:text-slate-300">₹{fd.amount.toLocaleString('en-IN')}</td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                        {fd.rate}%
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 dark:text-slate-400 font-medium">{fd.maturity}</td>
                    <td className="px-8 py-6">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${fd.status === 'Active' ? 'bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50' : 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50'}`}>
                         <span className={`w-1.5 h-1.5 rounded-full ${fd.status === 'Active' ? 'bg-blue-500' : 'bg-amber-500 animate-pulse'}`}></span> {fd.status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 px-4 py-2 rounded-full transition-colors">
                        Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
