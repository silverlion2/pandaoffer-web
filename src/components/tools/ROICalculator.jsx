"use client";

import React, { useState, useMemo } from 'react';
import { TrendingDown, Lightbulb, Wallet, Calculator, Building2 } from 'lucide-react';

const DURATION_OPTIONS = [
  { id: 4, label: '4-Year Bachelor' },
  { id: 2, label: '2-3 Year Master' },
  { id: 3, label: '3-4 Year PhD' },
];

const LIFESTYLE_OPTIONS = [
  { id: 'budget', label: 'Budget (Dorm)', multiplier: 0.7 },
  { id: 'standard', label: 'Standard (Shared Apt)', multiplier: 1.0 },
  { id: 'premium', label: 'Premium (Solo Apt)', multiplier: 1.5 },
];

const SCHOLARSHIP_OPTIONS = [
  { id: 'none', label: 'No Scholarship (Self-Funded)', tuitionDiscount: 0, livingStipend: 0 },
  { id: 'partial', label: 'Partial (Free Tuition Only)', tuitionDiscount: 1, livingStipend: 0 },
  { id: 'provincial', label: 'Provincial (Tuition + Dorm)', tuitionDiscount: 1, livingStipend: 1000 }, // ~¥1000/mo housing allowance
  { id: 'full', label: 'Full CSC (Tuition + Stipend)', tuitionDiscount: 1, livingStipend: 3000 }, // Master's ¥3000/mo, PhD ¥3500/mo
];

// Base Annual Costs in USD (sourced from RAG: vlog_budget_hacks, cost_of_living, scholarship data)
// China living = ¥30,000-48,000/yr (~$4,200-6,700) from student vlogger consensus
const BASE_COSTS = {
  china: { tuition: 3500, living: 5400 },   // Avg tuition ¥20-30K; living ¥2,500-4,000/mo from vloggers
  usa: { tuition: 38000, living: 18000 },
  uk: { tuition: 24000, living: 16000 },
  aus: { tuition: 27000, living: 17000 },
  canada: { tuition: 22000, living: 14000 },
};

