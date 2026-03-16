"use client";

import React, { useState } from 'react';
import { MapPin, Home, Coffee, Thermometer, Users, Scale, AlertTriangle } from 'lucide-react';

const CITY_DATA = {
  shanghai: {
    id: 'shanghai',
    name: 'Shanghai',
    tier: 'Tier 1',
    rentDorm: '$150 - $250',
    rentApt: '$600 - $1,200+',
    foodCost: '$$$',
    weather: 'Hot Summers, Cold/Damp Winters (No Central Heating)',
    expatVibe: 'Massive, diverse, very western-friendly.',
    topUnis: 'Fudan, SJTU, Tongji',
    color: 'emerald'
  },
  beijing: {
    id: 'beijing',
    name: 'Beijing',
    tier: 'Tier 1',
    rentDorm: '$120 - $200',
    rentApt: '$550 - $1,000+',
    foodCost: '$$$',
    weather: 'Hot Summers, Freezing/Dry Winters (Central Heating)',
    expatVibe: 'Large, academic, political hub.',
    topUnis: 'Tsinghua, Peking, RUC',
    color: 'rose'
  },
  guangzhou: {
    id: 'guangzhou',
    name: 'Guangzhou',
    tier: 'Tier 1',
    rentDorm: '$100 - $180',
    rentApt: '$400 - $800+',
    foodCost: '$$',
    weather: 'Long Hot/Humid Summers, Mild Winters',
    expatVibe: 'Huge international trading hub, diverse.',
    topUnis: 'Sun Yat-sen, SCUT',
    color: 'amber'
  },
  chengdu: {
    id: 'chengdu',
    name: 'Chengdu',
    tier: 'Tier 2',
    rentDorm: '$80 - $150',
    rentApt: '$250 - $500',
    foodCost: '$',
    weather: 'Cloudy, Mild/Humid (No Central Heating)',
    expatVibe: 'Relaxed, food-focused, growing expat scene.',
    topUnis: 'Sichuan Univ, UESTC',
    color: 'blue'
  },
  wuhan: {
    id: 'wuhan',
    name: 'Wuhan',
    tier: 'Tier 2',
    rentDorm: '$70 - $130',
    rentApt: '$200 - $450',
    foodCost: '$',
    weather: 'Extreme Heat Summers, Cold Winters (No Central Heating)',
    expatVibe: 'Student city, massive university population.',
    topUnis: 'Wuhan Univ, HUST',
    color: 'purple'
  },
  xian: {
    id: 'xian',
    name: "Xi'an",
    tier: 'Tier 2',
    rentDorm: '$60 - $120',
    rentApt: '$200 - $400',
    foodCost: '$',
    weather: 'Hot Summers, Cold Winters (Central Heating)',
    expatVibe: 'Historical, cultural, smaller but tight expat group.',
    topUnis: "Xi'an Jiaotong, NPU",
    color: 'orange'
  }
};

