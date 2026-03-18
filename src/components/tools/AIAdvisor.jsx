"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, Sparkles, BookOpen, X, Loader2, GraduationCap, CheckCircle, XCircle, Save } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const SUGGESTED_QUESTIONS = [
  "What scholarships can I apply for as a Master's student?",
  "How much does it really cost to live in Beijing per month?",
  "What's the visa process for studying in China in 2026?",
  "Best universities for computer science with CSC scholarship?",
  "What HSK level do I need for Tsinghua or Zhejiang University?",
  "Cheapest cities to study in China with good 985 universities?",
  "What apps do I need to survive in China? (WeChat, Alipay, VPN)",
  "How do I find a supervisor and get a pre-acceptance letter?",
  "What's campus life really like? Dorms, canteens, clubs?",
  "CSC Type A vs Type B - which track should I choose?",
];

const COMPARISON_TABLE = [
  { feature: 'CSC application tricks', generic: 'Outdated/vague', advisor: 'From actual applicants' },
  { feature: '2025-2026 deadlines', generic: 'Training cutoff', advisor: 'Scraped from official sites' },
  { feature: 'Embassy quota info', generic: 'Unknown', advisor: 'From student forums' },
  { feature: 'Living cost by city', generic: 'Approximate', advisor: 'Verified student data' },
  { feature: 'Supervisor email tips', generic: 'Generic advice', advisor: 'From podcast interviews' },
];

export default function AIAdvisor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [savedMessages, setSavedMessages] = useState(new Set());
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e, customQuery = null) => {
    if (e) e.preventDefault();
    const query = customQuery || input.trim();
    if (!query || loading) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setLoading(true);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer || 'Sorry, I could not find relevant information.',
        sources: data.sources || [],
        followups: data.followups || [],
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        sources: [],
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQA = async (msgIndex) => {
    if (!user) {
      toast.error('Sign in to save Q&A.', {
        action: { label: 'Sign In', onClick: () => window.location.href = '/auth/login' },
      });
      return;
    }
    if (!user.email_confirmed_at) {
      toast.error('Verify your email to save Q&A.');
      return;
    }
    const assistantMsg = messages[msgIndex];
    // Find the user message right before this assistant message
    let question = 'Unknown question';
    for (let i = msgIndex - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        question = messages[i].content;
        break;
      }
    }
    try {
      await supabase.from('saved_chats').insert({
        user_id: user.id,
        question,
        answer: assistantMsg.content,
        sources: assistantMsg.sources || [],
      });
      setSavedMessages(prev => new Set([...prev, msgIndex]));
      toast.success('Q&A saved to your history!');
    } catch {
      toast.error('Failed to save.');
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-8 py-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center">
            <Brain size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
              AI Study Advisor
              <span className="text-[10px] font-bold bg-white/30 backdrop-blur-sm text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
            </h2>
            <p className="text-violet-200 text-sm">Powered by Expert Knowledge</p>
          </div>
          <button 
            onClick={() => setShowComparison(!showComparison)}
            className="ml-auto text-xs bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
          >
            <Sparkles size={12} />
            Why we&apos;re different
          </button>
        </div>
        <p className="text-sm text-violet-100/90 leading-relaxed">
          Not just another chatbot. Our AI has analyzed <strong>hundreds of podcasts, forums, and official sources</strong> specifically about studying in China — knowledge that ChatGPT and other LLMs simply don&apos;t have.
        </p>
      </div>

      {/* Comparison Table (collapsible) */}
      {showComparison && (
        <div className="bg-violet-50 border-b border-violet-100 px-8 py-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-violet-900">Why this is different</h3>
            <button onClick={() => setShowComparison(false)} className="text-violet-400 hover:text-violet-600">
              <X size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th className="py-1.5 pr-4 font-bold text-violet-700">Topic</th>
                  <th className="py-1.5 pr-4 font-bold text-slate-500">Generic LLM</th>
                  <th className="py-1.5 font-bold text-violet-700">Panda Offer AI</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={i} className="border-t border-violet-100/50">
                    <td className="py-2 pr-4 text-slate-700 font-medium">{row.feature}</td>
                    <td className="py-2 pr-4 text-slate-400 flex items-center gap-1">
                      <XCircle size={12} className="text-red-400 shrink-0" /> {row.generic}
                    </td>
                    <td className="py-2 text-violet-800 font-medium">
                      <span className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-emerald-500 shrink-0" /> {row.advisor}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="px-8 py-6" style={{ minHeight: isEmpty ? '360px' : '400px', maxHeight: '500px', overflowY: 'auto' }}>
        
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="bg-violet-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
              <GraduationCap size={32} className="text-violet-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Ask me anything about studying in China</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-md">
              Scholarships, visa process, costs, universities, HSK requirements, city comparisons — powered by expert domain knowledge.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSubmit(null, q)}
                  className="text-left text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-violet-50 hover:border-violet-200 text-slate-600 hover:text-violet-800 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-violet-600 text-white rounded-br-md' 
                    : 'bg-slate-100 text-slate-800 rounded-bl-md'
                }`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-200/50">
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                        <BookOpen size={10} /> Sources:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {msg.sources.map((s, j) => (
                          <span key={j} className="text-xs bg-white/80 text-violet-700 px-2 py-0.5 rounded-full border border-violet-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => handleSaveQA(i)}
                      disabled={savedMessages.has(i)}
                      className={`mt-2 flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${
                        savedMessages.has(i)
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-slate-200/50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                      title={savedMessages.has(i) ? 'Saved!' : 'Save this Q&A'}
                    >
                      <Save size={12} />
                      {savedMessages.has(i) ? 'Saved' : 'Save'}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                  <Loader2 size={16} className="text-violet-500 animate-spin" />
                  <span className="text-sm text-slate-500">Searching knowledge base...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Follow-up Suggestions */}
        {!loading && messages.length > 0 && messages[messages.length - 1]?.followups?.length > 0 && (
          <div className="px-8 pb-2">
            <p className="text-xs text-slate-500 mb-2 flex items-center gap-1"><Sparkles size={10} /> Related questions</p>
            <div className="flex flex-wrap gap-2">
              {messages[messages.length - 1].followups.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSubmit(null, q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-violet-200 bg-violet-50 hover:bg-violet-100 text-violet-700 hover:text-violet-900 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-8 pb-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about scholarships, visas, costs, universities..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-slate-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 text-white px-4 py-3 rounded-xl transition-colors flex items-center gap-2"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
