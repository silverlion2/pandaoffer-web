import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIAdvisor from '@/components/tools/AIAdvisor';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'AI Study Advisor | PandaOffer Tools',
  description: 'Get expert answers about studying in China powered by hundreds of real sources — not generic AI.',
  openGraph: {
    title: 'AI Study Advisor | PandaOffer Tools',
    description: 'Get expert answers about studying in China powered by hundreds of real sources — not generic AI.',
    url: 'https://www.pandaoffer.top/tools/advisor',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/tools/advisor',
  },
};

export default function AdvisorPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
          <ArrowLeft size={16} /> Back to All Tools
        </Link>
        <AIAdvisor />
      </main>
      <Footer />
    </div>
  );
}
