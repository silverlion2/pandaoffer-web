"use client";

import React, { useState, useMemo } from 'react';
import { Copy, Download, Check, AlertTriangle } from 'lucide-react';

const InputField = ({ label, value, field, placeholder, update }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <input type="text" value={value} onChange={(e) => update(field, e.target.value)} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all bg-white placeholder:text-slate-400" />
    </div>
);

const RELATIONSHIP_OPTIONS = [
  { id: 'thesis_advisor', label: 'Thesis / Research Advisor' },
  { id: 'professor', label: 'Course Professor' },
  { id: 'department_head', label: 'Department Head' },
  { id: 'supervisor', label: 'Work / Internship Supervisor' },
  { id: 'other', label: 'Other' },
];

const STRENGTHS = [
  'Academic excellence',
  'Research capability',
  'Leadership',
  'Teamwork',
  'Communication skills',
  'Creativity & innovation',
  'Initiative & self-motivation',
  'Critical thinking',
  'Problem-solving',
  'Work ethic & dedication',
  'Adaptability',
  'Technical proficiency',
];

export default function RecommendationTemplate() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    recommenderName: '',
    recommenderTitle: '',
    recommenderDept: '',
    recommenderUniversity: '',
    recommenderEmail: '',
    studentName: '',
    applyingFor: '',
    targetUniversity: '',
    targetProgram: '',
    relationship: 'professor',
    relationshipDuration: '',
    relationshipDetail: '',
    selectedStrengths: [],
    additionalStrengths: '',
    achievement: '',
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleStrength = (strength) => {
    setForm(prev => ({
      ...prev,
      selectedStrengths: prev.selectedStrengths.includes(strength)
        ? prev.selectedStrengths.filter(s => s !== strength)
        : [...prev.selectedStrengths, strength],
    }));
  };

  const relationshipLabel = RELATIONSHIP_OPTIONS.find(r => r.id === form.relationship)?.label || 'professor';

  const generatedText = useMemo(() => {
    const lines = [];
    const rName = form.recommenderName || '[Recommender Name]';
    const rTitle = form.recommenderTitle || '[Title]';
    const rDept = form.recommenderDept || '[Department]';
    const rUni = form.recommenderUniversity || '[University]';
    const rEmail = form.recommenderEmail || '[email]';
    const sName = form.studentName || '[Student Name]';
    const tUni = form.targetUniversity || '[Target University]';
    const tProg = form.targetProgram || '[Target Program]';
    const applyFor = form.applyingFor || "[Degree Level]";

    // Header
    lines.push(`${rDept}`);
    lines.push(`${rUni}`);
    lines.push(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`);
    lines.push('');
    lines.push('To the Admissions Committee,');
    lines.push(`${tUni}`);
    lines.push('');

    // Opening
    lines.push(`Dear Admissions Committee,`);
    lines.push('');
    lines.push(`I am writing to strongly recommend ${sName} for admission to the ${tProg} (${applyFor}) at ${tUni}. As ${form.relationship === 'thesis_advisor' ? 'their thesis advisor' : form.relationship === 'department_head' ? 'the head of the department' : form.relationship === 'supervisor' ? 'their supervisor' : 'their professor'} at ${rUni}, I have had the privilege of working closely with ${sName}${form.relationshipDuration ? ` for ${form.relationshipDuration}` : ''}.`);
    lines.push('');

    // Relationship context
    if (form.relationshipDetail) {
      lines.push(form.relationshipDetail);
    } else {
      lines.push(`I first encountered ${sName} in [course/project/context], where they immediately demonstrated exceptional [quality]. Throughout our working relationship, I have been consistently impressed by their dedication to academic excellence and their genuine passion for [field].`);
    }
    lines.push('');

    // Strengths
    if (form.selectedStrengths.length > 0) {
      const strengthsList = form.selectedStrengths.join(', ');
      lines.push(`Among ${sName}'s most notable qualities are their ${strengthsList}. These attributes have consistently set them apart from their peers.`);
    } else {
      lines.push(`${sName} possesses a remarkable combination of [key strengths] that sets them apart from their peers.`);
    }
    if (form.additionalStrengths) {
      lines.push(` ${form.additionalStrengths}`);
    }
    lines.push('');

    // Specific achievement
    if (form.achievement) {
      lines.push(`One particular example that illustrates ${sName}'s capabilities: ${form.achievement}`);
    } else {
      lines.push(`One particular example that illustrates ${sName}'s capabilities: [Describe a specific project, paper, presentation, or accomplishment that demonstrates their potential].`);
    }
    lines.push('');

    // Closing
    lines.push(`I have full confidence that ${sName} will excel in the ${tProg} program at ${tUni}. Their academic ability, combined with their personal qualities, makes them an outstanding candidate. I recommend them without reservation and believe they will make significant contributions to your academic community.`);
    lines.push('');
    lines.push('Please do not hesitate to contact me if you require any further information.');
    lines.push('');
    lines.push('Sincerely,');
    lines.push('');
    lines.push(`${rName}`);
    lines.push(`${rTitle}`);
    lines.push(`${rDept}, ${rUni}`);
    lines.push(`Email: ${rEmail}`);

    return lines.join('\n');
  }, [form]);

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
    a.download = `recommendation-letter-${form.studentName?.replace(/\s+/g, '-').toLowerCase() || 'draft'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
        <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-900 mb-1">Important Disclaimer</p>
          <p className="text-sm text-amber-800/80">
            This template is a <strong>starting point</strong> for your recommender. Your professor or supervisor should personalize and rewrite it in their own voice. Submitting a letter written by the applicant is considered academic dishonesty by many institutions.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-6">
          {/* Recommender Info */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">1</span>
              Recommender Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField update={update} label="Professor Name" value={form.recommenderName} field="recommenderName" placeholder="Prof. Li Ming" />
              <InputField update={update} label="Title" value={form.recommenderTitle} field="recommenderTitle" placeholder="Associate Professor" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField update={update} label="Department" value={form.recommenderDept} field="recommenderDept" placeholder="Dept. of Computer Science" />
              <InputField update={update} label="University" value={form.recommenderUniversity} field="recommenderUniversity" placeholder="University of Lagos" />
            </div>
            <InputField update={update} label="Email" value={form.recommenderEmail} field="recommenderEmail" placeholder="professor@university.edu" />
          </div>

          {/* Student Info */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Student & Target Program
            </h3>
            <InputField update={update} label="Student Name" value={form.studentName} field="studentName" placeholder="John Doe" />
            <InputField update={update} label="Applying For" value={form.applyingFor} field="applyingFor" placeholder="Master's Degree" />
            <div className="grid grid-cols-2 gap-3">
              <InputField update={update} label="Target University" value={form.targetUniversity} field="targetUniversity" placeholder="Zhejiang University" />
              <InputField update={update} label="Target Program" value={form.targetProgram} field="targetProgram" placeholder="MSc Computer Science" />
            </div>
          </div>

          {/* Relationship */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              Relationship
            </h3>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">How does the recommender know you?</label>
              <div className="grid grid-cols-2 gap-2">
                {RELATIONSHIP_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => update('relationship', opt.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      form.relationship === opt.id
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <InputField update={update} label="Duration" value={form.relationshipDuration} field="relationshipDuration" placeholder="2 years" />
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Context</label>
              <textarea
                value={form.relationshipDetail}
                onChange={(e) => update('relationshipDetail', e.target.value)}
                placeholder="Describe the context of the relationship �?which course, project, or role brought you together..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all bg-white resize-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">4</span>
              Key Strengths
            </h3>
            <div className="flex flex-wrap gap-2">
              {STRENGTHS.map(s => (
                <button
                  key={s}
                  onClick={() => toggleStrength(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    form.selectedStrengths.includes(s)
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Additional Qualities</label>
              <textarea
                value={form.additionalStrengths}
                onChange={(e) => update('additionalStrengths', e.target.value)}
                placeholder="Any other strengths or qualities to highlight..."
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all bg-white resize-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Achievement */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">5</span>
              Specific Achievement
            </h3>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Highlight an achievement</label>
              <p className="text-xs text-slate-400 mb-2">A specific project, paper, presentation, or accomplishment to showcase in the letter.</p>
              <textarea
                value={form.achievement}
                onChange={(e) => update('achievement', e.target.value)}
                placeholder="For example: 'In their final year project, they developed a novel algorithm for... which achieved... and was presented at...'"
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all bg-white resize-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:sticky lg:top-8 self-start space-y-4">
          <h3 className="text-sm font-bold text-slate-700">Letter Preview</h3>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-h-[70vh] overflow-y-auto shadow-sm">
            {/* Letterhead simulation */}
            <div className="border-b-2 border-emerald-500 pb-4 mb-6">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{form.recommenderUniversity || '[University Name]'}</p>
              <p className="text-xs text-slate-500">{form.recommenderDept || '[Department]'}</p>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-sans">
              {generatedText}
            </pre>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-all shadow-sm"
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
        </div>
      </div>
    </div>
  );
}

