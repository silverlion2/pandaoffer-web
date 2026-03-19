"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, GraduationCap, Plane, Wallet, Coffee, ShieldCheck } from 'lucide-react';

const FAQ_CATEGORIES = [
  {
    id: 'csc',
    label: 'CSC & Scholarships',
    icon: GraduationCap,
    color: 'emerald',
    faqs: [
      {
        question: "How do I apply for the CSC (China Scholarship Council) Scholarship?",
        answer: "The CSC Scholarship provides full or partial funding for international students. You can apply through your country's Chinese embassy (Type A) or directly to the target university (Type B). Key requirements: a strong GPA (typically 75%+), recommendation letters, a study plan, and applying well before the April deadline. Our AI Matcher can estimate your CSC probability."
      },
      {
        question: "What does the CSC Scholarship cover?",
        answer: "A full CSC Scholarship covers tuition, accommodation, a monthly stipend (¥3,000/month for undergrad, ¥3,500 for Master's, ¥4,000 for PhD), and comprehensive medical insurance. Some partial scholarships cover only tuition. CSC scholars pay zero tuition — it is fully government-funded."
      },
      {
        question: "Is there an age limit for CSC Scholarships?",
        answer: "Yes. For undergraduate programs, applicants should be under 25. For Master's programs, under 35. For PhD programs, under 40. These limits apply primarily to CSC Scholarship applicants — some self-funded programs have more flexible age requirements."
      },
      {
        question: "Are Chinese Medical Degrees recognised globally (WHO/NMC/GMC)?",
        answer: "Yes, degrees from MOE-listed Chinese medical universities are recognized by the World Health Organization (WHO), the National Medical Commission (NMC) of India, and the General Medical Council (GMC) of the UK, allowing you to take licensing exams in your home country."
      },
      {
        question: "Is it difficult to get into a top medical university in China?",
        answer: "Admission difficulty varies by university and your academic background. Top-tier C9 institutions like Fudan and Zhejiang require strong GPA and science backgrounds, while many 985/211 universities are more accessible. Our AI Matcher evaluates your profile against 50+ universities to give you realistic admission chances."
      },
    ]
  },
  {
    id: 'visas',
    label: 'Visas & Entry',
    icon: Plane,
    color: 'blue',
    faqs: [
      {
        question: "What is the student visa process for China?",
        answer: "You need an X1 visa (programs over 180 days) or X2 visa (under 180 days). Required documents include your passport, Admission Notice (录取通知书), JW201/JW202 form, physical exam (Foreigner Physical Examination Form), and visa application. Processing takes about 4 working days. X1 holders must apply for a Residence Permit within 30 days of arriving in China."
      },
      {
        question: "What documents do I need for my visa application?",
        answer: "You'll need: (1) valid passport with 6+ months validity, (2) completed visa application form with photo, (3) original Admission Notice from your university, (4) JW201 or JW202 form, (5) Foreigner Physical Examination Form with blood test results, (6) proof of financial support (for self-funded students), and (7) no criminal record certificate. Our Document Wizard generates a personalized checklist for you."
      },
      {
        question: "Can I work part-time on a student visa?",
        answer: "Chinese regulations are strict on student employment. You generally cannot work off-campus with a student visa. However, many universities offer paid research assistant or teaching assistant positions. Some students also do online freelance work. Always check your visa conditions — working illegally can result in fines or deportation."
      },
    ]
  },
  {
    id: 'costs',
    label: 'Costs & Budget',
    icon: Wallet,
    color: 'amber',
    faqs: [
      {
        question: "How much does it cost to study and live in China?",
        answer: "Tuition fees range from ¥20,000–60,000/year ($2,800–$8,300) depending on the program and university. Living costs are ¥2,500–5,000/month ($350–$700) in most cities. Total annual cost is typically $5,000–$15,000 — far lower than the US, UK, or Australia. CSC scholars pay zero tuition and receive a monthly stipend."
      },
      {
        question: "Which cities are cheapest for students?",
        answer: "Tier-2 cities like Chengdu, Wuhan, Xi'an, and Changsha offer the lowest living costs (¥2,000–3,000/month including rent). Beijing and Shanghai are the most expensive (¥4,000–6,000/month). Nanjing, Hangzhou, and Guangzhou fall in between. Use our Budget Calculator to find cities that match your monthly budget."
      },
      {
        question: "Do I need a Chinese bank account?",
        answer: "Yes, it's highly recommended. You'll need one for receiving your CSC stipend, paying campus fees, and using Alipay/WeChat Pay (which are essential for daily life). Most universities help international students open a Bank of China or ICBC account during orientation. Bring your passport and student ID."
      },
    ]
  },
  {
    id: 'daily-life',
    label: 'Daily Life',
    icon: Coffee,
    color: 'rose',
    faqs: [
      {
        question: "Do I need to know Chinese to study in China?",
        answer: "No, many universities offer English-taught MBBS, Engineering, and Business programs. However, learning basic Mandarin is highly recommended for daily life, ordering food, navigating transport, and clinical rotations during later years. Important: MBBS students must achieve HSK Level 4 to receive their degree certificate."
      },
      {
        question: "What is campus life like for international students?",
        answer: "Most universities provide international student dormitories with single or double rooms, shared kitchens, and laundry facilities. Campuses typically include canteens (¥10–20 per meal), gyms, libraries, and student activity centers. Many universities have active international student associations, cultural exchange events, and sports teams."
      },
      {
        question: "What can I do after graduating in China?",
        answer: "You have several options: return home with a globally recognized degree, stay in China on a work visa (major cities like Beijing, Shanghai, and Shenzhen offer post-graduation work permits for qualified graduates), continue to a higher degree, or leverage your China experience for international careers. Many CSC alumni become bridges between their home countries and China."
      },
    ]
  },
  {
    id: 'safety',
    label: 'Safety & Support',
    icon: ShieldCheck,
    color: 'violet',
    faqs: [
      {
        question: "Is China safe for international students?",
        answer: "China is one of the safest countries for international students. Cities have extremely low violent crime rates, and campuses have 24/7 security. The country has an extensive surveillance and police presence that contributes to public safety. Common-sense precautions apply: keep your valuables secure, be cautious with unfamiliar contacts, and avoid unlicensed taxis."
      },
      {
        question: "What health insurance do I need?",
        answer: "CSC scholars receive government-provided comprehensive medical insurance. Self-funded students must purchase health insurance — most universities offer campus insurance plans (¥600–800/year) that cover outpatient visits, hospitalization, and emergencies. Many university campuses have on-site clinics for basic care. Major cities have international hospitals with English-speaking staff."
      },
      {
        question: "Can PandaOffer guarantee my admission?",
        answer: "While no consultant can 100% guarantee admission to a specific university, we guarantee that our Done-For-You service will secure you an offer from at least one of your matched universities, or we provide a full refund of our service fee. Our AI Matcher gives you realistic probability scores before you commit."
      },
    ]
  },
];

