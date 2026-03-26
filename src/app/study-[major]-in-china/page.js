import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { universities } from '@/data/universities';
import { GraduationCap, ArrowRight, BookOpen, Building2, MapPin } from 'lucide-react';

// Get unique majors and format them for URLs
const getMajorsData = () => {
  const majorMap = new Map();
  
  universities.forEach(u => {
    (u.programs || []).forEach(prog => {
      const originalName = prog;
      // Convert "Medicine (MBBS)" to "medicine-mbbs", "Computer Science & AI" to "computer-science-ai"
      const majorSlug = prog.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      
      if (!majorMap.has(majorSlug)) {
        majorMap.set(majorSlug, {
          name: originalName,
          slug: majorSlug,
          universities: []
        });
      }
      majorMap.get(majorSlug).universities.push(u);
    });
  });
  
  return Array.from(majorMap.values());
};

export function generateStaticParams() {
  const majors = getMajorsData();
  return majors.map((major) => ({
    major: major.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { major: majorSlug } = await params;
  const majors = getMajorsData();
  const majorData = majors.find(m => m.slug === majorSlug);
  
  if (!majorData) return { title: 'Major Not Found | PandaOffer' };

  const title = `Study ${majorData.name} in China - Top Universities for International Students`;
  const description = `Looking to study ${majorData.name} in China? Compare the best Chinese universities offering ${majorData.name} programs, tuition costs, and CSC scholarships in English.`;

  return {
    title,
    description,
    alternates: { canonical: `https://www.pandaoffer.top/study-${majorSlug}-in-china` },
    openGraph: {
      title,
      description,
      url: `https://www.pandaoffer.top/study-${majorSlug}-in-china`,
      type: 'article',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function MajorLandingPage({ params }) {
  const { major: majorSlug } = await params;
  const majors = getMajorsData();
  const majorData = majors.find(m => m.slug === majorSlug);

  if (!majorData) notFound();

  // Sort universities by QS rank
  const sortedUnis = majorData.universities.sort((a, b) => a.qsRank - b.qsRank);

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
              "name": `Study ${majorData.name} in China`,
              "description": `Comprehensive guide to studying ${majorData.name} in top Chinese universities.`,
              "url": `https://www.pandaoffer.top/study-${majorSlug}-in-china`,
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
                { "@type": "ListItem", "position": 3, "name": `Study ${majorData.name} in China`, "item": `https://www.pandaoffer.top/study-${majorSlug}-in-china` },
              ]
            }
          ])
        }}
      />

      <main className="flex-grow">
        <section className="bg-indigo-900 py-20 px-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <span className="text-indigo-300 font-bold uppercase tracking-wider text-sm mb-4 inline-block">
              Academic Program Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Study {majorData.name} in China
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Discover the top {sortedUnis.length} Chinese universities offering world-class programs in {majorData.name} for international students.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center shrink-0">
                <Building2 size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{sortedUnis.length} Universities</div>
                <div className="text-sm text-slate-500 font-medium">Offering {majorData.name}</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">English-Taught</div>
                <div className="text-sm text-slate-500 font-medium">Most programs available</div>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading">
              Universities for {majorData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedUnis.map(uni => (
                <Link key={uni.slug} href={`/universities/${uni.slug}`} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full">
                  <div className={`h-20 bg-gradient-to-r ${uni.gradient} p-5 flex items-end justify-between`}>
                    <span className="text-white/90 font-bold text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      QS #{uni.qsRank}
                    </span>
                    <span className="text-white font-bold opacity-50">{uni.code}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1 line-clamp-1">
                      {uni.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 flex items-center gap-1.5"><MapPin size={14}/> {uni.city}, {uni.province}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                       <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200">
                         {uni.tier}
                       </span>
                       <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">
                         {uni.tuitionRange}
                       </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">Check your admission chances</h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Want to know if you can get into these {majorData.name} programs? Use our AI Matcher to check your probability based on your GPA and nationality.
            </p>
            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg">
              Try AI Matcher <ArrowRight size={18} />
            </Link>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
