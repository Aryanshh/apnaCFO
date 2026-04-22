'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    tenor: '',
    nominee: '',
    phone: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const steps = [
    { title: 'Amount', description: 'Kitna paisa bachana chahte hain?' },
    { title: 'Tenor', description: 'Kitne samay ke liye?' },
    { title: 'KYC', description: 'Aadhaar verify karein' },
    { title: 'Success', description: 'Badiya! FD Book ho gayi.' }
  ];

  return (
    <div className="my-4 p-6 bg-white border border-emerald-100 rounded-xl shadow-md max-w-sm mx-auto">
      <div className="flex justify-between mb-6">
        {steps.map((_, i) => (
          <div 
            key={i} 
            className={`h-2 flex-1 mx-1 rounded-full ${i + 1 <= step ? 'bg-emerald-500' : 'bg-slate-100'}`}
          />
        ))}
      </div>

      <h2 className="text-lg font-bold text-slate-800 mb-2">{steps[step-1].title}</h2>
      <p className="text-sm text-slate-500 mb-4">{steps[step-1].description}</p>

      {step === 1 && (
        <div className="space-y-4">
          <Input 
            type="number" 
            placeholder="Amount (e.g. 50000)" 
            value={formData.amount}
            onChange={(e: any) => setFormData({...formData, amount: e.target.value})}
          />
          <Button className="w-full" onClick={nextStep}>Agla Kadam <ArrowRight size={16} className="ml-2" /></Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Input 
            placeholder="Tenor (e.g. 1 year)" 
            value={formData.tenor}
            onChange={(e: any) => setFormData({...formData, tenor: e.target.value})}
          />
          <div className="flex gap-2">
            <Button variant="ghost" onClick={prevStep}><ArrowLeft size={16} /></Button>
            <Button className="w-full" onClick={nextStep}>KYC Karein <ArrowRight size={16} className="ml-2" /></Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 text-center">
          <div className="p-4 border-2 border-dashed border-emerald-200 rounded-lg bg-emerald-50 text-xs text-emerald-800">
            Fetching documents from DigiLocker...
          </div>
          <Button className="w-full" onClick={nextStep}>Verify & Book</Button>
        </div>
      )}

      {step === 4 && (
        <div className="text-center space-y-4 py-4">
          <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
          <h3 className="font-bold text-emerald-800">Badhaai Ho!</h3>
          <p className="text-sm">Aapka ₹{formData.amount} ka FD book ho gaya hai.</p>
          <Button variant="outline" className="w-full" onClick={() => setStep(1)}>Naya FD karein</Button>
        </div>
      )}
    </div>
  );
}
