'use client';

import React from 'react';
import BookingWizard from '@/components/BookingWizard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-emerald-50/30 p-8 flex flex-col items-center">
      <div className="w-full max-w-md mb-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium mb-4">
          <ArrowLeft size={20} /> Dashboard par waapis jayein
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">FD Booking</h1>
        <p className="text-slate-500">Surakshit aur asaan tarike se FD book karein</p>
      </div>

      <div className="w-full max-w-md">
        <BookingWizard />
      </div>

      <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-emerald-100 max-w-md text-center text-sm text-slate-600">
        <p>"Aapke dastawez DigiLocker ke dwara surakshit hain. Hum aapka data bechte nahi hain."</p>
      </div>
    </div>
  );
}
