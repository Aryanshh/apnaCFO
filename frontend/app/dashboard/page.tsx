'use client';

import React from 'react';
import { Card } from '@/components/ui/card'; // I'll need to create a simple Card component
import { PieChart, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const activeFDs = [
    { bank: 'SBI', amount: 50000, rate: 7.0, maturity: '2026-05-20' },
    { bank: 'AU Small Finance', amount: 120000, rate: 7.75, maturity: '2027-02-15' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Mera Portfolio</h1>
          <p className="text-slate-500">Apni savings aur FDs yahan dekhein</p>
        </div>
        <Link href="/booking">
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-all font-medium">
            Naya FD Book Karein
          </button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Wallet size={24} /></div>
            <h3 className="font-bold text-slate-600">Kul Nivesh</h3>
          </div>
          <p className="text-3xl font-extrabold text-slate-800">₹1,70,000</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><TrendingUp size={24} /></div>
            <h3 className="font-bold text-slate-600">Anumaanit Return</h3>
          </div>
          <p className="text-3xl font-extrabold text-slate-800">₹12,450</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><PieChart size={24} /></div>
            <h3 className="font-bold text-slate-600">Average Rate</h3>
          </div>
          <p className="text-3xl font-extrabold text-slate-800">7.35%</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Active Fixed Deposits</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">Bank</th>
              <th className="px-6 py-4">Rashi (Amount)</th>
              <th className="px-6 py-4">Dar (Rate)</th>
              <th className="px-6 py-4">Maturity Date</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activeFDs.map((fd, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-700">{fd.bank}</td>
                <td className="px-6 py-4">₹{fd.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-emerald-600 font-bold">{fd.rate}%</td>
                <td className="px-6 py-4 text-slate-500">{fd.maturity}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline flex items-center gap-1">
                    Details <ArrowRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
