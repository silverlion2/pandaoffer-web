import React from 'react';
import { HeartPulse, ArrowRight, Construction } from 'lucide-react';

export default function MedicalTourismBanner() {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-8 my-16 shadow-sm overflow-hidden relative">
      <div className="absolute -right-10 -top-10 opacity-5">
        <HeartPulse size={200} />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-xs font-bold uppercase tracking-wide border border-emerald-200">
            <HeartPulse size={14} />
            Medical Tourism Partner
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 font-heading">
            Family Visiting China?
          </h3>
          <p className="text-slate-600 text-lg max-w-xl">
            From high-end VIP physicals to advanced dental work and traditional medicinal retreats. Discover world-class healthcare options for your parents and relatives while they visit.
          </p>
        </div>
        
        <div className="flex-shrink-0 flex flex-col items-center sm:items-end gap-3">
          <button 
            disabled
            className="group relative flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md opacity-60 cursor-not-allowed"
          >
            Access VIP Health Guide
            <ArrowRight size={18} className="opacity-50" />
          </button>
          <div className="flex items-center gap-2 text-amber-700 text-sm font-bold bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200">
            <Construction size={16} />
            Under Construction
          </div>
        </div>
      </div>
    </div>
  );
}
