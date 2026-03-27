"use client";

import { useState } from 'react';
import { Calculator, CheckCircle2, ChevronRight, Award, GraduationCap, Briefcase, Languages, RefreshCcw } from 'lucide-react';

export default function VisaCalculator() {
  const [points, setPoints] = useState(0);
  const [calculated, setCalculated] = useState(false);

  // Simple state for the form
  const [form, setForm] = useState({
    salary: '0',
    education: '0',
    experience: '0',
    hsk: '0',
    age: '0'
  });

  const calculateScore = () => {
    // For demo purposes, we just sum up simplistic string values casted to integers
    // In reality, this requires the complex Chinese Z-Visa A/B/C tier calculation logic
    let total = 0;
    Object.values(form).forEach(val => total += parseInt(val, 10));
    setPoints(total);
    setCalculated(true);
  };

  const getTier = () => {
    if (points >= 85) return { tier: 'Class A (Top Talent)', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', desc: 'Highly sought after. Green channel processing.' };
    if (points >= 60) return { tier: 'Class B (Professional)', color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200', desc: 'Standard work permit. Most expats fall here.' };
    return { tier: 'Class C (Temporary)', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', desc: 'Restricted quotas. Needs special justification.' };
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm text-indigo-600">
            <Calculator size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Z-Visa Points Calculator
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            China uses a points-based system to classify foreign workers into A, B, and C tiers. Find out if you meet the 60-point threshold for a standard Z-Visa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Form Side */}
          <div className="md:col-span-3 space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            
            {/* Education */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 font-bold text-slate-800">
                <GraduationCap size={18} className="text-slate-400" />
                Highest Degree
              </label>
              <select 
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 bg-slate-50"
                value={form.education}
                onChange={(e) => setForm({...form, education: e.target.value})}
              >
                <option value="0">Select Degree...</option>
                <option value="10">Bachelor&apos;s Degree (10 pts)</option>
                <option value="15">Master&apos;s Degree (15 pts)</option>
                <option value="20">Ph.D. or higher (20 pts)</option>
              </select>
            </div>

            {/* Salary */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 font-bold text-slate-800">
                <Award size={18} className="text-slate-400" />
                Annual Salary (RMB)
              </label>
              <select 
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 bg-slate-50"
                value={form.salary}
                onChange={(e) => setForm({...form, salary: e.target.value})}
              >
                <option value="0">Select Range...</option>
                <option value="5">50k - 70k (5 pts)</option>
                <option value="10">70k - 100k (10 pts)</option>
                <option value="15">100k - 150k (15 pts)</option>
                <option value="20">150k+ (20 pts)</option>
              </select>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 font-bold text-slate-800">
                <Briefcase size={18} className="text-slate-400" />
                Related Work Experience
              </label>
              <select 
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 bg-slate-50"
                value={form.experience}
                onChange={(e) => setForm({...form, experience: e.target.value})}
              >
                <option value="0">Select Experience...</option>
                <option value="0">None / Fresh Grad (0 pts)</option>
                <option value="5">2 Years (5 pts)</option>
                <option value="10">3-4 Years (10 pts)</option>
                <option value="15">5+ Years (15 pts)</option>
              </select>
            </div>

            {/* HSK */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 font-bold text-slate-800">
                <Languages size={18} className="text-slate-400" />
                Chinese Proficiency (HSK)
              </label>
              <select 
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 bg-slate-50"
                value={form.hsk}
                onChange={(e) => setForm({...form, hsk: e.target.value})}
              >
                <option value="0">Select Level...</option>
                <option value="0">None / HSK 1-2 (0 pts)</option>
                <option value="2">HSK 3 (2 pts)</option>
                <option value="4">HSK 4 (4 pts)</option>
                <option value="5">HSK 5+ (5 pts)</option>
              </select>
            </div>

            <button 
              onClick={calculateScore}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors mt-4 shadow-sm"
            >
              Calculate My Score
            </button>
          </div>

          {/* Results Side */}
          <div className="md:col-span-2 space-y-6">
            {!calculated ? (
              <div className="h-full bg-slate-200 border border-slate-300 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-8 text-slate-500">
                <CheckCircle2 size={48} className="mb-4 opacity-50" />
                <p className="font-medium">Fill out the basic criteria to see your eligibility tier.</p>
              </div>
            ) : (
              <div className={`p-8 rounded-2xl border flex flex-col items-center text-center animate-in zoom-in-95 duration-500 ${getTier().bg}`}>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Your Score</div>
                <div className={`text-7xl font-black mb-4 ${getTier().color}`}>
                  {points}
                </div>
                <div className={`text-xl font-bold mb-2 ${getTier().color}`}>
                  {getTier().tier}
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  {getTier().desc}
                </p>

                <div className="w-full bg-white rounded-xl p-4 border border-opacity-50 text-left space-y-3 shadow-sm">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-600">Threshold (Class B)</span>
                    <span className="font-bold text-slate-900">60 points</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${points >= 60 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                      style={{ width: `${Math.min(100, (points / 60) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <button 
                  onClick={() => { setCalculated(false); setPoints(0); }}
                  className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <RefreshCcw size={16} />
                  Recalculate
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
