"use client";

import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, GraduationCap, MapPin, DollarSign, Lock, ShieldCheck, MessageSquare, AlertTriangle, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { unlockSchema } from '@/lib/schema';
import { submitLead } from '@/app/actions/leads';
import { toast } from 'sonner';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function UnlockResults({ step, setStep, formData, matchResults, matchError }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(unlockSchema)
  });

  const onUnlock = async (data) => {
    try {
      const result = await submitLead(data.email);
      if (result.success) {
        toast.success("Successfully unlocked!");
        setStep('unlocked');
      } else {
        toast.error(result.error || "Failed to unlock.");
      }
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const isUnlocked = step === 'unlocked';
  const unis = matchResults?.universities || [];
  const topMatch = unis[0];
  const cscProb = matchResults?.cscProbability || 0;

  // Error state
  if (matchError && !matchResults) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-start">
          <button 
            onClick={() => setStep('home')}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200"
          >
            <ArrowLeft size={16} /> Try Again
          </button>
        </div>
        <div className="text-center space-y-4 py-12">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900 font-heading">AI Matching Unavailable</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Our AI engine is temporarily busy. Please try again in a moment, or use our{' '}
            <Link href="/tools#advisor" className="text-emerald-600 hover:underline font-bold">AI Study Advisor</Link> for personalized guidance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Button */}
      <div className="flex justify-start">
        <button 
          onClick={() => setStep('home')}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200"
        >
          <ArrowLeft size={16} /> Back to Search
        </button>
      </div>

      <div className="text-center space-y-2">
        <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full">Analysis Complete</span>
        <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
          {topMatch ? `We found your ${topMatch.matchPercent}% Match!` : 'Your AI Results'}
        </h2>
        <p className="text-slate-500">Based on your {formData.nationality} nationality and {formData.gpa?.value} GPA.</p>
      </div>

      {/* Top University Match Card */}
      {topMatch && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="p-6 md:p-8 border-b border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  {topMatch.name} ({topMatch.code}) <ShieldCheck className="text-blue-500" size={24} />
                </h3>
                <p className="text-slate-500 font-medium">{topMatch.tier} • CSC Agency: {topMatch.cscAgency}</p>
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-bold text-sm border border-green-200">
                {topMatch.matchPercent}% Match
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><GraduationCap size={20} /></div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Program</p>
                  <p className="font-semibold">{topMatch.program}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><MapPin size={20} /></div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Location</p>
                  <p className="font-semibold">{topMatch.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><DollarSign size={20} /></div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Tuition / Year</p>
                  <p className="font-semibold">~ ${topMatch.tuitionUSD?.toLocaleString()} USD</p>
                </div>
              </div>
            </div>

            {/* Why Match */}
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-sm text-emerald-800">
              <strong>Why this match:</strong> {topMatch.whyMatch}
            </div>
          </div>

          {/* Locked Area */}
          <div className="relative">
            {!isUnlocked && (
              <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/60 flex flex-col items-center justify-center p-6 text-center border-t border-slate-100">
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full animate-in zoom-in-95">
                  <Lock className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Unlock the Full Report</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Enter your email to reveal insider tips, CSC scholarship probability, and your other 2 matching universities.
                  </p>
                  <form onSubmit={handleSubmit(onUnlock)} className="space-y-3">
                    <div>
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        {...register('email')}
                        className={`w-full p-3 bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`}
                      />
                      {errors.email && <p className="text-xs text-red-500 text-left mt-1">{errors.email.message}</p>}
                    </div>
                    
                    <label className="flex items-start gap-2 text-left cursor-pointer group pb-2 relative">
                      <input 
                        type="checkbox" 
                        {...register('agreeTerms')}
                        className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer" 
                      />
                      <span className="text-[11px] text-slate-500 leading-tight">
                        I agree to the <Link href="/terms" target="_blank" className="text-emerald-600 hover:underline">Terms of Service</Link> & <Link href="/privacy" target="_blank" className="text-emerald-600 hover:underline">Privacy Policy</Link>.
                      </span>
                    </label>
                    {errors.agreeTerms && <p className="text-xs text-red-500 text-left">{errors.agreeTerms.message}</p>}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5"
                    >
                      {isSubmitting ? "Unlocking Data..." : "Reveal Hidden Data"}
                    </button>
                  </form>
                  <p className="text-xs text-slate-400 mt-4">Bank-level encryption. No spam ever.</p>
                </div>
              </div>
            )}

            {isUnlocked && (
              <div className="absolute top-4 right-4 z-20 animate-in fade-in slide-in-from-top-2">
                <button 
                  onClick={() => toast.success("PDF has been sent to your email!")}
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg"
                >
                  📥 Email me a PDF copy
                </button>
              </div>
            )}

            <div className={`p-6 md:p-8 bg-slate-50 ${!isUnlocked ? 'blur-sm select-none opacity-50' : ''}`}>
              <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Critical Application Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Insider Tip */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-sm text-slate-500 font-bold uppercase mb-1">Insider Tip</p>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-start gap-2">
                      <Sparkles size={16} className="text-violet-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-slate-700">{topMatch?.insiderTip || 'Apply early for best chances.'}</p>
                    </div>
                    {matchResults?.overallAdvice && (
                      <div className="flex items-start gap-2 pt-2 border-t border-slate-100">
                        <Sparkles size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-slate-700">{matchResults.overallAdvice}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* CSC Probability */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-bl-lg">
                    AI Prediction
                  </div>
                  <p className="text-sm text-slate-500 font-bold uppercase mb-1">CSC Scholarship Probability</p>
                  <div className="mt-2">
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-extrabold text-slate-800">
                        {cscProb}%
                      </span>
                      <span className="text-sm text-slate-500 mb-1">Success Rate</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                      <div 
                        className="bg-orange-500 h-full rounded-full transition-all duration-1000" 
                        style={{width: `${cscProb}%`}}
                      ></div>
                    </div>
                    {matchResults?.cscTip && (
                      <p className="text-xs text-slate-500 mt-2">
                        💡 {matchResults.cscTip}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Other 2 Universities */}
              {unis.length > 1 && (
                <div className="mt-6">
                  <h3 className="font-bold text-slate-800 mb-3">Other Matching Universities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {unis.slice(1).map((uni, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-slate-900">{uni.name}</h4>
                            <p className="text-xs text-slate-500">{uni.tier} • {uni.city} • CSC: {uni.cscAgency}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            uni.matchPercent >= 80 ? 'bg-green-100 text-green-700' : 
                            uni.matchPercent >= 60 ? 'bg-amber-100 text-amber-700' : 
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {uni.matchPercent}%
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-1"><strong>Program:</strong> {uni.program}</p>
                        <p className="text-sm text-slate-600 mb-1"><strong>Tuition:</strong> ~${uni.tuitionUSD?.toLocaleString()}/yr</p>
                        <p className="text-xs text-slate-500 mt-2 italic">{uni.whyMatch}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full bg-slate-100 h-20 flex flex-col items-center justify-center text-slate-400 text-xs rounded-xl border border-slate-200 border-dashed relative group overflow-hidden mt-6">
        <span className="font-bold text-slate-500 mb-1">Sponsored: Best VPN for Students in China 🇨🇳</span>
        <span>Stay connected with Google, WhatsApp, and YouTube. Get 70% off ExpressVPN today.</span>
        <div className="absolute top-1 right-1 bg-slate-200 text-[9px] px-1.5 py-0.5 rounded text-slate-500 uppercase">Ad</div>
      </div>

      {isUnlocked && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#5865F2] text-white p-6 rounded-2xl shadow-md flex flex-col justify-center items-center text-center">
            <MessageSquare size={32} className="mb-3 opacity-90" />
            <h3 className="font-bold text-lg mb-1">Have doubts? Ask real students.</h3>
            <p className="text-sm text-blue-100 mb-4">Join our Discord to talk to students currently studying at {topMatch?.code || 'Chinese universities'}.</p>
            <a 
              href={siteConfig.links.discord} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-[#5865F2] font-bold py-2 px-6 rounded-lg hover:bg-slate-50 transition-colors w-full flex items-center justify-center cursor-pointer"
            >
              Join Community (Free)
            </a>
          </div>
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col justify-center items-center text-center">
            <ShieldCheck size={32} className="mb-3 text-emerald-400" />
            <h3 className="font-bold text-lg mb-1">Want guaranteed admission?</h3>
            <p className="text-sm text-slate-400 mb-4">Book a 1v1 strategy call with our admission experts.</p>
            <button className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-600 transition-colors w-full">
              Book Strategy Call ($49)
            </button>
          </div>
        </div>
      )}

      <div className="text-center text-xs text-slate-400 max-w-3xl mx-auto pt-8 border-t border-slate-200">
        Disclaimer: Certification statuses and admission probabilities are generated based on historical data and AI models for reference only. PandaOffer does not guarantee admission.
      </div>
    </div>
  );
}
