"use client";
import React, { useState } from 'react';
import { Search, Lock, CheckCircle, GraduationCap, MapPin, DollarSign, ArrowRight, ArrowLeft, ShieldCheck, MessageSquare, BookOpen, Coffee, PlayCircle, Globe2, Calculator, Plane, Wifi, Smartphone, TrendingUp } from 'lucide-react';

// ⚠️ 注意：由于右侧在线预览环境的限制，我暂时将 Supabase 的真实引入注释掉了以保证预览正常运行。
// ⚠️ 当你在本地 VS Code 中运行代码时，请【取消下面这行代码的注释】（删掉前面的双斜杠）：
// import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 
const supabaseUrl = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_URL) || '';
const supabaseAnonKey = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) || '';

// ⚠️ 当你在本地 VS Code 中运行代码时，请【取消下面这行真实代码的注释】：
// const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// ⚠️ 并且【删除】下面这行用于在线预览的模拟代码：
const supabase = { from: () => ({ insert: async () => ({ error: null }) }) };

export default function PandaOfferApp() {
  const [step, setStep] = useState('home'); 
  const [email, setEmail] = useState('');
  
  // 生活费计算器状态
  const [budget, setBudget] = useState(400);

  const [formData, setFormData] = useState({
    nationality: '',
    major: '',
    gpa: '',
  });

  const handleMatch = (e) => {
    e.preventDefault();
    if (!formData.nationality || !formData.major || !formData.gpa) {
      alert("Please fill in all fields to get your match.");
      return;
    }
    setStep('analyzing');
    setTimeout(() => {
      setStep('results');
    }, 2000); 
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      
      // 如果 supabase 没有正确连接，给个提示
      if (!supabase) {
        alert("Database not connected. Please check your .env.local file.");
        return;
      }

      // 这一步是把邮箱写进数据库的 leads 表！
      const { data, error } = await supabase
        .from('leads')
        .insert([ { email: email } ]);

      if (error) {
        alert('Oops, something went wrong!');
        console.error(error);
      } else {
        setStep('unlocked'); // 成功后，显示解锁画面
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 顶部导航 */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <span className="font-extrabold text-xl tracking-tight">PandaOffer</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 hidden md:block">Universities</a>
          <a href="#discover" className="text-sm font-medium text-slate-600 hover:text-emerald-600 hidden md:block">Life in China</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 hidden md:block">Scholarships</a>
          
          {/* 更新：顶部导航栏的 Discord 链接 */}
          <a 
            href="https://discord.gg/7bU9kb23 " 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare size={16} />
            <span className="hidden sm:inline">Join Discord</span>
          </a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {step === 'home' && (
          <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* 第一部分：核心 AI 工具 (转化漏斗) */}
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-200">
                  Your Journey Starts Here 🇨🇳
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mt-4">
                  Zero BS. Just Your <span className="text-emerald-500">Best Fit</span> in China.
                </h1>
                <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
                  Stop guessing. Get instant, AI-driven insights on university matching, <strong className="text-slate-700">WHO/NMC certification</strong>, and your real <strong className="text-slate-700">CSC Scholarship</strong> probability.
                </p>
              </div>

              {/* AI 匹配表单 */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                  <Search className="text-emerald-500" /> Find My Top 3 Universities
                </h2>
                <form onSubmit={handleMatch} className="space-y-4 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Nationality</label>
                      <select 
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={formData.nationality}
                        onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                      >
                        <option value="">Select country...</option>
                        <option value="India">India</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Target Major</label>
                      <select 
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={formData.major}
                        onChange={(e) => setFormData({...formData, major: e.target.value})}
                      >
                        <option value="">Select major...</option>
                        <option value="MBBS">Medicine (MBBS - English)</option>
                        <option value="STEM">Engineering / STEM</option>
                        <option value="Business">Business / Economy</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Current GPA / Marks (%)</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 85% or 3.5/4.0" 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={formData.gpa}
                      onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Generate My AI Report <ArrowRight size={20} />
                  </button>
                </form>
                <p className="text-xs text-center text-slate-400 mt-4">
                  100% Free. Powered by Real Admission Data & AI.
                </p>
              </div>
            </div>

            {/* 高互动流量工具与原生广告变现 (Traffic & Quick Money Area) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12 border-t border-slate-200">
              
              {/* 强互动工具：生活费计算器 */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1">
                  <Calculator size={14} /> Popular Tool
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Can I afford studying in China?</h3>
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
                  <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <MapPin size={18} className="text-emerald-500" /> You can live comfortably in:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {budget < 300 && <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm">Small cities (e.g., Jinzhou, Jilin)</span>}
                    {budget >= 300 && budget < 600 && (
                      <>
                        <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium">Wuhan</span>
                        <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium">Chengdu</span>
                        <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium">Xi'an</span>
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

                {/* 原生联盟广告 (Wise) */}
                <a 
                  href="这里替换成Wise的联盟链接" 
                  target="_blank" 
                  rel="noopener noreferrer"
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

              {/* 学生必备省钱包 / 高佣金联盟区 */}
              <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="text-orange-400" />
                  <h3 className="text-xl font-bold">Student Deals</h3>
                </div>
                <p className="text-sm text-slate-400 mb-6">Essential tools for surviving in China with exclusive discounts.</p>
                
                <div className="space-y-4">
                  {/* ExpressVPN 广告 */}
                  <a 
                    href="这里替换成ExpressVPN的联盟链接" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 hover:border-emerald-500/50 group"
                  >
                    <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-emerald-500/20 mr-3">
                      <Wifi size={20} className="text-slate-300 group-hover:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-slate-200">ExpressVPN</h4>
                      <p className="text-xs text-slate-400">Works in China • 49% OFF</p>
                    </div>
                    <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Get</span>
                  </a>

                  {/* Trip.com 广告 */}
                  <a 
                    href="https://www.trip.com/?Allianceid=7919136&SID=297504901&trip_sub1=A01&trip_sub3=D13597019" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 hover:border-blue-500/50 group"
                  >
                    <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-blue-500/20 mr-3">
                      <Plane size={20} className="text-slate-300 group-hover:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-slate-200">Trip.com Flights</h4>
                      <p className="text-xs text-slate-400">Student fares to PEK/PVG</p>
                    </div>
                    <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Book</span>
                  </a>

                  {/* eSIM 广告 */}
                  <a 
                    href="这里替换成eSIM的联盟链接" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 hover:border-orange-500/50 group"
                  >
                    <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-orange-500/20 mr-3">
                      <Smartphone size={20} className="text-slate-300 group-hover:text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-slate-200">China eSIM</h4>
                      <p className="text-xs text-slate-400">Data upon landing • $5 credit</p>
                    </div>
                    <span className="text-xs font-bold bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Buy</span>
                  </a>
                </div>
                <div className="text-center mt-6">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Affiliate Links Support Us</span>
                </div>
              </div>

            </div>

            {/* 第二部分：内容种草区 (Top of Funnel: Discover China) */}
            <div id="discover" className="pt-8 border-t border-slate-200 mt-12">
              
              {/* 广告位占位符 (体现全球流量变现) */}
              <div className="w-full bg-slate-100 h-24 flex flex-col items-center justify-center text-slate-400 text-sm rounded-xl mb-12 border border-slate-200 border-dashed relative group overflow-hidden">
                <span className="font-bold text-slate-500">Sponsored Advertisement Area</span>
                <span className="text-xs">e.g., Alipay, Trip.com, VPN Services, Student Insurances</span>
                <div className="absolute top-2 right-2 bg-slate-200 text-[10px] px-2 py-0.5 rounded text-slate-500 uppercase">Ad</div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900">Discover China</h2>
                  <p className="text-slate-500 mt-2">Everything you need to know before you pack your bags.</p>
                </div>
                <button className="text-emerald-600 font-bold hover:underline hidden md:block">View all guides &rarr;</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 类别 1: 留学干货 101 */}
                <div className="group cursor-pointer">
                  <div className="h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-slate-800 flex items-center justify-center transition-transform group-hover:scale-105">
                       <BookOpen size={48} className="text-white opacity-50" />
                    </div>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                      Study 101
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    The Ultimate CSC Scholarship Guide (2026)
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    Step-by-step tutorial on how to apply for the Chinese Government Scholarship, covering tuition, accommodation, and monthly stipends.
                  </p>
                </div>

                {/* 类别 2: 生活方式与文化 */}
                <div className="group cursor-pointer">
                  <div className="h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center transition-transform group-hover:scale-105">
                       <Coffee size={48} className="text-white opacity-50" />
                    </div>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                      Lifestyle
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    Cashless Survival: Alipay & WeChat Pay
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    China is virtually cashless. Here is how international students can link their foreign credit cards to pay for everything from high-speed trains to street food.
                  </p>
                </div>

                {/* 类别 3: 城市对比 */}
                <div className="group cursor-pointer">
                  <div className="h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-900 flex items-center justify-center transition-transform group-hover:scale-105">
                       <Globe2 size={48} className="text-white opacity-50" />
                    </div>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                      City Guides
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    Beijing vs. Hangzhou: Where to Study?
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    Comparing the cultural heart of China with the Silicon Valley of the East. Cost of living, tech vibes, and university options explained.
                  </p>
                </div>

              </div>

              {/* 留学生真实发声 (Social Proof) */}
              <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
                <div className="relative z-10">
                  <PlayCircle size={48} className="mx-auto text-emerald-400 mb-6" />
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">Hear from 10,000+ Students Already in China</h2>
                  <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                    Don't just take our word for it. Watch vlogs, read campus reviews, and connect directly with international students from 120+ countries.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
                      Watch Student Vlogs
                    </button>

                    {/* 更新：社区模块的 Discord 链接 */}
                    <a 
                      href="这里粘贴你刚刚复制的Discord链接" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-slate-800 border border-slate-700 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare size={18} /> Ask on Discord
                    </a>
                  </div>
                </div>
              </div>
              
              {/* 线上收费服务区 (Bottom of Funnel: Premium Services) */}
              <div className="mt-20 pt-16 border-t border-slate-200">
                <div className="text-center mb-12">
                  <span className="bg-blue-100 text-blue-800 text-sm font-bold px-4 py-1.5 rounded-full border border-blue-200">
                    Premium Services
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 mt-4">Serious about your future in China?</h2>
                  <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
                    Let our former admission officers and verified alumni guide you step-by-step. Get guaranteed results or your money back.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Service 1 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow relative">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">1v1 Strategy Call</h3>
                    <div className="text-3xl font-extrabold text-slate-900 mb-4">$49<span className="text-sm text-slate-500 font-normal"> / 45 mins</span></div>
                    <ul className="space-y-3 mb-8 text-sm text-slate-600">
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Profile evaluation & weakness fixing</li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Medical certification (WHO/NMC) advice</li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Q&A with real alumni</li>
                    </ul>
                    <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-colors">
                      Book a Session
                    </button>
                  </div>

                  {/* Service 2 - Highlighting this one */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative transform md:-translate-y-4">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">CSC Scholarship Pro</h3>
                    <div className="text-3xl font-extrabold text-white mb-4">$299<span className="text-sm text-slate-400 font-normal"> / one-time</span></div>
                    <ul className="space-y-3 mb-8 text-sm text-slate-300">
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" /> Everything in Strategy Call</li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" /> Statement of Purpose (SOP) rewrite</li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" /> Recommendation letter templates</li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" /> Direct professor contact list</li>
                    </ul>
                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      Get Full Scholarship
                    </button>
                  </div>

                  {/* Service 3 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Done-For-You</h3>
                    <div className="text-3xl font-extrabold text-slate-900 mb-4">$899+<span className="text-sm text-slate-500 font-normal"> / package</span></div>
                    <ul className="space-y-3 mb-8 text-sm text-slate-600">
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> We handle the ENTIRE application</li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Guaranteed admission or 100% refund</li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Visa processing assistance</li>
                      <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Airport pickup & dorm booking</li>
                    </ul>
                    <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-colors">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* AI 分析动画状态 */}
        {step === 'analyzing' && (
          <div className="text-center space-y-6 py-20 animate-pulse">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
            <h2 className="text-2xl font-bold text-slate-800">AI is analyzing your profile...</h2>
            <p className="text-slate-500">Cross-referencing 50+ Top Chinese Universities and Medical Councils data.</p>
          </div>
        )}

        {/* 核心分析结果与锁定区域 */}
        {(step === 'results' || step === 'unlocked') && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* 返回主页按钮 */}
            <div className="flex justify-start">
              <button 
                onClick={() => setStep('home')}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200"
              >
                <ArrowLeft size={16} /> Back to Search
              </button>
            </div>

            <div className="text-center space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full">Analysis Complete</span>
              <h2 className="text-3xl font-extrabold text-slate-900">We found your 92% Match!</h2>
              <p className="text-slate-500">Based on your {formData.nationality} nationality and {formData.gpa} GPA.</p>
            </div>

            {/* 大学匹配卡片 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
              
              {/* 公开可见信息 (Aha Moment) */}
              <div className="p-6 md:p-8 border-b border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      Zhejiang University (ZJU) <ShieldCheck className="text-blue-500" size={24} />
                    </h3>
                    <p className="text-slate-500 font-medium">Top 5 in China • C9 League</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-bold text-sm border border-green-200">
                    92% Match
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><GraduationCap size={20} /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Program</p>
                      <p className="font-semibold">{formData.major === 'MBBS' ? 'MBBS (English)' : 'BSc Computer Science'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><MapPin size={20} /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Location</p>
                      <p className="font-semibold">Hangzhou, China</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><DollarSign size={20} /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Tuition / Year</p>
                      <p className="font-semibold">~ $6,200 USD</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 核心敏感数据区域 (Email Wall 拦截点) */}
              <div className="relative">
                {step === 'results' && (
                  <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/60 flex flex-col items-center justify-center p-6 text-center border-t border-slate-100">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full animate-in zoom-in-95">
                      <Lock className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                      <h4 className="text-xl font-bold mb-2">Unlock the Full Report</h4>
                      <p className="text-sm text-slate-500 mb-6">
                        Enter your email to reveal WHO/NMC certification status, CSC full-scholarship probability, and 2 other matching universities.
                      </p>
                      <form onSubmit={handleUnlock} className="space-y-3">
                        <input 
                          type="email" 
                          required
                          placeholder="Your email address" 
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        {/* 高转化率的合规选项 (Required Checkbox) */}
                        <label className="flex items-start gap-2 text-left cursor-pointer group pb-2">
                          <input 
                            type="checkbox" 
                            required 
                            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer" 
                          />
                          <span className="text-[11px] text-slate-500 leading-tight">
                            I agree to the <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a> & <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>, and consent to receive updates.
                          </span>
                        </label>

                        <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                          Reveal Hidden Data
                        </button>
                      </form>
                      <p className="text-xs text-slate-400 mt-4">Bank-level encryption. No spam ever.</p>
                    </div>
                  </div>
                )}

                {/* 底部被模糊/解锁的内容 */}
                <div className={`p-6 md:p-8 bg-slate-50 ${step === 'results' ? 'blur-sm select-none opacity-50' : ''}`}>
                  <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Critical Application Data</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <p className="text-sm text-slate-500 font-bold uppercase mb-1">Medical Certification</p>
                      <div className="space-y-2 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">WHO Recognized</span>
                          <CheckCircle className="text-emerald-500" size={18} />
                        </div>
                        {formData.nationality === 'India' && (
                          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                            <span className="font-medium">NMC (India) Approved</span>
                            <CheckCircle className="text-emerald-500" size={18} />
                          </div>
                        )}
                        {formData.nationality === 'Pakistan' && (
                          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                            <span className="font-medium">PMDC (Pakistan) Approved</span>
                            <CheckCircle className="text-emerald-500" size={18} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-bl-lg">
                        AI Prediction
                      </div>
                      <p className="text-sm text-slate-500 font-bold uppercase mb-1">CSC Scholarship Probability</p>
                      <div className="mt-2">
                        <div className="flex items-end gap-2">
                          <span className="text-4xl font-extrabold text-slate-800">
                            {formData.gpa.includes('9') || formData.gpa > 85 ? '78%' : '35%'}
                          </span>
                          <span className="text-sm text-slate-500 mb-1">Success Rate</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                          <div 
                            className="bg-orange-500 h-full rounded-full" 
                            style={{width: formData.gpa.includes('9') || formData.gpa > 85 ? '78%' : '35%'}}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 mt-2">
                          * Competition is extremely high for this major. Early application (Dec-Jan) increases chances by 15%.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* 结果页广告位占位符 */}
            <div className="w-full bg-slate-100 h-20 flex flex-col items-center justify-center text-slate-400 text-xs rounded-xl border border-slate-200 border-dashed relative group overflow-hidden mt-6">
              <span className="font-bold text-slate-500 mb-1">Sponsored: Best VPN for Students in China 🇨🇳</span>
              <span>Stay connected with Google, WhatsApp, and YouTube. Get 70% off ExpressVPN today.</span>
              <div className="absolute top-1 right-1 bg-slate-200 text-[9px] px-1.5 py-0.5 rounded text-slate-500 uppercase">Ad</div>
            </div>

            {/* 解锁后的高阶动作 (Upsell / Community) */}
            {step === 'unlocked' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-[#5865F2] text-white p-6 rounded-2xl shadow-md flex flex-col justify-center items-center text-center">
                  <MessageSquare size={32} className="mb-3 opacity-90" />
                  <h4 className="font-bold text-lg mb-1">Have doubts? Ask real students.</h4>
                  <p className="text-sm text-blue-100 mb-4">Join our Discord to talk to students currently studying at ZJU.</p>
                  
                  {/* 更新：解锁后结果页底部的 Discord 链接 */}
                  <a 
                    href="这里粘贴你刚刚复制的Discord链接" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-[#5865F2] font-bold py-2 px-6 rounded-lg hover:bg-slate-50 transition-colors w-full flex items-center justify-center cursor-pointer"
                  >
                    Join Community (Free)
                  </a>
                </div>
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col justify-center items-center text-center">
                  <ShieldCheck size={32} className="mb-3 text-emerald-400" />
                  <h4 className="font-bold text-lg mb-1">Want guaranteed admission?</h4>
                  <p className="text-sm text-slate-400 mb-4">Book a 1v1 strategy call with our admission experts.</p>
                  <button className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-600 transition-colors w-full">
                    Book Strategy Call ($49)
                  </button>
                </div>
              </div>
            )}

            {/* 法律声明 */}
            <div className="text-center text-xs text-slate-400 max-w-3xl mx-auto pt-8 border-t border-slate-200">
              Disclaimer: Certification statuses (WHO/NMC/PMDC) and admission probabilities are generated based on historical data and AI models for reference only. PandaOffer does not guarantee admission. Please verify with your local medical council's latest official guidelines before applying.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}