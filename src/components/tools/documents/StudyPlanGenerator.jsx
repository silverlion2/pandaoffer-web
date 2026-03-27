"use client";

import React, { useState, useMemo } from 'react';
import { Copy, Download, Check, AlertCircle } from 'lucide-react';

const InputField = ({ label, value, field, placeholder, type = 'text', update }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => update(field, e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all bg-white placeholder:text-slate-400"
    />
  </div>
);

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

const DEGREE_TIMELINES = {
  bachelor: [
    { semester: 'Year 1 (Semesters 1-2)', focus: 'Core coursework, Chinese language foundation (HSK 4 target), cultural adaptation' },
    { semester: 'Year 2 (Semesters 3-4)', focus: 'Major-specific courses, electives, early research exposure' },
    { semester: 'Year 3 (Semesters 5-6)', focus: 'Advanced coursework, internship or lab experience, conference participation' },
    { semester: 'Year 4 (Semesters 7-8)', focus: 'Thesis/capstone project, graduation preparation, career planning' },
  ],
  master: [
    { semester: 'Semester 1', focus: 'Core coursework, Chinese language (HSK 4), literature review' },
    { semester: 'Semester 2', focus: 'Advanced courses, research methodology, preliminary research' },
    { semester: 'Semester 3', focus: 'Primary research, data collection, conference participation' },
    { semester: 'Semester 4', focus: 'Data analysis, thesis writing' },
    { semester: 'Semester 5-6', focus: 'Thesis defense, publication, graduation' },
  ],
  phd: [
    { semester: 'Year 1', focus: 'Coursework, comprehensive literature review, research proposal refinement' },
    { semester: 'Year 2', focus: 'Primary research, data collection, methodology development' },
    { semester: 'Year 3', focus: 'Continued research, publish first paper, attend international conferences' },
    { semester: 'Year 4', focus: 'Complete research, dissertation writing, submit publications' },
  ],
};

export default function StudyPlanGenerator() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    currentUniversity: '',
    currentDegree: '',
    major: '',
    gpa: '',
    relevantExperience: '',
    motivation: '',
    targetUniversity: '',
    targetDepartment: '',
    professorName: '',
    professorResearch: '',
    researchPlan: '',
    degreeLevel: 'master',
    postGradPlans: '',
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const timeline = DEGREE_TIMELINES[form.degreeLevel] || DEGREE_TIMELINES.master;

  const generatedText = useMemo(() => {
    const sections = [];

    sections.push(`Study Plan for ${form.major || '[Program Name]'} at ${form.targetUniversity || '[University Name]'}`);
    sections.push('');

    // Section 1
    sections.push('1. Academic Background');
    sections.push('');
    if (form.fullName || form.currentUniversity || form.currentDegree || form.major || form.gpa) {
      let text = `I am ${form.fullName || '[Your Name]'}, `;
      text += `a graduate of ${form.currentUniversity || '[Your University]'} `;
      text += `with a ${form.currentDegree || '[Degree]'} in ${form.major || '[Major]'}`;
      if (form.gpa) text += ` with a GPA of ${form.gpa}`;
      text += '. ';
      if (form.relevantExperience) {
        text += form.relevantExperience;
      } else {
        text += 'During my studies, I focused on [specific area] and gained experience in [relevant projects, internships, or coursework].';
      }
      sections.push(text);
    } else {
      sections.push('I am currently a graduate of [University] with a [Degree] in [Major]. During my studies, I focused on [specific area] and achieved a GPA of [X]. My academic journey has been shaped by [relevant experience, projects, or coursework].');
    }
    sections.push('');

    // Section 2
    sections.push('2. Motivation');
    sections.push('');
    if (form.motivation) {
      sections.push(form.motivation);
    } else {
      sections.push('My interest in [field] was sparked by [specific experience or event]. Through my studies, I discovered that [specific problem/question] remains understudied, particularly in [region/context]. I believe that deeper research in this area could [potential impact]. This motivates me to pursue advanced studies.');
    }
    sections.push('');

    // Section 3
    sections.push(`3. Why ${form.targetUniversity || '[University Name]'}?`);
    sections.push('');
    if (form.targetUniversity || form.professorName || form.professorResearch) {
      let text = `${form.targetUniversity || '[University Name]'} is internationally renowned for its research in ${form.major || '[field]'}. `;
      if (form.professorName) {
        text += `I am particularly drawn to the work of Prof. ${form.professorName} in the ${form.targetDepartment || '[Department]'}, `;
        if (form.professorResearch) {
          text += `whose research on ${form.professorResearch} aligns closely with my academic interests. `;
        } else {
          text += `whose published work aligns closely with my research interests. `;
        }
      }
      text += `I believe the academic environment and resources at ${form.targetUniversity || '[University Name]'} will provide the ideal foundation for my research goals.`;
      sections.push(text);
    } else {
      sections.push('[University Name] is internationally renowned for its research in [field]. I am particularly drawn to the work of Prof. [Name] in the [Department], whose recent publications on [topic] align closely with my research interests.');
    }
    sections.push('');

    // Section 4
    sections.push('4. Research Plan');
    sections.push('');
    if (form.researchPlan) {
      sections.push(form.researchPlan);
    } else {
      sections.push('During my studies, I plan to investigate [research question]. I will employ [methodology] to [objective]. My expected outcomes include [list outcomes]. This research could contribute to [broader impact].');
    }
    sections.push('');

    // Section 5
    sections.push('5. Timeline');
    sections.push('');
    timeline.forEach(item => {
      sections.push(`${item.semester}: ${item.focus}`);
    });
    sections.push('');

    // Section 6
    sections.push('6. Post-Graduation Plans');
    sections.push('');
    if (form.postGradPlans) {
      sections.push(form.postGradPlans);
    } else {
      sections.push('Upon completing my degree, I plan to return to [country] where I will [contribute how]. The knowledge and skills gained at [University] will enable me to [specific contribution]. I also hope to maintain academic collaborations and contribute to [field] through publications and continued research.');
    }

    return sections.join('\n');
  }, [form, timeline]);

  const wordCount = generatedText.split(/\s+/).filter(w => w.length > 0 && !w.startsWith('[') && !w.endsWith(']')).length;

  const wordCountColor = wordCount < 500 ? 'text-red-500' : wordCount < 800 ? 'text-amber-500' : wordCount <= 1500 ? 'text-emerald-500' : 'text-red-500';
  const wordCountLabel = wordCount < 500 ? 'Too Short' : wordCount < 800 ? 'Getting There' : wordCount <= 1500 ? 'Ideal Length' : 'Too Long';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback: no-op */ }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-plan-${form.targetUniversity?.replace(/\s+/g, '-').toLowerCase() || 'draft'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-6">
          {/* Section 1: Academic Background */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">1</span>
              Academic Background
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField update={update} label="Full Name" value={form.fullName} field="fullName" placeholder="John Doe" />
              <InputField update={update} label="GPA" value={form.gpa} field="gpa" placeholder="3.7 / 4.0" />
            </div>
            <InputField update={update} label="Current University" value={form.currentUniversity} field="currentUniversity" placeholder="University of Lagos" />
            <div className="grid grid-cols-2 gap-3">
              <InputField update={update} label="Current Degree" value={form.currentDegree} field="currentDegree" placeholder="BSc" />
              <InputField update={update} label="Major / Field" value={form.major} field="major" placeholder="Computer Science" />
            </div>
            <TextArea
              update={update}
              label="Relevant Experience"
              value={form.relevantExperience}
              field="relevantExperience"
              placeholder="Describe relevant coursework, research, internships, or professional experience..."
              hint="Projects, internships, publications, or skills relevant to your target program."
              rows={3}
            />
          </div>

          {/* Section 2: Motivation */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Motivation
            </h3>
            <TextArea
              update={update}
              label="Why this field?"
              value={form.motivation}
              field="motivation"
              placeholder="What sparked your interest in this field? What problem or question motivates you? How did your experience lead you here?"
              hint="Be specific — reference a research paper, project, or real-world problem."
              rows={4}
            />
          </div>

          {/* Section 3: Target University */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              Why This University?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField update={update} label="Target University" value={form.targetUniversity} field="targetUniversity" placeholder="Zhejiang University" />
              <InputField update={update} label="Department" value={form.targetDepartment} field="targetDepartment" placeholder="School of Computer Science" />
            </div>
            <InputField update={update} label="Professor Name" value={form.professorName} field="professorName" placeholder="Prof. Zhang Wei" />
            <TextArea
              update={update}
              label="Professor's Research Area"
              value={form.professorResearch}
              field="professorResearch"
              placeholder="Describe their research, cite a specific paper or project title that interests you..."
              hint="Referencing a specific paper or project shows you've done your homework."
              rows={3}
            />
          </div>

          {/* Section 4: Research Plan */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">4</span>
              Research Plan
            </h3>
            <TextArea
              update={update}
              label="Your Research Plan"
              value={form.researchPlan}
              field="researchPlan"
              placeholder="What research question will you investigate? What methodology will you use? What outcomes do you expect?"
              hint="Include: research question, methodology, expected outcomes, and broader impact."
              rows={5}
            />
          </div>

          {/* Section 5: Timeline */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">5</span>
              Timeline
            </h3>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Degree Level</label>
              <div className="flex gap-2">
                {[
                  { id: 'bachelor', label: "Bachelor's" },
                  { id: 'master', label: "Master's" },
                  { id: 'phd', label: 'PhD' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => update('degreeLevel', opt.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      form.degreeLevel === opt.id
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="font-bold text-blue-600 whitespace-nowrap min-w-[100px]">{item.semester}:</span>
                  <span className="text-slate-600">{item.focus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Post-Graduation */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">6</span>
              Post-Graduation Plans
            </h3>
            <TextArea
              update={update}
              label="What will you do after graduating?"
              value={form.postGradPlans}
              field="postGradPlans"
              placeholder="Plan to return home to contribute to your country's development, continue to PhD, work in industry, government, or academia..."
              hint='Tip: Emphasizing "contribution to my home country" resonates strongly with CSC committees.'
              rows={4}
            />
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:sticky lg:top-8 self-start space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700">Live Preview</h3>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold ${wordCountColor}`}>
                {wordCount} words — {wordCountLabel}
              </span>
            </div>
          </div>

          {/* Word count progress bar */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out rounded-full ${
                wordCount < 500 ? 'bg-red-400' : wordCount < 800 ? 'bg-amber-400' : wordCount <= 1500 ? 'bg-emerald-400' : 'bg-red-400'
              }`}
              style={{ width: `${Math.min((wordCount / 1500) * 100, 100)}%` }}
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
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 transition-all shadow-sm"
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

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2">
            <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800/80">
              <strong>Important:</strong> Replace all [bracketed placeholders] with your actual information. A generic study plan is the #1 reason for CSC rejection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
