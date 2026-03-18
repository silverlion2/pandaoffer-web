"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import AiMatcherForm from './AiMatcherForm';
import UnlockResults from './UnlockResults';

export default function HomeClientManager({ 
  heroHeader, 
  toolsMenu,
  affiliates, 
  discoverChina, 
  socialProof, 
  premiumServices
}) {
  const [step, setStep] = useState('home'); 
  const [formData, setFormData] = useState({
    nationality: '',
    major: '',
    gpa: { scale: 'percentage', value: '' },
  });
  const [matchResults, setMatchResults] = useState(null);
  const [matchError, setMatchError] = useState(null);

  const handleMatch = async (data) => {
    setFormData(data);
    setMatchError(null);
    setStep('analyzing');

    try {
      const res = await fetch('/api/matcher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Matching failed');

      const result = await res.json();
      if (result.error) throw new Error(result.error);

      setMatchResults(result);
      setStep('results');
    } catch (err) {
      console.error('Matcher error:', err);
      setMatchError(err.message);
      setStep('results');
    }
  };

  return (
    <div className="font-sans text-slate-800">
      {step === 'home' && (
        <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-8">
            {heroHeader}
            <AiMatcherForm onSubmit={handleMatch} defaultValues={formData} />
            <p className="text-xs text-center text-slate-400 mt-4">
              100% Free. Powered by Real Admission Data &amp; AI.
            </p>
          </div>

          <div className="-mt-12">
            {socialProof}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12 border-t border-slate-200">
            <div className="lg:col-span-2">
              {toolsMenu}
            </div>
            <div className="lg:col-span-1">
              {affiliates}
            </div>
          </div>

          {discoverChina}

          {premiumServices}

          <div className="text-center py-8">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors"
            >
              <HelpCircle size={18} />
              Have questions? Read our FAQ
            </Link>
          </div>
        </div>
      )}

      {step === 'analyzing' && (
        <div className="text-center space-y-6 py-20 animate-pulse">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-bold text-slate-800 font-heading">AI is analyzing your profile...</h2>
          
          <div className="text-slate-500 relative h-6 overflow-hidden">
             <div className="animate-[slideUp_4s_ease-in-out_infinite] flex flex-col items-center">
               <span className="h-6 leading-6">Cross-referencing 50+ Top Chinese Universities...</span>
               <span className="h-6 leading-6">Checking WHO/NMC Medical Councils data...</span>
               <span className="h-6 leading-6">Calculating CSC Scholarship probability...</span>
               <span className="h-6 leading-6">Finalizing your perfect match...</span>
             </div>
          </div>
        </div>
      )}

      {(step === 'results' || step === 'unlocked') && (
        <UnlockResults 
          step={step} 
          setStep={setStep} 
          formData={formData}
          matchResults={matchResults}
          matchError={matchError}
        />
      )}
    </div>
  );
}
