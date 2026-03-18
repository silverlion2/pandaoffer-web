import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIAdvisor from '@/components/tools/AIAdvisor';
import DocumentWizard from '@/components/tools/DocumentWizard';
import ROICalculator from '@/components/tools/ROICalculator';
import TimelineGenerator from '@/components/tools/TimelineGenerator';
import CityComparator from '@/components/tools/CityComparator';
import BudgetCalculator from '@/components/home/BudgetCalculator';
import AiMatcherForm from '@/components/home/AiMatcherForm';

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

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full space-y-16">
        
        <header className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">
            Tools & Calculators
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to plan, budget, and prepare for your studies in China—free and 100% accurate.
          </p>
        </header>

        {/* Quick Navigation */}
        <nav className="flex flex-wrap justify-center gap-2 mb-4 sticky top-16 z-20 bg-slate-50/90 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-slate-100">
          {[
            { id: 'advisor', label: '🧠 AI Advisor', badge: 'BETA' },
            { id: 'docs', label: '📄 Documents' },
            { id: 'roi', label: '📊 ROI Calculator' },
            { id: 'timeline', label: '📅 Timeline' },
            { id: 'city', label: '🏙️ City Compare' },
            { id: 'budget', label: '💰 Budget' },
            { id: 'matcher', label: '✨ AI Matcher' },
          ].map(tool => (
            <a
              key={tool.id}
              href={`#${tool.id}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 text-slate-600 transition-all whitespace-nowrap flex items-center gap-1"
            >
              {tool.label}
              {tool.badge && (
                <span className="text-[8px] font-bold bg-violet-100 text-violet-600 px-1 py-0.5 rounded-full uppercase">{tool.badge}</span>
              )}
            </a>
          ))}
        </nav>

        <section id="advisor" className="scroll-mt-24">
          <AIAdvisor />
        </section>

        <section id="docs" className="scroll-mt-24">
          <DocumentWizard />
        </section>

        <section id="roi" className="scroll-mt-24">
          <ROICalculator />
        </section>
        
        <section id="timeline" className="scroll-mt-24">
          <TimelineGenerator />
        </section>

        <section id="city" className="scroll-mt-24">
          <CityComparator />
        </section>

        <section id="budget" className="scroll-mt-24">
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6 text-center">Cost & Budgeting</h2>
          <BudgetCalculator />
        </section>

        <section id="matcher" className="scroll-mt-24">
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6 text-center">AI Program Matcher</h2>
          <AiMatcherForm />
        </section>

      </main>

      <Footer />
    </div>
  );
}
