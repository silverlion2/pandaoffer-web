import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SaveUniversityButton from '@/components/tools/SaveUniversityButton';
import { universities, getUniversityBySlug, getAllUniversitySlugs } from '@/data/universities';
import {
  MapPin, GraduationCap, Calendar, Users, Globe2, DollarSign,
  BookOpen, CheckCircle, Sparkles, ArrowRight, ExternalLink,
  Shield, Clock, Languages, Award, Building2, ArrowLeft
} from 'lucide-react';

export function generateStaticParams() {
  return getAllUniversitySlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);
  if (!uni) return { title: 'University Not Found | PandaOffer' };

  const title = `${uni.name} (${uni.code}) — Admission Guide for International Students | PandaOffer`;
  const description = `Everything you need to know about ${uni.name}: admission requirements, CSC scholarship, tuition, programs, campus life, and insider tips for international students.`;

  return {
    title,
    description,
    alternates: { canonical: `https://www.pandaoffer.top/universities/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.pandaoffer.top/universities/${slug}`,
      type: 'article',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
  };
}

export default async function UniversityDetailPage({ params }) {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);
  if (!uni) notFound();

  const stats = [
    { label: 'QS Rank', value: `#${uni.qsRank}`, icon: Award },
    { label: 'City', value: uni.city, icon: MapPin },
    { label: 'Founded', value: uni.founded, icon: Calendar },
    { label: 'Students', value: uni.students, icon: Users },
    { label: 'Intl Students', value: uni.intlStudents, icon: Globe2 },
    { label: 'CSC Eligible', value: uni.cscAgency, icon: Shield },
    { label: 'Tuition', value: uni.tuitionRange, icon: DollarSign },
    { label: 'Living Cost', value: uni.livingCost, icon: DollarSign },
    { label: 'Language', value: uni.languageReq, icon: Languages },
    { label: 'Deadline', value: uni.applicationDeadline, icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollegeOrUniversity",
              "name": uni.name,
              "alternateName": uni.chineseName,
              "foundingDate": String(uni.founded),
              "address": { "@type": "PostalAddress", "addressLocality": uni.city, "addressRegion": uni.province, "addressCountry": "CN" },
              "url": uni.website,
              "description": uni.description,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandaoffer.top" },
                { "@type": "ListItem", "position": 2, "name": "Universities", "item": "https://www.pandaoffer.top/universities" },
                { "@type": "ListItem", "position": 3, "name": uni.name, "item": `https://www.pandaoffer.top/universities/${slug}` },
              ]
            }
          ])
        }}
      />

      <main className="flex-grow">
        {/* Hero */}
        <section className={`relative overflow-hidden py-20 px-6 bg-gradient-to-br ${uni.gradient}`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="max-w-5xl mx-auto relative z-10">
            <nav className="mb-8">
              <Link href="/universities" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors">
                <ArrowLeft size={16} /> All Universities
              </Link>
            </nav>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex items-start gap-5">
                {uni.logo && (
                  <Image
                    src={uni.logo}
                    alt={`${uni.name} logo`}
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20 shrink-0"
                  />
                )}
                <div>
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 text-white inline-block mb-4">
                    {uni.tier}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                    {uni.name}
                  </h1>
                  <p className="text-white/70 text-lg font-medium mb-1">{uni.chineseName} · {uni.code}</p>
                  <p className="text-white/60 flex items-center gap-2 text-sm">
                    <MapPin size={14} /> {uni.city}, {uni.province} · QS #{uni.qsRank}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <SaveUniversityButton universityName={uni.name} />
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all border border-white/30"
                >
                  <ExternalLink size={14} /> Official Website
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
                <stat.icon size={18} className="text-emerald-500 mx-auto mb-1.5" />
                <p className="text-xs text-slate-500 font-bold uppercase">{stat.label}</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* About */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4 font-heading flex items-center gap-2">
              <Building2 size={22} className="text-emerald-500" /> About {uni.name}
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
              <p className="text-slate-600 leading-relaxed text-[15px]">{uni.detailedDescription}</p>
              {uni.motto && (
                <p className="mt-4 text-sm text-slate-500 italic border-l-4 border-emerald-300 pl-4">
                  Motto: &quot;{uni.motto}&quot;
                </p>
              )}
            </div>
          </section>

          {/* Programs */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4 font-heading flex items-center gap-2">
              <GraduationCap size={22} className="text-emerald-500" /> Programs Offered
            </h2>
            <div className="flex flex-wrap gap-2">
              {uni.programs.map((prog) => (
                <span key={prog} className="bg-white border border-slate-200 text-slate-700 font-semibold text-sm px-4 py-2 rounded-xl shadow-sm">
                  {prog}
                </span>
              ))}
            </div>
          </section>

          {/* Key Strengths */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4 font-heading flex items-center gap-2">
              <Sparkles size={22} className="text-emerald-500" /> Key Strengths
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <ul className="space-y-3">
                {uni.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-slate-700 text-[15px]">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Admission Tips */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4 font-heading flex items-center gap-2">
              <BookOpen size={22} className="text-emerald-500" /> Admission Tips
            </h2>
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 md:p-8">
              <p className="text-emerald-900 leading-relaxed text-[15px]">{uni.admissionTips}</p>
            </div>
          </section>

          {/* Campus Life */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4 font-heading flex items-center gap-2">
              <Users size={22} className="text-emerald-500" /> Campus Life
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
              <p className="text-slate-600 leading-relaxed text-[15px]">{uni.campusLife}</p>
            </div>
          </section>

          {/* Why Choose */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4 font-heading">
              Why Choose {uni.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {uni.whyChoose.map((reason, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-start gap-3">
                  <div className="bg-emerald-100 text-emerald-600 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-slate-700 text-sm font-medium">{reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Linking Engine: Related Universities */}
          <section className="pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6 font-heading flex items-center gap-2">
              <Building2 size={22} className="text-emerald-500" /> Similar Universities You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {universities
                .filter(u => u.slug !== slug)
                .map(u => {
                  let score = 0;
                  if (u.tier === uni.tier) score += 5;
                  if (u.city === uni.city) score += 3;
                  if (u.province === uni.province) score += 1;
                  return { ...u, score };
                })
                .sort((a, b) => b.score - a.score || a.qsRank - b.qsRank)
                .slice(0, 3)
                .map(relatedUni => (
                  <Link key={relatedUni.slug} href={`/universities/${relatedUni.slug}`} className="group block bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-500 transition-all hover:shadow-lg hover:-translate-y-1">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mb-3 inline-block">
                      QS #{relatedUni.qsRank}
                    </span>
                    <h3 className="font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors mb-1 line-clamp-2">
                      {relatedUni.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 opacity-90">
                      <MapPin size={12} /> {relatedUni.city}
                    </p>
                  </Link>
                ))
              }
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Think {uni.code} is right for you?
              </h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
                Use our free AI Matcher to instantly check your admission probability based on your GPA, nationality, and target program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
                >
                  Try AI Matching <ArrowRight size={18} />
                </Link>
                <Link
                  href="/tools#advisor"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all border border-white/20"
                >
                  Ask AI Advisor About {uni.code}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
