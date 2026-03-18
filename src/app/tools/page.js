import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText, TrendingDown, Calendar, Scale, Calculator, Sparkles, Brain, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Tools & Calculators | PandaOffer',
  description: 'Free interactive tools for international students planning to study in China. AI Advisor, calculators, timelines, and document wizards.',
  openGraph: {
    title: 'Tools & Calculators | PandaOffer',
    description: 'Free interactive tools for international students planning to study in China. AI Advisor, calculators, timelines, and document wizards.',
    url: 'https://www.pandaoffer.top/tools',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/tools',
  },
};

const TOOLS = [
  {
    title: '🧠 AI Study Advisor',
    desc: 'Expert answers powered by hundreds of real sources — not generic AI. Ask anything about studying in China.',
    icon: <Brain size={32} className="text-violet-500" />,
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    hoverBorder: 'hover:border-violet-400',
    link: '/tools/advisor',
    badge: 'BETA',
  },
  {
    title: 'Document Wizard',
    desc: 'Generate a 100% accurate document checklist based on your degree level. Never miss a required form.',
    icon: <FileText size={32} className="text-blue-500" />,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
    link: '/tools/documents',
  },
  {
    title: 'ROI Calculator',
    desc: 'Compare total costs of studying in China vs. USA, UK, or Australia. See how much you actually save.',
    icon: <TrendingDown size={32} className="text-emerald-500" />,
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
    link: '/tools/roi',
  },
  {
    title: 'Timeline Generator',
    desc: 'Get a personalized application roadmap and deadline tracker for your target intake.',
    icon: <Calendar size={32} className="text-indigo-500" />,
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    hoverBorder: 'hover:border-indigo-400',
    link: '/tools/timeline',
  },
  {
    title: 'City Comparator',
    desc: 'Side-by-side comparison of life, costs, weather, and student experience in top Chinese cities.',
    icon: <Scale size={32} className="text-rose-500" />,
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    hoverBorder: 'hover:border-rose-400',
    link: '/tools/city',
  },
  {
    title: 'Budget Calculator',
    desc: 'See which cities match your target monthly living budget as an international student.',
    icon: <Calculator size={32} className="text-amber-500" />,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    hoverBorder: 'hover:border-amber-400',
    link: '/tools/budget',
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full">
        
        <header className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">
            Tools & Calculators
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to plan, budget, and prepare for your studies in China — free and 100% accurate.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map(tool => (
            <Link
              key={tool.title}
              href={tool.link}
              className={`group block p-8 rounded-2xl border ${tool.border} ${tool.bg} ${tool.hoverBorder} hover:shadow-lg transition-all hover:-translate-y-1`}
            >
              <div className="mb-5 bg-white w-14 h-14 rounded-xl shadow-sm flex items-center justify-center">
                {tool.icon}
              </div>
              <h2 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors flex items-center gap-2">
                {tool.title}
                {tool.badge && (
                  <span className="text-[9px] font-bold bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider">{tool.badge}</span>
                )}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{tool.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 group-hover:text-emerald-600 transition-colors">
                Open Tool <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA to AI Matcher (homepage) */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-white border border-slate-200 rounded-2xl px-10 py-8 shadow-sm">
            <Sparkles size={28} className="text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-900">Looking for the AI Program Matcher?</h3>
            <p className="text-sm text-slate-500 max-w-md">Our flagship tool matches you with the best universities and scholarships based on your profile.</p>
            <Link
              href="/"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Go to AI Matcher
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
