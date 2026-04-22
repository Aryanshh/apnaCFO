'use client';

import React from 'react';
import { User, ShieldCheck, CreditCard, Award, ChevronRight, Settings, LogOut, Bell } from 'lucide-react';
import Link from 'next/link';

export default function Profile() {
  const userStats = [
    { title: 'Total FDs', value: '3 Active', icon: <CreditCard size={20} /> },
    { title: 'Risk Score', value: 'Moderate', icon: <Award size={20} /> },
    { title: 'Alerts', value: '2 Unread', icon: <Bell size={20} /> },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-600/20 to-transparent dark:from-blue-900/20 -z-10 pointer-events-none" />
      
      <div className="p-6 md:p-10 w-full max-w-4xl mx-auto space-y-8">
        
        {/* Profile Identity Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-xl overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
             
             {/* Avatar */}
             <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-lg ring-4 ring-white dark:ring-slate-900 group-hover:scale-105 transition-transform duration-500">
               <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-900">
                 <User size={48} className="text-blue-500/50 dark:text-blue-400/50" />
               </div>
             </div>

             {/* Bio */}
             <div className="flex-1 text-center md:text-left">
               <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-2">
                 <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Rajesh Kumar</h1>
                 <span className="flex items-center gap-1 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider">
                   <ShieldCheck size={14} /> KYC Verified
                 </span>
               </div>
               <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">rajesh.kumar@example.com <span className="mx-2">•</span> +91 98765 43210</p>
               
               <div className="flex flex-wrap justify-center md:justify-start gap-4">
                 {userStats.map((stat, i) => (
                   <div key={i} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/60 px-4 py-2 rounded-full">
                     <span className="text-blue-600 dark:text-blue-400">{stat.icon}</span>
                     <div>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.title}</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">{stat.value}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Action Button */}
             <button className="flex justify-center items-center h-10 w-10 md:h-12 md:w-12 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full transition-colors self-center">
               <Settings size={20} />
             </button>
           </div>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Preferences */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/50 dark:border-slate-800 shadow-lg p-8">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6">Account Preferences</h3>
            <div className="space-y-4">
               <PreferenceRow label="Language Preference" value="Bhojpuri" />
               <PreferenceRow label="Base Currency" value="INR (₹)" />
               <PreferenceRow label="Two-Factor Auth" value="Enabled" isProtected />
               <PreferenceRow label="DigiLocker Status" value="Connected" isProtected />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/50 dark:border-slate-800 shadow-lg p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                 <Link href="/dashboard" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group">
                   <div className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">View Portfolio</div>
                   <ChevronRight size={18} className="text-slate-400 group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" />
                 </Link>
                 <Link href="/calculators/risk" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors group">
                   <div className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Retake Risk Profile</div>
                   <ChevronRight size={18} className="text-slate-400 group-hover:text-orange-500 transition-transform group-hover:translate-x-1" />
                 </Link>
              </div>
            </div>
            
            <button className="flex items-center justify-center gap-2 w-full mt-8 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 font-bold transition-colors">
              <LogOut size={18} /> Log Out
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

function PreferenceRow({ label, value, isProtected = false }: { label: string, value: string, isProtected?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 -mx-4 px-4 rounded-lg transition-colors cursor-pointer group">
      <span className="font-medium text-slate-600 dark:text-slate-400">{label}</span>
      <div className="flex items-center gap-3">
        <span className={`font-bold text-sm ${isProtected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>{value}</span>
        <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-slate-500 transition-colors" />
      </div>
    </div>
  )
}
