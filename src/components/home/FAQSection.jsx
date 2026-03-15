"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Is it difficult to get into a top medical university in China?",
    answer: "Admission difficulty varies by university and your academic background. Top-tier institutions like Fudan University require strong SP/GPA and science backgrounds, while others are more accessible. Our AI Matcher evaluates your profile against 50+ universities to give you realistic admission chances."
  },
  {
    question: "Are Chinese Medical Degrees recognised globally (WHO/NMC/GMC)?",
    answer: "Yes, degrees from MOE-listed Chinese medical universities are recognized by the World Health Organization (WHO), the National Medical Commission (NMC) of India, and the General Medical Council (GMC) of the UK, allowing you to take licensing exams in your home country."
  },
  {
    question: "How do I apply for the CSC (China Scholarship Council) Scholarship?",
    answer: "The CSC Scholarship provides full or partial funding for international students. You must apply through the Chinese embassy in your country or directly to the target university. Important requirements include a high GPA, strong recommendation letters, and applying well before the April deadline."
  },
  {
    question: "Can PandaOffer guarantee my admission?",
    answer: "While no consultant can 100% guarantee admission to a specific university, we guarantee that we will secure you an offer from at least one of your matched universities, or we provide a full refund of our service fee."
  },
  {
    question: "Do I need to know Chinese to study in China?",
    answer: "No, many universities offer English-taught MBBS, Engineering, and Business programs. However, learning basic Mandarin is highly recommended for daily life and clinical rotations during your later years of study."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="py-20 bg-white rounded-3xl p-8 md:p-12 mb-20 shadow-xl border border-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Everything you need to know about studying in China, scholarships, and our admission process.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-emerald-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-6 text-left bg-white focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <span className="text-lg font-bold text-slate-800 pr-8">{faq.question}</span>
              <span className="text-emerald-500 flex-shrink-0">
                {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-6 pt-0 text-slate-600 border-t border-slate-100 bg-slate-50 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
