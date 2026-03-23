"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Briefcase, MapPin, Building2, CheckCircle2, ChevronRight, Search, AlertCircle, Construction } from 'lucide-react';

export default function CareerBoardClient({ jobs }) {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  
  const cities = ['All', ...Array.from(new Set(jobs.map(j => j.location))).sort()];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase());
    const matchesCity = cityFilter === 'All' || job.location === cityFilter;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow py-12">
      <div className="max-w-5xl mx-auto px-4 space-y-12">

        {/* Under Construction Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-amber-800">
          <Construction size={20} className="text-amber-500 shrink-0" />
          <p className="text-sm font-medium">
            <strong>🚧 Under Construction</strong> — This board is being built out. Listings shown are sample data for preview purposes. Real job postings coming soon!
          </p>
        </div>
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            {jobs.length} Active Roles
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Expat Jobs & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Internships</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Discover opportunities in China that explicitly sponsor Z-Visas or welcome international students for legal work-study programs.
          </p>

          <div className="max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
            <div className="flex-1 flex items-center px-4 border-b sm:border-b-0 sm:border-r border-slate-100 pb-2 sm:pb-0">
              <Search className="text-slate-400 mr-3" size={20} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search job title or company..." 
                className="w-full bg-transparent border-none focus:outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>
            
            <div className="flex items-center px-4">
              <MapPin className="text-indigo-500 mr-2" size={20} />
              <select 
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="appearance-none bg-transparent outline-none text-slate-700 font-bold pr-8 cursor-pointer w-full sm:w-auto"
              >
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            
            <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors w-full sm:w-auto mt-2 sm:mt-0">
              Search
            </button>
          </div>
        </div>

        {/* Filters & Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm font-medium text-slate-500 mr-2">Quick Filters:</span>
          {['Z-Visa Sponsored', 'Internships', 'Tech', 'Education'].map(tag => (
            <button key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
              {tag}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
              <p className="text-slate-500 font-medium">No roles found matching your criteria.</p>
              <button 
                onClick={() => {setSearch(''); setCityFilter('All');}} 
                className="text-indigo-600 font-bold mt-2 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Link 
                href={`/career/${job.id}`} 
                key={job.id} 
                className="block group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Logo */}
                  <div className={`shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold ${job.logo_bg}`}>
                    {job.logo_letter}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                        <div className="flex items-center gap-4 text-slate-500 mt-1">
                          <span className="flex items-center gap-1.5 text-sm font-medium">
                            <Building2 size={16} />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm font-medium">
                            <MapPin size={16} />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right hidden md:block">
                        <div className="text-slate-900 font-bold">{job.salary}</div>
                        <div className="text-slate-500 text-sm font-medium">{job.type}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {job.visa_sponsored && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                          <CheckCircle2 size={12} />
                          Visa Sponsored
                        </span>
                      )}
                      {job.tags?.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-end md:ml-4">
                    <div className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Warning Callout */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={24} />
          <div>
            <h4 className="text-amber-800 font-bold">Important Compliance Notice</h4>
            <p className="text-amber-700 text-sm mt-1">
              International students in China on an X1/X2 visa cannot work legally without explicit permission from their university and the Exit-Entry Administration (Work-Study stamp). Ensure internships are university-approved before accepting.
            </p>
          </div>
        </div>

      </div>
      </div>
      <Footer />
    </div>
  );
}
