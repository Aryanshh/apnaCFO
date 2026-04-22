import React from 'react';
import { Info } from 'lucide-react';

interface JargonCardProps {
  term: string;
}

export default function JargonCard({ term }: JargonCardProps) {
  return (
    <div className="my-2 p-2 bg-emerald-50 border-l-4 border-emerald-500 rounded text-sm text-emerald-800 flex items-start gap-2 shadow-sm italic">
      <Info size={16} className="mt-0.5 flex-shrink-0 text-emerald-600" />
      <span>{term}</span>
    </div>
  );
}
