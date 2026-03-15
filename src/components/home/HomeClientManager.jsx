"use client";

import React, { useState } from 'react';
import AiMatcherForm from './AiMatcherForm';
import UnlockResults from './UnlockResults';

export default function HomeClientManager({ 
  heroHeader, 
  budgetCalculator, 
  affiliates, 
  discoverChina, 
  socialProof, 
  premiumServices,
  faqSection
}) {
  const [step, setStep] = useState('home'); 
  const [formData, setFormData] = useState({
    nationality: '',
    major: '',
    gpa: { scale: 'percentage', value: '' },
  });

  const handleMatch = (data) => {
    setFormData(data);
    setStep('analyzing');
    setTimeout(() => {
      setStep('results');
    }, 4000); 
  };

  return (
    <div className="font-sans text-slate-800">
      {step === 'home' && (
        <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-8">
            {heroHeader}
            <AiMatcherForm onSubmit={handleMatch} defaultValues={formData} />
            <p className="text-xs text-center text-slate-400 mt-4">
              100% Free. Powered by Real Admission Data & AI.
            </p>
          </div>

          <div className="-mt-12">
            {socialProof}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12 border-t border-slate-200">
            {budgetCalculator}
            {affiliates}
          </div>

          {discoverChina}
          {premiumServices}
          {faqSection}
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
        />
      )}
    </div>
  );
}
