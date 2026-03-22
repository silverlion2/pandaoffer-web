import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TimelineGenerator from '@/components/tools/TimelineGenerator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Timeline Generator | PandaOffer Tools',
  description: 'Get a personalized application roadmap and timeline for your target intake in China.',
  openGraph: {
    title: 'Timeline Generator | PandaOffer Tools',
    description: 'Get a personalized application roadmap and timeline for your target intake in China.',
    url: 'https://www.pandaoffer.top/tools/timeline',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/tools/timeline',
  },
};

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Timeline Generator",
            "operatingSystem": "Web",
            "applicationCategory": "EducationalApplication",
            "description": "Get a personalized application roadmap and timeline for your target intake in China.",
            "url": "https://www.pandaoffer.top/tools/timeline",
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
        <TimelineGenerator />
      </main>
      <Footer />
    </div>
  );
}