export default function ROICalculator() {
  const [duration, setDuration] = useState(4);
  const [lifestyle, setLifestyle] = useState('standard');
  const [scholarship, setScholarship] = useState('none');

  const calcData = useMemo(() => {
    const lifeMult = LIFESTYLE_OPTIONS.find(l => l.id === lifestyle).multiplier;
    const schol = SCHOLARSHIP_OPTIONS.find(s => s.id === scholarship);

    // China Cost Calculation
    const chinaAnnualTuition = BASE_COSTS.china.tuition * (1 - schol.tuitionDiscount);
    const chinaAnnualLiving = BASE_COSTS.china.living * lifeMult;
    const chinaStipendAnnual = schol.livingStipend * 12 * 0.14; // Approximate RMB to USD
    const chinaAnnualTotal = Math.max(0, chinaAnnualTuition + chinaAnnualLiving - chinaStipendAnnual);
    const chinaTotal = chinaAnnualTotal * duration;

    // USA, UK, AUS, Canada Cost Calculations (no scholarship for comparison)
    const usaTotal = (BASE_COSTS.usa.tuition + BASE_COSTS.usa.living * lifeMult) * duration;
    const ukTotal = (BASE_COSTS.uk.tuition + BASE_COSTS.uk.living * lifeMult) * duration;
    const ausTotal = (BASE_COSTS.aus.tuition + BASE_COSTS.aus.living * lifeMult) * duration;
    const canadaTotal = (BASE_COSTS.canada.tuition + BASE_COSTS.canada.living * lifeMult) * duration;

    const maxTotal = Math.max(usaTotal, ukTotal, ausTotal, canadaTotal, chinaTotal);

    return {
      china: { total: chinaTotal, height: `${(chinaTotal / maxTotal) * 100}%` },
      usa: { total: usaTotal, height: `${(usaTotal / maxTotal) * 100}%` },
      uk: { total: ukTotal, height: `${(ukTotal / maxTotal) * 100}%` },
      aus: { total: ausTotal, height: `${(ausTotal / maxTotal) * 100}%` },
      canada: { total: canadaTotal, height: `${(canadaTotal / maxTotal) * 100}%` },
      savings: usaTotal - chinaTotal
    };
  }, [duration, lifestyle, scholarship]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1">
        <TrendingDown size={14} /> Compare Costs
      </div>

      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading">Study Abroad ROI Calculator</h2>
        <p className="text-slate-500">
          See exactly how much you save by choosing China over traditional Western study destinations. 
        </p>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-6 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Study Duration</label>
          <select 
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-slate-700"
          >
            {DURATION_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Living Standard</label>
          <select 
            value={lifestyle}
            onChange={(e) => setLifestyle(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-slate-700"
          >
            {LIFESTYLE_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Expected China Scholarship</label>
          <select 
            value={scholarship}
            onChange={(e) => setScholarship(e.target.value)}
            className="w-full p-3 rounded-xl border border-emerald-300 bg-emerald-50/50 text-emerald-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium"
          >
            {SCHOLARSHIP_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white border-2 border-emerald-100 rounded-2xl p-6 mb-10 shadow-sm relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-5">
          <Wallet size={120} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">Total Savings vs USA</h3>
          <p className="text-slate-500 text-sm">Over the course of your {duration}-year degree</p>
        </div>
        <div className="text-4xl md:text-5xl font-extrabold text-emerald-600 mt-4 md:mt-0 tracking-tight">
          {formatCurrency(calcData.savings)}
        </div>
      </div>

      {/* Chart */}
      <div className="pt-8 mb-6 border-t border-slate-100">
        <h3 className="text-center font-bold text-slate-700 mb-8 uppercase tracking-widest text-sm">Total {duration}-Year Cost Comparison</h3>
        
        <div className="flex items-end justify-center gap-4 md:gap-8 h-64 md:h-80">
          {/* Bar USA */}
          <div className="w-16 md:w-24 group relative flex flex-col items-center justify-end h-full">
            <span className="absolute -top-8 font-bold text-slate-600 group-hover:-translate-y-1 transition-transform">{formatCurrency(calcData.usa.total)}</span>
            <div 
              className="w-full bg-slate-200 rounded-t-xl transition-all duration-700 ease-elastic hover:bg-slate-300"
              style={{ height: calcData.usa.height }}
            ></div>
            <span className="mt-3 font-bold text-slate-700 text-sm md:text-base">USA</span>
          </div>

          {/* Bar UK */}
          <div className="w-16 md:w-24 group relative flex flex-col items-center justify-end h-full">
            <span className="absolute -top-8 font-bold text-slate-600 group-hover:-translate-y-1 transition-transform">{formatCurrency(calcData.uk.total)}</span>
            <div 
              className="w-full bg-slate-200 rounded-t-xl transition-all duration-700 ease-elastic hover:bg-slate-300"
              style={{ height: calcData.uk.height }}
            ></div>
            <span className="mt-3 font-bold text-slate-700 text-sm md:text-base">UK</span>
          </div>

          {/* Bar AUS */}
          <div className="w-16 md:w-24 group relative flex flex-col items-center justify-end h-full">
            <span className="absolute -top-8 font-bold text-slate-600 group-hover:-translate-y-1 transition-transform">{formatCurrency(calcData.aus.total)}</span>
            <div 
              className="w-full bg-slate-200 rounded-t-xl transition-all duration-700 ease-elastic hover:bg-slate-300"
              style={{ height: calcData.aus.height }}
            ></div>
            <span className="mt-3 font-bold text-slate-700 text-sm md:text-base">AUS</span>
          </div>

          {/* Bar Canada */}
          <div className="w-16 md:w-24 group relative flex flex-col items-center justify-end h-full">
            <span className="absolute -top-8 font-bold text-slate-600 group-hover:-translate-y-1 transition-transform">{formatCurrency(calcData.canada.total)}</span>
            <div 
              className="w-full bg-slate-200 rounded-t-xl transition-all duration-700 ease-elastic hover:bg-slate-300"
              style={{ height: calcData.canada.height }}
            ></div>
            <span className="mt-3 font-bold text-slate-700 text-sm md:text-base">CAN</span>
          </div>

          {/* Bar China */}
          <div className="w-20 md:w-32 group relative flex flex-col items-center justify-end h-full">
            <span className="absolute -top-10 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-sm font-bold shadow-sm whitespace-nowrap z-10 group-hover:-translate-y-1 transition-transform">
              {formatCurrency(calcData.china.total)}
            </span>
            <div 
              className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-xl shadow-lg shadow-emerald-200 transition-all duration-700 ease-elastic relative"
              style={{ height: calcData.china.height || '5%' }} 
            >
              {calcData.china.total === 0 && (
                <div className="absolute bottom-full w-full flex justify-center pb-2">
                  <span className="text-emerald-500 font-bold text-xs uppercase bg-white px-2 py-0.5 rounded shadow-sm">Free!</span>
                </div>
              )}
            </div>
            <span className="mt-3 font-extrabold text-emerald-700 text-base md:text-lg">CHINA</span>
          </div>
        </div>
      </div>

      <div className="mt-10 p-5 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3">
        <Lightbulb size={24} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-900/80 leading-relaxed">
          <strong className="text-blue-900">Did you know?</strong> China has 274 CSC-eligible universities offering fully funded scholarships covering tuition, dorm, monthly stipend (¥2,500–3,500/mo), and medical insurance. Student vloggers report comfortable monthly budgets of ¥2,500 in Tier 2 cities and ¥4,000 in Tier 1 — making China the highest ROI study destination globally.
        </p>
      </div>

      <style jsx>{`
        .ease-elastic {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