// Flatten all FAQs for schema markup
const allFaqs = FAQ_CATEGORIES.flatMap(cat => cat.faqs);

const colorMap = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', activeBg: 'bg-emerald-500', icon: 'text-emerald-500', hoverBorder: 'hover:border-emerald-300' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', activeBg: 'bg-blue-500', icon: 'text-blue-500', hoverBorder: 'hover:border-blue-300' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', activeBg: 'bg-amber-500', icon: 'text-amber-500', hoverBorder: 'hover:border-amber-300' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', activeBg: 'bg-rose-500', icon: 'text-rose-500', hoverBorder: 'hover:border-rose-300' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', activeBg: 'bg-violet-500', icon: 'text-violet-500', hoverBorder: 'hover:border-violet-300' },
};

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('csc');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  const currentCategory = FAQ_CATEGORIES.find(c => c.id === activeCategory);
  const colors = colorMap[currentCategory.color];

  // Generate FAQ JSON-LD with ALL questions for rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="py-12 md:py-20 bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Everything you need to know about studying in China — organized by topic.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {FAQ_CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const catColors = colorMap[cat.color];
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? `${catColors.activeBg} text-white shadow-md`
                  : `${catColors.bg} ${catColors.text} border ${catColors.border} hover:shadow-sm`
              }`}
            >
              <Icon size={16} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-3">
        {currentCategory.faqs.map((faq, index) => (
          <div 
            key={`${activeCategory}-${index}`} 
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${colors.hoverBorder} ${
              openIndex === index ? colors.border : 'border-slate-200'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 md:p-6 text-left bg-white focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <span className="text-base md:text-lg font-bold text-slate-800 pr-6">{faq.question}</span>
              <span className={`flex-shrink-0 ${colors.icon}`}>
                {openIndex === index ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className={`p-5 md:p-6 pt-0 text-slate-600 border-t border-slate-100 ${colors.bg} leading-relaxed text-sm md:text-base`}>
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category count indicator */}
      <p className="text-center text-xs text-slate-400 mt-8">
        {allFaqs.length} questions across {FAQ_CATEGORIES.length} topics
      </p>
    </div>
  );
}
