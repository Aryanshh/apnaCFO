import React from 'react';
import JargonCard from './JargonCard';
import FDCompareTable from './FDCompareTable';
import BookingWizard from './BookingWizard';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isAssistant = role === 'assistant';

  // Check for triggers
  const hasComparison = content.includes('[FD_COMPARISON]');
  const hasBooking = content.includes('[FD_BOOKING]');
  
  let cleanContent = content
    .replace('[FD_COMPARISON]', '')
    .replace('[FD_BOOKING]', '');

  const parts = cleanContent.split(/(\(.*?\))/g);

  const mockRates = [
    { bank_name: 'AU Small Finance', tenor_days: 365, rate_general: 7.75, rate_senior: 8.25 },
    { bank_name: 'SBI', tenor_days: 365, rate_general: 6.8, rate_senior: 7.3 },
    { bank_name: 'HDFC', tenor_days: 365, rate_general: 6.6, rate_senior: 7.1 },
  ];

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[90%] p-3 rounded-2xl ${
          isAssistant
            ? 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
            : 'bg-emerald-600 text-white rounded-tr-none'
        }`}
      >
        {isAssistant ? (
          <div className="space-y-1">
            {parts.map((part, i) => {
              if (part.startsWith('(') && part.endsWith(')')) {
                const term = part.slice(1, -1);
                return <JargonCard key={i} term={term} />;
              }
              // Parse **bold** markdown dynamically
              const boldChunks = part.split(/(\*\*.*?\*\*)/g);
              return (
                <span key={i} className="whitespace-pre-wrap leading-relaxed text-[15px]">
                  {boldChunks.map((chunk, j) => {
                    if (chunk.startsWith('**') && chunk.endsWith('**')) {
                      return <strong key={j} className="font-bold text-emerald-800 dark:text-emerald-300">{chunk.slice(2, -2)}</strong>;
                    }
                    return <span key={j}>{chunk}</span>;
                  })}
                </span>
              );
            })}
            {hasComparison && <FDCompareTable rates={mockRates} />}
            {hasBooking && <BookingWizard />}
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