export default function CityComparator() {
  const [city1, setCity1] = useState('shanghai');
  const [city2, setCity2] = useState('chengdu');

  const c1 = CITY_DATA[city1];
  const c2 = CITY_DATA[city2];

  const getColorClasses = (color) => {
    const map = {
      emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      rose: 'bg-rose-50 text-rose-800 border-rose-200',
      amber: 'bg-amber-50 text-amber-800 border-amber-200',
      blue: 'bg-blue-50 text-blue-800 border-blue-200',
      purple: 'bg-purple-50 text-purple-800 border-purple-200',
      orange: 'bg-orange-50 text-orange-800 border-orange-200'
    };
    return map[color] || map.blue;
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-rose-50 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1">
        <Scale size={14} /> Compare Lifestyle
      </div>

      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading">Head-to-Head City Comparator</h2>
        <p className="text-slate-500">
          Deciding where to study is as important as what to study. Compare the cost of living and lifestyle of China&apos;s most popular student cities.
        </p>
      </div>

      {/* Selectors */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">City 1</label>
          <select 
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
            className={`w-full p-4 rounded-xl border-2 text-center font-bold text-lg outline-none transition-colors ${getColorClasses(c1.color)}`}
          >
            {Object.values(CITY_DATA).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-slate-400">VS</div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">City 2</label>
          <select 
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            className={`w-full p-4 rounded-xl border-2 text-center font-bold text-lg outline-none transition-colors ${getColorClasses(c2.color)}`}
          >
            {Object.values(CITY_DATA).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table/Cards */}
      <div className="space-y-4">
        
        {/* Row 1: Rent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100">
          <div className="order-2 md:order-1 text-center md:text-right">
            <div className="font-bold text-slate-800 text-lg md:text-xl">{c1.rentDorm}</div>
            <div className="text-xs text-slate-500">Campus Dorm / mo</div>
            <div className="font-bold text-slate-700 mt-2">{c1.rentApt}</div>
            <div className="text-xs text-slate-500">Off-Campus Apt / mo</div>
          </div>
          <div className="order-1 md:order-2 flex flex-col items-center justify-center text-slate-400 mb-4 md:mb-0">
            <Home size={24} className="mb-1 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-widest">Housing</span>
          </div>
          <div className="order-3 text-center md:text-left">
            <div className="font-bold text-slate-800 text-lg md:text-xl">{c2.rentDorm}</div>
            <div className="text-xs text-slate-500">Campus Dorm / mo</div>
            <div className="font-bold text-slate-700 mt-2">{c2.rentApt}</div>
            <div className="text-xs text-slate-500">Off-Campus Apt / mo</div>
          </div>
        </div>

        {/* Row 2: Food */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100">
          <div className="order-2 md:order-1 text-center md:text-right font-bold text-slate-800 text-lg md:text-xl">
            {c1.foodCost}
          </div>
          <div className="order-1 md:order-2 flex flex-col items-center justify-center text-slate-400 mb-4 md:mb-0">
            <Coffee size={24} className="mb-1 text-orange-400" />
            <span className="text-xs font-bold uppercase tracking-widest">Eating Out</span>
          </div>
          <div className="order-3 text-center md:text-left font-bold text-slate-800 text-lg md:text-xl">
            {c2.foodCost}
          </div>
        </div>

        {/* Row 3: Weather */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100">
          <div className="order-2 md:order-1 text-center md:text-right font-medium text-slate-700 text-sm">
            {c1.weather}
          </div>
          <div className="order-1 md:order-2 flex flex-col items-center justify-center text-slate-400 mb-4 md:mb-0">
            <Thermometer size={24} className="mb-1 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest">Weather</span>
          </div>
          <div className="order-3 text-center md:text-left font-medium text-slate-700 text-sm">
            {c2.weather}
          </div>
        </div>

        {/* Row 4: Vibe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100">
          <div className="order-2 md:order-1 text-center md:text-right font-medium text-slate-700 text-sm">
            {c1.expatVibe}
          </div>
          <div className="order-1 md:order-2 flex flex-col items-center justify-center text-slate-400 mb-4 md:mb-0">
            <Users size={24} className="mb-1 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest">Expat Scene</span>
          </div>
          <div className="order-3 text-center md:text-left font-medium text-slate-700 text-sm">
            {c2.expatVibe}
          </div>
        </div>

      </div>

      {/* Note about heating */}
      {(c1.weather.includes('No Central Heating') || c2.weather.includes('No Central Heating')) && (
        <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-900/80 leading-relaxed">
            <strong className="text-red-900">Heating Alert:</strong> Cities south of the Qinling-Huaihe line (like Shanghai, Chengdu, Wuhan) do not have centralized winter heating systems. Winters feel extremely damp and cold indoors unless you use A/C heaters or space heaters heavily!
          </p>
        </div>
      )}

    </div>
  );
}
