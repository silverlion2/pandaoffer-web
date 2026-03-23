import Link from 'next/link';
import { Building2, MapPin, CheckCircle2, ChevronLeft, Calendar, DollarSign, Briefcase, GraduationCap, Clock, ExternalLink, Share2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase.from('jobs').select('title, company, location').eq('id', id).single();
  if (!job) return { title: 'Job Not Found | PandaOffer' };
  return {
    title: `${job.title} at ${job.company} | PandaOffer`,
    description: `Apply for ${job.title} at ${job.company} in ${job.location}. Find expat jobs in China on PandaOffer.`,
  };
}

export default async function JobPosting({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: job, error } = await supabase.from('jobs').select('*').eq('id', id).single();

  if (!job || error) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans pb-24">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        
        {/* Navigation */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/career" className="inline-flex items-center text-slate-500 hover:text-indigo-600 font-medium text-sm transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            Back to Job Board
          </Link>
          <button className="text-slate-400 hover:text-slate-600 transition-colors p-2" aria-label="Share">
            <Share2 size={20} />
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-indigo-50 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className={`shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-lg ${job.logo_bg}`}>
              {job.logo_letter}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-500 mt-3 font-medium text-base">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Building2 size={18} />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={18} />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={18} />
                    {job.type}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {job.visa_sponsored && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200 shadow-sm">
                    <CheckCircle2 size={16} />
                    Z-Visa Sponsored
                  </span>
                )}
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200">
                  {job.type}
                </span>
                <span className="hidden sm:inline-block px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-semibold border border-indigo-100">
                  <DollarSign size={14} className="inline mr-1" />
                  {job.salary}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 mb-6 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="text-indigo-500" size={20} /> Role Overview
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {job.overview}
                </p>
              </section>

              <hr className="border-slate-100" />

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="text-indigo-500" size={20} /> Requirements
                </h2>
                <ul className="space-y-3">
                  {job.requirements?.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <hr className="border-slate-100" />

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="text-indigo-500" size={20} /> Perks & Benefits
                </h2>
                <ul className="space-y-3">
                  {job.perks?.map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                      <span className="text-slate-600">{perk}</span>
                    </li>
                  ))}
                </ul>
              </section>

            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Base Salary</p>
                <div className="text-2xl font-black text-slate-900">{job.salary}</div>
              </div>
              
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                Apply Now <ExternalLink size={18} />
              </button>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 leading-relaxed shadow-sm">
                <AlertCircle size={14} className="inline mr-1 mb-0.5 text-amber-600" />
                <strong>Notice:</strong> Submitting false Chinese visa documentation is a criminal offense. PandaOffer verifies all sponsored roles, but do your own due diligence.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
