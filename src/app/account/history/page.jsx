"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { History, Trash2, Loader2, Brain, GraduationCap, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const { user } = useAuth();
  const [matchHistory, setMatchHistory] = useState([]);
  const [savedChats, setSavedChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('matches');
  const supabase = createClient();

  useEffect(() => {
    const fetchHistory = async () => {
      const [matchRes, chatRes] = await Promise.all([
        supabase
          .from('match_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20),
        supabase
          .from('saved_chats')
          .select('*')
          .eq('user_id', user.id)
          .order('saved_at', { ascending: false })
          .limit(50),
      ]);

      setMatchHistory(matchRes.data || []);
      setSavedChats(chatRes.data || []);
      setLoading(false);
    };

    if (user) fetchHistory();
  }, [user, supabase]);

  const deleteMatch = async (id) => {
    const { error } = await supabase.from('match_history').delete().eq('id', id);
    if (!error) {
      setMatchHistory(matchHistory.filter(m => m.id !== id));
      toast.success('Match result removed.');
    }
  };

  const deleteChat = async (id) => {
    const { error } = await supabase.from('saved_chats').delete().eq('id', id);
    if (!error) {
      setSavedChats(savedChats.filter(c => c.id !== id));
      toast.success('Saved Q&A removed.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  const tabs = [
    { id: 'matches', label: 'AI Matcher', icon: GraduationCap, count: matchHistory.length },
    { id: 'chats', label: 'Saved Q&A', icon: Brain, count: savedChats.length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-heading">History</h1>
        <p className="text-sm text-slate-500 mt-1">Your saved AI Matcher results and AI Advisor Q&A pairs.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-emerald-50 text-emerald-700 font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Match History Tab */}
      {activeTab === 'matches' && (
        <>
          {matchHistory.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
                <GraduationCap size={32} className="text-slate-400" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">No match history yet</h2>
              <p className="text-sm text-slate-500">
                Use the <Link href="/" className="text-emerald-600 hover:underline font-semibold">AI Matcher</Link> to find your best-fit universities. Results are auto-saved when you&apos;re signed in.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {matchHistory.map((match) => {
                const results = match.results || {};
                const unis = results.universities || [];
                const formData = match.form_data || {};
                return (
                  <div key={match.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-xs text-slate-500">
                          {new Date(match.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          <strong>{formData.nationality}</strong> · {formData.target_major} · GPA: {formData.gpa?.value}
                        </p>
                      </div>
                      <button onClick={() => deleteMatch(match.id)} className="text-slate-300 hover:text-red-500 p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {unis.map((uni, i) => (
                        <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg font-medium">
                          {uni.name} ({uni.matchPercent}%)
                        </span>
                      ))}
                    </div>
                    {results.cscProbability != null && (
                      <p className="text-xs text-slate-500 mt-2">
                        <Sparkles size={12} className="inline text-amber-500" /> CSC Probability: {results.cscProbability}%
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Saved Chats Tab */}
      {activeTab === 'chats' && (
        <>
          {savedChats.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
                <Brain size={32} className="text-slate-400" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">No saved Q&A yet</h2>
              <p className="text-sm text-slate-500">
                Chat with the <Link href="/tools#advisor" className="text-emerald-600 hover:underline font-semibold">AI Advisor</Link> and click the 💾 save button on any answer to keep it here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedChats.map((chat) => (
                <div key={chat.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 bg-violet-50 border-b border-violet-100">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-violet-900">{chat.question}</p>
                      <button onClick={() => deleteChat(chat.id)} className="text-slate-300 hover:text-red-500 p-1 shrink-0 ml-2">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{chat.answer}</p>
                    {chat.sources?.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-slate-100">
                        <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                          <BookOpen size={10} /> Sources:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {chat.sources.map((s, j) => (
                            <span key={j} className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full border border-violet-100">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-slate-400 mt-2">
                      Saved {new Date(chat.saved_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
