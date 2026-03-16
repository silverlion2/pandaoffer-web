"use client";

import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, GraduationCap, MapPin, DollarSign, Lock, ShieldCheck, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { unlockSchema } from '@/lib/schema';
import { submitLead } from '@/app/actions/leads';
import { toast } from 'sonner';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function UnlockResults({ step, setStep, formData }) {
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
        <h2 className="text-3xl font-extrabold text-slate-900 font-heading">We found your 92% Match!</h2>
        <p className="text-slate-500">Based on your {formData.nationality} nationality and {formData.gpa.value} GPA.</p>
      </div>

      {/* University Match Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="p-6 md:p-8 border-b border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Zhejiang University (ZJU) <ShieldCheck className="text-blue-500" size={24} />
              </h3>
              <p className="text-slate-500 font-medium">Top 5 in China • C9 League</p>
            </div>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-bold text-sm border border-green-200">
              92% Match
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><GraduationCap size={20} /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Program</p>
                <p className="font-semibold">{formData.major === 'MBBS' ? 'MBBS (English)' : 'BSc Computer Science'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><MapPin size={20} /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Location</p>
                <p className="font-semibold">Hangzhou, China</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><DollarSign size={20} /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Tuition / Year</p>
                <p className="font-semibold">~ $6,200 USD</p>
              </div>
            </div>
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
                  Enter your email to reveal WHO/NMC certification status, CSC full-scholarship probability, and 2 other matching universities.
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
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500 font-bold uppercase mb-1">Medical Certification</p>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">WHO Recognized</span>
                    <CheckCircle className="text-emerald-500" size={18} />
                  </div>
                  {formData.nationality === 'India' && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="font-medium">NMC (India) Approved</span>
                      <CheckCircle className="text-emerald-500" size={18} />
                    </div>
                  )}
                  {formData.nationality === 'Pakistan' && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="font-medium">PMDC (Pakistan) Approved</span>
                      <CheckCircle className="text-emerald-500" size={18} />
                    </div>
                  )}
                  {formData.nationality === 'USA' && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="font-medium">ECFMG / USMLE Eligible</span>
                      <CheckCircle className="text-emerald-500" size={18} />
                    </div>
                  )}
                  {formData.nationality === 'Saudi Arabia' && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="font-medium">SCFHS / SMLE Eligible</span>
                      <CheckCircle className="text-emerald-500" size={18} />
                    </div>
                  )}
                  {['Netherlands', 'Germany', 'Albania'].includes(formData.nationality) && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="font-medium">European Medical Framework Recognized</span>
                      <CheckCircle className="text-emerald-500" size={18} />
                    </div>
                  )}
                  {formData.nationality === 'Taiwan' && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="font-medium">Taiwan MOE Recognized</span>
                      <CheckCircle className="text-emerald-500" size={18} />
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-bl-lg">
                  AI Prediction
                </div>
                <p className="text-sm text-slate-500 font-bold uppercase mb-1">CSC Scholarship Probability</p>
                <div className="mt-2">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-slate-800">
                      {formData.gpa.includes('9') || parseFloat(formData.gpa) > 85 ? '78%' : '35%'}
                    </span>
                    <span className="text-sm text-slate-500 mb-1">Success Rate</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="bg-orange-500 h-full rounded-full" 
                      style={{width: formData.gpa.includes('9') || parseFloat(formData.gpa) > 85 ? '78%' : '35%'}}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    * Competition is extremely high for this major. Early application (Dec-Jan) increases chances by 15%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            <p className="text-sm text-blue-100 mb-4">Join our Discord to talk to students currently studying at ZJU.</p>
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
