import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SaveUniversityButton from '@/components/tools/SaveUniversityButton';
import { universities } from '@/data/universities';
import { Building2, Globe2, BookOpen, GraduationCap, ArrowRight, ExternalLink, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Top Chinese Universities | PandaOffer',
  description: 'Explore the best universities in China for international students. Comprehensive guide to C9, 985, 211 and Double First-Class institutions.',
  openGraph: {
    title: 'Top Chinese Universities | PandaOffer',
    description: 'Explore the best universities in China for international students. Comprehensive guide to C9, 985, 211 and Double First-Class institutions.',
    url: 'https://www.pandaoffer.top/universities',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/universities',
  },
};

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
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
                { "@type": "ListItem", "position": 2, "name": "Universities", "item": "https://www.pandaoffer.top/universities" }
              ]
            })
          }}
        />
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Top Universities in China
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              From the historic campuses of Beijing to the high-tech hubs of Hangzhou, discover the perfect institution for your academic journey.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                Try AI Matching <ArrowRight size={16} />
              </Link>
              <Link href="/scholarships" className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-all border border-white/20 flex items-center gap-2">
                <BookOpen size={16} /> Scholarship Guide
              </Link>
            </div>
          </div>
        </section>

        {/* How We Choose Section */}
        <section className="bg-white border-b border-slate-100 py-12 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">China&apos;s C9 League &amp; Top 985 Universities</h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {universities.length} elite universities spanning the C9 League (China&apos;s Ivy League) and top 985 Project institutions. These schools receive the most government funding, attract leading researchers, and offer the strongest CSC scholarship quotas for international students.
            </p>
          </div>
        </section>

        {/* University Cards */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((uni) => (
                <div key={uni.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all">
                  <div className="h-48 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${uni.gradient}`}></div>
                    {uni.logo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={uni.logo}
                          alt={`${uni.name} logo`}
                          className="w-20 h-20 object-contain opacity-30"
                        />
                      </div>
                    )}
                    <SaveUniversityButton universityName={uni.name} />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/30 mb-2 inline-block">{uni.tier}</span>
                      <h3 className="text-2xl font-bold">{uni.name}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-slate-500 text-sm font-medium mb-4 gap-4">
                      <span className="flex items-center gap-1"><MapPin size={16} /> {uni.city}</span>
                      <span>QS Rank: #{uni.qsRank}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-6 flex-grow">
                      {uni.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {uni.programs.slice(0, 3).map((prog) => (
                        <span key={prog} className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">{prog}</span>
                      ))}
                    </div>
                    <Link
                      href={`/universities/${uni.slug}`}
                      className="w-full text-center bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      View Full Guide <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-6">Find Your Perfect Match</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            There are over 2,000 universities in China. Don&apos;t guess which one is right for you. Use our algorithm to instantly calculate your admission chances based on your GPA and nationality.
          </p>
          <Link href="/" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
            Start Free Match 🐼
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
