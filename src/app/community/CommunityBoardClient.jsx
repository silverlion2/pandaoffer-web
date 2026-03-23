"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Users, Calendar, MapPin, MessageCircle, ExternalLink, QrCode, Construction } from 'lucide-react';

export default function CommunityBoardClient({ events, groups }) {
  const [cityFilter, setCityFilter] = useState('All');
  const cities = ['All', ...Array.from(new Set([
    ...events.map(e => e.city),
    ...groups.filter(g => g.city).map(g => g.city)
  ])).sort()];

  const filteredEvents = events.filter(e => 
    cityFilter === 'All' || e.city === cityFilter
  );

  const filteredGroups = groups.filter(g =>
    cityFilter === 'All' || !g.city || g.city === cityFilter
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow py-12">
      <div className="max-w-5xl mx-auto px-4 space-y-12">

        {/* Under Construction Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-amber-800">
          <Construction size={20} className="text-amber-500 shrink-0" />
          <p className="text-sm font-medium">
            <strong>🚧 Under Construction</strong> — Events and groups shown are sample data. Real community listings coming soon!
          </p>
        </div>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Community <span className="text-indigo-600">Hub</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-xl">
              Break out of the bubble. Join verified groups and attend events across China.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-sm">
                <MapPin className="text-indigo-500 mr-2" size={18} />
                <select 
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="appearance-none bg-transparent outline-none text-slate-700 font-bold cursor-pointer pr-4"
                >
                  {cities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
             </div>
             
             <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm">
              Host Event
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Events */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="text-indigo-500" /> Upcoming Events
              </h2>
            </div>

            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 border-dashed">
                  <p className="text-slate-500 font-medium">No events currently scheduled{cityFilter !== 'All' ? ` in ${cityFilter}` : ''}.</p>
                  <button onClick={() => setCityFilter('All')} className="text-indigo-600 font-bold mt-2 hover:underline">View All Events</button>
                </div>
              ) : (
                filteredEvents.map(event => (
                  <div key={event.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                          {event.type}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-2 text-slate-500 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} /> {event.date_display}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} /> {event.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:border-l border-slate-100 sm:pl-6 flex flex-col justify-center gap-3">
                      <div className="text-sm font-bold text-slate-600 flex items-center gap-2">
                        <Users size={16} />
                        {event.attendees} Attending
                      </div>
                      <button className="w-full bg-indigo-50 text-indigo-700 font-bold py-2 rounded-lg hover:bg-indigo-100 transition-colors shrink-0">
                        RSVP
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Missing City */}
            <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-8 text-center mt-6">
              <p className="text-slate-500 font-medium mb-3">Don't see events in your city?</p>
              <button className="text-indigo-600 font-bold hover:underline">Apply to be a City Ambassador</button>
            </div>
          </div>

          {/* Sidebar - Groups */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <MessageCircle className="text-emerald-500" /> Curated Groups
            </h2>
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                You must be logged in to access group QR codes to prevent spam.
              </div>
              
              <div className="divide-y divide-slate-100">
                {filteredGroups.map((group) => (
                  <div key={group.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{group.name}</h4>
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                        <span>{group.platform}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Users size={14} /> {group.members}</span>
                      </div>
                    </div>
                    
                    {group.status === 'Active' ? (
                      <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors" title="Scan QR Code">
                        <QrCode size={20} />
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">FULL</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-slate-100">
                <button className="w-full text-indigo-600 font-bold text-sm flex items-center justify-center gap-1 hover:text-indigo-700 transition-colors">
                  Suggest a Group <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
