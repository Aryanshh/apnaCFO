'use client';

import React, { useState } from 'react';
import { Mail, Lock, Phone, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate auth network request for UI demo purposes 
    setTimeout(() => {
      setLoading(false);
      // In production, this uses supabase.auth.setSession()
      // For prototype testing, we inject a cookie that Middleware reads
      document.cookie = "apna_cfo_session=true; path=/; max-age=86400";
      router.push('/select-language');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-500">
      
      {/* Left side - Branding Context */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-start p-16 bg-gradient-to-br from-emerald-600 to-teal-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10 space-y-8 max-w-lg">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-emerald-600 font-extrabold text-3xl shadow-xl">
            A
          </div>
          <h1 className="text-5xl font-black text-white leading-tight">Your Financial Future <br/> Starts Here.</h1>
          <p className="text-emerald-100 text-lg font-medium">Log in to securely manage your FDs, calculate risks, and connect with your local AI financial advisor.</p>
          
          <div className="flex items-center gap-4 mt-12 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md">
             <ShieldCheck size={32} className="text-emerald-200" />
             <div>
               <p className="text-white font-bold tracking-wide">Bank-grade Security</p>
               <p className="text-emerald-200 text-sm">256-bit encryption for all assets.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-16 relative">
        {/* Mobile Header Graphic */}
        <div className="md:hidden w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl mb-8">
          A
        </div>

        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {mode === 'login' ? 'Sign in to access your dashboard' : 'Join thousands securing their wealth today'}
            </p>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full">
            <button 
              onClick={() => setMethod('email')}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${method === 'email' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Email Setup
            </button>
            <button 
              onClick={() => setMethod('phone')}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${method === 'phone' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Mobile OTP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400" />
                  </div>
                  <input type="text" required placeholder="Rajesh Kumar" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
                </div>
              </div>
            )}

            {method === 'email' ? (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={18} className="text-slate-400" />
                    </div>
                    <input type="email" required placeholder="rajesh@example.com" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Password</span>
                    {mode === 'login' && <a href="#" className="text-emerald-600 dark:text-emerald-400 text-xs hover:underline">Forgot?</a>}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock size={18} className="text-slate-400" />
                    </div>
                    <input type="password" required placeholder="••••••••" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-medium">+91</span>
                  </div>
                  <input type="tel" required placeholder="98765 43210" pattern="[0-9]{10}" className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                 <>
                   {mode === 'login' ? (method === 'email' ? 'Secure Login' : 'Send OTP') : 'Create Account'}
                   <ArrowRight size={18} />
                 </>
              )}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 relative z-10">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              {mode === 'login' ? 'Sign up quickly' : 'Log in safely'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
