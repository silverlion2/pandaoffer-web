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
            ShanghaiMedConnect Partner
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 font-heading">
            Family Visiting China?
          </h3>
          <p className="text-slate-600 text-lg max-w-xl">
            Help them access quality healthcare in Shanghai. Our concierge partner navigates top-tier hospitals for specialized treatments (cardiovascular, CAR-T oncology, neuroscience) with dedicated medical interpreters.
          </p>
        </div>
        
        <div className="flex-shrink-0 flex flex-col items-center sm:items-end gap-3">
          <a 
            href="https://www.shanghaimed.help/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:bg-slate-900 hover:shadow-lg hover:-translate-y-0.5"
          >
            Access VIP Health Guide
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
