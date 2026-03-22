import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DocumentWizard from '@/components/tools/DocumentWizard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Document Generator & Templates | PandaOffer Tools',
  description: 'Free document tools for studying in China — application checklist, CSC study plan generator, statement of purpose builder, recommendation letter template, and application tracker.',
  openGraph: {
    title: 'Document Generator & Templates | PandaOffer Tools',
    description: 'Free document tools for studying in China — application checklist, CSC study plan generator, statement of purpose builder, recommendation letter template, and application tracker.',
    url: 'https://www.pandaoffer.top/tools/documents',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/tools/documents',
  },
};

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Document Generator & Templates",
            "operatingSystem": "Web",
            "applicationCategory": "EducationalApplication",
            "description": "Free document tools for studying in China — application checklist, CSC study plan generator, and SOP builder.",
            "url": "https://www.pandaoffer.top/tools/documents",
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
        <DocumentWizard />
      </main>
      <Footer />
    </div>
  );
}
