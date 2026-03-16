import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Use AI Matcher
              </Link>
              <Link href="/blog/china-university-tiers-c9-985-211" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2">
                Understand Tiers <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* The Tier System */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Understanding the Tier System</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              China classifies its universities into distinct tiers that determine funding, prestige, and global recognition. Aiming for a top-tier school significantly boosts your career prospects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Globe2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">C9 League</h3>
              <p className="text-sm text-slate-600 mb-4">China's Ivy League. The 9 most prestigious and selective research universities in the country.</p>
              <div className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded inline-block">Equivalent to US Top 20</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Project 985</h3>
              <p className="text-sm text-slate-600 mb-4">39 world-class universities designated by the government for massive funding and global excellence.</p>
              <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">Top 1% in China</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Project 211</h3>
              <p className="text-sm text-slate-600 mb-4">112 key national universities (including all 985s) recognized for high educational standards.</p>
              <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block">Top 5% in China</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Double First-Class</h3>
              <p className="text-sm text-slate-600 mb-4">The new system evaluating universities based on individual world-class disciplines and departments.</p>
              <div className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded inline-block">Dynamic Rankings</div>
            </div>
          </div>
        </section>

        {/* Featured Universities Grid */}
        <section className="py-16 px-6 bg-slate-100 border-y border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Institutions</h2>
                <p className="text-slate-600">Explore some of the most popular choices for international students.</p>
              </div>
              <div className="hidden sm:block text-sm text-slate-500 font-medium">
                Data updated for 2026 Admissions
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Zhejiang University */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-sky-600"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/30 mb-2 inline-block">C9 League</span>
                    <h3 className="text-2xl font-bold">Zhejiang University</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-500 text-sm font-medium mb-4 gap-4">
                    <span className="flex items-center gap-1"><MapPin size={16} /> Hangzhou</span>
                    <span>QS Rank: #42</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    Known as the "Harvard of China", ZJU is a massive research powerhouse located in the tech hub of Hangzhou. It offers over 120 English-taught programs.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Medicine (MBBS)</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Computer Science</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Business</span>
                  </div>
                </div>
              </div>

              {/* Tsinghua University */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-fuchsia-600"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/30 mb-2 inline-block">C9 League</span>
                    <h3 className="text-2xl font-bold">Tsinghua University</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-500 text-sm font-medium mb-4 gap-4">
                    <span className="flex items-center gap-1"><MapPin size={16} /> Beijing</span>
                    <span>QS Rank: #20</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    Consistently ranked as the #1 or #2 university in Asia, Tsinghua is an engineering and technology giant. Its admissions are highly competitive.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Engineering</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Architecture</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Public Policy</span>
                  </div>
                </div>
              </div>

               {/* Shanghai Jiao Tong */}
               <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-900 to-orange-500"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/30 mb-2 inline-block">C9 League</span>
                    <h3 className="text-2xl font-bold">Shanghai Jiao Tong</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-500 text-sm font-medium mb-4 gap-4">
                    <span className="flex items-center gap-1"><MapPin size={16} /> Shanghai</span>
                    <span>QS Rank: #45</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    Situated in China's financial capital, SJTU boasts exceptional engineering and a top-tier medical school. It produces many of China's business leaders.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Clinical Medicine</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Mechanical Engineering</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Finance</span>
                  </div>
                </div>
              </div>

              {/* Fudan University */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-900 to-emerald-500"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/30 mb-2 inline-block">C9 League</span>
                    <h3 className="text-2xl font-bold">Fudan University</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-500 text-sm font-medium mb-4 gap-4">
                    <span className="flex items-center gap-1"><MapPin size={16} /> Shanghai</span>
                    <span>QS Rank: #39</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    Fudan is renowned for its liberal arts, humanities, and social sciences. It has one of the most internationalized campuses in China.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">International Relations</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Journalism</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Economics</span>
                  </div>
                </div>
              </div>

              {/* Peking University */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-900 to-rose-600"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/30 mb-2 inline-block">C9 League</span>
                    <h3 className="text-2xl font-bold">Peking University</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-500 text-sm font-medium mb-4 gap-4">
                    <span className="flex items-center gap-1"><MapPin size={16} /> Beijing</span>
                    <span>QS Rank: #17</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    Often called the "Harvard of China" alongside Tsinghua, PKU is China's premier comprehensive university, famed for brilliant humanities, pure sciences, and medicine.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Peking Sci & Med</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Social Sciences</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Mathematics</span>
                  </div>
                </div>
              </div>

              {/* Nanjing University */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-900 to-purple-600"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/30 mb-2 inline-block">C9 League</span>
                    <h3 className="text-2xl font-bold">Nanjing University</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-500 text-sm font-medium mb-4 gap-4">
                    <span className="flex items-center gap-1"><MapPin size={16} /> Nanjing</span>
                    <span>QS Rank: #141</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    One of the oldest and most prestigious universities in China, renowned for deep, rigorous academic research and avoiding commercialization.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Physics</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Astronomy</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Chinese Literature</span>
                  </div>
                </div>
              </div>

              {/* USTC */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky-900 to-indigo-600"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/30 mb-2 inline-block">C9 League</span>
                    <h3 className="text-2xl font-bold">USTC</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-500 text-sm font-medium mb-4 gap-4">
                    <span className="flex items-center gap-1"><MapPin size={16} /> Hefei</span>
                    <span>QS Rank: #137</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    The University of Science and Technology of China is the Caltech of China, known for producing top-tier researchers and absolute dominance in pure sciences.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Quantum Physics</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Chemistry</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Materials Science</span>
                  </div>
                </div>
              </div>

              {/* Xi'an Jiaotong University */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-800 to-orange-600"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-white/30 mb-2 inline-block">C9 League</span>
                    <h3 className="text-2xl font-bold">Xi'an Jiaotong</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-500 text-sm font-medium mb-4 gap-4">
                    <span className="flex items-center gap-1"><MapPin size={16} /> Xi'an</span>
                    <span>QS Rank: #291</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    A powerhouse of engineering and technology in western China, offering excellent English-taught programs and deep industry connections.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Electrical Eng</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Management</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">Energy Systems</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-6">Find Your Perfect Match</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            There are over 2,000 universities in China. Don't guess which one is right for you. Use our algorithm to instantly calculate your admission chances based on your GPA and nationality.
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
