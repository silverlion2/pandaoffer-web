import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle, Sparkles, ArrowRight, Shield } from 'lucide-react';

export const metadata = {
  title: 'Pricing',
  description: 'Explore PandaOffer pricing plans — from 1v1 strategy calls to full done-for-you university application packages for studying in China.',
};

const tiers = [
  {
    name: '1v1 Strategy Call',
    price: '$49',
    unit: '/ 45 mins',
    description: 'A focused session with a former admission officer to sharpen your profile and strategy.',
    features: [
      'Profile evaluation & weakness fixing',
      'Medical certification (WHO/NMC) advice',
      'Q&A with real alumni',
      'Personalized university shortlist',
    ],
    cta: 'Book a Session',
    style: 'light',
  },
  {
    name: 'CSC Scholarship Pro',
    price: '$299',
    unit: '/ one-time',
    badge: 'Most Popular',
    description: 'Everything you need to maximize your CSC Scholarship chances — crafted by winners.',
    features: [
      'Everything in Strategy Call',
      'Statement of Purpose (SOP) rewrite',
      'Recommendation letter templates',
      'Direct professor contact list',
      'Application timeline & checklist',
    ],
    cta: 'Get Full Scholarship',
    style: 'featured',
  },
  {
    name: 'Done-For-You',
    price: '$899+',
    unit: '/ package',
    description: 'We handle every step of your application — from start to acceptance letter.',
    features: [
      'We handle the ENTIRE application',
      'Guaranteed admission or 100% refund',
      'Visa processing assistance',
      'Airport pickup & dorm booking',
      'Dedicated advisor throughout',
    ],
    cta: 'Contact Sales',
    style: 'light',
  },
];

function PricingCard({ tier }) {
  const isFeatured = tier.style === 'featured';

  return (
    <div
      className={`rounded-2xl p-8 relative transition-all duration-300 hover:-translate-y-1 ${
        isFeatured
          ? 'bg-slate-900 border border-slate-800 shadow-2xl md:-translate-y-4 hover:shadow-emerald-500/20'
          : 'bg-white border border-slate-200 shadow-sm hover:shadow-xl'
      }`}
    >
      {tier.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {tier.badge}
        </div>
      )}

      <h3 className={`text-xl font-bold mb-2 font-heading ${isFeatured ? 'text-white' : 'text-slate-900'}`}>
        {tier.name}
      </h3>

      <div className={`text-4xl font-extrabold mb-1 ${isFeatured ? 'text-white' : 'text-slate-900'}`}>
        {tier.price}
        <span className={`text-sm font-normal ml-1 ${isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
          {tier.unit}
        </span>
      </div>

      <p className={`text-sm mb-6 ${isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
        {tier.description}
      </p>

      <ul className={`space-y-3 mb-8 text-sm ${isFeatured ? 'text-slate-300' : 'text-slate-600'}`}>
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle size={16} className={`shrink-0 mt-0.5 ${isFeatured ? 'text-emerald-400' : 'text-emerald-500'}`} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`w-full font-bold py-3 rounded-xl transition-all cursor-pointer ${
          isFeatured
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
        }`}
      >
        {tier.cta}
      </button>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-50 pt-24 pb-32 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
          <div className="relative max-w-3xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Sparkles size={14} />
              Simple, Transparent Pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-heading">
              Invest in Your Future in China
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Choose the plan that fits your ambition. Every package is backed by real results from our team of former admission officers and verified alumni.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>

          {/* Guarantee Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
              <Shield size={24} className="text-emerald-500" />
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900">Money-Back Guarantee</p>
                <p className="text-xs text-slate-500">Not satisfied? Get a full refund within 14 days — no questions asked.</p>
              </div>
            </div>
          </div>

          {/* FAQ-style bottom section */}
          <div className="mt-20 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4 font-heading">Have Questions?</h2>
            <p className="text-slate-500 mb-6">
              Not sure which plan is right for you? Reach out and we&apos;ll help you decide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@pandaoffer.top"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Contact Us <ArrowRight size={16} />
              </a>
              <Link
                href="/refund"
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
