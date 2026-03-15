import React from 'react';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | PandaOffer',
  description: 'Terms and conditions for using the PandaOffer service.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
          &larr; Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <FileText size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">Terms of Service</h1>
          </div>
          
          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="text-sm text-slate-500 mb-8">Last Updated: March 2026</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using PandaOffer, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our service.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              PandaOffer provides an AI-driven matching tool designed to help international students find suitable universities in China based on their inputted criteria (grades, budget, subject, etc.). The information provided is for guidance purposes only and we do not guarantee admission to any institution.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Accuracy of Information</h2>
            <p className="mb-4">
              While we strive to provide accurate, up-to-date information regarding university requirements, WHO/NMC certification status, and CSC Scholarship probabilities, university policies change frequently. Users are ultimately responsible for verifying all information directly with the respective universities before applying.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Affiliate Links and Third Parties</h2>
            <p className="mb-4">
              Some links on PandaOffer may be affiliate links. This means we may earn a small commission at no extra cost to you if you make a purchase through these links. We are not responsible for the content, products, or services offered by third-party websites.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              All content on PandaOffer, including text, graphics, logos, and software, is our property or the property of our licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">
              PandaOffer shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including but not limited to rejection of university applications or visa denials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
