import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DocumentWizard from '@/components/tools/DocumentWizard';
import ROICalculator from '@/components/tools/ROICalculator';
import TimelineGenerator from '@/components/tools/TimelineGenerator';
import CityComparator from '@/components/tools/CityComparator';
import BudgetCalculator from '@/components/home/BudgetCalculator';
import AiMatcherForm from '@/components/home/AiMatcherForm';

export const metadata = {
  title: 'Tools & Calculators | PandaOffer',
  description: 'Free interactive tools for international students planning to study in China. Calculators, timelines, and document wizards.',
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full space-y-16">
        
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">
            Tools & Calculators
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to plan, budget, and prepare for your studies in China—free and 100% accurate.
          </p>
        </header>

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
