import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FAQSection from '@/components/home/FAQSection';

export const metadata = {
  title: 'Frequently Asked Questions | PandaOffer',
  description: 'Answers to common questions about studying in China, CSC Scholarships, student visas, costs, and the PandaOffer admission process.',
  openGraph: {
    title: 'Frequently Asked Questions | PandaOffer',
    description: 'Answers to common questions about studying in China, CSC Scholarships, student visas, costs, and the PandaOffer admission process.',
    url: 'https://www.pandaoffer.top/faq',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/faq',
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full">
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
