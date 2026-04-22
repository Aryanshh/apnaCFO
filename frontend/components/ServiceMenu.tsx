'use client';

import React from 'react';
import { MessageSquare, BarChart3, PieChart, Banknote, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';

interface ServiceMenuProps {
  onSelect: (service: string) => void;
  language: string;
}

export function ServiceMenu({ onSelect, language }: ServiceMenuProps) {
  const getServices = () => {
    switch(language) {
      case 'en': return [
        { id: 'chat', name: 'Personal Advisor', native: 'Ask AI Assistant', desc: 'Ask anything about finance in English', icon: <MessageSquare className="text-blue-500" />, color: 'bg-blue-50 dark:bg-blue-950/30' },
        { id: 'fd', name: 'Compare FDs', native: 'Check FD Rates', desc: 'Compare rates across 40+ banks', icon: <Banknote className="text-emerald-500" />, color: 'bg-emerald-50 dark:bg-emerald-950/30' },
        { id: 'portfolio', name: 'My Portfolio', native: 'My Savings', desc: 'Track your existing investments', icon: <PieChart className="text-purple-500" />, color: 'bg-purple-50 dark:bg-purple-950/30' },
        { id: 'analytics', name: 'B2B Insights', native: 'Analytics Dashboard', desc: 'Partner portal for banks', icon: <BarChart3 className="text-orange-500" />, color: 'bg-orange-50 dark:bg-orange-950/30' },
      ];
      case 'bho': return [
        { id: 'chat', name: 'अपना सलाहकार', native: 'AI से बतियाईं', desc: 'भोजपुरी में कुछो पूछीं', icon: <MessageSquare className="text-blue-500" />, color: 'bg-blue-50 dark:bg-blue-950/30' },
        { id: 'fd', name: 'FD दर चेक करीं', native: 'FD रेट देखीं', desc: 'बैंक के रेट के तुलना करीं', icon: <Banknote className="text-emerald-500" />, color: 'bg-emerald-50 dark:bg-emerald-950/30' },
        { id: 'portfolio', name: 'हमार पोर्टफोलियो', native: 'बबुआ के बचत', desc: 'आपन इन्वेस्टमेंट ट्रैक करीं', icon: <PieChart className="text-purple-500" />, color: 'bg-purple-50 dark:bg-purple-950/30' },
        { id: 'analytics', name: 'B2B जानकारी', native: 'पैसा के हिसाब', desc: 'पार्टनर पोर्टल', icon: <BarChart3 className="text-orange-500" />, color: 'bg-orange-50 dark:bg-orange-950/30' },
      ];
      default: return [
        { id: 'chat', name: 'अपना सलाहकार', native: 'AI से बात करें', desc: 'हिन्दी में कुछ भी पूछें', icon: <MessageSquare className="text-blue-500" />, color: 'bg-blue-50 dark:bg-blue-950/30' },
        { id: 'fd', name: 'FD दर चेक करें', native: 'FD रेट देखें', desc: '40+ बैंकों के रेट देखें', icon: <Banknote className="text-emerald-500" />, color: 'bg-emerald-50 dark:bg-emerald-950/30' },
        { id: 'portfolio', name: 'मेरा पोर्टफोलियो', native: 'मेरी बचत', desc: 'अपने सारे इन्वेस्टमेंट ट्रैक करें', icon: <PieChart className="text-purple-500" />, color: 'bg-purple-50 dark:bg-purple-950/30' },
        { id: 'analytics', name: 'B2B जानकारी', native: 'डैशबोर्ड', desc: 'बैंकों के लिए पोर्टल', icon: <BarChart3 className="text-orange-500" />, color: 'bg-orange-50 dark:bg-orange-950/30' },
      ];
    }
  };

  const services = getServices();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onSelect(service.id)}
          className="group text-left"
        >
          <Card className={`h-full border-2 border-transparent hover:border-emerald-500 transition-all p-5 ${service.color}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                {service.icon}
              </div>
              <div className="p-2 bg-white/50 dark:bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={18} className="text-slate-600 dark:text-slate-300" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{service.native}</h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-tight mb-2">{service.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{service.desc}</p>
            </div>
          </Card>
        </button>
      ))}
    </div>
  );
}
