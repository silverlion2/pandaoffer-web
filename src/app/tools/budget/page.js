import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BudgetCalculator from '@/components/home/BudgetCalculator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Budget Calculator | PandaOffer Tools',
  description: 'See which Chinese cities match your target monthly living budget as an international student.',
  openGraph: {
    title: 'Budget Calculator | PandaOffer Tools',
    description: 'See which Chinese cities match your target monthly living budget as an international student.',
    url: 'https://www.pandaoffer.top/tools/budget',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/tools/budget',
  },
};

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Budget Calculator",
            "operatingSystem": "Web",
            "applicationCategory": "EducationalApplication",
            "description": "See which Chinese cities match your target monthly living budget as an international student.",
            "url": "https://www.pandaoffer.top/tools/budget",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
          <ArrowLeft size={16} /> Back to All Tools
        </Link>
        <h2 className="text-2xl font-bold font-heading text-slate-900 text-center">Cost & Budgeting</h2>
        <BudgetCalculator />
      </main>
      <Footer />
    </div>
  );
}
