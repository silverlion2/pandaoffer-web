import React from 'react';
import Link from 'next/link';
import { FileText, TrendingDown, Calendar, Scale, Calculator, ArrowRight, Brain } from 'lucide-react';

const TOOLS = [
  {
    id: 'advisor',
    title: '🧠 AI Study Advisor',
    desc: 'Expert answers powered by hundreds of real sources — not generic AI.',
    icon: <Brain size={28} className="text-violet-500" />,
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    link: '/tools/advisor',
    badge: 'BETA'
  },
  {
    id: 'docs',
    title: 'Document Wizard',
    desc: 'Generate a 100% accurate document checklist based on your degree.',
    icon: <FileText size={28} className="text-blue-500" />,
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    link: '/tools/documents'
  },
  {
    id: 'roi',
    title: 'ROI Calculator',
    desc: 'Compare total costs of studying in China vs. USA, UK, or Australia.',
    icon: <TrendingDown size={28} className="text-emerald-500" />,
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    link: '/tools/roi'
  },
  {
    id: 'timeline',
    title: 'Timeline Generator',
    desc: 'Get a personalized application roadmap for your target intake.',
    icon: <Calendar size={28} className="text-indigo-500" />,
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    link: '/tools/timeline'
  },
  {
    id: 'city',
    title: 'City Comparator',
    desc: 'Side-by-side comparison of life & costs in top Chinese cities.',
    icon: <Scale size={28} className="text-rose-500" />,
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    link: '/tools/city'
  },
  {
    id: 'budget',
    title: 'Budget Calculator',
    desc: 'See which cities match your target monthly living budget.',
    icon: <Calculator size={28} className="text-emerald-500" />,
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    link: '/tools/budget'
  },
];

export default function ToolsMenu({ currentToolId }) {
  // If we are showing this on the home page, we might want to hide the tool that is currently fully rendered (optional)
  const visibleTools = currentToolId ? TOOLS.filter(t => t.id !== currentToolId) : TOOLS;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">Explore More Tools</h2>
          <p className="text-slate-500 text-sm">Free calculators, wizards, and planners to make your journey easier.</p>
        </div>
        <Link 
          href="/tools" 
          className="group flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {visibleTools.map(tool => (
          <Link 
            key={tool.id} 
            href={tool.link}
            className={`group block p-5 rounded-2xl border ${tool.border} ${tool.bg} hover:shadow-md transition-all hover:-translate-y-1`}
          >
            <div className="mb-4 bg-white w-12 h-12 rounded-xl shadow-sm flex items-center justify-center">
              {tool.icon}
            </div>
            <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
              {tool.title}
              {tool.badge && (
                <span className="text-[9px] font-bold bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider">{tool.badge}</span>
              )}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
