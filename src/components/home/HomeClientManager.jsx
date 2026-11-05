"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import AiMatcherForm from './AiMatcherForm';
import UnlockResults from './UnlockResults';
import MedicalTourismBanner from './MedicalTourismBanner';
import LifeHeroHeader from './LifeHeroHeader';
import LifeDiscoverGrid from './LifeDiscoverGrid';
import LifeServicesPromo from './LifeServicesPromo';
import EmergencyContacts from './EmergencyContacts';
import { useMode } from '@/components/providers/ModeProvider';
import { isUsableMatch } from '@/lib/matcher-response';

export default function HomeClientManager({ 
  studyTourLead,
  heroHeader, 
  toolsMenu,
  affiliates, 
  discoverChina, 
  socialProof, 
  premiumServices
}) {
  const { mode, isMounted } = useMode();
  const [location, setLocation] = useState('Shanghai'); // Default setting for Life tools

  const [step, setStep] = useState('home'); 
  const [formData, setFormData] = useState({
    nationality: '',
    major: '',
    gpa: { scale: 'percentage', value: '' },
  });
  const [matchResults, setMatchResults] = useState(null);
  const [matchError, setMatchError] = useState(null);
  const activeAttempt = useRef(null);
  const mounted = useRef(false);
  const flowRef = useRef(null);
  const previousStep = useRef('home');

  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    flowRef.current?.focus({ preventScroll: true });
    flowRef.current?.scrollIntoView?.({ block: 'start' });
  }, [step]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      const attempt = activeAttempt.current;
      activeAttempt.current = null;
      if (attempt) {
        clearTimeout(attempt.timer);
        attempt.controller.abort();
      }
    };
  }, []);

  const cancelMatch = () => {
    const attempt = activeAttempt.current;
    activeAttempt.current = null;
    if (attempt) {
      clearTimeout(attempt.timer);
      attempt.controller.abort();
    }
    setStep('home');
  };

  const handleMatch = async (data) => {
    if (!mounted.current || activeAttempt.current) return;
    const attempt = { controller: new AbortController(), timer: null };
    activeAttempt.current = attempt;
    setFormData(data);
    setMatchResults(null);
    setMatchError(null);
    setStep('analyzing');
    attempt.timer = setTimeout(() => {
      if (activeAttempt.current !== attempt) return;
      activeAttempt.current = null;
      attempt.controller.abort();
      setMatchError('Matching timed out. Please try again.');
      setStep('results');
    }, 20000);

    try {
      const res = await fetch('/api/matcher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: attempt.controller.signal,
      });

      if (!res.ok) throw new Error('Matching failed');

      const result = await res.json();
      if (!isUsableMatch(result)) throw new Error('Invalid matching response');
      if (activeAttempt.current !== attempt) return;

      setMatchResults(result);
      setStep('results');
    } catch (err) {
      if (activeAttempt.current !== attempt) return;
      setMatchError(err.message);
      setStep('results');
    } finally {
      clearTimeout(attempt.timer);
      if (activeAttempt.current === attempt) activeAttempt.current = null;
    }
  };

  const isLife = isMounted && mode === 'life';

  return (
    <div ref={flowRef} tabIndex={-1} className="font-sans text-slate-800 scroll-mt-24 focus:outline-none">
      {step === 'home' && (
        <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* DYNAMIC HERO SECTION based on global Mode */}
          {isMounted && mode === 'application' && (
            <div className="space-y-14">
              {studyTourLead}
              <div className="text-center space-y-8">
                {heroHeader}
                <AiMatcherForm onSubmit={handleMatch} defaultValues={formData} />
                <p className="text-xs text-center text-slate-400 mt-4">
                  Free planning guidance from curated data, with AI assistance when available.
                </p>
              </div>
            </div>
          )}

          {isLife && (
            <div className="text-center space-y-8">
              <LifeHeroHeader location={location} setLocation={setLocation} />
            </div>
          )}

          <div className="mt-12">
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

          {/* Life mode: Emergency Contacts */}
          {isLife && <EmergencyContacts />}

          <MedicalTourismBanner />

          {/* Mode-specific discover section */}
          {isLife ? <LifeDiscoverGrid /> : discoverChina}

          {/* Mode-specific promo section */}
          {isLife ? <LifeServicesPromo /> : premiumServices}

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
        <div className="text-center space-y-6 py-20 animate-pulse" role="status" aria-live="polite">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-bold text-slate-800 font-heading">Building your university shortlist...</h2>
          
          <p className="text-slate-500 max-w-md mx-auto px-4">
            Checking your profile and available university data to prepare options for your research.
          </p>
          <button type="button" onClick={cancelMatch} className="min-h-11 rounded-lg border border-slate-300 px-5 py-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
            Cancel matching
          </button>
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

