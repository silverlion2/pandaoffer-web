import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { universities } from '@/data/universities';
import { MapPin, ArrowRight, Building2, CheckCircle } from 'lucide-react';

// Get unique cities and format them for URLs
const getCitiesData = () => {
  const cityMap = new Map();
  universities.forEach(u => {
    const citySlug = u.city.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!cityMap.has(citySlug)) {
      cityMap.set(citySlug, {
        name: u.city,
        slug: citySlug,
        province: u.province,
        universities: []
      });
    }
    cityMap.get(citySlug).universities.push(u);
  });
  return Array.from(cityMap.values());
};

export function generateStaticParams() {
  const cities = getCitiesData();
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const cities = getCitiesData();
  const cityData = cities.find(c => c.slug === citySlug);
  
  if (!cityData) return { title: 'City Not Found | PandaOffer' };

  const title = `Study in ${cityData.name}, China - Top Universities & Scholarships`;
  const description = `Looking to study in ${cityData.name}? Discover top-ranked universities, living costs, CSC scholarships, and student life in ${cityData.name}, ${cityData.province}.`;

  return {
    title,
    description,
    alternates: { canonical: `https://www.pandaoffer.top/study-in-${citySlug}` },
    openGraph: {
      title,
      description,
      url: `https://www.pandaoffer.top/study-in-${citySlug}`,
      type: 'article',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function CityLandingPage({ params }) {
  const { city: citySlug } = await params;
  const cities = getCitiesData();
  const cityData = cities.find(c => c.slug === citySlug);

  if (!cityData) notFound();

  // Sort universities by QS rank
  const sortedUnis = cityData.universities.sort((a, b) => a.qsRank - b.qsRank);
  
  // Calculate average living cost from the universities in this city
  const livingCosts = sortedUnis.map(u => {
    const match = u.livingCost.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : 400;
  });
  const avgCost = Math.round(livingCosts.reduce((a, b) => a + b, 0) / livingCosts.length);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": `Study in ${cityData.name}`,
              "description": `Comprehensive guide to universities and student life in ${cityData.name}, China.`,
              "url": `https://www.pandaoffer.top/study-in-${citySlug}`,
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": sortedUnis.map((uni, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "name": uni.name,
                  "url": `https://www.pandaoffer.top/universities/${uni.slug}`
                }))
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandaoffer.top" },
                { "@type": "ListItem", "position": 2, "name": "Universities", "item": "https://www.pandaoffer.top/universities" },
                { "@type": "ListItem", "position": 3, "name": `Study in ${cityData.name}`, "item": `https://www.pandaoffer.top/study-in-${citySlug}` },
              ]
            }
          ])
        }}
      />

      <main className="flex-grow">
        <section className="bg-emerald-900 py-20 px-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <span className="text-emerald-300 font-bold uppercase tracking-wider text-sm mb-4 inline-block">
              City Guide · {cityData.province} Province
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Study in {cityData.name}
            </h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Everything you need to know about top universities, living costs, and student life in one of China's most dynamic cities.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
              <Building2 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-900">{sortedUnis.length}</div>
              <div className="text-sm text-slate-500 font-medium">Top Universities</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
              <MapPin className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <div className="text-xl font-bold text-slate-900 mt-2">{cityData.province}</div>
              <div className="text-sm text-slate-500 font-medium mt-1">Province</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
              <div className="w-8 h-8 flex items-center justify-center text-emerald-500 mx-auto mb-3 text-2xl font-bold">$</div>
              <div className="text-2xl font-bold text-slate-900">~${avgCost}/mo</div>
              <div className="text-sm text-slate-500 font-medium">Avg. Living Cost</div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading">
              Top Universities in {cityData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedUnis.map(uni => (
                <Link key={uni.slug} href={`/universities/${uni.slug}`} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full">
                  <div className={`h-24 bg-gradient-to-r ${uni.gradient} p-6 flex items-end justify-between`}>
                    <span className="text-white/90 font-bold text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      QS #{uni.qsRank}
                    </span>
                    <span className="text-white font-bold opacity-50">{uni.code}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">
                      {uni.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">{uni.description}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                       <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                         {uni.tier}
                       </span>
                       <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded">
                         CSC Available
                       </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">Need help deciding?</h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Not sure which university in {cityData.name} fits your profile? Use our AI Study Advisor to get instant, personalized recommendations based on your GPA and major.
            </p>
            <Link href="/tools/advisor" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg">
              Ask AI Advisor <ArrowRight size={18} />
            </Link>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
