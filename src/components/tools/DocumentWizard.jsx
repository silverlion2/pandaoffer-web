"use client";

import React, { useState, useMemo } from 'react';
import { FileText, CheckCircle, Circle, AlertCircle, Info, Download, GraduationCap, Globe } from 'lucide-react';

const DEGREE_OPTIONS = [
  { id: 'bachelor', label: "Bachelor's Degree", icon: '🎓' },
  { id: 'master', label: "Master's Degree", icon: '🎓' },
  { id: 'phd', label: 'PhD / Doctorate', icon: '🔬' },
  { id: 'non-degree', label: 'Language / Non-Degree', icon: '🌐' },
];

const NATIVE_ENGLISH_COUNTRIES = ['US', 'UK', 'CA', 'AU', 'NZ', 'IE', 'ZA'];

export default function DocumentWizard() {
  const [degreeLevel, setDegreeLevel] = useState('bachelor');
  const [isEnglishNative, setIsEnglishNative] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const documents = useMemo(() => {
    const list = [
      {
        id: 'passport',
        category: 'Essential',
        title: 'Passport Information Page',
        desc: 'Clear scanned copy of your valid passport (must be valid for at least 6 months beyond intended stay). Tip: Some universities also require a full-page scan showing all blank pages.',
        required: true,
      },
      {
        id: 'photo',
        category: 'Essential',
        title: 'Passport-Sized Photo',
        desc: 'Recent bareheaded photo with white background (usually 2 inches / 48mm × 33mm). Most passport photo shops in China cost ¥15-30 — much cheaper than doing it at home.',
        required: true,
      },
      {
        id: 'medical',
        category: 'Medical & Legal',
        title: 'Foreigner Physical Examination Form',
        desc: 'Completed medical exam signed by a doctor (valid for 6 months). Must include blood tests, chest X-ray, ECG, and general physical. Cost: ¥400-700 at designated Chinese hospitals. Even if you complete this at home, China requires their own re-exam on arrival.',
        required: true,
      },
      {
        id: 'police',
        category: 'Medical & Legal',
        title: 'Non-Criminal Record Certificate',
        desc: 'Police clearance certificate issued within the last 6 months. Processing time varies by country (1-8 weeks). Some countries require apostille/authentication by the Chinese embassy.',
        required: true,
      },
      {
        id: 'financial',
        category: 'Financial',
        title: 'Bank Statement / Sponsorship Letter',
        desc: 'Proof of funds (typically $2,500-5,000 equivalent). For self-funded students, show a 6-month bank statement with consistent balance. For sponsored students, a notarized sponsorship letter + sponsor\'s bank statement.',
        required: true,
      },
    ];

    if (degreeLevel === 'bachelor') {
      list.push(
        {
          id: 'diploma_hs',
          category: 'Academic',
          title: 'High School Diploma',
          desc: 'Notarized copy of your highest graduation certificate. Must be translated to English or Chinese by a certified translator. Apostille may be required depending on your country.',
          required: true,
        },
        {
          id: 'transcript_hs',
          category: 'Academic',
          title: 'High School Transcripts',
          desc: 'Official academic transcripts for all semesters, notarized if not originally in English or Chinese. GPA should be clearly visible. Some universities require a minimum of 80% or GPA 3.0/4.0 for competitive programs.',
          required: true,
        }
      );
    } else if (degreeLevel === 'master') {
      list.push(
        {
          id: 'diploma_ug',
          category: 'Academic',
          title: "Bachelor's Degree Certificate",
          desc: 'Notarized copy. Graduating students can provide a pre-graduation certificate.',
          required: true,
        },
        {
          id: 'transcript_ug',
          category: 'Academic',
          title: 'Undergraduate Transcripts',
          desc: 'Official complete transcripts for all years of study.',
          required: true,
        },
        {
          id: 'study_plan',
          category: 'Academic',
          title: 'Study Plan / Personal Statement',
          desc: 'Must be 800-1,500 words detailing your academic background, why you chose this university/program, research goals in China, and career plans after graduation. This is the most important document — generic plans are the #1 reason for rejection.',
          required: true,
        },
        {
          id: 'recommendation',
          category: 'Academic',
          title: 'Two Recommendation Letters',
          desc: 'Written and signed by professors or associate professors in your academic field. Must be on university letterhead with contact information. Letters from family friends or unrelated professionals carry zero weight.',
          required: true,
        }
      );
    } else if (degreeLevel === 'phd') {
      list.push(
        {
          id: 'diploma_pg',
          category: 'Academic',
          title: "Master's Degree Certificate",
          desc: 'Notarized copy.',
          required: true,
        },
        {
          id: 'transcript_pg',
          category: 'Academic',
          title: 'Postgraduate Transcripts',
          desc: 'Official complete transcripts.',
          required: true,
        },
        {
          id: 'research_proposal',
          category: 'Academic',
          title: 'Detailed Research Proposal',
          desc: 'In-depth proposal (1,000-2,000+ words) outlining intended doctoral research: background, methodology, expected contributions, and timeline. Align closely with your prospective supervisor\'s research area.',
          required: true,
        },
        {
          id: 'recommendation_phd',
          category: 'Academic',
          title: 'Two Recommendation Letters',
          desc: 'From professors or associate professors.',
          required: true,
        },
        {
          id: 'acceptance_letter',
          category: 'Academic',
          title: 'Supervisor Acceptance Letter (Optional but highly recommended)',
          desc: 'Conditional acceptance from an intended PhD supervisor. While optional, having this letter dramatically increases your chances (from ~30% to ~70% per student forum data). Contact professors 3-6 months before applying.',
          required: false,
        }
      );
    } else if (degreeLevel === 'non-degree') {
      list.push(
        {
          id: 'diploma_highest',
          category: 'Academic',
          title: 'Highest Academic Given (Minimum High School)',
          desc: 'Notarized copy of your graduation certificate.',
          required: true,
        }
      );
    }

    if (!isEnglishNative) {
      list.push({
        id: 'english_prof',
        category: 'Language',
        title: 'English Proficiency Certificate',
        desc: 'IELTS (usually 6.0+), TOEFL (usually 80+), or Duolingo (110+). Some universities accept a certificate from your previous English-medium institution instead. Always check your specific program\'s requirements.',
        required: true,
      });
    }

    list.push({
      id: 'hsk',
      category: 'Language',
      title: 'HSK Certificate (For Chinese-Taught Programs)',
      desc: 'Bachelor\'s: HSK 4 (score 180+). Master\'s/PhD: HSK 5 (score 180+). Some medical programs require HSK 6. English-taught programs: HSK not required but HSK 3+ helps with daily life. One semester = roughly one HSK level.',
      required: false,
    });

    return list;
  }, [degreeLevel, isEnglishNative]);

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const progress = Math.round((Object.values(checkedItems).filter(Boolean).length / documents.length) * 100) || 0;

  // Group documents
  const groupedDocs = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1">
        <FileText size={14} /> 100% Accurate
      </div>

      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading">Application Document Wizard</h2>
        <p className="text-slate-500">
          Chinese university requirements are strict. Generate your personalized, 100% definitive document checklist below so you don&apos;t miss anything.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">What degree are you applying for?</label>
          <div className="grid grid-cols-2 gap-2">
            {DEGREE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setDegreeLevel(opt.id)}
                className={`p-3 rounded-xl border text-sm text-left font-medium transition-all ${
                  degreeLevel === opt.id 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="mb-1 block text-lg">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Language Background</label>
          <div className="space-y-3">
            <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${isEnglishNative ? 'border-slate-200 bg-white' : 'border-blue-500 bg-blue-50'}`}>
              <div className="mt-1">
                <input 
                  type="radio" 
                  checked={!isEnglishNative} 
                  onChange={() => setIsEnglishNative(false)}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
              <div>
                <p className={`font-semibold text-sm ${!isEnglishNative ? 'text-blue-800' : 'text-slate-700'}`}>I am from a non-native English country</p>
                <p className="text-xs text-slate-500 mt-1">You may need an English proficiency test for English-taught programs.</p>
              </div>
            </label>
            <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${isEnglishNative ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}>
              <div className="mt-1">
                <input 
                  type="radio" 
                  checked={isEnglishNative} 
                  onChange={() => setIsEnglishNative(true)}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
              <div>
                <p className={`font-semibold text-sm ${isEnglishNative ? 'text-blue-800' : 'text-slate-700'}`}>I am from a native English country</p>
                <p className="text-xs text-slate-500 mt-1">US, UK, CA, AU, NZ, IE, ZA.</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-slate-700">Preparation Progress</span>
          <span className="text-sm font-bold text-blue-600">{progress}% Complete</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-6">
        {Object.entries(groupedDocs).map(([category, docs]) => (
          <div key={category}>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">{category}</h3>
            <div className="space-y-3">
              {docs.map(doc => {
                const isChecked = !!checkedItems[doc.id];
                return (
                  <div 
                    key={doc.id}
                    onClick={() => toggleCheck(doc.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      isChecked 
                        ? 'border-blue-200 bg-blue-50/50' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle size={22} className="text-blue-500" fill="#eff6ff" />
                      ) : (
                        <Circle size={22} className="text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-bold text-sm sm:text-base ${isChecked ? 'text-slate-700 line-through decoration-slate-400' : 'text-slate-900'}`}>
                          {doc.title}
                        </h4>
                        {!doc.required && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-wide">
                            Optional
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${isChecked ? 'text-slate-400' : 'text-slate-500'}`}>
                        {doc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
        <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-900 mb-1">Crucial Notarization Requirement</p>
          <p className="text-sm text-amber-800/80">
            Academic documents (diplomas/transcripts) and police clearances must be officially notarized by a local notary public. Some countries also require <strong>apostille</strong> or authentication by the Chinese Embassy. Processing takes 2-4 weeks — start early. In some African and South Asian countries, documents must go through the Ministry of Foreign Affairs first.
          </p>
        </div>
      </div>
    </div>
  );
}
