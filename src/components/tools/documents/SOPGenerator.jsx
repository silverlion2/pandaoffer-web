"use client";

import React, { useState, useMemo } from 'react';
import { Copy, Download, Check, AlertCircle } from 'lucide-react';

const TextArea = ({ label, value, field, placeholder, hint, rows = 4, update }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    {hint && <p className="text-xs text-slate-400 mb-2">{hint}</p>}
    <textarea
      value={value}
      onChange={(e) => update(field, e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all bg-white resize-none placeholder:text-slate-400"
    />
  </div>
);

const InputField = ({ label, value, field, placeholder, update }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => update(field, e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all bg-white placeholder:text-slate-400"
    />
  </div>
);

export default function SOPGenerator() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    country: '',
    currentSituation: '',
    academicJourney: '',
    whyChina: '',
    targetProgram: '',
    careerGoals: '',
    uniqueQualities: '',
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const generatedText = useMemo(() => {
    const sections = [];

    sections.push(`Statement of Purpose`);
    sections.push(`${form.fullName || '[Your Full Name]'} — ${form.targetProgram || '[Target Program]'}`);
    sections.push('');

    // Section 1
    sections.push('Personal Introduction');
    sections.push('');
    if (form.fullName || form.country || form.currentSituation) {
      let text = `My name is ${form.fullName || '[Your Name]'}, and I am from ${form.country || '[Country]'}. `;
      if (form.currentSituation) {
        text += form.currentSituation;
      } else {
        text += 'I am currently [current situation — student, professional, etc.] with a strong desire to pursue advanced studies in China.';
      }
      sections.push(text);
    } else {
      sections.push('My name is [Your Name], and I am from [Country]. I am currently [current situation] with a strong desire to pursue advanced studies in China.');
    }
    sections.push('');

    // Section 2
    sections.push('Academic Journey');
    sections.push('');
    if (form.academicJourney) {
      sections.push(form.academicJourney);
    } else {
      sections.push('My academic journey began at [University], where I studied [Major]. Throughout my education, I have been particularly drawn to [area of interest]. Key achievements during this time include [achievements, awards, research, or projects]. These experiences shaped my understanding of [field] and deepened my commitment to pursuing further studies.');
    }
    sections.push('');

    // Section 3
    sections.push('Why China?');
    sections.push('');
    if (form.whyChina) {
      sections.push(form.whyChina);
    } else {
      sections.push("China's rapid advancement in [field] and its position as a global leader in [area] make it an ideal destination for my academic goals. The country's investment in education, world-class research facilities, and rich cultural heritage offer a unique learning environment. Studying in China will provide me with a cross-cultural perspective that is increasingly valuable in today's interconnected world.");
    }
    sections.push('');

    // Section 4
    sections.push('Program & Career Goals');
    sections.push('');
    if (form.targetProgram || form.careerGoals) {
      let text = '';
      if (form.targetProgram) {
        text += `I am applying for the ${form.targetProgram} program because it aligns perfectly with my academic background and career aspirations. `;
      }
      if (form.careerGoals) {
        text += form.careerGoals;
      } else {
        text += 'Upon completion of my studies, I plan to [career goal]. The knowledge and skills I gain will enable me to [specific contribution to your field and home country].';
      }
      sections.push(text);
    } else {
      sections.push('I am applying for [Program Name] because it aligns with my academic background and career aspirations. Upon completing my studies, I plan to [career goal]. The knowledge and skills I gain will enable me to contribute to [field/industry] in my home country and foster continued collaboration between [Country] and China.');
    }
    sections.push('');

    // Section 5
    sections.push('Unique Qualities');
    sections.push('');
    if (form.uniqueQualities) {
      sections.push(form.uniqueQualities);
    } else {
      sections.push('Beyond my academic qualifications, I bring [personal strengths — leadership, adaptability, teamwork, etc.]. For example, [specific story or example demonstrating the quality]. I believe these qualities, combined with my passion for [field], will enable me to thrive in a rigorous academic environment and contribute meaningfully to the university community.');
    }
    sections.push('');

    sections.push('I am confident that studying in China will be a transformative experience, and I am eager to contribute to the academic and cultural exchange that this opportunity represents. Thank you for considering my application.');

    return sections.join('\n');
  }, [form]);

  const wordCount = generatedText.split(/\s+/).filter(w => w.length > 0 && !w.startsWith('[') && !w.endsWith(']')).length;
  const wordCountColor = wordCount < 400 ? 'text-red-500' : wordCount < 600 ? 'text-amber-500' : wordCount <= 1200 ? 'text-emerald-500' : 'text-red-500';
  const wordCountLabel = wordCount < 400 ? 'Too Short' : wordCount < 600 ? 'Getting There' : wordCount <= 1200 ? 'Ideal Length' : 'Too Long';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statement-of-purpose-${form.fullName?.replace(/\s+/g, '-').toLowerCase() || 'draft'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-6">
          {/* Section 1: Personal Introduction */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-bold">1</span>
              Personal Introduction
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField update={update} label="Full Name" value={form.fullName} field="fullName" placeholder="John Doe" />
              <InputField update={update} label="Country" value={form.country} field="country" placeholder="Nigeria" />
            </div>
            <TextArea
              update={update}
              label="Current Situation"
              value={form.currentSituation}
              field="currentSituation"
              placeholder="Briefly describe who you are and where you are in life right now (student, professional, gap year, etc.)..."
              rows={3}
            />
          </div>

          {/* Section 2: Academic Journey */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Academic Journey
            </h3>
            <TextArea
              update={update}
              label="Your Education & Achievements"
              value={form.academicJourney}
              field="academicJourney"
              placeholder="Describe your education history, key achievements (awards, projects, research), and what shaped your interest in this field..."
              hint="Include specific achievements — GPA, awards, notable projects, publications."
              rows={5}
            />
          </div>

          {/* Section 3: Why China? */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              Why China?
            </h3>
            <TextArea
              update={update}
              label="Why study in China?"
              value={form.whyChina}
              field="whyChina"
              placeholder="What specifically attracts you to studying in China? Consider: academic quality, research facilities, cultural experience, China's leadership in your field..."
              hint="Go beyond 'it's affordable' — show genuine motivation. Mention specific universities, labs, or cultural reasons."
              rows={5}
            />
          </div>

          {/* Section 4: Program & Career Goals */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-bold">4</span>
              Program & Career Goals
            </h3>
            <InputField update={update} label="Target Program" value={form.targetProgram} field="targetProgram" placeholder="MSc Computer Science at Tsinghua University" />
            <TextArea
              update={update}
              label="Career Goals"
              value={form.careerGoals}
              field="careerGoals"
              placeholder="What are your career goals after graduation? How will your studies in China contribute to your professional future and your home country?"
              hint="Include both professional goals and how you'll apply what you learn back home."
              rows={4}
            />
          </div>

          {/* Section 5: Unique Qualities */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-bold">5</span>
              Unique Qualities
            </h3>
            <TextArea
              update={update}
              label="What makes you stand out?"
              value={form.uniqueQualities}
              field="uniqueQualities"
              placeholder="Personal strengths, leadership experiences, overcoming challenges, community involvement, unique perspectives you bring..."
              hint="Tell a brief story — specific examples are much more compelling than adjective lists."
              rows={5}
            />
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:sticky lg:top-8 self-start space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700">Live Preview</h3>
            <span className={`text-xs font-bold ${wordCountColor}`}>
              {wordCount} words — {wordCountLabel}
            </span>
          </div>

          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out rounded-full ${
                wordCount < 400 ? 'bg-red-400' : wordCount < 600 ? 'bg-amber-400' : wordCount <= 1200 ? 'bg-emerald-400' : 'bg-red-400'
              }`}
              style={{ width: `${Math.min((wordCount / 1200) * 100, 100)}%` }}
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-h-[70vh] overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-sans">
              {generatedText}
            </pre>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-600 transition-all shadow-sm"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
            >
              <Download size={16} />
              Download .txt
            </button>
          </div>

          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start gap-2">
            <AlertCircle size={16} className="text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-800/80">
              <strong>Tip:</strong> A strong SOP is personal and specific. Avoid generic phrases like &quot;I want to broaden my horizons.&quot; Tell your unique story instead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
