import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CityComparator from '@/components/tools/CityComparator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'City Comparator | PandaOffer Tools',
  description: 'Side-by-side comparison of life and costs in top Chinese cities for international students.',
  openGraph: {
    title: 'City Comparator | PandaOffer Tools',
    description: 'Side-by-side comparison of life and costs in top Chinese cities for international students.',
    url: 'https://www.pandaoffer.top/tools/city',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/tools/city',
  },
};

export default function CityPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
          <ArrowLeft size={16} /> Back to All Tools
        </Link>
        <CityComparator />
      </main>
      <Footer />
    </div>
  );
}
