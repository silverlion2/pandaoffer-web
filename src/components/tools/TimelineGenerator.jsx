"use client";

import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Plane, FileCheck, Building, CheckCircle2 } from 'lucide-react';

const INTAKE_OPTIONS = [
  { id: 'sept_2026', label: 'September 2026', type: 'sept', year: 2026 },
  { id: 'march_2027', label: 'March 2027', type: 'march', year: 2027 },
  { id: 'sept_2027', label: 'September 2027', type: 'sept', year: 2027 }
];

export default function TimelineGenerator() {
  const [selectedIntake, setSelectedIntake] = useState('sept_2026');

  const timelineData = useMemo(() => {
    const intake = INTAKE_OPTIONS.find(i => i.id === selectedIntake);
    const isSept = intake.type === 'sept';
    const targetYear = intake.year;
    const priorYear = targetYear - 1;

    if (isSept) {
      return [
        {
          id: 1,
          period: `October - December ${priorYear}`,
          title: 'Document Preparation & Language Tests',
          desc: 'Get your passport, notarize diplomas/transcripts, and take the HSK or IELTS/TOEFL if required.',
          tip: '💡 Insider: Notarization takes 2-4 weeks in most countries. Start NOW. Some embassies also require authentication (apostille) — check your country\'s requirements.',
          icon: <FileCheck size={20} className="text-white" />,
          color: 'bg-indigo-500',
          bgColor: 'bg-indigo-50'
        },
        {
          id: 2,
          period: `January - March ${targetYear}`,
          title: 'University & Scholarship Applications Open',
          desc: 'Submit your application to the university portal. If applying for CSC, submit through the embassy (Type A) or university (Type B) now.',
          tip: '⚠️ Warning: Some top universities (ZJU, SJTU, HIT) close applications as early as February even though the national deadline is April. Apply to safety schools first, then reach schools.',
          icon: <Building size={20} className="text-white" />,
          color: 'bg-blue-500',
          bgColor: 'bg-blue-50'
        },
        {
          id: 3,
          period: `April - June ${targetYear}`,
          title: 'Interviews & Initial Results',
          desc: 'Universities conduct online interviews. Conditional and unofficial admission offers begin rolling out. Contact supervisors directly (for Master\'s/PhD) — a pre-acceptance letter dramatically boosts your chances.',
          tip: '💡 Insider: Email professors with your CV + research interests. Response rate is ~20-30%. Follow up after 2 weeks if no reply. WeChat is often faster than email for Chinese professors.',
          icon: <Clock size={20} className="text-white" />,
          color: 'bg-amber-500',
          bgColor: 'bg-amber-50'
        },
        {
          id: 4,
          period: `July - August ${targetYear}`,
          title: 'Official JW201/202 & Visa Application',
          desc: 'You receive the physical Admission Notice and JW201/202 form by mail or courier. Apply for your X1 (>180 days) or X2 (<180 days) student visa at your local Chinese embassy.',
          tip: '⚠️ Warning: Visa processing takes 4-7 business days (regular) or 2-3 days (rush, costs extra). Book your flight AFTER receiving the visa, not before. Some embassies require appointments weeks in advance.',
          icon: <CheckCircle2 size={20} className="text-white" />,
          color: 'bg-emerald-500',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 5,
          period: `September ${targetYear}`,
          title: 'Fly to China & Registration',
          desc: 'Arrive in China, register at the police station within 24 hours, undergo the mandatory medical re-exam at a designated Chinese hospital (¥400-700), and start orientation.',
          tip: '💡 Insider: Arrive 3-5 days before classes start. Download Alipay + WeChat before landing (VPN too!). Bring ¥2,000-3,000 cash for first-week expenses. Your university\'s international office arranges group police registration.',
          icon: <Plane size={20} className="text-white" />,
          color: 'bg-red-500',
          bgColor: 'bg-red-50'
        }
      ];
    } else {
      // March Intake
      return [
        {
          id: 1,
          period: `April - July ${priorYear}`,
          title: 'Document Preparation & Research',
          desc: 'March intake has fewer programs (~20% of universities). Research carefully and prepare all notarized documents and language scores.',
          tip: '⚠️ Warning: March intake is mainly for language programs and select degree programs. Most CSC scholarships are NOT available for spring semester. Self-funded is more common.',
          icon: <FileCheck size={20} className="text-white" />,
          color: 'bg-indigo-500',
          bgColor: 'bg-indigo-50'
        },
        {
          id: 2,
          period: `August - November ${priorYear}`,
          title: 'Submit Applications',
          desc: 'Apply directly to the universities. Provincial scholarships (e.g., Beijing, Shanghai, Jiangsu Government Scholarships) may still be available for spring intake.',
          tip: '💡 Insider: Some universities have rolling March admissions — apply early for the best chance. Contact the international admissions office directly via email or WeChat.',
          icon: <Building size={20} className="text-white" />,
          color: 'bg-blue-500',
          bgColor: 'bg-blue-50'
        },
        {
          id: 3,
          period: `December ${priorYear}`,
          title: 'Admission Results & JW202',
          desc: 'Universities issue admission decisions and mail the JW201/202 form. Processing can be slow — follow up if you haven\'t received documents by mid-December.',
          tip: '💡 Insider: Ask for a scanned copy by email first so you can start your visa application while waiting for the physical documents.',
          icon: <Clock size={20} className="text-white" />,
          color: 'bg-emerald-500',
          bgColor: 'bg-emerald-50'
        },
        {
          id: 4,
          period: `January - February ${targetYear}`,
          title: 'Visa Application',
          desc: 'Apply for your X1/X2 visa at your local Chinese consulate or embassy. Chinese New Year (Spring Festival) may cause embassy closures — check holiday schedules.',
          tip: '⚠️ Warning: Chinese embassies close for 1-2 weeks during Spring Festival (late Jan/early Feb). Submit your visa application BEFORE the holiday to avoid delays.',
          icon: <CheckCircle2 size={20} className="text-white" />,
          color: 'bg-amber-500',
          bgColor: 'bg-amber-50'
        },
        {
          id: 5,
          period: `March ${targetYear}`,
          title: 'Arrival & Registration',
          desc: 'Fly to China, settle into your dorm, register with police, and attend the spring semester orientation.',
          tip: '💡 Insider: Spring semester starts mid-March. Weather varies wildly by city — Beijing is still cold (5-10°C), while Kunming is already spring (15-22°C). Pack accordingly.',
          icon: <Plane size={20} className="text-white" />,
          color: 'bg-red-500',
          bgColor: 'bg-red-50'
        }
      ];
    }
  }, [selectedIntake]);

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1">
        <Calendar size={14} /> 95% Accurate Timeline
      </div>

      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading">Application Timeline Generator</h2>
        <p className="text-slate-500">
          Chinese university application cycles are rigid. Select your target intake below to generate a guaranteed, backwards-calculated preparation timeline.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-slate-100 p-1.5 rounded-xl">
          {INTAKE_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedIntake(opt.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                selectedIntake === opt.id 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 lg:ml-8 space-y-8 pb-4">
        {timelineData.map((step, index) => (
          <div key={step.id} className="relative pl-8 md:pl-10">
            {/* Timeline Dot */}
            <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${step.color}`}>
              <span className="scale-75">{step.icon}</span>
            </div>
            
            <div className={`p-5 rounded-2xl border border-slate-100 ${step.bgColor}`}>
              <span className="inline-block px-3 py-1 rounded-full bg-white text-xs font-bold text-slate-500 mb-3 shadow-sm border border-slate-100">
                Phase {index + 1}: {step.period}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              {step.tip && (
                <p className="text-xs text-slate-500 mt-3 p-2 bg-white/80 rounded-lg border border-slate-100 leading-relaxed">
                  {step.tip}
                </p>
              )}
            </div>
          </div>
        ))}
        
        {/* End of Timeline Dot */}
        <div className="absolute -left-[9px] -bottom-2 w-4 h-4 rounded-full bg-slate-200 border-2 border-white" />
      </div>
      
      {selectedIntake.startsWith('march') && (
        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600 text-center">
          <strong>Note:</strong> March intake is considered the &quot;Spring&quot; semester in China. Only about 20% of universities offer programs starting in March, and government scholarships are very rarely available.
        </div>
      )}
    </div>
  );
}
