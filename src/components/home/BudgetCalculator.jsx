"use client";

import React, { useState } from 'react';
import { Calculator, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function BudgetCalculator() {
  const [budget, setBudget] = useState(400);

  return (
    <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1">
        <Calculator size={14} /> Popular Tool
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">Can I afford studying in China?</h2>
      <p className="text-slate-500 mb-6">Move the slider to set your monthly living budget (excluding tuition).</p>
      
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <span className="text-4xl font-extrabold text-slate-900">${budget}</span>
          <span className="text-slate-500 font-medium">/ month</span>
        </div>
        <input 
          type="range" 
          min="200" max="1500" step="50"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium uppercase">
          <span>Tight ($200)</span>
          <span>Comfortable ($800+)</span>
        </div>
      </div>

      <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-6">
        <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
          <MapPin size={18} className="text-emerald-500" /> You can live comfortably in:
        </h3>
        <div className="flex flex-wrap gap-2">
          {budget < 300 && <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm">Small cities (e.g., Jinzhou, Jilin)</span>}
          {budget >= 300 && budget < 600 && (
            <>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium">Wuhan</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium">Chengdu</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium">Xi&apos;an</span>
            </>
          )}
          {budget >= 600 && (
            <>
              <span className="px-3 py-1 bg-white border border-emerald-200 text-emerald-800 rounded-lg text-sm font-bold shadow-sm">Shanghai</span>
              <span className="px-3 py-1 bg-white border border-emerald-200 text-emerald-800 rounded-lg text-sm font-bold shadow-sm">Beijing</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium">Hangzhou</span>
            </>
          )}
        </div>
      </div>

      <a 
        href={siteConfig.links.affiliates.wise} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Transfer tuition safely with Wise"
        className="flex items-center justify-between bg-blue-50/50 p-4 rounded-xl border border-blue-100 group cursor-pointer hover:bg-blue-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">W</div>
          <div>
            <p className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">Transfer tuition safely & save 5%</p>
            <p className="text-xs text-slate-500">Sponsored by Wise</p>
          </div>
        </div>
        <ArrowRight size={18} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}
