'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';
import {
  proposalExclusions,
  proposalIncludes,
  quoteBriefFields,
  studyTourEmail,
} from '@/data/studyTours';

const audienceOptions = [
  'MBA / EMBA group',
  'Healthcare executives',
  'University students',
  'High school students',
  'Agency partner group',
];

const budgetOptions = ['Economy', 'Standard', 'Executive', 'Need guidance'];

function fieldKey(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function StudyTourQuoteBuilder({
  pageTitle,
  routeOptions,
  accentTextClassName = 'text-indigo-600',
  ctaClassName = 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-950/30',
}) {
  const [fields, setFields] = useState(() =>
    Object.fromEntries(quoteBriefFields.map((field) => [field.label, ''])),
  );

  const mailHref = useMemo(() => {
    const body = [
      `Route: ${pageTitle}`,
      ...quoteBriefFields.map((field) => `${field.label}: ${fields[field.label] || ''}`),
      '',
      'Notes:',
    ].join('\n');

    return `mailto:${studyTourEmail}?subject=${encodeURIComponent(
      `${pageTitle} quote brief`,
    )}&body=${encodeURIComponent(body)}`;
  }, [fields, pageTitle]);

  const updateField = (label, value) => {
    setFields((current) => ({ ...current, [label]: value }));
  };

  const selectPlaceholder = (label) => {
    if (label === 'Audience') return 'Select audience';
    if (label === 'Route priority') return 'Select route focus';
    if (label === 'Budget level') return 'Select budget';
    return '';
  };

  return (
    <section id="quote-brief" className="bg-white border-y border-slate-200 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="bg-slate-950 text-white rounded-lg p-6 md:p-8 shadow-sm">
            <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${accentTextClassName}`}>
              Build a quote brief
            </p>
            <h2 className="text-3xl font-extrabold font-heading mb-3">
              Turn the group profile into a practical route concept
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 mb-6">
              Use this quick brief to send the same buying signals a travel platform would collect:
              group size, buyer type, dates, route priority, and budget level.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quoteBriefFields.map((field) => {
                const id = fieldKey(field.label);

                if (field.label === 'Audience') {
                  return (
                    <label key={field.label} htmlFor={id} className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {field.label}
                      </span>
                      <select
                        id={id}
                        value={fields[field.label]}
                        onChange={(event) => updateField(field.label, event.target.value)}
                        className="mt-2 w-full rounded-md border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-white outline-none focus:border-white/50"
                      >
                        <option value="" className="text-slate-900">
                          {selectPlaceholder(field.label)}
                        </option>
                        {audienceOptions.map((option) => (
                          <option key={option} value={option} className="text-slate-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }

                if (field.label === 'Route priority') {
                  return (
                    <label key={field.label} htmlFor={id} className="block sm:col-span-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {field.label}
                      </span>
                      <select
                        id={id}
                        value={fields[field.label]}
                        onChange={(event) => updateField(field.label, event.target.value)}
                        className="mt-2 w-full rounded-md border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-white outline-none focus:border-white/50"
                      >
                        <option value="" className="text-slate-900">
                          {selectPlaceholder(field.label)}
                        </option>
                        {routeOptions.map((option) => (
                          <option key={option} value={option} className="text-slate-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }

                if (field.label === 'Budget level') {
                  return (
                    <label key={field.label} htmlFor={id} className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {field.label}
                      </span>
                      <select
                        id={id}
                        value={fields[field.label]}
                        onChange={(event) => updateField(field.label, event.target.value)}
                        className="mt-2 w-full rounded-md border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-white outline-none focus:border-white/50"
                      >
                        <option value="" className="text-slate-900">
                          {selectPlaceholder(field.label)}
                        </option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option} className="text-slate-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }

                return (
                  <label key={field.label} htmlFor={id} className="block">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {field.label}
                    </span>
                    <input
                      id={id}
                      value={fields[field.label]}
                      onChange={(event) => updateField(field.label, event.target.value)}
                      placeholder={field.placeholder}
                      className="mt-2 w-full rounded-md border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-white placeholder:text-slate-500 outline-none focus:border-white/50"
                    />
                  </label>
                );
              })}
            </div>

            <a
              href={mailHref}
              className={`mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold text-white shadow-lg transition-colors ${ctaClassName}`}
            >
              Send quote brief
              <Mail size={17} />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <article className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={20} className={accentTextClassName} />
                <h3 className="font-extrabold text-slate-900">Included in the proposal</h3>
              </div>
              <ul className="space-y-3">
                {proposalIncludes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                    <CheckCircle2 size={16} className={`${accentTextClassName} shrink-0 mt-0.5`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={20} className="text-slate-600" />
                <h3 className="font-extrabold text-slate-900">Not automatically included</h3>
              </div>
              <ul className="space-y-3">
                {proposalExclusions.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                    <ShieldCheck size={16} className="text-slate-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
