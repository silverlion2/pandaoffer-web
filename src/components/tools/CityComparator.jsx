"use client";

import React, { useState } from 'react';
import { MapPin, Home, Coffee, Thermometer, Users, Scale, AlertTriangle, GraduationCap, Lightbulb } from 'lucide-react';

const CITY_DATA = {
  shanghai: {
    id: 'shanghai',
    name: 'Shanghai',
    tier: 'Tier 1',
    population: '26M+',
    rentDorm: '¥1,500 - ¥3,000',
    rentApt: '¥4,000 - ¥8,000+',
    monthlyBudget: '¥4,000 - ¥8,000',
    foodCost: '$$$',
    weather: 'Hot Summers, Cold/Damp Winters (No Central Heating)',
    expatVibe: 'Most international city in China. Massive, diverse, very western-friendly.',
    topUnis: 'Fudan (10246), SJTU (10248), Tongji (10247)',
    insiderTip: 'SJTU Minhang campus is 1hr from city center. Fudan Handan campus is downtown. Choose wisely!',
    color: 'emerald'
  },
  beijing: {
    id: 'beijing',
    name: 'Beijing',
    tier: 'Tier 1',
    population: '22M+',
    rentDorm: '¥1,200 - ¥2,400',
    rentApt: '¥3,500 - ¥6,000+',
    monthlyBudget: '¥3,500 - ¥7,000',
    foodCost: '$$$',
    weather: 'Hot Summers, Freezing/Dry Winters (Central Heating)',
    expatVibe: 'Academic & political capital. Wudaokou = "Center of the Universe" for students.',
    topUnis: 'Tsinghua (10003), Peking (10001), RUC (10002), BLCU (10032), Beihang (10006)',
    insiderTip: 'Haidian district has 5+ top universities within walking distance. Best student district in Asia.',
    color: 'rose'
  },
  guangzhou: {
    id: 'guangzhou',
    name: 'Guangzhou',
    tier: 'Tier 1',
    population: '18M+',
    rentDorm: '¥1,000 - ¥1,800',
    rentApt: '¥2,500 - ¥5,000+',
    monthlyBudget: '¥3,000 - ¥5,500',
    foodCost: '$$',
    weather: 'Long Hot/Humid Summers, Mild Winters',
    expatVibe: 'International trade hub. Large African & SE Asian communities. Best Cantonese food.',
    topUnis: 'Sun Yat-sen/SYSU (10558), SCUT',
    insiderTip: 'SYSU has campuses in 3 cities (Guangzhou, Zhuhai, Shenzhen). Confirm which one your program is on!',
    color: 'amber'
  },
  chengdu: {
    id: 'chengdu',
    name: 'Chengdu',
    tier: 'Tier 2',
    population: '21M+',
    rentDorm: '¥800 - ¥1,500',
    rentApt: '¥1,500 - ¥3,500',
    monthlyBudget: '¥2,500 - ¥4,000',
    foodCost: '$',
    weather: 'Cloudy, Mild/Humid (No Central Heating)',
    expatVibe: 'Relaxed, food-loving, growing expat & startup scene. "Chinese Austin."',
    topUnis: 'Sichuan Univ, UESTC',
    insiderTip: 'Best food city in China. Incredible nightlife. But overcast 300+ days/year — bring vitamin D.',
    color: 'blue'
  },
  wuhan: {
    id: 'wuhan',
    name: 'Wuhan',
    tier: 'Tier 2',
    population: '13M+',
    rentDorm: '¥600 - ¥1,200',
    rentApt: '¥1,500 - ¥3,500',
    monthlyBudget: '¥2,000 - ¥3,500',
    foodCost: '$',
    weather: 'Extreme Heat Summers (40°C+), Cold Winters (No Central Heating)',
    expatVibe: 'China\'s biggest student city — 82 universities, 1M+ students.',
    topUnis: 'Wuhan Univ (10486), HUST (10487)',
    insiderTip: 'WU campus = most beautiful in China (cherry blossoms in March). HUST = "forest university." Both 985.',
    color: 'purple'
  },
  xian: {
    id: 'xian',
    name: "Xi'an",
    tier: 'Tier 2',
    population: '13M+',
    rentDorm: '¥500 - ¥1,000',
    rentApt: '¥1,200 - ¥2,800',
    monthlyBudget: '¥2,000 - ¥3,500',
    foodCost: '$',
    weather: 'Hot Summers, Cold Winters (Central Heating)',
    expatVibe: 'Ancient capital, Silk Road heritage. Best halal food in China (Muslim Quarter).',
    topUnis: "Xi'an Jiaotong/XJTU (10698), NPU",
    insiderTip: "XJTU's Innovation Harbor campus has cutting-edge labs but is 30min from city. Best for energy engineering.",
    color: 'orange'
  },
  hangzhou: {
    id: 'hangzhou',
    name: 'Hangzhou',
    tier: 'Tier 1.5',
    population: '12M+',
    rentDorm: '¥1,000 - ¥1,800',
    rentApt: '¥2,500 - ¥5,000',
    monthlyBudget: '¥3,000 - ¥5,000',
    foodCost: '$$',
    weather: 'Hot/Humid Summers, Cold/Wet Winters (No Central Heating)',
    expatVibe: 'China\'s Silicon Valley. Alibaba HQ. West Lake weekends. Best quality of life among C9 cities.',
    topUnis: 'Zhejiang Univ/ZJU (10335)',
    insiderTip: 'ZJU has 5 campuses — Zijingang is main for intl students. Easiest C9 admission with strong academics.',
    color: 'teal'
  },
  nanjing: {
    id: 'nanjing',
    name: 'Nanjing',
    tier: 'Tier 2',
    population: '9.5M+',
    rentDorm: '¥700 - ¥1,300',
    rentApt: '¥1,800 - ¥3,500',
    monthlyBudget: '¥2,500 - ¥4,000',
    foodCost: '$$',
    weather: 'Hot Summers, Cold Winters (No Central Heating)',
    expatVibe: 'Former capital of China. Deep cultural identity. Academic and literary tradition.',
    topUnis: 'Nanjing Univ (10284), Southeast Univ',
    insiderTip: 'Most underrated C9 school. Astronomy #1 in China. Lower competition than Beijing/Shanghai schools.',
    color: 'indigo'
  },
  harbin: {
    id: 'harbin',
    name: 'Harbin',
    tier: 'Tier 2',
    population: '10M+',
    rentDorm: '¥400 - ¥800',
    rentApt: '¥1,000 - ¥2,000',
    monthlyBudget: '¥1,500 - ¥2,500',
    foodCost: '$',
    weather: 'Extreme Cold Winters (-20 to -35°C!), Pleasant Summers (Central Heating)',
    expatVibe: 'Russian-influenced architecture. Few foreigners = full immersion. Ice Festival in Jan = bucket list.',
    topUnis: 'HIT (10213)',
    insiderTip: 'HIT Shenzhen campus hack: same degree, warm weather, tech scene. Ask about it during application!',
    color: 'sky'
  },
  shenzhen: {
    id: 'shenzhen',
    name: 'Shenzhen',
    tier: 'Tier 1',
    population: '17M+',
    rentDorm: '¥1,200 - ¥2,500',
    rentApt: '¥3,000 - ¥6,000+',
    monthlyBudget: '¥4,500 - ¥8,000',
    foodCost: '$$$',
    weather: 'Subtropical, Warm Year-Round, Typhoon Risk',
    expatVibe: 'China\'s youngest city. Tech innovation capital (Huawei, Tencent, DJI). Close to Hong Kong.',
    topUnis: 'SUSTech, Shenzhen Univ, Tsinghua Shenzhen, HIT Shenzhen',
    insiderTip: 'Best for CS/tech students and startup culture. Hong Kong weekend trips. No "old China" feeling here.',
    color: 'cyan'
  },
  kunming: {
    id: 'kunming',
    name: 'Kunming',
    tier: 'Tier 3',
    population: '8.5M+',
    rentDorm: '¥400 - ¥800',
    rentApt: '¥1,000 - ¥2,200',
    monthlyBudget: '¥2,000 - ¥3,500',
    foodCost: '$',
    weather: 'Spring-Like Year-Round (15-25°C) — Best Climate in China',
    expatVibe: 'Gateway to SE Asia. Stunning nature. Diverse ethnic cultures. Extremely relaxed pace.',
    topUnis: 'Yunnan Univ, Kunming Medical Univ',
    insiderTip: 'Perfect weather, perfect budget. Dali & Lijiang weekend trips. Best for gap year & language programs.',
    color: 'lime'
  },
  dalian: {
    id: 'dalian',
    name: 'Dalian',
    tier: 'Tier 2',
    population: '7M+',
    rentDorm: '¥500 - ¥1,000',
    rentApt: '¥1,500 - ¥3,000',
    monthlyBudget: '¥2,500 - ¥4,000',
    foodCost: '$$',
    weather: 'Cool Summers (Best in NE China), Cold but Manageable Winters (Central Heating)',
    expatVibe: 'Coastal gem. Japanese/Korean cultural influence. Clean air, seafood, growing IT sector.',
    topUnis: 'Dalian Univ of Tech/DUT, Dongbei Univ of Finance',
    insiderTip: 'Best climate in Northeast China. Finance students should consider Dongbei — top finance school.',
    color: 'slate'
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
      orange: 'bg-orange-50 text-orange-800 border-orange-200',
      teal: 'bg-teal-50 text-teal-800 border-teal-200',
      indigo: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      sky: 'bg-sky-50 text-sky-800 border-sky-200',
      cyan: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      lime: 'bg-lime-50 text-lime-800 border-lime-200',
      slate: 'bg-slate-100 text-slate-800 border-slate-300',
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

        {/* Row 5: Top Universities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100">
          <div className="order-2 md:order-1 text-center md:text-right font-medium text-slate-700 text-sm">
            {c1.topUnis}
          </div>
          <div className="order-1 md:order-2 flex flex-col items-center justify-center text-slate-400 mb-4 md:mb-0">
            <GraduationCap size={24} className="mb-1 text-violet-400" />
            <span className="text-xs font-bold uppercase tracking-widest">Universities</span>
          </div>
          <div className="order-3 text-center md:text-left font-medium text-slate-700 text-sm">
            {c2.topUnis}
          </div>
        </div>

        {/* Row 6: Insider Tip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center bg-violet-50 rounded-2xl p-4 md:p-6 border border-violet-100">
          <div className="order-2 md:order-1 text-center md:text-right font-medium text-violet-800 text-sm italic">
            &ldquo;{c1.insiderTip}&rdquo;
          </div>
          <div className="order-1 md:order-2 flex flex-col items-center justify-center text-violet-400 mb-4 md:mb-0">
            <Lightbulb size={24} className="mb-1 text-violet-500" />
            <span className="text-xs font-bold uppercase tracking-widest">Insider Tip</span>
          </div>
          <div className="order-3 text-center md:text-left font-medium text-violet-800 text-sm italic">
            &ldquo;{c2.insiderTip}&rdquo;
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
