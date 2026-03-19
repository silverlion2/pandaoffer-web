import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText, TrendingDown, Calendar, Scale, Calculator, Sparkles, Brain, ArrowRight, Search, ClipboardCheck } from 'lucide-react';

export const metadata = {
  title: 'Tools & Calculators | PandaOffer',
  description: 'Free interactive tools for international students planning to study in China — organized by your journey stage. AI Advisor, calculators, timelines, and document generators.',
  openGraph: {
    title: 'Tools & Calculators | PandaOffer',
    description: 'Free interactive tools for international students planning to study in China. AI Advisor, calculators, timelines, and document generators.',
    url: 'https://www.pandaoffer.top/tools',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/tools',
  },
};

const JOURNEY_STAGES = [
  {
    stage: '🔍 Explore',
    subtitle: 'Research universities, compare costs, and discover what\'s possible.',
    tools: [
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
    ],
  },
  {
    stage: '📝 Apply',
    subtitle: 'Build your application, generate documents, and hit every deadline.',
    tools: [
      {
        title: 'Document Generator',
        desc: 'Generate study plans, SOPs, recommendation letters, and track your application documents across universities.',
        icon: <FileText size={32} className="text-blue-500" />,
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        hoverBorder: 'hover:border-blue-400',
        link: '/tools/documents',
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
    ],
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full">
        
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">
            Tools & Calculators
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to plan, budget, and prepare — organized by where you are in your journey.
          </p>
        </header>

        {/* AI Advisor — Featured / Stage-Agnostic */}
        <div className="mb-14">
          <Link
            href="/tools/advisor"
            className="group block bg-gradient-to-br from-violet-50 via-white to-violet-50 border-2 border-violet-200 hover:border-violet-400 rounded-2xl p-8 md:p-10 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0">
                <Brain size={36} className="text-violet-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors">🧠 AI Study Advisor</h2>
                  <span className="text-[10px] font-bold bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full uppercase tracking-wider">BETA</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Expert answers powered by hundreds of real sources — not generic AI. Ask anything about scholarships, visas, universities, costs, daily life, or career prospects. Works for every stage of your journey.
                </p>
              </div>
              <ArrowRight size={24} className="text-slate-400 group-hover:text-violet-500 group-hover:translate-x-1 transition-all flex-shrink-0 hidden md:block" />
            </div>
          </Link>
        </div>

        {/* Journey Stages */}
        {JOURNEY_STAGES.map((stage) => (
          <section key={stage.stage} className="mb-14">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-heading">{stage.stage}</h2>
              <p className="text-slate-500 text-sm mt-1">{stage.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {stage.tools.map(tool => (
                <Link
                  key={tool.title}
                  href={tool.link}
                  className={`group block p-7 rounded-2xl border ${tool.border} ${tool.bg} ${tool.hoverBorder} hover:shadow-lg transition-all hover:-translate-y-1`}
                >
                  <div className="mb-4 bg-white w-14 h-14 rounded-xl shadow-sm flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3">{tool.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 group-hover:text-emerald-600 transition-colors">
                    Open Tool <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* CTA to AI Matcher */}
        <div className="text-center mt-4">
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
