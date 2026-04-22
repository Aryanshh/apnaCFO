import React from 'react';

export function Card({ children, className = '' }: any) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: any) {
  return (
    <div className={`p-6 border-b border-slate-100 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: any) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}
