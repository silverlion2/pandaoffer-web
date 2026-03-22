import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ROICalculator from '@/components/tools/ROICalculator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'ROI Calculator | PandaOffer Tools',
  description: 'Compare total costs of studying in China vs. USA, UK, or Australia. See how much you save.',
  openGraph: {
    title: 'ROI Calculator | PandaOffer Tools',
    description: 'Compare total costs of studying in China vs. USA, UK, or Australia. See how much you save.',
    url: 'https://www.pandaoffer.top/tools/roi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/tools/roi',
  },
};

export default function ROIPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "ROI Calculator",
            "operatingSystem": "Web",
            "applicationCategory": "EducationalApplication",
            "description": "Compare total costs of studying in China vs. USA, UK, or Australia. See how much you save.",
            "url": "https://www.pandaoffer.top/tools/roi",
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
        <ROICalculator />
      </main>
      <Footer />
    </div>
  );
}
