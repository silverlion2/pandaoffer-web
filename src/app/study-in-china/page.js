import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { universities } from '@/data/universities';
import { MapPin, GraduationCap, Building2, ArrowRight, Globe2 } from 'lucide-react';

export const metadata = {
  title: 'Study in China — Complete City & Major Guide for International Students',
  description: 'Explore top Chinese universities by city and major. Find the perfect program in Shanghai, Beijing, Hangzhou, Chengdu, Wuhan, and more. CSC scholarships available.',
  alternates: { canonical: 'https://www.pandaoffer.top/study-in-china' },
  openGraph: {
    title: 'Study in China — Complete City & Major Guide',
    description: 'Explore top Chinese universities by city and major.',
    url: 'https://www.pandaoffer.top/study-in-china',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function StudyInChinaPillarPage() {
  // Build city data
  const cityMap = new Map();
  universities.forEach(u => {
    const citySlug = u.city.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!cityMap.has(citySlug)) {
      cityMap.set(citySlug, { name: u.city, slug: citySlug, province: u.province, count: 0, topRank: Infinity });
    }
    const city = cityMap.get(citySlug);
    city.count++;
    if (u.qsRank < city.topRank) city.topRank = u.qsRank;
  });
  const cities = Array.from(cityMap.values()).sort((a, b) => a.topRank - b.topRank);

  // Build major data
  const majorMap = new Map();
  universities.forEach(u => {
    (u.programs || []).forEach(prog => {
      const majorSlug = prog.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      if (!majorMap.has(majorSlug)) {
        majorMap.set(majorSlug, { name: prog, slug: majorSlug, count: 0 });
      }
      majorMap.get(majorSlug).count++;
    });
  });
  const majors = Array.from(majorMap.values()).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Study in China",
              "description": "Complete guide to studying in China for international students — explore by city, major, and scholarship.",
              "url": "https://www.pandaoffer.top/study-in-china"
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandaoffer.top" },
                { "@type": "ListItem", "position": 2, "name": "Study in China", "item": "https://www.pandaoffer.top/study-in-china" },
              ]
            }
          ])
        }}
      />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-slate-900 py-24 px-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-indigo-900/30"></div>
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm mb-4 inline-block">
              Your Complete Gateway
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Study in China
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Explore {universities.length} top-ranked universities across {cities.length} cities. Find your perfect program in one of the world&apos;s fastest-growing academic destinations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg inline-flex items-center gap-2">
                Try AI Matcher <ArrowRight size={18} />
              </Link>
              <Link href="/tools/advisor" className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-xl transition-all border border-white/20 inline-flex items-center gap-2">
                Ask AI Advisor
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
              <Building2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{universities.length}</div>
              <div className="text-sm text-slate-500 font-medium">Universities</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
              <MapPin className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{cities.length}</div>
              <div className="text-sm text-slate-500 font-medium">Cities</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
              <GraduationCap className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{majors.length}+</div>
              <div className="text-sm text-slate-500 font-medium">Programs</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
              <Globe2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">100%</div>
              <div className="text-sm text-slate-500 font-medium">CSC Eligible</div>
            </div>
          </div>

          {/* Browse by City */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading flex items-center gap-2">
              <MapPin size={22} className="text-emerald-500" /> Browse by City
            </h2>
            <p className="text-slate-500 mb-6">Choose your city and discover the top universities there.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {cities.map(city => (
                <Link key={city.slug} href={`/study-in-${city.slug}`} className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl transition-all hover:-translate-y-1 hover:border-emerald-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{city.name}</h3>
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-1 rounded-md">{city.count} unis</span>
                  </div>
                  <p className="text-sm text-slate-500">{city.province} Province · Top QS #{city.topRank}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Browse by Major */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading flex items-center gap-2">
              <GraduationCap size={22} className="text-emerald-500" /> Browse by Major
            </h2>
            <p className="text-slate-500 mb-6">Find universities offering your target program.</p>
            <div className="flex flex-wrap gap-2">
              {majors.map(major => (
                <Link key={major.slug} href={`/study-${major.slug}-in-china`} className="bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 font-medium text-sm px-4 py-2.5 rounded-xl transition-all hover:shadow-sm">
                  {major.name} <span className="text-slate-400 ml-1">({major.count})</span>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">Not sure where to start?</h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Let our AI analyze your GPA, nationality, and preferred major to instantly match you with the best universities in China.
            </p>
            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg">
              Find My Match <ArrowRight size={18} />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
