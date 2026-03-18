import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Briefcase, Globe2, BookOpen, CheckCircle2, ChevronRight, Calculator, FileText } from 'lucide-react';

export const metadata = {
  title: 'Fully Funded Scholarships in China | PandaOffer',
  description: 'Complete guide to the CSC Scholarship, Provincial Scholarships, and University grants in China for international students in 2026.',
  openGraph: {
    title: 'Fully Funded Scholarships in China | PandaOffer',
    description: 'Complete guide to the CSC Scholarship, Provincial Scholarships, and University grants in China for international students in 2026.',
    url: 'https://www.pandaoffer.top/scholarships',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/scholarships',
  },
};

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* BreadcrumbList Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandaoffer.top" },
                { "@type": "ListItem", "position": 2, "name": "Scholarships", "item": "https://www.pandaoffer.top/scholarships" }
              ]
            })
          }}
        />
        {/* Hero Section */}
        <section className="bg-slate-50 py-20 px-6 border-b border-slate-200">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold text-emerald-500 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">2026 Admissions</span>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Study in China, <br/>
                <span className="text-emerald-500">Fully Funded.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                China offers some of the most generous government scholarships in the world. We help you navigate the complex system and secure your funding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/blog/csc-scholarship-guide-2026" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-all flex justify-center items-center gap-2">
                  <BookOpen size={20} /> Read the CSC Guide
                </Link>
                <Link href="#premium" className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold py-4 px-8 rounded-xl transition-all flex justify-center items-center gap-2">
                  <Briefcase size={20} /> Get Application Help
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative">
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg transform rotate-3 shadow-lg">
                Type B Track
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="text-amber-500" />
                CSC Coverage
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <strong className="block text-slate-800">100% Tuition Waiver</strong>
                    <span className="text-sm text-slate-500">For the entire duration of your program</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <strong className="block text-slate-800">Free Accommodation</strong>
                    <span className="text-sm text-slate-500">On-campus dorm or monthly subsidy</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <strong className="block text-slate-800">Monthly Stipend</strong>
                    <span className="text-sm text-slate-500">¥2,500 (UG) / ¥3,000 (Master's) / ¥3,500 (PhD)</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <strong className="block text-slate-800">Medical Insurance</strong>
                    <span className="text-sm text-slate-500">Comprehensive health coverage</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Types of Scholarships */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Types of Scholarships</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              While the CSC scholarship is the most famous, there are several other funding routes available for international students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold mb-3">Chinese Government (CSC)</h3>
              <p className="text-slate-600 text-sm mb-6 pb-6 border-b border-slate-200">
                The most prestigious and completely fully-funded option. Can be applied via Embassy (Type A) or directly to University (Type B).
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-700 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Highest competition</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> December–March deadline</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Full coverage + Stipend</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Good Backup
              </div>
              <h3 className="text-xl font-bold mb-3">Provincial Government</h3>
              <p className="text-slate-600 text-sm mb-6 pb-6 border-b border-slate-200">
                Funded by local provinces (e.g., Shanghai, Zhejiang, Jiangsu) to attract talent. Often slightly less competitive than CSC.
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-700 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Medium competition</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> April–May deadline</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Often partial or full tuition</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold mb-3">University/Presidential</h3>
              <p className="text-slate-600 text-sm mb-6 pb-6 border-b border-slate-200">
                Direct grants offered by the university themselves. Some are automatically applied during your main admission application.
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-700 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Varies by university</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Often used for English programs</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Usually partial tuition waivers</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Most Lucrative
              </div>
              <h3 className="text-xl font-bold mb-3">MOFCOM Scholarship</h3>
              <p className="text-slate-600 text-sm mb-6 pb-6 border-b border-slate-200">
                Sponsored by the Ministry of Commerce for applicants from developing countries. Very high stipend (3600 RMB master's) + one-time settlement.
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-700 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> High competition</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> ~April deadline via Embassy</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Full coverage + Highest Stipend</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold mb-3">Belt and Road Initiative</h3>
              <p className="text-slate-600 text-sm mb-6 pb-6 border-b border-slate-200">
                Targeted at students from countries participating in the BRI. Typically tied to provincial or university-level funds and quotas.
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-700 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Specific country list</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Varies greatly by province</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> High acceptance for STEM</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold mb-3">CIS (Confucius Institute)</h3>
              <p className="text-slate-600 text-sm mb-6 pb-6 border-b border-slate-200">
                The International Chinese Language Teachers Scholarship. For students specifically going to study Chinese language, literature, or teaching.
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-700 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> HSK/HSKK required</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Apply via local Confucius Inst</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Full coverage + Stipend</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Essential Reads */}
        <section className="py-20 px-6 bg-slate-900 text-white border-y border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-10 text-center">Essential Scholarship Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/blog/csc-scholarship-guide-2026" className="bg-slate-800 p-6 rounded-2xl hover:bg-slate-700 transition-colors border border-slate-700 flex items-start gap-4 group">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 text-emerald-500 border border-slate-700">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-400 transition-colors">Complete CSC Guide</h3>
                  <p className="text-slate-400 text-sm">Step-by-step process, eligibility criteria, and common mistakes that kill your application.</p>
                </div>
              </Link>
              
              <Link href="/blog/how-to-write-csc-study-plan" className="bg-slate-800 p-6 rounded-2xl hover:bg-slate-700 transition-colors border border-slate-700 flex items-start gap-4 group">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 text-amber-500 border border-slate-700">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">Study Plan Template</h3>
                  <p className="text-slate-400 text-sm">The most important document. Learn how to structure your 1000-word proposal to win.</p>
                </div>
              </Link>
              
              <Link href="/blog/documents-needed-study-china" className="bg-slate-800 p-6 rounded-2xl hover:bg-slate-700 transition-colors border border-slate-700 flex items-start gap-4 group">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 text-blue-500 border border-slate-700">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">Document Checklist</h3>
                  <p className="text-slate-400 text-sm">From physical examinations to JW forms, don't miss a single required document.</p>
                </div>
              </Link>

              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex justify-between items-center group cursor-pointer hover:bg-emerald-900/40 hover:border-emerald-500/50 transition-all">
                 <div>
                  <h3 className="font-bold text-emerald-400 text-lg mb-1">PandaOffer AI Matcher</h3>
                  <p className="text-slate-400 text-sm">Calculate your exact admission chances.</p>
                 </div>
                 <Calculator className="text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" size={32} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA to Pricing */}
        <section id="premium" className="py-20 px-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500 rounded-full blur-[120px] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold text-white mb-4">Want expert help with your application?</h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
                The CSC scholarship is hyper-competitive. Our former admission officers can review your study plan, handle professor outreach, and optimize your entire package.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
              >
                View Plans &amp; Pricing <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
