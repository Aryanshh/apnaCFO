import React from 'react';

interface FDRate {
  bank_name: string;
  tenor_days: number;
  rate_general: number;
  rate_senior: number;
}

interface FDCompareTableProps {
  rates: FDRate[];
}

export default function FDCompareTable({ rates }: FDCompareTableProps) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-slate-200 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
          <tr>
            <th className="px-4 py-2">Bank</th>
            <th className="px-4 py-2">General</th>
            <th className="px-4 py-2">Senior</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rates.map((rate, i) => (
            <tr key={i} className="hover:bg-emerald-50 transition-colors">
              <td className="px-4 py-3 font-medium text-slate-700">{rate.bank_name}</td>
              <td className="px-4 py-3 text-emerald-600 font-bold">{rate.rate_general}%</td>
              <td className="px-4 py-3 text-emerald-700">{rate.rate_senior}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-emerald-50 p-2 text-center text-[10px] text-emerald-600 font-medium italic">
        *Rates are subject to change. Click to book.
      </div>
    </div>
  );
}
