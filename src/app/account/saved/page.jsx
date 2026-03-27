"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { BookMarked, Trash2, Loader2, MapPin, GraduationCap } from 'lucide-react';
import Link from 'next/link';

// University metadata (mirrors universities page data)
const UNIVERSITY_DATA = {
  'Zhejiang University': { city: 'Hangzhou', tier: 'C9 League', rank: '#42', color: 'from-blue-900 to-sky-600' },
  'Tsinghua University': { city: 'Beijing', tier: 'C9 League', rank: '#20', color: 'from-purple-900 to-fuchsia-600' },
  'Shanghai Jiao Tong': { city: 'Shanghai', tier: 'C9 League', rank: '#45', color: 'from-rose-900 to-orange-500' },
  'Fudan University': { city: 'Shanghai', tier: 'C9 League', rank: '#39', color: 'from-teal-900 to-emerald-500' },
  'Peking University': { city: 'Beijing', tier: 'C9 League', rank: '#17', color: 'from-red-900 to-rose-600' },
  'Nanjing University': { city: 'Nanjing', tier: 'C9 League', rank: '#141', color: 'from-fuchsia-900 to-purple-600' },
  'USTC': { city: 'Hefei', tier: 'C9 League', rank: '#137', color: 'from-sky-900 to-indigo-600' },
  "Xi'an Jiaotong": { city: "Xi'an", tier: 'C9 League', rank: '#291', color: 'from-amber-800 to-orange-600' },
};

export default function SavedUniversitiesPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchSaved = async () => {
      const { data, error } = await supabase
        .from('saved_universities')
        .select('*')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });

      if (!error) setSaved(data || []);
      setLoading(false);
    };

    if (user) fetchSaved();
  }, [user, supabase]);

  const handleRemove = async (id, name) => {
    const { error } = await supabase
      .from('saved_universities')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to remove university.');
    } else {
      setSaved(saved.filter(s => s.id !== id));
      toast.success(`${name} removed from saved.`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-heading">Saved Universities</h1>
        <p className="text-sm text-slate-500 mt-1">Universities you&apos;ve bookmarked for later.</p>
      </div>

      {saved.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
            <BookMarked size={32} className="text-slate-400" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">No saved universities yet</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Browse the <Link href="/universities" className="text-emerald-600 hover:underline font-semibold">Universities page</Link> and click the heart icon to save your favorites.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {saved.map((item) => {
            const meta = UNIVERSITY_DATA[item.university_name] || {};
            return (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group">
                <div className={`h-20 bg-gradient-to-tr ${meta.color || 'from-slate-700 to-slate-500'} relative`}>
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-[10px] font-bold bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-white uppercase tracking-wider">
                      {meta.tier || 'University'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900">{item.university_name}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        {meta.city && (
                          <span className="flex items-center gap-1"><MapPin size={12} /> {meta.city}</span>
                        )}
                        {meta.rank && <span>QS Rank: {meta.rank}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id, item.university_name)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      title="Remove from saved"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
